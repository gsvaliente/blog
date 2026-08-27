import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import Link from "next/link";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "src", "posts");

async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(gfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

async function getPost(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  // The page header already renders the post title, so avoid showing a
  // duplicate H1 when the Markdown file starts with one.
  const contentWithoutTitle = content.replace(/^(?:\s*\r?\n)*#\s+.*(?:\r?\n)+/, "");
  const htmlContent = await markdownToHtml(contentWithoutTitle);
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
    <article className="mx-auto max-w-3xl px-6 py-10 font-sans text-foreground sm:py-14">
      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span> All posts
      </Link>
      <header className="mb-10 border-b border-border/60 pb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Cloud engineering notes
        </p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={date}>{date}</time>
          <span aria-hidden="true">·</span>
          <span>{tags?.length ?? 0} topics</span>
          {tags?.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground/75"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-strong:text-foreground prose-a:text-foreground prose-a:underline-offset-4 prose-code:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="mt-14 border-t border-border/60 pt-6">
        <p className="text-sm text-muted-foreground">
          Originally published on {date}
        </p>
      </footer>
    </article>
  );
}
