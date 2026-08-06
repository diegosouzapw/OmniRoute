// Adobe Firefly (unofficial) image-generation handler.
// Family: adobe-firefly-image | Provider: adobe-firefly
//
// Credentials: IMS access_token (JWT, client_id clio-playground-web) or full
// Cookie header from firefly.adobe.com. Cookie → IMS check/v6/token with
// client_id clio-playground-web (Express projectx_webapp fallback).
//
// Reference images (Media page / OpenAI edit aliases):
//   1) POST raw bytes → firefly-3p /v2/storage/image → { images:[{ id }] }
//   2) generate-async with referenceBlobs:[{ id, usage:"general"|"subject" }]
// See web_providers/adobe_atach_images.txt for live captures.

import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../../imageGeneration.ts";
import {
  AdobeFireflyError,
  adobeFireflyGenerateImage,
  resolveAdobeSourceImageIds,
  resolveAdobeImageModel,
} from "../../../services/adobeFireflyClient.ts";
import { ensureAdobeFireflySession } from "../../../services/adobeFireflySession.ts";

function normalizePositiveNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export async function handleAdobeFireflyImageGeneration({
  model,
  provider,
  body,
  credentials,
  log,
  fetchImpl = fetch,
}: {
  model: string;
  provider: string;
  providerConfig?: { baseUrl?: string };
  body: {
    prompt?: unknown;
    size?: unknown;
    aspect_ratio?: unknown;
    aspectRatio?: unknown;
    quality?: unknown;
    seed?: unknown;
    negative_prompt?: unknown;
    timeout_ms?: unknown;
    image?: unknown;
    image_url?: unknown;
    image_urls?: unknown;
    images?: unknown;
    [key: string]: unknown;
  };
  credentials: {
    apiKey?: string;
    accessToken?: string;
    connectionId?: string;
    providerSpecificData?: {
      cookie?: unknown;
      access_token?: unknown;
      accessToken?: unknown;
      browserSessionKey?: unknown;
    } | null;
  };
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
  fetchImpl?: typeof fetch;
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "Prompt is required for Adobe Firefly image generation",
    });
  }

  try {
    // Durable session: JWT + Cookie once → auto-rebuild ARP from forter/arkose,
    // cache, optional Playwright warm-up. Submit path rotates ARP on 408.
    const session = await ensureAdobeFireflySession({
      credentials,
      fetchImpl,
      log,
    });
    const accessToken = session.accessToken;
    const sessionCookie = session.cookie || undefined;
    const arpSessionId = session.arpSessionId;
    const timeoutMs = normalizePositiveNumber(body.timeout_ms, 180_000);
    const seed =
      typeof body.seed === "number"
        ? body.seed
        : typeof body.seed === "string" && body.seed.trim()
          ? Number(body.seed)
          : undefined;

    // Cap uploads by model family (matches MediaViewModel GetSourceImageLimit).
    const { id: resolvedId } = resolveAdobeImageModel(model);
    const maxRefs = resolvedId.includes("nano-banana") || resolvedId.includes("gpt-image") ? 4 : 2;

    const sourceImageIds = await resolveAdobeSourceImageIds({
      accessToken,
      body,
      max: maxRefs,
      sessionCookie,
      arpSessionId,
      prompt,
      fetchImpl,
      log,
    });

    log?.info?.(
      "IMAGE",
      `${provider}/${model} (adobe-firefly) | prompt: "${prompt.slice(0, 60)}${prompt.length > 60 ? "..." : ""}"` +
        (sourceImageIds.length ? ` | refs: ${sourceImageIds.length}` : "") +
        ` | session=${session.source}`
    );

    const result = await adobeFireflyGenerateImage({
      accessToken,
      prompt,
      model,
      size: body.size,
      aspectRatio: body.aspect_ratio ?? body.aspectRatio ?? body.size,
      quality: body.quality,
      seed: Number.isFinite(seed as number) ? (seed as number) : undefined,
      negativePrompt: typeof body.negative_prompt === "string" ? body.negative_prompt : undefined,
      sourceImageIds: sourceImageIds.length ? sourceImageIds : undefined,
      sessionCookie,
      arpSessionId,
      sessionFingerprint: session.fingerprint,
      sessionBrowserKey: session.browserSessionKey,
      timeoutMs,
      fetchImpl,
      log,
    });

    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      images: [{ url: result.url }],
    });
  } catch (err) {
    if (err instanceof AdobeFireflyError) {
      log?.error?.("IMAGE", `${provider} adobe-firefly error ${err.status}: ${err.message}`);
      return saveImageErrorResult({
        provider,
        model,
        status: err.status,
        startTime,
        error: err.message,
      });
    }
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    log?.error?.("IMAGE", `${provider} adobe-firefly exception: ${errorText}`);
    return saveImageErrorResult({
      provider,
      model,
      status: 500,
      startTime,
      error: errorText,
    });
  }
}
