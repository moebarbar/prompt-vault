import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiCopy, FiBookmark, FiCheck, FiX,
  FiMenu, FiChevronRight, FiLogOut, FiUser,
} from "react-icons/fi";
import { CATEGORIES, PROMPTS } from "@/data/prompts";
import { useAuth } from "@/lib/auth";
import { useSavedPrompts } from "@/lib/useSavedPrompts";
import { font } from "@/fonts";
import { LogoSmall } from "@/components/navigation/Logo";

// ── Prompt Card ───────────────────────────────────────────────────────────────
const PromptCard = ({ prompt, onOpen, savedIds, onToggleSave, user }) => {
  const [copied, setCopied] = useState(false);
  const isSaved = savedIds.has(prompt.id);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (!user) { alert("Sign up free to save prompts!"); return; }
    onToggleSave(prompt.id, prompt.catId);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className="group flex flex-col rounded-xl border-2 border-zinc-200 bg-white p-5 transition-all hover:border-indigo-400 hover:shadow-md cursor-pointer"
      onClick={() => onOpen(prompt)}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold leading-snug">{prompt.title}</h3>
        <div className="flex shrink-0 items-center gap-1">
          <button onClick={handleSave} title={isSaved ? "Unsave" : "Save"}
            className={`flex items-center justify-center rounded-lg p-1.5 transition-all ${isSaved ? "text-indigo-600 hover:bg-indigo-50" : "text-zinc-300 hover:text-indigo-500 hover:bg-indigo-50"}`}>
            <FiBookmark size={13} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <button onClick={handleCopy}
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold transition-all ${copied ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500 hover:bg-indigo-100 hover:text-indigo-700"}`}>
            {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-zinc-500 line-clamp-2">{prompt.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {prompt.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">{tag}</span>
          ))}
        </div>
        <span className="text-[10px] text-zinc-400">{prompt.model}</span>
      </div>
    </motion.div>
  );
};

