import crypto, { randomUUID } from "crypto";
import {
  BaseExecutor,
  mergeAbortSignals,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ExecutorLog,
  type ProviderCredentials,
} from "./base.ts";
import { applyFingerprint, isCliCompatEnabled } from "../config/cliFingerprints.ts";
import { buildAntigravityUpstreamError } from "./antigravityUpstreamError.ts";
import {
  PROVIDERS,
  OAUTH_ENDPOINTS,
  HTTP_STATUS,
  STREAM_READINESS_TIMEOUT_MS,
  ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE,
} from "../config/constants.ts";
import { scrubProxyAndFingerprintHeaders } from "../services/antigravityHeaderScrub.ts";
import {
  antigravityNativeOAuthUserAgent,
  antigravityUserAgent,
} from "../services/antigravityHeaders.ts";
import { classify429, decide429, type Decision } from "../services/antigravity429Engine.ts";
import {
  injectCreditsField,
  shouldRetryWithCredits,
  shouldUseCreditsFirst,
  getCreditsMode,
  handleCreditsFailure,
} from "../services/antigravityCredits.ts";
import { persistCreditBalance, getAllPersistedCreditBalances } from "@/lib/db/creditBalance";
import { setConnectionRateLimitUntil } from "@/lib/db/providers";
import { getMitmAlias } from "@/lib/db/models";
import { obfuscateSensitiveWords } from "../services/antigravityObfuscation.ts";
import { resolveAntigravityVersion } from "../services/antigravityVersion.ts";
import { ensureAntigravityProjectAssigned } from "../services/antigravityProjectBootstrap.ts";
import {
  resolveAntigravityModelId,
  getAntigravityModelFallbacks,
} from "../config/antigravityModelAliases.ts";
import { cloakAntigravityToolPayload } from "../config/toolCloaking.ts";
import {
  shouldStripCloudCodeThinking,
  stripCloudCodeThinkingConfig,
} from "../services/cloudCodeThinking.ts";
import { buildGeminiTools } from "../translator/helpers/geminiToolsSanitizer.ts";
import { DEFAULT_SAFETY_SETTINGS } from "../translator/helpers/geminiHelper.ts";
import { normalizeOpenAICompatibleFinishReasonString } from "../utils/finishReason.ts";
import {
  applyAntigravityClientProfileHeaders,
  removeHeaderCaseInsensitive,
} from "../services/antigravityClientProfile.ts";
import {
  generateAntigravityRequestId,
  getAntigravityEnvelopeUserAgent,
  getAntigravitySessionId,
} from "../services/antigravityIdentity.ts";
import * as prl from "../utils/providerRequestLogging.ts";

const MAX_RETRY_AFTER_MS = 60_000;
const LONG_RETRY_THRESHOLD_MS = 60_000;
const CREDITS_EXHAUSTED_TTL_MS = 5 * 60 * 60 * 1000; // 5 hours
// Cap for transient 5xx backoff — shorter than the 429 cap to avoid long stalls on
// infra hiccups ("Agent execution terminated", "high traffic", capacity errors).
const ANTIGRAVITY_TRANSIENT_RETRY_MAX_MS = 15_000;

const ANTIGRAVITY_TRANSIENT_ERROR_PATTERNS: RegExp[] = [
  /high\s+traffic/i,
  /agent\s+(execution\s+)?terminated\s+due\s+to\s+error/i,
  /capacity/i,
  /temporarily\s+unavailable/i,
  /timeout/i,
  /stream\s+(ended|closed|terminated|interrupted)/i,
  /empty\s+response/i,
];

const ANTIGRAVITY_TRANSIENT_STATUSES = new Set([
  HTTP_STATUS.SERVER_ERROR,
  HTTP_STATUS.BAD_GATEWAY,
  HTTP_STATUS.SERVICE_UNAVAILABLE,
  HTTP_STATUS.GATEWAY_TIMEOUT,
]);
// The upstream API uses plain model IDs (no -high/-low suffix).
// Tier suffixes were speculative and caused 404 for gemini-3.x models — the
// bare-Pro→Low normalization was retired (the set stayed empty, making the guard
// dead code). Only keep models that are live-proven via streamGenerateContent.

interface AntigravityContent {
  role: string;
  parts: unknown[];
  [key: string]: unknown;
}

type AntigravityCredentials = ProviderCredentials & {
  projectId?: string | null;
  expiresIn?: number;
};

type AntigravityChunkContent = Record<string, unknown> & {
  role?: string;
  parts?: Array<
    Record<string, unknown> & {
      text?: unknown;
      functionCall?: Record<string, unknown>;
      functionResponse?: unknown;
      thought?: unknown;
      thoughtSignature?: unknown;
    }
  >;
};

type AntigravityCreditEntry = {
  creditType?: string;
  creditAmount?: string;
};

function getChunkedOrFixedBody(bodyStr: string, stream: boolean): BodyInit {
  if (stream) {
    return new ReadableStream(
      {
        async start(controller) {
          controller.enqueue(new TextEncoder().encode(bodyStr));
          controller.close();
        },
      },
      { highWaterMark: 16384 }
    );
  }
  return bodyStr;
}

function cloneAntigravityRequestBody(body: unknown): unknown {
  if (!body || typeof body !== "object") {
    return body;
  }

  try {
    return structuredClone(body);
  } catch {
    return JSON.parse(JSON.stringify(body));
  }
}

function serializeAntigravityRequest(
  provider: string,
  headers: Record<string, string>,
  body: unknown
): { headers: Record<string, string>; bodyString: string } {
  const serializedBody = cloneAntigravityRequestBody(body);

  if (!isCliCompatEnabled(provider)) {
    return { headers, bodyString: JSON.stringify(serializedBody) };
  }
  return applyFingerprint(provider, { ...headers }, serializedBody);
}

type AntigravityCollectedStream = {
  textContent: string;
  finishReason: string;
  toolCalls: Array<{
    id: string;
    index: number;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  usage: Record<string, unknown> | null;
  remainingCredits: Array<{ creditType: string; creditAmount: string }> | null;
};

function stripZeroWidth(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/[\u200B-\u200D\uFEFF]/g, "");
  }
  if (Array.isArray(value)) {
    return value.map((item) => stripZeroWidth(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        stripZeroWidth(item),
      ])
    );
  }
  return value;
}

function parseAntigravityTextualToolCall(text: unknown): { name: string; args: unknown } | null {
  if (typeof text !== "string") return null;
  const normalized = text.replace(/[\u200B-\u200D\uFEFF]/g, "");
  const match = normalized.match(
    /^[\s\S]*?\[Tool call:\s*([^\]\n]+)\]\s*\nArguments:\s*([\s\S]+?)\s*$/
  );
  if (!match) return null;
  const name = match[1]?.trim();
  const rawArgs = match[2]?.trim();
  if (!name || !rawArgs) return null;
  try {
    return { name, args: stripZeroWidth(JSON.parse(rawArgs)) };
  } catch {
    return null;
  }
}

function addAntigravityTextualToolCall(
  collected: AntigravityCollectedStream,
  parsed: { name: string; args: unknown }
): void {
  collected.toolCalls.push({
    id: `${parsed.name}-${Date.now()}-${collected.toolCalls.length}`,
    index: collected.toolCalls.length,
    type: "function",
    function: {
      name: parsed.name,
      arguments: JSON.stringify(parsed.args || {}),
    },
  });
  collected.finishReason = "tool_calls";
}

type AntigravityRequestEnvelope = Record<string, unknown> & {
  project: string;
  model?: string;
  userAgent: "antigravity" | "jetski";
  requestType: "agent" | "image_gen";
  requestId: string;
  request: Record<string, unknown>;
  enabledCreditTypes?: string[];
};

class AntigravityPreResponseTimeoutError extends Error {
  code = ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE;
  status = HTTP_STATUS.GATEWAY_TIMEOUT;

  constructor(timeoutMs: number, url: string) {
    super(`Antigravity upstream did not return response headers within ${timeoutMs}ms: ${url}`);
    this.name = "TimeoutError";
  }
}

function getAbortErrorCode(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const value = (error as { code?: unknown }).code;
  return typeof value === "string" ? value : null;
}

function isAntigravityPreResponseTimeout(error: unknown): boolean {
  return getAbortErrorCode(error) === ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE;
}

