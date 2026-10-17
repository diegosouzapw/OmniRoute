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


/**
 * #16977: an opt-in, chat-only provider allowlist keeps newly synchronized
 * model IDs hidden until explicitly admitted. Null means legacy visibility;
 * an empty Set intentionally hides every model. Never canonicalize vendor IDs
 * or strip slash-separated model namespaces.
 *
 * Only the documented reasoning-effort suffixes inherit base admission, so
 * "vendor/model-high" can appear when "vendor/model" is explicitly allowed.
 * Exact tier entries may also be admitted individually.
 */
export function isAdmittedByModelVisibilityAllowlist(
  modelId: string,
  allowed: ReadonlySet<string> | null | undefined
): boolean {
  if (allowed == null) return true;
  if (allowed.has(modelId)) return true;
  const match = modelId.match(/-(?:none|low|medium|high|xhigh|max)$/);
  return Boolean(match && allowed.has(modelId.slice(0, -match[0].length)));
}

/** Same-tab event and cross-tab storage revision used by both combo pickers. */
export const MODEL_VISIBILITY_EVENT = "omniroute:model-visibility-changed";
export const MODEL_VISIBILITY_REVISION_KEY = "omniroute:model-visibility-revision";

export function broadcastModelVisibilityChange(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MODEL_VISIBILITY_REVISION_KEY, String(Date.now()));
  } catch {
    // Private mode / disabled storage: same-tab listeners still refresh.
  }
  window.dispatchEvent(new Event(MODEL_VISIBILITY_EVENT));
}

/** An explicit base-model hide also suppresses its known generated effort tiers. */
export function isHiddenByModelVisibilityList(
  modelId: string,
  hidden: ReadonlySet<string> | null | undefined
): boolean {
  if (!hidden) return false;
  if (hidden.has(modelId)) return true;
  const tier = modelId.match(/-(?:none|low|medium|high|xhigh|max)$/);
  return Boolean(tier && hidden.has(modelId.slice(0, -tier[0].length)));
}

/**
 * Listen for visibility writes in the current dashboard, in another tab, or
 * before returning focus to an open picker. Call the unsubscribe on unmount.
 */
export function subscribeModelVisibilityChanges(refresh: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === MODEL_VISIBILITY_REVISION_KEY) refresh();
  };
  window.addEventListener(MODEL_VISIBILITY_EVENT, refresh);
  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", refresh);
  return () => {
    window.removeEventListener(MODEL_VISIBILITY_EVENT, refresh);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", refresh);
  };
}
