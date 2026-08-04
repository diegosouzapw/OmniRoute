/**
 * resolveComboTargetPipeline — the target-resolution phase of handleComboChat (combo.ts).
 *
 * Sits between the dispatch prelude (pinned model / fusion / chaos / pipeline / nested
 * execute-mode / round-robin) and the attempt loop. It turns the raw combo definition
 * into the final `orderedTargets` array the attempt loop iterates, in this order:
 *
 *   1. provider-wildcard expansion of the combo + the combos collection (#2562)
 *   2. weighted step-group resolution + sticky-weighted eligibility
 *   3. request-tag routing
 *   4. known-context-overflow early return
 *   5. smart/pipeline-enabled dispatch (auto strategy)
 *   6. auto-strategy candidate build / scoring / ordering, or per-strategy ordering
 *   7. prompt-cache strategy affinity, session stickiness, eval scores,
 *      request compatibility, context requirements
 *   8. task-aware reordering
 *   9. prompt-cache affinity application
 *  10. the parallel pre-screen (priority strategy only)
 *
 * Behaviour is byte-identical to the inline block it replaces — the two early exits
 * (context overflow, pipeline dispatch, auto-strategy `earlyResponse`) become an
 * `{ earlyResponse }` result so the host decides to return them, and the values the
 * attempt loop still consumes (`orderedTargets`, `stickyWeightedLimit`,
 * `getWeightedStepKeyForTarget`, `sticky`, `preScreenMap`) are returned instead of
 * closed over.
 *
 * See _tasks/quality/2026-06-19-DESIGN-godfiles-decomposition.md §4.
 */
import { isModelLocked } from "../accountFallback.ts";
import { parseAutoPrefix } from "../autoCombo/autoPrefix.ts";
import { handlePipelineCombo, buildPipelineResponse } from "../autoCombo/pipelineRouter.ts";
import type { resolveComboSetupConfig } from "../comboConfig.ts";
import { orderTargetsByEvalScores } from "../evalRouting.ts";
import { parseModel } from "../model.ts";
import { isProviderInCooldown } from "../providerCooldownTracker.ts";
import {
  classifyTask,
  getConversationCacheKey,
  isTaskRoutingStrategy,
  reorderByTaskWeight,
} from "../taskAwareRouting.ts";
import { errorResponseWithComboDiagnostics } from "../../utils/error.ts";
import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";
import type { ResilienceSettings } from "../../../src/lib/resilience/settings";
import { applyStrategyOrdering } from "./applyStrategyOrdering.ts";
import { clampComboDepth } from "./comboPredicates.ts";
import {
  describeCapabilityFilterExhaustion,
  filterTargetsByRequestCompatibility,
  resolveComboTargets,
  resolveWeightedStepGroups,
  resolveWeightedTargets,
} from "./comboStructure.ts";
import { applyContextRequirements } from "./contextRequirements.ts";
import { recordComboFailure } from "./failureTracker.ts";
import { getKnownContextOverflow } from "./knownContextOverflow.ts";
import { buildEmptyComboTargetsPayload, buildRecoveryHint } from "./pinRecovery.ts";
import {
  applyPromptCacheAffinity,
  expandPromptCacheAffinityTargets,
  resolvePromptCacheAffinityKey,
  shouldProtectOriginalFirst,
} from "./promptCacheAffinity.ts";
import {
  expandProviderWildcardsInCombo,
  expandProviderWildcardsInCollection,
} from "./providerWildcard.ts";
import { preScreenTargets, type PreScreenResult } from "./quotaStrategies.ts";
import { resolveAutoStrategyOrder, type ResolveAutoStrategyDeps } from "./resolveAutoStrategy.ts";
import {
  MAX_RR_COUNTERS,
  clampStickyWeightedTargetLimit,
  getStickyWeightedExecutionKey,
  weightedStickyTargets,
} from "./rrState.ts";
import {
  applySessionStickiness,
  normalizeStickinessMessages,
  resolveDisableSessionStickiness,
  type ApplyStickinessResult,
} from "./sessionStickiness.ts";
import { applyRequestTagRouting } from "./autoStrategy.ts";
import type {
  ComboCollectionLike,
  ComboLike,
  ComboLogger,
  ComboRelayOptions,
  ComboRuntimeStep,
  HandleSingleModel,
  IsModelAvailable,
  ResolvedComboTarget,
} from "./types.ts";

