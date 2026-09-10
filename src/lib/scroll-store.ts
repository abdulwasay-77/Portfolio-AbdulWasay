/**
 * A tiny module-scoped store for scroll progress.
 *
 * The 3D layer needs the current scroll ratio on every animation frame.
 * Putting that in React state would re-render the tree ~60 times a
 * second, so the value lives in a plain mutable object that the R3F
 * frame loop reads directly. React only subscribes to the *section*
 * changes, which happen a handful of times per page.
 */

export interface ScrollState {
  /** 0..1 over the whole document. */
  progress: number;
  /**
   * Measured 0..1 scroll position at which each chapter is fully
   * expressed, one per entry in `chapters`. Recomputed on resize.
   */
  anchors: number[];
  /** Pointer position, -1..1 on each axis, for camera parallax. */
  pointerX: number;
  pointerY: number;
}

export const scrollState: ScrollState = {
  progress: 0,
  anchors: [],
  pointerX: 0,
  pointerY: 0,
};

type Listener = (id: string) => void;

const sectionListeners = new Set<Listener>();
let activeSection = "hero";

export function setActiveSection(id: string) {
  if (id === activeSection) return;
  activeSection = id;
  sectionListeners.forEach((fn) => fn(id));
}

export function getActiveSection() {
  return activeSection;
}

export function subscribeSection(fn: Listener) {
  sectionListeners.add(fn);
  return () => {
    sectionListeners.delete(fn);
  };
}
