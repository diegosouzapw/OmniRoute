// Google AI Studio (Gemini API) Imagen image generation.
//
// Unlike the antigravity "gemini-image" format (which wraps generateContent in a
// Cloud Code envelope), the Imagen family on generativelanguage.googleapis.com uses
// the dedicated ":predict" endpoint with an instances/parameters body and returns
// base64 image bytes under `predictions[].bytesBase64Encoded`.
//
// Docs: https://ai.google.dev/gemini-api/docs/imagen  (Imagen requires a billing-
// enabled Google project; free-tier keys get 403 / quota 0.)

import { saveCallLog } from "@/lib/usageDb";
import { mapImageSize } from "../../../translator/image/sizeMapper.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

// Only the Imagen family routes through :predict. Other gemini image models
// (gemini-*-flash-image / nano-banana) use generateContent and belong on the chat
// route, so they must not be dispatched here.
export function isImagenModel(model) {
  return /^imagen-/i.test(String(model || ""));
}

/**
 * Build the Imagen :predict request body from an OpenAI-style image request.
 * Pure — no I/O — so it can be unit-tested without live credentials.
 */
export function buildImagenPredictBody(body) {
  const prompt = typeof body?.prompt === "string" ? body.prompt : String(body?.prompt ?? "");
  const n = Number(body?.n);
  const sampleCount = Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), 4) : 1;
  return {
    instances: [{ prompt }],
    parameters: {
      sampleCount,
      aspectRatio: mapImageSize(body?.aspect_ratio || body?.size),
    },
  };
}

/**
 * Normalize an Imagen :predict response into the OpenAI image-generation shape
 * ({ created, data: [{ b64_json, revised_prompt }] }). Pure — unit-testable.
 */
export function parseImagenPredictResponse(data, prompt) {
  const predictions = Array.isArray(data?.predictions) ? data.predictions : [];
  const images = [];
  for (const p of predictions) {
    const b64 = p?.bytesBase64Encoded ?? p?.b64_json ?? p?.image ?? null;
    if (typeof b64 === "string" && b64.length > 0) {
      images.push({ b64_json: b64, revised_prompt: prompt });
    }
  }
  return { created: Math.floor(Date.now() / 1000), data: images };
}

export async function handleGoogleImagenGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");

  if (!isImagenModel(model)) {
    return {
      success: false,
      status: 400,
      error: `Model ${model} is not an Imagen model. Gemini flash-image models route through /v1/chat/completions, not /v1/images/generations.`,
    };
  }

  const upstreamBody = buildImagenPredictBody(body);
  // baseUrl is https://generativelanguage.googleapis.com/v1beta/models
  const url = `${providerConfig.baseUrl.replace(/\/$/, "")}/${model}:predict`;

  if (log) {
    log.info(
      "IMAGE",
      `${provider}/${model} (google-imagen) | prompt: "${prompt.slice(0, 60)}..." | aspectRatio: ${upstreamBody.parameters.aspectRatio}`
    );
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Key travels in the header, never the URL, so it stays out of logs.
        "x-goog-api-key": token,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const safeError = sanitizeErrorMessage(errorText);
      if (log) log.error("IMAGE", `${provider} error ${response.status}: ${safeError.slice(0, 200)}`);

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: safeError.slice(0, 500),
      }).catch(() => {});

      return { success: false, status: response.status, error: safeError };
    }

    const data = await response.json();
    const normalized = parseImagenPredictResponse(data, prompt);

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: normalized.data.length },
    }).catch(() => {});

    return { success: true, data: normalized };
  } catch (err) {
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
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage(errMsg)}`,
    };
  }
}
