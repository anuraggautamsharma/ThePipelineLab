import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "./blog-shared";

export { formatDate, type Post } from "./blog-shared";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const words = content.trim().split(/\s+/).length;
      return {
        slug: file.replace(/\.mdx?$/, ""),
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        date: data.date ?? "1970-01-01",
        tags: data.tags ?? [],
        author: data.author ?? "The Pipeline Lab",
        readingTime: Math.max(1, Math.round(words / 200)),
        content,
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
