#!/usr/bin/env node
/**
 * Seeds all 27 prompt bundles (01-30, minus 10, 24, 26 which are unavailable).
 * Upserts: updates existing bundles, creates new ones.
 * node scripts/seed-all-bundles.js
 */
require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const DOWNLOADS = "/Users/mohammedbarbar/Downloads";

const BUNDLE_META = {
  1:  { icon: "🚀", category: "startup",     slug: "launch-saas-30-days" },
  2:  { icon: "📈", category: "growth",      slug: "grow-0-to-10k-followers" },
  3:  { icon: "💼", category: "freelancing", slug: "close-first-freelance-client" },
  4:  { icon: "📦", category: "content",     slug: "write-launch-digital-product" },
  5:  { icon: "📬", category: "growth",      slug: "get-first-1000-email-subscribers" },
  6:  { icon: "💰", category: "startup",     slug: "raise-first-round-funding" },
  7:  { icon: "🔥", category: "freelancing", slug: "employee-to-full-time-freelancer" },
  8:  { icon: "📰", category: "content",     slug: "launch-newsletter-makes-money" },
  9:  { icon: "🎯", category: "career",      slug: "get-new-job-30-days" },
  11: { icon: "🛒", category: "startup",     slug: "launch-ecommerce-store-2-weeks" },
  12: { icon: "🏆", category: "growth",      slug: "become-recognized-thought-leader" },
  13: { icon: "💎", category: "freelancing", slug: "close-10k-client-deal" },
  14: { icon: "👔", category: "freelancing", slug: "build-6-figure-consulting-practice" },
  15: { icon: "📊", category: "business",    slug: "master-business-finances" },
  16: { icon: "🎓", category: "content",     slug: "build-launch-online-course" },
  17: { icon: "📈", category: "startup",     slug: "grow-saas-1k-to-10k-mrr" },
  18: { icon: "📰", category: "marketing",   slug: "get-featured-press-media" },
  19: { icon: "🔥", category: "growth",      slug: "build-viral-social-presence-90-days" },
  20: { icon: "🧠", category: "freelancing", slug: "launch-coaching-consulting-offer" },
  21: { icon: "💰", category: "career",      slug: "negotiate-raise-promotion" },
  22: { icon: "✨", category: "growth",      slug: "build-personal-brand" },
  23: { icon: "📦", category: "freelancing", slug: "build-productized-service" },
  24: { icon: "▶️",  category: "content",     slug: "build-profitable-youtube-channel" },
  25: { icon: "🤝", category: "business",    slug: "close-partnership-deal" },
  26: { icon: "📖", category: "content",     slug: "write-book-90-days" },
  27: { icon: "📣", category: "marketing",   slug: "run-profitable-paid-ad-campaign" },
  28: { icon: "👥", category: "business",    slug: "build-remote-team-delegate" },
  29: { icon: "🏢", category: "freelancing", slug: "win-first-enterprise-client" },
  30: { icon: "💪", category: "startup",     slug: "relaunch-business-after-failure" },
};

const FILES = [
  { file: "prompt-bundles-01-05-full-prompts.md",    allow: [1,2,3,4,5] },
  { file: "prompt-bundles-06-10-full-prompts.md",    allow: [6,7,8,9] },
  { file: "prompt-bundles-11-20-full-prompts.md",    allow: [11,12,13] },
  { file: "prompt-bundles-14-20-full-prompts.md",    allow: [14,15,16,17,18,19,20] },
  { file: "prompt-bundles-21-30-full-prompts.md",    allow: [21,22] },
  { file: "prompt-bundles-23-30-full-prompts.md",    allow: [23,25,27,28,29,30] },
];

// Standalone single-bundle files (different header format: "# Bundle N —")
const SINGLE_FILES = [
  { file: "prompt-bundle-24-youtube-channel-full.md", num: 24, title: "Build a Profitable YouTube Channel" },
  { file: "prompt-bundle-26-write-a-book-full.md",    num: 26, title: "Write a Book in 90 Days" },
];

// ── Parser ────────────────────────────────────────────────────────────────────

function parseFile(filePath, allowedNums) {
  const text = fs.readFileSync(filePath, "utf8");
  const result = [];

  const headerRe = /\n# BUNDLE (\d+) — ([^\n]+)\n/g;
  const headers = [];
  let m;
  while ((m = headerRe.exec(text)) !== null) {
    const num = parseInt(m[1], 10);
    if (!allowedNums.includes(num)) continue;
    headers.push({ num, title: m[2].trim(), pos: m.index + m[0].length });
  }

  for (let i = 0; i < headers.length; i++) {
    const { num, title, pos } = headers[i];
    // Content ends at next bundle header or EOF
    const nextHeaderSearch = text.indexOf("\n# BUNDLE ", pos);
    const contentEnd = nextHeaderSearch > pos ? nextHeaderSearch : text.length;
    const content = text.slice(pos, contentEnd);

    const taglineMatch = content.match(/\*\*Tagline:\*\* ([^\n]+)/);
    const tagline = taglineMatch ? taglineMatch[1].trim() : "";
    const prompts = parsePrompts(content);

    if (prompts.length > 0) {
      result.push({ num, title, tagline, prompts });
    }
  }

  return result;
}

