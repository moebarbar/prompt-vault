#!/usr/bin/env node
/**
 * Seeds the 3 initial Prompt Bundles (Goal Packs).
 * Run AFTER creating the tables in Supabase dashboard.
 *
 * node scripts/seed-bundles.js
 */
require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUNDLES = [
  {
    slug: "launch-saas-30-days",
    title: "Launch a SaaS in 30 Days",
    description: "From raw idea to paying customers — the full validated build sequence for non-technical founders.",
    icon: "🚀",
    category: "startup",
    is_published: true,
    prompts: [
      { prompt_id: "vcl_01_idea",        note: "Start here. Kill bad ideas fast before you waste a week building." },
      { prompt_id: "vcl_02_idea",        note: "Sharpen the problem you're solving into one clear sentence." },
      { prompt_id: "vcl_04_idea",        note: "Validate demand before writing a single line of code." },
      { prompt_id: "vcl_05_idea",        note: "Name and position your product for a specific customer." },
      { prompt_id: "vcl_07_planning",    note: "Define your MVP scope — only what you need to launch." },
      { prompt_id: "vcl_15_design",      note: "Write your landing page to capture early waitlist signups." },
      { prompt_id: "vcl_11_planning",    note: "Design your monetization model before you build." },
      { prompt_id: "aiw2_22_marketing",  note: "Build your launch campaign to drive your first 100 users." },
    ],
  },
  {
    slug: "grow-0-to-10k-followers",
    title: "Grow from 0 to 10K Followers",
    description: "The exact content and growth system to go from zero to 10,000 engaged followers on any platform.",
    icon: "📈",
    category: "growth",
    is_published: true,
    prompts: [
      { prompt_id: "smg_01_strategy",    note: "Pick the right platform for your goals and audience." },
      { prompt_id: "smg_03_strategy",    note: "Find your niche and own a unique position in it." },
      { prompt_id: "smg_05_profile",     note: "Optimise your bio to convert visitors to followers." },
      { prompt_id: "smg_07_content",     note: "Build a content pillar system so you never run dry." },
      { prompt_id: "smg_09_content",     note: "Write hooks that stop the scroll on every post." },
      { prompt_id: "smg_08_content",     note: "Reverse-engineer viral content in your niche." },
      { prompt_id: "smg_04_strategy",    note: "Build your 90-day roadmap with milestones." },
    ],
  },
  {
    slug: "close-first-freelance-client",
    title: "Close Your First Freelance Client",
    description: "From positioning your offer to signing the contract — the full system to land your first paying client.",
    icon: "💼",
    category: "freelancing",
    is_published: true,
    prompts: [
      { prompt_id: "fl_01_foundation",          note: "Define your niche and what makes you the obvious choice." },
      { prompt_id: "fl_02_foundation",          note: "Package your services and set your pricing." },
      { prompt_id: "fl_03_foundation",          note: "Build a portfolio that proves your value — even with no clients." },
      { prompt_id: "fl_05_client_acquisition",  note: "Write cold outreach that actually gets replies." },
      { prompt_id: "fl_08_winning_projects",    note: "Write a proposal that closes — not just informs." },
      { prompt_id: "fl_10_client_management",   note: "Use a contract that protects you from day one." },
    ],
  },
];

async function main() {
  console.log("\n🎯 Seeding Prompt Bundles...\n");

  for (const bundle of BUNDLES) {
    const { prompts, ...bundleData } = bundle;

    // Upsert bundle (by slug)
    const { data: existing } = await supabase
      .from("prompt_bundles")
      .select("id")
      .eq("slug", bundleData.slug)
      .single();

    let bundleId;
    if (existing) {
      bundleId = existing.id;
      await supabase.from("prompt_bundles").update(bundleData).eq("id", bundleId);
      // Clear existing prompts to re-seed
      await supabase.from("bundle_prompts").delete().eq("bundle_id", bundleId);
      console.log(`  ↻ Updated: ${bundleData.title}`);
    } else {
      const { data, error } = await supabase.from("prompt_bundles").insert(bundleData).select("id").single();
      if (error) { console.error(`  ❌ ${bundleData.title}:`, error.message); continue; }
      bundleId = data.id;
      console.log(`  ✓ Created: ${bundleData.title}`);
    }

    // Insert ordered prompts
    const bundlePrompts = prompts.map((p, i) => ({
      bundle_id: bundleId,
      prompt_id: p.prompt_id,
      position: i + 1,
      note: p.note || null,
    }));

    const { error: pe } = await supabase.from("bundle_prompts").insert(bundlePrompts);
    if (pe) console.error(`    ❌ Prompts error:`, pe.message);
    else console.log(`    → ${prompts.length} prompts linked`);
  }

  console.log("\n✅ Bundles seeded!\n");
}

main().catch(console.error);
