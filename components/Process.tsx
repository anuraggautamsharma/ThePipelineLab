"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal journey through the four build phases.
 * A violet pipeline literally fills across the section as you progress.
 */
export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo(
        ".process-pipe",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
          },
        }
      );
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="process" className="overflow-hidden border-y border-line bg-paper">
      <div className="flex h-auto flex-col justify-center py-24 md:h-screen md:py-0">
        <div className="mx-auto mb-14 w-full max-w-[88rem] px-5 md:px-10">
          <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
            <p className="eyebrow">03 — How it ships</p>
            <div>
              <h2 className="display text-4xl text-ink md:text-6xl">
                From kickoff to <span className="accent">compounding</span>
              </h2>
              {/* the pipeline */}
              <div className="relative mt-10 h-[3px] w-full rounded bg-line">
                <div className="process-pipe absolute inset-0 origin-left rounded bg-violet-600" />
                <span className="absolute -right-0.5 -top-[5px] h-3.5 w-3.5 rounded-full border-[3px] border-violet-600 bg-paper" />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={track}
          className="flex flex-col gap-6 px-5 md:flex-row md:gap-8 md:px-[10vw]"
        >
          {PROCESS.map((p, i) => (
            <article
              key={p.step}
              className="group relative w-full shrink-0 rounded-3xl border border-line bg-paper p-8 transition-all duration-500 hover:border-violet-300 hover:shadow-[0_30px_70px_-40px_rgba(60,19,178,0.35)] md:w-[40vw] md:p-12"
            >
              <span className="outline-num text-7xl md:text-8xl">{p.step}</span>
              <h3 className="display mt-6 text-2xl text-ink md:text-3xl">{p.title}</h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
                {p.body}
              </p>
              {i < PROCESS.length - 1 && (
                <span
                  className="absolute right-8 top-10 hidden text-2xl text-violet-300 transition-colors duration-300 group-hover:text-violet-600 md:block"
                  aria-hidden
                >
                  →
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
