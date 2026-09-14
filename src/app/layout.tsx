import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./components/theme-toggle";
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="border-b border-border/30 py-3">
            <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between font-sans">
              <div className="flex flex-col">
                <Link href="/" className="text-base font-bold tracking-tight text-foreground">
                  Cloud Engineer Journey
                </Link>
                <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  A practical cloud engineering journal
                </p>
              </div>
              <ThemeToggle />
            </nav>
          </header>
          <div className="flex-1">{children}</div>
          <footer className="border-t border-border/20 py-6 text-center text-sm text-muted-foreground font-sans">
            Built with Next.js &amp; deployed on AWS
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
