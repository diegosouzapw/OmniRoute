/**
 * Coercion helpers shared by the MCP server's tool handlers.
 *
 * #15159 M-01 — "file = register + wrap. handle* -> tools/canonical/*.ts".
 *
 * Why this is a leaf and not left inline in `server.ts`:
 *
 * `withScopeEnforcement()` wraps every tool registration and stays in `server.ts`,
 * and it calls `toRecord()`. So if the extracted handlers imported their coercion
 * helpers from `server.ts`, every `tools/*.ts` module would gain a `server.ts`
 * import edge — and `server.ts` imports `tools/*.ts` to register the handlers.
 * That is a cycle, and it is exactly the edge M-06 (#15468) removed to close
 * graph cycles 193/194 when it moved the internal hop into `internalFetch.ts`.
 *
 * These are pure functions with no imports at all, so both sides can depend on
 * this module without either side depending on the other. That property is
 * pinned by tests/unit/mcp-server-handler-extraction-15159.test.ts, which fails
 * if this file ever grows an import of `server.ts`.
 *
 * They are deliberately NOT a generic coercion utility: each one encodes a
 * decision specific to how MCP tool results are shaped (see the notes on
 * `toUptimeString` and `normalizeComboModels` below).
 */

import {
  getComboModelProvider,
  getComboModelString,
  getComboStepTarget,
} from "../../src/lib/combos/steps.ts";

export type JsonRecord = Record<string, unknown>;

/**
 * Narrow an unknown to a plain object; anything else (including arrays, which
 * are objects but not records) becomes `{}` so a caller can index it safely.
 */
export function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/** Narrow an unknown to an array; anything else becomes `[]`. */
export function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** Pass through a string, or the fallback. Numbers are NOT stringified here. */
export function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

/**
 * Pass through a finite number, or the fallback.
 *
 * NAMED `toFiniteNumber`, NOT `toNumber`: `no-restricted-syntax` bars a local
 * `toNumber` definition (#7879) because `src/shared/utils/numeric.ts` already
 * owns that name. `server.ts` carried a suppression for the violation rather
 * than renaming, so the definition arrived here unchanged.
 *
 * This is deliberately NOT the canonical `numeric.ts#toNumber`, and the two
 * are not interchangeable: the canonical one also PARSES numeric strings
 * (`toFiniteNumber("5")` -> 5), whereas this passes them through to the fallback
 * (`-> 0`). Every call site reads a value out of an OmniRoute JSON response,
 * where these fields are numbers already, so today the two agree.
 *
 * Swapping in the canonical helper is therefore a real behaviour change on a
 * numeric-string field and must NOT ride along on a pure move-refactor — it
 * wants its own PR with a test pinning the intended semantics. Renaming here
 * removes a suppression instead of relocating it.
 */
export function toFiniteNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

/**
 * Mirrors the runtime's env convention for lane flags ("1" | "true" are on) so a
 * future string serialization can never silently invert a boolean lane report.
 */
export function isLaneFlagOn(value: unknown): boolean {
  return value === true || value === "1" || value === "true";
}

/**
 * `process.uptime()` (the source of health.uptime) returns a number, not a
 * string; `toString()` only passes through actual strings, so a naive
 * `toString(health.uptime, "unknown")` silently discarded every real uptime
 * value. This accepts both.
 */
export function toUptimeString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "unknown";
}

/**
 * Flatten whatever shape a combo's `models` field arrives in into the uniform
 * `{ provider, model, priority }` the list-combos tool returns.
 *
 * `src/lib/combos/steps.ts` owns the canonical readers (`getComboModelString`
 * and friends) and this delegates to them rather than re-deriving the shape,
 * so a change to how a combo step is spelled cannot drift between the writer
 * and this reader.
 */
export function normalizeComboModels(
  rawModels: unknown
): Array<{ provider: string; model: string; priority: number }> {
  return toArray(rawModels).map((rawModel, index) => {
    const modelRecord = toRecord(rawModel);
    const modelString = getComboModelString(rawModel);
    const target = getComboStepTarget(rawModel);
    const provider =
      getComboModelProvider(rawModel) ||
      (modelString ? "unknown" : target ? "combo" : toString(modelRecord.provider, "unknown"));

    return {
      provider,
      model: modelString || target || toString(modelRecord.model, "unknown"),
      priority: toFiniteNumber(modelRecord.priority, index + 1),
    };
  });
}
