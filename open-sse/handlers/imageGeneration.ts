import { randomUUID } from "crypto";
/** Image generation handler for POST /v1/images/generations (OpenAI-compatible). */

import {
  CHATGPT_WEB_RETIRED_ERROR_CODE,
  CHATGPT_WEB_RETIRED_MESSAGE,
  isCommonChatGptWebRetiredProviderId,
} from "@/shared/constants/chatgptWebRetirement";

import { getImageProvider, parseImageModel } from "../config/imageRegistry.ts";
import { HTTP_STATUS } from "../config/constants.ts";
import { applyAntigravityClientProfileHeaders } from "../services/antigravityClientProfile.ts";
import { getAntigravityEnvelopeUserAgent } from "../services/antigravityIdentity.ts";
import { kieExecutor } from "../executors/kie.ts";
import { mapImageSize } from "../translator/image/sizeMapper.ts";
import { getCodexClientVersion, getCodexUserAgent } from "../config/codexClient.ts";
import { isCodexFreePlan } from "../executors/codex/tools.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sleep } from "../utils/sleep.ts";
import {
  getKieErrorMessage,
  getKieErrorStatus,
  getKieTaskId,
  isJsonObject,
  parseKieResultJson,
} from "../utils/kieTask.ts";
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
  resolveComfyUiBaseUrl,
} from "../utils/comfyuiClient.ts";
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";
import {
  FetchTimeoutError,
  fetchWithTimeout,
  getConfiguredTimeout,
} from "@/shared/utils/fetchTimeout";
import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../utils/error.ts";
import {
  isMicrosoftDesignerWebRetiredProviderId,
  MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE,
} from "@/shared/constants/designerWebRetirement";

import { handleSDWebUIImageGeneration } from "./imageGeneration/providers/sdWebUI.ts";
import { handleHyperbolicImageGeneration } from "./imageGeneration/providers/hyperbolic.ts";
import { handleHuggingFaceImageGeneration } from "./imageGeneration/providers/huggingface.ts";
import { handleComfyUIImageGeneration } from "./imageGeneration/providers/comfyUI.ts";
import { handleImagen3ImageGeneration } from "./imageGeneration/providers/imagen3.ts";
import { handleIdeogramImageGeneration } from "./imageGeneration/providers/ideogram.ts";
import { handleHaiperImageGeneration } from "./imageGeneration/providers/haiper.ts";
import { handleLeonardoImageGeneration } from "./imageGeneration/providers/leonardo.ts";
import { handleMagnificImageGeneration } from "./imageGeneration/providers/magnific.ts";
import { handleNvidiaNimImageGeneration } from "./imageGeneration/providers/nvidiaNim.ts";
import { handleSegmindImageGeneration } from "./imageGeneration/providers/segmind.ts";
import { handleUcImageGeneration } from "./imageGeneration/providers/ucImage.ts";
import { handleCursorAgentImageGeneration } from "./imageGeneration/providers/cursorAgentImage.ts";
import { handleMinimaxImageGeneration } from "./imageGeneration/providers/minimax.ts";
import { handleMaxaiImageGeneration } from "./imageGeneration/providers/maxaiImage.ts";
import { handleAdobeFireflyImageGeneration } from "./imageGeneration/providers/adobeFirefly.ts";
import { handleAlibabaImageGeneration } from "./imageGeneration/providers/alibabaImage.ts";
import { handleAiHordeImageGeneration } from "./imageGeneration/providers/aihorde.ts";
import {
  applyPollinationsAnonymousFallback,
  reportPollinationsAnonOutcome,
} from "./imageGeneration/pollinationsAnonAuth.ts";

// Re-export so /v1/images/edits can dispatch Firefly reference-image edits.
export { handleAdobeFireflyImageGeneration };

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
// One catalog entry remains UNRESOLVED after this sweep and is deliberately
// left untouched pending a follow-up (see #11296 discussion):
//   - z-image/4.0-text-to-image and z-image/4.5-text-to-image: the only
//     documented Z-Image Market page (docs.kie.ai/market/z-image/z-image)
//     shows a single fixed `model` enum value `"z-image"` with no
//     version-specific id or "version" input field found — unclear whether
//     both catalog ids should collapse to the same upstream call.
// flux/kontext is RESOLVED (#11296): it is catalogued with `isMarket: true`
// but has no `docs.kie.ai/market/flux2/kontext` (or similar) Market page —
// Flux Kontext is documented under the separate `/flux-kontext-api/*` docs
// tree with its own endpoint (`POST /api/v1/flux/kontext/generate`, poll
// `GET /api/v1/flux/kontext/record-info`, models `flux-kontext-pro`/
// `flux-kontext-max`), not the Market `createTask` flow this map feeds. It is
// NOT in KIE_MARKET_UPSTREAM_MODEL_IDS below on purpose — handleKieImageGeneration
// reroutes it to the dedicated endpoint instead of rewriting its id.
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
]);

