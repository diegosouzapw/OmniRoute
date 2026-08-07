/**
 * Vision Bridge helper functions for image processing.
 */
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { resolveSelfLoopBearer } from "@/shared/middleware/chatBodyAdmission";
import { getBestVisionModel, getFallbackModels, recordLatency } from "./visionBridgeRouter";
/**
 * Provider to environment variable mapping for API key resolution.
 */
const PROVIDER_API_KEY_MAP: Record<string, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  google: "GOOGLE_API_KEY",
  openai: "OPENAI_API_KEY",
};

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
}

export interface RequestMessage {
  role?: string;
  content?: string | RequestContentPart[];
}

export type RequestContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string; detail?: string } }
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
export function extractImageParts(messages: RequestMessage[]): ImagePart[] {
  const results: ImagePart[] = [];

  if (!Array.isArray(messages)) {
    return results;
  }

  for (let msgIdx = 0; msgIdx < messages.length; msgIdx++) {
    const message = messages[msgIdx];
    if (!message || !Array.isArray(message.content)) {
      continue;
    }

    for (let partIdx = 0; partIdx < message.content.length; partIdx++) {
      const part = message.content[partIdx];

      if (part?.type === "image_url" && part.image_url?.url) {
        results.push({
          messageIndex: msgIdx,
          partIndex: partIdx,
          imageUrl: part.image_url.url,
          imageType: "image_url",
        });
      } else if (part?.type === "image" && part.source?.type === "base64") {
        const { media_type, data } = part.source;
        const dataUri = `data:${media_type};base64,${data}`;
        results.push({
          messageIndex: msgIdx,
          partIndex: partIdx,
          imageUrl: dataUri,
          imageType: "image",
        });
      } else if (part?.type === "image" && part.source?.type === "url") {
        const url = part.source.url;
        if (url) {
          results.push({
            messageIndex: msgIdx,
            partIndex: partIdx,
            imageUrl: url,
            imageType: "url",
          });
        }
      }
    }
  }

  return results;
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

async function fetchRemoteImageAsDataUri(imageUrl: string, signal: AbortSignal): Promise<string> {
  const remoteImage = await fetchRemoteImage(imageUrl, { signal });
  const mediaType = remoteImage.contentType.split(";")[0]?.trim() || "image/png";
  return `data:${mediaType};base64,${remoteImage.buffer.toString("base64")}`;
}

async function normalizeVisionImageInput(
  imageInput: string,
  isAnthropic: boolean,
  signal: AbortSignal
): Promise<string> {
  const normalizedImage = resolveImageAsDataUri(imageInput);

  if (
    isAnthropic &&
    (normalizedImage.startsWith("http://") || normalizedImage.startsWith("https://"))
  ) {
    return fetchRemoteImageAsDataUri(normalizedImage, signal);
  }

  return normalizedImage;
}

export interface VisionModelConfig {
  model: string;
  prompt: string;
  timeoutMs: number;
  maxImages: number;
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
  routerConfig?: Partial<import("./visionBridgeRouter").VisionBridgeRouterConfig>
): Promise<string> {
  // Auto-select the best vision model
  const modelToUse = await getBestVisionModel({
    fixedModel: config.model,
    ...routerConfig,
  });
  // (#8430) When no vision-capable provider has usable credentials on this
  // instance, surface a clear error instead of attempting a describe call that
  // would fail with an opaque auth/serde error upstream.
  if (!modelToUse) {
    throw new Error("No vision-capable provider connected, cannot process image request");
  }
  let lastError: Error | null = null;

  // Try primary model + fallbacks
  const modelsToTry = [modelToUse, ...(await getFallbackModels(modelToUse, routerConfig))];
  const maxAttempts = Math.min(modelsToTry.length, routerConfig?.maxFallbackAttempts ?? 3);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const currentModel = modelsToTry[attempt];
    const attemptStart = Date.now();
    try {
      const result = await callVisionModelSingle(
        imageDataUri,
        { ...config, model: currentModel },
        apiKey
      );
      recordLatency(currentModel, Date.now() - attemptStart, true);
      return result;
    } catch (error) {
      recordLatency(currentModel, Date.now() - attemptStart, false);
      lastError = error instanceof Error ? error : new Error(String(error));
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

    // Some providers put a full message (not a delta) in the final chunk.
    const message = choice?.message as Record<string, unknown> | undefined;
    if (typeof message?.content === "string" && message.content.length > 0) {
      contentParts.push(message.content);
    }
    if (typeof message?.reasoning_content === "string" && message.reasoning_content.length > 0) {
      reasoningParts.push(message.reasoning_content);
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
 * Falls back to `reasoning_content` when `content` is empty — reasoning models
 * (e.g. xiaomi/mimo-v2.5) can exhaust `max_tokens` on chain-of-thought and
 * return `content: null` with a complete analysis in `reasoning_content`.
 */
function extractOpenAICompatibleContent(data: unknown): string {
  const record = data as {
    choices?: Array<{ message?: { content?: unknown; reasoning_content?: unknown } }>;
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
    typeof message?.reasoning_content === "string" ? message.reasoning_content.trim() : "";
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

  // Resolve API key based on provider
  const resolvedApiKey = resolveProviderApiKey(config.model, apiKey);

  // Detect provider from model identifier
  const isAnthropic = config.model.startsWith("anthropic/");

  try {
    // Extract model name from provider/model format
    const modelName = config.model.includes("/") ? config.model.split("/")[1] : config.model;
    const normalizedImageInput = await normalizeVisionImageInput(
      imageDataUri,
      isAnthropic,
      controller.signal
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

      response = await fetch(`${anthropicBaseUrl}/v1/messages`, {
        method: "POST",
        signal: controller.signal,
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
      const baseUrl = resolveVisionBridgeBaseUrl(config.model);

      // When routing through the OmniRoute self-loop (non-standard provider),
      // keep the full provider-prefixed model ID so OmniRoute can resolve the
      // correct provider backend. Only strip the prefix for direct OpenAI calls.
      const useFullModelId =
        baseUrl.startsWith("http://localhost") &&
        config.model.includes("/") &&
        !config.model.startsWith("openai/");
      const requestModel = useFullModelId ? config.model : modelName;

      // Build headers with optional recursion guard for self-loop calls.
      // When routing through OmniRoute's own API, omit the vision-bridge
      // guardrail on the sub-request to prevent infinite recursion.
      // Use sk_omniroute as fallback for self-loop if no API key is resolved.
      const selfLoopApiKey = resolvedApiKey || "sk_omniroute";
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
        headers["x-omniroute-disabled-guardrails"] = "vision-bridge";
        // Internal self-loop sub-request: the parent request already holds the
        // single heavyweight admission lease (`CHAT_MAX_HEAVY_IN_FLIGHT=1`), so a
        // large base64-image describe body would be rejected with 503
        // `chat_admission_busy` before it is described. The route only honors
        // this header for trusted self-loop credentials (the local
        // `sk_omniroute` sentinel OR the operator-configured env key), so
        // external clients cannot use it to bypass admission.
        headers["x-omniroute-admission-bypass"] = "internal";
        // The admission bypass honors the env key when set (REQUIRE_API_KEY=true
        // deployments) and the `sk_omniroute` sentinel otherwise. Force the same
        // resolved credential so the bypass holds even when a real vision key is
        // configured for the vision model's provider.
        headers["Authorization"] = `Bearer ${resolveSelfLoopBearer()}`;
      }

      response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        signal: controller.signal,
        headers,
        body: JSON.stringify({
          model: requestModel,
          stream: false,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: normalizedImageInput,
                    detail: "low",
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
      throw new Error("Vision model call timed out");
    }

    throw error;
  }
}

export interface RequestBody {
  model?: string;
  messages?: RequestMessage[];
  [key: string]: unknown;
}

/**
 * Replace image content parts with text descriptions.
 * Concatenates descriptions with labels: "[Image 1]: ..."
 */
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

  if (!Array.isArray(result.messages)) {
    return result;
  }

  let descriptionIndex = 0;

  for (let msgIdx = 0; msgIdx < result.messages.length; msgIdx++) {
    const message = result.messages[msgIdx];
    if (!message || !Array.isArray(message.content)) {
      continue;
    }

    const newContent: RequestContentPart[] = [];

    for (const part of message.content) {
      if (part?.type === "image_url" || part?.type === "image") {
        if (descriptionIndex < descriptions.length) {
          const description = descriptions[descriptionIndex];
          descriptionIndex++;
          if (description == null) {
            // #4012: describe failed for this image — preserve the original
            // image so a vision-capable upstream can still process it.
            newContent.push(part as RequestContentPart);
          } else {
            newContent.push({ type: "text", text: description });
          }
        }
      } else {
        newContent.push(part as RequestContentPart);
      }
    }

    message.content = newContent;
  }

  return result;
}