/**
 * Per-account GOOGLE_ONE_AI credits-exhausted tracker.
 * Key: accountId (OAuth subject / email). Value: expiry timestamp.
 * When credits hit 0 we skip the credit retry for CREDITS_EXHAUSTED_TTL_MS.
 */
const MAX_CREDITS_EXHAUSTED_ENTRIES = 50;
const creditsExhaustedUntil = new Map<string, number>();

const _creditsExhaustedSweep = setInterval(() => {
  const now = Date.now();
  for (const [key, until] of creditsExhaustedUntil) {
    if (now >= until) creditsExhaustedUntil.delete(key);
  }
}, 60_000);
if (typeof _creditsExhaustedSweep === "object" && "unref" in _creditsExhaustedSweep) {
  (_creditsExhaustedSweep as { unref?: () => void }).unref?.();
}

const MAX_CREDIT_BALANCE_ENTRIES = 50;
const CREDIT_BALANCE_TTL_MS = 5 * 60 * 1000;
const creditBalanceCache = new Map<string, { balance: number; updatedAt: number }>();
let creditCacheHydrated = false;

function hydrateCreditCacheFromDb(): void {
  if (creditCacheHydrated) return;
  creditCacheHydrated = true;
  try {
    const persisted = getAllPersistedCreditBalances();
    for (const [accountId, balance] of persisted) {
      if (!creditBalanceCache.has(accountId)) {
        creditBalanceCache.set(accountId, { balance, updatedAt: Date.now() });
      }
    }
  } catch {}
}

function evictStaleCreditBalanceEntries(): void {
  const now = Date.now();
  for (const [key, entry] of creditBalanceCache) {
    if (now - entry.updatedAt > CREDIT_BALANCE_TTL_MS) {
      creditBalanceCache.delete(key);
    }
  }
  while (creditBalanceCache.size > MAX_CREDIT_BALANCE_ENTRIES) {
    const oldestKey = creditBalanceCache.keys().next().value;
    if (oldestKey !== undefined) creditBalanceCache.delete(oldestKey);
    else break;
  }
}

const _creditBalanceSweep = setInterval(evictStaleCreditBalanceEntries, 60_000);
if (typeof _creditBalanceSweep === "object" && "unref" in _creditBalanceSweep) {
  (_creditBalanceSweep as { unref?: () => void }).unref?.();
}

export function getAntigravityRemainingCredits(accountId: string): number | null {
  hydrateCreditCacheFromDb();
  const entry = creditBalanceCache.get(accountId);
  if (!entry) return null;
  if (Date.now() - entry.updatedAt > CREDIT_BALANCE_TTL_MS) {
    creditBalanceCache.delete(accountId);
    return null;
  }
  return entry.balance;
}

export function updateAntigravityRemainingCredits(accountId: string, balance: number): void {
  if (creditBalanceCache.size >= MAX_CREDIT_BALANCE_ENTRIES && !creditBalanceCache.has(accountId)) {
    const oldestKey = creditBalanceCache.keys().next().value;
    if (oldestKey !== undefined) creditBalanceCache.delete(oldestKey);
  }
  creditBalanceCache.set(accountId, { balance, updatedAt: Date.now() });
  try {
    persistCreditBalance(accountId, balance);
  } catch {}
}

function isCreditsExhausted(accountId: string): boolean {
  const until = creditsExhaustedUntil.get(accountId);
  if (!until) return false;
  if (Date.now() >= until) {
    creditsExhaustedUntil.delete(accountId);
    return false;
  }
  return true;
}

function markCreditsExhausted(accountId: string): void {
  if (
    creditsExhaustedUntil.size >= MAX_CREDITS_EXHAUSTED_ENTRIES &&
    !creditsExhaustedUntil.has(accountId)
  ) {
    const now = Date.now();
    for (const [key, until] of creditsExhaustedUntil) {
      if (now >= until) {
        creditsExhaustedUntil.delete(key);
      }
    }
    if (creditsExhaustedUntil.size >= MAX_CREDITS_EXHAUSTED_ENTRIES) {
      const oldestKey = creditsExhaustedUntil.keys().next().value;
      if (oldestKey !== undefined) creditsExhaustedUntil.delete(oldestKey);
    }
  }
  creditsExhaustedUntil.set(accountId, Date.now() + CREDITS_EXHAUSTED_TTL_MS);
}

/**
 * Persist a quota-exhausted cooldown to the DB for `connectionId` so that
 * cross-request and post-restart routing skips this connection until the
 * cooldown expires. Exported for unit testing. @internal
 */
export function markConnectionQuotaExhausted(connectionId: string, retryAfterMs: number): void {
  try {
    setConnectionRateLimitUntil(connectionId, Date.now() + retryAfterMs);
  } catch {
    // DB write failure must never crash the request path
  }
}

/**
 * Accumulate one Antigravity SSE `data:` payload into `collected`. Exported for unit
 * tests (the markdown / candidate-parts extraction branches). @internal
 */
export function processAntigravitySSEPayload(
  payload: string,
  collected: AntigravityCollectedStream,
  log?: { debug?: (scope: string, message: string) => void }
) {
  if (!payload || payload === "[DONE]") return;
  try {
    const parsed = JSON.parse(payload);
    const markdown =
      typeof parsed?.markdown === "string"
        ? parsed.markdown
        : typeof parsed?.response?.markdown === "string"
          ? parsed.response.markdown
          : null;
    if (markdown) {
      collected.textContent += markdown;
    }
    const candidate = parsed?.response?.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (typeof part.text === "string" && !part.thought && !part.thoughtSignature) {
          const textualToolCall = parseAntigravityTextualToolCall(part.text);
          if (textualToolCall) {
            addAntigravityTextualToolCall(collected, textualToolCall);
          } else {
            collected.textContent += part.text;
          }
        }
      }
    }
    if (candidate?.finishReason) {
      collected.finishReason = normalizeOpenAICompatibleFinishReasonString(
        String(candidate.finishReason).toLowerCase()
      );
    }
    if (parsed?.response?.usageMetadata) {
      const um = parsed.response.usageMetadata;
      collected.usage = {
        prompt_tokens: um.promptTokenCount || 0,
        completion_tokens: um.candidatesTokenCount || 0,
        total_tokens: um.totalTokenCount || 0,
      };
    }
    if (Array.isArray(parsed?.remainingCredits)) {
      collected.remainingCredits = parsed.remainingCredits;
    }
  } catch {
    log?.debug?.("SSE_PARSE", `Skipping malformed SSE line: ${payload.slice(0, 80)}`);
  }
}

function processAntigravitySSEText(
  text: string,
  partialLine: { value: string },
  collected: AntigravityCollectedStream,
  log?: { debug?: (scope: string, message: string) => void }
) {
  partialLine.value += text;
  const lines = partialLine.value.split("\n");
  partialLine.value = lines.pop() || "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    processAntigravitySSEPayload(trimmed.slice(5).trim(), collected, log);
  }
}

function flushAntigravitySSEText(
  partialLine: { value: string },
  collected: AntigravityCollectedStream,
  log?: { debug?: (scope: string, message: string) => void }
) {
  const trimmed = partialLine.value.trim();
  partialLine.value = "";
  if (!trimmed.startsWith("data:")) return;
  processAntigravitySSEPayload(trimmed.slice(5).trim(), collected, log);
}

/**
 * Strip provider prefixes (e.g. "antigravity/model" → "model").
 * Ensures the model name sent to the upstream API never contains a routing prefix.
 *
 * `modelIdOverride` (#3786): when the per-request Pro-family fallback chain forces a
 * specific upstream id, pass it here. It is an ALREADY-RESOLVED upstream id, so it bypasses
 * the MITM/static alias resolution and is used verbatim (after prefix stripping).
 */