export interface ResolveComboTargetPipelineDeps {
  body: Record<string, unknown>;
  combo: ComboLike;
  strategy: string;
  config: ReturnType<typeof resolveComboSetupConfig>;
  settings?: Record<string, unknown> | null;
  allCombos?: ComboCollectionLike;
  relayOptions?: ComboRelayOptions | null;
  signal?: AbortSignal | null;
  apiKeyAllowedConnections: string[] | null;
  log: ComboLogger;
  resilienceSettings: ResilienceSettings;
  isModelAvailable?: IsModelAvailable;
  /** handleSingleModel already wrapped by buildTargetTimeoutRunner. */
  handleSingleModelWithTimeout: HandleSingleModel;
  /**
   * Dependency-injected `buildAutoCandidates` — it lives in `combo.ts` (the host of
   * this leaf), so importing it directly would create an import cycle.
   */
  buildAutoCandidates: ResolveAutoStrategyDeps["buildAutoCandidates"];
}

export interface ResolvedComboTargetPipeline {
  orderedTargets: ResolvedComboTarget[];
  /** Sticky-weighted target limit — the attempt loop records sticky success with it. */
  stickyWeightedLimit: number;
  /** Maps an attempted target back to its weighted step key (sticky-weighted write-back). */
  getWeightedStepKeyForTarget: (target: ResolvedComboTarget) => string | null;
  /** Session-stickiness result — the attempt loop reads `.messageHash` on success/failure. */
  sticky: ApplyStickinessResult;
  preScreenMap: Map<string, PreScreenResult>;
}

export type ResolveComboTargetPipelineResult =
  { earlyResponse: Response } | ResolvedComboTargetPipeline;

type WeightedResolution = ReturnType<typeof resolveWeightedTargets> | null;

type WeightedStepGroups =
  Array<{ step: ComboRuntimeStep; targets: ResolvedComboTarget[] }> | undefined;

/**
 * Weighted-strategy eligibility predicate: a step counts as selectable only when at
 * least one of its targets clears the provider breaker, the connection cooldown, the
 * per-model lockout and the caller's availability probe.
 */
async function isTargetSelectableForWeighted(
  target: ResolvedComboTarget,
  resilienceSettings: ResilienceSettings,
  isModelAvailable?: IsModelAvailable
): Promise<boolean> {
  const rawModel = parseModel(target.modelStr).model || target.modelStr;
  if (target.provider && getCircuitBreaker(target.provider).getStatus().state === "OPEN")
    return false;
  if (
    resilienceSettings.providerCooldown.enabled &&
    Boolean(target.provider && target.provider !== "unknown") &&
    isProviderInCooldown(target.provider, target.connectionId ?? undefined, resilienceSettings)
  ) {
    return false;
  }
  if (
    target.provider &&
    rawModel &&
    isModelLocked(target.provider, target.connectionId || "", rawModel)
  ) {
    return false;
  }
  return isModelAvailable ? await isModelAvailable(target.modelStr, target) : true;
}

/**
 * #2562: Expand provider-wildcard steps (e.g. `fta/*`, `openai/gpt-4*`) into
 * concrete model entries sourced from the live synced-models catalog + registry.
 * Must run before any step-group / target resolution so that wildcard-originated
 * steps are treated identically to hand-authored entries by all downstream logic
 * (including the sticky-weighted eligibility pass below).
 */
