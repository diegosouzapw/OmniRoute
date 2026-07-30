// Pure helpers extracted from ModelSelectModal so the grouping logic is
// unit-testable (the component itself lives inside a useMemo and is not
// directly exercisable by node:test). Keep these free of React imports.

export type PassthroughAliasModel = {
  id: string;
  name: string;
  value: string;
  source: "alias";
};

/**
 * Build the alias-derived model rows for a passthrough provider.
 *
 * `modelAliases` maps an alias name → the fully-qualified model string, which
 * is prefixed by the provider's *canonical id* (e.g. `github/gpt-4`), NOT by
 * its public alias (e.g. `gh`). Filtering/stripping must therefore use the
 * `providerId`, mirroring the sibling custom-provider branch. Using the alias
 * here meant aliases registered under a providerId whose alias differs (the
 * common case) never resolved.
 *
 * Inspired by upstream PR decolua/9router#485 (Anurag Saxena).
 */
export function buildPassthroughAliasModels(
  modelAliases: Record<string, string>,
  providerId: string
): PassthroughAliasModel[] {
  const prefix = `${providerId}/`;
  return Object.entries(modelAliases || {})
    .filter(([, fullModel]) => typeof fullModel === "string" && fullModel.startsWith(prefix))
    .map(([aliasName, fullModel]) => ({
      id: fullModel.replace(prefix, ""),
      name: aliasName,
      value: fullModel,
      source: "alias" as const,
    }));
}

export type NodeAliasModel = {
  id: string;
  name: string;
  value: string;
  source: "alias";
};

/**
 * Build the alias-derived model rows for a custom-provider ("node") entry.
 *
 * Mirrors `buildPassthroughAliasModels` above but rewrites `value` using the
 * node's display `nodePrefix` instead of the raw `providerId` (custom
 * providers are keyed by their canonical id/UUID in `modelAliases`, but
 * displayed/selected using a node-specific prefix).
 *
 * `modelAliases` values can be `null`/`undefined` for stale or partial
 * entries persisted to settings, so this guards with `typeof fullModel ===
 * "string"` before calling `.startsWith` — without it, opening Create Combo
 * for a custom provider node throws a TypeError.
 *
 * Inspired by upstream PR decolua/9router#2247 (wahyuzero).
 */
export function buildNodeAliasModels(
  modelAliases: Record<string, string>,
  providerId: string,
  nodePrefix: string
): NodeAliasModel[] {
  const prefix = `${providerId}/`;
  return Object.entries(modelAliases || {})
    .filter(([, fullModel]) => typeof fullModel === "string" && fullModel.startsWith(prefix))
    .map(([aliasName, fullModel]) => ({
      id: fullModel.replace(prefix, ""),
      name: aliasName,
      value: `${nodePrefix}/${fullModel.replace(prefix, "")}`,
      source: "alias" as const,
    }));
}

/**
 * "Select all" adds every currently-visible model to the combo in one click,
 * with no cap — turning off "Show configured only" (or just having a large
 * provider catalog) can put hundreds of candidates behind a single click.
 * Above this threshold the caller must confirm before batch-adding (#8526).
 *
 * A native `confirm()` — not a bespoke modal — matches the existing bulk /
 * destructive-action pattern already used in this codebase (e.g.
 * `ReasoningRoutingRules.tsx::deleteConfirm`, `combos/page.tsx::deleteConfirm`),
 * so no new UI primitive is needed for this one interaction.
 */
export const SELECT_ALL_CONFIRM_THRESHOLD = 20;

export function shouldConfirmSelectAll(
  candidateCount: number,
  threshold: number = SELECT_ALL_CONFIRM_THRESHOLD
): boolean {
  return Number.isFinite(candidateCount) && candidateCount > threshold;
}

/** Matches the provider-page "Test All Models" concurrency (#chunks of 3). */
export const PROVIDER_TEST_CHUNK_SIZE = 3;

export type ProviderConnectionLike = {
  id?: string | number | null;
  provider?: string | null;
};

export type ProviderTestModelLike = {
  value?: string | null;
  id?: string | null;
};

export type ProviderTestTarget = {
  providerId: string;
  connectionId?: string;
  modelIds: string[];
};

/**
 * Resolve the first active connection id for a provider catalog key.
 * Mirrors the live-/models lookup in ModelSelectModal.
 */
export function resolveConnectionIdForProvider(
  providerId: string,
  activeProviders: ProviderConnectionLike[] | null | undefined
): string | undefined {
  if (!providerId || !Array.isArray(activeProviders)) return undefined;
  const match = activeProviders.find((p) => p?.provider === providerId);
  const raw = match?.id;
  const id =
    typeof raw === "string"
      ? raw.trim()
      : typeof raw === "number" && Number.isFinite(raw)
        ? String(raw)
        : "";
  return id || undefined;
}

