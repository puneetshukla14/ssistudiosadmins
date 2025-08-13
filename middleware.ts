import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // If accessing login page, allow it
    if (pathname === "/login") {
      return NextResponse.next();
    }

    // For root path, redirect to login if not authenticated
    if (pathname === "/") {
      const authCookie = request.cookies.get("admin-auth");
      const isLoggedIn = authCookie?.value === "true";

      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      // If authenticated, let the page handle the redirect to dashboard
      return NextResponse.next();
    }

    // For dashboard routes, check authentication
    if (pathname.startsWith("/dashboard")) {
      const authCookie = request.cookies.get("admin-auth");
      const isLoggedIn = authCookie?.value === "true";

      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
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
     * Only run middleware on dashboard routes
     * This explicitly avoids API routes and static files
     */
    '/dashboard/:path*',
    '/',
  ],
};