async function expandComboWildcards(
  combo: ComboLike,
  allCombos: ComboCollectionLike
): Promise<{ expandedCombo: ComboLike; expandedAllCombos: ComboCollectionLike }> {
  const expandedCombo = await expandProviderWildcardsInCombo(combo);
  const expandedAllCombos = allCombos
    ? Array.isArray(allCombos)
      ? await expandProviderWildcardsInCollection(allCombos as ComboLike[])
      : {
          ...allCombos,
          combos: await expandProviderWildcardsInCollection(
            ((allCombos as { combos?: ComboLike[] }).combos || []) as ComboLike[]
          ),
        }
    : allCombos;
  return { expandedCombo, expandedAllCombos };
}

/** LRU-evict the oldest sticky-weighted entry once the counter map is at capacity. */
function evictOldestWeightedSticky(strategy: string, comboName: string): void {
  if (
    strategy === "weighted" &&
    !weightedStickyTargets.has(comboName) &&
    weightedStickyTargets.size >= MAX_RR_COUNTERS
  ) {
    const oldest = weightedStickyTargets.keys().next().value;
    if (oldest !== undefined) weightedStickyTargets.delete(oldest);
  }
}

/** Resolve the weighted step groups and the subset whose targets are still selectable. */
async function collectWeightedEligibility(
  expandedCombo: ComboLike,
  expandedAllCombos: ComboCollectionLike,
  resilienceSettings: ResilienceSettings,
  isModelAvailable?: IsModelAvailable
): Promise<{ stepGroups: WeightedStepGroups; weightedEligibleKeys: Set<string> }> {
  const weightedEligibleKeys = new Set<string>();
  const stepGroups = resolveWeightedStepGroups(expandedCombo, expandedAllCombos);
  for (const group of stepGroups) {
    const availability = await Promise.all(
      group.targets.map((target) =>
        isTargetSelectableForWeighted(target, resilienceSettings, isModelAvailable)
      )
    );
    if (availability.some(Boolean)) weightedEligibleKeys.add(group.step.executionKey);
  }
  return { stepGroups, weightedEligibleKeys };
}

/**
 * Honor the persisted sticky-weighted pin only while its step is still eligible;
 * drop the stored pin otherwise (and whenever stickiness is off for this combo).
 */
function resolveStickyWeightedKey(
  strategy: string,
  comboName: string,
  stickyWeightedLimit: number,
  weightedEligibleKeys: Set<string>
): string | null {
  const rawStickyWeightedKey =
    strategy === "weighted" ? getStickyWeightedExecutionKey(comboName, stickyWeightedLimit) : null;
  const stickyWeightedKey =
    rawStickyWeightedKey && weightedEligibleKeys.has(rawStickyWeightedKey)
      ? rawStickyWeightedKey
      : null;
  if (strategy !== "weighted" || stickyWeightedLimit <= 1) {
    weightedStickyTargets.delete(comboName);
  } else if (rawStickyWeightedKey && !stickyWeightedKey) {
    weightedStickyTargets.delete(comboName);
  }
  return stickyWeightedKey;
}

/** Full weighted-strategy resolution: eviction → eligibility → sticky pin → ordering. */
async function resolveWeightedSelection(
  deps: ResolveComboTargetPipelineDeps,
  expandedCombo: ComboLike,
  expandedAllCombos: ComboCollectionLike,
  stickyWeightedLimit: number
): Promise<{ weightedResolution: WeightedResolution; stickyWeightedKey: string | null }> {
  const { strategy } = deps;
  const comboName = deps.combo.name;
  evictOldestWeightedSticky(strategy, comboName);
  let stepGroups: WeightedStepGroups;
  let weightedEligibleKeys = new Set<string>();
  if (strategy === "weighted") {
    const eligibility = await collectWeightedEligibility(
      expandedCombo,
      expandedAllCombos,
      deps.resilienceSettings,
      deps.isModelAvailable
    );
    stepGroups = eligibility.stepGroups;
    weightedEligibleKeys = eligibility.weightedEligibleKeys;
  }
  const stickyWeightedKey = resolveStickyWeightedKey(
    strategy,
    comboName,
    stickyWeightedLimit,
    weightedEligibleKeys
  );
  const weightedResolution =
    strategy === "weighted"
      ? resolveWeightedTargets(
          expandedCombo,
          expandedAllCombos,
          stickyWeightedKey,
          weightedEligibleKeys,
          stepGroups
        )
      : null;
  return { weightedResolution, stickyWeightedKey };
}

