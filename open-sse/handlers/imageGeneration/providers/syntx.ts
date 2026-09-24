/**
 * SYNTX.ai (unofficial) image generation — POST /api/v1/design/generate.
 *
 * Chat completions stay on SyntxExecutor. This handler only serves
 * /v1/images/generations and /v1/images/edits.
 */
import { saveImageErrorResult, saveImageSuccessResult } from "../../imageGeneration.ts";
import {
  SyntxMediaError,
  fetchSyntxMediaBytes,
  firstMediaUrl,
  mapSyntxImageRequestSettings,
  resolveSyntxMediaTarget,
  resolveSyntxToken,
  runSyntxImageGeneration,
  uploadSyntxMediaFile,
} from "../../../services/syntxMedia.ts";
import { looksLikeJwt } from "../../../services/syntxAuth.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

type ImageBody = Record<string, unknown> & {
  prompt?: unknown;
  n?: unknown;
  size?: unknown;
  quality?: unknown;
  resolution?: unknown;
  aspect_ratio?: unknown;
  image?: unknown;
  image_url?: unknown;
  image_urls?: unknown;
  images?: unknown;
  response_format?: unknown;
  timeout_ms?: unknown;
};

function collectStringUrls(value: unknown, into: string[]): void {
  if (typeof value === "string" && value.trim()) {
    into.push(value.trim());
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStringUrls(item, into);
  }
}

function extractReferenceImages(body: ImageBody): string[] {
  const urls: string[] = [];
  collectStringUrls(body.image_url, urls);
  collectStringUrls(body.image_urls, urls);
  collectStringUrls(body.image, urls);
  collectStringUrls(body.images, urls);
  return [...new Set(urls)];
}

function decodeDataUrl(dataUrl: string): { bytes: Uint8Array; mime: string; name: string } | null {
  const match = /^data:([^;,]+);base64,(.+)$/i.exec(dataUrl.trim());
  if (!match) return null;
  try {
    const mime = match[1] || "image/png";
    const bytes = Buffer.from(match[2], "base64");
    const ext = mime.includes("jpeg") || mime.includes("jpg") ? "jpg" : mime.includes("webp") ? "webp" : "png";
    return { bytes, mime, name: `reference.${ext}` };
  } catch {
    return null;
  }
}

export async function handleSyntxImageGeneration({
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
  body: ImageBody;
  credentials: {
    apiKey?: string;
    accessToken?: string;
    providerSpecificData?: unknown;
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
      error: "Prompt is required for SYNTX image generation",
    });
  }

  const token = resolveSyntxToken({
    apiKey: credentials?.apiKey,
    accessToken: credentials?.accessToken,
    providerSpecificData: credentials?.providerSpecificData,
  });
  if (!looksLikeJwt(token)) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "Missing SYNTX JWT — paste the Authorization Bearer token from syntx.ai",
    });
  }

  try {
    const references = extractReferenceImages(body);
    const uploaded: string[] = [];
    for (const ref of references) {
      if (ref.startsWith("https://r2.syntx.ai/")) {
        uploaded.push(ref);
        continue;
      }
      if (ref.startsWith("data:")) {
        const decoded = decodeDataUrl(ref);
        if (!decoded) continue;
        const url = await uploadSyntxMediaFile({
          token,
          bytes: decoded.bytes,
          filename: decoded.name,
          mimeType: decoded.mime,
          fetchImpl,
        });
        if (url) uploaded.push(url);
        continue;
      }
      if (/^https?:\/\//i.test(ref)) uploaded.push(ref);
    }

    const { aiName, modelType } = resolveSyntxMediaTarget(model, "image");
    const settings = mapSyntxImageRequestSettings(aiName, modelType, body as Record<string, unknown>);
    if (uploaded.length > 0) settings.image_url = uploaded;

    const timeoutMs = typeof body.timeout_ms === "number" ? body.timeout_ms : undefined;
    const result = await runSyntxImageGeneration({
      token,
      model,
      prompt,
      settings,
      timeoutMs,
      fetchImpl,
    });
    const urls = result.media.map((item) => item.url).filter(Boolean);
    if (urls.length === 0) {
      const fallback = firstMediaUrl(result, "image");
      if (!fallback) {
        return saveImageErrorResult({
          provider,
          model,
          status: 502,
          startTime,
          error: "SYNTX image generation completed without an image URL",
        });
      }
      urls.push(fallback);
    }

    const wantsBase64 = String(body.response_format || "").toLowerCase() === "b64_json";
    const images: Array<Record<string, unknown>> = [];
    for (const url of urls) {
      if (wantsBase64) {
        const fetched = await fetchSyntxMediaBytes(url, fetchImpl);
        images.push({ b64_json: fetched.bytes.toString("base64") });
      } else {
        images.push({ url });
      }
    }

    log?.info?.("IMAGE", `SYNTX generated ${images.length} image(s) via ${model}`);
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      images,
    });
  } catch (error) {
    const status = error instanceof SyntxMediaError ? error.status : 502;
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : error);
    log?.error?.("IMAGE", `SYNTX image generation failed: ${message}`);
    return saveImageErrorResult({
      provider,
      model,
      status,
      startTime,
      error: message || "SYNTX image generation failed",
    });
  }
}
