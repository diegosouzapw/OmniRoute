/**
 * Vision Bridge helper functions for image processing.
 */
import { detectMediaParts, type MediaPart } from "@omniroute/open-sse/utils/mediaParts";
import { normalizeDataUri } from "@omniroute/open-sse/utils/imageNormalize";
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { resolveSelfLoopBearer } from "@/shared/middleware/chatBodyAdmission";
import { getBestVisionModel, getFallbackModels, recordLatency } from "./visionBridgeRouter";
import { REGISTRY } from "@omniroute/open-sse/config/providers";
import { fetch as undiciFetch } from "undici";
/**
 * Provider to environment variable mapping for API key resolution.
 */
const PROVIDER_API_KEY_MAP: Record<string, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  google: "GOOGLE_API_KEY",
  openai: "OPENAI_API_KEY",
};

// Providers whose wire format is Anthropic Messages ("claude"). Anthropic
// accepts `source: { type: "url" }` for images, but most claude-format backends
// (MiniMax, Z.AI, …) do NOT — they reject remote URLs (MiniMax: 403 code
// 2013). The vision bridge must deliver images as base64 for these targets,
// both in the describe self-loop and in the rerouted payload.
const CLAUDE_WIRE_PROVIDERS = new Set<string>(
  Object.entries(REGISTRY)
    .filter(([, entry]) => entry.format === "claude")
    .map(([id]) => id.toLowerCase())
);

/**
 * True when `provider/model` targets a Claude-Messages wire format backend
 * that cannot ingest remote image URLs and needs base64 instead.
 */
export function isClaudeWireFormatModel(model: string | null | undefined): boolean {
  if (!model || typeof model !== "string") return false;
  const provider = model.includes("/") ? model.split("/")[0].trim().toLowerCase() : "";
  return CLAUDE_WIRE_PROVIDERS.has(provider);
}

/**
 * Resolve API key based on model provider (issue #2232).
 *
 * Priority:
 *   1. `explicitKey` argument (caller override)
 *   2. `VISION_BRIDGE_API_KEY` env var — operator-set, takes precedence over
 *      per-provider env vars. Used when the operator wants every vision-bridge
 *      call to go through a single OpenAI-compatible endpoint (e.g.,
 *      OmniRoute itself, OpenRouter, a Gemini-OpenAI-compat URL).
 *   3. Per-provider env var (`ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`,
 *      `OPENAI_API_KEY`) based on the `provider/` prefix in the model id.
 *   4. `OPENAI_API_KEY` as final fallback when the prefix is unrecognized.
 *
 * @param model - Model identifier (e.g., "anthropic/claude-3-haiku", "openai/gpt-4o-mini")
 * @param explicitKey - Explicit API key passed as argument (takes precedence)
 * @returns Resolved API key string
 */
export function resolveProviderApiKey(model: string, explicitKey?: string): string {
  if (explicitKey) return explicitKey;
  const isAnthropic = model.startsWith("anthropic/");
  // VISION_BRIDGE_API_KEY only applies to the OpenAI-compatible branch — the
  // Anthropic branch keeps its dedicated key, since the wire format differs.
  if (!isAnthropic) {
    const bridgeKey = (process.env.VISION_BRIDGE_API_KEY || "").trim();
    if (bridgeKey) return bridgeKey;
  }
  const provider = model.includes("/") ? model.split("/")[0] : "";
  const envVar = PROVIDER_API_KEY_MAP[provider] || "OPENAI_API_KEY";
  return process.env[envVar] || "";
}

let selfLoopKeyPromise: Promise<string> | null = null;

/**
 * Resolve a real API key for the OmniRoute SELF-LOOP describe call.
 *
 * The `sk_omniroute` sentinel works only when REQUIRE_API_KEY is disabled; on
 * REQUIRE_API_KEY instances it is rejected with 401 "Missing API key", which
 * silently breaks every vision-bridge describe. Priority:
 *   1. VISION_BRIDGE_API_KEY env (already handled by resolveProviderApiKey —
 *      kept here for the injected-resolver test path).
 *   2. Injected resolver (tests) or the DB-backed `getOrCreateApiKey()` —
 *      memoized so at most one key is created per process.
 *   3. `sk_omniroute` as a final fallback (local mode without auth).
 */
