/**
 * Strategy ordering logic extracted from handleComboChat (lines 397-762).
 * Covers auto, lkgp, strict-random, random, fill-first, p2c, least-used,
 * cost-optimized, reset-aware, reset-window, and context-optimized strategies,
 * plus eval-score ordering, request-compatibility filtering, pre-screen,
 * and shadow-routing scheduling.
 */

import { DEFAULT_WEIGHTS, type ScoringWeights } from "../../autoCombo/scoring.ts";
import { selectProvider as selectAutoProvider } from "../../autoCombo/engine.ts";
import {
  selectWithStrategy,
  type SlaRoutingPolicy,
} from "../../autoCombo/routerStrategy.ts";
import { supportsToolCalling } from "../../modelCapabilities.ts";
import { estimateTokens } from "../../contextManager.ts";
import { classifyWithConfig } from "../../intentClassifier.ts";
import { recordComboIntent } from "../../comboMetrics.ts";
import {
  extractPromptForIntent,
  getIntentConfig,
  mapIntentToTaskType,
  filterTargetsByRequestCompatibility,
} from "../../context.ts";
import { isRecord } from "../../utils.ts";
import {
  resolveResetWindowConfig,
  resolveSlaRoutingPolicy,
  orderTargetsByResetAwareQuota,
  orderTargetsByResetWindow,
  preScreenTargets,
} from "../../quota.ts";
import { _registerExecutionCandidates } from "../../state.ts";
import { dedupeTargetsByExecutionKey } from "../../dag.ts";
import {
  scheduleShadowRouting,
  resolveShadowTargets,
} from "../../shadow.ts";
import { orderTargetsByEvalScores } from "../../evalRouting.ts";
import { generateRoutingHints } from "../../manifestAdapter";
import {
  expandAutoComboCandidatePool,
  buildAutoCandidates,
  scoreAutoTargets,
} from "../../auto.ts";
import { parseModel } from "../../model.ts";
import {
  getModelContextLimitForModelString,
  orderTargetsByPowerOfTwoChoices,
  sortTargetsByUsage,
  sortTargetsByCost,
  sortTargetsByContextSize,
} from "../../sorting.ts";
import {
  fisherYatesShuffle,
  getNextFromDeck,
} from "../../../../src/shared/utils/shuffleDeck";
import {
  comboModelNotFoundResponse,
} from "../../constants.ts";
import type {
  ResolvedComboTarget,
  PreScreenResult,
  StrategyOrderingOptions,
  StrategyOrderingResult,
} from "./types.ts";

// Static import for LKGP — cannot use dynamic import per project rules.
// The module exists in all environments (localDb is always bundled).
import { getLKGP } from "../../../../src/lib/localDb";

/**
 * Resolve target ordering based on the combo's routing strategy.
 * Mutates and reorders targets; returns the final ordered list along
 * with pre-screen results and registered execution keys.
 */
