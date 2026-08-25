import Link from "next/link";

export default function Home() {
  return (
    <main className="prose max-w-3xl mx-auto py-16 font-sans">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Cloud Engineer Journey
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Documenting my path to becoming a cloud engineer. Learning AWS,
        certifications, and hands-on projects.
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-background font-medium transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Read the Blog
      </Link>
    </main>
  );
}
