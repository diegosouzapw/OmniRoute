/**
 * CLIProxyAPI `X-CPA-TRACE-ID` (#11725).
 *
 * The current header value is the selected credential's opaque `auth_index`.
 * Missing headers and unknown future shapes are unavailable attribution, never
 * a request failure. Values that look like emails, paths, or secrets are dropped.
 */

const STAMP = Symbol.for("omniroute.cpaAuthIndex");
const OPAQUE = /^[A-Za-z0-9._:-]{1,128}$/;

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readHeader(headers: unknown, name: string): string | null {
  if (!headers) return null;
  if (typeof (headers as Headers).get === "function") {
    try {
      const value = (headers as Headers).get(name);
      return typeof value === "string" && value.length > 0 ? value : null;
    } catch {
      return null;
    }
  }
  if (typeof headers !== "object") return null;
  const bag = headers as Record<string, unknown>;
  const value = bag[name] ?? bag[name.toLowerCase()] ?? bag[name.toUpperCase()];
  return typeof value === "string" && value.length > 0 ? value : null;
}

/** Keep an opaque auth index. Reject emails, paths, whitespace, and secrets. */
export function parseCpaTraceAuthIndex(raw: string | null | undefined): string | null {
  if (typeof raw !== "string") return null;
  const text = raw.trim();
  if (!text || text.length > 512) return null;

  let candidate = text;
  if (text.startsWith("{")) {
    try {
      const authIndex = record(JSON.parse(text))?.auth_index;
      candidate = typeof authIndex === "string" ? authIndex.trim() : "";
    } catch {
      return null;
    }
  } else if (/^auth_index=/i.test(text)) {
    candidate = text.slice(text.indexOf("=") + 1).trim();
  }

  if (!OPAQUE.test(candidate)) return null;
  return candidate;
}

/** Remember the index on this response before a later rebuild copies headers. */
export function rememberCpaAuthIndex(response: unknown): void {
  const headers = record(response)?.headers ?? response;
  const index = parseCpaTraceAuthIndex(readHeader(headers, "x-cpa-trace-id"));
  if (!index || !response || typeof response !== "object") return;
  try {
    Object.defineProperty(response, STAMP, { value: index, enumerable: false });
  } catch {
    // A sealed test double can refuse the stamp. The header read still works.
  }
}

/** Last response wins: stamped index, else the header still on the response. */
export function readCpaAuthIndex(responseOrHeaders: unknown): string | null {
  if (responseOrHeaders && typeof responseOrHeaders === "object") {
    const stamped = (responseOrHeaders as { [STAMP]?: unknown })[STAMP];
    if (typeof stamped === "string") return parseCpaTraceAuthIndex(stamped);
    const nested = (responseOrHeaders as Response).headers;
    if (nested && nested !== responseOrHeaders) {
      const fromResponse = parseCpaTraceAuthIndex(readHeader(nested, "x-cpa-trace-id"));
      if (fromResponse) return fromResponse;
    }
  }
  return parseCpaTraceAuthIndex(readHeader(responseOrHeaders, "x-cpa-trace-id"));
}