export async function resolveSelfLoopApiKey(resolver?: () => Promise<string>): Promise<string> {
  const envKey = (process.env.VISION_BRIDGE_API_KEY || "").trim();
  if (envKey) return envKey;
  if (resolver) {
    const key = (await resolver()).trim();
    if (key) return key;
    return "sk_omniroute";
  }
  if (!selfLoopKeyPromise) {
    selfLoopKeyPromise = (async () => {
      try {
        const { getOrCreateApiKey } = await import("@/shared/services/apiKeyResolver");
        const key = await getOrCreateApiKey();
        if (typeof key === "string" && key.trim().length > 0) return key.trim();
      } catch {
        /* fall through */
      }
      return "sk_omniroute";
    })();
  }
  return selfLoopKeyPromise;
}

/**
 * Resolve the OpenAI-compatible base URL for non-Anthropic vision bridge calls
 * (issue #2232).
 *
 * Priority:
 *   1. `VISION_BRIDGE_BASE_URL` env var — operator-set, e.g. point this at
 *      OmniRoute's own `/v1` so the vision model can be any provider
 *      registered in OmniRoute (`google/gemini-2.0-flash`,
 *      `openrouter/...`, etc.) instead of being limited to OpenAI/Anthropic.
 *   2. `OPENAI_API_URL` env var (legacy)
 *   3. OmniRoute self-loop (`http://localhost:20128/v1`) — auto-detected when
 *      the model uses a known OmniRoute-internal provider (e.g. `kr/`, `if/`,
 *      `pol/`, `groq/`, etc.) instead of a direct OpenAI/Anthropic endpoint.
 *   4. `https://api.openai.com/v1` (fallback when the model is `openai/*` or
 *      unprefixed — works only when the operator actually has an OpenAI
 *      account and OPENAI_API_KEY set)
 *
 * @param model - Optional model identifier used to detect non-standard providers
 *                that require OmniRoute self-loop routing.
 */
export function resolveVisionBridgeBaseUrl(model?: string): string {
  const explicit = (process.env.VISION_BRIDGE_BASE_URL || "").trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const legacy = (process.env.OPENAI_API_URL || "").trim();
  if (legacy) return legacy.replace(/\/+$/, "");

  // When the model has a non-standard provider prefix (not openai/ or
  // anthropic/), it can only be resolved through OmniRoute's own router,
  // not through a direct OpenAI/Anthropic endpoint. Use the operator-configured
  // port via OMNIROUTE_PORT / PORT env vars, falling back to the default 20128.
  if (model && model.includes("/")) {
    const provider = model.split("/")[0].toLowerCase();
    if (provider !== "openai" && provider !== "anthropic") {
      const { port } = getRuntimePorts();
      return `http://localhost:${port}/v1`;
    }
  }

  return "https://api.openai.com/v1";
}

export interface ImagePart {
  messageIndex: number;
  partIndex: number;
  imageUrl: string;
  imageType: "image_url" | "image" | "url";
  /**
   * For nested hits (image inside a container part, e.g. a tool_result's
   * content array) the path from `message.content[partIndex]` to the image
   * object itself — what replaceImageParts walks to splice it. Absent for
   * top-level parts (plain partIndex splice).
   */
  path?: (string | number)[];
}

export interface RequestMessage {
  role?: string;
  content?: string | RequestContentPart[];
}

export type RequestContentPart =
  | { type: "text"; text: string }
  | { type: "input_text"; text: string }
  | { type: "image_url"; image_url: { url: string; detail?: string } }
  | { type: "input_image"; image_url: string; detail?: string }
  | {
      type: "image";
      source: { type: "base64"; media_type: string; data: string } | { type: "url"; url: string };
    };

/**
 * Extract image parts from messages array.
 * Supports OpenAI image_url format, base64 image format, and Anthropic-style
 * image source blocks with either `source.type: "base64"` or `source.type: "url"`.
 *
 * The URL-source branch mirrors the executor-level handling in
 * `open-sse/executors/commandCode.ts::extractImageUrl` — without it, a
 * Claude-Code-compatible client (e.g. Zoo Code) sending
 * `{ type: "image", source: { type: "url", url } }` was invisible to the
 * vision-bridge guardrail, so the image was silently dropped by a text-only
 * executor instead of being described.
 */
/**
 * Shapes `replaceImageParts` knows how to splice: content parts whose `type`
 * is `image_url`, `image`, or `input_image` — at top level or nested (inside
 * a container part such as a tool_result's content array; nested hits are
 * spliced by walking `MediaPart.path`). Everything else the detector reports
 * (`data_uri_string`, `image_indicator`) is combo-filter material only —
 * extracting it would desync the positional description consumption in
 * visionBridge (descriptions would shift onto the wrong images).
 */
const REPLACEABLE_IMAGE_SHAPES: ReadonlySet<MediaPart["shape"]> = new Set([
  "image_url",
  "image_base64",
  "image_source_url",
  "input_image",
]);

