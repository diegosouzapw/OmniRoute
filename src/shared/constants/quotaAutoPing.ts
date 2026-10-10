/**
 * quotaAutoPing.ts — config for opt-in quota window warm-up.
 *
 * Codex infers resetAt by watching the session window slide forward.
 * Factory warms the Standard 5h window with Claude Haiku 4.5; Factory applies
 * Standard quota first and falls back to Core after Standard is exhausted.
 */

export const QUOTA_AUTOPING_TICK_INTERVAL_MS = 60_000;
export const QUOTA_AUTOPING_FAILURE_COOLDOWN_MS = 15 * 60 * 1000;
export const QUOTA_AUTOPING_REFRESH_AHEAD_MS = 5 * 60 * 1000;
export const QUOTA_AUTOPING_FAR_RESET_SKIP_MS = 24 * 60 * 60 * 1000;

export const FACTORY_PING_MODEL = "claude-haiku-4-5-20251001";

export type QuotaAutoPingProviderId = "codex" | "factory";

export type QuotaAutoPingProviderConfig = {
  settingsKey: string;
  quotaKey: string;
  pingWhenResetAtSlides?: boolean;
  pingWhenWindowInactive?: boolean;
  resetAtDriftMs?: number;
  minPingIntervalMs: number;
  skipWhenBlockingQuotaExhausted: true;
  pingText: string;
  pingInstructions?: string;
  pingReasoningEffort?: string;
  pingMaxTokens?: number;
  pingModel?: string;
};

export const QUOTA_AUTOPING_PROVIDERS: Record<
  QuotaAutoPingProviderId,
  QuotaAutoPingProviderConfig
> = {
  codex: {
    settingsKey: "codexAutoPing",
    quotaKey: "session",
    pingWhenResetAtSlides: true,
    resetAtDriftMs: 30_000,
    minPingIntervalMs: 10 * 60 * 1000,
    skipWhenBlockingQuotaExhausted: true,
    pingText: "hi",
    pingInstructions: "Reply with OK.",
    pingReasoningEffort: "none",
  },
  factory: {
    settingsKey: "factoryAutoPing",
    quotaKey: "standard_5h",
    pingWhenWindowInactive: true,
    minPingIntervalMs: 10 * 60 * 1000,
    skipWhenBlockingQuotaExhausted: true,
    pingText: "hi",
    pingMaxTokens: 1,
    pingModel: FACTORY_PING_MODEL,
  },
};
