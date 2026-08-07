/**
 * lib/usage/comboState.ts — Live decision-state snapshot for a routing combo.
 *
 * Complements comboHealth.ts (pure telemetry) with the runtime state a human
 * actually needs to explain "why did it pick X / is it healthy?":
 *   - context-cache pinning   (session_model_history)
 *   - adaptation cooldown     (combo_adaptation_state)
 *   - learned score           (combo_adaptation_state.learned_score)
 *   - resident/warm models    (ollama /api/ps)
 *   - capability flags        (provider registry)
 *   - recent events           (call_logs)
 *
 * Served by GET /api/usage/combo-state and rendered by `omniroute combo health`.
 */

import { getComboById, getCombos } from "@/lib/db/combos";
import { getDbInstance } from "@/lib/db/core";
import { getComboAdaptationByModel } from "@/lib/db/comboAdaptation";
import { getPinEffectiveness, type PinEffectivenessStats } from "@/lib/db/pinEffectiveness";
import { buildComboHealthResponse } from "@/lib/usage/comboHealth";
import { resolveNestedComboTargets } from "@omniroute/open-sse/services/combo.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providers/index.ts";
import type {
  ComboRecord,
  ComboHealthMetrics,
  UtilizationTimeRange,
} from "@/shared/types/utilization";

const OLLAMA_PS_TIMEOUT_MS = 1500;

export type ComboTargetState = {
  stepId: string;
  executionKey: string;
  model: string;
  provider: string;
  label: string | null;
  order: number;
  state: "pinned" | "cooldown" | "warm" | "idle";
  stateReason: string;
  cooldownUntil: string | null;
  cooldownRemainingMs: number | null;
  pinnedSessions: number;
  warm: boolean;
  learnedScore: number | null;
  consecutiveFailures: number;
  requests: number;
  successRate: number;
  avgLatencyMs: number;
  lastStatus: "ok" | "error" | null;
  lastUsedAt: string | null;
  capability: {
    toolCalling: boolean;
    supportsVision: boolean;
    contextLength: number;
  } | null;
};

export type ComboStateMetrics = {
  comboId: string;
  comboName: string;
  strategy: string;
  enabled: boolean;
  overview: {
    activeSessions: number;
    pinnedModel: string | null;
    pinnedSince: string | null;
    pinnedSessions: number;
    totalRequests: number;
    successRate: number;
    avgLatencyMs: number;
    totalTargets: number;
  };
  pinEffectiveness: PinEffectivenessStats;
  selection: {
    method: "pinned" | "priority";
    pinnedModel: string | null;
    nextFallback: string | null;
    notes: string[];
  };
  targets: ComboTargetState[];
  events: Array<{
    time: string;
    model: string | null;
    status: number;
    ok: boolean;
    durationMs: number;
    error: string | null;
  }>;
};

export type ComboStateResponse = {
  timeRange: UtilizationTimeRange;
  asOf: string;
  ollamaReachable: boolean;
  combos: ComboStateMetrics[];
};

const RANGE_MS: Record<UtilizationTimeRange, number> = {
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

function getRangeStartIso(range: UtilizationTimeRange, now = Date.now()): string {
  return new Date(now - RANGE_MS[range]).toISOString();
}

function roundNumber(value: number, digits = 2): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(digits));
}

