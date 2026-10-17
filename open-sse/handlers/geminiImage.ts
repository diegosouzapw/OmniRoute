import { randomUUID } from "crypto";
import { saveCallLog } from "@/lib/usageDb";
import { applyAntigravityClientProfileHeaders } from "../services/antigravityClientProfile.ts";
import { getAntigravityEnvelopeUserAgent } from "../services/antigravityIdentity.ts";
import { mapImageSize } from "../translator/image/sizeMapper.ts";
import { getImageModelEntry } from "../config/imageRegistry.ts";
import { saveImageErrorResult, sanitizeImageProviderError } from "./imageGeneration/shared.ts";
import { parseDataUrl, validateCodexImageEditReferences } from "@/lib/images/imageRouteModel";
import {
  FetchTimeoutError,
  fetchWithTimeout,
  getConfiguredTimeout,
} from "@/shared/utils/fetchTimeout";

function resolveReferences(body, referenceImages) {
  if (referenceImages !== undefined) return referenceImages;
  if (body.imageBytes !== undefined) return [{ bytes: body.imageBytes, mime: body.imageMime }];
  const candidates = [];
  for (const key of ["image", "image_url", "images", "image_urls", "imageUrls"]) {
    if (body[key] !== undefined)
      candidates.push(...(Array.isArray(body[key]) ? body[key] : [body[key]]));
  }
  return (Array.isArray(candidates) ? candidates : [candidates]).map((value) =>
    parseDataUrl(value && typeof value === "object" ? (value.image_url ?? value.url) : value)
  );
}

export function validateAntigravityReferences(images, hasMask = false): string | null {
  if (hasMask) return "Antigravity image editing does not support masks";
  if (
    !Array.isArray(images) ||
    images.some(
      (image) => !image || !Buffer.isBuffer(image.bytes) || typeof image.mime !== "string"
    )
  ) {
    return "Invalid Antigravity reference image; provide an inline PNG, JPEG, or WebP data URL";
  }
  return validateCodexImageEditReferences(images, 1)?.replace(/Codex/g, "Antigravity") ?? null;
}
const IMAGE_ASPECT_RATIO_PATTERN = /^\d+:\d+$/;
const IMAGE_SIZE_PATTERN = /^(?:1K|2K|4K)$/;
function normalizeImageAspectRatio(value: unknown, fallbackSize: unknown): string {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    if (IMAGE_ASPECT_RATIO_PATTERN.test(trimmedValue)) return trimmedValue;
  }
  return mapImageSize(typeof fallbackSize === "string" ? fallbackSize : null);
}

/**
 * Normalize the caller's `image_size` for Antigravity's `imageConfig.imageSize`.
 *
 * This is the output-resolution axis (`1K` | `2K` | `4K` — the values #11952 observed
 * Antigravity accepting; not a documented upstream enum), distinct from the `size`/`aspect_ratio`
 * axis handled by `normalizeImageAspectRatio`. Returns `value: undefined` when the caller sent
 * nothing usable (absent or non-string), so the key is left out and the upstream default
 * applies. A string outside that set is clamped to `1K` rather than forwarded because we have
 * not confirmed what upstream does with an unrecognised value; the clamp is reported through
 * `clamped: true` so the caller can warn and the call log can record the raw request next to
 * what was actually sent (omni-code-review LEDGER-6 / LEDGER-48 / LEDGER-57).
 */
function normalizeImageGenerationSize(value: unknown): {
  value: string | undefined;
  clamped: boolean;
} {
  if (typeof value !== "string") return { value: undefined, clamped: false };
  const normalized = value.trim().toUpperCase();
  if (IMAGE_SIZE_PATTERN.test(normalized)) return { value: normalized, clamped: false };
  return { value: "1K", clamped: true };
}
/**
 * Handle Gemini-format image generation (Antigravity / Nano Banana)
 * Uses Gemini's generateContent API with responseModalities: ["TEXT", "IMAGE"]
 */
