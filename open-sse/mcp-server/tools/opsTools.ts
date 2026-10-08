/**
 * Ops-surface MCP tool handlers: health, combos, quota.
 *
 * #15159 M-01 — "file = register + wrap. handle* -> tools/canonical/*.ts".
 *
 * Extracted verbatim from `server.ts` (see that file's `createMcpServer`, which
 * now imports these). Nothing here changed behaviourally: every handler keeps
 * its original body, its `omniroute_*` audit tool name, and its
 * `toSafeMcpErrorMessage` catch. The move exists so `server.ts` can be read as
 * registration rather than as an implementation, and so this file can be read
 * without paging through eleven unrelated handlers to find one.
 *
 * Grouped by surface rather than one-file-per-handler: these six all speak to
 * OmniRoute's own management API and all share the fetch → audit → JSON shape,
 * so a sixth file would have been a near-copy. That also matches how
 * `advancedTools.ts` already holds sixteen handlers.
 *
 * Imports stay strictly downward — `internalFetch.ts`, `errorMessage.ts`,
 * `audit.ts`, `coercions.ts` are all leaves, so this module never acquires a
 * `server.ts` edge (the cycle M-06 removed). Pinned by
 * tests/unit/mcp-server-handler-extraction-15159.test.ts.
 */

import { logToolCall } from "../audit.ts";
import {
  isLaneFlagOn,
  normalizeComboModels,
  toArray,
  toFiniteNumber,
  toRecord,
  toString,
  toUptimeString,
  type JsonRecord,
} from "../coercions.ts";
import { toSafeMcpErrorMessage } from "../errorMessage.ts";
import { omniRouteFetch } from "../internalFetch.ts";
import { normalizeQuotaResponse } from "../../../src/shared/contracts/quota.ts";

