/**
 * Shared plumbing for the `/v1/images/upscale` provider handlers.
 *
 * Kept separate from `handlers/imageGeneration.ts` on purpose: upscaling needs raw
 * source bytes + pixel dimensions (to turn a 2x/4x factor into an output size for
 * providers that only accept absolute targets), neither of which the generation
 * handler exposes.
 */

import { saveCallLog } from "@/lib/usageDb";
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";

export const UPSCALE_CALL_LOG_PATH = "/v1/images/upscale";

/** Hard cap on a decoded source image (matches the Firefly storage upload limit). */
export const MAX_UPSCALE_SOURCE_BYTES = 20 * 1024 * 1024;

export interface UpscaleImageSource {
  buffer: Buffer;
  base64: string;
  contentType: string;
}

export interface UpscaleHandlerResult {
  success: boolean;
  status?: number;
  error?: unknown;
  data?: unknown;
}

export interface UpscaleLogger {
  info?: (scope: string, message: string) => void;
  error?: (scope: string, message: string) => void;
}

/**
 * Credential shape the upscale handlers need. Mirrors what
 * `getProviderCredentialsWithQuotaPreflight` yields for these providers: an API key or
 * access token, plus (for Adobe Firefly) the connection's `providerSpecificData`, which
 * is where a pasted firefly.adobe.com Cookie lives.
 */
export interface UpscaleCredentials {
  apiKey?: string;
  accessToken?: string;
  providerSpecificData?: {
    cookie?: unknown;
    access_token?: unknown;
    accessToken?: unknown;
  } | null;
}

/**
 * `Buffer` is typed as `Buffer<ArrayBufferLike>`, which TypeScript will not accept as a
 * `BlobPart` (a Blob part must be backed by a plain `ArrayBuffer`). Copy the bytes into a
 * fresh `ArrayBuffer` so multipart bodies typecheck without an unsafe cast.
 */
export function toBlobBytes(buffer: Buffer): ArrayBuffer {
  const out = new ArrayBuffer(buffer.byteLength);
  new Uint8Array(out).set(buffer);
  return out;
}

/**
 * Collect the source image from an OpenAI-ish / Media-page body.
 *
 * Only ONE image is meaningful for an upscale, so the first resolvable candidate
 * wins. Field order mirrors `extractAdobeSourceImageSources` so a body built for
 * generation keeps working here.
 */
export function extractUpscaleSourceImage(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const providerOptions =
    b.provider_options && typeof b.provider_options === "object" && !Array.isArray(b.provider_options)
      ? (b.provider_options as Record<string, unknown>)
      : {};

  const keys = [
    "image_url",
    "imageUrl",
    "input_image",
    "source_image",
    "promptImage",
    "prompt_image",
    "image",
    "images",
    "image_urls",
    "imageUrls",
    "input_images",
    "reference_images",
    "referenceImages",
    "reference_image",
  ];

  for (const key of keys) {
    const found = firstImageCandidate(b[key]) || firstImageCandidate(providerOptions[key]);
    if (found) return found;
  }

  if (Array.isArray(b.messages)) {
    for (const msg of b.messages) {
      if (!msg || typeof msg !== "object") continue;
      const content = (msg as Record<string, unknown>).content;
      if (!Array.isArray(content)) continue;
      for (const part of content) {
        if (!part || typeof part !== "object") continue;
        const p = part as Record<string, unknown>;
        if (p.type === "image_url" || p.type === "image") {
          const found = firstImageCandidate(p.image_url ?? p.image ?? p.url);
          if (found) return found;
        }
      }
    }
  }

  return null;
}

function firstImageCandidate(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed || trimmed === "null" || trimmed === "undefined") return null;
    return trimmed;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = firstImageCandidate(item);
      if (found) return found;
    }
    return null;
  }
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.url === "string") return firstImageCandidate(o.url);
    if (typeof o.image_url === "string") return firstImageCandidate(o.image_url);
    if (o.image_url && typeof o.image_url === "object") {
      return firstImageCandidate((o.image_url as Record<string, unknown>).url);
    }
    if (typeof o.b64_json === "string") return `data:image/png;base64,${o.b64_json}`;
    if (typeof o.base64 === "string") return `data:image/png;base64,${o.base64}`;
  }
  return null;
}

