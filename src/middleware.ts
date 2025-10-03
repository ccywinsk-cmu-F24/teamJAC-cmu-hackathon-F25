import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Restrict /doc to development environment only
  if (request.nextUrl.pathname.startsWith("/doc")) {
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/doc/:path*",
};
