#!/usr/bin/env node
require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TAG_MAP = {
  "foundation":       "Workflow Foundations",
  "content":          "Content Creation Workflows",
  "research":         "Research Workflows",
  "business-writing": "Business Writing Workflows",
  "product":          "Product & Strategy Workflows",
  "marketing":        "Marketing Workflows",
  "sales":            "Sales Workflows",
  "seo":              "SEO Workflows",
  "data":             "Data & Analysis Workflows",
  "productivity":     "Productivity Workflows",
  "coding":           "Coding Workflows",
};

function parseWorkflows(markdown) {
  const prompts = [];
  const blocks = markdown.split(/(?=^## WORKFLOW \d+)/m);

  for (const block of blocks) {
    if (!/^## WORKFLOW \d+/.test(block)) continue;

    const headerMatch = block.match(/^## WORKFLOW (\d+) — (.+)/m);
    if (!headerMatch) continue;
    const num = headerMatch[1].padStart(2, "0");
    const title = headerMatch[2].trim();

    const tagMatch = block.match(/\*\*Tag:\*\*\s*([\w-]+)/);
    const tag = tagMatch ? tagMatch[1].toLowerCase() : "foundation";

    const whenMatch = block.match(/\*\*When to use:\*\*\s*(.+)/);
    const description = whenMatch ? whenMatch[1].trim().slice(0, 200) : title;

    const parts = block.split(/^---$/m);
    const promptText = parts.length >= 2 ? parts[1].trim() : "";
    if (!promptText || promptText.length < 20) continue;

    prompts.push({
      id: `aiw2_${num}_${tag.replace(/-/g, "_")}`,
      title,
      description,
      prompt: promptText,
      category_id: "aiworkflows",
      subcategory: TAG_MAP[tag] || "Workflow Foundations",
      tags: [tag, "ai workflow", "automation", "claude", "chatgpt"],
      model: "Claude / ChatGPT / Gemini",
      source: "curated",
    });
  }

  return prompts;
}

async function main() {
  const markdown = fs.readFileSync("/Users/mohammedbarbar/Downloads/ai-workflow-library-vol2.md", "utf8");
  const prompts = parseWorkflows(markdown);

  console.log(`\n🤖 Parsed ${prompts.length} workflows from ai-workflow-library-vol2.md\n`);

  const bySub = {};
  for (const p of prompts) bySub[p.subcategory] = (bySub[p.subcategory] || 0) + 1;
  for (const [k, v] of Object.entries(bySub)) console.log(`  ${k}: ${v}`);

  console.log("\n🚀 Inserting into Supabase...\n");

  let inserted = 0;
  for (let i = 0; i < prompts.length; i += 50) {
    const batch = prompts.slice(i, i + 50);
    const { error } = await supabase.from("prompts").upsert(batch, { onConflict: "id" });
    if (error) console.error(`❌ Error:`, error.message);
    else { inserted += batch.length; console.log(`  Inserted ${inserted}/${prompts.length}...`); }
  }

  const { count } = await supabase.from("prompts").select("*", { count: "exact", head: true }).eq("category_id", "aiworkflows");
  console.log(`\n✅ Done — inserted ${inserted} workflows`);
  console.log(`   AI Workflows category total: ${count}`);
}

main().catch(console.error);