function toSafeNumber(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getOllamaHost(): string {
  return (process.env.OMNIROUTE_OLLAMA_HOST?.trim() || "http://localhost:11434").replace(
    /\/+$/,
    ""
  );
}

/** "ollama-local/llama3.1:latest" → "llama3.1:latest" */
function stripProviderPrefix(modelStr: string): string {
  if (!modelStr) return modelStr;
  const slash = modelStr.lastIndexOf("/");
  return slash >= 0 ? modelStr.slice(slash + 1) : modelStr;
}

/**
 * SQLite datetime('now') yields "YYYY-MM-DD HH:MM:SS" (UTC) — not ISO.
 * Normalize to an epoch so age/ago math works, falling back to raw value.
 */
function parseSqliteTimestamp(value: unknown): number | null {
  const text = toNonEmptyString(value);
  if (!text) return null;
  const ms = Date.parse(text.includes("T") ? text : `${text.replace(" ", "T")}Z`);
  return Number.isFinite(ms) ? ms : null;
}

function formatAge(ms: number | null): string {
  if (ms === null) return "-";
  const totalMinutes = Math.floor(ms / 60_000);
  if (totalMinutes < 1) return "just now";
  if (totalMinutes < 60) return `${totalMinutes}m ago`;
  const hours = Math.floor(totalMinutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h ago`;
}

// ── Data sources ────────────────────────────────────────────────────────────

type PinRow = {
  sessionId: string;
  modelStr: string;
  provider: string | null;
  usedAt: string | null;
};

/** Latest session_model_history pin per session for a combo. */
function getComboPins(comboName: string): PinRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT session_id AS sessionId, model_str AS modelStr,
              provider, used_at AS usedAt
       FROM session_model_history
       WHERE combo_name = ?
         AND id IN (
           SELECT MAX(id) FROM session_model_history
           WHERE combo_name = ?
           GROUP BY session_id
         )`
    )
    .all(comboName, comboName) as PinRow[];
  return rows;
}

type EventRow = {
  timestamp: string;
  model: string | null;
  status: number | null;
  duration: number | null;
  error_summary: string | null;
};

function getComboEvents(comboName: string, since: string, limit = 12): ComboStateMetrics["events"] {
  try {
    const db = getDbInstance();
    const rows = db
      .prepare(
        `SELECT timestamp, model, status, duration, error_summary
         FROM call_logs
         WHERE combo_name = ? AND timestamp >= ?
         ORDER BY timestamp DESC, id DESC
         LIMIT ?`
      )
      .all(comboName, since, limit) as EventRow[];
    return rows.map((row) => {
      const status = toSafeNumber(row.status);
      return {
        time: row.timestamp ?? "",
        model: toNonEmptyString(row.model),
        status,
        ok: status > 0 && status < 400,
        durationMs: Math.round(toSafeNumber(row.duration)),
        error: toNonEmptyString(row.error_summary),
      };
    });
  } catch {
    return [];
  }
}

/** Models currently resident in ollama (warm). Returns null when unreachable. */
async function getOllamaResidentModels(): Promise<Set<string> | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), OLLAMA_PS_TIMEOUT_MS);
    const res = await fetch(`${getOllamaHost()}/api/ps`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as { models?: Array<{ name: string }> };
    return new Set((data.models ?? []).map((model) => model.name));
  } catch {
    return null;
  }
}

type Capability = ComboTargetState["capability"];

function getRegistryCapability(provider: string, bareModel: string): Capability {
  try {
    const entry = REGISTRY[provider];
    if (!entry) return null;
    const model = (entry.models ?? []).find((candidate) => candidate.id === bareModel);
    if (!model) return null;
    return {
      toolCalling: model.toolCalling === true,
      supportsVision: model.supportsVision === true,
      contextLength:
        typeof model.contextLength === "number"
          ? model.contextLength
          : typeof entry.defaultContextLength === "number"
            ? entry.defaultContextLength
            : 0,
    };
  } catch {
    return null;
  }
}

type ResolvedTargetView = {
  stepId: string;
  executionKey: string;
  modelStr: string;
  provider: string;
  connectionId: string | null;
  label: string | null;
};

// ── Per-combo assembly ──────────────────────────────────────────────────────

