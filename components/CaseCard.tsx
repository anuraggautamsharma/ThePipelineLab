"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { CaseStudy } from "@/lib/data";

const MotionLink = motion.create(Link);

/** Light tilt card linking to a case study detail page. */
export default function CaseCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <MotionLink
        ref={ref}
        href={`/case-studies/${cs.slug}`}
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        data-cursor
        className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-paper p-8 transition-all duration-500 hover:border-violet-300 hover:shadow-[0_30px_70px_-40px_rgba(60,19,178,0.4)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">{cs.client}</h3>
            <p className="eyebrow mt-1.5 !text-ink-faint">{cs.industry}</p>
          </div>
          <span className="text-xl text-ink-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-600">
            ↗
          </span>
        </div>
        <div className="mt-10">
          <p className="display text-5xl text-violet-600 md:text-6xl">{cs.metric}</p>
          <p className="mt-1.5 text-sm font-medium text-ink">{cs.metricLabel}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{cs.story}</p>
        </div>
        <p className="mt-6 border-t border-line pt-4 text-xs font-semibold tracking-wide text-violet-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Read the full story →
        </p>
      </MotionLink>
    </motion.div>
  );
}
