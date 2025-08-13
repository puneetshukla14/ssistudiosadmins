// TEMPORARY DEBUGGING: middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log('Middleware is running for:', req.nextUrl.pathname); // Add logging
  // return NextResponse.redirect(new URL("/", req.url)); // TEMPORARY: Force redirect all to home for testing
  return NextResponse.next(); // TEMPORARY: Allow all requests through
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};