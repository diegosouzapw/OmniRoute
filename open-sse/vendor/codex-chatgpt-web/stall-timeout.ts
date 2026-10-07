/* Adapted from miuuyy/codex-chatgpt-web v4.0.7 commit b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494 (MIT). */
/**
 * Bridge upstream stall budget: seconds of silence (no adapter events) before the
 * Responses bridge emits `response.incomplete` / `upstream_stall_timeout`.
 *
 * Raised from 90s so long reasoning + large tool writes are not cut mid-turn.
 * Hung streams still die; they just get a more realistic window.
 */
export const DEFAULT_STALL_TIMEOUT_SEC = 300;

// Keep a malformed or accidentally enormous configuration from overflowing the bridge's
// heartbeat tick budget and disabling the hung-upstream watchdog entirely.
export const MAX_STALL_TIMEOUT_SEC = 3_600;

/**
 * Resolve the effective bridge stall deadline for a turn.
 * - unset / non-finite config → {@link DEFAULT_STALL_TIMEOUT_SEC}
 * - finite config → ceil, clamped to the practical [1, {@link MAX_STALL_TIMEOUT_SEC}] range
 */
export function resolveStallTimeoutSec(configuredSec: number | undefined): number {
  if (typeof configuredSec === "number" && Number.isFinite(configuredSec)) {
    return Math.min(MAX_STALL_TIMEOUT_SEC, Math.max(1, Math.ceil(configuredSec)));
  }
  return DEFAULT_STALL_TIMEOUT_SEC;
}
