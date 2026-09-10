"use client";

import type { ReactNode } from "react";

/**
 * Ported from the original js/track-download.js.
 *
 * Fires a fire-and-forget beacon to /api/track-download on click. It
 * never blocks, delays or alters the actual download — the link's
 * default behaviour always proceeds, whether tracking succeeds or not.
 */
export default function DownloadButton({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const track = () => {
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track-download");
      } else {
        void fetch("/api/track-download", { method: "POST", keepalive: true }).catch(
          () => undefined,
        );
      }
    } catch {
      // Tracking must never affect the download.
    }
  };

  return (
    <a href={href} download onClick={track} className={className}>
      {children}
    </a>
  );
}
