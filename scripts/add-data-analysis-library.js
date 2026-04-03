#!/usr/bin/env node
/**
 * Parses data-analysis-prompt-library.md and inserts all 55 prompts into Supabase.
 */
require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Map tag → PromptVault category_id + subcategory
const TAG_MAP = {
  define:      { cat: "it",          sub: "Data Analysis" },
  understand:  { cat: "it",          sub: "Data Analysis" },
  clean:       { cat: "it",          sub: "Data Cleaning" },
  analyze:     { cat: "it",          sub: "Data Analysis" },
  visualize:   { cat: "it",          sub: "Data Visualization" },
  interpret:   { cat: "it",          sub: "Data Insights" },
  communicate: { cat: "it",          sub: "Data Reporting" },
  business:    { cat: "business",    sub: "Business Analytics" },
  debug:       { cat: "it",          sub: "Data Analysis" },
  utility:     { cat: "it",          sub: "Data Analysis" },
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

    const tagMatch = block.match(/\*\*Tag:\*\*\s*(\w+)/);
    const tag = tagMatch ? tagMatch[1].toLowerCase() : "utility";
    if (tag === "category") continue; // skip template entry

    const whenMatch = block.match(/\*\*When to use:\*\*\s*(.+)/);
    const description = whenMatch ? whenMatch[1].trim().slice(0, 200) : title;

    // Prompt body is after the first "---" separator
    const parts = block.split(/^---$/m);
    let promptText = "";
    if (parts.length >= 2) {
      promptText = parts[1].trim();
    }

    if (!promptText || promptText.length < 20) continue;

    const mapping = TAG_MAP[tag] || TAG_MAP.utility;

    prompts.push({
      id: `dal_${num}_${tag}`,
      title,
      description,
      prompt: promptText,
      category_id: mapping.cat,
      subcategory: mapping.sub,
      tags: [tag, "data", "analysis"].filter(Boolean),
      model: "ChatGPT / Claude",
      source: "curated",
    });
  }

  return prompts;
}

async function main() {
  const mdPath = "/Users/mohammedbarbar/Downloads/data-analysis-prompt-library.md";
  const markdown = fs.readFileSync(mdPath, "utf8");
  const prompts = parsePrompts(markdown);

  console.log(`\n📊 Parsed ${prompts.length} prompts from data-analysis-prompt-library.md\n`);

  const byCat = {};
  for (const p of prompts) {
    const key = `${p.category_id}/${p.subcategory}`;
    byCat[key] = (byCat[key] || 0) + 1;
  }
  for (const [key, count] of Object.entries(byCat)) {
    console.log(`  ${key}: ${count}`);
  }

  console.log("\n🚀 Inserting into Supabase...\n");

  let inserted = 0;
  for (let i = 0; i < prompts.length; i += 50) {
    const batch = prompts.slice(i, i + 50);
    const { error } = await supabase
      .from("prompts")
      .upsert(batch, { onConflict: "id" });
    if (error) {
      console.error(`❌ Batch error at ${i}:`, error.message);
    } else {
      inserted += batch.length;
      console.log(`  Inserted ${inserted}/${prompts.length}...`);
    }
  }

  const { count: itCount } = await supabase
    .from("prompts").select("*", { count: "exact", head: true }).eq("category_id", "it");
  const { count: bizCount } = await supabase
    .from("prompts").select("*", { count: "exact", head: true }).eq("category_id", "business");

  console.log(`\n✅ Done — inserted ${inserted} prompts`);
  console.log(`   IT & Tech: ${itCount} total`);
  console.log(`   Business: ${bizCount} total`);
}

main().catch(console.error);
