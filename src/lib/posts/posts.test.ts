import fs from "fs";
import os from "os";
import path from "path";
import { describe, it, expect, beforeEach, afterEach, afterAll } from "vitest";
import {
  filterPosts,
  formatPostDate,
  getLatestPostDate,
  getPost,
  getReadingTime,
  resolveSiteUrl,
  scanPosts,
} from "./index";
import type { Post } from "./types";

const EXPECTED_POST_COUNT = 5;
const NEWEST_POST_DATE = "2026-08-28";

function makePost(overrides: Partial<Post> & Pick<Post, "slug">): Post {
  return {
    title: "Some post",
    date: "2026-01-01",
    tags: ["aws"],
    description: "A description",
    content: "Body content",
    readingTime: 1,
    ...overrides,
  };
}

describe("scanPosts", () => {
  it(`parses every real Post in src/posts (${EXPECTED_POST_COUNT})`, () => {
    const posts = scanPosts();
    expect(posts).toHaveLength(EXPECTED_POST_COUNT);
  });

  it("sorts Posts newest-first", () => {
    const posts = scanPosts();
    expect(posts[0].date).toBe(NEWEST_POST_DATE);
    expect(posts[0].slug).toBe("input-output-pipes");
    for (let i = 1; i < posts.length; i += 1) {
      expect(posts[i - 1].date.localeCompare(posts[i].date)).toBeGreaterThanOrEqual(0);
    }
  });

  it("derives slug, content, and readingTime for every Post", () => {
    const posts = scanPosts();
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.content.length).toBeGreaterThan(0);
      expect(post.readingTime).toBeGreaterThan(0);
      expect(post.title).toBeTruthy();
      expect(post.description).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.tags.length).toBeGreaterThan(0);
    }
  });

  it("returns null from getPost for a missing slug", () => {
    expect(getPost("no-such-post")).toBeNull();
  });

  it("returns a Post from getPost for a real slug", () => {
    expect(getPost("hello-world")?.slug).toBe("hello-world");
  });
});

describe("scanPosts validation", () => {
  let dir: string;

  function writeFixture(name: string, frontmatter: string) {
    fs.writeFileSync(path.join(dir, name), frontmatter);
  }

  const validPost = `---
title: "Valid fixture"
date: "2026-05-10"
tags: ["aws"]
description: "A valid post"
---
Body text.
`;

  const cases = [
    {
      file: "missing-title.md",
      field: "title",
      frontmatter: validPost.replace('title: "Valid fixture"\n', ""),
    },
    {
      file: "missing-date.md",
      field: "date",
      frontmatter: validPost.replace('date: "2026-05-10"\n', ""),
    },
    {
      file: "missing-tags.md",
      field: "tags",
      frontmatter: validPost.replace('tags: ["aws"]\n', ""),
    },
    {
      file: "missing-description.md",
      field: "description",
      frontmatter: validPost.replace('description: "A valid post"\n', ""),
    },
    {
      file: "invalid-date.md",
      field: "date",
      frontmatter: validPost.replace('date: "2026-05-10"', 'date: "2026/05/10"'),
    },
    {
      file: "non-array-tags.md",
      field: "tags",
      frontmatter: validPost.replace('tags: ["aws"]', "tags: 'aws'"),
    },
  ] as const;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-posts-"));
  });

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it.each(cases)("fails loudly on $file", ({ file, field, frontmatter }) => {
    writeFixture(file, frontmatter);
    expect(() => scanPosts(dir)).toThrow(field);
  });

  it("parses a valid fixture Post", () => {
    writeFixture("valid.md", validPost);
    const posts = scanPosts(dir);
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      slug: "valid",
      title: "Valid fixture",
      date: "2026-05-10",
      tags: ["aws"],
      description: "A valid post",
    });
    expect(posts[0].readingTime).toBeGreaterThan(0);
  });
});

