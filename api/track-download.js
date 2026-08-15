// POST /api/track-download
// Increments a Redis counter every time the VaultX download button is
// clicked. Fired via navigator.sendBeacon from the client - fire and
// forget, never blocks or delays the actual file download.
//
// Needs these env vars in your Vercel project (auto-added when you
// connect an Upstash Redis database from the Storage tab):
//   KV_REST_API_URL / KV_REST_API_TOKEN
//   (or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN - both are checked)

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!REDIS_URL || !REDIS_TOKEN) {
    // Redis isn't connected yet - fail quietly so this never breaks the
    // actual download for visitors. Check Vercel Storage tab setup.
    res.status(200).json({ ok: false, reason: 'redis not configured' });
    return;
  }

  try {
    await fetch(`${REDIS_URL}/incr/vaultx_downloads`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ ok: false, reason: 'redis request failed' });
  }
}
