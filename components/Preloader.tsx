"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Violet curtain with a lime progress counter, lifts to reveal the site. */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      return;
    }
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-violet-950"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow text-violet-300"
            >
              The Pipeline Lab
            </motion.p>
          </div>
          <p className="display mt-4 text-7xl text-lime-400 tabular-nums md:text-8xl">
            {progress}
            <span className="text-3xl text-violet-300 md:text-4xl">%</span>
          </p>
          <div className="mt-8 h-px w-48 overflow-hidden bg-violet-800">
            <div
              className="h-full bg-lime-400 transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