export async function handleGeminiImageGeneration({
  model,
  providerConfig,
  body,
  credentials,
  log,
  referenceImages = undefined,
  signal = null,
  logPath = "/v1/images/generations",
}) {
  const startTime = Date.now();
  const references = resolveReferences(body, referenceImages);
  const validation = validateGeminiImageEdit(model, body, references, logPath);
  if (validation) return { success: false, status: 400, error: validation };
  const isEdit = references.length > 0 || logPath === "/v1/images/edits";
  const url = providerConfig.baseUrl;
  const provider = "antigravity";
  const { credentialRecord, token, projectId } = resolveGeminiImageCredentials(credentials);
  const { candidateCount, promptText, aspectRatio, imageSize, imageSizeClamped } =
    resolveGeminiImageDimensions(body);
  warnGeminiImageSize(log, model, imageSizeClamped);

  // Summarized request for call log. Both axes are recorded so the log never hides what the
  // client asked for: `image_size` is the raw caller value (null when absent) and
  // `image_size_applied` is what went upstream ("default" when the key was omitted).
  const logRequestBody = summarizeGeminiImageRequest(body, references, {
    promptText,
    aspectRatio,
    imageSize,
    candidateCount,
  });

  const accountError = geminiAccountError(
    token,
    projectId,
    model,
    startTime,
    logRequestBody,
    logPath
  );
  if (accountError) return accountError;

  const { antigravityBody, headers } = buildGeminiImageRequest({
    projectId,
    model,
    credentialRecord,
    token,
    references,
    promptText,
    candidateCount,
    aspectRatio,
    imageSize,
  });

  if (log) {
    log.info(
      "IMAGE",
      `antigravity/${model} (gemini) | references: ${references.length} | ${aspectRatio} ${imageSize ?? "default"}`
    );
  }

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers,
      body: JSON.stringify(antigravityBody),
      signal,
      timeoutMs: getConfiguredTimeout(),
    });

    return await finishGeminiImageResponse(response, {
      model,
      provider,
      logPath,
      log,
      startTime,
      logRequestBody,
      promptText,
      isEdit,
    });
  } catch (err) {
    return saveGeminiImageTransportFailure(err, {
      model,
      provider,
      logPath,
      log,
      startTime,
      logRequestBody,
      isEdit,
    });
  }
}

function validateGeminiImageEdit(model, body, references, logPath): string | null {
  const referenceError = validateAntigravityReferences(
    references,
    body.mask !== undefined || body.mask_url !== undefined
  );
  if (referenceError) return referenceError;
  const isEdit = references.length > 0 || logPath === "/v1/images/edits";
  if (isEdit && body.response_format !== undefined && body.response_format !== "b64_json")
    return "Antigravity image editing supports only b64_json response format";
  if (references.length > 0) {
    const entry = getImageModelEntry(`antigravity/${model}`);
    if (!entry || entry.provider !== "antigravity" || entry.model !== model)
      return "Unsupported Antigravity image edit model";
  }
  return null;
}

function resolveGeminiImageCredentials(credentials) {
  const credentialRecord = credentials || {};
  const token = credentialRecord.accessToken || credentialRecord.apiKey;
  const providerSpecificData = credentialRecord.providerSpecificData;
  const providerSpecificProjectId =
    providerSpecificData && typeof providerSpecificData === "object"
      ? (providerSpecificData as Record<string, unknown>).projectId
      : null;
  const credentialProjectId =
    typeof credentialRecord.projectId === "string" ? credentialRecord.projectId.trim() : "";
  const providerProjectId =
    typeof providerSpecificProjectId === "string" ? providerSpecificProjectId.trim() : "";
  const projectId = credentialProjectId || providerProjectId || null;
  return { credentialRecord, token, projectId };
}

function resolveGeminiImageDimensions(body) {
  const candidateCount =
    typeof body.n === "number" && Number.isFinite(body.n) && body.n > 0 ? Math.floor(body.n) : 1;
  const promptText = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const aspectRatio = normalizeImageAspectRatio(body.aspect_ratio, body.size);
  const { value: imageSize, clamped: imageSizeClamped } = normalizeImageGenerationSize(
    body.image_size
  );
  return { candidateCount, promptText, aspectRatio, imageSize, imageSizeClamped };
}

function warnGeminiImageSize(log, model, imageSizeClamped) {
  if (imageSizeClamped && log && typeof log.warn === "function")
    log.warn(
      "IMAGE",
      `antigravity/${model}: unsupported image_size — clamped to 1K (accepted: 1K|2K|4K)`
    );
}

