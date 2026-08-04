/**
 * Combo dispatch prelude — the branches `handleComboChat` evaluates BEFORE it
 * falls through to target resolution and the sequential attempt loop.
 *
 * Each `try*Dispatch` helper returns a `Response` when it owns the request, or
 * `null` to fall through to the next branch (and ultimately to the normal combo
 * machinery). The branches live here because none of them iterate targets in
 * priority order or need the failover/retry/credential-gate machinery that
 * follows — they either short-circuit to one model (context-cache pin), fan out
 * and synthesize (fusion), thread output → input (pipeline), or dispatch
 * pre-resolved runtime units (nested combo-refs in `execute` mode).
 *
 * Extracted from combo.ts as a pure move (#3501). No behaviour change.
 */
import { getCachedProviderConnections } from "../../../src/lib/db/readCache";
import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";
import { fisherYatesShuffle, getNextFromDeck } from "../../../src/shared/utils/shuffleDeck";
import { handleFusionChat, type FusionTuning } from "../fusion.ts";
import { parseModel } from "../model.ts";
import { handlePipelineChat, type PipelineStep } from "../pipeline.ts";
import type { resolveComboSetupConfig } from "../comboConfig.ts";
import { clampComboDepth, MAX_GLOBAL_ATTEMPTS, resolveDelayMs } from "./comboPredicates.ts";
import { resolveComboRuntimeUnits, resolveComboTargets } from "./comboStructure.ts";
import { buildFusionHandleSingleModel, extractFusionPanelSpec } from "./fusionPanel.ts";
import {
  clampStickyWeightedTargetLimit,
  getStickyRoundRobinStartIndex,
  getStickyWeightedExecutionKey,
  recordStickyRoundRobinSuccess,
  recordStickyWeightedSuccess,
  resolveComboStickyRoundRobinLimit,
  rrCounters,
} from "./rrState.ts";
import { executeRuntimeUnitCombo } from "./runtimeUnits.ts";
import {
  releaseQualityClone,
  releaseRejectedQualityResponse,
  validateResponseQuality,
} from "./validateQuality.ts";
import type {
  ComboCollectionLike,
  ComboLike,
  ComboLogger,
  ComboNestingContext,
  HandleComboChatOptions,
  HandleSingleModel,
  IsModelAvailable,
  NestedComboMode,
  ResolvedComboUnit,
  SingleModelTarget,
} from "./types.ts";

type ComboSetupConfig = ReturnType<typeof resolveComboSetupConfig>;
type RunCombo = (options: HandleComboChatOptions) => Promise<Response>;

/**
 * The subset of handleComboChat's own arguments that a recursing branch has to
 * hand back to it when it dispatches a nested combo-ref.
 */
type PreludeBaseOptionArgs = {
  body: Record<string, unknown>;
  combo: ComboLike;
  handleSingleModel: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  log: ComboLogger;
  settings?: Record<string, unknown> | null;
  allCombos?: ComboCollectionLike;
  relayOptions?: HandleComboChatOptions["relayOptions"];
  signal?: AbortSignal | null;
  apiKeyAllowedConnections?: string[] | null;
};

/** Rebuild handleComboChat's option bag verbatim for a recursive dispatch. */
function buildBaseOptions(a: PreludeBaseOptionArgs): HandleComboChatOptions {
  return {
    body: a.body,
    combo: a.combo,
    handleSingleModel: a.handleSingleModel,
    isModelAvailable: a.isModelAvailable,
    log: a.log,
    settings: a.settings,
    allCombos: a.allCombos,
    relayOptions: a.relayOptions,
    signal: a.signal,
    apiKeyAllowedConnections: a.apiKeyAllowedConnections,
  };
}

const TERMINAL_PIN_STATUSES = new Set(["credits_exhausted", "banned", "expired"]);

