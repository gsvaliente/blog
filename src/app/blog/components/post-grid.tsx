"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { filterPosts } from "../../../lib/posts/filter";
import { formatPostDate } from "../../../lib/posts/date";
import type { Post } from "../../../lib/posts/types";

export function PostGrid({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const filtered = useMemo(
    () => filterPosts(posts, query, tagFilter ? [tagFilter] : []),
    [posts, query, tagFilter]
  );

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags) {
        tags.add(tag);
      }
    }
    return [...tags].sort();
  }, [posts]);

  const hasFilter = query.trim() !== "" || tagFilter !== null;

  return (
    <div className="flex flex-col gap-8">
      {/* Search bar */}
      <div className="flex items-center gap-4">
        <label htmlFor="post-search" className="sr-only">
          Search posts
        </label>
        <input
          id="post-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, tag, or topic…"
          className="flex-1 border-b border-border/60 bg-transparent pb-2 pr-4 pt-1 text-base font-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/60 transition-colors"
        />
      </div>

      {/* Tag pills — full row stays visible while filtering */}
      {allTags.length > 0 && (
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
          {allTags.map((tag) => (
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

      {/* Post grid */}
      <ul
        className={`grid auto-rows-fr gap-x-8 gap-y-8 sm:grid-cols-2 ${
          hasFilter ? "mt-4" : ""
        }`}
      >
        {filtered.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} onTagSelect={setTagFilter} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostCard({
  post,
  onTagSelect,
}: {
  post: Post;
  onTagSelect: (tag: string) => void;
}) {
  return (
    <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border/60 bg-foreground/[0.02] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-foreground/[0.05]">
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read "${post.title}"`}
        className="absolute inset-0 z-50 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-foreground"
      />
      <div className="relative z-10 flex flex-col pointer-events-none gap-3">
        {/* Tags — pill style, interactive */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagSelect(tag)}
              className="pointer-events-auto rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs font-medium text-foreground/75 transition-colors hover:bg-foreground/20"
            >
              #{tag}
            </button>
          ))}
        </div>
        {/* Meta — date + reading time */}
        <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span>{post.readingTime} min read</span>
        </div>
        {/* Title */}
        <h2 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-muted-foreground">
          {post.title}
        </h2>
      </div>
    </article>
  );
}