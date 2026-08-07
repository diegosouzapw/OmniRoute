/**
 * Topaz Labs upscale handler — native Image API `POST /image/v1/enhance`.
 *
 * Wire contract (docs.topazlabs.com Image API v1):
 *   headers: X-API-Key: <key>, accept: image/<format>
 *   multipart/form-data:
 *     image            (required) source bytes
 *     model            (optional) e.g. "Standard V2" / "High Fidelity V2" / "Low Resolution V2"
 *     output_width     (optional) absolute target width
 *     output_height    (optional) absolute target height
 *     output_format    (optional) jpeg | png | webp
 *     sharpen / denoise / fix_compression (optional) 0-1 strengths
 *     face_enhancement (optional) boolean
 *   → raw image bytes of the enhanced result.
 *
 * The endpoint only accepts an ABSOLUTE target size, so a 2x/4x factor is turned into
 * `output_width`/`output_height` by reading the source dimensions out of the container
 * header (`scaleDimensions`). When the dimensions cannot be read the factor is dropped
 * and Topaz's own default upscale applies, rather than failing the request.
 */

import {
  buildUpscaleImageEntry,
  extractUpscaleSourceImage,
  resolveUpscaleImageSource,
  saveUpscaleErrorResult,
  saveUpscaleSuccessResult,
  scaleDimensions,
  sniffImageMime,
  toBlobBytes,
  type UpscaleCredentials,
  type UpscaleHandlerResult,
  type UpscaleLogger,
} from "./shared.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

/** Topaz caps a single output edge well below this; keeps a 4x pass on a huge source sane. */
const MAX_OUTPUT_EDGE = 16000;
const ALLOWED_OUTPUT_FORMATS = ["png", "jpeg", "webp"];

export async function handleTopazImageUpscale({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  fetchImpl = fetch,
}: {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials: UpscaleCredentials;
  log?: UpscaleLogger;
  fetchImpl?: typeof fetch;
}): Promise<UpscaleHandlerResult> {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  if (!token) {
    return saveUpscaleErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "Missing Topaz Labs API key",
    });
  }

  const source = extractUpscaleSourceImage(body);
  if (!source) {
    return saveUpscaleErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: `Topaz Labs upscale model ${model} requires a source image`,
    });
  }

  const factor = normalizeFactor(body);
  const outputFormat = normalizeOutputFormat(body.output_format ?? body.format);
  const requestSummary: Record<string, unknown> = { model, factor, output_format: outputFormat };

  try {
    const imageSource = await resolveUpscaleImageSource(source);

    const formData = new FormData();
    formData.append(
      "image",
      new Blob([toBlobBytes(imageSource.buffer)], { type: imageSource.contentType || "image/png" }),
      "image"
    );
    formData.append("output_format", outputFormat);

    const explicitSize = parseExplicitSize(body.size ?? body.output_size);
    const target = explicitSize ?? scaleDimensions(imageSource.buffer, factor, MAX_OUTPUT_EDGE);
    if (target) {
      formData.append("output_width", String(target.width));
      formData.append("output_height", String(target.height));
      requestSummary.output_width = target.width;
      requestSummary.output_height = target.height;
    } else {
      log?.info?.(
        "IMAGE",
        `${provider}/${model} (topaz upscale) | source dimensions unknown — using Topaz default scale`
      );
    }

    const topazModel = typeof body.topaz_model === "string" ? body.topaz_model.trim() : "";
    if (topazModel) {
      formData.append("model", topazModel);
      requestSummary.topaz_model = topazModel;
    }

    appendUnitFloat(formData, "sharpen", body.sharpen, requestSummary);
    appendUnitFloat(formData, "denoise", body.denoise, requestSummary);
    appendUnitFloat(formData, "fix_compression", body.fix_compression, requestSummary);

    if (body.face_enhancement !== undefined && body.face_enhancement !== null) {
      const enabled = toBoolean(body.face_enhancement);
      formData.append("face_enhancement", enabled ? "true" : "false");
      requestSummary.face_enhancement = enabled;
      // Topaz exposes creativity/strength only when face enhancement is on.
      if (enabled) {
        appendUnitFloat(
          formData,
          "face_enhancement_creativity",
          body.creativity ?? body.face_enhancement_creativity,
          requestSummary,
          /* percentAware */ true
        );
        appendUnitFloat(
          formData,
          "face_enhancement_strength",
          body.face_enhancement_strength,
          requestSummary
        );
      }
    }

    log?.info?.(
      "IMAGE",
      `${provider}/${model} (topaz upscale) | ${factor}x` +
        (target ? ` → ${target.width}x${target.height}` : "") +
        ` | output=${outputFormat}`
    );

    const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
    const response = await fetchImpl(`${baseUrl}/image/v1/enhance`, {
      method: "POST",
      headers: {
        Accept: `image/${outputFormat}`,
        "X-API-Key": token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      log?.error?.(
        "IMAGE",
        `${provider} topaz upscale error ${response.status}: ${errorText.slice(0, 200)}`
      );
      return saveUpscaleErrorResult({
        provider,
        model,
        status: response.status,
        startTime,
        error: errorText || `HTTP ${response.status}`,
        requestBody: requestSummary,
      });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (!buffer.length) {
      return saveUpscaleErrorResult({
        provider,
        model,
        status: 502,
        startTime,
        error: "Topaz Labs upscale returned an empty body",
        requestBody: requestSummary,
      });
    }

    const declared = (response.headers.get("content-type") || "").split(";")[0]!.trim().toLowerCase();
    const contentType = declared.startsWith("image/") ? declared : sniffImageMime(buffer);

    return saveUpscaleSuccessResult({
      provider,
      model,
      startTime,
      requestBody: requestSummary,
      images: [
        buildUpscaleImageEntry({ buffer, contentType, responseFormat: body.response_format }),
      ],
      meta: { provider, model, factor, ...(target ? { width: target.width, height: target.height } : {}) },
    });
  } catch (err) {
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    log?.error?.("IMAGE", `${provider} topaz upscale exception: ${errorText}`);
    return saveUpscaleErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: `Image upscale provider error: ${errorText}`,
      requestBody: requestSummary,
    });
  }
}

