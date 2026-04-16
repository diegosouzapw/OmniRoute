import {
  getCodexRequestDefaults,
  isOpenAIResponsesStoreEnabled,
} from "@/lib/providers/requestDefaults";
import { BaseExecutor, setUserAgentHeader } from "./base.ts";
import { CODEX_DEFAULT_INSTRUCTIONS } from "../config/codexInstructions.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getCodexClientVersion, getCodexUserAgent } from "../config/codexClient.ts";
import { refreshCodexToken } from "../services/tokenRefresh.ts";
import { getThinkingBudgetConfig, ThinkingMode } from "../services/thinkingBudget.ts";

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

function stringifyCodexInstructionContent(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part.trim();
        if (!part || typeof part !== "object") return "";
        const record = part as Record<string, unknown>;
        if (typeof record.text === "string") return record.text.trim();
        if (typeof record.content === "string") return record.content.trim();
        return "";
      })
      .filter(Boolean)
      .join("\n")
      .trim();
  }

  return "";
}

function hoistSystemMessagesToInstructions(body: Record<string, unknown>): void {
  if (!Array.isArray(body.input)) return;

  const systemChunks: string[] = [];
  const filteredInput = body.input.filter((itemValue) => {
    if (!itemValue || typeof itemValue !== "object" || Array.isArray(itemValue)) {
      return true;
    }

    const item = itemValue as Record<string, unknown>;
    const role = typeof item.role === "string" ? item.role : "";
    const type = typeof item.type === "string" ? item.type : "";
    const isSystemMessage = role === "system" && (!type || type === "message");
    if (!isSystemMessage) {
      return true;
    }

    const text = stringifyCodexInstructionContent(item.content);
    if (text) {
      systemChunks.push(text);
    }
    return false;
  });

  if (systemChunks.length === 0) return;

  const existingInstructions =
    typeof body.instructions === "string" ? body.instructions.trim() : "";
  body.instructions = existingInstructions
    ? `${systemChunks.join("\n\n")}\n\n${existingInstructions}`
    : systemChunks.join("\n\n");
  body.input = filteredInput;
}

function normalizeCodexTools(body: Record<string, unknown>): void {
  if (!Array.isArray(body.tools)) return;

  const validToolNames = new Set<string>();
  body.tools = body.tools.filter((toolValue) => {
    if (!toolValue || typeof toolValue !== "object" || Array.isArray(toolValue)) {
      return false;
    }

    const tool = toolValue as Record<string, unknown>;
    if (tool.type !== "function") {
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
  const normalizedEndpoint = String(endpointPath || "").replace(/\/+$/, "");
  const match = normalizedEndpoint.match(/(?:^|\/)responses(?:(\/.*))?$/i);
  if (!match) return null;
  return match[1] || "";
}

function isCompactResponsesEndpoint(endpointPath: unknown): boolean {
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
  return normalized || undefined;
}

function consumeResponsesStoreMarker(body: Record<string, unknown>): unknown {
  const marker = body._omnirouteResponsesStore;
  delete body._omnirouteResponsesStore;
  return marker;
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

    return headers;
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
    const result = await refreshCodexToken(credentials.refreshToken, log);
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
    const storeEnabled = isOpenAIResponsesStoreEnabled(credentials?.providerSpecificData);
    const thinkingBudgetConfig = getThinkingBudgetConfig();
    const allowConnectionReasoningDefaults = thinkingBudgetConfig.mode === ThinkingMode.PASSTHROUGH;
    const responsesStoreMarker = consumeResponsesStoreMarker(body);

    // Codex /responses rejects stream=false, but /responses/compact rejects the stream field entirely.
    if (isCompactRequest) {
      delete body.stream;
      delete body.stream_options;
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

    // If no instructions provided, inject default Codex instructions
    // NOTE: must run before the passthrough return — Codex upstream rejects
    // requests without instructions even when the body is forwarded as-is.
    if (!body.instructions || body.instructions.trim() === "") {
      body.instructions = CODEX_DEFAULT_INSTRUCTIONS;
    }

    if (!storeEnabled) {
      body.store = false;
    } else if (responsesStoreMarker !== undefined && body.store === undefined) {
      body.store = responsesStoreMarker;
    }

    // Cursor can send native Responses payloads with role=system items inside `input`.
    // Codex rejects system messages there; they must be folded into `instructions`.
    hoistSystemMessagesToInstructions(body);

    // Codex Responses only supports function tools with non-empty names.
    // Cursor may include custom tools (e.g. ApplyPatch) that work locally but are
    // invalid upstream, and translation bugs can leave orphaned/empty tool_choice names.
    normalizeCodexTools(body);

    // Issue #806: Even for native passthrough, some clients (purist completions) might indiscriminately inject
    // a `messages` or `prompt` array which the strict Codex Responses schema rejects.
    delete body.messages;
    delete body.prompt;

    const effortLevels = ["none", "low", "medium", "high", "xhigh"];
    let modelEffort: string | null = null;
    let cleanModel = typeof body.model === "string" ? body.model : model;
    for (const level of effortLevels) {
      if (typeof cleanModel === "string" && cleanModel.endsWith(`-${level}`)) {
        modelEffort = level;
        body.model = cleanModel.slice(0, -`-${level}`.length);
        cleanModel = body.model;
        break;
      }
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
    delete body.max_tokens;
    delete body.max_output_tokens; // Responses API translator maps max_tokens -> max_output_tokens, but Codex rejects it
    delete body.user; // Cursor sends this but Codex doesn't support it
    delete body.prompt_cache_retention; // Cursor sends this but Codex doesn't support it
    delete body.metadata; // Cursor sends this but Codex doesn't support it
    delete body.stream_options; // Cursor sends this but Codex doesn't support it
    delete body.safety_identifier; // Droid CLI sends this but Codex doesn't support it

    return body;
  }
}
