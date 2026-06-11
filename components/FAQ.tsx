"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-12 md:grid-cols-[1fr_1.8fr]">
        <div>
          <p className="eyebrow mb-5">07 — Questions</p>
          <h2 className="display text-4xl text-ink md:text-5xl">
            Before you <span className="accent">ask</span>
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">
            Anything else, bring it to the strategy call — it&rsquo;s 30 minutes
            and you&rsquo;ll leave with a plan either way.
          </p>
        </div>

        <div className="rule">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-ink md:text-lg">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-lg transition-colors ${
                      isOpen
                        ? "border-violet-600 bg-violet-600 text-lime-400"
                        : "border-line-strong text-violet-600"
                    }`}
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-ink-soft">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
