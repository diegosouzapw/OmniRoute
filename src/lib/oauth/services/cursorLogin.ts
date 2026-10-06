/**
 * Cursor deep-control PKCE login + refresh.
 * Protocol aligned with OpenCodex `src/oauth/cursor.ts` (loginDeepControl + auth/poll +
 * exchange_user_api_key). Verifiers stay server-side in the session store.
 */

import { randomUUID } from "node:crypto";
import { refreshCursorToken as refreshCursorTokenOpenSse } from "@omniroute/open-sse/services/tokenRefresh/providers/cursor.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { generatePKCE } from "../utils/pkce";
import { CURSOR_CONFIG } from "../constants/oauth";

const SESSION_TTL_MS = 15 * 60 * 1000;
const EXPIRY_SKEW_MS = 5 * 60 * 1000;
const FALLBACK_TTL_MS = 60 * 60 * 1000;

export type CursorAuthParams = {
  verifier: string;
  challenge: string;
  uuid: string;
  loginUrl: string;
};

export type CursorTokenCredentials = {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  accountId?: string;
  email?: string;
};

type CursorJwtPayload = {
  sub?: unknown;
  email?: unknown;
  exp?: unknown;
};

type StoredSession = {
  verifier: string;
  challenge: string;
  uuid: string;
  loginUrl: string;
  createdAt: number;
  expiresAt: number;
};

const sessions = new Map<string, StoredSession>();

function decodeCursorJwtPayload(token: string): CursorJwtPayload | undefined {
  const parts = token.split(".");
  const payload = parts[1];
  if (parts.length !== 3 || !payload) return undefined;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as CursorJwtPayload;
  } catch {
    return undefined;
  }
}

function cursorJwtIdentity(value: unknown): string | undefined {
  if (typeof value === "string" && value.length > 0) return value;
  if (typeof value === "number" && Number.isSafeInteger(value)) return String(value);
  return undefined;
}

function cursorJwtEmail(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length === 0) return undefined;
  return value.toLowerCase();
}

/** Resolve token expiry (Date) from JWT `exp` minus skew; ~1h fallback. */
export function getCursorTokenExpiry(token: string): Date {
  const decoded = decodeCursorJwtPayload(token);
  if (typeof decoded?.exp === "number") {
    return new Date(decoded.exp * 1000 - EXPIRY_SKEW_MS);
  }
  return new Date(Date.now() + FALLBACK_TTL_MS);
}

/** Build credentials from Cursor tokens, extracting stable identity from JWT `sub`. */
export function credentialsFromCursorTokens(
  accessToken: string,
  refreshToken: string
): CursorTokenCredentials {
  const payload = decodeCursorJwtPayload(accessToken) ?? decodeCursorJwtPayload(refreshToken);
  const accountId = cursorJwtIdentity(payload?.sub);
  const email = cursorJwtEmail(payload?.email);
  return {
    accessToken,
    refreshToken,
    expiresAt: getCursorTokenExpiry(accessToken),
    ...(accountId ? { accountId } : {}),
    ...(email ? { email } : {}),
  };
}

/** Generate PKCE params + deep-control login URL (challenge only — never the verifier). */
export async function generateCursorAuthParams(): Promise<CursorAuthParams> {
  const { codeVerifier, codeChallenge } = generatePKCE();
  const uuid = randomUUID();
  const params = new URLSearchParams({
    challenge: codeChallenge,
    uuid,
    mode: "login",
    redirectTarget: "cli",
  });
  return {
    verifier: codeVerifier,
    challenge: codeChallenge,
    uuid,
    loginUrl: `${CURSOR_CONFIG.loginUrl}?${params.toString()}`,
  };
}

