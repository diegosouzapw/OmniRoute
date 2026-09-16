import type { NextRequest } from "next/server";

/**
 * Derive the base URL for A2A agent card endpoints.
 * Prefers OMNIROUTE_BASE_URL env var for admin override; falls back to the
 * request's dynamic origin so the gateway works behind any hostname without
 * hardcoded localhost:20128 (S2 security fix).
 */
export function getBaseUrl(request?: NextRequest | null): string {
  if (process.env.OMNIROUTE_BASE_URL) return process.env.OMNIROUTE_BASE_URL;
  // Direct route-handler invocation (unit tests, programmatic calls) passes no
  const defaultPort = process.env.PORT || process.env.DASHBOARD_PORT || 20128;
  return request?.nextUrl?.origin ?? `http://localhost:${defaultPort}`;
}
