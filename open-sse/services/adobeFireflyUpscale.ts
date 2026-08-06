/**
 * Adobe Firefly (unofficial) image **upsample** client — Topaz Labs models.
 *
 * Wire contract from a live firefly.adobe.com capture (web_providers/upsample.txt):
 *
 *   POST https://firefly-3p.ff.adobe.io/v2/3p-images/upsample
 *   headers: Authorization: Bearer <IMS JWT>
 *            x-api-key: clio-playground-web
 *            x-arp-session-id: <sid+ark+ftr>        (NO x-nonce on this endpoint)
 *            content-type: application/json
 *   body: {
 *     "modelId": "topaz",
 *     "modelVersion": "reimagine",
 *     "generationMetadata": { "module": "image-editing", "submodule": "ff-image-editor", ... },
 *     "referenceBlobs": [{ "id": "<storage blob id>", "usage": "general" }],
 *     "upsamplerFactor": 2,
 *     "creativityLevel": 0
 *   }
 *   → 200 { "links": { "cancel": {...}, "result": { "href": ".../jobs/result/<id>" } } }
 *
 * The job link is polled with the same BKS rewrite + status semantics as
 * generate-async, so `pollAdobeJob` from `adobeFireflyClient.ts` is reused verbatim.
 *
 * Model discovery (web_providers/upscale.txt) lists modelId `topaz` with image
 * modelVersions `default` / `standard` / `reimagine`, each carrying
 * `inputMediaUseCase: ["upscaling"]`. `starlight-*` and `astra-2` are the VIDEO
 * upscalers of the same family (`acModelFamilyId: topaz-video`) and are not served
 * by this image endpoint, so they are deliberately absent.
 */

import {
  AdobeFireflyError,
  buildAdobeArpSessionId,
  buildAdobeSubmitHeaders,
  extractAdobeArpSessionId,
  extractAdobeCookieHeader,
  extractAdobeResultLink,
  formatAdobeSystemUnderLoadError,
  isAdobeTransientSubmitError,
  normalizeAdobePollUrl,
  pollAdobeJob,
} from "./adobeFireflyClient.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

export const ADOBE_FIREFLY_IMAGE_UPSAMPLE_URL =
  "https://firefly-3p.ff.adobe.io/v2/3p-images/upsample";

/** Firefly image upscale timeout — Topaz jobs are slower than a 1K generate. */
export const ADOBE_FIREFLY_UPSCALE_TIMEOUT_MS = 300_000;

/** Same submit-retry budget as generate-async (colligo 408 recovery). */
const SUBMIT_MAX_ATTEMPTS = 5;

/**
 * Firefly Topaz upsample wire range for `creativityLevel`.
 *
 * Live colligo on `/v2/3p-images/upsample` rejects values > 1
 * (`less_than_equal`, `le: 1.0`). The browser capture sends `0` (off).
 * Discovery docs mention a 1–5 integer scale for *other* Topaz endpoints —
 * that scale is NOT accepted by upsample, so we stay on 0–1.
 */
export const ADOBE_FIREFLY_MAX_CREATIVITY_LEVEL = 1;

export type AdobeFireflyUpscaleModelId = "topaz" | "topaz-standard" | "topaz-bloom";

export interface AdobeFireflyUpscaleModelSpec {
  upstreamModelId: string;
  upstreamModelVersion: string;
  /** Scale factors accepted for this version. */
  factors: number[];
  /** `creativityLevel` is only meaningful on the generative (reimagine) version. */
  supportsCreativity: boolean;
}

export const ADOBE_FIREFLY_UPSCALE_MODELS: Record<
  AdobeFireflyUpscaleModelId,
  AdobeFireflyUpscaleModelSpec
> = {
  // Bare `topaz` maps to the standard version rather than the discovery-listed
  // "default" alias: both resolve to bksGenerationModel firefly_3p:external:topaz_standard,
  // and pinning the explicit version avoids depending on an alias we have not captured.
  topaz: {
    upstreamModelId: "topaz",
    upstreamModelVersion: "standard",
    factors: [2, 4],
    supportsCreativity: false,
  },
  "topaz-standard": {
    upstreamModelId: "topaz",
    upstreamModelVersion: "standard",
    factors: [2, 4],
    supportsCreativity: false,
  },
  "topaz-bloom": {
    upstreamModelId: "topaz",
    upstreamModelVersion: "reimagine",
    factors: [2, 4],
    supportsCreativity: true,
  },
};