describe("formatPostDate", () => {
  const originalTz = process.env.TZ;

  afterAll(() => {
    process.env.TZ = originalTz;
  });

  it.each(["UTC", "America/Los_Angeles", "Pacific/Honolulu"])(
    "renders 2026-08-26 as August 26, 2026 in timezone %s",
    (tz) => {
      process.env.TZ = tz;
      expect(formatPostDate("2026-08-26")).toBe("August 26, 2026");
    }
  );

  it("throws on an invalid date", () => {
    expect(() => formatPostDate("not-a-date")).toThrow("Invalid date");
  });
});

describe("getReadingTime", () => {
  it("floors empty content at 1 minute", () => {
    expect(getReadingTime("")).toBe(1);
  });

  it("omits fenced code blocks from the count", () => {
    const onlyCode = "```\n" + Array(200).fill("word").join(" ") + "\n```";
    expect(getReadingTime(onlyCode)).toBe(1);
  });

  it("counts prose against 200 words per minute", () => {
    const prose = Array(210).fill("word").join(" ");
    expect(getReadingTime(prose)).toBe(2);
  });
});

describe("filterPosts", () => {
  const posts: Post[] = [
    makePost({
      slug: "s3-basics",
      title: "AWS S3 Basics",
      description: "Creating and configuring buckets",
      tags: ["aws", "s3"],
      content: "Walkthrough of the S3 console.",
    }),
    makePost({
      slug: "linux-permissions",
      title: "Linux Permissions",
      description: "Owners, groups, and chmod",
      tags: ["linux", "security"],
      content: "chmod changes read and write permissions.",
    }),
    makePost({
      slug: "terraform",
      title: "Terraform IaC",
      description: "Infrastructure as Code",
      tags: ["aws", "terraform"],
      content: "State files track remote resources.",
    }),
  ];

  it.each([
    ["matches by title", "S3"],
    ["matches by tag", "s3"],
    ["matches by content", "chmod"],
    ["matches by description", "chmod"],
  ])("%s", (_label, query) => {
    const result = filterPosts(posts, query);
    expect(result.length).toBeGreaterThan(0);
  });

  it("is case-insensitive", () => {
    expect(filterPosts(posts, "s3").map((p) => p.slug)).toEqual(["s3-basics"]);
    expect(filterPosts(posts, "AWs")).toEqual(filterPosts(posts, "aws"));
  });

  it("intersects active tags (AND)", () => {
    expect(filterPosts(posts, "", ["aws", "terraform"]).map((p) => p.slug)).toEqual([
      "terraform",
    ]);
  });

  it("combines query with active tags", () => {
    expect(filterPosts(posts, "S3", ["aws"]).map((p) => p.slug)).toEqual(["s3-basics"]);
    expect(filterPosts(posts, "S3", ["linux"])).toEqual([]);
  });

  it("returns all Posts for an empty query and no tags", () => {
    expect(filterPosts(posts, "", [])).toHaveLength(posts.length);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterPosts(posts, "quantum")).toEqual([]);
  });
});

describe("getLatestPostDate", () => {
  it("returns the newest Post date regardless of input order", () => {
    const posts = [
      makePost({ slug: "old", date: "2026-01-01" }),
      makePost({ slug: "newest", date: "2026-08-28" }),
      makePost({ slug: "mid", date: "2026-08-26" }),
    ];
    expect(getLatestPostDate(posts)).toBe("2026-08-28");
  });

  it("returns null for an empty list", () => {
    expect(getLatestPostDate([])).toBeNull();
  });
});

describe("resolveSiteUrl", () => {
  it("defaults to http://localhost:3000 when NEXT_PUBLIC_SITE_URL is unset", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });

  it("defaults to http://localhost:3000 when NEXT_PUBLIC_SITE_URL is blank", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "   " })).toBe(
      "http://localhost:3000"
    );
  });

  it("reads NEXT_PUBLIC_SITE_URL when set", () => {
    expect(
      resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://cloudengineerjourney.dev" })
    ).toBe("https://cloudengineerjourney.dev");
  });
});