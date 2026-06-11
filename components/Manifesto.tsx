"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Most agencies sell activity — emails sent, lists scraped, hours billed. We engineer systems: data infrastructure, AI personalization and multichannel orchestration that compound with every send. Pipelines that don't leak.";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".manifesto-word",
        { opacity: 0.14, color: "#14101d" },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );
      gsap.to(".manifesto-highlight", {
        color: "#3c13b2",
        duration: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "center 60%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = TEXT.split(" ");
  const highlightFrom = words.indexOf("Pipelines");

  return (
    <section ref={ref} className="bg-paper px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow mb-10 text-violet-600">The thesis</p>
        <p className="display text-3xl leading-snug md:text-5xl md:leading-[1.18]">
          {words.map((w, i) => (
            <span
              key={i}
              className={`manifesto-word inline-block ${
                i >= highlightFrom ? "manifesto-highlight font-semibold" : ""
              }`}
            >
              {w}
              {i < words.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