export async function handleGetHealth() {
  const start = Date.now();
  try {
    const [healthRaw, resilienceRaw, rateLimitsRaw] = await Promise.allSettled([
      omniRouteFetch("/api/monitoring/health"),
      omniRouteFetch("/api/resilience"),
      omniRouteFetch("/api/rate-limits"),
    ]);

    const health = healthRaw.status === "fulfilled" ? toRecord(healthRaw.value) : {};
    const resilience = resilienceRaw.status === "fulfilled" ? toRecord(resilienceRaw.value) : {};
    const rateLimits = rateLimitsRaw.status === "fulfilled" ? toRecord(rateLimitsRaw.value) : {};
    const memoryUsageRaw = toRecord(health.memoryUsage);
    const cacheStatsRaw = toRecord(health.cacheStats);
    const resilienceCircuitBreakers = toArray(resilience.circuitBreakers);
    const rateLimitEntries = toArray(rateLimits.limits);
    const adaptiveAdmissionRaw = toRecord(health.adaptiveAdmission);
    // Curated lane subset: top lanes by queued cost so a congested tenant is
    // visible first without shipping the whole admission snapshot to agents.
    const laneTenants = toArray(adaptiveAdmissionRaw.laneTenants)
      .map((tenant) => {
        const record = toRecord(tenant);
        return {
          tenantKey: toString(record.tenantKey),
          queuedCount: toFiniteNumber(record.queuedCount, 0),
          queuedCost: toFiniteNumber(record.queuedCost, 0),
        };
      })
      .sort((a, b) => b.queuedCost - a.queuedCost)
      .slice(0, 10);

    // Surface fetch failures instead of letting Promise.allSettled's {} fallback
    // masquerade as genuine zero/empty data (indistinguishable "no data" vs.
    // "couldn't reach the source" was the actual root confusion this fixes).
    const degradedSources: Array<{ source: string; settled: PromiseSettledResult<unknown> }> = [
      { source: "health", settled: healthRaw },
      { source: "resilience", settled: resilienceRaw },
      { source: "rateLimits", settled: rateLimitsRaw },
    ];
    const degraded = degradedSources
      .filter(({ settled }) => settled.status === "rejected")
      .map(({ source, settled }) => ({
        source,
        error: toSafeMcpErrorMessage((settled as PromiseRejectedResult).reason, ""),
      }));

    const result = {
      uptime: toUptimeString(health.uptime),
      version: toString(health.version, "unknown"),
      memoryUsage: {
        heapUsed: toFiniteNumber(memoryUsageRaw.heapUsed, 0),
        heapTotal: toFiniteNumber(memoryUsageRaw.heapTotal, 0),
      },
      circuitBreakers: resilienceCircuitBreakers,
      rateLimits: rateLimitEntries,
      cacheStats:
        Object.keys(cacheStatsRaw).length > 0
          ? {
              hits: toFiniteNumber(cacheStatsRaw.hits, 0),
              misses: toFiniteNumber(cacheStatsRaw.misses, 0),
              hitRate: toFiniteNumber(cacheStatsRaw.hitRate, 0),
            }
          : undefined,
      cryptography: health.cryptography
        ? {
            status: toString(toRecord(health.cryptography).status, "missing_or_invalid"),
            provider: toString(toRecord(health.cryptography).provider, "unknown"),
          }
        : undefined,
      adaptiveAdmission:
        Object.keys(adaptiveAdmissionRaw).length > 0
          ? {
              virtualLanes: isLaneFlagOn(adaptiveAdmissionRaw.virtualLanes),
              pressure: toString(adaptiveAdmissionRaw.pressure),
              utilization: toFiniteNumber(adaptiveAdmissionRaw.utilization, 0),
              laneCount: toFiniteNumber(adaptiveAdmissionRaw.laneCount, 0),
              laneQueuedCount: toFiniteNumber(adaptiveAdmissionRaw.laneQueuedCount, 0),
              laneQueuedCost: toFiniteNumber(adaptiveAdmissionRaw.laneQueuedCost, 0),
              laneTenants,
              admittedCount: toFiniteNumber(adaptiveAdmissionRaw.admittedCount, 0),
              rejectedCount: toFiniteNumber(adaptiveAdmissionRaw.rejectedCount, 0),
              wouldRejectCount: toFiniteNumber(adaptiveAdmissionRaw.wouldRejectCount, 0),
              shutdown: isLaneFlagOn(adaptiveAdmissionRaw.shutdown),
            }
          : undefined,
      degraded: degraded.length > 0 ? degraded : undefined,
    };

    await logToolCall("omniroute_get_health", {}, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_get_health", {}, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleListCombos(args: { includeMetrics?: boolean }) {
  const start = Date.now();
  try {
    const combosRaw = await omniRouteFetch("/api/combos");
    const combosRecord = toRecord(combosRaw);
    const combos = Array.isArray(combosRecord.combos)
      ? combosRecord.combos
      : Array.isArray(combosRaw)
        ? combosRaw
        : [];
    let metrics: JsonRecord = {};
    if (args.includeMetrics) {
      metrics = toRecord(await omniRouteFetch("/api/combos/metrics").catch(() => ({})));
    }

    const result = {
      combos: toArray(combos).map((rawCombo) => {
        const combo = toRecord(rawCombo);
        const comboData = toRecord(combo.data);
        const comboId = toString(combo.id, "");
        const modelsSource =
          Array.isArray(combo.models) && combo.models.length > 0 ? combo.models : comboData.models;
        return {
          id: comboId,
          name: toString(combo.name, comboId || "unnamed"),
          models: normalizeComboModels(modelsSource),
          strategy: toString(combo.strategy, toString(comboData.strategy, "priority")),
          enabled: combo.enabled !== false,
          ...(args.includeMetrics ? { metrics: metrics[comboId] ?? null } : {}),
        };
      }),
    };

    await logToolCall("omniroute_list_combos", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_list_combos", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleGetComboMetrics(args: { comboId: string }) {
  const start = Date.now();
  try {
    const result = await omniRouteFetch(
      `/api/combos/metrics?comboId=${encodeURIComponent(args.comboId)}`
    );
    await logToolCall("omniroute_get_combo_metrics", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_get_combo_metrics", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleSwitchCombo(args: { comboId: string; active: boolean }) {
  const start = Date.now();
  try {
    const result = await omniRouteFetch(`/api/combos/${encodeURIComponent(args.comboId)}`, {
      method: "PUT",
      body: JSON.stringify({ isActive: args.active }),
    });
    await logToolCall("omniroute_switch_combo", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_switch_combo", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleCreateCombo(args: {
  name: string;
  description?: string;
  strategy?: string;
  models: { provider: string; model: string }[];
}) {
  const start = Date.now();
  try {
    const result = await omniRouteFetch("/api/combos", {
      method: "POST",
      body: JSON.stringify(args),
    });
    await logToolCall("omniroute_create_combo", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_create_combo", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleCheckQuota(args: { provider?: string; connectionId?: string }) {
  const start = Date.now();
  try {
    let path = "/api/usage/quota";
    if (args.connectionId) path += `?connectionId=${encodeURIComponent(args.connectionId)}`;
    else if (args.provider) path += `?provider=${encodeURIComponent(args.provider)}`;

    const result = normalizeQuotaResponse(await omniRouteFetch(path), {
      provider: args.provider || null,
      connectionId: args.connectionId || null,
    });

    await logToolCall("omniroute_check_quota", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_check_quota", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}
