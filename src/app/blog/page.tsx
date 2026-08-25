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
    <main className="prose max-w-3xl mx-auto py-8 font-sans">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Blog</h1>

      <nav className="mb-8" aria-label="Blog navigation">
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="border-b pb-4 border-border/20 last:border-0">
              <Link
                href={`/blog/${post.slug}`}
                className="text-lg hover:text-primary transition-colors"
              >
                {post.title}
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                {post.date}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {post.tags?.length > 0 &&
                  post.tags.map((tag: string) => (
                    <span key={tag} className="mx-1">
                      #{tag}
                    </span>
                  ))}
              </p>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-sm text-muted-foreground">
        Total posts: {posts.length}
      </p>
    </main>
  );
}