/** Maps an attempted target back to the weighted step it came from (sticky write-back). */
function buildWeightedStepKeyMapper(
  weightedResolution: WeightedResolution
): (target: ResolvedComboTarget) => string | null {
  return (target: ResolvedComboTarget): string | null => {
    if (!weightedResolution?.orderedSteps) return null;
    const step = weightedResolution.orderedSteps.find(
      (entry) =>
        target.executionKey === entry.executionKey ||
        target.executionKey.startsWith(entry.executionKey + ">")
    );
    return step?.executionKey || null;
  };
}

/** 400 rejection for a request no target in the pool can physically accept. */
function buildContextOverflowResponse(
  overflow: { requiredContextTokens: number; maxKnownContextTokens: number },
  orderedTargets: ResolvedComboTarget[],
  log: ComboLogger
): Response {
  const { requiredContextTokens, maxKnownContextTokens } = overflow;
  log.warn(
    "COMBO",
    `Request context exceeds every known target limit (${requiredContextTokens} > ${maxKnownContextTokens} tokens)`
  );
  return errorResponseWithComboDiagnostics(
    400,
    `Request requires approximately ${requiredContextTokens} tokens, but the largest known context limit in this combo is ${maxKnownContextTokens} tokens. Reduce or compact the request context.`,
    {
      poolSize: orderedTargets.length,
      attempted: 0,
      excluded: orderedTargets.map((target) => ({
        provider: target.provider,
        model: target.modelStr,
        reason: "context_window",
      })),
      attemptOrder: [],
      terminalReason: "context_length_exceeded",
    },
    { code: "context_length_exceeded", type: "invalid_request_error" }
  );
}

function logTargetPoolSize(
  strategy: string,
  allCombos: ComboCollectionLike,
  orderedTargets: ResolvedComboTarget[],
  stickyWeightedKey: string | null,
  log: ComboLogger
): void {
  if (strategy === "weighted") {
    log.info(
      "COMBO",
      `Weighted selection${stickyWeightedKey ? " (sticky)" : ""}${allCombos ? " with nested resolution" : ""}: ${orderedTargets.length} total targets`
    );
  } else if (allCombos) {
    log.info("COMBO", `${strategy} with nested resolution: ${orderedTargets.length} total targets`);
  }
}

/**
 * Pipeline dispatch: route smart/pipeline-enabled combos through the multi-stage
 * pipeline. Returns the finished Response, or null to fall through to standard
 * auto routing (pipeline disabled, below token threshold, or dispatch failure).
 */
async function dispatchSmartPipeline(
  deps: ResolveComboTargetPipelineDeps
): Promise<Response | null> {
  const { body, combo, strategy, config, settings, signal, log } = deps;
  if (strategy !== "auto") return null;
  const autoParsed = parseAutoPrefix(combo.name);
  const autoVariant = autoParsed.valid ? autoParsed.variant : undefined;
  if (autoVariant !== "smart" && !config.pipeline_enabled) return null;
  try {
    const pipelineRaw = await handlePipelineCombo({
      body,
      combo,
      handleChatCore: deps.handleSingleModelWithTimeout,
      log: {
        info: log.info,
        warn: log.warn,
        error: log.error ?? log.warn,
      },
      settings: settings ?? {},
      signal: signal ?? undefined,
    });
    // handlePipelineCombo resolves to a PipelineResult (buffered text) or,
    // in the streaming-final-stage case, a Response. Callers downstream
    // (chat.ts → withSessionHeader) require a Response, so adapt the
    // PipelineResult here instead of leaking the raw object.
    return pipelineRaw instanceof Response ? pipelineRaw : buildPipelineResponse(pipelineRaw, body);
  } catch (pipelineErr) {
    logPipelineFallthrough(pipelineErr, log);
    return null;
  }
}

