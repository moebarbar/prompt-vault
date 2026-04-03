/**
 * POST /api/bundles/submit
 * Public endpoint — no auth required.
 * Accepts expert + bundle + prompts data, stores as pending review.
 */
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { resend } from "@/lib/resend";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    // Expert
    expert_name, expert_title, expert_bio,
    expert_image_url, expert_twitter, expert_linkedin, expert_website,
    submitted_by,
    // Bundle
    title, description, icon, category,
    // Steps
    steps,
  } = req.body;

  // Basic validation
  if (!expert_name?.trim()) return res.status(400).json({ error: "Expert name is required" });
  if (!title?.trim()) return res.status(400).json({ error: "Bundle title is required" });
  if (!submitted_by?.trim()) return res.status(400).json({ error: "Email is required" });
  if (!Array.isArray(steps) || steps.length === 0) return res.status(400).json({ error: "At least one step is required" });

  const validSteps = steps.filter((s) => s.prompt_text?.trim());
  if (validSteps.length === 0) return res.status(400).json({ error: "At least one step must have prompt text" });

  // Generate unique slug
  const baseSlug = slugify(title);
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  try {
    // Insert bundle
    const { data: bundle, error: be } = await supabaseAdmin
      .from("prompt_bundles")
      .insert({
        slug,
        title: title.trim(),
        description: description?.trim() || "",
        icon: icon?.trim() || "📦",
        category: category || "other",
        is_published: false,
        status: "pending",
        expert_name: expert_name.trim(),
        expert_title: expert_title?.trim() || null,
        expert_bio: expert_bio?.trim() || null,
        expert_image_url: expert_image_url?.trim() || null,
        expert_twitter: expert_twitter?.trim() || null,
        expert_linkedin: expert_linkedin?.trim() || null,
        expert_website: expert_website?.trim() || null,
        submitted_by: submitted_by.trim(),
        submitted_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (be) throw be;

    // Insert steps
    const bundlePrompts = validSteps.map((step, i) => ({
      bundle_id: bundle.id,
      prompt_id: null,
      position: i + 1,
      note: step.why_this_step?.trim() || null,
      why_this_step: step.why_this_step?.trim() || null,
      expected_output: step.expected_output?.trim() || null,
      prompt_text: step.prompt_text.trim(),
      title: step.title?.trim() || `Step ${i + 1}`,
    }));

    const { error: pe } = await supabaseAdmin.from("bundle_prompts").insert(bundlePrompts);
    if (pe) throw pe;

    // Notify admin
    try {
      await resend.emails.send({
        from: "PromptUpp <hello@promptupp.com>",
        to: "moebarbar@hotmail.com",
        subject: `New Bundle Submission: "${title}" by ${expert_name}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
            <h2 style="margin:0 0 8px">New Expert Bundle Submission</h2>
            <p style="color:#6b7280;margin:0 0 24px">Someone submitted a bundle for review.</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Expert</td><td style="padding:8px 0;font-weight:600">${expert_name}${expert_title ? ` — ${expert_title}` : ""}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Email</td><td style="padding:8px 0">${submitted_by}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Bundle</td><td style="padding:8px 0;font-weight:600">${title}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Steps</td><td style="padding:8px 0">${validSteps.length} prompts</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Category</td><td style="padding:8px 0">${category || "other"}</td></tr>
            </table>
            <div style="margin-top:24px">
              <a href="https://www.promptupp.com/admin/submissions" style="display:inline-block;background:#4f46e5;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600">Review Submission →</a>
            </div>
          </div>
        `,
      });
    } catch {
      // Non-fatal — submission is saved even if email fails
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("/api/bundles/submit error:", err.message);
    return res.status(500).json({ error: "Failed to submit bundle" });
  }
}