export function extractImageParts(messages: RequestMessage[]): ImagePart[] {
  // Delegates to the unified detector (open-sse/utils/mediaParts.ts) so the
  // guardrail and the combo compatibility filter share one source of truth.
  // Extraction is shaped-allowlisted and covers BOTH top-level parts and
  // nested hits (image inside a container part, e.g. Claude Code's tool_result
  // content array) whose shape replaceImageParts can splice back — the
  // extract↔replace contract: every extracted part MUST be replaceable, in the
  // same order, or the positional descriptions shift onto the wrong images.
  // Nested hits carry `path` so the splice can walk the container; top-level
  // hits rely on messageIndex/partIndex alone.
  return detectMediaParts(messages)
    .filter((p) => p.kind === "image" && REPLACEABLE_IMAGE_SHAPES.has(p.shape))
    .map((p) => ({
      messageIndex: p.messageIndex,
      partIndex: p.partIndex,
      imageUrl: p.ref,
      imageType:
        p.shape === "image_base64" ? "image" : p.shape === "image_source_url" ? "url" : "image_url",
      ...(p.nested ? { path: p.path } : {}),
    }));
}

// Undici fetch with a browser-ish User-Agent: Wikimedia (and other CDNs)
// reject requests without a UA with HTTP 400, silently breaking remote image
// downloads in the describe path.
const VISION_BRIDGE_UA_FETCH: typeof fetch = ((input: RequestInfo | URL, init?: RequestInit) =>
  undiciFetch(input as string | URL, {
    ...(init as Parameters<typeof undiciFetch>[1]),
    headers: {
      "user-agent": "omniroute-vision-bridge",
      ...((init?.headers as Record<string, string> | undefined) ?? {}),
    },
  })) as unknown as typeof fetch;

/**
 * Resolve every image part in the body to a base64 data URI when the target
 * model speaks the Claude wire format (remote URLs unsupported by most
 * claude-format backends, e.g. MiniMax 403 2013). Fail-open: an image that
 * cannot be fetched is left untouched.
 */
export async function ensureBase64ImagesForClaudeWire(
  body: RequestBody,
  model: string,
  fetchImpl: typeof fetch = VISION_BRIDGE_UA_FETCH
): Promise<RequestBody> {
  if (!isClaudeWireFormatModel(model)) return body;
  // The splice below re-walks top-level content parts and swaps
  // image_url/image fields by sequential index. Nested hits now carry
  // `path` (extractImageParts emits them); this loop only handles top-level
  // image_url/image parts, so skip nested hits to keep the index map aligned
  // (a nested hit interleaved with top-level hits would desync the map).
  const parts = extractImageParts(body.messages as RequestMessage[]).filter((p) => !p.path);
  if (parts.length === 0) return body;

  const resolved = await Promise.all(
    parts.map(async (part) => {
      const normalized = resolveImageAsDataUri(part.imageUrl);
      if (normalized.startsWith("data:")) return null; // already base64
      try {
        return await fetchRemoteImageAsDataUri(normalized, new AbortController().signal, fetchImpl);
      } catch {
        return null; // fail-open: keep the original part
      }
    })
  );

  // Map sequential image index → resolved data URI (null = keep original).
  const byIndex = new Map<number, string>();
  parts.forEach((part, i) => {
    if (resolved[i]) byIndex.set(i, resolved[i] as string);
  });
  if (byIndex.size === 0) return body;

  const result = structuredClone(body) as RequestBody;
  let imageIndex = 0;
  for (const message of result.messages ?? []) {
    if (!message || !Array.isArray(message.content)) continue;
    for (const part of message.content as RequestContentPart[]) {
      if (part.type !== "image_url" && part.type !== "image") continue;
      const dataUri = byIndex.get(imageIndex);
      imageIndex++;
      if (dataUri) {
        (part as { image_url?: { url: string } }).image_url = { url: dataUri };
      }
    }
  }
  return result;
}

/**
 * Resolve image URL to data URI format for vision model.
 * - HTTP/HTTPS URLs: passed through as-is
 * - Data URIs: passed through as-is
 * - Base64 without media type: assumed PNG
 */
export function resolveImageAsDataUri(imageUrl: string): string {
  if (!imageUrl || typeof imageUrl !== "string") {
    throw new Error("Invalid image URL: must be a non-empty string");
  }

  // Already a data URI
  if (imageUrl.startsWith("data:")) {
    return imageUrl;
  }

  // HTTP/HTTPS URL - vision API will fetch it
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Assume it's a base64 string without prefix
  // Add PNG as default media type
  return `data:image/png;base64,${imageUrl}`;
}

