import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/lib/auth";
import { font } from "@/fonts";
import { LogoLarge } from "@/components/navigation/Logo";

export default function Signup() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error: err } = await signUp(email, password);
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      // Fire welcome email (non-blocking)
      fetch("/api/email/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {});
      setSuccess(true);
    }
  };

  const handleGoogle = async () => {
    setError("");
    const { error: err } = await signInWithGoogle();
    if (err) setError(err.message);
  };

  return (
    <div className={`${font.className} min-h-screen bg-zinc-50 flex flex-col`}>
      <Head>
        <title>Sign Up — PromptVault</title>
      </Head>

      {/* Top nav */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-zinc-200">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 bg-indigo-600 rounded text-white font-black text-xs">P</div>
            <span className="font-black text-base tracking-tight">PromptVault</span>
          </div>
        </Link>
        <Link href="/login" className="text-sm font-medium text-zinc-500 hover:text-indigo-600">
          Already have an account? <span className="font-bold text-indigo-600">Log in</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {success ? (
            <div className="rounded-2xl border-2 border-green-500 bg-white p-10 text-center shadow-sm">
              <span className="mb-4 block text-5xl">🎉</span>
              <h2 className="mb-2 text-2xl font-black">Check your email!</h2>
              <p className="text-zinc-500 mb-6">
                We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account and access the full prompt library.
              </p>
              <Link
                href="/library"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700"
              >
                Browse prompts while you wait <FiArrowRight />
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-zinc-900 bg-white p-8 shadow-[6px_6px_0px_#18181b]">
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-black">Create your free account</h1>
                <p className="mt-2 text-sm text-zinc-500">
                  500+ prompts. No credit card needed.
                </p>
              </div>

              {/* Google */}
              <button
                onClick={handleGoogle}
                className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-zinc-200 bg-white py-3 text-sm font-bold transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>

              <div className="relative mb-4 flex items-center gap-3">
                <div className="flex-1 border-t border-zinc-200" />
                <span className="text-xs text-zinc-400">or</span>
                <div className="flex-1 border-t border-zinc-200" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-600">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@email.com"
                      className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 pl-9 pr-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-600">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Min 6 characters"
                      className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 pl-9 pr-10 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-black text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
                >
                  {loading ? "Creating account..." : <>Create free account <FiArrowRight /></>}
                </button>

                <p className="text-center text-[11px] text-zinc-400">
                  By signing up you agree to our{" "}
                  <Link href="/#" className="underline hover:text-zinc-700">Terms</Link> and{" "}
                  <Link href="/#" className="underline hover:text-zinc-700">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
