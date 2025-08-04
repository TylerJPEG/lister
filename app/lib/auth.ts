// lib/auth.ts
import { cookies } from "next/headers";

export function isAuthed() {
  const cookieStore = cookies();
  return cookieStore.get("grim_auth")?.value === process.env.PASSWORD;
}