async function cleanModelName(model: string, modelIdOverride?: string): Promise<string> {
  if (modelIdOverride) {
    return modelIdOverride.includes("/") ? modelIdOverride.split("/").pop()! : modelIdOverride;
  }
  if (!model) return model;
  const stripped = model.includes("/") ? model.split("/").pop()! : model;
  let clean = stripped;

  // 1. Check dynamic MITM aliases first (authoritative after first sync).
  //    Built during model sync — contains ONLY currently-available models.
  //    Obsolete/removed models are automatically excluded.
  try {
    const mitmAliases = await getMitmAlias("antigravity");
    if (mitmAliases && typeof mitmAliases === "object") {
      const aliases = mitmAliases as Record<string, unknown>;
      const raw = aliases[stripped];
      // Only honor string aliases; corrupted/non-string DB values fall through
      // to the static alias resolution below (never return undefined here).
      if (typeof raw === "string" && raw) {
        // Strip the "antigravity/" prefix if present; use the raw model ID otherwise.
        const PREFIX = "antigravity/";
        clean = raw.startsWith(PREFIX) ? raw.slice(PREFIX.length) : raw;
      }
    }
  } catch {
    // DB not available (build phase, transient error) — fall through to static aliases
  }

  // 2. Fall back to static aliases if MITM didn't resolve
  if (clean === stripped) {
    clean = resolveAntigravityModelId(clean);
  }

  return clean;
}

function attachToolNameMap<T>(payload: T, toolNameMap: Map<string, string> | null): T {
  if (!toolNameMap?.size || !payload || typeof payload !== "object") {
    return payload;
  }

  const copy = Array.isArray(payload) ? ([...payload] as T) : ({ ...(payload as object) } as T);
  Object.defineProperty(copy, "_toolNameMap", {
    value: toolNameMap,
    enumerable: false,
    configurable: true,
    writable: true,
  });
  return copy;
}

function getRequestTargetModel(body: Record<string, unknown>): string {
  const target = body.model;
  return typeof target === "string" && target.length > 0 ? target : "unknown";
}

/**
 * Hard ceiling on `generationConfig.maxOutputTokens` for Antigravity Cloud Code.
 *
 * Ports decolua/9router#779 (lukmanfauzie): VS Code GitHub Copilot Chat in
 * Agent mode regularly requests 32K–65K output tokens, which the Antigravity
 * backend rejects with HTTP 400 "Invalid Argument". 16384 matches the
 * upstream-accepted ceiling confirmed via successful 200 OK runs with
 * claude-sonnet-4-6 and gemini-3.1-pro-high across both Ask and Agent modes.
 */
export const MAX_ANTIGRAVITY_OUTPUT_TOKENS = 16384;

function applyAntigravityGenerationDefaults(request: Record<string, unknown>): void {
  const generationConfig =
    request.generationConfig && typeof request.generationConfig === "object"
      ? (request.generationConfig as Record<string, unknown>)
      : {};

  if (generationConfig.topK === undefined) {
    generationConfig.topK = 40;
  }
  if (generationConfig.topP === undefined) {
    generationConfig.topP = 1.0;
  }

  const thinkingConfig =
    generationConfig.thinkingConfig && typeof generationConfig.thinkingConfig === "object"
      ? (generationConfig.thinkingConfig as Record<string, unknown>)
      : null;
  const thinkingBudget = Number(thinkingConfig?.thinkingBudget);
  const maxOutputTokens = Number(generationConfig.maxOutputTokens);
  if (
    Number.isFinite(thinkingBudget) &&
    thinkingBudget > 0 &&
    (!Number.isFinite(maxOutputTokens) || maxOutputTokens <= thinkingBudget)
  ) {
    generationConfig.maxOutputTokens = Math.floor(thinkingBudget) + 1;
  }

  // Final cap (after the thinkingBudget bump may have raised the value):
  // GitHub Copilot Agent envelopes commonly carry oversized maxOutputTokens
  // (32K–65K) that trigger upstream 400 "Invalid Argument". Clamp silently
  // — the cap is provider-driven, not client-driven, and only matters when
  // the request would otherwise be rejected outright.
  const finalMax = Number(generationConfig.maxOutputTokens);
  if (Number.isFinite(finalMax) && finalMax > MAX_ANTIGRAVITY_OUTPUT_TOKENS) {
    generationConfig.maxOutputTokens = MAX_ANTIGRAVITY_OUTPUT_TOKENS;
  }

  request.generationConfig = generationConfig;
}

// Test-only export so the unit suite can exercise the cap logic in isolation
// without spinning up the full executor.
export const __test_applyAntigravityGenerationDefaults = applyAntigravityGenerationDefaults;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function sanitizeAntigravityGeminiRequest(
  request: Record<string, unknown>
): Record<string, unknown> {
  const clean: Record<string, unknown> = {};

  if (Array.isArray(request.contents)) {
    clean.contents = request.contents;
  }

  if (asRecord(request.systemInstruction)) {
    clean.systemInstruction = request.systemInstruction;
  }

  clean.generationConfig = asRecord(request.generationConfig)
    ? { ...(request.generationConfig as Record<string, unknown>) }
    : {};

  const geminiTools = buildGeminiTools(request.tools);
  if (geminiTools) {
    clean.tools = geminiTools;
    clean.toolConfig = { functionCallingConfig: { mode: "VALIDATED" } };
  } else if (asRecord(request.toolConfig)) {
    clean.toolConfig = request.toolConfig;
  }

  if (typeof request.sessionId === "string") {
    clean.sessionId = request.sessionId;
  }

  // #5003: preserve safetySettings through the Claude-path whitelist so the all-OFF
  // default (or a caller-supplied value) actually reaches Google Cloud Code. Without
  // this the field is dropped and Google applies its own safety defaults that
  // false-flag benign technical prompts as `prohibited_content`.
  if (Array.isArray(request.safetySettings)) {
    clean.safetySettings = request.safetySettings;
  }

  return clean;
}

export class AntigravityExecutor extends BaseExecutor {
  constructor() {
    super("antigravity", PROVIDERS.antigravity);
  }

  buildUrl(model: string, _stream: boolean, urlIndex = 0): string {
    void model;
    const baseUrls = this.getBaseUrls();
    const baseUrl = baseUrls[urlIndex] || baseUrls[0];
    // Always use streaming endpoint — the non-streaming `generateContent` causes
    // upstream 400 errors for some models (e.g. gpt-oss-120b-medium) because the
    // Cloud Code API internally converts to OpenAI format and injects
    // stream_options without setting stream=true.  chatCore already handles
    // SSE→JSON conversion for non-streaming client requests.
    return `${baseUrl}/v1internal:streamGenerateContent?alt=sse`;
  }

