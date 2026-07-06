/**
 * Compression response header echo (#6422).
 *
 * When a request carries `x-omniroute-compression`, docs promise the response echoes
 * `X-OmniRoute-Compression: <mode>; source=<source>`. Internal paths (idempotency
 * cache short-circuit, some combo/fusion assembly paths) build response headers
 * without threading `compressionResponseMeta` — so the promised echo silently
 * disappears. This helper is the outermost safety net: if the response is missing
 * the header and the request supplied one, echo a best-effort value derived
 * directly from the request header. Existing header values from the inner pipeline
 * (which carry richer `tokens=...; rules: ...` annotations) are never overwritten.
 */
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";

const COMPRESSION_REQUEST_HEADER = "x-omniroute-compression";
const COMPRESSION_RESPONSE_HEADER = OMNIROUTE_RESPONSE_HEADERS.compression;

function normalizeRequestValue(raw: string): string {
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();
  if (lower === "off" || lower === "default") return lower;
  if (lower.startsWith("engine:")) return lower;
  // Named combo — preserve the operator's casing on the mode field. Source is always
  // request-header when the header drove the choice.
  return trimmed;
}

/**
 * Read the compression request header (case-insensitive). Returns null on absent/blank.
 */
export function readCompressionRequestHeader(request: {
  headers: { get(name: string): string | null };
}): string | null {
  const raw = request.headers.get(COMPRESSION_REQUEST_HEADER);
  return typeof raw === "string" && raw.trim() ? raw : null;
}

/**
 * Wrap a Response so it carries `X-OmniRoute-Compression: <mode>; source=request-header`
 * when the request supplied `x-omniroute-compression` and the inner pipeline did not
 * already set it. Never overwrites an existing value — the inner pipeline may have
 * attached a richer annotation. A best-effort echo covers idempotency-cache,
 * fusion-envelope, and any other early-return path that dropped the meta.
 */
export function withCompressionHeaderEcho(
  response: Response,
  requestHeaderValue: string | null
): Response {
  if (!requestHeaderValue) return response;
  if (response.headers.has(COMPRESSION_RESPONSE_HEADER)) return response;
  const mode = normalizeRequestValue(requestHeaderValue);
  const headers = new Headers(response.headers);
  headers.set(COMPRESSION_RESPONSE_HEADER, `${mode}; source=request-header`);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
