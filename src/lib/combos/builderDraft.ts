import type { ComboModelStep } from "@/lib/combos/steps";

type JsonRecord = Record<string, unknown>;

export const COMBO_BUILDER_AUTO_CONNECTION = "__auto__";
export const COMBO_BUILDER_STAGES = [
  "basics",
  "steps",
  "strategy",
  "intelligent",
  "review",
] as const;

export type ComboBuilderStage = (typeof COMBO_BUILDER_STAGES)[number];
export type ComboBuilderStageOptions = {
  strategy?: string | null;
};

export function isIntelligentBuilderStrategy(strategy: unknown): boolean {
  return strategy === "auto" || strategy === "lkgp";
}

export type ComboEligibleConnectionLike = {
  isActive?: boolean | null;
  testStatus?: string | null;
};

/**
 * Whether a provider connection should be treated as eligible for the combo
 * builder's "active providers" list (used to decide which providers get their
 * models fetched/shown when creating or editing a combo).
 *
 * Newly-created connections default `testStatus` to `null` until someone
 * explicitly runs a connection test (`src/lib/db/providers.ts`). Excluding
 * those from the combo builder meant a freshly-added custom provider's models
 * never populated the combo model picker until an operator manually tested
 * the connection — matching the reported symptom (#2057). "Never tested" is
 * therefore treated the same as "known good", consistent with
 * `deriveConnectionStatus` in `src/lib/combos/builderOptions.ts`, which only
 * flags a connection as an error when `testStatus` explicitly matches
 * `/error|fail/i`.
 */
export function isEligibleActiveConnection(connection: ComboEligibleConnectionLike): boolean {
  if (connection.isActive === false) return false;
  const testStatus = connection.testStatus;
  if (!testStatus) return true;
  return testStatus === "active" || testStatus === "success" || testStatus === "unknown";
}

export function getComboBuilderStages(options: ComboBuilderStageOptions = {}): ComboBuilderStage[] {
  if (isIntelligentBuilderStrategy(options.strategy)) {
    return [...COMBO_BUILDER_STAGES];
  }

  return COMBO_BUILDER_STAGES.filter((stage) => stage !== "intelligent");
}

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toTrimmedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function parseQualifiedModel(
  value: unknown
): { providerId: string; modelId: string } | null {
  const qualifiedModel = toTrimmedString(value);
  if (!qualifiedModel) return null;
  const firstSlashIndex = qualifiedModel.indexOf("/");
  if (firstSlashIndex <= 0 || firstSlashIndex >= qualifiedModel.length - 1) return null;
  return {
    providerId: qualifiedModel.slice(0, firstSlashIndex),
    modelId: qualifiedModel.slice(firstSlashIndex + 1),
  };
}

export function buildPrecisionComboModelStep({
  providerId,
  modelId,
  connectionId = null,
  connectionLabel,
  allowedConnectionIds = null,
  weight = 0,
  modelPrefix,
}: {
  providerId: string;
  modelId: string;
  connectionId?: string | null;
  connectionLabel?: string | null;
  /** #3266: account allowlist scoping round-robin to a subset of connections. */
  allowedConnectionIds?: string[] | null;
  weight?: number;
  /**
   * #11433: the routing-prefix segment to serialize into `model` (e.g. "oc"
   * for the no-auth OpenCode Free provider), when it differs from the
   * canonical `providerId`. Some canonical provider ids collide with an
   * unrelated manual `ALIAS_TO_PROVIDER_ID` routing override (`opencode` →
   * `opencode-zen`), so reconstructing `model` from the raw `providerId`
   * alone can round-trip to the wrong provider on request routing. Falls
   * back to `providerId` when omitted/blank. `step.providerId` always stays
   * the canonical id regardless, so routing/duplicate-detection identity is
   * unaffected.
   */
  modelPrefix?: string | null;
}): ComboModelStep {
  const normalizedProviderId = toTrimmedString(providerId) || "provider";
  const normalizedModelId = toTrimmedString(modelId) || "model";
  const normalizedModelPrefix = toTrimmedString(modelPrefix) || normalizedProviderId;
  const normalizedConnectionId = toTrimmedString(connectionId);
  const normalizedConnectionLabel = toTrimmedString(connectionLabel);
  // A pinned single connection wins over an allowlist, so only carry the allowlist
  // when the step is auto-selecting (no forced connectionId).
  const normalizedAllowed =
    !normalizedConnectionId && Array.isArray(allowedConnectionIds)
      ? Array.from(
          new Set(
            allowedConnectionIds.map((id) => toTrimmedString(id)).filter((id): id is string => !!id)
          )
        )
      : [];

  return {
    kind: "model",
    providerId: normalizedProviderId,
    model: `${normalizedModelPrefix}/${normalizedModelId}`,
    ...(normalizedConnectionId ? { connectionId: normalizedConnectionId } : {}),
    ...(normalizedConnectionLabel ? { label: normalizedConnectionLabel } : {}),
    ...(normalizedAllowed.length > 0 ? { allowedConnectionIds: normalizedAllowed } : {}),
    weight: Number.isFinite(weight) ? Math.max(0, Math.min(100, Number(weight))) : 0,
  };
}

