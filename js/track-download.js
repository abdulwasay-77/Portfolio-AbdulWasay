/* Fires a fire-and-forget beacon to /api/track-download whenever a
   [data-track="vaultx-download"] link is clicked. Never blocks, never
   delays, never shows anything to the visitor - the actual file
   download proceeds completely normally regardless of whether this
   succeeds or fails. */
(function () {
  document.querySelectorAll('[data-track="vaultx-download"]').forEach(function (el) {
    el.addEventListener('click', function () {
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/track-download');
        } else {
          fetch('/api/track-download', { method: 'POST', keepalive: true }).catch(function () {});
        }
      } catch (err) {
        // Never let tracking failures affect the actual download
      }
    });
  });
})();
