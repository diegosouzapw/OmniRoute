/**
 * modelImportWarning — pure helper (no React/store deps) so it is unit-testable in isolation.
 *
 * The server's own degraded-discovery rule is reused verbatim (see `classifyModelImport`)
 * so the dashboard cannot invent a second, inevitably divergent definition of
 * "discovery failed". That module is a dependency-free leaf by design, so importing it
 * here pulls nothing server-only into the client bundle.
 */
import { isDegradedDiscovery } from "@/app/api/providers/[id]/sync-models/degradedLocalCatalog";

/**
 * The model-import route (`/api/providers/[id]/models`) returns a `warning` field when it falls
 * back to the cached/local catalog (e.g. the provider's `/models` endpoint was unreachable —
 * "API unavailable — using local catalog"). The import hook previously read only `models`/`error`,
 * so the fallback was silent: the user saw imported models with no indication they came from the
 * local catalog instead of the live API (#5428, #5429, #5431). Returns the warning string to
 * surface as a log line, or null when the response carries no usable warning.
 */
export function extractImportWarning(data: unknown): string | null {
  if (data && typeof data === "object" && "warning" in data) {
    const warning = (data as { warning?: unknown }).warning;
    if (typeof warning === "string" && warning.trim()) return warning;
  }
  return null;
}

/**
 * #15069 — pure phase resolver for the zero-new-models branch in handleImportModels.
 *
 * When all fetched models are already registered, what the user sees depends on whether
 * the fetch came from the live upstream API or fell back to the local catalog:
 *
 *  - `importWarning` present → local-catalog fallback → phase "warning" (the remote API was
 *    unreachable; a success indicator would be misleading).
 *  - `importWarning` absent  → remote catalog actually fetched → phase "done" (genuine success).
 *
 * Extracted as a pure function so unit tests can cover this branch without a React renderer.
 */
export function resolveNoNewModelsPhase(importWarning: string | null): "warning" | "done" {
  return importWarning ? "warning" : "done";
}

/**
 * B-03 (#15159): decide what the Import button should SAY, given the raw
 * `/api/providers/[id]/models?refresh=true` payload.
 *
 * The bug: `extractImportWarning` above surfaces the fallback warning as a log
 * line, but the modal's headline `status` stayed `allModelsAlreadyImported` (or
 * `noModelsFound`). Both read as authoritative answers while remote discovery had
 * in fact failed and the response came from the local catalog — so an operator
 * concluded there was nothing to import and the missing models stayed missing.
 *
 * `degraded` is computed with the SERVER's own rule
 * (`isDegradedDiscovery`, the dependency-free leaf at
 * `src/app/api/providers/[id]/sync-models/degradedLocalCatalog.ts`) rather than a
 * second local copy, so the dashboard and the API cannot drift apart. That module
 * is a pure leaf by design, so importing it here pulls nothing server-only into the
 * client bundle.
 *
 * Note `intentional: true` — for reka / voyage-ai / t3-web the local catalog IS
 * the intended and only discovery source (#5460, #5465), so that case must stay
 * non-degraded or Import would report a false failure for them.
 */
export type ClassifyModelImportInput = {
  /** The parsed `/models` response — read for `source`, `intentional`, `warning`. */
  modelsData: unknown;
  /** `data.models`, the list discovery returned. */
  fetchedModels: unknown[];
  /** True when the model id is already imported. */
  isKnownModel: (id: string) => boolean;
};

export type ModelImportOutcome = "no-models" | "nothing-new" | "import";

/** A model entry as discovery returns it; the id may be under any of these keys. */
export type DiscoveredModel = { id?: unknown; name?: unknown; model?: unknown };

export type ModelImportClassification = {
  outcome: ModelImportOutcome;
  /** Discovery fell back to a local/cache catalog — the headline must say so. */
  degraded: boolean;
  /** The server's warning text, when there is one. */
  warning: string | null;
  newCount: number;
  /** How many models discovery returned in total. */
  total: number;
  /** The not-yet-imported models themselves, for the caller to iterate. */
  newModels: DiscoveredModel[];
};

function modelId(entry: unknown): string {
  if (!entry || typeof entry !== "object") return "";
  const record = entry as { id?: unknown; name?: unknown; model?: unknown };
  const candidate = record.id ?? record.name ?? record.model;
  return typeof candidate === "string" ? candidate : String(candidate ?? "");
}

export function classifyModelImport({
  modelsData,
  fetchedModels,
  isKnownModel,
}: ClassifyModelImportInput): ModelImportClassification {
  const warning = extractImportWarning(modelsData);
  const degraded = isDegradedDiscovery(
    (modelsData ?? {}) as { source?: unknown; intentional?: unknown; warning?: unknown }
  );

  if (fetchedModels.length === 0) {
    return { outcome: "no-models", degraded, warning, newCount: 0, total: 0, newModels: [] };
  }

  const newModels = fetchedModels.filter(
    (entry) => !isKnownModel(modelId(entry))
  ) as DiscoveredModel[];

  return {
    outcome: newModels.length === 0 ? "nothing-new" : "import",
    degraded,
    warning,
    newCount: newModels.length,
    total: fetchedModels.length,
    newModels,
  };
}
