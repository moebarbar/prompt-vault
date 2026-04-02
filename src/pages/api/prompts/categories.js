/**
 * GET /api/prompts/categories
 * Returns all category metadata with prompt counts.
 */

import { CATEGORIES, PROMPTS } from "@/data/prompts";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    promptCount: (PROMPTS[cat.id] || []).length,
  }));

  return res.status(200).json({
    count: categoriesWithCount.length,
    categories: categoriesWithCount,
  });
}
