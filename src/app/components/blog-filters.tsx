"use client"

import { useMemo, useState } from "react"
import BlogCard from "./blog-card"

type BlogPost = {
  title: string
  date: string
  tags: string[]
  slug: string
}

type SortOrder = "newest" | "oldest"

const POSTS_PER_PAGE = 10

export default function BlogFilters({ posts }: { posts: BlogPost[] }) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const [selectedTag, setSelectedTag] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts]
  )

  const filteredPosts = useMemo(() => {
    return posts
      .filter(
        (post) => selectedTag === "all" || post.tags.includes(selectedTag)
      )
      .sort((a, b) => {
        const difference =
          new Date(a.date).getTime() - new Date(b.date).getTime()
        return sortOrder === "newest" ? -difference : difference
      })
  }, [posts, selectedTag, sortOrder])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <section aria-label="Filter blog posts">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border/60 bg-foreground/[0.02] p-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-foreground">
          Filter by topic
          <select
            value={selectedTag}
            onChange={(event) => {
              setSelectedTag(event.target.value)
              setCurrentPage(1)
            }}
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
            onChange={(event) => {
              setSortOrder(event.target.value as SortOrder)
              setCurrentPage(1)
            }}
            className="rounded-lg border border-border bg-background px-3 py-2 font-normal text-foreground outline-none focus:border-foreground/50"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>

      {filteredPosts.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2">
          {visiblePosts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              onTagSelect={(tag) => {
                setSelectedTag(tag)
                setCurrentPage(1)
              }}
            />
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No posts found for this topic.
        </p>
      )}

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {visiblePosts.length} of {filteredPosts.length}{" "}
          {filteredPosts.length === 1 ? "post" : "posts"}
        </p>

        {totalPages > 1 && (
          <nav aria-label="Blog pagination" className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => page - 1)}
              disabled={currentPage === 1}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              Previous
            </button>
            <div className="flex items-center gap-1" aria-label="Pages">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}
