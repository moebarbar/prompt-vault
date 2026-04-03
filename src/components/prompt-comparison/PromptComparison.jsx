import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck, FiArrowRight, FiZap } from "react-icons/fi";

const EXAMPLES = [
  {
    label: "Marketing",
    icon: "📣",
    bad: {
      prompt: "Write me a marketing email",
      result: "Subject: Check Out Our Product!\n\nHi there,\n\nWe wanted to reach out and let you know about our amazing product. It has many great features that you might find useful. Please click the link below to learn more.\n\nBest regards,\nThe Team",
      issues: ["No target audience", "No specific goal", "Generic filler output", "Zero conversion potential"],
    },
    good: {
      prompt: "Act as an email copywriter for a B2B SaaS company. Write a cold email to [JOB TITLE] at [COMPANY TYPE] who struggles with [PAIN POINT]. Goal: book a 15-minute demo call. Use the PAS framework (Problem → Agitate → Solution). Subject line must be under 7 words. Body under 100 words. One CTA only.",
      result: "Subject: Still doing [PAIN POINT] manually?\n\nHey [FIRST NAME],\n\nMost [JOB TITLE]s at [COMPANY TYPE] waste 6+ hours/week on [PAIN POINT].\n\nThat's 300 hours a year on work that should take minutes — and it compounds every quarter.\n\n[PRODUCT] fixes this in one afternoon. Our customers cut that time by 80% in the first week.\n\nWorth a 15-minute look?\n\n→ Book a call: [LINK]",
      wins: ["Clear role + audience", "PAS framework applied", "Specific constraints = focused output", "Plug-and-play placeholders"],
    },
  },
  {
    label: "Coding",
    icon: "🧑‍💻",
    bad: {
      prompt: "Fix my code",
      result: "I'd be happy to help fix your code! However, I need to see the actual code you're referring to. Could you please share the code that needs to be fixed along with any error messages you're experiencing?",
      issues: ["No context given", "AI can't help without code", "Wastes time going back and forth", "Zero output"],
    },
    good: {
      prompt: "Act as a senior [LANGUAGE] developer. Here is my code: [PASTE CODE]. It's throwing this error: [PASTE ERROR]. The function is supposed to [DESCRIBE EXPECTED BEHAVIOR]. Debug the root cause, explain why it's happening in plain English, then give me the corrected code with comments on what changed.",
      result: "Root cause: The error occurs because [SPECIFIC EXPLANATION]. Your function is trying to access a property on an undefined value at line [X].\n\nWhy it happens: [PLAIN ENGLISH EXPLANATION]\n\nFixed code:\n```\n// [Comment: Fixed null check before accessing property]\nfunction [name]([params]) {\n  if (![variable]) return null; // Added guard\n  ...\n}\n```\nChanges made: [BULLET LIST OF FIXES]",
      wins: ["Language + role specified", "Error message included", "Expected behavior defined", "Structured output requested"],
    },
  },
  {
    label: "Sales",
    icon: "💼",
    bad: {
      prompt: "Help me with my sales pitch",
      result: "A good sales pitch should clearly communicate your value proposition. Start with an attention-grabbing opening, explain your product's benefits, address potential objections, and end with a strong call to action. Remember to focus on the customer's needs rather than your product features.",
      issues: ["Generic advice, not a pitch", "No product or audience info", "Completely unusable output", "Could apply to any business"],
    },
    good: {
      prompt: "Act as a sales consultant who has closed $10M+ in B2B deals. Write a 60-second elevator pitch for [PRODUCT] targeting [IDEAL CUSTOMER]. They currently use [COMPETITOR/STATUS QUO] and their biggest frustration is [PAIN POINT]. Lead with the pain, not the product. End with a single question that opens a conversation — not a hard close.",
      result: "\"Quick question — how much time does your team spend on [PAIN POINT] every week?\n\nMost [IDEAL CUSTOMER]s tell me it's [X hours] — hours that go straight into [COMPETITOR/STATUS QUO] that wasn't built for this.\n\n[PRODUCT] is built specifically for [IDEAL CUSTOMER]. Our customers typically cut [PAIN POINT] by [X]% in the first [TIMEFRAME].\n\nIs that a problem you're actively trying to solve right now?\"",
      wins: ["Expert role with credibility", "Specific audience + pain point", "Lead-with-pain framework", "Conversation-opening CTA"],
    },
  },
];

