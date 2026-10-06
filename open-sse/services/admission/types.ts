/**
 * Pure weighted adaptive admission-control types.
 * No route/settings wiring — dependency-injected controller seam only.
 */

/**
 * Upper bound for adaptation windows and wait deadlines that participate in
 * cost×time products (utilization integrals, deadline offsets).
 * 24h is far beyond practical control windows while keeping the product domain exact.
 */
export const MAX_ADMISSION_WINDOW_MS = 86_400_000;

/**
 * Upper bound for every validated cost, limit, and queue-cost quantum.
 * Derived so `MAX_ADMISSION_COST_OR_LIMIT * MAX_ADMISSION_WINDOW_MS` remains a
 * safe integer: a full window at the maximum limit integrates to utilization 1.0
 * without saturating or rounding Number arithmetic.
 */
export const MAX_ADMISSION_COST_OR_LIMIT = Math.floor(
  Number.MAX_SAFE_INTEGER / MAX_ADMISSION_WINDOW_MS
);

export type AdmissionMode = "off" | "shadow" | "enforce";

export type AdmissionPressure = "normal" | "high" | "critical";

/** Local outcome categories. Upstream business errors must not collapse capacity. */
export type AdmissionReleaseOutcome =
  "success" | "upstream_error" | "timeout" | "local_reject" | "cancelled";

export type AdmissionRejectCode =
  | "ADMISSION_OVERSIZED"
  | "ADMISSION_QUEUE_FULL"
  | "ADMISSION_DEADLINE"
  | "ADMISSION_ABORTED"
  | "ADMISSION_LANE_EVICTED"
  | "ADMISSION_SHUTDOWN"
  | "ADMISSION_UNAVAILABLE";

export type ShadowDecision = "would-admit" | "would-queue" | "would-reject";

export interface AdmissionCostFeatures {
  bodyBytes?: number | null;
  estimatedInputTokens?: number | null;
  messageCount?: number | null;
  toolCount?: number | null;
  requestedFanout?: number | null;
  streaming?: boolean | null;
}

export interface AdmissionCostConfig {
  baseCost: number;
  bodyBytesPerUnit: number;
  tokensPerUnit: number;
  messagesPerUnit: number;
  toolsPerUnit: number;
  fanoutPerUnit: number;
  streamingClassCost: number;
  nonStreamingClassCost: number;
  maxRequestCost: number;
}

export interface AdaptiveAdmissionConfig {
  mode?: AdmissionMode;
  minLimit: number;
  maxLimit: number;
  initialLimit: number;
  maxQueueCount: number;
  maxQueueCost: number;
  defaultMaxWaitMs?: number;
  windowMs?: number;
  shortLatencyAlpha?: number;
  longLatencyAlpha?: number;
  increaseStep?: number;
  decreaseFactor?: number;
  criticalDecreaseFactor?: number;
  highUtilizationThreshold?: number;
  lowUtilizationThreshold?: number;
  latencyGradientThreshold?: number;
  maxIncreasePerWindow?: number;
  /** Optional cost quanta override used only when callers pass features instead of cost. */
  cost?: Partial<AdmissionCostConfig>;
  /** Per-tenant virtual admission lanes (#9654). Default: false. */
  virtualLanes?: boolean;
}

export interface AdmissionRequest {
  /** Positive integer cost units. If omitted, `features` + cost config are used. */
  cost?: number;
  features?: AdmissionCostFeatures;
  /** Opaque fairness key; never exposed in snapshots. */
  tenantKey?: string;
  maxWaitMs?: number;
  signal?: AbortSignal;
  pressure?: AdmissionPressure;
}

/**
 * #9654 Wave 2: per-target fan-out admission probe used by combo / fusion
 * dispatchers. Returns true when the target may be dispatched, false when its
 * tenant's virtual lane is full and the target should be skipped.
 *
 * Contract: strictly non-blocking (maxWaitMs 0 — skip, never queue), a no-op
 * when virtual lanes are off (the parent request already holds the shared-queue
 * lease), and keyed to the parent's tenantKey so it gates the same lane.
 */
export type PerTargetAdmissionHook = (target: {
  modelStr: string;
  executionKey: string;
  body: unknown;
}) => Promise<boolean>;

export interface AdmissionReleaseMeta {
  latencyMs?: number;
  pressure?: AdmissionPressure;
}

export interface AdmissionLease {
  readonly id: string;
  readonly cost: number;
  readonly released: boolean;
  release(outcome?: AdmissionReleaseOutcome, meta?: AdmissionReleaseMeta): void;
}

export interface AdmissionAdmitted {
  status: "admitted";
  lease: AdmissionLease;
  shadowDecision?: ShadowDecision;
}

export interface AdmissionQueued {
  status: "queued";
  promise: Promise<AdmissionAdmitted>;
}

export interface AdmissionRejected {
  status: "rejected";
  code: AdmissionRejectCode;
  message: string;
  shadowDecision?: ShadowDecision;
}

export type AdmissionAcquireResult = AdmissionAdmitted | AdmissionQueued | AdmissionRejected;

export interface AdmissionSnapshot {
  mode: AdmissionMode;
  currentLimit: number;
  minLimit: number;
  maxLimit: number;
  activeCost: number;
  activeCount: number;
  queuedCost: number;
  queuedCount: number;
  virtualActiveCost: number;
  virtualActiveCount: number;
  virtualQueuedCost: number;
  virtualQueuedCount: number;
  /** True when per-tenant virtual lanes are enabled (#9654). */
  virtualLanes: boolean;
  /** Per-tenant virtual lane metrics (#9654). */
  laneCount: number;
  laneQueuedCost: number;
  laneQueuedCount: number;
  /** Per-tenant queue breakdown (opaque keys, never raw API keys). */
  laneTenants: ReadonlyArray<{
    tenantKey: string;
    queuedCount: number;
    queuedCost: number;
  }>;
  admittedCount: number;
  rejectedCount: number;
  wouldAdmitCount: number;
  wouldQueueCount: number;
  wouldRejectCount: number;
  shortLatencyEwma: number;
  longLatencyEwma: number;
  utilization: number;
  pressure: AdmissionPressure;
  shutdown: boolean;
}

export interface AdmissionClock {
  now: () => number;
  setTimer: (fn: () => void, delayMs: number) => unknown;
  clearTimer: (id: unknown) => void;
}

export interface AdmissionRejectError extends Error {
  code: AdmissionRejectCode;
  name: "AdmissionRejectError";
}

export function createAdmissionRejectError(
  code: AdmissionRejectCode,
  message: string
): AdmissionRejectError {
  const err = new Error(message) as AdmissionRejectError;
  err.name = "AdmissionRejectError";
  err.code = code;
  return err;
}
