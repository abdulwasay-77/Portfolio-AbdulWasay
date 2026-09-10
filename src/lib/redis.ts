/**
 * Upstash Redis REST credentials, read server-side only. Both naming
 * schemes are checked, exactly as the original api/*.js handlers did:
 * Vercel's Storage integration injects KV_*, a direct Upstash
 * connection injects UPSTASH_*.
 */
export const REDIS_URL =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
export const REDIS_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const DOWNLOAD_KEY = "vaultx_downloads";
