import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define routes that require authentication
  const isProtectedRoute = path.startsWith("/admin") && path !== "/admin/login";

  if (isProtectedRoute) {
    const session = await getSession();

    if (!session?.role) {
      // Redirect unauthenticated users to login page
      return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
    }
  }

  // Allow access to login if they aren't authenticated
  // Or if they are authenticated and navigating to login, optionally redirect to dashboard
  if (path === "/admin/login") {
    const session = await getSession();
    if (session?.role) {
       return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|uploads).*)',
  ],
};
