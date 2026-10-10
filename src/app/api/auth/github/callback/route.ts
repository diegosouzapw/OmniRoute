import { NextResponse } from "next/server";
import { getCachedSettings } from "@/lib/db/readCache";
import { cookies } from "next/headers";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getGitHubOAuthConfig,
  getRequestOrigin,
  isEmailAllowed,
  isGithubLoginAllowed,
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

export const githubCallbackInternals = {
  getCookieStore: cookies as unknown as () => Promise<SocialCookieStore>,
};

const GITHUB_API_HEADERS = { "User-Agent": "OmniRoute-OAuth" };

async function exchangeCodeForAccessToken(
  config: ReturnType<typeof getGitHubOAuthConfig>,
  code: string,
  redirectUri: string
): Promise<StepResult<string>> {
  const token = await postForJson(
    "https://github.com/login/oauth/access_token",
    {
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    },
    { request: "token_exchange", response: "token_response" }
  );
  if (!token.ok) return token;
  const accessToken = token.value.access_token;
  return typeof accessToken === "string" && accessToken
    ? { ok: true, value: accessToken }
    : { ok: false, error: "token_response" };
}

/**
 * Resolves the account's verified e-mail from `/user/emails` (primary first, then any verified).
 * The public profile e-mail carries no `verified` flag and is deliberately NOT a fallback: when
 * this call fails or yields nothing verified, the login fails closed.
 */
async function fetchVerifiedEmail(accessToken: string): Promise<string> {
  const raw = await getJsonWithBearer(
    "https://api.github.com/user/emails",
    accessToken,
    GITHUB_API_HEADERS
  );
  const entries = Array.isArray(raw) ? raw.map(asRecord) : [];
  const match =
    entries.find((entry) => entry.primary === true && entry.verified === true) ??
    entries.find((entry) => entry.verified === true);
  return typeof match?.email === "string" ? match.email.trim().toLowerCase() : "";
}

async function fetchLogin(accessToken: string): Promise<string> {
  const profile = asRecord(
    await getJsonWithBearer("https://api.github.com/user", accessToken, GITHUB_API_HEADERS)
  );
  return typeof profile.login === "string" ? profile.login.toLowerCase() : "";
}

/**
 * GET /api/auth/github/callback
 * Handles the GitHub OAuth authorization code exchange and sets the dashboard session cookie.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const origin = getRequestOrigin(request);
  const fail = (error: string) => NextResponse.redirect(new URL(`/login?error=${error}`, origin));

  if (!code || !returnedState) return fail("missing_code");

  const cookieStore = await githubCallbackInternals.getCookieStore();
  if (!consumeOAuthState(cookieStore, "github_oauth_state", returnedState)) {
    return fail("invalid_state");
  }

  const settings = await getCachedSettings();
  const config = getGitHubOAuthConfig(settings);
  if (!config.enabled) return fail("not_configured");

  const accessToken = await exchangeCodeForAccessToken(
    config,
    code,
    `${origin}${config.redirectPath}`
  );
  if (!accessToken.ok) return fail(accessToken.error);

  const email = await fetchVerifiedEmail(accessToken.value);
  if (!email) return fail("email_not_verified");
  const githubUsername = await fetchLogin(accessToken.value);

  const auditContext = getAuditRequestContext(request);
  const allowed =
    isEmailAllowed(email, settings.authAllowedEmails) ||
    isGithubLoginAllowed(githubUsername, settings.authAllowedEmails);
  if (!allowed) {
    logAuditEvent({
      action: "auth.login.github.unauthorized",
      actor: email,
      target: "dashboard-auth",
      resourceType: "auth_session",
      status: "failed",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: { email, githubUsername, reason: "not_in_allowlist" },
    });
    return fail("unauthorized_email");
  }

  if (!(await startDashboardSession(cookieStore, isRequestSecure(request)))) {
    return fail("server_misconfigured");
  }

  logAuditEvent({
    action: "auth.login.github.success",
    actor: email,
    target: "dashboard-auth",
    resourceType: "auth_session",
    status: "success",
    ipAddress: auditContext.ipAddress || undefined,
    requestId: auditContext.requestId,
    metadata: { email, githubUsername },
  });

  return NextResponse.redirect(`${origin}/dashboard`);
}
