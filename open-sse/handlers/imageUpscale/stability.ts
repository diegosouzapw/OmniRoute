/**
 * Stability AI upscale handler — `/v2beta/stable-image/upscale/{fast,conservative,creative}`.
 *
 * Wire contract (platform.stability.ai):
 *   - all three take multipart/form-data with an `image` part
 *   - `Accept: application/json` → `{ image: <base64>, finish_reason, seed }`
 *   - `fast`         : no prompt, fixed 4x
 *   - `conservative` : prompt REQUIRED, `creativity` 0.2-0.5 (default 0.35), synchronous
 *   - `creative`     : prompt REQUIRED, `creativity` 0-0.35 (default 0.3), **async** —
 *                      responds `{ id }`, then `GET /v2beta/results/{id}` returns 202 while
 *                      running and 200 with the base64 image when finished.
 *
 * The generation handler's stability path does not poll, so the async `creative`
 * variant is implemented here rather than delegated.
 */

import {
  buildUpscaleImageEntry,
  extractUpscaleSourceImage,
  resolveUpscaleImageSource,
  saveUpscaleErrorResult,
  saveUpscaleSuccessResult,
  toBlobBytes,
  type UpscaleCredentials,
  type UpscaleHandlerResult,
  type UpscaleLogger,
} from "./shared.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

const UPSCALE_ENDPOINTS: Record<string, string> = {
  fast: "/v2beta/stable-image/upscale/fast",
  conservative: "/v2beta/stable-image/upscale/conservative",
  creative: "/v2beta/stable-image/upscale/creative",
};

/** Documented `creativity` range per model — a 0-100 % request is mapped into it. */
const CREATIVITY_RANGES: Record<string, { min: number; max: number; fallback: number }> = {
  conservative: { min: 0.2, max: 0.5, fallback: 0.35 },
  creative: { min: 0, max: 0.35, fallback: 0.3 },
};

/** Models whose upstream rejects a request without a prompt. */
const PROMPT_REQUIRED = new Set(["conservative", "creative"]);

/** `creative` is an async job. */
const ASYNC_MODELS = new Set(["creative"]);

const RESULT_POLL_INTERVAL_MS = 3000;
const DEFAULT_RESULT_TIMEOUT_MS = 300_000;
const ALLOWED_OUTPUT_FORMATS = ["png", "jpeg", "webp"];

