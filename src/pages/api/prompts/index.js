/**
 * GET /api/prompts
 * Returns prompts from the data file.
 * Query params:
 *   ?cat=marketing     — filter by category id
 *   ?search=cold+email — full-text search across title, description, tags
 *   ?sort=popular      — sort by usage count (future: from DB)
 *
 * This route currently serves prompts from the static data file.
 * When you want DB-backed prompts, replace PROMPTS/CATEGORIES imports
 * with Supabase queries (see comments below).
 */

import { PROMPTS, CATEGORIES } from "@/data/prompts";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cat, search, sort } = req.query;

  // Flatten all prompts into one array with catId attached
  let results = Object.entries(PROMPTS).flatMap(([catId, prompts]) =>
    prompts.map((p) => ({ ...p, catId }))
  );

  // Filter by category
  if (cat) {
    const validCat = CATEGORIES.find((c) => c.id === cat);
    if (!validCat) {
      return res.status(400).json({ error: `Unknown category: ${cat}` });
    }
    results = results.filter((p) => p.catId === cat);
  }

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sorting (extend when you add DB-backed usage counts)
  if (sort === "alpha") {
    results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return res.status(200).json({
    count: results.length,
    prompts: results,
  });
}
