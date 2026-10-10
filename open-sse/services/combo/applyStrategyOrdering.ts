import { fisherYatesShuffle, getNextFromDeck } from "../../../src/shared/utils/shuffleDeck";
import { generateRoutingHints } from "../manifestAdapter";
import { resolveMaxConcurrentByConnection } from "./concurrencyCaps.ts";
import { sortTargetsByContextSize } from "./comboStructure.ts";
import { selectQuotaShareTarget } from "./quotaShareStrategy.ts";
import {
  applyPromptCacheAffinity,
  expandPromptCacheAffinityTargets,
  resolvePromptCacheAffinityKey,
} from "./promptCacheAffinity.ts";
import {
  orderTargetsByHeadroom,
  orderTargetsByQuotaWeighted,
  orderTargetsByResetAwareQuota,
  orderTargetsByResetWindow,
} from "./quotaStrategies.ts";
import {
  orderTargetsByPowerOfTwoChoices,
  sortTargetsByCost,
  sortTargetsByUsage,
} from "./targetSorters.ts";
import { decrementInflight } from "./quotaShareInflight.ts";
import { getStrategyTraits, type StrategyOrderingKind } from "./strategyRegistry.ts";
import type { ComboLike, ComboLogger, ResolvedComboTarget } from "./types.ts";

/**
 * Result of {@link applyStrategyOrdering}.
 *
 * `quotaShareRelease` carries the idempotent release for the in-flight slot that
 * quota-share and quota-weighted reserve for their winner. quota-share reserves
 * inside selectQuotaShareTarget; quota-weighted reserves inside the orderer so
 * two in-process draws cannot both see inflight=0. Stickiness may then move [0];
 * resolveComboTargetPipeline transfers the slot for both strategies. The caller
 * MUST invoke the callback exactly once when the request settles — dropping it
 * leaks the counter and degenerates later draws toward whoever looks idle.
 */
export interface ApplyStrategyOrderingResult {
  orderedTargets: ResolvedComboTarget[];
  quotaShareRelease: (() => void) | null;
}

export interface ApplyStrategyOrderingDeps {
  combo: ComboLike;
  config: Record<string, unknown>;
  body: Record<string, unknown>;
  log: ComboLogger;
  apiKeyAllowedConnections: string[] | null;
  sessionKey?: string | null;
}

type StrategyOrderer = (
  orderedTargets: ResolvedComboTarget[],
  deps: ApplyStrategyOrderingDeps
) => Promise<ApplyStrategyOrderingResult> | ApplyStrategyOrderingResult;

const orderedOnly = (orderedTargets: ResolvedComboTarget[]): ApplyStrategyOrderingResult => ({
  orderedTargets,
  quotaShareRelease: null,
});

const describeFirstTarget = (orderedTargets: ResolvedComboTarget[]): string =>
  `${orderedTargets[0]?.modelStr}${orderedTargets[0]?.connectionId ? ` (${orderedTargets[0].connectionId})` : ""}`;

