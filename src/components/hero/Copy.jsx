import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Button } from "../shared/Button";

export const Copy = () => {
  return (
    <>
      <div className="mb-1.5 rounded-full bg-zinc-600">
        <Link
          href="/library"
          className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-white p-0.5 text-sm transition-transform hover:-rotate-2"
        >
          <span className="rounded-full bg-indigo-600 px-2 py-0.5 font-medium text-white text-xs">
            FREE
          </span>
          <span className="ml-1.5 mr-1 inline-block">
            500+ prompts, no credit card needed
          </span>
          <FiArrowUpRight className="mr-2 inline-block" />
        </Link>
      </div>
      <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] sm:text-5xl md:text-7xl md:leading-[1.15]">
        Professional AI prompts.{" "}
        <span className="text-indigo-600">Copy. Paste. Done.</span>
      </h1>
      <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-2xl md:leading-relaxed">
        8,000+ expert copy-paste prompts for ChatGPT, Claude &amp; more — across marketing, sales, coding, SEO, legal, HR, and 20+ categories. Ready to use instantly.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="/signup">
          <Button intent="primary">
            <span className="font-bold">Start for free — </span> no CC required
          </Button>
        </Link>
        <Link href="/library">
          <Button intent="outline">Browse all prompts</Button>
        </Link>
      </div>
      <p className="mt-5 text-sm text-zinc-400">
        Built with{" "}
        <span className="text-indigo-600">♥</span>
        {" "}by{" "}
        <a
          href="https://instagram.com/immoebarbar"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-600 underline underline-offset-2 hover:text-indigo-600 transition-colors"
        >
          Moe Barbar
        </a>
      </p>
    </>
  );
};
