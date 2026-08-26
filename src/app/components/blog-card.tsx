import Link from "next/link"

type BlogPost = {
  title: string
  date: string
  tags: string[]
  slug: string
}

type BlogCardProps = {
  post: BlogPost
  onTagSelect: (tag: string) => void
}

export default function BlogCard({ post, onTagSelect }: BlogCardProps) {
  return (
    <li className="group relative flex flex-col rounded-2xl border border-border/60 bg-foreground/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:bg-foreground/[0.05] hover:shadow-lg">
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}`}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
      />
      <div className="pointer-events-none mb-5 flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <time dateTime={post.date}>{post.date}</time>
        <span>{post.tags.length} topics</span>
      </div>
      <h2 className="pointer-events-none mb-4 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-muted-foreground">
        {post.title}
      </h2>
      <div className="relative z-20 mt-auto flex flex-wrap gap-2 pt-4">
        {post.tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagSelect(tag)}
            className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground/75 transition-colors hover:bg-foreground/20"
          >
            #{tag}
          </button>
        ))}
      </div>
    </li>
  )
}
