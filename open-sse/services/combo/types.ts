/**
 * Shared combo (model combo) types extracted from combo.ts.
 *
 * Pure type aliases / interfaces and the RESET_WINDOW_NAMES runtime constant.
 * Moving these out of the 5k-LOC combo.ts god-file (Quality Gate v2 / Fase 9)
 * — logic unchanged, re-exported from combo.ts for backward compatibility.
 */

import type { CompressionExclusions } from "../compression/exclusions.ts";
import type { ProviderCandidate } from "../autoCombo/scoring.ts";
import type { PerTargetAdmissionHook } from "../admission/types.ts";

export const RESET_WINDOW_NAMES = ["weekly", "session", "monthly"] as const;

export type ComboRetryAfter = string | number | Date;

export type ComboErrorBody = {
  error?:
    | {
        code?: string | null;
        message?: string | null;
        // buildModelCooldownBody (open-sse/utils/error.ts) nests its retry hint
        // here instead of at the top level — see the retryAfter fallback in
        // combo.ts's dispatchWithCooldownRetry error extraction.
        retry_after?: string | null;
        reset_seconds?: number | null;
      }
    | string;
  message?: string | null;
  retryAfter?: ComboRetryAfter | null;
} | null;

export type ComboLike = {
  id?: string;
  name: string;
  strategy?: string | null;
  models: unknown[];
  config?: Record<string, unknown> | null;
  autoConfig?: Record<string, unknown> | null;
  context_cache_protection?: boolean | number;
  system_message?: string | null;
  [key: string]: unknown;
};

export type ComboInput = ComboLike | Record<string, unknown>;

export type ComboCollectionLike = ComboInput[] | { combos?: ComboInput[] } | null | undefined;

export type ComboLogger = {
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error?: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
};

export type SingleModelTarget =
  | (ResolvedComboTarget & {
      allowRateLimitedConnection?: boolean;
      effectiveComboStrategy?: string | null;
      modelAbortSignal?: AbortSignal | null;
      /** True when this target was selected via context-cache session pinning. */
      modelPinned?: boolean;
      /** Prior combo legs already attempted before this dispatch (#12339). */
      fallbackAttempts?: number;
    })
  | { modelAbortSignal: AbortSignal; fallbackAttempts?: number };

export type HandleSingleModel = (
  body: Record<string, unknown>,
  modelStr: string,
  target?: SingleModelTarget
) => Promise<Response>;

export type IsModelAvailable = (
  modelStr: string,
  target?: ResolvedComboTarget & { allowRateLimitedConnection?: boolean }
) => Promise<boolean> | boolean;

export type ComboRelayOptions = {
  sessionId?: string | null;
  config?: Record<string, unknown> | null;
  bypassProviderQuotaPolicy?: boolean;
  /** Per-request X-OmniRoute-Mode value (auto-combo preset / mode-pack name) — #6024/#6025. */
  mode?: string | null;
  /** Per-request X-OmniRoute-Budget value (hard cost ceiling in USD) — #6023. */
  budgetCap?: number | null;
  /** Per-request X-OmniRoute-Budget-Fallback value ("cheapest" | "strict") — #3470. */
  budgetFallback?: "cheapest" | "strict" | null;
  [key: string]: unknown;
};

export type NestedComboMode = "flatten" | "execute";

export type ComboNestingContext = {
  depth: number;
  maxDepth: number;
  visitedComboNames: string[];
  rootComboName: string;
  attemptBudget: { count: number; limit: number };
};

export type HiddenModelsByProvider = ReadonlyMap<string, ReadonlySet<string>>;