function pruneExpiredSessions(now = Date.now()): void {
  for (const [id, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(id);
  }
}

export function clearCursorLoginSessions(): void {
  sessions.clear();
}

/**
 * Store verifier server-side. Returns public sessionId + loginUrl only.
 * Multi-replica deployments need sticky sessions or a shared store.
 */
export function createCursorLoginSession(params: CursorAuthParams): {
  sessionId: string;
  loginUrl: string;
} {
  pruneExpiredSessions();
  const sessionId = randomUUID();
  const now = Date.now();
  sessions.set(sessionId, {
    verifier: params.verifier,
    challenge: params.challenge,
    uuid: params.uuid,
    loginUrl: params.loginUrl,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  });
  return { sessionId, loginUrl: params.loginUrl };
}

/** Public view — never includes verifier. */
export function getCursorLoginSession(
  sessionId: string
): { uuid: string; loginUrl: string; expiresAt: number } | null {
  pruneExpiredSessions();
  const session = sessions.get(sessionId);
  if (!session) return null;
  return { uuid: session.uuid, loginUrl: session.loginUrl, expiresAt: session.expiresAt };
}

/** Peek full session (for poll) without deleting. */
export function peekCursorLoginSession(sessionId: string): StoredSession | null {
  pruneExpiredSessions();
  return sessions.get(sessionId) ?? null;
}

/** Consume (delete) full session — used after successful login or cancel. */
export function consumeCursorLoginSession(sessionId: string): StoredSession | null {
  pruneExpiredSessions();
  const session = sessions.get(sessionId) ?? null;
  if (session) sessions.delete(sessionId);
  return session;
}

export function cancelCursorLoginSession(sessionId: string): boolean {
  pruneExpiredSessions();
  return sessions.delete(sessionId);
}

export type PollCursorOnceResult =
  | { status: "pending" }
  | { status: "ok"; accessToken: string; refreshToken: string }
  | { status: "error"; message: string; httpStatus?: number };

/**
 * Single poll attempt against Cursor auth/poll.
 * 404 = still pending; 200 = tokens. Route layer owns the UI poll loop.
 */
export async function pollCursorAuthOnce(
  uuid: string,
  verifier: string,
  signal?: AbortSignal
): Promise<PollCursorOnceResult> {
  const url = `${CURSOR_CONFIG.pollUrl}?uuid=${encodeURIComponent(uuid)}&verifier=${encodeURIComponent(verifier)}`;
  try {
    const response = await fetch(url, { signal });
    if (response.status === 404) return { status: "pending" };
    if (response.ok) {
      const data = (await response.json()) as { accessToken?: string; refreshToken?: string };
      if (!data.accessToken || !data.refreshToken) {
        return { status: "error", message: "Cursor auth response missing tokens" };
      }
      return { status: "ok", accessToken: data.accessToken, refreshToken: data.refreshToken };
    }
    return {
      status: "error",
      message: `Cursor auth poll failed: ${response.status}`,
      httpStatus: response.status,
    };
  } catch (err) {
    if (signal?.aborted) {
      return { status: "error", message: "Cursor login cancelled" };
    }
    const msg = err instanceof Error ? err.message : String(err);
    return { status: "error", message: sanitizeErrorMessage(msg) };
  }
}

export type RefreshCursorOptions = {
  retryBaseMs?: number;
  attempts?: number;
};

export type RefreshCursorResult =
  CursorTokenCredentials | { error: "unrecoverable_refresh_error"; code: string } | null;

/**
 * Exchange a refresh token for fresh credentials (delegates to open-sse provider).
 * Keeps the old refresh if the server omits one. 401/403 fail fast as unrecoverable.
 */
export async function refreshCursorAccessToken(
  refreshToken: string,
  log?: { error?: (...args: unknown[]) => void; info?: (...args: unknown[]) => void },
  options: RefreshCursorOptions = {}
): Promise<RefreshCursorResult> {
  const result = await refreshCursorTokenOpenSse(refreshToken, log, null, {
    retryBaseMs: options.retryBaseMs,
    attempts: options.attempts,
  });
  if (!result) return null;
  if ("error" in result) {
    return { error: "unrecoverable_refresh_error", code: String(result.code || "unauthorized") };
  }
  return {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    expiresAt: new Date(result.expiresAt),
  };
}
