// lib/auth.ts
import { cookies } from "next/headers";

export const AUTH_COOKIE = "auth-token";

export function isAuthed() {
  const cookieStore = cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "true";
}
