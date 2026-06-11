import type { Metadata } from "next";
import { getPosts } from "@/lib/blog";
import PageHeader from "@/components/PageHeader";
import { FeaturedCard, PostCard } from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog — The Pipeline Lab",
  description:
    "Field notes on GTM engineering: deliverability, data systems, Clay workflows and outbound strategy for B2B teams.",
};

export default function BlogPage() {
  const posts = getPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="bg-paper-soft">
      <PageHeader
        eyebrow="The lab notes"
        titleTop="Field notes,"
        titleAccent="engineered."
        sub="Everything we learn building revenue systems — deliverability, data pipelines, Clay workflows and the strategy behind outbound that compounds."
      />

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[88rem] space-y-5">
          {featured && <FeaturedCard post={featured} />}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
