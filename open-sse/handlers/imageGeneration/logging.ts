
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

import { saveCallLog } from "@/lib/usageDb";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";




export function saveImageSuccessResult({
  provider,
  model,
  startTime,
  requestBody = null,
  responseBody = null,
  created = null,
  images,
}) {
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
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



export function saveImageErrorResult({ provider, model, status, startTime, error, requestBody = null }) {
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
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
  };
}