/**
 * Build /api/models/test-all targets for the providers the user selected
 * in the combo "Add Model" modal. Only models currently visible in the
 * grouped catalog are included (same set Select All would touch).
 */
export function buildProviderTestTargets(opts: {
  selectedProviderIds: Iterable<string>;
  groups: Array<[string, ProviderTestModelLike[]]>;
  activeProviders?: ProviderConnectionLike[] | null;
}): ProviderTestTarget[] {
  const selected = new Set(
    Array.from(opts.selectedProviderIds || []).filter(
      (id) => typeof id === "string" && id.trim().length > 0
    )
  );
  if (selected.size === 0) return [];

  const byProvider = new Map<string, ProviderTestModelLike[]>();
  for (const [providerId, models] of opts.groups || []) {
    if (!selected.has(providerId)) continue;
    byProvider.set(providerId, Array.isArray(models) ? models : []);
  }

  const targets: ProviderTestTarget[] = [];
  for (const providerId of selected) {
    const models = byProvider.get(providerId) || [];
    const modelIds = models
      .map((m) => {
        const value = typeof m?.value === "string" ? m.value.trim() : "";
        if (value) return value;
        const id = typeof m?.id === "string" ? m.id.trim() : "";
        return id;
      })
      .filter((id) => id.length > 0);
    if (modelIds.length === 0) continue;
    targets.push({
      providerId,
      connectionId: resolveConnectionIdForProvider(providerId, opts.activeProviders),
      modelIds,
    });
  }
  return targets;
}

export function chunkItems<T>(items: T[], size: number = PROVIDER_TEST_CHUNK_SIZE): T[][] {
  const chunkSize = Number.isFinite(size) && size > 0 ? Math.floor(size) : PROVIDER_TEST_CHUNK_SIZE;
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    out.push(items.slice(i, i + chunkSize));
  }
  return out;
}

/** Toggle a provider id in a selection set (immutable). */
export function toggleProviderSelection(
  selected: ReadonlySet<string>,
  providerId: string
): Set<string> {
  const next = new Set(selected);
  if (!providerId) return next;
  if (next.has(providerId)) next.delete(providerId);
  else next.add(providerId);
  return next;
}

/**
 * Classify a /api/models/test-all entry as working (ok|slow) vs failed.
 * Combo modal never auto-hides — keep the check intentionally thin.
 */
export function isProviderTestEntryWorking(
  entry: {
    status?: string | null;
  } | null
): boolean {
  const status = typeof entry?.status === "string" ? entry.status : "";
  return status === "ok" || status === "slow";
}

export function formatProviderTestResults(ok: number, total: number): string {
  const safeOk = Number.isFinite(ok) ? Math.max(0, Math.floor(ok)) : 0;
  const safeTotal = Number.isFinite(total) ? Math.max(0, Math.floor(total)) : 0;
  return `${safeOk} of ${safeTotal} models working`;
}

/**
 * Models that passed the last provider test.
 * `alreadyAdded: false` → ready to add to the combo.
 * `alreadyAdded: true` → already in the combo (for Unselect working).
 */
export function collectWorkingModelsToSelect<T extends { value?: string | null }>(opts: {
  models: T[];
  modelTestStatus: Record<string, "ok" | "error" | string>;
  addedModelValues?: Iterable<string> | null;
  alreadyAdded?: boolean;
}): T[] {
  const wantAdded = opts.alreadyAdded === true;
  const added = new Set(
    Array.from(opts.addedModelValues || []).filter(
      (v) => typeof v === "string" && v.trim().length > 0
    )
  );
  const models = Array.isArray(opts.models) ? opts.models : [];
  const status = opts.modelTestStatus || {};
  return models.filter((model) => {
    const value = typeof model?.value === "string" ? model.value.trim() : "";
    if (!value) return false;
    if (status[value] !== "ok") return false;
    return wantAdded ? added.has(value) : !added.has(value);
  });
}

/** True once at least one model reported ok from a provider test run. */
export function hasWorkingTestResults(
  modelTestStatus: Record<string, "ok" | "error" | string> | null | undefined
): boolean {
  if (!modelTestStatus) return false;
  return Object.values(modelTestStatus).some((status) => status === "ok");
}

/** Visible provider ids for Select-all / Clear provider checkboxes. */
export function listVisibleProviderIds(
  groups: Array<[string, unknown]> | Record<string, unknown> | null | undefined
): string[] {
  if (!groups) return [];
  if (Array.isArray(groups)) {
    return groups.map(([id]) => id).filter((id) => typeof id === "string" && id.trim().length > 0);
  }
  return Object.keys(groups).filter((id) => id.trim().length > 0);
}
