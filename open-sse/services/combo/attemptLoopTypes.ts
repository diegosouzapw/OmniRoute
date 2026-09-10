/**
 * Shared types for the handleComboChat attempt-loop split (ROADMAP 3.8.52).
 *
 * Mutable loop state lives on AttemptLoopState. Read-only dependencies live on
 * AttemptLoopDeps. Do not merge the two into ComboContext.
 *
 * @internal — not part of the public combo.ts barrel.
 */
import type { PerTargetAdmissionHook } from "../admission/types.ts";
import type { ResilienceSettings } from "../../../src/lib/resilience/settings";
import type { ContextRelayConfig, UniversalHandoffConfig } from "../contextHandoff.ts";
import type { ComboErrorEntry } from "./comboErrorAggregation.ts";
import type { ResetWindowConfig } from "./quotaScoring.ts";
import type { ResponseValidationConfig } from "./responseValidation.ts";
import type { ApplyStickinessResult } from "./sessionStickiness.ts";
import type {
  ComboLike,
  ComboLogger,
  ComboRetryAfter,
  HandleSingleModel,
  IsModelAvailable,
  ResolvedComboTarget,
} from "./types.ts";

export type ExecuteTargetResult = { ok: boolean; response?: Response } | null;

export type AttemptLoopState = {
  orderedTargets: ResolvedComboTarget[];
  fallbackCount: number;
  recordedAttempts: number;
  comboErrors: ComboErrorEntry[];
  lastError: string | null;
  lastStatus: number | null;
  earliestRetryAfter: ComboRetryAfter | null;
  comboExpired: boolean;
  exhaustedProviders: Set<string>;
  exhaustedConnections: Set<string>;
  transientRateLimitedProviders: Set<string>;
  abortControllers: Map<number, AbortController>;
  dispatchedTargets: Set<string>;
  targetFailureTrust: Map<string, { observedFailure: boolean; allObservedFailuresQuota: boolean }>;
  comboAttemptOrder: Array<{ provider: string; model: string }>;
  skippedForCircuitOpen: boolean;
  earliestCircuitOpenRetryMs: number;
  /** Mutable attempt budget shared with dispatchWithCooldownRetry (Task 4). */
  globalAttempts: number;
  /** Quota-trust accumulators; persist across set retries and cooldown re-dispatch. */
  observedFailure: boolean;
  allObservedFailuresQuota: boolean;
  observeFailure(quotaExhausted: boolean, targetExecutionKey?: string): void;
};

export type AttemptLoopDeps = {
  strategy: string;
  combo: ComboLike;
  config: Record<string, unknown> & {
    zeroLatencyOptimizationsEnabled?: boolean;
    responseValidation?: ResponseValidationConfig | null;
    failoverBeforeRetryExplicit?: boolean;
    failoverBeforeRetry?: boolean;
    predictiveTtftMs?: number;
    fallbackCompressionMode?: string;
    fallbackCompressionThreshold?: number;
    retryDelayMs?: number;
    fallbackDelayMs?: number;
    maxGlobalAttempts?: unknown;
    hedging?: boolean;
    hedgeDelayMs?: unknown;
  };
  log: ComboLogger;
  settings: Record<string, unknown> | null;
  resilienceSettings: ResilienceSettings;
  sticky: ApplyStickinessResult;
  effectiveSessionId: string | null;
  preScreenMap: Map<string, { profile?: unknown }>;
  quotaCutoffResetWindowConfig: ResetWindowConfig;
  maxRetries: number;
  traceInvocationId: string;
  clientRequestedStream: boolean;
  handleSingleModelWithTimeout: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  perTargetAdmission?: PerTargetAdmissionHook | null;
  signal?: AbortSignal | null;
  body: Record<string, unknown>;
  startTime: number;
  releaseStickyPinOnFailure: (
    messageHash: string | null | undefined,
    failedConnectionId: string | null | undefined
  ) => void;
  clearStaleLKGP: (
    comboName: string,
    executionKey: string | undefined,
    comboId: string | undefined,
    log: ComboLogger,
    tag: string
  ) => void;
  /**
   * Closed-over setup values from handleComboChatInner. Optional so Task 2
   * gate tests keep compiling; attempt uses defaults when absent.
   */
  clientManagedResponsesContext?: boolean;
  reasoningTokenBufferEnabled?: boolean;
  stickyWeightedLimit?: number;
  getWeightedStepKeyForTarget?: (target: ResolvedComboTarget) => string | null;
  universalHandoffConfig?: UniversalHandoffConfig;
  relayOptions?: { sessionId?: string | null } | null;
  relayConfig?: ContextRelayConfig | null;
};

export type GateDecision =
  | { kind: "skip"; result: ExecuteTargetResult }
  | {
      kind: "proceed";
      targetForAttempt: ResolvedComboTarget;
      profile: unknown;
      protectedPriorityTarget: boolean;
    };
