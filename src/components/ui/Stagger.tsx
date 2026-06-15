"use client";

import {
  type HTMLMotionProps,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Stagger({
  children,
  ...props
}: Readonly<HTMLMotionProps<"div">>) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <motion.div {...props}>{children}</motion.div>;
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" {...props}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  ...props
}: Readonly<HTMLMotionProps<"div">>) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <motion.div {...props}>{children}</motion.div>;
  }

  return (
    <motion.div variants={item} {...props}>
      {children}
    </motion.div>
  );
}
