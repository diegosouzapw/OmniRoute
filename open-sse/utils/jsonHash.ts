import crypto from "node:crypto";

/**
 * Streaming JSON hash — computes `sha256hex(JSON.stringify(value))` WITHOUT
 * materializing the JSON string (#7847 OOM class). Several hot-path call sites
 * stringify a multi-megabyte request body just to hash it (compression memo
 * keys, cache keys). On a ~5 MiB agent body (with base64 screenshots) that
 * allocates a full ~5 MiB string, read once for a hash, then discarded.
 *
 * `jsonSha256()` walks the value and feeds the same bytes `JSON.stringify`
 * would emit directly into a `crypto.createHash("sha256")` stream, so peak
 * allocation stays bounded to a small rolling buffer.
 *
 * Semantics mirror `JSON.stringify` exactly:
 *  - key order = `Object.keys()` order (insertion order)
 *  - `undefined`/function/symbol object values drop the whole entry
 *  - `undefined`/function/symbol array items render as `null`
 *  - non-finite numbers render as `null`
 *  - `BigInt` throws (matches JSON.stringify)
 *  - Date / toJSON / non-plain containers fall back to `JSON.stringify` for
 *    that subtree only (kept rare so big arrays stay on the fast path).
 *
 * Deterministic across calls: identical logical bodies always produce the
 * identical digest, so callers can replace `sha256hex(JSON.stringify(body))`
 * with `jsonSha256(body)` without changing cache/memo semantics.
 */
export function jsonSha256(value: unknown): string {
  const hash = crypto.createHash("sha256");
  writeValue(hash, value, new Set<object>());
  return hash.digest("hex");
}

function isOmitted(value: unknown): boolean {
  return value === undefined || typeof value === "function" || typeof value === "symbol";
}

function isPlainContainer(value: object): boolean {
  if (Array.isArray(value)) return true;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function writeValue(
  hash: ReturnType<typeof crypto.createHash>,
  value: unknown,
  seen: Set<object>
): void {
  if (writePrimitive(hash, value)) return;

  const obj = value as object;
  // Date, Map, boxed primitives, class instances with toJSON — fall back to
  // JSON.stringify for THIS SUBTREE only, keeping multi-MB arrays on the
  // streaming path. JSON.stringify(Date) emits a quoted ISO string, so push
  // exactly the string form JSON.stringify would have produced.
  if (writeToJSONFallback(hash, obj)) return;

  if (Array.isArray(obj)) {
    if (seen.has(obj)) {
      throw new TypeError("Converting circular structure to JSON");
    }
    seen.add(obj);
    try {
      writeArray(hash, obj, seen);
    } finally {
      seen.delete(obj);
    }
  } else {
    writePlainObject(hash, obj, seen);
  }
}

/**
 * toJSON / non-plain-container fallback: serializes the subtree with
 * JSON.stringify, exactly as JSON.stringify would have (undefined → the bare
 * token, e.g. an object-valued key being dropped later is not possible here
 * — writeValue callers already filter omissions). Returns true when handled.
 */
function writeToJSONFallback(
  hash: ReturnType<typeof crypto.createHash>,
  obj: object
): boolean {
  const hasToJSON = typeof (obj as { toJSON?: unknown }).toJSON === "function";
  if (hasToJSON || !isPlainContainer(obj)) {
    const encoded = JSON.stringify(obj);
    hash.update(encoded === undefined ? "undefined" : encoded);
    return true;
  }
  return false;
}

/** Writes JSON primitives and omissions. Returns true when `value` is fully handled. */
function writePrimitive(hash: ReturnType<typeof crypto.createHash>, value: unknown): boolean {
  if (value === null) {
    hash.update("null");
    return true;
  }
  const type = typeof value;
  if (type === "string") {
    writeEncodedString(hash, value as string);
    return true;
  }
  if (type === "boolean") {
    hash.update(value ? "true" : "false");
    return true;
  }
  if (type === "number") {
    // Non-finite numbers serialize as null (matches JSON.stringify).
    hash.update(Number.isFinite(value as number) ? String(value) : "null");
    return true;
  }
  if (type === "bigint") {
    // Matches JSON.stringify, which throws rather than guessing an encoding.
    throw new TypeError("Do not know how to serialize a BigInt");
  }
  if (isOmitted(value) || type !== "object") {
    return true;
  }
  return false;
}

function writeArray(
  hash: ReturnType<typeof crypto.createHash>,
  obj: unknown[],
  seen: Set<object>
): void {
  hash.update("[");
  for (let i = 0; i < obj.length; i++) {
    if (i > 0) hash.update(",");
    const item = obj[i];
    if (isOmitted(item)) {
      hash.update("null"); // array items render as null
    } else {
      writeValue(hash, item, seen);
    }
  }
  hash.update("]");
}

function writePlainObject(
  hash: ReturnType<typeof crypto.createHash>,
  obj: object,
  seen: Set<object>
): void {
  if (seen.has(obj)) {
    throw new TypeError("Converting circular structure to JSON");
  }
  seen.add(obj);
  try {
    hash.update("{");
    let first = true;
    for (const key of Object.keys(obj)) {
      const item = (obj as Record<string, unknown>)[key];
      if (isOmitted(item)) continue; // entry disappears entirely
      if (!first) hash.update(",");
      first = false;
      writeEncodedString(hash, key);
      hash.update(":");
      writeValue(hash, item, seen);
    }
    hash.update("}");
  } finally {
    seen.delete(obj);
  }
}

// Static escapes for fast paths: quote, backslash, and the short control
// escapes JSON.stringify emits. Lookup avoids the escape ladder entirely.
const SINGLE_ESCAPES = new Map<number, string>([
  [0x22, '\\"'],
  [0x5c, "\\\\"],
  [0x08, "\\b"],
  [0x09, "\\t"],
  [0x0a, "\\n"],
  [0x0c, "\\f"],
  [0x0d, "\\r"],
]);

/** Writes one (possibly surrogate-paired) code unit's escaped form. */
function appendEscapedChar(out: string[], value: string, i: number, code: number): number {
  const single = SINGLE_ESCAPES.get(code);
  if (single !== undefined) {
    out.push(single);
    return i;
  }
  if (code < 0x20) {
    out.push("\\u" + code.toString(16).padStart(4, "0"));
    return i;
  }
  if (code >= 0xd800 && code <= 0xdfff) {
    const next = i + 1 < value.length ? value.charCodeAt(i + 1) : NaN;
    const isHigh = code >= 0xd800 && code <= 0xdbff;
    if (isHigh && next >= 0xdc00 && next <= 0xdfff) {
      out.push(value[i] + value[i + 1]);
      return i + 1;
    }
    out.push("\\u" + code.toString(16).padStart(4, "0"));
    return i;
  }
  out.push(value[i]);
  return i;
}

/** Writes a JSON-escaped, double-quoted string, flushing in ~8 KiB chunks. */
function writeEncodedString(hash: ReturnType<typeof crypto.createHash>, value: string): void {
  const out: string[] = [];
  let buffered = 0;
  let i = 0;
  out.push('"');
  while (i < value.length) {
    const next = appendEscapedChar(out, value, i, value.charCodeAt(i));
    buffered += next - i + 1;
    i = next + 1;
    if (buffered > 8192) {
      hash.update(out.join(""));
      out.length = 0;
      buffered = 0;
    }
  }
  out.push('"');
  hash.update(out.join(""));
}
