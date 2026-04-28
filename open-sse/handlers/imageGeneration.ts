import { randomUUID } from "crypto";
/**
 * Image Generation Handler
 *
 * Handles POST /v1/images/generations requests.
 * Proxies to upstream image generation providers using OpenAI-compatible format.
 *
 * Request format (OpenAI-compatible):
 * {
 *   "model": "openai/dall-e-3",
 *   "prompt": "a beautiful sunset over mountains",
 *   "n": 1,
 *   "size": "1024x1024",
 *   "quality": "standard",       // optional: "standard" | "hd"
 *   "response_format": "url"     // optional: "url" | "b64_json"
 * }
 */

import { getImageProvider, parseImageModel } from "../config/imageRegistry.ts";
import { mapImageSize } from "../translator/image/sizeMapper.ts";
import { getCodexClientVersion, getCodexUserAgent } from "../config/codexClient.ts";
import { ChatGptWebExecutor } from "../executors/chatgpt-web.ts";
import { getChatGptImage, findChatGptImageBySha256 } from "../services/chatgptImageCache.ts";
import { createHash } from "node:crypto";
import { saveCallLog } from "@/lib/usageDb";
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../utils/comfyuiClient.ts";
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";

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
]);

const BFL_MODEL_ENDPOINTS = {
  "flux-2-max": "/v1/flux-2-max",
  "flux-2-pro": "/v1/flux-2-pro",
  "flux-2-flex": "/v1/flux-2-flex",
  "flux-2-klein-9b": "/v1/flux-2-klein-9b",
  "flux-2-klein-4b": "/v1/flux-2-klein-4b",
  "flux-kontext-pro": "/v1/flux-kontext-pro",
  "flux-kontext-max": "/v1/flux-kontext-max",
  "flux-pro-1.1": "/v1/flux-pro-1.1",
  "flux-pro-1.1-ultra": "/v1/flux-pro-1.1-ultra",
  "flux-dev": "/v1/flux-dev",
  "flux-pro": "/v1/flux-pro",
};

const BFL_EDIT_MODELS = new Set([
  "flux-2-max",
  "flux-2-pro",
  "flux-2-flex",
  "flux-kontext-pro",
  "flux-kontext-max",
]);

const BFL_FAILURE_STATUSES = new Set(["Error", "Failed", "Content Moderated", "Request Moderated"]);

const STABILITY_GENERATION_ENDPOINTS = {
  "sd3.5-large": "/v2beta/stable-image/generate/sd3",
  "sd3.5-large-turbo": "/v2beta/stable-image/generate/sd3",
  "sd3.5-medium": "/v2beta/stable-image/generate/sd3",
  "sd3.5-flash": "/v2beta/stable-image/generate/sd3",
  "stable-image-ultra": "/v2beta/stable-image/generate/ultra",
  "stable-image-core": "/v2beta/stable-image/generate/core",
};

const STABILITY_EDIT_ENDPOINTS = {
  inpaint: "/v2beta/stable-image/edit/inpaint",
  outpaint: "/v2beta/stable-image/edit/outpaint",
  erase: "/v2beta/stable-image/edit/erase",
  "search-and-replace": "/v2beta/stable-image/edit/search-and-replace",
  "search-and-recolor": "/v2beta/stable-image/edit/search-and-recolor",
  "remove-background": "/v2beta/stable-image/edit/remove-background",
  "replace-background-and-relight": "/v2beta/stable-image/edit/replace-background-and-relight",
  fast: "/v2beta/stable-image/upscale/fast",
  conservative: "/v2beta/stable-image/upscale/conservative",
  creative: "/v2beta/stable-image/upscale/creative",
  sketch: "/v2beta/stable-image/control/sketch",
  structure: "/v2beta/stable-image/control/structure",
  style: "/v2beta/stable-image/control/style",
  "style-transfer": "/v2beta/stable-image/control/style-transfer",
};

const STABILITY_CONTROL_MODELS = new Set(["sketch", "structure", "style", "style-transfer"]);

function appendOptionalFormValue(formData, key, value) {
  if (value === undefined || value === null || value === "") return;
  formData.append(key, String(value));
}

function appendImageFormValue(formData, key, source, filename) {
  formData.append(
    key,
    new Blob([source.buffer], {
      type: source.contentType || "application/octet-stream",
    }),
    filename
  );
}

const FAL_PRESET_SIZES = {
  "1024x1024": "square_hd",
  "512x512": "square",
  "1792x1024": "landscape_16_9",
  "1024x1792": "portrait_16_9",
  "1024x768": "landscape_4_3",
  "768x1024": "portrait_4_3",
  "1536x1024": "landscape_3_2",
  "1024x1536": "portrait_3_2",
  "576x1024": "portrait_16_9",
  "1024x576": "landscape_16_9",
};

/**
 * Handle image generation request
 * @param {object} options
 * @param {object} options.body - Request body
 * @param {object} options.credentials - Provider credentials { apiKey, accessToken }
 * @param {object} options.log - Logger
 * @param {string} [options.resolvedProvider] - Pre-resolved provider ID (from route layer custom model resolution)
 */