function logPipelineFallthrough(pipelineErr: unknown, log: ComboLogger): void {
  const pipelineMsg = pipelineErr instanceof Error ? pipelineErr.message : "";
  if (pipelineMsg === "PIPELINE_DISABLED") {
    log.info("COMBO", "Pipeline disabled, falling through to standard auto routing");
  } else if (pipelineMsg === "PIPELINE_TOKEN_THRESHOLD") {
    log.info(
      "COMBO",
      "Pipeline skipped (prompt below token threshold), falling through to standard auto routing"
    );
  } else {
    log.warn("COMBO", "Pipeline dispatch failed, falling through to standard auto routing", {
      err: pipelineErr,
    });
  }
}

/**
 * Strategy ordering: the `auto` router for auto combos, the per-strategy chain for
 * everything else. `autoUsedExplicitRouter` is the #4945 guard — when an explicit
 * router (lkgp/cost/…) pinned orderedTargets[0], task-aware reordering below must
 * refine only the fallback order, never override the router's primary choice.
 */
async function orderByStrategy(
  deps: ResolveComboTargetPipelineDeps,
  initialOrderedTargets: ResolvedComboTarget[]
): Promise<
  | { earlyResponse: Response }
  | { orderedTargets: ResolvedComboTarget[]; autoUsedExplicitRouter: boolean }
> {
  const { strategy, body, combo, settings, config, log } = deps;
  if (strategy === "auto") {
    const autoResult = await resolveAutoStrategyOrder({
      orderedTargets: initialOrderedTargets,
      body,
      combo,
      settings,
      config,
      relayOptions: deps.relayOptions,
      resilienceSettings: deps.resilienceSettings,
      log,
      buildAutoCandidates: deps.buildAutoCandidates,
    });
    if ("earlyResponse" in autoResult) return { earlyResponse: autoResult.earlyResponse };
    return {
      orderedTargets: autoResult.orderedTargets,
      autoUsedExplicitRouter: autoResult.autoUsedExplicitRouter,
    };
  }
  const orderedTargets = await applyStrategyOrdering(strategy, initialOrderedTargets, {
    combo,
    config,
    body,
    log,
    apiKeyAllowedConnections: deps.apiKeyAllowedConnections,
  });
  return { orderedTargets, autoUsedExplicitRouter: false };
}

/**
 * Continuity + eligibility filters: cache-strategy affinity, session stickiness,
 * eval-score ordering, request compatibility and per-combo context requirements.
 *
 * May return `{ earlyResponse }` when hard capability filters (#8488 / #8494) empty
 * the pool — tools / vision / structured_output fail closed as 400 capability_mismatch
 * unless `compatFilterFailOpen` is set on the combo config or settings.
 * Also returns `{ earlyResponse }` for #8786 when context requirements leave no
 * survivors (`context_requirements_exhausted`).
 */
async function applyContinuityFilters(
  deps: ResolveComboTargetPipelineDeps,
  initialOrderedTargets: ResolvedComboTarget[]
): Promise<
  | { orderedTargets: ResolvedComboTarget[]; sticky: ApplyStickinessResult }
  | { earlyResponse: Response }
