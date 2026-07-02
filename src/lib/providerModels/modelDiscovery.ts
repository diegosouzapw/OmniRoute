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

function modalitiesIncludeImage(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.some((entry) => toNonEmptyString(entry)?.toLowerCase() === "image")
  );
}

/**
 * #4264: detect image-input (vision) capability from a discovered model record.
 * Handles the common upstream shapes: an explicit `supportsVision` flag, the
 * OpenRouter `architecture.input_modalities` array and string `architecture.modality`
 * ("text+image->text" — the input side is everything before "->"), and a top-level
 * `input_modalities` array. Returns false when the upstream exposes no modality info.
 */
export function detectVisionInput(record: JsonRecord): boolean {
  if (record.supportsVision === true) return true;

  const architecture = asRecord(record.architecture);
  if (modalitiesIncludeImage(architecture.input_modalities)) return true;
  if (modalitiesIncludeImage(record.input_modalities)) return true;

  const modality = toNonEmptyString(architecture.modality) || toNonEmptyString(record.modality);
  if (modality) {
    const [inputPart] = modality.toLowerCase().split("->");
    if ((inputPart || "").includes("image")) return true;
  }
  return false;
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

    // #4264: capture image-input (vision) capability at sync time. OpenRouter (and
    // similar passthrough catalogs) declare it via `architecture.input_modalities`
    // (e.g. ["text","image"]) or the string `architecture.modality` ("text+image->text");
    // some providers expose a top-level `input_modalities`. Without this, synced
    // models reached the catalog with no vision flag and vision-capable models
    // (which work at request time) showed up as non-vision after import.
    const supportsVision = detectVisionInput(record);

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
      ...(supportsVision ? { supportsVision: true } : {}),
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
