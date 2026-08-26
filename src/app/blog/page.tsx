import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const postsDirectory = path.join(process.cwd(), "src", "posts");

function getPosts() {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const filePath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      title: data.title,
      date: data.date,
      tags: data.tags,
      slug: file.replace(".md", ""),
    };
  });
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <main className="mx-auto max-w-4xl px-6 py-14 font-sans text-foreground sm:py-20">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Notes from the cloud
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Lessons, experiments, and practical notes from my journey into cloud
          engineering.
        </p>
      </header>

      <nav aria-label="Blog navigation">
        <ul className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-border/60 bg-foreground/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:bg-foreground/[0.05] hover:shadow-lg"
            >
              <div className="mb-5 flex items-center justify-between gap-4 text-sm text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.tags?.length ?? 0} topics</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mb-4 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-muted-foreground"
              >
                {post.title}
              </Link>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {post.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground/75"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-10 text-sm text-muted-foreground">
        {posts.length} {posts.length === 1 ? "post" : "posts"} published
      </p>
    </main>
  );
}
