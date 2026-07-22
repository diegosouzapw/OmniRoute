import { NextResponse } from "next/server";
import { getCachedSettings, updateSettings } from "@/lib/localDb";
import { SignJWT, jwtVerify, createRemoteJWKSet } from "jose";
import { cookies } from "next/headers";
// Test seam (static) — allows tests to inject a cookie store and capture the minted auth_token.
// Mirrors the pattern in src/app/api/auth/login/route.ts
export const oidcCallbackInternals = {
  getCookieStore: cookies,
  clearJwksCache() {
    for (const k of Object.keys(jwksClientsCache)) {
      delete jwksClientsCache[k];
    }
  },
};
// Cache JWKS clients globally to reuse retrieved keys and avoid fetching JWKS on every login request.
const jwksClientsCache: Record<string, ReturnType<typeof createRemoteJWKSet>> = {};

function getJwksClient(jwksUri: string) {
  let client = jwksClientsCache[jwksUri];
  if (!client) {
    client = createRemoteJWKSet(new URL(jwksUri));
    jwksClientsCache[jwksUri] = client;
  }
  return client;
}

/**
 * GET /api/auth/oidc/callback
 * Completes OIDC login for the dashboard admin gate.
 * Exchanges authorization code, validates ID token, issues the exact same
 * 30-day auth_token JWT used by the password login, sets the cookie, and
 * redirects to the dashboard. Password login remains available as fallback.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  // Compute origin early so ALL redirects (including error cases) are absolute.
  // Required by Next.js 16 in some test/runtime contexts and keeps behavior consistent with success path.
  const forwardedProtoEarly = (request.headers.get("x-forwarded-proto") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const reqUrlEarly = new URL(request.url);
  const schemeEarly =
    forwardedProtoEarly === "https" || reqUrlEarly.protocol === "https:" ? "https" : "http";
  const hostEarly = request.headers.get("host") || request.headers.get("Host") || reqUrlEarly.host;
  const originEarly = `${schemeEarly}://${hostEarly}`;

  if (!code || !returnedState) {
    return NextResponse.redirect(new URL("/login?oidc_error=missing_code", reqUrlEarly));
  }

  // Validate state from cookie (via seam so tests can capture)
  const cookieStore = await oidcCallbackInternals.getCookieStore();
  const storedState = cookieStore.get("oidc_state")?.value;
  if (!storedState || storedState !== returnedState) {
    return NextResponse.redirect(new URL("/login?oidc_error=invalid_state", reqUrlEarly));
  }

  // Clear state cookie
  cookieStore.set("oidc_state", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  const settings = await getCachedSettings();

  const enabled = settings.oidcEnabled === true;
  const issuer =
    typeof settings.oidcIssuer === "string" ? settings.oidcIssuer.trim().replace(/\/$/, "") : "";
  const clientId = typeof settings.oidcClientId === "string" ? settings.oidcClientId.trim() : "";
  const clientSecret =
    typeof settings.oidcClientSecret === "string" ? settings.oidcClientSecret.trim() : "";
  const redirectPath =
    typeof settings.oidcRedirectPath === "string" && settings.oidcRedirectPath.length > 0
      ? settings.oidcRedirectPath
      : "/api/auth/oidc/callback";

  if (!enabled || !issuer || !clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?oidc_error=not_configured", reqUrlEarly));
  }

  // Compute absolute redirect_uri matching what we sent
  const forwardedProto = (request.headers.get("x-forwarded-proto") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const reqUrl = new URL(request.url);
  const scheme = forwardedProto === "https" || reqUrl.protocol === "https:" ? "https" : "http";
  const host = request.headers.get("host") || request.headers.get("Host") || reqUrl.host;
  const origin = `${scheme}://${host}`;
  const redirectUri = `${origin}${redirectPath}`;

  // Discover endpoints
  let tokenEndpoint = `${issuer}/token`;
  let jwksUri = `${issuer}/jwks`;
  try {
    const wellKnownResp = await fetch(`${issuer}/.well-known/openid-configuration`, {
      signal: AbortSignal.timeout(5000),
    });
    if (wellKnownResp.ok) {
      const data: unknown = await wellKnownResp.json();
      if (data && typeof data === "object") {
        const rec = data as Record<string, unknown>;
        if (typeof rec.token_endpoint === "string") tokenEndpoint = rec.token_endpoint;
        if (typeof rec.jwks_uri === "string") jwksUri = rec.jwks_uri;
      }
    }
  } catch {
    // use conventional endpoints
  }

  // Exchange code for tokens (form post)
  const tokenParams = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  let tokenResp: Response;
  try {
    tokenResp = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    return NextResponse.redirect(new URL("/login?oidc_error=token_exchange", reqUrlEarly));
  }

  if (!tokenResp.ok) {
    return NextResponse.redirect(new URL("/login?oidc_error=token_exchange", reqUrlEarly));
  }

  let tokenData: unknown;
  try {
    tokenData = await tokenResp.json();
  } catch {
    return NextResponse.redirect(new URL("/login?oidc_error=token_response", reqUrlEarly));
  }

  if (!tokenData || typeof tokenData !== "object") {
    return NextResponse.redirect(new URL("/login?oidc_error=token_response", reqUrlEarly));
  }

  const td = tokenData as Record<string, unknown>;
  const idToken = typeof td.id_token === "string" ? td.id_token : undefined;
  if (!idToken) {
    return NextResponse.redirect(new URL("/login?oidc_error=no_id_token", reqUrlEarly));
  }

  // Validate ID token
  try {
    const JWKS = getJwksClient(jwksUri);
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer,
      audience: clientId,
    });

    // Optional subject / email whitelist
    const allowed = Array.isArray(settings.oidcAllowedSubjects) ? settings.oidcAllowedSubjects : [];
    if (allowed.length > 0) {
      const sub = typeof payload.sub === "string" ? payload.sub : "";
      const emailVerified = (payload as Record<string, unknown>).email_verified === true;
      const email =
        emailVerified && typeof (payload as Record<string, unknown>).email === "string"
          ? ((payload as Record<string, unknown>).email as string).toLowerCase()
          : "";
      const ok = allowed.some((v: unknown) => {
        if (typeof v !== "string") return false;
        if (v === sub) return true;
        return email !== "" && v.toLowerCase() === email;
      });
      if (!ok) {
        return NextResponse.redirect(
          new URL("/login?oidc_error=subject_not_allowed", reqUrlEarly)
        );
      }
    }
  } catch {
    return NextResponse.redirect(new URL("/login?oidc_error=id_token_invalid", reqUrlEarly));
  }
  // First successful OIDC login marks setupComplete (like password bootstrap).
  try {
    await updateSettings({ setupComplete: true });
  } catch {
    // non-fatal — login can still proceed
  }
  // Mint the exact same dashboard session JWT as password login
  if (!process.env.JWT_SECRET) {
    return NextResponse.redirect(
      new URL("/login?oidc_error=server_misconfigured", reqUrlEarly)
    );
  }

  const forceSecureCookie = process.env.AUTH_COOKIE_SECURE === "true";
  const forwardedProtoHeader = request.headers.get("x-forwarded-proto") || "";
  const fp = forwardedProtoHeader.split(",")[0].trim().toLowerCase();
  const isHttpsRequest = fp === "https" || reqUrl.protocol === "https:";
  const useSecureCookie = forceSecureCookie || isHttpsRequest;

  const jwt = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET || ""));

  const store = await oidcCallbackInternals.getCookieStore();
  store.set("auth_token", jwt, {
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  // Success — go to dashboard
  return NextResponse.redirect(`${origin}/dashboard`);
}