async function orderByLkgp(
  orderedTargets: ResolvedComboTarget[],
  { combo, log }: ApplyStrategyOrderingDeps
): Promise<ApplyStrategyOrderingResult> {
  try {
    const { getLKGP } = await import("@/lib/db/settings");
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
            (typeof target.modelStr === "string" && target.modelStr.startsWith(`${providerName}/`))
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
  return orderedOnly(orderedTargets);
}

async function orderByStrictRandomDeck(
  orderedTargets: ResolvedComboTarget[],
  { combo, log }: ApplyStrategyOrderingDeps
): Promise<ApplyStrategyOrderingResult> {
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
  const nextTargets = [selectedTarget, ...rest].filter(
    (target): target is ResolvedComboTarget => target !== null
  );
  log.info(
    "COMBO",
    `Strict-random deck: ${selectedExecutionKey} selected (${nextTargets.length} targets)`
  );
  return orderedOnly(nextTargets);
}

async function applyManifestRouting(
  orderedTargets: ResolvedComboTarget[],
  { body, log }: ApplyStrategyOrderingDeps
): Promise<ResolvedComboTarget[]> {
  let nextTargets = orderedTargets;
  try {
    const manifestHint = await generateRoutingHints(
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
      if (eligible.length > 0) nextTargets = eligible;
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
  return nextTargets;
}

async function orderByCost(
  orderedTargets: ResolvedComboTarget[],
  deps: ApplyStrategyOrderingDeps
): Promise<ApplyStrategyOrderingResult> {
  let nextTargets = await sortTargetsByCost(orderedTargets);
  if (deps.config.manifestRouting === true) {
    nextTargets = await applyManifestRouting(nextTargets, deps);
  }
  deps.log.info("COMBO", `Cost-optimized ordering: cheapest first (${nextTargets[0]?.modelStr})`);
  return orderedOnly(nextTargets);
}

async function orderByCacheAffinity(
  orderedTargets: ResolvedComboTarget[],
  { body, log, sessionKey }: ApplyStrategyOrderingDeps
): Promise<ApplyStrategyOrderingResult> {
  let nextTargets = orderedTargets;
  if (resolvePromptCacheAffinityKey(body)) {
    nextTargets = await expandPromptCacheAffinityTargets(nextTargets);
  }
  const affinity = applyPromptCacheAffinity(nextTargets, body, true, "global", sessionKey);
  nextTargets = affinity.targets;
  log.info("COMBO", `Cache-optimized ordering: ${describeFirstTarget(nextTargets)} first`);
  return orderedOnly(nextTargets);
}

async function orderByQuotaWeighted(
  orderedTargets: ResolvedComboTarget[],
  { combo, config, log, apiKeyAllowedConnections }: ApplyStrategyOrderingDeps
): Promise<ApplyStrategyOrderingResult> {
  const nextTargets = await orderTargetsByQuotaWeighted(
    orderedTargets,
    combo.name,
    config,
    log,
    apiKeyAllowedConnections
  );
  let quotaShareRelease: (() => void) | null = null;
  const winnerId = nextTargets[0]?.connectionId ?? "";
  if (winnerId) {
    let released = false;
    quotaShareRelease = () => {
      if (released) return;
      released = true;
      decrementInflight(winnerId);
    };
  }
  log.info("COMBO", `Quota-weighted ordering: ${describeFirstTarget(nextTargets)} first`);
  return { orderedTargets: nextTargets, quotaShareRelease };
}

async function orderByQuotaShare(
  orderedTargets: ResolvedComboTarget[],
  { combo, body, log }: ApplyStrategyOrderingDeps
): Promise<ApplyStrategyOrderingResult> {
  // Internal quota-share combos (qtSd/): delegate to the dedicated module (DRR +
  // P2C in-flight + per-model bucket gating + per-connection concurrency gating).
  const qsModel =
    typeof body?.model === "string" ? body.model : (orderedTargets[0]?.modelStr ?? "");
  const qsMaxConcurrent = await resolveMaxConcurrentByConnection(orderedTargets);
  const qsSelection = selectQuotaShareTarget(orderedTargets, combo.name, qsModel, Date.now(), {
    maxConcurrentByConnection: qsMaxConcurrent,
  });
  const nextTargets = qsSelection.orderedTargets;
  log.info("COMBO", `Quota-share ordering: ${describeFirstTarget(nextTargets)} selected (DRR+P2C)`);
  // #11371: the reservation made inside selectQuotaShareTarget must outlive this
  // call — hand the release to the host so it can fire it when the request settles.
  return { orderedTargets: nextTargets, quotaShareRelease: qsSelection.decrementInflight };
}

/**
 * One orderer per {@link StrategyOrderingKind} that reorders targets. `declared` (no
 * reorder) and `auto` (resolveAutoStrategyOrder) are intentionally absent; the exhaustive
 * key type makes a new ordering kind without an orderer a compile error.
 */
const STRATEGY_ORDERERS: Record<
  Exclude<StrategyOrderingKind, "declared" | "auto">,
  StrategyOrderer
> = {
  lkgp: orderByLkgp,
  "strict-random": orderByStrictRandomDeck,
  random: (orderedTargets, { log }) => {
    const nextTargets = fisherYatesShuffle([...orderedTargets]);
    log.info("COMBO", `Random shuffle: ${nextTargets.length} targets`);
    return orderedOnly(nextTargets);
  },
  "fill-first": (orderedTargets, { log }) => {
    log.info(
      "COMBO",
      `Fill-first ordering: preserving priority order (${orderedTargets.length} targets)`
    );
    return orderedOnly(orderedTargets);
  },
  p2c: (orderedTargets, { combo, log }) => {
    const nextTargets = orderTargetsByPowerOfTwoChoices(orderedTargets, combo.name);
    log.info("COMBO", `Power-of-two-choices ordering: selected ${nextTargets[0]?.modelStr}`);
    return orderedOnly(nextTargets);
  },
  "least-used": (orderedTargets, { combo, log }) => {
    const nextTargets = sortTargetsByUsage(orderedTargets, combo.name);
    log.info("COMBO", `Least-used ordering: ${nextTargets[0]?.modelStr} has fewest requests`);
    return orderedOnly(nextTargets);
  },
  "cost-optimized": orderByCost,
  "reset-aware": async (orderedTargets, { combo, config, log, apiKeyAllowedConnections }) => {
    const nextTargets = await orderTargetsByResetAwareQuota(
      orderedTargets,
      combo.name,
      config,
      log,
      apiKeyAllowedConnections
    );
    log.info("COMBO", `Reset-aware ordering: ${describeFirstTarget(nextTargets)} first`);
    return orderedOnly(nextTargets);
  },
  "reset-window": async (orderedTargets, { combo, config, log, apiKeyAllowedConnections }) => {
    const nextTargets = await orderTargetsByResetWindow(
      orderedTargets,
      combo.name,
      config,
      log,
      apiKeyAllowedConnections
    );
    log.info("COMBO", `Reset-window ordering: ${describeFirstTarget(nextTargets)} first`);
    return orderedOnly(nextTargets);
  },
  "context-optimized": (orderedTargets, { log }) => {
    const nextTargets = sortTargetsByContextSize(orderedTargets);
    log.info("COMBO", `Context-optimized ordering: largest first (${nextTargets[0]?.modelStr})`);
    return orderedOnly(nextTargets);
  },
  "cache-optimized": orderByCacheAffinity,
  headroom: async (orderedTargets, { combo, log, apiKeyAllowedConnections }) => {
    const nextTargets = await orderTargetsByHeadroom(
      orderedTargets,
      combo.name,
      log,
      apiKeyAllowedConnections
    );
    log.info(
      "COMBO",
      `Headroom ordering: ${describeFirstTarget(nextTargets)} has most free capacity`
    );
    return orderedOnly(nextTargets);
  },
  "quota-weighted": orderByQuotaWeighted,
  "quota-share": orderByQuotaShare,
};

/**
 * Apply the target-ordering step for every non-`auto` combo strategy.
 *
 * The orderer is selected through the strategy registry (`getStrategyTraits(strategy)
 * .ordering`) — see {@link STRATEGY_ORDERERS}. Each orderer only reorders the target
 * list — no early returns, no other mutable state. A strategy whose ordering kind is
 * `declared` (or an unknown strategy) keeps the input order unchanged. The `auto`
 * strategy is handled separately by `resolveAutoStrategyOrder` and never reaches here.
 */
export async function applyStrategyOrdering(
  strategy: string,
  initialOrderedTargets: ResolvedComboTarget[],
  deps: ApplyStrategyOrderingDeps
): Promise<ApplyStrategyOrderingResult> {
  const { ordering } = getStrategyTraits(strategy);
  const orderer =
    ordering === "declared" || ordering === "auto" ? undefined : STRATEGY_ORDERERS[ordering];
  if (!orderer) return orderedOnly(initialOrderedTargets);
  return orderer(initialOrderedTargets, deps);
}
