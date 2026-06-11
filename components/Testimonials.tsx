"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="border-y border-line bg-paper-soft px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_3fr]">
          <p className="eyebrow">06 — Word on the street</p>
          <h2 className="display max-w-2xl text-4xl text-ink md:text-6xl">
            Operators who <span className="accent">stopped leaking</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between rounded-3xl border border-line bg-paper p-8 transition-shadow duration-500 hover:shadow-[0_30px_70px_-40px_rgba(60,19,178,0.35)]"
            >
              <div>
                <span className="font-mono text-4xl text-violet-300" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-[15px] leading-relaxed text-ink">
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="mt-8 border-t border-line pt-5">
                <p className="text-sm font-semibold text-violet-600">{t.name}</p>
                <p className="mt-0.5 text-xs text-ink-faint">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
