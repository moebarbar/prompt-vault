/**
 * GET /api/bundles/:slug
 * Returns a single bundle with all prompts in order.
 * Requires authenticated session.
 */
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAuth } from "@/lib/apiAuth";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const user = await verifyAuth(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { slug } = req.query;

  try {
    // Fetch bundle
    const { data: bundle, error: be } = await supabaseAdmin
      .from("prompt_bundles")
      .select("id, slug, title, description, icon, category, is_published, status, expert_name, expert_title, expert_image_url, expert_bio, expert_twitter, expert_linkedin, expert_website")
      .eq("slug", slug)
      .or("is_published.eq.true,status.eq.published")
      .single();

    if (be || !bundle) return res.status(404).json({ error: "Bundle not found" });

    // Fetch ordered bundle_prompts — include title for submitted bundles
    const { data: bundlePrompts, error: bpe } = await supabaseAdmin
      .from("bundle_prompts")
      .select("prompt_id, position, note, why_this_step, expected_output, prompt_text, title")
      .eq("bundle_id", bundle.id)
      .order("position", { ascending: true });

    if (bpe) throw bpe;

    // Only query the prompts table if there are actual library-linked prompt IDs
    const linkedIds = (bundlePrompts || []).map((bp) => bp.prompt_id).filter(Boolean);
    let promptMap = {};
    if (linkedIds.length > 0) {
      const { data: prompts, error: pe } = await supabaseAdmin
        .from("prompts")
        .select("id, title, description, prompt, category_id, subcategory, tags, model")
        .in("id", linkedIds);
      if (pe) throw pe;
      promptMap = Object.fromEntries((prompts || []).map((p) => [p.id, p]));
    }

    // Merge: keep bundle order + attach step metadata
    // Submitted bundles use prompt_text + title stored directly on bundle_prompts
    const orderedPrompts = (bundlePrompts || []).map((bp) => {
      const base = bp.prompt_id ? (promptMap[bp.prompt_id] || {}) : {};
      return {
        ...base,
        id: base.id || bp.prompt_id || `step-${bp.position}`,
        title: base.title || bp.title || `Step ${bp.position}`,
        description: base.description || "",
        prompt: base.prompt || bp.prompt_text || "",
        _note: bp.note,
        _why: bp.why_this_step,
        _output: bp.expected_output,
        _position: bp.position,
      };
    }).filter((p) => p.prompt || p._why);

    return res.status(200).json({ bundle, prompts: orderedPrompts });
  } catch (err) {
    console.error("/api/bundles/[slug] error:", err.message);
    return res.status(500).json({ error: "Failed to fetch bundle" });
  }
}
