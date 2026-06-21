/**
 * Shared combo (model combo) types extracted from combo.ts.
 *
 * Pure type aliases / interfaces and the RESET_WINDOW_NAMES runtime constant.
 * Moving these out of the 5k-LOC combo.ts god-file (Quality Gate v2 / Fase 9)
 * — logic unchanged, re-exported from combo.ts for backward compatibility.
 */

import type { ProviderCandidate } from "../autoCombo/scoring.ts";

export const RESET_WINDOW_NAMES = ["weekly", "session", "monthly"] as const;

export type ComboRetryAfter = string | number | Date;

export type ComboErrorBody = {
  error?: { code?: string | null; message?: string | null } | string;
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
    })
  | { modelAbortSignal: AbortSignal };

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

export type HandleComboChatOptions = {
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
};

export type HandleRoundRobinOptions = Omit<
  HandleComboChatOptions,
  "relayOptions" | "apiKeyAllowedConnections"
>;

export type HistoricalLatencyStatsEntry = {
  totalRequests?: number;
  p95LatencyMs?: number;
  latencyStdDev?: number;
  successRate?: number;
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
};

export type ResolvedComboTarget = {
  kind: "model";
  stepId: string;
  executionKey: string;
  modelStr: string;
  provider: string;
  providerId: string | null;
  connectionId: string | null;
  allowedConnectionIds?: string[] | null;
  weight: number;
  label: string | null;
  failoverBeforeRetry?: unknown;
  trafficType?: "production" | "shadow";
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
};

export type ResolvedComboUnit = ResolvedComboTarget | ResolvedComboRefTarget;

export type ComboRuntimeStep = ResolvedComboUnit;
