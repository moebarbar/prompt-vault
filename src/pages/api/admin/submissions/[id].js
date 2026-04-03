/**
 * POST /api/admin/submissions/[id]
 * Approve or reject a bundle submission.
 * Body: { action: 'approve' | 'reject', admin_note?: string }
 * Admin-only.
 */
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const ADMIN_EMAIL = "moebarbar@hotmail.com";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const supabase = createServerSupabaseClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || session.user.email !== ADMIN_EMAIL) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { id } = req.query;
  const { action, admin_note } = req.body;

  if (!["approve", "reject"].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }

  try {
    const update =
      action === "approve"
        ? { status: "published", is_published: true, admin_note: null }
        : { status: "rejected", is_published: false, admin_note: admin_note?.trim() || null };

    const { error } = await supabaseAdmin
      .from("prompt_bundles")
      .update(update)
      .eq("id", id);

    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("/api/admin/submissions/[id] error:", err.message);
    return res.status(500).json({ error: "Failed to update submission" });
  }
}