/**
 * Resolve a catalog id (with or without an `adobe-firefly/` prefix) to its upstream
 * modelId/modelVersion pair. Returns null for anything that is not a Firefly image
 * upscaler, so callers can fall through instead of silently upscaling with a default.
 */
export function resolveAdobeUpscaleModel(model: string): {
  id: AdobeFireflyUpscaleModelId;
  spec: AdobeFireflyUpscaleModelSpec;
} | null {
  const raw = String(model || "")
    .trim()
    .toLowerCase()
    .replace(/^adobe-firefly\//, "")
    .replace(/^firefly\//, "");

  if (!raw) return null;
  if (raw in ADOBE_FIREFLY_UPSCALE_MODELS) {
    const id = raw as AdobeFireflyUpscaleModelId;
    return { id, spec: ADOBE_FIREFLY_UPSCALE_MODELS[id] };
  }

  // Accept the upstream version names and common spellings.
  if (raw.includes("bloom") || raw.includes("reimagine")) {
    return { id: "topaz-bloom", spec: ADOBE_FIREFLY_UPSCALE_MODELS["topaz-bloom"] };
  }
  if (raw.includes("topaz")) {
    return { id: "topaz-standard", spec: ADOBE_FIREFLY_UPSCALE_MODELS["topaz-standard"] };
  }
  return null;
}

/** True when the model id names a Firefly image upscaler (used to split the generate path). */
export function isAdobeFireflyUpscaleModel(model: string): boolean {
  return resolveAdobeUpscaleModel(model) !== null;
}

/**
 * Map a 0-100 creativity percentage onto Firefly upsample's `creativityLevel` (0–1 float).
 *
 * Precedence:
 *   1. explicit `creativityLevel` — if in (1, 5] treat as legacy 1–5 integer scale
 *      and map onto 0–1 (`level / 5`); otherwise clamp to 0–1
 *   2. `creativityPercent` 0–100 → 0–1
 *   3. default 0 (browser default / off)
 */
export function resolveAdobeCreativityLevel(opts: {
  creativityPercent?: number | null;
  creativityLevel?: unknown;
}): number {
  const explicit = opts.creativityLevel;
  if (typeof explicit === "number" && Number.isFinite(explicit)) {
    return clampLevel(normalizeExplicitCreativity(explicit));
  }
  if (typeof explicit === "string" && explicit.trim() && Number.isFinite(Number(explicit))) {
    return clampLevel(normalizeExplicitCreativity(Number(explicit)));
  }

  const percent = typeof opts.creativityPercent === "number" && Number.isFinite(opts.creativityPercent)
    ? Math.max(0, Math.min(100, opts.creativityPercent))
    : 0;
  return clampLevel(percent / 100);
}

/** Legacy 1–5 integer scale (discovery docs) → 0–1 wire float. Values already in 0–1 pass through. */
function normalizeExplicitCreativity(value: number): number {
  if (value > ADOBE_FIREFLY_MAX_CREATIVITY_LEVEL && value <= 5) {
    return value / 5;
  }
  return value;
}

/** Clamp to the upsample wire range [0, 1], two decimal places. */
function clampLevel(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const clamped = Math.max(0, Math.min(ADOBE_FIREFLY_MAX_CREATIVITY_LEVEL, value));
  return Math.round(clamped * 100) / 100;
}

/**
 * Headers for the upsample submit.
 *
 * Identical to generate-async EXCEPT `x-nonce`, which the live upsample request does
 * not send (there is no prompt to derive a deterministic nonce from). We mirror the
 * capture exactly rather than adding a header colligo never sees from the SPA.
 */
export function buildAdobeUpsampleHeaders(
  accessToken: string,
  extras?: { arpSessionId?: string; cookie?: string }
): Record<string, string> {
  const headers = buildAdobeSubmitHeaders(accessToken, {
    arpSessionId: extras?.arpSessionId,
    cookie: extras?.cookie,
    prompt: "upsample",
  });
  delete headers["x-nonce"];
  return headers;
}

export function buildAdobeUpsamplePayload(opts: {
  modelSpec: AdobeFireflyUpscaleModelSpec;
  blobId: string;
  upsamplerFactor: number;
  creativityLevel?: number;
}): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    modelId: opts.modelSpec.upstreamModelId,
    modelVersion: opts.modelSpec.upstreamModelVersion,
    generationMetadata: {
      module: "image-editing",
      submodule: "ff-image-editor",
      sourceDocumentId: null,
      originalPrompt: null,
      filterString: null,
      subPrompts: null,
      canvasImageReference: null,
    },
    referenceBlobs: [{ id: String(opts.blobId), usage: "general" }],
    upsamplerFactor: opts.upsamplerFactor,
  };

  // creativityLevel is optional/nullable upstream — only the generative version
  // consumes it, so the standard pass omits it entirely.
  if (opts.modelSpec.supportsCreativity) {
    payload.creativityLevel = Number.isFinite(opts.creativityLevel as number)
      ? (opts.creativityLevel as number)
      : 0;
  }

  return payload;
}

