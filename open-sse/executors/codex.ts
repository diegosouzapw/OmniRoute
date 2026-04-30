import { getCodexRequestDefaults } from "@/lib/providers/requestDefaults";
import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  setUserAgentHeader,
  type ExecuteInput,
} from "./base.ts";
import {
  CODEX_CHAT_DEFAULT_INSTRUCTIONS,
  CODEX_DEFAULT_INSTRUCTIONS,
} from "../config/codexInstructions.ts";
import { PROVIDERS } from "../config/constants.ts";
import {
  getCodexClientVersion,
  getCodexUserAgent,
  normalizeCodexSessionId,
} from "../config/codexClient.ts";
import {
  applyCodexClientIdentityHeaders,
  applyCodexClientMetadata,
  createCodexClientIdentity,
} from "../config/codexIdentity.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";
import {
  getRememberedFunctionCallsByIds,
  getRememberedResponseConversationItems,
  getRememberedResponseFunctionCalls,
} from "../services/responsesToolCallState.ts";
import { getThinkingBudgetConfig, ThinkingMode } from "../services/thinkingBudget.ts";
import { CORS_HEADERS } from "../utils/cors.ts";
import { createRequire } from "module";

// ─── wreq-js lazy loader ───────────────────────────────────────────────────
// wreq-js is a Rust-native module that requires platform-specific .node binaries.
// Loading it eagerly crashes the server when the binary is missing (pnpm, Docker
// Alpine, unsupported architectures). We lazy-load with try/catch to gracefully
// fall back to HTTP transport when the WebSocket transport is unavailable.
const _wreqRequire = createRequire(import.meta.url);

type WreqWebSocket = {
  send: (data: string) => void;
  close: (code?: number, reason?: string) => void;
  onmessage: ((event: { data: unknown }) => void) | null;
  onerror: ((event: { message?: string }) => void) | null;
  onclose: (() => void) | null;
};
type WebsocketFn = (url: string, opts?: Record<string, unknown>) => Promise<WreqWebSocket>;

let _websocketFn: WebsocketFn | null = null;
let _wreqChecked = false;
let _websocketOverride: WebsocketFn | null | undefined;

function getCodexWebSocketTransport(): WebsocketFn | null {
  if (_websocketOverride !== undefined) return _websocketOverride;
  if (_wreqChecked) return _websocketFn;
  _wreqChecked = true;
  try {
    const mod = _wreqRequire("wreq-js") as { websocket?: WebsocketFn };
    _websocketFn = typeof mod.websocket === "function" ? mod.websocket : null;
  } catch {
    _websocketFn = null;
  }
  return _websocketFn;
}

export function __setCodexWebSocketTransportForTesting(
  websocket: WebsocketFn | null | undefined
): void {
  _websocketOverride = websocket;
}

function codexWebSocketUnavailableResponse(): Response {
  return new Response(
    JSON.stringify({
      error: {
        code: "wreq_unavailable",
        message:
          "Codex WebSocket transport unavailable: wreq-js native module is missing for this platform",
      },
    }),
    {
      status: 503,
      headers: {
        "Content-Type": "application/json",
        ...CORS_HEADERS,
      },
    }
  );
}

// ─── T09: Codex vs Spark Scope-Aware Rate Limiting ────────────────────────
// Codex has two independent quota pools: "codex" (standard) and "spark" (premium).
// Exhausting one should NOT block requests to the other.
// Ref: sub2api PR #1129 (feat(openai): split codex spark rate limiting from codex)

/**
 * Maps model name substrings to their rate-limit scope.
 * Checked in order — first match wins.
 */
const CODEX_SCOPE_PATTERNS: Array<{ pattern: string; scope: "codex" | "spark" }> = [
  { pattern: "codex-spark", scope: "spark" },
  { pattern: "spark", scope: "spark" },
  { pattern: "codex", scope: "codex" },
  { pattern: "gpt-5", scope: "codex" }, // gpt-5.2-codex, gpt-5.3-codex, etc.
];

/**
 * T09: Determine the rate-limit scope for a Codex model.
 * Use this key as the suffix for per-scope rate limit state:
 *   `${accountId}:${getModelScope(model)}`
 *
 * @param model - The Codex model ID (e.g. "gpt-5.3-codex", "codex-spark-mini")
 * @returns "codex" | "spark"
 */
export function getCodexModelScope(model: string): "codex" | "spark" {
  const lower = model.toLowerCase();
  for (const { pattern, scope } of CODEX_SCOPE_PATTERNS) {
    if (lower.includes(pattern)) return scope;
  }
  return "codex"; // default scope
}

/**
 * T09: Get the scope-keyed rate limit identifier for an account+model combination.
 * Use this as the key for rateLimitState maps to ensure scope isolation.
 */
export function getCodexRateLimitKey(accountId: string, model: string): string {
  return `${accountId}:${getCodexModelScope(model)}`;
}

/**
 * T03: Parsed quota snapshot from Codex response headers.
 * Codex includes per-account usage windows that allow precise reset scheduling.
 * Ref: sub2api PR #357 (feat(oauth): persist usage snapshots and window cooldown)
 */
export interface CodexQuotaSnapshot {
  usage5h: number; // tokens used in 5h window
  limit5h: number; // token limit for 5h window
  resetAt5h: string | null; // ISO timestamp when 5h window resets
  usage7d: number; // tokens used in 7d window
  limit7d: number; // token limit for 7d window
  resetAt7d: string | null; // ISO timestamp when 7d window resets
}

/**
 * T03: Parse Codex-specific quota headers from a provider response.
 * Returns null if none of the relevant headers are present.
 *
 * Extracts:
 *   x-codex-5h-usage / x-codex-5h-limit / x-codex-5h-reset-at
 *   x-codex-7d-usage / x-codex-7d-limit / x-codex-7d-reset-at
 */
