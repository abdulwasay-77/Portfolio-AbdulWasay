"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copies the address to the clipboard. `mailto:` does nothing for
 * visitors without a configured mail client, so this is the fallback
 * that always works. The status is announced through a live region.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context, permissions). The
      // address is visible on the button, so nothing is lost.
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-sm border border-border-strong px-6 py-3.5 font-mono text-[0.85rem] text-fg transition-colors duration-200 hover:border-accent sm:w-auto"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4 text-signal" />
      ) : (
        <Copy aria-hidden="true" className="size-4 text-fg-muted" />
      )}
      <span>{email}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : "Copy email address"}
      </span>
    </button>
  );
}
