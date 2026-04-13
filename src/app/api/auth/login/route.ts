import { NextResponse } from "next/server";
import { getSettings } from "@/lib/localDb";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { loginSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { checkLoginLockout, recordLoginFailure, clearLoginAttempts } from "@/lib/db/loginAttempts";
import { getClientIpFromRequest } from "@/lib/ipUtils";

// SECURITY: No hardcoded fallback — JWT_SECRET must be configured.
if (!process.env.JWT_SECRET) {
  console.error("[SECURITY] FATAL: JWT_SECRET is not set. Login authentication is disabled.");
}
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function POST(request) {
  try {
    // Fail-fast if JWT_SECRET is not configured
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "Server misconfigured: JWT_SECRET not set. Contact administrator." },
        { status: 500 }
      );
    }

    // Brute-force protection: check lockout by IP before processing credentials
    // Use getClientIpFromRequest to handle CSV x-forwarded-for and Cloudflare headers
    const ip = getClientIpFromRequest(request);
    const lockout = checkLoginLockout(ip);
    if (lockout.locked) {
      const retryAfterSec = Math.ceil(lockout.retryAfterMs / 1000);
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
      );
    }

    const rawBody = await request.json();

    // Zod validation
    const validation = validateBody(loginSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const password = typeof validation.data.password === "string" ? validation.data.password : "";
    if (!password) {
      return NextResponse.json({ error: "Invalid password payload" }, { status: 400 });
    }
    const settings = await getSettings();

    const storedHash = typeof settings.password === "string" ? settings.password : "";

    let isValid = false;
    if (storedHash) {
      isValid = await bcrypt.compare(password, storedHash);
    } else {
      // SECURITY: No default password — must be set via env or onboarding
      if (!process.env.INITIAL_PASSWORD) {
        return NextResponse.json(
          { error: "No password configured. Complete onboarding first.", needsSetup: true },
          { status: 403 }
        );
      }
      const initialPassword = process.env.INITIAL_PASSWORD;
      isValid = password === initialPassword;
    }

    if (isValid) {
      clearLoginAttempts(ip);

      const forceSecureCookie = process.env.AUTH_COOKIE_SECURE === "true";
      const forwardedProtoHeader = request.headers.get("x-forwarded-proto") || "";
      const forwardedProto = forwardedProtoHeader.split(",")[0].trim().toLowerCase();
      const isHttpsRequest = forwardedProto === "https" || request.nextUrl?.protocol === "https:";
      const useSecureCookie = forceSecureCookie || isHttpsRequest;

      const token = await new SignJWT({ authenticated: true })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(SECRET);

      const cookieStore = await cookies();
      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: useSecureCookie,
        sameSite: "lax",
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    recordLoginFailure(ip);
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("[AUTH] Login failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
