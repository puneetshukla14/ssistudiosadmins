import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isLoggedIn = request.cookies.get("admin-auth")?.value === "true";

  // Redirect old paths
  if (url.pathname === "/old-page") {
    url.pathname = "/new-page";
    return NextResponse.redirect(url);
  }

  // Let login, API requests, and static assets through without checking
  if (
    url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon") ||
    url.pathname.includes(".")
  ) {
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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
