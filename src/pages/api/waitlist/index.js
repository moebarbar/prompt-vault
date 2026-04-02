/**
 * POST /api/waitlist
 * Adds an email to the waitlist table.
 * Body: { email: string }
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const { error } = await supabase
    .from("waitlist")
    .insert({ email: email.toLowerCase().trim() });

  if (error) {
    // unique constraint = already on list
    if (error.code === "23505") {
      return res.status(200).json({ message: "Already on the list!" });
    }
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }

  return res.status(201).json({ message: "You're on the list!" });
}