/**
 * Pure decision: should a context-cache pin be DROPPED because its provider has
 * DURABLY fallen? A ccp pin keeps the prompt cache warm by bypassing the combo
 * strategy — but if the pinned provider is dead (credits exhausted / banned /
 * expired, circuit-open, repeated failures, or a long rate-limit) honoring the
 * pin pounds a dead account forever with no failover (laila throttle + credits
 * incidents, 2026-06-22). A brief transient cooldown is tolerated (pin kept) so
 * an unstable provider does not churn the pin every turn. Connection-level
 * `backoffLevel` already resets on success, so `backoffLevel >= K` ≈ K
 * consecutive failures — no per-session counter needed.
 *
 * Returns true ⇒ drop the pin and use the strategy. Pure + unit-testable.
 */
export function pinIsDurablyUnhealthy(
  circuitState: string | undefined,
  connections: Array<{
    testStatus?: string | null;
    backoffLevel?: number | null;
    rateLimitedUntil?: string | null;
  }>,
  now: number,
  opts: { backoffLevel?: number; graceMs?: number } = {}
): boolean {
  if (circuitState === "OPEN") return true;
  if (!Array.isArray(connections) || connections.length === 0) return true;
  const backoffThreshold = opts.backoffLevel ?? Number(process.env.PIN_DROP_BACKOFF_LEVEL || "2");
  const graceMs = opts.graceMs ?? Number(process.env.PIN_DROP_GRACE_MS || "20000");
  // The pin survives as long as AT LEAST ONE connection is healthy or only
  // briefly cooling down — failover only when every connection is durably down.
  const anyUsable = connections.some((c) => {
    const status = typeof c.testStatus === "string" ? c.testStatus : "";
    if (TERMINAL_PIN_STATUSES.has(status)) return false;
    if (Number(c.backoffLevel ?? 0) >= backoffThreshold) return false;
    const rl = c.rateLimitedUntil ? new Date(String(c.rateLimitedUntil)).getTime() : 0;
    if (Number.isFinite(rl) && rl - now > graceMs) return false;
    return true;
  });
  return !anyUsable;
}

/**
 * Async wrapper: resolve the pinned model's provider, read its circuit state and
 * active connections, and decide via {@link pinIsDurablyUnhealthy}. Fail-open
 * (return false) on any error so a lookup bug never drops a healthy pin.
 */
async function isPinnedModelDurablyUnhealthy(pinnedModel: string): Promise<boolean> {
  try {
    const provider = parseModel(pinnedModel).provider;
    if (!provider) return false;
    const circuitState = getCircuitBreaker(provider)?.getStatus?.()?.state;
    const connections = (await getCachedProviderConnections({
      provider,
      isActive: true,
    })) as Array<{
      testStatus?: string | null;
      backoffLevel?: number | null;
      rateLimitedUntil?: string | null;
    }>;
    return pinIsDurablyUnhealthy(circuitState, connections || [], Date.now());
  } catch {
    return false;
  }
}

export function normalizeNestedComboMode(value: unknown): NestedComboMode {
  return value === "execute" ? "execute" : "flatten";
}

function buildDefaultNesting(
  nesting: ComboNestingContext | null | undefined,
  comboName: string,
  config: ComboSetupConfig
): ComboNestingContext {
  return (
    nesting || {
      depth: 0,
      maxDepth: clampComboDepth(config.maxComboDepth),
      visitedComboNames: [comboName],
      rootComboName: comboName,
      attemptBudget: { count: 0, limit: MAX_GLOBAL_ATTEMPTS },
    }
  );
}

/**
 * Decide whether the honored pin's response is good enough to return as-is.
 * Returns the response to serve it, or null to fall through to the combo
 * strategy (200-but-empty, or a transient upstream status worth failing over).
 */
