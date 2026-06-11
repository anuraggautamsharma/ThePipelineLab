"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

/** Pinned horizontal scroll through the four build phases. */
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
        ".process-progress",
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
    <section ref={section} id="process" className="overflow-hidden bg-violet-950">
      <div className="flex h-auto flex-col justify-center py-24 md:h-screen md:py-0">
        <div className="mx-auto mb-12 w-full max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-4 text-lime-400">How it ships</p>
          <h2 className="display text-4xl text-white md:text-6xl">
            From kickoff to <span className="accent">compounding</span>
          </h2>
          <div className="mt-8 h-px w-full bg-violet-800">
            <div className="process-progress h-full origin-left bg-lime-400" />
          </div>
        </div>

        <div
          ref={track}
          className="flex flex-col gap-6 px-5 md:flex-row md:gap-8 md:px-[8vw]"
        >
          {PROCESS.map((p, i) => (
            <article
              key={p.step}
              className="group relative w-full shrink-0 rounded-3xl border border-line-dark bg-violet-900/40 p-8 backdrop-blur transition-colors duration-500 hover:border-lime-400/40 md:w-[42vw] md:p-12"
            >
              <span className="font-mono text-7xl font-bold text-violet-800 transition-colors duration-500 group-hover:text-violet-600 md:text-8xl">
                {p.step}
              </span>
              <h3 className="display mt-6 text-2xl text-white md:text-3xl">
                {p.title}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-violet-100/70">
                {p.body}
              </p>
              {i < PROCESS.length - 1 && (
                <span
                  className="absolute right-8 top-10 hidden text-2xl text-lime-400/60 md:block"
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
