import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Skip middleware for API routes — they handle auth themselves
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/analyze/:path*", "/match/:path*", "/ats-check/:path*", "/history/:path*"],
};
