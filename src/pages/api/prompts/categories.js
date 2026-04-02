/**
 * GET /api/prompts/categories
 * Returns all categories with live prompt counts from Supabase.
 */

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CATEGORIES } from "@/data/prompts";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Aggregate prompt counts per category in one query
    const { data, error } = await supabaseAdmin
      .from("prompts")
      .select("category_id")
      .order("category_id");

    if (error) throw error;

    // Count per category_id
    const countMap = {};
    for (const row of data || []) {
      countMap[row.category_id] = (countMap[row.category_id] || 0) + 1;
    }

    const categories = CATEGORIES.map((cat) => ({
      ...cat,
      promptCount: countMap[cat.id] || 0,
    }));

    return res.status(200).json({
      count: categories.length,
      categories,
    });
  } catch (err) {
    console.error("/api/prompts/categories error:", err.message);
    // Fallback to static categories with zero counts
    return res.status(200).json({
      count: CATEGORIES.length,
      categories: CATEGORIES.map((c) => ({ ...c, promptCount: 0 })),
    });
  }
}
