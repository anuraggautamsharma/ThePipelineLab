"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/data";

const REVENUE_OPTIONS = [
  "Under $50K / month",
  "$50K – $100K / month",
  "$100K – $500K / month",
  "$500K+ / month",
];

const INTERESTS = [
  "Outbound Prospecting",
  "LinkedIn Ads (ABM)",
  "LinkedIn Content",
  "GTM Engineering",
];

const inputClass =
  "w-full rounded-xl border border-line-strong bg-paper px-4 py-3.5 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-violet-600 focus:ring-2 focus:ring-violet-600/15";

export default function ContactForm() {
  const [interests, setInterests] = useState<string[]>([]);

  const toggle = (i: string) =>
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Name: ${data.get("name")}`,
      `Work email: ${data.get("email")}`,
      `Company: ${data.get("company")}`,
      `Website: ${data.get("website")}`,
      `Monthly revenue: ${data.get("revenue")}`,
      `Interested in: ${interests.join(", ") || "—"}`,
      "",
      `${data.get("message")}`,
    ];
    window.location.href = `mailto:hello@thepipelinelab.com?subject=${encodeURIComponent(
      `GTM inquiry — ${data.get("company")}`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <section className="bg-paper-soft px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-line bg-paper p-7 md:p-12"
        >
          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-semibold text-ink">
                  Full name
                </label>
                <input id="name" name="name" required placeholder="Jane Smith" className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold text-ink">
                  Work email
                </label>
                <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputClass} />
              </div>
              <div>
                <label htmlFor="company" className="mb-2 block text-xs font-semibold text-ink">
                  Company
                </label>
                <input id="company" name="company" required placeholder="Acme Inc." className={inputClass} />
              </div>
              <div>
                <label htmlFor="website" className="mb-2 block text-xs font-semibold text-ink">
                  Website
                </label>
                <input id="website" name="website" placeholder="acme.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="revenue" className="mb-2 block text-xs font-semibold text-ink">
                Monthly revenue
              </label>
              <select id="revenue" name="revenue" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select a range
                </option>
                {REVENUE_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold text-ink">
                Which systems are you interested in?
              </p>
              <div className="flex flex-wrap gap-2.5">
                {INTERESTS.map((i) => {
                  const on = interests.includes(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggle(i)}
                      aria-pressed={on}
                      className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 ${
                        on
                          ? "border-violet-600 bg-violet-600 text-lime-400"
                          : "border-line-strong text-ink-soft hover:border-violet-600 hover:text-violet-600"
                      }`}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-semibold text-ink">
                What does your current GTM motion look like?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Team size, current channels, what's working and what isn't…"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-violet-700 sm:w-auto"
            >
              Send inquiry <span aria-hidden>→</span>
            </button>
          </form>
        </motion.div>

        {/* direct booking card */}
        <motion.aside
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-10 rounded-3xl bg-lavender p-7 md:p-10"
        >
          <div>
            <p className="eyebrow mb-4">Skip the form</p>
            <h2 className="display text-3xl text-ink">
              Book the strategy call directly
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              30 minutes. We&rsquo;ll audit your current motion, map your ICP and
              show you what your revenue engine would look like — plan included,
              whether we work together or not.
            </p>
            <ul className="mt-8 space-y-3">
              {["ICP & TAM mapping", "Channel strategy review", "System blueprint walkthrough"].map((x) => (
                <li key={x} className="flex items-center gap-3 text-sm font-medium text-ink">
                  <span className="h-1.5 w-1.5 rotate-45 bg-violet-600" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-violet-700"
          >
            Book Your Strategy Call <span aria-hidden>↗</span>
          </a>
        </motion.aside>
      </div>
    </section>
  );
}