export function parseCodexQuotaHeaders(headers: Headers): CodexQuotaSnapshot | null {
  const usage5h = headers.get("x-codex-5h-usage");
  const limit5h = headers.get("x-codex-5h-limit");
  const resetAt5h = headers.get("x-codex-5h-reset-at");
  const usage7d = headers.get("x-codex-7d-usage");
  const limit7d = headers.get("x-codex-7d-limit");
  const resetAt7d = headers.get("x-codex-7d-reset-at");

  // Return null if none of the quota headers are present (not a quota-aware response)
  if (!usage5h && !limit5h && !resetAt5h && !usage7d && !limit7d && !resetAt7d) {
    return null;
  }

  return {
    usage5h: usage5h ? parseFloat(usage5h) : 0,
    limit5h: limit5h ? parseFloat(limit5h) : Infinity,
    resetAt5h: resetAt5h ?? null,
    usage7d: usage7d ? parseFloat(usage7d) : 0,
    limit7d: limit7d ? parseFloat(limit7d) : Infinity,
    resetAt7d: resetAt7d ?? null,
  };
}

/**
 * T03: Get the soonest quota reset time from a CodexQuotaSnapshot.
 * 7d window takes priority (wider window, harder limit) but we use whichever
 * is further in the future to avoid releasing the block too early.
 *
 * @returns Unix timestamp (ms) of the soonest effective reset, or null
 */
export function getCodexResetTime(quota: CodexQuotaSnapshot): number | null {
  const times: number[] = [];
  if (quota.resetAt7d) {
    const t = new Date(quota.resetAt7d).getTime();
    if (!isNaN(t) && t > Date.now()) times.push(t);
  }
  if (quota.resetAt5h) {
    const t = new Date(quota.resetAt5h).getTime();
    if (!isNaN(t) && t > Date.now()) times.push(t);
  }
  if (times.length === 0) return null;
  return Math.max(...times); // Use furthest-out reset to avoid premature unblock
}

/**
 * T03 (Item 3): Compute the minimum-necessary cooldown based on which window
 * is actually exhausted. Prevents over-blocking the account:
 *
 * - If 7d window >= threshold: cooldown until 7d reset (weekly window exhausted)
 * - If 5h window >= threshold: cooldown until 5h reset only (short-term limit)
 * - Otherwise: 0 (account is healthy, no cooldown needed)
 *
 * Called after parsing quota headers from a successful/429 response to
 * mark the account accordingly without overly long cooldowns.
 *
 * @param quota - Parsed quota snapshot from response headers
 * @param threshold - Fraction (0-1) that triggers cooldown (default: 0.95)
 * @returns Cooldown duration in milliseconds (0 = no cooldown needed)
 */
export function getCodexDualWindowCooldownMs(
  quota: CodexQuotaSnapshot,
  threshold = 0.95
): { cooldownMs: number; window: "7d" | "5h" | "none" } {
  const now = Date.now();

  // Compute per-window usage ratios (0..1)
  const ratio7d =
    quota.limit7d > 0 && Number.isFinite(quota.limit7d) ? quota.usage7d / quota.limit7d : 0;
  const ratio5h =
    quota.limit5h > 0 && Number.isFinite(quota.limit5h) ? quota.usage5h / quota.limit5h : 0;

  // 7d window takes priority — if the weekly budget is near-exhausted,
  // we must wait until the weekly reset (not just 5h).
  if (ratio7d >= threshold && quota.resetAt7d) {
    const resetTime = new Date(quota.resetAt7d).getTime();
    if (resetTime > now) {
      return { cooldownMs: resetTime - now, window: "7d" };
    }
  }

  // 5h window (primary short-term rate limit)
  if (ratio5h >= threshold && quota.resetAt5h) {
    const resetTime = new Date(quota.resetAt5h).getTime();
    if (resetTime > now) {
      return { cooldownMs: resetTime - now, window: "5h" };
    }
  }

  return { cooldownMs: 0, window: "none" };
}

// Ordered list of effort levels from lowest to highest
const EFFORT_ORDER = ["none", "low", "medium", "high", "xhigh"] as const;
type EffortLevel = (typeof EFFORT_ORDER)[number];
const CODEX_FAST_WIRE_VALUE = "priority";
const CODEX_RESPONSES_WS_URL = "wss://chatgpt.com/backend-api/codex/responses";

function splitCodexReasoningSuffix(model: unknown): {
  baseModel: string;
  effort: EffortLevel | null;
} {
  const modelId = typeof model === "string" ? model : "";
  for (const level of EFFORT_ORDER) {
    if (modelId.endsWith(`-${level}`)) {
      return {
        baseModel: modelId.slice(0, -`-${level}`.length),
        effort: level,
      };
    }
  }
  return { baseModel: modelId, effort: null };
}

export function getCodexUpstreamModel(model: unknown): string {
  return splitCodexReasoningSuffix(model).baseModel;
}

/**
 * Convert role=system messages in `input` to role=developer.
 *
 * GPT-5 models support the `developer` role in input, but reject `system`.
 * This keeps the content inside
 * the `input` array where it benefits from OpenAI's automatic prompt caching.
 *
 * OpenAI's prompt caching matches on the serialized prefix of the `input` array
 * (+ tools). The `instructions` field is NOT included in the cache key for
 * GPT-5 models. Moving system prompts from `input` to `instructions` therefore
 * removes them from the cacheable prefix, resulting in 0% cache hit rates.
 *
 * Ref: https://community.openai.com/t/caching-is-borked-for-gpt-5-models/1359574
 * Ref: https://community.openai.com/t/no-caching-with-model-responses/1338627
 */
function convertSystemToDeveloperRole(body: Record<string, unknown>): void {
  if (!Array.isArray(body.input)) return;

  for (const itemValue of body.input) {
    if (!itemValue || typeof itemValue !== "object" || Array.isArray(itemValue)) {
      continue;
    }

    const item = itemValue as Record<string, unknown>;
    const role = typeof item.role === "string" ? item.role : "";
    const type = typeof item.type === "string" ? item.type : "";
    const isSystemMessage = role === "system" && (!type || type === "message");
    if (isSystemMessage) {
      item.role = "developer";
    }
  }
}

