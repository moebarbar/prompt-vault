import React from "react";
import { motion } from "framer-motion";
import { MockupScreen } from "./MockupScreen";
import { Copy } from "./Copy";
import { IllustrationTyping, IllustrationSave } from "../illustrations/Illustrations";

const FloatingCard = ({ illustration: Illus, line1, line2, className = "", delay = 0 }) => (
  <motion.div
    className={`absolute hidden xl:flex items-center gap-3 rounded-xl border-2 border-zinc-900 bg-white px-3 py-2.5 shadow-[4px_4px_0px_#18181b] max-w-[200px] z-10 ${className}`}
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <Illus className="w-10 shrink-0 rounded-lg" />
    <div>
      <p className="text-xs font-bold text-zinc-900 leading-tight">{line1}</p>
      <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">{line2}</p>
    </div>
  </motion.div>
);

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-12 pb-48 pt-12 md:pt-24 overflow-hidden">
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Floating cards */}
      <FloatingCard
        illustration={IllustrationTyping}
        line1="Paste into any AI tool"
        line2="ChatGPT, Claude, Gemini & more"
        className="left-6 top-1/2 -translate-y-1/2 -rotate-2"
        delay={0}
      />
      <FloatingCard
        illustration={IllustrationSave}
        line1="500+ expert prompts"
        line2="25 professional categories"
        className="right-6 top-1/2 -translate-y-8 rotate-2"
        delay={1.6}
      />

      <div className="relative z-10 flex flex-col items-center">
        <Copy />
      </div>
      <MockupScreen />
    </section>
  );
};
