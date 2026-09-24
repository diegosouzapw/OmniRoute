/**
 * Modality-scoped model visibility (#12172) — the single precedence rule shared by the
 * DB layer (public catalog / combo candidate pools) and the dashboard UI.
 *
 * A `modelCompatOverrides` row may hide a model either everywhere (the legacy top-level
 * `isHidden`) or for one endpoint/modality only (`hiddenModalities[endpoint]`), which is
 * what lets an operator hide a Chat model without also suppressing an identically-ID'd
 * model in another registry (e.g. Image). Keeping one implementation here is deliberate:
 * the rule used to be duplicated, and the dashboard kept reading the legacy flag after the
 * write path was scoped, so hides silently stopped showing up in the UI.
 *
 * Pure — no imports, safe in both server and client bundles.
 */

export type ModelHiddenFlags = {
  isHidden?: boolean;
  hiddenModalities?: Record<string, boolean> | null;
};

/**
 * Resolve whether a compat-override row hides its model for a given modality.
 * An explicit `hiddenModalities[modality]` entry always wins; otherwise the legacy
 * all-modalities `isHidden` flag applies.
 */
export function isHiddenForModality(
  flags: ModelHiddenFlags | null | undefined,
  modality: string = "chat"
): boolean {
  const scoped = flags?.hiddenModalities?.[modality];
  if (scoped !== undefined) return Boolean(scoped);
  return Boolean(flags?.isHidden);
}