function parsePrompts(content) {
  const prompts = [];
  const headerRe = /### PROMPT \d+ OF \d+ — ([^\n]+)\n/g;
  const headers = [];
  let m;
  while ((m = headerRe.exec(content)) !== null) {
    headers.push({ title: m[1].trim(), pos: m.index + m[0].length });
  }

  for (let i = 0; i < headers.length; i++) {
    const { title, pos } = headers[i];
    // Chunk ends just before the next prompt header
    let chunkEnd = content.length;
    if (i + 1 < headers.length) {
      // Back up to just before "### PROMPT"
      const nextHeaderStart = content.lastIndexOf("### PROMPT", headers[i + 1].pos);
      if (nextHeaderStart > pos) chunkEnd = nextHeaderStart;
    }
    const chunk = content.slice(pos, chunkEnd);

    // Find first \n---\n separator
    const sep1 = chunk.indexOf("\n---\n");
    if (sep1 === -1) continue;

    const before = chunk.slice(0, sep1).trim();
    const rest = chunk.slice(sep1 + 5);

    // Prompt text ends at final \n---\n if present
    const sep2 = rest.lastIndexOf("\n---\n");
    const promptText = sep2 > 0 ? rest.slice(0, sep2).trim() : rest.trim();

    if (!promptText || promptText.length < 30) continue;

    prompts.push({
      title,
      why_this_step: before.length > 0 ? before : null,
      prompt_text: promptText,
    });
  }

  return prompts;
}

function parseSingleFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const taglineMatch = text.match(/\*\*Tagline:\*\* ([^\n]+)/);
  const tagline = taglineMatch ? taglineMatch[1].trim() : "";
  const prompts = parsePrompts(text);
  return { tagline, prompts };
}

// ── Seeder ────────────────────────────────────────────────────────────────────

async function upsertBundle(num, title, tagline, prompts) {
  const meta = BUNDLE_META[num];
  if (!meta) return;

  const bundleRow = {
    slug: meta.slug,
    title,
    description: tagline || title,
    icon: meta.icon,
    category: meta.category,
    is_published: true,
    status: "published",
  };

  const { data: existing } = await supabase
    .from("prompt_bundles")
    .select("id")
    .eq("slug", meta.slug)
    .single();

  let bundleId;
  if (existing) {
    await supabase.from("prompt_bundles").update(bundleRow).eq("id", existing.id);
    await supabase.from("bundle_prompts").delete().eq("bundle_id", existing.id);
    bundleId = existing.id;
    console.log(`  ↻ Updated:  [${num.toString().padStart(2, "0")}] ${title}`);
  } else {
    const { data, error } = await supabase.from("prompt_bundles").insert(bundleRow).select("id").single();
    if (error) { console.error(`  ❌ ${title}:`, error.message); return; }
    bundleId = data.id;
    console.log(`  ✓ Created:  [${num.toString().padStart(2, "0")}] ${title}`);
  }

  const rows = prompts.map((p, i) => ({
    bundle_id: bundleId,
    prompt_id: null,
    position: i + 1,
    title: p.title,
    note: p.why_this_step || null,
    why_this_step: p.why_this_step || null,
    expected_output: null,
    prompt_text: p.prompt_text,
  }));

  const { error } = await supabase.from("bundle_prompts").insert(rows);
  if (error) console.error(`    ❌ Prompts:`, error.message);
  else console.log(`    → ${prompts.length} prompts`);
}

async function main() {
  console.log("\n🎯 Seeding All Prompt Bundles...\n");

  const allBundles = new Map();

  for (const { file, allow } of FILES) {
    const filePath = path.join(DOWNLOADS, file);
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  Missing: ${file}`);
      continue;
    }
    console.log(`📄 ${file}`);
    const parsed = parseFile(filePath, allow);
    console.log(`   → ${parsed.length} bundle(s) parsed\n`);
    for (const b of parsed) allBundles.set(b.num, b);
  }

  // Parse standalone single-bundle files (bundles 24, 26)
  for (const { file, num, title } of SINGLE_FILES) {
    const filePath = path.join(DOWNLOADS, file);
    if (!fs.existsSync(filePath)) { console.log(`  ⚠️  Missing: ${file}`); continue; }
    console.log(`📄 ${file}`);
    const { tagline, prompts } = parseSingleFile(filePath);
    console.log(`   → ${prompts.length} prompt(s) parsed\n`);
    if (prompts.length > 0) allBundles.set(num, { num, title, tagline, prompts });
  }

  console.log(`\n📦 ${allBundles.size} total bundles to seed\n${"─".repeat(50)}`);

  const sorted = [...allBundles.values()].sort((a, b) => a.num - b.num);
  for (const b of sorted) {
    await upsertBundle(b.num, b.title, b.tagline, b.prompts);
  }

  console.log(`\n${"─".repeat(50)}\n✅ Done!\n`);
}

main().catch(console.error);
