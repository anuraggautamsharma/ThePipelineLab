"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CALENDLY_URL, SERVICES, STATS } from "@/lib/data";
import Magnetic from "./Magnetic";
import VideoFrame from "./VideoFrame";

gsap.registerPlugin(ScrollTrigger);

const PipelineCanvas = dynamic(() => import("./three/PipelineCanvas"), {
  ssr: false,
});

const REVEAL_DELAY = 1.25; // after preloader lifts

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line > span",
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          delay: REVEAL_DELAY,
        }
      );
      gsap.fromTo(
        ".hero-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          delay: REVEAL_DELAY + 0.2,
          transformOrigin: "left center",
        }
      );
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: REVEAL_DELAY + 0.5,
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
      {/* quiet stream-line field */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-50 md:opacity-100"
        aria-hidden
      >
        <PipelineCanvas />
      </div>

      <div className="relative z-10 mx-auto max-w-[88rem] px-5 md:px-10">
        {/* meta row */}
        <div className="hero-fade flex items-baseline justify-between pt-32 opacity-0 md:pt-44">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint">
            The Pipeline Lab<span className="text-violet-600">®</span> — GTM
            Engineering
          </p>
          <p className="hidden font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-ink-faint md:block">
            B2B · Worldwide
          </p>
        </div>
        <div className="hero-rule rule mt-5" />

        {/* headline — asymmetric editorial setting */}
        <h1 className="display mt-14 text-[13.5vw] leading-[0.96] text-ink sm:text-8xl lg:text-[8.5rem] md:mt-20">
          <span className="line-mask hero-line">
            <span>Revenue systems,</span>
          </span>
          <span className="line-mask hero-line md:pl-[18%]">
            <span>
              <span className="accent">engineered.</span>
            </span>
          </span>
        </h1>

        {/* sub row: copy left, index of systems right */}
        <div className="mt-14 grid gap-10 pb-16 md:mt-24 md:grid-cols-[1fr_1fr_1fr] md:pb-24">
          <div className="hero-fade opacity-0 md:col-span-1">
            <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
              We build the data, deliverability and multichannel infrastructure
              that fills B2B calendars with qualified meetings — systems you
              own, not activity you rent.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Magnetic strength={0.25}>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper transition-colors duration-300 hover:bg-violet-600"
                >
                  Book a Strategy Call <span aria-hidden>↗</span>
                </a>
              </Magnetic>
              <a
                href="/case-studies"
                className="group text-sm font-medium text-ink"
              >
                View the work
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                <span className="mt-0.5 block h-px w-full origin-left bg-ink transition-transform duration-300 group-hover:scale-x-0" />
              </a>
            </div>
          </div>

          <div className="hidden md:block" />

          <div className="hero-fade opacity-0">
            <ul>
              {SERVICES.map((s) => (
                <li
                  key={s.index}
                  className="flex items-baseline justify-between border-b border-line py-3 first:border-t"
                >
                  <span className="text-sm font-medium text-ink">{s.title}</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-faint">
                    {s.index}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* the film — full-bleed band */}
      <div className="relative z-10">
        <VideoFrame />
        <div className="mx-auto flex max-w-[88rem] items-baseline justify-between px-5 py-5 md:px-10">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink-faint">
            Showreel — The system, in motion
          </p>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink-faint">
            ©{new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* stats — hairline grid */}
      <div
        ref={statsRef}
        className="relative z-10 mx-auto grid max-w-[88rem] grid-cols-2 gap-y-10 border-t border-line px-5 py-10 md:grid-cols-4 md:px-10 md:py-14"
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
