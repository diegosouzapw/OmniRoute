import { randomUUID } from "crypto";
import { saveCallLog } from "@/lib/usageDb";
import {
  applyPollinationsAnonymousFallback,
  reportPollinationsAnonOutcome,
} from "../pollinationsAnonAuth.ts";
import { resolveImageBaseUrl, extractImageInputs, fetchImageEndpoint } from "../shared.ts";
import { buildXaiImageRequest } from "./xaiImage.ts";
const OPENAI_IMAGE_TO_IMAGE_MODELS = new Set([
  "black-forest-labs/FLUX.2-max",
  "black-forest-labs/FLUX.2-pro",
  "black-forest-labs/FLUX.2-flex",
  "black-forest-labs/FLUX.2-dev",
  "openai/gpt-image-1.5",
  "Wan-AI/Wan2.6-image",
  "Qwen/Qwen-Image-2.0-Pro",
  "Qwen/Qwen-Image-2.0",
  "google/flash-image-3.1",
  "google/gemini-3-pro-image",
  "flux-kontext-max",
  "flux-kontext",
  "flux-kontext-pro",
  "qwen-image",
]);
/**
 * Handle OpenAI-compatible image generation (standard providers + Nebius fallback)
 */
function buildAgnesImageRequestBody(model, body) {
  const upstreamBody: Record<string, unknown> = {
    model,
    prompt: body.prompt,
  };

  if (body.size !== undefined) upstreamBody.size = body.size;
  if (body.ratio !== undefined) {
    upstreamBody.ratio = body.ratio;
  } else if (body.aspect_ratio !== undefined) {
    upstreamBody.ratio = body.aspect_ratio;
  }
  if (body.return_base64 !== undefined) upstreamBody.return_base64 = body.return_base64;

  const explicitExtraBody =
    body.extra_body && typeof body.extra_body === "object" && !Array.isArray(body.extra_body)
      ? body.extra_body
      : {};
  const extraBody: Record<string, unknown> = { ...explicitExtraBody };
  const { imageUrls } = extractImageInputs(body);
  if (imageUrls.length > 0) extraBody.image = imageUrls;
  if (body.response_format !== undefined) extraBody.response_format = body.response_format;
  if (Object.keys(extraBody).length > 0) upstreamBody.extra_body = extraBody;

  return upstreamBody;
}

export async function handleOpenAIImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();

  const logRequestBody = summarizeOpenAIImageRequest(body);

  const request = prepareOpenAIImageRequest(model, providerConfig, body);
  if ("error" in request) return { success: false, status: 400, error: request.error };
  const upstreamBody = request.body;
  const token = credentials.apiKey || credentials.accessToken;
  let headers = buildOpenAIImageHeaders(token, providerConfig);

  // #8085 — keyless Pollinations image requests (the common free case) get
  // no Authorization header above. Mirror the chat executor's anonymous
  // fingerprint-pool fallback (open-sse/executors/pollinations.ts) so the
  // outbound request isn't sent bare and rejected by Pollinations' own 401.
  let pollinationsAnonSession: Awaited<
    ReturnType<typeof applyPollinationsAnonymousFallback>
  >["session"] = null;
  if (providerConfig.id === "pollinations") {
    const anon = await applyPollinationsAnonymousFallback(providerConfig.id, token, headers);
    headers = anon.headers;
    pollinationsAnonSession = anon.session;
  }

  if (log) {
    const promptPreview =
      typeof body.prompt === "string"
        ? body.prompt.slice(0, 60)
        : String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `${provider}/${model} | prompt: "${promptPreview}..." | size: ${body.size || "default"}`
    );
  }

  const requestBody = JSON.stringify(upstreamBody);

  // Try primary URL
  let result = await fetchImageEndpoint(
    providerConfig.baseUrl,
    headers,
    requestBody,
    provider,
    log
  );

  // Fallback for providers with fallbackUrl (e.g., Nebius)
  if (
    !result.success &&
    providerConfig.fallbackUrl &&
    [404, 410, 502, 503].includes(result.status)
  ) {
    if (log) {
      log.info("IMAGE", `${provider}: primary URL failed (${result.status}), trying fallback...`);
    }
    result = await fetchImageEndpoint(
      providerConfig.fallbackUrl,
      headers,
      requestBody,
      provider,
      log
    );
  }

  if (pollinationsAnonSession) {
    reportPollinationsAnonOutcome(pollinationsAnonSession, result.status);
  }

  // Save call log after result is determined
  saveOpenAIImageCallLog({
    path: "/v1/images/generations",
    result,
    provider,
    model,
    startTime,
    requestBody: logRequestBody,
  });

  return result;
}