export function resolveKieMarketUpstreamModelId(publicModelId: string): string {
  return KIE_MARKET_UPSTREAM_MODEL_IDS.get(publicModelId) ?? publicModelId;
}

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
  "qwen-image",
]);

const IMAGE_ASPECT_RATIO_PATTERN = /^\d+:\d+$/;
const IMAGE_SIZE_PATTERN = /^(?:1K|2K|4K)$/;

/**
 * Resolve the upstream images endpoint for a custom (OpenAI-compatible) image
 * provider node (#3205).
 *
 * Custom provider nodes store their base URL the same way the chat path does:
 * in `credentials.providerSpecificData.baseUrl` (e.g. `https://example.com/v1`),
 * NOT as a top-level `credentials.baseUrl`. Older callers may still pass a
 * top-level `baseUrl`, so we honor that as a secondary source. When neither is
 * present we fall back to `fallback` (the built-in Gemini OpenAI endpoint).
 *
 * Resolution order: providerSpecificData.baseUrl → credentials.baseUrl → fallback.
 *
 * A node base URL like `https://example.com/v1` is normalized and the
 * OpenAI-compatible `/images/generations` path appended (mirroring
 * `buildOpenAICompatibleUrl` in services/provider.ts). A node URL that already
 * ends in `/images/generations` is returned as-is (no double-append). The
 * `fallback` value is assumed to already be a complete URL and is returned
 * verbatim.
 */
export function resolveImageBaseUrl(
  credentials:
    { baseUrl?: unknown; providerSpecificData?: { baseUrl?: unknown } | null } | null | undefined,
  fallback: string,
  endpoint: "generations" | "edits" = "generations"
): string {
  const psd = credentials?.providerSpecificData;
  const psdBaseUrl =
    psd && typeof psd === "object" && typeof psd.baseUrl === "string" && psd.baseUrl.trim()
      ? psd.baseUrl.trim()
      : null;
  const topLevelBaseUrl =
    typeof credentials?.baseUrl === "string" && credentials.baseUrl.trim()
      ? credentials.baseUrl.trim()
      : null;
  const nodeBaseUrl = psdBaseUrl || topLevelBaseUrl;

  if (!nodeBaseUrl) return fallback;

  // A single configured node serves both image routes: honor a base URL that already
  // points at the requested OpenAI image path, and rewrite one that points at the other
  // image endpoint (e.g. `.../images/generations` requested for edits) (#3214/#3215).
  const suffix = `/images/${endpoint}`;
  // Trim trailing slashes without a backtracking-prone regex (`/\/+$/` is a
  // polynomial-ReDoS pattern on long runs of "/" — CodeQL js/polynomial-redos).
  let normalized = nodeBaseUrl;
  while (normalized.endsWith("/")) normalized = normalized.slice(0, -1);
  if (normalized.endsWith(suffix)) return normalized;
  const stripped = normalized.replace(/\/images\/(?:generations|edits)$/, "");
  return `${stripped}${suffix}`;
}

function normalizeImageAspectRatio(value: unknown, fallbackSize: unknown): string {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    if (IMAGE_ASPECT_RATIO_PATTERN.test(trimmedValue)) return trimmedValue;
  }
  return mapImageSize(typeof fallbackSize === "string" ? fallbackSize : null);
}

function normalizeImageGenerationSize(snakeCaseValue: unknown, camelCaseValue: unknown): string {
  const value = snakeCaseValue ?? camelCaseValue;
  if (typeof value !== "string") return "1K";
  const normalized = value.trim().toUpperCase();
  return IMAGE_SIZE_PATTERN.test(normalized) ? normalized : "1K";
}

function parseJsonOrNull(value: string): unknown | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function sanitizeImageProviderError(errorText: string): unknown {
  const parsed = parseJsonOrNull(errorText);
  if (parsed !== null) {
    return sanitizeUpstreamDetails(parsed) || sanitizeErrorMessage(errorText);
  }
  return sanitizeErrorMessage(errorText);
}

