#!/usr/bin/env node
require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TAG_MAP = {
  "foundation":    "PM Foundations",
  "planning":      "Project Planning",
  "execution":     "Execution & Delivery",
  "agile":         "Agile & Scrum",
  "team":          "Team Management",
  "stakeholder":   "Stakeholder Management",
  "risk":          "Risk Management",
  "quality":       "Quality & Standards",
  "closeout":      "Project Closeout",
  "project-type":  "Project Types",
  "pm-skills":     "PM Skills & Career",
  "utility":       "Utility",
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
    const tag = tagMatch ? tagMatch[1].toLowerCase() : "foundation";
    if (tag === "category") continue;

    const whenMatch = block.match(/\*\*When to use:\*\*\s*(.+)/);
    const description = whenMatch ? whenMatch[1].trim().slice(0, 200) : title;

    const parts = block.split(/^---$/m);
    const promptText = parts.length >= 2 ? parts[1].trim() : "";
    if (!promptText || promptText.length < 20) continue;

    prompts.push({
      id: `pm_${num}_${tag.replace(/-/g, "_")}`,
      title,
      description,
      prompt: promptText,
      category_id: "projectmgmt",
      subcategory: TAG_MAP[tag] || "PM Foundations",
      tags: [tag, "project management"],
      model: "ChatGPT / Claude",
      source: "curated",
    });
  }

  return prompts;
}

async function main() {
  const markdown = fs.readFileSync("/Users/mohammedbarbar/Downloads/project-management-prompt-library.md", "utf8");
  const prompts = parsePrompts(markdown);

  console.log(`\n📋 Parsed ${prompts.length} prompts from project-management-prompt-library.md\n`);

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

  const { count } = await supabase.from("prompts").select("*", { count: "exact", head: true }).eq("category_id", "projectmgmt");
  console.log(`\n✅ Done — inserted ${inserted} prompts`);
  console.log(`   Project Mgmt category total: ${count}`);
}

main().catch(console.error);
