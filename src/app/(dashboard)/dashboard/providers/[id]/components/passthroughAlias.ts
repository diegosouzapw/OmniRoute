/**
 * Generate a unique default alias for a passthrough model id (9router#1850).
 *
 * The naive "last path segment" alias collapses distinct namespaced ids to the
 * same alias — e.g. `enx/codebuddy/gpt-5.5` and `enx/gpt-5.5` both become
 * `gpt-5.5` — so the second model could never be added (the UI only alerted
 * "alias already exists"). This disambiguates deterministically:
 *   1. the bare last segment, if free;
 *   2. progressively more-qualified names joined with "-" (parent segments
 *      prepended), if the shorter form is taken;
 *   3. a numeric suffix on the last segment as a final fallback.
 *
 * Pure — no React/DOM deps — so it is unit-testable.
 */
export function generateUniqueModelAlias(
  modelId: string,
  existingAliases: Record<string, unknown> = {}
): string {
  const parts = String(modelId ?? "")
    .split("/")
    .filter(Boolean);

  if (parts.length === 0) {
    // No usable segments (e.g. "" or "///") — fall back to the raw id + numeric.
    const base = String(modelId ?? "").trim() || "model";
    return isTaken(base, existingAliases) ? nextNumeric(base, existingAliases) : base;
  }

  // 1 + 2: try last segment, then last-2 joined, … up to the full path.
  for (let take = 1; take <= parts.length; take++) {
    const candidate = parts.slice(parts.length - take).join("-");
    if (!isTaken(candidate, existingAliases)) return candidate;
  }

  // 3: every qualified form is taken → numeric suffix on the last segment.
  return nextNumeric(parts[parts.length - 1], existingAliases);
}

function isTaken(alias: string, existingAliases: Record<string, unknown>): boolean {
  return Object.prototype.hasOwnProperty.call(existingAliases, alias);
}

function nextNumeric(base: string, existingAliases: Record<string, unknown>): string {
  let i = 2;
  while (isTaken(`${base}-${i}`, existingAliases)) i++;
  return `${base}-${i}`;
}
