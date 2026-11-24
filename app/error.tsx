"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white"
    >
      <h1 className="heading-font mb-6 text-4xl font-bold md:text-5xl">
        Something went wrong
      </h1>
      <p className="mb-10 max-w-xl text-lg text-zinc-400">
        An unexpected error stopped this page from loading. Please try again — if
        it keeps happening, contact our team and we will help you out.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-zinc-700 px-8 py-3 font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-900"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