async function fetchRemoteImageAsDataUri(
  imageUrl: string,
  signal: AbortSignal,
  fetchImpl: typeof fetch = VISION_BRIDGE_UA_FETCH
): Promise<string> {
  const remoteImage = await fetchRemoteImage(imageUrl, {
    signal,
    // Bypass the runtime's hooked global fetch (ProxyFetch) — a dead local
    // proxy (e.g. 127.0.0.1:8317) would otherwise break the download.
    fetchImpl,
  });
  const mediaType = remoteImage.contentType.split(";")[0]?.trim() || "image/png";
  const dataUri = `data:${mediaType};base64,${remoteImage.buffer.toString("base64")}`;
  // Downscale to the long-edge cap before handing the image to the vision
  // model self-call — scoped to this bridge-fetched image only, never the
  // user's raw passthrough payload (opt-in principle, HR#20).
  // `normalizeDataUri` never throws and is a passthrough for non-image bytes.
  return normalizeDataUri(dataUri);
}

async function normalizeVisionImageInput(
  imageInput: string,
  isAnthropic: boolean,
  signal: AbortSignal,
  fetchImpl?: typeof fetch
): Promise<string> {
  const normalizedImage = resolveImageAsDataUri(imageInput);

  if (
    isAnthropic &&
    (normalizedImage.startsWith("http://") || normalizedImage.startsWith("https://"))
  ) {
    return fetchRemoteImageAsDataUri(normalizedImage, signal, fetchImpl);
  }

  return normalizedImage;
}

export interface VisionModelConfig {
  model: string;
  prompt: string;
  timeoutMs: number;
  maxImages: number;
  /** Route catalog models through OmniRoute so provider connections remain authoritative. */
  routeThroughOmniRoute?: boolean;
  /** Optional parent deadline/abort propagated by multi-step media bridges. */
  signal?: AbortSignal;
  /** Injectable fetch (tests). Defaults to undici fetch to bypass the runtime's hooked global fetch. */
  fetchImpl?: typeof fetch;
  /** Receives the actual successful model while the public return value remains a string. */
  onModelUsed?: (model: string) => void;
}

/** Task-aware focus hint (codex-vision-proxy pattern): steer the description
 * toward what the user actually asked, instead of a generic caption. */
export function composeVisionPrompt(
  basePrompt: string,
  lastUserText: string | undefined,
  taskAware: boolean
): string {
  const text = (lastUserText ?? "").trim();
  if (!taskAware || !text) return basePrompt;
  const hint = text.length > 500 ? `${text.slice(0, 500)}…` : text;
  return `${basePrompt}\n\nThe user asked: "${hint}". Focus your description on what is relevant to answering this, and transcribe any text visible in the image.`;
}

/**
 * Call the vision model to get an image description.
 * Supports both OpenAI-compatible and Anthropic API formats.
 * Uses auto-routing to select the fastest available model.
 */
export async function callVisionModel(
  imageDataUri: string,
  config: VisionModelConfig,
  apiKey?: string,
  routerConfig?: Partial<import("./visionBridgeRouter").VisionBridgeRouterConfig>,
  deps?: import("./visionBridgeRouter").VisionBridgeRouterDeps
): Promise<string> {
  if (config.signal?.aborted) {
    throw new Error("Vision model call aborted");
  }

  // Auto-select the best vision model. `deps` is the router's existing
  // injectable credential-check seam — without forwarding it, tests (and any
  // embedder) cannot keep model selection away from the live connections DB.
  const modelToUse = await getBestVisionModel(
    {
      fixedModel: config.model,
      ...routerConfig,
    },
    deps
  );
  // (#8430) When no vision-capable provider has usable credentials on this
  // instance, surface a clear error instead of attempting a describe call that
  // would fail with an opaque auth/serde error upstream.
  if (!modelToUse) {
    throw new Error("No vision-capable provider connected, cannot process image request");
  }
  let lastError: Error | null = null;

  // Try primary model + fallbacks
  const modelsToTry = [modelToUse, ...(await getFallbackModels(modelToUse, routerConfig, deps))];
  const maxAttempts = Math.min(modelsToTry.length, routerConfig?.maxFallbackAttempts ?? 3);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (config.signal?.aborted) {
      throw lastError ?? new Error("Vision model call aborted");
    }
    const currentModel = modelsToTry[attempt];
    const attemptStart = Date.now();
    try {
      const result = await callVisionModelSingle(
        imageDataUri,
        { ...config, model: currentModel },
        apiKey
      );
      recordLatency(currentModel, Date.now() - attemptStart, true);
      try {
        config.onModelUsed?.(currentModel);
      } catch {
        // Observability callbacks must never turn a successful caption into a retry.
      }
      return result;
    } catch (error) {
      recordLatency(currentModel, Date.now() - attemptStart, false);
      lastError = error instanceof Error ? error : new Error(String(error));
      if (config.signal?.aborted) {
        throw lastError;
      }
      // Continue to next model on failure
    }
  }

  // All models failed
  throw lastError || new Error("All vision models failed");
}

