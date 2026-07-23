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
}: {
  providerId: string;
  modelId: string;
  connectionId?: string | null;
  connectionLabel?: string | null;
  /** #3266: account allowlist scoping round-robin to a subset of connections. */
  allowedConnectionIds?: string[] | null;
  weight?: number;
}): ComboModelStep {
  const normalizedProviderId = toTrimmedString(providerId) || "provider";
  const normalizedModelId = toTrimmedString(modelId) || "model";
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
    model: `${normalizedProviderId}/${normalizedModelId}`,
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

  return buildPrecisionComboModelStep({
    providerId,
    modelId: parsed.modelId,
    weight,
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
