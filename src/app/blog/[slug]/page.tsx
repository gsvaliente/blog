import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import Link from "next/link";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "src", "posts");

async function markdownToHtml(markdown: string) {
  const result = await remark().use(gfm).use(html).process(markdown);
  return result.toString();
}

async function getPost(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = await markdownToHtml(content);
  return { data, content: htmlContent };
}

export function generateStaticParams() {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const { title, date, tags } = post.data;

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-8 font-sans">
      <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-flex items-center gap-1">
        &larr; All posts
      </Link>
      <header className="mb-6 border-b pb-6 border-border/20">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-muted-foreground text-lg">
          {date}{" "}
          {tags?.length > 0 && (
            <span className="ml-2">
              {tags.map((tag: string) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </span>
          )}
        </p>
      </header>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      <footer className="mt-8 pt-6 border-t border-border/20">
        <p className="text-sm text-muted-foreground">
          Originally published on {date}
        </p>
      </footer>
    </article>
  );
}
