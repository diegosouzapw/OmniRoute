import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { classifyIpScope } from "@/lib/ipUtils";
import { getCachedSettings } from "@/lib/db/settings";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import {
  ensurePersistentManagementPasswordHash,
  getStoredManagementPassword,
  verifyManagementPassword,
} from "@/lib/auth/managementPassword";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { loginSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { checkLoginGuard, clearLoginAttempts, recordLoginFailure } from "@/server/auth/loginGuard";
import { AUTHZ_HEADER_TRUSTED_PEER_IP } from "@/server/authz/headers";
import { getDashboardJwtSecret } from "@/shared/utils/dashboardSessionToken";

// SECURITY: No hardcoded fallback — JWT_SECRET must be configured.
if (!process.env.JWT_SECRET) {
  console.error("[SECURITY] FATAL: JWT_SECRET is not set. Login authentication is disabled.");
}

// Test seam for cookie store injection without affecting runtime behavior.
export const authRouteInternals = {
  getCookieStore: cookies,
};

export async function POST(request: NextRequest) {
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

    let rawBody;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: {
            message: "Invalid request",
            details: [{ field: "body", message: "Invalid JSON body" }],
          },
        },
        { status: 400 }
      );
    }

    // Zod validation
    const validation = validateBody(loginSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const password = typeof validation.data.password === "string" ? validation.data.password : "";
    if (!password) {
      return NextResponse.json({ error: "Invalid password payload" }, { status: 400 });
    }
    const settings = await getCachedSettings();
    const trustedPeerIp = process.env.OMNIROUTE_PEER_STAMP_TOKEN
      ? request.headers.get(AUTHZ_HEADER_TRUSTED_PEER_IP)
      : null;
    const clientIp = trustedPeerIp || auditContext.ipAddress || null;
    const oidcDisabledPassword =
      settings.oidcEnabled === true &&
      (settings.oidcDisablePasswordLogin === true ||
        isFeatureFlagEnabled("OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN") ||
        process.env.OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN === "true" ||
        process.env.OIDC_DISABLE_PASSWORD_LOGIN === "true");

    if (oidcDisabledPassword) {
      logAuditEvent({
        action: "auth.login.password_disabled_by_oidc",
        actor: "anonymous",
        target: "dashboard-auth",
        resourceType: "auth_session",
        status: "failed",
        ipAddress: clientIp || undefined,
        requestId: auditContext.requestId,
        metadata: { reason: "password_login_disabled_when_oidc_active" },
      });
      return NextResponse.json(
        { error: "Password login is disabled when OIDC is active. Please sign in with OIDC." },
        { status: 403 }
      );
    }

    const bruteForceEnabled = settings.bruteForceProtection !== false;

    const guardCheck = checkLoginGuard(clientIp, { enabled: bruteForceEnabled });
    if (!guardCheck.allowed) {
      logAuditEvent({
        action: "auth.login.locked",
        actor: "anonymous",
        target: "dashboard-auth",
        resourceType: "auth_session",
        status: "failed",
        ipAddress: clientIp || undefined,
        requestId: auditContext.requestId,
        metadata: { retryAfterSeconds: guardCheck.retryAfterSeconds || 0 },
      });
      return NextResponse.json(
        { error: "Too many failed attempts. Try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(guardCheck.retryAfterSeconds || 60) },
        }
      );
    }

    const passwordState = await ensurePersistentManagementPasswordHash({
      settings,
      source: "auth.login",
    });
    const storedHash = getStoredManagementPassword(passwordState.settings);

    if (!storedHash) {
      logAuditEvent({
        action: "auth.login.setup_required",
        actor: "anonymous",
        target: "dashboard-auth",
        resourceType: "auth_session",
        status: "failed",
        ipAddress: auditContext.ipAddress || undefined,
        requestId: auditContext.requestId,
        metadata: { reason: "missing_persisted_password" },
      });
      return NextResponse.json(
        { error: "No password configured. Complete onboarding first.", needsSetup: true },
        { status: 403 }
      );
    }

    const isValid = await verifyManagementPassword(password, storedHash);

    if (isValid) {
      const forceSecureCookie = process.env.AUTH_COOKIE_SECURE === "true";
      const forwardedProtoHeader = request.headers.get("x-forwarded-proto") || "";
      const forwardedProto = forwardedProtoHeader.split(",")[0].trim().toLowerCase();
      const isHttpsRequest = forwardedProto === "https" || request.nextUrl?.protocol === "https:";
      const useSecureCookie = forceSecureCookie || isHttpsRequest;

      const token = await new SignJWT({ authenticated: true })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(getDashboardJwtSecret()!);

      const cookieStore = await authRouteInternals.getCookieStore();
      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: useSecureCookie,
        sameSite: "lax",
        path: "/",
        // 30 days — bound the cookie lifetime to the JWT's 30d expiry so the browser
        // drops it on the same schedule the token stops being valid (Seg3 hardening).
        maxAge: 60 * 60 * 24 * 30,
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
          passwordMigrated: passwordState.migrated,
          secureCookie: useSecureCookie,
        },
      });

      clearLoginAttempts(clientIp);
      return NextResponse.json({ success: true });
    }

    const failureDecision = recordLoginFailure(clientIp, { enabled: bruteForceEnabled });

    // #8336: tag the origin scope so the audit view can distinguish a mistyped
    // password from the host itself / the LAN (loopback / private) from a
    // genuinely external attempt, instead of every failure reading as intrusion.
    const sourceScope = classifyIpScope(auditContext.ipAddress);

    logAuditEvent({
      action: "auth.login.failed",
      actor: "anonymous",
      target: "dashboard-auth",
      resourceType: "auth_session",
      status: "failed",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        reason: "invalid_password",
        lockedOut: failureDecision.allowed === false,
        sourceScope,
        internalOrigin: sourceScope === "loopback" || sourceScope === "private",
      },
    });

    if (!failureDecision.allowed) {
      return NextResponse.json(
        { error: "Too many failed attempts. Try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(failureDecision.retryAfterSeconds || 60) },
        }
      );
    }

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
