"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const YT_ID = "XL-wrU8nrZk";
const EMBED = `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&playsinline=1&rel=0`;

/**
 * The hero film: starts slightly inset, grows to full bleed as you scroll
 * into it — the page literally zooms into the work.
 */
export default function VideoFrame() {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // lazy-mount the iframe just before it scrolls into view
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShowVideo(true),
      { rootMargin: "400px" }
    );
    if (wrap.current) io.observe(wrap.current);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        frame.current,
        { scale: 0.88, borderRadius: 28 },
        {
          scale: 1,
          borderRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 85%",
            end: "top 12%",
            scrub: 0.6,
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
    <div ref={wrap} className="relative">
      <div
        ref={frame}
        className="relative aspect-video w-full overflow-hidden bg-lavender will-change-transform"
        style={{ borderRadius: 28 }}
        data-cursor
      >
        {/* poster sits underneath; the playing video simply covers it */}
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
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-[140%] -translate-x-1/2 -translate-y-1/2"
          />
        )}
        <div className="pointer-events-none absolute bottom-5 left-5 hidden items-center gap-2 rounded-full bg-paper/85 px-4 py-2 backdrop-blur md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-600 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-600" />
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink">
            The system, in motion
          </span>
        </div>
      </div>
    </div>
  );
}