type ComboBuilderProviderIdentity = {
  providerId?: unknown;
  alias?: unknown;
  prefix?: unknown;
};

export function resolveComboBuilderProviderId(
  providerIdOrAlias: unknown,
  providers: ComboBuilderProviderIdentity[] = []
): string | null {
  const normalizedProviderId = toTrimmedString(providerIdOrAlias);
  if (!normalizedProviderId) return null;

  const matchedProvider = providers.find((provider) => {
    const providerId = toTrimmedString(provider.providerId);
    const alias = toTrimmedString(provider.alias);
    const prefix = toTrimmedString(provider.prefix);
    return (
      providerId === normalizedProviderId ||
      alias === normalizedProviderId ||
      prefix === normalizedProviderId
    );
  });

  return toTrimmedString(matchedProvider?.providerId) || null;
}

export function buildManualComboModelStep({
  value,
  providers = [],
  weight = 0,
}: {
  value: unknown;
  providers?: ComboBuilderProviderIdentity[];
  weight?: number;
}): ComboModelStep | null {
  const parsed = parseQualifiedModel(value);
  if (!parsed) return null;

  const providerId = resolveComboBuilderProviderId(parsed.providerId, providers);
  if (!providerId) return null;

  // #11433: preserve the user-typed prefix (e.g. "oc") as the routing prefix
  // instead of letting buildPrecisionComboModelStep rebuild `model` from the
  // resolved canonical providerId, which can collide with an unrelated
  // manual alias override (e.g. "opencode" -> "opencode-zen").
  return buildPrecisionComboModelStep({
    providerId,
    modelId: parsed.modelId,
    weight,
    modelPrefix: parsed.providerId,
  });
}

export function getExactModelStepSignature(entry: unknown): string | null {
  if (!isRecord(entry) || entry.kind === "combo-ref") return null;
  const modelValue = toTrimmedString(entry.model);
  const parsed = parseQualifiedModel(modelValue);
  if (!parsed) return null;

  const normalizedProviderId = toTrimmedString(entry.providerId) || parsed.providerId;
  const normalizedConnectionId =
    toTrimmedString(entry.connectionId) || COMBO_BUILDER_AUTO_CONNECTION;

  return `model:${normalizedProviderId}:${parsed.modelId}:${normalizedConnectionId}`;
}

export function hasExactModelStepDuplicate(entries: unknown[], candidate: unknown): boolean {
  const candidateSignature = getExactModelStepSignature(candidate);
  if (!candidateSignature) return false;

  return entries.some((entry) => getExactModelStepSignature(entry) === candidateSignature);
}

export function findNextSuggestedConnectionId(
  entries: unknown[],
  providerId: string,
  modelId: string,
  connections: Array<{ id?: string | null }> = []
): string {
  for (const connection of connections) {
    const connectionId = toTrimmedString(connection?.id);
    if (!connectionId) continue;

    const step = buildPrecisionComboModelStep({
      providerId,
      modelId,
      connectionId,
    });
    if (!hasExactModelStepDuplicate(entries, step)) {
      return connectionId;
    }
  }

  return COMBO_BUILDER_AUTO_CONNECTION;
}

export type ComboBuilderGlobalModelEntry = {
  providerId: string;
  providerName: string;
  modelId: string;
  modelName: string;
  connectionCount: number;
  connections: unknown[];
  step: ComboModelStep;
};

type ComboBuilderGlobalProvider = {
  providerId?: unknown;
  displayName?: unknown;
  connectionCount?: unknown;
  connections?: unknown[];
  models?: Array<{ id?: unknown; name?: unknown; qualifiedModel?: unknown }>;
};

/**
 * Flattens the combo builder's provider→model tree into a single searchable
 * list (one row per provider/model pair), used by the "global model search"
 * selection mode in the combo builder (#8285). Each entry carries the exact
 * `ComboModelStep` that would be added if the user picks it, pre-built with
 * no pinned connection so the combo auto-selects at runtime.
 */
