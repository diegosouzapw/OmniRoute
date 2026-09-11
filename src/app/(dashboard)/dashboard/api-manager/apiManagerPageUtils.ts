import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";

export type KeyStatus = "active" | "disabled" | "banned" | "expired";

// "manage" scope = management key; "restricted" = has model/connection allowlists;
// "standard" = no manage scope and no allowlists.
// Note: a "manage" key with allowlists is still classified as "manage" (manage takes priority).
export type KeyType = "standard" | "manage" | "restricted";

export interface ApiKeyShape {
  isActive?: boolean;
  isBanned?: boolean;
  expiresAt?: string | null;
  scopes?: string[];
  allowedModels?: string[] | null;
  allowedConnections?: string[] | null;
  /** Public shape: "all" | "restricted". Absent on legacy keys. */
  modelAccessMode?: "all" | "restricted" | null;
}

export function isKeyActive(k: ApiKeyShape): boolean {
  if (k.isBanned === true) return false;
  if (k.isActive === false) return false;
  if (k.expiresAt) {
    return new Date(k.expiresAt).getTime() > Date.now();
  }
  return true;
}

export function isExpired(k: ApiKeyShape): boolean {
  if (!k.expiresAt) return false;
  const ts = new Date(k.expiresAt).getTime();
  if (Number.isNaN(ts)) return false;
  return ts < Date.now();
}

export function isRestricted(k: ApiKeyShape): boolean {
  // Explicit restricted mode classifies as restricted even with an empty
  // allow-list (restricted + zero selections means deny-all). Legacy keys
  // without a mode keep the historical "empty means allow all" semantics.
  if (k.modelAccessMode === "restricted") return true;
  const hasModelRestrictions = Array.isArray(k.allowedModels) && k.allowedModels.length > 0;
  const hasConnectionRestrictions =
    Array.isArray(k.allowedConnections) && k.allowedConnections.length > 0;
  return hasModelRestrictions || hasConnectionRestrictions;
}

export function classifyKeyStatus(k: ApiKeyShape): KeyStatus {
  if (k.isBanned === true) return "banned";
  if (isExpired(k)) return "expired";
  if (k.isActive === false) return "disabled";
  return "active";
}

export function classifyKeyType(k: ApiKeyShape): KeyType {
  if (Array.isArray(k.scopes) && k.scopes.includes("manage")) return "manage";
  if (isRestricted(k)) return "restricted";
  return "standard";
}

export interface ApiKeyCounts {
  total: number;
  active: number;
  disabled: number;
  banned: number;
  expired: number;
  standard: number;
  manage: number;
  restricted: number;
}

export function computeApiKeyCounts(keys: ApiKeyShape[]): ApiKeyCounts {
  const counts: ApiKeyCounts = {
    total: keys.length,
    active: 0,
    disabled: 0,
    banned: 0,
    expired: 0,
    standard: 0,
    manage: 0,
    restricted: 0,
  };

  for (const k of keys) {
    const status = classifyKeyStatus(k);
    counts[status] += 1;

    const type = classifyKeyType(k);
    counts[type] += 1;
  }

  return counts;
}

export function toLocalDateTimeInputValue(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export function formatUsdCost(value: number, locale: string): string {
  const amount = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount > 0 && amount < 1 ? 4 : 2,
    maximumFractionDigits: amount > 0 && amount < 1 ? 4 : 2,
  }).format(amount);
}

/**
 * Mask a fully revealed API key for the at-rest display: keep the first 8 chars
 * (provider prefix + a few entropy bits, e.g. `sk-or-12...`), append an ellipsis.
 * Returns "" for empty/missing input so the UI can render an empty `<code>` cleanly.
 */
export function maskKey(fullKey: string | null | undefined): string {
  if (!fullKey) return "";
  if (fullKey.includes("****")) return fullKey;
  return fullKey.length > 8 ? `${fullKey.slice(0, 8)}...` : fullKey;
}

/**
 * Immutable Set toggle helper for the "which keys are currently revealed" state.
 * Returns a NEW Set so React state setters always see a fresh reference.
 */
export function toggleKeyVisibility(prev: Set<string>, keyId: string): Set<string> {
  const next = new Set(prev);
  if (next.has(keyId)) next.delete(keyId);
  else next.add(keyId);
  return next;
}

// ──────────────── Provider-scope (dynamic provider/*) model permissions ────────────────

/** Reference to a catalog model used to resolve provider ownership. */
export interface ProviderModelRef {
  id: string;
  owned_by?: string;
  providerId?: string;
}

export interface ProviderScopeOptions {
  /** Canonical provider id (fallback owner for alias-prefixed catalog ids). */
  providerId?: string;
  /** Canonical owner id (fallback owner when providerId is absent). */
  ownedBy?: string;
  /** Catalog models used to map alias-prefixed ids to their canonical owner. */
  providerModels?: ProviderModelRef[];
}

/** Canonical provider id segment of a wildcard entry ("ollama-cloud/*" → "ollama-cloud"). */
function providerWildcardId(entry: string): string | null {
  return entry.endsWith("/*") ? entry.slice(0, -2) : null;
}

/**
 * Resolve the canonical owner id of a single entry. Exact model ids resolve
 * through the catalog (alias-prefixed ids like `ollamacloud/llama3` map to
 * their canonical `owned_by`), falling back to the id's prefix segment and
 * then to the provided canonical provider fallback. Wildcards resolve to
 * their own provider segment (already canonical).
 */
