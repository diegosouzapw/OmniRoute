"use client";

import { useEffect, useState } from "react";

export const DEFAULT_DISPLAY_BASE_URL = "http://localhost:20128";

function normalizeUrl(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
}

/**
 * Normalize a Next.js-style basePath to a leading-slash form without a trailing slash.
 * Empty / root values become `""`.
 */
export function normalizeBasePath(value?: string | null): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed || trimmed === "/") return "";
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/+$/, "");
}

/**
 * Resolve the deploy basePath for display URLs (e.g. `/omniroute`).
 *
 * Priority:
 * 1. Explicit `envBasePath` argument / `NEXT_PUBLIC_OMNIROUTE_BASE_PATH`
 * 2. Non-root path of `configuredBaseUrl` (`NEXT_PUBLIC_BASE_URL`)
 */
export function resolveDeployBasePath(
  envBasePath?: string | null,
  configuredBaseUrl?: string | null,
  browserPathname?: string | null
): string {
  const fromEnv = normalizeBasePath(
    envBasePath ??
      (typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_OMNIROUTE_BASE_PATH || process.env.OMNIROUTE_BASE_PATH
        : undefined)
  );
  if (fromEnv) return fromEnv;

  const configured = normalizeUrl(configuredBaseUrl ?? undefined);
  if (configured) {
    try {
      const path = normalizeBasePath(new URL(configured).pathname);
      if (path) return path;
    } catch {
      /* ignore invalid URL */
    }
  }

  // browserPathname kept for API symmetry with resolveDisplayBaseUrl; basePath
  // must come from env / configured URL so root deploys never invent a prefix.
  void browserPathname;

  return "";
}

/**
 * One RFC1918 / special-use IPv4 range, expressed as closed intervals on the
 * first two octets. Unbounded ends use +/-Infinity so a single numeric
 * comparison covers them without an extra branch.
 */
interface Ipv4Range {
  readonly firstMin: number;
  readonly firstMax: number;
  readonly secondMin: number;
  readonly secondMax: number;
}

/** RFC1918 + special-use IPv4 ranges treated as non-public for display purposes. */
const PRIVATE_IPV4_RANGES: readonly Ipv4Range[] = [
  { firstMin: 0, firstMax: 0, secondMin: -Infinity, secondMax: Infinity }, // 0.0.0.0/8 ("this" network)
  { firstMin: 10, firstMax: 10, secondMin: -Infinity, secondMax: Infinity }, // RFC1918 10.0.0.0/8
  { firstMin: 127, firstMax: 127, secondMin: -Infinity, secondMax: Infinity }, // loopback 127.0.0.0/8
  { firstMin: 224, firstMax: Infinity, secondMin: -Infinity, secondMax: Infinity }, // multicast/reserved/broadcast
  { firstMin: 100, firstMax: 100, secondMin: 64, secondMax: 127 }, // CGNAT RFC6598 100.64.0.0/10
  { firstMin: 169, firstMax: 169, secondMin: 254, secondMax: 254 }, // link-local 169.254.0.0/16
  { firstMin: 172, firstMax: 172, secondMin: 16, secondMax: 31 }, // RFC1918 172.16.0.0/12
  { firstMin: 192, firstMax: 192, secondMin: 168, secondMax: 168 }, // RFC1918 192.168.0.0/16
];

function isInIpv4Range(first: number, second: number, range: Ipv4Range): boolean {
  return (
    first >= range.firstMin &&
    first <= range.firstMax &&
    second >= range.secondMin &&
    second <= range.secondMax
  );
}

function isPrivateIpv4(hostname: string): boolean {
  const octets = hostname.split(".").map(Number);
  if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet))) return false;
  const [first, second] = octets;
  return PRIVATE_IPV4_RANGES.some((range) => isInIpv4Range(first, second, range));
}

function isSupportedProtocol(protocol: string): boolean {
  return protocol === "http:" || protocol === "https:";
}

function isLoopbackHostname(hostname: string): boolean {
  return !hostname || hostname === "localhost" || hostname.endsWith(".localhost");
}

function isMulticastDnsHostname(hostname: string): boolean {
  return hostname.endsWith(".local");
}

function isIpv6LoopbackOrUnspecified(hostname: string): boolean {
  return hostname === "::" || hostname === "::1";
}

function isIpv6UniqueLocal(hostname: string): boolean {
  // RFC 4193 Unique Local Addresses: fc00::/7 (prefixes "fc" and "fd").
  return hostname.startsWith("fc") || hostname.startsWith("fd");
}

const IPV6_LINK_LOCAL_PATTERN = /^fe[89ab]/;

function isIpv6LinkLocal(hostname: string): boolean {
  // RFC 4291 link-local: fe80::/10.
  return IPV6_LINK_LOCAL_PATTERN.test(hostname);
}

