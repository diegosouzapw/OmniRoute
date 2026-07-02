// open-sse/services/compression/engines/ionizer/sample.ts
import { storeBlock } from "../ccr/index.ts";

type MessageLike = { role?: string; content?: unknown; [key: string]: unknown };

/** Hard cap on rows parsed by the O(n) pass (fail-safe bound). */
export const MAX_IONIZER_ROWS = 100000;

/** FNV-1a 32-bit hash (deterministic, cheap, no Math.random) — seeds the middle sample. */
export function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 PRNG — deterministic, seeded (no Math.random). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Union of all keys across rows, in first-seen order. */
export function schemaUnion(rows: Array<Record<string, unknown>>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!seen.has(key)) {
        seen.add(key);
        out.push(key);
      }
    }
  }
  return out;
}

/** Structural heuristic: does this row represent an error/failure? (always kept) */
export function isErrorRow(row: Record<string, unknown>): boolean {
  for (const key of Object.keys(row)) {
    if (/error|fail|exception|stderr|denied/i.test(key) && row[key]) return true;
  }
  for (const k of ["status", "statusCode", "code"]) {
    const v = row[k];
    if (typeof v === "number" && v >= 400 && v <= 599) return true;
  }
  return false;
}

/** k deterministic, seeded elements of `pool`, preserving pool order. k>=n → all. */
export function seededSample<T>(pool: T[], k: number, seed: number): T[] {
  if (k >= pool.length) return pool.slice();
  const idx = pool.map((_, i) => i);
  const rand = mulberry32(seed);
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(rand() * (idx.length - i));
    const tmp = idx[i];
    idx[i] = idx[j];
    idx[j] = tmp;
  }
  return idx
    .slice(0, k)
    .sort((a, b) => a - b)
    .map((i) => pool[i]);
}

export interface IonizeOptions {
  targetRows: number;
  firstK: number;
  lastK: number;
  seed: number;
}
export interface IonizeResult {
  kept: Array<Record<string, unknown>>;
  keptCount: number;
  totalCount: number;
}

/**
 * Pick a representative subset of rows: schema-cover (first row introducing each new key)
 * ∪ ALL error rows ∪ first-K ∪ last-K ∪ a seeded uniform sample of the remaining middle,
 * up to targetRows. Deterministic. Returns the kept rows in ORIGINAL order.
 */
export function ionize(rows: Array<Record<string, unknown>>, opts: IonizeOptions): IonizeResult {
  const n = rows.length;
  if (n <= opts.targetRows) return { kept: rows, keptCount: n, totalCount: n };

  const keep = new Set<number>();
  const seenKeys = new Set<string>();
  for (let i = 0; i < n; i++) {
    let novel = false;
    for (const key of Object.keys(rows[i])) {
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        novel = true;
      }
    }
    if (novel) keep.add(i);
  }
  for (let i = 0; i < n; i++) if (isErrorRow(rows[i])) keep.add(i);
  for (let i = 0; i < Math.min(opts.firstK, n); i++) keep.add(i);
  for (let i = Math.max(0, n - opts.lastK); i < n; i++) keep.add(i);
  if (keep.size < opts.targetRows) {
    const middle: number[] = [];
    for (let i = 0; i < n; i++) if (!keep.has(i)) middle.push(i);
    const need = opts.targetRows - keep.size;
    for (const idx of seededSample(middle, need, opts.seed)) keep.add(idx);
  }

  const keptIdx = [...keep].sort((a, b) => a - b);
  return { kept: keptIdx.map((i) => rows[i]), keptCount: keptIdx.length, totalCount: n };
}

export interface IonizerPassOptions {
  threshold: number;
  targetRows: number;
  principalId?: string;
}
export interface IonizerPassResult {
  messages: MessageLike[];
  ionizedCount: number;
}

function isPlainObjectArray(v: unknown): v is Array<Record<string, unknown>> {
  return (
    Array.isArray(v) &&
    v.every((el) => el !== null && typeof el === "object" && !Array.isArray(el))
  );
}

/**
 * For each non-system string-content message that parses as a homogeneous array of plain
 * objects longer than `threshold`, replace it with a deterministic inline sample + a recoverable
 * CCR marker (the whole original array stored via storeBlock). Only when the marker shrinks it.
 * FAIL-OPEN: any error → no-op.
 */
export function applyIonizerPass(
  messages: MessageLike[],
  opts: IonizerPassOptions
): IonizerPassResult {
  try {
    let ionizedCount = 0;
    const out = messages.map((m) => {
      if (m.role === "system" || typeof m.content !== "string") return m;
      const serialized = m.content;
      let parsed: unknown;
      try {
        parsed = JSON.parse(serialized);
      } catch {
        return m;
      }
      if (!Array.isArray(parsed) || parsed.length <= opts.threshold) return m;
      if (parsed.length > MAX_IONIZER_ROWS) return m;
      if (!isPlainObjectArray(parsed)) return m;

      const res = ionize(parsed, {
        targetRows: opts.targetRows,
        firstK: 3,
        lastK: 3,
        seed: fnv1a(serialized),
      });
      if (res.keptCount >= res.totalCount) return m;

      const hash = storeBlock(serialized, opts.principalId);
      const marker = `[ionizer: kept ${res.keptCount}/${res.totalCount} rows; full → CCR retrieve hash=${hash} chars=${serialized.length}]`;
      const newContent = `${JSON.stringify(res.kept)}\n${marker}`;
      if (newContent.length >= serialized.length) return m;

      ionizedCount++;
      return { ...m, content: newContent };
    });
    return ionizedCount > 0 ? { messages: out, ionizedCount } : { messages, ionizedCount: 0 };
  } catch {
    return { messages, ionizedCount: 0 };
  }
}

/**
 * Resolve the ionizer step-config off `stepConfig` (enabled / threshold / targetRows) and run the
 * pass. Returns the messages unchanged + `ionizedCount: 0` when disabled. Keeps the engine's
 * `apply()` thin (config normalization + dispatch live here).
 */
export function runIonizerPass(
  messages: MessageLike[],
  stepConfig: Record<string, unknown>,
  principalId?: string
): IonizerPassResult {
  if (stepConfig["enabled"] === false) return { messages, ionizedCount: 0 };
  const threshold = typeof stepConfig["threshold"] === "number" ? (stepConfig["threshold"] as number) : 200;
  const targetRows = typeof stepConfig["targetRows"] === "number" ? (stepConfig["targetRows"] as number) : 50;
  return applyIonizerPass(messages, { threshold, targetRows, principalId });
}
