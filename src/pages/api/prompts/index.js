/**
 * GET /api/prompts
 * Queries prompts from Supabase with full-text search, filtering, and pagination.
 *
 * Query params:
 *   ?cat=marketing       — filter by category_id
 *   ?sub=Email+Campaigns — filter by subcategory
 *   ?search=cold+email   — full-text search (Postgres tsvector)
 *   ?sort=alpha          — sort: relevance (default) | alpha | newest
 *   ?page=1              — page number (1-indexed)
 *   ?limit=24            — results per page (default 24)
 *   ?source=curated      — filter by source: curated | imported | all (default)
 */

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CATEGORIES } from "@/data/prompts";

const DEFAULT_LIMIT = 48;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = createServerSupabaseClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { cat, sub, search, sort, source } = req.query;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(200, parseInt(req.query.limit) || DEFAULT_LIMIT);
  const offset = (page - 1) * limit;

  // Validate category if provided
  if (cat) {
    const validCat = CATEGORIES.find((c) => c.id === cat);
    if (!validCat) {
      return res.status(400).json({ error: `Unknown category: ${cat}` });
    }
  }

  try {
    let query = supabaseAdmin
      .from("prompts")
      .select("id, title, description, prompt, category_id, subcategory, tags, model, source", { count: "exact" });

    // Category filter
    if (cat) query = query.eq("category_id", cat);

    // Subcategory filter
    if (sub) query = query.eq("subcategory", sub);

    // Source filter
    if (source && source !== "all") query = query.eq("source", source);

    // Full-text search — uses the weighted tsvector index
    if (search && search.trim()) {
      query = query.textSearch("search_vector", search.trim(), {
        type: "plain",
        config: "english",
      });
    }

    // Sorting
    if (sort === "alpha") {
      query = query.order("title", { ascending: true });
    } else if (sort === "newest") {
      query = query.order("created_at", { ascending: false });
    } else {
      // Default: curated first, then by id (stable order)
      query = query.order("source", { ascending: true }).order("id", { ascending: true });
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return res.status(200).json({
      prompts: data || [],
      total: count || 0,
      page,
      limit,
      hasMore: offset + limit < (count || 0),
    });
  } catch (err) {
    console.error("/api/prompts error:", err.message);
    return res.status(500).json({ error: "Failed to fetch prompts" });
  }
}
