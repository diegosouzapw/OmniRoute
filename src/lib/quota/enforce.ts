/**
 * enforce.ts — Quota Share enforcement for the hot path.
 *
 * Two entry points:
 *   - enforceQuotaShare(input): EnforceDecision — PRE-request check.
 *   - recordConsumption(input): void — POST-response tracker (fire-and-forget via spendRecorder).
 *
 * Design principles (Group B decisions):
 *   - B16: fail-open — any error from store/plan/saturation is caught and treated as "allow".
 *   - B25: 429 message is sanitized (routed through buildErrorBody in chatCore hook, not here).
 *   - B29: recordConsumption failures never propagate to the caller (drift is acceptable).
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F7).
 */

import type { EnforceDecision, EnforceInput, QuotaStore, RecordConsumptionInput } from "./types";
import type { ProviderPlan, QuotaUnit } from "./dimensions";
import { dimensionKeyToString } from "./dimensions";
import { decideFairShare } from "./fairShare";
import { resolvePlan } from "./planResolver";
import { getSaturation } from "./saturationSignals";
import { getQuotaStore } from "./QuotaStore";
import { listAllocationsForApiKey, getPool } from "@/lib/db/quotaPools";
import { getModelCap } from "@/lib/db/quotaModelCaps";
import { listEnabledSchedules } from "@/lib/db/quotaSchedules";
import {
  failingReserve,
  reservedWindows,
  resolveActiveSchedule,
  scheduleBucketPoolId,
  type QuotaSchedule,
  type SaturationByWindow,
} from "./schedules";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SATURATION_THRESHOLD = Number(process.env.QUOTA_SATURATION_THRESHOLD ?? "0.5");

/**
 * Units for which the store tracks a real pool-wide aggregate (sum of per-key
 * consumption via quota_consumption rows). For these units, globalUsedPercent
 * (the saturation signal from the upstream provider) is always 0 because no
 * external API reports a "percent used" for raw request/token/usd counters.
 *
 * Using globalUsedPercent × effectiveLimit for countable units would always
 * yield consumedTotal = 0, meaning the pool never saturates and per-key
 * overage is never blocked. We use store.poolConsumedTotal() instead, which
 * sums the actual consumption across all keys in the pool window.
 *
 * "percent" dimensions remain driven by the saturation signal because that IS
 * the authoritative consumption measure (the upstream provider percentage).
 */
const COUNTABLE_UNITS = new Set(["requests", "tokens", "usd"]);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * PRE-request enforcement gate.
 *
 * Returns "allow" (optionally with deprioritize=true for soft policy) or
 * "block" (429, with reason and optional retryAfterSeconds).
 *
 * Always fail-open per B16: errors from the store, plan resolver, or saturation
 * signals result in { kind: "allow" } so a transient quota infra failure never
 * blocks legitimate traffic.
 */
