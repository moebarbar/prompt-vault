import React from "react";
import { FiCopy, FiSearch, FiBookmark } from "react-icons/fi";
import { LogoSmall } from "../navigation/Logo";

export const MockupScreen = () => {
  return (
    <div className="absolute bottom-0 left-1/2 h-40 w-[calc(100vw_-_56px)] max-w-[1100px] -translate-x-1/2 overflow-hidden rounded-t-xl bg-zinc-900 p-0.5">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-0.5">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="size-2 rounded-full bg-green-400" />
        </div>
        <span className="rounded bg-zinc-600 px-2 py-0.5 text-xs text-zinc-100">
          promptupp.com/library
        </span>
        <div className="w-4" />
      </div>
      <div className="relative z-0 grid h-full w-full grid-cols-[100px,_1fr] overflow-hidden rounded-t-lg bg-white md:grid-cols-[160px,_1fr]">
        {/* Sidebar */}
        <div className="h-full border-r border-zinc-200 p-2">
          <LogoSmall />
          <div className="mt-3 space-y-1">
            {["📣 Marketing", "💼 Sales", "🔍 SEO", "📱 Social", "🚀 Vibe Coding"].map((c) => (
              <span
                key={c}
                className={`flex items-center gap-1 text-[10px] px-1.5 py-1 rounded ${
                  c.includes("Marketing") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-zinc-500"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-0 p-2">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 flex-1 rounded bg-zinc-100 px-2 py-1">
              <FiSearch className="text-zinc-400 text-xs" />
              <span className="text-xs text-zinc-400">Search 500+ prompts...</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { title: "Email Campaign Sequence", tag: "Marketing" },
              { title: "Cold Outreach Email", tag: "Sales" },
              { title: "Blog Post SEO Outline", tag: "SEO" },
              { title: "SaaS Build Sequence", tag: "Vibe Coding" },
            ].map((p) => (
              <div key={p.title} className="rounded border border-zinc-200 p-1.5 flex items-start justify-between gap-1">
                <div>
                  <span className="block text-[9px] font-semibold text-zinc-800 leading-tight">{p.title}</span>
                  <span className="block text-[8px] text-indigo-500 mt-0.5">{p.tag}</span>
                </div>
                <FiCopy className="text-zinc-300 text-xs shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-gradient-to-b from-white/0 to-white" />
      </div>
    </div>
  );
};
