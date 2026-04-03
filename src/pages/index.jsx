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

const SITE_URL = "https://www.promptvault.io";

const SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PromptVault",
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
    name: "PromptVault",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: ["https://instagram.com/immoebarbar"],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PromptVault",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: "PromptVault is a professional AI prompt library offering 8,000+ expert copy-paste prompts for ChatGPT, Claude, and other AI tools across 27 professional categories.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
];

const FAQ_ITEMS = [
  {
    q: "What is PromptVault?",
    a: "PromptVault is a professional AI prompt library with 8,000+ expert copy-paste prompts for ChatGPT, Claude, and other AI tools. Every prompt is engineered to deliver real, usable results — no prompt engineering required.",
  },
  {
    q: "Is PromptVault free to use?",
    a: "Yes. PromptVault is free to access. Sign up with your email to browse and copy prompts across all 27 professional categories — no credit card required.",
  },
  {
    q: "What AI tools do the prompts work with?",
    a: "All prompts are optimized for ChatGPT (GPT-4o), Claude, and Gemini. Most prompts work across all major AI models with no modification needed.",
  },
  {
    q: "What categories of prompts are available?",
    a: "PromptVault covers 27 categories including Marketing, Sales, SEO, Coding, Writing, Vibe Coding, Legal, HR, Branding, Ecommerce, YouTube, Social Media, Data Analysis, Market Research, Project Management, and more.",
  },
  {
    q: "How are PromptVault prompts different from prompts I find online?",
    a: "Every PromptVault prompt is professionally engineered with a clear role, context, constraints, and structured output format. They are tested to deliver specific, usable results — not generic AI responses.",
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

const CategoriesGrid = () => (
  <section className="mx-auto max-w-7xl px-2 md:px-4">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-black md:text-4xl">AI prompts for every use case</h2>
      <p className="mt-3 text-lg text-zinc-500">
        {CATEGORIES.length} professional categories. Thousands of ready-to-use ChatGPT &amp; Claude prompts.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          href={`/library?cat=${cat.id}`}
          className="group flex flex-col items-start rounded-xl border-2 border-zinc-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-500 hover:shadow-md"
          aria-label={`Browse ${cat.label} AI prompts`}
        >
          <span className="mb-2 text-2xl" aria-hidden="true">{cat.icon}</span>
          <span className="text-sm font-bold leading-tight">{cat.label}</span>
        </Link>
      ))}
    </div>
  </section>
);

const FAQ = () => (
  <section className="mx-auto max-w-3xl px-4">
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-black md:text-4xl">Frequently asked questions</h2>
      <p className="mt-3 text-lg text-zinc-500">Everything you need to know about PromptVault.</p>
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
  const title = "PromptVault — Professional AI Prompt Library for ChatGPT & Claude";
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
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
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
        <div className="space-y-36 bg-zinc-50 pb-24 pt-24 md:pt-32">
          <Stats />
          <PromptComparison />
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
