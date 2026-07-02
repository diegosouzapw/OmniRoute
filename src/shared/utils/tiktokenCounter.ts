import { getEncoding, type Tiktoken } from "js-tiktoken";

let encoder: Tiktoken | null = null;

function getEncoder(): Tiktoken {
  if (!encoder) encoder = getEncoding("cl100k_base");
  return encoder;
}

/**
 * Exact token count for a string using cl100k_base (offline, no upstream call).
 * Defensive: never throws in a counting path — falls back to a char heuristic.
 */
export function countTextTokens(text: string): number {
  if (!text || typeof text !== "string") return 0;
  try {
    return getEncoder().encode(text).length;
  } catch {
    return Math.ceil(text.length / 4);
  }
}
