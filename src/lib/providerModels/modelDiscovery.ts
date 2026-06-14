import {
  getSyncedAvailableModelsForConnection,
  replaceSyncedAvailableModelsForConnection,
  type SyncedAvailableModel,
} from "@/lib/db/models";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

/**
 * Resolve a positive integer token limit from a list of candidate values.
 * Used to fall back across the differently-named context/output fields that
 * upstream catalogs expose (e.g. OpenRouter uses `context_length` /
 * `top_provider.context_length` instead of `inputTokenLimit`). See #3202.
 */
function firstPositiveNumber(...candidates: unknown[]): number | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === "number" && Number.isFinite(candidate) && candidate > 0) {
      return candidate;
    }
  }
  return undefined;
}

export function isAutoFetchModelsEnabled(providerSpecificData: unknown): boolean {
  return asRecord(providerSpecificData).autoFetchModels !== false;
}

export function normalizeDiscoveredModels(models: unknown): SyncedAvailableModel[] {
  const items = Array.isArray(models) ? models : [];
  const deduped = new Map<string, SyncedAvailableModel>();

  for (const item of items) {
    const record = asRecord(item);
    const id =
      toNonEmptyString(record.id) ||
      toNonEmptyString(record.name) ||
      toNonEmptyString(record.model);
    if (!id) continue;

    const name =
      toNonEmptyString(record.name) ||
      toNonEmptyString(record.displayName) ||
      toNonEmptyString(record.model) ||
      id;
    const supportedEndpoints = Array.isArray(record.supportedEndpoints)
      ? Array.from(
          new Set(
            record.supportedEndpoints
              .map((endpoint) => toNonEmptyString(endpoint))
              .filter((endpoint): endpoint is string => Boolean(endpoint))
          )
        ).sort()
      : undefined;

    const topProvider = asRecord(record.top_provider);

    // OpenRouter (and similar passthrough catalogs) report the context window as
    // `context_length` / `top_provider.context_length`, not `inputTokenLimit`.
    // Fall back across those names so synced models carry a real window instead
    // of the provider default (128K). Explicit `inputTokenLimit` still wins. #3202
    const inputTokenLimit = firstPositiveNumber(
      record.inputTokenLimit,
      record.context_length,
      record.contextLength,
      topProvider.context_length
    );
    const outputTokenLimit = firstPositiveNumber(
      record.outputTokenLimit,
      topProvider.max_completion_tokens
    );

    deduped.set(id, {
      id,
      name,
      source: "imported",
      ...(toNonEmptyString(record.apiFormat)
        ? { apiFormat: toNonEmptyString(record.apiFormat)! }
        : {}),
      ...(supportedEndpoints && supportedEndpoints.length > 0 ? { supportedEndpoints } : {}),
      ...(typeof inputTokenLimit === "number" ? { inputTokenLimit } : {}),
      ...(typeof outputTokenLimit === "number" ? { outputTokenLimit } : {}),
      ...(typeof record.description === "string" ? { description: record.description } : {}),
      ...(record.supportsThinking === true ? { supportsThinking: true } : {}),
    });
  }

  return Array.from(deduped.values());
}

export async function getCachedDiscoveredModels(
  providerId: string,
  connectionId: string
): Promise<SyncedAvailableModel[]> {
  return getSyncedAvailableModelsForConnection(providerId, connectionId);
}

export async function persistDiscoveredModels(
  providerId: string,
  connectionId: string,
  models: unknown
): Promise<SyncedAvailableModel[]> {
  const normalized = normalizeDiscoveredModels(models);
  await replaceSyncedAvailableModelsForConnection(providerId, connectionId, normalized);
  return normalized;
}
