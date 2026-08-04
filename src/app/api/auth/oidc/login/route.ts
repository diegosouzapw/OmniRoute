import { NextResponse } from "next/server";
import { getCachedSettings } from "@/lib/localDb";

/**
 * GET /api/auth/oidc/login
 * Starts OIDC login for the dashboard admin gate.
 * Builds an authorization URL from settings and redirects the browser.
 * Password login remains available as fallback.
 */
export async function GET(request: Request) {
  const settings = await getCachedSettings();

  const enabled = settings.oidcEnabled === true;
  const issuer =
    typeof settings.oidcIssuer === "string" ? settings.oidcIssuer.trim().replace(/\/$/, "") : "";
  const clientId = typeof settings.oidcClientId === "string" ? settings.oidcClientId.trim() : "";
  const clientSecret =
    typeof settings.oidcClientSecret === "string" ? settings.oidcClientSecret.trim() : "";
  const scopes: string[] =
    Array.isArray(settings.oidcScopes) && settings.oidcScopes.length > 0
      ? settings.oidcScopes.filter((s): s is string => typeof s === "string")
      : ["openid", "profile", "email"];
  const redirectPath =
    typeof settings.oidcRedirectPath === "string" && settings.oidcRedirectPath.length > 0
      ? settings.oidcRedirectPath
      : "/api/auth/oidc/callback";

  if (!enabled || !issuer || !clientId || !clientSecret) {
    return NextResponse.json(
      { error: "OIDC is not configured. Use password login or configure OIDC in settings." },
      { status: 400 }
    );
  }

  // Absolute redirect_uri from the incoming request (respects x-forwarded-proto)
  const forwardedProto = (request.headers.get("x-forwarded-proto") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const reqUrl = new URL(request.url);
  const scheme = forwardedProto === "https" || reqUrl.protocol === "https:" ? "https" : "http";
  const host = request.headers.get("host") || request.headers.get("Host") || reqUrl.host;
  const origin = `${scheme}://${host}`;
  const redirectUri = `${origin}${redirectPath}`;

  // Discover authorization_endpoint
  let authEndpoint = `${issuer}/authorize`;
  try {
    const wellKnownResp = await fetch(`${issuer}/.well-known/openid-configuration`, {
      signal: AbortSignal.timeout(5000),
    });
    if (wellKnownResp.ok) {
      const data: unknown = await wellKnownResp.json();
      if (data && typeof data === "object" && "authorization_endpoint" in data) {
        const candidate = (data as Record<string, unknown>).authorization_endpoint;
        if (typeof candidate === "string" && candidate.length > 0) {
          authEndpoint = candidate;
        }
      }
    }
  } catch {
    // fall back to convention
  }

  const scope = scopes.join(" ");
  const state =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  const url = new URL(authEndpoint);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  const isHttpsRequest = scheme === "https";
  const useSecureCookie = process.env.AUTH_COOKIE_SECURE === "true" || isHttpsRequest;

  const res = NextResponse.redirect(url.toString());
  res.cookies.set("oidc_state", state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
    secure: useSecureCookie,
  });
  return res;
}
