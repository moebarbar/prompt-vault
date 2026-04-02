import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export const Announcement = () => (
  <div className="flex items-center justify-center py-1.5 px-4">
    <Link
      href="/library"
      className="flex items-center gap-1.5 text-sm text-white hover:underline"
    >
      <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">NEW</span>
      <span>500+ copy-paste prompts across 25 categories</span>
      <FiArrowUpRight />
    </Link>
  </div>
);
