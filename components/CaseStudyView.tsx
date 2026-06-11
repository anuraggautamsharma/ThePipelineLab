"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CALENDLY_URL, type CaseStudy } from "@/lib/data";
import Magnetic from "./Magnetic";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease },
};

export default function CaseStudyView({
  cs,
  next,
}: {
  cs: CaseStudy;
  next: CaseStudy;
}) {
  return (
    <main>
      {/* ── Hero ── */}
      <header className="relative overflow-hidden bg-violet-950 px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className="pointer-events-none absolute -left-32 top-[-30%] h-[55vh] w-[55vh] rounded-full bg-violet-600/30 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[-30%] right-[-10%] h-[45vh] w-[45vh] rounded-full bg-lime-400/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-xs font-medium text-violet-300/70 transition-colors hover:text-lime-400"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              All case studies
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="eyebrow mb-5 mt-10 text-lime-400"
          >
            {cs.industry}
          </motion.p>

          <h1 className="display max-w-4xl text-4xl text-white md:text-7xl">
            <span className="line-mask">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.15, ease }}
              >
                How {cs.client} unlocked
              </motion.span>
            </span>
            <span className="line-mask">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.28, ease }}
              >
                <span className="accent">
                  {cs.metric} {cs.metricLabel}
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-line-dark pt-8"
          >
            <p className="eyebrow text-violet-300/60">System stack</p>
            <div className="flex flex-wrap items-center gap-3">
              {cs.stack.map((tool) => (
                <span
                  key={tool.name}
                  className="inline-flex items-center gap-2.5 rounded-full border border-line-dark bg-violet-900/50 px-4 py-2 text-xs font-semibold text-violet-100"
                >
                  <Image
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] rounded object-contain"
                    unoptimized
                  />
                  {tool.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Challenge ── */}
      <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_2fr]">
          <motion.p {...fadeUp} className="eyebrow text-violet-600">
            01 — The challenge
          </motion.p>
          <motion.p
            {...fadeUp}
            className="display text-2xl leading-snug text-ink-900 md:text-4xl md:leading-[1.2]"
          >
            {cs.challenge}
          </motion.p>
        </div>
      </section>

      {/* ── The system ── */}
      <section className="bg-violet-50 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.p {...fadeUp} className="eyebrow mb-12 text-violet-600">
            02 — The system we engineered
          </motion.p>
          <div className="grid gap-5 md:grid-cols-2">
            {cs.approach.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease }}
                className="rounded-3xl border border-violet-300/40 bg-paper p-8 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(60,19,178,0.35)]"
              >
                <span className="font-mono text-sm font-bold text-violet-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-700">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="bg-violet-950 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.p {...fadeUp} className="eyebrow mb-12 text-lime-400">
            03 — The results
          </motion.p>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line-dark bg-line-dark md:grid-cols-3">
            {cs.results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease }}
                className="bg-violet-950 px-8 py-10"
              >
                <p className="display text-5xl text-lime-400 md:text-6xl">{r.value}</p>
                <p className="mt-2 text-sm font-medium text-violet-100/75">{r.label}</p>
              </motion.div>
            ))}
          </div>

          {cs.quote && (
            <motion.figure {...fadeUp} className="mx-auto mt-20 max-w-3xl text-center">
              <blockquote className="display text-2xl leading-snug text-white md:text-3xl">
                &ldquo;{cs.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-violet-300/80">
                — {cs.quote.author}
              </figcaption>
            </motion.figure>
          )}
        </div>
      </section>

      {/* ── Next case + CTA ── */}
      <section className="border-t border-line-dark bg-violet-950 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 md:flex-row">
          <Link href={`/case-studies/${next.slug}`} className="group" data-cursor>
            <p className="eyebrow mb-3 text-violet-300/60">Next case study</p>
            <p className="display text-3xl text-white transition-colors duration-300 group-hover:text-lime-400 md:text-4xl">
              {next.client}{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </p>
          </Link>
          <Magnetic>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-8 py-4 text-sm font-semibold text-violet-950 transition-transform duration-300 hover:scale-105"
            >
              Build yours — Book a Call <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </div>
      </section>
    </main>
  );
}
