/**
 * Session — State machine for one pool session
 *
 * Lifecycle:
 *   active ──(429)──▶ cooldown ──(timeout)──▶ active
 *   active ──(5xx)──▶ dead ──(pruned)──▶ removed
 *   active ──(TTL)──▶ replaced with fresh session
 *
 * Each session tracks:
 *   - Fingerprint (UA + headers for one browser identity)
 *   - Request metrics (total, success, fail, inflight)
 *   - Cooldown state (exponential backoff on rate limits)
 */

import { type Fingerprint, type SessionStatus } from "./types.ts";

export class Session {
  readonly id: string;
  readonly fingerprint: Fingerprint;
  readonly createdAt: number;

  status: SessionStatus = "active";
  inflight = 0;
  totalRequests = 0;
  successfulRequests = 0;
  failedRequests = 0;
  consecutiveFails = 0;
  cooldownUntil = 0;
  lastUsedAt = 0;

  constructor(
    fingerprint: Fingerprint,
    private readonly cooldownBase: number,
    private readonly cooldownMax: number,
    private readonly cooldownJitter: number,
  ) {
    this.id = `sess-${fingerprint.id}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    this.fingerprint = fingerprint;
    this.createdAt = Date.now();
  }

  /** Whether this session can accept requests right now */
  get isAvailable(): boolean {
    if (this.status === "dead") return false;
    if (this.status === "cooldown") {
      if (Date.now() >= this.cooldownUntil) {
        // Auto-recover from cooldown
        this.status = "active";
        this.consecutiveFails = 0;
        return true;
      }
      return false;
    }
    return true;
  }

  /** Mark a successful request */
  markSuccess(): void {
    this.successfulRequests++;
    this.consecutiveFails = 0;
  }

  /** Enter cooldown with exponential backoff */
  markCooldown(): void {
    this.consecutiveFails++;
    const base = Math.min(
      this.cooldownBase * Math.pow(2, this.consecutiveFails - 1),
      this.cooldownMax,
    );
    const jitter = Math.random() * this.cooldownJitter;
    this.cooldownUntil = Date.now() + base + jitter;
    this.status = "cooldown";
  }

  /** Mark session as dead (non-recoverable error) */
  markDead(): void {
    this.status = "dead";
  }

  /** Increment inflight counter and mark as used */
  acquire(): void {
    this.inflight++;
    this.totalRequests++;
    this.lastUsedAt = Date.now();
  }

  /** Decrement inflight counter */
  release(): void {
    this.inflight = Math.max(0, this.inflight - 1);
  }

  /** Milliseconds remaining in cooldown */
  get cooldownRemaining(): number {
    if (this.status !== "cooldown") return 0;
    return Math.max(0, this.cooldownUntil - Date.now());
  }

  /** Age in milliseconds */
  get age(): number {
    return Date.now() - this.createdAt;
  }

  /** Build headers for this session's fingerprint */
  buildHeaders(extra?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": this.fingerprint.acceptLanguage ?? "en-US,en;q=0.9",
      "User-Agent": this.fingerprint.userAgent,
      ...extra,
    };
    if (this.fingerprint.secChUa) {
      headers["Sec-CH-UA"] = this.fingerprint.secChUa;
      headers["Sec-CH-UA-Mobile"] = this.fingerprint.secChUaMobile ?? "?0";
      headers["Sec-CH-UA-Platform"] = this.fingerprint.secChUaPlatform ?? '"Windows"';
    }
    return headers;
  }
}
