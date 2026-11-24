import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main
        id="main-content"
        className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 pt-28 text-center"
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#4E9FE5]">
          404
        </p>
        <h1 className="heading-font mb-6 text-4xl font-bold md:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mb-10 text-lg text-zinc-400">
          The page may have moved, or the course you are looking for is no
          longer available.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Back to home
          </Link>
          <Link
            href="/courses"
            className="rounded-full border border-zinc-700 px-8 py-3 font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-900"
          >
            Browse courses
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
