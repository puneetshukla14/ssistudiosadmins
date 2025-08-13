import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isLoggedIn = request.cookies.get("admin-auth")?.value === "true";

  // Redirect old paths
  if (url.pathname === "/old-page") {
    url.pathname = "/new-page";
    return NextResponse.redirect(url);
  }

  // Let login and API requests through without checking
  if (url.pathname.startsWith("/login") || url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Block everything else if not logged in
  if (!isLoggedIn) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Continue normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
