import { wildcardMatch } from "@omniroute/open-sse/services/wildcardRouter.ts";

type JsonRecord = Record<string, unknown>;

interface ConnectionLike {
  providerSpecificData?: unknown;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function normalizePattern(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized || normalized === "**") return null;
  return normalized;
}

function toPatternList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(normalizePattern).filter((pattern): pattern is string => Boolean(pattern));
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map(normalizePattern)
      .filter((pattern): pattern is string => Boolean(pattern));
  }
  return [];
}

function uniquePatterns(patterns: string[]): string[] {
  return Array.from(new Set(patterns));
}

function getModelMatchCandidates(modelId: string): string[] {
  const normalized = modelId.trim();
  if (!normalized) return [];

  const withoutExtendedContext = normalized.endsWith("[1m]") ? normalized.slice(0, -4) : normalized;
  const lastSlashIndex = withoutExtendedContext.lastIndexOf("/");
  const rawModel =
    lastSlashIndex >= 0 ? withoutExtendedContext.slice(lastSlashIndex + 1) : withoutExtendedContext;

  return Array.from(new Set([normalized, withoutExtendedContext, rawModel].filter(Boolean)));
}

export function normalizeExcludedModelPatterns(value: unknown): string[] {
  return uniquePatterns(toPatternList(value));
}

export function getConnectionExcludedModels(providerSpecificData: unknown): string[] {
  const data = asRecord(providerSpecificData);
  return normalizeExcludedModelPatterns(data.excludedModels ?? data.excluded_models);
}

export function isModelExcludedByConnection(
  modelId: unknown,
  providerSpecificData: unknown
): boolean {
  if (typeof modelId !== "string" || modelId.trim().length === 0) return false;

  const candidates = getModelMatchCandidates(modelId);
  const excludedModels = getConnectionExcludedModels(providerSpecificData);
  if (candidates.length === 0 || excludedModels.length === 0) return false;

  return excludedModels.some((pattern) =>
    candidates.some((candidate) => wildcardMatch(candidate, pattern))
  );
}

export function hasEligibleConnectionForModel(
  connections: ConnectionLike[] | null | undefined,
  modelId: unknown
): boolean {
  if (!Array.isArray(connections) || connections.length === 0) return false;

  return connections.some(
    (connection) => !isModelExcludedByConnection(modelId, connection?.providerSpecificData)
  );
}

/**
 * #11089: does this connection's *synced* inventory advertise the model?
 *
 * Unlike `excludedModels` (a manually maintained denylist) this reads the
 * per-connection catalog written by model discovery, so a multi-host local
 * provider never routes a model to a host that never had it. Ids are matched
 * with the same candidate semantics as the denylist (provider prefix and the
 * `[1m]` extended-context suffix are tolerated), but never as wildcard
 * patterns — a synced id is a literal.
 *
 * Fails OPEN on an empty inventory: a host that has not been synced yet is
 * "unknown", not "does not have it".
 */
export function isModelAdvertisedByConnection(
  modelId: unknown,
  advertisedModelIds: ReadonlySet<string> | null | undefined
): boolean {
  if (!advertisedModelIds || advertisedModelIds.size === 0) return true;
  if (typeof modelId !== "string" || modelId.trim().length === 0) return true;

  return getModelMatchCandidates(modelId).some((candidate) => advertisedModelIds.has(candidate));
}
