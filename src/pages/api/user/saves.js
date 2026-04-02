/**
 * POST   /api/user/saves  — save a prompt
 * DELETE /api/user/saves  — unsave a prompt
 * GET    /api/user/saves  — get all saved prompts for current user
 *
 * All routes require a valid Supabase session (Bearer token in Authorization header).
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // server-side: use service role key, NOT anon key
);

async function getUserFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

export default async function handler(req, res) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  // GET — fetch all saves for this user
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("saved_prompts")
      .select("*")
      .eq("user_id", user.id)
      .order("saved_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ saves: data });
  }

  // POST — save a prompt
  if (req.method === "POST") {
    const { prompt_id, category_id } = req.body;
    if (!prompt_id || !category_id) {
      return res.status(400).json({ error: "prompt_id and category_id are required" });
    }

    const { data, error } = await supabase
      .from("saved_prompts")
      .insert({ user_id: user.id, prompt_id, category_id })
      .select()
      .single();

    if (error) {
      // unique constraint = already saved
      if (error.code === "23505") {
        return res.status(409).json({ error: "Already saved" });
      }
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json({ save: data });
  }

  // DELETE — unsave a prompt
  if (req.method === "DELETE") {
    const { prompt_id } = req.body;
    if (!prompt_id) {
      return res.status(400).json({ error: "prompt_id is required" });
    }

    const { error } = await supabase
      .from("saved_prompts")
      .delete()
      .eq("user_id", user.id)
      .eq("prompt_id", prompt_id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: "Unsaved" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