async function evaluatePinnedResponse(args: {
  pinnedResult: Response;
  pinnedModel: string;
  clientRequestedStream: boolean;
  config: ComboSetupConfig;
  log: ComboLogger;
}): Promise<Response | null> {
  const { pinnedResult, pinnedModel, clientRequestedStream, config, log } = args;
  if (pinnedResult.ok) {
    let pinnedClone: Response;
    try {
      pinnedClone = pinnedResult.clone();
    } catch {
      pinnedClone = pinnedResult;
    }
    const pinnedQuality = await validateResponseQuality(
      pinnedClone,
      clientRequestedStream,
      log,
      config.responseValidation
    );
    releaseQualityClone(pinnedClone, pinnedResult, pinnedQuality);
    if (pinnedQuality.valid) return pinnedResult;
    releaseRejectedQualityResponse(pinnedClone, pinnedResult);
    log.warn(
      "COMBO",
      `Pinned model ${pinnedModel} returned 200 but failed quality check: ${pinnedQuality.reason}, falling through to combo retry/fallback`
    );
    return null;
  }
  const pinnedStatus = pinnedResult.status || 500;
  if (![408, 429, 500, 502, 503, 504].includes(pinnedStatus)) {
    return pinnedResult;
  }
  log.warn(
    "COMBO",
    `Pinned model ${pinnedModel} failed (${pinnedStatus}), falling through to combo retry/fallback`
  );
  return null;
}

/**
 * Context-cache pin routing (Fix #679). Returns the pinned model's response when
 * it is honored AND usable; returns null to fall through to the combo strategy.
 * Caller must only invoke this when a pin is present.
 */
export async function tryPinnedModelDispatch(args: {
  body: Record<string, unknown>;
  combo: ComboLike;
  pinnedModel: string;
  allCombos?: ComboCollectionLike;
  config: ComboSetupConfig;
  clientRequestedStream: boolean;
  handleSingleModelWithTimeout: HandleSingleModel;
  log: ComboLogger;
}): Promise<Response | null> {
  const {
    body,
    combo,
    pinnedModel,
    allCombos,
    config,
    clientRequestedStream,
    handleSingleModelWithTimeout,
    log,
  } = args;
  // The pin is read from session_model_history (a PRIOR turn) and may name a
  // model that has since been removed from this combo, or a provider whose
  // credentials are gone. Without this guard a stale pin bypasses the strategy
  // and routes to a dead model forever — incident 2026-06-21: cli-claude-heavy
  // pinned to a deepseek connection with no active credentials → instant fail,
  // never falling through to the live targets; and combos re-pointed Opus→Sonnet
  // kept serving the old model. Validate the pin is still reachable in THIS
  // combo's resolved targets (refs flattened) before honoring it. Only validate
  // when allCombos is authoritative (non-empty) so we can resolve combo-refs;
  // the auto-combo redirect path passes an empty list and keeps prior behavior.
  const haveFullCombos = Array.isArray(allCombos) ? allCombos.length > 0 : !!allCombos;
  const pinInCombo =
    !haveFullCombos ||
    resolveComboTargets(combo, allCombos, clampComboDepth(config.maxComboDepth)).some(
      (t) => t.modelStr === pinnedModel
    );
  // Honor the pin only if it is still a combo target AND its provider is not
  // DURABLY down. Without the health gate a pin keeps routing a session to a
  // dead/credits-exhausted/throttled account forever (strategy bypassed, no
  // failover) — incident 2026-06-22: laila stuck on a throttled claude account
  // and credits_exhausted accounts never failing over. A transient cooldown is
  // tolerated (pin kept) so an unstable provider does not churn the pin.
  const pinDurablyDown = pinInCombo ? await isPinnedModelDurablyUnhealthy(pinnedModel) : false;
  if (pinInCombo && !pinDurablyDown) {
    log.info(
      "COMBO",
      `Bypassing strategy — routing directly to pinned context model: ${pinnedModel}`
    );
    let pinnedResult: Response | null = null;
    try {
      pinnedResult = await handleSingleModelWithTimeout(body, pinnedModel, {
        modelPinned: true,
      } as SingleModelTarget);
    } catch (pinErr) {
      log.warn(
        "COMBO",
        `Pinned model ${pinnedModel} threw error: ${pinErr instanceof Error ? pinErr.message : String(pinErr)}, falling through to combo retry/fallback`
      );
    }
    if (pinnedResult) {
      const accepted = await evaluatePinnedResponse({
        pinnedResult,
        pinnedModel,
        clientRequestedStream,
        config,
        log,
      });
      if (accepted) return accepted;
    }
    // Fall through to the target iteration loop below — retries and sibling
    // models will be tried via the normal combo machinery.
  }
  log.warn(
    "COMBO",
    pinInCombo
      ? `Context-cache pin "${pinnedModel}" provider durably unhealthy — dropping pin, using strategy`
      : `Stale context-cache pin "${pinnedModel}" not in combo "${combo.name}" targets — dropping pin, using strategy`
  );
  // Fall through to the normal target iteration loop below — the pin is
  // dropped, so the combo strategy picks the best available target.
  return null;
}

