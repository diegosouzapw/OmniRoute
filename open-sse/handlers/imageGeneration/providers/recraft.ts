import { sanitizeErrorMessage } from "../../../utils/error.ts";

import {
  normalizeProviderImagePayload,
  saveImageSuccessResult,
  saveImageErrorResult,
} from "../shared.ts";
export async function handleRecraftImageGeneration({
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
    const images = await normalizeProviderImagePayload(payload, body, log, "url");
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
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
    });
  }
}
