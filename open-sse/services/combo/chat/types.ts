/**
 * Shared types for the combo chat sub-modules.
 * Re-exports parent types and defines new interfaces specific to the split.
 */
export type {
  HandleComboChatOptions,
  SingleModelTarget,
  PreScreenResult,
  ComboRetryAfter,
  ComboErrorBody,
  ComboLike,
  ComboLogger,
  ComboCollectionLike,
  HandleSingleModel,
  IsModelAvailable,
} from "../types";

export type { ResolvedComboTarget } from "../types";

import type {
  HandleComboChatOptions,
  PreScreenResult,
  ComboRetryAfter,
  ResolvedComboTarget,
} from "../types";
import type { ResilienceSettings } from "../../../src/lib/resilience/settings";
import type { UniversalHandoffConfig, ContextRelayConfig } from "../contextHandoff.ts";
import type { HandleSingleModel, IsModelAvailable } from "../types";

/** A boxed mutable reference — both loop orchestrator and executeTarget share the same object. */
export type MutableRef<T> = { value: T };

/**
 * Context for the execution loop and executeTarget.
 *
 * Boxed fields (MutableRef) are mutated by executeTarget and observed by
 * the loop orchestrator. Plain fields are read-only within a set iteration.
 */
export interface ExecutionContext {
  // ── Mutable loop state (boxed for shared mutation) ──
  fallbackCount: MutableRef<number>;
  lastError: MutableRef<string | null>;
  lastStatus: MutableRef<number | null>;
  recordedAttempts: MutableRef<number>;
  earliestRetryAfter: MutableRef<ComboRetryAfter | null>;

  // ── Cross-set-iteration state ──
  globalAttempts: number;
  startTime: number;
  abortControllers: Map<number, AbortController>;
  exhaustedProviders: Set<string>;
  transientRateLimitedProviders: Set<string>;

  // ── Targets & config ──
  orderedTargets: ResolvedComboTarget[];
  combo: HandleComboChatOptions["combo"];
  body: HandleComboChatOptions["body"];
  strategy: string;
  maxRetries: number;
  maxSetRetries: number;
  setRetryDelayMs: number;
  fallbackDelayMs: number;
  config: Record<string, unknown>;
  resilienceSettings: ResilienceSettings;
  universalHandoffConfig: UniversalHandoffConfig;
  relayConfig: ContextRelayConfig | null;
  relayOptions: HandleComboChatOptions["relayOptions"];
  clientRequestedStream: boolean;
  zeroLatencyOptimizationsEnabled: boolean;
  preScreenMap: Map<string, PreScreenResult>;
  handleSingleModelWithTimeout: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  log: HandleComboChatOptions["log"];
  signal: AbortSignal | null;
}

/** Outcome of a single target execution attempt. */
export type TargetAttemptResult =
  | { ok: true; response: Response }
  | { ok: false; response: Response }
  | null;

export type StrategyOrderingOptions = {
  strategy: string;
  body: Record<string, unknown>;
  orderedTargets: ResolvedComboTarget[];
  combo: ComboLike;
  log: ComboLogger;
  config: Record<string, unknown>;
  settings?: Record<string, unknown> | null;
  allCombos?: ComboCollectionLike;
  handleSingleModel: HandleSingleModel;
  isModelAvailable: IsModelAvailable;
  apiKeyAllowedConnections?: string[] | null;
  relayOptions?: {
    sessionId?: string;
    config?: Record<string, unknown>;
    universalHandoffConfig?: Record<string, unknown>;
  };
};

export type StrategyOrderingResult = {
  orderedTargets: ResolvedComboTarget[];
  preScreenMap: Map<string, PreScreenResult>;
  registeredExecutionKeys: string[];
  earlyResponse?: Response;
};
