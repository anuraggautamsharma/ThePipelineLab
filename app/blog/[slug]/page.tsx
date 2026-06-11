import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { CALENDLY_URL } from "@/lib/data";
import ReadingProgress from "@/components/ReadingProgress";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — The Pipeline Lab`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://thepipelinelab.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const next = posts[(index + 1) % posts.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "The Pipeline Lab", url: "https://thepipelinelab.com" },
    publisher: { "@type": "Organization", name: "The Pipeline Lab" },
    mainEntityOfPage: `https://thepipelinelab.com/blog/${post.slug}`,
  };

  return (
    <main>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden bg-violet-950 px-5 pb-16 pt-36 md:px-8 md:pb-20 md:pt-44">
        <div className="pointer-events-none absolute -left-32 top-[-30%] h-[55vh] w-[55vh] rounded-full bg-violet-600/30 blur-[140px]" />
        <div className="pointer-events-none absolute right-[-10%] top-[30%] h-[40vh] w-[40vh] rounded-full bg-lime-400/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-medium text-violet-300/70 transition-colors hover:text-lime-400"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            All posts
          </Link>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line-dark px-3 py-1 text-[11px] font-semibold text-lime-400"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="display mt-6 text-4xl text-white md:text-6xl">
            {post.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium text-violet-300/70">
            <span>{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-violet-300/40" />
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-violet-300/40" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* ── Article ── */}
      <article className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <div className="prose prose-tpl mx-auto max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {/* inline CTA */}
        <aside className="mx-auto mt-16 max-w-3xl rounded-3xl bg-violet-950 p-8 md:p-10">
          <p className="eyebrow mb-3 text-lime-400">Put this to work</p>
          <p className="display text-2xl text-white md:text-3xl">
            Want this engineered for you instead?
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-violet-100/65">
            We build these systems end-to-end — data, deliverability,
            multichannel orchestration. 30 minutes, and you&rsquo;ll leave with a
            blueprint either way.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 text-sm font-semibold text-violet-950 transition-transform duration-300 hover:scale-[1.04]"
          >
            Book a Strategy Call <span aria-hidden>↗</span>
          </a>
        </aside>
      </article>

      {/* ── Next post ── */}
      <section className="border-t border-line-dark bg-violet-950 px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-8">
          <Link href={`/blog/${next.slug}`} className="group min-w-0" data-cursor>
            <p className="eyebrow mb-3 text-violet-300/60">Read next</p>
            <p className="display truncate text-xl text-white transition-colors duration-300 group-hover:text-lime-400 md:text-3xl">
              {next.title}
            </p>
          </Link>
          <span className="shrink-0 text-2xl text-lime-400" aria-hidden>
            →
          </span>
        </div>
      </section>
    </main>
  );
}
