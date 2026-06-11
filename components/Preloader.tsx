"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Minimal white curtain: wordmark + violet hairline progress, lifts away. */
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
    const duration = 1050;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setDone(true), 180);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-paper"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="display text-2xl text-ink md:text-3xl"
            >
              The Pipeline Lab<span className="text-violet-600">.</span>
            </motion.p>
          </div>
          <div className="mt-8 h-px w-44 bg-line">
            <div
              className="h-full bg-violet-600 transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="eyebrow mt-4 text-ink-faint">{progress}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
