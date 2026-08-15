/* ============================================================
   HOLOGRAM PLAYER - fully procedural, no image frames.
   A set of particles interpolates between a scattered cloud and a
   ring formation, with thin tendril lines radiating from the
   center to a subset of ring particles. Glow is done with a
   precomputed sprite + additive blending (cheap: drawImage of a
   small bitmap instead of per-particle gradients/shadowBlur), so
   it stays smooth even with a few hundred particles on screen.

   Progress value t: 0 = fully scattered, 1 = ring fully formed.

   'full' (homepage): t animates 0 -> 1 over ~3.6s on load (reveal),
     then holds at 1 while idle (slow rotation + gentle breathing
     glow), then scroll drives t back down toward 0 as the user
     scrolls (ring disperses), reversing cleanly either direction.

   'scroll-only' (project pages): starts directly at t = 1 (settled
     ring, idle), skips the reveal animation, same scroll behaviour.
   ============================================================ */

(function () {
  const MODE = window.__HOLOGRAM_MODE__ === 'scroll-only' ? 'scroll-only' : 'full';

  const stage = document.createElement('div');
  stage.className = 'hologram-stage';
  const canvas = document.createElement('canvas');
  stage.appendChild(canvas);
  document.body.prepend(stage);
  const ctx = canvas.getContext('2d');

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // ---- Precomputed glow sprite: a soft radial dot, reused for every
  // particle via drawImage (cheap) instead of creating a gradient or
  // using shadowBlur per particle per frame (expensive at scale). ----
  const SPRITE_SIZE = 64;
  const glowSprite = document.createElement('canvas');
  glowSprite.width = SPRITE_SIZE;
  glowSprite.height = SPRITE_SIZE;
  (function paintSprite() {
    const sctx = glowSprite.getContext('2d');
    const r = SPRITE_SIZE / 2;
    const grad = sctx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(210,235,255,0.9)');
    grad.addColorStop(0.6, 'rgba(120,200,255,0.35)');
    grad.addColorStop(1, 'rgba(80,170,255,0)');
    sctx.fillStyle = grad;
    sctx.beginPath();
    sctx.arc(r, r, r, 0, Math.PI * 2);
    sctx.fill();
  })();

  // ---- Build the particle set once ----
  const RING_COUNT = 340;
  const TENDRIL_EVERY = 6; // every Nth ring particle also gets a radiating line

  const particles = [];
  for (let i = 0; i < RING_COUNT; i++) {
    const angle = (i / RING_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.05;
    particles.push({
      angle,
      radiusJitter: (Math.random() - 0.5) * 0.14,
      scatterAngle: Math.random() * Math.PI * 2,
      scatterDist: 0.22 + Math.random() * 0.85,
      size: 1.1 + Math.random() * 2.1,
      isTendril: i % TENDRIL_EVERY === 0,
      warmth: Math.random(), // 0 = electric blue, 1 = cyan
      curveKick: (Math.random() - 0.5) * 10,
      twinkleSeed: Math.random() * Math.PI * 2
    });
  }

  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function particleColor(warmth, alpha) {
    const r = Math.round(93 + (110 - 93) * warmth);
    const g = Math.round(180 + (234 - 180) * warmth);
    const b = Math.round(255 + (212 - 255) * warmth);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // ---- State ----
  let phase = MODE === 'full' ? 'revealing' : 'idle';
  let t = MODE === 'full' ? 0 : 1;
  let revealStart = null;
  const REVEAL_DURATION = 3600;
  let rotationAngle = 0;
  let scrollTargetT = 1;

  function scrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / max));
  }

  function onScroll() {
    if (phase === 'revealing') return;
    const sp = scrollProgress();
    phase = window.scrollY <= 4 ? 'idle' : 'scrolling';
    scrollTargetT = 1 - sp;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  function drawGlowDot(x, y, radius, color, alpha) {
    ctx.globalAlpha = alpha;
    ctx.drawImage(glowSprite, x - radius, y - radius, radius * 2, radius * 2);
    ctx.globalAlpha = 1;
  }

  function draw(ts) {
    if (phase === 'revealing') {
      if (revealStart === null) revealStart = ts;
      const raw = Math.min(1, (ts - revealStart) / REVEAL_DURATION);
      t = easeOutCubic(raw);
      if (raw >= 1) phase = 'idle';
    } else if (phase === 'idle') {
      t = 1;
      rotationAngle += 0.0009;
    } else if (phase === 'scrolling') {
      t += (scrollTargetT - t) * 0.18;
    }

    const w = window.innerWidth, h = window.innerHeight;
    const cx = w / 2, cy = h * 0.42;
    ctx.clearRect(0, 0, w, h);

    const breathing = phase === 'idle' ? (Math.sin(ts / 1700) * 0.5 + 0.5) : 0.5;
    const ringRadius = Math.min(w, h) * 0.17 * (1 + breathing * 0.035);
    const scatterR = Math.max(w, h) * 0.6;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotationAngle);
    ctx.globalCompositeOperation = 'lighter'; // additive - overlapping glow builds up light naturally

    // Core glow - dim while scattered, bright once the ring gathers
    const coreAlpha = Math.min(1, 0.2 + t * 0.6 + breathing * 0.15);
    drawGlowDot(0, 0, ringRadius * 0.95, null, coreAlpha);

    // Tendrils - radiate outward from center, growing in with t
    ctx.lineWidth = 1.1;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!p.isTendril) continue;
      const r = ringRadius * (1 + p.radiusJitter);
      const rx = Math.cos(p.angle) * r, ry = Math.sin(p.angle) * r;
      const sx = Math.cos(p.scatterAngle) * scatterR * p.scatterDist;
      const sy = Math.sin(p.scatterAngle) * scatterR * p.scatterDist;
      const x = sx + (rx - sx) * t;
      const y = sy + (ry - sy) * t;
      ctx.strokeStyle = `rgba(170, 220, 255, ${0.45 * t})`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(x * 0.5 + p.curveKick, y * 0.5 - p.curveKick, x, y);
      ctx.stroke();
    }

    // Particles - glow sprite with a twinkle so the field feels alive
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const r = ringRadius * (1 + p.radiusJitter);
      const rx = Math.cos(p.angle) * r, ry = Math.sin(p.angle) * r;
      const sx = Math.cos(p.scatterAngle) * scatterR * p.scatterDist;
      const sy = Math.sin(p.scatterAngle) * scatterR * p.scatterDist;
      const x = sx + (rx - sx) * t;
      const y = sy + (ry - sy) * t;
      const twinkle = 0.75 + 0.25 * Math.sin(ts / 900 + p.twinkleSeed);
      const alpha = (0.5 + t * 0.55) * twinkle;
      const glowRadius = p.size * 5.5;
      drawGlowDot(x, y, glowRadius, null, Math.min(1, alpha));
      // bright pinpoint core on top of the glow so particles read crisp, not just fuzzy
      ctx.globalAlpha = Math.min(1, alpha + 0.2);
      ctx.fillStyle = particleColor(p.warmth, 1);
      ctx.beginPath();
      ctx.arc(x, y, Math.max(0.6, p.size * 0.5), 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.restore();
    requestAnimationFrame(draw);
  }

  canvas.classList.add('is-ready');
  requestAnimationFrame(draw);
})();
