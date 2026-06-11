/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, and context-relay strategies
 */

import {
  checkFallbackError,
  classifyErrorText,
  formatRetryAfter,
  getRuntimeProviderProfile,
  recordProviderFailure,
  isProviderFailureCode,
  isProviderExhaustedReason,
  type ProviderProfile,
} from "../accountFallback.ts";

import { FETCH_TIMEOUT_MS, RateLimitReason } from "../../config/constants.ts";

import { errorResponse, unavailableResponse } from "../../utils/error.ts";

import { clamp01 } from "../../utils/number.ts";

import { parseModel } from "../model.ts";

import {
  calculateFactors,
  calculateScore,
  DEFAULT_WEIGHTS,
  type ProviderCandidate,
  type ScoringWeights,
} from "../autoCombo/scoring.ts";

import { getProviderModels } from "../../config/providerModels.ts";

import {
  getComboModelString,
  getComboStepTarget,
  getComboStepWeight,
  normalizeComboStep,
} from "../../../src/lib/combos/steps.ts";

import {
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../../src/lib/resilience/settings";

import { resolveResetWindowConfig } from "./quota.ts";
import { QUOTA_SOFT_DEPRIORITIZE_FACTOR } from "./constants.ts";

export const RESET_WINDOW_NAMES = ["weekly", "session", "monthly"] as const;

export type ResetWindowName = (typeof RESET_WINDOW_NAMES)[number];

export type QuotaFetchCacheConfig = {
  quotaCacheTtlMs: number;
  quotaCacheMaxStaleMs: number;
};

export type ResetWindowConfig = ReturnType<typeof resolveResetWindowConfig>;

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

type ComboRelayOptions = {
  sessionId?: string | null;
  config?: Record<string, unknown> | null;
  [key: string]: unknown;
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

export type ComboRuntimeStep =
  | ResolvedComboTarget
  | {
      kind: "combo-ref";
      stepId: string;
      executionKey: string;
      comboName: string;
      weight: number;
      label: string | null;
    };

export type RequestCompatibilityRequirements = {
  requiresTools: boolean;
  requiresVision: boolean;
  requiresStructuredOutput: boolean;
  estimatedInputTokens: number;
  requestedOutputTokens: number;
  requiredContextTokens: number;
};

export type PreScreenResult = { profile: ProviderProfile | null; available: boolean };
