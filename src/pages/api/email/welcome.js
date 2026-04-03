/**
 * POST /api/email/welcome
 * Sends a welcome email after signup. Called server-side.
 * Body: { email: string, name?: string }
 */
import { resend } from "@/lib/resend";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "email required" });

  const { error } = await resend.emails.send({
    from: "PromptVault <hello@promptvault.io>",
    to: email,
    subject: "Welcome to PromptVault ⚡",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#fff;">
        <div style="margin-bottom:32px;">
          <span style="background:#4f46e5;color:#fff;font-weight:900;font-size:14px;padding:6px 12px;border-radius:8px;">⚡ PromptVault</span>
        </div>
        <h1 style="font-size:28px;font-weight:900;color:#09090b;margin:0 0 12px;">You're in. 🎉</h1>
        <p style="font-size:16px;color:#52525b;line-height:1.6;margin:0 0 24px;">
          Welcome to PromptVault — 8,000+ professional AI prompts, ready to copy and paste.
          No more vague AI responses. Just real, usable output.
        </p>
        <a href="https://www.promptvault.io/library"
           style="display:inline-block;background:#4f46e5;color:#fff;font-weight:800;font-size:15px;padding:14px 28px;border-radius:12px;text-decoration:none;margin-bottom:32px;">
          Browse the vault →
        </a>
        <p style="font-size:13px;color:#a1a1aa;margin:0;">
          You're receiving this because you signed up at promptvault.io.<br/>
          Questions? Reply to this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Welcome email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }

  return res.status(200).json({ ok: true });
}