> {
  const { strategy, body, combo, config, settings, log, relayOptions } = deps;
  // An explicit cache-optimized combo outranks the global cache-affinity default,
  // but only protects its ordering when this request actually produced a reusable
  // cache key. Cache misses retain the normal session/eval routing behavior.
  const cacheStrategyAffinityApplied =
    strategy === "cache-optimized" && applyPromptCacheAffinity(initialOrderedTargets, body).applied;
  // #6168: session stickiness opt-out. Per-combo `config.disableSessionStickiness`
  // overrides the global `settings.disableSessionStickiness` fallback (default false,
  // preserving the #3825 prompt-cache/504 fix). When disabled, skip the reorder and
  // treat the result as a no-op so the recordStickyBinding write-back below is skipped.
  const disableSessionStickiness =
    cacheStrategyAffinityApplied ||
    resolveDisableSessionStickiness(
      config as Record<string, unknown> | null | undefined,
      settings as Record<string, unknown> | null | undefined
    );
  const sticky: ApplyStickinessResult = disableSessionStickiness
    ? { targets: initialOrderedTargets, messageHash: null, stuck: false }
    : await applySessionStickiness(
        initialOrderedTargets,
        // #7270: normalize both wire shapes (.messages / Responses-API .input) so the
        // stickiness key is derivable on the /v1/responses surface, not just Chat Completions.
        normalizeStickinessMessages(body as { messages?: unknown; input?: unknown })
      );
  let orderedTargets = sticky.targets;
  if (!cacheStrategyAffinityApplied) {
    orderedTargets = orderTargetsByEvalScores(orderedTargets, config.evalRouting, log);
  }
  // #8488 / #8494: fail closed when hard capability filters empty the pool.
  // Opt-in escape hatch: combo.config.compatFilterFailOpen OR settings.compatFilterFailOpen.
  const compatFilterFailOpen =
    (config as { compatFilterFailOpen?: unknown }).compatFilterFailOpen === true ||
    (settings as { compatFilterFailOpen?: unknown } | null | undefined)?.compatFilterFailOpen ===
      true;
  const preCompatTargets = orderedTargets;
  orderedTargets = filterTargetsByRequestCompatibility(orderedTargets, body, log, undefined, {
    failOpen: compatFilterFailOpen,
  });
  if (orderedTargets.length === 0 && preCompatTargets.length > 0) {
    const exhaustion = describeCapabilityFilterExhaustion(preCompatTargets, body, combo.name);
    if (exhaustion) {
      // Match handleComboChat: only track failures under context-cache protection pins.
      const effectiveSessionId: string | null = combo.context_cache_protection
        ? (relayOptions?.sessionId ?? null)
        : null;
      recordComboFailure(effectiveSessionId, combo.name);
      return {
        earlyResponse: errorResponseWithComboDiagnostics(
          400,
          exhaustion.message,
          {
            poolSize: preCompatTargets.length,
            attempted: 0,
            excluded: exhaustion.excluded,
            attemptOrder: [],
            terminalReason: exhaustion.terminalReason,
            recovery: buildRecoveryHint("no_executable_targets"),
          },
          { code: "capability_mismatch", type: "invalid_request_error" }
        ),
      };
    }
  }
  // #8786: capture pre-filter pool so a strict/minContextWindow wipe can
  // surface context_requirements_exhausted instead of a generic 404.
  const preContextTargets = orderedTargets;
  orderedTargets = applyContextRequirements(orderedTargets, config.contextRequirements, log);
  if (orderedTargets.length === 0 && preContextTargets.length > 0) {
    const effectiveSessionId: string | null = combo.context_cache_protection
      ? (relayOptions?.sessionId ?? null)
      : null;
    recordComboFailure(effectiveSessionId, combo.name);
    const { message, diagnostics } = buildEmptyComboTargetsPayload(
      preContextTargets,
      config.contextRequirements?.minContextWindow
    );
    return {
      earlyResponse: errorResponseWithComboDiagnostics(404, message, diagnostics, {
        code: "model_not_found",
        type: "invalid_request_error",
      }),
    };
  }
  return { orderedTargets, sticky };
}

/**
 * Task-aware reordering: only active for strategies
 * ["smart","task","task-aware","task_aware","auto"]. Additive — does not affect any
 * of the other 15 strategies.
 */
