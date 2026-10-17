import { getCodexClientVersion, getCodexUserAgent } from "../../../config/codexClient.ts";
import { isCodexFreePlan } from "../../../executors/codex/tools.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { normalizeImageBuffer } from "../../../utils/imageNormalize.ts";
import {
  parseJsonOrNull,
  sanitizeImageProviderError,
  saveImageSuccessResult,
  saveImageErrorResult,
} from "../shared.ts";
// #8307 — some ChatGPT accounts can run Codex but lack entitlement for the specific
// requested image model. Upstream signals this as a 400 with an exact, stable message
// (not a generic "invalid request"). Classify it so the caller can mark the failure
// `retryable: true`, which routes it through the same sibling-account fallback that
// already handles 401s (executeImageWithCredentialFallback, src/sse/services/imageCredentialRetry.ts).
export function isCodexChatGptModelAccessError(
  status: number,
  errorText: string,
  model: string
): boolean {
  if (status !== 400) return false;
  const parsed = parseJsonOrNull(errorText);
  let detail: string | null = null;
  if (typeof parsed === "string") {
    detail = parsed;
  } else if (parsed && typeof parsed === "object") {
    const obj = parsed as Record<string, unknown>;
    if (typeof obj.detail === "string") detail = obj.detail;
    else if (typeof obj.message === "string") detail = obj.message;
    else if (obj.error && typeof obj.error === "object") {
      const nested = (obj.error as Record<string, unknown>).message;
      if (typeof nested === "string") detail = nested;
    }
  }
  return (
    detail === `The '${model}' model is not supported when using Codex with a ChatGPT account.`
  );
}
/**
 * Codex image generation — translate GPT-Image-style /v1/images/generations
 * request into a /v1/responses call with the `image_generation` hosted tool,
 * parse the SSE stream, and return the base64 PNG in OpenAI image response shape.
 *
 * Requires ChatGPT OAuth credentials (Codex provider connection). The hosted
 * image_generation tool is only served upstream under ChatGPT auth; API-key
 * users will receive a 400 from OpenAI.
 */
export function extractImageGenerationCalls(
  sseText: string
): Array<{ b64: string; revisedPrompt: string | null }> {
  const results: Array<{ b64: string; revisedPrompt: string | null }> = [];
  const lines = String(sseText || "").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    let evt: Record<string, unknown>;
    try {
      evt = JSON.parse(payload) as Record<string, unknown>;
    } catch {
      continue;
    }
    const imageCall = parseCodexImageGenerationCall(evt);
    if (imageCall) results.push(imageCall);
  }
  return results;
}

// The image_generation hosted tool accepts { "auto" | "low" | "medium" | "high" }
// for `quality`. Legacy image clients often send "standard" / "hd". Map those values
// so OpenWebUI's quality dropdown doesn't silently get rejected upstream.
export function mapLegacyImageQualityToImageTool(value: string): string {
  const normalized = value.toLowerCase();
  if (normalized === "standard") return "medium";
  if (normalized === "hd") return "high";
  return normalized;
}

// Hosted Codex can reject large inline references with 503; dedicated Images keeps original bytes.
const CODEX_REFERENCE_MAX_BYTES = 400_000;
const CODEX_REFERENCE_MAX_LONG_EDGE = 1024;

export async function shrinkCodexReferenceImage(image: {
  bytes: Buffer;
  mime?: string;
}): Promise<{ bytes: Buffer; mime: string }> {
  const mime = image.mime || "image/png";
  if (image.bytes.length <= CODEX_REFERENCE_MAX_BYTES) return { bytes: image.bytes, mime };
  const out = await normalizeImageBuffer(image.bytes, {
    maxLongEdge: CODEX_REFERENCE_MAX_LONG_EDGE,
  });
  if (!out.resized) return { bytes: image.bytes, mime };
  return { bytes: out.buffer, mime: out.mime || mime };
}

