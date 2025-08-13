// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Ensure that .get() returns a string or undefined before checking .value
  const isLoggedIn = req.cookies.get("admin-auth")?.value === "true";

  // Case 1: If the user is logged in and tries to access the login page,
  //         redirect them to the home page.
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Case 2: If the user is NOT logged in and tries to access the home page,
  //         redirect them to the login page.
  //         The home page is defined as the root path "/".
  if (pathname === "/" && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    // Optional: add a callbackUrl to redirect back after login
    // This part is fine, but ensure your login page uses it if you want that functionality.
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow all other requests (e.g., API routes, or authenticated users accessing other pages).
  // This includes your API routes like /api/admin-login, /api/logout, /api/members.
  // The 'matcher' configuration below will ensure this middleware runs on relevant paths.
  return NextResponse.next();
}

export const config = {
  // Apply middleware to:
  // - The login page ("/")
  // - The home page ("/login")
  // - All API routes under "/api/"
  // - Exclude Next.js internal files (like _next/static, _next/image) and the favicon.
  //   The negative lookahead regex is generally robust for excluding static assets.
  matcher: [
    // This matcher is designed to run the middleware only on paths that are relevant
    // for authentication checks, and explicitly excludes static assets.
    // It says: "Match any path that does NOT start with _next/static, _next/image,
    // or does not contain favicon.ico."
    // This is more efficient than explicitly listing all API routes and pages.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};