export async function handleImageGeneration({
  body,
  credentials,
  log,
  resolvedProvider = null,
  signal = null,
  clientHeaders = null,
}) {
  let provider, model;

  if (resolvedProvider) {
    // Provider was already resolved by the route layer (custom model from DB)
    // Extract model name from the full "provider/model" string
    provider = resolvedProvider;
    const modelStr = body.model || "";
    model = modelStr.startsWith(provider + "/") ? modelStr.slice(provider.length + 1) : modelStr;
  } else {
    // Standard path: resolve from built-in image registry
    const parsed = parseImageModel(body.model);
    provider = parsed.provider;
    model = parsed.model;
  }

  if (!provider) {
    return {
      success: false,
      status: 400,
      error: `Invalid image model: ${body.model}. Use format: provider/model`,
    };
  }

  const providerConfig = getImageProvider(provider);

  // For custom models without a built-in provider config, use OpenAI-compatible handler
  // with a synthetic config based on the provider's credentials
  if (!providerConfig) {
    if (!resolvedProvider) {
      return {
        success: false,
        status: 400,
        error: `Unknown image provider: ${provider}`,
      };
    }

    // Custom model: use OpenAI-compatible format with provider's base URL
    // The credentials were already resolved by the route layer
    if (log) {
      log.info("IMAGE", `Custom model ${provider}/${model} — using OpenAI-compatible handler`);
    }

    const syntheticConfig = {
      id: provider,
      baseUrl:
        credentials?.baseUrl ||
        `https://generativelanguage.googleapis.com/v1beta/openai/images/generations`,
      authType: "apikey",
      authHeader: "bearer",
      format: "openai",
    };

    return handleOpenAIImageGeneration({
      model,
      provider,
      providerConfig: syntheticConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "gemini-image") {
    return handleGeminiImageGeneration({ model, providerConfig, body, credentials, log });
  }

  if (providerConfig.format === "imagen3") {
    return handleImagen3ImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "hyperbolic") {
    return handleHyperbolicImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "fal-ai") {
    return handleFalAIImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "stability-ai") {
    return handleStabilityAIImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "black-forest-labs") {
    return handleBlackForestLabsImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "recraft") {
    return handleRecraftImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "topaz") {
    return handleTopazImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "chatgpt-web") {
    return handleChatGptWebImageGeneration({
      model,
      provider,
      body,
      credentials,
      log,
      signal,
      clientHeaders,
    });
  }

  if (providerConfig.format === "nanobanana") {
    return handleNanoBananaImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "sdwebui") {
    return handleSDWebUIImageGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "comfyui") {
    return handleComfyUIImageGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "codex-responses") {
    return handleCodexImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  return handleOpenAIImageGeneration({ model, provider, providerConfig, body, credentials, log });
}

/**
 * Handle Gemini-format image generation (Antigravity / Nano Banana)
 * Uses Gemini's generateContent API with responseModalities: ["TEXT", "IMAGE"]
 */
async function handleGeminiImageGeneration({ model, providerConfig, body, credentials, log }) {
  const startTime = Date.now();
  const url = `${providerConfig.baseUrl}/${model}:generateContent`;
  const provider = "antigravity";

  // Summarized request for call log
  const logRequestBody = {
    model: body.model,
    prompt:
      typeof body.prompt === "string"
        ? body.prompt.slice(0, 200)
        : String(body.prompt ?? "").slice(0, 200),
    size: body.size || "default",
    n: body.n || 1,
  };

  const geminiBody = {
    contents: [
      {
        parts: [{ text: body.prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  };

  const token = credentials.accessToken || credentials.apiKey;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (log) {
    const promptPreview =
      typeof body.prompt === "string"
        ? body.prompt.slice(0, 60)
        : String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `antigravity/${model} (gemini) | prompt: "${promptPreview}..." | format: gemini-image`
    );
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(geminiBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log) {
        log.error("IMAGE", `antigravity error ${response.status}: ${errorText.slice(0, 200)}`);
      }

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `antigravity/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
        requestBody: logRequestBody,
      }).catch(() => {});

      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();

    // Extract image data from Gemini response
    const images = [];
    const candidates = data.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          images.push({
            b64_json: part.inlineData.data,
            revised_prompt: parts.find((p) => p.text)?.text || body.prompt,
          });
        }
      }
    }

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `antigravity/${model}`,
      provider,
      duration: Date.now() - startTime,
      tokens: { prompt_tokens: 0, completion_tokens: 0 },
      requestBody: logRequestBody,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: images,
      },
    };
  } catch (err) {
    if (log) {
      log.error("IMAGE", `antigravity fetch error: ${err.message}`);
    }

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `antigravity/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
      requestBody: logRequestBody,
    }).catch(() => {});

    return { success: false, status: 502, error: `Image provider error: ${err.message}` };
  }
}

/**
 * Handle OpenAI-compatible image generation (standard providers + Nebius fallback)
 */
async function handleOpenAIImageGeneration({
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

  const token = credentials.apiKey || credentials.accessToken;
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

const CHATGPT_WEB_IMAGE_MARKDOWN_RE = /!\[[^\]]*\]\(([^)\s]+)\)/g;
const CHATGPT_WEB_IMAGE_ID_RE = /\/v1\/chatgpt-web\/image\/([a-f0-9]{16,64})(?=[?\s"'<>)]|$)/i;

function extractMarkdownImageUrls(text: string): string[] {
  const urls: string[] = [];
  // String.prototype.matchAll consumes a fresh iterator and ignores the
  // regex's lastIndex, so no manual reset is required.
  for (const match of text.matchAll(CHATGPT_WEB_IMAGE_MARKDOWN_RE)) {
    if (match[1]) urls.push(match[1]);
  }
  return urls;
}

function buildChatGptWebImagePrompt(body): string {
  const prompt = String(body.prompt || "").trim();
  const details: string[] = [`Create an image for this prompt: ${prompt}`];
  if (typeof body.size === "string" && body.size.trim()) {
    details.push(`Requested size: ${body.size.trim()}.`);
  }
  if (typeof body.quality === "string" && body.quality.trim()) {
    details.push(`Requested quality: ${body.quality.trim()}.`);
  }
  if (typeof body.style === "string" && body.style.trim()) {
    details.push(`Requested style: ${body.style.trim()}.`);
  }
  return details.join("\n");
}

async function handleChatGptWebImageGeneration({
  model,
  provider,
  body,
  credentials,
  log,
  signal,
  clientHeaders,
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "Prompt is required for ChatGPT Web image generation",
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

  // Each image is one chatgpt.com chat turn (~30s). Cap at 4 (matches OpenAI's
  // own limit for image-1 / dall-e-3) so a stray n=1000 doesn't pin the
  // executor for hours before the upstream HTTP timeout fires.
  const CHATGPT_WEB_IMAGE_N_MAX = 4;
  const rawCount = Number.isInteger(body.n) && (body.n as number) > 0 ? (body.n as number) : 1;
  if (rawCount > CHATGPT_WEB_IMAGE_N_MAX) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: `ChatGPT Web image generation supports n=1..${CHATGPT_WEB_IMAGE_N_MAX} (got ${rawCount}); each n is a separate ~30s chat turn.`,
    });
  }
  const requestedCount = rawCount;
  if (log && requestedCount > 1) {
    log.warn(
      "IMAGE",
      `ChatGPT Web returns one image per chat turn; requested n=${requestedCount} will run sequentially`
    );
  }

  const wantsBase64 = body.response_format === "b64_json";
  const images: Array<{ url?: string; b64_json?: string }> = [];
  const requestBody = {
    model,
    prompt: prompt.slice(0, 500),
    size: body.size || undefined,
    quality: body.quality || undefined,
  };

  for (let i = 0; i < requestedCount; i++) {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model,
      body: {
        messages: [{ role: "user", content: buildChatGptWebImagePrompt(body) }],
      },
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
        error: `ChatGPT Web completed without returning image markdown: ${content.slice(0, 300)}`,
        requestBody,
      });
    }

    for (const url of urls) {
      if (!wantsBase64) {
        images.push({ url });
        continue;
      }
      const id = url.match(CHATGPT_WEB_IMAGE_ID_RE)?.[1];
      const cached = id ? getChatGptImage(id) : null;
      if (!cached) {
        return saveImageErrorResult({
          provider,
          model,
          status: 502,
          startTime,
          error: "ChatGPT Web image bytes expired before b64_json conversion",
          requestBody,
        });
      }
      images.push({ b64_json: cached.bytes.toString("base64") });
    }
  }

  return saveImageSuccessResult({
    provider,
    model,
    startTime,
    requestBody,
    responseBody: { images_count: images.length },
    images,
  });
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

async function handleFalAIImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const { imageUrl, imageUrls } = extractImageInputs(body);
  const upstreamBody: Record<string, unknown> = {
    prompt: body.prompt,
    sync_mode: body.sync_mode ?? true,
  };

  if (body.n !== undefined) upstreamBody.num_images = Number(body.n) || 1;
  if (body.negative_prompt) upstreamBody.negative_prompt = body.negative_prompt;
  if (body.seed !== undefined) upstreamBody.seed = body.seed;
  if (body.style) upstreamBody.style = normalizeRecraftStyle(body.style);

  const outputFormat = normalizeRequestedImageFormat(body, "png");
  if (outputFormat) upstreamBody.output_format = outputFormat;

  if (model.includes("flux-pro/v1.1") && !model.includes("ultra")) {
    upstreamBody.image_size = mapFalImageSize(body.size, "landscape_4_3");
  } else if (
    model.includes("bytedance/") ||
    model.includes("stable-diffusion") ||
    model.includes("ideogram") ||
    model.includes("recraft/v3")
  ) {
    upstreamBody.image_size = mapFalImageSize(body.size, "square_hd");
  } else {
    upstreamBody.aspect_ratio = body.aspect_ratio || mapFalAspectRatio(body.size, "1:1");
  }

  if (body.quality === "hd" && model.includes("ultra")) {
    upstreamBody.raw = true;
  }

  if (imageUrl && model.includes("flux-pro/v1.1-ultra")) {
    upstreamBody.image_url = imageUrl;
  }

  if (imageUrls.length > 0 && model.includes("ideogram")) {
    upstreamBody.image_urls = imageUrls;
  }

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (fal-ai) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      return saveImageErrorResult({
        provider,
        model,
        status: response.status,
        startTime,
        error: errorText,
        requestBody: upstreamBody,
      });
    }

    const payload = await response.json();
    const images = await normalizeProviderImagePayload(payload, body, log);
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: upstreamBody,
      responseBody: { images_count: images.length },
      created: payload.created,
      images,
    });
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: `Image provider error: ${err.message}`,
    });
  }
}

