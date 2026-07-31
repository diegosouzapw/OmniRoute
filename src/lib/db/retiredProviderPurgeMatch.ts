/**
 * Exact provider/model matching and structured JSON cleanup used by the
 * retired-provider purge. Kept separate from the SQL orchestration so the
 * startup purge remains below the repository's per-file size cap.
 */

export type RetiredProviderPurgeMatchContext = {
  providerId: string;
  modelPrefix: string;
};

export const LEGACY_GITHUB_EMBEDDING_SIGNATURES = new Set([
  "github/text-embedding-3-small",
  "github/text-embedding-3-large",
]);
export const LEGACY_GITHUB_EMBEDDING_IDS = new Set([
  "text-embedding-3-small",
  "text-embedding-3-large",
]);

type JsonObject = Record<string, unknown>;

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function parseJson(value: unknown): unknown {
  if (!isString(value)) return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isLegacyGithubEmbedding(value: string, provider?: string): boolean {
  if (LEGACY_GITHUB_EMBEDDING_SIGNATURES.has(value)) return true;
  return provider === "github" && LEGACY_GITHUB_EMBEDDING_IDS.has(value);
}

export function isRetiredModel(
  value: string,
  context: RetiredProviderPurgeMatchContext,
  provider?: string
): boolean {
  if (value.startsWith(context.modelPrefix) || isLegacyGithubEmbedding(value, provider)) {
    return true;
  }
  return value.startsWith(`${context.providerId}/`);
}

export function isRetiredProvider(
  value: string,
  context: RetiredProviderPurgeMatchContext
): boolean {
  return value === context.providerId;
}

export function scrubRetiredProviderJsonValue(
  value: unknown,
  context: RetiredProviderPurgeMatchContext,
  provider?: string
): unknown {
  if (isString(value)) {
    return isRetiredModel(value, context, provider) || isRetiredProvider(value, context)
      ? undefined
      : value;
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => scrubRetiredProviderJsonValue(item, context, provider))
      .filter((item) => item !== undefined);
  }
  if (value && typeof value === "object") {
    const source = value as JsonObject;
    let objectProvider = provider;
    for (const key of ["provider", "providerId", "sourceProvider"]) {
      if (isString(source[key])) {
        objectProvider = source[key];
        break;
      }
    }
    const objectModel = ["model", "modelId", "model_id", "model_str", "targetModel", "sourceModel"]
      .map((key) => source[key])
      .find(isString);
    if (
      (objectProvider && isRetiredProvider(objectProvider, context)) ||
      (isString(objectModel) && isRetiredModel(objectModel, context, objectProvider))
    ) {
      return undefined;
    }

    const result: JsonObject = {};
    for (const [key, child] of Object.entries(source)) {
      if (key === "provider" || key === "providerId" || key === "sourceProvider") {
        if (isString(child)) objectProvider = child;
      }
      if (isRetiredProvider(key, context) || isRetiredModel(key, context, objectProvider)) continue;
      const cleaned = scrubRetiredProviderJsonValue(child, context, objectProvider);
      if (cleaned !== undefined) result[key] = cleaned;
    }
    return result;
  }
  return value;
}

export function scrubRetiredProviderJsonText(
  value: unknown,
  context: RetiredProviderPurgeMatchContext,
  provider?: string
): unknown {
  if (!isString(value)) return value;
  const parsed = parseJson(value);
  if (parsed === null || (typeof parsed !== "object" && !Array.isArray(parsed))) return value;
  const cleaned = scrubRetiredProviderJsonValue(parsed, context, provider);
  if (cleaned === undefined) return Array.isArray(parsed) ? "[]" : "{}";
  return JSON.stringify(cleaned);
}
