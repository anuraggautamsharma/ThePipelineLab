import Link from "next/link";
import { CALENDLY_URL, FOOTER_TAGLINE, NAV_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-5 pb-10 pt-20 md:px-10">
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 text-ink">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-600 font-mono text-base font-bold text-lime-400">
                P
              </span>
              <span className="font-semibold tracking-tight">
                The Pipeline Lab<span className="text-violet-600">.</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              {FOOTER_TAGLINE}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="eyebrow mb-5 !text-ink-faint">Explore</p>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-soft transition-colors hover:text-violet-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5 !text-ink-faint">Connect</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-soft transition-colors hover:text-violet-600"
                  >
                    Book a call
                  </a>
                </li>
                <li>
                  <Link
                    href="/get-in-touch"
                    className="text-sm text-ink-soft transition-colors hover:text-violet-600"
                  >
                    Get in touch
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@thepipelinelab.com"
                    className="text-sm text-ink-soft transition-colors hover:text-violet-600"
                  >
                    hello@thepipelinelab.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/thepipelinelab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-soft transition-colors hover:text-violet-600"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p
          className="outline-num mt-20 select-none text-center text-[11vw] leading-none opacity-50"
          aria-hidden
        >
          PIPELINE LAB
        </p>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint md:flex-row">
          <p>© {new Date().getFullYear()} The Pipeline Lab. All rights reserved.</p>
          <p>Pipelines that don&rsquo;t leak.</p>
        </div>
      </div>
    </footer>
  );
}