/**
 * Unwrap the detailed-log/diagnostics envelope that some OmniRoute paths attach
 * to provider responses (`{ _streamed, _format, summary: {...} }`). Returns the
 * inner `summary` object when present, otherwise the value unchanged.
 */
function unwrapVisionSummary(value: unknown): unknown {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    if (record.summary && typeof record.summary === "object") {
      return record.summary;
    }
  }
  return value;
}

/**
 * Parse a vision-bridge response body that may be:
 *   1. Plain JSON (`{ choices: [...] }` / `{ content: [...] }`)
 *   2. An SSE stream of `data: {...}` lines (forceStream providers, or
 *      OmniRoute's self-loop when the `stream` default kicks in)
 *   3. The `{ _streamed, _format, summary }` diagnostics envelope
 *
 * For SSE input, aggregates `delta.content` / `delta.reasoning_content`
 * (OpenAI-compatible) and `delta.text` (Anthropic-style `content_block_delta`)
 * across all chunks into a single chat.completion-shaped object. Returns `null`
 * when the body yields nothing usable.
 */
function parseSseVisionBody(rawBody: string): unknown {
  const trimmed = String(rawBody || "").trim();
  if (!trimmed) return null;

  // Direct JSON (normal non-stream response).
  try {
    return unwrapVisionSummary(JSON.parse(trimmed));
  } catch {
    // Fall through to SSE aggregation.
  }

  const contentParts: string[] = [];
  const reasoningParts: string[] = [];
  const anthropicTextParts: string[] = [];
  let sawChoices = false;

  for (const line of trimmed.split(/\r?\n/)) {
    const lineTrimmed = line.trim();
    if (!lineTrimmed.startsWith("data:")) continue;
    const payload = lineTrimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;

    let chunk: Record<string, unknown>;
    try {
      chunk = JSON.parse(payload);
    } catch {
      continue; // Ignore malformed lines and keep scanning.
    }
    if (!chunk || typeof chunk !== "object") continue;

    const unwrapped = unwrapVisionSummary(chunk) as Record<string, unknown>;

    // Error-only SSE chunk (`data: {"error":{...}}` with no choices) — surface
    // the upstream message instead of a generic "empty or invalid response".
    if (unwrapped.error != null && !Array.isArray(unwrapped.choices)) {
      const err = unwrapped.error;
      let message = "";
      if (typeof err === "string") {
        message = err;
      } else if (typeof err === "object" && !Array.isArray(err)) {
        message = (err as { message?: unknown }).message
          ? String((err as { message?: unknown }).message)
          : JSON.stringify(err);
      } else {
        message = String(err);
      }
      throw new Error(`Vision API error: ${message}`);
    }

    const choice = (unwrapped.choices as Array<Record<string, unknown>> | undefined)?.[0];
    if (choice) sawChoices = true;

    const delta = choice?.delta as Record<string, unknown> | undefined;
    if (typeof delta?.content === "string" && delta.content.length > 0) {
      contentParts.push(delta.content);
    }
    if (typeof delta?.reasoning_content === "string" && delta.reasoning_content.length > 0) {
      reasoningParts.push(delta.reasoning_content);
    }
    // opencode-routed gateways (e.g. mimo-v2.5-free) stream chain-of-thought in
    // `delta.reasoning` instead of `reasoning_content` (#6623).
    if (typeof delta?.reasoning === "string" && delta.reasoning.length > 0) {
      reasoningParts.push(delta.reasoning);
    }

    // Some providers put a full message (not a delta) in the final chunk.
    const message = choice?.message as Record<string, unknown> | undefined;
    if (typeof message?.content === "string" && message.content.length > 0) {
      contentParts.push(message.content);
    }
    if (typeof message?.reasoning_content === "string" && message.reasoning_content.length > 0) {
      reasoningParts.push(message.reasoning_content);
    }
    if (typeof message?.reasoning === "string" && message.reasoning.length > 0) {
      reasoningParts.push(message.reasoning);
    }

    // Anthropic-style streaming: `content_block_delta` with `delta.text`.
    if (Array.isArray(unwrapped.content)) {
      for (const block of unwrapped.content as Array<Record<string, unknown>>) {
        if (typeof block?.text === "string" && block.text.length > 0) {
          anthropicTextParts.push(block.text);
        }
      }
    }
  }

  if (
    contentParts.length === 0 &&
    reasoningParts.length === 0 &&
    anthropicTextParts.length === 0 &&
    !sawChoices
  ) {
    return null;
  }

  const content = contentParts.join("").trim();
  const reasoning = reasoningParts.join("").trim();
  const anthropicText = anthropicTextParts.join("").trim();

  if (anthropicText && !content) {
    return { content: [{ type: "text", text: anthropicText }] };
  }

  const message: Record<string, unknown> = { role: "assistant", content };
  if (reasoning) message.reasoning_content = reasoning;
  return { choices: [{ message }] };
}

