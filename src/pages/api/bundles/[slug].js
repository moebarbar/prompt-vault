/**
 * GET /api/bundles/:slug
 * Returns a single bundle with all prompts in order.
 * Requires authenticated session.
 */
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const supabase = createServerSupabaseClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { slug } = req.query;

  try {
    // Fetch bundle
    const { data: bundle, error: be } = await supabaseAdmin
      .from("prompt_bundles")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (be || !bundle) return res.status(404).json({ error: "Bundle not found" });

    // Fetch ordered bundle_prompts
    const { data: bundlePrompts, error: bpe } = await supabaseAdmin
      .from("bundle_prompts")
      .select("prompt_id, position, note")
      .eq("bundle_id", bundle.id)
      .order("position", { ascending: true });

    if (bpe) throw bpe;

    // Fetch full prompt data
    const promptIds = bundlePrompts.map((bp) => bp.prompt_id);
    const { data: prompts, error: pe } = await supabaseAdmin
      .from("prompts")
      .select("id, title, description, prompt, category_id, subcategory, tags, model")
      .in("id", promptIds);

    if (pe) throw pe;

    // Merge: keep bundle order + attach curator note
    const promptMap = Object.fromEntries((prompts || []).map((p) => [p.id, p]));
    const orderedPrompts = bundlePrompts
      .map((bp) => ({ ...promptMap[bp.prompt_id], _note: bp.note, _position: bp.position }))
      .filter((p) => p.id);

    return res.status(200).json({ bundle, prompts: orderedPrompts });
  } catch (err) {
    console.error("/api/bundles/[slug] error:", err.message);
    return res.status(500).json({ error: "Failed to fetch bundle" });
  }
}
