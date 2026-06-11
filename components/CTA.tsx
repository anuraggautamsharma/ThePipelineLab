"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CALENDLY_URL } from "@/lib/data";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-line > span",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-lavender px-5 py-32 text-center md:px-10 md:py-44"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(206,179,255,0.8), rgba(244,238,255,0))",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="eyebrow mb-8">One call. Zero fluff.</p>
        <h2 className="display text-5xl text-ink md:text-8xl">
          <span className="line-mask cta-line">
            <span>Stop renting leads.</span>
          </span>
          <span className="line-mask cta-line">
            <span>
              <span className="accent">Own the system.</span>
            </span>
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-ink-soft">
          A 30-minute GTM strategy call. We&rsquo;ll map your ICP, audit your
          current motion and show you exactly what your engine would look like.
        </p>
        <div className="mt-12 flex justify-center">
          <Magnetic strength={0.45}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-violet-600 px-10 py-5 text-base font-semibold text-white transition-colors duration-300 hover:bg-violet-700"
            >
              Book Your Strategy Call <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
