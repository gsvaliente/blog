import type { Metadata } from "next";
import { scanPosts } from "../../lib/posts";
import { PostGrid } from "./components/post-grid";

const siteUrl = "https://cloudengineerjourney.dev";

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

export default function BlogIndexPage() {
  const posts = scanPosts();

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

      {/* Post grid — search, tag pills, and listing */}
      <PostGrid posts={posts} />
    </main>
  );
}
