/**
 * Image resolution + security for Cursor vision input.
 *
 * Turns OpenAI `image_url` parts (base64 `data:` URIs or remote `http(s)`
 * URLs) into decoded bytes ready to inline into a cursor SelectedImage
 * (see ../utils/cursorAgentProtobuf.ts::encodeSelectedImageBody).
 *
 * Security (OmniRoute hard rules):
 *  - SSRF: remote fetches go through the repo's canonical outbound guard
 *    (`parseAndValidatePublicUrl`), which rejects non-http(s) schemes,
 *    embedded credentials, localhost, link-local, private/CGNAT ranges, and
 *    cloud-metadata hostnames. Client-supplied image URLs are always held to
 *    the strict public-only policy (never gated by the private-URL toggle that
 *    admin-configured provider URLs use).
 *  - Size cap: each image must decode to <= 1 MiB (matches composer-api).
 *    Enforced both before base64 decode (cheap pre-check) and while streaming
 *    a remote body (so a hostile server can't stream gigabytes).
 *  - Content type: data URIs and URL responses must be `image/*`.
 *  - Errors throw `CursorImageError` with a clean, path-free message; the
 *    executor routes it through the sanitized 400 path (hard rule #12).
 */

import crypto from "node:crypto";
import dns from "node:dns";
import { isIP } from "node:net";
import {
  parseAndValidatePublicUrl,
  isPrivateHost,
  OutboundUrlGuardError,
} from "@/shared/network/outboundUrlGuard";
import type { EncodedImage } from "./cursorAgentProtobuf.ts";

// 1 MiB per image — matches composer-api's MAX_CURSOR_IMAGE_BYTES. Large
// enough for a typical screenshot, small enough to bound request size and
// memory.
export const MAX_CURSOR_IMAGE_BYTES = 1024 * 1024;

// Upper bound on the number of images per request. Each image triggers (at
// most) one remote fetch, so an unbounded count is a DoS vector; 12 is well
// above any realistic vision prompt.
export const MAX_CURSOR_IMAGES = 12;

// Wall-clock cap for a single remote image fetch. A malformed env value
// (NaN / non-positive) falls back to the default rather than breaking setTimeout.
const IMAGE_FETCH_TIMEOUT_MS = (() => {
  const parsed = parseInt(process.env.CURSOR_IMAGE_FETCH_TIMEOUT_MS || "15000", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 15000;
})();

// Bound on how many redirects fetchImageBytes will follow (each re-validated
// against the SSRF guard before the next hop).
const MAX_IMAGE_REDIRECTS = 3;

/**
 * A 400-class error carrying a clean, non-sensitive message. The executor
 * catches it and emits a sanitized error response.
 */
export class CursorImageError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "CursorImageError";
    this.status = status;
  }
}

function decodeDataUrl(url: string): { data: Buffer; mimeType: string } {
  // data:[<mediatype>][;base64],<data>
  const comma = url.indexOf(",");
  if (comma < 0) {
    throw new CursorImageError("Image data URL is malformed.");
  }
  const header = url.slice(5, comma); // strip leading "data:"
  const payload = url.slice(comma + 1);
  const isBase64 = /;base64/i.test(header);
  const mimeType = (header.split(";")[0] || "").trim().toLowerCase() || "application/octet-stream";

  if (!mimeType.startsWith("image/")) {
    throw new CursorImageError("Image data URL must have an image/* media type.");
  }
  if (!isBase64) {
    // Non-base64 data URLs (percent-encoded) are not a real image transport;
    // reject rather than guess.
    throw new CursorImageError("Image data URL must be base64-encoded.");
  }

  // Reject on the raw payload length BEFORE the regex/normalize pass, so an
  // arbitrarily large data URL can't burn CPU on the whitespace strip. Base64
  // expands ~4:3, so 2x the byte cap is a safe upper bound on the encoded text.
  if (payload.length > MAX_CURSOR_IMAGE_BYTES * 2) {
    throw new CursorImageError("Image input is too large (max 1 MiB). Resize and retry.");
  }

  const normalized = payload.replace(/\s/g, "");
  // Cheap pre-check: 4 base64 chars -> 3 bytes. Reject obviously oversized
  // payloads before allocating the decode buffer.
  if (Math.floor((normalized.length * 3) / 4) > MAX_CURSOR_IMAGE_BYTES) {
    throw new CursorImageError("Image input is too large (max 1 MiB). Resize and retry.");
  }

  let data: Buffer;
  try {
    data = Buffer.from(normalized, "base64");
  } catch {
    throw new CursorImageError("Image data URL contains invalid base64 data.");
  }
  // Buffer.from(base64) silently drops invalid trailing chars; guard against a
  // payload that decoded to nothing despite being non-empty.
  if (normalized.length > 0 && data.length === 0) {
    throw new CursorImageError("Image data URL contains invalid base64 data.");
  }
  return { data, mimeType };
}

