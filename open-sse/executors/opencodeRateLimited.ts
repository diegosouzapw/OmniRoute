/**
 * opencodeRateLimited.ts — 429 classifier for the opencode executor loop (#13657).
 *
 * Leaf module: zero imports, no registry, no DB. Headers first: a parseable
 * Retry-After alone marks a real rate limit; otherwise a bounded prefix of the
 * body is matched against generic English rate-limit phrasings (derived from a
 * captured 429 body). Anything else is a "burst" 429 that keeps the normal
 * cross-account rotation. Only consulted when OPENCODE_RATE_LIMITED_429_EARLY_STOP
 * is on; the classifier never rewrites the response it inspects.
 */

const RATE_LIMITED_SIGNALS: ReadonlyArray<RegExp> = [
  /rate.?limited/i,
  /usage.?limit/i,
  /too many requests/i,
];

/** Bytes of a 429 body inspected by the classifier. */
export const RATE_LIMIT_BODY_SNIFF_BYTES = 8192;

/** Seconds until retry from a Retry-After value (delta-seconds or HTTP date), or null. */
export function parseRetryAfterSeconds(
  retryAfter: string | number | null | undefined,
  now = Date.now()
): number | null {
  if (typeof retryAfter === "number") {
    return Number.isFinite(retryAfter) && retryAfter > 0 ? Math.ceil(retryAfter) : null;
  }
  if (typeof retryAfter !== "string") return null;
  const text = retryAfter.trim();
  if (text === "") return null;
  if (/^\d+$/.test(text)) return Math.max(Number(text), 1);
  const ms = Date.parse(text);
  if (Number.isFinite(ms)) return Math.max(Math.ceil((ms - now) / 1000), 1);
  return null;
}

export type RateLimit429Verdict = "rate_limited" | "burst";

export function classify429(input: {
  retryAfter?: string | number | null;
  bodyText?: string | null;
}): RateLimit429Verdict {
  if (parseRetryAfterSeconds(input.retryAfter) !== null) return "rate_limited";
  const body = typeof input.bodyText === "string" ? input.bodyText : "";
  if (body !== "" && RATE_LIMITED_SIGNALS.some((re) => re.test(body))) return "rate_limited";
  return "burst";
}

/**
 * Read at most `maxBytes` of a response body from a clone, then cancel the
 * clone's reader. The original response keeps its full, unread body. Returns
 * null when the body cannot be read.
 */
export async function readBodyPrefix(
  response: Response,
  maxBytes = RATE_LIMIT_BODY_SNIFF_BYTES
): Promise<string | null> {
  if (!response.body) return "";
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  try {
    reader = response.clone().body?.getReader();
  } catch {
    return null;
  }
  if (!reader) return "";
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;
  try {
    while (bytes < maxBytes) {
      const { done, value } = await reader.read();
      if (done || !value) break;
      const chunk =
        value.byteLength > maxBytes - bytes ? value.subarray(0, maxBytes - bytes) : value;
      bytes += chunk.byteLength;
      text += decoder.decode(chunk, { stream: true });
    }
    return text + decoder.decode();
  } catch {
    return null;
  } finally {
    void reader.cancel().catch(() => undefined);
  }
}

/** Classify an upstream 429: Retry-After header first, bounded body prefix only if needed. */
export async function classifyUpstream429(response: Response): Promise<RateLimit429Verdict> {
  const retryAfter = response.headers.get("retry-after");
  if (parseRetryAfterSeconds(retryAfter) !== null) return "rate_limited";
  return classify429({ retryAfter, bodyText: await readBodyPrefix(response) });
}
