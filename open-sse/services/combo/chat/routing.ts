/**
 * Combo routing orchestrator.
 * Handles initialization, middleware, and delegates strategy ordering to auto.ts.
 * Covers approximately lines 233-762 of the original chat.ts.
 */

import { FETCH_TIMEOUT_MS } from "../../../config/constants.ts";
import { errorResponse } from "../../../utils/error.ts";
import {
  resolveComboConfig,
  getDefaultComboConfig,
  resolveComboTargetTimeoutMs,
} from "../../comboConfig.ts";
import {
  resolveContextRelayConfig,
  resolveUniversalHandoffConfig,
  SKIP_UNIVERSAL_HANDOFF_FLAG,
} from "../../contextHandoff.ts";
import { getLastSessionModel } from "../../../../src/lib/db/contextHandoffs.ts";
import { applyComboAgentMiddleware } from "../../comboAgentMiddleware.ts";
import { normalizeRoutingStrategy } from "../../../../src/shared/constants/routingStrategies.ts";
import {
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../../../src/lib/resilience/settings";
import type {
  HandleComboChatOptions,
  SingleModelTarget,
  ResolvedComboTarget,
  PreScreenResult,
  ComboCollectionLike,
} from "../types.ts";
import {
  resolveWeightedTargets,
  resolveComboTargets,
  applyRequestTagRouting,
  resolveStrategyOrdering,
} from "./auto.ts";
import { handleSingleModelWithTimeout as handleSingleModelWithTimeoutImpl } from "./timeout";

export interface ComboRoutingResult {
  body: Record<string, unknown>;
  config: Record<string, unknown>;
  comboTargetTimeoutMs: number;
  resilienceSettings: ResilienceSettings;
  universalHandoffConfig: Record<string, unknown> | null | undefined;
  orderedTargets: ResolvedComboTarget[];
  preScreenMap: Map<string, PreScreenResult>;
  registeredExecutionKeys: string[];
  strategy: string;
  handleSingleModelWithTimeout: (
    b: Record<string, unknown>,
    modelStr: string,
    target?: SingleModelTarget
  ) => Promise<Response>;
}

export async function handleComboRouting(
  options: HandleComboChatOptions & { allCombos?: ComboCollectionLike | null }
): Promise<Response | ComboRoutingResult> {
  let {
    body,
    combo,
    handleSingleModel,
    isModelAvailable,
    log,
    settings,
    allCombos,
    relayOptions,
    signal,
    apiKeyAllowedConnections = null,
  } = options;

  const strategy = normalizeRoutingStrategy(combo.strategy || "priority");

  const relayConfig =
    strategy === "context-relay" ? resolveContextRelayConfig(relayOptions?.config || null) : null;

  const resilienceSettings: ResilienceSettings = settings
    ? resolveResilienceSettings(settings)
    : resolveResilienceSettings(null);

  const universalHandoffConfig = resolveUniversalHandoffConfig(
    (combo.universal_handoff || combo.universalHandoff) as
      | Record<string, unknown>
      | null
      | undefined,
    relayOptions?.universalHandoffConfig as Record<string, unknown> | null | undefined
  );

  let pinnedModel: string | null = null;
  if (
    combo.context_cache_protection &&
    relayOptions?.sessionId &&
    !(body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
  ) {
    const pinned = getLastSessionModel(relayOptions.sessionId, combo.name);
    if (pinned) {
      body = { ...body, model: pinned };
      pinnedModel = pinned;
      log.info("COMBO", `[#401] Context cache: pinned model=${pinned} (server-side)`);
    }
  }

  const { body: agentBody } = applyComboAgentMiddleware(body, combo, "");
  body = agentBody;

  const config = (
    settings
      ? resolveComboConfig(combo, settings)
      : { ...getDefaultComboConfig(), ...(combo.config || {}) }
  ) as Record<string, unknown>;
  const comboTargetTimeoutMs = resolveComboTargetTimeoutMs(config, FETCH_TIMEOUT_MS);

  const handleSingleModelWithTimeout = (
    b: Record<string, unknown>,
    modelStr: string,
    target?: SingleModelTarget
  ): Promise<Response> =>
    handleSingleModelWithTimeoutImpl(
      handleSingleModel,
      comboTargetTimeoutMs,
      log,
      b,
      modelStr,
      target
    );

  if (pinnedModel) {
    log.info(
      "COMBO",
      `Bypassing strategy — routing directly to pinned context model: ${pinnedModel}`
    );
    return handleSingleModelWithTimeout(body, pinnedModel);
  }

  let orderedTargets: ResolvedComboTarget[] =
    strategy === "weighted"
      ? resolveWeightedTargets(combo, allCombos as ComboCollectionLike)?.orderedTargets || []
      : resolveComboTargets(combo, allCombos as ComboCollectionLike);

  orderedTargets = await applyRequestTagRouting(orderedTargets, body, log);

  if (strategy === "weighted") {
    log.info(
      "COMBO",
      `Weighted selection${allCombos ? " with nested resolution" : ""}: ${orderedTargets.length} total targets`
    );
  } else if (allCombos) {
    log.info("COMBO", `${strategy} with nested resolution: ${orderedTargets.length} total targets`);
  }

  const strategyResult = await resolveStrategyOrdering({
    strategy,
    body,
    orderedTargets,
    combo,
    log,
    config,
    settings: settings ?? null,
    allCombos,
    handleSingleModel,
    isModelAvailable,
    apiKeyAllowedConnections,
    relayOptions,
    handleSingleModelWithTimeout,
  });

  if (strategyResult instanceof Response) return strategyResult;

  return {
    body,
    config,
    comboTargetTimeoutMs,
    resilienceSettings,
    universalHandoffConfig,
    orderedTargets: strategyResult.orderedTargets,
    preScreenMap: strategyResult.preScreenMap,
    registeredExecutionKeys: strategyResult.registeredExecutionKeys,
    strategy,
    relayConfig,
    handleSingleModelWithTimeout,
  };
}
