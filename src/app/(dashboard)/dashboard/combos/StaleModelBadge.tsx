"use client";

import { getComboModelString } from "@/lib/combos/steps";

/**
 * #13505: combo steps pinned to a model the provider's live catalog no longer
 * lists. The refs come from `staleComboRefs` on /api/combos/builder/options.
 */
export function buildStaleModelSet(refs: unknown): Set<string> {
  const models = new Set<string>();
  if (!Array.isArray(refs)) return models;
  for (const ref of refs) {
    const model = (ref as { model?: unknown } | null)?.model;
    if (typeof model === "string" && model) models.add(model);
  }
  return models;
}

/** Staleness is a property of the model, so any explicit step using it matches. */
export function isStaleComboStep(entry: unknown, staleModels: Set<string>): boolean {
  if (staleModels.size === 0) return false;
  const kind = (entry as { kind?: unknown } | null)?.kind;
  if (kind !== undefined && kind !== "model") return false;
  const model = getComboModelString(entry);
  return Boolean(model && staleModels.has(model));
}

export function StaleModelBadge({ label }: { label: string }) {
  return (
    <span
      title={label}
      className="inline-flex shrink-0 items-center gap-0.5 rounded border border-amber-500/20 bg-amber-500/10 px-1 text-[10px] text-amber-700 dark:text-amber-300"
    >
      <span className="material-symbols-outlined text-[12px]" aria-hidden="true">
        warning
      </span>
      {label}
    </span>
  );
}
