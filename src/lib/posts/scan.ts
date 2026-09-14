import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getReadingTime } from "./read-time";
import type { Post } from "./types";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const defaultPostsDirectory = path.join(process.cwd(), "src", "posts");

function requireString(
  data: Record<string, unknown>,
  field: string,
  filePath: string
): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Post ${filePath} is missing required frontmatter field "${field}"`
    );
  }
  return value;
}

function requireTags(
  data: Record<string, unknown>,
  filePath: string
): string[] {
  const value = data.tags;
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((tag) => typeof tag !== "string" || tag.trim() === "")
  ) {
    throw new Error(`Post ${filePath} has missing or invalid frontmatter field "tags"`);
  }
  return value;
}

function requireDate(
  data: Record<string, unknown>,
  filePath: string
): string {
  const value = data.date;
  if (value instanceof Date) {
    const iso = value.toISOString().slice(0, 10);
    if (!ISO_DATE.test(iso)) {
      throw new Error(`Post ${filePath} has invalid frontmatter field "date"`);
    }
    return iso;
  }
  if (typeof value !== "string" || !ISO_DATE.test(value)) {
    throw new Error(
      `Post ${filePath} has missing or invalid frontmatter field "date" (expected YYYY-MM-DD)`
    );
  }
  return value;
}

export function parsePostFile(filePath: string, markdown: string): Post {
  const { data, content } = matter(markdown);
  const slug = path.basename(filePath, ".md");

  return {
    slug,
    title: requireString(data, "title", filePath),
    description: requireString(data, "description", filePath),
    date: requireDate(data, filePath),
    tags: requireTags(data, filePath),
    content,
    readingTime: getReadingTime(content),
  };
}

/**
 * Scans a directory of markdown Posts, parsing and validating each one.
 * A Post with missing or invalid required frontmatter throws.
 */
export function scanPosts(directory: string = defaultPostsDirectory): Post[] {
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .sort();

  const posts = files.map((file) => {
    const filePath = path.join(directory, file);
    return parsePostFile(filePath, fs.readFileSync(filePath, "utf8"));
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(
  slug: string,
  directory: string = defaultPostsDirectory
): Post | null {
  const filePath = path.join(directory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return parsePostFile(filePath, fs.readFileSync(filePath, "utf8"));
}

/**
 * The newest Post date across the given Posts; used for the sitemap's
 * `/blog` lastModified so the newest Post always wins regardless of
 * directory read order.
 */
export function getLatestPostDate(posts: Post[]): string | null {
  if (posts.length === 0) {
    return null;
  }
  return posts.reduce(
    (newest, post) => (post.date > newest ? post.date : newest),
    posts[0].date
  );
}