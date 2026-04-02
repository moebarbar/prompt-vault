import React, { useState } from "react";
import { FiMail } from "react-icons/fi";

export const EmailCapture = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative bg-zinc-900 py-24 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-2 md:flex-row md:px-4">
        <div>
          <h2 className="mb-2 text-center text-3xl font-medium md:text-start">
            Get new prompts every week
          </h2>
          <p className="text-center text-lg text-zinc-400 md:text-start">
            Fresh prompts dropped every Tuesday. Join 1,000+ users already saving time.
          </p>
        </div>

        {status === "success" ? (
          <div className="flex items-center gap-2 rounded-lg border border-green-500 bg-green-500/10 px-5 py-3 text-green-400">
            <span>✓</span>
            <span className="font-medium">You&apos;re on the list!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center gap-1.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-fit w-full rounded-md border border-zinc-500 bg-zinc-700 px-3 py-2 transition-colors focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="grid size-10 shrink-0 place-content-center rounded-md bg-white text-xl text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50"
            >
              <FiMail />
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
        )}
      </div>
      <div className="absolute left-0 right-0 top-0 h-8 rounded-b-2xl bg-zinc-50" />
      <div className="absolute bottom-0 left-0 right-0 h-8 rounded-t-2xl bg-white" />
    </section>
  );
};
