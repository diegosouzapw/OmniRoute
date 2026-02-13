import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "omniroute-default-secret-change-me"
);

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protect all dashboard routes (except onboarding)
  if (pathname.startsWith("/dashboard")) {
    // Always allow onboarding — it has its own setupComplete guard
    if (pathname.startsWith("/dashboard/onboarding")) {
      return NextResponse.next();
    }

    const token = request.cookies.get("auth_token")?.value;

    if (token) {
      try {
        await jwtVerify(token, SECRET);
        return NextResponse.next();
      } catch (err) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    const origin = request.nextUrl.origin;
    try {
      const res = await fetch(`${origin}/api/settings`);
      const data = await res.json();
      // Skip auth if login is not required
      if (data.requireLogin === false) {
        return NextResponse.next();
      }
      // Skip auth if no password has been set yet (fresh install)
      // This prevents an unresolvable loop where requireLogin=true but no password exists
      if (!data.hasPassword) {
        return NextResponse.next();
      }
    } catch (err) {
      // On error, require login
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect / to /dashboard if logged in, or /dashboard if it's the root
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
