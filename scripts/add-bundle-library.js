#!/usr/bin/env node
require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Maps tag → { category_id, subcategory }
const TAG_MAP = {
  "mental-model":     { cat: "business",  sub: "Mental Models" },
  "critical-thinking":{ cat: "business",  sub: "Critical Thinking" },
  "public-speaking":  { cat: "business",  sub: "Public Speaking" },
  "negotiation":      { cat: "sales",     sub: "Negotiation" },
  "customer-success": { cat: "business",  sub: "Customer Success" },
  "partnerships":     { cat: "business",  sub: "Partnerships & BD" },
  "finance-basics":   { cat: "finance",   sub: "Finance for Founders" },
};

// Handles prefixed IDs: MM-01, PS-01, N-01, CS-01, BD-01, FF-01
const PREFIX_MAP = {
  "MM": "mm", "PS": "ps", "N": "neg", "CS": "cs", "BD": "bd", "FF": "ff",
};

function parsePrompts(markdown) {
  const prompts = [];
  // Match any ## PROMPT XX-NN or ## PROMPT XX-NNN pattern
  const blocks = markdown.split(/(?=^## PROMPT [A-Z]+-\d+)/m);

  for (const block of blocks) {
    if (!/^## PROMPT [A-Z]+-\d+/.test(block)) continue;

    const headerMatch = block.match(/^## PROMPT ([A-Z]+)-(\d+) — (.+)/m);
    if (!headerMatch) continue;
    const prefix = headerMatch[1];
    const num = headerMatch[2].padStart(2, "0");
    const title = headerMatch[3].trim();

    const tagMatch = block.match(/\*\*Tag:\*\*\s*([\w-]+)/);
    const tag = tagMatch ? tagMatch[1].toLowerCase() : "mental-model";

    const whenMatch = block.match(/\*\*When to use:\*\*\s*(.+)/);
    const description = whenMatch ? whenMatch[1].trim().slice(0, 200) : title;

    const parts = block.split(/^---$/m);
    const promptText = parts.length >= 2 ? parts[1].trim() : "";
    if (!promptText || promptText.length < 20) continue;

    const mapping = TAG_MAP[tag] || { cat: "business", sub: "Mental Models" };
    const shortPrefix = PREFIX_MAP[prefix] || prefix.toLowerCase();

    prompts.push({
      id: `bnd_${shortPrefix}_${num}_${tag.replace(/-/g, "_")}`,
      title, description, prompt: promptText,
      category_id: mapping.cat,
      subcategory: mapping.sub,
      tags: [tag, "frameworks", "business"],
      model: "ChatGPT / Claude", source: "curated",
    });
  }
  return prompts;
}

async function main() {
  const markdown = fs.readFileSync("/Users/mohammedbarbar/Downloads/bundle-mental-models-speaking-negotiation-cs-bd-finance.md", "utf8");
  const prompts = parsePrompts(markdown);
  console.log(`\n📚 Parsed ${prompts.length} prompts from bundle\n`);
  const byCat = {};
  for (const p of prompts) {
    const key = `${p.category_id} / ${p.subcategory}`;
    byCat[key] = (byCat[key] || 0) + 1;
  }
  for (const [k, v] of Object.entries(byCat)) console.log(`  ${k}: ${v}`);
  console.log("\n🚀 Inserting...\n");
  let inserted = 0;
  for (let i = 0; i < prompts.length; i += 50) {
    const { error } = await supabase.from("prompts").upsert(prompts.slice(i, i + 50), { onConflict: "id" });
    if (error) console.error(`❌`, error.message); else inserted += prompts.slice(i, i + 50).length;
  }
  console.log(`\n✅ ${inserted} prompts inserted from bundle`);
}
main().catch(console.error);
