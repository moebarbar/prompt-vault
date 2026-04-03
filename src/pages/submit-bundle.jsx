import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPlus, FiTrash2, FiCheck, FiUser, FiPackage, FiList } from "react-icons/fi";
import { font } from "@/fonts";
import { LogoSmall } from "@/components/navigation/Logo";

const CATEGORIES = [
  { value: "startup", label: "Startup & SaaS" },
  { value: "growth", label: "Growth & Marketing" },
  { value: "freelancing", label: "Freelancing & Clients" },
  { value: "productivity", label: "Productivity & Systems" },
  { value: "content", label: "Content & Social Media" },
  { value: "sales", label: "Sales & Revenue" },
  { value: "other", label: "Other" },
];

const defaultStep = () => ({
  title: "",
  why_this_step: "",
  expected_output: "",
  prompt_text: "",
});

const SectionLabel = ({ icon: Icon, label, step }) => (
  <div className="mb-6 flex items-center gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
      <Icon size={15} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Step {step}</p>
      <p className="font-black text-zinc-900">{label}</p>
    </div>
  </div>
);

const Input = ({ label, required, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-zinc-700">
      {label}{required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
    <input
      className="rounded-xl border-2 border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white transition-colors"
      {...props}
    />
  </div>
);

const Textarea = ({ label, required, hint, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-zinc-700">
      {label}{required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
    <textarea
      className="rounded-xl border-2 border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white transition-colors resize-none"
      {...props}
    />
    {hint && <p className="text-[11px] text-zinc-400">{hint}</p>}
  </div>
);

export default function SubmitBundle() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Expert fields
  const [expert, setExpert] = useState({
    expert_name: "",
    expert_title: "",
    expert_bio: "",
    expert_image_url: "",
    expert_twitter: "",
    expert_linkedin: "",
    expert_website: "",
    submitted_by: "",
  });

  // Bundle fields
  const [bundle, setBundle] = useState({
    title: "",
    description: "",
    icon: "",
    category: "other",
  });

  // Steps
  const [steps, setSteps] = useState([defaultStep(), defaultStep(), defaultStep()]);

  const setExpertField = (key, val) => setExpert((e) => ({ ...e, [key]: val }));
  const setBundleField = (key, val) => setBundle((b) => ({ ...b, [key]: val }));
  const setStepField = (i, key, val) =>
    setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)));

  const addStep = () => setSteps((prev) => [...prev, defaultStep()]);
  const removeStep = (i) => setSteps((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!expert.expert_name.trim()) return setError("Please enter your name.");
    if (!expert.submitted_by.trim()) return setError("Please enter your email.");
    if (!bundle.title.trim()) return setError("Please enter a bundle title.");
    const filledSteps = steps.filter((s) => s.prompt_text.trim());
    if (filledSteps.length === 0) return setError("Please add at least one prompt step.");

    setLoading(true);
    try {
      const res = await fetch("/api/bundles/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...expert, ...bundle, steps }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={font.style} className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border-2 border-zinc-900 bg-white p-8 text-center shadow-[6px_6px_0px_#18181b]"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 border-2 border-green-300">
              <FiCheck size={28} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-zinc-900">Bundle Submitted!</h2>
          <p className="mt-2 text-zinc-500">
            We&rsquo;ll review your submission and reach out to <strong>{expert.submitted_by}</strong> within 48 hours.
          </p>
          <p className="mt-2 text-sm text-zinc-400">If approved, your bundle will be live on PromptVault with your name and profile.</p>
          <div className="mt-6 flex flex-col gap-2">
            <Link href="/bundles" className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700 transition-colors">
              Browse Goal Packs
            </Link>
            <button onClick={() => { setSubmitted(false); setExpert({ expert_name: "", expert_title: "", expert_bio: "", expert_image_url: "", expert_twitter: "", expert_linkedin: "", expert_website: "", submitted_by: "" }); setBundle({ title: "", description: "", icon: "", category: "other" }); setSteps([defaultStep(), defaultStep(), defaultStep()]); }}
              className="rounded-xl border-2 border-zinc-200 px-4 py-3 text-sm font-bold text-zinc-600 hover:border-zinc-300 transition-colors">
              Submit Another Bundle
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={font.style} className="min-h-screen bg-zinc-50">
      <Head>
        <title>Submit a Goal Pack — PromptVault</title>
        <meta name="description" content="Share your expertise. Submit a curated sequence of prompts for a specific goal and get featured on PromptVault." />
      </Head>

      <header className="flex h-14 items-center gap-4 border-b-2 border-zinc-200 bg-white px-4">
        <Link href="/bundles"><LogoSmall /></Link>
        <Link href="/bundles" className="flex items-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors">
          <FiArrowLeft size={14} /> Back to Goal Packs
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12">
        {/* Hero */}
        <div className="mb-10">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border-2 border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-indigo-600">
            Expert Submissions
          </span>
          <h1 className="text-4xl font-black text-zinc-900">Share your expertise.</h1>
          <p className="mt-3 max-w-lg text-lg text-zinc-500">
            Submit a curated sequence of prompts built around a specific goal. If approved, your bundle goes live with your name, photo, and profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section A — About You */}
          <div className="rounded-2xl border-2 border-zinc-900 bg-white p-6 shadow-[4px_4px_0px_#18181b]">
            <SectionLabel icon={FiUser} label="About You" step="1" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" required placeholder="Alex Johnson" value={expert.expert_name} onChange={(e) => setExpertField("expert_name", e.target.value)} />
              <Input label="Professional Title" placeholder="SaaS Founder & Growth Consultant" value={expert.expert_title} onChange={(e) => setExpertField("expert_title", e.target.value)} />
            </div>
            <div className="mt-4">
              <Textarea label="Short Bio" rows={2} placeholder="2–3 sentences about who you are and what you're known for." hint="This will appear on your bundle card." value={expert.expert_bio} onChange={(e) => setExpertField("expert_bio", e.target.value)} />
            </div>
            <div className="mt-4">
              <Input label="Headshot URL" placeholder="https://your-site.com/headshot.jpg" value={expert.expert_image_url} onChange={(e) => setExpertField("expert_image_url", e.target.value)} />
              <p className="mt-1 text-[11px] text-zinc-400">Paste a direct link to your photo (LinkedIn, personal site, etc.)</p>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Input label="Twitter / X" placeholder="@handle" value={expert.expert_twitter} onChange={(e) => setExpertField("expert_twitter", e.target.value)} />
              <Input label="LinkedIn" placeholder="linkedin.com/in/you" value={expert.expert_linkedin} onChange={(e) => setExpertField("expert_linkedin", e.target.value)} />
              <Input label="Website" placeholder="yoursite.com" value={expert.expert_website} onChange={(e) => setExpertField("expert_website", e.target.value)} />
            </div>
            <div className="mt-4">
              <Input label="Your Email" required type="email" placeholder="you@example.com" value={expert.submitted_by} onChange={(e) => setExpertField("submitted_by", e.target.value)} />
              <p className="mt-1 text-[11px] text-zinc-400">For review updates only — not shown publicly.</p>
            </div>
          </div>

          {/* Section B — Your Bundle */}
          <div className="rounded-2xl border-2 border-zinc-900 bg-white p-6 shadow-[4px_4px_0px_#18181b]">
            <SectionLabel icon={FiPackage} label="Your Bundle" step="2" />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <Input label="Bundle Title" required placeholder="Launch a SaaS in 30 Days" value={bundle.title} onChange={(e) => setBundleField("title", e.target.value)} />
              </div>
              <Input label="Icon / Emoji" placeholder="🚀" value={bundle.icon} onChange={(e) => setBundleField("icon", e.target.value)} />
            </div>
            <div className="mt-4">
              <Textarea label="One-line Description" required rows={2} placeholder="From raw idea to paying customers — the full validated build sequence for founders." value={bundle.description} onChange={(e) => setBundleField("description", e.target.value)} />
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-700">Category<span className="ml-0.5 text-red-500">*</span></label>
              <select
                value={bundle.category}
                onChange={(e) => setBundleField("category", e.target.value)}
                className="rounded-xl border-2 border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section C — Prompts */}
          <div className="rounded-2xl border-2 border-zinc-900 bg-white p-6 shadow-[4px_4px_0px_#18181b]">
            <SectionLabel icon={FiList} label="The Prompts (Steps)" step="3" />
            <p className="mb-5 text-sm text-zinc-500">Add each prompt in order. The more context you give on the &ldquo;why&rdquo;, the more useful it is for users.</p>

            <div className="space-y-5">
              <AnimatePresence>
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-black text-white">
                          {i + 1}
                        </span>
                        <p className="text-sm font-black text-zinc-900">Step {i + 1}</p>
                      </div>
                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(i)}
                          className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Input
                        label="Step Title"
                        required
                        placeholder="Define your Ideal Customer Profile"
                        value={step.title}
                        onChange={(e) => setStepField(i, "title", e.target.value)}
                      />
                      <Textarea
                        label="Why This Step"
                        rows={2}
                        placeholder="Without a clear ICP, all downstream messaging is guesswork. This step forces precision before anything else."
                        hint="Explain the logic — why does this step come here in the sequence?"
                        value={step.why_this_step}
                        onChange={(e) => setStepField(i, "why_this_step", e.target.value)}
                      />
                      <Input
                        label="What You'll Get"
                        placeholder="A one-paragraph ICP statement ready to paste into every future prompt"
                        value={step.expected_output}
                        onChange={(e) => setStepField(i, "expected_output", e.target.value)}
                      />
                      <Textarea
                        label="Full Prompt Text"
                        required
                        rows={5}
                        placeholder="You are a B2B SaaS positioning expert. I'm building [product]. My target customer is..."
                        value={step.prompt_text}
                        onChange={(e) => setStepField(i, "prompt_text", e.target.value)}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={addStep}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 py-3 text-sm font-bold text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
              >
                <FiPlus size={14} /> Add another step
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-zinc-900 bg-indigo-600 py-4 text-sm font-black text-white shadow-[4px_4px_0px_#18181b] transition-all hover:shadow-[6px_6px_0px_#18181b] disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit for Review →"}
          </button>
          <p className="text-center text-xs text-zinc-400">We review all submissions and respond within 48 hours.</p>
        </form>
      </main>
    </div>
  );
}
