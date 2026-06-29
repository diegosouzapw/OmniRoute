import { DASHBOARD_CSRF_HEADER } from "@/shared/constants/dashboardCsrf";

interface CachedDashboardCsrfToken {
  token: string;
  expiresAtMs: number;
}

let cachedToken: CachedDashboardCsrfToken | null = null;

export function __resetDashboardCsrfTokenForTests(): void {
  cachedToken = null;
}

async function getDashboardCsrfToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAtMs - now > 30_000) {
    return cachedToken.token;
  }

  let response: Response;
  try {
    response = await fetch("/api/auth/csrf", {
      cache: "no-store",
      credentials: "same-origin",
    });
  } catch {
    return null;
  }
  if (!response.ok) return null;

  const body = (await response.json().catch(() => null)) as {
    token?: unknown;
    expiresAt?: unknown;
  } | null;

  if (typeof body?.token !== "string" || typeof body.expiresAt !== "string") {
    cachedToken = null;
    return null;
  }

  const expiresAtMs = Date.parse(body.expiresAt);
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= now) {
    cachedToken = null;
    return null;
  }

  cachedToken = { token: body.token, expiresAtMs };
  return cachedToken.token;
}

export async function withDashboardCsrfHeader(headers?: HeadersInit): Promise<Headers> {
  const result = new Headers(headers);
  const token = await getDashboardCsrfToken();
  if (token) result.set(DASHBOARD_CSRF_HEADER, token);
  return result;
}