async function handleStabilityAIImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const endpoint = STABILITY_GENERATION_ENDPOINTS[model] || STABILITY_EDIT_ENDPOINTS[model];

  if (!endpoint) {
    return {
      success: false,
      status: 400,
      error: `Unsupported Stability AI image model: ${model}`,
    };
  }

  const { imageUrl, maskUrl } = extractImageInputs(body);
  const upstreamBody: Record<string, unknown> = {
    output_format:
      model === "remove-background"
        ? normalizeRequestedImageFormat(body, "png", ["png", "webp"])
        : normalizeRequestedImageFormat(body, "png"),
  };
  const formData = new FormData();

  appendOptionalFormValue(formData, "output_format", upstreamBody.output_format);
  if (body.prompt) {
    upstreamBody.prompt = body.prompt;
    appendOptionalFormValue(formData, "prompt", body.prompt);
  }
  if (body.negative_prompt) {
    upstreamBody.negative_prompt = body.negative_prompt;
    appendOptionalFormValue(formData, "negative_prompt", body.negative_prompt);
  }
  if (body.seed !== undefined) {
    upstreamBody.seed = body.seed;
    appendOptionalFormValue(formData, "seed", body.seed);
  }

  try {
    if (STABILITY_GENERATION_ENDPOINTS[model]) {
      if (model.startsWith("sd3.5")) {
        upstreamBody.model = model;
        appendOptionalFormValue(formData, "model", model);
      }

      if (imageUrl) {
        const imageSource = await resolveImageSource(imageUrl);
        upstreamBody.mode = "image-to-image";
        appendOptionalFormValue(formData, "mode", "image-to-image");
        upstreamBody.image = imageSource.base64;
        appendImageFormValue(formData, "image", imageSource, "image");
        if (body.strength !== undefined) {
          upstreamBody.strength = body.strength;
          appendOptionalFormValue(formData, "strength", body.strength);
        }
      } else {
        upstreamBody.mode = "text-to-image";
        appendOptionalFormValue(formData, "mode", "text-to-image");
      }

      if (!model.startsWith("sd3.5") || !imageUrl) {
        const aspectRatio = body.aspect_ratio || mapImageSize(body.size);
        upstreamBody.aspect_ratio = aspectRatio;
        appendOptionalFormValue(formData, "aspect_ratio", aspectRatio);
      }

      if (body.style_preset) {
        upstreamBody.style_preset = body.style_preset;
        appendOptionalFormValue(formData, "style_preset", body.style_preset);
      }
    } else {
      if (imageUrl) {
        const imageSource = await resolveImageSource(imageUrl);
        upstreamBody.image = imageSource.base64;
        appendImageFormValue(formData, "image", imageSource, "image");
      }

      if (maskUrl && shouldIncludeStabilityMask(model)) {
        const maskSource = await resolveImageSource(maskUrl);
        upstreamBody.mask = maskSource.base64;
        appendImageFormValue(formData, "mask", maskSource, "mask");
      }

      if (body.search_prompt) {
        upstreamBody.search_prompt = body.search_prompt;
        appendOptionalFormValue(formData, "search_prompt", body.search_prompt);
      }
      if (body.grow_mask !== undefined) {
        upstreamBody.grow_mask = body.grow_mask;
        appendOptionalFormValue(formData, "grow_mask", body.grow_mask);
      }
      if (body.control_strength !== undefined) {
        upstreamBody.control_strength = body.control_strength;
        appendOptionalFormValue(formData, "control_strength", body.control_strength);
      }
      if (body.creativity !== undefined) {
        upstreamBody.creativity = body.creativity;
        appendOptionalFormValue(formData, "creativity", body.creativity);
      }
      if (body.left !== undefined) {
        upstreamBody.left = body.left;
        appendOptionalFormValue(formData, "left", body.left);
      }
      if (body.right !== undefined) {
        upstreamBody.right = body.right;
        appendOptionalFormValue(formData, "right", body.right);
      }
      if (body.up !== undefined) {
        upstreamBody.up = body.up;
        appendOptionalFormValue(formData, "up", body.up);
      }
      if (body.down !== undefined) {
        upstreamBody.down = body.down;
        appendOptionalFormValue(formData, "down", body.down);
      }
      if (body.style_preset) {
        upstreamBody.style_preset = body.style_preset;
        appendOptionalFormValue(formData, "style_preset", body.style_preset);
      }

      if (STABILITY_CONTROL_MODELS.has(model) && !upstreamBody.prompt) {
        upstreamBody.prompt = body.prompt || "";
        appendOptionalFormValue(formData, "prompt", body.prompt || "");
      }
    }

    if (log) {
      const promptPreview = String(body.prompt ?? "").slice(0, 60);
      log.info("IMAGE", `${provider}/${model} (stability-ai) | prompt: "${promptPreview}..."`);
    }

    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      return saveImageErrorResult({
        provider,
        model,
        status: response.status,
        startTime,
        error: errorText,
        requestBody: upstreamBody,
      });
    }

    const contentType = response.headers.get("content-type") || "";
    let payload;
    if (contentType.includes("application/json")) {
      payload = await response.json();
    } else {
      const buffer = Buffer.from(await response.arrayBuffer());
      payload = { image: buffer.toString("base64") };
    }

    const images = await normalizeProviderImagePayload(payload, body, log);
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: upstreamBody,
      responseBody: { images_count: images.length },
      created: payload.created,
      images,
    });
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: `Image provider error: ${err.message}`,
    });
  }
}