/**
 * Submit + poll a Firefly Topaz upscale job.
 *
 * `blobId` must already be a Firefly storage id — callers upload the source image with
 * `resolveAdobeSourceImageIds`/`uploadAdobeFireflyImage` first, reusing the same ARP so
 * colligo sees one coherent risk session for upload + submit.
 */
export async function adobeFireflyUpscaleImage(opts: {
  accessToken: string;
  model: string;
  blobId: string;
  upsamplerFactor?: unknown;
  creativityPercent?: number;
  creativityLevel?: unknown;
  sessionCookie?: string;
  arpSessionId?: string;
  sessionFingerprint?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
}): Promise<{ url: string; latest: unknown; factor: number; creativityLevel: number }> {
  const fetchImpl = opts.fetchImpl || fetch;
  const resolved = resolveAdobeUpscaleModel(opts.model);
  if (!resolved) {
    throw new AdobeFireflyError(
      `Unsupported Adobe Firefly upscale model: ${opts.model}. ` +
        `Use topaz-standard or topaz-bloom.`,
      400,
      "bad_model"
    );
  }
  const { spec } = resolved;

  const blobId = String(opts.blobId || "").trim();
  if (!blobId) {
    throw new AdobeFireflyError(
      "Adobe Firefly upscale requires a source image",
      400,
      "bad_image"
    );
  }

  const factor = normalizeFactor(opts.upsamplerFactor, spec.factors);
  const creativityLevel = spec.supportsCreativity
    ? resolveAdobeCreativityLevel({
        creativityPercent: opts.creativityPercent ?? null,
        creativityLevel: opts.creativityLevel,
      })
    : 0;

  const payload = buildAdobeUpsamplePayload({
    modelSpec: spec,
    blobId,
    upsamplerFactor: factor,
    creativityLevel,
  });

  const sessionCookie = String(opts.sessionCookie || "").trim();
  const cookieHeader = extractAdobeCookieHeader(sessionCookie);
  const browserArp = extractAdobeArpSessionId(cookieHeader || sessionCookie);
  const hadBrowserArp = Boolean(browserArp);
  let arpSessionId =
    (opts.arpSessionId && String(opts.arpSessionId).trim()) ||
    browserArp ||
    buildAdobeArpSessionId();
  const accessToken = opts.accessToken;
  let submitData: unknown = {};
  let submitHeaders: Headers | Record<string, string | null | undefined> = new Headers();
  let lastSubmitError = "";
  let sawSystemUnderLoad = false;
  let submitted = false;

  for (let attempt = 1; attempt <= SUBMIT_MAX_ATTEMPTS; attempt++) {
    const submitResp = await fetchImpl(ADOBE_FIREFLY_IMAGE_UPSAMPLE_URL, {
      method: "POST",
      headers: buildAdobeUpsampleHeaders(accessToken, {
        arpSessionId,
        cookie: cookieHeader || undefined,
      }),
      body: JSON.stringify(payload),
    });

    if (submitResp.status === 401 || submitResp.status === 403) {
      if ((submitResp.headers.get("x-access-error") || "") === "taste_exhausted") {
        throw new AdobeFireflyError(
          "Adobe Firefly quota exhausted for this account",
          429,
          "quota_exhausted"
        );
      }
      throw new AdobeFireflyError(
        "Adobe Firefly token invalid or expired. Paste a fresh IMS JWT (Authorization: Bearer on " +
          "firefly-3p) plus the firefly.adobe.com Cookie once.",
        401,
        "auth"
      );
    }

    if (!submitResp.ok) {
      const text = await submitResp.text().catch(() => "");
      if (isAdobeTransientSubmitError(submitResp.status, text)) sawSystemUnderLoad = true;
      lastSubmitError =
        `Adobe Firefly image upscale submit failed (${submitResp.status}): ` +
        sanitizeErrorMessage(text.slice(0, 300));

      if (isAdobeTransientSubmitError(submitResp.status, text) && attempt < SUBMIT_MAX_ATTEMPTS) {
        // Rotate synthetic ARP on transient 408; real browser ARP is reused as-is.
        if (!hadBrowserArp) {
          arpSessionId = buildAdobeArpSessionId();
        }
        const delay = submitRetryDelayMs(attempt);
        opts.log?.info?.(
          "ADOBE-FIREFLY",
          `upscale submit transient ${submitResp.status}, retry ${attempt}/${SUBMIT_MAX_ATTEMPTS} in ${delay}ms`
        );
        await sleep(delay);
        continue;
      }

      if (sawSystemUnderLoad && isAdobeTransientSubmitError(submitResp.status, text)) {
        throw new AdobeFireflyError(
          formatAdobeSystemUnderLoadError("image", attempt),
          408,
          "system_under_load"
        );
      }
      throw new AdobeFireflyError(
        lastSubmitError,
        submitResp.status >= 400 && submitResp.status < 500 ? submitResp.status : 502
      );
    }

    submitData = await submitResp.json().catch(() => ({}));
    submitHeaders = submitResp.headers;
    submitted = true;
    break;
  }

  if (!submitted) {
    throw new AdobeFireflyError(
      lastSubmitError || "Adobe Firefly upscale submit failed after retries",
      502
    );
  }

  let pollUrl = extractAdobeResultLink(submitHeaders, submitData);
  if (!pollUrl) {
    if (sawSystemUnderLoad) {
      throw new AdobeFireflyError(
        formatAdobeSystemUnderLoadError("image", SUBMIT_MAX_ATTEMPTS),
        408,
        "system_under_load"
      );
    }
    throw new AdobeFireflyError(
      lastSubmitError || "Adobe Firefly upscale submit succeeded but no poll URL was returned",
      502
    );
  }
  pollUrl = normalizeAdobePollUrl(pollUrl);

  const { mediaUrl, latest } = await pollAdobeJob({
    pollUrl,
    accessToken,
    kind: "image",
    timeoutMs:
      opts.timeoutMs && opts.timeoutMs > 0 ? opts.timeoutMs : ADOBE_FIREFLY_UPSCALE_TIMEOUT_MS,
    fetchImpl,
    log: opts.log,
  });

  return { url: mediaUrl, latest, factor, creativityLevel };
}

function normalizeFactor(value: unknown, allowed: readonly number[]): number {
  const factors = allowed.length > 0 ? [...allowed] : [2, 4];
  let n = typeof value === "number" ? value : Number(String(value ?? "").replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n) || n <= 0) n = 2;
  let best = factors[0]!;
  let bestDelta = Math.abs(best - n);
  for (const f of factors) {
    const delta = Math.abs(f - n);
    if (delta < bestDelta) {
      best = f;
      bestDelta = delta;
    }
  }
  return best;
}

function submitRetryDelayMs(attempt: number): number {
  const raw = process.env.ADOBE_FIREFLY_SUBMIT_BASE_DELAY_MS;
  const base =
    raw != null && raw !== ""
      ? Math.max(0, Number(raw) || 0)
      : process.env.NODE_ENV === "test" || process.env.VITEST || process.env.NODE_TEST_CONTEXT
        ? 20
        : 8000;
  if (base <= 50) return base;
  return Math.min(90_000, base * Math.pow(2, attempt - 1)) + Math.floor(Math.random() * 1500);
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