function applyTaskAwareOrdering(
  deps: ResolveComboTargetPipelineDeps,
  orderedTargets: ResolvedComboTarget[],
  autoUsedExplicitRouter: boolean
): ResolvedComboTarget[] {
  const { strategy, body, log } = deps;
  if (!isTaskRoutingStrategy(strategy)) return orderedTargets;
  const task = classifyTask(body);
  const conversationCacheKey = getConversationCacheKey(body);
  const taskReordered = reorderByTaskWeight(orderedTargets, task);
  // #4945 regression guard: when an explicit auto router (lkgp/cost/…) pinned
  // orderedTargets[0], keep that primary choice and let task-aware refine only
  // the fallback tail — otherwise task weighting silently defeats the operator's
  // chosen LKGP/cost selection. reorderByTaskWeight returns the same target
  // objects (no clone), so identity filtering is safe.
  const pinnedFirst = autoUsedExplicitRouter ? orderedTargets[0] : undefined;
  const nextOrder = pinnedFirst
    ? [pinnedFirst, ...taskReordered.filter((t) => t !== pinnedFirst)]
    : taskReordered;
  if (nextOrder[0]?.modelStr !== orderedTargets[0]?.modelStr) {
    const reasons =
      Array.isArray(task.reasons) && task.reasons.length > 0 ? ` (${task.reasons.join(",")})` : "";
    log.info(
      "COMBO",
      `task-route task=${task.level}${reasons} cacheKey=${conversationCacheKey ?? "none"} → ${nextOrder[0]?.modelStr}`
    );
  }
  return nextOrder;
}

/**
 * Prompt-cache affinity is skipped when the auto scorer already weights cacheAffinity
 * itself — otherwise the same signal would be applied twice.
 */
function isPromptCacheAffinityEnabled(
  strategy: string,
  combo: ComboLike,
  config: ReturnType<typeof resolveComboSetupConfig>,
  settings?: Record<string, unknown> | null
): boolean {
  const autoConfigForCacheWeight =
    strategy === "auto"
      ? ((combo.autoConfig ||
          ((config as Record<string, unknown>).auto &&
          typeof (config as Record<string, unknown>).auto === "object"
            ? (config as Record<string, unknown>).auto
            : null) ||
          config) as Record<string, unknown>)
      : null;
  const autoWeightsForCache =
    autoConfigForCacheWeight?.weights && typeof autoConfigForCacheWeight.weights === "object"
      ? (autoConfigForCacheWeight.weights as Record<string, unknown>)
      : null;
  const autoUsesCacheScore = Number(autoWeightsForCache?.cacheAffinity) > 0;
  return settings?.promptCacheAffinityEnabled !== false && !autoUsesCacheScore;
}

/**
 * Keep the stronger continuity decision (session pin / explicit auto-router pin) at
 * the head of the cache-affinity ordering rather than letting affinity override it.
 */
function protectFirstTarget(
  affinityTargets: ResolvedComboTarget[],
  protectedOriginal: ResolvedComboTarget | false | undefined
): ResolvedComboTarget[] {
  const protectedFirst = protectedOriginal
    ? (affinityTargets.find(
        (target) =>
          target === protectedOriginal ||
          target.executionKey === protectedOriginal.executionKey ||
          target.executionKey.startsWith(`${protectedOriginal.executionKey}@`)
      ) ?? protectedOriginal)
    : null;
  return protectedFirst
    ? [protectedFirst, ...affinityTargets.filter((target) => target !== protectedFirst)]
    : affinityTargets;
}

/**
 * Prompt-cache locality is applied after request eligibility and task routing.
 * Session stickiness and explicit auto-router pins remain stronger continuity
 * decisions; quota, health, and circuit-breaker gates still run per attempt.
 */
