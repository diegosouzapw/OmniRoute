import { getImageProvider } from "../../../config/imageRegistry.ts";
import { kieExecutor } from "../../../executors/kie.ts";
import {
  getKieErrorMessage,
  getKieErrorStatus,
  getKieTaskId,
  isJsonObject,
  parseKieResultJson,
} from "../../../utils/kieTask.ts";

import { mapImageSize } from "../../../translator/image/sizeMapper.ts";
import {
  extractImageInputs,
  saveImageSuccessResult,
  saveImageErrorResult,
  normalizePositiveNumber,
} from "../shared.ts";
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

// KIE Market catalog ids are namespaced for OmniRoute's catalog
// (`<vendor>/<model>`), but the KIE Market createTask API expects
// vendor-specific upstream ids that do not follow a single consistent
// pattern. Every entry below was confirmed individually against the literal
// example request JSON published on docs.kie.ai (never inferred by pattern —
// see #11326's false "everything else already matches" claim and #11296's
// follow-up correction):
//   - google-imagen: nano-banana-2 and nano-banana-pro drop the vendor
//     namespace entirely; nano-banana and nano-banana-edit use a `google/`
//     prefix instead of `google-imagen/` (docs.kie.ai/market/google/*).
//   - gpt: gpt-image-2-* drops the `gpt/` namespace entirely
//     (docs.kie.ai/market/gpt/gpt-image-2-*); gpt-image-1.5-* uses a
//     `gpt-image/` namespace instead of `gpt/gpt-image-1.5-`, and keeps the
//     dot in "1.5" (docs.kie.ai/market/gpt-image/1-5-*).
//   - seedream: 5.0-lite-* drops the ".0" — real id is `5-lite-*`
//     (docs.kie.ai/market/seedream/5-lite-text-to-image); seedream 4.5 (T2I
//     and edit) already matches byte-for-byte.
//   - flux: `flux/2-*` uses a `flux-2/` namespace (dash, not slash); the
//     generic (non-"pro") variant is named `flex` upstream, not `2`
//     (docs.kie.ai/market/flux2/pro-*, .../flex-*).
//   - wan: `wan/2.7-*` keeps the dot in our catalog, but KIE's documented
//     enum uses a dash — real id is `wan/2-7-*`
//     (docs.kie.ai/market/wan/2-7-image[-pro]).
//   - ideogram (v3-text-to-image, v3-edit, v3-remix), qwen, qwen2, and
//     grok-imagine already match byte-for-byte
//     (docs.kie.ai/market/{ideogram,qwen,qwen2,grok-imagine}/*).
//     ideogram/v3-reframe has no dedicated docs.kie.ai page as of this sweep
//     (its 3 siblings above are all direct id matches, so it is assumed
//     correct by pattern, not independently confirmed).
// #14335 (2026-10-08): https://docs.kie.ai/market/z-image/z-image declares
// `z-image`. The old versioned picker ids remain compatibility aliases only.
// Flux Kontext's dedicated API/tier is now explicit in the registry. The current
// main docs also offer a Market API, but existing requests retain the documented
// /old-model/flux-kontext-api contract rather than migrating endpoints implicitly.
export const KIE_MARKET_UPSTREAM_MODEL_IDS: ReadonlyMap<string, string> = new Map([
  ["google-imagen/nano-banana", "google/nano-banana"],
  ["google-imagen/nano-banana-2", "nano-banana-2"],
  ["google-imagen/nano-banana-pro", "nano-banana-pro"],
  ["google-imagen/nano-banana-edit", "google/nano-banana-edit"],
  ["gpt/gpt-image-2-text-to-image", "gpt-image-2-text-to-image"],
  ["gpt/gpt-image-2-image-to-image", "gpt-image-2-image-to-image"],
  ["gpt/gpt-image-1.5-text-to-image", "gpt-image/1.5-text-to-image"],
  ["gpt/gpt-image-1.5-image-to-image", "gpt-image/1.5-image-to-image"],
  ["seedream/5.0-lite-text-to-image", "seedream/5-lite-text-to-image"],
  ["seedream/5.0-lite-image-to-image", "seedream/5-lite-image-to-image"],
  ["flux/2-pro-text-to-image", "flux-2/pro-text-to-image"],
  ["flux/2-pro-image-to-image", "flux-2/pro-image-to-image"],
  ["flux/2-text-to-image", "flux-2/flex-text-to-image"],
  ["flux/2-image-to-image", "flux-2/flex-image-to-image"],
  ["wan/2.7-image", "wan/2-7-image"],
  ["wan/2.7-image-pro", "wan/2-7-image-pro"],
  ["z-image/4.0-text-to-image", "z-image"],
  ["z-image/4.5-text-to-image", "z-image"],
]);