/**
 * Read a vision-model HTTP response body tolerantly: try `json()` first, then
 * fall back to text/SSE parsing. Some OpenAI-compatible backends (including
 * OmniRoute's own self-loop and forceStream providers) reply with a `data:`
 * SSE stream even for `stream: false`, which makes `response.json()` throw
 * `Unexpected token 'd'`.
 */
async function readVisionResponseBody(response: Response): Promise<unknown> {
  try {
    // JSON path — also unwrap the { _streamed, summary } diagnostics envelope
    // that some OmniRoute capture paths attach to provider responses.
    return unwrapVisionSummary(await response.json());
  } catch {
    // Not JSON — attempt SSE / envelope parsing from the raw text.
  }

  let rawText = "";
  try {
    if (typeof (response as Response & { text?: unknown }).text === "function") {
      rawText = await response.text();
    }
  } catch {
    rawText = "";
  }

  const parsed = parseSseVisionBody(rawText);
  if (parsed === null) {
    throw new Error("Vision API returned empty or invalid response");
  }
  return parsed;
}

/**
 * Extract the description text from an OpenAI-compatible vision response.
 * Falls back to `reasoning_content` then `reasoning` when `content` is empty —
 * reasoning models (e.g. xiaomi/mimo-v2.5, opencode/mimo-v2.5-free) can exhaust
 * `max_tokens` on chain-of-thought and return `content: null` with a complete
 * analysis in a reasoning field. opencode-routed gateways name that field
 * `reasoning` rather than `reasoning_content` (#6623 / #10809).
 */
function extractOpenAICompatibleContent(data: unknown): string {
  const record = data as {
    choices?: Array<{
      message?: { content?: unknown; reasoning_content?: unknown; reasoning?: unknown };
    }>;
    error?: { message?: string };
  } | null;

  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error("Vision API returned invalid response");
  }

  if (record.error) {
    throw new Error(`Vision API error: ${record.error.message || JSON.stringify(record.error)}`);
  }

  const message = record.choices?.[0]?.message;
  const content = typeof message?.content === "string" ? message.content.trim() : "";
  if (content) return content;

  const reasoning =
    typeof message?.reasoning_content === "string"
      ? message.reasoning_content.trim()
      : typeof message?.reasoning === "string"
        ? message.reasoning.trim()
        : "";
  if (reasoning) return reasoning;

  throw new Error("Vision API returned empty or invalid response");
}

/**
 * Internal function to call a single vision model.
 */
