/**
 * resilience/settings/types — resilience settings shape (pure types).
 *
 * Extracted verbatim from resilience/settings.ts. Zero imports, type-only.
 * The host re-exports the public interfaces so its API is unchanged; the
 * normalize layer imports these to type its coercion.
 *
 * @module lib/resilience/settings/types
 */

export type JsonRecord = Record<string, unknown>;
export type AuthCategory = "oauth" | "apikey";

export interface RequestQueueSettings {
  autoEnableApiKeyProviders: boolean;
  requestsPerMinute: number;
  minTimeBetweenRequestsMs: number;
  concurrentRequests: number;
  maxWaitMs: number;
}

export interface ConnectionCooldownProfileSettings {
  baseCooldownMs: number;
  useUpstreamRetryHints: boolean;
  /**
   * Issue #2100 follow-up: opt-in toggle for upstream 429 hint trust at the
   * circuit-breaker cooldown layer (independent of `useUpstreamRetryHints`
   * which controls retry scheduling).
   *
   * Stored shape is intentionally optional / `boolean | undefined`: when
   * unset, the per-provider default from `providerHints.ts` applies.
   * Normalize/merge MUST preserve `undefined` — do not coerce via
   * `toBoolean(value, fallback)`.
   */
  useUpstream429BreakerHints?: boolean;
  maxBackoffSteps: number;
}

export interface ProviderBreakerProfileSettings {
  failureThreshold: number;
  degradationThreshold: number;
  resetTimeoutMs: number;
}

export interface WaitForCooldownSettings {
  enabled: boolean;
  maxRetries: number;
  maxRetryWaitSec: number;
  maxRetryWaitMs: number;
}

/**
 * Quota-share combo cooldown-aware retry (Variante A). A quota-share (`qtSd/…`)
 * combo that would crystallize a 429 `model_cooldown` for a SHORT transient
 * cooldown waits it out and re-dispatches instead. Guards (gating + the
 * `quota_exhausted`/auth/not-found exclusions) live in
 * open-sse/services/combo/comboCooldownRetry.ts; `maxWaitMs`/`maxAttempts`/
 * `budgetMs` bound a single wait, the retry cycles, and the total wait time.
 */
export interface ComboCooldownWaitSettings {
  enabled: boolean;
  maxWaitMs: number;
  maxAttempts: number;
  budgetMs: number;
}

/**
 * Per-connection concurrency limit for quota-share (`qtSd/…`) combos (FASE 2.1).
 * The quota-share gating in selectQuotaShareTarget is fail-open and cannot
 * hard-limit a single-connection pool, so concurrent requests to one
 * subscription account can still flood it (→ 429 + cooldown). When a connection
 * declares a positive `max_concurrent` ceiling, this layer serializes concurrent
 * requests to that account through a per-connection semaphore (excess requests
 * wait in the queue instead of flooding). Kill-switch only: the cap itself comes
 * from each connection's `max_concurrent`. Wiring lives in
 * open-sse/services/combo/quotaShareConcurrency.ts.
 */
export interface QuotaShareConcurrencyLimitSettings {
  enabled: boolean;
}

export interface ProviderCooldownSettings {
  /**
   * Minimum cooldown (ms) before a failed provider/connection can be retried.
   * This prevents subsequent requests from immediately re-walking failing providers.
   * Scaled exponentially with failure count: minRetryCooldownMs * 2^(failures-1).
   * Default: 5000 (5 seconds).
   */
  minRetryCooldownMs: number;
  /**
   * Maximum cooldown (ms) before a failed provider/connection is retried regardless.
   * Hard cap to prevent providers from being skipped indefinitely.
   * Default: 300000 (5 minutes).
   */
  maxRetryCooldownMs: number;
  /**
   * Enable/disable global provider cooldown tracking.
   * When disabled, only per-request cooldown state is used.
   * Default: true.
   */
  enabled: boolean;
}

