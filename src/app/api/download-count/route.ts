import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { DOWNLOAD_KEY, REDIS_TOKEN, REDIS_URL } from "@/lib/redis";

/**
 * GET /api/download-count?key=STATS_SECRET
 *
 * Ported from the original api/download-count.js. A private endpoint:
 * a missing or wrong key gets a plain 404, so it does not even reveal
 * that a stats endpoint exists.
 */
export const dynamic = "force-dynamic";

function keyMatches(provided: string | null, secret: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  // Constant-time compare so the secret cannot be recovered by timing.
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: NextRequest) {
  const secret = process.env.STATS_SECRET;
  const provided = request.nextUrl.searchParams.get("key");

  if (!secret || !keyMatches(provided, secret)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!REDIS_URL || !REDIS_TOKEN) {
    return NextResponse.json({ error: "Redis not configured yet" }, { status: 500 });
  }

  try {
    const response = await fetch(`${REDIS_URL}/get/${DOWNLOAD_KEY}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
      cache: "no-store",
    });
    const data = (await response.json()) as { result?: string | null };
    const count = data.result ? Number.parseInt(data.result, 10) : 0;
    return NextResponse.json({ vaultx_downloads: count });
  } catch {
    return NextResponse.json({ error: "Failed to read count" }, { status: 500 });
  }
}
