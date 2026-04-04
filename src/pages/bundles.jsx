import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "@/lib/auth";
import { authFetch } from "@/lib/authFetch";
import { font } from "@/fonts";
import { LogoSmall } from "@/components/navigation/Logo";
import { BundleModal } from "@/components/bundles/BundleModal";

export default function Bundles() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [bundlePrompts, setBundlePrompts] = useState([]);
  const [loadingBundle, setLoadingBundle] = useState(false);
  const [bundleError, setBundleError] = useState(false);

  // Auth gate
  useEffect(() => {
    if (!authLoading && !user) router.replace("/signup");
  }, [authLoading, user, router]);

  // Fetch bundles
  useEffect(() => {
    if (!user) return;
    authFetch("/api/bundles")
      .then((r) => r.json())
      .then((data) => setBundles(data.bundles || []))
      .catch(() => {})
      .finally(() => setLoading(false));
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

  if (authLoading || !user) {
    return (
      <div style={font.style} className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <div style={font.style} className="min-h-screen bg-zinc-50">
      <Head>
        <title>Goal Packs — PromptUpp</title>
        <meta name="description" content="Curated prompt bundles for specific goals. Launch a SaaS, grow your audience, close clients — follow a proven sequence of expert prompts." />
      </Head>

      {/* Simple top nav */}
      <header className="flex h-14 items-center gap-4 border-b-2 border-zinc-200 bg-white px-4">
        <Link href="/library"><LogoSmall /></Link>
        <Link href="/library" className="flex items-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors">
          <FiArrowLeft size={14} /> Back to Library
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border-2 border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-indigo-600">
            Goal Packs
          </span>
          <h1 className="text-4xl font-black text-zinc-900 md:text-5xl">
            Prompts with a purpose.
          </h1>
          <p className="mt-3 max-w-xl text-lg text-zinc-500">
            Each pack is a curated sequence of prompts built to achieve one specific goal — in order, step by step.
          </p>
        </div>

        {/* Bundle grid */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl border-2 border-zinc-200 bg-white" />
            ))}
          </div>
        ) : bundles.length === 0 ? (
          <div className="py-20 text-center">
            <span className="text-5xl">🔜</span>
            <p className="mt-4 text-lg font-bold text-zinc-500">Goal Packs coming soon</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bundles.map((bundle) => (
              <motion.button
                key={bundle.id}
                onClick={() => openBundle(bundle)}
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.12 }}
                className="flex flex-col gap-4 rounded-2xl border-2 border-zinc-900 bg-white p-5 text-left shadow-[3px_3px_0px_#18181b] transition-shadow hover:shadow-[5px_5px_0px_#4f46e5]"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-4xl leading-none">{bundle.icon}</span>
                  <span className="shrink-0 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-black tabular-nums text-indigo-600">
                    {bundle.promptCount} prompts
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-black text-zinc-900 leading-tight">{bundle.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{bundle.description}</p>
                </div>
                {/* Expert credit */}
                {bundle.expert_name && (
                  <div className="flex items-center gap-2 border-t border-zinc-100 pt-3 mt-1">
                    {bundle.expert_image_url ? (
                      <img src={bundle.expert_image_url} alt={bundle.expert_name}
                        className="h-6 w-6 rounded-full object-cover border border-zinc-200 shrink-0" />
                    ) : (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-black">
                        {bundle.expert_name.charAt(0)}
                      </div>
                    )}
                    <p className="text-[11px] text-zinc-500 truncate">by <span className="font-bold text-zinc-700">{bundle.expert_name}</span></p>
                  </div>
                )}
                {!bundle.expert_name && (
                  <div className="flex items-center gap-1 text-xs font-bold text-indigo-600">
                    Start this pack <FiArrowRight size={12} />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </main>

      {/* Bundle modal */}
      <AnimatePresence>
        {selectedBundle && !loadingBundle && (
          bundleError ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { setSelectedBundle(null); setBundleError(false); }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-2xl border-2 border-zinc-900 bg-white p-8 text-center shadow-[6px_6px_0px_#18181b]"
                onClick={(e) => e.stopPropagation()}>
                <p className="text-3xl mb-3">⚠️</p>
                <p className="font-black text-zinc-900">Couldn't load this pack</p>
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
