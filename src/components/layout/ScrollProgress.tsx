"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  // on-surface, not accent: the brand allows four violet elements per page and
  // they're already spent on the two wordmark stops, the hero headline stop and
  // the primary button. Black also matches the 2px rules the page is built on.
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-on-surface"
      aria-hidden
    />
  );
}
