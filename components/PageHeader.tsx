"use client";

import { motion } from "framer-motion";

/** Light editorial page hero shared by interior pages. */
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
    <header className="relative overflow-hidden border-b border-line bg-paper px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[60vh] w-[60vh] rounded-full opacity-70 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(206,179,255,0.55), rgba(255,255,255,0))",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[88rem]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-6"
        >
          {eyebrow}
        </motion.p>
        <h1 className="display text-5xl text-ink md:text-8xl">
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
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink-soft"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </header>
  );
}
