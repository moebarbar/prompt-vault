import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiArrowLeft, FiExternalLink, FiTwitter, FiLinkedin, FiGlobe } from "react-icons/fi";
import { useAuth } from "@/lib/auth";
import { authFetch } from "@/lib/authFetch";
import { font } from "@/fonts";
import { LogoSmall } from "@/components/navigation/Logo";

const TABS = ["pending", "published", "rejected"];
const TAB_LABELS = { pending: "Pending Review", published: "Approved", rejected: "Rejected" };

const RejectModal = ({ onConfirm, onCancel }) => {
  const [note, setNote] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onCancel}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border-2 border-zinc-900 bg-white p-6 shadow-[6px_6px_0px_#18181b]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-black text-zinc-900 mb-1">Reject Submission</h3>
        <p className="text-sm text-zinc-500 mb-4">Optionally leave a note explaining why (not shown publicly, just for your records).</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="e.g. Prompts are too generic, doesn't match platform quality standard..."
          className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-colors resize-none"
        />
        <div className="mt-4 flex gap-3">
          <button onClick={() => onConfirm(note)} className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors">
            Reject
          </button>
          <button onClick={onCancel} className="flex-1 rounded-xl border-2 border-zinc-200 py-2.5 text-sm font-bold text-zinc-600 hover:border-zinc-300 transition-colors">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const BundleRow = ({ bundle, onApprove, onReject }) => {
  const submittedDate = bundle.submitted_at
    ? new Date(bundle.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "—";

  return (
    <div className="rounded-xl border-2 border-zinc-200 bg-white p-4 hover:border-zinc-300 transition-colors">
      <div className="flex items-start gap-4">
        {/* Expert avatar */}
        <div className="shrink-0">
          {bundle.expert_image_url ? (
            <img src={bundle.expert_image_url} alt={bundle.expert_name}
              className="h-12 w-12 rounded-full object-cover border-2 border-zinc-200" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 border-2 border-zinc-200 text-indigo-600 font-black text-lg">
              {bundle.expert_name?.charAt(0) || "?"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl">{bundle.icon}</span>
            <p className="font-black text-zinc-900 text-sm">{bundle.title}</p>
            <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
              {bundle.promptCount} steps
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{bundle.description}</p>
          <div className="mt-1.5 flex items-center gap-3 flex-wrap">
            <p className="text-xs font-bold text-zinc-700">{bundle.expert_name}</p>
            {bundle.expert_title && <p className="text-xs text-zinc-400">· {bundle.expert_title}</p>}
            <p className="text-xs text-zinc-400">· {bundle.submitted_by}</p>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <p className="text-[10px] text-zinc-400">Submitted {submittedDate}</p>
            {bundle.expert_twitter && (
              <a href={bundle.expert_twitter.startsWith("http") ? bundle.expert_twitter : `https://twitter.com/${bundle.expert_twitter.replace("@", "")}`}
                target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-indigo-600">
                <FiTwitter size={11} />
              </a>
            )}
            {bundle.expert_linkedin && (
              <a href={bundle.expert_linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-indigo-600">
                <FiLinkedin size={11} />
              </a>
            )}
            {bundle.expert_website && (
              <a href={bundle.expert_website} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-indigo-600">
                <FiGlobe size={11} />
              </a>
            )}
          </div>
          {bundle.admin_note && (
            <p className="mt-1.5 rounded-lg bg-red-50 px-2 py-1 text-[11px] text-red-600">Note: {bundle.admin_note}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-col gap-2 items-end">
          {bundle.status === "pending" && (
            <>
              <button onClick={() => onApprove(bundle.id)}
                className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700 transition-colors">
                <FiCheck size={12} /> Approve
              </button>
              <button onClick={() => onReject(bundle.id)}
                className="flex items-center gap-1.5 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors">
                <FiX size={12} /> Reject
              </button>
            </>
          )}
          {bundle.status === "published" && (
            <Link href={`/bundles`}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-200 px-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition-colors">
              <FiExternalLink size={12} /> View Live
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AdminSubmissions() {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();

  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [rejectingId, setRejectingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) router.replace("/library");
  }, [authLoading, user, isAdmin, router]);

  useEffect(() => {
    if (!isAdmin) return;
    authFetch("/api/admin/submissions")
      .then((r) => r.json())
      .then((data) => setBundles(data.bundles || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAdmin]);

  const handleAction = async (id, action, admin_note = "") => {
    setActionLoading(id);
    try {
      await authFetch(`/api/admin/submissions/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, admin_note }),
      });
      // Update local state
      setBundles((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, status: action === "approve" ? "published" : "rejected", is_published: action === "approve", admin_note: admin_note || b.admin_note }
            : b
        )
      );
    } catch {
      alert("Action failed. Please try again.");
    } finally {
      setActionLoading(null);
      setRejectingId(null);
    }
  };

  if (authLoading || !user || !isAdmin) {
    return (
      <div style={font.style} className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600" />
      </div>
    );
  }

  const filtered = bundles.filter((b) => b.status === activeTab);
  const counts = {
    pending: bundles.filter((b) => b.status === "pending").length,
    published: bundles.filter((b) => b.status === "published").length,
    rejected: bundles.filter((b) => b.status === "rejected").length,
  };

  return (
    <div style={font.style} className="min-h-screen bg-zinc-50">
      <Head><title>Bundle Submissions — Admin | PromptUpp</title></Head>

      <header className="flex h-14 items-center gap-4 border-b-2 border-zinc-200 bg-white px-4">
        <Link href="/library"><LogoSmall /></Link>
        <Link href="/library" className="flex items-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors">
          <FiArrowLeft size={14} /> Back to Library
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-600">Admin</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-zinc-900">Bundle Submissions</h1>
          <p className="mt-1 text-zinc-500">Review and approve expert bundle submissions.</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl border-2 border-zinc-200 bg-white p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-colors ${
                activeTab === tab ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {TAB_LABELS[tab]}
              {counts[tab] > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-black tabular-nums ${activeTab === tab ? "bg-indigo-500 text-white" : "bg-zinc-100 text-zinc-500"}`}>
                  {counts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl border-2 border-zinc-200 bg-white" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <span className="text-4xl">{activeTab === "pending" ? "📭" : activeTab === "published" ? "✅" : "❌"}</span>
            <p className="mt-3 font-bold text-zinc-500">No {TAB_LABELS[activeTab].toLowerCase()} submissions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((bundle) => (
              <BundleRow
                key={bundle.id}
                bundle={bundle}
                onApprove={(id) => handleAction(id, "approve")}
                onReject={(id) => setRejectingId(id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Reject modal */}
      <AnimatePresence>
        {rejectingId && (
          <RejectModal
            onConfirm={(note) => handleAction(rejectingId, "reject", note)}
            onCancel={() => setRejectingId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
