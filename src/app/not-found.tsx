import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center px-6 py-20 font-sans text-foreground">
      <div className="prose dark:prose-invert max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Oops
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          404
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-muted-foreground">
          There is nothing here to see. You might have taken a wrong turn down a
          URL that doesn&apos;t exist.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-colors hover:opacity-85"
        >
          Back to the Blog List
        </Link>
      </div>
    </main>
  )
}
