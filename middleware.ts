import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Skip middleware for static assets, API routes, and Next.js internals
    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/favicon") ||
      pathname.includes(".") ||
      pathname === "/login"
    ) {
      return NextResponse.next();
    }

    // Check authentication for protected routes
    const authCookie = request.cookies.get("admin-auth");
    const isLoggedIn = authCookie?.value === "true";

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    // If middleware fails, allow the request to continue
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next (Next.js internals)
     * - favicon.ico
     * - static files with extensions
     */
    "/((?!api|_next|favicon.ico|.*\\.).*)",
  ],
};