async function applyPromptCacheStage(
  deps: ResolveComboTargetPipelineDeps,
  orderedTargets: ResolvedComboTarget[],
  stickyStuck: boolean,
  autoUsedExplicitRouter: boolean
): Promise<ResolvedComboTarget[]> {
  const { strategy, body, combo, config, settings, log } = deps;
  const promptCacheAffinityEnabled = isPromptCacheAffinityEnabled(
    strategy,
    combo,
    config,
    settings
  );
  const promptCacheAffinityTargets =
    promptCacheAffinityEnabled && resolvePromptCacheAffinityKey(body)
      ? await expandPromptCacheAffinityTargets(orderedTargets)
      : orderedTargets;
  const promptCacheAffinity = applyPromptCacheAffinity(
    promptCacheAffinityTargets,
    body,
    promptCacheAffinityEnabled
  );
  if (!promptCacheAffinity.applied) return orderedTargets;
  const protectedOriginal =
    shouldProtectOriginalFirst(stickyStuck, autoUsedExplicitRouter, strategy) && orderedTargets[0];
  const nextTargets = protectFirstTarget(promptCacheAffinity.targets, protectedOriginal);
  log.debug?.("COMBO", "Prompt-cache affinity applied", {
    source: promptCacheAffinity.source,
    fingerprint: promptCacheAffinity.fingerprint,
    targetCount: nextTargets.length,
  });
  return nextTargets;
}

export async function resolveComboTargetPipeline(
  deps: ResolveComboTargetPipelineDeps
): Promise<ResolveComboTargetPipelineResult> {
  const { body, combo, strategy, config, allCombos, log, isModelAvailable } = deps;

  const { expandedCombo, expandedAllCombos } = await expandComboWildcards(combo, allCombos);
  const stickyWeightedLimit = clampStickyWeightedTargetLimit(
    (config as Record<string, unknown>).stickyWeightedLimit
  );
  const { weightedResolution, stickyWeightedKey } = await resolveWeightedSelection(
    deps,
    expandedCombo,
    expandedAllCombos,
    stickyWeightedLimit
  );
  const getWeightedStepKeyForTarget = buildWeightedStepKeyMapper(weightedResolution);
  let orderedTargets =
    strategy === "weighted"
      ? weightedResolution?.orderedTargets || []
      : resolveComboTargets(
          expandedCombo,
          expandedAllCombos,
          clampComboDepth(config.maxComboDepth)
        );

  orderedTargets = await applyRequestTagRouting(orderedTargets, body, log);

  const overflow = getKnownContextOverflow(orderedTargets, body);
  if (overflow) {
    return { earlyResponse: buildContextOverflowResponse(overflow, orderedTargets, log) };
  }

  logTargetPoolSize(strategy, allCombos, orderedTargets, stickyWeightedKey, log);

  const pipelineResponse = await dispatchSmartPipeline(deps);
  if (pipelineResponse) return { earlyResponse: pipelineResponse };

  const ordering = await orderByStrategy(deps, orderedTargets);
  if ("earlyResponse" in ordering) return ordering;
  const { autoUsedExplicitRouter } = ordering;

  const continuity = await applyContinuityFilters(deps, ordering.orderedTargets);
  if ("earlyResponse" in continuity) return continuity;
  orderedTargets = applyTaskAwareOrdering(deps, continuity.orderedTargets, autoUsedExplicitRouter);
  orderedTargets = await applyPromptCacheStage(
    deps,
    orderedTargets,
    continuity.sticky.stuck,
    autoUsedExplicitRouter
  );

  // Parallel pre-screen: check provider profiles and model availability for all targets
  // Only runs for priority strategy where sequential checking causes latency
  const preScreenMap =
    strategy === "priority"
      ? await preScreenTargets(orderedTargets, isModelAvailable).catch(
          () => new Map<string, PreScreenResult>()
        )
      : new Map<string, PreScreenResult>();

  return {
    orderedTargets,
    stickyWeightedLimit,
    getWeightedStepKeyForTarget,
    sticky: continuity.sticky,
    preScreenMap,
  };
}