export async function enforceQuotaShare(input: EnforceInput): Promise<EnforceDecision> {
  // 1. Find pools that contain this apiKeyId.
  let allocations: Array<{
    poolId: string;
    allocation: import("@/lib/db/quotaPools").PoolAllocation;
  }>;
  try {
    allocations = listAllocationsForApiKey(input.apiKeyId);
  } catch {
    // DB not available or migration not run — fail-open
    return { kind: "allow" };
  }

  if (!allocations.length) {
    // No pool assignment → no restriction
    return { kind: "allow" };
  }

  // 2. Filter to pool that belongs to the same connectionId.
  let pool: import("@/lib/db/quotaPools").QuotaPool | null = null;
  let poolAllocation: import("@/lib/db/quotaPools").PoolAllocation | null = null;
  for (const { poolId, allocation } of allocations) {
    let p: import("@/lib/db/quotaPools").QuotaPool | null = null;
    try {
      p = getPool(poolId);
    } catch {
      continue;
    }
    // D2: match if the input connectionId is ANY member of the pool, not only
    // the legacy primary. Fall back to connectionId equality for rows that
    // have not yet been backfilled (connectionIds empty/undefined).
    if (
      p &&
      (Array.isArray(p.connectionIds)
        ? p.connectionIds.includes(input.connectionId)
        : p.connectionId === input.connectionId)
    ) {
      pool = p;
      poolAllocation = allocation;
      break;
    }
  }

  if (!pool || !poolAllocation) {
    // API key is in pools but none matches this connection → no restriction
    return { kind: "allow" };
  }

  // Obtain the store early — needed for both the model-cap pre-check (step 3b)
  // and the pool-level dimension loop (step 4).
  const store = await getQuotaStore();

  // 3. Resolve the provider plan (dimensions).
  //
  // Resolved from the pool's canonical (primary) connection — NOT
  // input.connectionId — because the wizard's "Limite" step only ever PUTs a
  // manual plan override to the pool's primary connection (connectionIds[0]).
  // A request served through a different pool member must still be checked
  // against that same plan/limit, or a non-primary connection silently falls
  // back to a different (catalog/empty) plan shape (#13876).
  const plan = resolvePlan(pool.connectionId, input.provider);

  // 3a-bis. Time-aware schedule gate.
  //
  // Runs before the per-model and per-dimension work because a closed window is
  // the cheapest possible denial: one indexed read of quota_schedules, and no
  // saturation signal at all. A pool without schedules returns null here and the
  // rest of this function behaves exactly as it did before.
  const scheduleDecision = await checkSchedules(pool.id, plan, input, store);
  if (scheduleDecision) return scheduleDecision;

  // 3b. Per-(key, model) model-cap pre-check (Fase 3 #7).
  //
  // If the caller provides a model name, look for a cap row in
  // quota_allocation_model_caps for (pool.id, apiKeyId, model). When found and
  // the cap value is real (> EPSILON), peek the per-model consumption bucket and
  // block ONLY this model if the cap is reached. Other models in the same pool
  // remain unaffected — cap is per-model, not global.
  //
  // Consumption is stored in quota_consumption using a model-scoped dimension key:
  //   poolId  = "${pool.id}:model:${model}"  (distinct from pool-level rows)
  //   unit    = cap.capUnit
  //   window  = "hourly"  (rate-limiting window; fixed for model caps)
  //
  // Fail-open per B16: any error reading the cap or peeking the store → skip check.
  if (input.model) {
    let modelCap: import("@/lib/db/quotaModelCaps").ModelCap | null = null;
    try {
      modelCap = getModelCap(pool.id, input.apiKeyId, input.model);
    } catch {
      // DB error — fail-open per B16
    }
    if (modelCap && modelCap.capValue > Number.EPSILON) {
      const modelBucketPoolId = `${pool.id}:model:${input.model}`;
      const modelDimKey = {
        poolId: modelBucketPoolId,
        unit: modelCap.capUnit,
        window: "hourly" as const,
      };
      const modelConsumed = await store.peek(input.apiKeyId, modelDimKey).catch(() => 0);
      if (modelConsumed >= modelCap.capValue) {
        try {
          const { notifyWebhookEvent } = await import("@/lib/webhookDispatcher");
          notifyWebhookEvent("quota.exceeded", {
            apiKeyId: input.apiKeyId,
            provider: input.provider,
            connectionId: input.connectionId,
            reason: "model-cap",
            model: input.model,
          });
        } catch {
          // webhook is best-effort
        }
        return {
          kind: "block",
          reason: `Model cap reached for your API key on ${input.provider}/${input.model} [model-cap]`,
          httpStatus: 429,
        };
      }
    }
  }

  if (!plan.dimensions.length) {
    // No dimensions configured → nothing to enforce
    return { kind: "allow" };
  }

  // 3a. Compute the account multiplier: a pool with N same-type connections has an
  // effective budget of perAccountLimit × N per dimension. Consumption is already
  // pool-keyed (shared bucket) — only the limit scales, never the consumption.
  const accountCount =
    Array.isArray(pool.connectionIds) && pool.connectionIds.length > 0
      ? pool.connectionIds.length
      : 1;

  // 4. For each active dimension, peek consumption and saturation.
  const dimensionsInfo: Array<{
    key: { poolId: string; unit: QuotaUnit; window: import("./dimensions").QuotaWindow };
    limit: number;
    consumedTotal: number;
    globalUsedPercent: number;
  }> = [];
  const consumedByThisKey: Record<string, number> = {};

  for (const dim of plan.dimensions) {
    // Skip placeholder dimensions whose limit is unknown (Number.EPSILON / 0 — the
    // "configure manually" seed for glm/minimax/kimi-coding/deepseek in planRegistry.ts).
    // An unconfigured limit is NOT a real cap: enforcing it would block every request
    // after the first one, because decideFairShare's global-saturated gate fires as soon
    // as consumedTotal exceeds ~EPSILON. The real cap kicks in once a limit is set via
    // the Wizard "Limite" step (provider_plans override).
    if (!(dim.limit > Number.EPSILON)) continue;
    const dimKey = { poolId: pool.id, unit: dim.unit, window: dim.window };
    const dimKeyStr = dimensionKeyToString(dimKey);

    const consumedThisKey = await store.peek(input.apiKeyId, dimKey).catch(() => 0);
    consumedByThisKey[dimKeyStr] = consumedThisKey;

    // Global saturation signal — fail-open: 0 (generous mode)
    const globalUsedPercent = await getSaturation(input.connectionId, input.provider, dim).catch(
      () => 0
    );

    // Effective limit = per-account plan limit × number of accounts in the pool.
    // This is the summed budget: N accounts contribute N × L capacity to the shared bucket.
    const effectiveLimit = dim.limit * accountCount;

    // Derive consumedTotal based on the unit type:
    //   - Countable units (requests/tokens/usd): use the real store aggregate so the
    //     pool can actually saturate and block per-key overage. The saturation signal
    //     (globalUsedPercent) is always 0 for these units — using it would permanently
    //     keep consumedTotal at 0 and never trigger the block path.
    //   - percent dimensions: the saturation signal IS the consumed signal (the upstream
    //     provider returns a utilisation percentage, not raw counts).
    let consumedTotal: number;
    if (COUNTABLE_UNITS.has(dim.unit)) {
      // Real pool-wide aggregate (sum of per-key consumption across all apiKeyIds).
      consumedTotal = await store.poolConsumedTotal(pool.id, dimKey).catch(() => 0);
    } else {
      // percent (account-quota window): the saturation signal is authoritative.
      consumedTotal = globalUsedPercent * effectiveLimit;
    }

    dimensionsInfo.push({
      key: dimKey,
      limit: effectiveLimit,
      consumedTotal,
      globalUsedPercent,
    });
  }

  // 5. Apply the fair-share algorithm across all dimensions.
  // Equal-split fallback: when ALL allocations in the pool have weight 0 (e.g. newly
  // added keys whose weight was never set), treat each as an equal share so the pool
  // is usable without requiring a re-save. Original non-zero weights are kept as-is.
  const poolTotalWeight = Array.isArray(pool.allocations)
    ? pool.allocations.reduce((s, a) => s + (Number.isFinite(a.weight) ? a.weight : 0), 0)
    : 0;
  const allocCount = Array.isArray(pool.allocations) ? pool.allocations.length : 0;
  const effectiveWeight =
    poolTotalWeight > 0 ? poolAllocation.weight : allocCount > 0 ? 100 / allocCount : 0;

  const decision = decideFairShare({
    dimensions: dimensionsInfo,
    allocation: { ...poolAllocation, weight: effectiveWeight },
    consumedByThisKey,
    saturationThreshold: SATURATION_THRESHOLD,
  });

  if (decision.kind === "block") {
    // Fire webhook (fire-and-forget, never blocks the response)
    try {
      const { notifyWebhookEvent } = await import("@/lib/webhookDispatcher");
      notifyWebhookEvent("quota.exceeded", {
        apiKeyId: input.apiKeyId,
        provider: input.provider,
        connectionId: input.connectionId,
        reason: decision.reason,
      });
    } catch {
      // webhook dispatch is best-effort
    }

    return {
      kind: "block",
      reason: messageForReason(decision.reason, input.provider),
      httpStatus: 429,
      retryAfterSeconds: decision.retryAfterMs
        ? Math.ceil(decision.retryAfterMs / 1000)
        : undefined,
    };
  }

  // "allow" — may be penalized (soft policy overage)
  return {
    kind: "allow",
    deprioritize: decision.penalized === true,
  };
}

