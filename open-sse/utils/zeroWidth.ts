/**
 * Zero-width character cleanup for model output.
 *
 * The request side obfuscates configurable agent words by inserting a
 * U+200D ZERO WIDTH JOINER after their first letter (`o\u200Dpencode`, see
 * `services/claudeCodeObfuscation.ts` and `services/systemTransforms.ts`), and
 * the response side removes zero-width code points again so an echoed word is
 * not corrupted. Removing every U+200B..U+200D also deletes U+200C ZERO WIDTH
 * NON-JOINER and U+200D where they belong to the text itself: the Persian and
 * Kurdish half-space (ارائه\u200Cدهنده, می\u200Cروم, کتاب\u200Cها), Arabic and Indic shaping,
 * and emoji ZWJ sequences (👨\u200D👩\u200D👧). See #12186.
 *
 * The obfuscator only ever places a joiner between two ASCII word characters,
 * so a joiner is removed only there. A joiner touching the edge of the string
 * is removed as well when its other neighbour is an ASCII word character, so
 * an obfuscated word split across streaming deltas (`o\u200D` + `pencode`)
 * is still cleaned. A joiner next to non-ASCII text, and a delta that consists
 * of nothing but a joiner (an emoji sequence split by the tokenizer), pass
 * through untouched.
 *
 * U+200B ZERO WIDTH SPACE and U+FEFF have no shaping role and keep the
 * unconditional removal they always had.
 */

const ANY_ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/;
const ZERO_WIDTH_SPACE_OR_BOM = /[\u200B\uFEFF]/g;
const JOINER_BETWEEN_ASCII_WORD_CHARS =
  /(?<=[A-Za-z0-9_])[\u200C\u200D]+(?=[A-Za-z0-9_]|$)|^[\u200C\u200D]+(?=[A-Za-z0-9_])/g;

/**
 * Strip the zero-width markers used for agent-word obfuscation while keeping
 * ZWNJ/ZWJ that are part of the text (Persian half-space, Arabic/Indic
 * shaping, emoji sequences).
 */
export function stripObfuscationZeroWidth(text: string): string {
  if (!text || !ANY_ZERO_WIDTH.test(text)) return text;
  return text.replace(ZERO_WIDTH_SPACE_OR_BOM, "").replace(JOINER_BETWEEN_ASCII_WORD_CHARS, "");
}