/**
 * OpenAI-compatible image *edit* forwarder for custom providers (#3214 / #3215).
 *
 * Mirrors `handleOpenAIImageGeneration` but posts multipart/form-data to the node's
 * `/images/edits` endpoint and returns the upstream OpenAI-compatible response. Kept
 * separate from provider-specific hosted-tool flows. The fetch helper leaves Content-Type unset so
 * `fetch` derives the multipart boundary from the FormData body.
 */
export async function handleOpenAIImageEdit({
  model,
  provider,
  credentials,
  prompt,
  imageBytes,
  imageMime,
  size,
  responseFormat,
  n = 1,
  log,
}: {
  model: string;
  provider: string;
  credentials:
    | {
        apiKey?: string;
        accessToken?: string;
        baseUrl?: unknown;
        providerSpecificData?: { baseUrl?: unknown } | null;
      }
    | null
    | undefined;
  prompt: string;
  imageBytes: Buffer;
  imageMime?: string | null;
  size?: string | null;
  responseFormat?: string | null;
  n?: number;
  log?: { info: (tag: string, message: string) => void } | null;
}) {
  const startTime = Date.now();
  const url = resolveImageBaseUrl(
    credentials,
    `https://generativelanguage.googleapis.com/v1beta/openai/images/edits`,
    "edits"
  );

  const { boundary, multipartBody } = buildOpenAIImageEditBody({
    model,
    prompt,
    imageBytes,
    imageMime,
    size,
    responseFormat,
    n,
  });

  const headers: Record<string, string> = {
    "Content-Type": `multipart/form-data; boundary=${boundary}`,
  };
  const token = credentials?.apiKey || credentials?.accessToken;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  if (log) {
    log.info(
      "IMAGE",
      `${provider}/${model} (edit) | prompt: "${prompt.slice(0, 60)}..." -> ${url}`
    );
  }

  const result = await fetchImageEndpoint(
    url,
    headers,
    multipartBody as unknown as BodyInit,
    provider,
    log
  );

  saveOpenAIImageCallLog({
    path: "/v1/images/edits",
    result,
    provider,
    model,
    startTime,
    requestBody: { model, prompt: prompt.slice(0, 200), size: size || "default", n: n || 1 },
  });

  return result;
}

/**
 * Handle OpenRouter's unified Image API reference-image flow.
 *
 * OpenRouter does not expose `/images/edits`; image-to-image requests use
 * `POST /api/v1/images` with `input_references` containing data-URL images.
 * Keep this separate from the generic multipart `/images/edits` forwarder,
 * whose contract is used by custom OpenAI-compatible nodes (#10197).
 */
export async function handleOpenRouterImageEdit({
  model,
  provider,
  baseUrl,
  credentials,
  prompt,
  imageBytes,
  imageMime,
  size,
  n = 1,
  log,
}: {
  model: string;
  provider: string;
  baseUrl: string;
  credentials:
    | {
        apiKey?: string;
        accessToken?: string;
      }
    | null
    | undefined;
  prompt: string;
  imageBytes: Buffer;
  imageMime?: string | null;
  size?: string | null;
  n?: number;
  log?: { info: (tag: string, message: string) => void } | null;
}) {
  const startTime = Date.now();
  const url = resolveOpenRouterImageEditUrl(baseUrl);

  const mime = imageMime || "image/png";
  const upstreamBody: Record<string, unknown> = {
    model,
    prompt,
    input_references: [
      {
        type: "image_url",
        image_url: {
          url: `data:${mime};base64,${imageBytes.toString("base64")}`,
        },
      },
    ],
    n: n || 1,
  };
  if (size) upstreamBody.size = size;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = credentials?.apiKey || credentials?.accessToken;
  if (token) headers.Authorization = `Bearer ${token}`;

  log?.info(
    "IMAGE",
    `${provider}/${model} (reference edit) | prompt: "${prompt.slice(0, 60)}..." -> ${url}`
  );

  const result = await fetchImageEndpoint(
    url,
    headers,
    JSON.stringify(upstreamBody),
    provider,
    log
  );

  saveOpenAIImageCallLog({
    path: "/v1/images/edits",
    result,
    provider,
    model,
    startTime,
    requestBody: { model, prompt: prompt.slice(0, 200), size: size || "default", n: n || 1 },
  });

  return result;
}

