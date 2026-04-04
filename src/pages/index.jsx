import Head from "next/head";
import { EmailCapture } from "@/components/email-capture/EmailCapture";
import { FeatureToggles } from "@/components/feature-toggles/FeatureToggles";
import { Supports } from "@/components/supports/Supports";
import { Hero } from "@/components/hero/Hero";
import { Logos } from "@/components/logos/Logos";
import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { NAV_LINKS } from "@/components/navigation/constants";
import { Stats } from "@/components/stats/Stats";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { PromptComparison } from "@/components/prompt-comparison/PromptComparison";
import { font } from "@/fonts";
import { CATEGORIES } from "@/data/prompts";
import Link from "next/link";

const SITE_URL = "https://www.promptupp.com";

const SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PromptUpp",
    url: SITE_URL,
    description: "Professional AI prompt library with 8,000+ expert copy-paste prompts for ChatGPT, Claude, and other AI tools across 27 categories.",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/library?search={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PromptUpp",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: ["https://instagram.com/immoebarbar"],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PromptUpp",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: "PromptUpp is a professional AI prompt library offering 8,000+ expert copy-paste prompts for ChatGPT, Claude, and other AI tools across 27 professional categories.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
];

const FAQ_ITEMS = [
  {
    q: "What is PromptUpp?",
    a: "PromptUpp is a professional AI prompt library with 8,000+ expert copy-paste prompts for ChatGPT, Claude, and other AI tools. Every prompt is engineered to deliver real, usable results — no prompt engineering required.",
  },
  {
    q: "Is PromptUpp free to use?",
    a: "Yes. PromptUpp is free to access. Sign up with your email to browse and copy prompts across all 27 professional categories — no credit card required.",
  },
  {
    q: "What AI tools do the prompts work with?",
    a: "All prompts are optimized for ChatGPT (GPT-4o), Claude, and Gemini. Most prompts work across all major AI models with no modification needed.",
  },
  {
    q: "What categories of prompts are available?",
    a: "PromptUpp covers 27 categories including Marketing, Sales, SEO, Coding, Writing, Vibe Coding, Legal, HR, Branding, Ecommerce, YouTube, Social Media, Data Analysis, Market Research, Project Management, and more.",
  },
  {
    q: "How are PromptUpp prompts different from prompts I find online?",
    a: "Every PromptUpp prompt is professionally engineered with a clear role, context, constraints, and structured output format. They are tested to deliver specific, usable results — not generic AI responses.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// Real bundle examples for the landing page preview
const PREVIEW_PACKS = [
  { icon: "🚀", title: "Launch a SaaS in 30 Days", description: "From idea to paying customers in one month", steps: 10 },
  { icon: "📈", title: "Grow From 0 to 10,000 Followers", description: "The exact system that built accounts from nothing", steps: 10 },
  { icon: "💼", title: "Close Your First Freelance Client", description: "From unknown to hired in under 30 days", steps: 10 },
  { icon: "📦", title: "Write and Launch a Digital Product in a Week", description: "From blank page to first sale in 7 days", steps: 10 },
  { icon: "📧", title: "Get Your First 1,000 Email Subscribers", description: "Build the asset that no algorithm can take away", steps: 10 },
  { icon: "💰", title: "Raise Your First Round of Funding", description: "From deck to term sheet", steps: 10 },
];

const GoalPacksPreview = () => (
  <section className="mx-auto max-w-7xl px-4">
    <div className="mb-10 text-center">
      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border-2 border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-indigo-600">
        Goal Packs
      </span>
      <h2 className="text-3xl font-black md:text-5xl">Prompts with a purpose.</h2>
      <p className="mx-auto mt-3 max-w-xl text-lg text-zinc-500">
        Each pack is a step-by-step sequence of expert prompts built to achieve one specific goal — in order, from start to finish.
      </p>
    </div>

    {/* Cards grid with fade-out reveal */}
    <div className="relative">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PREVIEW_PACKS.map((pack, i) => (
          <div
            key={pack.title}
            className={`flex flex-col gap-4 rounded-xl border-2 border-zinc-200 bg-white p-5 transition-all ${i >= 3 ? "opacity-40 blur-[2px]" : ""}`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-3xl leading-none">{pack.icon}</span>
              <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-black tabular-nums text-indigo-600">
                {pack.steps} prompts
              </span>
            </div>
            <div className="flex-1">
              <p className="font-black text-sm text-zinc-900 leading-tight">{pack.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{pack.description}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-600">
              Start this pack →
            </div>
          </div>
        ))}
      </div>

      {/* Lock overlay */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-6 pt-32"
        style={{ background: "linear-gradient(to bottom, transparent, white 60%)" }}>
        <div className="rounded-2xl border-2 border-zinc-900 bg-white px-8 py-6 text-center shadow-[5px_5px_0px_#18181b]">
          <p className="text-base font-black text-zinc-900">🔒 Unlock all 29 Goal Packs</p>
          <p className="mt-1 text-sm text-zinc-500">Free account. No credit card needed.</p>
          <Link
            href="/signup"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white hover:bg-indigo-700 transition-colors"
          >
            Get free access →
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const CategoriesGrid = () => (
  <section className="mx-auto max-w-7xl px-2 md:px-4">
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-black md:text-5xl">AI prompts for every use case</h2>
      <p className="mt-3 text-lg text-zinc-500">
        {CATEGORIES.length} professional categories. Thousands of ready-to-use ChatGPT &amp; Claude prompts.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          href={`/library?cat=${cat.id}`}
          aria-label={`Browse ${cat.label} AI prompts`}
          className="group flex flex-col gap-3 rounded-2xl border-2 border-zinc-900 bg-white p-4 shadow-[3px_3px_0px_#18181b] transition-all duration-150 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#4f46e5] active:translate-y-0 active:shadow-[2px_2px_0px_#18181b]"
        >
          <span className="text-3xl leading-none" aria-hidden="true">{cat.icon}</span>
          <div>
            <p className="text-sm font-black leading-tight text-zinc-900">{cat.label}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-400 line-clamp-2">{cat.description}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

const FAQ = () => (
  <section className="mx-auto max-w-3xl px-4">
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-black md:text-4xl">Frequently asked questions</h2>
      <p className="mt-3 text-lg text-zinc-500">Everything you need to know about PromptUpp.</p>
    </div>
    <div className="space-y-4">
      {FAQ_ITEMS.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border-2 border-zinc-200 bg-white px-5 py-4 open:border-indigo-300"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-zinc-800 marker:content-none">
            {item.q}
            <span className="shrink-0 text-xl leading-none text-indigo-600 transition-transform duration-200 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">{item.a}</p>
        </details>
      ))}
    </div>
  </section>
);

export default function Home() {
  const title = "PromptUpp — Professional AI Prompt Library for ChatGPT & Claude";
  const description = "8,000+ expert copy-paste AI prompts for ChatGPT, Claude & more. Marketing, sales, coding, SEO, writing, legal, HR — ready to use in seconds. Free access, no credit card.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/api/og?title=8%2C000%2B+Professional+AI+Prompts&sub=Copy.+Paste.+Get+real+results.`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/api/og?title=8%2C000%2B+Professional+AI+Prompts&sub=Copy.+Paste.+Get+real+results.`} />
        {SCHEMAS.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <main className={`${font.className} overflow-hidden`}>
        <ExpandableNavBar links={NAV_LINKS}>
          <Hero />
        </ExpandableNavBar>
        <Logos />
        <div className="space-y-20 bg-zinc-50 pb-16 pt-16 md:space-y-36 md:pb-24 md:pt-32">
          <Stats />
          <PromptComparison />
          <GoalPacksPreview />
          <FeatureToggles />
          <CategoriesGrid />
          <FAQ />
          <Supports />
        </div>
        <EmailCapture />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