/**
 * Fusion strategy: parallel panel + judge synthesis. Handled here because it
 * neither iterates targets in order nor needs the failover/retry/credential
 * gate machinery that follows — it fans out, then synthesizes once.
 *
 * Also emits the #6455 misconfiguration warning for non-fusion combos that set
 * fusion-only config keys. Returns null for every non-fusion strategy.
 */
export async function tryFusionDispatch(args: {
  body: Record<string, unknown>;
  combo: ComboLike;
  cfg: Record<string, unknown>;
  config: ComboSetupConfig;
  strategy: string;
  allCombos?: ComboCollectionLike;
  nesting?: ComboNestingContext | null;
  handleSingleModel: HandleSingleModel;
  handleSingleModelWithTimeout: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  log: ComboLogger;
  settings?: Record<string, unknown> | null;
  relayOptions?: HandleComboChatOptions["relayOptions"];
  signal?: AbortSignal | null;
  apiKeyAllowedConnections?: string[] | null;
  runCombo: RunCombo;
}): Promise<Response | null> {
  const { cfg, combo, config, strategy, log } = args;
  const judgeModel = typeof cfg.judgeModel === "string" ? cfg.judgeModel : undefined;
  const fusionTuning =
    cfg.fusionTuning && typeof cfg.fusionTuning === "object"
      ? (cfg.fusionTuning as FusionTuning)
      : undefined;
  if (strategy !== "fusion" && (judgeModel || fusionTuning)) {
    log.warn(
      "COMBO",
      `Combo "${combo.name}" sets config.judgeModel/fusionTuning but strategy is "${strategy}" — these fields are only consumed by the fusion strategy and will be ignored (#6455)`
    );
  }
  if (strategy !== "fusion") return null;

  const { panel: fusionModels, comboRefUnits } = extractFusionPanelSpec(
    combo.models || [],
    combo.name,
    args.allCombos
  );
  // Untyped like the existing `nestingContext` further down — `nesting` is
  // already `ComboNestingContext | null` per HandleComboChatOptions, no new
  // import needed.
  const fusionNesting = buildDefaultNesting(args.nesting, combo.name, config);
  const fusionHandleSingleModel =
    comboRefUnits.size > 0
      ? buildFusionHandleSingleModel({
          handleSingleModel: args.handleSingleModelWithTimeout,
          comboRefUnits,
          allCombos: args.allCombos,
          nesting: fusionNesting,
          baseOptions: buildBaseOptions(args),
          runCombo: args.runCombo,
        })
      : args.handleSingleModelWithTimeout;
  return handleFusionChat({
    body: args.body,
    models: fusionModels,
    handleSingleModel: fusionHandleSingleModel,
    log,
    comboName: combo.name,
    judgeModel,
    tuning: fusionTuning,
  });
}

/**
 * Pipeline strategy: sequential chain — each step's output feeds the next step's
 * input, only the final step's response is returned. Handled here because it
 * neither iterates targets as fallbacks nor needs the failover/retry machinery
 * below. The step list is `combo.models` (in order); an optional per-step
 * `prompt` is read off the target object (comboModelStepInputSchema.prompt).
 */
