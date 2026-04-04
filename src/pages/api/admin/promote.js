/**
 * POST /api/admin/promote
 * Sets role: "admin" in app_metadata for the admin email.
 * Only works if the requesting user IS the admin email.
 */
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/apiAuth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const user = await verifyAdmin(req);
  if (!user) return res.status(403).json({ error: "Forbidden" });

  await supabaseAdmin.auth.admin.updateUserById(user.id, {
    app_metadata: { role: "admin" },
  });

  return res.status(200).json({ ok: true });
}
