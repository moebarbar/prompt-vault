import React from "react";
import Link from "next/link";

// Single bold caret ^ — prompt symbol + "Upp" in one mark
const IconMark = ({ size = 32, radius = 8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", flexShrink: 0 }}
  >
    <rect width="32" height="32" rx={radius} fill="#4f46e5" />
    <path
      d="M7 22L16 10L25 22"
      stroke="white"
      strokeWidth="3.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2 mr-8">
    <IconMark size={34} radius={8} />
    <span className="font-black text-lg tracking-tight hidden md:block">PromptUpp</span>
  </Link>
);

export const LogoSmall = () => (
  <Link href="/" className="flex items-center gap-1.5">
    <IconMark size={26} radius={6} />
    <span className="font-black text-sm tracking-tight">PromptUpp</span>
  </Link>
);

export const LogoLarge = () => (
  <Link href="/" className="flex items-center gap-3 mb-6">
    <IconMark size={52} radius={13} />
    <span className="font-black text-3xl tracking-tight">PromptUpp</span>
  </Link>
);
