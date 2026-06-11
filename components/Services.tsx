"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/lib/data";

/** Editorial index of the four systems; rows expand on hover/tap. */
export default function Services() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="systems" className="bg-paper px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_3fr]">
          <p className="eyebrow">02 — What we build</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="display max-w-2xl text-4xl text-ink md:text-6xl">
              Four systems.
              <br />
              One <span className="accent">revenue engine.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Each works alone. Together they surround your market — outbound
              starts conversations, ABM warms the committee, content compounds
              trust, engineering ties it into one machine.
            </p>
          </div>
        </div>

        <div className="rule">
          {SERVICES.map((s, i) => {
            const open = active === i;
            return (
              <div
                key={s.index}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(open ? null : i)}
                data-cursor
                className={`group cursor-pointer border-b border-line transition-colors duration-500 ${
                  open ? "bg-lavender" : "hover:bg-paper-soft"
                }`}
              >
                <div className="flex items-baseline gap-5 px-2 py-8 md:gap-12 md:px-8">
                  <span
                    className={`outline-num shrink-0 text-4xl transition-all duration-500 md:text-6xl ${
                      open ? "!text-violet-600" : ""
                    }`}
                    style={open ? { WebkitTextStroke: "0" } : undefined}
                  >
                    {s.index}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="display text-2xl text-ink md:text-4xl">
                        {s.title}
                      </h3>
                      <span className="eyebrow !text-ink-faint">{s.tag}</span>
                    </div>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-6 pb-4 pt-7 md:grid-cols-[1.4fr_1fr] md:gap-16">
                            <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
                              {s.description}
                            </p>
                            <ul className="space-y-3">
                              {s.points.map((p) => (
                                <li
                                  key={p}
                                  className="flex items-center gap-3 text-sm font-medium text-ink"
                                >
                                  <span className="h-1.5 w-1.5 rotate-45 bg-violet-600" />
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <span
                    className={`hidden text-2xl transition-all duration-500 md:block ${
                      open
                        ? "rotate-45 text-violet-600"
                        : "text-ink-faint group-hover:translate-x-1 group-hover:text-ink"
                    }`}
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
