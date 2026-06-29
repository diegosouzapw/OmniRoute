import { classifyHostLocality } from "@/server/authz/routeGuard";
import { PEER_IP_HEADER } from "@/server/authz/headers";
import { resolveStampedPeer } from "@/server/authz/peerStamp";

export type PublicOriginSource =
  | "configured"
  | "trusted-forwarded"
  | "request-url"
  | "direct-local-host";

export interface PublicOriginCandidate {
  origin: string;
  source: PublicOriginSource;
}

export interface BrowserMutationOriginVerdict {
  ok: boolean;
  reason?: "cross-site-fetch-metadata" | "invalid-origin";
}

const PUBLIC_BASE_URL_ENV = [
  "OMNIROUTE_PUBLIC_BASE_URL",
  "NEXT_PUBLIC_BASE_URL",
  "NEXT_PUBLIC_APP_URL",
] as const;

function uniqueCandidates(candidates: PublicOriginCandidate[]): PublicOriginCandidate[] {
  const seen = new Set<string>();
  const result: PublicOriginCandidate[] = [];
  for (const candidate of candidates) {
    const normalized = normalizeOrigin(candidate.origin);
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    result.push({ ...candidate, origin: normalized });
  }
  return result;
}

export function firstHeaderValue(value: string | null): string | null {
  return value?.split(",")[0]?.trim() || null;
}

export function normalizeOrigin(origin: string): string {
  const parsed = new URL(origin);
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Unsupported origin protocol");
  }
  return parsed.origin.toLowerCase();
}

function configuredPublicOrigins(): PublicOriginCandidate[] {
  const candidates: PublicOriginCandidate[] = [];
  for (const name of PUBLIC_BASE_URL_ENV) {
    const value = process.env[name]?.trim();
    if (!value) continue;
    try {
      candidates.push({ origin: normalizeOrigin(value), source: "configured" });
    } catch {
      continue;
    }
  }
  return candidates;
}

function forwardedHeaderPart(value: string | undefined): string | null {
  if (!value) return null;
  let result = value.trim();
  if (!result) return null;
  if (result.startsWith('"') && result.endsWith('"') && result.length >= 2) {
    result = result.slice(1, -1);
  }
  return result || null;
}

function parseForwardedHeader(value: string | null): { proto: string | null; host: string | null } {
  const first = firstHeaderValue(value);
  if (!first) return { proto: null, host: null };

  let proto: string | null = null;
  let host: string | null = null;
  for (const segment of first.split(";")) {
    const [rawKey, ...rawValue] = segment.split("=");
    const key = rawKey?.trim().toLowerCase();
    const part = forwardedHeaderPart(rawValue.join("="));
    if (!key || !part) continue;
    if (key === "proto") proto = part;
    if (key === "host") host = part;
  }
  return { proto, host };
}

function sanitizeForwardedProto(proto: string | null): "http" | "https" | null {
  const normalized = proto?.trim().toLowerCase();
  if (normalized === "http" || normalized === "https") return normalized;
  return null;
}

function sanitizeForwardedHost(host: string | null): string | null {
  const trimmed = host?.trim();
  if (!trimmed) return null;
  if (/[/\\\s\x00-\x1f\x7f]/.test(trimmed)) return null;
  try {
    const parsed = new URL(`http://${trimmed}`);
    if (
      parsed.username ||
      parsed.password ||
      parsed.pathname !== "/" ||
      parsed.search ||
      parsed.hash
    ) {
      return null;
    }
    return parsed.host.toLowerCase();
  } catch {
    return null;
  }
}

function trustProxyMode(): "none" | "loopback" | "private" {
  const raw = process.env.OMNIROUTE_TRUST_PROXY?.trim().toLowerCase();
  if (!raw || ["0", "false", "none", "off", "no", "disable", "disabled"].includes(raw)) {
    return "none";
  }
  if (["true", "1", "loopback"].includes(raw)) return "loopback";
  if (raw === "private" || raw === "lan") return "private";
  return "none";
}

export function trustsForwardedHeaders(request: Request): boolean {
  const mode = trustProxyMode();
  if (mode === "none") return false;

  const peer = resolveStampedPeer(
    request.headers.get(PEER_IP_HEADER),
    process.env.OMNIROUTE_PEER_STAMP_TOKEN
  );
  const locality = classifyHostLocality(peer);
  if (mode === "loopback") return locality === "loopback";
  return locality === "loopback" || locality === "lan";
}

