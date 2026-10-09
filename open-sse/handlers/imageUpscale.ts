/**
 * Image Upscale Handler
 *
 * Handles `POST /v1/images/upscale` — image→image super-resolution.
 *
 * Request (OpenAI-adjacent, deliberately minimal):
 * {
 *   "model": "adobe-firefly/topaz-bloom",
 *   "image": "data:image/png;base64,...",   // or image_url / http(s) URL
 *   "factor": 2,                            // 2 | 4 (snapped to what the model supports)
 *   "creativity": 40,                       // 0-100 % (generative upscalers only)
 *   "prompt": "…",                          // required by Stability conservative/creative
 *   "response_format": "url" | "b64_json"
 * }
 *
 * Response is shaped like `/v1/images/generations` (`{ created, data: [{ url | b64_json }] }`)
 * plus an `upscale` metadata block, so existing image clients need no changes.
 */

import { getUpscaleProvider, parseUpscaleModel } from "../config/upscaleRegistry.ts";
import { handleAdobeFireflyImageUpscale } from "./imageUpscale/adobeFirefly.ts";
import { handleStabilityImageUpscale } from "./imageUpscale/stability.ts";
import { handleTopazImageUpscale } from "./imageUpscale/topaz.ts";
import { handleSyntxImageUpscale } from "./imageUpscale/syntx.ts";
import type {
  UpscaleCredentials,
  UpscaleHandlerResult,
  UpscaleLogger,
} from "./imageUpscale/shared.ts";

export type { UpscaleHandlerResult } from "./imageUpscale/shared.ts";

export async function handleImageUpscale({
  body,
  credentials,
  log,
  fetchImpl,
}: {
  body: Record<string, unknown>;
  credentials: UpscaleCredentials | null;
  log?: UpscaleLogger;
  fetchImpl?: typeof fetch;
}): Promise<UpscaleHandlerResult> {
  const requestedModel = typeof body.model === "string" ? body.model : "";
  const { provider, model } = parseUpscaleModel(requestedModel);

  if (!provider || !model) {
    return {
      success: false,
      status: 400,
      error:
        `Invalid upscale model: ${requestedModel || "(missing)"}. ` +
        `Use format: provider/model (e.g. adobe-firefly/topaz-bloom).`,
    };
  }

  const providerConfig = getUpscaleProvider(provider);
  if (!providerConfig) {
    return { success: false, status: 400, error: `Unknown upscale provider: ${provider}` };
  }

  if (!providerConfig.models.some((entry) => entry.id === model)) {
    return {
      success: false,
      status: 400,
      error:
        `Unsupported upscale model for ${provider}: ${model}. ` +
        `Available: ${providerConfig.models.map((entry) => entry.id).join(", ")}.`,
    };
  }

  const resolvedCredentials = credentials ?? {};
  const args = {
    model,
    provider,
    providerConfig,
    body,
    credentials: resolvedCredentials,
    log,
    ...(fetchImpl ? { fetchImpl } : {}),
  };
  return dispatchUpscaleFormat(providerConfig.format, args);
}

function dispatchUpscaleFormat(
  format: string,
  args: {
    model: string;
    provider: string;
    providerConfig: NonNullable<ReturnType<typeof getUpscaleProvider>>;
    body: Record<string, unknown>;
    credentials: UpscaleCredentials;
    log?: UpscaleLogger;
    fetchImpl?: typeof fetch;
  }
): Promise<UpscaleHandlerResult> {
  if (format === "adobe-firefly-upscale") return handleAdobeFireflyImageUpscale(args);
  if (format === "stability-upscale") return handleStabilityImageUpscale(args);
  if (format === "topaz-upscale") return handleTopazImageUpscale(args);
  if (format === "syntx-upscale") return handleSyntxImageUpscale(args);
  return Promise.resolve({
    success: false,
    status: 400,
    error: `Upscale is not implemented for provider format: ${format}`,
  });
}