function prepareOpenAIImageRequest(model, providerConfig, body) {
  // Build upstream request (OpenAI-compatible format)
  const upstreamBody: Record<string, unknown> =
    providerConfig.format === "agnes-image"
      ? buildAgnesImageRequestBody(model, body)
      : {
          model,
          prompt: body.prompt,
        };

  if (providerConfig.format === "xai-image") {
    const request = buildXaiImageRequest(model, body);
    if ("error" in request) return request;
    Object.assign(upstreamBody, request.body);
  } else if (providerConfig.format !== "agnes-image") {
    applyOpenAIImageOptions(model, body, upstreamBody);
  }

  return { body: upstreamBody };
}

function buildOpenAIImageHeaders(token, providerConfig) {
  // Build headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token && providerConfig.authHeader === "bearer") {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (token && providerConfig.authHeader === "x-api-key") {
    headers["x-api-key"] = token;
  }

  return headers;
}

function buildOpenAIImageEditBody({
  model,
  prompt,
  imageBytes,
  imageMime,
  size,
  responseFormat,
  n,
}) {
  // Build the multipart body as a Buffer with an explicit boundary instead of a global
  // `FormData`. In production `globalThis.fetch` is patched with node_modules/undici's fetch,
  // whose `FormData` class differs from `globalThis.FormData` — passing a native FormData
  // makes undici serialize it as the string "[object FormData]" (text/plain), dropping every
  // field (including `model`, which reaches the upstream empty). A Buffer body is accepted
  // verbatim by any fetch implementation. (#3273)
  const boundary = `----OmniRouteImageEdit${randomUUID().replace(/-/g, "")}`;
  const CRLF = "\r\n";
  const partBuffers: Buffer[] = [];
  const appendField = (name: string, value: string) => {
    partBuffers.push(
      Buffer.from(
        `--${boundary}${CRLF}Content-Disposition: form-data; name="${name}"${CRLF}${CRLF}${value}${CRLF}`
      )
    );
  };
  appendField("model", model);
  appendField("prompt", prompt);
  if (size) appendField("size", size);
  if (responseFormat) appendField("response_format", responseFormat);
  appendField("n", String(n || 1));
  partBuffers.push(
    Buffer.from(
      `--${boundary}${CRLF}Content-Disposition: form-data; name="image"; filename="image.png"${CRLF}` +
        `Content-Type: ${imageMime || "image/png"}${CRLF}${CRLF}`
    )
  );
  partBuffers.push(imageBytes);
  partBuffers.push(Buffer.from(`${CRLF}--${boundary}--${CRLF}`));
  const multipartBody = Buffer.concat(partBuffers);

  return { boundary, multipartBody };
}

function resolveOpenRouterImageEditUrl(baseUrl) {
  let url = baseUrl.trim();
  while (url.endsWith("/")) url = url.slice(0, -1);
  if (url.endsWith("/images/generations")) {
    url = url.slice(0, -"/images/generations".length) + "/images";
  } else if (!url.endsWith("/images")) {
    url += "/images";
  }

  return url;
}

function getOpenAIImageLogError(result) {
  return result.success
    ? null
    : typeof result.error === "string"
      ? result.error.slice(0, 500)
      : null;
}

function summarizeOpenAIImageRequest(body) {
  // Summarized request for call log
  return {
    model: body.model,
    prompt:
      typeof body.prompt === "string"
        ? body.prompt.slice(0, 200)
        : String(body.prompt ?? "").slice(0, 200),
    size: body.size || "default",
    n: body.n || 1,
    quality: body.quality || undefined,
  };
}

function saveOpenAIImageCallLog({ path, result, provider, model, startTime, requestBody }) {
  saveCallLog({
    method: "POST",
    path,
    status: result.status || (result.success ? 200 : 502),
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    tokens: { prompt_tokens: 0, completion_tokens: 0 },
    error: getOpenAIImageLogError(result),
    requestBody,
    responseBody: result.success ? { images_count: result.data?.data?.length || 0 } : null,
  }).catch(() => {});
}

function applyOpenAIImageOptions(model, body, upstreamBody) {
  // Pass optional parameters for ordinary OpenAI-compatible providers.
  if (body.n !== undefined) upstreamBody.n = body.n;
  if (body.size !== undefined) upstreamBody.size = body.size;
  if (body.quality !== undefined) upstreamBody.quality = body.quality;
  if (body.response_format !== undefined) upstreamBody.response_format = body.response_format;
  if (body.style !== undefined) upstreamBody.style = body.style;

  const { imageUrl } = extractImageInputs(body);
  if (imageUrl && OPENAI_IMAGE_TO_IMAGE_MODELS.has(model)) {
    upstreamBody.image_url = imageUrl;
  }
}
