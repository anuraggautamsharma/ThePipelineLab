"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate, type Post } from "@/lib/blog-shared";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FeaturedCard({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease }}
    >
      <Link
        href={`/blog/${post.slug}`}
        data-cursor
        className="group grid overflow-hidden rounded-3xl border border-line bg-paper transition-all duration-500 hover:border-violet-300 hover:shadow-[0_30px_70px_-40px_rgba(60,19,178,0.4)] md:grid-cols-[1.2fr_1fr]"
      >
        <div className="flex flex-col justify-between p-8 md:p-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-lime-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                Latest
              </span>
              {post.tags.map((t) => (
                <span key={t} className="eyebrow !text-ink-faint">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="display mt-6 text-3xl text-ink transition-colors duration-300 group-hover:text-violet-600 md:text-5xl">
              {post.title}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              {post.description}
            </p>
          </div>
          <div className="mt-10 flex items-center gap-4 text-xs font-medium text-ink-faint">
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-violet-300" />
            <span>{post.readingTime} min read</span>
            <span className="ml-auto text-xl text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-600">
              →
            </span>
          </div>
        </div>
        <div className="relative hidden items-center justify-center overflow-hidden border-l border-line bg-lavender md:flex">
          <span className="outline-num select-none text-[10rem] transition-transform duration-700 group-hover:scale-110">
            ¶
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        data-cursor
        className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-paper p-8 transition-all duration-500 hover:border-violet-300 hover:shadow-[0_30px_70px_-40px_rgba(60,19,178,0.4)]"
      >
        <div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold text-violet-600"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="display mt-6 text-2xl text-ink transition-colors duration-300 group-hover:text-violet-600">
            {post.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            {post.description}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-3 border-t border-line pt-5 text-xs font-medium text-ink-faint">
          <span>{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-violet-300" />
          <span>{post.readingTime} min read</span>
          <span className="ml-auto transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-600">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
