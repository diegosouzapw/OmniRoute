import { createHash } from "node:crypto";

const REJECT_MSG = "Value cannot be represented as canonical JSON";

function codePointCompare(a: string, b: string): number {
  const aLen = a.length;
  const bLen = b.length;
  let i = 0;
  let j = 0;
  while (i < aLen && j < bLen) {
    const aCode = a.charCodeAt(i);
    const bCode = b.charCodeAt(j);
    // Check if either is a surrogate pair
    if (aCode >= 0xd800 && aCode <= 0xdbff && i + 1 < aLen) {
      const aFull = (aCode - 0xd800) * 0x400 + (a.charCodeAt(i + 1) - 0xdc00) + 0x10000;
      if (bCode >= 0xd800 && bCode <= 0xdbff && j + 1 < bLen) {
        const bFull = (bCode - 0xd800) * 0x400 + (b.charCodeAt(j + 1) - 0xdc00) + 0x10000;
        if (aFull !== bFull) return aFull - bFull;
        i += 2;
        j += 2;
      } else {
        // astral vs BMP
        return 1;
      }
    } else if (bCode >= 0xd800 && bCode <= 0xdbff && j + 1 < bLen) {
      return -1;
    } else {
      if (aCode !== bCode) return aCode - bCode;
      i++;
      j++;
    }
  }
  return aLen - bLen;
}

function canonicalStringify(value: unknown, seen: Set<unknown>): string {
  if (value === undefined) throw new TypeError(REJECT_MSG);
  if (typeof value === "bigint") throw new TypeError(REJECT_MSG);
  if (typeof value === "symbol") throw new TypeError(REJECT_MSG);
  if (typeof value === "function") throw new TypeError(REJECT_MSG);

  if (typeof value === "number") {
    // Normalize -0 to 0
    const normalized = Object.is(value, -0) ? 0 : value;
    if (!Number.isFinite(normalized)) throw new TypeError(REJECT_MSG);
    return String(normalized);
  }

  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean") return String(value);
  if (value === null) return "null";

  if (typeof value === "object") {
    if (seen.has(value)) throw new TypeError(REJECT_MSG);
    seen.add(value);

    if (Array.isArray(value)) {
      // Reject sparse arrays
      const len = (value as unknown[]).length;
      for (let i = 0; i < len; i++) {
        if (!(i in (value as unknown[]))) {
          throw new TypeError(REJECT_MSG);
        }
      }
      // Reject arrays with getters
      for (let i = 0; i < len; i++) {
        const desc = Object.getOwnPropertyDescriptor(value, i);
        if (desc && (desc.get || desc.set)) {
          throw new TypeError(REJECT_MSG);
        }
      }
      const items = (value as unknown[]).map((v) => canonicalStringify(v, seen));
      seen.delete(value);
      return `[${items.join(",")}]`;
    }

    // Reject non-plain objects: Date, Map, Set, class instances, etc.
    const proto = Object.getPrototypeOf(value);
    if (proto !== Object.prototype && proto !== null) {
      throw new TypeError(REJECT_MSG);
    }

    // Plain object: check for accessors on any own key, then sort by code point
    const keys = Object.keys(value);
    for (const k of keys) {
      const desc = Object.getOwnPropertyDescriptor(value, k);
      if (desc && (desc.get || desc.set)) {
        throw new TypeError(REJECT_MSG);
      }
    }
    keys.sort(codePointCompare);
    const pairs = keys.map(
      (k) =>
        `${JSON.stringify(k)}:${canonicalStringify((value as Record<string, unknown>)[k], seen)}`
    );
    seen.delete(value);
    return `{${pairs.join(",")}}`;
  }

  throw new TypeError(REJECT_MSG);
}

export function canonicalJson(value: unknown): string {
  return canonicalStringify(value, new Set());
}

export function canonicalJsonSha256(value: unknown): string {
  const json = canonicalJson(value);
  return createHash("sha256").update(json, "utf8").digest("hex");
}

export function deriveToolRequestIdentity(input: {
  apiKeyId: string;
  stableClientRequestId: string | null;
  skillRequestId: string;
  postInjectionBody: Record<string, unknown>;
}): string {
  const stableKey = input.stableClientRequestId ?? input.skillRequestId;
  const bodyDigest = canonicalJsonSha256(input.postInjectionBody);
  return `${input.apiKeyId}:${stableKey}:${bodyDigest}`;
}