export async function handleCodexImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  referenceImages = [],
  signal = null,
  logPath = "/v1/images/generations",
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  if (!prompt.trim()) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "Prompt is required for Codex image generation",
      path: logPath,
    });
  }

  const requestedCount =
    Number.isInteger(body.n) && (body.n as number) > 0 ? (body.n as number) : 1;
  if (log && requestedCount > 1) {
    log.warn(
      "IMAGE",
      `Codex hosted image_generation returns one image per call; requested n=${requestedCount} will fan out in parallel`
    );
  }

  const token = credentials?.accessToken || credentials?.apiKey;
  const credentialError = validateCodexImageCredentials({
    token,
    credentials,
    provider,
    model,
    startTime,
    logPath,
  });
  if (credentialError) return credentialError;

  const { upstreamBody, requestBodyForLog } = await prepareCodexImageRequest({
    model,
    body,
    prompt,
    referenceImages,
  });
  const headers = buildCodexImageHeaders(token, credentials);

  logCodexImagePrompt(log, provider, model, prompt, referenceImages);

  const fetchOneImage = () =>
    fetchCodexImage({
      providerConfig,
      headers,
      upstreamBody,
      signal,
      log,
      provider,
      model,
      startTime,
      requestBodyForLog,
      logPath,
    });

  const imageResults = await Promise.all(
    Array.from({ length: requestedCount }, () => fetchOneImage())
  );

  return finishCodexImageResults({
    imageResults,
    body,
    provider,
    model,
    startTime,
    requestBodyForLog,
    logPath,
  });
}

type CodexImageEditResult =
  | { success: true; data: { created: number; data: Array<Record<string, unknown>> } }
  | { success: false; status: number; error: unknown };

function logCodexImagePrompt(log, provider, model, prompt, referenceImages) {
  if (!log) return;
  const summary =
    referenceImages.length > 0 ? `${prompt.length} chars` : `"${prompt.slice(0, 60)}..."`;
  log.info("IMAGE", `${provider}/${model} (codex-responses) | prompt: ${summary}`);
}

/**
 * Run a stateless Codex reference-image edit through the native Responses hosted tool.
 * This deliberately reuses the text-to-image implementation so OAuth headers, SSE parsing,
 * response formatting, and error handling cannot drift between generations and edits.
 */
export async function handleCodexImageEdit({
  model,
  provider,
  providerConfig,
  body,
  referenceImages,
  credentials,
  log,
  signal = null,
}: {
  model: string;
  provider: string;
  providerConfig: unknown;
  body: Record<string, unknown>;
  referenceImages: Array<{ bytes: Buffer; mime: string }>;
  credentials: unknown;
  log: {
    info: (tag: string, message: string) => void;
    warn: (tag: string, message: string) => void;
    error: (tag: string, message: string) => void;
  } | null;
  signal?: AbortSignal | null;
}): Promise<CodexImageEditResult> {
  const result = await handleCodexImageGeneration({
    model,
    provider,
    providerConfig,
    body: { ...body, n: 1 },
    credentials,
    log,
    referenceImages,
    signal,
    logPath: "/v1/images/edits",
  });
  return result as CodexImageEditResult;
}

function parseCodexImageGenerationCall(evt: Record<string, unknown>) {
  if (evt?.type !== "response.output_item.done") return null;
  const item = evt.item as Record<string, unknown> | undefined;
  if (!item || item.type !== "image_generation_call") return null;
  const result = typeof item.result === "string" ? item.result : "";
  if (!result) return null;
  const revisedPrompt = typeof item.revised_prompt === "string" ? item.revised_prompt : null;
  return { b64: result, revisedPrompt };
}

function validateCodexImageCredentials({
  token,
  credentials,
  provider,
  model,
  startTime,
  logPath,
}) {
  if (!token) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "Codex credentials missing accessToken — reconnect the Codex provider",
      path: logPath,
    });
  }

  if (isCodexFreePlan(credentials?.providerSpecificData)) {
    return saveImageErrorResult({
      provider,
      model,
      status: 403,
      startTime,
      error: "Codex image_generation is unavailable on free-plan accounts",
      path: logPath,
      retryable: true,
    });
  }

  return null;
}

async function prepareCodexImageRequest({ model, body, prompt, referenceImages }) {
  // Hosted chat orchestration uses the backend's image engine; exact image engines
  // are dispatched separately by handleImageGeneration through codexImages.ts.
  const toolConfig: Record<string, unknown> = { type: "image_generation", output_format: "png" };
  if (referenceImages.length > 0) toolConfig.action = "edit";
  if (typeof body.size === "string" && body.size.trim()) {
    toolConfig.size = body.size.trim();
  }
  if (typeof body.quality === "string" && body.quality.trim()) {
    toolConfig.quality = mapLegacyImageQualityToImageTool(body.quality.trim());
  }

  if (typeof body.background === "string" && body.background.trim()) {
    toolConfig.background = body.background.trim();
  }

  const inputContent: Array<Record<string, unknown>> = [{ type: "input_text", text: prompt }];
  for (const image of referenceImages) {
    const reference = await shrinkCodexReferenceImage(image);
    inputContent.push({
      type: "input_image",
      image_url: `data:${reference.mime};base64,${reference.bytes.toString("base64")}`,
    });
  }

  const upstreamBody: Record<string, unknown> = {
    model,
    instructions:
      referenceImages.length > 0
        ? `You must call the image_generation tool exactly once to edit the supplied ${referenceImages.length === 1 ? "reference image" : "reference images"}. Treat all supplied images as references for the user's requested composition or style. Do not add narration.`
        : "You must call the image_generation tool exactly once to fulfill the user's request. Do not add narration.",
    input: [
      {
        role: "user",
        content: inputContent,
      },
    ],
    tools: [toolConfig],
    stream: true,
    store: false,
  };
  const requestBodyForLog =
    referenceImages.length > 0
      ? {
          model,
          prompt_chars: prompt.length,
          reference_images: referenceImages.map((image) => ({
            mime: image.mime || "image/png",
            bytes: image.bytes.length,
          })),
          tools: [toolConfig],
          stream: true,
          store: false,
        }
      : upstreamBody;

  return { upstreamBody, requestBodyForLog };
}

