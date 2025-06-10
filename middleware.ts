import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // If root route, redirect to default locale
  if (!pathname.startsWith("/en") && !pathname.startsWith("/ja")) {
    return NextResponse.redirect(new URL("/en" + pathname, request.url));
  }
}