function buildRecoveredToolContextMessage(
  droppedItems: Array<Record<string, unknown>>
): Record<string, unknown> {
  return {
    type: "message",
    role: "user",
    content: [
      {
        type: "input_text",
        text:
          "Recovered tool context from the previous turn. Continue using this context instead of calling the same tools again unless you must.\n" +
          JSON.stringify(droppedItems),
      },
    ],
  };
}

/**
 * Strip server-generated item IDs from the input array.
 *
 * The Codex /codex/responses endpoint does not persist response items even when
 * store=true is sent. When proxy clients (e.g. OpenClaw) include response items
 * from previous turns in the input array, those items carry server-assigned IDs
 * (prefixed with "rs_", "fc_", "resp_", "msg_"). The Codex backend tries to
 * validate these IDs against its persistence store and returns 404 when the items
 * are not found (because store was effectively false).
 *
 * This function:
 *   1. Removes bare string references ("rs_abc123") from the input array
 *   2. Removes object items with type "item_reference" (explicit stored-item refs)
 *   3. Strips the "id" field from any object in input whose id matches a
 *      server-generated prefix (rs_, fc_, resp_, msg_) — so the content is
 *      preserved but the backend won't try to look it up
 *   4. Expands locally remembered conversation snapshots for stateful follow-ups
 *      when the upstream backend rejects previous_response_id
 *   5. Falls back to rehydrating missing function_call items if only the older
 *      tool-call state is available
 *   6. Filters orphaned function_call/function_call_output items when one side
 *      of the tool exchange is still missing after local replay/fallback repair
 */
function stripStoredItemReferences(body: Record<string, unknown>): void {
  const hasInput = Array.isArray(body.input) && body.input.length > 0;
  const inputItems = Array.isArray(body.input) ? body.input : [];
  const previousResponseId =
    typeof body.previous_response_id === "string" ? body.previous_response_id : "";
  const rememberedConversationItems =
    hasInput && previousResponseId
      ? getRememberedResponseConversationItems(previousResponseId)
      : [];

  if (rememberedConversationItems.length > 0) {
    body.input = [...rememberedConversationItems, ...inputItems];
  }
  const inputFunctionCallIds = new Set<string>();
  const inputFunctionCallOutputIds = new Set<string>();

  for (const item of Array.isArray(body.input) ? body.input : []) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const record = item as Record<string, unknown>;
    const type = typeof record.type === "string" ? record.type : "";
    const callId = typeof record.call_id === "string" ? record.call_id : "";
    if (!callId) continue;
    if (type === "function_call") {
      inputFunctionCallIds.add(callId);
      continue;
    }
    if (type === "function_call_output") {
      inputFunctionCallOutputIds.add(callId);
    }
  }

  const missingFunctionCallIds = [...inputFunctionCallOutputIds].filter(
    (callId) => !inputFunctionCallIds.has(callId)
  );

  if (hasInput && previousResponseId && missingFunctionCallIds.length > 0) {
    const rememberedFunctionCalls = getRememberedResponseFunctionCalls(previousResponseId);
    const globallyRememberedFunctionCalls = getRememberedFunctionCallsByIds(missingFunctionCallIds);
    const injectedFunctionCalls = [...rememberedFunctionCalls, ...globallyRememberedFunctionCalls]
      .filter((functionCall) => missingFunctionCallIds.includes(functionCall.call_id))
      .filter((functionCall) => !inputFunctionCallIds.has(functionCall.call_id))
      .filter(
        (functionCall, index, allFunctionCalls) =>
          allFunctionCalls.findIndex((candidate) => candidate.call_id === functionCall.call_id) ===
          index
      )
      .map((functionCall) => ({
        type: "function_call",
        call_id: functionCall.call_id,
        name: functionCall.name,
        arguments: functionCall.arguments,
      }));

    if (injectedFunctionCalls.length > 0) {
      body.input = [...injectedFunctionCalls, ...inputItems];
      for (const functionCall of injectedFunctionCalls) {
        inputFunctionCallIds.add(functionCall.call_id);
      }
    }
  }

  const finalFunctionCallIds = new Set<string>();
  const finalFunctionCallOutputIds = new Set<string>();
  if (Array.isArray(body.input)) {
    for (const item of body.input) {
      if (!item || typeof item !== "object" || Array.isArray(item)) continue;
      const record = item as Record<string, unknown>;
      const type = typeof record.type === "string" ? record.type : "";
      const callId = typeof record.call_id === "string" ? record.call_id : "";
      if (!callId) continue;
      if (type === "function_call") {
        finalFunctionCallIds.add(callId);
        continue;
      }
      if (type === "function_call_output") {
        finalFunctionCallOutputIds.add(callId);
      }
    }
  }

  const droppedOrphanFunctionCallIds: string[] = [];
  const droppedOrphanFunctionCallOutputIds: string[] = [];
  const droppedOrphanItems: Array<Record<string, unknown>> = [];
  if (Array.isArray(body.input)) {
    body.input = body.input.filter((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return true;
      }

      const record = item as Record<string, unknown>;
      const callId = typeof record.call_id === "string" ? record.call_id : "";
      if (!callId) {
        return true;
      }

      if (record.type === "function_call") {
        if (finalFunctionCallOutputIds.has(callId)) {
          return true;
        }

        droppedOrphanFunctionCallIds.push(callId);
        droppedOrphanItems.push({ ...record });
        return false;
      }

      if (record.type === "function_call_output") {
        if (finalFunctionCallIds.has(callId)) {
          return true;
        }

        droppedOrphanFunctionCallOutputIds.push(callId);
        droppedOrphanItems.push({ ...record });
        return false;
      }

      return true;
    });
  }

  if (droppedOrphanFunctionCallIds.length > 0) {
    console.warn(
      `[Codex] stripStoredItemReferences: dropped ${droppedOrphanFunctionCallIds.length} orphan function_call item(s): ${droppedOrphanFunctionCallIds.join(", ")}`
    );
  }

  if (droppedOrphanFunctionCallOutputIds.length > 0) {
    console.warn(
      `[Codex] stripStoredItemReferences: dropped ${droppedOrphanFunctionCallOutputIds.length} orphan function_call_output item(s): ${droppedOrphanFunctionCallOutputIds.join(", ")}`
    );
  }

  if (Array.isArray(body.input) && body.input.length === 0 && droppedOrphanItems.length > 0) {
    body.input = [buildRecoveredToolContextMessage(droppedOrphanItems)];
    console.warn(
      `[Codex] stripStoredItemReferences: synthesized recovery message from ${droppedOrphanItems.length} dropped orphan tool item(s)`
    );
  }

  // Codex rejects previous_response_id for passthrough requests.
  delete body.previous_response_id;
  if (Array.isArray(body.input) && body.input.length === 0) {
    body.input = [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "continue" }],
      },
    ];
  }

  if (!Array.isArray(body.input)) return;

  const SERVER_ID_PATTERN = /^(rs|fc|resp|msg)_/;
  let strippedCount = 0;

  body.input = body.input.filter((item) => {
    // Bare string references: "rs_abc123", "resp_abc123"
    if (typeof item === "string" && SERVER_ID_PATTERN.test(item)) {
      strippedCount++;
      return false;
    }

    // Object references: { type: "item_reference", id: "rs_..." }
    if (
      item &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      (item as Record<string, unknown>).type === "item_reference"
    ) {
      strippedCount++;
      return false;
    }

    // Object items with server-generated IDs: strip the id field but keep the item.
    // e.g. { id: "rs_...", type: "reasoning", summary: [...] } → keep content, remove id
    // e.g. { id: "fc_...", type: "function_call", ... } → keep content, remove id
    if (item && typeof item === "object" && !Array.isArray(item)) {
      const record = item as Record<string, unknown>;
      if (typeof record.id === "string" && SERVER_ID_PATTERN.test(record.id)) {
        delete record.id;
        strippedCount++;
      }
    }

    return true;
  });

  if (strippedCount > 0) {
    console.debug(
      `[Codex] stripStoredItemReferences: sanitized ${strippedCount} server-generated ID(s) from input`
    );
  }
}