/**
 * POST-response consumption recorder.
 *
 * Increments the quota counter for each active dimension.
 * Errors are swallowed (B29): the LLM response has already been delivered.
 */
export async function recordConsumption(input: RecordConsumptionInput): Promise<void> {
  let allocations: Array<{
    poolId: string;
    allocation: import("@/lib/db/quotaPools").PoolAllocation;
  }>;
  try {
    allocations = listAllocationsForApiKey(input.apiKeyId);
  } catch {
    return; // DB not available — silent no-op
  }

  if (!allocations.length) return;

  // Find the pool matching this connection.
  // Keep the matched pool object (not just its id) so plan resolution below
  // can use the pool's canonical primary connection — see (#13876).
  let matchedPool: import("@/lib/db/quotaPools").QuotaPool | null = null;
  for (const { poolId: pid } of allocations) {
    let p: import("@/lib/db/quotaPools").QuotaPool | null = null;
    try {
      p = getPool(pid);
    } catch {
      continue;
    }
    // D2: membership check — same logic as enforceQuotaShare above.
    if (
      p &&
      (Array.isArray(p.connectionIds)
        ? p.connectionIds.includes(input.connectionId)
        : p.connectionId === input.connectionId)
    ) {
      matchedPool = p;
      break;
    }
  }

  if (!matchedPool) return;
  const poolId = matchedPool.id;

  // Resolved from the pool's canonical (primary) connection so writes always
  // land under the same dimension shape the dashboard reads back via
  // resolvePlan(pool.connectionId, ...) — see enforceQuotaShare above (#13876).
  const plan = resolvePlan(matchedPool.connectionId, input.provider);
  const store = await getQuotaStore();

  // Pool-level dimension consumption (existing behaviour).
  for (const dim of plan.dimensions) {
    const dimKey = { poolId, unit: dim.unit, window: dim.window };
    const cost = costForUnit(input.cost, dim.unit);
    if (cost > 0) {
      await store.consume(input.apiKeyId, dimKey, cost).catch(() => {
        // Fail-open per B29 — drift expected; teto global do fetcher corrige
      });
    }
  }

  // Per-(key, model) consumption tracking (Fase 3 #7).
  // When the caller provides a model name, increment the model-scoped bucket so
  // that the next enforceQuotaShare call sees an up-to-date per-model count.
  // Only runs when a cap row actually exists (no cap → no bucket to maintain).
  if (input.model) {
    let modelCap: import("@/lib/db/quotaModelCaps").ModelCap | null = null;
    try {
      modelCap = getModelCap(poolId, input.apiKeyId, input.model);
    } catch {
      // DB not available — silent no-op per B29
    }
    if (modelCap && modelCap.capValue > Number.EPSILON) {
      const cost = costForUnit(input.cost, modelCap.capUnit);
      if (cost > 0) {
        const modelBucketPoolId = `${poolId}:model:${input.model}`;
        const modelDimKey = {
          poolId: modelBucketPoolId,
          unit: modelCap.capUnit,
          window: "hourly" as const,
        };
        await store.consume(input.apiKeyId, modelDimKey, cost).catch(() => {
          // Fail-open per B29
        });
      }
    }
  }

  // Scheduled own-consumption budget tracking.
  // The counter lives in its own dimension-key namespace so it measures exactly
  // what OmniRoute spent inside this window — never what the account spent in
  // total. Only maintained while a window with a budget is open; outside one
  // there is no bucket to keep.
  const budgetSchedule = activeBudgetSchedule(poolId);
  if (budgetSchedule?.budgetUnit) {
    const cost = costForUnit(input.cost, budgetSchedule.budgetUnit);
    if (cost > 0) {
      const scheduleDimKey = {
        poolId: scheduleBucketPoolId(poolId, budgetSchedule.id),
        unit: budgetSchedule.budgetUnit,
        window: budgetSchedule.budgetWindow,
      };
      await store.consume(input.apiKeyId, scheduleDimKey, cost).catch(() => {
        // Fail-open per B29
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Schedule gate
// ---------------------------------------------------------------------------

/**
 * Resolve the pool's enabled schedules and, when one applies, enforce it.
 *
 * Returns a block decision, or `null` to mean "schedules have nothing to say —
 * carry on with the regular fair-share path". Fail-open per B16 throughout: the
 * DB read is already guarded inside listEnabledSchedules, and the two signal
 * lookups below each fall back to the permissive value.
 *
 * Three ways a schedule can deny a request:
 *   outside-window / blackout — the clock is not inside a permitted window.
 *   schedule-reserve — the account's REMAINING upstream quota has fallen under
 *                      the floor this window insists on leaving behind. The
 *                      signal covers the whole account, so a human burning the
 *                      same credentials pushes OmniRoute out first.
 *   schedule-budget  — OmniRoute's OWN consumption inside the window has reached
 *                      the allowance. Read from a schedule-scoped counter, so it
 *                      is unaffected by whoever else is on the account.
 */
async function checkSchedules(
  poolId: string,
  plan: ProviderPlan,
  input: EnforceInput,
  store: QuotaStore
): Promise<EnforceDecision | null> {
  const schedules = listEnabledSchedules(poolId);
  if (schedules.length === 0) return null;

  const verdict = resolveActiveSchedule(schedules, Date.now());
  if (verdict.kind === "unscheduled") return null;

  if (verdict.kind === "closed") {
    await notifyQuotaExceeded(input, verdict.reason, verdict.schedule?.id);
    return {
      kind: "block",
      reason:
        verdict.reason === "blackout"
          ? `Provider ${input.provider} is in a scheduled blackout window [schedule]`
          : `Provider ${input.provider} is outside its permitted quota window [schedule]`,
      httpStatus: 429,
      ...(verdict.retryAfterSeconds !== undefined
        ? { retryAfterSeconds: verdict.retryAfterSeconds }
        : {}),
    };
  }

  const { schedule } = verdict;

  // "How much must be LEFT" — measured on the whole-account saturation signal,
  // one floor per quota window so a weekly reserve does not throttle every burst.
  if (schedule.reserves.length > 0) {
    const saturation = await planSaturation(plan, input, schedule);
    const breached = failingReserve(schedule, saturation);
    if (breached) {
      await notifyQuotaExceeded(input, "schedule-reserve", schedule.id);
      const scope = breached.window === "any" ? "quota" : `${breached.window} quota`;
      return {
        kind: "block",
        reason: `Provider ${input.provider} is below the ${breached.percent}% ${scope} reserve this window protects [schedule-reserve]`,
        httpStatus: 429,
      };
    }
  }

  // "How much may OMNIROUTE use" — measured on OmniRoute's own consumption only.
  if (schedule.budgetValue !== undefined && schedule.budgetUnit !== undefined) {
    const dimKey = {
      poolId: scheduleBucketPoolId(poolId, schedule.id),
      unit: schedule.budgetUnit,
      window: schedule.budgetWindow,
    };
    const consumed = await store.poolConsumedTotal(poolId, dimKey).catch(() => 0);
    if (consumed >= schedule.budgetValue) {
      await notifyQuotaExceeded(input, "schedule-budget", schedule.id);
      return {
        kind: "block",
        reason: `Scheduled ${schedule.budgetUnit} budget for ${input.provider} is spent for this window [schedule-budget]`,
        httpStatus: 429,
      };
    }
  }

  return null;
}

/**
 * Utilization (0..1) per quota window, for the windows this schedule's reserves
 * actually name — an "any" rule needs them all, a `weekly` rule needs only that
 * one, and no signal is fetched for a window nobody reserved.
 *
 * Placeholder dimensions (limit ≤ EPSILON) are skipped exactly as the main loop
 * skips them, and a failed lookup leaves the window absent so `failingReserve`
 * treats it as satisfied rather than as exhausted (B16).
 */
async function planSaturation(
  plan: ProviderPlan,
  input: EnforceInput,
  schedule: QuotaSchedule
): Promise<SaturationByWindow> {
  const wanted = reservedWindows(schedule);
  const needsEveryWindow = wanted.includes("any");
  const saturation: SaturationByWindow = {};

  for (const dim of plan.dimensions) {
    if (!(dim.limit > Number.EPSILON)) continue;
    if (!needsEveryWindow && !wanted.includes(dim.window)) continue;

    const used = await getSaturation(input.connectionId, input.provider, dim).catch(
      () => undefined
    );
    if (used === undefined || !Number.isFinite(used)) continue;

    // A provider can meter the same window under several units; the most
    // consumed one is what actually limits the account.
    const previous = saturation[dim.window];
    saturation[dim.window] = previous === undefined ? used : Math.max(previous, used);
  }

  return saturation;
}

/** Fire the quota.exceeded webhook. Best-effort — never blocks the decision. */
async function notifyQuotaExceeded(
  input: EnforceInput,
  reason: string,
  scheduleId?: string
): Promise<void> {
  try {
    const { notifyWebhookEvent } = await import("@/lib/webhookDispatcher");
    notifyWebhookEvent("quota.exceeded", {
      apiKeyId: input.apiKeyId,
      provider: input.provider,
      connectionId: input.connectionId,
      reason,
      ...(scheduleId ? { scheduleId } : {}),
    });
  } catch {
    // webhook is best-effort
  }
}

/**
 * The schedule whose own-consumption budget `recordConsumption` must increment,
 * or null when no window is open or the open one has no budget. Kept separate
 * from `checkSchedules` because the POST path must never block or signal — it
 * only needs to know which counter to bump.
 */
function activeBudgetSchedule(poolId: string): QuotaSchedule | null {
  const schedules = listEnabledSchedules(poolId);
  if (schedules.length === 0) return null;
  const verdict = resolveActiveSchedule(schedules, Date.now());
  if (verdict.kind !== "active") return null;
  const { schedule } = verdict;
  return schedule.budgetValue !== undefined && schedule.budgetUnit !== undefined ? schedule : null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function messageForReason(reason: string, provider: string): string {
  switch (reason) {
    case "fair-share":
      return `Quota share limit reached for your API key on ${provider}`;
    case "cap-absolute":
      return `Absolute quota cap reached for your API key on ${provider}`;
    case "global-saturated":
      return `Provider ${provider} quota window is saturated; no shared capacity available`;
    default:
      return "Quota share enforcement blocked the request";
  }
}

function costForUnit(cost: RecordConsumptionInput["cost"], unit: QuotaUnit): number {
  switch (unit) {
    case "tokens":
      return cost.tokens ?? 0;
    case "usd":
      return cost.usd ?? 0;
    case "requests":
      return cost.requests ?? 1;
    case "percent":
      // percent is a global signal; not incremented locally
      return 0;
    default:
      return 0;
  }
}
