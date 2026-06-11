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

import { applyAntigravityClientProfileHeaders } from "../../services/antigravityClientProfile.ts";

import { getAntigravityEnvelopeUserAgent } from "../../services/antigravityIdentity.ts";

import { mapImageSize } from "../../translator/image/sizeMapper.ts";

import { saveCallLog } from "@/lib/usageDb";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";

import { saveImageErrorResult } from "./logging.ts";
import { normalizeImageAspectRatio, sanitizeImageProviderError } from "./utils.ts";


/**
 * Handle Gemini-format image generation (Antigravity / Nano Banana)
 * Uses Gemini's generateContent API with responseModalities: ["TEXT", "IMAGE"]
 */
export async function handleGeminiImageGeneration({ model, providerConfig, body, credentials, log }) {
  const startTime = Date.now();
  const url = providerConfig.baseUrl;
  const provider = "antigravity";
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
  const candidateCount =
    typeof body.n === "number" && Number.isFinite(body.n) && body.n > 0 ? Math.floor(body.n) : 1;
  const promptText = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");

  // Summarized request for call log
  const logRequestBody = {
    model: body.model,
    prompt: promptText.slice(0, 200),
    size: body.size || "default",
    n: candidateCount,
  };

  if (!projectId || typeof projectId !== "string") {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error:
        "Missing Google projectId for Antigravity account. Please reconnect OAuth in Providers so OmniRoute can fetch your Cloud Code project.",
      requestBody: logRequestBody,
    });
  }

  const antigravityBody = {
    project: projectId,
    requestId: `image_gen/${Date.now()}/${randomUUID()}/0`,
    request: {
      contents: [
        {
          role: "user",
          parts: [{ text: promptText }],
        },
      ],
      generationConfig: {
        candidateCount,
        imageConfig: {
          aspectRatio: normalizeImageAspectRatio(body.aspect_ratio, body.size),
        },
      },
    },
    model,
    userAgent: getAntigravityEnvelopeUserAgent(credentialRecord),
    requestType: "image_gen",
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  applyAntigravityClientProfileHeaders(headers, credentialRecord, antigravityBody);
  delete headers["x-goog-user-project"];

  if (log) {
    const promptPreview = promptText.slice(0, 60);
    log.info(
      "IMAGE",
      `antigravity/${model} (gemini) | prompt: "${promptPreview}..." | format: gemini-image`
    );
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(antigravityBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const safeError = sanitizeImageProviderError(errorText);
      const safeErrorLog =
        typeof safeError === "string" ? safeError : JSON.stringify(safeError ?? {});
      if (log) {
        log.error("IMAGE", `antigravity error ${response.status}: ${safeErrorLog.slice(0, 200)}`);
      }

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `antigravity/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: safeErrorLog.slice(0, 500),
        requestBody: logRequestBody,
      }).catch(() => {});

      return { success: false, status: response.status, error: safeError };
    }

    const data = await response.json();
    const responseBody = data.response || data;

    // Extract image data from Antigravity's wrapped Gemini response.
    const images = [];
    const candidates = responseBody.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          images.push({
            b64_json: part.inlineData.data,
            revised_prompt: parts.find((p) => p.text)?.text || promptText,
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

    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
    };
  }
}

