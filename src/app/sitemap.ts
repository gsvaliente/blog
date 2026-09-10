import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

const siteUrl = "https://cloudengineerjourney.dev";
const postsDirectory = path.join(process.cwd(), "src", "posts");

function getPosts(): { slug: string; date: string }[] {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const filePath = path.join(postsDirectory, file);
    const content = fs.readFileSync(filePath, "utf8");
    const match = content.match(/^date:\s*["']?([0-9]{4}-[0-9]{2}-[0-9]{2})/m);
    return {
      slug: file.replace(".md", ""),
      date: match ? match[1] : "2026-01-01",
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: posts.length ? new Date(posts[0].date).toISOString() : new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