export interface QuotaPreflightSettings {
  /**
   * Master switch for the auto-routing quota cutoff (buildAutoCandidates). When
   * disabled (default), candidates are NOT dropped for low quota before scoring —
   * the soft quota penalty + connection cooldown still apply, so behavior is
   * unchanged. Opt-in because the hard cutoff interacts with the auto-routing
   * scorer and must be validated per deployment. Default: false.
   */
  enabled: boolean;
  /**
   * Global minimum-remaining cutoff (percent, 0-100). A connection is skipped
   * when its remaining quota drops to this value or below. Matches the
   * dashboard's quota bars (which show REMAINING %, not used %), so the
   * number means the same thing in both places. Default: 2 (stop at 2%
   * remaining = 98% used).
   */
  defaultThresholdPercent: number;
  /**
   * Global warn threshold (percent, 0-100 remaining %). Fires when remaining
   * quota drops to this value or below. Must be HIGHER than the cutoff so
   * warnings appear before the block point. Default: 20 (warn at 20%
   * remaining = 80% used).
   */
  warnThresholdPercent: number;
  /**
   * Per-(provider, window) defaults for providers that expose multiple quota
   * windows (e.g. Codex's session + weekly). Values are minimum-remaining %
   * cutoffs. Resolution order, low-to-high precedence:
   *   defaultThresholdPercent
   *   → providerWindowDefaults[provider][window]
   *   → connection.quotaWindowThresholds[window]
   */
  providerWindowDefaults: Record<string, Record<string, number>>;
}

export interface StreamRecoverySettings {
  /**
   * Opt-in transparent recovery of truncated upstream streams (free-claude-code port).
   * When enabled, the opening SSE window is briefly held (see STREAM_RECOVERY in
   * open-sse/config/constants.ts) so an early cutoff can be retried before any byte
   * reaches the client. OFF by default because holding the window adds up to
   * STREAM_RECOVERY.HOLDBACK_MS of time-to-first-token latency on every stream.
   * Default seeds from the STREAM_RECOVERY_ENABLED feature flag / env var.
   */
  enabled: boolean;
  /**
   * Opt-in mid-stream continuation (Fase 4.4): when an upstream stream truncates AFTER
   * bytes already reached the client, re-request with the partial text as an assistant
   * prefill and stitch the missing suffix (plain-text OpenAI-compatible streams only;
   * never with a tool call in flight). OFF by default because the recovered tail arrives
   * as one burst rather than token-by-token. Default seeds from the
   * STREAM_RECOVERY_MIDSTREAM_ENABLED feature flag / env var.
   */
  continueMidStream: boolean;
}

export interface ResilienceSettings {
  requestQueue: RequestQueueSettings;
  connectionCooldown: Record<AuthCategory, ConnectionCooldownProfileSettings>;
  providerBreaker: Record<AuthCategory, ProviderBreakerProfileSettings>;
  waitForCooldown: WaitForCooldownSettings;
  comboCooldownWait: ComboCooldownWaitSettings;
  quotaShareConcurrencyLimit: QuotaShareConcurrencyLimitSettings;
  providerCooldown: ProviderCooldownSettings;
  quotaPreflight: QuotaPreflightSettings;
  streamRecovery: StreamRecoverySettings;
}

export interface ResilienceSettingsPatch {
  requestQueue?: Partial<RequestQueueSettings>;
  connectionCooldown?: Partial<Record<AuthCategory, Partial<ConnectionCooldownProfileSettings>>>;
  providerBreaker?: Partial<Record<AuthCategory, Partial<ProviderBreakerProfileSettings>>>;
  waitForCooldown?: Partial<WaitForCooldownSettings>;
  comboCooldownWait?: Partial<ComboCooldownWaitSettings>;
  quotaShareConcurrencyLimit?: Partial<QuotaShareConcurrencyLimitSettings>;
  providerCooldown?: Partial<ProviderCooldownSettings>;
  quotaPreflight?: Partial<QuotaPreflightSettings>;
  streamRecovery?: Partial<StreamRecoverySettings>;
}
