import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCopy, FiCheck, FiChevronDown, FiChevronUp } from "react-icons/fi";

const PromptStep = ({ prompt, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border-2 border-zinc-200 bg-white transition-all hover:border-zinc-300">
      {/* Step header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start gap-4 p-4 text-left"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-black text-white">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-black text-sm text-zinc-900">{prompt.title}</p>
          {prompt._note && (
            <p className="mt-0.5 text-xs text-indigo-600 font-medium">{prompt._note}</p>
          )}
          <p className="mt-1 text-xs text-zinc-500 line-clamp-1">{prompt.description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
              copied ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500 hover:bg-indigo-100 hover:text-indigo-700"
            }`}
          >
            {copied ? <FiCheck size={11} /> : <FiCopy size={11} />}
            {copied ? "Copied!" : "Copy"}
          </button>
          {expanded ? <FiChevronUp size={15} className="text-zinc-400" /> : <FiChevronDown size={15} className="text-zinc-400" />}
        </div>
      </button>

      {/* Expanded prompt text */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-zinc-100 px-4 pb-4 pt-3">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-700">
                {prompt.prompt}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const BundleModal = ({ bundle, prompts, onClose }) => {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative flex w-full max-w-2xl flex-col rounded-2xl border-2 border-zinc-900 bg-white shadow-[8px_8px_0px_#18181b] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start gap-4 border-b-2 border-zinc-100 p-6">
          <span className="text-4xl leading-none">{bundle.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-indigo-600">
                Goal Pack
              </span>
              <span className="text-[10px] font-bold text-zinc-400">
                {prompts.length} prompts
              </span>
            </div>
            <h2 className="text-xl font-black text-zinc-900 leading-tight">{bundle.title}</h2>
            <p className="mt-1 text-sm text-zinc-500">{bundle.description}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Steps */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
            Follow the steps in order — click any step to expand the full prompt
          </p>
          {prompts.map((prompt, i) => (
            <PromptStep key={prompt.id} prompt={prompt} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