export async function tryPipelineDispatch(args: {
  body: Record<string, unknown>;
  combo: ComboLike;
  config: ComboSetupConfig;
  strategy: string;
  handleSingleModelWithTimeout: HandleSingleModel;
  log: ComboLogger;
}): Promise<Response | null> {
  const { body, combo, config, strategy, handleSingleModelWithTimeout, log } = args;
  if (strategy !== "pipeline") return null;
  const pipelineSteps = (combo.models || [])
    .map((m): PipelineStep | null => {
      if (typeof m === "string") return { model: m };
      if (m && typeof m === "object") {
        const obj = m as Record<string, unknown>;
        if (typeof obj.model === "string") {
          return {
            model: obj.model,
            prompt: typeof obj.prompt === "string" ? obj.prompt : undefined,
          };
        }
      }
      return null;
    })
    .filter((s): s is PipelineStep => Boolean(s));
  return handlePipelineChat({
    body,
    steps: pipelineSteps,
    handleSingleModel: handleSingleModelWithTimeout,
    log,
    comboName: combo.name,
    maxRetries: config.maxRetries ?? 0,
    retryDelayMs: resolveDelayMs(config.retryDelayMs, 1000),
  });
}

type RuntimeUnitOrdering = {
  units: ResolvedComboUnit[];
  executionStrategy: string;
  /** Non-null only for round-robin — drives the post-success sticky recording. */
  stickyLimit: number | null;
  stickyTargets: ResolvedComboUnit[];
};

/**
 * Apply the selection strategy to the resolved runtime units. Each strategy
 * reorders (never filters) the unit list so executeRuntimeUnitCombo can walk it
 * as a priority list, and round-robin additionally advances the shared rr
 * counter when stickiness is off.
 */
async function orderRuntimeUnits(args: {
  strategy: string;
  executeModeUnits: ResolvedComboUnit[];
  combo: ComboLike;
  config: ComboSetupConfig;
  settings?: Record<string, unknown> | null;
}): Promise<RuntimeUnitOrdering> {
  const { strategy, executeModeUnits, combo, config, settings } = args;
  let runtimeUnits = executeModeUnits;
  let unitExecutionStrategy = strategy;
  if (strategy === "weighted") {
    const stickyLimit = clampStickyWeightedTargetLimit(
      (config as Record<string, unknown>).stickyWeightedLimit
    );
    const stickyKey = getStickyWeightedExecutionKey(combo.name, stickyLimit);
    const stickyUnit = stickyKey
      ? runtimeUnits.find((unit) => unit.executionKey === stickyKey)
      : null;
    if (stickyUnit) {
      runtimeUnits = [
        stickyUnit,
        ...runtimeUnits.filter((unit) => unit.executionKey !== stickyUnit.executionKey),
      ];
      unitExecutionStrategy = "priority";
    }
  }
  if (strategy === "random") runtimeUnits = fisherYatesShuffle([...runtimeUnits]);
  if (strategy === "strict-random") {
    const key = await getNextFromDeck(
      `combo:${combo.name}`,
      runtimeUnits.map((unit) => unit.executionKey)
    );
    const selected = runtimeUnits.find((unit) => unit.executionKey === key) || runtimeUnits[0];
    runtimeUnits = [
      selected,
      ...runtimeUnits.filter((unit) => unit.executionKey !== selected.executionKey),
    ];
  }
  let runtimeStickyLimit: number | null = null;
  let runtimeStickyTargets: ResolvedComboUnit[] = runtimeUnits;
  if (strategy === "round-robin") {
    const perComboStickyLimit = (config as Record<string, unknown>).stickyRoundRobinLimit;
    runtimeStickyLimit = resolveComboStickyRoundRobinLimit(
      perComboStickyLimit,
      settings as Record<string, unknown> | null
    );
    const { startIndex, counter } = getStickyRoundRobinStartIndex(
      combo.name,
      runtimeUnits,
      runtimeStickyLimit
    );
    if (runtimeStickyLimit <= 1) rrCounters.set(combo.name, counter + 1);
    runtimeUnits = runtimeUnits.map(
      (_, offset) => runtimeUnits[(startIndex + offset) % runtimeUnits.length]
    );
    runtimeStickyTargets = executeModeUnits;
  }
  return {
    units: runtimeUnits,
    executionStrategy: unitExecutionStrategy,
    stickyLimit: runtimeStickyLimit,
    stickyTargets: runtimeStickyTargets,
  };
}

