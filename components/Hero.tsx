"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { CALENDLY_URL, STATS } from "@/lib/data";
import Magnetic from "./Magnetic";

const PipelineCanvas = dynamic(() => import("./three/PipelineCanvas"), {
  ssr: false,
});

const REVEAL_DELAY = 1.75; // after preloader lifts

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line > span",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          delay: REVEAL_DELAY,
        }
      );
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: REVEAL_DELAY + 0.55,
        }
      );

      // count-up stats — the numbers on the old site rendered as 0; never again
      const counters = statsRef.current?.querySelectorAll<HTMLElement>("[data-count]");
      counters?.forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          delay: REVEAL_DELAY + 0.8,
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-violet-950"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-[-20%] h-[60vh] w-[60vh] rounded-full bg-violet-600/30 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[30%] h-[50vh] w-[50vh] rounded-full bg-lime-400/10 blur-[160px]" />

      <motion.div
        style={{ opacity: canvasOpacity }}
        className="absolute inset-0"
        aria-hidden
      >
        <PipelineCanvas />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-36 md:px-8"
      >
        <p className="hero-fade eyebrow mb-6 text-lime-400 opacity-0">
          GTM Engineering for B2B — Outbound · ABM · Content
        </p>

        <h1 className="display max-w-5xl text-[13vw] text-white sm:text-7xl md:text-8xl lg:text-[6.5rem]">
          <span className="line-mask hero-line">
            <span>Tomorrow&rsquo;s GTM systems.</span>
          </span>
          <span className="line-mask hero-line">
            <span>
              <span className="accent">Engineered</span> today.
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-[15px] leading-relaxed text-violet-100/75 opacity-0">
            The Pipeline Lab builds AI-powered revenue engines for B2B
            companies — data, deliverability, multichannel orchestration — so
            your calendar fills with qualified meetings, not noise.
          </p>

          <div className="hero-fade flex flex-wrap items-center gap-4 opacity-0">
            <Magnetic>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-4 text-sm font-semibold text-violet-950 transition-transform duration-300 hover:scale-[1.04]"
              >
                Book a Strategy Call <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <a
              href="#systems"
              className="group inline-flex items-center gap-2 rounded-full border border-violet-300/30 px-7 py-4 text-sm font-medium text-violet-100 transition-colors hover:border-lime-400 hover:text-lime-400"
            >
              Explore the system
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </div>

        <div
          ref={statsRef}
          className="hero-fade mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark opacity-0 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-violet-950/80 px-6 py-6 backdrop-blur">
              <p className="display text-3xl text-white md:text-4xl">
                {s.prefix}
                <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                  0
                </span>
                <span className="text-lime-400">{s.suffix}</span>
              </p>
              <p className="mt-1.5 text-xs font-medium tracking-wide text-violet-300/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
