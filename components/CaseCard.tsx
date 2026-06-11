"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { CaseStudy } from "@/lib/data";

const MotionLink = motion.create(Link);

/** 3D-tilt case study card linking to its detail page. */
export default function CaseCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
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
        className="group flex h-full flex-col justify-between rounded-3xl border border-line-dark bg-violet-900/35 p-8 backdrop-blur transition-colors duration-500 hover:border-lime-400/50 hover:bg-violet-900/60"
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
        <p className="mt-6 border-t border-line-dark pt-4 text-xs font-semibold tracking-wide text-lime-400/0 transition-colors duration-300 group-hover:text-lime-400">
          Read the full story →
        </p>
      </MotionLink>
    </motion.div>
  );
}