async function handleBlackForestLabsImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const endpoint = BFL_MODEL_ENDPOINTS[model];

  if (!endpoint) {
    return {
      success: false,
      status: 400,
      error: `Unsupported Black Forest Labs image model: ${model}`,
    };
  }

  const { imageUrl, maskUrl } = extractImageInputs(body);
  const upstreamBody: Record<string, unknown> = {
    prompt: body.prompt,
    output_format: normalizeRequestedImageFormat(body, "png"),
  };

  try {
    if (BFL_EDIT_MODELS.has(model) && imageUrl) {
      upstreamBody.input_image = (await resolveImageSource(imageUrl)).base64;
    } else if (imageUrl && isHttpUrl(imageUrl)) {
      upstreamBody.image_url = imageUrl;
    }

    if (maskUrl && (model === "flux-pro-1.0-fill" || model === "flux-kontext-pro")) {
      upstreamBody.mask = (await resolveImageSource(maskUrl)).base64;
    }

    if (model === "flux-kontext-pro" || model === "flux-kontext-max") {
      upstreamBody.aspect_ratio = body.aspect_ratio || mapImageSize(body.size);
    } else if (typeof body.size === "string" && body.size.includes("x")) {
      const { width, height } = parseSizeToDimensions(body.size, 1024);
      upstreamBody.width = width;
      upstreamBody.height = height;
    }

    if (body.seed !== undefined) upstreamBody.seed = body.seed;
    if (body.n !== undefined && model.includes("ultra"))
      upstreamBody.num_images = Number(body.n) || 1;
    if (body.quality === "hd" && model.includes("ultra")) upstreamBody.raw = true;
    if (body.left !== undefined) upstreamBody.left = body.left;
    if (body.right !== undefined) upstreamBody.right = body.right;
    if (body.top !== undefined) upstreamBody.top = body.top;
    if (body.bottom !== undefined) upstreamBody.bottom = body.bottom;
    if (body.steps !== undefined) upstreamBody.steps = body.steps;
    if (body.guidance !== undefined) upstreamBody.guidance = body.guidance;
    if (body.grow_mask !== undefined) upstreamBody.grow_mask = body.grow_mask;
    if (body.safety_tolerance !== undefined) upstreamBody.safety_tolerance = body.safety_tolerance;

    if (log) {
      const promptPreview = String(body.prompt ?? "").slice(0, 60);
      log.info("IMAGE", `${provider}/${model} (black-forest-labs) | prompt: "${promptPreview}..."`);
    }

    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-key": token,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      return saveImageErrorResult({
        provider,
        model,
        status: response.status,
        startTime,
        error: errorText,
        requestBody: upstreamBody,
      });
    }

    const initialPayload = await response.json();
    const finalPayload = initialPayload.polling_url
      ? await pollBlackForestLabsResult({
          pollingUrl: initialPayload.polling_url,
          token,
          body,
          log,
        })
      : initialPayload;

    const images = await normalizeProviderImagePayload(finalPayload, body, log);
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: upstreamBody,
      responseBody: { images_count: images.length },
      created: finalPayload.created,
      images,
    });
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: `Image provider error: ${err.message}`,
    });
  }
}

async function handleRecraftImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const upstreamBody: Record<string, unknown> = {
    model,
    prompt: body.prompt,
  };

  if (body.n !== undefined) upstreamBody.n = body.n;
  if (body.size !== undefined) upstreamBody.size = body.size;
  if (body.response_format !== undefined) upstreamBody.response_format = body.response_format;
  if (body.style !== undefined) upstreamBody.style = body.style;

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (recraft) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(
      `${providerConfig.baseUrl.replace(/\/$/, "")}/v1/images/generations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(upstreamBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      return saveImageErrorResult({
        provider,
        model,
        status: response.status,
        startTime,
        error: errorText,
        requestBody: upstreamBody,
      });
    }

    const payload = await response.json();
    const images = await normalizeProviderImagePayload(payload, body, log);
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: upstreamBody,
      responseBody: { images_count: images.length },
      created: payload.created,
      images,
    });
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: `Image provider error: ${err.message}`,
    });
  }
}

async function handleTopazImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const { imageUrl } = extractImageInputs(body);

  if (!imageUrl) {
    return {
      success: false,
      status: 400,
      error: `Topaz model ${model} requires an input image`,
    };
  }

  try {
    const imageSource = await resolveImageSource(imageUrl);
    const formData = new FormData();
    const blob = new Blob([imageSource.buffer], { type: imageSource.contentType || "image/png" });
    formData.append("image", blob, "image.png");

    if (typeof body.size === "string" && body.size.includes("x")) {
      const { width, height } = parseSizeToDimensions(body.size, 1024);
      formData.append("output_width", String(width));
      formData.append("output_height", String(height));
    }

    if (log) {
      const promptPreview = String(body.prompt ?? "enhance image").slice(0, 60);
      log.info("IMAGE", `${provider}/${model} (topaz) | prompt: "${promptPreview}..."`);
    }

    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}/image/v1/enhance`, {
      method: "POST",
      headers: {
        Accept: "image/jpeg",
        "X-API-Key": token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      return saveImageErrorResult({
        provider,
        model,
        status: response.status,
        startTime,
        error: errorText,
      });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = Buffer.from(await response.arrayBuffer());
    const base64 = buffer.toString("base64");
    const wantsBase64 = body.response_format === "b64_json";
    const images = [
      wantsBase64
        ? { b64_json: base64, revised_prompt: body.prompt }
        : { url: `data:${contentType};base64,${base64}`, revised_prompt: body.prompt },
    ];

    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      responseBody: { images_count: images.length },
      images,
    });
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: `Image provider error: ${err.message}`,
    });
  }
}