function buildComboState(
  combo: ComboRecord,
  range: UtilizationTimeRange,
  now: number,
  allCombos: ComboRecord[],
  health: ComboHealthMetrics | null,
  residentModels: Set<string>
): ComboStateMetrics {
  const comboId = typeof combo.id === "string" ? combo.id : "";
  const comboName = typeof combo.name === "string" ? combo.name : "";
  const strategy =
    typeof combo.strategy === "string" && combo.strategy.trim().length > 0
      ? combo.strategy
      : "priority";
  const enabled = (combo as unknown as { enabled?: boolean }).enabled !== false;

  const targets = resolveNestedComboTargets(combo, allCombos) as ResolvedTargetView[];
  const targetByModel = new Map<string, ResolvedTargetView>();
  for (const target of targets) targetByModel.set(target.modelStr, target);

  const targetHealthByKey = new Map<
    string,
    NonNullable<ComboHealthMetrics["targetHealth"]>[number]
  >();
  for (const entry of health?.targetHealth ?? []) {
    targetHealthByKey.set(entry.executionKey, entry);
    if (entry.stepId) targetHealthByKey.set(entry.stepId, entry);
    targetHealthByKey.set(entry.model, entry);
  }

  // Pins: latest per-session pin rows for this combo.
  const pins = getComboPins(comboName);
  const pinnedSessionsByModel = new Map<string, number>();
  let latestPin: PinRow | null = null;
  for (const pin of pins) {
    pinnedSessionsByModel.set(pin.modelStr, (pinnedSessionsByModel.get(pin.modelStr) ?? 0) + 1);
    const pinMs = parseSqliteTimestamp(pin.usedAt);
    const latestMs = latestPin ? parseSqliteTimestamp(latestPin.usedAt) : null;
    if (pinMs !== null && (latestMs === null || pinMs > latestMs)) latestPin = pin;
  }

  // Adaptation rows (keyed by full provider-prefixed modelStr).
  let adaptation: ReturnType<typeof getComboAdaptationByModel> = new Map();
  try {
    adaptation = getComboAdaptationByModel(comboName);
  } catch {
    adaptation = new Map();
  }

  const targetStates: ComboTargetState[] = targets.map((target, index) => {
    const bareModel = stripProviderPrefix(target.modelStr);
    const adaptationState = adaptation.get(target.modelStr);
    const healthEntry =
      targetHealthByKey.get(target.executionKey) || targetHealthByKey.get(target.modelStr);
    const cooldownMs =
      adaptationState?.cooldownUntil != null
        ? Date.parse(adaptationState.cooldownUntil)
        : Number.NaN;
    const inCooldown = Number.isFinite(cooldownMs) && cooldownMs > now;
    // comboHealth reports target successRate as a 0-100 percentage; normalize
    // to a 0-1 ratio so it matches overview.successRate (performance table).
    let rawSuccessRate = toSafeNumber(healthEntry?.successRate);
    if (rawSuccessRate > 1) rawSuccessRate /= 100;
    const pinnedSessions = pinnedSessionsByModel.get(target.modelStr) ?? 0;
    const warm = residentModels.has(bareModel) || residentModels.has(target.modelStr);

    let state: ComboTargetState["state"] = "idle";
    const reasons: string[] = [];
    if (inCooldown) {
      state = "cooldown";
      reasons.push(
        `cooldown for ${Math.ceil((cooldownMs - now) / 60_000)}m (${toSafeNumber(
          adaptationState?.consecutiveFailures
        )} consecutive failures)`
      );
    } else if (pinnedSessions > 0) {
      state = "pinned";
      reasons.push(`${pinnedSessions} session${pinnedSessions === 1 ? "" : "s"} pinned`);
    } else if (warm) {
      state = "warm";
      reasons.push("resident in ollama (no reload on next request)");
    }

    if (warm && state !== "warm") reasons.push("warm");
    if (adaptationState && Number.isFinite(adaptationState.learnedScore)) {
      reasons.push(`learned ${roundNumber(adaptationState.learnedScore)}`);
    }

    return {
      stepId: target.stepId,
      executionKey: target.executionKey,
      model: target.modelStr,
      provider: target.provider,
      label: target.label,
      order: index + 1,
      state,
      stateReason: reasons.length > 0 ? reasons.join(" · ") : "eligible at priority order",
      cooldownUntil: adaptationState?.cooldownUntil ?? null,
      cooldownRemainingMs: inCooldown ? Math.round(cooldownMs - now) : null,
      pinnedSessions,
      warm,
      learnedScore:
        adaptationState && Number.isFinite(adaptationState.learnedScore)
          ? roundNumber(adaptationState.learnedScore)
          : null,
      consecutiveFailures: toSafeNumber(adaptationState?.consecutiveFailures),
      requests: toSafeNumber(healthEntry?.requests),
      successRate: rawSuccessRate,
      avgLatencyMs: toSafeNumber(healthEntry?.avgLatencyMs),
      lastStatus: healthEntry?.lastStatus ?? null,
      lastUsedAt: healthEntry?.lastUsedAt ?? null,
      capability: getRegistryCapability(target.provider, bareModel),
    };
  });

  // Selection explanation.
  const pinnedModel = latestPin ? latestPin.modelStr : null;
  const pinnedTargetStillPresent = pinnedModel !== null && targetByModel.has(pinnedModel);
  const method: ComboStateMetrics["selection"]["method"] =
    pinnedModel !== null && pinnedTargetStillPresent ? "pinned" : "priority";
  const nextFallback = targetStates.find((target) => target.state !== "cooldown")?.model ?? null;

  const notes: string[] = [];
  if (method === "pinned") {
    const pinnedTarget = targetStates.find((target) => target.model === pinnedModel);
    notes.push(
      `context-cache pinning → re-routes to last used model "${stripProviderPrefix(pinnedModel!)}"`
    );
    if (pinnedTarget?.state === "cooldown") {
      notes.push(`⚠ pinned model is in adaptation cooldown — pin bypasses cooldown`);
    }
  } else if (strategy === "priority") {
    notes.push(
      "no pin → priority order decides at cold start" +
        (nextFallback ? ` (next: "${stripProviderPrefix(nextFallback)}")` : "")
    );
  }
  if (targetStates.some((target) => target.warm)) {
    notes.push("ollama has model(s) resident — warm path avoids reload");
  }
  if (pins.length === 0) {
    notes.push("no session pins recorded yet");
  }

  const performance = health?.performance;
  return {
    comboId,
    comboName,
    strategy,
    enabled,
    overview: {
      activeSessions: pins.length,
      pinnedModel,
      pinnedSince: latestPin?.usedAt ?? null,
      pinnedSessions: latestPin ? (pinnedSessionsByModel.get(latestPin.modelStr) ?? 0) : 0,
      totalRequests: toSafeNumber(performance?.totalRequests),
      successRate: toSafeNumber(performance?.successRate),
      avgLatencyMs: toSafeNumber(performance?.avgLatencyMs),
      totalTargets: targets.length,
    },
    pinEffectiveness: getPinEffectiveness(comboName, now),
    selection: { method, pinnedModel, nextFallback, notes },
    targets: targetStates,
    events: getComboEvents(comboName, getRangeStartIso(range, now)),
  };
}

