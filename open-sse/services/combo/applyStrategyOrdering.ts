import { fisherYatesShuffle, getNextFromDeck } from "../../../src/shared/utils/shuffleDeck";
import { generateRoutingHints } from "../manifestAdapter";
import { resolveMaxConcurrentByConnection } from "./concurrencyCaps.ts";
import { sortTargetsByContextSize } from "./comboStructure.ts";
import { selectQuotaShareTarget } from "./quotaShareStrategy.ts";
import {
  orderTargetsByHeadroom,
  orderTargetsByResetAwareQuota,
  orderTargetsByResetWindow,
} from "./quotaStrategies.ts";
import {
  orderTargetsByPowerOfTwoChoices,
  sortTargetsByCost,
  sortTargetsByUsage,
} from "./targetSorters.ts";
import type { ComboLike, ComboLogger, ResolvedComboTarget } from "./types.ts";

export interface ApplyStrategyOrderingDeps {
  combo: ComboLike;
  config: Record<string, unknown>;
  body: Record<string, unknown>;
  log: ComboLogger;
  apiKeyAllowedConnections: string[] | null;
}

/**
 * Apply the target-ordering step for every non-`auto` combo strategy.
 *
 * Extracted verbatim from the `else if (strategy === ...)` chain in
 * handleComboChat (lkgp / strict-random / random / fill-first / p2c /
 * least-used / cost-optimized / reset-aware / reset-window / context-optimized /
 * headroom / quota-share). Each branch only reorders `orderedTargets` — no early
 * returns, no other mutable state — so the extraction returns the reordered list.
 * An unknown strategy falls through with the input order unchanged, matching the
 * previous inline behavior (the chain had no trailing `else`). The `auto` strategy
 * is handled separately by `resolveAutoStrategyOrder` and never reaches here.
 */
export async function applyStrategyOrdering(
  strategy: string,
  initialOrderedTargets: ResolvedComboTarget[],
  deps: ApplyStrategyOrderingDeps
): Promise<ResolvedComboTarget[]> {
  const { combo, config, body, log, apiKeyAllowedConnections } = deps;
  let orderedTargets = initialOrderedTargets;

  if (strategy === "lkgp") {
    try {
      const { getLKGP } = await import("../../../src/lib/localDb");
      const lkgpProvider = await getLKGP(combo.name, combo.id || combo.name);

      if (lkgpProvider) {
        const lkgpRecord = lkgpProvider;
        const providerName = lkgpRecord.provider;
        const connId = lkgpRecord.connectionId;

        let lkgpIndex = -1;
        if (connId) {
          lkgpIndex = orderedTargets.findIndex(
            (target) => target.provider === providerName && target.connectionId === connId
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
      log.warn("COMBO", "Failed to retrieve Last Known Good Provider. This is non-fatal.", { err });
    }
  } else if (strategy === "strict-random") {
    const selectedExecutionKey = await getNextFromDeck(
      `combo:${combo.name}`,
      orderedTargets.map((target) => target.executionKey)
    );
    const selectedTarget =
      orderedTargets.find((target) => target.executionKey === selectedExecutionKey) || null;
    // #3959: shuffle the fallback remainder too. Previously `rest` kept fixed
    // priority order, so after a failing deck pick the chain always fell through
    // to the same top-priority model — a persistently-failing model was retried
    // on essentially every request and fallback load never spread across peers.
    const rest = fisherYatesShuffle(
      orderedTargets.filter((target) => target.executionKey !== selectedExecutionKey)
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
    log.info("COMBO", `Random shuffle: ${orderedTargets.length} targets`);
  } else if (strategy === "fill-first") {
    log.info(
      "COMBO",
      `Fill-first ordering: preserving priority order (${orderedTargets.length} targets)`
    );
  } else if (strategy === "p2c") {
    orderedTargets = orderTargetsByPowerOfTwoChoices(orderedTargets, combo.name);
    log.info("COMBO", `Power-of-two-choices ordering: selected ${orderedTargets[0]?.modelStr}`);
  } else if (strategy === "least-used") {
    orderedTargets = sortTargetsByUsage(orderedTargets, combo.name);
    log.info("COMBO", `Least-used ordering: ${orderedTargets[0]?.modelStr} has fewest requests`);
  } else if (strategy === "cost-optimized") {
    orderedTargets = await sortTargetsByCost(orderedTargets);
    if (config.manifestRouting === true) {
      try {
        const manifestHint = generateRoutingHints(
          orderedTargets.filter((t) => t.kind === "model"),
          {
            messages: Array.isArray(body?.messages)
              ? (body.messages as Array<{ role?: string; content?: string | unknown }>)
              : [],
            tools: Array.isArray(body?.tools)
              ? (body.tools as Array<{
                  function?: { name: string; description?: string; parameters?: unknown };
                }>)
              : undefined,
            model: typeof body?.model === "string" ? body.model : undefined,
          }
        );
        if (manifestHint.strategyModifier === "require-premium") {
          const eligible = orderedTargets.filter(
            (t) =>
              t.kind !== "model" ||
              manifestHint.eligibleTargets.some(
                (e) => e.provider === t.provider && e.modelStr === t.modelStr
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
        log.warn({ err }, "manifest routing failed, falling back to standard strategy");
      }
    }
    log.info("COMBO", `Cost-optimized ordering: cheapest first (${orderedTargets[0]?.modelStr})`);
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
    log.info("COMBO", `Context-optimized ordering: largest first (${orderedTargets[0]?.modelStr})`);
  } else if (strategy === "headroom") {
    orderedTargets = await orderTargetsByHeadroom(
      orderedTargets,
      combo.name,
      log,
      apiKeyAllowedConnections
    );
    log.info(
      "COMBO",
      `Headroom ordering: ${orderedTargets[0]?.modelStr}${orderedTargets[0]?.connectionId ? ` (${orderedTargets[0].connectionId})` : ""} has most free capacity`
    );
  } else if (strategy === "quota-share") {
    // Internal quota-share combos (qtSd/): delegate to the dedicated module (DRR +
    // P2C in-flight + per-model bucket gating + per-connection concurrency gating).
    const qsModel =
      typeof body?.model === "string" ? body.model : (orderedTargets[0]?.modelStr ?? "");
    const qsMaxConcurrent = await resolveMaxConcurrentByConnection(orderedTargets);
    orderedTargets = selectQuotaShareTarget(orderedTargets, combo.name, qsModel, Date.now(), {
      maxConcurrentByConnection: qsMaxConcurrent,
    }).orderedTargets;
    log.info(
      "COMBO",
      `Quota-share ordering: ${orderedTargets[0]?.modelStr}${orderedTargets[0]?.connectionId ? ` (${orderedTargets[0].connectionId})` : ""} selected (DRR+P2C)`
    );
  }

  return orderedTargets;
}