async function pollBlackForestLabsResult({ pollingUrl, token, body, log }) {
  const timeoutMs = normalizePositiveNumber(body.timeout_ms, 300000);
  const pollIntervalMs = normalizePositiveNumber(body.poll_interval_ms, 1500);
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const response = await fetch(pollingUrl, {
      method: "GET",
      headers: {
        "x-key": token,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`BFL polling failed (${response.status}): ${errorText}`);
    }

    const payload = await response.json();
    const status = payload?.status;

    if (status === "Ready") {
      return payload;
    }

    if (BFL_FAILURE_STATUSES.has(status)) {
      throw new Error(`BFL image generation failed: ${status}`);
    }

    if (log) {
      log.info("IMAGE", `black-forest-labs polling status: ${String(status || "Pending")}`);
    }

    await sleep(pollIntervalMs);
  }

  throw new Error(`BFL polling timed out after ${timeoutMs}ms`);
}

function extractImageInputs(body) {
  const imageUrls = [];
  const seen = new Set();

  const pushCandidate = (candidate) => {
    if (typeof candidate !== "string") return;
    const trimmed = candidate.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    imageUrls.push(trimmed);
  };

  pushCandidate(body?.image_url);
  pushCandidate(body?.image);

  if (Array.isArray(body?.imageUrls)) {
    for (const candidate of body.imageUrls) pushCandidate(candidate);
  }

  if (Array.isArray(body?.image_urls)) {
    for (const candidate of body.image_urls) pushCandidate(candidate);
  }

  if (Array.isArray(body?.messages)) {
    for (const msg of body.messages) {
      if (!Array.isArray(msg?.content)) continue;
      for (const part of msg.content) {
        if (part?.type === "image_url") {
          pushCandidate(part?.image_url?.url);
        }
      }
    }
  }

  return {
    imageUrl: imageUrls[0] || null,
    imageUrls,
    maskUrl:
      typeof body?.mask_url === "string"
        ? body.mask_url
        : typeof body?.mask === "string"
          ? body.mask
          : null,
  };
}

async function resolveImageSource(source) {
  if (typeof source !== "string" || source.trim().length === 0) {
    throw new Error("Invalid image source");
  }

  const trimmed = source.trim();
  const dataUriMatch = /^data:([^;]+);base64,(.+)$/i.exec(trimmed);
  if (dataUriMatch) {
    const [, contentType, base64] = dataUriMatch;
    return {
      buffer: Buffer.from(base64, "base64"),
      base64,
      contentType,
    };
  }

  if (isHttpUrl(trimmed)) {
    const remoteImage = await fetchRemoteImage(trimmed);
    return {
      buffer: remoteImage.buffer,
      base64: remoteImage.buffer.toString("base64"),
      contentType: remoteImage.contentType,
    };
  }

  return {
    buffer: Buffer.from(trimmed, "base64"),
    base64: trimmed,
    contentType: "application/octet-stream",
  };
}

function parseSizeToDimensions(size, fallback = 1024) {
  if (typeof size !== "string" || !size.includes("x")) {
    return { width: fallback, height: fallback };
  }

  const [widthRaw, heightRaw] = size.split("x");
  const width = Number(widthRaw);
  const height = Number(heightRaw);
  return {
    width: Number.isFinite(width) && width > 0 ? width : fallback,
    height: Number.isFinite(height) && height > 0 ? height : fallback,
  };
}

function normalizeRequestedImageFormat(
  body,
  fallback = "png",
  allowedFormats = ["jpeg", "png", "webp"]
) {
  const formatCandidate =
    typeof body?.output_format === "string"
      ? body.output_format.toLowerCase()
      : typeof body?.response_format === "string" &&
          !["url", "b64_json"].includes(body.response_format.toLowerCase())
        ? body.response_format.toLowerCase()
        : fallback;

  if (allowedFormats.includes(formatCandidate)) {
    return formatCandidate;
  }

  return fallback;
}

function mapFalImageSize(size, fallback = "square_hd") {
  if (typeof size !== "string") return fallback;
  if (FAL_PRESET_SIZES[size]) return FAL_PRESET_SIZES[size];
  if (size.includes("x")) {
    const { width, height } = parseSizeToDimensions(size, 1024);
    return { width, height };
  }
  return fallback;
}

function mapFalAspectRatio(size, fallback = "1:1") {
  if (!size) return fallback;
  return mapImageSize(size);
}

function normalizeRecraftStyle(style) {
  if (style === "vivid") return "digital_illustration";
  if (style === "natural") return "realistic_image";
  return style;
}

function shouldIncludeStabilityMask(model) {
  return new Set([
    "inpaint",
    "erase",
    "search-and-replace",
    "search-and-recolor",
    "replace-background-and-relight",
  ]).has(model);
}

async function normalizeProviderImagePayload(payload, body, log) {
  const candidates = [];

  const pushCandidate = (value) => {
    if (value === undefined || value === null) return;
    candidates.push(value);
  };

  if (Array.isArray(payload?.data)) {
    for (const item of payload.data) pushCandidate(item);
  }

  if (Array.isArray(payload?.images)) {
    for (const item of payload.images) pushCandidate(item);
  }

  if (payload?.image) pushCandidate({ b64_json: payload.image });
  if (payload?.url) pushCandidate({ url: payload.url });
  if (payload?.sample) pushCandidate({ url: payload.sample });
  if (payload?.result?.sample) pushCandidate({ url: payload.result.sample });
  if (Array.isArray(payload?.result?.images)) {
    for (const item of payload.result.images) pushCandidate(item);
  }

  const normalized = [];
  for (const candidate of candidates) {
    const item = await normalizeProviderImageCandidate(candidate, body);
    if (item) normalized.push(item);
  }

  if (normalized.length === 0 && log) {
    log.warn(
      "IMAGE",
      `Provider returned no recognizable image payload: ${JSON.stringify(payload).slice(0, 240)}`
    );
  }

  return normalized;
}

async function normalizeProviderImageCandidate(candidate, body) {
  const wantsBase64 = body?.response_format === "b64_json";
  let url = null;
  let b64 = null;

  if (typeof candidate === "string") {
    const dataUriMatch = /^data:[^;]+;base64,(.+)$/i.exec(candidate);
    if (dataUriMatch) {
      b64 = dataUriMatch[1];
    } else if (isHttpUrl(candidate)) {
      url = candidate;
    } else {
      b64 = candidate;
    }
  } else if (candidate && typeof candidate === "object") {
    url =
      firstString(candidate.url, candidate.image_url, candidate.sample, candidate.file_url) || null;
    b64 =
      firstString(candidate.b64_json, candidate.image, candidate.base64, candidate.data) || null;
  }

  if (wantsBase64 && !b64 && url) {
    b64 = (await resolveImageSource(url)).base64;
  }

  if (url && !wantsBase64) {
    return { url, revised_prompt: body?.prompt };
  }

  if (b64) {
    return { b64_json: b64, revised_prompt: body?.prompt };
  }

  if (url) {
    return { url, revised_prompt: body?.prompt };
  }

  return null;
}

