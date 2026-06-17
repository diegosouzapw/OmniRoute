import { randomUUID } from "crypto";

/**
 * Image Generation Handler
 *
 * Handles POST /v1/images/generations requests.
 * Proxies to upstream image generation providers using OpenAI-compatible format.
 *
 * Request format (OpenAI-compatible):
 * {
 *   "model": "openai/gpt-image-2",
 *   "prompt": "a beautiful sunset over mountains",
 *   "n": 1,
 *   "size": "1024x1024",
 *   "quality": "standard",       // optional: "standard" | "hd"
 *   "response_format": "url"     // optional: "url" | "b64_json"
 * }
 */

import { getImageProvider, parseImageModel } from "../../config/imageRegistry.ts";

import { mapImageSize } from "../../translator/image/sizeMapper.ts";

import { ChatGptWebExecutor } from "../../executors/chatgpt-web.ts";

import { getChatGptImage, findChatGptImageBySha256 } from "../../services/chatgptImageCache.ts";

import { createHash } from "node:crypto";

import { saveCallLog } from "@/lib/usageDb";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";

import { extractImageInputs, fetchImageEndpoint, resolveImageBaseUrl } from "./utils.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "./logging.ts";
import { extractMarkdownImageUrls, CHATGPT_WEB_IMAGE_ID_RE } from "./chatgptWeb.ts";



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
export async function handleOpenAIImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();

  // Summarized request for call log
  const logRequestBody = {
    model: body.model,
    prompt:
      typeof body.prompt === "string"
        ? body.prompt.slice(0, 200)
        : String(body.prompt ?? "").slice(0, 200),
    size: body.size || "default",
    n: body.n || 1,
    quality: body.quality || undefined,
  };

  // Build upstream request (OpenAI-compatible format)
  const upstreamBody: Record<string, unknown> = {
    model: model,
    prompt: body.prompt,
  };

  // Pass optional parameters
  if (body.n !== undefined) upstreamBody.n = body.n;
  if (body.size !== undefined) upstreamBody.size = body.size;
  if (body.quality !== undefined) upstreamBody.quality = body.quality;
  if (body.response_format !== undefined) upstreamBody.response_format = body.response_format;
  if (body.style !== undefined) upstreamBody.style = body.style;

  const { imageUrl } = extractImageInputs(body);
  if (imageUrl && OPENAI_IMAGE_TO_IMAGE_MODELS.has(model)) {
    upstreamBody.image_url = imageUrl;
  }

  // Build headers
  const headers = {
    "Content-Type": "application/json",
  };

  const token = credentials?.apiKey || credentials?.accessToken;
  if (providerConfig.authHeader === "bearer") {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (providerConfig.authHeader === "x-api-key") {
    headers["x-api-key"] = token;
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

  // Save call log after result is determined
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
    status: result.status || (result.success ? 200 : 502),
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    tokens: { prompt_tokens: 0, completion_tokens: 0 },
    error: result.success
      ? null
      : typeof result.error === "string"
        ? result.error.slice(0, 500)
        : null,
    requestBody: logRequestBody,
    responseBody: result.success ? { images_count: result.data?.data?.length || 0 } : null,
  }).catch(() => {});

  return result;
}



/**
 * OpenAI-compatible image *edit* forwarder for custom providers (#3214 / #3215).
 *
 * Mirrors `handleOpenAIImageGeneration` but posts multipart/form-data to the node's
 * `/images/edits` endpoint and returns the upstream OpenAI-compatible response. Kept
 * separate from the chatgpt-web edit flow, which continues a saved conversation node
 * rather than forwarding a stateless edit. The fetch helper leaves Content-Type unset so
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

  const headers: Record<string, string> = {
    "Content-Type": `multipart/form-data; boundary=${boundary}`,
  };
  const token = credentials?.apiKey || credentials?.accessToken;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  if (log) {
    log.info("IMAGE", `${provider}/${model} (edit) | prompt: "${prompt.slice(0, 60)}..." -> ${url}`);
  }

  const result = await fetchImageEndpoint(
    url,
    headers,
    multipartBody as unknown as BodyInit,
    provider,
    log
  );

  saveCallLog({
    method: "POST",
    path: "/v1/images/edits",
    status: result.status || (result.success ? 200 : 502),
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    tokens: { prompt_tokens: 0, completion_tokens: 0 },
    error: result.success
      ? null
      : typeof result.error === "string"
        ? result.error.slice(0, 500)
        : null,
    requestBody: { model, prompt: prompt.slice(0, 200), size: size || "default", n: n || 1 },
    responseBody: result.success ? { images_count: result.data?.data?.length || 0 } : null,
  }).catch(() => {});

  return result;
}



/**
 * Handle a multipart /v1/images/edits request for chatgpt-web. Open WebUI
 * uploads the prior image's bytes; we hash them and look up our cache.
 *
 * The hash match is reliable because Open WebUI's image-gen pipeline
 * downloads our /v1/chatgpt-web/image/<id> URL byte-for-byte and re-serves
 * those exact bytes through its own file store. When the user asks to edit
 * the image, OWUI uploads the same bytes back to us via multipart — same
 * hash, we find the conversation context, and drive the executor with a
 * synthetic chat thread that triggers continuation mode.
 *
 * No-match cases (cache evicted by TTL, or the user uploaded a foreign
 * image) get a clear 400. We can't actually edit an image we don't have a
 * conversation context for — chatgpt.com's image_gen tool needs the
 * original conversation node, and we don't have a path to upload bytes
 * directly.
 */
