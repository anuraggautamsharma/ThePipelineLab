import { CLIENT_MARQUEE } from "@/lib/data";

export default function LogoMarquee() {
  const items = [...CLIENT_MARQUEE, ...CLIENT_MARQUEE];
  return (
    <section className="bg-paper py-12 md:py-16">
      <p className="eyebrow mb-8 text-center !text-ink-faint">
        Trusted by teams in aerospace · healthcare · fintech · SaaS
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track" style={{ "--marquee-duration": "42s" } as React.CSSProperties}>
          {items.map((name, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-8 whitespace-nowrap text-xl font-semibold tracking-tight text-ink/30"
            >
              {name}
              <span className="h-1.5 w-1.5 rotate-45 bg-lime-400" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
