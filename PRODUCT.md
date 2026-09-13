# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Gabriel Voliente, a developer transitioning into cloud and DevOps engineering. Secondary audience includes peers, potential employers, and others on similar learning paths who benefit from seeing authentic progress, mistakes, and hard-won lessons.

## Product Purpose

Document hands-on learning with AWS, Linux, networking, infrastructure-as-code, CI/CD, containers, observability, and software delivery — while building and maintaining a real application. Success means clear personal growth, demonstrable competence, and content that helps someone else along the same path.

## Positioning

Building in public as a deliberate practice. The blog's value is not polished expertise but honest documentation of the journey itself — what was learned, what broke, why, and what would be done differently. Anyone can replicate an AWS S3 tutorial; this captures the context, false starts, and decisions that come from actually doing the work.

## Operating Context

- Posts are Markdown files in `src/posts` with YAML frontmatter (title, date, tags, description)
- Rendered through Next.js App Router with GFM, syntax highlighting, and reading time estimates
- Light/dark theme support via system preference detection
- Static generation for all posts at build time
- The blog's own infrastructure development is part of the content — Terraform configs, CI/CD pipelines, domain/DNS/TLS setup, monitoring, and security are authored as posts as they are learned
- Currently running locally only; production deployment is planned but not yet implemented

## Capabilities and Constraints

- Content-only site built with Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Static site with markdown-based posts — no database, no CMS, no backend services
- Search is client-side full-text across post titles and content
- Pagination on the blog index
- Custom OG image generator at `/api/og`
- SEO metadata: canonical URLs, Open Graph cards, Twitter summaries
- Author attribution: Gabriel Voliente
- No authentication, comments, or user accounts
- Production deployment (AWS via Terraform + CI/CD) is on the roadmap but not yet shipped
- No analytics or tracking implemented

## Brand Commitments

- Name: Cloud Engineer Journey
- Voice: honest, technical, self-directed — writes from first-person experience without pretending to authority it hasn't earned
- Visual tone: intentionally minimal — simple, clean, readable, no gimmicks

## Evidence on Hand

- Five published posts covering introductory cloud concepts, Linux permissions, Terraform basics, and project retrospectives
- README with complete project documentation
- All content written by the author

## Product Principles

1. Authenticity over polish — mistakes and confusion are worth documenting, not hiding
2. Learning artifact and portfolio simultaneously — every post should serve both purposes well
3. Simplicity is intentional — minimal design keeps focus on content, avoids distraction, and matches the "building something real while learning" ethos
4. Process over product — how things were done matters more than the finished result; the why behind decisions earns its place