export function buildGlobalModelList(
  providers: ComboBuilderGlobalProvider[] = []
): ComboBuilderGlobalModelEntry[] {
  const list: ComboBuilderGlobalModelEntry[] = [];

  (providers || []).forEach((provider) => {
    const providerId = toTrimmedString(provider?.providerId) || "";
    if (!providerId) return;
    const providerName = toTrimmedString(provider?.displayName) || providerId;
    const connectionCount =
      typeof provider?.connectionCount === "number" ? provider.connectionCount : 0;
    const connections = Array.isArray(provider?.connections) ? provider.connections : [];

    (provider?.models || []).forEach((model) => {
      const modelId = toTrimmedString(model?.id);
      if (!modelId) return;
      const modelName = toTrimmedString(model?.name) || modelId;
      // #11433: derive the routing prefix from the model's already-corrected
      // `qualifiedModel` (e.g. "oc/<model>" for the OpenCode Free provider)
      // instead of defaulting to the raw providerId, which can collide with
      // an unrelated manual alias override.
      const modelPrefix = parseQualifiedModel(model?.qualifiedModel)?.providerId || providerId;
      const step = buildPrecisionComboModelStep({
        providerId,
        modelId,
        connectionId: null,
        connectionLabel: null,
        allowedConnectionIds: [],
        modelPrefix,
      });
      list.push({
        providerId,
        providerName,
        modelId,
        modelName,
        connectionCount,
        connections,
        step,
      });
    });
  });

  return list;
}

/**
 * Case-insensitive substring filter over `buildGlobalModelList()` output,
 * matching against provider display name, provider id, model name and model
 * id combined. Empty/whitespace-only query returns the full list unfiltered.
 */
export function filterGlobalModelList(
  entries: ComboBuilderGlobalModelEntry[],
  query: string
): ComboBuilderGlobalModelEntry[] {
  const normalizedQuery = (query || "").trim().toLowerCase();
  if (!normalizedQuery) return entries;
  return entries.filter((item) => {
    const text =
      `${item.providerName} ${item.providerId} ${item.modelName} ${item.modelId}`.toLowerCase();
    return text.includes(normalizedQuery);
  });
}

/**
 * Appends a single global-search step to the combo's model list, skipping it
 * if an exact provider/model/account duplicate is already present. Returns
 * the original array reference when nothing changed so callers can skip a
 * state update.
 */
export function addGlobalModelStep(entries: unknown[], step: unknown): unknown[] {
  if (hasExactModelStepDuplicate(entries, step)) return entries;
  return [...entries, step];
}

/**
 * Appends every non-duplicate step from a filtered global-search result set,
 * de-duplicating against both the existing combo models and steps already
 * queued earlier in the same batch (so two search matches that resolve to
 * the same provider/model/account never get added twice). Returns the
 * original array reference when nothing changed.
 */
export function addAllGlobalSearchMatches(
  entries: unknown[],
  matches: ComboBuilderGlobalModelEntry[]
): unknown[] {
  const newSteps: unknown[] = [];
  (matches || []).forEach((item) => {
    if (!hasExactModelStepDuplicate([...entries, ...newSteps], item.step)) {
      newSteps.push(item.step);
    }
  });
  return newSteps.length > 0 ? [...entries, ...newSteps] : entries;
}

export function getComboBuilderStageChecks({
  name,
  nameError,
  modelsCount,
  hasInvalidWeightedTotal,
  hasCostOptimizedWithoutPricing,
}: {
  name: string;
  nameError?: string | null;
  modelsCount: number;
  hasInvalidWeightedTotal?: boolean;
  hasCostOptimizedWithoutPricing?: boolean;
}) {
  return {
    basics: Boolean(toTrimmedString(name)) && !toTrimmedString(nameError),
    steps: modelsCount > 0,
    strategy: !Boolean(hasInvalidWeightedTotal) && !Boolean(hasCostOptimizedWithoutPricing),
    review: false,
  };
}

export function canAccessComboBuilderStage(
  stage: ComboBuilderStage,
  checks: ReturnType<typeof getComboBuilderStageChecks>,
  options: ComboBuilderStageOptions = {}
): boolean {
  const availableStages = getComboBuilderStages(options);
  if (!availableStages.includes(stage)) return false;
  if (stage === "basics") return true;
  if (stage === "steps") return checks.basics;
  if (stage === "strategy") return checks.basics && checks.steps;
  if (stage === "intelligent") return checks.basics && checks.steps && checks.strategy;
  if (stage === "review") return checks.basics && checks.steps;
  return false;
}