async function callVisionModelSingle(
  imageDataUri: string,
  config: VisionModelConfig,
  apiKey?: string
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs);
  const signal = config.signal
    ? AbortSignal.any([config.signal, controller.signal])
    : controller.signal;

  // Resolve API key based on provider
  const resolvedApiKey = resolveProviderApiKey(config.model, apiKey);
  // Production callers (VisionBridgeGuardrail) inject undici fetch to bypass
  // the runtime's hooked global fetch (ProxyFetch). Defaults to globalThis.fetch
  // so existing unit tests that mock it keep working.
  const fetchImpl = config.fetchImpl ?? globalThis.fetch;

  // Detect provider from model identifier. Claude-wire targets (minimax, zai,
  // …) cannot ingest remote image URLs — normalize to base64 so the self-loop
  // body reaches the backend as a data URI (the OpenAI→claude translator only
  // preserves data URIs as base64; remote URLs become source.url which these
  // backends reject).
  const routeThroughOmniRoute = config.routeThroughOmniRoute === true;
  const isAnthropic = !routeThroughOmniRoute && config.model.startsWith("anthropic/");
  const requiresBase64 = isAnthropic || isClaudeWireFormatModel(config.model);

  try {
    // Extract model name from provider/model format
    const modelName = config.model.includes("/") ? config.model.split("/")[1] : config.model;
    const normalizedImageInput = await normalizeVisionImageInput(
      imageDataUri,
      requiresBase64,
      signal,
      fetchImpl
    );

    let response: Response;

    if (isAnthropic) {
      // Anthropic API path
      const anthropicBaseUrl = process.env.ANTHROPIC_API_URL || "https://api.anthropic.com";

      // Parse data URI to extract media type and base64 data
      const matches = normalizedImageInput.match(/^data:([^;]+);base64,(.+)$/);
      let mediaType = "image/png";
      let base64Data = normalizedImageInput;

      if (matches) {
        mediaType = matches[1];
        base64Data = matches[2];
      }

      response = await fetchImpl(`${anthropicBaseUrl}/v1/messages`, {
        method: "POST",
        signal,
        headers: {
          "x-api-key": resolvedApiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: mediaType,
                    data: base64Data,
                  },
                },
                {
                  type: "text",
                  text: config.prompt,
                },
              ],
            },
          ],
          max_tokens: 300,
        }),
      });
    } else {
      // OpenAI-compatible path (default) — issue #2232: honor
      // VISION_BRIDGE_BASE_URL so the vision-bridge call can be routed through
      // OmniRoute itself or any other OpenAI-compatible endpoint instead of
      // hardcoded api.openai.com.
      const baseUrl = routeThroughOmniRoute
        ? `http://localhost:${getRuntimePorts().port}/v1`
        : resolveVisionBridgeBaseUrl(config.model);

      // When routing through the OmniRoute self-loop (non-standard provider),
      // keep the full provider-prefixed model ID so OmniRoute can resolve the
      // correct provider backend. Only strip the prefix for direct OpenAI calls.
      const useFullModelId =
        routeThroughOmniRoute ||
        (baseUrl.startsWith("http://localhost") &&
          config.model.includes("/") &&
          !config.model.startsWith("openai/"));
      const requestModel = useFullModelId ? config.model : modelName;

      // Build headers with optional recursion guard for self-loop calls.
      // When routing through OmniRoute's own API, omit the vision-bridge
      // guardrail on the sub-request to prevent infinite recursion.
      // Use a real DB-backed key for self-loop (sk_omniroute is rejected by
      // REQUIRE_API_KEY instances with 401 "Missing API key").
      const selfLoopApiKey = resolvedApiKey || (await resolveSelfLoopApiKey());
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        // Explicit JSON opt-in: without `Accept: application/json` OmniRoute's
        // self-loop defaults to SSE (resolveStreamFlag's legacy default) and the
        // describe call would receive a `data:` stream that response.json() can't
        // parse (`Unexpected token 'd'`), failing the whole vision-bridge
        // describe path. Pair with `stream: false` below.
        Accept: "application/json",
        Authorization: `Bearer ${selfLoopApiKey}`,
      };
      if (useFullModelId) {
        headers["x-omniroute-disabled-guardrails"] = routeThroughOmniRoute
          ? "vision-bridge,video-bridge"
          : "vision-bridge";
        // Internal self-loop sub-request: the parent request already holds the
        // single heavyweight admission lease (`CHAT_MAX_HEAVY_IN_FLIGHT=1`), so a
        // large base64-image describe body would be rejected with 503
        // `chat_admission_busy` before it is described. The route only honors
        // this header for trusted self-loop credentials (the local
        // `sk_omniroute` sentinel OR the operator-configured env key), so
        // external clients cannot use it to bypass admission.
        headers["x-omniroute-admission-bypass"] = "internal";
        // The compression pipeline must not touch the image payload of the
        // self-loop describe call (stacked RTK/Caveman can mangle data URIs).
        headers["x-omniroute-compression"] = "off";
        // The admission bypass honors the env key when set (REQUIRE_API_KEY=true
        // deployments) and the `sk_omniroute` sentinel otherwise. Force the same
        // resolved credential so the bypass holds even when a real vision key is
        // configured for the vision model's provider.
        headers["Authorization"] = `Bearer ${resolveSelfLoopBearer()}`;
      }

      response = await fetchImpl(`${baseUrl}/chat/completions`, {
        method: "POST",
        signal,
        headers,
        body: JSON.stringify({
          model: requestModel,
          stream: false,
          messages: [
            {
              role: "user",
              content: [
                {
                  // Global, not OpenCode-scoped: this is OmniRoute's own internal
                  // describe self-loop (VisionBridgeGuardrail), called for every
                  // caller/provider when the target model lacks vision support —
                  // there is no client-identity signal at this layer to gate on
                  // (unlike the OpenCode-only `isOpencodeClient` default in
                  // `chatCore/upstreamBody.ts`, which forwards the *caller's own*
                  // image_url.detail and is deliberately scoped). "high" is
                  // requested unconditionally because the describe prompt asks
                  // the vision model to transcribe visible text
                  // (`modalityBridgeVisionTaskAware`, see docs/security/GUARDRAILS.md)
                  // — low-detail sampling degrades OCR accuracy for every
                  // describe call, not just OpenCode-originated ones. This path
                  // only affects the OpenAI-compatible wire format branch; the
                  // Anthropic branch above has no `detail` concept and is
                  // unaffected (see the "unaffected for Anthropic" compat
                  // assertion in visionBridgeHelpers.callVisionModel.test.ts).
                  type: "image_url",
                  image_url: {
                    url: normalizedImageInput,
                    detail: "high",
                  },
                },
                { type: "text", text: config.prompt },
              ],
            },
          ],
          max_tokens: 300,
        }),
      });
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Vision API error ${response.status}: ${errorText}`);
    }

    const data = await readVisionResponseBody(response);

    if (isAnthropic) {
      // Anthropic response format: { content: [{ type: "text", text: "..." }] }
      const anthropicData = data as {
        content?: Array<{ type?: string; text?: string }>;
        error?: { message?: string };
      };

      if (anthropicData.error) {
        throw new Error(
          `Vision API error: ${anthropicData.error.message || JSON.stringify(anthropicData.error)}`
        );
      }

      const textContent = anthropicData.content?.find((c) => c.type === "text");
      const content = textContent?.text;
      if (!content || typeof content !== "string") {
        throw new Error("Vision API returned empty or invalid response");
      }

      return content.trim();
    } else {
      // OpenAI-compatible response format. Falls back to reasoning_content when
      // content is null — reasoning models (e.g. xiaomi/mimo-v2.5) can exhaust
      // max_tokens on chain-of-thought and return content: null with the full
      // analysis in reasoning_content.
      return extractOpenAICompatibleContent(data);
    }
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        config.signal?.aborted ? "Vision model call aborted" : "Vision model call timed out"
      );
    }

    throw error;
  }
}

export interface RequestBody {
  model?: string;
  messages?: RequestMessage[];
  input?: RequestMessage[];
  [key: string]: unknown;
}

export function replaceImageParts(
  body: RequestBody,
  // #4012: a `null` entry means the describe call failed for that image — keep
  // the original image part instead of dropping it / stubbing "(unavailable)".
  descriptions: (string | null)[]
): RequestBody {
  if (!descriptions || descriptions.length === 0) {
    return body;
  }

  const result = structuredClone(body) as RequestBody;

  const usesResponsesInput = !Array.isArray(result.messages) && Array.isArray(result.input);
  const requestMessages = Array.isArray(result.messages)
    ? result.messages
    : usesResponsesInput
      ? result.input
      : null;

  if (!requestMessages) {
    return result;
  }

  // Splice via the unified detector so nested images (image inside a
  // tool_result's content array, etc.) are replaced in the SAME order the
  // guardrail extracted them (extract↔replace contract). Nested hits carry
  // `path`, which the splice walks; top-level hits swap their content slot.
  // `input_image` (Responses API) is read through a widened type but MUST be
  // replaceable — extractImageParts allowlists it, and every extracted part
  // needs a matching splice here.
  const replacementTextType: "text" | "input_text" = usesResponsesInput ? "input_text" : "text";
  const mediaParts = detectMediaParts(requestMessages).filter(
    (p) => p.kind === "image" && REPLACEABLE_IMAGE_SHAPES.has(p.shape)
  );

  let descriptionIndex = 0;
  for (const part of mediaParts) {
    const description =
      descriptionIndex < descriptions.length ? descriptions[descriptionIndex++] : null;
    if (description == null) {
      // #4012: describe failed for this image — preserve the original image
      // so a vision-capable upstream can still process it.
      continue;
    }

    const message = requestMessages[part.messageIndex];
    if (!message || !Array.isArray(message.content)) continue;

    const path = part.path;
    if (!path || path.length === 0) {
      // Top-level part: swap the content slot itself with a text part.
      (message.content as unknown[])[part.partIndex] = {
        type: replacementTextType,
        text: description,
      };
    } else {
      // Nested hit: walk the container part to the media object and splice it.
      const container = message.content[part.partIndex] as Record<string, unknown>;
      replaceObjectAtPath(container, path, {
        type: replacementTextType,
        text: description,
      });
    }
  }

  return result;
}

function replaceObjectAtPath(
  container: Record<string, unknown>,
  path: (string | number)[],
  replacement: Record<string, unknown>
): void {
  let node: unknown = container;
  for (let i = 0; i < path.length - 1; i++) {
    const next = (node as Record<string, unknown> | null | undefined)?.[path[i] as string];
    if (next == null || typeof next !== "object") return;
    node = next;
  }
  (node as Record<string, unknown>)[path[path.length - 1] as string] = replacement;
}
