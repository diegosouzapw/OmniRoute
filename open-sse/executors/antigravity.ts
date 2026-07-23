import crypto, { randomUUID } from "crypto";
import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ExecutorLog,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS, OAUTH_ENDPOINTS, HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { scrubProxyAndFingerprintHeaders } from "../services/antigravityHeaderScrub.ts";
import {
  getAntigravityContentHeaders,
  getAntigravityOAuthUserAgent,
} from "../services/antigravityHeaders.ts";
import { classify429, decide429, type Decision } from "../services/antigravity429Engine.ts";
import {
  shouldRetryWithCredits,
  shouldUseCreditsFirst,
  getCreditsMode,
  handleCreditsFailure,
} from "../services/antigravityCredits.ts";
import { persistCreditBalance, getAllPersistedCreditBalances } from "@/lib/db/creditBalance";
import { setConnectionRateLimitUntil } from "@/lib/db/providers";
import { getMitmAlias } from "@/lib/db/models";
import { ensureAntigravityProjectAssigned } from "../services/antigravityProjectBootstrap.ts";
import {
  resolveAntigravityModelId,
  getAntigravityModelFallbacks,
} from "../config/antigravityModelAliases.ts";
import {
  shouldStripCloudCodeThinking,
  stripCloudCodeThinkingConfig,
} from "../services/cloudCodeThinking.ts";
import { buildGeminiTools } from "../translator/helpers/geminiToolsSanitizer.ts";
import {
  type AntigravityCollectedStream,
  processAntigravitySSEText,
  flushAntigravitySSEText,
} from "./antigravity/sseCollect.ts";
// processAntigravitySSEPayload re-exported for external importers (tests).
export { processAntigravitySSEPayload } from "./antigravity/sseCollect.ts";
import {
  createCreditsExtractionTransform as createCreditsExtractionTransformImpl,
  type SsePassthroughResult,
} from "./antigravity/streamingPassthrough.ts";
import {
  toSafeAntigravityLog,
  finalizeAntigravityRequestBody,
  sendAntigravityRequest,
  tryCreditsRetry,
  tryEmbedLongRetryAfter,
  buildFinalAntigravityResult,
  buildAntigravity429ErrorMessage,
  markCreditsExhausted,
  isAbortError,
  type SafeAntigravityLog,
} from "./antigravity/executeAttempt.ts";
import {
  handleAntigravityFallbackChainError,
  handleAntigravityFallback400,
} from "./antigravity/proFallbackChain.ts";
import {
  getAntigravityClientProfile,
  resolveAntigravityClientVersion,
} from "../services/antigravityClientProfile.ts";
import {
  generateAntigravityRequestId,
  getAntigravityEnvelopeUserAgent,
  getAntigravitySessionId,
} from "../services/antigravityIdentity.ts";

