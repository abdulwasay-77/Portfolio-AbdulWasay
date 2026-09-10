/**
 * 3D environment colours — the single source of truth for WebGL.
 *
 * Same family as the DOM tokens in globals.css (the accent is shared),
 * so the canvas and the page read as one space. See MASTER.md §2.
 */
export const threePalette = {
  /** Scene fog. Must equal the page ground so depth fades into it. */
  fog: "#07080b",
  node: "#3da9fc",
  edge: "#1e3a52",
  dust: "#5eead4",
  core: "#dcefff",
} as const;
