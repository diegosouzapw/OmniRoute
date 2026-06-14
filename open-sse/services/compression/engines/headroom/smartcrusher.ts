/**
 * smartcrusher.ts — SmartCrusher: JSON array → tabular compaction (H3 lossless stage).
 *
 * Scans message contents (strings and ```json fenced blocks inside strings) for
 * homogeneous arrays of objects. When found and when the tabular form is strictly
 * smaller, replaces the JSON array text with a compact omni-tabular block.
 *
 * Conservative guards (inherited from headroom upstream):
 *   - Never touch role: "system" messages.
 *   - Only compact arrays that are homogeneous (all objects share the same key set).
 *   - Minimum row count gate (default 8).
 *   - Skip if tabular form is NOT smaller than the original JSON (no regression).
 *   - Skip if the array elements are not "scalar-ish" at top level (i.e. objects, not nested arrays of arrays).
 */

import { encodeTabularBlock, kindOf, wrapTabular } from "./tabular.ts";

/** Default minimum number of rows to trigger compaction. */
export const DEFAULT_MIN_ROWS = 8;

/** The fenced block marker we look for to compact json arrays inline. */
const JSON_FENCE_RE = /```json\n([\s\S]*?)\n```/g;

/**
 * Checks whether an array of values is homogeneous (all entries are plain objects
 * sharing the same set of keys, with scalar-ish leaf values).
 *
 * Returns the shared keys array if homogeneous, null otherwise.
 */
export function detectHomogeneous(arr: unknown[]): string[] | null {
  if (arr.length === 0) return null;

  // Every element must be a plain (non-null, non-array) object
  for (const item of arr) {
    if (item === null || typeof item !== "object" || Array.isArray(item)) return null;
  }

  // Build the union of keys from the first element
  const firstKeys = Object.keys(arr[0] as Record<string, unknown>).sort();

  // All other elements must have the EXACT same key set (same keys, same count)
  for (const item of arr.slice(1)) {
    const itemKeys = Object.keys(item as Record<string, unknown>).sort();
    if (itemKeys.length !== firstKeys.length) return null;
    for (let i = 0; i < firstKeys.length; i++) {
      if (itemKeys[i] !== firstKeys[i]) return null;
    }
  }

  // Per-column TYPE uniformity. The decoder applies a single kind per column
  // (derived from row 0), so every row's value in a column must share that kind —
  // otherwise the round-trip would be lossy (e.g. a nullable column would decode
  // every cell as null, or a mixed number/string column would NaN-out). A column
  // with mixed kinds makes the array effectively heterogeneous → leave it untouched.
  const first = arr[0] as Record<string, unknown>;
  for (const key of firstKeys) {
    const expected = kindOf(first[key]);
    for (const item of arr) {
      if (kindOf((item as Record<string, unknown>)[key]) !== expected) return null;
    }
  }

  return firstKeys;
}

/**
 * Try to crush a JSON string (already verified to be a homogeneous array) into
 * a tabular form. Returns the compact string if it shrinks the input; null otherwise.
 */
export function tryCompactJson(jsonStr: string, minRows: number = DEFAULT_MIN_ROWS): string | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    return null;
  }

  if (!Array.isArray(parsed) || parsed.length < minRows) return null;

  const keys = detectHomogeneous(parsed);
  if (!keys) return null;

  const arr = parsed as Record<string, unknown>[];
  const blockContent = encodeTabularBlock(arr);
  const compact = wrapTabular(blockContent);

  // Only use compact form if it is strictly smaller
  if (compact.length >= jsonStr.length) return null;

  return compact;
}

type MessageLike = {
  role?: string;
  content?: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
};

/**
 * Process a single text string: try to compact it as a whole JSON array,
 * or find and compact any ```json fenced blocks inside it.
 *
 * Returns the new string and whether it changed.
 */
export function crushText(text: string, minRows: number = DEFAULT_MIN_ROWS): string {
  // 1. Try the whole string as a JSON array first
  const trimmed = text.trimStart();
  if (trimmed.startsWith("[")) {
    const compacted = tryCompactJson(text.trim(), minRows);
    if (compacted !== null) return compacted;
  }

  // 2. Try to compact ```json fenced blocks inside the text
  let result = text;
  let offset = 0;
  const regex = new RegExp(JSON_FENCE_RE.source, "g");
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const fullMatch = match[0]; // ```json\n...\n```
    const innerJson = match[1];
    const compacted = tryCompactJson(innerJson.trim(), minRows);
    if (compacted !== null) {
      const start = match.index + offset;
      const end = start + fullMatch.length;
      result = result.slice(0, start) + compacted + result.slice(end);
      offset += compacted.length - fullMatch.length;
    }
  }

  return result;
}

/**
 * Process messages array in place (returns new array).
 * Skips system messages. Returns changed flag.
 */
export function crushMessages(
  messages: MessageLike[],
  minRows: number = DEFAULT_MIN_ROWS
): { messages: MessageLike[]; changed: boolean } {
  let changed = false;

  const result = messages.map((msg): MessageLike => {
    // Guard: never touch system messages
    if (msg.role === "system") return { ...msg };

    if (typeof msg.content === "string") {
      const crushed = crushText(msg.content, minRows);
      if (crushed !== msg.content) {
        changed = true;
        return { ...msg, content: crushed };
      }
      return { ...msg };
    }

    if (Array.isArray(msg.content)) {
      let contentChanged = false;
      const newContent = msg.content.map((part: Record<string, unknown>) => {
        if (part["type"] !== "text" || typeof part["text"] !== "string") return part;
        const crushed = crushText(part["text"] as string, minRows);
        if (crushed !== part["text"]) {
          contentChanged = true;
          return { ...part, text: crushed };
        }
        return part;
      });
      if (contentChanged) {
        changed = true;
        return { ...msg, content: newContent };
      }
      return { ...msg };
    }

    return { ...msg };
  });

  return { messages: result, changed };
}
