import Link from "next/link";
import { CALENDLY_URL, FOOTER_TAGLINE, NAV_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line-dark bg-violet-950 px-5 pb-10 pt-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime-400 font-mono text-base font-bold text-violet-950">
                P
              </span>
              <span className="font-semibold tracking-tight">
                The Pipeline Lab<span className="text-lime-400">.</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-violet-100/60">
              {FOOTER_TAGLINE}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="eyebrow mb-5 text-violet-300/60">Explore</p>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-violet-100/75 transition-colors hover:text-lime-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5 text-violet-300/60">Connect</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-violet-100/75 transition-colors hover:text-lime-400"
                  >
                    Book a call
                  </a>
                </li>
                <li>
                  <Link
                    href="/get-in-touch"
                    className="text-sm text-violet-100/75 transition-colors hover:text-lime-400"
                  >
                    Get in touch
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@thepipelinelab.com"
                    className="text-sm text-violet-100/75 transition-colors hover:text-lime-400"
                  >
                    hello@thepipelinelab.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/thepipelinelab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-violet-100/75 transition-colors hover:text-lime-400"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p
          className="display mt-20 select-none text-center text-[11.5vw] leading-none text-violet-900"
          aria-hidden
        >
          PIPELINE LAB
        </p>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line-dark pt-6 text-xs text-violet-100/40 md:flex-row">
          <p>© {new Date().getFullYear()} The Pipeline Lab. All rights reserved.</p>
          <p>Pipelines that don&rsquo;t leak.</p>
        </div>
      </div>
    </footer>
  );
}
