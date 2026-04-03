#!/usr/bin/env node
require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const TAG_MAP = {
  "strategy": "Affiliate Strategy",
  "content":  "Content & Review Writing",
  "seo":      "SEO for Affiliates",
  "social":   "Social Promotion",
  "scaling":  "Scaling & Automation",
};
function parsePrompts(markdown) {
  const prompts = [];
  const blocks = markdown.split(/(?=^## PROMPT \d+)/m);
  for (const block of blocks) {
    if (!/^## PROMPT \d+/.test(block)) continue;
    const headerMatch = block.match(/^## PROMPT (\d+) — (.+)/m);
    if (!headerMatch) continue;
    const num = headerMatch[1].padStart(2, "0");
    const title = headerMatch[2].trim();
    const tagMatch = block.match(/\*\*Tag:\*\*\s*([\w-]+)/);
    const tag = tagMatch ? tagMatch[1].toLowerCase() : "strategy";
    const whenMatch = block.match(/\*\*When to use:\*\*\s*(.+)/);
    const description = whenMatch ? whenMatch[1].trim().slice(0, 200) : title;
    const parts = block.split(/^---$/m);
    const promptText = parts.length >= 2 ? parts[1].trim() : "";
    if (!promptText || promptText.length < 20) continue;
    prompts.push({ id: `aff_${num}_${tag.replace(/-/g, "_")}`, title, description, prompt: promptText, category_id: "affiliate", subcategory: TAG_MAP[tag] || "Affiliate Strategy", tags: [tag, "affiliate marketing", "passive income"], model: "ChatGPT / Claude", source: "curated" });
  }
  return prompts;
}
async function main() {
  const prompts = parsePrompts(fs.readFileSync("/Users/mohammedbarbar/Downloads/affiliate-marketing-prompt-library.md", "utf8"));
  console.log(`\n🤝 Parsed ${prompts.length} prompts\n`);
  const bySub = {};
  for (const p of prompts) bySub[p.subcategory] = (bySub[p.subcategory] || 0) + 1;
  for (const [k, v] of Object.entries(bySub)) console.log(`  ${k}: ${v}`);
  let inserted = 0;
  for (let i = 0; i < prompts.length; i += 50) {
    const { error } = await supabase.from("prompts").upsert(prompts.slice(i, i + 50), { onConflict: "id" });
    if (error) console.error(`❌`, error.message); else inserted += prompts.slice(i, i + 50).length;
  }
  const { count } = await supabase.from("prompts").select("*", { count: "exact", head: true }).eq("category_id", "affiliate");
  console.log(`\n✅ ${inserted} inserted, Affiliate total: ${count}`);
}
main().catch(console.error);
