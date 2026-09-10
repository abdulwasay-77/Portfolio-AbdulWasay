"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/site";
import { profile } from "@/data/profile";
import { getActiveSection, subscribeSection } from "@/lib/scroll-store";

interface NavProps {
  /**
   * On project detail pages the items are cross-page links back to the
   * home sections, and there is no active-section tracking to do.
   */
  variant?: "home" | "detail";
}

export default function Nav({ variant = "home" }: NavProps) {
  // The active section lives in the scroll store, outside React.
  const active = useSyncExternalStore(
    subscribeSection,
    getActiveSection,
    () => "hero",
  );
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Condense the bar once the hero is behind us.
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile panel: close on Escape, and return focus to the toggle so
  // keyboard users are not dropped at the top of the document.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const href = (id: string) => (variant === "home" ? `#${id}` : `/#${id}`);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        condensed || open
          ? "border-b border-border bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent",
      ].join(" ")}
      style={{ height: "var(--header-h)" }}
    >
      <nav
        aria-label="Primary"
        className="shell flex h-full items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="group flex min-h-11 shrink-0 items-center gap-2.5 rounded-xs"
        >
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-sm border border-border-strong bg-surface font-mono text-[0.68rem] font-bold tracking-tight text-accent transition-colors duration-200 group-hover:border-accent"
          >
            AW
          </span>
          <span className="text-[0.9rem] font-semibold tracking-tight">
            {profile.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = variant === "home" && active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={href(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "relative block rounded-sm px-3 py-2 text-[0.82rem] font-medium transition-colors duration-200",
                    isActive
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-x-3 -bottom-px h-px transition-opacity duration-200",
                      isActive ? "bg-accent opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={variant === "home" ? "#contact" : "/#contact"}
            className="hidden whitespace-nowrap rounded-sm border border-border-strong px-3.5 py-2 text-[0.8rem] font-semibold text-fg transition-colors duration-200 hover:border-accent hover:text-accent sm:block"
          >
            Get in touch
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-10 place-items-center rounded-sm border border-border text-fg transition-colors duration-200 hover:border-border-strong lg:hidden"
          >
            {/* The button carries the accessible name; the icon is decorative. */}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-b border-border bg-bg/95 backdrop-blur-md lg:hidden"
      >
        <ul className="shell flex flex-col py-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={href(item.id)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border py-3.5 text-[0.95rem] font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {item.label}
                <span aria-hidden="true" className="label text-fg-faint">
                  {String(navItems.indexOf(item) + 1).padStart(2, "0")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
