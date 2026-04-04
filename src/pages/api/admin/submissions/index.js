/**
 * GET /api/admin/submissions
 * Returns all bundles grouped by status (pending, published, rejected).
 * Admin-only.
 */
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/apiAuth";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const user = await verifyAdmin(req);
  if (!user) return res.status(403).json({ error: "Forbidden" });

  try {
    const { data: bundles, error } = await supabaseAdmin
      .from("prompt_bundles")
      .select("id, slug, title, description, icon, category, status, is_published, expert_name, expert_title, expert_image_url, expert_bio, expert_twitter, expert_linkedin, expert_website, submitted_by, submitted_at, admin_note, created_at")
      .order("submitted_at", { ascending: false, nullsFirst: false });

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

    return res.status(200).json({ bundles: result });
  } catch (err) {
    console.error("/api/admin/submissions error:", err.message);
    return res.status(500).json({ error: "Failed to fetch submissions" });
  }
}