function normalizeFactor(body: Record<string, unknown>): number {
  const raw =
    body.factor ??
    body.scale ??
    body.upscale_factor ??
    body.upscaleFactor ??
    body.upsampler_factor ??
    body.upsamplerFactor;
  let n = typeof raw === "number" ? raw : Number(String(raw ?? "").replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return 2;
  return Math.abs(n - 4) < Math.abs(n - 2) ? 4 : 2;
}

function normalizeOutputFormat(value: unknown): string {
  const raw = String(value ?? "").trim().toLowerCase();
  if (raw === "jpg") return "jpeg";
  return ALLOWED_OUTPUT_FORMATS.includes(raw) ? raw : "png";
}

function parseExplicitSize(value: unknown): { width: number; height: number } | null {
  if (typeof value !== "string") return null;
  const match = /^(\d+)\s*[x×]\s*(\d+)$/i.exec(value.trim());
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;
  return {
    width: Math.min(width, MAX_OUTPUT_EDGE),
    height: Math.min(height, MAX_OUTPUT_EDGE),
  };
}

/**
 * Append a 0-1 strength. Percent-aware fields also accept 0-100 (the shared UI
 * creativity slider), which is divided down; anything non-numeric is skipped.
 */
function appendUnitFloat(
  formData: FormData,
  key: string,
  value: unknown,
  summary: Record<string, unknown>,
  percentAware = false
): void {
  if (value === undefined || value === null || String(value).trim() === "") return;
  let n = typeof value === "number" ? value : Number(String(value).replace("%", "").trim());
  if (!Number.isFinite(n)) return;
  if (percentAware && n > 1) n = n / 100;
  n = Math.max(0, Math.min(1, n));
  const rounded = Math.round(n * 100) / 100;
  formData.append(key, String(rounded));
  summary[key] = rounded;
}

function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  const raw = String(value ?? "").trim().toLowerCase();
  return raw === "true" || raw === "1" || raw === "yes" || raw === "on";
}
