import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiCopy, FiBookmark, FiCheck, FiX,
  FiMenu, FiLogOut, FiUser, FiShare2,
  FiChevronDown, FiArrowRight, FiZap,
} from "react-icons/fi";
import { CATEGORIES } from "@/data/prompts";
import { useAuth } from "@/lib/auth";
import { useSavedPrompts } from "@/lib/useSavedPrompts";
import { authFetch } from "@/lib/authFetch";
import { font } from "@/fonts";
import { LogoSmall } from "@/components/navigation/Logo";
import { BundleModal } from "@/components/bundles/BundleModal";

const PAGE_SIZE = 48;

// Precompute category map for quick lookups
const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

// ── Quick-start use cases ─────────────────────────────────────────────────────
const QUICK_STARTS = [
  { label: "Cold Email", icon: "✉️", cat: "sales", sub: "Cold Calling" },
  { label: "LinkedIn Post", icon: "💼", cat: "social", sub: "LinkedIn Presence" },
  { label: "Blog Post", icon: "✍️", cat: "writing", sub: null },
  { label: "Debug Code", icon: "🐛", cat: "coding", sub: "Debugging" },
  { label: "Sales Pitch", icon: "🎯", cat: "sales", sub: "Objection Handling" },
  { label: "Instagram Caption", icon: "📸", cat: "social", sub: "Instagram Growth" },
  { label: "Job Description", icon: "📋", cat: "hr", sub: "Recruitment & Hiring" },
  { label: "Brand Name", icon: "🏷️", cat: "branding", sub: "Brand Naming" },
  { label: "YouTube Script", icon: "▶️", cat: "youtube", sub: "YouTube Strategy" },
  { label: "Market Research", icon: "🔭", cat: "marketresearch", sub: "Customer Research" },
  { label: "SaaS MVP", icon: "🚀", cat: "vibecoding", sub: "SaaS Building" },
  { label: "Resume Bullet", icon: "📄", cat: "resume", sub: "Resume & Job Search" },
  { label: "Ad Copy", icon: "📣", cat: "marketing", sub: "Ad Copywriting" },
  { label: "Data Analysis", icon: "📈", cat: "dataanalysis", sub: "Analysis" },
  { label: "Legal Contract", icon: "⚖️", cat: "legal", sub: "Contracts & Agreements" },
  { label: "SEO Article", icon: "🔍", cat: "seo", sub: "Google Ranking" },
];

