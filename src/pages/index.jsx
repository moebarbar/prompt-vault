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
import { font } from "@/fonts";
import { CATEGORIES } from "@/data/prompts";
import Link from "next/link";

const CategoriesGrid = () => (
  <section className="mx-auto max-w-7xl px-2 md:px-4">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-black md:text-4xl">Every category you need</h2>
      <p className="mt-3 text-lg text-zinc-500">25 professional categories. Hundreds of ready-to-use prompts.</p>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          href={`/library?cat=${cat.id}`}
          className="group flex flex-col items-start rounded-xl border-2 border-zinc-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-500 hover:shadow-md"
        >
          <span className="mb-2 text-2xl">{cat.icon}</span>
          <span className="text-sm font-bold leading-tight">{cat.label}</span>
        </Link>
      ))}
    </div>
  </section>
);

export default function Home() {
  return (
    <main className={`${font.className} overflow-hidden`}>
      <ExpandableNavBar links={NAV_LINKS}>
        <Hero />
      </ExpandableNavBar>
      <Logos />
      <div className="space-y-36 bg-zinc-50 pb-24 pt-24 md:pt-32">
        <Stats />
        <FeatureToggles />
        <CategoriesGrid />
        <Supports />
      </div>
      <EmailCapture />
      <FinalCTA />
      <Footer />
    </main>
  );
}
