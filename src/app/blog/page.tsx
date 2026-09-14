import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostGrid } from "./components/post-grid";
import { getReadingTime } from "../../lib/read-time";

const siteUrl = "https://cloudengineerjourney.dev";
const postsDirectory = path.join(process.cwd(), "src", "posts");

export const metadata: Metadata = {
  title: "Blog | Cloud Engineer Journey",
  description:
    "Lessons, experiments, and practical notes from my journey into cloud engineering — AWS, Kubernetes, Terraform, and more.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    type: "website",
    title: "Blog | Cloud Engineer Journey",
    description:
      "Lessons, experiments, and practical notes from my journey into cloud engineering — AWS, Kubernetes, Terraform, and more.",
    url: `${siteUrl}/blog`,
  },
};

function getPosts() {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const filePath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      title: data.title,
      date: data.date,
      tags: data.tags ?? [],
      readingTime: getReadingTime(content),
      slug: file.replace(".md", ""),
    };
  });
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 font-sans text-foreground sm:py-14">
      {/* Header */}
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Notes from the cloud
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-none">
          Blog
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Lessons, experiments, and practical notes from my journey into cloud
          engineering.
        </p>
      </header>

      {/* Search bar */}
      <div className="mb-10 flex items-center gap-4">
        <label htmlFor="post-search" className="sr-only">
          Search posts
        </label>
        <input
          id="post-search"
          type="search"
          placeholder="Filter by title…"
          className="flex-1 border-b border-border/60 bg-transparent pb-2 pr-4 pt-1 text-base font-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/60 transition-colors"
        />
      </div>

      {/* Post grid */}
      <PostGrid posts={posts} />
    </main>
  );
}
