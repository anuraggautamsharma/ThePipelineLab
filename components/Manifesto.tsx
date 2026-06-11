"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Most agencies sell activity — emails sent, lists scraped, hours billed. We engineer systems: data infrastructure, AI personalization and multichannel orchestration that compound with every send.";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".manifesto-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = TEXT.split(" ");
  const highlightFrom = words.indexOf("We");

  return (
    <section ref={ref} className="border-y border-line bg-paper-soft px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
          <p className="eyebrow">01 — The thesis</p>
          <p className="display max-w-4xl text-3xl leading-snug text-ink md:text-5xl md:leading-[1.16]">
            {words.map((w, i) => (
              <span
                key={i}
                className={`manifesto-word inline-block ${
                  i >= highlightFrom && i < highlightFrom + 3 ? "text-violet-600" : ""
                }`}
              >
                {w}
                {i < words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