// ── Prompt Modal ──────────────────────────────────────────────────────────────
const PromptModal = ({ prompt, onClose, savedIds, onToggleSave, user }) => {
  const [copied, setCopied] = useState(false);
  const isSaved = savedIds.has(prompt.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    if (!user) { alert("Sign up free to save prompts!"); return; }
    onToggleSave(prompt.id, prompt.catId);
  };

  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-2xl rounded-2xl border-2 border-zinc-900 bg-white p-6 shadow-[8px_8px_0px_#18181b]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100"><FiX size={18} /></button>
        <div className="mb-2 flex flex-wrap gap-1">
          {prompt.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">{tag}</span>
          ))}
        </div>
        <h2 className="mb-1 text-xl font-black">{prompt.title}</h2>
        <p className="mb-4 text-sm text-zinc-500">{prompt.description}</p>
        <div className="mb-4 max-h-64 overflow-y-auto rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4">
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-zinc-700">{prompt.prompt}</pre>
        </div>
        <div className="flex gap-3">
          <button onClick={handleCopy}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${copied ? "bg-green-500 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}>
            {copied ? <FiCheck /> : <FiCopy />}
            {copied ? "Copied to clipboard!" : "Copy prompt"}
          </button>
          <button onClick={handleSave}
            className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all ${isSaved ? "border-indigo-500 bg-indigo-50 text-indigo-600" : "border-zinc-200 text-zinc-600 hover:border-indigo-400"}`}>
            <FiBookmark size={16} fill={isSaved ? "currentColor" : "none"} />
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-zinc-400">Works with: {prompt.model}</p>
      </motion.div>
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = ({ activeCat, onSelect, sidebarOpen, setSidebarOpen }) => (
  <>
    {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />}
    <aside className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r-2 border-zinc-200 bg-white transition-transform duration-200 md:static md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-14 items-center border-b-2 border-zinc-200 px-4"><LogoSmall /></div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <button onClick={() => { onSelect(null); setSidebarOpen(false); }}
          className={`mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${activeCat === null ? "bg-indigo-600 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}>
          ✨ All Prompts
        </button>
        <div className="mb-2 mt-4 px-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">Categories</div>
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => { onSelect(cat.id); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${activeCat === cat.id ? "bg-indigo-50 font-bold text-indigo-700" : "text-zinc-600 hover:bg-zinc-50"}`}>
            <span className="text-base">{cat.icon}</span>
            <span className="leading-tight">{cat.label}</span>
            {activeCat === cat.id && <FiChevronRight className="ml-auto shrink-0" size={14} />}
          </button>
        ))}
      </div>
    </aside>
  </>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Library() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { savedIds, toggleSave } = useSavedPrompts(user);
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  useEffect(() => {
    if (router.query.cat) setActiveCat(router.query.cat);
  }, [router.query.cat]);

  const handleCatSelect = (catId) => {
    setActiveCat(catId);
    setShowSavedOnly(false);
    router.push(catId ? `/library?cat=${catId}` : "/library", undefined, { shallow: true });
  };

  const allPrompts = useMemo(() =>
    Object.entries(PROMPTS).flatMap(([catId, prompts]) => prompts.map((p) => ({ ...p, catId }))),
    []
  );

  const filteredPrompts = useMemo(() => {
    let list = activeCat ? allPrompts.filter((p) => p.catId === activeCat) : allPrompts;
    if (showSavedOnly) list = list.filter((p) => savedIds.has(p.id));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCat, search, allPrompts, showSavedOnly, savedIds]);

  const activeCatData = CATEGORIES.find((c) => c.id === activeCat);

  return (
    <div style={font.style} className="flex h-screen overflow-hidden bg-zinc-50">
      <Head>
        <title>{activeCatData ? `${activeCatData.label} Prompts — PromptVault` : "Prompt Library — PromptVault"}</title>
        <meta name="description" content="Browse 500+ expert copy-paste prompts for marketing, sales, coding, and more." />
      </Head>

      <Sidebar activeCat={activeCat} onSelect={handleCatSelect} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b-2 border-zinc-200 bg-white px-4">
          <button className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 md:hidden" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={20} />
          </button>
          <div className="flex flex-1 items-center gap-2 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-3 py-1.5 focus-within:border-indigo-400 transition-colors">
            <FiSearch className="shrink-0 text-zinc-400" size={15} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 500+ prompts..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400" />
            {search && <button onClick={() => setSearch("")} className="text-zinc-400 hover:text-zinc-700"><FiX size={14} /></button>}
          </div>
          {user && (
            <button onClick={() => setShowSavedOnly((v) => !v)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl border-2 px-3 py-1.5 text-xs font-bold transition-all ${showSavedOnly ? "border-indigo-500 bg-indigo-50 text-indigo-600" : "border-zinc-200 text-zinc-500 hover:border-indigo-300"}`}>
              <FiBookmark size={13} fill={showSavedOnly ? "currentColor" : "none"} />
              <span className="hidden sm:block">Saved</span>
            </button>
          )}
          <div className="flex shrink-0 items-center gap-2">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600">
                  <FiUser size={12} />
                  <span className="max-w-[120px] truncate">{user.email}</span>
                </div>
                <button onClick={signOut} className="flex items-center gap-1.5 rounded-lg border-2 border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-600 transition-colors hover:border-red-300 hover:text-red-600">
                  <FiLogOut size={12} />
                  <span className="hidden sm:block">Sign out</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-600 transition-colors hover:text-indigo-600 sm:block">Log in</Link>
                <Link href="/signup" className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-indigo-700">Sign up free</Link>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-black">
              {showSavedOnly ? "🔖 Saved Prompts" : activeCatData ? `${activeCatData.icon} ${activeCatData.label}` : search ? `Results for "${search}"` : "✨ All Prompts"}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {showSavedOnly ? "Your bookmarked prompts" : activeCatData?.description || "Browse all prompts across every category"}
              <span className="ml-2 font-semibold text-indigo-600">{filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? "s" : ""}</span>
            </p>
          </div>

          {filteredPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="mb-3 text-5xl">{showSavedOnly ? "🔖" : "🔍"}</span>
              <h3 className="text-lg font-bold">{showSavedOnly ? "No saved prompts yet" : "No prompts found"}</h3>
              <p className="mt-1 text-sm text-zinc-500">{showSavedOnly ? "Click the bookmark on any prompt to save it" : "Try a different search or category"}</p>
              <button onClick={() => { setSearch(""); setActiveCat(null); setShowSavedOnly(false); }}
                className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
                Browse all prompts
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {filteredPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} onOpen={setSelectedPrompt}
                    savedIds={savedIds} onToggleSave={toggleSave} user={user} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {selectedPrompt && (
          <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)}
            savedIds={savedIds} onToggleSave={toggleSave} user={user} />
        )}
      </AnimatePresence>
    </div>
  );
}
