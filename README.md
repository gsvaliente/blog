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
- Blog index with posts sorted by publication date
- Static routes generated for each post
- GitHub-Flavored Markdown rendering
- Light and dark theme support
- Responsive, minimal interface styled with Tailwind CSS

## Tech stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- TypeScript
- Tailwind CSS
- Markdown, [`gray-matter`](https://github.com/jonschlinkert/gray-matter), and `remark`
- AWS deployment and operations as part of the learning journey

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
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Start the production server locally
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

Existing examples include:

- [AWS S3 basics](./src/posts/aws-s3-basics.md)
- [Terraform](./src/posts/terraform.md)
- [Hello World](./src/posts/hello-world.md)

## Project structure

```text
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── blog/page.tsx         # Post listing
│   ├── blog/[slug]/page.tsx  # Individual post page
│   └── components/            # Shared UI components
└── posts/                     # Markdown blog posts
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

This project is an active learning project. The application is basic by design; the content, infrastructure, and engineering practices will grow over time.

## License

This project is a personal learning journal. Unless stated otherwise, the written content is © the author.
