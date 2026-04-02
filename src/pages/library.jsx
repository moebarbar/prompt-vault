import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiCopy, FiBookmark, FiCheck, FiX,
  FiMenu, FiLogOut, FiUser, FiShare2,
  FiChevronDown,
} from "react-icons/fi";
import { CATEGORIES } from "@/data/prompts";
import { useAuth } from "@/lib/auth";
import { useSavedPrompts } from "@/lib/useSavedPrompts";
import { font } from "@/fonts";
import { LogoSmall } from "@/components/navigation/Logo";

const PAGE_SIZE = 48; // larger page size so grouped view has enough per section

// Precompute category map for quick lookups
const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

// ── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="flex flex-col rounded-xl border-2 border-zinc-200 bg-white p-5 animate-pulse">
    <div className="mb-3 flex items-start justify-between gap-2">
      <div className="h-4 w-2/3 rounded bg-zinc-200" />
      <div className="h-6 w-16 rounded-lg bg-zinc-200" />
    </div>
    <div className="mb-2 h-3 w-full rounded bg-zinc-100" />
    <div className="mb-4 h-3 w-4/5 rounded bg-zinc-100" />
    <div className="mt-auto flex items-center gap-2">
      <div className="h-5 w-14 rounded-full bg-zinc-100" />
      <div className="h-5 w-14 rounded-full bg-zinc-100" />
    </div>
  </div>
);

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
    onToggleSave(prompt.id, prompt.category_id);
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
        <h3 className="text-sm font-bold leading-snug line-clamp-2">{prompt.title}</h3>
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
          {(prompt.tags || []).slice(0, 2).map((tag) => (
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
  const [shared, setShared] = useState(false);
  const isSaved = savedIds.has(prompt.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/library?cat=${prompt.category_id}&prompt=${prompt.id}`;
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleSave = () => {
    if (!user) { alert("Sign up free to save prompts!"); return; }
    onToggleSave(prompt.id, prompt.category_id);
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
          {(prompt.tags || []).map((tag) => (
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
          <button onClick={handleShare} title="Copy shareable link"
            className={`flex items-center justify-center rounded-xl border-2 px-3 py-3 text-sm font-bold transition-all ${shared ? "border-green-400 bg-green-50 text-green-600" : "border-zinc-200 text-zinc-600 hover:border-indigo-400"}`}>
            {shared ? <FiCheck size={16} /> : <FiShare2 size={16} />}
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-zinc-400">Works with: {prompt.model}</p>
      </motion.div>
    </div>
  );
};

// ── Grouped prompt grid (by subcategory) ─────────────────────────────────────
const GroupedGrid = ({ prompts, onOpen, savedIds, onToggleSave, user }) => {
  // Group by subcategory, "General" for nulls
  const groups = [];
  const seen = new Map();
  for (const p of prompts) {
    const key = p.subcategory || "General";
    if (!seen.has(key)) { seen.set(key, []); groups.push(key); }
    seen.get(key).push(p);
  }
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group}>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-base font-black text-zinc-900">{group}</h2>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600">
              {seen.get(group).length}
            </span>
            <div className="flex-1 border-t-2 border-zinc-100" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {seen.get(group).map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} onOpen={onOpen}
                savedIds={savedIds} onToggleSave={onToggleSave} user={user} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = ({ activeCat, onSelect, activeSub, onSubSelect, sidebarOpen, setSidebarOpen, categoryCounts, subcategories }) => (
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
        {CATEGORIES.map((cat) => {
          const isActive = activeCat === cat.id;
          const hasSubcats = isActive && subcategories.length > 0;
          return (
            <div key={cat.id}>
              <button
                onClick={() => { onSelect(cat.id); setSidebarOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-indigo-50 font-bold text-indigo-700" : "text-zinc-600 hover:bg-zinc-50"}`}
              >
                <span className="text-base">{cat.icon}</span>
                <span className="flex-1 leading-tight text-left">{cat.label}</span>
                <span className={`ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${isActive ? "bg-indigo-100 text-indigo-700" : "bg-zinc-100 text-zinc-400"}`}>
                  {categoryCounts[cat.id] ?? "…"}
                </span>
                {hasSubcats && <FiChevronDown size={11} className="shrink-0 text-indigo-400" />}
              </button>

              {/* Expandable subcategory list */}
              <AnimatePresence initial={false}>
                {hasSubcats && (
                  <motion.div
                    key="subcats"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-1 ml-7 border-l-2 border-indigo-100 pl-2 pt-0.5">
                      <button
                        onClick={() => onSubSelect(null)}
                        className={`flex w-full rounded-md px-2 py-1.5 text-xs font-bold transition-colors ${activeSub === null ? "text-indigo-600" : "text-zinc-400 hover:text-zinc-700"}`}
                      >
                        All {cat.label}
                      </button>
                      {subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => onSubSelect(sub)}
                          className={`flex w-full truncate rounded-md px-2 py-1.5 text-xs transition-colors ${activeSub === sub ? "font-bold text-indigo-600" : "text-zinc-500 hover:text-zinc-900"}`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
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
  const [activeSub, setActiveSub] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevance");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Data state
  const [prompts, setPrompts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});

  const searchDebounce = useRef(null);
  const savedIdsRef = useRef(savedIds);
  useEffect(() => { savedIdsRef.current = savedIds; }, [savedIds]);

  // Load category counts once
  useEffect(() => {
    fetch("/api/prompts/categories")
      .then((r) => r.json())
      .then((data) => {
        const map = {};
        (data.categories || []).forEach((c) => { map[c.id] = c.promptCount; });
        setCategoryCounts(map);
      })
      .catch(() => {});
  }, []);

  // Sync URL → state on mount
  useEffect(() => {
    if (router.isReady) {
      if (router.query.cat) setActiveCat(router.query.cat);
      if (router.query.prompt) {
        // Auto-open a shared prompt
        fetch(`/api/prompts/${router.query.prompt}`)
          .then((r) => r.json())
          .then((data) => { if (data.prompt) setSelectedPrompt(data.prompt); })
          .catch(() => {});
      }
    }
  }, [router.isReady]);

  // Load subcategories when category changes
  useEffect(() => {
    setActiveSub(null);
    setSubcategories([]);
    if (!activeCat) return;
    fetch(`/api/prompts/subcategories?cat=${activeCat}`)
      .then((r) => r.json())
      .then((data) => setSubcategories(data.subcategories || []))
      .catch(() => {});
  }, [activeCat]);

  // Main fetch — reset to page 1 whenever filters change
  const fetchPrompts = useCallback(async (opts = {}) => {
    const { append = false, pageNum = 1 } = opts;

    if (!append) setLoading(true);
    else setLoadingMore(true);

    try {
      const params = new URLSearchParams();
      if (activeCat) params.set("cat", activeCat);
      if (activeSub) params.set("sub", activeSub);
      if (search.trim()) params.set("search", search.trim());
      if (sort !== "relevance") params.set("sort", sort);
      params.set("page", pageNum);
      params.set("limit", PAGE_SIZE);

      const res = await fetch(`/api/prompts?${params}`);
      const data = await res.json();

      if (append) {
        setPrompts((prev) => [...prev, ...(data.prompts || [])]);
      } else {
        setPrompts(data.prompts || []);
      }
      setTotal(data.total || 0);
      setHasMore(data.hasMore || false);
      setPage(pageNum);
    } catch (err) {
      console.error("fetch prompts error:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeCat, activeSub, search, sort]);

  // Re-fetch when filters change (debounce search)
  useEffect(() => {
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      fetchPrompts({ pageNum: 1 });
    }, search ? 350 : 0);
    return () => clearTimeout(searchDebounce.current);
  }, [activeCat, activeSub, search, sort, fetchPrompts]);

  // Load more
  const loadMore = () => {
    if (!hasMore || loadingMore) return;
    fetchPrompts({ append: true, pageNum: page + 1 });
  };

  const handleCatSelect = (catId) => {
    setActiveCat(catId);
    setShowSavedOnly(false);
    router.push(catId ? `/library?cat=${catId}` : "/library", undefined, { shallow: true });
  };

  const activeCatData = activeCat ? CAT_MAP[activeCat] : null;

  // For saved-only view, filter client-side
  const displayedPrompts = showSavedOnly
    ? prompts.filter((p) => savedIds.has(p.id))
    : prompts;

  return (
    <div style={font.style} className="flex h-screen overflow-hidden bg-zinc-50">
      <Head>
        <title>{activeCatData ? `${activeCatData.label} Prompts — PromptVault` : "Prompt Library — PromptVault"}</title>
        <meta name="description" content="Browse 20,000+ expert copy-paste prompts for marketing, sales, coding, and more." />
      </Head>

      <Sidebar
        activeCat={activeCat}
        onSelect={handleCatSelect}
        activeSub={activeSub}
        onSubSelect={setActiveSub}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        categoryCounts={categoryCounts}
        subcategories={subcategories}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b-2 border-zinc-200 bg-white px-4">
          <button className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 md:hidden" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={20} />
          </button>
          <div className="flex flex-1 items-center gap-2 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-3 py-1.5 focus-within:border-indigo-400 transition-colors">
            <FiSearch className="shrink-0 text-zinc-400" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 20,000+ prompts..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
            />
            {search && <button onClick={() => setSearch("")} className="text-zinc-400 hover:text-zinc-700"><FiX size={14} /></button>}
          </div>

          {/* Sort */}
          <div className="relative hidden sm:block">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-xl border-2 border-zinc-200 bg-white pl-3 pr-8 py-1.5 text-xs font-bold text-zinc-600 outline-none hover:border-zinc-300 cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="alpha">A – Z</option>
              <option value="newest">Newest</option>
            </select>
            <FiChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
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
          {/* Page heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-black">
              {showSavedOnly ? "🔖 Saved Prompts" : activeCatData ? `${activeCatData.icon} ${activeCatData.label}` : search ? `Results for "${search}"` : "✨ All Prompts"}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-sm text-zinc-500">
                {showSavedOnly ? "Your bookmarked prompts" : activeCatData?.description || "Browse all prompts across every category"}
              </p>
              {!loading && (
                <span className="font-semibold text-sm text-indigo-600">
                  {showSavedOnly ? displayedPrompts.length : total.toLocaleString()} prompt{total !== 1 ? "s" : ""}
                </span>
              )}
              {/* Active filters */}
              {activeSub && (
                <button
                  onClick={() => setActiveSub(null)}
                  className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700 hover:bg-indigo-200"
                >
                  {activeSub} <FiX size={10} />
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : displayedPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="mb-3 text-5xl">{showSavedOnly ? "🔖" : "🔍"}</span>
              <h3 className="text-lg font-bold">{showSavedOnly ? "No saved prompts yet" : "No prompts found"}</h3>
              <p className="mt-1 text-sm text-zinc-500">
                {showSavedOnly ? "Click the bookmark on any prompt to save it" : "Try a different search or category"}
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCat(null); setActiveSub(null); setShowSavedOnly(false); }}
                className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700"
              >
                Browse all prompts
              </button>
            </div>
          ) : (
            <>
              {/* Grouped by subcategory when browsing a category without filters */}
              {activeCat && !activeSub && !search && !showSavedOnly ? (
                <GroupedGrid
                  prompts={displayedPrompts}
                  onOpen={setSelectedPrompt}
                  savedIds={savedIds}
                  onToggleSave={toggleSave}
                  user={user}
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {displayedPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      onOpen={setSelectedPrompt}
                      savedIds={savedIds}
                      onToggleSave={toggleSave}
                      user={user}
                    />
                  ))}
                </div>
              )}

              {/* Load more */}
              {hasMore && !showSavedOnly && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="rounded-xl border-2 border-zinc-200 px-6 py-3 text-sm font-bold text-zinc-600 transition-all hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-50"
                  >
                    {loadingMore ? "Loading…" : `Load more prompts`}
                  </button>
                </div>
              )}

              {loadingMore && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`more-${i}`} />)}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <AnimatePresence>
        {selectedPrompt && (
          <PromptModal
            prompt={selectedPrompt}
            onClose={() => setSelectedPrompt(null)}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            user={user}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