export async function buildComboStateResponse(opts: {
  range: UtilizationTimeRange;
  comboId?: string;
  comboName?: string;
  now?: number;
  combos?: ComboRecord[];
}): Promise<ComboStateResponse> {
  const now = opts.now ?? Date.now();
  const allCombos = opts.combos ?? ((await getCombos()) as ComboRecord[]);

  let combos: ComboRecord[] = allCombos;
  if (opts.comboId) {
    const combo =
      allCombos.find((entry) => entry.id === opts.comboId) ||
      ((await getComboById(opts.comboId)) as ComboRecord | null);
    combos = combo ? [combo] : [];
  } else if (opts.comboName) {
    combos = allCombos.filter(
      (entry) =>
        (entry.name ?? "").toLowerCase() === opts.comboName!.toLowerCase() ||
        (entry.id ?? "").toLowerCase() === opts.comboName!.toLowerCase()
    );
  }

  if (combos.length === 0) {
    return {
      timeRange: opts.range,
      asOf: new Date(now).toISOString(),
      ollamaReachable: false,
      combos: [],
    };
  }

  const [ollamaResident, healthResponse] = await Promise.all([
    getOllamaResidentModels(),
    buildComboHealthResponse({ range: opts.range, comboId: opts.comboId, now, combos: allCombos }),
  ]);
  const residentModels = ollamaResident ?? new Set<string>();

  const healthByComboId = new Map(healthResponse.combos.map((entry) => [entry.comboId, entry]));

  return {
    timeRange: opts.range,
    asOf: new Date(now).toISOString(),
    ollamaReachable: ollamaResident !== null,
    combos: combos
      .map((combo) => {
        const comboId = typeof combo.id === "string" ? combo.id : "";
        return buildComboState(
          combo,
          opts.range,
          now,
          allCombos,
          healthByComboId.get(comboId) ?? null,
          residentModels
        );
      })
      .filter((combo): combo is ComboStateMetrics => combo.comboId.length > 0),
  };
}

export { formatAge, parseSqliteTimestamp };