// #8307 — some ChatGPT accounts can run Codex but lack entitlement for the specific
// requested image model. Upstream signals this as a 400 with an exact, stable message
// (not a generic "invalid request"). Classify it so the caller can mark the failure
// `retryable: true`, which routes it through the same sibling-account fallback that
// already handles 401s (executeImageWithCredentialFallback, src/sse/services/imageCredentialRetry.ts).
function isCodexChatGptModelAccessError(status: number, errorText: string, model: string): boolean {
  if (status !== 400) return false;
  const parsed = parseJsonOrNull(errorText);
  let detail: string | null = null;
  if (typeof parsed === "string") {
    detail = parsed;
  } else if (parsed && typeof parsed === "object") {
    const obj = parsed as Record<string, unknown>;
    if (typeof obj.detail === "string") detail = obj.detail;
    else if (typeof obj.message === "string") detail = obj.message;
    else if (obj.error && typeof obj.error === "object") {
      const nested = (obj.error as Record<string, unknown>).message;
      if (typeof nested === "string") detail = nested;
    }
  }
  return (
    detail === `The '${model}' model is not supported when using Codex with a ChatGPT account.`
  );
}

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

function formatImageProviderError(err) {
  const sanitized = sanitizeErrorMessage(err);
  const message = (sanitized || "").replace(/^Error:\s*/i, "").trim();
  return message ? `Image provider error: ${message}` : "Image provider error";
}

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
 * @param {string|null} [options.peerLocality] - Trusted "loopback"|"lan"|"remote" verdict
 *   forwarded from `AUTHZ_HEADER_PEER_LOCALITY` (src/server/authz/headers.ts). Only consumed by
 *   spawn-capable providers (e.g. cursor-agent-image) to enforce Hard Rules #15/#17 without
 *   loopback-gating the whole route for every non-spawning image provider.
 */
