import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center px-6 py-20 font-sans text-foreground">
      <div className="prose dark:prose-invert max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          A practical cloud engineering journal
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Cloud Engineer Journey
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-muted-foreground">
          Documenting my path to becoming a cloud engineer through AWS,
          certifications, and hands-on projects.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-colors hover:opacity-85"
        >
          Read the Blog
        </Link>
      </div>
    </main>
  );
}
