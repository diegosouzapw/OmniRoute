/**
 * NanoBanana async image generation provider (submit → poll → fetch).
 */

import { getImageProvider, parseImageModel } from "../../../config/imageRegistry.ts";
import { mapImageSize } from "../../../translator/image/sizeMapper.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sleep } from "../../../utils/sleep.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../logging.ts";
import { normalizeProviderImagePayload, extractImageInputs, resolveImageSource } from "../utils.ts";

const NANOBANANA_POLL_INTERVAL_MS = 2000;
const NANOBANANA_MAX_POLL_ATTEMPTS = 60;

export async function handleNanoBananaImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken;

  const { width, height } = extractImageInputs(body);
  const upstreamBody = {
    model,
    prompt: body.prompt,
    width,
    height,
  };

  const nanobananaConfig = getImageProvider("nanobananan");
  const baseUrl = providerConfig?.baseUrl || nanobananaConfig?.baseUrl || "https://api.nanobananan.com";
  const url = `${baseUrl.replace(/\/+$/, "")}/v1/images/generations`;

  // Submit task
  const submitResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(upstreamBody),
  });

  if (!submitResponse.ok) {
    const errorText = await submitResponse.text().catch(() => "Unknown error");
    const elapsed = Date.now() - startTime;
    const sanitizedError = sanitizeErrorMessage(errorText);
    log?.error?.(`[NanoBanana] Task submission failed: ${sanitizedError}`, { elapsed });
    await saveImageErrorResult({
      provider: "nanobananan",
      model,
      error: sanitizedError,
      elapsed,
      traceId: log?.traceId,
      requestId: log?.requestId,
    });
    throw new Error(`NanoBanana API error ${submitResponse.status}: ${sanitizedError}`);
  }

  const submitData = await submitResponse.json();
  const taskId = submitData.task_id || submitData.id;
  if (!taskId) {
    throw new Error("No task ID in NanoBanana response");
  }

  // Poll for completion
  let attempts = 0;
  while (attempts < NANOBANANA_MAX_POLL_ATTEMPTS) {
    await sleep(NANOBANANA_POLL_INTERVAL_MS);
    attempts++;

    const pollUrl = `${baseUrl.replace(/\/+$/, "")}/v1/tasks/${taskId}`;
    const pollResponse = await fetch(pollUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!pollResponse.ok) {
      log?.warn?.(`[NanoBanana] Poll failed (attempt ${attempts}): ${pollResponse.status}`);
      continue;
    }

    const pollData = await pollResponse.json();
    const status = pollData.status || pollData.state;

    if (status === "completed" || status === "succeeded") {
      const result = await normalizeNanoBananaTaskResult(pollData, body, log);
      const elapsed = Date.now() - startTime;
      const size = body.size || "1024x1024";

      await saveCallLog({
        model: `nanobananan:${model}`,
        provider: "nanobananan",
        elapsed,
        traceId: log?.traceId,
        requestId: log?.requestId,
        prompt: body.prompt,
        size,
      });

      await saveImageSuccessResult({
        provider: "nanobananan",
        model,
        elapsed,
        traceId: log?.traceId,
        requestId: log?.requestId,
        size,
      });

      return {
        created: Math.floor(Date.now() / 1000),
        data: [result],
      };
    }

    if (status === "failed" || status === "error") {
      const errorText = pollData.error || pollData.message || "Task failed";
      const elapsed = Date.now() - startTime;
      await saveImageErrorResult({
        provider: "nanobananan",
        model,
        error: errorText,
        elapsed,
        traceId: log?.traceId,
        requestId: log?.requestId,
      });
      throw new Error(`NanoBanana task failed: ${errorText}`);
    }
  }

  const elapsed = Date.now() - startTime;
  await saveImageErrorResult({
    provider: "nanobananan",
    model,
    error: "Polling timeout",
    elapsed,
    traceId: log?.traceId,
    requestId: log?.requestId,
  });
  throw new Error("NanoBanana task timed out");
}

function normalizeNanoBananaSyncPayload(data, prompt) {
  const imageData = data.images?.[0] || data.data?.[0] || data.output?.[0];
  if (!imageData) return null;

  const result: Record<string, unknown> = {};
  if (imageData.b64_json || imageData.image || imageData.base64) {
    result.b64_json = imageData.b64_json || imageData.image || imageData.base64;
  } else if (imageData.url) {
    result.url = imageData.url;
  }
  return result;
}

async function normalizeNanoBananaTaskResult(taskData, body, log) {
  const output = taskData.output || taskData.result || taskData;
  const imageData = output.images?.[0] || output.data?.[0] || output;

  const result: Record<string, unknown> = {};
  if (imageData.b64_json || imageData.image || imageData.base64) {
    result.b64_json = imageData.b64_json || imageData.image || imageData.base64;
  } else if (imageData.url) {
    // Fetch and convert to base64 if needed
    try {
      const fetchResult = await resolveImageSource(imageData.url);
      if (fetchResult.b64) {
        result.b64_json = fetchResult.b64;
      } else {
        result.url = imageData.url;
      }
    } catch {
      result.url = imageData.url;
    }
  }
  return result;
}