/** Decode a data URL / http(s) URL / bare base64 string into bytes. */
export async function resolveUpscaleImageSource(source: string): Promise<UpscaleImageSource> {
  const trimmed = String(source || "").trim();
  if (!trimmed) throw new Error("Invalid image source");

  const dataUri = /^data:([^;,]+)?(?:;charset=[^;,]+)?;base64,([\s\S]+)$/i.exec(trimmed);
  if (dataUri) {
    const contentType = (dataUri[1] || "image/png").trim().toLowerCase();
    const base64 = (dataUri[2] || "").replace(/\s/g, "");
    const buffer = Buffer.from(base64, "base64");
    assertSourceBytes(buffer);
    return {
      buffer,
      base64,
      contentType: contentType.startsWith("image/") ? contentType : "image/png",
    };
  }

  if (/^https?:\/\//i.test(trimmed)) {
    const remote = await fetchRemoteImage(trimmed);
    assertSourceBytes(remote.buffer);
    // fetchRemoteImage falls back to application/octet-stream; sniff whenever the
    // server did not send a usable image/* type so multipart uploads stay correct.
    const declared = (remote.contentType || "").split(";")[0]!.trim().toLowerCase();
    return {
      buffer: remote.buffer,
      base64: remote.buffer.toString("base64"),
      contentType: declared.startsWith("image/") ? declared : sniffImageMime(remote.buffer),
    };
  }

  const buffer = Buffer.from(trimmed.replace(/\s/g, ""), "base64");
  assertSourceBytes(buffer);
  return { buffer, base64: buffer.toString("base64"), contentType: sniffImageMime(buffer) };
}

function assertSourceBytes(buffer: Buffer): void {
  if (!buffer.length) throw new Error("Source image decoded to empty bytes");
  if (buffer.length > MAX_UPSCALE_SOURCE_BYTES) {
    throw new Error(
      `Source image too large (${buffer.length} bytes; max ${MAX_UPSCALE_SOURCE_BYTES})`
    );
  }
}

/** Best-effort MIME sniff from the magic bytes (falls back to PNG). */
export function sniffImageMime(buffer: Buffer): string {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (buffer.length >= 8 && buffer[0] === 0x89 && buffer.toString("ascii", 1, 4) === "PNG") {
    return "image/png";
  }
  if (buffer.length >= 6 && buffer.toString("ascii", 0, 3) === "GIF") return "image/gif";
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  if (buffer.length >= 2 && buffer.toString("ascii", 0, 2) === "BM") return "image/bmp";
  return "image/png";
}

/**
 * Read pixel dimensions straight from the container header — no image library needed.
 * Supports PNG, JPEG (SOFn scan), GIF, WebP (VP8 / VP8L / VP8X) and BMP.
 * Returns null when the format is unknown or the header is truncated.
 */
export function readImageDimensions(buffer: Buffer): { width: number; height: number } | null {
  try {
    if (
      buffer.length >= 24 &&
      buffer[0] === 0x89 &&
      buffer.toString("ascii", 1, 4) === "PNG"
    ) {
      // IHDR is always the first chunk: 8-byte signature + 4 length + 4 "IHDR".
      return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    }

    if (buffer.length >= 6 && buffer.toString("ascii", 0, 3) === "GIF") {
      return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
    }

    if (buffer.length >= 26 && buffer.toString("ascii", 0, 2) === "BM") {
      return { width: buffer.readInt32LE(18), height: Math.abs(buffer.readInt32LE(22)) };
    }

    if (
      buffer.length >= 30 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    ) {
      return readWebpDimensions(buffer);
    }

    if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
      return readJpegDimensions(buffer);
    }
  } catch {
    return null;
  }
  return null;
}

