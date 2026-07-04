import { unavailableResponse } from "../../utils/error.ts";
import { selectProvider as selectAutoProvider } from "../autoCombo/engine.ts";
import {
  resolveRequestModePack,
  parseRequestBudgetCap,
} from "../autoCombo/requestControls.ts";
import { selectWithStrategy } from "../autoCombo/routerStrategy.ts";
import { buildComplexityRoutingHint } from "../autoCombo/complexityRouter";
import { recordComboIntent } from "../comboMetrics.ts";
import { estimateTokens } from "../contextManager.ts";
import { classifyWithConfig } from "../intentClassifier.ts";
import type { RoutingHint } from "../manifestAdapter";
import { parseModel } from "../model.ts";
import { supportsToolCalling } from "../modelCapabilities.ts";
import type { ResilienceSettings } from "../../../src/lib/resilience/settings";
import { parseAutoConfig } from "./autoConfig.ts";
import { dedupeTargetsByExecutionKey } from "./comboData.ts";
import { getModelContextLimitForModelString } from "./comboStructure.ts";
import type { ResetWindowConfig } from "./quotaScoring.ts";
import {
  _registerExecutionCandidates,
  expandAutoComboCandidatePool,
  extractPromptForIntent,
  getIntentConfig,
  mapIntentToTaskType,
  scoreAutoTargets,
} from "./autoStrategy.ts";
import type {
  AutoProviderCandidate,
  ComboLike,
  ComboLogger,
  ResolvedComboTarget,
} from "./types.ts";

/**
 * Dependency-injected `buildAutoCandidates` — it lives in `combo.ts` (the host of
 * this leaf), so importing it directly would create an import cycle. Passing it
 * through `deps` keeps this module acyclic (same pattern as `buildTargetTimeoutRunner`).
 */
type BuildAutoCandidates = (
  targets: ResolvedComboTarget[],
  comboName: string,
  sessionId?: string | null,
  resetWindowConfig?: ResetWindowConfig,
  resilienceSettings?: ResilienceSettings | null
) => Promise<AutoProviderCandidate[]>;

export interface ResolveAutoStrategyDeps {
  orderedTargets: ResolvedComboTarget[];
  body: Record<string, unknown>;
  combo: ComboLike;
  settings: Record<string, unknown> | null | undefined;
  config: { complexityAwareRouting?: boolean };
  relayOptions?: {
    bypassProviderQuotaPolicy?: boolean;
    sessionId?: string | null;
    /** Per-request X-OmniRoute-Mode value (#6024/#6025). */
    mode?: string | null;
    /** Per-request X-OmniRoute-Budget value in USD (#6023). */
    budgetCap?: number | null;
  } | null;
  resilienceSettings: ResilienceSettings;
  log: ComboLogger;
  buildAutoCandidates: BuildAutoCandidates;
}

export type ResolveAutoStrategyResult =
  | { earlyResponse: Response }
  | { orderedTargets: ResolvedComboTarget[]; autoUsedExplicitRouter: boolean };

/**
 * Resolve target ordering for the `auto` combo strategy.
 *
 * Extracted verbatim from `handleComboChat`'s `if (strategy === "auto")` branch:
 * tool-calling + context-window pre-filters, intent classification, candidate
 * building (quota cutoff), explicit-router vs rules selection, complexity-aware
 * scoring and final dedup ordering. Behavior is byte-identical to the previous
 * inline block; the two `return unavailableResponse(...)` exits become
 * `{ earlyResponse }` so the host can decide to return them, and the mutated
 * `orderedTargets` / `autoUsedExplicitRouter` are returned instead of closed over.
 */
