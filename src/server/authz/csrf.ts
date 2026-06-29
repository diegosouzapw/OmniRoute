import { createHash, createHmac, timingSafeEqual } from "node:crypto";

import { DASHBOARD_CSRF_HEADER } from "@/shared/constants/dashboardCsrf";

const TOKEN_VERSION = "v1";
const TOKEN_TTL_SECONDS = 10 * 60;
const TOKEN_CONTEXT = "omniroute-dashboard-csrf-v1";
const TEST_MUTATION_PATHS = new Set([
  "/api/combos/test",
  "/api/models/test",
  "/api/models/test-all",
]);

export interface DashboardCsrfToken {
  token: string;
  expiresAt: string;
}

function getJwtSecret(): Buffer | null {
  const secret = process.env.JWT_SECRET?.trim();
  return secret ? Buffer.from(secret, "utf8") : null;
}

function getCookieValue(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("cookie") || request.headers.get("Cookie");
  if (!cookieHeader) return null;

  for (const segment of cookieHeader.split(";")) {
    const [rawKey, ...rawValue] = segment.split("=");
    if (!rawKey || rawValue.length === 0) continue;
    if (rawKey.trim() === name) return rawValue.join("=").trim() || null;
  }

  return null;
}

function sessionHash(authToken: string): string {
  return createHash("sha256").update(authToken).digest("base64url");
}

function csrfMac(secret: Buffer, expiresAtSeconds: number, authToken: string): Buffer {
  return createHmac("sha256", secret)
    .update(TOKEN_CONTEXT)
    .update("\n")
    .update(String(expiresAtSeconds))
    .update("\n")
    .update(sessionHash(authToken))
    .digest();
}

export function issueDashboardCsrfToken(
  request: Request,
  nowMs: number = Date.now()
): DashboardCsrfToken | null {
  const secret = getJwtSecret();
  const authToken = getCookieValue(request, "auth_token");
  if (!secret || !authToken) return null;

  const expiresAtSeconds = Math.floor(nowMs / 1000) + TOKEN_TTL_SECONDS;
  const mac = csrfMac(secret, expiresAtSeconds, authToken).toString("base64url");

  return {
    token: `${TOKEN_VERSION}.${expiresAtSeconds}.${mac}`,
    expiresAt: new Date(expiresAtSeconds * 1000).toISOString(),
  };
}

function requestPathname(request: Request): string | null {
  try {
    return new URL(request.url).pathname;
  } catch {
    return null;
  }
}

export function validateDashboardCsrfToken(request: Request, nowMs: number = Date.now()): boolean {
  const pathname = requestPathname(request);
  if (!pathname || !TEST_MUTATION_PATHS.has(pathname)) return false;

  const secret = getJwtSecret();
  const authToken = getCookieValue(request, "auth_token");
  const rawToken = request.headers.get(DASHBOARD_CSRF_HEADER);
  if (!secret || !authToken || !rawToken) return false;

  const [version, rawExpiresAt, rawMac, ...extra] = rawToken.split(".");
  if (extra.length > 0 || version !== TOKEN_VERSION || !rawExpiresAt || !rawMac) return false;

  const expiresAtSeconds = Number(rawExpiresAt);
  const nowSeconds = Math.floor(nowMs / 1000);
  if (!Number.isSafeInteger(expiresAtSeconds) || expiresAtSeconds < nowSeconds) return false;

  let providedMac: Buffer;
  try {
    providedMac = Buffer.from(rawMac, "base64url");
  } catch {
    return false;
  }

  const expectedMac = csrfMac(secret, expiresAtSeconds, authToken);
  return providedMac.length === expectedMac.length && timingSafeEqual(providedMac, expectedMac);
}