function buildGeminiImageRequest({
  projectId,
  model,
  credentialRecord,
  token,
  references,
  promptText,
  candidateCount,
  aspectRatio,
  imageSize,
}) {
  const antigravityBody = {
    project: projectId,
    requestId: `image_gen/${Date.now()}/${randomUUID()}/0`,
    request: {
      contents: [
        {
          role: "user",
          parts: [
            { text: promptText },
            ...references.map((image) => ({
              inlineData: {
                mimeType: image.mime.trim().toLowerCase(),
                data: image.bytes.toString("base64"),
              },
            })),
          ],
        },
      ],
      generationConfig: {
        candidateCount,
        imageConfig: { aspectRatio, ...(imageSize ? { imageSize } : {}) },
      },
    },
    model,
    userAgent: getAntigravityEnvelopeUserAgent(credentialRecord),
    requestType: "image_gen",
  };
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  applyAntigravityClientProfileHeaders(headers, credentialRecord, antigravityBody);
  delete headers["x-goog-user-project"];
  return { antigravityBody, headers };
}

async function finishGeminiImageResponse(response: Response, context) {
  const { model, provider, logPath, startTime, logRequestBody, promptText, isEdit } = context;
  if (!response.ok) return saveGeminiImageResponseFailure(response, context);
  const data = await response.json();
  const images = extractGeminiImagePayload(data.response || data, promptText);
  if (images.length === 0)
    return {
      success: false,
      status: 502,
      error: "Antigravity completed without an image payload",
      ...(isEdit ? { retryable: false } : {}),
    };
  saveCallLog({
    method: "POST",
    path: logPath,
    status: 200,
    model: `antigravity/${model}`,
    provider,
    duration: Date.now() - startTime,
    tokens: { prompt_tokens: 0, completion_tokens: 0 },
    requestBody: logRequestBody,
    responseBody: { images_count: images.length },
  }).catch(() => {});
  return { success: true, data: { created: Math.floor(Date.now() / 1000), data: images } };
}

async function saveGeminiImageResponseFailure(response: Response, context) {
  const { model, provider, logPath, log, startTime, logRequestBody, isEdit } = context;
  const safeError = sanitizeImageProviderError(await response.text());
  if (log) log.error("IMAGE", `antigravity error ${response.status}`);
  saveCallLog({
    method: "POST",
    path: logPath,
    status: response.status,
    model: `antigravity/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: `Antigravity upstream error (${response.status})`,
    requestBody: logRequestBody,
  }).catch(() => {});
  return {
    success: false,
    status: response.status,
    error: safeError,
    ...(isEdit ? { retryable: false } : {}),
  };
}

function extractGeminiImagePayload(responseBody, promptText) {
  const images = [];
  const candidates = responseBody.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (typeof part.inlineData?.data === "string" && part.inlineData.data.length > 0) {
        images.push({
          b64_json: part.inlineData.data,
          revised_prompt: parts.find((p) => p.text)?.text || promptText,
        });
      }
    }
  }
  return images;
}

function summarizeGeminiImageRequest(
  body,
  references,
  { promptText, aspectRatio, imageSize, candidateCount }
) {
  return {
    model: body.model,
    prompt_chars: promptText.length,
    reference_images: references.map((image) => ({ mime: image.mime, bytes: image.bytes.length })),
    size: body.size || "default",
    aspect_ratio: aspectRatio,
    image_size: body.image_size ?? null,
    image_size_applied: imageSize ?? "default",
    n: candidateCount,
  };
}

function saveGeminiImageTransportFailure(err: unknown, context) {
  const { model, provider, logPath, log, startTime, logRequestBody, isEdit } = context;
  const status = err instanceof FetchTimeoutError ? 504 : 502;
  const message = "Antigravity image request failed";
  if (log) log.error("IMAGE", `antigravity fetch error (${status})`);
  saveCallLog({
    method: "POST",
    path: logPath,
    status,
    model: `antigravity/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: message,
    requestBody: logRequestBody,
  }).catch(() => {});
  return {
    success: false,
    status,
    error: `Image provider error: ${message}`,
    ...(isEdit ? { retryable: false } : {}),
  };
}

function geminiAccountError(token, projectId, model, startTime, requestBody, logPath) {
  if (!token) return { success: false, status: 401, error: "Missing Antigravity credentials" };
  if (!projectId || typeof projectId !== "string")
    return saveImageErrorResult({
      provider: "antigravity",
      model,
      status: 400,
      startTime,
      error:
        "Missing Google projectId for Antigravity account. Please reconnect OAuth in Providers so OmniRoute can fetch your Cloud Code project.",
      requestBody,
      path: logPath,
    });
  return null;
}