export async function resolveAutoStrategyOrder(
  deps: ResolveAutoStrategyDeps
): Promise<ResolveAutoStrategyResult> {
  const {
    body,
    combo,
    settings,
    config,
    relayOptions,
    resilienceSettings,
    log,
    buildAutoCandidates,
  } = deps;
  let orderedTargets = deps.orderedTargets;
  let autoUsedExplicitRouter = false;

  const requestHasTools = Array.isArray(body?.tools) && body.tools.length > 0;
  let eligibleTargets = [...orderedTargets];

  if (requestHasTools) {
    const filtered = eligibleTargets.filter((target) => supportsToolCalling(target.modelStr));
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
      ? requestMessages
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

    eligibleTargets = await expandAutoComboCandidatePool(eligibleTargets, combo);
  }

  const prompt = extractPromptForIntent(body);
  const systemPrompt = typeof combo?.system_message === "string" ? combo.system_message : undefined;
  const intentConfig = getIntentConfig(settings, combo);
  const intent = classifyWithConfig(prompt, intentConfig, systemPrompt);
  recordComboIntent(combo.name, intent);
  const taskType = mapIntentToTaskType(intent);

  const {
    routingStrategy,
    candidatePool,
    weights,
    explorationRate,
    budgetCap: configBudgetCap,
    modePack: configModePack,
    resetWindowConfig,
    slaPolicy,
  } = parseAutoConfig(combo, eligibleTargets);

  // Per-request overrides (#6023 / #6024 / #6025): X-OmniRoute-Budget and
  // X-OmniRoute-Mode headers (threaded via relayOptions) take precedence over
  // the combo's stored config for this single request. Unknown/garbage header
  // values are ignored so the saved config is preserved.
  const requestBudgetCap = parseRequestBudgetCap(relayOptions?.budgetCap);
  const budgetCap = requestBudgetCap ?? configBudgetCap;
  const requestModePack = resolveRequestModePack(relayOptions?.mode);
  const modePack = requestModePack.override ? requestModePack.modePack : configModePack;
  if (requestModePack.override || requestBudgetCap !== undefined) {
    log.debug?.(
      "COMBO",
      `Auto strategy: per-request controls applied (mode=${
        requestModePack.override ? (requestModePack.modePack ?? "balanced") : "—"
      }, budgetCap=${requestBudgetCap ?? "—"})`
    );
  }

  let lastKnownGoodProvider: string | undefined;
  try {
    const { getLKGP } = await import("../../../src/lib/localDb");
    const lkgp = await getLKGP(combo.name, combo.id || combo.name);
    if (lkgp) lastKnownGoodProvider = lkgp.provider;
  } catch (err) {
    log.warn("COMBO", "Failed to retrieve Last Known Good Provider. This is non-fatal.", { err });
  }

  const autoCandidateResilienceSettings =
    relayOptions?.bypassProviderQuotaPolicy === true
      ? {
          ...resilienceSettings,
          quotaPreflight: {
            ...resilienceSettings.quotaPreflight,
            enabled: false,
          },
        }
      : resilienceSettings;
  const candidates = await buildAutoCandidates(
    eligibleTargets,
    combo.name,
    relayOptions?.sessionId,
    resetWindowConfig,
    autoCandidateResilienceSettings
  );
  const routableCandidates = candidates.filter(
    (candidate) => candidate.quotaCutoffBlocked !== true
  );
  const quotaBlockedCount = candidates.length - routableCandidates.length;
  if (quotaBlockedCount > 0) {
    log.info(
      "COMBO",
      `Auto strategy: quota cutoff skipped ${quotaBlockedCount}/${candidates.length} account candidates`
    );
  }
  // G2: Register candidates so chatCore can mark quotaSoftPenalty via setCandidateQuotaSoftPenalty.
  _registerExecutionCandidates(routableCandidates);
  if (candidates.length > 0 && routableCandidates.length === 0) {
    return {
      earlyResponse: unavailableResponse(
        429,
        "All auto strategy candidates are below configured quota cutoffs"
      ),
    };
  }
  if (routableCandidates.length > 0) {
    let selectedProvider: string | null = null;
    let selectedModel: string | null = null;
    let selectionReason = "";

    if (routingStrategy !== "rules") {
      try {
        const decision = selectWithStrategy(
          routableCandidates,
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
        autoUsedExplicitRouter = true;
      } catch (err) {
        log.warn(
          "COMBO",
          `Auto strategy '${routingStrategy}' failed (${err?.message || "unknown"}), falling back to rules`
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
        routableCandidates,
        taskType
      );
      selectedProvider = selection.provider;
      selectedModel = selection.model;
      selectionReason = `score=${selection.score.toFixed(3)}${selection.isExploration ? " (exploration)" : ""}`;
    }

    // Complexity-aware routing (2026, opt-in): classify the request's
    // difficulty and feed a tier hint into scoring so tierAffinity /
    // specificityMatch favor candidates whose tier matches the request.
    const autoManifestHint: RoutingHint | null =
      config.complexityAwareRouting === true
        ? buildComplexityRoutingHint(
            eligibleTargets.filter((t) => t.kind === "model"),
            body,
            log
          )
        : null;

    const scoredTargets = scoreAutoTargets(
      eligibleTargets,
      routableCandidates,
      taskType,
      weights,
      autoManifestHint
    );
    const rankedTargets = scoredTargets.map((entry) => entry.target);
    const selectedTarget =
      scoredTargets.find((entry) => {
        const parsed = parseModel(entry.target.modelStr);
        const modelId = parsed.model || entry.target.modelStr;
        return entry.target.provider === selectedProvider && modelId === selectedModel;
      })?.target ||
      rankedTargets[0] ||
      eligibleTargets[0];
    if (!selectedTarget) {
      return {
        earlyResponse: unavailableResponse(
          429,
          "No auto strategy targets remained after quota cutoff filtering"
        ),
      };
    }

    // Keep eligibleTargets as the last-resort fallback tail: dedupe drops the
    // routable ranked ones (and, when the cutoff is OFF, makes this identical to
    // the pre-cutoff behavior), but a quota-blocked target still survives as a
    // final fallback instead of vanishing — the hard cutoff only de-prioritizes.
    orderedTargets = dedupeTargetsByExecutionKey(
      [selectedTarget, ...rankedTargets, ...eligibleTargets].filter(
        (entry): entry is ResolvedComboTarget => entry !== undefined && entry !== null
      )
    );

    log.info(
      "COMBO",
      `Auto selection: ${selectedTarget?.modelStr || `${selectedProvider}/${selectedModel}`} | intent=${intent} task=${taskType} | strategy=${routingStrategy} | ${selectionReason}`
    );
  } else {
    log.warn("COMBO", "Auto strategy has no candidates, keeping default ordering");
  }

  return { orderedTargets, autoUsedExplicitRouter };
}
