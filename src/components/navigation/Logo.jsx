import React from "react";
import Link from "next/link";

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2 mr-8">
    <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded text-white font-black text-sm">
      P
    </div>
    <span className="font-black text-lg tracking-tight hidden md:block">PromptUpp</span>
  </Link>
);

export const LogoSmall = () => (
  <Link href="/" className="flex items-center gap-1.5">
    <div className="flex items-center justify-center w-6 h-6 bg-indigo-600 rounded text-white font-black text-xs">
      P
    </div>
    <span className="font-black text-sm tracking-tight">PromptUpp</span>
  </Link>
);

export const LogoLarge = () => (
  <Link href="/" className="flex items-center gap-3 mb-6">
    <div className="flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-xl text-white font-black text-2xl">
      P
    </div>
    <span className="font-black text-3xl tracking-tight">PromptUpp</span>
  </Link>
);
