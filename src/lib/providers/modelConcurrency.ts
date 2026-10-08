/**
 * Wire-format helpers for the per-model concurrency editor in
 * EditConnectionModal (`rateLimitOverrides.modelConcurrency`).
 *
 * Text format is one `model=cap` entry per line (commas also accepted as
 * separators), e.g.:
 *
 *   glm-5=1
 *   glm-4.7=3
 *
 * Pure — imports only the server-free @/shared/constants/modelConcurrency leaf
 * — so it is unit-testable without the dashboard harness.
 */

import {
  MODEL_CONCURRENCY_MAX_CAP,
  MODEL_CONCURRENCY_MAX_KEY_LENGTH,
  type ModelConcurrencyMap,
} from "@/shared/constants/modelConcurrency";

export interface ParsedModelConcurrency {
  map: ModelConcurrencyMap | null;
  /**
   * The first malformed entry, verbatim (trimmed), or null when the text is
   * valid. The UI turns it into a localized message.
   */
  invalidEntry: string | null;
}

/**
 * Serialize a stored map back into the editor text. Sorted by model id for
 * stable round-trips. Null/empty maps serialize to "" (blank = no model caps).
 */
export function formatModelConcurrencyInput(map: ModelConcurrencyMap | null | undefined): string {
  if (!map || typeof map !== "object") return "";
  return Object.keys(map)
    .sort()
    .map((model) => `${model}=${map[model]}`)
    .join("\n");
}

/**
 * Parse editor text into a normalized map. Blank text parses to `{ map: null,
 * invalidEntry: null }` (no model caps). The first malformed entry aborts with
 * that entry in `invalidEntry` and a null map so the caller can refuse the
 * save instead of silently dropping operator intent. Duplicate models: last wins.
 */
export function parseModelConcurrencyInput(text: string): ParsedModelConcurrency {
  const raw = typeof text === "string" ? text : "";
  if (raw.trim() === "") return { map: null, invalidEntry: null };
  const map: ModelConcurrencyMap = {};
  const entries = raw
    .split(/[\n,]/)
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  for (const entry of entries) {
    const separator = entry.indexOf("=");
    const model = separator < 0 ? "" : entry.slice(0, separator).trim();
    const capText = separator < 0 ? "" : entry.slice(separator + 1).trim();
    const cap = capText === "" ? NaN : Number(capText);
    if (
      model.length === 0 ||
      model.length > MODEL_CONCURRENCY_MAX_KEY_LENGTH ||
      !Number.isInteger(cap) ||
      cap < 1 ||
      cap > MODEL_CONCURRENCY_MAX_CAP
    ) {
      return { map: null, invalidEntry: entry };
    }
    map[model] = cap;
  }
  return { map: Object.keys(map).length === 0 ? null : map, invalidEntry: null };
}
