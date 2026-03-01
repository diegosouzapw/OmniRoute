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
import { saveCallLog } from "@/lib/usageDb";
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../utils/comfyuiClient.ts";

/**
 * Handle image generation request
 * @param {object} options
 * @param {object} options.body - Request body
 * @param {object} options.credentials - Provider credentials { apiKey, accessToken }
 * @param {object} options.log - Logger
 */
export async function handleImageGeneration({ body, credentials, log }) {
  const { provider, model } = parseImageModel(body.model);

  if (!provider) {
    return {
      success: false,
      status: 400,
      error: `Invalid image model: ${body.model}. Use format: provider/model`,
    };
  }

  const providerConfig = getImageProvider(provider);
  if (!providerConfig) {
    return {
      success: false,
      status: 400,
      error: `Unknown image provider: ${provider}`,
    };
  }

  // Route to format-specific handler
  if (providerConfig.format === "gemini-image") {
    return handleGeminiImageGeneration({ model, providerConfig, body, credentials, log });
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
  const upstreamBody: Record<string, any> = {
    model: model,
    prompt: body.prompt,
  };

  // Pass optional parameters
  if (body.n !== undefined) upstreamBody.n = body.n;
  if (body.size !== undefined) upstreamBody.size = body.size;
  if (body.quality !== undefined) upstreamBody.quality = body.quality;
  if (body.response_format !== undefined) upstreamBody.response_format = body.response_format;
  if (body.style !== undefined) upstreamBody.style = body.style;

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
 * Uses flash vs pro routing based on model ID
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
  const url = isPro && providerConfig.proUrl ? providerConfig.proUrl : providerConfig.baseUrl;

  const upstreamBody = {
    prompt: body.prompt,
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `${provider}/${model} (nanobanana ${isPro ? "pro" : "flash"}) | prompt: "${promptPreview}..."`
    );
  }

  try {
    const response = await fetch(url, {
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
    // Normalize NanoBanana response to OpenAI format
    const images = [];
    if (data.image) {
      images.push({ b64_json: data.image, revised_prompt: body.prompt });
    } else if (data.images) {
      for (const img of data.images) {
        images.push({
          b64_json: typeof img === "string" ? img : img.image || img.data,
          revised_prompt: body.prompt,
        });
      }
    } else if (data.data) {
      // Already OpenAI-like
      return { success: true, data };
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
      if (log) log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);

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
        seed: Math.floor(Math.random() * 2 ** 32),
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
