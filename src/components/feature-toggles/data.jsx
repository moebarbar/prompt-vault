import React from "react";
import { FiCopy, FiSearch, FiBookmark, FiZap } from "react-icons/fi";
import {
  IllustrationBrowse,
  IllustrationCopy,
  IllustrationSave,
  IllustrationSearch,
} from "../illustrations/Illustrations";

const BrowseComponent = () => (
  <div className="h-full w-full p-4">
    <div className="mb-4 text-sm font-semibold text-zinc-500">All Categories</div>
    <div className="grid grid-cols-3 gap-2">
      {["📣 Marketing", "💼 Sales", "🔍 SEO", "📱 Social", "🚀 Vibe Coding", "✍️ Writing", "🎨 Image Gen", "▶️ YouTube", "🎓 Students"].map((c) => (
        <div key={c} className="rounded-lg border border-zinc-200 px-2 py-1.5 text-xs text-zinc-700 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer transition-colors">
          {c}
        </div>
      ))}
    </div>
  </div>
);

const CopyComponent = () => (
  <div className="h-full w-full p-4 flex flex-col gap-3">
    <div className="rounded-lg border-2 border-indigo-500 bg-indigo-50 p-3">
      <div className="mb-1 text-xs font-bold text-indigo-700">Email Campaign Sequence</div>
      <div className="text-[11px] text-zinc-500 leading-relaxed line-clamp-4">
        Write a 5-email marketing sequence to nurture leads and convert them to buyers. Each email should have a clear goal, compelling subject line, and a single CTA...
      </div>
    </div>
    <button className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-sm font-bold text-white">
      <FiCopy /> Copy Prompt
    </button>
    <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
      <span className="size-2 rounded-full bg-green-500 inline-block" />
      Copied to clipboard!
    </div>
  </div>
);

const SaveComponent = () => (
  <div className="h-full w-full p-4">
    <div className="mb-3 text-sm font-semibold text-zinc-500">My Saved Prompts</div>
    <div className="space-y-2">
      {[
        { title: "Cold Outreach Email", cat: "Sales" },
        { title: "Blog Post SEO Outline", cat: "SEO" },
        { title: "SaaS Build Sequence", cat: "Vibe Coding" },
        { title: "30-Day Content Calendar", cat: "Social Media" },
      ].map((p) => (
        <div key={p.title} className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2">
          <div>
            <div className="text-xs font-semibold">{p.title}</div>
            <div className="text-[10px] text-indigo-500">{p.cat}</div>
          </div>
          <FiBookmark className="text-indigo-500 text-sm" />
        </div>
      ))}
    </div>
  </div>
);

const SearchComponent = () => (
  <div className="h-full w-full p-4">
    <div className="mb-3 flex items-center gap-2 rounded-lg border-2 border-indigo-400 bg-white px-3 py-2">
      <FiSearch className="text-indigo-400" />
      <span className="text-sm text-zinc-400">cold email for SaaS startup...</span>
    </div>
    <div className="mb-2 text-xs text-zinc-400">4 results</div>
    <div className="space-y-2">
      {["Cold Outreach Email", "B2B LinkedIn Message", "Follow-Up Sequence", "Meeting Request Email"].map((t) => (
        <div key={t} className="flex items-center justify-between rounded border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs">
          <span className="font-medium">{t}</span>
          <FiCopy className="text-zinc-300" />
        </div>
      ))}
    </div>
  </div>
);

export const data = [
  {
    id: 1,
    title: "Browse",
    Component: BrowseComponent,
    Illustration: IllustrationBrowse,
    cardTitle: "25 categories, one place",
    cardSubtitle: "Browse by role, industry, or goal. Everything organized so you find exactly what you need in seconds.",
  },
  {
    id: 2,
    title: "Copy",
    Component: CopyComponent,
    Illustration: IllustrationCopy,
    cardTitle: "One click. Done.",
    cardSubtitle: "Every prompt is ready to paste directly into ChatGPT, Claude, Gemini, or any AI tool you use.",
  },
  {
    id: 3,
    title: "Save",
    Component: SaveComponent,
    Illustration: IllustrationSave,
    cardTitle: "Build your personal prompt library",
    cardSubtitle: "Save your favorite prompts, organize by project, and access them anytime from any device.",
  },
  {
    id: 4,
    title: "Search",
    Component: SearchComponent,
    Illustration: IllustrationSearch,
    cardTitle: "Find any prompt instantly",
    cardSubtitle: "Search across all 500+ prompts by keyword, category, or goal. Stop wasting time writing prompts from scratch.",
  },
];