function readWebpDimensions(buffer: Buffer): { width: number; height: number } | null {
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8 " && buffer.length >= 30) {
    // Lossy: 3-byte frame tag + 3-byte sync code, then 14-bit width/height.
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }
  if (chunk === "VP8L" && buffer.length >= 25) {
    const bits = buffer.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X" && buffer.length >= 30) {
    const width = 1 + (buffer[24]! | (buffer[25]! << 8) | (buffer[26]! << 16));
    const height = 1 + (buffer[27]! | (buffer[28]! << 8) | (buffer[29]! << 16));
    return { width, height };
  }
  return null;
}

function readJpegDimensions(buffer: Buffer): { width: number; height: number } | null {
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1]!;
    // Standalone markers (no length payload).
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    const length = buffer.readUInt16BE(offset + 2);
    // SOF0..SOF15 except DHT(c4)/JPGA(c8)/DAC(cc) carry the frame dimensions.
    const isSof =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSof) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    if (length <= 0) return null;
    offset += 2 + length;
  }
  return null;
}

/**
 * Absolute output size for a scale factor, clamped to `maxEdge` so a 4x pass on an
 * already-large source cannot ask for an impossible canvas. Returns null when the
 * source dimensions could not be read.
 */
export function scaleDimensions(
  buffer: Buffer,
  factor: number,
  maxEdge = 32000
): { width: number; height: number } | null {
  const source = readImageDimensions(buffer);
  if (!source || source.width <= 0 || source.height <= 0) return null;
  const safeFactor = Number.isFinite(factor) && factor > 0 ? factor : 2;
  const scale = Math.min(
    safeFactor,
    maxEdge / Math.max(source.width, source.height)
  );
  return {
    width: Math.max(1, Math.round(source.width * Math.max(1, scale))),
    height: Math.max(1, Math.round(source.height * Math.max(1, scale))),
  };
}

/** OpenAI-images-shaped success envelope + call log. */
export function saveUpscaleSuccessResult(opts: {
  provider: string;
  model: string;
  startTime: number;
  images: Array<Record<string, unknown>>;
  requestBody?: unknown;
  responseBody?: unknown;
  meta?: Record<string, unknown>;
}): UpscaleHandlerResult {
  saveCallLog({
    method: "POST",
    path: UPSCALE_CALL_LOG_PATH,
    status: 200,
    model: `${opts.provider}/${opts.model}`,
    provider: opts.provider,
    duration: Date.now() - opts.startTime,
    requestBody: opts.requestBody ?? null,
    responseBody: opts.responseBody ?? { images_count: opts.images.length },
  }).catch(() => {});

  return {
    success: true,
    data: {
      created: Math.floor(Date.now() / 1000),
      data: opts.images,
      ...(opts.meta ? { upscale: opts.meta } : {}),
    },
  };
}

export function saveUpscaleErrorResult(opts: {
  provider: string;
  model: string;
  status: number;
  startTime: number;
  error: unknown;
  requestBody?: unknown;
}): UpscaleHandlerResult {
  saveCallLog({
    method: "POST",
    path: UPSCALE_CALL_LOG_PATH,
    status: opts.status,
    model: `${opts.provider}/${opts.model}`,
    provider: opts.provider,
    duration: Date.now() - opts.startTime,
    error:
      typeof opts.error === "string"
        ? opts.error.slice(0, 500)
        : String(opts.error).slice(0, 500),
    requestBody: opts.requestBody ?? null,
  }).catch(() => {});

  return { success: false, status: opts.status, error: opts.error };
}

/** `{ url }` or `{ b64_json }` depending on the requested response_format. */
export function buildUpscaleImageEntry(opts: {
  buffer?: Buffer | null;
  contentType?: string;
  url?: string | null;
  responseFormat?: unknown;
}): Record<string, unknown> {
  const wantsBase64 = String(opts.responseFormat ?? "").toLowerCase() === "b64_json";
  if (opts.buffer && opts.buffer.length > 0) {
    const base64 = opts.buffer.toString("base64");
    const mime = opts.contentType || sniffImageMime(opts.buffer);
    return wantsBase64 ? { b64_json: base64 } : { url: `data:${mime};base64,${base64}` };
  }
  return { url: String(opts.url || "") };
}
