import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Redirect root URL (/) to /app/page
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/app/page", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Only run for homepage
};