/** Combines the IPv6-specific non-public checks the caller gates on `isIpv6`. */
function isNonPublicIpv6(hostname: string): boolean {
  return (
    isIpv6LoopbackOrUnspecified(hostname) ||
    isIpv6UniqueLocal(hostname) ||
    isIpv6LinkLocal(hostname)
  );
}

export function isPublicDisplayBaseUrl(value?: string): boolean {
  const normalized = normalizeUrl(value);
  if (!normalized) return false;

  try {
    const parsed = new URL(normalized);
    if (!isSupportedProtocol(parsed.protocol)) return false;

    const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (isLoopbackHostname(hostname)) return false;
    if (isMulticastDnsHostname(hostname) || isPrivateIpv4(hostname)) return false;

    // IPv6-only checks stay gated on isIpv6 — hostnames like "fdroid.example.com"
    // legitimately start with "fd" and must not be misclassified as ULA addresses.
    const isIpv6 = hostname.includes(":");
    if (isIpv6 && isNonPublicIpv6(hostname)) return false;

    return true;
  } catch {
    return false;
  }
}

function urlPathname(value: string): string {
  try {
    return normalizeBasePath(new URL(value).pathname);
  } catch {
    return "";
  }
}

function joinOriginAndBasePath(origin: string, basePath: string): string {
  if (!basePath) return origin;
  return `${origin.replace(/\/+$/, "")}${basePath}`;
}

/**
 * Resolve the public origin (+ optional basePath) shown in the dashboard.
 *
 * @param envValue          `NEXT_PUBLIC_BASE_URL` (may include a path for subpath deploys)
 * @param browserOrigin     `window.location.origin`
 * @param browserPathname   `window.location.pathname` (still includes Next basePath)
 * @param envBasePath       `NEXT_PUBLIC_OMNIROUTE_BASE_PATH` / `OMNIROUTE_BASE_PATH`
 */
export function resolveDisplayBaseUrl(
  envValue?: string,
  browserOrigin?: string,
  browserPathname?: string,
  envBasePath?: string
): string {
  const configuredUrl = normalizeUrl(envValue);
  const currentOrigin = normalizeUrl(browserOrigin);
  const basePath = resolveDeployBasePath(envBasePath, configuredUrl, browserPathname);

  // Configured public URL that already includes a non-root path wins (subpath deploy).
  // Example: NEXT_PUBLIC_BASE_URL=https://host/omniroute must not be collapsed to
  // https://host when the browser origin is the same host without a path.
  if (configuredUrl && isPublicDisplayBaseUrl(configuredUrl) && urlPathname(configuredUrl)) {
    return configuredUrl;
  }

  // Reachable public browser origin, with basePath re-applied when configured.
  // Existing behavior: prefer the live origin over a different configured *host*
  // (tunnels / alternate domains). basePath keeps /v1 examples correct under
  // reverse-proxy subpaths (OMNIROUTE_BASE_PATH).
  if (currentOrigin && isPublicDisplayBaseUrl(currentOrigin)) {
    return joinOriginAndBasePath(currentOrigin, basePath);
  }

  // Configured public URL without a path — append basePath if present.
  if (configuredUrl && isPublicDisplayBaseUrl(configuredUrl)) {
    return joinOriginAndBasePath(configuredUrl, basePath);
  }

  const fallback = currentOrigin ?? configuredUrl ?? DEFAULT_DISPLAY_BASE_URL;
  return joinOriginAndBasePath(fallback, basePath);
}

/**
 * Returns the public base URL to display in the dashboard.
 *
 * Resolution chain after client mount:
 *   1. Public browser origin (+ OMNIROUTE_BASE_PATH when set) — proves the
 *      current tunnel/domain is reachable.
 *   2. Public NEXT_PUBLIC_BASE_URL (path-preserving when it includes a subpath).
 *   3. Local fallbacks (current origin / configured URL / localhost).
 *
 * DISPLAY ONLY — do NOT use this hook for OAuth `redirect_uri`.
 * OAuth callers must read `process.env.NEXT_PUBLIC_BASE_URL` directly to avoid
 * host-header attack surface. For server-side resolution, use
 * `src/shared/utils/resolveOmniRouteBaseUrl.ts` instead.
 */
export function useDisplayBaseUrl(): string {
  const envValue = normalizeUrl(process.env.NEXT_PUBLIC_BASE_URL);
  const envBasePath = normalizeBasePath(
    process.env.NEXT_PUBLIC_OMNIROUTE_BASE_PATH || process.env.OMNIROUTE_BASE_PATH
  );

  const [url, setUrl] = useState<string>(() =>
    resolveDisplayBaseUrl(envValue ?? undefined, undefined, undefined, envBasePath || undefined)
  );

  useEffect(() => {
    const resolvedUrl = resolveDisplayBaseUrl(
      envValue ?? undefined,
      window.location.origin,
      window.location.pathname,
      envBasePath || undefined
    );
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
  }, [envValue, envBasePath]);

  return url;
}
