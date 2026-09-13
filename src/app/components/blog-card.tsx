import Link from "next/link"

type BlogPost = {
  title: string
  date: string
  tags: string[]
  slug: string
  readingTime: number
}

type BlogCardProps = {
  post: BlogPost
  onTagSelect: (tag: string) => void
}

export default function BlogCard({ post, onTagSelect }: BlogCardProps) {
  return (
    <li className="group relative flex cursor-pointer flex-col rounded-2xl border border-border/60 bg-foreground/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:bg-foreground/[0.05] hover:shadow-lg">
      {/* Full-card click surface — sits above all content */}
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}`}
        className="absolute inset-0 z-50 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
      />
      <div className="relative z-10 flex flex-col pointer-events-none gap-3">
        {/* Tags — pill style, interactive */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagSelect(tag)}
              className="pointer-events-auto rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground/75 transition-colors hover:bg-foreground/20"
            >
              #{tag}
            </button>
          ))}
        </div>
        {/* Meta — date + reading time */}
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.readingTime} min read</span>
        </div>
        {/* Title */}
        <h2 className="text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-muted-foreground">
          {post.title}
        </h2>
      </div>
    </li>
  )
}
