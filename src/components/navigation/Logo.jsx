import React from "react";
import Link from "next/link";

// Icon mark: terminal prompt ">" + upward arrow — "Prompt" + "Upp"
const IconMark = ({ size = 32, radius = 8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", flexShrink: 0 }}
  >
    {/* Background */}
    <rect width="32" height="32" rx={radius} fill="#4f46e5" />

    {/* Terminal prompt chevron ">" */}
    <path
      d="M7 10.5L14.5 16L7 21.5"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Upward arrow shaft */}
    <line
      x1="21"
      y1="22"
      x2="21"
      y2="12"
      stroke="white"
      strokeWidth="2.6"
      strokeLinecap="round"
    />

    {/* Upward arrow head */}
    <path
      d="M17.5 15.5L21 12L24.5 15.5"
      stroke="white"
      strokeWidth="2.6"
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