function firstString(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}

function isHttpUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

/**
 * Codex image generation — translate DALL-E-style /v1/images/generations
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
    if (evt?.type !== "response.output_item.done") continue;
    const item = evt.item as Record<string, unknown> | undefined;
    if (!item || item.type !== "image_generation_call") continue;
    const result = typeof item.result === "string" ? item.result : "";
    if (!result) continue;
    const revisedPrompt = typeof item.revised_prompt === "string" ? item.revised_prompt : null;
    results.push({ b64: result, revisedPrompt });
  }
  return results;
}

// The image_generation hosted tool accepts { "auto" | "low" | "medium" | "high" }
// for `quality`. DALL-E clients often send "standard" / "hd". Map legacy values
// so OpenWebUI's quality dropdown doesn't silently get rejected upstream.
function mapDalleQualityToImageTool(value: string): string {
  const normalized = value.toLowerCase();
  if (normalized === "standard") return "medium";
  if (normalized === "hd") return "high";
  return normalized;
}

async function handleCodexImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
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
    });
  }

  const requestedCount =
    Number.isInteger(body.n) && (body.n as number) > 0 ? (body.n as number) : 1;
  if (log && requestedCount > 1) {
    log.warn(
      "IMAGE",
      `Codex hosted image_generation returns one image per call; requested n=${requestedCount} will run sequentially`
    );
  }

  const token = credentials?.accessToken || credentials?.apiKey;
  if (!token) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "Codex credentials missing accessToken — reconnect the Codex provider",
    });
  }

  const workspaceId =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    !Array.isArray(credentials.providerSpecificData)
      ? (credentials.providerSpecificData as Record<string, unknown>).workspaceId
      : undefined;

  // Forward size/quality from the DALL-E-style body into the hosted tool so
  // OpenWebUI's size/quality selectors actually take effect. Everything else
  // (model, n, background, moderation, output_compression) is left to the
  // Codex backend's defaults — today that's `gpt-image-2`.
  const toolConfig: Record<string, unknown> = { type: "image_generation", output_format: "png" };
  if (typeof body.size === "string" && body.size.trim()) {
    toolConfig.size = body.size.trim();
  }
  if (typeof body.quality === "string" && body.quality.trim()) {
    toolConfig.quality = mapDalleQualityToImageTool(body.quality.trim());
  }

  const upstreamBody: Record<string, unknown> = {
    model,
    instructions:
      "You must call the image_generation tool exactly once to fulfill the user's request. Do not add narration.",
    input: [
      {
        role: "user",
        content: [{ type: "input_text", text: prompt }],
      },
    ],
    tools: [toolConfig],
    stream: true,
    store: false,
  };

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

  if (log) {
    log.info(
      "IMAGE",
      `${provider}/${model} (codex-responses) | prompt: "${prompt.slice(0, 60)}..."`
    );
  }

  const collected: Array<{ b64_json: string; revised_prompt?: string }> = [];
  for (let i = 0; i < requestedCount; i++) {
    let response: Response;
    try {
      response = await fetch(providerConfig.baseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(upstreamBody),
      });
    } catch (err) {
      if (log) log.error("IMAGE", `${provider} fetch error: ${(err as Error).message}`);
      return saveImageErrorResult({
        provider,
        model,
        status: 502,
        startTime,
        error: `Image provider error: ${(err as Error).message}`,
        requestBody: upstreamBody,
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      return saveImageErrorResult({
        provider,
        model,
        status: response.status,
        startTime,
        error: errorText,
        requestBody: upstreamBody,
      });
    }

    const rawSSE = await response.text();
    const items = extractImageGenerationCalls(rawSSE);
    if (items.length === 0) {
      return saveImageErrorResult({
        provider,
        model,
        status: 502,
        startTime,
        error:
          "Codex completed without producing an image_generation_call — the model may have declined the tool",
        requestBody: upstreamBody,
      });
    }
    for (const item of items) {
      collected.push({
        b64_json: item.b64,
        ...(item.revisedPrompt ? { revised_prompt: item.revisedPrompt } : {}),
      });
    }
  }

  const wantsUrl = body.response_format !== "b64_json";
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
    requestBody: upstreamBody,
    responseBody: { images_count: data.length },
    images: data,
  });
}

function saveImageSuccessResult({
  provider,
  model,
  startTime,
  requestBody = null,
  responseBody = null,
  created = null,
  images,
}) {
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
    status: 200,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    requestBody,
    responseBody,
  }).catch(() => {});

  return {
    success: true,
    data: {
      created: created || Math.floor(Date.now() / 1000),
      data: images,
    },
  };
}

function saveImageErrorResult({ provider, model, status, startTime, error, requestBody = null }) {
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
    status,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: typeof error === "string" ? error.slice(0, 500) : String(error).slice(0, 500),
    requestBody,
  }).catch(() => {});

  return {
    success: false,
    status,
    error,
  };
}

/**
 * Fetch a single image endpoint and normalize response
 */
async function fetchImageEndpoint(url, headers, body, provider, log) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log) {
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      }
      return {
        success: false,
        status: response.status,
        error: errorText,
      };
    }

    const data = await response.json();

    // Normalize response to OpenAI format
    return {
      success: true,
      data: {
        created: data.created || Math.floor(Date.now() / 1000),
        data: data.data || [],
      },
    };
  } catch (err) {
    if (log) {
      log.error("IMAGE", `${provider} fetch error: ${err.message}`);
    }
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${err.message}`,
    };
  }
}

/**
 * Handle Hyperbolic image generation
 * Uses { model_name, prompt, height, width } and returns { images: [{ image: base64 }] }
 */
async function handleHyperbolicImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;

  const [width, height] = (body.size || "1024x1024").split("x").map(Number);

  const upstreamBody = {
    model_name: model,
    prompt: body.prompt,
    height: height || 1024,
    width: width || 1024,
    backend: "auto",
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (hyperbolic) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});

      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    // Transform { images: [{ image: base64 }] } → OpenAI format
    const images = (data.images || []).map((img) => ({
      b64_json: img.image,
      revised_prompt: body.prompt,
    }));

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Image provider error: ${err.message}` };
  }
}