// Responses-API hosted tool types that OpenAI/Codex executes server-side.
// These arrive shaped as `{ type, ...params }` with no `function` object and no `name` —
// e.g. Codex CLI injects `{ type: "image_generation", output_format: "png" }` or
// `{ type: "namespace", name: "mcp__atlassian__", tools: [...] }` for MCP tool groups.
// Keep them through `normalizeCodexTools` so upstream can execute them.
const CODEX_HOSTED_TOOL_TYPES: ReadonlySet<string> = new Set([
  "image_generation",
  "web_search",
  "web_search_preview",
  "file_search",
  "computer",
  "computer_use_preview",
  "code_interpreter",
  "mcp",
  "local_shell",
]);

function normalizeCodexTools(body: Record<string, unknown>): void {
  if (!Array.isArray(body.tools)) return;

  const validToolNames = new Set<string>();
  body.tools = body.tools.filter((toolValue) => {
    if (!toolValue || typeof toolValue !== "object" || Array.isArray(toolValue)) {
      return false;
    }

    const tool = toolValue as Record<string, unknown>;
    const toolType = typeof tool.type === "string" ? tool.type : "";

    // Preserve namespace tools (MCP tool groups used by Codex/OpenAI Responses API).
    // Codex API supports them natively; register sub-tool names for tool_choice validation.
    if (toolType === "namespace") {
      if (Array.isArray(tool.tools)) {
        for (const st of tool.tools as unknown[]) {
          if (st && typeof st === "object" && !Array.isArray(st)) {
            const subTool = st as Record<string, unknown>;
            const name = typeof subTool.name === "string" ? subTool.name.trim() : "";
            if (name) validToolNames.add(name);
          }
        }
      }
      return true;
    }

    if (toolType !== "function") {
      const hasFunctionObject = tool.function && typeof tool.function === "object";
      const hasName = typeof tool.name === "string";
      if (!toolType || hasFunctionObject || hasName) {
        return false;
      }
      if (CODEX_HOSTED_TOOL_TYPES.has(toolType)) {
        return true;
      }
      console.debug(`[Codex] dropping unknown hosted tool type: ${toolType}`);
      return false;
    }

    const rawName =
      typeof tool.name === "string"
        ? tool.name
        : tool.function &&
            typeof tool.function === "object" &&
            !Array.isArray(tool.function) &&
            typeof (tool.function as Record<string, unknown>).name === "string"
          ? ((tool.function as Record<string, unknown>).name as string)
          : "";
    const name = rawName.trim();
    if (!name) {
      return false;
    }

    validToolNames.add(name);
    return true;
  });

  if (
    body.tool_choice &&
    typeof body.tool_choice === "object" &&
    !Array.isArray(body.tool_choice)
  ) {
    const toolChoice = body.tool_choice as Record<string, unknown>;
    if (toolChoice.type === "function") {
      const rawName = typeof toolChoice.name === "string" ? toolChoice.name.trim() : "";
      if (!rawName || !validToolNames.has(rawName)) {
        delete body.tool_choice;
      }
    }
  }
}

function getResponsesSubpath(endpointPath: unknown): string | null {
  let normalizedEndpoint = String(endpointPath || "");
  while (normalizedEndpoint.endsWith("/") && normalizedEndpoint.length > 0) {
    normalizedEndpoint = normalizedEndpoint.slice(0, -1);
  }

  const lower = normalizedEndpoint.toLowerCase();
  if (lower === "responses" || lower.endsWith("/responses")) {
    return "";
  }

  const responsesSlash = "/responses/";
  const idx = lower.lastIndexOf(responsesSlash);
  if (idx !== -1) {
    return normalizedEndpoint.slice(idx + "/responses".length);
  }

  if (lower.startsWith("responses/")) {
    return normalizedEndpoint.slice("responses".length);
  }

  return null;
}

