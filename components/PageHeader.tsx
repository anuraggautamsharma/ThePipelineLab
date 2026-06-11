"use client";

import { motion } from "framer-motion";

/** Dark violet page hero shared by interior pages. */
export default function PageHeader({
  eyebrow,
  titleTop,
  titleAccent,
  sub,
}: {
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  sub?: string;
}) {
  return (
    <header className="relative overflow-hidden px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute -left-32 top-[-30%] h-[55vh] w-[55vh] rounded-full bg-violet-600/30 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[40vh] w-[40vh] rounded-full bg-lime-400/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-6 text-lime-400"
        >
          {eyebrow}
        </motion.p>
        <h1 className="display text-5xl text-white md:text-8xl">
          <span className="line-mask">
            <motion.span
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {titleTop}
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            >
              <span className="accent">{titleAccent}</span>
            </motion.span>
          </span>
        </h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-violet-100/70"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </header>
  );
}
