"use client";

import { useEffect, useState } from "react";

export const DEFAULT_DISPLAY_BASE_URL = "http://localhost:20128";

function normalizeUrl(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
}

function isPrivateIpv4(hostname: string): boolean {
  const octets = hostname.split(".").map(Number);
  if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet))) return false;
  const [first, second] = octets;
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    first >= 224 ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

export function isPublicDisplayBaseUrl(value?: string): boolean {
  const normalized = normalizeUrl(value);
  if (!normalized) return false;

  try {
    const parsed = new URL(normalized);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;

    const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (!hostname || hostname === "localhost" || hostname.endsWith(".localhost")) return false;
    if (hostname.endsWith(".local") || isPrivateIpv4(hostname)) return false;
    const isIpv6 = hostname.includes(":");
    if (
      isIpv6 &&
      (hostname === "::" ||
        hostname === "::1" ||
        hostname.startsWith("fc") ||
        hostname.startsWith("fd") ||
        /^fe[89ab]/.test(hostname))
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function resolveDisplayBaseUrl(envValue?: string, browserOrigin?: string): string {
  const configuredUrl = normalizeUrl(envValue);
  const currentOrigin = normalizeUrl(browserOrigin);

  if (currentOrigin && isPublicDisplayBaseUrl(currentOrigin)) return currentOrigin;
  if (configuredUrl && isPublicDisplayBaseUrl(configuredUrl)) return configuredUrl;
  return currentOrigin ?? configuredUrl ?? DEFAULT_DISPLAY_BASE_URL;
}

/**
 * Returns the public base URL to display in the dashboard.
 *
 * Resolution chain after client mount:
 *   1. Public browser origin — proves the current tunnel/domain is reachable.
 *   2. Public NEXT_PUBLIC_BASE_URL — keeps a configured public URL when opened locally.
 *   3. Current browser origin, configured URL, then localhost as local fallbacks.
 *
 * DISPLAY ONLY — do NOT use this hook for OAuth `redirect_uri`.
 * OAuth callers must read `process.env.NEXT_PUBLIC_BASE_URL` directly to avoid
 * host-header attack surface. For server-side resolution, use
 * `src/shared/utils/resolveOmniRouteBaseUrl.ts` instead.
 */
export function useDisplayBaseUrl(): string {
  const envValue = normalizeUrl(process.env.NEXT_PUBLIC_BASE_URL);

  const [url, setUrl] = useState<string>(envValue ?? DEFAULT_DISPLAY_BASE_URL);

  useEffect(() => {
    const resolvedUrl = resolveDisplayBaseUrl(envValue ?? undefined, window.location.origin);
    // Schedule via queueMicrotask so setState is called inside a callback,
    // not synchronously in the effect body (react-hooks/set-state-in-effect).
    // The unmounted guard prevents a stale setState on a torn-down root
    // (relevant under React strict mode's double-invoke, where cleanup runs
    // before the microtask fires on the first effect invocation).
    let unmounted = false;
    queueMicrotask(() => {
      if (!unmounted) setUrl(resolvedUrl);
    });
    return () => {
      unmounted = true;
    };
  }, [envValue]);

  return url;
}