/**
 * Handle NanoBanana image generation
 * NanoBanana is async (submit task -> poll status -> return final image URL/base64)
 */
async function handleNanoBananaImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;

  // Route to pro URL for "nanobanana-pro" model
  const isPro = model === "nanobanana-pro";
  const submitUrl = isPro && providerConfig.proUrl ? providerConfig.proUrl : providerConfig.baseUrl;
  const statusUrl = providerConfig.statusUrl;

  const aspectRatio =
    typeof body.aspectRatio === "string"
      ? body.aspectRatio
      : typeof body.aspect_ratio === "string"
        ? body.aspect_ratio
        : mapImageSize(body.size);

  let resolution =
    typeof body.resolution === "string"
      ? body.resolution
      : inferResolutionFromSize(body.size) || "1K";
  if (body.quality === "hd" && resolution === "1K") {
    resolution = "2K";
  }

  const upstreamBody = isPro
    ? {
        prompt: body.prompt,
        resolution,
        aspectRatio,
        ...(Array.isArray(body.imageUrls) ? { imageUrls: body.imageUrls } : {}),
      }
    : {
        prompt: body.prompt,
        type:
          Array.isArray(body.imageUrls) && body.imageUrls.length > 0
            ? "IMAGETOIAMGE"
            : "TEXTTOIAMGE",
        numImages: Number.isFinite(body.n) ? Math.max(1, Number(body.n)) : 1,
        image_size: aspectRatio,
        ...(Array.isArray(body.imageUrls) ? { imageUrls: body.imageUrls } : {}),
      };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `${provider}/${model} (nanobanana ${isPro ? "pro" : "flash"}) | prompt: "${promptPreview}..."`
    );
  }

  try {
    const submitResp = await fetch(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!submitResp.ok) {
      const errorText = await submitResp.text();
      if (log) {
        log.error(
          "IMAGE",
          `${provider} submit error ${submitResp.status}: ${errorText.slice(0, 200)}`
        );
      }

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: submitResp.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});

      return { success: false, status: submitResp.status, error: errorText };
    }

    const submitData = await submitResp.json();

    // Backward compatibility: handle providers returning image payload synchronously
    const hasSyncPayload =
      Boolean(submitData?.image) ||
      Array.isArray(submitData?.images) ||
      Array.isArray(submitData?.data) ||
      Boolean(submitData?.data?.[0]?.url) ||
      Boolean(submitData?.data?.[0]?.b64_json);

    if (hasSyncPayload) {
      const syncResult = normalizeNanoBananaSyncPayload(submitData, body.prompt);
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 200,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        responseBody: { images_count: syncResult.data?.length || 0, mode: "sync" },
      }).catch(() => {});
      return {
        success: true,
        data: { created: Math.floor(Date.now() / 1000), data: syncResult.data },
      };
    }

    const taskId = submitData?.data?.taskId || submitData?.taskId;
    if (!taskId) {
      const errorText = `NanoBanana submit did not return taskId: ${JSON.stringify(submitData).slice(0, 400)}`;
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText,
      }).catch(() => {});
      return { success: false, status: 502, error: errorText };
    }

    if (!statusUrl) {
      const errorText = "NanoBanana statusUrl is not configured";
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 500,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText,
      }).catch(() => {});
      return { success: false, status: 500, error: errorText };
    }

    const timeoutMs = normalizePositiveNumber(
      body.timeout_ms,
      normalizePositiveNumber(process.env.NANOBANANA_POLL_TIMEOUT_MS, 120000)
    );
    const pollIntervalMs = normalizePositiveNumber(
      body.poll_interval_ms,
      normalizePositiveNumber(process.env.NANOBANANA_POLL_INTERVAL_MS, 2500)
    );

    let lastTaskData = null;
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const pollResp = await fetch(`${statusUrl}?taskId=${encodeURIComponent(taskId)}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!pollResp.ok) {
        const errorText = await pollResp.text();
        if (log) {
          log.error(
            "IMAGE",
            `${provider} poll error ${pollResp.status}: ${errorText.slice(0, 200)}`
          );
        }
        return { success: false, status: pollResp.status, error: errorText };
      }

      const pollData = await pollResp.json();
      const taskData = pollData?.data || pollData;
      lastTaskData = taskData;

      const successFlag = Number(taskData?.successFlag);
      if (successFlag === 1) {
        const normalized = await normalizeNanoBananaTaskResult(taskData, body, log);

        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          responseBody: { images_count: normalized.length, mode: "async", taskId },
        }).catch(() => {});

        return {
          success: true,
          data: {
            created: Math.floor(Date.now() / 1000),
            data: normalized,
          },
        };
      }

      if (successFlag === 2 || successFlag === 3) {
        const errorText =
          taskData?.errorMessage || `NanoBanana task failed (successFlag=${String(successFlag)})`;

        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
          status: 502,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          error: errorText.slice(0, 500),
          responseBody: { taskId, successFlag, errorCode: taskData?.errorCode ?? null },
        }).catch(() => {});

        return { success: false, status: 502, error: errorText };
      }

      await sleep(pollIntervalMs);
    }

    const timeoutError = `NanoBanana task timeout after ${timeoutMs}ms (taskId=${taskId}, successFlag=${String(lastTaskData?.successFlag ?? "unknown")})`;
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 504,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: timeoutError,
      responseBody: { taskId, lastSuccessFlag: lastTaskData?.successFlag ?? null },
    }).catch(() => {});

    return { success: false, status: 504, error: timeoutError };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Image provider error: ${err.message}` };
  }
}

function normalizeNanoBananaSyncPayload(data, prompt) {
  const images = [];

  if (data.image) {
    images.push({ b64_json: data.image, revised_prompt: prompt });
  } else if (Array.isArray(data.images)) {
    for (const img of data.images) {
      images.push({
        b64_json: typeof img === "string" ? img : img?.image || img?.data,
        revised_prompt: prompt,
      });
    }
  } else if (Array.isArray(data.data)) {
    for (const img of data.data) {
      if (!img) continue;
      images.push(img);
    }
  }

  return { data: images.filter(Boolean) };
}