export async function resolveStrategyOrdering(
  opts: StrategyOrderingOptions
): Promise<StrategyOrderingResult> {
  const {
    strategy,
    body,
    combo,
    log,
    config,
    settings,
    allCombos,
    handleSingleModel,
    isModelAvailable,
    apiKeyAllowedConnections,
    relayOptions,
  } = opts;

  let orderedTargets: ResolvedComboTarget[] = [...opts.orderedTargets];

  if (strategy === "auto") {
    const requestHasTools =
      Array.isArray(body?.tools) && (body.tools as unknown[]).length > 0;
    let eligibleTargets = [...orderedTargets];

    if (requestHasTools) {
      const filtered = eligibleTargets.filter((target) =>
        supportsToolCalling(target.modelStr)
      );
      if (filtered.length > 0) {
        eligibleTargets = filtered;
      } else {
        log.warn(
          "COMBO",
          "Auto strategy: all candidates filtered by tool-calling policy, falling back to full pool"
        );
      }
    }

    // Context-window pre-filter (#1808)
    // Estimate input tokens once; exclude candidates whose known context limit is too small.
    // Uses the same 4-chars-per-token heuristic as contextManager.ts::compressContext().
    // Null/unknown limits are treated as "include" to avoid incorrectly dropping valid targets.
    const requestMessages = body.messages;
    const estimatedInputTokens = estimateTokens(
      typeof requestMessages === "string" ||
        (requestMessages !== null && typeof requestMessages === "object")
        ? (requestMessages as string | unknown[])
        : []
    );
    if (estimatedInputTokens > 0) {
      const filteredByContext = eligibleTargets.filter((target) => {
        const limit = getModelContextLimitForModelString(target.modelStr);
        if (limit === null || limit === undefined) return true; // unknown — include to be safe
        return limit >= estimatedInputTokens;
      });
      if (filteredByContext.length > 0) {
        log.debug?.(
          "COMBO",
          `Auto strategy: context-window filter kept ${filteredByContext.length}/${eligibleTargets.length} candidates (est. ${estimatedInputTokens} tokens)`
        );
        eligibleTargets = filteredByContext;
      } else {
        log.warn(
          "COMBO",
          `Auto strategy: all candidates filtered by context-window policy (est. ${estimatedInputTokens} tokens), falling back to full pool`
        );
        // eligibleTargets intentionally unchanged — same fallback contract as tool-calling filter
      }

      eligibleTargets = await expandAutoComboCandidatePool(
        eligibleTargets,
        combo
      );
    }

    const prompt = extractPromptForIntent(body);
    const systemPrompt =
      typeof combo?.system_message === "string"
        ? combo.system_message
        : undefined;
    const intentConfig = getIntentConfig(settings, combo);
    const intent = classifyWithConfig(prompt, intentConfig, systemPrompt);
    recordComboIntent(combo.name, intent);
    const taskType = mapIntentToTaskType(intent);

    const rawAutoConfigSource =
      combo?.autoConfig ||
      (isRecord(combo?.config?.auto)
        ? (combo.config as Record<string, unknown>).auto
        : null) ||
      combo?.config ||
      {};
    const autoConfigSource: Record<string, unknown> = isRecord(
      rawAutoConfigSource
    )
      ? rawAutoConfigSource
      : {};
    const routingStrategy =
      typeof autoConfigSource.routerStrategy === "string"
        ? autoConfigSource.routerStrategy
        : typeof autoConfigSource.routingStrategy === "string"
          ? autoConfigSource.routingStrategy
          : typeof autoConfigSource.strategyName === "string"
            ? autoConfigSource.strategyName
            : "rules";

    const candidatePool = Array.isArray(autoConfigSource.candidatePool)
      ? autoConfigSource.candidatePool
      : [
          ...new Set(
            eligibleTargets.map((target) => target.provider)
          ),
        ];

    const weights =
      autoConfigSource.weights &&
      typeof autoConfigSource.weights === "object"
        ? (autoConfigSource.weights as ScoringWeights)
        : DEFAULT_WEIGHTS;
    const explorationRate = Number.isFinite(
      Number(autoConfigSource.explorationRate)
    )
      ? Number(autoConfigSource.explorationRate)
      : 0.05;
    const budgetCap = Number.isFinite(Number(autoConfigSource.budgetCap))
      ? Number(autoConfigSource.budgetCap)
      : undefined;
    const modePack =
      typeof autoConfigSource.modePack === "string"
        ? autoConfigSource.modePack
        : undefined;
    const resetWindowConfig = resolveResetWindowConfig(autoConfigSource);
    const slaPolicy = resolveSlaRoutingPolicy(autoConfigSource);

    let lastKnownGoodProvider: string | undefined;
    try {
      const lkgp = await getLKGP(combo.name, combo.id || combo.name);
      if (lkgp) lastKnownGoodProvider = lkgp.provider;
    } catch (err) {
      log.warn(
        "COMBO",
        "Failed to retrieve Last Known Good Provider. This is non-fatal.",
        { err }
      );
    }

    const candidates = await buildAutoCandidates(
      eligibleTargets,
      combo.name,
      relayOptions?.sessionId,
      resetWindowConfig
    );
    // G2: Register candidates so chatCore can mark quotaSoftPenalty via setCandidateQuotaSoftPenalty.
    _registerExecutionCandidates(candidates);
    if (candidates.length > 0) {
      let selectedProvider: string | null = null;
      let selectedModel: string | null = null;
      let selectionReason = "";

      if (routingStrategy !== "rules") {
        try {
          const decision = selectWithStrategy(
            candidates,
            {
              taskType,
              requestHasTools,
              lastKnownGoodProvider,
              estimatedInputTokens,
              sla: slaPolicy,
            },
            routingStrategy
          );
          selectedProvider = decision.provider;
          selectedModel = decision.model;
          selectionReason = decision.reason;
        } catch (err) {
          log.warn(
            "COMBO",
            `Auto strategy '${routingStrategy}' failed (${(err as Error)?.message || "unknown"}), falling back to rules`
          );
        }
      }

      if (!selectedProvider || !selectedModel) {
        const selection = selectAutoProvider(
          {
            id: combo.id || combo.name,
            name: combo.name,
            type: "auto",
            candidatePool,
            weights,
            modePack,
            budgetCap,
            explorationRate,
          },
          candidates,
          taskType
        );
        selectedProvider = selection.provider;
        selectedModel = selection.model;
        selectionReason = `score=${selection.score.toFixed(3)}${selection.isExploration ? " (exploration)" : ""}`;
      }

      const scoredTargets = scoreAutoTargets(
        eligibleTargets,
        candidates,
        taskType,
        weights
      );
      const rankedTargets = scoredTargets.map((entry) => entry.target);
      const selectedTarget =
        scoredTargets.find((entry) => {
          const parsed = parseModel(entry.target.modelStr);
          const modelId = parsed.model || entry.target.modelStr;
          return (
            entry.target.provider === selectedProvider &&
            modelId === selectedModel
          );
        })?.target ||
        rankedTargets[0] ||
        eligibleTargets[0];

      orderedTargets = dedupeTargetsByExecutionKey(
        [selectedTarget, ...rankedTargets, ...eligibleTargets].filter(
          (entry): entry is ResolvedComboTarget =>
            entry !== undefined && entry !== null
        )
      );

      log.info(
        "COMBO",
        `Auto selection: ${selectedTarget?.modelStr || `${selectedProvider}/${selectedModel}`} | intent=${intent} task=${taskType} | strategy=${routingStrategy} | ${selectionReason}`
      );
    } else {
      log.warn(
        "COMBO",
        "Auto strategy has no candidates, keeping default ordering"
      );
    }
  } else if (strategy === "lkgp") {
    try {
      const lkgpProvider = await getLKGP(
        combo.name,
        combo.id || combo.name
      );

      if (lkgpProvider) {
        const lkgpRecord = lkgpProvider;
        const providerName = lkgpRecord.provider;
        const connId = lkgpRecord.connectionId;

        let lkgpIndex = -1;
        if (connId) {
          lkgpIndex = orderedTargets.findIndex(
            (target) =>
              target.provider === providerName &&
              target.connectionId === connId
          );
        }
        if (lkgpIndex < 0) {
          lkgpIndex = orderedTargets.findIndex(
            (target) =>
              target.provider === providerName ||
              // Issue #2359: Defensive guard. The `target.modelStr` type
              // annotation is `string`, but malformed combo entries (e.g.,
              // local-provider rows whose `modelStr` failed to resolve when
              // the executor catalogue was being rebuilt) have leaked
              // through and surfaced as `e.startsWith is not a function`
              // 500s on combo test/dispatch. The fast path stays
              // unchanged for the common case; this only avoids the
              // crash when the field is unexpectedly non-string.
              (typeof target.modelStr === "string" &&
                target.modelStr.startsWith(`${providerName}/`))
          );
        }

        if (lkgpIndex > 0) {
          const [lkgpTarget] = orderedTargets.splice(lkgpIndex, 1);
          orderedTargets.unshift(lkgpTarget);
          log.info(
            "COMBO",
            `[LKGP] Prioritizing last known good provider ${providerName}${connId ? ` (account ${connId})` : ""} for combo "${combo.name}"`
          );
        } else if (lkgpIndex === 0) {
          log.debug?.(
            "COMBO",
            `[LKGP] Last known good provider ${providerName}${connId ? ` (account ${connId})` : ""} already first for combo "${combo.name}"`
          );
        }
      }
    } catch (err) {
      log.warn(
        "COMBO",
        "Failed to retrieve Last Known Good Provider. This is non-fatal.",
        { err }
      );
    }
  } else if (strategy === "strict-random") {
    const selectedExecutionKey = await getNextFromDeck(
      `combo:${combo.name}`,
      orderedTargets.map((target) => target.executionKey)
    );
    const selectedTarget =
      orderedTargets.find(
        (target) => target.executionKey === selectedExecutionKey
      ) || null;
    const rest = orderedTargets.filter(
      (target) => target.executionKey !== selectedExecutionKey
    );
    orderedTargets = [selectedTarget, ...rest].filter(
      (target): target is ResolvedComboTarget => target !== null
    );
    log.info(
      "COMBO",
      `Strict-random deck: ${selectedExecutionKey} selected (${orderedTargets.length} targets)`
    );
  } else if (strategy === "random") {
    orderedTargets = fisherYatesShuffle([...orderedTargets]);
    log.info(
      "COMBO",
      `Random shuffle: ${orderedTargets.length} targets`
    );
  } else if (strategy === "fill-first") {
    log.info(
      "COMBO",
      `Fill-first ordering: preserving priority order (${orderedTargets.length} targets)`
    );
  } else if (strategy === "p2c") {
    orderedTargets = orderTargetsByPowerOfTwoChoices(
      orderedTargets,
      combo.name
    );
    log.info(
      "COMBO",
      `Power-of-two-choices ordering: selected ${orderedTargets[0]?.modelStr}`
    );
  } else if (strategy === "least-used") {
    orderedTargets = sortTargetsByUsage(orderedTargets, combo.name);
    log.info(
      "COMBO",
      `Least-used ordering: ${orderedTargets[0]?.modelStr} has fewest requests`
    );
  } else if (strategy === "cost-optimized") {
    orderedTargets = await sortTargetsByCost(orderedTargets);
    if (config.manifestRouting === true) {
      try {
        const manifestHint = generateRoutingHints(
          orderedTargets.filter((t) => t.kind === "model"),
          {
            messages: Array.isArray(body?.messages)
              ? (body.messages as Array<{
                  role?: string;
                  content?: string | unknown;
                }>)
              : [],
            tools: Array.isArray(body?.tools)
              ? (body.tools as Array<{
                  function?: {
                    name: string;
                    description?: string;
                    parameters?: unknown;
                  };
                }>)
              : undefined,
            model:
              typeof body?.model === "string" ? body.model : undefined,
          }
        );
        if (manifestHint.strategyModifier === "require-premium") {
          const eligible = orderedTargets.filter(
            (t) =>
              t.kind !== "model" ||
              manifestHint.eligibleTargets.some(
                (e) =>
                  e.provider === t.provider &&
                  e.modelStr === t.modelStr
              )
          );
          if (eligible.length > 0) orderedTargets = eligible;
        }
        log.debug?.(
          {
            strategyModifier: manifestHint.strategyModifier,
            specificityLevel: manifestHint.specificityLevel,
            score: manifestHint.specificity.score,
          },
          "manifest routing applied"
        );
      } catch (err) {
        log.warn(
          { err },
          "manifest routing failed, falling back to standard strategy"
        );
      }
    }
    log.info(
      "COMBO",
      `Cost-optimized ordering: cheapest first (${orderedTargets[0]?.modelStr})`
    );
  } else if (strategy === "reset-aware") {
    orderedTargets = await orderTargetsByResetAwareQuota(
      orderedTargets,
      combo.name,
      config,
      log,
      apiKeyAllowedConnections
    );
    log.info(
      "COMBO",
      `Reset-aware ordering: ${orderedTargets[0]?.modelStr}${orderedTargets[0]?.connectionId ? ` (${orderedTargets[0].connectionId})` : ""} first`
    );
  } else if (strategy === "reset-window") {
    orderedTargets = await orderTargetsByResetWindow(
      orderedTargets,
      combo.name,
      config,
      log,
      apiKeyAllowedConnections
    );
    log.info(
      "COMBO",
      `Reset-window ordering: ${orderedTargets[0]?.modelStr}${orderedTargets[0]?.connectionId ? ` (${orderedTargets[0].connectionId})` : ""} first`
    );
  } else if (strategy === "context-optimized") {
    orderedTargets = sortTargetsByContextSize(orderedTargets);
    log.info(
      "COMBO",
      `Context-optimized ordering: largest first (${orderedTargets[0]?.modelStr})`
    );
  }

  orderedTargets = orderTargetsByEvalScores(
    orderedTargets,
    config.evalRouting as Record<string, unknown> | undefined,
    log
  );
  orderedTargets = filterTargetsByRequestCompatibility(
    orderedTargets,
    body,
    log
  );

  // Parallel pre-screen: check provider profiles and model availability for all targets
  // Only runs for priority strategy where sequential checking causes latency
  const preScreenMap: Map<string, PreScreenResult> =
    strategy === "priority"
      ? await preScreenTargets(orderedTargets, isModelAvailable).catch(
          () => new Map<string, PreScreenResult>()
        )
      : new Map<string, PreScreenResult>();

  if (orderedTargets.length === 0) {
    return {
      orderedTargets,
      preScreenMap,
      registeredExecutionKeys: [],
      earlyResponse: comboModelNotFoundResponse("Combo has no executable targets"),
    };
  }

  scheduleShadowRouting(
    combo,
    config,
    body,
    resolveShadowTargets(combo, config, allCombos),
    handleSingleModel,
    isModelAvailable,
    strategy,
    log
  );

  // G2: Collect execution keys registered by _registerExecutionCandidates above (auto strategy).
  // We snapshot them now so cleanup can happen after the attempt loop finishes.
  const registeredExecutionKeys = orderedTargets
    .map((t) => t.executionKey)
    .filter(Boolean);

  return {
    orderedTargets,
    preScreenMap,
    registeredExecutionKeys,
  };
}
