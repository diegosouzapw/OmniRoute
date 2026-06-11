
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

import { kieExecutor } from "../../executors/kie.ts";

import { mapImageSize } from "../../translator/image/sizeMapper.ts";

import {
  getKieErrorMessage,
  getKieErrorStatus,
  isJsonObject,
  parseKieResultJson,
} from "../../utils/kieTask.ts";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";

import { normalizePositiveNumber, extractImageInputs } from "./utils.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "./logging.ts";



interface KieImageOptions {
  model: string;
  provider: string;
  providerConfig: {
    baseUrl: string;
    statusUrl?: string;
  };
  body: Record<string, unknown> & {
    prompt?: unknown;
    size?: unknown;
    n?: unknown;
    timeout_ms?: unknown;
    poll_interval_ms?: unknown;
  };
  credentials?: {
    apiKey?: string;
    accessToken?: string;
  } | null;
  log?: {
    info: (scope: string, message: string) => void;
    error: (scope: string, message: string) => void;
  } | null;
}



function normalizeKieImageResult(recordData: unknown): string[] {
  const record = isJsonObject(recordData) ? recordData : {};
  const data = isJsonObject(record.data) ? record.data : {};
  const response = isJsonObject(data.response) ? data.response : {};
  const resultJson = parseKieResultJson(recordData);
  const urls = new Set<string>();

  const add = (val: unknown) => {
    if (typeof val === "string" && val.startsWith("http")) urls.add(val);
    if (Array.isArray(val)) {
      val.forEach((v) => {
        if (typeof v === "string" && v.startsWith("http")) urls.add(v);
      });
    }
  };

  // Check resultJson (common in Market API)
  add(resultJson?.resultUrls);
  add(resultJson?.imageUrls);
  add(resultJson?.resultUrl);
  add(resultJson?.imageUrl);

  // Check data.response (common in 4o-image API)
  add(response.resultUrls);
  add(response.resultUrl);

  // Check direct data fields
  add(data.resultImageUrls);
  add(data.resultImageUrl);
  add(data.url);

  return Array.from(urls);
}



export async function handleKieImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: KieImageOptions) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken;
  const timeoutMs = normalizePositiveNumber(body.timeout_ms, 300000);
  const pollIntervalMs = normalizePositiveNumber(body.poll_interval_ms, 2500);
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const size = typeof body.size === "string" ? body.size : undefined;

  if (!token) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "KIE API key is required",
    });
  }

  // Check if model is a Market model (unified API)
  const fullRegistry = getImageProvider(provider);
  const modelEntry = fullRegistry?.models?.find((m) => m.id === model);
  const isMarket = modelEntry?.isMarket || model.includes("/");

  const { imageUrl } = extractImageInputs(body);
  let baseUrl = "";
  let payload: Record<string, unknown> = {};

  if (isMarket) {
    // Unified Market API endpoint
    baseUrl = `${providerConfig.baseUrl.replace(/\/$/, "")}/api/v1/jobs/createTask`;
    const input: Record<string, unknown> = {
      prompt,
      aspect_ratio: mapImageSize(size, "1:1"),
    };
    if (imageUrl) {
      input.image_url = imageUrl;
    }
    payload = {
      model,
      input,
    };
  } else {
    // Legacy/Direct endpoint
    const modelPath = model.replace("-t2i", "").replace("-i2i", "");
    baseUrl = providerConfig.baseUrl.includes(model)
      ? providerConfig.baseUrl
      : `https://api.kie.ai/api/v1/${modelPath}/generate`;

    payload = {
      prompt,
      size: mapImageSize(size, "1:1"),
      nVariants: body.n || 1,
    };
  }

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `${provider}/${model} (${isMarket ? "market" : "direct"}) | prompt: "${promptPreview}..."`
    );
  }

  try {
    const endpoint = isMarket ? "/api/v1/jobs/createTask" : new URL(baseUrl).pathname;
    const createBaseUrl = isMarket ? providerConfig.baseUrl : baseUrl.replace(endpoint, "");
    const createData = await kieExecutor.createTask({
      baseUrl: createBaseUrl,
      token,
      payload,
      endpoint,
    });
    const taskId = createData?.data?.taskId || createData?.taskId;

    if (!taskId) {
      const errorMessage =
        createData?.msg ||
        createData?.message ||
        createData?.error ||
        "KIE image generation did not return taskId";
      if (log) {
        log.error("IMAGE", `KIE createTask failed: ${JSON.stringify(createData)}`);
      }
      return saveImageErrorResult({
        provider,
        model,
        status: 502,
        startTime,
        error: errorMessage,
        requestBody: payload,
      });
    }

    // Use statusUrl from providerConfig if available, fallback to dynamic derivation
    const statusUrl = isMarket
      ? `${providerConfig.baseUrl.replace(/\/$/, "")}/api/v1/jobs/recordInfo`
      : providerConfig.statusUrl && !providerConfig.statusUrl.includes("jobs/recordInfo")
        ? providerConfig.statusUrl
        : baseUrl.replace(/\/generate$/, "/record-info");

    const { data: recordData, state } = await kieExecutor.pollTask({
      statusUrl,
      taskId: String(taskId),
      token,
      timeoutMs,
      pollIntervalMs,
    });

    if (state === "success") {
      if (log) {
        log.info("IMAGE", `KIE poll success for task ${taskId}`);
      }
      const urls = normalizeKieImageResult(recordData);
      const images = urls.map((url: string) => ({ url, revised_prompt: prompt }));

      return saveImageSuccessResult({
        provider,
        model,
        startTime,
        requestBody: payload,
        responseBody: { images_count: images.length },
        images,
      });
    }

    const record = isJsonObject(recordData) ? recordData : {};
    const recordDataBody = isJsonObject(record.data) ? record.data : {};
    const errorMessage =
      recordDataBody.errorMessage ||
      recordDataBody.failMsg ||
      record.msg ||
      "KIE image task failed";

    if (log) {
      log.error("IMAGE", `KIE poll failed for task ${taskId}: ${JSON.stringify(recordData)}`);
    }

    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: String(errorMessage),
      requestBody: payload,
    });
  } catch (err: unknown) {
    return saveImageErrorResult({
      provider,
      model,
      status: getKieErrorStatus(err, 502),
      startTime,
      error: `Image provider error: ${getKieErrorMessage(err, "KIE image generation failed")}`,
    });
  }
}