/**
 * Nested combo-ref dispatch in `execute` mode: when the combo references other
 * combos as black-box units AND the strategy is one of the simple selection
 * strategies, the units are ordered here and handed to executeRuntimeUnitCombo
 * instead of being flattened into the normal target list.
 *
 * Returns null when the combo has no executable combo-ref, when the mode is
 * `flatten`, or when the strategy needs the full target machinery.
 */
export async function tryRuntimeUnitDispatch(args: {
  body: Record<string, unknown>;
  combo: ComboLike;
  config: ComboSetupConfig;
  strategy: string;
  allCombos?: ComboCollectionLike;
  nesting?: ComboNestingContext | null;
  handleSingleModel: HandleSingleModel;
  handleSingleModelWithTimeout: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  log: ComboLogger;
  settings?: Record<string, unknown> | null;
  relayOptions?: HandleComboChatOptions["relayOptions"];
  signal?: AbortSignal | null;
  apiKeyAllowedConnections?: string[] | null;
  runCombo: RunCombo;
}): Promise<Response | null> {
  const { body, combo, config, strategy, allCombos, log, settings } = args;
  const nestingContext = buildDefaultNesting(args.nesting, combo.name, config);
  const nestedComboMode = normalizeNestedComboMode(config.nestedComboMode);

  const executeModeUnits =
    nestedComboMode === "execute" && allCombos
      ? resolveComboRuntimeUnits(combo, allCombos, "execute", nestingContext.maxDepth)
      : [];
  const hasExecutableComboRef = executeModeUnits.some((unit) => unit.kind === "combo-ref");
  const simpleExecuteStrategies = new Set([
    "priority",
    "round-robin",
    "random",
    "strict-random",
    "weighted",
    "fill-first",
  ]);

  if (!hasExecutableComboRef || !simpleExecuteStrategies.has(strategy)) return null;

  const ordering = await orderRuntimeUnits({
    strategy,
    executeModeUnits,
    combo,
    config,
    settings,
  });
  const {
    units: runtimeUnits,
    executionStrategy: unitExecutionStrategy,
    stickyLimit: runtimeStickyLimit,
    stickyTargets: runtimeStickyTargets,
  } = ordering;

  const execution = await executeRuntimeUnitCombo({
    body,
    combo,
    strategy: unitExecutionStrategy,
    effectiveComboStrategy: strategy,
    units: runtimeUnits,
    handleSingleModel: args.handleSingleModelWithTimeout,
    isModelAvailable: args.isModelAvailable,
    log,
    config,
    settings,
    allCombos,
    signal: args.signal,
    nesting: nestingContext,
    baseOptions: buildBaseOptions(args),
    runCombo: args.runCombo,
  });
  recordRuntimeUnitStickySuccess({
    strategy,
    combo,
    config,
    execution,
    stickyLimit: runtimeStickyLimit,
    stickyTargets: runtimeStickyTargets,
  });
  return execution.response;
}

/**
 * Pin the winning unit for the next request when the strategy is sticky-capable
 * and the dispatch actually succeeded. No-op for every other strategy.
 */
function recordRuntimeUnitStickySuccess(args: {
  strategy: string;
  combo: ComboLike;
  config: ComboSetupConfig;
  execution: { response: Response; unit: ResolvedComboUnit | null };
  stickyLimit: number | null;
  stickyTargets: ResolvedComboUnit[];
}): void {
  const { strategy, combo, config, execution, stickyLimit, stickyTargets } = args;
  if (strategy === "weighted" && execution.response.ok && execution.unit) {
    const weightedLimit = clampStickyWeightedTargetLimit(
      (config as Record<string, unknown>).stickyWeightedLimit
    );
    if (weightedLimit > 1)
      recordStickyWeightedSuccess(combo.name, execution.unit.executionKey, weightedLimit);
  }
  if (
    strategy === "round-robin" &&
    execution.response.ok &&
    execution.unit &&
    stickyLimit &&
    stickyLimit > 1
  ) {
    recordStickyRoundRobinSuccess(combo.name, execution.unit, stickyLimit, stickyTargets);
  }
}
