import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center px-6 py-20 font-sans text-foreground">
      <div className="prose dark:prose-invert max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          A PRACTICAL CLOUD ENGINEERING JOURNAL
        </p>
        <h1 className="mb-6 font-bold text-[clamp(2.5rem,6vw,3.75rem)] tracking-[-0.02em] leading-[1.1] text-foreground">
          Cloud Engineer Journey
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-base leading-[1.625] text-muted-foreground">
          Documenting my path to becoming a cloud engineer through AWS,
          certifications, and hands-on projects.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-background transition-colors hover:opacity-85"
        >
          Read the Blog
        </Link>
      </div>
    </main>
  );
}