function trustedForwardedOrigin(request: Request): string | null {
  if (!trustsForwardedHeaders(request)) return null;

  const forwarded = parseForwardedHeader(request.headers.get("forwarded"));
  const proto = sanitizeForwardedProto(
    forwarded.proto ?? firstHeaderValue(request.headers.get("x-forwarded-proto"))
  );
  const host = sanitizeForwardedHost(
    forwarded.host ?? firstHeaderValue(request.headers.get("x-forwarded-host"))
  );
  if (!proto || !host) return null;

  try {
    return normalizeOrigin(`${proto}://${host}`);
  } catch {
    return null;
  }
}

function requestUrlOrigin(request: Request): string | null {
  try {
    return normalizeOrigin(new URL(request.url).origin);
  } catch {
    return null;
  }
}

function requestUrlProtocol(request: Request): "http" | "https" {
  try {
    return new URL(request.url).protocol === "https:" ? "https" : "http";
  } catch {
    return "http";
  }
}

/**
 * Direct (no-proxy) LAN/loopback access (#5340). When the dashboard is reached
 * over a private-network host — e.g. `http://192.168.0.15:20128` instead of the
 * configured `localhost` base URL — Next.js standalone reports the internal bind
 * host in `request.url`, so the browser's same-origin `Origin` matches no
 * candidate and every mutation is rejected with INVALID_ORIGIN.
 *
 * This accepts the request `Host` (or a trusted `X-Forwarded-Host`) as a valid
 * mutation origin, gated by TWO independent checks so it cannot be abused:
 *   1. The token-stamped socket peer must be loopback or private-LAN (a public
 *      client never matches — it presents a public source IP).
 *   2. The Host itself must be a loopback/private-LAN IP literal. A DNS-rebinding
 *      attacker carries a *domain* in the Host (classifies as "remote"), so a
 *      rebind to a loopback/LAN socket cannot turn an attacker domain into a
 *      trusted origin. Direct IP access over the LAN/loopback still works.
 * The protocol is pinned to the actual connection (or a trusted forwarded proto),
 * never derived from the attacker-controllable Origin.
 */
function directLocalHostOrigin(request: Request): string | null {
  const peer = resolveStampedPeer(
    request.headers.get(PEER_IP_HEADER),
    process.env.OMNIROUTE_PEER_STAMP_TOKEN
  );
  if (classifyHostLocality(peer) === "remote") return null;

  const rawHost = trustsForwardedHeaders(request)
    ? firstHeaderValue(request.headers.get("x-forwarded-host")) ?? request.headers.get("host")
    : request.headers.get("host");
  const host = sanitizeForwardedHost(rawHost);
  if (!host) return null;
  if (classifyHostLocality(host) === "remote") return null;

  const proto =
    sanitizeForwardedProto(firstHeaderValue(request.headers.get("x-forwarded-proto"))) ??
    requestUrlProtocol(request);
  try {
    return normalizeOrigin(`${proto}://${host}`);
  } catch {
    return null;
  }
}

export function getPublicOriginCandidates(request: Request): PublicOriginCandidate[] {
  const candidates: PublicOriginCandidate[] = [];

  const requestOrigin = requestUrlOrigin(request);
  if (requestOrigin) candidates.push({ origin: requestOrigin, source: "request-url" });

  const configured = configuredPublicOrigins();
  candidates.push(...configured);

  if (configured.length === 0) {
    const forwarded = trustedForwardedOrigin(request);
    if (forwarded) candidates.push({ origin: forwarded, source: "trusted-forwarded" });
  }

  const directLocal = directLocalHostOrigin(request);
  if (directLocal) candidates.push({ origin: directLocal, source: "direct-local-host" });

  return uniqueCandidates(candidates);
}

export function resolvePublicOrigin(request: Request): PublicOriginCandidate {
  const configured = uniqueCandidates(configuredPublicOrigins());
  if (configured.length > 0) return configured[0];

  const forwarded = trustedForwardedOrigin(request);
  if (forwarded) return { origin: forwarded, source: "trusted-forwarded" };

  const requestOrigin = requestUrlOrigin(request);
  if (requestOrigin) return { origin: requestOrigin, source: "request-url" };

  return { origin: "http://localhost:20128", source: "request-url" };
}

export function validateBrowserMutationOrigin(request: Request): BrowserMutationOriginVerdict {
  const fetchSite = request.headers.get("sec-fetch-site")?.toLowerCase();
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) {
    return { ok: false, reason: "cross-site-fetch-metadata" };
  }

  const origin = request.headers.get("origin");
  if (!origin) return { ok: true };

  let normalizedOrigin: string;
  try {
    normalizedOrigin = normalizeOrigin(origin);
  } catch {
    return { ok: false, reason: "invalid-origin" };
  }

  const allowed = new Set(getPublicOriginCandidates(request).map((candidate) => candidate.origin));
  return allowed.has(normalizedOrigin) ? { ok: true } : { ok: false, reason: "invalid-origin" };
}