export async function handleStabilityImageUpscale({
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
  const endpoint = UPSCALE_ENDPOINTS[model];
  if (!endpoint) {
    return saveUpscaleErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: `Unsupported Stability AI upscale model: ${model}. Use fast, conservative or creative.`,
    });
  }

  const token = credentials.apiKey || credentials.accessToken;
  if (!token) {
    return saveUpscaleErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "Missing Stability AI API key",
    });
  }

  const source = extractUpscaleSourceImage(body);
  if (!source) {
    return saveUpscaleErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: `Stability AI upscale model ${model} requires a source image`,
    });
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (PROMPT_REQUIRED.has(model) && !prompt) {
    return saveUpscaleErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error:
        `Stability AI "${model}" upscale requires a prompt describing the image. ` +
        `Use the "fast" model for a prompt-free 4x upscale.`,
    });
  }

  const outputFormat = normalizeOutputFormat(body.output_format ?? body.format);
  const creativity = CREATIVITY_RANGES[model]
    ? mapCreativity(body, CREATIVITY_RANGES[model]!)
    : null;

  const requestSummary: Record<string, unknown> = { model, output_format: outputFormat };
  if (prompt) requestSummary.prompt = prompt;
  if (creativity !== null) requestSummary.creativity = creativity;

  try {
    const imageSource = await resolveUpscaleImageSource(source);

    const formData = new FormData();
    formData.append(
      "image",
      new Blob([toBlobBytes(imageSource.buffer)], { type: imageSource.contentType || "image/png" }),
      "image"
    );
    formData.append("output_format", outputFormat);
    if (prompt) formData.append("prompt", prompt);
    if (typeof body.negative_prompt === "string" && body.negative_prompt.trim()) {
      formData.append("negative_prompt", body.negative_prompt.trim());
    }
    if (creativity !== null) formData.append("creativity", String(creativity));
    if (body.seed !== undefined && body.seed !== null && String(body.seed).trim()) {
      formData.append("seed", String(body.seed));
    }
    if (typeof body.style_preset === "string" && body.style_preset.trim()) {
      formData.append("style_preset", body.style_preset.trim());
    }

    log?.info?.(
      "IMAGE",
      `${provider}/${model} (stability upscale)` +
        (creativity !== null ? ` | creativity=${creativity}` : "") +
        ` | output=${outputFormat}`
    );

    const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
    const response = await fetchImpl(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      log?.error?.(
        "IMAGE",
        `${provider} stability upscale error ${response.status}: ${errorText.slice(0, 200)}`
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

    const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;

    let finalPayload = payload;
    if (ASYNC_MODELS.has(model) && typeof payload.id === "string" && payload.id) {
      finalPayload = await pollStabilityResult({
        baseUrl,
        token,
        id: payload.id,
        timeoutMs: normalizePositiveNumber(body.timeout_ms, DEFAULT_RESULT_TIMEOUT_MS),
        fetchImpl,
        log,
      });
    }

    const finishReason = String(finalPayload.finish_reason ?? "").toUpperCase();
    if (finishReason === "CONTENT_FILTERED") {
      return saveUpscaleErrorResult({
        provider,
        model,
        status: 400,
        startTime,
        error: "Stability AI filtered the upscale result (CONTENT_FILTERED)",
        requestBody: requestSummary,
      });
    }

    const base64 = typeof finalPayload.image === "string" ? finalPayload.image : "";
    if (!base64) {
      return saveUpscaleErrorResult({
        provider,
        model,
        status: 502,
        startTime,
        error: "Stability AI upscale returned no image",
        requestBody: requestSummary,
      });
    }

    const buffer = Buffer.from(base64, "base64");
    return saveUpscaleSuccessResult({
      provider,
      model,
      startTime,
      requestBody: requestSummary,
      images: [
        buildUpscaleImageEntry({
          buffer,
          contentType: `image/${outputFormat === "jpeg" ? "jpeg" : outputFormat}`,
          responseFormat: body.response_format,
        }),
      ],
      meta: {
        provider,
        model,
        factor: 4,
        ...(creativity !== null ? { creativity } : {}),
        ...(finalPayload.seed !== undefined ? { seed: finalPayload.seed } : {}),
      },
    });
  } catch (err) {
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    log?.error?.("IMAGE", `${provider} stability upscale exception: ${errorText}`);
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

/** Poll `GET /v2beta/results/{id}` until the async creative upscale finishes. */
async function pollStabilityResult(opts: {
  baseUrl: string;
  token: string;
  id: string;
  timeoutMs: number;
  fetchImpl: typeof fetch;
  log?: UpscaleLogger;
}): Promise<Record<string, unknown>> {
  const deadline = Date.now() + opts.timeoutMs;
  let attempt = 0;

  while (Date.now() < deadline) {
    attempt += 1;
    const response = await opts.fetchImpl(
      `${opts.baseUrl}/v2beta/results/${encodeURIComponent(opts.id)}`,
      {
        method: "GET",
        headers: { Accept: "application/json", Authorization: `Bearer ${opts.token}` },
      }
    );

    if (response.status === 202) {
      opts.log?.info?.("IMAGE", `stability creative upscale pending #${attempt}`);
      await sleep(RESULT_POLL_INTERVAL_MS);
      continue;
    }

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      if (response.status === 429 || response.status >= 500) {
        await sleep(RESULT_POLL_INTERVAL_MS);
        continue;
      }
      throw new Error(
        `Stability AI upscale result failed (${response.status}): ${text.slice(0, 300)}`
      );
    }

    return (await response.json().catch(() => ({}))) as Record<string, unknown>;
  }

  throw new Error("Stability AI creative upscale timed out");
}

function normalizeOutputFormat(value: unknown): string {
  const raw = String(value ?? "").trim().toLowerCase();
  if (raw === "jpg") return "jpeg";
  return ALLOWED_OUTPUT_FORMATS.includes(raw) ? raw : "png";
}

/**
 * Map the API's 0-100 % creativity onto the model's documented float range.
 * An explicit in-range float (`creativity: 0.4`) is passed through untouched so
 * power users keep exact control.
 */
function mapCreativity(
  body: Record<string, unknown>,
  range: { min: number; max: number; fallback: number }
): number {
  const raw = body.creativity ?? body.creativity_percent ?? body.creativityPercent;
  if (raw === undefined || raw === null || String(raw).trim() === "") return range.fallback;

  const n = typeof raw === "number" ? raw : Number(String(raw).replace("%", "").trim());
  if (!Number.isFinite(n)) return range.fallback;

  // Values that already look like a native Stability creativity float (< 1 and not a
  // whole percent) are honored as-is, clamped to the documented range.
  if (n > 0 && n < 1) return round2(Math.max(range.min, Math.min(range.max, n)));

  const percent = Math.max(0, Math.min(100, n));
  return round2(range.min + ((range.max - range.min) * percent) / 100);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function normalizePositiveNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
