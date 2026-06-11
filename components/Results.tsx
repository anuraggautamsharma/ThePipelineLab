"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CASE_STUDIES } from "@/lib/data";

function TiltCard({ cs, index }: { cs: (typeof CASE_STUDIES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      data-cursor
      className="group flex flex-col justify-between rounded-3xl border border-line-dark bg-violet-900/35 p-8 backdrop-blur transition-colors duration-500 hover:border-lime-400/50 hover:bg-violet-900/60"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{cs.client}</h3>
          <p className="eyebrow mt-1 text-violet-300/70">{cs.industry}</p>
        </div>
        <span className="text-xl text-violet-300/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime-400">
          ↗
        </span>
      </div>
      <div className="mt-10">
        <p className="display text-5xl text-lime-400 md:text-6xl">{cs.metric}</p>
        <p className="mt-1 text-sm font-medium text-violet-100/85">{cs.metricLabel}</p>
        <p className="mt-4 text-sm leading-relaxed text-violet-100/55">{cs.story}</p>
      </div>
    </motion.div>
  );
}

export default function Results() {
  return (
    <section id="results" className="bg-violet-950 px-5 pb-28 pt-24 md:px-8 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-lime-400">Proof, not promises</p>
            <h2 className="display max-w-2xl text-4xl text-white md:text-6xl">
              Systems that already <span className="accent">shipped revenue</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-violet-100/60">
            Aerospace, healthcare, fintech, sustainability — considered-purchase
            markets where spray-and-pray dies. Exactly where engineered outbound wins.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <TiltCard key={cs.client} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
