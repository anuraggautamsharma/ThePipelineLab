"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Violet progress bar tracking article scroll position. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[150] h-[3px] origin-left bg-violet-600"
      aria-hidden
    />
  );
}
