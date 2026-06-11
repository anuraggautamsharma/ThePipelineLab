"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const YT_ID = "XL-wrU8nrZk";
const EMBED = `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&playsinline=1&rel=0`;

/**
 * Full-bleed cinematic band. The media drifts with a slow internal parallax
 * as it crosses the viewport — quiet, not showy.
 */
export default function VideoFrame() {
  const wrap = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShowVideo(true),
      { rootMargin: "400px" }
    );
    if (wrap.current) io.observe(wrap.current);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        media.current,
        { yPercent: -7, scale: 1.12 },
        {
          yPercent: 7,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          },
        }
      );
    });

    return () => {
      io.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative aspect-[16/9] w-full overflow-hidden bg-lavender md:aspect-[21/9]"
      data-cursor
    >
      <div ref={media} className="absolute inset-0 will-change-transform">
        <Image
          src="/video-poster.png"
          alt="The Pipeline Lab — showreel"
          fill
          priority
          className="object-cover"
        />
        {showVideo && (
          <iframe
            src={EMBED}
            title="The Pipeline Lab showreel"
            allow="autoplay; encrypted-media; picture-in-picture"
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-[160%] -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>
    </div>
  );
}
