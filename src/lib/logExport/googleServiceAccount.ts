/**
 * Google service-account access tokens (JWT-bearer grant, RFC 7523).
 *
 * Deliberately dependency-free: signing an RS256 assertion with node:crypto and
 * exchanging it at the token endpoint is ~40 lines, versus pulling the full
 * `google-auth-library` / `@google-cloud/*` tree into a proxy that already speaks
 * raw HTTP to every provider it supports.
 *
 * Tokens are cached in-process until shortly before expiry, keyed by
 * (client_email + scope), so an hourly export run mints at most one token.
 */

import { createSign } from "node:crypto";

export interface ServiceAccountKey {
  type?: string;
  project_id?: string;
  client_email: string;
  private_key: string;
  token_uri?: string;
}

const DEFAULT_TOKEN_URI = "https://oauth2.googleapis.com/token";
const TOKEN_TTL_SECONDS = 3600;
/** Refresh this many seconds before the real expiry so a long run cannot straddle it. */
const EXPIRY_SKEW_MS = 60_000;

const tokenCache = new Map<string, { token: string; expiresAt: number }>();

/** Parse and shape-check a service-account JSON blob. Throws with an operator-facing message. */
export function parseServiceAccountKey(raw: string): ServiceAccountKey {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Service account key is not valid JSON");
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Service account key must be a JSON object");
  }
  const key = parsed as Partial<ServiceAccountKey>;
  if (key.type && key.type !== "service_account") {
    throw new Error(`Expected a service_account key, got "${key.type}"`);
  }
  if (!key.client_email || typeof key.client_email !== "string") {
    throw new Error("Service account key is missing client_email");
  }
  if (!key.private_key || typeof key.private_key !== "string") {
    throw new Error("Service account key is missing private_key");
  }
  return {
    type: key.type,
    project_id: key.project_id,
    client_email: key.client_email,
    // Keys pasted through a form or an env var often arrive with literal \n.
    private_key: key.private_key.replace(/\\n/g, "\n"),
    token_uri: key.token_uri || DEFAULT_TOKEN_URI,
  };
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function buildAssertion(key: ServiceAccountKey, scope: string, nowSeconds: number): string {
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: key.client_email,
      scope,
      aud: key.token_uri,
      exp: nowSeconds + TOKEN_TTL_SECONDS,
      iat: nowSeconds,
    })
  );
  const signingInput = `${header}.${claims}`;
  const signature = createSign("RSA-SHA256")
    .update(signingInput)
    .sign(key.private_key, "base64url");
  return `${signingInput}.${signature}`;
}

/** Mint (or reuse) an OAuth2 access token for `scope`. */
export async function getServiceAccountAccessToken(
  key: ServiceAccountKey,
  scope: string,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const cacheKey = `${key.client_email}::${scope}`;
  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt - EXPIRY_SKEW_MS > Date.now()) return cached.token;

  const nowSeconds = Math.floor(Date.now() / 1000);
  const assertion = buildAssertion(key, scope, nowSeconds);

  const response = await fetchImpl(key.token_uri || DEFAULT_TOKEN_URI, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }).toString(),
  });

  const body = (await response.json().catch(() => null)) as {
    access_token?: string;
    expires_in?: number;
    error_description?: string;
    error?: string;
  } | null;

  if (!response.ok || !body?.access_token) {
    const reason = body?.error_description || body?.error || `HTTP ${response.status}`;
    throw new Error(`Google token exchange failed: ${reason}`);
  }

  const expiresInMs = (body.expires_in ?? TOKEN_TTL_SECONDS) * 1000;
  tokenCache.set(cacheKey, { token: body.access_token, expiresAt: Date.now() + expiresInMs });
  return body.access_token;
}

/** Test-only: drop cached tokens so each test starts fresh. */
export function __resetServiceAccountTokenCache(): void {
  tokenCache.clear();
}
