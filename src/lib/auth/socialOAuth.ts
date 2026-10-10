import { SignJWT } from "jose";
import { DASHBOARD_SESSION_CLAIM } from "@/shared/utils/dashboardSessionToken";
import { timingSafeCompare } from "@/shared/utils/timingSafeCompare";

export interface GoogleOAuthConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  redirectPath: string;
}

export interface GitHubOAuthConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  redirectPath: string;
}

/**
 * Derives the absolute origin for the incoming request. Mirrors the OIDC routes: the scheme may
 * come from `X-Forwarded-Proto`, but the host is only ever the `Host` header — trusting
 * `X-Forwarded-Host` would let a caller steer `redirect_uri` and the post-login redirect.
 */
export function getRequestOrigin(request: Request): string {
  const forwardedProto = (request.headers.get("x-forwarded-proto") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const reqUrl = new URL(request.url);
  const scheme = forwardedProto === "https" || reqUrl.protocol === "https:" ? "https" : "http";
  const host = request.headers.get("host") || request.headers.get("Host") || reqUrl.host;
  return `${scheme}://${host}`;
}

/**
 * Checks whether the request requires secure cookies.
 */
export function isRequestSecure(request: Request): boolean {
  if (process.env.AUTH_COOKIE_SECURE === "true") return true;
  const forwardedProto = (request.headers.get("x-forwarded-proto") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const reqUrl = new URL(request.url);
  return forwardedProto === "https" || reqUrl.protocol === "https:";
}

/**
 * Accepts only a same-origin absolute path ("/x", never "//x" or "x@evil") for the OAuth
 * `redirect_uri` suffix, falling back to the default — the value comes from settings and is
 * concatenated onto the request origin.
 */
function resolveRedirectPath(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return /^\/(?!\/)[A-Za-z0-9/_.~-]*$/.test(trimmed) ? trimmed : fallback;
}

/**
 * Resolves the effective allowlist entries: the settings value (array or comma-separated string),
 * falling back to `AUTH_ALLOWED_EMAILS`. Blank entries and a bare `*` are dropped — there is no
 * "allow everyone" spelling, because that would hand an admin session to any Google/GitHub account.
 */
export function resolveAuthAllowlist(allowedConfig?: unknown): string[] {
  let candidates: string[] = [];
  if (Array.isArray(allowedConfig)) {
    candidates = allowedConfig.filter((item): item is string => typeof item === "string");
  } else if (typeof allowedConfig === "string" && allowedConfig.trim().length > 0) {
    candidates = allowedConfig.split(",");
  }
  candidates = candidates.map((item) => item.trim()).filter((item) => item.length > 0);

  if (candidates.length === 0 && process.env.AUTH_ALLOWED_EMAILS) {
    candidates = process.env.AUTH_ALLOWED_EMAILS.split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return candidates.filter((item) => item !== "*");
}

/**
 * Resolves Google OAuth 2.0 configuration from settings with environment variable fallbacks.
 * Only the dedicated `AUTH_GOOGLE_*` variables are read (the generic `GOOGLE_CLIENT_ID` is commonly
 * present for unrelated reasons). The provider stays disabled until an allowlist is configured.
 */
export function getGoogleOAuthConfig(settings: Record<string, unknown>): GoogleOAuthConfig {
  const clientId =
    (typeof settings.googleClientId === "string" && settings.googleClientId.trim()) ||
    process.env.AUTH_GOOGLE_CLIENT_ID?.trim() ||
    "";
  const clientSecret =
    (typeof settings.googleClientSecret === "string" && settings.googleClientSecret.trim()) ||
    process.env.AUTH_GOOGLE_CLIENT_SECRET?.trim() ||
    "";
  const redirectPath = resolveRedirectPath(
    settings.googleRedirectPath,
    "/api/auth/google/callback"
  );
  const enabled =
    Boolean(clientId && clientSecret) &&
    resolveAuthAllowlist(settings.authAllowedEmails).length > 0;

  return { enabled, clientId, clientSecret, redirectPath };
}

/**
 * Resolves GitHub OAuth configuration from settings with environment variable fallbacks.
 * Only the dedicated `AUTH_GITHUB_*` variables are read; disabled until an allowlist is configured.
 */
export function getGitHubOAuthConfig(settings: Record<string, unknown>): GitHubOAuthConfig {
  const clientId =
    (typeof settings.githubClientId === "string" && settings.githubClientId.trim()) ||
    process.env.AUTH_GITHUB_CLIENT_ID?.trim() ||
    "";
  const clientSecret =
    (typeof settings.githubClientSecret === "string" && settings.githubClientSecret.trim()) ||
    process.env.AUTH_GITHUB_CLIENT_SECRET?.trim() ||
    "";
  const redirectPath = resolveRedirectPath(
    settings.githubRedirectPath,
    "/api/auth/github/callback"
  );
  const enabled =
    Boolean(clientId && clientSecret) &&
    resolveAuthAllowlist(settings.authAllowedEmails).length > 0;

  return { enabled, clientId, clientSecret, redirectPath };
}

/**
 * Validates whether an email address is authorized against the allowlist. Deny-by-default: an
 * empty allowlist (or a bare "*") admits nobody. Supports exact email matches and wildcard domain
 * matches (e.g. "*@example.com" or "@example.com").
 */
export function isEmailAllowed(email: string | null | undefined, allowedConfig?: unknown): boolean {
  if (!email || typeof email !== "string") return false;
  const normalizedEmail = email.trim().toLowerCase();

  for (const allowed of resolveAuthAllowlist(allowedConfig)) {
    const normAllowed = allowed.toLowerCase();
    if (normAllowed === normalizedEmail) {
      return true;
    }
    // Handle wildcard domain: *@domain.com or @domain.com
    if (normAllowed.startsWith("*@") && normalizedEmail.endsWith(normAllowed.slice(1))) {
      return true;
    }
    if (normAllowed.startsWith("@") && normalizedEmail.endsWith(normAllowed)) {
      return true;
    }
  }

  return false;
}

/**
 * Validates a GitHub login against the allowlist. Only bare username entries (no "@", no "*")
 * match, so a username can never satisfy an e-mail or domain entry (and vice versa).
 */
export function isGithubLoginAllowed(
  login: string | null | undefined,
  allowedConfig?: unknown
): boolean {
  if (!login || typeof login !== "string") return false;
  const normalizedLogin = login.trim().toLowerCase();
  if (!normalizedLogin) return false;

  return resolveAuthAllowlist(allowedConfig).some(
    (allowed) =>
      !allowed.includes("@") && !allowed.includes("*") && allowed.toLowerCase() === normalizedLogin
  );
}

/**
 * Generates the opaque OAuth `state` value bound to the browser through a short-lived cookie.
 */
export function generateOAuthState(): string {
  return crypto.randomUUID();
}

/**
 * Creates the standard 30-day dashboard session JWT.
 */
export async function createDashboardSessionJwt(secret: Uint8Array): Promise<string> {
  return new SignJWT({ [DASHBOARD_SESSION_CLAIM]: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret);
}

export { timingSafeCompare };
