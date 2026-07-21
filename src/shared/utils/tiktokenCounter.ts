import { getEncoding, type Tiktoken } from "js-tiktoken";

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
  const created = getEncoding(encoding);
  encoders.set(encoding, created);
  return created;
}

/**
 * Exact token count for a string using the selected offline tokenizer.
 * Existing callers retain cl100k_base; Codex callers may pass provider/model context
 * to use o200k_base.
 * Defensive: never throws in a counting path — falls back to a char heuristic.
 */
export function countTextTokens(text: string, context?: TokenizerContext): number {
  if (!text || typeof text !== "string") return 0;
  try {
    return getEncoder(resolveTokenizerEncoding(context)).encode(text).length;
  } catch {
    return Math.ceil(text.length / 4);
  }
}