export async function handleImageEdit({
  provider,
  model,
  body,
  imageBytes,
  credentials,
  log,
  signal = null,
  clientHeaders = null,
}: {
  provider: string;
  model: string;
  body: Record<string, any>;
  imageBytes: Buffer;
  imageMime?: string; // accepted for symmetry with route layer; not used
  credentials: any;
  log: any;
  signal?: AbortSignal | null;
  clientHeaders?: Record<string, string> | null;
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "Prompt is required for image edit",
    });
  }

  if (!credentials?.apiKey) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "ChatGPT Web credentials missing session cookie",
    });
  }

  const imageHash = createHash("sha256").update(imageBytes).digest("hex");
  const cached = findChatGptImageBySha256(imageHash);

  const wantsBase64 = body.response_format === "b64_json";
  const requestBody = {
    model,
    prompt: prompt.slice(0, 500),
    size: body.size || undefined,
    image_hash: imageHash.slice(0, 16),
    image_bytes: imageBytes.length,
    cached_match: Boolean(cached?.entry.context),
  };

  if (!cached?.entry.context) {
    // chatgpt-web's image_gen tool can only edit an image when we continue
    // the original conversation node. If we never generated this image (or
    // its 30-minute TTL elapsed), there's no node to continue. Return a
    // clear, actionable error — much better than silently spawning an
    // unrelated image and confusing the user.
    log?.warn?.(
      "IMAGE",
      `chatgpt-web edit: no cached match for sha256=${imageHash.slice(0, 16)} (bytes=${imageBytes.length}); returning 400`
    );
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error:
        "chatgpt-web image edit only works for images recently generated through this OmniRoute instance " +
        "(cache window: 30 minutes). Re-generate the image and try the edit immediately, or disable image-edit " +
        "in your client to use plain chat-completion edit prompts instead.",
      requestBody,
    });
  }

  // Build a synthetic chat thread that surfaces the cached image URL on
  // the assistant turn. The executor's parseOpenAIMessages picks up the
  // URL, findCachedImageContext resolves it to {conversationId,
  // parentMessageId}, and looksLikeImageEditRequest fires on the user
  // prompt — together producing a continuation request that actually
  // edits the saved image.
  //
  // The synthetic user prompt is anchored with both an edit verb AND an
  // image-gen verb so the executor's heuristics fire regardless of what
  // wording the caller used ("now make it brighter", "tweak this", ...):
  //   - looksLikeImageEditRequest: matches "edit" + "image" within 120 chars
  //   - looksLikeImageGenRequest:  matches "generate" + "image" within 40 chars
  // Either match alone would set forImageGen, but covering both is cheap
  // insurance for prompts that don't fit common phrasings.
  const messages: Array<{ role: string; content: string }> = [
    {
      role: "assistant",
      // The base URL is irrelevant — only the path is parsed by
      // CACHED_IMAGE_URL_RE in the executor's findCachedImageContext.
      content: `![image](http://internal/v1/chatgpt-web/image/${cached.id})`,
    },
    {
      role: "user",
      content: `Edit the image and generate the new image: ${prompt}`,
    },
  ];

  const executor = new ChatGptWebExecutor();
  const result = await executor.execute({
    model,
    body: { messages },
    stream: false,
    credentials,
    signal,
    log,
    clientHeaders,
  });

  const responseText = await result.response.text();
  if (result.response.status >= 400) {
    return saveImageErrorResult({
      provider,
      model,
      status: result.response.status,
      startTime,
      error: responseText,
      requestBody,
    });
  }

  let content = "";
  try {
    const json = JSON.parse(responseText);
    content = String(json?.choices?.[0]?.message?.content || "");
  } catch {
    content = responseText;
  }

  const urls = extractMarkdownImageUrls(content);
  if (urls.length === 0) {
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: `ChatGPT Web edit completed without returning image markdown: ${content.slice(0, 300)}`,
      requestBody,
    });
  }

  const images: Array<{ url?: string; b64_json?: string }> = [];
  for (const url of urls) {
    if (!wantsBase64) {
      images.push({ url });
      continue;
    }
    const id = url.match(CHATGPT_WEB_IMAGE_ID_RE)?.[1];
    const cachedNew = id ? getChatGptImage(id) : null;
    if (!cachedNew) {
      return saveImageErrorResult({
        provider,
        model,
        status: 502,
        startTime,
        error: "ChatGPT Web image bytes expired before b64_json conversion",
        requestBody,
      });
    }
    images.push({ b64_json: cachedNew.bytes.toString("base64") });
  }

  return saveImageSuccessResult({
    provider,
    model,
    startTime,
    requestBody,
    responseBody: { images_count: images.length, edit_match: Boolean(cached?.entry.context) },
    images,
  });
}

