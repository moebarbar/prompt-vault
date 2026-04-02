/**
 * useSavedPrompts
 * Fetches and manages the current user's saved prompts.
 * Requires the user to be logged in (uses Supabase session token).
 */

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

export function useSavedPrompts(user) {
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Fetch saved prompts when user changes
  useEffect(() => {
    if (!user) {
      setSavedIds(new Set());
      return;
    }
    setLoading(true);
    supabase
      .from("saved_prompts")
      .select("prompt_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) setSavedIds(new Set(data.map((r) => r.prompt_id)));
        setLoading(false);
      });
  }, [user]);

  const toggleSave = useCallback(
    async (promptId, categoryId) => {
      if (!user) return;

      const isSaved = savedIds.has(promptId);

      // Optimistic update
      setSavedIds((prev) => {
        const next = new Set(prev);
        isSaved ? next.delete(promptId) : next.add(promptId);
        return next;
      });

      if (isSaved) {
        await supabase
          .from("saved_prompts")
          .delete()
          .eq("user_id", user.id)
          .eq("prompt_id", promptId);
      } else {
        await supabase
          .from("saved_prompts")
          .insert({ user_id: user.id, prompt_id: promptId, category_id: categoryId });
      }
    },
    [user, savedIds]
  );

  return { savedIds, toggleSave, loading };
}
