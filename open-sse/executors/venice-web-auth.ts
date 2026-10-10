/**
 * Clerk session-JWT mint/refresh for the Venice web app (#14922).
 *
 * The durable credential is the Clerk `__client` cookie on clerk.venice.ai. It is
 * exchanged for a short-lived session JWT (used as `Authorization: Bearer`).
 * Flow mirrors adapta-web: GET /v1/client -> POST /v1/client/sessions/{id}/tokens.
 */

import { createHash } from "node:crypto";

export const VENICE_APP_URL = "https://venice.ai";
export const VENICE_CLERK_URL = "https://clerk.venice.ai";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
const EXPIRY_BUFFER_MS = 10_000;
const DEFAULT_TTL_MS = 55_000;
const CACHE_MAX = 100;

export class VeniceAuthError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "VeniceAuthError";
    this.status = status;
  }
}

interface CachedJwt {
  jwt: string;
  expiresAt: number;
}

const jwtCache = new Map<string, CachedJwt>();
const inflight = new Map<string, Promise<string>>();

// Hash the whole cookie: every Clerk `__client` JWT starts with the same header, so a
// prefix key would hand one account's session JWT to another (#15846).
const cacheKey = (clientJwt: string): string =>
  createHash("sha256").update(clientJwt).digest("hex");

/** Accepts `__client=<jwt>`, a full Cookie header, or the bare value. */
export function extractClientJwt(raw: string): string {
  const trimmed = raw.trim().replace(/^cookie:\s*/i, "");
  const match = /(?:^|;\s*)__client=([^;\s]+)/.exec(trimmed);
  if (match) return match[1];
  return trimmed;
}

/** Decode a JWT payload without verifying the signature. */
export function decodeJwtPayload(jwt: string): Record<string, unknown> {
  try {
    const part = jwt.split(".")[1];
    if (!part) return {};
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(b64)) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function jwtExpMs(jwt: string): number {
  const exp = decodeJwtPayload(jwt).exp;
  return typeof exp === "number" ? exp * 1000 : 0;
}

function clerkHeaders(clientJwt: string): Record<string, string> {
  return {
    Cookie: `__client=${clientJwt}`,
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    Origin: VENICE_APP_URL,
  };
}

async function getSessionId(clientJwt: string, signal?: AbortSignal | null): Promise<string> {
  const resp = await fetch(`${VENICE_CLERK_URL}/v1/client`, {
    headers: clerkHeaders(clientJwt),
    signal: signal ?? undefined,
  });
  if (!resp.ok) {
    throw new VeniceAuthError(
      resp.status,
      `Clerk /v1/client returned HTTP ${resp.status} - check your __client cookie`
    );
  }
  const body = (await resp.json()) as { response?: { sessions?: Array<Record<string, string>> } };
  const active = (body?.response?.sessions ?? []).find((s) => s.status === "active");
  if (!active?.id) {
    throw new VeniceAuthError(401, "No active Clerk session - your __client cookie may be expired");
  }
  return active.id;
}

async function mintJwt(
  clientJwt: string,
  sessionId: string,
  signal?: AbortSignal | null
): Promise<string> {
  const resp = await fetch(`${VENICE_CLERK_URL}/v1/client/sessions/${sessionId}/tokens`, {
    method: "POST",
    headers: clerkHeaders(clientJwt),
    signal: signal ?? undefined,
  });
  if (!resp.ok) {
    throw new VeniceAuthError(resp.status, `Clerk token refresh returned HTTP ${resp.status}`);
  }
  const jwt = ((await resp.json()) as { jwt?: unknown })?.jwt;
  if (typeof jwt !== "string" || !jwt.startsWith("eyJ")) {
    throw new VeniceAuthError(502, "Clerk token refresh did not return a valid JWT");
  }
  return jwt;
}

async function refresh(clientJwt: string, signal?: AbortSignal | null): Promise<string> {
  const sessionId = await getSessionId(clientJwt, signal);
  const jwt = await mintJwt(clientJwt, sessionId, signal);
  if (jwtCache.size >= CACHE_MAX) {
    const first = jwtCache.keys().next().value;
    if (first) jwtCache.delete(first);
  }
  jwtCache.set(cacheKey(clientJwt), {
    jwt,
    expiresAt: jwtExpMs(jwt) || Date.now() + DEFAULT_TTL_MS,
  });
  return jwt;
}

/** Returns a valid session JWT (cached until exp-10s, single-flight per cookie). */
export async function getSessionJwt(
  clientJwt: string,
  signal?: AbortSignal | null
): Promise<string> {
  const key = cacheKey(clientJwt);
  const hit = jwtCache.get(key);
  if (hit && Date.now() < hit.expiresAt - EXPIRY_BUFFER_MS) return hit.jwt;
  jwtCache.delete(key);

  const pending = inflight.get(key);
  if (pending) return pending;
  const promise = refresh(clientJwt, signal).finally(() => inflight.delete(key));
  inflight.set(key, promise);
  return promise;
}

export function evictSessionJwt(clientJwt: string): void {
  jwtCache.delete(cacheKey(clientJwt));
}
