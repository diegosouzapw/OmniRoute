/**
 * Fetch a remote image URL and return it as a base64 data URI.
 *
 * Used when upstream providers (Codex, etc.) require inline base64 images
 * instead of remote URLs they cannot fetch. Returns `null` if the input is
 * not a fetchable public http(s) URL or the fetch fails for any reason, so
 * callers can fall back to the original value without throwing.
 *
 * Security (OmniRoute hard rules — SSRF):
 *  - The image URL is client-controlled, so every remote fetch goes through
 *    the repo's canonical outbound guard (`parseAndValidatePublicUrl`), which
 *    rejects non-http(s) schemes, embedded credentials, localhost, link-local,
 *    private/CGNAT ranges, and cloud-metadata hostnames (169.254.x, IMDS).
 *  - DNS-rebinding defence: the resolved address(es) are re-checked against
 *    `isPrivateHost` before connecting, so a public-looking host that resolves
 *    to a private/metadata IP is rejected.
 *  - Redirects are followed MANUALLY and every hop is re-validated through the
 *    guard (fetch's default auto-follow would let a public host 30x to a
 *    private IP and bypass the initial check).
 *  - A bounded response read prevents a hostile server from streaming
 *    unbounded data into memory, and non-`image/*` responses are rejected so an
 *    internal HTML/JSON page cannot be exfiltrated as a base64 "image".
 *  - On ANY block/failure we return `null` (never throw): the helper is a
 *    best-effort optimisation and the caller falls back to the original URL,
 *    which is then fetched by the upstream provider from THEIR network — never
 *    ours.
 */

import dns from "node:dns";
import { isIP } from "node:net";
import { parseAndValidatePublicUrl, isPrivateHost } from "@/shared/network/outboundUrlGuard";

export interface FetchImageAsBase64Options {
  /** External abort signal — when provided, the internal timeout is skipped. */
  signal?: AbortSignal;
  /** Timeout in milliseconds applied only when no external `signal` is given. */
  timeoutMs?: number;
  /** Max bytes to read from the remote body (defaults to 20 MiB). */
  maxBytes?: number;
}

export interface FetchedImage {
  /** `data:<mime>;base64,<payload>` data URI. */
  url: string;
  /** Resolved MIME type (defaults to `image/jpeg` when the server omits it). */
  mimeType: string;
}

// 20 MiB — generous enough for provider vision inputs (OpenAI's vision limit),
// bounded so a hostile server cannot stream unbounded data into memory.
const DEFAULT_MAX_IMAGE_BYTES = 20 * 1024 * 1024;

// Bound on redirects followed; each hop is re-validated through the SSRF guard.
const MAX_IMAGE_REDIRECTS = 3;

/**
 * Defence-in-depth against DNS-rebinding SSRF: `parseAndValidatePublicUrl`
 * only checks the hostname *string*, so a public-looking host that resolves to
 * a private/metadata IP would otherwise be fetched. Resolve the host and return
 * `false` if ANY answer is private. IP literals are skipped (already validated
 * by the URL guard).
 */
async function hostnameResolvesPublic(hostname: string): Promise<boolean> {
  const bare =
    hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
  if (isIP(bare)) return true; // IP literal — already checked by the URL guard.
  let resolved: Array<{ address: string }>;
  try {
    resolved = await dns.promises.lookup(bare, { all: true });
  } catch {
    return false;
  }
  return resolved.every((entry) => !isPrivateHost(entry.address));
}

/**
 * Read a response body, returning `null` if it exceeds `maxBytes`. Caps while
 * streaming so an oversized or chunked-without-Content-Length body cannot
 * exhaust memory.
 */
async function readCapped(response: Response, maxBytes: number): Promise<Buffer | null> {
  const reader = response.body?.getReader();
  if (!reader) {
    const buf = Buffer.from(await response.arrayBuffer());
    return buf.byteLength > maxBytes ? null : buf;
  }
  const chunks: Buffer[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
}

/**
 * @param imageUrl HTTP(S) URL of the image.
 * @param options  Optional `signal` / `timeoutMs` / `maxBytes`.
 */
export async function fetchImageAsBase64(
  imageUrl: string | undefined | null,
  options: FetchImageAsBase64Options = {}
): Promise<FetchedImage | null> {
  const { signal, timeoutMs = 10000, maxBytes = DEFAULT_MAX_IMAGE_BYTES } = options;
  if (!imageUrl) return null;

  let currentUrl = imageUrl;
  for (let hop = 0; hop <= MAX_IMAGE_REDIRECTS; hop++) {
    // SSRF guard: rejects non-http(s) schemes, embedded credentials, localhost,
    // link-local, private/CGNAT, and cloud-metadata hosts. Client-supplied URLs
    // are always held to the strict public-only policy.
    let parsed: URL;
    try {
      parsed = parseAndValidatePublicUrl(currentUrl);
    } catch {
      return null;
    }
    // DNS-rebinding defence: resolve + reject private answers before connecting.
    if (!(await hostnameResolvesPublic(parsed.hostname))) return null;

    const controller = new AbortController();
    const timeout = signal ? null : setTimeout(() => controller.abort(), timeoutMs);
    const fetchSignal = signal ?? controller.signal;

    try {
      const response = await fetch(parsed.toString(), {
        method: "GET",
        signal: fetchSignal,
        // Follow redirects manually so each Location is re-validated by the
        // guard above; fetch's default auto-follow would bypass it.
        redirect: "manual",
      });

      // Manual redirect: resolve Location against the current URL and loop so
      // the next hop is re-validated by the SSRF guard.
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) return null;
        try {
          currentUrl = new URL(location, parsed.toString()).toString();
        } catch {
          return null;
        }
        continue;
      }

      if (!response.ok) return null;

      const rawType = (response.headers.get("Content-Type") || "").toLowerCase();
      const mimeType = rawType.split(";")[0].trim() || "image/jpeg";
      // Reject non-image responses so an internal HTML/JSON page (e.g. an SSRF
      // probe of an internal service) cannot be exfiltrated as a base64 image.
      if (rawType && !mimeType.startsWith("image/")) return null;

      // Reject early on an oversized Content-Length, then still cap during read
      // (the header is advisory / may be absent).
      const declaredLen = Number(response.headers.get("content-length") || "0");
      if (Number.isFinite(declaredLen) && declaredLen > maxBytes) return null;

      const data = await readCapped(response, maxBytes);
      if (!data) return null;
      const base64 = data.toString("base64");
      return { url: `data:${mimeType};base64,${base64}`, mimeType };
    } catch {
      return null;
    } finally {
      if (timeout) clearTimeout(timeout);
    }
  }

  // Exhausted the redirect budget.
  return null;
}
