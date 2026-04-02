import React from "react";
import Link from "next/link";
import { SectionHeading } from "../shared/SectionHeading";
import { LogoLarge } from "../navigation/Logo";
import { Button } from "../shared/Button";

export const FinalCTA = () => (
  <section className="-mt-8 bg-white px-2 py-24 md:px-4">
    <div className="mx-auto flex max-w-5xl flex-col items-center">
      <LogoLarge />
      <SectionHeading>Ready to stop wasting time?</SectionHeading>
      <p className="mx-auto mb-8 text-center text-base leading-relaxed md:text-xl md:leading-relaxed text-zinc-600">
        500+ prompts. 25 categories. Zero cost to start. Sign up and start copying in 30 seconds.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="/signup">
          <Button intent="primary">
            <span className="font-bold">Create free account</span>
          </Button>
        </Link>
        <Link href="/library">
          <Button intent="outline">Browse prompts first</Button>
        </Link>
      </div>
    </div>
  </section>
);
