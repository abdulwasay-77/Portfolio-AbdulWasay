// GET /api/download-count?key=YOUR_SECRET
// Private endpoint - only returns a real number if the ?key= matches
// the STATS_SECRET environment variable you set yourself in Vercel
// Project Settings -> Environment Variables. Anyone without the key
// gets a plain 404, same as a page that doesn't exist - the endpoint
// doesn't reveal it's a stats endpoint at all if you get the key wrong.
//
// Bookmark: https://yoursite.vercel.app/api/download-count?key=YOUR_SECRET

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export default async function handler(req, res) {
  const secret = process.env.STATS_SECRET;

  if (!secret || req.query.key !== secret) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  if (!REDIS_URL || !REDIS_TOKEN) {
    res.status(500).json({ error: 'Redis not configured yet' });
    return;
  }

  try {
    const r = await fetch(`${REDIS_URL}/get/vaultx_downloads`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
    });
    const data = await r.json();
    const count = data.result ? parseInt(data.result, 10) : 0;
    res.status(200).json({ vaultx_downloads: count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read count' });
  }
}
