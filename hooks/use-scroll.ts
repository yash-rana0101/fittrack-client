"use client";

import { useState, useEffect } from "react";

interface ScrollState {
  y: number;
  /** True once the user scrolls past the threshold (default 10px) */
  isScrolled: boolean;
}

/**
 * Tracks vertical scroll position with a configurable threshold.
 *
 * Threshold is intentionally low (10px) — we want the navbar to react
 * almost immediately so the transparency-to-solid transition feels
 * responsive rather than delayed.
 */
export function useScroll(threshold = 10): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    isScrolled: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setState({ y, isScrolled: y > threshold });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return state;
}
