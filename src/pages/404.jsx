import Head from "next/head";
import Link from "next/link";
import { font } from "@/fonts";
import { IllustrationLost } from "@/components/illustrations/Illustrations";

export default function NotFound() {
  return (
    <div
      style={font.style}
      className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center"
    >
      <Head>
        <title>404 — Page Not Found | PromptUpp</title>
      </Head>

      {/* Grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 rounded-2xl border-2 border-zinc-900 bg-white px-10 py-12 shadow-[8px_8px_0px_#18181b] max-w-sm w-full">
        <IllustrationLost className="mx-auto mb-6 w-36 rounded-2xl" />
        <p className="mb-1 text-6xl font-black text-indigo-600">404</p>
        <h1 className="mb-2 text-2xl font-black text-zinc-900">Page not found</h1>
        <p className="mb-8 text-sm text-zinc-500">
          That page doesn&apos;t exist. Maybe it was moved, or you followed a broken link.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/library"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
          >
            Browse prompts
          </Link>
          <Link
            href="/"
            className="rounded-xl border-2 border-zinc-200 px-5 py-2.5 text-sm font-bold text-zinc-700 transition-colors hover:border-zinc-400"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
