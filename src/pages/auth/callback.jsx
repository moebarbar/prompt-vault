import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import { font } from "@/fonts";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { token_hash, type, next } = router.query;

    async function handleCallback() {
      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type });
        if (!error) {
          router.replace(next || "/library");
          return;
        }
      }

      // Fallback: try to recover session from URL hash (older Supabase flow)
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/library");
      } else {
        router.replace("/login?error=confirmation_failed");
      }
    }

    handleCallback();
  }, [router.isReady, router.query]);

  return (
    <div style={font.style} className="flex h-screen items-center justify-center bg-zinc-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600" />
        <p className="text-sm font-bold text-zinc-400">Confirming your account…</p>
      </div>
    </div>
  );
}
