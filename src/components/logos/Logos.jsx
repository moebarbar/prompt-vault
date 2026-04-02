import React from "react";

const tools = [
  { name: "ChatGPT", color: "#10a37f" },
  { name: "Claude", color: "#D97706" },
  { name: "Gemini", color: "#4285F4" },
  { name: "Midjourney", color: "#000000" },
  { name: "Perplexity", color: "#1C1C1E" },
  { name: "Grok", color: "#1DA1F2" },
  { name: "Flux", color: "#7C3AED" },
  { name: "DALL-E", color: "#E11D48" },
];

export const Logos = () => (
  <section className="bg-white py-8 border-y border-zinc-100">
    <p className="mb-4 text-center text-sm font-medium text-zinc-400 uppercase tracking-widest">
      Works with every AI tool
    </p>
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4">
      {tools.map((t) => (
        <span
          key={t.name}
          style={{ color: t.color }}
          className="text-base font-black tracking-tight opacity-60 hover:opacity-100 transition-opacity"
        >
          {t.name}
        </span>
      ))}
    </div>
  </section>
);
