import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export function middleware(request) {
  const token = request.cookies.get("token");

  // Allow access to auth pages (signin/signup)
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // If user is not authenticated, redirect to signin
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to dashboard pages
export const config = {
  matcher: ["/dashboard/:path*"],
};
