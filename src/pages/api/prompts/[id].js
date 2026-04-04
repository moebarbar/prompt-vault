/**
 * GET /api/prompts/:id
 * Returns a single prompt by id.
 */

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAuth } from "@/lib/apiAuth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await verifyAuth(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;

  try {
    const { data, error } = await supabaseAdmin
      .from("prompts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Prompt not found" });
    }

    return res.status(200).json({ prompt: data });
  } catch (err) {
    console.error("/api/prompts/[id] error:", err.message);
    return res.status(500).json({ error: "Failed to fetch prompt" });
  }
}