// Validate a URL through the SSRF guard, mapping guard errors to clean,
// non-sensitive CursorImageErrors (no URL echoed back).
function validatePublicImageUrl(url: string): URL {
  try {
    return parseAndValidatePublicUrl(url);
  } catch (err) {
    if (err instanceof OutboundUrlGuardError) {
      throw new CursorImageError(
        err.code === "OUTBOUND_URL_INVALID"
          ? "Image URL is invalid or uses an unsupported scheme."
          : "Image URL points to a blocked address."
      );
    }
    throw new CursorImageError("Image URL is invalid.");
  }
}

/**
 * Throw if any of the resolved addresses falls in a private / link-local /
 * loopback / CGNAT / metadata range. Exported for unit testing the IP gate
 * without going through DNS.
 */
export function assertResolvedAddressesPublic(addresses: string[]): void {
  for (const addr of addresses) {
    if (isPrivateHost(addr)) {
      throw new CursorImageError("Image URL points to a blocked address.");
    }
  }
}

/**
 * Defence-in-depth against DNS-rebinding SSRF: `parseAndValidatePublicUrl`
 * only checks the hostname *string*, so a public-looking host that resolves to
 * a private/metadata IP would otherwise be fetched. Resolve the host and
 * reject if ANY answer is private. IP literals are skipped (already validated
 * by the guard above). This narrows — but doesn't fully eliminate — the
 * TOCTOU window between our resolution and fetch's own; a connection-time IP
 * filter (e.g. ssrf-req-filter) on the shared outbound guard would close it
 * for every caller.
 */
async function assertHostnameResolvesPublic(hostname: string): Promise<void> {
  const bare =
    hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
  if (isIP(bare)) return; // IP literal — already checked by the URL guard.
  let resolved: Array<{ address: string }>;
  try {
    resolved = await dns.promises.lookup(bare, { all: true });
  } catch {
    throw new CursorImageError("Image URL host could not be resolved.");
  }
  assertResolvedAddressesPublic(resolved.map((r) => r.address));
}

async function fetchImageBytes(url: string): Promise<{ data: Buffer; mimeType: string }> {
  // Follow redirects MANUALLY and re-validate every hop through the SSRF guard.
  // `fetch` follows redirects by default, so validating only the initial URL
  // would let a public host 30x-redirect to a private/link-local address and
  // bypass the guard. Each Location is resolved + re-checked before we fetch it.
  let currentUrl = url;
  for (let hop = 0; hop <= MAX_IMAGE_REDIRECTS; hop++) {
    const parsed = validatePublicImageUrl(currentUrl);
    // Resolve + IP-check the host (DNS-rebinding defence) before connecting.
    await assertHostnameResolvesPublic(parsed.hostname);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IMAGE_FETCH_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(parsed.toString(), {
        method: "GET",
        signal: controller.signal,
        redirect: "manual",
      });
    } catch {
      clearTimeout(timer);
      throw new CursorImageError("Could not fetch the image URL.");
    }
    try {
      // Manual redirect: resolve Location against the current URL and loop so
      // the next hop is re-validated by the SSRF guard.
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) {
          throw new CursorImageError("Image URL redirect is missing a destination.");
        }
        try {
          currentUrl = new URL(location, parsed.toString()).toString();
        } catch {
          throw new CursorImageError("Image URL redirect destination is invalid.");
        }
        continue;
      }

      if (!response.ok) {
        throw new CursorImageError(`Could not fetch the image URL (status ${response.status}).`);
      }
      const contentType = (response.headers.get("content-type") || "").toLowerCase();
      const mimeType = contentType.split(";")[0].trim();
      if (!mimeType.startsWith("image/")) {
        throw new CursorImageError("Image URL did not return an image content type.");
      }
      // Reject early on an oversized Content-Length, then still cap during read
      // (the header is advisory / may be absent).
      const declaredLen = Number(response.headers.get("content-length") || "0");
      if (Number.isFinite(declaredLen) && declaredLen > MAX_CURSOR_IMAGE_BYTES) {
        throw new CursorImageError("Image input is too large (max 1 MiB). Resize and retry.");
      }
      const data = await readCapped(response, MAX_CURSOR_IMAGE_BYTES);
      return { data, mimeType };
    } finally {
      clearTimeout(timer);
    }
  }
  throw new CursorImageError("Image URL has too many redirects.");
}

