import { saveCallLog } from "@/lib/usageDb";
import { fetchUntrustedRemoteImage } from "@/shared/network/remoteImageFetch";
import { sleep } from "../../../utils/sleep.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { mapImageSize } from "../../../translator/image/sizeMapper.ts";
import { normalizePositiveNumber } from "../shared.ts";
/**
 * Handle Hyperbolic image generation
 * Uses { model_name, prompt, height, width } and returns { images: [{ image: base64 }] }
 */
export async function handleNanoBananaImageGeneration({
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

  const upstreamBody = prepareNanoBananaImageRequest(body, isPro);

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
      return await parseNanoBananaSubmitError(submitResp, log, provider, model, startTime);
    }

    const submitData = await submitResp.json();

    const submitResult = parseNanoBananaSubmission({
      submitData,
      body,
      provider,
      model,
      startTime,
      statusUrl,
    });
    if (submitResult.result) return submitResult.result;
    const taskId = submitResult.taskId;

    return await pollNanoBananaImageTask({
      body,
      statusUrl,
      taskId,
      token,
      log,
      provider,
      model,
      startTime,
    });
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

export async function normalizeNanoBananaTaskResult(taskData, body, log) {
  const response = taskData?.response || {};

  const urlCandidates = collectNanoBananaResultUrls(taskData, response);
  const b64Candidates = collectNanoBananaResultBase64(taskData, response);

  const wantsBase64 = body.response_format === "b64_json";

  if (wantsBase64) {
    if (b64Candidates.length > 0) {
      return b64Candidates.map((b64) => ({ b64_json: b64, revised_prompt: body.prompt }));
    }

    if (urlCandidates.length > 0) {
      const firstUrl = urlCandidates[0];
      // Upstream-supplied result URL, not an OmniRoute-controlled host — public-only +
      // DNS-pinned policy lives in fetchUntrustedRemoteImage.
      const remoteImage = await fetchUntrustedRemoteImage(firstUrl);
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

function prepareNanoBananaImageRequest(body, isPro) {
  const aspectRatio =
    typeof body.aspectRatio === "string"
      ? body.aspectRatio
      : typeof body.aspect_ratio === "string"
        ? body.aspect_ratio
        : mapImageSize(body.size);

  const resolution = resolveNanoBananaResolution(body);

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

  return upstreamBody;
}

function parseNanoBananaSubmission({ submitData, body, provider, model, startTime, statusUrl }) {
  const hasSyncPayload = hasNanoBananaSyncPayload(submitData);

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
      result: {
        success: true,
        data: { created: Math.floor(Date.now() / 1000), data: syncResult.data },
      },
      taskId: null,
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
    return { result: { success: false, status: 502, error: errorText }, taskId: null };
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
    return { result: { success: false, status: 500, error: errorText }, taskId: null };
  }

  return { result: null, taskId };
}

async function pollNanoBananaImageTask({
  body,
  statusUrl,
  taskId,
  token,
  log,
  provider,
  model,
  startTime,
}) {
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
        log.error("IMAGE", `${provider} poll error ${pollResp.status}: ${errorText.slice(0, 200)}`);
      }
      return { success: false, status: pollResp.status, error: errorText };
    }

    const pollData = await pollResp.json();
    const taskData = pollData?.data || pollData;
    lastTaskData = taskData;

    const successFlag = Number(taskData?.successFlag);
    const result = await parseNanoBananaPollResult({
      taskData,
      successFlag,
      body,
      log,
      provider,
      model,
      startTime,
      taskId,
    });
    if (result) return result;

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
}

async function parseNanoBananaPollResult({
  taskData,
  successFlag,
  body,
  log,
  provider,
  model,
  startTime,
  taskId,
}) {
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

  return null;
}

function collectNanoBananaResultUrls(taskData, response) {
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

  return urlCandidates;
}

function collectNanoBananaResultBase64(taskData, response) {
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

  return b64Candidates;
}

async function parseNanoBananaSubmitError(submitResp, log, provider, model, startTime) {
  const errorText = await submitResp.text();
  if (log) {
    log.error("IMAGE", `${provider} submit error ${submitResp.status}: ${errorText.slice(0, 200)}`);
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

function resolveNanoBananaResolution(body) {
  let resolution =
    typeof body.resolution === "string"
      ? body.resolution
      : inferResolutionFromSize(body.size) || "1K";
  if (body.quality === "hd" && resolution === "1K") {
    resolution = "2K";
  }

  return resolution;
}

function hasNanoBananaSyncPayload(submitData) {
  // Backward compatibility: handle providers returning image payload synchronously
  return (
    Boolean(submitData?.image) ||
    Array.isArray(submitData?.images) ||
    Array.isArray(submitData?.data) ||
    Boolean(submitData?.data?.[0]?.url) ||
    Boolean(submitData?.data?.[0]?.b64_json)
  );
}
