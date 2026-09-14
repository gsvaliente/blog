# Cloud Engineer Journey

A personal learning journal and hands-on record of my journey toward becoming a cloud and DevOps engineer.

This is a deliberately simple blog where I document what I learn, the projects I build, the mistakes I make, and the lessons I take away while working with AWS, infrastructure, automation, and software delivery.

## What this project is for

- Capture practical notes from my cloud and DevOps learning path
- Share experiments, tutorials, and project retrospectives
- Track progress with AWS, Linux, networking, containers, Terraform, CI/CD, and observability
- Build and improve a real application while learning how to operate it

## Current features

- Next.js App Router application
- Markdown-based posts stored in [`src/posts`](./src/posts)
- Frontmatter metadata for titles, dates, tags, and descriptions
- Blog index with client-side full-text search across title, description, tags, and content, tag filtering, and newest-first sorting
- Reading time estimates per post
- Static routes generated for each post
- GitHub-Flavored Markdown rendering with syntax-highlighted code blocks
- Light and dark theme support (system-aware via `next-themes`)
- Custom 404 page
- `sitemap.xml` and `robots.txt` generation
- Unit tests for post parsing, filtering, date formatting, and reading time (Vitest)
- Design system tokens (via `impeccable`) — see [`DESIGN.md`](./DESIGN.md)
- Open Graph and Twitter card metadata with dynamic OG image generation
- Responsive, minimal interface styled with Tailwind CSS

## Tech stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- TypeScript
- Tailwind CSS (v4)
- [Vitest](https://vitest.dev/) for unit tests
- Markdown, [`gray-matter`](https://github.com/jonschlinkert/gray-matter), `remark`, and rehype plugins
- AWS deployment and operations as part of the learning journey

### SEO & metadata

Each post includes canonical URLs, Open Graph cards, Twitter summaries, author attribution (`Gabriel Valiente`), and a dynamic OG image generator at `/api/og`. The blog listing carries its own metadata, and the homepage inherits metadata from the root layout.

## Getting started

### Prerequisites

- Node.js (an LTS version is recommended)
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run lint       # Run ESLint
npm run build      # Create a production build
npm run start      # Start the production server locally
npm run test       # Run the unit tests (Vitest)
npm run test:watch # Run Vitest in watch mode
npm run typecheck  # Type-check with tsc --noEmit
```

## Writing a post

Create a Markdown file in `src/posts`. The filename becomes the post slug. For example, `src/posts/my-first-post.md` is available at `/blog/my-first-post`.

Add frontmatter at the top of the file:

```md
---
title: "My First Post"
date: "2026-01-20"
tags: [aws, devops]
description: "What I learned while building my first project."
---

# My First Post

Write the post here using Markdown.
```

Frontmatter is validated at build time: `title`, `date`, `tags`, and `description` are all required. Dates must be `YYYY-MM-DD`, and `tags` must be a non-empty array. Posts are sorted newest-first by date on the blog index.

Existing examples include:

- [Hello World: Starting My Cloud Engineer Journey](./src/posts/hello-world.md)
- [AWS S3 Basics](./src/posts/aws-s3-basics.md)
- [Input-Output Pipes](./src/posts/input-output-pipes.md)
- [Linux Permissions](./src/posts/linux-permissions.md)
- [Terraform](./src/posts/terraform.md)

## Project structure

```text
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── not-found.tsx         # Custom 404 page
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml
│   ├── layout.tsx            # Root layout (fonts, theme, nav, footer)
│   ├── blog/
│   │   ├── page.tsx          # Post listing
│   │   ├── [slug]/page.tsx   # Individual post page
│   │   └── components/
│   │       └── post-grid.tsx # Search, tag filter, and post cards
│   ├── api/
│   │   └── og/route.tsx      # Dynamic OG image generator
│   └── components/
│       └── theme-toggle.tsx  # Light/dark toggle
├── lib/
│   └── posts/                # Post parsing, filtering, dates, reading time
│       ├── index.ts
│       ├── scan.ts
│       ├── filter.ts
│       ├── date.ts
│       ├── read-time.ts
│       ├── site-url.ts
│       ├── types.ts
│       └── posts.test.ts
└── posts/                    # Markdown blog posts
```

## Learning and infrastructure roadmap

The blog will evolve alongside my skills. Planned areas include:

- Hosting the application with AWS
- Infrastructure as Code with Terraform
- CI/CD with GitHub Actions and AWS services
- Domain, DNS, TLS, and caching
- Logging, monitoring, and alerting
- Security, IAM, backups, and cost management
- Containerization and additional deployment patterns

The AWS architecture is intentionally being developed as part of the learning process rather than treated as a finished system. Deployment details will be added here as they are implemented.

## Status

This project is an active learning project. The application is basic by design; the content, infrastructure, and engineering practices will grow over time. It currently runs locally only — production deployment on AWS is planned but not yet implemented.

## License

This project is a personal learning journal. Unless stated otherwise, the written content is © the author.
