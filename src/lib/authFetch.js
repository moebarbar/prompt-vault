import { supabase } from "./supabase";

/**
 * A fetch wrapper that automatically adds the Supabase auth token
 * as an Authorization header on every request.
 */
export async function authFetch(url, options = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