export async function handleImageGeneration({
  body,
  credentials,
  log,
  resolvedProvider = null,
  signal = null,
  clientHeaders = null,
  peerLocality = null,
}) {
  const requestedModel = typeof body?.model === "string" ? body.model : "";
  const slash = requestedModel.indexOf("/");
  const requestedPrefix = slash > 0 ? requestedModel.slice(0, slash) : requestedModel;
  if (
    isMicrosoftDesignerWebRetiredProviderId(resolvedProvider) ||
    isMicrosoftDesignerWebRetiredProviderId(requestedPrefix)
  ) {
    return {
      success: false,
      status: HTTP_STATUS.GONE,
      error: MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE,
    };
  }

  const requestedProvider = slash > 0 ? requestedModel.slice(0, slash) : null;
  if (
    isCommonChatGptWebRetiredProviderId(resolvedProvider) ||
    isCommonChatGptWebRetiredProviderId(requestedProvider) ||
    isCommonChatGptWebRetiredProviderId(requestedModel)
  ) {
    return {
      success: false,
      status: 410,
      error: CHATGPT_WEB_RETIRED_MESSAGE,
      code: CHATGPT_WEB_RETIRED_ERROR_CODE,
    };
  }

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
      // #3205: custom OpenAI-compatible nodes store their base URL in
      // credentials.providerSpecificData.baseUrl (same as the chat path —
      // see executors/default.ts:buildUrl / services/provider.ts:buildProviderUrl).
      // Previously only the (always-absent) top-level credentials.baseUrl was
      // read, so every custom image node fell back to the Gemini endpoint and
      // returned "Please pass a valid API key".
      baseUrl: resolveImageBaseUrl(
        credentials,
        `https://generativelanguage.googleapis.com/v1beta/openai/images/generations`
      ),
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

  if (providerConfig.format === "aihorde") {
    return handleAiHordeImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
      signal,
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

  if (providerConfig.format === "huggingface-image") {
    return handleHuggingFaceImageGeneration({
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

  if (providerConfig.format === "segmind") {
    return handleSegmindImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "cursor-agent-image") {
    return handleCursorAgentImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
      peerLocality,
    });
  }

  if (providerConfig.format === "maxai-image") {
    return handleMaxaiImageGeneration({
      model,
      provider,
      body,
      credentials,
      log,
      signal,
    });
  }

  if (providerConfig.format === "uc-image") {
    return handleUcImageGeneration({
      model,
      provider,
      body,
      credentials,
      log,
      signal,
    });
  }

  if (providerConfig.format === "adobe-firefly-image") {
    return handleAdobeFireflyImageGeneration({
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

  if (providerConfig.format === "kie-image") {
    return handleKieImageGeneration({
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
    return handleComfyUIImageGeneration({
      model,
      provider,
      providerConfig: {
        ...providerConfig,
        baseUrl: resolveComfyUiBaseUrl(credentials, providerConfig.baseUrl),
      },
      body,
      log,
    });
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

  if (providerConfig.format === "haiper-image") {
    return handleHaiperImageGeneration({ model, provider, providerConfig, body, credentials, log });
  }
  if (providerConfig.format === "leonardo-image") {
    return handleLeonardoImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }
  if (providerConfig.format === "ideogram-image") {
    return handleIdeogramImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }
  if (providerConfig.format === "magnific-image" || providerConfig.format === "freepik-image") {
    return handleMagnificImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "nvidia-nim") {
    return handleNvidiaNimImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "minimax-image") {
    return handleMinimaxImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (
    providerConfig.format === "agnes-image" &&
    (typeof body.size !== "string" || body.size.trim().length === 0)
  ) {
    return {
      success: false,
      status: 400,
      error: "Size is required for Agnes Image 2.1 Flash",
    };
  }

  if (
    providerConfig.format === "alibaba-image" ||
    providerConfig.format === "qwen-cloud-image" ||
    providerConfig.format === "qwen-token-plan-image" ||
    providerConfig.format === "bailian-coding-plan-image"
  ) {
    return handleAlibabaImageGeneration({
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

async function handleKieImageGeneration({
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
  // #11296 — flux/kontext is catalogued with `isMarket: true`, but KIE does not
  // expose it through the Market catalog at all: it lives under a dedicated API
  // tree (POST /api/v1/flux/kontext/generate, poll .../flux/kontext/record-info)
  // that rejects the Market createTask flow with "model name not supported". Route
  // it there instead of treating it as a Market entry (see KIE_MARKET_UPSTREAM_MODEL_IDS
  // comment above for the same finding).
  const isFluxKontext = model === "flux/kontext";
  const isMarket = !isFluxKontext && (modelEntry?.isMarket || model.includes("/"));

  const { imageUrl } = extractImageInputs(body);
  let baseUrl = "";
  let payload: Record<string, unknown> = {};

  if (isFluxKontext) {
    // Dedicated Flux Kontext API endpoint (not part of the Market catalog).
    baseUrl = `${providerConfig.baseUrl.replace(/\/$/, "")}/api/v1/flux/kontext/generate`;
    payload = {
      prompt,
      aspectRatio: mapImageSize(size),
      model: "flux-kontext-pro",
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

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `${provider}/${model} (${isFluxKontext ? "flux-kontext" : isMarket ? "market" : "direct"}) | prompt: "${promptPreview}..."`
    );
  }

  try {
    const endpoint = isFluxKontext
      ? "/api/v1/flux/kontext/generate"
      : isMarket
        ? "/api/v1/jobs/createTask"
        : new URL(baseUrl).pathname;
    const createBaseUrl =
      isFluxKontext || isMarket ? providerConfig.baseUrl : baseUrl.replace(endpoint, "");
    const createData = await kieExecutor.createTask({
      baseUrl: createBaseUrl,
      token,
      payload,
      endpoint,
    });
    const taskId = getKieTaskId(createData);

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
    const statusUrl = isFluxKontext
      ? `${providerConfig.baseUrl.replace(/\/$/, "")}/api/v1/flux/kontext/record-info`
      : isMarket
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
/**
 * Handle Gemini-format image generation (Antigravity / Nano Banana)
 * Uses Gemini's generateContent API with responseModalities: ["TEXT", "IMAGE"]
 */
async function handleGeminiImageGeneration({ model, providerConfig, body, credentials, log }) {
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
  const aspectRatio = normalizeImageAspectRatio(body.aspect_ratio, body.size);
  const imageSize = normalizeImageGenerationSize(body.image_size, body.imageSize);

  // Summarized request for call log
  const logRequestBody = {
    model: body.model,
    prompt: promptText.slice(0, 200),
    size: body.size || "default",
    aspect_ratio: aspectRatio,
    image_size: imageSize,
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
          aspectRatio,
          imageSize,
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
      `antigravity/${model} (gemini) | prompt: "${promptPreview}..." | ${aspectRatio} ${imageSize}`
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

/**
 * Handle OpenAI-compatible image generation (standard providers + Nebius fallback)
 */
function buildAgnesImageRequestBody(model, body) {
  const upstreamBody: Record<string, unknown> = {
    model,
    prompt: body.prompt,
  };

  if (body.size !== undefined) upstreamBody.size = body.size;
  if (body.ratio !== undefined) {
    upstreamBody.ratio = body.ratio;
  } else if (body.aspect_ratio !== undefined) {
    upstreamBody.ratio = body.aspect_ratio;
  }
  if (body.return_base64 !== undefined) upstreamBody.return_base64 = body.return_base64;

  const explicitExtraBody =
    body.extra_body && typeof body.extra_body === "object" && !Array.isArray(body.extra_body)
      ? body.extra_body
      : {};
  const extraBody: Record<string, unknown> = { ...explicitExtraBody };
  const { imageUrls } = extractImageInputs(body);
  if (imageUrls.length > 0) extraBody.image = imageUrls;
  if (body.response_format !== undefined) extraBody.response_format = body.response_format;
  if (Object.keys(extraBody).length > 0) upstreamBody.extra_body = extraBody;

  return upstreamBody;
}

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
  const upstreamBody: Record<string, unknown> =
    providerConfig.format === "agnes-image"
      ? buildAgnesImageRequestBody(model, body)
      : {
          model,
          prompt: body.prompt,
        };

  if (providerConfig.format !== "agnes-image") {
    // Pass optional parameters for ordinary OpenAI-compatible providers.
    if (body.n !== undefined) upstreamBody.n = body.n;
    if (body.size !== undefined) upstreamBody.size = body.size;
    if (body.quality !== undefined) upstreamBody.quality = body.quality;
    if (body.response_format !== undefined) upstreamBody.response_format = body.response_format;
    if (body.style !== undefined) upstreamBody.style = body.style;

    const { imageUrl } = extractImageInputs(body);
    if (imageUrl && OPENAI_IMAGE_TO_IMAGE_MODELS.has(model)) {
      upstreamBody.image_url = imageUrl;
    }
  }

  // Build headers
  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = credentials.apiKey || credentials.accessToken;
  if (token && providerConfig.authHeader === "bearer") {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (token && providerConfig.authHeader === "x-api-key") {
    headers["x-api-key"] = token;
  }

  // #8085 — keyless Pollinations image requests (the common free case) get
  // no Authorization header above. Mirror the chat executor's anonymous
  // fingerprint-pool fallback (open-sse/executors/pollinations.ts) so the
  // outbound request isn't sent bare and rejected by Pollinations' own 401.
  let pollinationsAnonSession: Awaited<
    ReturnType<typeof applyPollinationsAnonymousFallback>
  >["session"] = null;
  if (providerConfig.id === "pollinations") {
    const anon = await applyPollinationsAnonymousFallback(providerConfig.id, token, headers);
    headers = anon.headers;
    pollinationsAnonSession = anon.session;
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

  if (pollinationsAnonSession) {
    reportPollinationsAnonOutcome(pollinationsAnonSession, result.status);
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
 * OpenAI-compatible image *edit* forwarder for custom providers (#3214 / #3215).
 *
 * Mirrors `handleOpenAIImageGeneration` but posts multipart/form-data to the node's
 * `/images/edits` endpoint and returns the upstream OpenAI-compatible response. Kept
 * separate from provider-specific hosted-tool flows. The fetch helper leaves Content-Type unset so
 * `fetch` derives the multipart boundary from the FormData body.
 */
export async function handleOpenAIImageEdit({
  model,
  provider,
  credentials,
  prompt,
  imageBytes,
  imageMime,
  size,
  responseFormat,
  n = 1,
  log,
}: {
  model: string;
  provider: string;
  credentials:
    | {
        apiKey?: string;
        accessToken?: string;
        baseUrl?: unknown;
        providerSpecificData?: { baseUrl?: unknown } | null;
      }
    | null
    | undefined;
  prompt: string;
  imageBytes: Buffer;
  imageMime?: string | null;
  size?: string | null;
  responseFormat?: string | null;
  n?: number;
  log?: { info: (tag: string, message: string) => void } | null;
}) {
  const startTime = Date.now();
  const url = resolveImageBaseUrl(
    credentials,
    `https://generativelanguage.googleapis.com/v1beta/openai/images/edits`,
    "edits"
  );

  // Build the multipart body as a Buffer with an explicit boundary instead of a global
  // `FormData`. In production `globalThis.fetch` is patched with node_modules/undici's fetch,
  // whose `FormData` class differs from `globalThis.FormData` — passing a native FormData
  // makes undici serialize it as the string "[object FormData]" (text/plain), dropping every
  // field (including `model`, which reaches the upstream empty). A Buffer body is accepted
  // verbatim by any fetch implementation. (#3273)
  const boundary = `----OmniRouteImageEdit${randomUUID().replace(/-/g, "")}`;
  const CRLF = "\r\n";
  const partBuffers: Buffer[] = [];
  const appendField = (name: string, value: string) => {
    partBuffers.push(
      Buffer.from(
        `--${boundary}${CRLF}Content-Disposition: form-data; name="${name}"${CRLF}${CRLF}${value}${CRLF}`
      )
    );
  };
  appendField("model", model);
  appendField("prompt", prompt);
  if (size) appendField("size", size);
  if (responseFormat) appendField("response_format", responseFormat);
  appendField("n", String(n || 1));
  partBuffers.push(
    Buffer.from(
      `--${boundary}${CRLF}Content-Disposition: form-data; name="image"; filename="image.png"${CRLF}` +
        `Content-Type: ${imageMime || "image/png"}${CRLF}${CRLF}`
    )
  );
  partBuffers.push(imageBytes);
  partBuffers.push(Buffer.from(`${CRLF}--${boundary}--${CRLF}`));
  const multipartBody = Buffer.concat(partBuffers);

  const headers: Record<string, string> = {
    "Content-Type": `multipart/form-data; boundary=${boundary}`,
  };
  const token = credentials?.apiKey || credentials?.accessToken;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  if (log) {
    log.info(
      "IMAGE",
      `${provider}/${model} (edit) | prompt: "${prompt.slice(0, 60)}..." -> ${url}`
    );
  }

  const result = await fetchImageEndpoint(
    url,
    headers,
    multipartBody as unknown as BodyInit,
    provider,
    log
  );

  saveCallLog({
    method: "POST",
    path: "/v1/images/edits",
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
    requestBody: { model, prompt: prompt.slice(0, 200), size: size || "default", n: n || 1 },
    responseBody: result.success ? { images_count: result.data?.data?.length || 0 } : null,
  }).catch(() => {});

  return result;
}

/**
 * Handle OpenRouter's unified Image API reference-image flow.
 *
 * OpenRouter does not expose `/images/edits`; image-to-image requests use
 * `POST /api/v1/images` with `input_references` containing data-URL images.
 * Keep this separate from the generic multipart `/images/edits` forwarder,
 * whose contract is used by custom OpenAI-compatible nodes (#10197).
 */
export async function handleOpenRouterImageEdit({
  model,
  provider,
  baseUrl,
  credentials,
  prompt,
  imageBytes,
  imageMime,
  size,
  n = 1,
  log,
}: {
  model: string;
  provider: string;
  baseUrl: string;
  credentials:
    | {
        apiKey?: string;
        accessToken?: string;
      }
    | null
    | undefined;
  prompt: string;
  imageBytes: Buffer;
  imageMime?: string | null;
  size?: string | null;
  n?: number;
  log?: { info: (tag: string, message: string) => void } | null;
}) {
  const startTime = Date.now();
  let url = baseUrl.trim();
  while (url.endsWith("/")) url = url.slice(0, -1);
  if (url.endsWith("/images/generations")) {
    url = url.slice(0, -"/images/generations".length) + "/images";
  } else if (!url.endsWith("/images")) {
    url += "/images";
  }

  const mime = imageMime || "image/png";
  const upstreamBody: Record<string, unknown> = {
    model,
    prompt,
    input_references: [
      {
        type: "image_url",
        image_url: {
          url: `data:${mime};base64,${imageBytes.toString("base64")}`,
        },
      },
    ],
    n: n || 1,
  };
  if (size) upstreamBody.size = size;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = credentials?.apiKey || credentials?.accessToken;
  if (token) headers.Authorization = `Bearer ${token}`;

  log?.info(
    "IMAGE",
    `${provider}/${model} (reference edit) | prompt: "${prompt.slice(0, 60)}..." -> ${url}`
  );

  const result = await fetchImageEndpoint(
    url,
    headers,
    JSON.stringify(upstreamBody),
    provider,
    log
  );

  saveCallLog({
    method: "POST",
    path: "/v1/images/edits",
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
    requestBody: { model, prompt: prompt.slice(0, 200), size: size || "default", n: n || 1 },
    responseBody: result.success ? { images_count: result.data?.data?.length || 0 } : null,
  }).catch(() => {});

  return result;
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
  const falModel = model.startsWith("fal-ai/") ? model : `fal-ai/${model}`;
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
    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}/${falModel}`, {
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
    const images = await normalizeProviderImagePayload(payload, body, log, "b64_json");
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

    const images = await normalizeProviderImagePayload(payload, body, log, "b64_json");
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

    const images = await normalizeProviderImagePayload(finalPayload, body, log, "url");
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
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
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
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
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

export function normalizeRequestedImageFormat(
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

export function mapFalImageSize(size, fallback = "square_hd") {
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

export async function normalizeProviderImagePayload(payload, body, log, defaultFormat) {
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
    const item = await normalizeProviderImageCandidate(candidate, body, defaultFormat);
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

async function normalizeProviderImageCandidate(candidate, body, defaultFormat) {
  const wantsBase64 = body?.response_format === "b64_json" || defaultFormat === "b64_json";
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
 * Codex image generation — translate GPT-Image-style /v1/images/generations
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
// for `quality`. Legacy image clients often send "standard" / "hd". Map those values
// so OpenWebUI's quality dropdown doesn't silently get rejected upstream.
function mapLegacyImageQualityToImageTool(value: string): string {
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
  referenceImages = [],
  signal = null,
  logPath = "/v1/images/generations",
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
      path: logPath,
    });
  }

  const requestedCount =
    Number.isInteger(body.n) && (body.n as number) > 0 ? (body.n as number) : 1;
  if (log && requestedCount > 1) {
    log.warn(
      "IMAGE",
      `Codex hosted image_generation returns one image per call; requested n=${requestedCount} will fan out in parallel`
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
      path: logPath,
    });
  }

  if (isCodexFreePlan(credentials?.providerSpecificData)) {
    return saveImageErrorResult({
      provider,
      model,
      status: 403,
      startTime,
      error: "Codex image_generation is unavailable on free-plan accounts",
      path: logPath,
      retryable: true,
    });
  }

  const workspaceId =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    !Array.isArray(credentials.providerSpecificData)
      ? (credentials.providerSpecificData as Record<string, unknown>).workspaceId
      : undefined;

  // Forward size/quality from the GPT-Image-style body into the hosted tool so
  // OpenWebUI's size/quality selectors actually take effect. Everything else
  // (model, n, background, moderation, output_compression) is left to the
  // Codex backend's defaults — today that's `gpt-image-2`.
  const toolConfig: Record<string, unknown> = { type: "image_generation", output_format: "png" };
  if (referenceImages.length > 0) toolConfig.action = "edit";
  if (typeof body.size === "string" && body.size.trim()) {
    toolConfig.size = body.size.trim();
  }
  if (typeof body.quality === "string" && body.quality.trim()) {
    toolConfig.quality = mapLegacyImageQualityToImageTool(body.quality.trim());
  }

  const inputContent: Array<Record<string, unknown>> = [{ type: "input_text", text: prompt }];
  for (const image of referenceImages) {
    inputContent.push({
      type: "input_image",
      image_url: `data:${image.mime || "image/png"};base64,${image.bytes.toString("base64")}`,
    });
  }

  const upstreamBody: Record<string, unknown> = {
    model,
    instructions:
      referenceImages.length > 0
        ? `You must call the image_generation tool exactly once to edit the supplied ${referenceImages.length === 1 ? "reference image" : "reference images"}. Treat all supplied images as references for the user's requested composition or style. Do not add narration.`
        : "You must call the image_generation tool exactly once to fulfill the user's request. Do not add narration.",
    input: [
      {
        role: "user",
        content: inputContent,
      },
    ],
    tools: [toolConfig],
    stream: true,
    store: false,
  };
  const requestBodyForLog =
    referenceImages.length > 0
      ? {
          model,
          prompt_chars: prompt.length,
          reference_images: referenceImages.map((image) => ({
            mime: image.mime || "image/png",
            bytes: image.bytes.length,
          })),
          tools: [toolConfig],
          stream: true,
          store: false,
        }
      : upstreamBody;

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
    const promptSummary =
      referenceImages.length > 0 ? `${prompt.length} chars` : `"${prompt.slice(0, 60)}..."`;
    log.info("IMAGE", `${provider}/${model} (codex-responses) | prompt: ${promptSummary}`);
  }

  const fetchOneImage = async () => {
    let response: Response;
    try {
      response = await fetch(providerConfig.baseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(upstreamBody),
        signal,
      });
    } catch (err) {
      const message = sanitizeErrorMessage(err);
      if (log) log.error("IMAGE", `${provider} fetch error: ${message}`);
      return {
        ok: false as const,
        error: {
          provider,
          model,
          status: 502,
          startTime,
          error: `Image provider error: ${message}`,
          requestBody: requestBodyForLog,
          path: logPath,
        },
      };
    }

    if (!response.ok) {
      const errorText = await response.text();
      const safeError = sanitizeImageProviderError(errorText);
      const safeErrorLog =
        typeof safeError === "string" ? safeError : JSON.stringify(safeError ?? {});
      if (log) log.error("IMAGE", `${provider} error ${response.status}: ${safeErrorLog}`);
      const retryable = isCodexChatGptModelAccessError(response.status, errorText, model);
      return {
        ok: false as const,
        error: {
          provider,
          model,
          status: response.status,
          startTime,
          error: safeError,
          requestBody: requestBodyForLog,
          path: logPath,
          ...(retryable ? { retryable: true } : {}),
        },
      };
    }

    const rawSSE = await response.text();
    const items = extractImageGenerationCalls(rawSSE);
    if (items.length === 0) {
      return {
        ok: false as const,
        error: {
          provider,
          model,
          status: 502,
          startTime,
          error:
            "Codex completed without producing an image_generation_call — the model may have declined the tool",
          requestBody: requestBodyForLog,
          path: logPath,
        },
      };
    }

    return { ok: true as const, items };
  };

  const imageResults = await Promise.all(
    Array.from({ length: requestedCount }, () => fetchOneImage())
  );

  const collected: Array<{ b64_json: string; revised_prompt?: string }> = [];
  for (const imageResult of imageResults) {
    if (!imageResult.ok) return saveImageErrorResult(imageResult.error);
    for (const item of imageResult.items) {
      collected.push({
        b64_json: item.b64,
        ...(item.revisedPrompt ? { revised_prompt: item.revisedPrompt } : {}),
      });
    }
  }

  // OpenAI returns b64_json for the gpt-image-* family and reserves `url` for
  // fetchable HTTPS links, so clients that omit response_format (Codex CLI's
  // built-in image_gen among them) expect the bytes in b64_json. Only emit the
  // data: URI when the caller explicitly asks for `url` (#12268).
  const wantsUrl = body.response_format === "url";
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
    requestBody: requestBodyForLog,
    responseBody: { images_count: data.length },
    images: data,
    path: logPath,
  });
}

type CodexImageEditResult =
  | { success: true; data: { created: number; data: Array<Record<string, unknown>> } }
  | { success: false; status: number; error: unknown };

/**
 * Run a stateless Codex reference-image edit through the native Responses hosted tool.
 * This deliberately reuses the text-to-image implementation so OAuth headers, SSE parsing,
 * response formatting, and error handling cannot drift between generations and edits.
 */
export async function handleCodexImageEdit({
  model,
  provider,
  providerConfig,
  body,
  referenceImages,
  credentials,
  log,
  signal = null,
}: {
  model: string;
  provider: string;
  providerConfig: unknown;
  body: Record<string, unknown>;
  referenceImages: Array<{ bytes: Buffer; mime: string }>;
  credentials: unknown;
  log: {
    info: (tag: string, message: string) => void;
    warn: (tag: string, message: string) => void;
    error: (tag: string, message: string) => void;
  } | null;
  signal?: AbortSignal | null;
}): Promise<CodexImageEditResult> {
  const result = await handleCodexImageGeneration({
    model,
    provider,
    providerConfig,
    body: { ...body, n: 1 },
    credentials,
    log,
    referenceImages,
    signal,
    logPath: "/v1/images/edits",
  });
  return result as CodexImageEditResult;
}

export function saveImageSuccessResult({
  provider,
  model,
  startTime,
  requestBody = null,
  responseBody = null,
  created = null,
  images,
  path = "/v1/images/generations",
}) {
  saveCallLog({
    method: "POST",
    path,
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

export function saveImageErrorResult({
  provider,
  model,
  status,
  startTime,
  error,
  requestBody = null,
  path = "/v1/images/generations",
  // #8307: opt-in signal for executeImageWithCredentialFallback — set by a
  // provider handler when the failure is account/session-specific (expired
  // or blocked credentials) rather than a generic request/provider error, so
  // the retry loop tries the next eligible account even when the upstream
  // status isn't a plain 401. Defaults to unset (existing 401-only behavior
  // for every other provider is unchanged).
  retryable = undefined,
}: {
  provider: string;
  model: string;
  status: number;
  startTime: number;
  error: unknown;
  requestBody?: unknown;
  path?: string;
  retryable?: boolean;
}) {
  saveCallLog({
    method: "POST",
    path,
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
    ...(retryable !== undefined ? { retryable } : {}),
  };
}

/**
 * Fetch a single image endpoint and normalize response
 */
async function fetchImageEndpoint(url, headers, body, provider, log) {
  try {
    let response;
    try {
      response = await fetchWithTimeout(url, {
        method: "POST",
        headers,
        body,
        timeoutMs: getConfiguredTimeout(),
      });
    } catch (err: unknown) {
      const isAbortError =
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        (err as { name?: unknown }).name === "AbortError";
      if (err instanceof FetchTimeoutError || isAbortError) {
        const message = err instanceof Error ? err.message : String(err);
        if (log) {
          log.error("IMAGE", `${provider} fetch error: ${message}`);
        }
        return {
          success: false,
          status: 504,
          error: `Image provider error: ${sanitizeErrorMessage(message || err)}`,
        };
      }
      throw err;
    }

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (log) {
      log.error("IMAGE", `${provider} fetch error: ${message}`);
    }
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage(message || err)}`,
    };
  }
}

/**
 * Handle Hyperbolic image generation
 * Uses { model_name, prompt, height, width } and returns { images: [{ image: base64 }] }
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

/**
 * Handle SD WebUI image generation (local, no auth)
 * POST {baseUrl} with { prompt, negative_prompt, width, height, steps }
 * Response: { images: ["base64..."] }
 */
