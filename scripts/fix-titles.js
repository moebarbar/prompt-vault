#!/usr/bin/env node
/**
 * Cleans up bad titles in the Supabase prompts table.
 * Patterns to fix:
 *   - 'Example prompt: "..."'
 *   - '"Something" - ChatGPT can assist you in...'
 *   - Quoted titles
 *   - Titles that are just the first N words of the prompt
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function cleanTitle(title, prompt, subcategory) {
  let t = title || "";

  // Pattern: 'Example prompt: "I want to..."' → derive from prompt
  if (/^example prompt:/i.test(t)) {
    return deriveTitleFromPrompt(prompt, subcategory);
  }

  // Pattern: '"Something" - ChatGPT can assist...' → extract the quoted part
  const chatgptPattern = /^"(.+?)"\s*[-–]\s*(chatgpt|claude|ai)\s+can/i;
  const chatgptMatch = t.match(chatgptPattern);
  if (chatgptMatch) {
    return toTitleCase(chatgptMatch[1].replace(/\.$/, ""));
  }

  // Pattern: starts and ends with quotes like '"Format and design resumes"'
  const quotedPattern = /^"(.+)"$/;
  const quotedMatch = t.match(quotedPattern);
  if (quotedMatch) {
    return toTitleCase(quotedMatch[1].replace(/\.$/, ""));
  }

  // Pattern: title ends with ' - ChatGPT can...' or ' - AI can...'
  t = t.replace(/\s*[-–]\s*(chatgpt|claude|ai)\s+can.*$/i, "");
  t = t.replace(/^"(.*)"$/, "$1"); // strip outer quotes
  t = t.trim();

  if (!t || t.length < 5) {
    return deriveTitleFromPrompt(prompt, subcategory);
  }

  return toTitleCase(t);
}

function deriveTitleFromPrompt(prompt, subcategory) {
  if (!prompt) return subcategory || "Untitled";

  // Clean the prompt text
  const clean = prompt
    .replace(/^act as .{0,60}\.\n\n/i, "")     // remove role intro
    .replace(/\[.*?\]/g, "")                     // remove placeholders
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Take first 6-8 meaningful words
  const words = clean.split(" ").filter(Boolean);
  const title = words.slice(0, 7).join(" ").replace(/[,.:;?!]$/, "");

  return toTitleCase(title) || subcategory || "Untitled";
}

function toTitleCase(str) {
  if (!str) return str;
  // Don't title-case every word — just capitalize first word
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function needsCleaning(title) {
  if (!title) return true;
  if (/^example prompt:/i.test(title)) return true;
  if (/[-–]\s*(chatgpt|claude|ai)\s+can/i.test(title)) return true;
  if (/^".*"$/.test(title)) return true;
  if (/^"/.test(title)) return true;
  return false;
}

async function main() {
  console.log("🧹 Fixing bad prompt titles...\n");

  // Fetch all prompts with bad titles (source=imported only — curated are fine)
  let page = 0;
  const pageSize = 1000;
  let totalFixed = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from("prompts")
      .select("id, title, prompt, subcategory")
      .eq("source", "imported")
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) { console.error(error.message); break; }
    if (!data || data.length === 0) { hasMore = false; break; }

    const toUpdate = data
      .filter((p) => needsCleaning(p.title))
      .map((p) => ({
        id: p.id,
        title: cleanTitle(p.title, p.prompt, p.subcategory),
        description: p.prompt
          ? (p.prompt.replace(/\n/g, " ").replace(/\s+/g, " ").trim().slice(0, 120) + (p.prompt.length > 120 ? "…" : ""))
          : "",
      }));

    if (toUpdate.length > 0) {
      for (const row of toUpdate) {
        const { error: upErr } = await supabase
          .from("prompts")
          .update({ title: row.title, description: row.description })
          .eq("id", row.id);
        if (upErr) console.error("Update error:", upErr.message);
      }
      totalFixed += toUpdate.length;
      process.stdout.write(`  Fixed ${totalFixed} titles so far...\r`);
    }

    page++;
    if (data.length < pageSize) hasMore = false;
  }

  console.log(`\n✅ Done — fixed ${totalFixed} titles`);
}

main().catch(console.error);
