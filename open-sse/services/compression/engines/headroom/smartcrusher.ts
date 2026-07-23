/**
 * smartcrusher.ts — SmartCrusher: JSON array → GCF compaction (H3 lossless stage).
 *
 * Scans message contents (strings and ```json fenced blocks inside strings) for
 * arrays of objects. When found and when the GCF form is strictly smaller,
 * replaces the JSON array text with a compact GCF block.
 *
 * GCF (Graph Compact Format) handles homogeneous AND heterogeneous arrays,
 * mixed-type columns, nested objects, and nullable fields natively.
 *
 * Conservative guards (inherited from headroom upstream):
 *   - Never touch role: "system" messages.
 *   - Minimum row count gate (default 8).
 *   - Skip if GCF form is NOT smaller than the original JSON (no regression).
 *   - Elements must be objects (not bare primitives or arrays at the top level).
 *
 * Backward compatibility:
 *   - detectHomogeneous is still exported (used by existing tests and may be
 *     useful for analytics), but is no longer a gate for encoding. GCF encodes
 *     both homogeneous and heterogeneous arrays.
 */

import { encodeTabularBlock, wrapTabular, kindOf } from "./tabular.ts";
import { encodeToonBlock, wrapToon } from "./toon.ts";

/** Default minimum number of rows to trigger compaction. */
export const DEFAULT_MIN_ROWS = 8;

/** The fenced block marker we look for to compact json arrays inline. */
const JSON_FENCE_RE = /```json\n([\s\S]*?)\n```/g;

/**
 * Checks whether an array of values is homogeneous (all entries are plain objects
 * sharing the same set of keys, with uniform column types).
 *
 * Returns the shared keys array if homogeneous, null otherwise.
 *
 * Note: this is no longer a gate for GCF encoding (GCF handles heterogeneous
 * arrays natively), but is kept for backward compatibility and analytics.
 */
export function detectHomogeneous(arr: unknown[]): string[] | null {
  if (arr.length === 0) return null;

  for (const item of arr) {
    if (item === null || typeof item !== "object" || Array.isArray(item)) return null;
  }

  const firstKeys = Object.keys(arr[0] as Record<string, unknown>).sort();

  for (const item of arr.slice(1)) {
    const itemKeys = Object.keys(item as Record<string, unknown>).sort();
    if (itemKeys.length !== firstKeys.length) return null;
    for (let i = 0; i < firstKeys.length; i++) {
      if (itemKeys[i] !== firstKeys[i]) return null;
    }
  }

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
 * Check if all elements in an array are objects (not null, not arrays).
 * This is the minimum gate for GCF encoding.
 */
function allObjects(arr: unknown[]): boolean {
  for (const item of arr) {
    if (item === null || typeof item !== "object" || Array.isArray(item)) return false;
  }
  return true;
}

/**
 * Try to crush a JSON string (array of objects) into GCF form.
 * Returns the compact string if it shrinks the input; null otherwise.
 *
 * GCF handles heterogeneous arrays, mixed-type columns, nested objects,
 * and nullable fields natively, so the only gates are:
 *   - Must be a valid JSON array
 *   - Must have >= minRows elements
 *   - All elements must be objects
 *   - GCF form must be strictly smaller than JSON
 */
export function tryCompactJson(jsonStr: string, minRows: number = DEFAULT_MIN_ROWS): string | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    return null;
  }

  if (!Array.isArray(parsed) || parsed.length < minRows) return null;

  // All elements must be objects (GCF encodes objects in tabular form).
  if (!allObjects(parsed)) return null;

  const arr = parsed as Record<string, unknown>[];
  const compact = pickSmallestEncoding(arr);

  // Only use compact form if it is strictly smaller
  if (compact.length >= jsonStr.length) return null;

  return compact;
}

/**
 * Best-of-N encoder selection: GCF (default) vs TOON. Returns the strictly
 * smaller fenced block; ties resolve to GCF for cache stability. Extracted so
 * tryCompactJson stays below the complexity gate.
 */
export function pickSmallestEncoding(arr: Record<string, unknown>[]): string {
  const gcf = wrapTabular(encodeTabularBlock(arr));
  const toonInner = encodeToonBlock(arr);
  if (toonInner !== null) {
    const toon = wrapToon(toonInner);
    if (toon.length < gcf.length) return toon;
  }
  return gcf;
}

export type MessageLike = {
  role?: string;
  content?: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
};

/**
 * Collect every JSON array (whole-string or inside a ```json fence) in non-system
 * messages that SmartCrusher would compact (same gates as tryCompactJson). Pure;
 * shared by summarizeEncoderCandidates so the A/B table mirrors production scope.
 */
export function collectCompactableArrays(
  messages: MessageLike[],
  minRows: number = DEFAULT_MIN_ROWS
): Record<string, unknown>[][] {
  const out: Record<string, unknown>[][] = [];
  const pushIfCompactable = (jsonStr: string) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      return;
    }
    if (!Array.isArray(parsed) || parsed.length < minRows) return;
    if (!allObjects(parsed)) return;
    out.push(parsed as Record<string, unknown>[]);
  };
  const scanText = (text: string) => {
    const trimmed = text.trimStart();
    if (trimmed.startsWith("[")) pushIfCompactable(text.trim());
    const regex = new RegExp(JSON_FENCE_RE.source, "g");
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) pushIfCompactable(m[1].trim());
  };
  for (const msg of messages) {
    if (msg.role === "system" || msg.role === "developer") continue;
    if (typeof msg.content === "string") scanText(msg.content);
    else if (Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (part["type"] === "text" && typeof part["text"] === "string")
          scanText(part["text"] as string);
      }
    }
  }
  return out;
}

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
    // Guard: never touch system messages. "developer" is the Responses-API equivalent of
    // "system" used by newer models (e.g. Codex CLI, see open-sse/executors/codex.ts) and
    // carries the same kind of instructions/tool-schema content — compacting a JSON array
    // embedded there (e.g. an update_plan example) can corrupt the model's tool-calling
    // instructions (9router#2132: broke Codex CLI plan mode).
    if (msg.role === "system" || msg.role === "developer") return { ...msg };

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