export function resolveKieMarketUpstreamModelId(publicModelId: string): string {
  return KIE_MARKET_UPSTREAM_MODEL_IDS.get(publicModelId) ?? publicModelId;
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

  // Check data.response (common in 4o-image API); resultImageUrl(s) is the
  // flux/kontext shape normalizeNanoBananaTaskResult also reads (#14335 LEDGER-11).
  add(response.resultUrls);
  add(response.resultUrl);
  add(response.resultImageUrl);
  add(response.resultImageUrls);

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

  const { modelEntry, isFluxKontext, isMarket } = classifyKieImageModel(provider, model);

  const { baseUrl, payload } = prepareKieImageRequest({
    model,
    providerConfig,
    body,
    prompt,
    size,
    modelEntry,
    isFluxKontext,
    isMarket,
  });

  logKieImageRequest(log, body, provider, model, isFluxKontext, isMarket);

  try {
    const createData = await createKieImageTask({
      isFluxKontext,
      isMarket,
      baseUrl,
      providerConfig,
      token,
      payload,
    });
    const taskId = getKieTaskId(createData);
    if (!taskId) {
      return saveKieCreateTaskError({ createData, provider, model, startTime, payload, log });
    }
    const statusUrl = resolveKieImageStatusUrl({
      isFluxKontext,
      isMarket,
      providerConfig,
      baseUrl,
    });

    const { data: recordData, state } = await kieExecutor.pollTask({
      statusUrl,
      taskId: String(taskId),
      token,
      timeoutMs,
      pollIntervalMs,
    });

    return finishKieImageTask({
      recordData,
      state,
      taskId,
      prompt,
      provider,
      model,
      startTime,
      payload,
      log,
    });
  } catch (err: unknown) {
    return saveKieImageFailure(err, provider, model, startTime);
  }
}

function saveKieImageFailure(err: unknown, provider: string, model: string, startTime: number) {
  return saveImageErrorResult({
    provider,
    model,
    status: getKieErrorStatus(err, 502),
    startTime,
    error: `Image provider error: ${getKieErrorMessage(err, "KIE image generation failed")}`,
  });
}

function prepareKieImageRequest({
  model,
  providerConfig,
  body,
  prompt,
  size,
  modelEntry,
  isFluxKontext,
  isMarket,
}) {
  const { imageUrl } = extractImageInputs(body);
  let baseUrl = "";
  let payload: Record<string, unknown> = {};

  if (isFluxKontext) {
    // Preserve the dedicated API and choose Pro/Max from the catalog contract.
    baseUrl = `${providerConfig.baseUrl.replace(/\/$/, "")}/api/v1/flux/kontext/generate`;
    payload = {
      prompt,
      aspectRatio: mapImageSize(size),
      model: modelEntry.kieFluxKontextModel,
      ...(imageUrl ? { inputImage: imageUrl } : {}),
    };
  } else if (isMarket) {
    // Unified Market API endpoint
    baseUrl = `${providerConfig.baseUrl.replace(/\/$/, "")}/api/v1/jobs/createTask`;
    const input: Record<string, unknown> = {
      prompt,
      aspect_ratio: mapImageSize(size),
    };
    if (imageUrl) {
      input.image_url = imageUrl;
    }
    payload = {
      model: resolveKieMarketUpstreamModelId(model),
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
      size: mapImageSize(size),
      nVariants: body.n || 1,
    };
  }

  return { baseUrl, payload };
}

async function createKieImageTask({
  isFluxKontext,
  isMarket,
  baseUrl,
  providerConfig,
  token,
  payload,
}) {
  const endpoint = isFluxKontext
    ? "/api/v1/flux/kontext/generate"
    : isMarket
      ? "/api/v1/jobs/createTask"
      : new URL(baseUrl).pathname;
  const createBaseUrl =
    isFluxKontext || isMarket ? providerConfig.baseUrl : baseUrl.replace(endpoint, "");
  return kieExecutor.createTask({
    baseUrl: createBaseUrl,
    token,
    payload,
    endpoint,
  });
}

function saveKieCreateTaskError({ createData, provider, model, startTime, payload, log }) {
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

function resolveKieImageStatusUrl({ isFluxKontext, isMarket, providerConfig, baseUrl }) {
  // Use statusUrl from providerConfig if available, fallback to dynamic derivation
  return isFluxKontext
    ? `${providerConfig.baseUrl.replace(/\/$/, "")}/api/v1/flux/kontext/record-info`
    : isMarket
      ? `${providerConfig.baseUrl.replace(/\/$/, "")}/api/v1/jobs/recordInfo`
      : providerConfig.statusUrl && !providerConfig.statusUrl.includes("jobs/recordInfo")
        ? providerConfig.statusUrl
        : baseUrl.replace(/\/generate$/, "/record-info");
}

function finishKieImageTask({
  recordData,
  state,
  taskId,
  prompt,
  provider,
  model,
  startTime,
  payload,
  log,
}) {
  const kieUrls = state === "success" ? normalizeKieImageResult(recordData) : [];
  // #14335 LEDGER-13: a "success" state with zero usable urls falls through to
  // the failure branch below instead of a fake HTTP-200 success with data:[].
  if (kieUrls.length > 0) {
    if (log) {
      log.info("IMAGE", `KIE poll success for task ${taskId}`);
    }
    const images = kieUrls.map((url: string) => ({ url, revised_prompt: prompt }));

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
    recordDataBody.errorMessage || recordDataBody.failMsg || record.msg || "KIE image task failed";

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
}

function classifyKieImageModel(provider, model) {
  // Check if model is a Market model (unified API)
  const fullRegistry = getImageProvider(provider);
  const modelEntry = fullRegistry?.models?.find((m) => m.id === model);
  const isFluxKontext = Boolean(modelEntry?.kieFluxKontextModel);
  const isMarket = !isFluxKontext && (modelEntry?.isMarket || model.includes("/"));

  return { modelEntry, isFluxKontext, isMarket };
}

function logKieImageRequest(log, body, provider, model, isFluxKontext, isMarket) {
  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `${provider}/${model} (${isFluxKontext ? "flux-kontext" : isMarket ? "market" : "direct"}) | prompt: "${promptPreview}..."`
    );
  }
}
