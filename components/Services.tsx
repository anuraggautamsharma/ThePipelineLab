"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/lib/data";

/** Accordion-style service rows: hover/tap expands the system details. */
export default function Services() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="systems" className="bg-violet-50 px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-violet-600">What we build</p>
            <h2 className="display max-w-2xl text-4xl md:text-6xl">
              Four systems.
              <br />
              One <span className="accent-violet">revenue engine.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-700">
            Each system works alone. Together they surround your market —
            outbound starts conversations, ABM warms the committee, content
            compounds trust, engineering ties it all into one machine.
          </p>
        </div>

        <div className="border-t border-violet-300/50">
          {SERVICES.map((s, i) => {
            const open = active === i;
            return (
              <div
                key={s.index}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(open ? null : i)}
                data-cursor
                className={`group cursor-pointer border-b border-violet-300/50 transition-colors duration-500 ${
                  open ? "bg-violet-600" : "bg-transparent hover:bg-violet-100/60"
                }`}
              >
                <div className="flex items-baseline gap-6 px-2 py-7 md:gap-12 md:px-6">
                  <span
                    className={`font-mono text-sm transition-colors duration-500 ${
                      open ? "text-lime-400" : "text-violet-600/60"
                    }`}
                  >
                    {s.index}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3
                        className={`display text-2xl transition-colors duration-500 md:text-4xl ${
                          open ? "text-white" : "text-ink-900"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <span
                        className={`eyebrow transition-colors duration-500 ${
                          open ? "text-violet-300" : "text-ink-500"
                        }`}
                      >
                        {s.tag}
                      </span>
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
                          <div className="grid gap-6 pb-4 pt-6 md:grid-cols-[1.4fr_1fr] md:gap-16">
                            <p className="max-w-xl text-[15px] leading-relaxed text-violet-100/85">
                              {s.description}
                            </p>
                            <ul className="space-y-2.5">
                              {s.points.map((p) => (
                                <li
                                  key={p}
                                  className="flex items-center gap-3 text-sm font-medium text-white"
                                >
                                  <span className="h-1.5 w-1.5 rotate-45 bg-lime-400" />
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
                        ? "rotate-45 text-lime-400"
                        : "text-violet-600/50 group-hover:translate-x-1"
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
