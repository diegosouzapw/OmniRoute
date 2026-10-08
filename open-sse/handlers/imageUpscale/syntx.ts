/**
 * SYNTX.ai upscale — Magnific / Topaz AI / Ideogram mode=upscale via design generate.
 */
import {
  SyntxMediaError,
  fetchSyntxMediaBytes,
  firstMediaUrl,
  resolveSyntxToken,
  runSyntxUpscale,
  uploadSyntxMediaFile,
} from "../../services/syntxMedia.ts";
import { looksLikeJwt } from "../../services/syntxAuth.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import {
  extractUpscaleSourceImage,
  saveUpscaleErrorResult,
  saveUpscaleSuccessResult,
  type UpscaleCredentials,
  type UpscaleHandlerResult,
  type UpscaleLogger,
} from "./shared.ts";

function decodeDataUrl(dataUrl: string): { bytes: Uint8Array; mime: string; name: string } | null {
  const match = /^data:([^;,]+);base64,(.+)$/i.exec(dataUrl.trim());
  if (!match) return null;
  try {
    const mime = match[1] || "image/png";
    const bytes = Buffer.from(match[2], "base64");
    return { bytes, mime, name: "source.png" };
  } catch {
    return null;
  }
}

async function resolveUpscaleImageUrl(
  token: string,
  source: string,
  fetchImpl: typeof fetch
): Promise<{ url?: string; error?: string; status?: number }> {
  if (!source.startsWith("data:")) return { url: source };
  const decoded = decodeDataUrl(source);
  if (!decoded) return { error: "Could not decode source image for SYNTX upscale", status: 400 };
  const uploaded = await uploadSyntxMediaFile({
    token,
    bytes: decoded.bytes,
    filename: decoded.name,
    mimeType: decoded.mime,
    fetchImpl,
  });
  if (!uploaded) return { error: "SYNTX rejected the upscale source upload", status: 502 };
  return { url: uploaded };
}

function upscaleSettings(body: Record<string, unknown>): Record<string, unknown> {
  const settings: Record<string, unknown> = {};
  if (typeof body.factor === "number") settings.scale_factor = body.factor;
  if (typeof body.creativity === "number") settings.creativity = body.creativity;
  return settings;
}

async function runSyntxUpscaleJob(options: {
  token: string;
  model: string;
  provider: string;
  body: Record<string, unknown>;
  source: string;
  startTime: number;
  log?: UpscaleLogger;
  fetchImpl: typeof fetch;
}): Promise<UpscaleHandlerResult> {
  const resolved = await resolveUpscaleImageUrl(options.token, options.source, options.fetchImpl);
  if (!resolved.url) {
    return saveUpscaleErrorResult({
      provider: options.provider,
      model: options.model,
      status: resolved.status || 400,
      startTime: options.startTime,
      error: resolved.error || "SYNTX upscale source failed",
    });
  }
  const prompt =
    typeof options.body.prompt === "string" && options.body.prompt.trim()
      ? options.body.prompt.trim()
      : "upscale";
  const result = await runSyntxUpscale({
    token: options.token,
    model: options.model,
    prompt,
    imageUrl: resolved.url,
    settings: upscaleSettings(options.body),
    fetchImpl: options.fetchImpl,
  });
  const url = firstMediaUrl(result, "image") || result.media[0]?.url;
  if (!url) {
    return saveUpscaleErrorResult({
      provider: options.provider,
      model: options.model,
      status: 502,
      startTime: options.startTime,
      error: "SYNTX upscale completed without an image URL",
    });
  }
  const wantsBase64 = String(options.body.response_format || "").toLowerCase() === "b64_json";
  const images = wantsBase64
    ? [{ b64_json: (await fetchSyntxMediaBytes(url, options.fetchImpl)).bytes.toString("base64") }]
    : [{ url }];
  options.log?.info?.("IMAGE", `SYNTX upscaled via ${options.model}`);
  return saveUpscaleSuccessResult({
    provider: options.provider,
    model: options.model,
    startTime: options.startTime,
    images,
    meta: { factor: options.body.factor ?? 2 },
  });
}

export async function handleSyntxImageUpscale({
  model,
  provider,
  body,
  credentials,
  log,
  fetchImpl = fetch,
}: {
  model: string;
  provider: string;
  body: Record<string, unknown>;
  credentials: UpscaleCredentials;
  log?: UpscaleLogger;
  fetchImpl?: typeof fetch;
}): Promise<UpscaleHandlerResult> {
  const startTime = Date.now();
  const token = resolveSyntxToken({
    apiKey: credentials?.apiKey,
    accessToken: credentials?.accessToken,
    providerSpecificData: credentials?.providerSpecificData,
  });
  if (!looksLikeJwt(token)) {
    return saveUpscaleErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "Missing SYNTX JWT — paste the Authorization Bearer token from syntx.ai",
    });
  }
  const source = extractUpscaleSourceImage(body);
  if (!source) {
    return saveUpscaleErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "An input image is required for SYNTX upscale",
    });
  }
  try {
    return await runSyntxUpscaleJob({
      token,
      model,
      provider,
      body,
      source,
      startTime,
      log,
      fetchImpl,
    });
  } catch (error) {
    const status = error instanceof SyntxMediaError ? error.status : 502;
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : error);
    log?.error?.("IMAGE", `SYNTX upscale failed: ${message}`);
    return saveUpscaleErrorResult({
      provider,
      model,
      status,
      startTime,
      error: message || "SYNTX upscale failed",
    });
  }
}
