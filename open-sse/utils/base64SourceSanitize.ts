/**
 * Sanitize base64 image/document payloads in an Anthropic-shape body, in place.
 *
 * Some upstreams decode source.data strictly (Python pybase64 with validate=True)
 * and fail the whole request with 500 "Non-base64 digit found" when the payload
 * carries a data-URL prefix ("data:image/png;base64,....") or wrapped whitespace.
 * Clean base64 — what Claude Code and most clients send — is left byte-identical.
 */

const DATA_URL_PREFIX_RE = /^data:[^;,]+;base64,/i;

function sanitizeData(data: unknown): unknown {
  if (typeof data !== "string" || !data) return data;
  let out = DATA_URL_PREFIX_RE.test(data) ? data.replace(DATA_URL_PREFIX_RE, "") : data;
  if (/\s/.test(out)) out = out.replace(/\s+/g, "");
  return out;
}

function sanitizeSource(source: unknown): void {
  if (!source || typeof source !== "object") return;
  const src = source as Record<string, unknown>;
  if (src.type === "base64") src.data = sanitizeData(src.data);
}

function sanitizeContent(content: unknown): void {
  if (!Array.isArray(content)) return;
  for (const block of content) {
    if (!block || typeof block !== "object") continue;
    const b = block as Record<string, unknown>;
    if (b.type === "image" || b.type === "document") sanitizeSource(b.source);
    // tool_result blocks nest further content arrays (which may carry screenshots).
    if (Array.isArray(b.content)) sanitizeContent(b.content);
  }
}

export function sanitizeBase64Sources(body: unknown): void {
  if (!body || typeof body !== "object") return;
  const messages = (body as Record<string, unknown>).messages;
  if (!Array.isArray(messages)) return;
  for (const message of messages) {
    if (!message || typeof message !== "object") continue;
    sanitizeContent((message as Record<string, unknown>).content);
  }
}
