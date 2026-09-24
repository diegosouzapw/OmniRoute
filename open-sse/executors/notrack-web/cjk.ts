import { CJK_RANGES } from "./constants.ts";

export function isCjk(code: number): boolean {
  for (const [lo, hi] of CJK_RANGES) {
    if (code >= lo && code <= hi) return true;
  }
  return false;
}

/** CJK-aware token estimator (mirrors Python `_estimate_tokens`): CJK ≈ 1.5 chars/tok, Latin ≈ 4 chars/tok. */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  let cjk = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (isCjk(text.charCodeAt(i))) cjk += 1;
  }
  const other = text.length - cjk;
  return Math.max(1, Math.ceil(cjk / 1.5 + other / 4));
}
