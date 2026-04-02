import React from "react";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import Link from "next/link";
import { LogoSmall } from "../navigation/Logo";

export const Footer = () => {
  return (
    <div className="bg-white">
      <footer className="relative mx-auto max-w-6xl overflow-hidden py-12">
        <div className="grid grid-cols-12 gap-x-1.5 gap-y-6 px-2 md:px-4">
          <div className="col-span-6 md:col-span-4">
            <LogoSmall />
            <p className="mt-3 text-xs text-zinc-500 max-w-xs">
              500+ expert prompts for every role. Copy, paste, and get real AI results — no prompt engineering required.
            </p>
            <span className="mt-3 inline-block text-xs text-zinc-400">
              © PromptVault — All rights reserved.
            </span>
          </div>
          <GenericColumn title="Library" links={[
            { title: "All Prompts", href: "/library" },
            { title: "Marketing", href: "/library?cat=marketing" },
            { title: "Sales", href: "/library?cat=sales" },
            { title: "Vibe Coding", href: "/library?cat=vibecoding" },
            { title: "Image Gen", href: "/library?cat=imagegen" },
          ]} />
          <GenericColumn title="Account" links={[
            { title: "Sign Up Free", href: "/signup" },
            { title: "Log In", href: "/login" },
            { title: "Dashboard", href: "/library" },
          ]} />
          <GenericColumn title="Legal" links={[
            { title: "Terms & Conditions", href: "/#" },
            { title: "Privacy Policy", href: "/#" },
          ]} />
          <GenericColumn title="Socials" links={[
            { title: "Twitter / X", href: "/#", Icon: SiX },
            { title: "Instagram", href: "/#", Icon: SiInstagram },
            { title: "YouTube", href: "/#", Icon: SiYoutube },
          ]} />
        </div>
      </footer>
    </div>
  );
};

const GenericColumn = ({ title, links }) => (
  <div className="col-span-6 space-y-2 text-sm md:col-span-2">
    <span className="block font-bold">{title}</span>
    {links.map((l) => (
      <Link key={l.title} href={l.href} className="flex items-center gap-1.5 transition-colors hover:text-indigo-600 hover:underline text-zinc-600">
        {l.Icon && <l.Icon />}
        {l.title}
      </Link>
    ))}
  </div>
);
