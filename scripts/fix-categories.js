#!/usr/bin/env node
/**
 * PromptVault — Category Fix + Deduplication Script
 *
 * Step 1: Delete all duplicate prompts (keep lowest ID per fingerprint)
 * Step 2: Reclassify prompts to the correct category_id based on subcategory
 *
 * Run: node scripts/fix-categories.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Subcategory → correct category_id mapping ─────────────────────────────────
// Order matters: more specific matches first
const SUBCAT_REMAP = [
  // ── HR ──────────────────────────────────────────────────────────────────────
  { match: /\bhr\b|human resources|recruitment|onboarding|offboarding|performance review|job description|employee|workforce|hiring|payroll|diversity|inclusion/i, cat: "hr" },

  // ── Legal ───────────────────────────────────────────────────────────────────
  { match: /\blegal\b|contract|clause|compliance|gdpr|nda|terms of service|privacy policy|litigation|intellectual property|trademark|copyright|attorney|lawyer/i, cat: "legal" },

  // ── Accounting ──────────────────────────────────────────────────────────────
  { match: /\baccounting\b|bookkeeping|invoic|tax|financial report|balance sheet|profit.loss|cash flow|audit|budget analysis|expense tracking|accounts payable|accounts receivable/i, cat: "accounting" },

  // ── Branding ────────────────────────────────────────────────────────────────
  { match: /\bbranding\b|brand identity|brand voice|brand story|brand guideline|logo|tagline|brand name|positioning statement|visual identity|brand strategy/i, cat: "branding" },

  // ── Project Management ───────────────────────────────────────────────────────
  { match: /project management|project plan|agile|scrum|sprint|kanban|milestone|stakeholder|project brief|risk management|gantt|roadmap|deliverable|project timeline/i, cat: "projectmgmt" },

  // ── Finding Home (buyer perspective) ─────────────────────────────────────────
  { match: /home buying|first.time buyer|mortgage|home search|house hunting|finding a home|property search|home inspection|closing cost|down payment|neighborhood/i, cat: "findinghome" },

  // ── Real Estate (agent/investor perspective) ──────────────────────────────────
  { match: /real estate|property listing|airbnb|rental property|landlord|real estate agent|property management|house flipping|investment property|lease agreement|tenant/i, cat: "realestate" },

  // ── Image Generation ─────────────────────────────────────────────────────────
  { match: /image gen|midjourney|dall.e|stable diffusion|flux|image prompt|art prompt|photo prompt|visual prompt|ai art|text.to.image|image creation/i, cat: "imagegen" },

  // ── Coding ───────────────────────────────────────────────────────────────────
  { match: /\bcoding\b|\bprogramming\b|software development|github|python|javascript|typescript|react|node\.?js|sql|api|debugging|code review|unit test|algorithm|data structure/i, cat: "coding" },

  // ── YouTube ───────────────────────────────────────────────────────────────────
  { match: /youtube|video script|video description|youtube title|youtube hook|video thumbnail|channel growth|subscriber/i, cat: "youtube" },

  // ── SEO ───────────────────────────────────────────────────────────────────────
  { match: /\bseo\b|search engine|keyword research|meta description|backlink|on.page seo|off.page seo|serp|organic traffic|link building|technical seo/i, cat: "seo" },

  // ── Affiliate Marketing → marketing (not business) ────────────────────────────
  { match: /affiliate marketing|affiliate program|commission|referral program|affiliate link|affiliate partner/i, cat: "marketing" },

  // ── Sales ─────────────────────────────────────────────────────────────────────
  { match: /sales outreach|cold email|cold call|sales pitch|objection handling|sales funnel|crm|follow.up email|prospect|lead generation|closing deal|discovery call/i, cat: "sales" },

  // ── Resume ────────────────────────────────────────────────────────────────────
  { match: /\bresume\b|\bcv\b|cover letter|job application|linkedin profile|ats resume/i, cat: "resume" },

  // ── Job Interview ─────────────────────────────────────────────────────────────
  { match: /job interview|interview prep|interview question|behavioral question|star method|interview answer|salary negotiation|career change/i, cat: "interview" },

  // ── Ecommerce ─────────────────────────────────────────────────────────────────
  { match: /ecommerce|product description|shopify|amazon listing|product title|product review|dropshipping|online store|product page/i, cat: "ecommerce" },

  // ── Finance ───────────────────────────────────────────────────────────────────
  { match: /\bfinance\b|investing|stock market|portfolio|financial planning|budgeting|retirement|cryptocurrency|personal finance|wealth management/i, cat: "finance" },

  // ── AI Workflows ──────────────────────────────────────────────────────────────
  { match: /ai workflow|prompt engineering|ai automation|chatbot|ai agent|zapier|make\.com|n8n|ai tool|llm|gpt prompt|system prompt|act as/i, cat: "aiworkflows" },

  // ── Vibe Coding ───────────────────────────────────────────────────────────────
  { match: /saas|no.code|low.code|app development|mvp|product launch|startup|bubble|webflow|no code app/i, cat: "vibecoding" },

  // ── Students ──────────────────────────────────────────────────────────────────
  { match: /student|essay|thesis|dissertation|homework|study plan|research paper|academic|school|university|college|exam prep|learning/i, cat: "students" },

  // ── Marketing (generic) ───────────────────────────────────────────────────────
  { match: /marketing|campaign|email marketing|newsletter|copywriting|ad copy|landing page|conversion|funnel|content marketing|influencer/i, cat: "marketing" },

  // ── Social Media ──────────────────────────────────────────────────────────────
  { match: /social media|instagram|twitter|linkedin post|facebook|tiktok|caption|hashtag|engagement|story|reel/i, cat: "social" },

  // ── Content Creation ──────────────────────────────────────────────────────────
  { match: /content creation|blog post|content calendar|repurpose content|content strategy|podcast|newsletter content/i, cat: "content" },

  // ── IT & Tech ─────────────────────────────────────────────────────────────────
  { match: /information technology|it support|cybersecurity|network|cloud|data center|system admin|google sheets|excel|spreadsheet|data analysis/i, cat: "it" },

  // ── Business (generic) ────────────────────────────────────────────────────────
  { match: /business plan|business strategy|startup|entrepreneurship|proposal|pitch deck|business model|operations|management|consulting/i, cat: "business" },

  // ── Writing (generic fallback) ────────────────────────────────────────────────
  { match: /writing|storytelling|creative writing|short story|poetry|script|fiction|narrative|blog|article/i, cat: "writing" },
];

function getCorrectCategory(subcategory, currentCategory) {
  if (!subcategory) return null; // no change

  for (const rule of SUBCAT_REMAP) {
    if (rule.match.test(subcategory)) {
      // Only return if different from current
      return rule.cat !== currentCategory ? rule.cat : null;
    }
  }
  return null;
}

// ── Deduplication ─────────────────────────────────────────────────────────────
function fingerprint(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

async function deduplicatePrompts() {
  console.log("\n🔍 Step 1: Deduplicating prompts...\n");

  let page = 0;
  const pageSize = 1000;
  const seen = new Map(); // fingerprint → {id, category_id}
  const toDelete = [];
  let hasMore = true;
  let totalScanned = 0;

  // Scan all prompts ordered by id (keep lowest id = first imported)
  while (hasMore) {
    const { data, error } = await supabase
      .from("prompts")
      .select("id, prompt, category_id, source")
      .order("id", { ascending: true })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) { console.error("Scan error:", error.message); break; }
    if (!data || data.length === 0) { hasMore = false; break; }

    for (const row of data) {
      const fp = fingerprint(row.prompt);
      if (!fp) { continue; } // skip empty prompts

      if (seen.has(fp)) {
        // Already seen — this is a duplicate
        toDelete.push(row.id);
      } else {
        seen.set(fp, { id: row.id, category_id: row.category_id });
      }
    }

    totalScanned += data.length;
    process.stdout.write(`  Scanned ${totalScanned} prompts, found ${toDelete.length} duplicates...\r`);

    page++;
    if (data.length < pageSize) hasMore = false;
  }

  console.log(`\n  Scanned ${totalScanned} total, found ${toDelete.length} duplicates to delete`);

  if (toDelete.length === 0) {
    console.log("  ✅ No duplicates found");
    return 0;
  }

  // Delete in batches of 500
  let deleted = 0;
  for (let i = 0; i < toDelete.length; i += 500) {
    const batch = toDelete.slice(i, i + 500);
    const { error } = await supabase
      .from("prompts")
      .delete()
      .in("id", batch);
    if (error) {
      console.error(`\n  Delete error at batch ${i}:`, error.message);
    } else {
      deleted += batch.length;
      process.stdout.write(`  Deleted ${deleted}/${toDelete.length}...\r`);
    }
  }

  console.log(`\n  ✅ Deleted ${deleted} duplicate prompts`);
  return deleted;
}

// ── Reclassification ──────────────────────────────────────────────────────────
async function reclassifyPrompts() {
  console.log("\n🏷️  Step 2: Reclassifying misrouted prompts...\n");

  let page = 0;
  const pageSize = 1000;
  let hasMore = true;
  let totalReclassified = 0;
  let totalScanned = 0;

  while (hasMore) {
    const { data, error } = await supabase
      .from("prompts")
      .select("id, subcategory, category_id")
      .order("id", { ascending: true })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) { console.error("Scan error:", error.message); break; }
    if (!data || data.length === 0) { hasMore = false; break; }

    // Group updates by new category
    const updates = [];
    for (const row of data) {
      const newCat = getCorrectCategory(row.subcategory, row.category_id);
      if (newCat) {
        updates.push({ id: row.id, category_id: newCat });
      }
    }

    // Apply updates individually (Supabase doesn't support batch update with different values)
    for (const update of updates) {
      const { error: upErr } = await supabase
        .from("prompts")
        .update({ category_id: update.category_id })
        .eq("id", update.id);
      if (upErr) console.error(`  Update error for id ${update.id}:`, upErr.message);
      else totalReclassified++;
    }

    totalScanned += data.length;
    process.stdout.write(`  Processed ${totalScanned} prompts, reclassified ${totalReclassified}...\r`);

    page++;
    if (data.length < pageSize) hasMore = false;
  }

  console.log(`\n  ✅ Reclassified ${totalReclassified} prompts to correct categories`);
  return totalReclassified;
}

// ── Summary ───────────────────────────────────────────────────────────────────
async function printCategorySummary() {
  console.log("\n📊 Category counts after cleanup:\n");

  const { data, error } = await supabase
    .from("prompts")
    .select("category_id");

  if (error) { console.error(error.message); return; }

  const counts = {};
  for (const row of data) {
    counts[row.category_id] = (counts[row.category_id] || 0) + 1;
  }

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sorted) {
    const bar = "█".repeat(Math.min(40, Math.floor(count / 5)));
    console.log(`  ${cat.padEnd(15)} ${String(count).padStart(5)}  ${bar}`);
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`\n  Total: ${total} prompts`);
}

async function main() {
  console.log("🚀 PromptVault — Category Fix + Deduplication\n");
  console.log("=".repeat(50));

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Missing Supabase env vars in .env.local");
    process.exit(1);
  }

  const deletedCount = await deduplicatePrompts();
  const reclassifiedCount = await reclassifyPrompts();
  await printCategorySummary();

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Done — deleted ${deletedCount} dupes, reclassified ${reclassifiedCount} prompts`);
}

main().catch(console.error);
