import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const isLoggedIn = req.cookies.get("admin-auth")?.value === "true";

    // Already logged in → block access to /login
    if (pathname === "/login" && isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard/members", req.url));
    }

    // Protect all /dashboard routes
    if (pathname.startsWith("/dashboard") && !isLoggedIn) {
      const loginUrl = new URL("/login", req.url);
      // Avoid passing full pathname with unsafe chars
      if (pathname && typeof pathname === "string") {
        loginUrl.searchParams.set("callbackUrl", encodeURIComponent(pathname));
      }
      return NextResponse.redirect(loginUrl);
    }

    // Default allow
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    // Always return something to prevent crash
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
