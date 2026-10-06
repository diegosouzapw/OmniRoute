/**
 * Adobe Firefly — source-image extraction and upload to Firefly storage.
 *
 * Split out of adobeFireflyClient.ts.
 */

import {
  fetchUntrustedRemoteImage,
  type RemoteImageFetchResult,
} from "@/shared/network/remoteImageFetch";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  ADOBE_FIREFLY_MAX_UPLOAD_BYTES,
  buildAdobeUploadHeaders,
  resolveAdobeArpSessionId,
} from "./adobeFireflyArp.ts";
import { ADOBE_FIREFLY_IMAGE_UPLOAD_URL } from "./adobeFireflyCatalog.ts";
import { AdobeFireflyError, extractAdobeCookieHeader } from "./adobeFireflyCredentials.ts";

export function extractAdobeSourceImageSources(body: unknown, max = 4): string[] {
  if (!body || typeof body !== "object") return [];
  const b = body as Record<string, unknown>;
  const po =
    b.provider_options &&
    typeof b.provider_options === "object" &&
    !Array.isArray(b.provider_options)
      ? (b.provider_options as Record<string, unknown>)
      : {};

  const out: string[] = [];
  const seen = new Set<string>();
  const push = (v: unknown) => {
    if (out.length >= max) return;
    if (typeof v === "string") {
      const t = v.trim();
      if (!t || seen.has(t)) return;
      // Skip empty / clearly non-image
      if (t === "null" || t === "undefined") return;
      seen.add(t);
      out.push(t);
      return;
    }
    if (Array.isArray(v)) {
      for (const item of v) {
        if (out.length >= max) break;
        push(item);
      }
      return;
    }
    if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      if (typeof o.url === "string") push(o.url);
      else if (typeof o.image_url === "string") push(o.image_url);
      else if (o.image_url && typeof o.image_url === "object") {
        const inner = (o.image_url as Record<string, unknown>).url;
        if (typeof inner === "string") push(inner);
      } else if (typeof o.b64_json === "string") {
        push(`data:image/png;base64,${o.b64_json}`);
      } else if (typeof o.base64 === "string") {
        push(`data:image/png;base64,${o.base64}`);
      }
    }
  };

  // Order matches MediaViewModel / OpenAI edit aliases (primary single fields first).
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
  for (const k of keys) {
    push(b[k]);
    push(po[k]);
  }

  // OpenAI chat-style content parts (rare on /v1/images but harmless).
  if (Array.isArray(b.messages)) {
    for (const msg of b.messages) {
      if (!msg || typeof msg !== "object") continue;
      const content = (msg as Record<string, unknown>).content;
      if (!Array.isArray(content)) continue;
      for (const part of content) {
        if (!part || typeof part !== "object") continue;
        const p = part as Record<string, unknown>;
        if (p.type === "image_url" || p.type === "image") {
          push(p.image_url ?? p.image ?? p.url);
        }
      }
    }
  }

  return out.slice(0, max);
}

export function parseAdobeImageSourceBytes(source: string): {
  buffer: Buffer;
  contentType: string;
} {
  const trimmed = String(source || "").trim();
  if (!trimmed) {
    throw new AdobeFireflyError("Empty image reference", 400, "bad_image");
  }

  const dataUri = /^data:([^;,]+)?(?:;charset=[^;,]+)?(;base64)?,([\s\S]+)$/i.exec(trimmed);
  if (dataUri) {
    const mime = (dataUri[1] || "image/png").trim().toLowerCase() || "image/png";
    const isB64 = Boolean(dataUri[2]);
    const payload = dataUri[3] || "";
    if (!isB64) {
      throw new AdobeFireflyError(
        "Image data URL must be base64-encoded (data:image/...;base64,...)",
        400,
        "bad_image"
      );
    }
    const buffer = Buffer.from(payload.replace(/\s/g, ""), "base64");
    if (!buffer.length) {
      throw new AdobeFireflyError("Image data URL decoded to empty bytes", 400, "bad_image");
    }
    if (buffer.length > ADOBE_FIREFLY_MAX_UPLOAD_BYTES) {
      throw new AdobeFireflyError(
        `Image reference too large (${buffer.length} bytes; max ${ADOBE_FIREFLY_MAX_UPLOAD_BYTES})`,
        400,
        "bad_image"
      );
    }
    return {
      buffer,
      contentType: mime.startsWith("image/") ? mime : "image/png",
    };
  }

  // Raw base64 without data: prefix
  if (
    !/^https?:\/\//i.test(trimmed) &&
    /^[A-Za-z0-9+/=\s]+$/.test(trimmed) &&
    trimmed.length > 64
  ) {
    const buffer = Buffer.from(trimmed.replace(/\s/g, ""), "base64");
    if (buffer.length > 0 && buffer.length <= ADOBE_FIREFLY_MAX_UPLOAD_BYTES) {
      return { buffer, contentType: "image/png" };
    }
  }

  throw new AdobeFireflyError(
    "Unsupported image reference (need data:image/...;base64,... or raw base64). " +
      "HTTP(S) URLs are resolved by the caller before upload.",
    400,
    "bad_image"
  );
}

/**
 * Parse Firefly storage upload response: {"images":[{"id":"uuid"}]}.
 */
export function parseAdobeStorageUploadResponse(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const images = (body as Record<string, unknown>).images;
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];
    if (first && typeof first === "object") {
      const id = (first as Record<string, unknown>).id;
      if (typeof id === "string" && id.trim()) return id.trim();
    }
  }
  const id = (body as Record<string, unknown>).id;
  if (typeof id === "string" && id.trim()) return id.trim();
  return "";
}

/**
 * Upload one image to Firefly storage → blob id for referenceBlobs.
 * Wire: POST https://firefly-3p.ff.adobe.io/v2/storage/image (raw bytes).
 */