export function isCompactResponsesEndpoint(endpointPath: unknown): boolean {
  return getResponsesSubpath(endpointPath)?.toLowerCase() === "/compact";
}

function normalizeServiceTierValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  if (normalized === "fast") return CODEX_FAST_WIRE_VALUE;
  return normalized;
}

/**
 * Maximum reasoning effort allowed per Codex model.
 * Models not listed here default to "xhigh" (unrestricted).
 * Update this table when Codex releases new models with different caps.
 */
const MAX_EFFORT_BY_MODEL: Record<string, EffortLevel> = {
  "gpt-5.3-codex": "xhigh",
  "gpt-5.2-codex": "xhigh",
  "gpt-5.1-codex-max": "xhigh",
  "gpt-5-mini": "high",
  "gpt-5.1-mini": "high",
  "gpt-4.1-mini": "high",
};

/**
 * Clamp reasoning effort to the model's maximum allowed level.
 * Returns the original value if within limits, or the cap if it exceeds it.
 */
function clampEffort(model: string, requested: string): string {
  const max: EffortLevel = MAX_EFFORT_BY_MODEL[model] ?? "xhigh";
  const reqIdx = EFFORT_ORDER.indexOf(requested as EffortLevel);
  const maxIdx = EFFORT_ORDER.indexOf(max);
  if (reqIdx > maxIdx) {
    console.debug(`[Codex] clampEffort: "${requested}" → "${max}" (model: ${model})`);
    return max;
  }
  return requested;
}

function normalizeEffortValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "max") return "xhigh";
  return normalized || undefined;
}

function consumeResponsesStoreMarker(body: Record<string, unknown>): unknown {
  const marker = body._omnirouteResponsesStore;
  delete body._omnirouteResponsesStore;
  return marker;
}

export function isCodexResponsesWebSocketRequired(_model: string, credentials: unknown): boolean {
  // OmniRoute is an HTTP→SSE gateway — WebSocket transport is unnecessary and
  // breaks when upstream requests go through an HTTP proxy (403 on WS upgrade).
  // Default to the standard HTTP Responses SSE endpoint for all Codex models.
  // Users who need WebSocket can opt in via the provider codexTransport setting.
  const providerSpecificData =
    credentials && typeof credentials === "object"
      ? (credentials as { providerSpecificData?: Record<string, unknown> }).providerSpecificData
      : null;
  return !!(providerSpecificData?.codexTransport === "websocket" && getCodexWebSocketTransport());
}

function toStatusCode(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value >= 400 && value <= 599) {
    return value;
  }
  if (typeof value === "string" && /^\d{3}$/.test(value.trim())) {
    const parsed = Number(value.trim());
    return parsed >= 400 && parsed <= 599 ? parsed : null;
  }
  return null;
}

function looksLikeQuotaOrRateLimit(code: string, type: string, message: string): boolean {
  const haystack = `${code} ${type} ${message}`.toLowerCase();
  return (
    haystack.includes("usage_limit_reached") ||
    haystack.includes("rate_limit") ||
    haystack.includes("rate limit") ||
    haystack.includes("quota") ||
    haystack.includes("too many requests") ||
    haystack.includes("limit has been reached") ||
    haystack.includes("limit reached")
  );
}

function toCodexResponseFailedEvent(parsed: Record<string, unknown>): Record<string, unknown> {
  const response =
    parsed.response && typeof parsed.response === "object" && !Array.isArray(parsed.response)
      ? (parsed.response as Record<string, unknown>)
      : null;
  const upstreamError =
    response?.error && typeof response.error === "object" && !Array.isArray(response.error)
      ? (response.error as Record<string, unknown>)
      : parsed.error && typeof parsed.error === "object" && !Array.isArray(parsed.error)
        ? (parsed.error as Record<string, unknown>)
        : parsed;
  const code =
    typeof upstreamError.code === "string"
      ? upstreamError.code
      : typeof upstreamError.type === "string"
        ? upstreamError.type
        : "upstream_error";
  const type = typeof upstreamError.type === "string" ? upstreamError.type : "";
  const message =
    typeof upstreamError.message === "string" && upstreamError.message.trim()
      ? upstreamError.message
      : "Codex upstream error";
  const error: Record<string, unknown> = { code, message };
  const explicitStatus =
    toStatusCode(parsed.status_code) ??
    toStatusCode(parsed.status) ??
    toStatusCode(response?.status_code) ??
    toStatusCode(response?.status) ??
    toStatusCode(upstreamError.status_code) ??
    toStatusCode(upstreamError.status);
  const statusCode =
    explicitStatus ?? (looksLikeQuotaOrRateLimit(code, type, message) ? 429 : null);

  if (type) error.type = type;
  if (statusCode !== null) error.status_code = statusCode;

  return {
    type: "response.failed",
    response: {
      id: typeof response?.id === "string" ? response.id : null,
      status: "failed",
      error,
    },
  };
}

export function encodeResponseSseEvent(raw: string): { sse: string; terminal: boolean } {
  let eventType = "message";
  let payload = raw;
  let terminal = false;

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.type === "string" && parsed.type.trim()) {
      eventType = parsed.type.trim();
      if (eventType === "error" || eventType === "response.failed") {
        const failed = toCodexResponseFailedEvent(parsed as Record<string, unknown>);
        payload = JSON.stringify(failed);
        eventType = "response.failed";
      }
      terminal = eventType === "response.completed" || eventType === "response.failed";
    }
  } catch {
    // Keep message as the generic SSE event for non-JSON upstream payloads.
  }

  return { sse: `event: ${eventType}\ndata: ${payload}\n\n`, terminal };
}

function toWebSocketUrl(url: string): string {
  if (url.startsWith("wss://") || url.startsWith("ws://")) return url;
  if (url.startsWith("https://")) return `wss://${url.slice("https://".length)}`;
  if (url.startsWith("http://")) return `ws://${url.slice("http://".length)}`;
  return CODEX_RESPONSES_WS_URL;
}

