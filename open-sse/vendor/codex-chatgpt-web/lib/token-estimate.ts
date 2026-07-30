/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
/**
 * Heuristic token-estimation sidecar.
 *
 * ChatGPT's rendered web response exposes no Responses API usage object, so Codex's usage display
 * and auto-compact need a conservative local estimate.
 *
 * Code, JSON, and tool arguments pack more tokens per character than English prose, so the ratio
 * intentionally over-counts a little and compacts early.
 * Over-counting fails safe (auto-compact fires earlier); under-counting risks context overflow.
 */

const DEFAULT_CHARS_PER_TOKEN = 3.5;

/** Model-aware chars-per-token ratio. Unknown models fall back to the generic English ratio. */
export function charsPerToken(modelId?: string): number {
  void modelId;
  return DEFAULT_CHARS_PER_TOKEN;
}

/**
 * CJK-aware ratio (devlog 260712 B3, audit R2#7): Korean/Chinese/Japanese text packs
 * roughly one token per 1.5-3 chars, so a CJK-heavy blob estimated at English ratios
 * badly undercounts. When >30% of chars are CJK, clamp DOWN to 2.5 chars/token —
 * `min(model ratio, 2.5)` keeps non-Latin context conservative.
 */
const CJK_CHARS_PER_TOKEN = 2.5;
const CJK_RATIO_THRESHOLD = 0.3;
// Hangul syllables/jamo, CJK unified ideographs (+ext A), hiragana/katakana.
const CJK_RE = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F\u4E00-\u9FFF\u3400-\u4DBF\u3040-\u30FF]/;

function cjkRatio(text: string): number {
  if (text.length === 0) return 0;
  // Sample long blobs for O(1) cost: every char up to 2k, then a stride.
  const stride = text.length > 2048 ? Math.ceil(text.length / 2048) : 1;
  let cjk = 0;
  let sampled = 0;
  for (let i = 0; i < text.length; i += stride) {
    sampled++;
    if (CJK_RE.test(text[i]!)) cjk++;
  }
  return sampled === 0 ? 0 : cjk / sampled;
}

/**
 * Estimate the token count of a text blob. Pure and deterministic.
 * Returns 0 for empty/whitespace-free-empty input; otherwise ceil(length / ratio), min 1.
 */
export function estimateTokens(text: string, modelId?: string): number {
  if (!text) return 0;
  const len = text.length;
  if (len === 0) return 0;
  let ratio = charsPerToken(modelId);
  if (cjkRatio(text) > CJK_RATIO_THRESHOLD) ratio = Math.min(ratio, CJK_CHARS_PER_TOKEN);
  return Math.max(1, Math.ceil(len / ratio));
}
