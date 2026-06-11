"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CALENDLY_URL, STATS } from "@/lib/data";
import Magnetic from "./Magnetic";
import VideoFrame from "./VideoFrame";

const PipelineCanvas = dynamic(() => import("./three/PipelineCanvas"), {
  ssr: false,
});

const REVEAL_DELAY = 1.3; // after preloader lifts

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
        ".marker-swash",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power3.out", delay: REVEAL_DELAY + 0.9 }
      );
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: REVEAL_DELAY + 0.45,
        }
      );

      const counters = statsRef.current?.querySelectorAll<HTMLElement>("[data-count]");
      counters?.forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="top" className="relative overflow-hidden bg-paper">
      {/* airy particle field, upper right */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[88vh] opacity-40 md:opacity-70" aria-hidden>
        <PipelineCanvas />
      </div>

      <div className="relative z-10 mx-auto max-w-[88rem] px-5 pt-32 md:px-10 md:pt-44">
        <p className="hero-fade eyebrow mb-8 opacity-0">
          GTM Engineering · Outbound — ABM — Content
        </p>

        <h1 className="display text-[14vw] leading-[0.98] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <span className="line-mask hero-line">
            <span>
              Pipelines that{" "}
              <span className="marker">
                <span className="marker-swash" aria-hidden />
                <span className="marker-ink">don&rsquo;t</span>
              </span>{" "}
              leak.
            </span>
          </span>
          <span className="line-mask hero-line">
            <span>
              Systems that <span className="accent">compound.</span>
            </span>
          </span>
        </h1>

        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-[15px] leading-relaxed text-ink-soft opacity-0">
            The Pipeline Lab engineers AI-powered revenue systems for B2B
            companies — data, deliverability and multichannel orchestration
            that fill your calendar with qualified meetings.
          </p>

          <div className="hero-fade flex flex-wrap items-center gap-4 opacity-0">
            <Magnetic>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-violet-700"
              >
                Book a Strategy Call <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <a
              href="#systems"
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-4 text-sm font-medium text-ink transition-colors hover:border-violet-600 hover:text-violet-600"
            >
              Explore the systems
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* the film */}
      <div className="relative z-10 mx-auto mt-16 max-w-[88rem] px-5 md:mt-24 md:px-10">
        <VideoFrame />
      </div>

      {/* stats — hairline grid */}
      <div
        ref={statsRef}
        className="relative z-10 mx-auto mt-16 grid max-w-[88rem] grid-cols-2 gap-y-10 border-y border-line px-5 py-10 md:mt-24 md:grid-cols-4 md:px-10 md:py-14"
      >
        {STATS.map((s, i) => (
          <div key={s.label} className={i > 0 ? "md:border-l md:border-line md:pl-10" : ""}>
            <p className="display text-4xl text-ink md:text-5xl">
              {s.prefix}
              <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                0
              </span>
              <span className="text-violet-600">{s.suffix}</span>
            </p>
            <p className="mt-2 text-xs font-medium tracking-wide text-ink-faint">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
