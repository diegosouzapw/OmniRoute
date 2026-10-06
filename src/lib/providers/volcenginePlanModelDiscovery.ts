/**
 * Volcano Ark Plan — live model discovery via console APIs.
 *
 * Both Plan subscriptions have NO usable `/models` endpoint on the chat API
 * (`/api/plan/v3` returns 404; coding `/api/coding/v3/models` is unreliable).
 * The authoritative model catalog is instead exposed by the console's
 * top-level Ark actions, authenticated by the same console cookie + csrf
 * token already captured during plan binding (see volcenginePlanBinding.ts).
 *
 *  - Agent Plan:  `ListAgentPlanLatestModel` → Result.Data[]
 *      id    : ModelId (version-suffixed, matches chat endpoint)
 *  - Coding Plan: `ListArkCodeLatestModel` → Result.Data[]
 *      id    : ModelId (version-suffixed)
 *
 * Both APIs return the same response shape (ModelId / OutputName / Enabled /
 * Description / EnabledThinking). We keep ALL entries — the chat endpoint
 * accepts every listed ModelId, and `Enabled` only reflects console visibility.
 *
 * The console API returns only id/name/description — NOT capabilities
 * (contextLength, toolCalling, vision, reasoning). We enrich each discovered
 * model from a static family→capability map keyed by the OutputName/ModelName
 * prefix, falling back to conservative defaults so new families stay usable
 * without a code change.
 *
 * Output shape matches SyncedAvailableModelInput so the sync-models route can
 * persist it via replaceSyncedAvailableModelsForConnection.
 */

import type { SyncedAvailableModelInput } from "@/lib/db/models/synced";

type JsonRecord = Record<string, unknown>;

export type VolcPlanKind = "agent" | "coding";

export interface DiscoveredVolcModel {
  id: string;
  name: string;
  description?: string;
  enabledThinking?: boolean;
}

const CONSOLE_TOP_BASE = "https://console.volcengine.com/api/top/ark/cn-beijing/2024-01-01";
const AGENT_PLAN_REFERER =
  "https://console.volcengine.com/ark/region:cn-beijing/subscription/agent-plan";
const CODING_PLAN_REFERER =
  "https://console.volcengine.com/ark/region:cn-beijing/subscription/coding-plan";