function resolveEntryProvider(entry: string, options?: ProviderScopeOptions): string {
  const wildcard = providerWildcardId(entry);
  if (wildcard !== null) return wildcard;
  const model = options?.providerModels?.find((m) => m.id === entry);
  const fallback = options?.providerId ?? options?.ownedBy;
  return model?.owned_by ?? model?.providerId ?? entry.split("/")[0] ?? fallback ?? entry;
}

/**
 * Resolve the canonical owner id of a catalog model. Prefers the catalog
 * `owned_by` (alias-prefixed ids map to their canonical owner), then the
 * provided provider fallback, then the model-id prefix.
 */
function resolveModelProvider(modelId: string, options?: ProviderScopeOptions): string {
  const model = options?.providerModels?.find((m) => m.id === modelId);
  return (
    model?.owned_by ??
    model?.providerId ??
    options?.ownedBy ??
    options?.providerId ??
    modelId.split("/")[0]
  );
}

/**
 * Toggle a canonical `provider/*` scope on/off inside a selection list.
 *
 * Selecting: removes every currently known exact entry owned by the provider
 * (exact id-prefix children, alias-prefixed catalog children and the raw
 * wildcard alike), then appends the canonical wildcard. Unknown/offline rules
 * and exact selections from other providers are preserved.
 * Deselecting: removes only that provider's wildcard, preserving everything else.
 */
export function toggleProviderWildcardSelection(
  selected: string[],
  providerId: string,
  options?: ProviderScopeOptions
): string[] {
  const wildcard = `${providerId}/*`;
  if (selected.includes(wildcard)) {
    return selected.filter((entry) => entry !== wildcard);
  }
  const kept = selected.filter(
    (entry) =>
      providerWildcardId(entry) !== null || resolveEntryProvider(entry, options) !== providerId
  );
  return [...kept, wildcard];
}

/**
 * Whether a model is covered by a selected `provider/*` scope. Ownership is
 * resolved via the canonical owner (catalog `owned_by` / provided fallback),
 * not the model-id prefix, so alias-prefixed catalog ids still inherit.
 */
export function isModelInheritedByProviderScope(
  selected: string[],
  modelId: string,
  options?: ProviderScopeOptions
): boolean {
  const owner = resolveModelProvider(modelId, options);
  return owner != null && selected.includes(`${owner}/*`);
}

/**
 * Whether a model may be toggled individually. Models inherited through a
 * selected provider scope are disabled/non-toggleable; manual exact models
 * from other providers stay toggleable.
 */
export function isModelIndividuallyToggleable(
  selected: string[],
  modelId: string,
  options?: ProviderScopeOptions
): boolean {
  return !isModelInheritedByProviderScope(selected, modelId, options);
}

/**
 * Split persisted allowedModels back into provider wildcards and exact model
 * entries so reopening the modal restores provider-level selections.
 * `providerModels` is accepted for forward-compatible owner normalization but
 * is not required: wildcard entries are already canonical.
 */
export function restoreProviderScopeSelection(
  allowedModels: string[],
  _options?: { providerModels?: ProviderModelRef[] }
): { providerWildcards: string[]; exactModels: string[] } {
  void _options;
  const providerWildcards: string[] = [];
  const exactModels: string[] = [];
  for (const entry of allowedModels) {
    if (providerWildcardId(entry) !== null) providerWildcards.push(entry);
    else exactModels.push(entry);
  }
  return { providerWildcards, exactModels };
}

export function formatProviderModelPermissionSummary(
  providerCount: number,
  modelCount: number,
  t: (key: string, values?: Record<string, unknown>) => string,
  tc: (key: string) => string
): string {
  const providerLabel =
    providerCount > 0
      ? `${providerCount} ${tc(providerCount === 1 ? "provider" : "providers")}`
      : "";
  const modelLabel = modelCount > 0 ? t("modelsCount", { count: modelCount }) : "";
  return (
    [providerLabel, modelLabel].filter(Boolean).join(" · ") || t("selectedCount", { count: 0 })
  );
}

/**
 * Persisted payload for the model access section. Allow All always saves an
 * empty allow-list with mode "all"; Restrict (including zero selections)
 * saves the exact selection with mode "restricted".
 */
export function buildModelAccessSavePayload(input: {
  allowAll: boolean;
  selectedModels: string[];
}): { modelAccessMode: "all" | "restricted"; allowedModels: string[] } {
  if (input.allowAll) return { modelAccessMode: "all", allowedModels: [] };
  return { modelAccessMode: "restricted", allowedModels: input.selectedModels };
}

/**
 * Entries of an API key's `allowedCombos` that the Allowed Combos picker cannot
 * render: routing-rule names (`rt-*`) that `matchesComboAccessRule()` accepts via
 * its `rule === requestedModel` branch, or combos that are no longer loaded. The
 * picker keeps them in the selection (so Save round-trips the stored ACL), shows
 * them read-only, and lets them survive the "All" toggle — otherwise a later
 * "Restrict" + Save persisted `[]`, which is deny-all (#12267). Stored order is
 * preserved; the `combo/*` wildcard is the "All" marker, not a rule.
 */
export function listUnrenderableComboAccessRules(
  selectedCombos: readonly string[],
  allCombos: ReadonlyArray<{ name: string }>
): string[] {
  const renderable = new Set(allCombos.map((combo) => combo.name));
  return selectedCombos.filter(
    (name) => name !== ALL_COMBOS_ACCESS_RULE && !renderable.has(name)
  );
}