  buildHeaders(credentials: AntigravityCredentials, _stream = true): Record<string, string> {
    const raw = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.accessToken}`,
      "User-Agent": antigravityUserAgent(),
      Accept: "text/event-stream",
      "X-OmniRoute-Source": "omniroute",
    };
    // Scrub proxy/fingerprint headers that reveal non-native traffic
    return scrubProxyAndFingerprintHeaders(raw);
  }

  async transformRequest(
    model: string,
    body: unknown,
    _stream: boolean,
    credentials: AntigravityCredentials,
    modelIdOverride?: string
  ): Promise<AntigravityRequestEnvelope | Response> {
    // Project ID resolution: prefer OAuth-stored projectId over incoming body.project
    // to avoid stale/wrong client-side values causing 404/403 from Cloud Code endpoints.
    // Opt-in escape hatch: set OMNIROUTER_ALLOW_BODY_PROJECT_OVERRIDE=1.
    const normalizeProjectId = (value: unknown): string | null => {
      if (typeof value !== "string") return null;
      const trimmedValue = value.trim();
      return trimmedValue ? trimmedValue : null;
    };
    const bodyRecord = asRecord(body) ?? {};
    const bodyProjectId = normalizeProjectId(bodyRecord.project);
    const credentialsProjectId = normalizeProjectId(credentials?.projectId);
    const providerSpecificProjectId = normalizeProjectId(
      (credentials?.providerSpecificData as Record<string, unknown> | undefined)?.projectId
    );
    const allowBodyProjectOverride = process.env.OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE === "1";

    // Default: prefer OAuth-stored projectId over incoming body.project to avoid
    // stale/wrong client-side values causing 404/403 from Cloud Code endpoints.
    // Opt-in escape hatch: set OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE=1.
    let projectId =
      allowBodyProjectOverride && bodyProjectId
        ? bodyProjectId
        : credentialsProjectId || providerSpecificProjectId || bodyProjectId;

    // Auto-discover a missing projectId via loadCodeAssist before failing (#2334/#2541).
    // A freshly re-added Antigravity account can have an empty stored projectId even when
    // its Google account already owns a Cloud Code project (the OAuth-time loadCodeAssist
    // returned empty/transiently failed). Mirror gemini-cli.ts's bootstrap to recover it
    // here — the helper memoizes per access-token, so this is a one-time round-trip.
    if (!projectId && credentials?.accessToken) {
      const discovered = await ensureAntigravityProjectAssigned(credentials.accessToken);
      if (discovered) projectId = discovered;
    }

    if (!projectId) {
      // (#489) Return a structured error instead of throwing — gives the client a clear signal
      // to show a "Reconnect OAuth" prompt rather than an opaque "Internal Server Error".
      const errorMsg =
        "Missing Google projectId for Antigravity account. Auto-discovery via loadCodeAssist " +
        "found no Cloud Code project. Please reconnect OAuth in Providers → Antigravity (and " +
        "ensure the Google account has completed Gemini Code Assist onboarding).";
      const errorBody = {
        error: {
          message: errorMsg,
          type: "oauth_missing_project_id",
          code: "missing_project_id",
        },
      };
      const resp = new Response(JSON.stringify(errorBody), {
        status: 422,
        headers: { "Content-Type": "application/json" },
      });
      // Returning a Response object signals the executor to stop and forward it
      return resp as unknown as never;
    }

    // Validate projectId is non-empty and not just whitespace
    const trimmedProjectId = typeof projectId === "string" ? projectId.trim() : projectId;
    if (!trimmedProjectId) {
      const resp = new Response(
        JSON.stringify({
          error: {
            message:
              "Invalid (empty) Google projectId for Antigravity account. " +
              "Please reconnect OAuth in Providers → Antigravity.",
            type: "oauth_missing_project_id",
            code: "missing_project_id",
          },
        }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
      return resp as unknown as never;
    }

    const upstreamModel = await cleanModelName(model, modelIdOverride);
    const isClaude = upstreamModel.toLowerCase().includes("claude");
    const baseBody = bodyRecord;
    const normalizedBody = shouldStripCloudCodeThinking(this.provider, upstreamModel)
      ? stripCloudCodeThinkingConfig(baseBody)
      : baseBody;
    const normalizedRequest = asRecord(normalizedBody.request);
    const rawContents = Array.isArray(normalizedRequest?.contents)
      ? normalizedRequest.contents
      : [];

    // Fix contents for Gemini-compatible Cloud Code requests via Antigravity.
    // Claude-branded Antigravity models use the same streamGenerateContent schema.
    const normalizedContents: AntigravityContent[] =
      rawContents.map((content): AntigravityContent => {
        const c = content as AntigravityChunkContent;
        let role = typeof c.role === "string" ? c.role : "user";
        if (c.parts?.some((p) => p.functionResponse)) {
          role = "user";
        }

        const hasFunctionCall = c.parts?.some((p) => p.functionCall) || false;

        const parts =
          c.parts?.filter((p) => {
            if (typeof p.text === "string" && p.text === "") return false;
            if (p.functionCall && !p.functionCall.name) return false;

            // Only strip if it's NOT our bypass sentinel.
            // Antigravity models (like Gemini) need this sentinel to bypass 400 errors.
            return (
              !p.thought &&
              (hasFunctionCall ||
                !p.thoughtSignature ||
                p.thoughtSignature === "skip_thought_signature_validator")
            );
          }) || [];
        return { ...c, role, parts };
      }) || [];

    const contents: AntigravityContent[] = [];
    for (const c of normalizedContents) {
      if (!Array.isArray(c.parts) || c.parts.length === 0) continue;
      if (contents.length > 0 && contents[contents.length - 1].role === c.role) {
        contents[contents.length - 1].parts.push(...c.parts);
      } else {
        contents.push(c);
      }
    }

    const rawTransformedRequest = {
      ...normalizedRequest,
      ...(contents.length > 0 && { contents }),
      sessionId: getAntigravitySessionId(
        credentials,
        typeof normalizedRequest?.sessionId === "string" ? normalizedRequest.sessionId : undefined
      ),
      // #5003: default to all-OFF safety for parity with the native Gemini paths
      // (claude-to-gemini / openai-to-gemini both default to DEFAULT_SAFETY_SETTINGS).
      // Previously this was `undefined`, which JSON.stringify drops, so Google Cloud Code
      // applied its server-side defaults that false-flag benign technical prompts as
      // `prohibited_content` (HTTP 200 + blocked body → terminal combo failover).
      safetySettings: normalizedRequest?.safetySettings ?? DEFAULT_SAFETY_SETTINGS,
      toolConfig:
        Array.isArray(normalizedRequest?.tools) && normalizedRequest.tools.length > 0
          ? { functionCallingConfig: { mode: "VALIDATED" } }
          : normalizedRequest?.toolConfig,
    };

    const transformedRequest = isClaude
      ? sanitizeAntigravityGeminiRequest(rawTransformedRequest)
      : rawTransformedRequest;

    // Obfuscate sensitive client names in user content (e.g. "OpenCode", "Cursor")
    const requestContents = transformedRequest.contents;
    if (Array.isArray(requestContents)) {
      for (const msg of requestContents) {
        if (Array.isArray(msg.parts)) {
          for (const part of msg.parts) {
            if (typeof part.text === "string") {
              part.text = obfuscateSensitiveWords(part.text);
            }
          }
        }
      }
    }

    applyAntigravityGenerationDefaults(transformedRequest);

    const {
      project: _project,
      model: _model,
      userAgent: _userAgent,
      requestType: _requestType,
      requestId: _requestId,
      request: _request,
      // #1944: output_config (and the legacy output_format) are Anthropic/Claude-Code-only
      // fields. Google's Cloud Code envelope rejects unknown top-level fields with a 400
      // ("Invalid JSON payload received. Unknown name \"output_config\""), which broke every
      // Claude model served via Antigravity. Drop them so they never reach the envelope.
      output_config: _outputConfig,
      output_format: _outputFormat,
      // #1926: the unified thinking adapter can also set Claude/OpenAI-native thinking fields
      // at the body root. Google rejects them with `400 Bad input: oneOf at '/' not met`
      // (or `Unknown name "thinking"`), breaking every reasoning/thinking model served via
      // Antigravity (e.g. claude-opus-4-x-thinking). Strip the whole thinking family too.
      thinking: _thinking,
      reasoning_effort: _reasoningEffort,
      reasoning: _reasoning,
      enable_thinking: _enableThinking,
      thinking_budget: _thinkingBudget,
      ...passthroughFields
    } = normalizedBody;

    const requestType = _requestType === "image_gen" ? "image_gen" : "agent";
    const envelope: AntigravityRequestEnvelope = {
      project: projectId,
      requestId: generateAntigravityRequestId(),
      request: transformedRequest,
      model: upstreamModel,
      userAgent: getAntigravityEnvelopeUserAgent(credentials),
      requestType,
      ...passthroughFields,
    };

    if (requestType === "agent" && envelope.enabledCreditTypes === undefined) {
      envelope.enabledCreditTypes = ["GOOGLE_ONE_AI"];
    }

    return envelope;
  }

  async refreshCredentials(
    credentials: AntigravityCredentials,
    log?: ExecutorLog | null
  ): Promise<AntigravityCredentials | null> {
    if (!credentials.refreshToken) return null;

    try {
      const bodyParams: Record<string, string> = {
        grant_type: "refresh_token",
        refresh_token: credentials.refreshToken,
      };
      // Only include non-empty client_id/client_secret — Google OAuth rejects
      // empty params which raw URLSearchParams produces (buildFormParams semantics).
      if (this.config.clientId) bodyParams.client_id = this.config.clientId;
      if (this.config.clientSecret) bodyParams.client_secret = this.config.clientSecret;

      const response = await fetch(OAUTH_ENDPOINTS.google.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "User-Agent": antigravityNativeOAuthUserAgent(),
        },
        body: new URLSearchParams(bodyParams),
      });

      if (!response.ok) {
        // Detect unrecoverable token (invalid_grant = revoked / expired refresh token)
        try {
          const errorBody = (await response.json()) as Record<string, unknown>;
          if (errorBody.error === "invalid_grant") {
            log?.error?.("TOKEN", "Antigravity refresh token revoked. Re-authentication required.");
            return { error: "unrecoverable_refresh_error" } as unknown as AntigravityCredentials;
          }
        } catch {
          // not JSON — fall through
        }
        return null;
      }

      const tokens = (await response.json()) as Record<string, unknown>;
      log?.info?.("TOKEN", "Antigravity refreshed");

      return {
        accessToken: typeof tokens.access_token === "string" ? tokens.access_token : undefined,
        refreshToken:
          typeof tokens.refresh_token === "string"
            ? tokens.refresh_token
            : credentials.refreshToken,
        expiresIn: typeof tokens.expires_in === "number" ? tokens.expires_in : undefined,
        projectId: credentials.projectId,
        // Preserve providerSpecificData so a projectId stored there survives the refresh
        // (the onCredentialsRefreshed DB write) instead of being dropped → 422 (#2480).
        providerSpecificData: credentials.providerSpecificData,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      log?.error?.("TOKEN", `Antigravity refresh error: ${message}`);
      return null;
    }
  }

  generateSessionId(): string {
    return `-${parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % 9_000_000_000_000_000_000}`;
  }

  parseRetryHeaders(headers: Headers | null | undefined): number | null {
    if (!headers?.get) return null;

    const retryAfter = headers.get("retry-after");
    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      if (!isNaN(seconds) && seconds > 0) return seconds * 1000;

      const date = new Date(retryAfter);
      if (!isNaN(date.getTime())) {
        const diff = date.getTime() - Date.now();
        return diff > 0 ? diff : null;
      }
    }

    const resetAfter = headers.get("x-ratelimit-reset-after");
    if (resetAfter) {
      const seconds = parseInt(resetAfter, 10);
      if (!isNaN(seconds) && seconds > 0) return seconds * 1000;
    }

    const resetTimestamp = headers.get("x-ratelimit-reset");
    if (resetTimestamp) {
      const ts = parseInt(resetTimestamp, 10) * 1000;
      const diff = ts - Date.now();
      return diff > 0 ? diff : null;
    }

    return null;
  }

  // Parse retry time from Antigravity error message body
  // Format: "Your quota will reset after 2h7m23s" or "Resets in 160h27m24s" or
  // "1h30m" or "45m" or "30s". The optional plural ("resets in") must match too (#1308).
  parseRetryFromErrorMessage(errorMessage: unknown): number | null {
    if (!errorMessage || typeof errorMessage !== "string") return null;

    const match = errorMessage.match(/resets? (?:after|in) (\d+h)?(\d+m)?(\d+s)?/i);
    if (!match) return null;

    let totalMs = 0;
    if (match[1]) totalMs += parseInt(match[1]) * 3600 * 1000; // hours
    if (match[2]) totalMs += parseInt(match[2]) * 60 * 1000; // minutes
    if (match[3]) totalMs += parseInt(match[3]) * 1000; // seconds

    // "reset after 0s" = burst/RPM limit, not quota exhaustion.
    // Return a minimum backoff so the auto-retry loop handles it
    // instead of falling through to the 24h exhaustion classifier.
    if (totalMs === 0) return 2_000; // 2s minimum burst-limit backoff

    return totalMs;
  }

  /**
   * Flatten an Antigravity error JSON + raw body text into a single string so
   * isTransientAntigravityError can match against body patterns.
   */
  extractErrorMessage(errorJson: unknown, bodyText = ""): string {
    const candidates: string[] = [];
    if (errorJson && typeof errorJson === "object") {
      const obj = errorJson as Record<string, unknown>;
      const errField = obj.error;
      if (errField && typeof errField === "object") {
        const msg = (errField as Record<string, unknown>).message;
        if (typeof msg === "string") candidates.push(msg);
        else if (msg != null) candidates.push(JSON.stringify(msg));
      } else if (typeof errField === "string") {
        candidates.push(errField);
      }
      if (typeof obj.message === "string") candidates.push(obj.message);
    }
    if (bodyText) candidates.push(bodyText);
    return candidates.filter(Boolean).join("\n");
  }

  /**
   * Return true when a status + error message combination should be retried
   * with exponential backoff instead of immediately failing-over to the next URL.
   * 429 is always transient. Transient 5xx statuses (500/502/503/504) are also
   * retried when the body contains a known capacity/traffic/agent pattern.
   */
  isTransientAntigravityError(status: number, message: string): boolean {
    if (status === HTTP_STATUS.RATE_LIMITED) return true;
    if (ANTIGRAVITY_TRANSIENT_STATUSES.has(status)) return true;
    return ANTIGRAVITY_TRANSIENT_ERROR_PATTERNS.some((p) => p.test(message || ""));
  }

  /**
   * Collect an SSE streaming response into a single non-streaming JSON response.
   * Parses Gemini-format SSE chunks and assembles text content + usage into one
   * OpenAI-format chat.completion payload.
   */
  collectStreamToResponse(
    response: Response,
    model: string,
    url: string,
    headers: Record<string, string>,
    transformedBody: Record<string, unknown>,
    log?: ExecutorLog | null,
    signal?: AbortSignal | null
  ) {
    if (!response.body) {
      return Promise.resolve({ response, url, headers, transformedBody });
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const logger = log || undefined;

    const SSE_COLLECT_TIMEOUT_MS = 120_000;

    const collect = async () => {
      const collected: AntigravityCollectedStream = {
        textContent: "",
        finishReason: "stop",
        toolCalls: [],
        usage: null,
        remainingCredits: null,
      };
      const partialLine = { value: "" };
      let timedOut = false;
      const timeout = AbortSignal.timeout(SSE_COLLECT_TIMEOUT_MS);
      try {
        while (true) {
          if (signal?.aborted) throw new Error("Request aborted during SSE collection");
          const { done, value } = await Promise.race([
            reader.read(),
            new Promise<never>((_, reject) =>
              timeout.addEventListener(
                "abort",
                () => reject(new Error("SSE collection timed out")),
                { once: true }
              )
            ),
          ]);
          if (done) break;
          processAntigravitySSEText(
            decoder.decode(value, { stream: true }),
            partialLine,
            collected,
            logger
          );
        }
      } catch (err) {
        const msg = err?.message || String(err);
        timedOut = msg.includes("timed out");
        log?.warn?.("SSE_COLLECT", `Error collecting SSE stream: ${msg}`);
        // Cancel the stream to prevent locking the socket in Undici pool
        try {
          reader.releaseLock();
        } catch (_) {}
        try {
          response.body?.cancel().catch(() => {});
        } catch (_) {}
      } finally {
        try {
          reader.releaseLock();
        } catch (_) {}
      }
      processAntigravitySSEText(decoder.decode(), partialLine, collected, logger);
      flushAntigravitySSEText(partialLine, collected, logger);

      const result = {
        id: `chatcmpl-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model,
        choices: [
          {
            index: 0,
            message:
              collected.toolCalls.length > 0
                ? {
                    role: "assistant",
                    content: collected.textContent || null,
                    tool_calls: collected.toolCalls,
                  }
                : { role: "assistant", content: collected.textContent },
            finish_reason: timedOut
              ? "length"
              : collected.toolCalls.length > 0
                ? "tool_calls"
                : collected.finishReason,
          },
        ],
        ...(collected.usage && { usage: collected.usage }),
        // Expose credit balance for upstream consumers (usage service, dashboard)
        ...(collected.remainingCredits && { _remainingCredits: collected.remainingCredits }),
      };

      const syntheticStatus = timedOut ? 504 : response.status;
      const syntheticResponse = new Response(JSON.stringify(result), {
        status: syntheticStatus,
        statusText: timedOut ? "Gateway Timeout" : response.statusText,
        headers: [["Content-Type", "application/json"]],
      });

      return { response: syntheticResponse, url, headers, transformedBody };
    };

    return collect();
  }

  /**
   * #3786 — Drive the per-request Pro-family upstream-id FALLBACK CHAIN.
   *
   * The upstream silently renamed the Gemini 3.1 Pro-high id (HTTP 400 on the old id) and the
   * live id cannot be known from static analysis (competitor proxies disagree). When the
   * resolved upstream id has a fallback chain (see ANTIGRAVITY_PRO_FALLBACK_CHAINS) we try the
   * requested id first and, ONLY on a 400, retry the next candidate until one succeeds (2xx)
   * or the chain is exhausted — then the original 400 surfaces (sanitized, hard rule #12).
   *
   * Off the happy path entirely: a model with no chain, or whose first id is not a 400, makes
   * exactly the same single call as before (zero extra upstream requests).
   */
  async execute(input: ExecuteInput) {
    await resolveAntigravityVersion();

    // Look up the chain by the NORMALLY-resolved upstream id (honours MITM/static aliases).
    // If a MITM alias remapped the id away from a known Pro tier, no chain applies → fast path.
    const resolvedUpstreamId = await cleanModelName(input.model);
    const chain = getAntigravityModelFallbacks(resolvedUpstreamId);

    if (chain.length <= 1) {
      // No fallback chain (flash, claude, plain pro, unknown) → single attempt, unchanged.
      return this.executeOnce(input);
    }

    let firstResult: Awaited<ReturnType<AntigravityExecutor["executeOnce"]>> | null = null;
    for (let i = 0; i < chain.length; i++) {
      const candidate = chain[i];
      const result = await this.executeOnce(input, candidate);

      // Success (or any non-400) on a candidate → return immediately.
      if (result.response.status !== HTTP_STATUS.BAD_REQUEST) {
        return result;
      }

      // Remember the FIRST 400 so the exhausted-chain case surfaces the original error.
      if (i === 0) firstResult = result;

      const isLast = i === chain.length - 1;
      if (!isLast) {
        input.log?.debug?.(
          "AG_PRO_FALLBACK",
          `400 on "${candidate}" — retrying with next Pro candidate "${chain[i + 1]}"`
        );
        continue;
      }

      // Chain exhausted: surface the FIRST candidate's sanitized 400.
      input.log?.warn?.(
        "AG_PRO_FALLBACK",
        `Pro fallback chain exhausted (all ${chain.length} candidates 400'd) for "${resolvedUpstreamId}"`
      );
      return firstResult ?? result;
    }

    // Unreachable (loop always returns), but keeps the type checker happy.
    return firstResult ?? this.executeOnce(input);
  }

  /**
   * #3786 — Run the request once for a SINGLE resolved upstream model id. The Pro-family
   * fallback chain in `execute()` calls this per candidate (`modelIdOverride`), retrying the
   * next id on a 400. `modelIdOverride === undefined` is the normal (non-chain) path and
   * preserves the prior behavior exactly. Returns the executor result plus the upstream
   * status of the first response so `execute()` can decide whether to fall through. @internal
   */
  private async executeOnce(
    { model, body, stream, credentials, signal, log, upstreamExtraHeaders }: ExecuteInput,
    modelIdOverride?: string
  ) {
    await resolveAntigravityVersion();
    const fallbackCount = this.getFallbackCount();
    let lastError = null;
    let lastStatus = 0;
    const MAX_AUTO_RETRIES = 3;
    const retryAttemptsByUrl: Record<number, number> = {}; // Track retry attempts per URL

    // Always stream upstream — buildUrl always returns the streaming endpoint.
    // For non-streaming clients, we collect the SSE below and return a synthetic
    // non-streaming Response so chatCore's non-streaming path stays unchanged.
    const upstreamStream = true;

    // Account ID for credits tracking.
    // Use connectionId as the stable cache key — it's available in both the executor
    // (via credentials.connectionId) and the usage fetcher (via connection.id).
    // The email-based key was unreliable because email isn't always on the credentials object.
    const accountId: string = credentials?.connectionId || "unknown";

    // Resolve credits mode once per execute() call. "always" injects
    // enabledCreditTypes: ["GOOGLE_ONE_AI"] on the first request so the
    // preflight normal call is skipped entirely.
    const creditsMode = getCreditsMode();
    const useCreditsFirst = shouldUseCreditsFirst(credentials?.accessToken || "", creditsMode);

    const fetchWithReadinessTimeout = async (
      url: string,
      init: RequestInit,
      timeoutMs = STREAM_READINESS_TIMEOUT_MS
    ): Promise<Response> => {
      const boundedTimeoutMs = Math.max(0, Math.floor(timeoutMs));
      if (boundedTimeoutMs <= 0) {
        return fetch(url, init);
      }

      const timeoutController = new AbortController();
      let timeoutId: ReturnType<typeof setTimeout> | null = setTimeout(() => {
        timeoutController.abort(new AntigravityPreResponseTimeoutError(boundedTimeoutMs, url));
      }, boundedTimeoutMs);

      const existingSignal = init.signal instanceof AbortSignal ? init.signal : null;
      const combinedSignal = existingSignal
        ? mergeAbortSignals(existingSignal, timeoutController.signal)
        : timeoutController.signal;

      try {
        return await fetch(url, { ...init, signal: combinedSignal });
      } catch (error) {
        if (
          timeoutController.signal.aborted &&
          isAntigravityPreResponseTimeout(timeoutController.signal.reason)
        ) {
          throw timeoutController.signal.reason;
        }
        throw error;
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };

    for (let urlIndex = 0; urlIndex < fallbackCount; urlIndex++) {
      const url = this.buildUrl(model, upstreamStream, urlIndex);
      const headers = this.buildHeaders(credentials, upstreamStream);
      mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);
      const transformed = await this.transformRequest(
        model,
        body,
        upstreamStream,
        credentials,
        modelIdOverride
      );
      let requestToolNameMap: Map<string, string> | null = null;

      if (transformed instanceof Response) {
        return { response: transformed, url, headers, transformedBody: body };
      }

      let transformedBody: Record<string, unknown> = transformed;

      if (transformedBody && typeof transformedBody === "object") {
        const cloaked = cloakAntigravityToolPayload(transformedBody);
        transformedBody = cloaked.body;
        requestToolNameMap = cloaked.toolNameMap;
      }

      // Credits-first: inject GOOGLE_ONE_AI upfront so we never try the normal
      // quota path. If credits are exhausted / disabled shouldUseCreditsFirst()
      // returns false and we fall back to the legacy retry-on-429 flow.
      if (useCreditsFirst) {
        transformedBody = injectCreditsField(transformedBody);
        log?.debug?.("AG_CREDITS", "Credits-first enabled (ANTIGRAVITY_CREDITS=always)");
      }

      // Initialize retry counter for this URL
      if (!retryAttemptsByUrl[urlIndex]) {
        retryAttemptsByUrl[urlIndex] = 0;
      }

      try {
        const serializedRequest = serializeAntigravityRequest(
          this.provider,
          headers,
          transformedBody
        );
        let finalHeaders = serializedRequest.headers;
        const capture = (h: Record<string, string>, s: string) =>
          prl.captureCurrentProviderBody(url, h, s, log);
        const clientProfile = applyAntigravityClientProfileHeaders(
          finalHeaders,
          credentials,
          transformedBody
        );

        log?.debug?.(
          "TELEMETRY",
          `[Antigravity] Execute - URL: ${url}, Model: ${model}, Target: ${getRequestTargetModel(transformedBody)}, RetryAttempt: ${retryAttemptsByUrl[urlIndex]}`
        );

        // Dump outgoing headers (mask Authorization) and envelope shape for debugging
        if (log?.debug) {
          const safeHeaders = { ...finalHeaders };
          if (safeHeaders["Authorization"]) safeHeaders["Authorization"] = "Bearer ***";
          log.debug("AG_REQUEST_HEADERS", JSON.stringify(safeHeaders));

          const envelope = transformedBody as Record<string, unknown>;
          const requestInner = envelope.request as Record<string, unknown> | undefined;
          log.debug(
            "AG_REQUEST_ENVELOPE",
            JSON.stringify({
              fieldOrder: Object.keys(envelope),
              project: envelope.project,
              requestId: envelope.requestId,
              model: envelope.model,
              userAgent: envelope.userAgent,
              requestType: envelope.requestType,
              enabledCreditTypes: envelope.enabledCreditTypes,
              clientProfile,
              sessionId: requestInner?.sessionId,
              generationConfig: requestInner?.generationConfig,
            })
          );
        }

        await capture(finalHeaders, serializedRequest.bodyString);
        let response = await fetchWithReadinessTimeout(url, {
          method: "POST",
          headers: finalHeaders,
          body: getChunkedOrFixedBody(serializedRequest.bodyString, stream),
          ...(stream ? { duplex: "half" } : {}),
          signal,
        });

        if (response.status === HTTP_STATUS.FORBIDDEN && finalHeaders["x-goog-user-project"]) {
          const retryHeaders = { ...finalHeaders };
          removeHeaderCaseInsensitive(retryHeaders, "x-goog-user-project");
          log?.debug?.("RETRY", "403 with x-goog-user-project, retrying once without it");
          await capture(retryHeaders, serializedRequest.bodyString);
          response = await fetchWithReadinessTimeout(url, {
            method: "POST",
            headers: retryHeaders,
            body: getChunkedOrFixedBody(serializedRequest.bodyString, stream),
            ...(stream ? { duplex: "half" } : {}),
            signal,
          });
          finalHeaders = retryHeaders;
        }

        if (!response.ok) {
          log?.warn?.(
            "TELEMETRY",
            `[Antigravity] Error Response - URL: ${url}, Status: ${response.status}, Model: ${model}`
          );
        }

        // Parse retry time for 429/503 responses
        let retryMs: number | null = null;

        if (
          response.status === HTTP_STATUS.RATE_LIMITED ||
          response.status === HTTP_STATUS.SERVICE_UNAVAILABLE
        ) {
          // Try to get retry time from headers first
          retryMs = this.parseRetryHeaders(response.headers);

          // If no retry time in headers, try to parse from error message body
          if (!retryMs) {
            try {
              const errorBody = await response.clone().text();
              const errorJson = JSON.parse(errorBody);
              const errorMessage = errorJson?.error?.message || errorJson?.message || "";

              // 1. Try to parse explicit retry time from message
              const parsedRetryMs = this.parseRetryFromErrorMessage(errorMessage);

              // 2. Classify 429 (pass header-parsed retry hint as fallback
              //    signal — multi-hour Retry-After upgrades rate_limited to
              //    quota_exhausted so the GOOGLE_ONE_AI credits retry fires).
              const effectiveRetryHintMs = retryMs ?? parsedRetryMs ?? null;
              const category = classify429(errorMessage);

              // 3. Decide final retry time BEFORE the credits retry so that
              //    full_quota_exhausted can skip the credits attempt entirely
              //    (avoids ~41s hold on an already-exhausted account) and
              //    persist the cooldown to DB for post-restart routing.
              const decision: Decision = decide429(category, parsedRetryMs);
              retryMs = decision.retryAfterMs;
              log?.debug?.(
                "AG_429",
                `Category: ${category}, Decision: ${decision.kind} — ${decision.reason}`
              );

              if (decision.kind === "full_quota_exhausted" && retryMs) {
                markConnectionQuotaExhausted(accountId, retryMs);
              }

              const creditsAlreadyInjected =
                (transformedBody as { enabledCreditTypes?: unknown }).enabledCreditTypes != null;

              if (category === "quota_exhausted" && creditsAlreadyInjected) {
                handleCreditsFailure(credentials?.accessToken || "");
                log?.warn?.("AG_CREDITS", "Credits-first request 429'd — credits likely exhausted");
                markCreditsExhausted(accountId);
              }

              if (
                category === "quota_exhausted" &&
                decision.kind !== "full_quota_exhausted" &&
                !creditsAlreadyInjected &&
                shouldRetryWithCredits(credentials?.accessToken || "", creditsMode !== "off")
              ) {
                log?.info?.("AG_CREDITS", "Retrying with Google One AI credits");
                const creditsBody = injectCreditsField(transformedBody);
                const serializedCreditsRequest = serializeAntigravityRequest(
                  this.provider,
                  headers,
                  creditsBody
                );
                const finalCreditsHeaders = serializedCreditsRequest.headers;
                try {
                  await capture(finalCreditsHeaders, serializedCreditsRequest.bodyString);
                  const creditsResp = await fetchWithReadinessTimeout(url, {
                    method: "POST",
                    headers: finalCreditsHeaders,
                    body: getChunkedOrFixedBody(serializedCreditsRequest.bodyString, stream),
                    ...(stream ? { duplex: "half" } : {}),
                    signal,
                  });
                  if (creditsResp.ok || creditsResp.status !== HTTP_STATUS.RATE_LIMITED) {
                    log?.info?.("AG_CREDITS", `Credits retry succeeded: ${creditsResp.status}`);
                    if (!stream) {
                      const collected = await this.collectStreamToResponse(
                        creditsResp,
                        model,
                        url,
                        finalCreditsHeaders,
                        creditsBody,
                        log,
                        signal
                      );
                      // Parse _remainingCredits from the synthetic response and cache
                      try {
                        const syntheticJson = await collected.response.clone().json();
                        const rc = syntheticJson?._remainingCredits;
                        if (Array.isArray(rc)) {
                          const googleCredit = rc.find((c) => c.creditType === "GOOGLE_ONE_AI");
                          if (googleCredit) {
                            const balance = parseInt(googleCredit.creditAmount, 10);
                            if (!isNaN(balance))
                              updateAntigravityRemainingCredits(accountId, balance);
                          }
                        }
                      } catch {
                        /**/
                      }
                      return {
                        ...collected,
                        transformedBody: attachToolNameMap(creditsBody, requestToolNameMap),
                      };
                    }
                    return {
                      response: creditsResp,
                      url,
                      headers: finalCreditsHeaders,
                      transformedBody: attachToolNameMap(creditsBody, requestToolNameMap),
                    };
                  }

                  // Credit retry also 429'd
                  handleCreditsFailure(credentials?.accessToken || "");
                  log?.warn?.("AG_CREDITS", "Credits retry also 429'd");

                  // Also mark in our legacy exhaustion map to avoid retrying other routes
                  markCreditsExhausted(accountId);
                } catch (creditsErr) {
                  handleCreditsFailure(credentials?.accessToken || "");
                  log?.warn?.("AG_CREDITS", `Credits retry failed: ${creditsErr}`);
                }
              }
            } catch (e) {
              // Ignore parse errors, will fall back to exponential backoff
            }
          }

          // Bounded short-retry: a non-null retryAfterMs ≤ 60s covers nearly every
          // 429 (decide429 returns 2s/5s/60s defaults), so this branch MUST share the
          // per-URL attempt counter. Without the bound a persistent 429 loops forever
          // on the same endpoint/account (urlIndex-- cancels the loop's urlIndex++) and
          // never returns the 429 to the account-fallback layer in chat.ts.
          if (
            retryMs &&
            retryMs <= LONG_RETRY_THRESHOLD_MS &&
            retryAttemptsByUrl[urlIndex] < MAX_AUTO_RETRIES
          ) {
            retryAttemptsByUrl[urlIndex]++;
            const effectiveRetryMs = Math.min(retryMs, MAX_RETRY_AFTER_MS);
            log?.debug?.(
              "RETRY",
              `${response.status} retry ${retryAttemptsByUrl[urlIndex]}/${MAX_AUTO_RETRIES} with Retry-After: ${Math.ceil(effectiveRetryMs / 1000)}s, waiting...`
            );
            await new Promise((resolve) => setTimeout(resolve, effectiveRetryMs));
            urlIndex--;
            continue;
          }

          // Auto retry for 429 (no Retry-After) or transient 5xx errors.
          // For 5xx we read the body to detect known transient patterns
          // ("Agent execution terminated due to error", "high traffic", "capacity").
          if ((!retryMs || retryMs === 0) && retryAttemptsByUrl[urlIndex] < MAX_AUTO_RETRIES) {
            let shouldAutoRetry = response.status === HTTP_STATUS.RATE_LIMITED;
            if (!shouldAutoRetry && ANTIGRAVITY_TRANSIENT_STATUSES.has(response.status)) {
              try {
                const errBody = await response.clone().text();
                let errJson: unknown = null;
                try {
                  errJson = errBody ? JSON.parse(errBody) : null;
                } catch {
                  // non-JSON body — fall through to pattern match against raw text
                }
                const errMsg = this.extractErrorMessage(errJson, errBody);
                shouldAutoRetry = this.isTransientAntigravityError(response.status, errMsg);
              } catch {
                // ignore body read errors
              }
            }
            if (shouldAutoRetry) {
              retryAttemptsByUrl[urlIndex]++;
              // Exponential backoff: 2s, 4s, 8s… capped per-status
              const cap =
                response.status === HTTP_STATUS.RATE_LIMITED
                  ? MAX_RETRY_AFTER_MS
                  : ANTIGRAVITY_TRANSIENT_RETRY_MAX_MS;
              const backoffMs = Math.min(1000 * 2 ** retryAttemptsByUrl[urlIndex], cap);
              log?.debug?.(
                "RETRY",
                `${response.status} transient auto retry ${retryAttemptsByUrl[urlIndex]}/${MAX_AUTO_RETRIES} after ${backoffMs / 1000}s`
              );
              await new Promise((resolve) => setTimeout(resolve, backoffMs));
              urlIndex--;
              continue;
            }
          }

          log?.debug?.(
            "RETRY",
            `${response.status}, Retry-After ${retryMs ? `too long (${Math.ceil(retryMs / 1000)}s)` : "missing"}, trying fallback`
          );
          lastStatus = response.status;

          if (urlIndex + 1 < fallbackCount) {
            continue;
          }
        }

        if (this.shouldRetry(response.status, urlIndex)) {
          log?.debug?.("RETRY", `${response.status} on ${url}, trying fallback ${urlIndex + 1}`);
          lastStatus = response.status;
          continue;
        }

        // If we have a 429 with long retry time, embed it in response body
        if (
          response.status === HTTP_STATUS.RATE_LIMITED &&
          retryMs &&
          retryMs > LONG_RETRY_THRESHOLD_MS
        ) {
          try {
            const respBody = await response.clone().text();
            let obj;
            try {
              obj = JSON.parse(respBody);
            } catch {
              obj = {};
            }
            obj.retryAfterMs = retryMs;
            const modifiedBody = JSON.stringify(obj);
            const modifiedResponse = new Response(modifiedBody, {
              status: response.status,
              headers: response.headers,
            });
            return {
              response: modifiedResponse,
              url,
              headers: finalHeaders,
              transformedBody: attachToolNameMap(transformedBody, requestToolNameMap),
            };
          } catch (err) {
            log?.warn?.("RETRY", `Failed to embed retryAfterMs: ${err}`);
            // Fall back to original response
          }
        }

        // For non-streaming clients, collect the SSE stream and return a synthetic
        // non-streaming Response so chatCore doesn't need to handle SSE conversion.
        if (!stream) {
          // #3229: surface a real upstream error instead of masking a 4xx/5xx as an
          // empty `chat.completion` envelope (collectStreamToResponse synthesizes a
          // success-shaped body when the upstream returned no SSE data).
          if (!response.ok) {
            const rawBody = await response
              .clone()
              .text()
              .catch(() => "");
            const errorBody = buildAntigravityUpstreamError(
              response.status,
              response.statusText,
              rawBody
            );
            return {
              response: new Response(JSON.stringify(errorBody), {
                status: response.status,
                headers: { "Content-Type": "application/json" },
              }),
              url,
              headers: finalHeaders,
              transformedBody: attachToolNameMap(transformedBody, requestToolNameMap),
            };
          }
          const collected = await this.collectStreamToResponse(
            response,
            model,
            url,
            finalHeaders,
            transformedBody,
            log,
            signal
          );
          // When credits were injected (credits-first or credits-retry), the
          // synthetic body contains _remainingCredits — mirror it into the
          // balance cache so the dashboard stays fresh.
          try {
            const syntheticJson = await collected.response.clone().json();
            const rc = syntheticJson?._remainingCredits;
            if (Array.isArray(rc)) {
              const googleCredit = rc.find(
                (c: { creditType?: string }) => c?.creditType === "GOOGLE_ONE_AI"
              );
              if (googleCredit) {
                const balance = parseInt(googleCredit.creditAmount, 10);
                if (!isNaN(balance)) updateAntigravityRemainingCredits(accountId, balance);
              }
            }
          } catch {
            /* balance cache is best-effort */
          }
          return {
            ...collected,
            transformedBody: attachToolNameMap(transformedBody, requestToolNameMap),
          };
        }

        // Streaming path: wrap the response body in a pass-through TransformStream
        // that extracts remainingCredits from the final SSE chunk(s) without
        // consuming the stream. The client receives the unmodified SSE data.
        if (response.body) {
          // If the downstream client aborts, cancel the upstream fetch body immediately
          // to release the socket back to the Undici agent pool and prevent memory leaks.
          if (signal) {
            const abortHandler = () => {
              try {
                response.body?.cancel().catch(() => {});
              } catch (_) {}
            };
            if (signal.aborted) {
              abortHandler();
            } else {
              signal.addEventListener("abort", abortHandler, { once: true });
            }
          }

          let sseBuffer = "";
          const decoder = new TextDecoder(); // Singleton for correct streaming decode
          const MAX_BUFFER_SIZE = 16 * 1024; // Limit to prevent OOM on large streams

          const passThrough = new TransformStream(
            {
              transform(chunk, controller) {
                controller.enqueue(chunk);
                // Accumulate text to scan for remainingCredits
                try {
                  const text = decoder.decode(chunk, { stream: true });
                  sseBuffer += text;
                  // Limit buffer size to prevent unbounded growth
                  // Truncate only after a complete newline to avoid splitting SSE lines mid-payload
                  if (sseBuffer.length > MAX_BUFFER_SIZE) {
                    const lastNewline = sseBuffer.lastIndexOf(
                      "\n",
                      sseBuffer.length - MAX_BUFFER_SIZE
                    );
                    if (lastNewline !== -1) {
                      sseBuffer = sseBuffer.slice(lastNewline + 1);
                    } else {
                      // No newline found in discard region — buffer contains an incomplete SSE line.
                      // Discard it entirely to avoid returning malformed data; the remainingCredits
                      // parser won't find valid data in a truncated line anyway.
                      sseBuffer = "";
                    }
                  }
                } catch {
                  /* decoding best-effort */
                }
              },
              flush() {
                // Final decode for any remaining bytes
                try {
                  const text = decoder.decode(); // Flush pending bytes
                  sseBuffer += text;
                } catch {
                  /* decoding best-effort */
                }

                // Parse the accumulated SSE data for remainingCredits
                try {
                  const lines = sseBuffer.split("\n");
                  for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith("data:")) continue;
                    const payload = trimmed.slice(5).trim();
                    if (!payload || payload === "[DONE]") continue;
                    try {
                      const parsed = JSON.parse(payload);
                      if (Array.isArray(parsed?.remainingCredits)) {
                        const googleCredit = parsed.remainingCredits.find((c: unknown) => {
                          const credit = asRecord(c);
                          return credit?.creditType === "GOOGLE_ONE_AI";
                        }) as AntigravityCreditEntry | undefined;
                        if (googleCredit) {
                          const balance = parseInt(String(googleCredit.creditAmount ?? ""), 10);
                          if (!isNaN(balance)) {
                            updateAntigravityRemainingCredits(accountId, balance);
                          }
                        }
                      }
                    } catch {
                      /* skip malformed lines */
                    }
                  }
                } catch {
                  /* credits extraction is best-effort */
                }
                sseBuffer = "";
              },
            },
            { highWaterMark: 16384 },
            { highWaterMark: 16384 }
          );
          const tappedBody = response.body.pipeThrough(passThrough);
          const tappedResponse = new Response(tappedBody, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
          });
          return {
            response: tappedResponse,
            url,
            headers: finalHeaders,
            transformedBody: attachToolNameMap(transformedBody, requestToolNameMap),
          };
        }

        return {
          response,
          url,
          headers: finalHeaders,
          transformedBody: attachToolNameMap(transformedBody, requestToolNameMap),
        };
      } catch (error) {
        lastError = error;
        log?.error?.(
          "TELEMETRY",
          `[Antigravity] Network/Fetch Error - URL: ${url}, Model: ${model}, Error: ${error instanceof Error ? error.message : String(error)}`
        );
        if (urlIndex + 1 < fallbackCount) {
          log?.debug?.("RETRY", `Error on ${url}, trying fallback ${urlIndex + 1}`);
          continue;
        }
        throw error;
      }
    }

    throw lastError || new Error(`All ${fallbackCount} URLs failed with status ${lastStatus}`);
  }
}

export default AntigravityExecutor;
