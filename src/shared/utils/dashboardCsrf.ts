import { DASHBOARD_CSRF_HEADER } from "@/shared/constants/dashboardCsrf";
import { PUBLIC_API_ROUTE_PREFIXES } from "@/shared/constants/publicApiRoutes";

interface CachedDashboardCsrfToken {
  token: string;
  expiresAtMs: number;
}

let cachedToken: CachedDashboardCsrfToken | null = null;
let pendingToken: Promise<string | null> | null = null;
let originalFetch: typeof fetch | null = null;
let installCount = 0;

const CLIENT_API_ALIAS_PREFIXES = ["/chat/completions", "/responses", "/models", "/codex"];
const TOP_LEVEL_MANAGEMENT_PATH_PREFIXES = ["/a2a"];

export function __resetDashboardCsrfTokenForTests(): void {
  cachedToken = null;
  pendingToken = null;
  if (originalFetch) {
    globalThis.fetch = originalFetch;
    originalFetch = null;
  }
  installCount = 0;
}

function currentDashboardCsrfToken(now: number = Date.now()): string | null {
  if (cachedToken && cachedToken.expiresAtMs - now > 30_000) {
    return cachedToken.token;
  }
  return null;
}

async function fetchDashboardCsrfToken(now: number): Promise<string | null> {
  try {
    const response = await fetch("/api/auth/csrf", {
      cache: "no-store",
      credentials: "same-origin",
    });
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
  } catch {
    return null;
  }
}

async function getDashboardCsrfToken(): Promise<string | null> {
  const cached = currentDashboardCsrfToken();
  if (cached) return cached;

  if (!pendingToken) {
    pendingToken = fetchDashboardCsrfToken(Date.now()).finally(() => {
      pendingToken = null;
    });
  }

  return pendingToken;
}

export function prefetchDashboardCsrfToken(): Promise<string | null> {
  return getDashboardCsrfToken();
}

export async function withDashboardCsrfHeader(headers?: HeadersInit): Promise<Headers> {
  const result = new Headers(headers);
  const token = await getDashboardCsrfToken();
  if (token) result.set(DASHBOARD_CSRF_HEADER, token);
  return result;
}

function requestFromInput(input: RequestInfo | URL): Request | null {
  return typeof Request !== "undefined" && input instanceof Request ? input : null;
}

function inputUrl(input: RequestInfo | URL): string | null {
  const request = requestFromInput(input);
  if (request) return request.url;
  if (input instanceof URL) return input.href;
  return typeof input === "string" ? input : null;
}

function requestMethod(input: RequestInfo | URL, init?: RequestInit): string {
  if (init?.method) return init.method;
  return requestFromInput(input)?.method ?? "GET";
}

function isClientApiPath(pathname: string): boolean {
  if (pathname === "/api/v1" || pathname.startsWith("/api/v1/")) return true;
  if (pathname === "/api/v1beta" || pathname.startsWith("/api/v1beta/")) return true;
  if (pathname === "/v1" || pathname.startsWith("/v1/")) return true;
  if (pathname === "/v1beta" || pathname.startsWith("/v1beta/")) return true;
  if (pathname === "/v1/v1" || pathname.startsWith("/v1/v1/")) return true;
  return CLIENT_API_ALIAS_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

function isPublicApiPath(pathname: string): boolean {
  return PUBLIC_API_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function shouldAttachDashboardCsrf(url: URL): boolean {
  if (
    TOP_LEVEL_MANAGEMENT_PATH_PREFIXES.some(
      (prefix) => url.pathname === prefix || url.pathname.startsWith(prefix + "/")
    )
  ) {
    return true;
  }

  return (
    url.pathname.startsWith("/api/") &&
    url.pathname !== "/api/auth/csrf" &&
    !isPublicApiPath(url.pathname) &&
    !isClientApiPath(url.pathname)
  );
}

function sameOriginDashboardMutation(input: RequestInfo | URL, init?: RequestInit): boolean {
  if (typeof window === "undefined") return false;

  const method = requestMethod(input, init).toUpperCase();
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(method)) return false;

  const rawUrl = inputUrl(input);
  if (!rawUrl) return false;

  let url: URL;
  try {
    url = new URL(rawUrl, window.location.href);
  } catch {
    return false;
  }

  return url.origin === window.location.origin && shouldAttachDashboardCsrf(url);
}

function mergedHeaders(input: RequestInfo | URL, init?: RequestInit): Headers {
  return new Headers(init?.headers ?? requestFromInput(input)?.headers);
}

export function installDashboardCsrfFetch(): () => void {
  if (typeof globalThis.fetch !== "function") return () => {};

  if (installCount === 0) {
    originalFetch = globalThis.fetch;

    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!originalFetch || !sameOriginDashboardMutation(input, init)) {
        return originalFetch ? originalFetch(input, init) : fetch(input, init);
      }

      const headers = mergedHeaders(input, init);
      if (headers.has(DASHBOARD_CSRF_HEADER)) {
        return originalFetch(input, init);
      }

      const token = currentDashboardCsrfToken() ?? (await getDashboardCsrfToken());
      if (!token) return originalFetch(input, init);

      headers.set(DASHBOARD_CSRF_HEADER, token);
      return originalFetch(input, { ...init, headers });
    }) as typeof fetch;
  }

  installCount++;
  let active = true;

  return () => {
    if (!active) return;
    active = false;
    installCount = Math.max(0, installCount - 1);
    if (installCount === 0 && originalFetch) {
      globalThis.fetch = originalFetch;
      originalFetch = null;
    }
  };
}
