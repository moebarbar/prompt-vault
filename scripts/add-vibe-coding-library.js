#!/usr/bin/env node
/**
 * Parses vibe-coding-prompt-library.md and inserts all 69 prompts into Supabase.
 */
require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Map tag → PromptUpp category_id + subcategory
const TAG_MAP = {
  idea:        { cat: "vibecoding", sub: "Idea & Validation" },
  planning:    { cat: "vibecoding", sub: "Planning & Strategy" },
  design:      { cat: "vibecoding", sub: "Design & UX" },
  build:       { cat: "vibecoding", sub: "SaaS Building" },
  debugging:   { cat: "coding",     sub: "Debugging" },
  security:    { cat: "vibecoding", sub: "Security" },
  testing:     { cat: "vibecoding", sub: "Testing & QA" },
  deploy:      { cat: "vibecoding", sub: "Deployment" },
  growth:      { cat: "vibecoding", sub: "Growth & Optimization" },
  maintenance: { cat: "vibecoding", sub: "Maintenance & Scaling" },
  utility:     { cat: "vibecoding", sub: "Utility Prompts" },
};

function parsePrompts(markdown) {
  const prompts = [];
  // Split on ## PROMPT XX —
  const blocks = markdown.split(/(?=^## PROMPT \d+)/m);

  for (const block of blocks) {
    // Must start with ## PROMPT
    if (!/^## PROMPT \d+/.test(block)) continue;

    // Extract number and title
    const headerMatch = block.match(/^## PROMPT (\d+) — (.+)/m);
    if (!headerMatch) continue;
    const num = headerMatch[1].padStart(2, "0");
    const title = headerMatch[2].trim();

    // Extract tag
    const tagMatch = block.match(/\*\*Tag:\*\*\s*(\w+)/);
    const tag = tagMatch ? tagMatch[1].toLowerCase() : "utility";

    // Extract phase
    const phaseMatch = block.match(/\*\*Phase:\*\*\s*(.+)/);
    const phase = phaseMatch ? phaseMatch[1].trim() : "";

    // Extract when-to-use as description
    const whenMatch = block.match(/\*\*When to use:\*\*\s*(.+)/);
    const description = whenMatch ? whenMatch[1].trim() : title;

    // Extract prompt body — everything after the first "---" separator
    // The structure is: header section, ---, prompt body, ---
    const parts = block.split(/^---$/m);
    // parts[0] = header, parts[1] = prompt body (if exists), parts[2] = next section
    let promptText = "";
    if (parts.length >= 2) {
      promptText = parts[1].trim();
    }

    if (!promptText || promptText.length < 20) continue;

    const mapping = TAG_MAP[tag] || TAG_MAP.utility;

    prompts.push({
      id: `vcl_${num}_${tag}`,
      title,
      description: description.slice(0, 200),
      prompt: promptText,
      category_id: mapping.cat,
      subcategory: mapping.sub,
      tags: [tag, phase.toLowerCase().split(" ")[0]].filter(Boolean),
      model: "ChatGPT / Claude",
      source: "curated",
    });
  }

  return prompts;
}

async function main() {
  const mdPath = "/Users/mohammedbarbar/Downloads/vibe-coding-prompt-library.md";
  const markdown = fs.readFileSync(mdPath, "utf8");
  const prompts = parsePrompts(markdown);

  console.log(`\n📚 Parsed ${prompts.length} prompts from vibe-coding-prompt-library.md\n`);

  // Preview
  const byCat = {};
  for (const p of prompts) {
    const key = `${p.category_id}/${p.subcategory}`;
    byCat[key] = (byCat[key] || 0) + 1;
  }
  for (const [key, count] of Object.entries(byCat)) {
    console.log(`  ${key}: ${count}`);
  }

  console.log("\n🚀 Inserting into Supabase...\n");

  // Batch upsert in chunks of 50
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

  // Final counts
  const { count: vcCount } = await supabase
    .from("prompts").select("*", { count: "exact", head: true }).eq("category_id", "vibecoding");
  const { count: codeCount } = await supabase
    .from("prompts").select("*", { count: "exact", head: true }).eq("category_id", "coding");

  console.log(`\n✅ Done — inserted ${inserted} prompts`);
  console.log(`   vibecoding: ${vcCount} total`);
  console.log(`   coding: ${codeCount} total`);
}

main().catch(console.error);
