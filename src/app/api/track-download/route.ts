import { NextResponse } from "next/server";
import { DOWNLOAD_KEY, REDIS_TOKEN, REDIS_URL } from "@/lib/redis";

/**
 * POST /api/track-download
 *
 * Ported from the original api/track-download.js. Increments a Redis
 * counter whenever the VaultX download is clicked. Fired via
 * navigator.sendBeacon — fire and forget.
 *
 * Every failure path returns 200 with `ok: false`, deliberately, so
 * tracking can never surface as an error to a visitor.
 */
export async function POST() {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return NextResponse.json({ ok: false, reason: "redis not configured" });
  }

  try {
    await fetch(`${REDIS_URL}/incr/${DOWNLOAD_KEY}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
      cache: "no-store",
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "redis request failed" });
  }
}

// Only POST is defined, so Next answers every other method with 405 —
// matching the original handler's explicit method check.
