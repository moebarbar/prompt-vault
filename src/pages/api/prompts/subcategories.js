/**
 * GET /api/prompts/subcategories?cat=marketing
 * Returns distinct subcategories for a given category_id.
 */

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = createServerSupabaseClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { cat } = req.query;
  if (!cat) return res.status(400).json({ error: "cat param required" });

  try {
    const { data, error } = await supabaseAdmin
      .from("prompts")
      .select("subcategory")
      .eq("category_id", cat)
      .not("subcategory", "is", null)
      .order("subcategory");

    if (error) throw error;

    const subcategories = [...new Set((data || []).map((r) => r.subcategory))].filter(Boolean);

    return res.status(200).json({ subcategories });
  } catch (err) {
    console.error("/api/prompts/subcategories error:", err.message);
    return res.status(500).json({ error: "Failed to fetch subcategories" });
  }
}
