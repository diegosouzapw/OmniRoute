/**
 * Shared combo (model combo) handling with fallback support.
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, and context-relay strategies.
 *
 * Implementation split into sub-modules under ./chat/:
 *   - types.ts: Shared type definitions
 *   - routing.ts: Initialization, config resolution, and strategy ordering
 *   - auto.ts: Auto-strategy provider selection and ranking
 *   - executor.ts: Per-target execution logic
 *   - handler.ts: Main execution loop with fallback
 *   - timeout.ts: Per-model timeout wrapper
 */

import type { HandleComboChatOptions } from "./types.ts";
import type { ExecutionContext } from "./chat/types.ts";
import type { ComboRoutingResult } from "./chat/routing.ts";
import { handleComboRouting } from "./chat/routing.ts";
import { runExecutionLoop } from "./chat/handler.ts";
import { resolveComboConfig, getDefaultComboConfig } from "../comboConfig.ts";
import { resolveResilienceSettings } from "../../../src/lib/resilience/settings";
import { SKIP_UNIVERSAL_HANDOFF_FLAG } from "../contextHandoff.ts";

// Re-export all sub-modules so downstream callers can import from either path
export type {
  HandleComboChatOptions,
  SingleModelTarget,
  ResolvedComboTarget,
  PreScreenResult,
  ComboRetryAfter,
  ComboErrorBody,
  ComboLike,
  ComboLogger,
} from "./types.ts";
export type { ExecutionContext, MutableRef } from "./chat/types.ts";
export type { ComboRoutingResult } from "./chat/routing.ts";
export { handleComboRouting } from "./chat/routing.ts";
export { runExecutionLoop } from "./chat/handler.ts";
export { resolveStrategyOrdering } from "./chat/auto.ts";
export { createExecuteTarget } from "./chat/executor.ts";

/**
 * Handle combo chat with fallback.
 */
export async function handleComboChat(options: HandleComboChatOptions): Promise<Response> {
  const routingResult = await handleComboRouting(options);

  // Early return — e.g. combo-not-found, model-not-found, credential-gate skip
  if (routingResult instanceof Response) return routingResult;

  const { body, combo, log, settings } = options;

  const {
    strategy,
    config,
    resilienceSettings,
    universalHandoffConfig,
    relayConfig,
    orderedTargets,
    preScreenMap,
    handleSingleModelWithTimeout,
  } = routingResult;

  const relayOptions = options.relayOptions;
  const signal = options.signal ?? null;
  const isModelAvailable = options.isModelAvailable;

  // Derive config values that execution loop needs
  const resolvedConfig = settings
    ? resolveComboConfig(combo, settings)
    : { ...getDefaultComboConfig(), ...(combo.config || {}) };

  const maxRetries = (resolvedConfig.maxRetries as number) ?? 2;
  const maxSetRetries = (resolvedConfig.maxSetRetries as number) ?? 1;
  const fallbackDelayMs = (resolvedConfig.fallbackDelayMs as number) ?? 500;
  const setRetryDelayMs = (resolvedConfig.setRetryDelayMs as number) ?? 1000;
  const zeroLatencyOptimizationsEnabled = Boolean(resolvedConfig.zeroLatencyOptimizationsEnabled);
  const clientRequestedStream = body?.stream === true;

  // Build execution context
  const ctx: ExecutionContext = {
    // Mutable loop state (boxed)
    lastModel: { value: null },
    fallbackCount: { value: 0 },
    lastError: { value: null },
    lastStatus: { value: null },
    recordedAttempts: { value: 0 },
    earliestRetryAfter: { value: null },

    // Cross-set-iteration state
    globalAttempts: { value: 0 },
    startTime: Date.now(),
    abortControllers: new Map<number, AbortController>(),
    exhaustedProviders: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),

    // Targets & config
    orderedTargets,
    combo,
    body,
    strategy,
    maxRetries,
    maxSetRetries,
    setRetryDelayMs,
    fallbackDelayMs,
    config: resolvedConfig as Record<string, unknown>,
    resilienceSettings,
    universalHandoffConfig,
    relayConfig: relayConfig ?? null,
    relayOptions,
    clientRequestedStream,
    zeroLatencyOptimizationsEnabled,
    preScreenMap,
    handleSingleModelWithTimeout,
    isModelAvailable,
    log,
    signal,
  };

  return await runExecutionLoop(ctx);
}