export async function uploadAdobeFireflyImage(opts: {
  accessToken: string;
  bytes: Buffer | Uint8Array;
  contentType?: string;
  sessionCookie?: string;
  /** Reuse the same ARP as generate-async (browser does). */
  arpSessionId?: string;
  /** Used for deterministic x-nonce (optional). */
  prompt?: string;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<string> {
  const fetchImpl = opts.fetchImpl || fetch;
  const buffer = Buffer.isBuffer(opts.bytes) ? opts.bytes : Buffer.from(opts.bytes);
  if (!buffer.length) {
    throw new AdobeFireflyError("Cannot upload empty image", 400, "bad_image");
  }
  if (buffer.length > ADOBE_FIREFLY_MAX_UPLOAD_BYTES) {
    throw new AdobeFireflyError(
      `Image reference too large (${buffer.length} bytes; max ${ADOBE_FIREFLY_MAX_UPLOAD_BYTES})`,
      400,
      "bad_image"
    );
  }

  const sessionCookie = String(opts.sessionCookie || "").trim();
  const cookieHeader = extractAdobeCookieHeader(sessionCookie);
  // One ARP for the whole chain — do not mint a new synthetic id per upload.
  const arpSessionId =
    (opts.arpSessionId && String(opts.arpSessionId).trim()) ||
    resolveAdobeArpSessionId(cookieHeader || sessionCookie);
  const contentType =
    (opts.contentType && opts.contentType.trim()) ||
    (buffer[0] === 0xff && buffer[1] === 0xd8
      ? "image/jpeg"
      : buffer[0] === 0x89 && buffer[1] === 0x50
        ? "image/png"
        : "image/png");

  const resp = await fetchImpl(ADOBE_FIREFLY_IMAGE_UPLOAD_URL, {
    method: "POST",
    headers: buildAdobeUploadHeaders(opts.accessToken, contentType, {
      arpSessionId,
      cookie: cookieHeader || undefined,
      prompt: opts.prompt || "upload",
    }),
    body: Uint8Array.from(buffer),
  });

  const text = await resp.text().catch(() => "");
  if (resp.status === 401 || resp.status === 403) {
    throw new AdobeFireflyError(
      "Adobe Firefly image upload unauthorized — paste a fresh IMS JWT",
      401,
      "auth"
    );
  }
  if (!resp.ok) {
    throw new AdobeFireflyError(
      `Adobe Firefly image upload failed (${resp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`,
      resp.status >= 400 && resp.status < 500 ? resp.status : 502,
      "upload"
    );
  }

  let json: unknown = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new AdobeFireflyError("Adobe Firefly image upload returned non-JSON body", 502, "upload");
  }
  const id = parseAdobeStorageUploadResponse(json);
  if (!id) {
    throw new AdobeFireflyError(
      "Adobe Firefly image upload succeeded but no images[].id was returned",
      502,
      "upload"
    );
  }
  opts.log?.info?.("ADOBE-FIREFLY", `uploaded reference image id=${id} (${buffer.length} bytes)`);
  return id;
}

/**
 * Resolve Media/OpenAI body image fields → Firefly storage blob ids.
 * - data: URLs / raw base64 → upload
 * - http(s) URLs → fetch then upload
 * - already looks like a UUID blob id → use as-is (advanced)
 */
export async function resolveAdobeSourceImageIds(opts: {
  accessToken: string;
  body: unknown;
  max?: number;
  sessionCookie?: string;
  /** Shared ARP for upload+generate (required for stable Firefly 3P). */
  arpSessionId?: string;
  prompt?: string;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<string[]> {
  const max = Math.max(1, Math.min(8, opts.max ?? 4));
  const sources = extractAdobeSourceImageSources(opts.body, max);
  if (!sources.length) return [];

  const fetchImpl = opts.fetchImpl || fetch;
  const ids: string[] = [];
  // One ARP for all uploads in this request (browser reuses the same header).
  const arpSessionId =
    (opts.arpSessionId && String(opts.arpSessionId).trim()) ||
    resolveAdobeArpSessionId(opts.sessionCookie);

  for (const src of sources) {
    // Already a Firefly storage id (uuid)
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(src)) {
      ids.push(src);
      continue;
    }

    let buffer: Buffer;
    let contentType = "image/png";

    if (/^https?:\/\//i.test(src)) {
      // The URL comes from the request body: public addresses only, DNS pinned, size capped.
      let downloaded: RemoteImageFetchResult;
      try {
        downloaded = await fetchUntrustedRemoteImage(src, {
          maxBytes: ADOBE_FIREFLY_MAX_UPLOAD_BYTES,
        });
      } catch (error) {
        // The client only learns that the download failed; the reason stays in the log.
        opts.log?.error?.(
          "ADOBE-FIREFLY",
          `reference image download failed: ${sanitizeErrorMessage(
            error instanceof Error ? error.message : String(error)
          )}`
        );
        throw new AdobeFireflyError("Failed to download reference image", 400, "bad_image");
      }
      buffer = downloaded.buffer;
      if (downloaded.contentType.toLowerCase().startsWith("image/")) {
        contentType = downloaded.contentType.split(";")[0]!.trim();
      }
    } else {
      const parsed = parseAdobeImageSourceBytes(src);
      buffer = parsed.buffer;
      contentType = parsed.contentType;
    }

    const id = await uploadAdobeFireflyImage({
      accessToken: opts.accessToken,
      bytes: buffer,
      contentType,
      sessionCookie: opts.sessionCookie,
      arpSessionId,
      prompt: opts.prompt,
      fetchImpl,
      log: opts.log,
    });
    ids.push(id);
  }

  return ids;
}