function buildCodexImageHeaders(token, credentials) {
  const workspaceId =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    !Array.isArray(credentials.providerSpecificData)
      ? (credentials.providerSpecificData as Record<string, unknown>).workspaceId
      : undefined;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
    Authorization: `Bearer ${token}`,
    Version: getCodexClientVersion(),
    "User-Agent": getCodexUserAgent(),
    originator: "codex_cli_rs",
  };
  if (typeof workspaceId === "string" && workspaceId) {
    headers["chatgpt-account-id"] = workspaceId;
    headers["session_id"] = workspaceId;
  }

  return headers;
}

async function fetchCodexImage({
  providerConfig,
  headers,
  upstreamBody,
  signal,
  log,
  provider,
  model,
  startTime,
  requestBodyForLog,
  logPath,
}) {
  let response: Response;
  try {
    response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(upstreamBody),
      signal,
    });
  } catch (err) {
    const message = sanitizeErrorMessage(err);
    if (log) log.error("IMAGE", `${provider} fetch error: ${message}`);
    return {
      ok: false as const,
      error: {
        provider,
        model,
        status: 502,
        startTime,
        error: `Image provider error: ${message}`,
        requestBody: requestBodyForLog,
        path: logPath,
      },
    };
  }

  if (!response.ok) {
    const errorText = await response.text();
    const safeError = sanitizeImageProviderError(errorText);
    const safeErrorLog =
      typeof safeError === "string" ? safeError : JSON.stringify(safeError ?? {});
    if (log) log.error("IMAGE", `${provider} error ${response.status}: ${safeErrorLog}`);
    const retryable = isCodexChatGptModelAccessError(response.status, errorText, model);
    return {
      ok: false as const,
      error: {
        provider,
        model,
        status: response.status,
        startTime,
        error: safeError,
        requestBody: requestBodyForLog,
        path: logPath,
        ...(retryable ? { retryable: true } : {}),
      },
    };
  }

  const rawSSE = await response.text();
  const items = extractImageGenerationCalls(rawSSE);
  if (items.length === 0) {
    return {
      ok: false as const,
      error: {
        provider,
        model,
        status: 502,
        startTime,
        error:
          "Codex completed without producing an image_generation_call — the model may have declined the tool",
        requestBody: requestBodyForLog,
        path: logPath,
      },
    };
  }

  return { ok: true as const, items };
}

function finishCodexImageResults({
  imageResults,
  body,
  provider,
  model,
  startTime,
  requestBodyForLog,
  logPath,
}) {
  const collected: Array<{ b64_json: string; revised_prompt?: string }> = [];
  for (const imageResult of imageResults) {
    if (!imageResult.ok) return saveImageErrorResult(imageResult.error);
    for (const item of imageResult.items) {
      collected.push({
        b64_json: item.b64,
        ...(item.revisedPrompt ? { revised_prompt: item.revisedPrompt } : {}),
      });
    }
  }

  // OpenAI returns b64_json for the gpt-image-* family and reserves `url` for
  // fetchable HTTPS links, so clients that omit response_format (Codex CLI's
  // built-in image_gen among them) expect the bytes in b64_json. Only emit the
  // data: URI when the caller explicitly asks for `url` (#12268).
  const wantsUrl = body.response_format === "url";
  const data = wantsUrl
    ? collected.map((item) => ({
        url: `data:image/png;base64,${item.b64_json}`,
        ...(item.revised_prompt ? { revised_prompt: item.revised_prompt } : {}),
      }))
    : collected;

  return saveImageSuccessResult({
    provider,
    model,
    startTime,
    requestBody: requestBodyForLog,
    responseBody: { images_count: data.length },
    images: data,
    path: logPath,
  });
}