export function getNextComboBuilderStage(
  stage: ComboBuilderStage,
  options: ComboBuilderStageOptions = {}
): ComboBuilderStage {
  const stages = getComboBuilderStages(options);
  const stageIndex = stages.indexOf(stage);
  if (stageIndex === -1 || stageIndex >= stages.length - 1) {
    return "review";
  }
  return stages[stageIndex + 1];
}

export function getPreviousComboBuilderStage(
  stage: ComboBuilderStage,
  options: ComboBuilderStageOptions = {}
): ComboBuilderStage {
  const stages = getComboBuilderStages(options);
  const stageIndex = stages.indexOf(stage);
  if (stageIndex <= 0) return "basics";
  return stages[stageIndex - 1];
}

export type ComboBuilderModelCandidate = {
  value?: unknown;
  providerId?: unknown;
};

export type ComboBuilderDraftModelStep = {
  model: string;
  providerId?: string;
  weight: number;
};

/**
 * Resolve the providerId for one "Select all" candidate: an exact/alias/prefix
 * match in `builderProviders` wins, falling back to whatever provider prefix
 * the qualified model string itself carries. Split out of
 * `computeBatchAddModelSteps` to keep that loop under the complexity budget.
 */
function resolveBatchCandidateProviderId(
  model: ComboBuilderModelCandidate,
  parsedModel: { providerId: string; modelId: string } | null,
  builderProviders: ComboBuilderProviderIdentity[]
): string | null {
  return (
    resolveComboBuilderProviderId(model?.providerId, builderProviders) ||
    resolveComboBuilderProviderId(parsedModel?.providerId, builderProviders) ||
    (typeof model?.providerId === "string" && model.providerId.trim()) ||
    parsedModel?.providerId ||
    null
  );
}

/**
 * Batch-add handler for ModelSelectModal's "Select all" (`onSelectMany`) in
 * the combo builder — must apply every candidate against a growing list in
 * ONE pass. Looping the single-add handler N times would have each call
 * close over the same stale `models` snapshot and only the last selected
 * model would survive (#8526).
 *
 * This is the real implementation `ComboFormModal::handleAddModels` in
 * `page.tsx` delegates to, so unit tests exercise actual production logic
 * instead of a hand-maintained copy that can drift from the component.
 */
export function computeBatchAddModelSteps(
  models: ComboBuilderDraftModelStep[],
  selected: ComboBuilderModelCandidate[],
  builderProviders: ComboBuilderProviderIdentity[] = []
): { next: ComboBuilderDraftModelStep[]; addedAny: boolean } {
  if (!Array.isArray(selected) || selected.length === 0) {
    return { next: models, addedAny: false };
  }
  const next = [...models];
  let addedAny = false;
  for (const model of selected) {
    const qualifiedModel = typeof model?.value === "string" ? model.value : "";
    if (!qualifiedModel) continue;
    const parsedModel = parseQualifiedModel(qualifiedModel);
    const resolvedProviderId = resolveBatchCandidateProviderId(
      model,
      parsedModel,
      builderProviders
    );
    const nextEntry: ComboBuilderDraftModelStep = {
      model: qualifiedModel,
      ...(resolvedProviderId ? { providerId: resolvedProviderId } : {}),
      weight: 0,
    };
    if (hasExactModelStepDuplicate(next, nextEntry)) continue;
    next.push(nextEntry);
    addedAny = true;
  }
  return { next, addedAny };
}

/**
 * Batch-remove handler for ModelSelectModal's "Unselect all" (`onDeselectMany`)
 * in the combo builder — same stale-snapshot reasoning as
 * `computeBatchAddModelSteps` above. Accepts either `{ value }` candidate
 * objects (from the modal) or raw qualified-model strings.
 *
 * Returns the same `models` reference (no-op) when there is nothing to
 * remove, so callers can skip the `setModels` call.
 */
export function computeBatchDeselectModelSteps(
  models: ComboBuilderDraftModelStep[],
  toRemove: Array<{ value?: unknown } | string>
): ComboBuilderDraftModelStep[] {
  if (!Array.isArray(toRemove) || toRemove.length === 0) return models;
  const values = new Set(
    toRemove
      .map((model) =>
        typeof (model as { value?: unknown })?.value === "string"
          ? (model as { value: string }).value
          : typeof model === "string"
            ? model
            : ""
      )
      .filter(Boolean)
  );
  if (values.size === 0) return models;
  return models.filter((m) => !values.has(m.model));
}
