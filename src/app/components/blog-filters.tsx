"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type BlogPost = {
  title: string;
  date: string;
  tags: string[];
  slug: string;
};

type SortOrder = "newest" | "oldest";

export default function BlogFilters({ posts }: { posts: BlogPost[] }) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    return posts
      .filter(
        (post) => selectedTag === "all" || post.tags.includes(selectedTag),
      )
      .sort((a, b) => {
        const difference =
          new Date(a.date).getTime() - new Date(b.date).getTime();
        return sortOrder === "newest" ? -difference : difference;
      });
  }, [posts, selectedTag, sortOrder]);

  return (
    <section aria-label="Filter blog posts">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border/60 bg-foreground/[0.02] p-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-foreground">
          Filter by topic
          <select
            value={selectedTag}
            onChange={(event) => setSelectedTag(event.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 font-normal text-foreground outline-none focus:border-foreground/50"
          >
            <option value="all">All topics</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-foreground sm:max-w-52">
          Sort by date
          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value as SortOrder)
            }
            className="rounded-lg border border-border bg-background px-3 py-2 font-normal text-foreground outline-none focus:border-foreground/50"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>

      {filteredPosts.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <li
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-border/60 bg-foreground/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:bg-foreground/[0.05] hover:shadow-lg"
            >
              <div className="mb-5 flex items-center justify-between gap-4 text-sm text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.tags.length} topics</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mb-4 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-muted-foreground"
              >
                {post.title}
              </Link>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground/75 transition-colors hover:bg-foreground/20"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No posts found for this topic.
        </p>
      )}

      <p className="mt-10 text-sm text-muted-foreground">
        {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} shown
      </p>
    </section>
  );
}