/**
 * Read a fetch Response body into a Buffer, aborting as soon as the
 * accumulated size exceeds `cap`. Consumes the body incrementally — as an
 * async iterable (Node Readable streams and Web Streams both support this) or
 * via a web ReadableStream reader — so an oversized body is rejected mid-read
 * rather than fully buffered. The uncapped arrayBuffer() path is only a last
 * resort for exotic body shapes, and is still cap-checked afterwards.
 */
async function readCapped(response: Response, cap: number): Promise<Buffer> {
  const body = response.body as
    | (AsyncIterable<Uint8Array> & { getReader?: () => ReadableStreamDefaultReader<Uint8Array> })
    | null;
  if (!body) {
    return Buffer.alloc(0);
  }

  const chunks: Buffer[] = [];
  let total = 0;
  const pushCapped = (chunk: Uint8Array) => {
    total += chunk.byteLength;
    if (total > cap) {
      throw new CursorImageError("Image input is too large (max 1 MiB). Resize and retry.");
    }
    chunks.push(Buffer.from(chunk));
  };

  // Preferred: async iteration (works for Node Readable + Web Streams).
  if (typeof (body as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === "function") {
    for await (const chunk of body) {
      pushCapped(chunk as Uint8Array);
    }
    return Buffer.concat(chunks, total);
  }

  // Fallback: web ReadableStream reader.
  if (typeof body.getReader === "function") {
    const reader = body.getReader();
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) pushCapped(value);
      }
    } finally {
      try {
        await reader.cancel();
      } catch {
        /* already closed */
      }
    }
    return Buffer.concat(chunks, total);
  }

  // Last resort: buffer then cap-check (only exotic non-stream bodies).
  const buf = Buffer.from(await response.arrayBuffer());
  if (buf.length > cap) {
    throw new CursorImageError("Image input is too large (max 1 MiB). Resize and retry.");
  }
  return buf;
}

/**
 * Resolve OpenAI `image_url` URLs (data: or http(s):) into EncodedImage[]
 * ready to inline into a cursor request. Each image gets a stable random uuid.
 * Throws CursorImageError (clean message, sanitizable) on any invalid /
 * oversized / blocked input.
 */
export async function resolveCursorImages(imageUrls: string[]): Promise<EncodedImage[]> {
  if (imageUrls.length > MAX_CURSOR_IMAGES) {
    throw new CursorImageError(
      `Too many images in one request (max ${MAX_CURSOR_IMAGES}).`
    );
  }
  const out: EncodedImage[] = [];
  for (const url of imageUrls) {
    if (typeof url !== "string" || !url) {
      throw new CursorImageError("Image URL is missing.");
    }
    // The data: scheme is case-insensitive (RFC 2397); match it that way but
    // pass the original (un-lowercased) url so the base64 payload is preserved.
    const { data, mimeType } = url.toLowerCase().startsWith("data:")
      ? decodeDataUrl(url)
      : await fetchImageBytes(url);
    if (!data.length) {
      throw new CursorImageError("Image input is empty.");
    }
    if (data.length > MAX_CURSOR_IMAGE_BYTES) {
      throw new CursorImageError("Image input is too large (max 1 MiB). Resize and retry.");
    }
    out.push({ data, mimeType, uuid: crypto.randomUUID() });
  }
  return out;
}

/**
 * Extract image_url URLs from an OpenAI-shaped message content array.
 * Returns the raw url strings (data: or http(s):) in order. Non-image parts
 * are ignored. A plain string content has no images.
 */
export function extractImageUrls(
  content: unknown
): string[] {
  if (!Array.isArray(content)) return [];
  const urls: string[] = [];
  for (const part of content) {
    if (
      part &&
      typeof part === "object" &&
      (part as { type?: unknown }).type === "image_url"
    ) {
      const imageUrl = (part as { image_url?: unknown }).image_url;
      if (typeof imageUrl === "string") {
        urls.push(imageUrl);
      } else if (
        imageUrl &&
        typeof imageUrl === "object" &&
        typeof (imageUrl as { url?: unknown }).url === "string"
      ) {
        urls.push((imageUrl as { url: string }).url);
      }
    }
  }
  return urls;
}
