// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = req.cookies.get("admin-auth")?.value === "true";

  // 1. If the user is trying to access the login page while already logged in,
  //    redirect them to the dashboard.
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard/members", req.url));
  }

  // 2. Define your protected routes explicitly.
  //    This regex matches any path under /dashboard.
  const isProtectedRoute = pathname.startsWith("/dashboard"); 

  // 3. If it's a protected route AND the user is NOT logged in, redirect to login.
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    // Optional: add a callbackUrl to redirect back after login
    loginUrl.searchParams.set("callbackUrl", pathname); 
    return NextResponse.redirect(loginUrl);
  }

  // 4. Allow access to API routes and public static assets (handled by matcher implicitly).
  //    No explicit check needed here if the matcher is set correctly, 
  //    as the other conditions handle protected routes and login page.

  // All other requests (public pages, or protected pages when logged in) are allowed.
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all paths except the Next.js internal ones for static files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Match all paths
  ],
};