const MAX_RETRY_AFTER_MS = 60_000;
const LONG_RETRY_THRESHOLD_MS = 60_000;
// Cap for transient 5xx backoff — shorter than the 429 cap to avoid long stalls on
// infra hiccups ("Agent execution terminated", "high traffic", capacity errors).
const ANTIGRAVITY_TRANSIENT_RETRY_MAX_MS = 15_000;
// Bounded per-URL auto-retry count for both the Retry-After-driven short retry and
// the no-Retry-After transient/429 backoff loop in executeOnce().
const MAX_AUTO_RETRIES = 3;

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
const ANTIGRAVITY_UNSUPPORTED_SAFETY_CATEGORIES = new Set<string>([
  "HARM_CATEGORY_CIVIC_INTEGRITY",
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

export type AntigravityCredentials = ProviderCredentials & {
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

type AntigravityRequestEnvelope = Record<string, unknown> & {
  project: string;
  model?: string;
  userAgent: "antigravity";
  requestType: "agent" | "image_gen";
  requestId: string;
  request: Record<string, unknown>;
  enabledCreditTypes?: string[];
};

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

/**
 * Pass-through TransformStream that extracts `remainingCredits` from SSE
 * data without consuming the stream (the downstream client receives the
 * unmodified bytes). Thin wrapper around the pure implementation in
 * streamingPassthrough.ts, injecting this executor's credit-balance cache
 * writer so the two modules don't import each other. See that module's
 * doc comment for the full parameter behavior.
 * @internal Exported for unit testing only.
 */
export function createCreditsExtractionTransform(
  accountId: string,
  bufferSize = 0
): TransformStream<Uint8Array, Uint8Array> {
  return createCreditsExtractionTransformImpl(
    accountId,
    updateAntigravityRemainingCredits,
    bufferSize
  );
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

/**
 * Hard ceiling on `generationConfig.maxOutputTokens` for Antigravity Cloud Code.
 *
 * Ports decolua/9router#779 (lukmanfauzie): VS Code GitHub Copilot Chat in
 * Agent mode regularly requests 32K–65K output tokens, which the Antigravity
 * backend rejects with HTTP 400 "Invalid Argument". 16384 matches the
 * upstream-accepted ceiling confirmed via successful 200 OK runs with
 * claude-sonnet-4-6 and gemini-pro-agent across both Ask and Agent modes.
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

function getAntigravitySafetySettings(safetySettings: unknown): unknown[] | undefined {
  if (!Array.isArray(safetySettings)) return undefined;

  return safetySettings.filter((setting) => {
    const category = asRecord(setting)?.category;
    return typeof category !== "string" || !ANTIGRAVITY_UNSUPPORTED_SAFETY_CATEGORIES.has(category);
  });
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

  // Preserve only caller-supplied safetySettings through the Claude-path whitelist.
  // Missing settings stay absent so OmniRoute does not silently weaken upstream safety.
  if (Array.isArray(request.safetySettings)) {
    clean.safetySettings = request.safetySettings;
  }

  return clean;
}

/**
 * Ported from decolua/9router#2321 (anki1kr): Vertex AI (used by Antigravity for
 * Claude-branded models) rejects a conversation ending on an assistant turn —
 * "This model does not support assistant message prefill" — so the request must
 * always end on a user turn. Upstream patched `openaiToClaudeRequestForAntigravity`
 * (dead code here, zero callers — see `open-sse/translator/request/openai-to-claude.ts`);
 * this relocates the same strip to the LIVE Antigravity dispatch path, where Claude
 * requests are converted to Gemini `contents` (assistant role is `"model"`, not
 * `"assistant"`). Mirrors the trailing-strip pop-loop already used for Mistral
 * (#3396), Copilot (#5802), and the CC-bridge in `claudeCodeCompatible.ts`.
 *
 * Scoped strictly to the Claude path by the caller (`isClaude` branch only) — native
 * Gemini models via Antigravity must be unaffected, since Vertex-Claude is the only
 * documented rejection surface.
 *
 * Guard: never strip `contents` down to empty — an empty `contents` array is itself
 * an invalid request, so at least one entry (even a lone trailing "model" turn) is
 * always preserved.
 */
function stripTrailingAntigravityAssistantTurn(
  request: Record<string, unknown>
): Record<string, unknown> {
  const contents = request.contents;
  if (!Array.isArray(contents) || contents.length === 0) {
    return request;
  }

  while (
    contents.length > 1 &&
    (contents[contents.length - 1] as AntigravityContent)?.role === "model"
  ) {
    contents.pop();
  }

  return request;
}

// Test-only export so the unit suite can exercise the strip logic directly.
export const __test_stripTrailingAntigravityAssistantTurn = stripTrailingAntigravityAssistantTurn;

type AntigravityCreditsRetryState = { attempted: boolean };

/** Base per-url-index attempt context, before the request has been sent. */
type AntigravityAttemptContext = {
  url: string;
  model: string;
  /** Pre-serialization headers (built by buildHeaders + mergeUpstreamExtraHeaders) — the
   * credits-retry re-serializes from these, NOT from `finalHeaders` (already fingerprinted). */
  headers: Record<string, string>;
  transformedBody: Record<string, unknown>;
  credentials: AntigravityCredentials;
  stream: boolean;
  signal: AbortSignal | null | undefined;
  log: SafeAntigravityLog;
  accountId: string;
  creditsMode: ReturnType<typeof getCreditsMode>;
  creditsRetryState: AntigravityCreditsRetryState;
  urlIndex: number;
  retryAttemptsByUrl: Record<number, number>;
  fallbackCount: number;
};

/** Context threaded through the 429/503 handling helpers — adds the sent response. */
type AntigravityRateLimitContext = AntigravityAttemptContext & {
  response: Response;
  finalHeaders: Record<string, string>;
};

/**
 * Outcome of handling a 429/503 response — tells executeOnce()'s loop what to do next.
 * `lastStatus` mirrors the original inline code, which only updated the outer
 * `lastStatus` variable when NOT retrying the same url (i.e. on retryNextUrl/fallthrough,
 * never on the bounded-short-retry or transient-auto-retry same-url paths).
 */
type AntigravityRateLimitOutcome =
  | { action: "return"; result: SsePassthroughResult }
  | { action: "retrySameUrl" }
  | { action: "retryNextUrl"; lastStatus: number }
  | { action: "fallthrough"; retryMs: number | null; lastStatus: number };

/** Outcome of one full per-url attempt in executeOnce() — return a result, or retry. */
type AntigravityAttemptOutcome =
  | { action: "return"; result: SsePassthroughResult }
  | { action: "retry"; sameUrl: boolean; lastStatus?: number };

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
    const clientProfile = getAntigravityClientProfile(credentials);
    const raw = {
      ...getAntigravityContentHeaders(clientProfile, credentials.accessToken),
      Accept: "text/event-stream",
    };
    // Scrub proxy/fingerprint headers that reveal non-native traffic
    return scrubProxyAndFingerprintHeaders(raw);
  }

  async transformRequest(
    model: string,
    body: unknown,
    _stream: boolean,
    credentials: AntigravityCredentials,
    modelIdOverride?: string,
    signal?: AbortSignal
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
    // returned empty/transiently failed). Mirror the Cloud Code bootstrap to recover it
    // here — the helper memoizes per access-token, so this is a one-time round-trip.
    if (!projectId && credentials?.accessToken) {
      const discovered = await ensureAntigravityProjectAssigned(
        credentials.accessToken,
        fetch,
        getAntigravityClientProfile(credentials),
        signal
      );
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

    const safetySettings = getAntigravitySafetySettings(normalizedRequest?.safetySettings);
    const rawTransformedRequest = {
      ...normalizedRequest,
      ...(contents.length > 0 && { contents }),
      sessionId: getAntigravitySessionId(
        credentials,
        typeof normalizedRequest?.sessionId === "string" ? normalizedRequest.sessionId : undefined
      ),
      ...(safetySettings !== undefined && { safetySettings }),
      toolConfig:
        Array.isArray(normalizedRequest?.tools) && normalizedRequest.tools.length > 0
          ? { functionCallingConfig: { mode: "VALIDATED" } }
          : normalizedRequest?.toolConfig,
    };

    const transformedRequest = isClaude
      ? stripTrailingAntigravityAssistantTurn(
          sanitizeAntigravityGeminiRequest(rawTransformedRequest)
        )
      : rawTransformedRequest;

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
      enabledCreditTypes: _enabledCreditTypes,
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
          "User-Agent": getAntigravityOAuthUserAgent(getAntigravityClientProfile(credentials)),
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
          typeof tokens.refresh_token === "string" && tokens.refresh_token
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
   *
   * @deprecated Use the non-streaming SSE path in chatCore instead, which calls
   * parseSSEToGeminiResponse() from sseParser/geminiResponse.ts.  This method is
   * retained only for backward compatibility and may be removed in a future release.
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

    // Guard against indefinite hangs when the upstream sends headers but
    // stalls on the body.  Inherit the global FETCH_TIMEOUT_MS (default 600 s,
    // overridable via env) so reasoning-heavy models (gemini-3.1-pro-high on
    // large prompts) are not killed by a hardcoded 120 s ceiling.
    const SSE_COLLECT_TIMEOUT_MS = FETCH_TIMEOUT_MS;

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
    await resolveAntigravityClientVersion(getAntigravityClientProfile(input.credentials));

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
      let result: Awaited<ReturnType<AntigravityExecutor["executeOnce"]>>;
      try {
        result = await this.executeOnce(input, candidate);
      } catch (error) {
        const outcome = handleAntigravityFallbackChainError(
          input,
          error,
          candidate,
          i,
          chain,
          firstResult,
          resolvedUpstreamId
        );
        switch (outcome.action) {
          case "throw":
            throw outcome.error;
          case "return":
            return outcome.result;
          default:
            continue;
        }
      }

      // Success (or any non-400) on a candidate → return immediately.
      if (result.response.status !== HTTP_STATUS.BAD_REQUEST) {
        return result;
      }

      // Remember the FIRST 400 so the exhausted-chain case surfaces the original error.
      if (!firstResult) firstResult = result;

      const outcome400 = handleAntigravityFallback400(
        input,
        result,
        firstResult,
        candidate,
        i,
        chain,
        resolvedUpstreamId
      );
      if (outcome400.action === "return") return outcome400.result;
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
    await resolveAntigravityClientVersion(getAntigravityClientProfile(credentials));
    const fallbackCount = this.getFallbackCount();
    const l = toSafeAntigravityLog(log);
    let lastError = null;
    let lastStatus = 0;
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
    const creditsRetryState: AntigravityCreditsRetryState = { attempted: false };

    for (let urlIndex = 0; urlIndex < fallbackCount; urlIndex++) {
      const url = this.buildUrl(model, upstreamStream, urlIndex);
      const headers = this.buildHeaders(credentials, upstreamStream);
      mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);
      const transformed = await this.transformRequest(
        model,
        body,
        upstreamStream,
        credentials,
        modelIdOverride,
        signal ?? undefined
      );

      if (transformed instanceof Response) {
        return { response: transformed, url, headers, transformedBody: body };
      }

      const transformedBody = finalizeAntigravityRequestBody(transformed, useCreditsFirst, l);

      // Initialize retry counter for this URL
      if (!retryAttemptsByUrl[urlIndex]) {
        retryAttemptsByUrl[urlIndex] = 0;
      }

      try {
        const outcome = await this.runAntigravityAttempt({
          url,
          model,
          headers,
          transformedBody,
          credentials,
          stream,
          signal,
          log: l,
          accountId,
          creditsMode,
          creditsRetryState,
          urlIndex,
          retryAttemptsByUrl,
          fallbackCount,
        });

        if (outcome.action === "return") return outcome.result;
        if (outcome.lastStatus !== undefined) lastStatus = outcome.lastStatus;
        if (outcome.sameUrl) urlIndex--;
        continue;
      } catch (error) {
        if (signal?.aborted || isAbortError(error)) {
          throw signal?.reason ?? error;
        }
        lastError = error;
        l.error(
          "TELEMETRY",
          `[Antigravity] Network/Fetch Error - URL: ${url}, Model: ${model}, Error: ${error instanceof Error ? error.message : String(error)}`
        );
        if (urlIndex + 1 < fallbackCount) {
          l.debug("RETRY", `Error on ${url}, trying fallback ${urlIndex + 1}`);
          continue;
        }
        throw error;
      }
    }

    throw lastError || new Error(`All ${fallbackCount} URLs failed with status ${lastStatus}`);
  }

  /**
   * Run one full per-url-index attempt: send the request, handle a 429/503 (retry
   * same/next url, or a Google One AI credits retry), fall back on other retryable
   * statuses, optionally embed a long Retry-After, then build the final non-streaming
   * or streaming result. Returns a result to hand back from execute(), or a retry
   * instruction for executeOnce()'s loop to act on (continue, optionally urlIndex--).
   */
  private async runAntigravityAttempt(
    ctx: AntigravityAttemptContext
  ): Promise<AntigravityAttemptOutcome> {
    const {
      url,
      model,
      headers,
      transformedBody,
      credentials,
      stream,
      signal,
      log,
      accountId,
      urlIndex,
      retryAttemptsByUrl,
      fallbackCount,
    } = ctx;

    const { response, finalHeaders } = await sendAntigravityRequest(
      this.provider,
      url,
      model,
      headers,
      transformedBody,
      credentials,
      stream,
      signal,
      log,
      retryAttemptsByUrl[urlIndex]
    );

    let retryMs: number | null = null;

    if (
      response.status === HTTP_STATUS.RATE_LIMITED ||
      response.status === HTTP_STATUS.SERVICE_UNAVAILABLE
    ) {
      const rateLimitOutcome = await this.handleAntigravityRateLimit({
        ...ctx,
        response,
        finalHeaders,
      });

      if (rateLimitOutcome.action === "return") {
        return { action: "return", result: rateLimitOutcome.result };
      }
      if (rateLimitOutcome.action === "retrySameUrl") return { action: "retry", sameUrl: true };
      if (rateLimitOutcome.action === "retryNextUrl") {
        return { action: "retry", sameUrl: false, lastStatus: rateLimitOutcome.lastStatus };
      }
      // Only "fallthrough" remains: last url, no more retries — proceed below with
      // the resolved retryMs so a long Retry-After can still be embedded in the body.
      retryMs = rateLimitOutcome.retryMs;
    }

    if (this.shouldRetry(response.status, urlIndex)) {
      log.debug("RETRY", `${response.status} on ${url}, trying fallback ${urlIndex + 1}`);
      return { action: "retry", sameUrl: false, lastStatus: response.status };
    }

    // If we have a 429 with long retry time, embed it in response body
    const embedded = await tryEmbedLongRetryAfter(
      response,
      retryMs,
      url,
      finalHeaders,
      transformedBody,
      log
    );
    if (embedded) return { action: "return", result: embedded };

    const result = await this.buildAntigravityAttemptResult(
      model,
      stream,
      response,
      url,
      finalHeaders,
      transformedBody,
      accountId,
      signal,
      log
    );
    return { action: "return", result };
  }

  /**
   * #3786 — Non-streaming callers (stream: false) keep the buffered
   * collect-to-JSON contract: `execute()` (including the Pro-family
   * fallback-chain retry loop) inspects `result.response` directly and
   * expects a synthesized `chat.completion` JSON body, not a raw SSE
   * pass-through. Passthrough is reserved for actual streaming clients
   * (buildFinalAntigravityResult's stream:true branch), where the client
   * itself drains the SSE bytes — collectStreamToResponse already uses
   * FETCH_TIMEOUT_MS (no hardcoded 120s ceiling), so long-thinking models
   * are not penalized by buffering here.
   */
  private async buildAntigravityAttemptResult(
    model: string,
    stream: boolean,
    response: Response,
    url: string,
    finalHeaders: Record<string, string>,
    transformedBody: Record<string, unknown>,
    accountId: string,
    signal: AbortSignal | null | undefined,
    log: SafeAntigravityLog
  ): Promise<SsePassthroughResult> {
    if (!stream && response.ok && response.body) {
      return this.collectStreamToResponse(
        response,
        model,
        url,
        finalHeaders,
        transformedBody,
        log,
        signal
      );
    }

    return buildFinalAntigravityResult(
      stream,
      response,
      url,
      finalHeaders,
      transformedBody,
      accountId,
      signal,
      updateAntigravityRemainingCredits
    );
  }

  /**
   * Handle a 429/503 response for one URL-index attempt: resolve the retry-after
   * time (headers, then error-body classification + Google-One-AI credits retry),
   * then decide whether to retry the SAME url, fall back to the NEXT url, or (on
   * the last url with no more retries left) fall through with the resolved retryMs
   * so the caller can still embed a long Retry-After in the final response body.
   */
  private async handleAntigravityRateLimit(
    ctx: AntigravityRateLimitContext
  ): Promise<AntigravityRateLimitOutcome> {
    const { response, log, urlIndex, retryAttemptsByUrl, fallbackCount } = ctx;

    // Try to get retry time from headers first
    let retryMs: number | null = this.parseRetryHeaders(response.headers);

    // If no retry time in headers, try to parse from error message body
    if (!retryMs) {
      const resolved = await this.tryResolveRetryFromErrorBody(ctx);
      if (resolved.kind === "return") return { action: "return", result: resolved.result };
      retryMs = resolved.retryMs;
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
      log.debug(
        "RETRY",
        `${response.status} retry ${retryAttemptsByUrl[urlIndex]}/${MAX_AUTO_RETRIES} with Retry-After: ${Math.ceil(effectiveRetryMs / 1000)}s, waiting...`
      );
      await new Promise((resolve) => setTimeout(resolve, effectiveRetryMs));
      return { action: "retrySameUrl" };
    }

    // Auto retry for 429 (no Retry-After) or transient 5xx errors.
    // For 5xx we read the body to detect known transient patterns
    // ("Agent execution terminated due to error", "high traffic", "capacity").
    if ((!retryMs || retryMs === 0) && retryAttemptsByUrl[urlIndex] < MAX_AUTO_RETRIES) {
      const shouldAutoRetry = await this.shouldAutoRetryTransient(response);
      if (shouldAutoRetry) {
        retryAttemptsByUrl[urlIndex]++;
        // Exponential backoff: 2s, 4s, 8s… capped per-status
        const cap =
          response.status === HTTP_STATUS.RATE_LIMITED
            ? MAX_RETRY_AFTER_MS
            : ANTIGRAVITY_TRANSIENT_RETRY_MAX_MS;
        const backoffMs = Math.min(1000 * 2 ** retryAttemptsByUrl[urlIndex], cap);
        log.debug(
          "RETRY",
          `${response.status} transient auto retry ${retryAttemptsByUrl[urlIndex]}/${MAX_AUTO_RETRIES} after ${backoffMs / 1000}s`
        );
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        return { action: "retrySameUrl" };
      }
    }

    log.debug(
      "RETRY",
      `${response.status}, Retry-After ${retryMs ? `too long (${Math.ceil(retryMs / 1000)}s)` : "missing"}, trying fallback`
    );

    if (urlIndex + 1 < fallbackCount) {
      return { action: "retryNextUrl", lastStatus: response.status };
    }

    return { action: "fallthrough", retryMs, lastStatus: response.status };
  }

  /**
   * Parse the 429/503 response body to classify the failure and (for
   * quota_exhausted, non-full-exhaustion cases) attempt a Google One AI
   * credits retry. Returns the resolved retryMs, or an early "return" result
   * when the credits retry itself produced a response to hand back to the client.
   */
  private async tryResolveRetryFromErrorBody(
    ctx: AntigravityRateLimitContext
  ): Promise<
    { kind: "return"; result: SsePassthroughResult } | { kind: "resolved"; retryMs: number | null }
  > {
    const {
      response,
      url,
      headers,
      transformedBody,
      credentials,
      stream,
      signal,
      log,
      accountId,
      creditsMode,
      creditsRetryState,
    } = ctx;

    try {
      const errorBody = await response.clone().text();
      const errorJson = JSON.parse(errorBody);
      const errorMessage = buildAntigravity429ErrorMessage(errorJson);

      // 1. Try to parse explicit retry time from message
      const parsedRetryMs = this.parseRetryFromErrorMessage(errorMessage);

      // 2. Classify 429, then decide the final retry time BEFORE the credits
      //    retry so that full_quota_exhausted can skip the credits attempt
      //    entirely (avoids ~41s hold on an already-exhausted account) and
      //    persist the cooldown to DB for post-restart routing.
      const category = classify429(errorMessage);
      const decision: Decision = decide429(category, parsedRetryMs);
      const retryMs = decision.retryAfterMs;
      log.debug("AG_429", `Category: ${category}, Decision: ${decision.kind} — ${decision.reason}`);

      const creditsAlreadyInjected =
        (transformedBody as { enabledCreditTypes?: unknown }).enabledCreditTypes != null;
      const creditsRetryEligible =
        category === "quota_exhausted" &&
        !creditsAlreadyInjected &&
        !creditsRetryState.attempted &&
        shouldRetryWithCredits(credentials?.accessToken || "", creditsMode);

      // Retry mode gets one credits attempt before the account cooldown is persisted.
      // All other full-quota paths fail closed immediately.
      if (decision.kind === "full_quota_exhausted" && retryMs && !creditsRetryEligible) {
        markConnectionQuotaExhausted(accountId, retryMs);
      }

      if (category === "quota_exhausted" && creditsAlreadyInjected) {
        handleCreditsFailure(credentials?.accessToken || "");
        log.warn("AG_CREDITS", "Credits-first request 429'd — credits likely exhausted");
        markCreditsExhausted(accountId);
      }

      if (creditsRetryEligible) {
        creditsRetryState.attempted = true;
        const creditsResult = await tryCreditsRetry(
          this.provider,
          url,
          headers,
          transformedBody,
          credentials,
          stream,
          signal,
          log,
          accountId,
          updateAntigravityRemainingCredits
        );
        if (creditsResult) return { kind: "return", result: creditsResult };
        if (retryMs) markConnectionQuotaExhausted(accountId, retryMs);
      }

      return { kind: "resolved", retryMs };
    } catch (error) {
      if (signal?.aborted || isAbortError(error)) {
        throw signal?.reason ?? error;
      }
      // Ignore parse errors, will fall back to exponential backoff
      return { kind: "resolved", retryMs: null };
    }
  }

  /**
   * True for 429 always; for transient 5xx (500/502/503/504) only when the body
   * matches a known capacity/traffic/agent-terminated pattern.
   */
  private async shouldAutoRetryTransient(response: Response): Promise<boolean> {
    if (response.status === HTTP_STATUS.RATE_LIMITED) return true;
    if (!ANTIGRAVITY_TRANSIENT_STATUSES.has(response.status)) return false;
    try {
      const errBody = await response.clone().text();
      let errJson: unknown = null;
      try {
        errJson = errBody ? JSON.parse(errBody) : null;
      } catch {
        // non-JSON body — fall through to pattern match against raw text
      }
      const errMsg = this.extractErrorMessage(errJson, errBody);
      return this.isTransientAntigravityError(response.status, errMsg);
    } catch {
      // ignore body read errors
      return false;
    }
  }
}

export default AntigravityExecutor;
