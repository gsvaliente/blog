"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export type BlogPost = {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  readingTime: number;
};

export function PostGrid({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  // Filter posts
  const filtered = useMemo(() => {
    let results = posts;
    if (tagFilter) {
      results = results.filter((p) => p.tags.includes(tagFilter));
    }
    if (query.trim()) {
      const lower = query.toLowerCase();
      results = results.filter((p) => p.title.toLowerCase().includes(lower));
    }
    return results;
  }, [posts, query, tagFilter]);

  // Collect all unique tags from filtered posts
  const activeTags = useMemo(() => {
    const tags = new Set<string>();
    for (const post of filtered) {
      for (const tag of post.tags) {
        tags.add(tag);
      }
    }
    return [...tags].sort();
  }, [filtered]);

  const hasFilter = query.trim() !== "" || tagFilter !== null;

  return (
    <div className="flex flex-col gap-8">
      {/* Tag pills — filter row */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pb-4">
          <button
            onClick={() => setTagFilter(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              tagFilter === null
                ? "border-foreground/60 bg-foreground/5 text-foreground"
                : "border-border/60 text-muted-foreground hover:border-foreground/30"
            }`}
          >
            All
          </button>
          {activeTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                tagFilter === tag
                  ? "border-foreground/60 bg-foreground/5 text-foreground"
                  : "border-border/60 text-muted-foreground hover:border-foreground/30"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      {hasFilter && (
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"} found
        </p>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No posts match your search.
        </p>
      )}

      {/* Post grid — true 2 columns */}
      <ul
        className={`grid auto-rows-fr gap-x-8 gap-y-8 sm:grid-cols-2 ${
          hasFilter ? "mt-4" : ""
        }`}
      >
        {filtered.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border/60 bg-foreground/[0.02] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-foreground/[0.05]">
      {/* Full-card click surface — sits above all content */}
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read "${post.title}"`}
        className="absolute inset-0 z-50"
      />
      <div className="relative z-10 flex flex-col pointer-events-none gap-3">
        {/* Tags — pill style, interactive */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="pointer-events-auto rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs font-medium text-foreground/75 transition-colors hover:bg-foreground/20"
            >
              #{tag}
            </button>
          ))}
        </div>
        {/* Meta — date + reading time */}
        <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.readingTime} min read</span>
        </div>
        {/* Title — clear readable headline */}
        <h2 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-muted-foreground">
          {post.title}
        </h2>
      </div>
    </article>
  );
}
