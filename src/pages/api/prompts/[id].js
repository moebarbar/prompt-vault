/**
 * GET /api/prompts/[id]
 * Returns a single prompt by its id.
 */

import { PROMPTS } from "@/data/prompts";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  const allPrompts = Object.entries(PROMPTS).flatMap(([catId, prompts]) =>
    prompts.map((p) => ({ ...p, catId }))
  );

  const prompt = allPrompts.find((p) => p.id === id);

  if (!prompt) {
    return res.status(404).json({ error: `Prompt not found: ${id}` });
  }

  return res.status(200).json(prompt);
}
