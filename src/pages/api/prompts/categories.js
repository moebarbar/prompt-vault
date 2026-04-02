/**
 * GET /api/prompts/categories
 * Returns all categories with live prompt counts from Supabase.
 * Uses parallel count queries — one per category — to avoid fetching all rows.
 */

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CATEGORIES } from "@/data/prompts";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Cache for 60 seconds
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

  try {
    // Run all count queries in parallel
    const counts = await Promise.all(
      CATEGORIES.map((cat) =>
        supabaseAdmin
          .from("prompts")
          .select("*", { count: "exact", head: true })
          .eq("category_id", cat.id)
          .then(({ count }) => ({ id: cat.id, count: count || 0 }))
      )
    );

    const countMap = Object.fromEntries(counts.map((c) => [c.id, c.count]));

    const categories = CATEGORIES.map((cat) => ({
      ...cat,
      promptCount: countMap[cat.id] || 0,
    }));

    return res.status(200).json({ count: categories.length, categories });
  } catch (err) {
    console.error("/api/prompts/categories error:", err.message);
    return res.status(200).json({
      count: CATEGORIES.length,
      categories: CATEGORIES.map((c) => ({ ...c, promptCount: 0 })),
    });
  }
}
