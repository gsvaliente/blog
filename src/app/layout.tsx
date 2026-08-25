import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Engineer Journey",
  description:
    "Documenting my journey to becoming a cloud engineer. Learning AWS, certifications, and hands-on projects.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border/20 py-4">
          <nav className="max-w-xl mx-auto px-6 flex items-center justify-between font-sans">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Cloud Engineer Journey
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-border/20 py-6 text-center text-sm text-muted-foreground font-sans">
          Built with Next.js &amp; deployed on AWS
        </footer>
      </body>
    </html>
  );
}
