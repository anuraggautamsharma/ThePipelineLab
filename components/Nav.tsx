"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Link from "next/link";
import { CALENDLY_URL, NAV_LINKS } from "@/lib/data";
import Magnetic from "./Magnetic";

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (y) => {
      const prev = scrollY.getPrevious() ?? 0;
      setHidden(y > prev && y > 160 && !open);
      setScrolled(y > 24);
    });
  }, [scrollY, open]);

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        scrolled || open
          ? "bg-paper/85 backdrop-blur-xl border-b border-line"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[88rem] items-center justify-between px-5 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 font-mono text-sm font-bold text-lime-400">
            P
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            The Pipeline Lab<span className="text-violet-600">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group relative text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-lime-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Magnetic strength={0.25}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-colors duration-300 hover:bg-violet-600"
            >
              Book a Strategy Call
              <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
            className="h-px w-6 bg-ink"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
            className="h-px w-6 bg-ink"
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-6">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2.5 text-xl font-medium text-ink"
                  >
                    <span className="font-mono text-[11px] text-violet-600">
                      0{i + 1}
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper"
                >
                  Book a Strategy Call <span aria-hidden>↗</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
