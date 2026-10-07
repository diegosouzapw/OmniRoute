import type { Tiktoken } from "js-tiktoken";
import { createRequire } from "module";

const _require = createRequire(import.meta.url);

export type TokenizerEncoding = "cl100k_base" | "o200k_base";

export interface TokenizerContext {
  provider?: string | null;
  model?: string | null;
}

export function tokenizerContextFromBody(body: unknown): TokenizerContext {
  if (!body || typeof body !== "object" || Array.isArray(body)) return {};
  const record = body as Record<string, unknown>;
  return {
    provider: typeof record.provider === "string" ? record.provider : undefined,
    model: typeof record.model === "string" ? record.model : undefined,
  };
}

const encoders = new Map<TokenizerEncoding, Tiktoken>();

/**
 * Above this many characters the exact tokenizer is skipped in favor of the
 * char-heuristic (chars/4). js-tiktoken's pure-JS encoder is near-quadratic on
 * large inputs — a 10 MB base64 image payload can block the event loop for
 * tens of seconds (OmniRoute worker wedge incident). Token counting is used for
 * compression stats/estimates only, so a heuristic on oversized inputs is
 * acceptable and keeps the loop responsive.
 */
export const MAX_EXACT_TOKEN_COUNT_CHARS = 50_000;

/**
 * Base64 data URIs (e.g. OpenAI-style `image_url.url`) must not be tokenized:
 * they are image payloads, not text. Matching a data URI of any `image/*`
 * media type and stripping it keeps the count accurate (the raw bytes of an
 * image are not meaningful "text" tokens) while avoiding the quadratic encode
 * cost on large attachments.
 */
const BASE64_DATA_URI_RE = /data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]+/gi;

function stripBase64DataUris(text: string): string {
  return text.replace(BASE64_DATA_URI_RE, "");
}

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isCodexTokenizerContext(context?: TokenizerContext): boolean {
  const provider = normalize(context?.provider);
  const model = normalize(context?.model);
  return (
    provider === "codex" ||
    provider === "cx" ||
    model.startsWith("codex/") ||
    model.startsWith("cx/") ||
    model.includes("codex")
  );
}

export function resolveTokenizerEncoding(context?: TokenizerContext): TokenizerEncoding {
  return isCodexTokenizerContext(context) ? "o200k_base" : "cl100k_base";
}

function getEncoder(encoding: TokenizerEncoding): Tiktoken {
  const cached = encoders.get(encoding);
  if (cached) return cached;
  let tiktoken: { getEncoding: (name: string) => Tiktoken } | null = null;
  try {
    tiktoken ??= _require("js-tiktoken") as { getEncoding: (name: string) => Tiktoken };
    const created = tiktoken.getEncoding(encoding);
    encoders.set(encoding, created);
    return created;
  } catch {
    throw new Error(`js-tiktoken not available: cannot create encoder for ${encoding}`);
  }
}

/**
 * Exact token count for a string using the selected offline tokenizer.
 * Existing callers retain cl100k_base; Codex callers may pass provider/model context
 * to use o200k_base.
 * Defensive: never throws in a counting path — falls back to a char heuristic.
 * Oversized inputs (over 50k chars) and base64 image data URIs are never
 * tokenized: the encoder is near-quadratic on large strings and would block the
 * event loop (worker wedge regression).
 */
export function countTextTokens(text: string, context?: TokenizerContext): number {
  if (!text || typeof text !== "string") return 0;
  const stripped = stripBase64DataUris(text);
  if (stripped.length > MAX_EXACT_TOKEN_COUNT_CHARS) {
    return Math.ceil(stripped.length / 4);
  }
  try {
    return getEncoder(resolveTokenizerEncoding(context)).encode(stripped).length;
  } catch {
    return Math.ceil(stripped.length / 4);
  }
}