// ── Search autocomplete ───────────────────────────────────────────────────────
const SearchAutocomplete = ({ search, onCatSelect, onSubSelect, onSearchSelect, allSubcategories }) => {
  if (!search || search.length < 2) return null;
  const q = search.toLowerCase();

  // Match categories
  const catMatches = CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
  ).slice(0, 3);

  // Match subcategories
  const subMatches = allSubcategories
    .filter((s) => s.sub.toLowerCase().includes(q))
    .slice(0, 4);

  if (catMatches.length === 0 && subMatches.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.12 }}
      className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-xl"
    >
      {catMatches.length > 0 && (
        <div>
          <p className="px-3 pt-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Categories</p>
          {catMatches.map((cat) => (
            <button
              key={cat.id}
              onMouseDown={(e) => { e.preventDefault(); onCatSelect(cat.id); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-indigo-50"
            >
              <span className="text-lg">{cat.icon}</span>
              <div>
                <p className="text-sm font-bold text-zinc-800">{cat.label}</p>
                <p className="text-xs text-zinc-400">{cat.description}</p>
              </div>
              <FiArrowRight size={13} className="ml-auto text-zinc-300" />
            </button>
          ))}
        </div>
      )}
      {subMatches.length > 0 && (
        <div className={catMatches.length > 0 ? "border-t border-zinc-100" : ""}>
          <p className="px-3 pt-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Subcategories</p>
          {subMatches.map((s) => (
            <button
              key={`${s.cat}-${s.sub}`}
              onMouseDown={(e) => { e.preventDefault(); onCatSelect(s.cat); onSubSelect(s.sub); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-indigo-50"
            >
              <span className="text-lg">{CAT_MAP[s.cat]?.icon}</span>
              <div>
                <p className="text-sm font-bold text-zinc-800">{s.sub}</p>
                <p className="text-xs text-zinc-400">in {CAT_MAP[s.cat]?.label}</p>
              </div>
              <FiArrowRight size={13} className="ml-auto text-zinc-300" />
            </button>
          ))}
        </div>
      )}
      <button
        onMouseDown={(e) => { e.preventDefault(); onSearchSelect(); }}
        className="flex w-full items-center gap-2 border-t border-zinc-100 px-3 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50"
      >
        <FiSearch size={13} /> Search all prompts for &ldquo;{search}&rdquo;
      </button>
    </motion.div>
  );
};

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
const Sidebar = ({ activeCat, onSelect, activeSub, onSubSelect, sidebarOpen, setSidebarOpen, categoryCounts, subcategories }) => {
  const grandTotal = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  return (
  <>
    {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />}
    <aside className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r-2 border-zinc-200 bg-white transition-transform duration-200 md:static md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-14 items-center border-b-2 border-zinc-200 px-4"><LogoSmall /></div>

      {/* Grand total stat */}
      <div className="border-b-2 border-zinc-100 bg-indigo-50 px-4 py-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Total Prompts</p>
        <p className="text-2xl font-black text-indigo-600 tabular-nums">
          {grandTotal > 0 ? grandTotal.toLocaleString() : "…"}
        </p>
        <p className="text-[10px] text-indigo-400">{CATEGORIES.length} categories</p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <button onClick={() => { onSelect(null); setSidebarOpen(false); }}
          className={`mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${activeCat === null ? "bg-indigo-600 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}>
          <span className="flex-1 text-left">✨ All Prompts</span>
          {grandTotal > 0 && (
            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${activeCat === null ? "bg-indigo-500 text-white" : "bg-zinc-100 text-zinc-400"}`}>
              {grandTotal.toLocaleString()}
            </span>
          )}
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
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Library() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { savedIds, toggleSave } = useSavedPrompts(user);

  // Auth gate — redirect unauthenticated users to signup
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/signup");
    }
  }, [authLoading, user, router]);

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
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  // Bundles (Goal Packs) state
  const [bundles, setBundles] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [bundlePrompts, setBundlePrompts] = useState([]);
  const [loadingBundle, setLoadingBundle] = useState(false);
  const [bundleError, setBundleError] = useState(false);

  const searchDebounce = useRef(null);
  const savedIdsRef = useRef(savedIds);
  useEffect(() => { savedIdsRef.current = savedIds; }, [savedIds]);

  // Load bundles for home view
  useEffect(() => {
    if (!user) return;
    authFetch("/api/bundles")
      .then((r) => r.json())
      .then((data) => setBundles(data.bundles || []))
      .catch(() => {});
  }, [user]);

  const openBundle = async (bundle) => {
    setLoadingBundle(true);
    setSelectedBundle(bundle);
    setBundleError(false);
    try {
      const res = await authFetch(`/api/bundles/${bundle.slug}`);
      const data = await res.json();
      setBundlePrompts(data.prompts || []);
    } catch {
      setBundlePrompts([]);
      setBundleError(true);
    } finally {
      setLoadingBundle(false);
    }
  };

  // Load category counts once
  useEffect(() => {
    authFetch("/api/prompts/categories")
      .then((r) => r.json())
      .then((data) => {
        const map = {};
        (data.categories || []).forEach((c) => { map[c.id] = c.promptCount; });
        setCategoryCounts(map);
      })
      .catch(() => {});
  }, []);

  // Pre-load all subcategories for search autocomplete
  useEffect(() => {
    Promise.all(
      CATEGORIES.map((cat) =>
        authFetch(`/api/prompts/subcategories?cat=${cat.id}`)
          .then((r) => r.json())
          .then((data) => (data.subcategories || []).map((sub) => ({ cat: cat.id, sub })))
          .catch(() => [])
      )
    ).then((results) => setAllSubcategories(results.flat()));
  }, []);

  // Sync URL → state on mount
  useEffect(() => {
    if (router.isReady) {
      if (router.query.cat) setActiveCat(router.query.cat);
      if (router.query.prompt) {
        // Auto-open a shared prompt
        authFetch(`/api/prompts/${router.query.prompt}`)
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
    authFetch(`/api/prompts/subcategories?cat=${activeCat}`)
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

      const res = await authFetch(`/api/prompts?${params}`);
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

  if (authLoading || !user) {
    return (
      <div style={font.style} className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600" />
          <p className="text-sm font-bold text-zinc-400">Loading your vault…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={font.style} className="flex h-screen overflow-hidden bg-zinc-50">
      <Head>
        <title>
          {activeCatData
            ? `ChatGPT Prompts for ${activeCatData.label} — Copy & Paste Ready | PromptUpp`
            : search
            ? `"${search}" AI Prompts — PromptUpp`
            : "AI Prompt Library — 8,000+ Professional Copy-Paste Prompts | PromptUpp"}
        </title>
        <meta
          name="description"
          content={
            activeCatData
              ? `Browse ${categoryCounts[activeCatData.id] || "hundreds of"} expert ${activeCatData.label} AI prompts. Copy-paste ready for ChatGPT, Claude, and more. ${activeCatData.description}`
              : "Browse 8,000+ professional AI prompts for ChatGPT, Claude & more. Marketing, sales, coding, SEO, HR, legal — copy and paste instantly. Free access."
          }
        />
        <link
          rel="canonical"
          href={`https://www.promptupp.com/library${activeCat ? `?cat=${activeCat}` : ""}`}
        />
        <meta property="og:title" content={activeCatData ? `${activeCatData.label} AI Prompts | PromptUpp` : "AI Prompt Library | PromptUpp"} />
        <meta property="og:url" content={`https://www.promptupp.com/library${activeCat ? `?cat=${activeCat}` : ""}`} />
        {(() => {
          const ogTitle = activeCatData
            ? `${activeCatData.icon} ${activeCatData.label} AI Prompts`
            : "8,000+ Professional AI Prompts";
          const ogSub = activeCatData
            ? activeCatData.description
            : "Copy. Paste. Get real results.";
          const ogCategory = activeCatData ? activeCatData.label : null;
          const ogUrl = `https://www.promptupp.com/api/og?title=${encodeURIComponent(ogTitle)}&sub=${encodeURIComponent(ogSub)}${ogCategory ? `&category=${encodeURIComponent(ogCategory)}` : ""}`;
          return (
            <>
              <meta property="og:image" content={ogUrl} />
              <meta name="twitter:image" content={ogUrl} />
            </>
          );
        })()}
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
          <div className="relative flex flex-1">
            <div className={`flex w-full items-center gap-2 rounded-xl border-2 bg-zinc-50 px-3 py-1.5 transition-colors ${searchFocused ? "border-indigo-400" : "border-zinc-200"}`}>
              <FiSearch className="shrink-0 text-zinc-400" size={15} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search prompts, categories, topics..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
              />
              {search && <button onClick={() => setSearch("")} className="text-zinc-400 hover:text-zinc-700"><FiX size={14} /></button>}
            </div>
            <AnimatePresence>
              {searchFocused && (
                <SearchAutocomplete
                  search={search}
                  onCatSelect={(catId) => { handleCatSelect(catId); setSearch(""); }}
                  onSubSelect={(sub) => setActiveSub(sub)}
                  onSearchSelect={() => {}}
                  allSubcategories={allSubcategories}
                />
              )}
            </AnimatePresence>
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

          {/* ── Home view: stats + quick starts + category grid ── */}
          {!activeCat && !search && !showSavedOnly && Object.keys(categoryCounts).length > 0 && (
            <div className="mb-6 space-y-4">
              {/* Total count */}
              <div className="rounded-2xl border-2 border-zinc-900 bg-indigo-600 px-6 py-5 shadow-[5px_5px_0px_#18181b]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-indigo-200">Total prompts in the vault</p>
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="text-5xl font-black text-white tabular-nums">
                        {Object.values(categoryCounts).reduce((a, b) => a + b, 0).toLocaleString()}
                      </span>
                      <span className="text-sm font-bold text-indigo-300">across {CATEGORIES.length} categories</span>
                    </div>
                  </div>
                  <span className="hidden text-6xl sm:block">⚡</span>
                </div>
              </div>

              {/* Quick Start */}
              <div className="rounded-2xl border-2 border-zinc-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2">
                  <FiZap size={13} className="text-indigo-500" />
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Quick Start — jump straight to what you need</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {QUICK_STARTS.map((qs) => (
                    <button
                      key={qs.label}
                      onClick={() => {
                        handleCatSelect(qs.cat);
                        if (qs.sub) setTimeout(() => setActiveSub(qs.sub), 100);
                      }}
                      className="flex items-center gap-1.5 rounded-full border-2 border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-bold text-zinc-700 transition-all hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <span>{qs.icon}</span> {qs.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Packs */}
              {bundles.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Goal Packs — prompts with a purpose</p>
                    <Link href="/bundles" className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline">
                      See all <FiArrowRight size={11} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {bundles.slice(0, 3).map((bundle) => (
                      <motion.button
                        key={bundle.id}
                        onClick={() => openBundle(bundle)}
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 0 }}
                        transition={{ duration: 0.12 }}
                        className="flex flex-col gap-3 rounded-2xl border-2 border-zinc-900 bg-white p-4 text-left shadow-[3px_3px_0px_#18181b] transition-shadow hover:shadow-[5px_5px_0px_#4f46e5]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-3xl leading-none">{bundle.icon}</span>
                          <span className="shrink-0 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-black tabular-nums text-indigo-600">
                            {bundle.promptCount} prompts
                          </span>
                        </div>
                        <div>
                          <p className="font-black text-sm text-zinc-900 leading-tight">{bundle.title}</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-zinc-400 line-clamp-2">{bundle.description}</p>
                        </div>
                        {bundle.expert_name ? (
                          <div className="flex items-center gap-1.5 border-t border-zinc-100 pt-2 mt-1">
                            {bundle.expert_image_url ? (
                              <img src={bundle.expert_image_url} alt={bundle.expert_name}
                                className="h-5 w-5 rounded-full object-cover border border-zinc-200 shrink-0" />
                            ) : (
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-[9px] font-black">
                                {bundle.expert_name.charAt(0)}
                              </div>
                            )}
                            <p className="text-[10px] text-zinc-500 truncate">by <span className="font-bold text-zinc-700">{bundle.expert_name}</span></p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs font-bold text-indigo-600">
                            Start this pack <FiArrowRight size={11} />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category grid */}
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-400">Browse by category</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {CATEGORIES.map((cat) => (
                    <motion.button
                      key={cat.id}
                      onClick={() => handleCatSelect(cat.id)}
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 0 }}
                      transition={{ duration: 0.12 }}
                      className="group flex flex-col gap-3 rounded-2xl border-2 border-zinc-900 bg-white p-4 text-left shadow-[3px_3px_0px_#18181b] transition-shadow hover:shadow-[5px_5px_0px_#4f46e5] active:shadow-[2px_2px_0px_#18181b]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-3xl leading-none">{cat.icon}</span>
                        <span className="shrink-0 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-black tabular-nums text-indigo-600">
                          {categoryCounts[cat.id] != null ? categoryCounts[cat.id].toLocaleString() : "…"}
                        </span>
                      </div>
                      <div>
                        <p className="font-black text-sm text-zinc-900 leading-tight">{cat.label}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-zinc-400 line-clamp-2">{cat.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Page heading */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-black">
                {showSavedOnly ? "🔖 Saved Prompts" : activeCatData ? `${activeCatData.icon} ${activeCatData.label}` : search ? `Results for "${search}"` : "✨ All Prompts"}
              </h1>
              {!loading && !showSavedOnly && (
                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-black text-indigo-600 tabular-nums">
                  {total.toLocaleString()}
                </span>
              )}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-sm text-zinc-500">
                {showSavedOnly ? "Your bookmarked prompts" : activeCatData?.description || "Browse all prompts across every category"}
              </p>
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
            <div className="flex flex-col items-center py-16 text-center">
              <span className="mb-3 text-5xl">{showSavedOnly ? "🔖" : "🔍"}</span>
              <h3 className="text-lg font-bold">{showSavedOnly ? "No saved prompts yet" : "No prompts found"}</h3>
              <p className="mt-1 text-sm text-zinc-500">
                {showSavedOnly ? "Click the bookmark on any prompt to save it" : `Nothing matched "${search || activeSub || "your search"}" — try one of these instead`}
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCat(null); setActiveSub(null); setShowSavedOnly(false); }}
                className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700"
              >
                Browse all prompts
              </button>
              {!showSavedOnly && (
                <div className="mt-8 w-full max-w-lg">
                  <p className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-400">Try a quick start instead</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {QUICK_STARTS.slice(0, 8).map((qs) => (
                      <button
                        key={qs.label}
                        onClick={() => { setSearch(""); handleCatSelect(qs.cat); if (qs.sub) setTimeout(() => setActiveSub(qs.sub), 100); }}
                        className="flex items-center gap-1.5 rounded-full border-2 border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-700 transition-all hover:border-indigo-400 hover:text-indigo-700"
                      >
                        {qs.icon} {qs.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
        {selectedBundle && !loadingBundle && (
          bundleError ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { setSelectedBundle(null); setBundleError(false); }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-2xl border-2 border-zinc-900 bg-white p-8 text-center shadow-[6px_6px_0px_#18181b]"
                onClick={(e) => e.stopPropagation()}>
                <p className="text-3xl mb-3">⚠️</p>
                <p className="font-black text-zinc-900">Couldn&apos;t load this pack</p>
                <p className="mt-1 text-sm text-zinc-500">Please try again in a moment.</p>
                <button onClick={() => { setSelectedBundle(null); setBundleError(false); }}
                  className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white">Close</button>
              </motion.div>
            </div>
          ) : (
            <BundleModal
              bundle={selectedBundle}
              prompts={bundlePrompts}
              onClose={() => { setSelectedBundle(null); setBundlePrompts([]); }}
            />
          )
        )}
        {loadingBundle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
