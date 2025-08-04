// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthed = request.cookies.get("grim_auth")?.value === process.env.PASSWORD;
  if (request.nextUrl.pathname !== "/login" && !isAuthed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