export type HandleComboChatOptions = {
  /** #10681: optional opaque parent invocation id for the decision trace. */
  invocationId?: string;
  body: Record<string, unknown>;
  combo: ComboLike;
  handleSingleModel: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  log: ComboLogger;
  settings?: Record<string, unknown> | null;
  allCombos?: ComboCollectionLike;
  relayOptions?: ComboRelayOptions | null;
  signal?: AbortSignal | null;
  apiKeyAllowedConnections?: string[] | null;
  nesting?: ComboNestingContext | null;
  hiddenModelsByProvider?: HiddenModelsByProvider;
  /** Native Responses clients (for example Codex CLI/Desktop) manage compaction themselves. */
  clientManagedResponsesContext?: boolean;
  /**
   * #9654 Wave 2: per-target lane-aware admission probe for fan-out dispatch.
   * Strictly non-blocking (maxWaitMs 0), no-op when virtual lanes are off,
   * keyed to the parent's tenantKey. Skipped targets are not dispatched.
   */
  perTargetAdmission?: PerTargetAdmissionHook | null;
  /**
   * #10225: request-scoped flag — prompt compression is enabled for this request
   * (global compression switch ON and not opted-out by the API key). When set, the
   * combo preflight defers its hard context-overflow rejection so chatCore's
   * compression runs before the final context gate.
   */
  deferContextOverflowWhenCompressible?: boolean;
  /** Server-side compression exclusions (#8034) — used to check which targets can run compression. */
  compressionExclusions?: CompressionExclusions;
  /**
   * #10503: request-shape facts (mirroring chatCore.ts's own resolution) threaded
   * down to getKnownContextOverflow so the deferral decision can be target-aware —
   * a native-Codex-Responses-passthrough target must never count as "compressible"
   * (chatCore disables compression for it unconditionally). See
   * knownContextOverflow.ts::KnownContextOverflowOptions for the full rationale.
   */
  sourceFormat?: string | null;
  endpointPath?: string | null;
  requestHeaders?: Headers | Record<string, unknown> | null;
};

export type HandleRoundRobinOptions = HandleComboChatOptions;

export type HistoricalLatencyStatsEntry = {
  totalRequests?: number;
  p95LatencyMs?: number;
  latencyStdDev?: number;
  successRate?: number;
  /** Mean time-to-first-token (ms) from getModelLatencyStats() (#6875). */
  avgTtftMs?: number;
  /** Mean end-to-end request latency (ms) from getModelLatencyStats() (#6875). */
  avgE2ELatencyMs?: number;
  /** Mean output tokens/sec from getModelLatencyStats() (#6875). */
  avgTokensPerSecond?: number;
};

export type AutoProviderCandidate = ProviderCandidate & {
  stepId: string;
  executionKey: string;
  modelStr: string;
  /**
   * When true, this candidate's auto-combo score is multiplied by
   * QUOTA_SOFT_DEPRIORITIZE_FACTOR (B17 soft-policy penalty).
   * Set externally when enforceQuotaShare returns deprioritize=true
   * for the key routed through this target's connectionId.
   */
  quotaSoftPenalty?: boolean;
  /** True when provider-account quota preflight cutoff says this candidate must not be routed. */
  quotaCutoffBlocked?: boolean;
  /** Diagnostic reason for quotaCutoffBlocked. */
  quotaCutoffReason?: string;
  /**
   * #4540: True when this candidate's connection is in a terminal/transient
   * unavailable status (credits_exhausted / rate_limited / banned / expired /
   * future-dated unavailable) but the quota-preflight HARD cutoff is OFF (default).
   * In that case the candidate is NOT hard-blocked — instead its auto-combo score
   * is multiplied by STATUS_SOFT_DEPRIORITIZE_FACTOR so an exhausted provider ranks
   * strictly below an otherwise-identical healthy one, without emitting a misleading
   * "below quota cutoff" 429. Set by buildAutoCandidates from the connection testStatus.
   */
  statusPenalty?: boolean;
  /** Diagnostic reason for statusPenalty (the connection testStatus that triggered it). */
  statusPenaltyReason?: string;
};

export type ResolvedComboTarget = {
  kind: "model";
  stepId: string;
  executionKey: string;
  modelStr: string;
  provider: string;
  authType?: string | null;
  providerId: string | null;
  connectionId: string | null;
  allowedConnectionIds?: string[] | null;
  weight: number;
  label: string | null;
  prompt?: string | null;
  failoverBeforeRetry?: unknown;
  fallbackOnlyOnQuotaExhaustion?: boolean;
  trafficType?: "production" | "shadow";
  /**
   * Fingerprint-based account pin resolved from a combo builder composite
   * connectionId (`${rowId}|fp|${fingerprint}`, see
   * `expandTargetsByFingerprints` in `./fingerprintExpansion.ts`, #6696).
   * Set only for fingerprint-provider targets (mimocode/mcode/opencode) that
   * were pinned to one specific account.
   */
  pinnedFingerprint?: string;
};

export type ShadowRoutingConfig = {
  enabled: boolean;
  targets: unknown[];
  sampleRate: number;
  maxTargets: number;
  timeoutMs: number;
};

export type ResolvedComboRefTarget = {
  kind: "combo-ref";
  stepId: string;
  executionKey: string;
  comboName: string;
  weight: number;
  label: string | null;
  fallbackOnlyOnQuotaExhaustion?: boolean;
};

export type ResolvedComboUnit = ResolvedComboTarget | ResolvedComboRefTarget;

export type ComboRuntimeStep = ResolvedComboUnit;