export const PromptComparison = () => {
  const [activeExample, setActiveExample] = useState(0);
  const ex = EXAMPLES[activeExample];

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border-2 border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-indigo-600">
          <FiZap size={11} /> The PromptVault difference
        </span>
        <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl md:leading-tight">
          Garbage in, <span className="text-zinc-400">garbage out.</span>{" "}
          <span className="text-indigo-600">Good prompt,</span> great results.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500 md:text-lg">
          Most people type one vague sentence and wonder why AI doesn't deliver. Every PromptVault prompt is engineered to get you a real, usable result — first time.
        </p>
      </div>

      {/* Example tabs */}
      <div className="mb-6 flex justify-center gap-2">
        {EXAMPLES.map((e, i) => (
          <button
            key={e.label}
            onClick={() => setActiveExample(i)}
            className={`flex items-center gap-1.5 rounded-full border-2 px-4 py-1.5 text-sm font-bold transition-all ${
              activeExample === i
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-indigo-300"
            }`}
          >
            {e.icon} {e.label}
          </button>
        ))}
      </div>

      {/* Comparison cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeExample}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {/* BAD prompt */}
          <div className="flex flex-col rounded-2xl border-2 border-red-200 bg-white overflow-hidden">
            <div className="flex items-center gap-2 border-b-2 border-red-100 bg-red-50 px-5 py-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                <FiX size={11} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-sm font-black text-red-600">Weak prompt</span>
            </div>
            <div className="flex flex-col gap-4 p-5 flex-1">
              {/* The prompt */}
              <div>
                <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">What you typed</p>
                <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3">
                  <p className="font-mono text-sm text-zinc-700">{ex.bad.prompt}</p>
                </div>
              </div>
              {/* Result */}
              <div>
                <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">What AI gave you</p>
                <div className="rounded-xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3">
                  <p className="whitespace-pre-line font-mono text-xs leading-relaxed text-zinc-500 line-clamp-6">{ex.bad.result}</p>
                </div>
              </div>
              {/* Issues */}
              <div className="mt-auto space-y-1.5">
                {ex.bad.issues.map((issue) => (
                  <div key={issue} className="flex items-center gap-2 text-xs text-red-600">
                    <FiX size={12} strokeWidth={3} className="shrink-0" />
                    {issue}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GOOD prompt */}
          <div className="flex flex-col rounded-2xl border-2 border-indigo-300 bg-white overflow-hidden shadow-[6px_6px_0px_#4338ca20]">
            <div className="flex items-center gap-2 border-b-2 border-indigo-100 bg-indigo-50 px-5 py-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600">
                <FiCheck size={11} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-sm font-black text-indigo-700">PromptVault prompt</span>
              <span className="ml-auto rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-black text-white">READY TO USE</span>
            </div>
            <div className="flex flex-col gap-4 p-5 flex-1">
              {/* The prompt */}
              <div>
                <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">What you paste in</p>
                <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50 px-4 py-3">
                  <p className="font-mono text-xs leading-relaxed text-indigo-900 line-clamp-4">{ex.good.prompt}</p>
                </div>
              </div>
              {/* Result */}
              <div>
                <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">What AI gives you</p>
                <div className="rounded-xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3">
                  <p className="whitespace-pre-line font-mono text-xs leading-relaxed text-zinc-700 line-clamp-6">{ex.good.result}</p>
                </div>
              </div>
              {/* Wins */}
              <div className="mt-auto space-y-1.5">
                {ex.good.wins.map((win) => (
                  <div key={win} className="flex items-center gap-2 text-xs text-indigo-700">
                    <FiCheck size={12} strokeWidth={3} className="shrink-0" />
                    {win}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <div className="mt-10 flex flex-col items-center gap-2 text-center">
        <p className="text-sm font-bold text-zinc-500">Every prompt in our library is engineered like the one on the right.</p>
        <Link
          href="/library"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0px_#18181b] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#18181b]"
        >
          Browse all prompts <FiArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};
