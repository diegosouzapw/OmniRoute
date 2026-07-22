"use client";

import { useEffect, useState } from "react";

export const DEFAULT_DISPLAY_BASE_URL = "http://localhost:20128";

function normalizeUrl(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
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