async function normalizeNanoBananaTaskResult(taskData, body, log) {
  const response = taskData?.response || {};

  const urlCandidates = [
    response?.resultImageUrl,
    response?.originImageUrl,
    taskData?.resultImageUrl,
    taskData?.originImageUrl,
  ].filter((v) => typeof v === "string" && v.length > 0);

  if (Array.isArray(response?.resultImageUrls)) {
    for (const u of response.resultImageUrls) {
      if (typeof u === "string" && u.length > 0) urlCandidates.push(u);
    }
  }

  const b64Candidates = [
    response?.resultImageBase64,
    response?.resultImage,
    taskData?.resultImageBase64,
    taskData?.resultImage,
  ].filter((v) => typeof v === "string" && v.length > 0);

  if (Array.isArray(response?.resultImageBase64List)) {
    for (const b64 of response.resultImageBase64List) {
      if (typeof b64 === "string" && b64.length > 0) b64Candidates.push(b64);
    }
  }

  const wantsBase64 = body.response_format === "b64_json";

  if (wantsBase64) {
    if (b64Candidates.length > 0) {
      return b64Candidates.map((b64) => ({ b64_json: b64, revised_prompt: body.prompt }));
    }

    if (urlCandidates.length > 0) {
      const firstUrl = urlCandidates[0];
      const remoteImage = await fetchRemoteImage(firstUrl);
      const base64 = remoteImage.buffer.toString("base64");
      return [{ b64_json: base64, revised_prompt: body.prompt }];
    }
  }

  if (urlCandidates.length > 0) {
    return urlCandidates.map((url) => ({ url, revised_prompt: body.prompt }));
  }

  if (b64Candidates.length > 0) {
    return b64Candidates.map((b64) => ({ b64_json: b64, revised_prompt: body.prompt }));
  }

  if (log) {
    log.warn(
      "IMAGE",
      `NanoBanana task completed without image payload: ${JSON.stringify(taskData).slice(0, 240)}`
    );
  }

  return [];
}

function inferResolutionFromSize(size) {
  if (typeof size !== "string") return null;
  const [wRaw, hRaw] = size.split("x");
  const width = Number(wRaw);
  const height = Number(hRaw);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;

  const longestSide = Math.max(width, height);
  if (longestSide <= 1024) return "1K";
  if (longestSide <= 2048) return "2K";
  return "4K";
}

function normalizePositiveNumber(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.floor(n);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Handle SD WebUI image generation (local, no auth)
 * POST {baseUrl} with { prompt, negative_prompt, width, height, steps }
 * Response: { images: ["base64..."] }
 */
async function handleSDWebUIImageGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const [width, height] = (body.size || "512x512").split("x").map(Number);

  const upstreamBody = {
    prompt: body.prompt,
    negative_prompt: body.negative_prompt || "",
    width: width || 512,
    height: height || 512,
    steps: body.steps || 20,
    cfg_scale: body.cfg_scale || 7,
    sampler_name: body.sampler || "Euler a",
    batch_size: body.n || 1,
    override_settings: {
      sd_model_checkpoint: model,
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (sdwebui) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});

      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    // SD WebUI returns { images: ["base64...", ...] }
    const images = (data.images || []).map((b64) => ({
      b64_json: b64,
      revised_prompt: body.prompt,
    }));

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} sdwebui error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Image provider error: ${err.message}` };
  }
}

/**
 * Handle ComfyUI image generation (local, no auth)
 * Submits a txt2img workflow, polls for completion, fetches output
 */
async function handleComfyUIImageGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const [width, height] = (body.size || "1024x1024").split("x").map(Number);

  // Default txt2img workflow template for ComfyUI
  const workflow = {
    "3": {
      class_type: "KSampler",
      inputs: {
        seed: parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % 2 ** 32,
        steps: body.steps || 20,
        cfg: body.cfg_scale || 7,
        sampler_name: "euler",
        scheduler: "normal",
        denoise: 1,
        model: ["4", 0],
        positive: ["6", 0],
        negative: ["7", 0],
        latent_image: ["5", 0],
      },
    },
    "4": {
      class_type: "CheckpointLoaderSimple",
      inputs: { ckpt_name: model },
    },
    "5": {
      class_type: "EmptyLatentImage",
      inputs: { width: width || 1024, height: height || 1024, batch_size: body.n || 1 },
    },
    "6": {
      class_type: "CLIPTextEncode",
      inputs: { text: body.prompt, clip: ["4", 1] },
    },
    "7": {
      class_type: "CLIPTextEncode",
      inputs: { text: body.negative_prompt || "", clip: ["4", 1] },
    },
    "8": {
      class_type: "VAEDecode",
      inputs: { samples: ["3", 0], vae: ["4", 2] },
    },
    "9": {
      class_type: "SaveImage",
      inputs: { filename_prefix: "omniroute", images: ["8", 0] },
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (comfyui) | prompt: "${promptPreview}..."`);
  }

  try {
    const promptId = await submitComfyWorkflow(providerConfig.baseUrl, workflow);
    const historyEntry = await pollComfyResult(providerConfig.baseUrl, promptId);
    const outputFiles = extractComfyOutputFiles(historyEntry);

    const images = [];
    for (const file of outputFiles) {
      const buffer = await fetchComfyOutput(
        providerConfig.baseUrl,
        file.filename,
        file.subfolder,
        file.type
      );
      const base64 = Buffer.from(buffer).toString("base64");
      images.push({ b64_json: base64, revised_prompt: body.prompt });
    }

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} comfyui error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Image provider error: ${err.message}` };
  }
}

type Imagen3ImageGenArgs = {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: { prompt?: string; size?: string; n?: number };
  credentials: { apiKey?: string; accessToken?: string };
  log?: {
    info?: (tag: string, msg: string) => void;
    error?: (tag: string, msg: string) => void;
  } | null;
};

type Imagen3NormalizedImage = {
  b64_json?: unknown;
  url?: unknown;
  revised_prompt?: string;
};

/**
 * Handle Imagen 3 image generation
 */
async function handleImagen3ImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: Imagen3ImageGenArgs) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const aspectRatio = mapImageSize(body.size);

  const upstreamBody = {
    prompt: body.prompt,
    aspect_ratio: aspectRatio,
    number_of_images: body.n ?? 1,
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `${provider}/${model} (imagen3) | prompt: "${promptPreview}..." | aspect_ratio: ${aspectRatio}`
    );
  }

  try {
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
        requestBody: upstreamBody,
      }).catch(() => {});

      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();

    // Normalize response to OpenAI format
    const images: Imagen3NormalizedImage[] = [];
    if (Array.isArray(data.images)) {
      images.push(
        ...data.images.map((img: Record<string, unknown>) => ({
          b64_json: img.image ?? img.b64_json ?? img.url ?? img,
          revised_prompt: body.prompt,
        }))
      );
    } else if (Array.isArray(data.data)) {
      images.push(...data.data);
    } else if (data.url || data.b64_json || data.image) {
      images.push({
        b64_json: data.image || data.b64_json || data.url,
        url: data.url,
        revised_prompt: body.prompt,
      });
    }

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: data.created || Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (log) log.error("IMAGE", `${provider} fetch error: ${errMsg}`);

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: errMsg,
    }).catch(() => {});

    return { success: false, status: 502, error: `Image provider error: ${errMsg}` };
  }
}
