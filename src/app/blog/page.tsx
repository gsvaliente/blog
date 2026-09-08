import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogFilters from "../components/blog-filters";
import { getReadingTime } from "../../lib/read-time";

const postsDirectory = path.join(process.cwd(), "src", "posts");

function getPosts() {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const filePath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      title: data.title,
      date: data.date,
      tags: data.tags,
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

      <BlogFilters posts={posts} />
    </main>
  );
}
