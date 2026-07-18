/**
 * quotaAutoPing.ts — config for the opt-in Codex quota auto-ping (#6977).
 *
 * Phase 1 (this file): Codex only — resetAt is inferred by watching the
 * "session" window slide forward (Codex has no explicit reset event; an
 * inactive window quietly rolls to a fresh one on the next usage read).
 * Antigravity (2 buckets, no upstream reference) is a follow-up — see the
 * PR body for #6977.
 */

export const QUOTA_AUTOPING_TICK_INTERVAL_MS = 60_000;
// How long a connection must stay quiet after a failed ping before we retry it.
export const QUOTA_AUTOPING_FAILURE_COOLDOWN_MS = 15 * 60 * 1000;
// Once a resetAt is observed and cached, skip re-fetching usage until we're
// within this window of it (Codex resetAt slides constantly while idle, so we
// still poll every tick, but this bounds how eagerly we ping right after a slide).
export const QUOTA_AUTOPING_REFRESH_AHEAD_MS = 5 * 60 * 1000;

export type QuotaAutoPingProviderConfig = {
  settingsKey: string;
  quotaKey: string;
  /** Codex has no fixed reset schedule — ping whenever resetAt slides forward. */
  pingWhenResetAtSlides: true;
  /** Minimum forward drift (ms) before a slide counts as "the window rolled". */
  resetAtDriftMs: number;
  /** Never re-ping the same connection more often than this, even across resets. */
  minPingIntervalMs: number;
  /** Skip the ping when a non-session quota (e.g. weekly) is already exhausted. */
  skipWhenBlockingQuotaExhausted: true;
  pingModel: string;
  pingText: string;
  pingInstructions: string;
  pingReasoningEffort: string;
};

export const QUOTA_AUTOPING_PROVIDERS: Record<"codex", QuotaAutoPingProviderConfig> = {
  codex: {
    settingsKey: "codexAutoPing",
    quotaKey: "session",
    pingWhenResetAtSlides: true,
    resetAtDriftMs: 30_000,
    minPingIntervalMs: 10 * 60 * 1000,
    skipWhenBlockingQuotaExhausted: true,
    pingModel: "gpt-5.1-codex-mini",
    pingText: "hi",
    pingInstructions: "Reply with OK.",
    pingReasoningEffort: "none",
  },
};
