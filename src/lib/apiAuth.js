import { supabaseAdmin } from "./supabaseAdmin";

/**
 * Verifies the Bearer token from the Authorization header.
 * Returns the user object if valid, null otherwise.
 */
export async function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "").trim();
  if (!token) return null;
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  return user || null;
}

/**
 * Verifies auth and checks that the user is the admin.
 */
export async function verifyAdmin(req) {
  const user = await verifyAuth(req);
  if (!user) return null;
  if (user.email !== process.env.ADMIN_EMAIL && user.email !== "moebarbar@hotmail.com") return null;
  return user;
}
