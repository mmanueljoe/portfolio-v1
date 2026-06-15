"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export function Reveal({
  delay = 0,
  children,
  ...props
}: Readonly<RevealProps>) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <motion.div {...props}>{children}</motion.div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
