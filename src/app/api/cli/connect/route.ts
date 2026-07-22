import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { getCachedSettings } from "@/lib/localDb";
import {
  ensurePersistentManagementPasswordHash,
  getStoredManagementPassword,
  verifyManagementPassword,
} from "@/lib/auth/managementPassword";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { checkLoginGuard, clearLoginAttempts, recordLoginFailure } from "@/server/auth/loginGuard";
import { createAccessToken } from "@/lib/db/accessTokens";
import { ACCESS_SCOPES } from "@/lib/accessTokens/scopes";

/**
 * POST /api/cli/connect — remote-mode bootstrap.
 *
 * Exchange the management password for a scoped CLI access token. Public route
 * (no token exists yet) that does its OWN password verification + brute-force
 * lockout, mirroring /api/auth/login — but mints an `oma_` access token instead
 * of a dashboard JWT cookie. The plaintext token is returned exactly once.
 *
 * Default scope is `admin`: the password holder is the owner and can already do
 * anything; the first token should be able to mint narrower tokens for other
 * machines. Pass `scope` to downscope (e.g. a read-only CI token).
 */

const connectSchema = z.object({
  password: z.string().min(1),
  name: z.string().min(1).max(100).optional(),
  scope: z.enum(ACCESS_SCOPES).optional(),
  expiresInDays: z.number().int().positive().max(3650).optional(),
});

export async function POST(request: Request) {
  const auditContext = getAuditRequestContext(request);

  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateBody(connectSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { password, name, scope, expiresInDays } = validation.data;

    const settings = await getCachedSettings();
    const bruteForceEnabled = settings.bruteForceProtection !== false;
    const clientIp = auditContext.ipAddress || null;

    const guardCheck = checkLoginGuard(clientIp, { enabled: bruteForceEnabled });
    if (!guardCheck.allowed) {
      logAuditEvent({
        action: "cli.connect.locked",
        actor: "anonymous",
        target: "cli-access-token",
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
          headers: guardCheck.retryAfterSeconds
            ? { "Retry-After": String(guardCheck.retryAfterSeconds) }
            : {},
        }
      );
    }

    const passwordState = await ensurePersistentManagementPasswordHash({
      settings,
      source: "cli.connect",
    });
    const storedHash = getStoredManagementPassword(passwordState.settings);
    if (!storedHash) {
      return NextResponse.json(
        { error: "No password configured. Complete onboarding first.", needsSetup: true },
        { status: 403 }
      );
    }

    const isValid = await verifyManagementPassword(password, storedHash);
    if (!isValid) {
      const failureDecision = recordLoginFailure(clientIp, { enabled: bruteForceEnabled });
      logAuditEvent({
        action: "cli.connect.failed",
        actor: "anonymous",
        target: "cli-access-token",
        resourceType: "auth_session",
        status: "failed",
        ipAddress: clientIp || undefined,
        requestId: auditContext.requestId,
        metadata: { reason: "invalid_password", lockedOut: failureDecision.allowed === false },
      });
      if (!failureDecision.allowed) {
        return NextResponse.json(
          { error: "Too many failed attempts. Try again later." },
          {
            status: 429,
            headers: failureDecision.retryAfterSeconds
              ? { "Retry-After": String(failureDecision.retryAfterSeconds) }
              : {},
          }
        );
      }
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    clearLoginAttempts(clientIp);

    const tokenScope = scope ?? "admin";
    const tokenName = (name ?? "remote-cli").trim() || "remote-cli";
    const expiresAt =
      typeof expiresInDays === "number"
        ? new Date(Date.now() + expiresInDays * 86_400_000).toISOString()
        : null;

    const { record, secret } = createAccessToken({
      name: tokenName,
      scope: tokenScope,
      expiresAt,
    });

    logAuditEvent({
      action: "cli.connect.success",
      actor: "admin",
      target: "cli-access-token",
      resourceType: "auth_session",
      status: "success",
      ipAddress: clientIp || undefined,
      requestId: auditContext.requestId,
      metadata: { tokenId: record.id, scope: tokenScope },
    });

    return NextResponse.json({
      success: true,
      token: secret,
      id: record.id,
      name: record.name,
      scope: record.scope,
      expiresAt: record.expiresAt,
    });
  } catch (error) {
    console.error("[CLI] connect failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
