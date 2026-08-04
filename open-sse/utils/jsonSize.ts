/**
 * Serialized JSON length without materializing the JSON (#7847).
 *
 * Several hot-path call sites only need `JSON.stringify(body).length` — a readiness-timeout
 * threshold, a payload-size metric, a token estimate. On a 3.05 MiB agent request each of those
 * allocates a full 3 MiB string that is read once for its length and thrown away, and #7847
 * reports that class of transient allocation driving V8/cgroup OOM under concurrent long-context
 * traffic.
 *
 * `jsonLength()` walks the value and counts instead. Same O(n) scan, no allocation.
 *
 * It is EXACT, not an approximation: every consumer feeds a threshold, and an approximation
 * would silently shift routing and timeout decisions. `tests/unit/json-size-exactness.test.ts`
 * property-tests `jsonLength(x) === JSON.stringify(x).length` over generated structures.
 *
 * Anything outside the plain-JSON subset (Date, toJSON, class instances, Map, ...) falls back to
 * `JSON.stringify` for THAT SUBTREE only, so an exotic leaf never forces the multi-megabyte
 * message history back onto the allocating path.
 */

/** Length of a JSON-encoded string, including the surrounding quotes. */
function encodedStringLength(value: string): number {
  let len = 2; // the quotes
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code === 0x22 || code === 0x5c) {
      len += 2; // \" and \\
    } else if (code === 0x08 || code === 0x09 || code === 0x0a || code === 0x0c || code === 0x0d) {
      len += 2; // \b \t \n \f \r
    } else if (code < 0x20) {
      len += 6; // \u00XX
    } else if (code >= 0xd800 && code <= 0xdfff) {
      // Surrogates: a well-formed pair serializes as its two code units (2 chars); a LONE
      // surrogate is escaped as \uXXXX since ES2019 well-formed JSON.stringify.
      const isHigh = code <= 0xdbff;
      const next = isHigh ? value.charCodeAt(i + 1) : NaN;
      const paired = isHigh && next >= 0xdc00 && next <= 0xdfff;
      if (paired) {
        len += 2;
        i++; // consume the low surrogate
      } else {
        len += 6;
      }
    } else {
      len += 1;
    }
  }
  return len;
}

/** True for values JSON.stringify drops (object values) or renders as null (array items). */
function isOmitted(value: unknown): boolean {
  return value === undefined || typeof value === "function" || typeof value === "symbol";
}

function isPlainContainer(value: object): boolean {
  if (Array.isArray(value)) return true;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Exact `JSON.stringify(value).length`, computed without building the string.
 * Returns 0 for values JSON.stringify renders as `undefined` (functions, symbols, undefined),
 * matching the `try { JSON.stringify(x).length } catch { 0 }` shape of the call sites replaced.
 * Throws on circular structures and BigInt, exactly as JSON.stringify does.
 */
export function jsonLength(value: unknown): number {
  return lengthOf(value, new Set<object>());
}

function lengthOf(value: unknown, seen: Set<object>): number {
  if (value === null) return 4; // "null"
  const type = typeof value;

  if (type === "string") return encodedStringLength(value as string);
  if (type === "boolean") return value ? 4 : 5;
  if (type === "number") {
    // Non-finite numbers serialize as null.
    return Number.isFinite(value as number) ? String(value).length : 4;
  }
  if (type === "bigint") {
    // Match JSON.stringify, which throws rather than guessing an encoding.
    throw new TypeError("Do not know how to serialize a BigInt");
  }
  if (isOmitted(value)) return 0;
  if (type !== "object") return 0;

  const obj = value as object;

  // Delegate anything that is not a plain object/array — Date, class instances with toJSON,
  // Map, boxed primitives. Scoped to this subtree so the big arrays stay on the fast path.
  if (!isPlainContainer(obj) || typeof (obj as { toJSON?: unknown }).toJSON === "function") {
    const encoded = JSON.stringify(obj);
    return encoded === undefined ? 0 : encoded.length;
  }

  if (seen.has(obj)) {
    throw new TypeError("Converting circular structure to JSON");
  }
  seen.add(obj);
  try {
    if (Array.isArray(obj)) {
      let len = 2; // []
      for (let i = 0; i < obj.length; i++) {
        if (i > 0) len += 1; // comma
        const item = obj[i];
        // Omitted values render as null inside arrays rather than disappearing.
        len += isOmitted(item) ? 4 : lengthOf(item, seen);
      }
      return len;
    }

    let len = 2; // {}
    let first = true;
    for (const key of Object.keys(obj)) {
      const item = (obj as Record<string, unknown>)[key];
      if (isOmitted(item)) continue; // the whole entry disappears
      if (!first) len += 1; // comma
      first = false;
      len += encodedStringLength(key) + 1 + lengthOf(item, seen); // "key":value
    }
    return len;
  } finally {
    seen.delete(obj);
  }
}