function normalizeCodexWsHeaders(headers: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    const lower = key.toLowerCase();
    if (
      lower === "host" ||
      lower === "connection" ||
      lower === "upgrade" ||
      lower === "sec-websocket-key" ||
      lower === "sec-websocket-version" ||
      lower === "sec-websocket-extensions"
    ) {
      continue;
    }
    result[key] = value;
  }
  result.Origin = "https://chatgpt.com";
  return result;
}

/**
 * Codex Executor - handles OpenAI Codex API (Responses API format)
 * Automatically injects default instructions if missing.
 * IMPORTANT: Includes chatgpt-account-id header for workspace binding.
 */
export class CodexExecutor extends BaseExecutor {
  constructor() {
    super("codex", PROVIDERS.codex);
  }

  async execute(input: ExecuteInput) {
    const sessionId = this.getPromptCacheSessionId(
      input.credentials,
      input.body as Record<string, unknown> | null
    );
    const identity = createCodexClientIdentity(
      sessionId,
      input.credentials?.providerSpecificData ?? null
    );
    const credentials = identity
      ? {
          ...input.credentials,
          providerSpecificData: {
            ...(input.credentials?.providerSpecificData || {}),
            codexClientIdentity: identity,
          },
        }
      : input.credentials;
    const nextInput = { ...input, credentials };

    if (!isCodexResponsesWebSocketRequired(nextInput.model, nextInput.credentials)) {
      return super.execute(nextInput);
    }

    const url = CODEX_RESPONSES_WS_URL;
    const headers = normalizeCodexWsHeaders(this.buildHeaders(nextInput.credentials, true));
    mergeUpstreamExtraHeaders(headers, nextInput.upstreamExtraHeaders);

    const transformedBody = (await this.transformRequest(
      nextInput.model,
      nextInput.body,
      true,
      nextInput.credentials
    )) as Record<string, unknown>;
    transformedBody.model = getCodexUpstreamModel(transformedBody.model || nextInput.model);
    delete transformedBody.stream;
    delete transformedBody.stream_options;

    const bodyString = JSON.stringify({
      type: "response.create",
      ...transformedBody,
    });

    const websocketFn = getCodexWebSocketTransport();
    if (!websocketFn) {
      return {
        response: codexWebSocketUnavailableResponse(),
        url,
        headers,
        transformedBody,
      };
    }

    const encoder = new TextEncoder();
    let closed = false;
    let ws: WreqWebSocket | null = null;
    let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;

    const closeUpstream = (reason: string) => {
      try {
        ws?.close(1000, reason);
      } catch {
        // ignore close races
      }
    };

    let abortHandler: (() => void) | null = null;
    const removeAbortListener = () => {
      if (!abortHandler) return;
      nextInput.signal?.removeEventListener("abort", abortHandler);
      abortHandler = null;
    };

    const finishStream = ({
      reason,
      emitDone = true,
      closeController = true,
      closeSocket = true,
    }: {
      reason: string;
      emitDone?: boolean;
      closeController?: boolean;
      closeSocket?: boolean;
    }) => {
      if (closed) return;
      closed = true;
      removeAbortListener();
      if (closeSocket) closeUpstream(reason);

      const controller = streamController;
      if (!controller || !closeController) return;
      if (emitDone) {
        try {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch {
          // The downstream may already have gone away.
        }
      }
      try {
        controller.close();
      } catch {
        // The controller may already be closed.
      }
    };

    const failController = (code: string, message: string) => {
      if (closed) return;
      const controller = streamController;
      const payload = JSON.stringify({
        type: "response.failed",
        response: {
          id: null,
          status: "failed",
          error: { code, message },
        },
      });
      try {
        controller?.enqueue(encoder.encode(`event: response.failed\ndata: ${payload}\n\n`));
      } catch {
        // Downstream closed before the failure could be delivered.
      }
      finishStream({ reason: "upstream_failed" });
    };

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        streamController = controller;
        abortHandler = () => {
          finishStream({ reason: "client_aborted" });
        };
        nextInput.signal?.addEventListener("abort", abortHandler, { once: true });

        try {
          ws = await websocketFn(toWebSocketUrl(url), {
            browser: "chrome_142",
            os: "windows",
            headers,
          });
          if (closed) return;
          if (nextInput.signal?.aborted) {
            finishStream({ reason: "client_aborted" });
            return;
          }
          ws.onmessage = (event) => {
            if (closed) return;
            const raw =
              typeof event.data === "string"
                ? event.data
                : Buffer.from(event.data as Buffer).toString("utf8");
            const sseEvent = encodeResponseSseEvent(raw);
            if (closed) return;
            try {
              controller.enqueue(encoder.encode(sseEvent.sse));
            } catch {
              finishStream({
                reason: "downstream_closed",
                emitDone: false,
                closeController: false,
              });
              return;
            }
            if (sseEvent.terminal) {
              finishStream({ reason: "terminal_event" });
            }
          };
          ws.onerror = (event) => {
            failController(
              "upstream_websocket_error",
              event.message || "Codex upstream WebSocket error"
            );
          };
          ws.onclose = () => {
            finishStream({ reason: "upstream_closed", closeSocket: false });
          };
          if (!closed) {
            ws.send(bodyString);
          }
        } catch (error) {
          failController(
            "upstream_websocket_connect_failed",
            error instanceof Error ? error.message : String(error)
          );
        }
      },
      cancel() {
        finishStream({ reason: "client_cancelled", emitDone: false, closeController: false });
      },
    });

    return {
      response: new Response(stream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }),
      url,
      headers,
      transformedBody,
    };
  }

  buildUrl(model, stream, urlIndex = 0, credentials = null) {
    void model;
    void stream;
    void urlIndex;

    const responsesSubpath = getResponsesSubpath(credentials?.requestEndpointPath);
    if (responsesSubpath !== null) {
      const baseUrl = String(this.config.baseUrl || "").replace(/\/$/, "");
      if (baseUrl.endsWith("/responses")) {
        return `${baseUrl}${responsesSubpath}`;
      }
      return `${baseUrl}/responses${responsesSubpath}`;
    }

    return super.buildUrl(model, stream, urlIndex, credentials);
  }

  /**
   * Codex Responses endpoint is SSE-first.
   * Always request event-stream from upstream, even when client requested stream=false.
   * Includes chatgpt-account-id header for strict workspace binding.
   */
  buildHeaders(credentials, stream = true) {
    const isCompactRequest = isCompactResponsesEndpoint(credentials?.requestEndpointPath);
    const headers = super.buildHeaders(credentials, isCompactRequest ? false : true);
    headers.Version = getCodexClientVersion();
    setUserAgentHeader(headers, getCodexUserAgent());

    // Add workspace binding header if workspaceId is persisted
    const workspaceId = credentials?.providerSpecificData?.workspaceId;
    if (workspaceId) {
      headers["chatgpt-account-id"] = workspaceId;
    }
    const clientIdentity = credentials?.providerSpecificData?.codexClientIdentity;

    // Originator header — identifies the client type to the Codex backend.
    // Ref: openai/codex login/src/auth/default_client.rs DEFAULT_ORIGINATOR = "codex_cli_rs"
    headers["originator"] = "codex_cli_rs";

    // session_id header — enables prompt cache affinity on the Codex backend.
    // The official Codex client sets this to conversation_id (a stable UUID per session).
    // Ref: openai/codex codex-api/src/requests/headers.rs build_conversation_headers()
    const cacheSessionId = this.getPromptCacheSessionId(credentials, null);
    if (cacheSessionId) {
      headers["session_id"] = cacheSessionId;
    }
    applyCodexClientIdentityHeaders(headers, clientIdentity);

    return headers;
  }

  /**
   * Derive a stable session ID for prompt cache affinity.
   * Priority: per-conversation session_id/conversation_id from request body → workspaceId.
   * The official Codex client uses conversation_id (a unique UUID per session), NOT
   * the account-wide workspaceId. Using workspaceId caps cache hit-rate at ~49%
   * because all conversations share the same cache partition. (#1643)
   * Ref: openai/codex core/src/client.rs line 853
   */
  private getPromptCacheSessionId(
    credentials,
    body: Record<string, unknown> | null
  ): string | null {
    const promptCacheKey = normalizeCodexSessionId(body?.prompt_cache_key);
    if (promptCacheKey) return promptCacheKey;

    // Prefer per-session identifiers from the client request body
    const sessionId = body?.session_id ?? body?.conversation_id;
    const normalizedSessionId = normalizeCodexSessionId(sessionId);
    if (normalizedSessionId) {
      return normalizedSessionId;
    }
    // Fall back to workspaceId (account-wide) — better than nothing
    return normalizeCodexSessionId(credentials?.providerSpecificData?.workspaceId) || null;
  }

  /**
   * Refresh Codex OAuth credentials when a 401 is received.
   * OpenAI uses rotating (one-time-use) refresh tokens — if the token was already
   * consumed by a concurrent refresh, this returns null to signal re-auth is needed.
   *
   * Fixes #251: After a server restart/upgrade, previously cached access tokens may
   * have expired or become invalid. chatCore.ts calls this on 401; previously the
   * base class returned null causing the request to fail instead of refreshing.
   */
  async refreshCredentials(credentials, log) {
    if (!credentials?.refreshToken) {
      log?.warn?.("TOKEN_REFRESH", "Codex: no refresh token available, re-authentication required");
      return null;
    }
    const result = await getAccessToken("codex", credentials, log);
    if (!result || result.error) {
      log?.warn?.(
        "TOKEN_REFRESH",
        `Codex: token refresh failed${result?.error ? ` (${result.error})` : ""} — re-authentication required`
      );
      return null;
    }
    return result;
  }

  /**
   * Transform request before sending - inject default instructions if missing
   */
  transformRequest(model, body, stream, credentials) {
    // Do not mutate the caller's payload in place. Combo quality checks and
    // other post-execute paths still inspect the original request body.
    body =
      body && typeof body === "object" ? structuredClone(body) : ({} as Record<string, unknown>);

    const nativeCodexPassthrough = body?._nativeCodexPassthrough === true;
    const isCompactRequest = isCompactResponsesEndpoint(credentials?.requestEndpointPath);
    const requestDefaults = getCodexRequestDefaults(credentials?.providerSpecificData);
    const thinkingBudgetConfig = getThinkingBudgetConfig();
    const allowConnectionReasoningDefaults = thinkingBudgetConfig.mode === ThinkingMode.PASSTHROUGH;
    consumeResponsesStoreMarker(body);

    // Codex /responses rejects stream=false, but /responses/compact rejects the stream field entirely.
    if (isCompactRequest) {
      delete body.stream;
      delete body.stream_options;
      delete body.client_metadata;
    } else {
      body.stream = true;
    }
    delete body._nativeCodexPassthrough;

    const requestServiceTier = normalizeServiceTierValue(body.service_tier);
    if (requestServiceTier) {
      body.service_tier = requestServiceTier;
    } else if (requestDefaults.serviceTier) {
      body.service_tier = requestDefaults.serviceTier;
    }

    // ── Cache-aware system prompt handling (both paths) ──
    //
    // Convert system → developer role IN-PLACE so system prompts remain in the
    // `input` array where they contribute to the automatic prompt cache prefix.
    // The `instructions` field is NOT included in the cache key for GPT-5 models.
    //
    // This applies to BOTH native passthrough (Responses API) and translated
    // (Chat Completions) paths. Previously the translated path used
    // hoistSystemMessagesToInstructions() which moved system content out of
    // `input` and into `instructions`, destroying cache eligibility.
    //
    // Ref: PR #1346 (original fix for passthrough only)
    convertSystemToDeveloperRole(body);

    if (nativeCodexPassthrough) {
      // Passthrough: minimal placeholder instructions.
      if (
        !body.instructions ||
        (typeof body.instructions === "string" && body.instructions.trim() === "")
      ) {
        body.instructions = "Follow the developer instructions in the conversation.";
      }
    } else {
      // Translated: keep the full Codex tool instructions only for tool-capable
      // requests. Bare chat requests still need a neutral instructions value
      // because the Codex Responses backend rejects requests without it.
      const hasTools = Array.isArray(body.tools) && body.tools.length > 0;
      if (
        !body.instructions ||
        (typeof body.instructions === "string" && body.instructions.trim() === "")
      ) {
        if (hasTools) {
          body.instructions = CODEX_DEFAULT_INSTRUCTIONS;
        } else {
          body.instructions = CODEX_CHAT_DEFAULT_INSTRUCTIONS;
        }
      }
    }

    // Store: regular Codex Responses rejects store=true with
    // "Store must be set to false", while /responses/compact rejects the
    // store field entirely. Default regular requests to false unless the
    // provider explicitly opts in (e.g. API-key accounts that support persistence).
    // Ref: sub2api openai_codex_transform.go line 75-80
    const explicitStoreSetting =
      credentials?.providerSpecificData &&
      typeof credentials.providerSpecificData === "object" &&
      !Array.isArray(credentials.providerSpecificData)
        ? credentials.providerSpecificData.openaiStoreEnabled
        : undefined;
    if (isCompactRequest) {
      delete body.store;
    } else if (explicitStoreSetting === true) {
      body.store = true;
    } else {
      // backend rejects store=true ("Store must be set to false"), so default to false.
      body.store = false;
    }

    // Codex Responses only supports function tools with non-empty names.
    // Cursor may include custom tools (e.g. ApplyPatch) that work locally but are
    // invalid upstream, and translation bugs can leave orphaned/empty tool_choice names.
    normalizeCodexTools(body);

    // Strip stored response item references (rs_, resp_, msg_ IDs) from input.
    // The /codex/responses endpoint does not persist responses even with store=true,
    // so any references to previous response items would cause 404 errors.
    stripStoredItemReferences(body);

    // Issue #806: Even for native passthrough, some clients (purist completions) might indiscriminately inject
    // a `messages` or `prompt` array which the strict Codex Responses schema rejects.
    delete body.messages;
    delete body.prompt;

    let modelEffort: string | null = null;
    let cleanModel = typeof body.model === "string" ? body.model : model;
    const splitModel = splitCodexReasoningSuffix(cleanModel);
    if (splitModel.effort) {
      modelEffort = splitModel.effort;
      body.model = splitModel.baseModel;
      cleanModel = body.model;
    }

    const explicitReasoning = normalizeEffortValue(body?.reasoning?.effort);
    const requestReasoningEffort = normalizeEffortValue(body.reasoning_effort);
    const fallbackReasoningEffort = allowConnectionReasoningDefaults
      ? requestDefaults.reasoningEffort || "medium"
      : undefined;
    const rawEffort =
      explicitReasoning || requestReasoningEffort || modelEffort || fallbackReasoningEffort;

    if (explicitReasoning) {
      body.reasoning = {
        ...(body.reasoning && typeof body.reasoning === "object" ? body.reasoning : {}),
        effort: clampEffort(cleanModel, explicitReasoning),
      };
    } else if (rawEffort) {
      body.reasoning = {
        ...(body.reasoning && typeof body.reasoning === "object" ? body.reasoning : {}),
        effort: clampEffort(cleanModel, rawEffort),
      };
    }
    delete body.reasoning_effort;

    // previous_response_id is expanded into a self-contained local replay when
    // input is present because Codex rejects that parameter upstream.

    // Remove unsupported token limit parameters BEFORE the passthrough return.
    // Codex API rejects both max_tokens and max_output_tokens regardless of
    // whether the request came via native passthrough or translation.
    delete body.max_tokens;
    delete body.max_output_tokens;
    // VS Code Copilot BYOK Responses requests include `truncation` (for example
    // "auto" or "disabled"). The Codex /responses backend currently rejects this
    // field entirely with 400 Unsupported parameter: truncation, so strip it for
    // both native passthrough and translated requests.
    delete body.truncation;
    delete body.background; // Droid CLI sends this but Codex Responses API rejects it

    // Inject prompt_cache_key for Codex prompt caching.
    // The official Codex client sets this to conversation_id (a stable UUID per session).
    // Ref: openai/codex core/src/client.rs line 853:
    //   let prompt_cache_key = Some(self.client.state.conversation_id.to_string());
    // IMPORTANT: Capture session/conversation IDs BEFORE deletion below (#1643).
    if (!body.prompt_cache_key) {
      const cacheSessionId = this.getPromptCacheSessionId(credentials, body);
      if (cacheSessionId) {
        body.prompt_cache_key = cacheSessionId;
      }
    }
    if (!isCompactRequest) {
      applyCodexClientMetadata(body, credentials?.providerSpecificData?.codexClientIdentity);
    }

    // Delete session_id and conversation_id from the body.
    // These are often injected by OmniRoute's fallback logic for store=true,
    // but the upstream Codex API strictly rejects them as unsupported parameters.
    delete body.session_id;
    delete body.conversation_id;

    if (nativeCodexPassthrough) {
      return body;
    }

    // Remove unsupported parameters for Codex API
    delete body.temperature;
    delete body.top_p;
    delete body.frequency_penalty;
    delete body.presence_penalty;
    delete body.logprobs;
    delete body.top_logprobs;
    delete body.n;
    delete body.seed;
    // max_tokens and max_output_tokens already deleted above (before passthrough return)
    delete body.user; // Cursor sends this but Codex doesn't support it
    delete body.prompt_cache_retention; // Cursor sends this but Codex doesn't support it
    delete body.metadata; // Cursor sends this but Codex doesn't support it
    delete body.stream_options; // Cursor sends this but Codex doesn't support it
    delete body.safety_identifier; // Droid CLI sends this but Codex doesn't support it

    return body;
  }
}
