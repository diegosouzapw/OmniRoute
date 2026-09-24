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
    let imageUrl = source;
    if (source.startsWith("data:")) {
      const decoded = decodeDataUrl(source);
      if (!decoded) {
        return saveUpscaleErrorResult({
          provider,
          model,
          status: 400,
          startTime,
          error: "Could not decode source image for SYNTX upscale",
        });
      }
      const uploaded = await uploadSyntxMediaFile({
        token,
        bytes: decoded.bytes,
        filename: decoded.name,
        mimeType: decoded.mime,
        fetchImpl,
      });
      if (!uploaded) {
        return saveUpscaleErrorResult({
          provider,
          model,
          status: 502,
          startTime,
          error: "SYNTX rejected the upscale source upload",
        });
      }
      imageUrl = uploaded;
    }

    const settings: Record<string, unknown> = {};
    if (typeof body.factor === "number") settings.scale_factor = body.factor;
    if (typeof body.creativity === "number") settings.creativity = body.creativity;
    const prompt = typeof body.prompt === "string" && body.prompt.trim() ? body.prompt.trim() : "upscale";

    const result = await runSyntxUpscale({
      token,
      model,
      prompt,
      imageUrl,
      settings,
      fetchImpl,
    });
    const url = firstMediaUrl(result, "image") || result.media[0]?.url;
    if (!url) {
      return saveUpscaleErrorResult({
        provider,
        model,
        status: 502,
        startTime,
        error: "SYNTX upscale completed without an image URL",
      });
    }

    const wantsBase64 = String(body.response_format || "").toLowerCase() === "b64_json";
    const images = wantsBase64
      ? [{ b64_json: (await fetchSyntxMediaBytes(url, fetchImpl)).bytes.toString("base64") }]
      : [{ url }];

    log?.info?.("IMAGE", `SYNTX upscaled via ${model}`);
    return saveUpscaleSuccessResult({
      provider,
      model,
      startTime,
      images,
      meta: { factor: body.factor ?? 2 },
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
