/**
 * GET /api/bundles
 * Returns all published bundles with prompt count.
 * Requires authenticated session.
 */
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const supabase = createServerSupabaseClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { data: bundles, error } = await supabaseAdmin
      .from("prompt_bundles")
      .select("id, slug, title, description, icon, category, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: true });

    if (error) throw error;

    // Attach prompt counts
    const counts = await Promise.all(
      bundles.map((b) =>
        supabaseAdmin
          .from("bundle_prompts")
          .select("*", { count: "exact", head: true })
          .eq("bundle_id", b.id)
          .then(({ count }) => ({ id: b.id, count: count || 0 }))
      )
    );
    const countMap = Object.fromEntries(counts.map((c) => [c.id, c.count]));

    const result = bundles.map((b) => ({ ...b, promptCount: countMap[b.id] || 0 }));

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ bundles: result });
  } catch (err) {
    console.error("/api/bundles error:", err.message);
    return res.status(500).json({ error: "Failed to fetch bundles" });
  }
}