function stringField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
function record(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

interface ConsoleApiResult {
  ok: boolean;
  status: number;
  json: JsonRecord;
  error: string | null;
}

/**
 * Hit the Volcano console API directly via undici, BYPASSING OmniRoute's
 * global fetch patch (open-sse/utils/proxyFetch.ts) which is built for LLM
 * provider traffic and reroutes/rewrites requests to console.volcengine.com.
 * Dynamic import so the build cannot extern/strip the dependency.
 */
async function callConsoleApiDirect(
  action: string,
  payload: JsonRecord,
  cookieHeader: string,
  csrfToken: string,
  referer: string
): Promise<ConsoleApiResult> {
  const { fetch: pristineFetch } = await import("undici");
  const response = await pristineFetch(`${CONSOLE_TOP_BASE}/${action}?`, {
    method: "POST",
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
      cookie: cookieHeader,
      origin: "https://console.volcengine.com",
      referer,
      "x-csrf-token": csrfToken,
    },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  let json: JsonRecord = {};
  try {
    json = record(JSON.parse(text));
  } catch {
    // Non-JSON console failures are reported through `error` below.
  }
  const meta = record(json.ResponseMetadata);
  const err = record(meta.Error);
  const message = stringField(err.Message);
  return {
    ok: response.ok && !message,
    status: response.status,
    json,
    error: message || (response.ok ? null : text.slice(0, 200)),
  };
}

async function detectPlan(
  kind: VolcPlanKind,
  cookieHeader: string,
  csrfToken: string
): Promise<{ available: boolean; error: string | null }> {
  const action = kind === "agent" ? "GetAgentPlanAFPUsage" : "GetCodingPlanUsage";
  const referer = kind === "agent" ? AGENT_PLAN_REFERER : CODING_PLAN_REFERER;
  const result = await callConsoleApiDirect(action, {}, cookieHeader, csrfToken, referer);
  if (!result.ok) {
    return { available: false, error: result.error };
  }
  return { available: true, error: null };
}

const PLAN_DISCOVERY_CONFIG: Record<
  VolcPlanKind,
  {
    action: string;
    /** Base payload; coding plan needs AccountId injected per-request. */
    payload: JsonRecord;
    referer: string;
    /** Whether the listing API requires the console AccountId in the body. */
    requiresAccountId: boolean;
  }
> = {
  agent: {
    action: "ListAgentPlanLatestModel",
    payload: {},
    referer: AGENT_PLAN_REFERER,
    requiresAccountId: false,
  },
  coding: {
    action: "ListArkCodeLatestModel",
    payload: {},
    referer: CODING_PLAN_REFERER,
    requiresAccountId: true,
  },
};

/**
 * Extract the numeric `AccountID` from the console cookie jar. The Coding Plan
 * listing API requires `{AccountId: <number>}` in the body (string is rejected
 * with InvalidParameter). The AccountID is always present in an authenticated
 * console cookie, so this avoids a separate binding field / DB migration.
 */
function extractAccountId(cookieHeader: string): number | null {
  const raw = cookieHeader.match(/(?:^|;\s*)AccountID=([^;]+)/i)?.[1]?.trim();
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Family→capability enrichment. The console API does not return context
 * window / tool / vision / reasoning flags, so we seed them from the model
 * family. Keyed by the canonical model name (RespModelName / OutputName /
 * ModelName) lowercased; a `*`-prefixed entry matches by prefix.
 *
 * Values mirror the curated static registry (volcengine/{agent,coding}-plan)
 * so behavior is unchanged for known models; unknown families fall back to
 * `enrichWithDefaults`.
 */
const FAMILY_CAPABILITY_MAP: Array<{
  match: string;
  contextLength: number;
  toolCalling: boolean;
  supportsVision: boolean;
  supportsReasoning: boolean;
}> = [
  // Doubao Seed 2.x turbo / mini — 256K, multimodal
  {
    match: "doubao-seed-2-1-turbo",
    contextLength: 262144,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    match: "doubao-seed-2-0-mini",
    contextLength: 262144,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  // Doubao Seed 2.0 lite — 256K, multimodal
  {
    match: "doubao-seed-2-0-lite",
    contextLength: 262144,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  // Doubao Seed Evolving — 1M
  {
    match: "doubao-seed-evolving",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  // DeepSeek V4 family — 1M, text-only reasoning
  {
    match: "deepseek-v4",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: false,
    supportsReasoning: true,
  },
  // GLM 5.x — 1M
  {
    match: "glm-5",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: false,
    supportsReasoning: true,
  },
  // Kimi K3 / K2.7 code — 1M, multimodal
  {
    match: "kimi-k3",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    match: "kimi-k2.7-code",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  {
    match: "kimi-k2-7-code",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: true,
    supportsReasoning: true,
  },
  // Kimi K2.6 — 1M
  {
    match: "kimi-k2.6",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: false,
    supportsReasoning: true,
  },
  // MiniMax M3 / M2.7 — 1M
  {
    match: "minimax-m3",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: false,
    supportsReasoning: true,
  },
  {
    match: "minimax-m2.7",
    contextLength: 1048576,
    toolCalling: true,
    supportsVision: false,
    supportsReasoning: true,
  },
];

const DEFAULT_CAPABILITY = {
  contextLength: 131072,
  toolCalling: true,
  supportsVision: false,
  supportsReasoning: true,
};

function matchFamily(name: string) {
  const lower = name.trim().toLowerCase();
  if (!lower) return null;
  // Prefer exact match, then prefix match.
  for (const entry of FAMILY_CAPABILITY_MAP) {
    if (entry.match === lower) return entry;
  }
  for (const entry of FAMILY_CAPABILITY_MAP) {
    if (lower.startsWith(entry.match)) return entry;
  }
  return null;
}

export function enrichModel(model: DiscoveredVolcModel): SyncedAvailableModelInput {
  const family = matchFamily(model.name) ?? matchFamily(model.id) ?? DEFAULT_CAPABILITY;
  return {
    id: model.id,
    name: model.name || model.id,
    source: "imported",
    apiFormat: "chat-completions",
    supportedEndpoints: ["chat"],
    inputTokenLimit: family.contextLength,
    supportsTools: family.toolCalling,
    supportsVision: family.supportsVision,
    supportsThinking: model.enabledThinking ?? family.supportsReasoning,
    ...(model.description ? { description: model.description } : {}),
  };
}

/**
 * Parse `ListAgentPlanLatestModel` / `ListArkCodeLatestModel` Result.Data[].
 *
 * Both console APIs return the same response shape: each entry has
 * `ModelId` (the version-suffixed ID accepted by the chat endpoint),
 * `OutputName` / `ModelName` (the canonical family name used for capability
 * enrichment), `Enabled` (console visibility — not API availability), and
 * optional `Description` / `EnabledThinking`.
 *
 * We keep ALL entries with a non-empty `ModelId`. The chat endpoint accepts
 * every listed model; `Enabled` only controls whether the model appears in
 * the console's model picker, so filtering on it would hide callable models.
 */
export function parseLatestModelList(json: JsonRecord): DiscoveredVolcModel[] {
  const data = record(json.Result).Data;
  const arr = Array.isArray(data) ? data : [];
  const out: DiscoveredVolcModel[] = [];
  for (const raw of arr) {
    const item = record(raw);
    const id = stringField(item.ModelId);
    if (!id) continue;
    const name = stringField(item.OutputName) || stringField(item.ModelName) || id;
    const enabledThinking = item.EnabledThinking === true || item.EnabledThinking === "true";
    const desc = stringField(item.Description);
    out.push({
      id,
      name,
      ...(desc ? { description: desc } : {}),
      ...(enabledThinking ? { enabledThinking: true } : {}),
    });
  }
  return out;
}

/**
 * Fetch the live model list for a Volcano Ark plan subscription using the
 * console cookie + csrf token stored on the connection's providerSpecificData.
 *
 * Verifies the plan subscription is still active (detectPlan) before listing,
 * so an expired/disabled plan returns a clear error instead of a stale/empty
 * catalog that would erase the user's synced models.
 */
export async function fetchVolcPlanModels(
  kind: VolcPlanKind,
  cookieHeader: string,
  csrfToken: string
): Promise<SyncedAvailableModelInput[]> {
  if (!cookieHeader || !csrfToken) {
    throw new Error("Volcano console cookie or csrfToken is missing — re-bind the plan");
  }

  // Validate the subscription/credentials are still live.
  const detected = await detectPlan(kind, cookieHeader, csrfToken);
  if (!detected.available) {
    throw new Error(
      `Volcano ${kind} plan unavailable${detected.error ? `: ${detected.error}` : ""} — re-bind the plan`
    );
  }

  const cfg = PLAN_DISCOVERY_CONFIG[kind];
  const payload: JsonRecord = { ...cfg.payload };
  if (cfg.requiresAccountId) {
    const accountId = extractAccountId(cookieHeader);
    if (accountId === null) {
      throw new Error(
        `Volcano ${kind} plan discovery requires AccountId, but none found in console cookie — re-bind the plan`
      );
    }
    payload.AccountId = accountId;
  }
  const result = await callConsoleApiDirect(
    cfg.action,
    payload,
    cookieHeader,
    csrfToken,
    cfg.referer
  );
  if (!result.ok) {
    throw new Error(
      `Volcano ${kind} plan model discovery (${cfg.action}) failed${result.error ? `: ${result.error}` : ""}`
    );
  }

  const discovered = parseLatestModelList(result.json);
  if (discovered.length === 0) {
    throw new Error(`Volcano ${kind} plan returned no usable models`);
  }
  return discovered.map(enrichModel);
}

export function providerToVolcPlanKind(providerId: string): VolcPlanKind | null {
  const id = providerId.trim().toLowerCase();
  if (id === "volcengine-agent-plan") return "agent";
  if (id === "volcengine-coding-plan") return "coding";
  return null;
}
