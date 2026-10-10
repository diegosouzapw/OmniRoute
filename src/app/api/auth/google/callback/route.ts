import { NextResponse } from "next/server";
import { getCachedSettings } from "@/lib/db/readCache";
import { cookies } from "next/headers";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getGoogleOAuthConfig,
  getRequestOrigin,
  isEmailAllowed,
  isRequestSecure,
} from "@/lib/auth/socialOAuth";
import {
  asRecord,
  consumeOAuthState,
  getJsonWithBearer,
  postForJson,
  startDashboardSession,
  type SocialCookieStore,
  type StepResult,
} from "@/lib/auth/socialLogin";

export const googleCallbackInternals = {
  getCookieStore: cookies as unknown as () => Promise<SocialCookieStore>,
};

async function exchangeCodeForAccessToken(
  config: ReturnType<typeof getGoogleOAuthConfig>,
  code: string,
  redirectUri: string
): Promise<StepResult<string>> {
  const token = await postForJson(
    "https://oauth2.googleapis.com/token",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }).toString(),
    },
    { request: "token_exchange", response: "token_response" }
  );
  if (!token.ok) return token;
  const accessToken = token.value.access_token;
  return typeof accessToken === "string" && accessToken
    ? { ok: true, value: accessToken }
    : { ok: false, error: "token_response" };
}

/** Returns the lower-cased e-mail only when Google reports it as verified. */
async function fetchVerifiedEmail(accessToken: string): Promise<StepResult<string>> {
  const raw = await getJsonWithBearer("https://www.googleapis.com/oauth2/v3/userinfo", accessToken);
  if (raw === null) return { ok: false, error: "user_info_failed" };
  const info = asRecord(raw);
  const email = typeof info.email === "string" ? info.email.trim().toLowerCase() : "";
  if (!email || info.email_verified !== true) return { ok: false, error: "email_not_verified" };
  return { ok: true, value: email };
}

/**
 * GET /api/auth/google/callback
 * Handles the Google OAuth 2.0 authorization code exchange and sets the dashboard session cookie.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const origin = getRequestOrigin(request);
  const fail = (error: string) => NextResponse.redirect(new URL(`/login?error=${error}`, origin));

  if (!code || !returnedState) return fail("missing_code");

  const cookieStore = await googleCallbackInternals.getCookieStore();
  if (!consumeOAuthState(cookieStore, "google_oauth_state", returnedState)) {
    return fail("invalid_state");
  }

  const settings = await getCachedSettings();
  const config = getGoogleOAuthConfig(settings);
  if (!config.enabled) return fail("not_configured");

  const accessToken = await exchangeCodeForAccessToken(
    config,
    code,
    `${origin}${config.redirectPath}`
  );
  if (!accessToken.ok) return fail(accessToken.error);

  const verified = await fetchVerifiedEmail(accessToken.value);
  if (!verified.ok) return fail(verified.error);
  const email = verified.value;

  const auditContext = getAuditRequestContext(request);
  if (!isEmailAllowed(email, settings.authAllowedEmails)) {
    logAuditEvent({
      action: "auth.login.google.unauthorized",
      actor: email,
      target: "dashboard-auth",
      resourceType: "auth_session",
      status: "failed",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: { email, reason: "email_not_in_allowlist" },
    });
    return fail("unauthorized_email");
  }

  if (!(await startDashboardSession(cookieStore, isRequestSecure(request)))) {
    return fail("server_misconfigured");
  }

  logAuditEvent({
    action: "auth.login.google.success",
    actor: email,
    target: "dashboard-auth",
    resourceType: "auth_session",
    status: "success",
    ipAddress: auditContext.ipAddress || undefined,
    requestId: auditContext.requestId,
    metadata: { email },
  });

  return NextResponse.redirect(`${origin}/dashboard`);
}
