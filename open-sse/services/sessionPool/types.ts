/**
 * Session Pool — Type Definitions
 *
 * Core types for the anonymous session pool system:
 *   SessionPool  → manages N sessions, each with a unique browser fingerprint
 *   Fingerprint  → UA + headers for one browser-like identity
 *   Session      → state machine tracking one session through its lifecycle
 *   PoolConfig   → hot-reloadable pool parameters
 *   PoolStats    → real-time pool health snapshot
 */

// ─── Fingerprint Types ─────────────────────────────────────────────────────

export interface Fingerprint {
  id: string;
  userAgent: string;
  acceptLanguage: string;
  secChUa?: string;
  secChUaPlatform?: string;
  secChUaMobile?: string;
}

export type FingerprintProfile = Fingerprint;

// ─── Session Types ─────────────────────────────────────────────────────────

export type SessionStatus = "active" | "cooldown" | "dead";

export interface SessionState {
  id: string;
  fingerprint: Fingerprint;
  status: SessionStatus;
  inflight: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  consecutiveFails: number;
  cooldownUntil: number;
  createdAt: number;
  lastUsedAt: number;
}

export interface SessionResult {
  status: "ok" | "rate_limited" | "dead" | "error";
}

// ─── Pool Types ────────────────────────────────────────────────────────────

export interface PoolConfig {
  minSessions: number;
  maxSessions: number;
  cooldownBase: number;    // ms, default 1000
  cooldownMax: number;     // ms, default 30000
  cooldownJitter: number;  // ms, default 5000
  requestTimeout: number;  // ms, default 30000
  requestJitter: number;   // ms, default 50
}

export interface PoolStats {
  provider: string;
  sessions: {
    total: number;
    active: number;
    cooldown: number;
    dead: number;
  };
  requests: {
    total: number;
    success: number;
    rate429: number;
    otherErrors: number;
  };
  throughput: string;    // req/s
  successRate: string;   // percentage
  elapsed: string;
}

export interface PoolSessionDetail {
  id: string;
  fingerprint: string;
  status: SessionStatus;
  totalRequests: number;
  successfulRequests: number;
  successRate: string;
  inflight: number;
  cooldownRemaining: string;
  age: string;
}

// ─── Defaults ──────────────────────────────────────────────────────────────

export const DEFAULT_POOL_CONFIG: PoolConfig = {
  minSessions: 6,
  maxSessions: 20,
  cooldownBase: 1_000,
  cooldownMax: 30_000,
  cooldownJitter: 5_000,
  requestTimeout: 30_000,
  requestJitter: 50,
};
