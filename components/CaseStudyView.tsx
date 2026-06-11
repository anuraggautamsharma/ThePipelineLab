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
      <header className="relative overflow-hidden border-b border-line bg-paper px-5 pb-16 pt-36 md:px-10 md:pb-20 md:pt-48">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[60vh] w-[60vh] rounded-full opacity-70 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(206,179,255,0.55), rgba(255,255,255,0))",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[88rem]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-xs font-medium text-ink-faint transition-colors hover:text-violet-600"
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
            className="eyebrow mb-5 mt-10"
          >
            {cs.industry}
          </motion.p>

          <h1 className="display max-w-5xl text-4xl text-ink md:text-7xl">
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
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-line pt-8"
          >
            <p className="eyebrow !text-ink-faint">System stack</p>
            <div className="flex flex-wrap items-center gap-3">
              {cs.stack.map((tool) => (
                <span
                  key={tool.name}
                  className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-soft px-4 py-2 text-xs font-semibold text-ink"
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
      <section className="bg-paper px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[88rem] gap-10 md:grid-cols-[1fr_2.5fr]">
          <motion.p {...fadeUp} className="eyebrow">
            01 — The challenge
          </motion.p>
          <motion.p
            {...fadeUp}
            className="display max-w-4xl text-2xl leading-snug text-ink md:text-4xl md:leading-[1.2]"
          >
            {cs.challenge}
          </motion.p>
        </div>
      </section>

      {/* ── The system ── */}
      <section className="border-y border-line bg-paper-soft px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[88rem]">
          <motion.p {...fadeUp} className="eyebrow mb-12">
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
                className="rounded-3xl border border-line bg-paper p-8 transition-shadow duration-500 hover:shadow-[0_30px_70px_-40px_rgba(60,19,178,0.35)]"
              >
                <span className="outline-num text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="bg-paper px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[88rem]">
          <motion.p {...fadeUp} className="eyebrow mb-12">
            03 — The results
          </motion.p>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {cs.results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease }}
                className="bg-paper px-8 py-10"
              >
                <p className="display text-5xl text-violet-600 md:text-6xl">{r.value}</p>
                <p className="mt-2 text-sm font-medium text-ink-soft">{r.label}</p>
              </motion.div>
            ))}
          </div>

          {cs.quote && (
            <motion.figure {...fadeUp} className="mx-auto mt-20 max-w-3xl text-center">
              <blockquote className="display text-2xl leading-snug text-ink md:text-3xl">
                &ldquo;{cs.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-violet-600">
                — {cs.quote.author}
              </figcaption>
            </motion.figure>
          )}
        </div>
      </section>

      {/* ── Next case + CTA ── */}
      <section className="border-t border-line bg-lavender px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto flex max-w-[88rem] flex-col items-center justify-between gap-10 md:flex-row">
          <Link href={`/case-studies/${next.slug}`} className="group" data-cursor>
            <p className="eyebrow mb-3 !text-ink-faint">Next case study</p>
            <p className="display text-3xl text-ink transition-colors duration-300 group-hover:text-violet-600 md:text-4xl">
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
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-violet-700"
            >
              Build yours — Book a Call <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </div>
      </section>
    </main>
  );
}
