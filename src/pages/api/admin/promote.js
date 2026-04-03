/**
 * POST /api/admin/promote
 * Sets role: "admin" in app_metadata for the admin email.
 * Only works if the requesting user IS the admin email.
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

  await supabaseAdmin.auth.admin.updateUserById(session.user.id, {
    app_metadata: { role: "admin" },
  });

  return res.status(200).json({ ok: true });
}
