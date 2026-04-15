import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { getSettings } from "@/lib/localDb";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { loginSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// SECURITY: No hardcoded fallback — JWT_SECRET must be configured.
if (!process.env.JWT_SECRET) {
  console.error("[SECURITY] FATAL: JWT_SECRET is not set. Login authentication is disabled.");
}

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET || "");
}

// Test seam for cookie store injection without affecting runtime behavior.
export const authRouteInternals = {
  getCookieStore: cookies,
};

export async function POST(request) {
  const auditContext = getAuditRequestContext(request);

  try {
    // Fail-fast if JWT_SECRET is not configured
    if (!process.env.JWT_SECRET) {
      logAuditEvent({
        action: "auth.login.misconfigured",
        actor: "system",
        target: "dashboard-auth",
        resourceType: "auth_session",
        status: "failed",
        ipAddress: auditContext.ipAddress || undefined,
        requestId: auditContext.requestId,
        metadata: { reason: "missing_jwt_secret" },
      });
      return NextResponse.json(
        { error: "Server misconfigured: JWT_SECRET not set. Contact administrator." },
        { status: 500 }
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
        logAuditEvent({
          action: "auth.login.setup_required",
          actor: "anonymous",
          target: "dashboard-auth",
          resourceType: "auth_session",
          status: "failed",
          ipAddress: auditContext.ipAddress || undefined,
          requestId: auditContext.requestId,
          metadata: { reason: "missing_initial_password" },
        });
        return NextResponse.json(
          { error: "No password configured. Complete onboarding first.", needsSetup: true },
          { status: 403 }
        );
      }
      const initialPassword = process.env.INITIAL_PASSWORD;
      isValid = password === initialPassword;
    }

    if (isValid) {
      const forceSecureCookie = process.env.AUTH_COOKIE_SECURE === "true";
      const forwardedProtoHeader = request.headers.get("x-forwarded-proto") || "";
      const forwardedProto = forwardedProtoHeader.split(",")[0].trim().toLowerCase();
      const isHttpsRequest = forwardedProto === "https" || request.nextUrl?.protocol === "https:";
      const useSecureCookie = forceSecureCookie || isHttpsRequest;

      const token = await new SignJWT({ authenticated: true })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(getJwtSecret());

      const cookieStore = await authRouteInternals.getCookieStore();
      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: useSecureCookie,
        sameSite: "lax",
        path: "/",
      });

      logAuditEvent({
        action: "auth.login.success",
        actor: "admin",
        target: "dashboard-auth",
        resourceType: "auth_session",
        status: "success",
        ipAddress: auditContext.ipAddress || undefined,
        requestId: auditContext.requestId,
        metadata: {
          hasStoredPassword: Boolean(storedHash),
          secureCookie: useSecureCookie,
        },
      });

      return NextResponse.json({ success: true });
    }

    logAuditEvent({
      action: "auth.login.failed",
      actor: "anonymous",
      target: "dashboard-auth",
      resourceType: "auth_session",
      status: "failed",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: { reason: "invalid_password" },
    });
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("[AUTH] Login failed:", error);
    logAuditEvent({
      action: "auth.login.error",
      actor: "system",
      target: "dashboard-auth",
      resourceType: "auth_session",
      status: "failed",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        message: error instanceof Error ? error.message : "unknown_error",
      },
    });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
