// HuggingFace Hub image-generation provider.
//
// The HF Inference API text-to-image task returns the generated image as raw
// binary bytes (e.g. `image/jpeg`), not a JSON envelope — unlike most other
// image providers wired in this file. Mirrors the shape/error-handling
// conventions used by ./hyperbolic.ts and ./leonardo.ts.

import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

export async function handleHuggingFaceImageGeneration({
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

  if (log) {
    log.info("IMAGE", `${provider}/${model} (huggingface) | prompt: "${prompt.slice(0, 60)}..."`);
  }

  try {
    const response = await fetch(`${providerConfig.baseUrl}/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ inputs: prompt }),
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

    const buf = await response.arrayBuffer();

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
    }).catch(() => {});

    return {
      success: true,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [{ b64_json: Buffer.from(buf).toString("base64"), revised_prompt: prompt }],
      },
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
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
    };
  }
}
