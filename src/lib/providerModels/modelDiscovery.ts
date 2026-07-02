import {
  getSyncedAvailableModelsForConnection,
  replaceSyncedAvailableModelsForConnection,
  type SyncedAvailableModel,
} from "@/lib/db/models";
import { buildTokenLimitDeleteMarkers } from "@/lib/db/modelCompatCapabilities";
import { buildModelCompatFields } from "@/lib/db/modelConfigRows";

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

function firstNonNegativeNumber(...candidates: unknown[]): number | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === "number" && Number.isFinite(candidate) && candidate >= 0) {
      return candidate;
    }
  }
  return undefined;
}

function hasExplicitNull(record: JsonRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key) && record[key] === null;
}

function buildTopProviderDeleteMarkers(topProvider: JsonRecord): Record<string, null> {
  const markers: Record<string, null> = {};
  if (hasExplicitNull(topProvider, "context_length")) {
    markers.contextWindow = null;
    markers.maxInputTokens = null;
  }
  if (hasExplicitNull(topProvider, "max_completion_tokens")) markers.maxOutputTokens = null;
  return markers;
}

function modalitiesIncludeImage(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.some((entry) => toNonEmptyString(entry)?.toLowerCase() === "image")
  );
}

function hasInputModalities(value: unknown): boolean {
  return Array.isArray(value) && value.some((entry) => Boolean(toNonEmptyString(entry)));
}

/**
 * #4264: detect image-input (vision) capability from a discovered model record.
 * Handles the common upstream shapes: an explicit `supportsVision` flag, the
 * OpenRouter `architecture.input_modalities` array and string `architecture.modality`
 * ("text+image->text" — the input side is everything before "->"), and a top-level
 * `input_modalities` array.
 */
export function detectVisionInput(record: JsonRecord): boolean | undefined {
  if (typeof record.supportsVision === "boolean") return record.supportsVision;

  const architecture = asRecord(record.architecture);
  if (hasInputModalities(architecture.input_modalities)) {
    return modalitiesIncludeImage(architecture.input_modalities);
  }
  if (hasInputModalities(record.input_modalities)) {
    return modalitiesIncludeImage(record.input_modalities);
  }

  const modality = toNonEmptyString(architecture.modality) || toNonEmptyString(record.modality);
  if (modality) {
    const [inputPart] = modality.toLowerCase().split("->");
    return (inputPart || "").includes("image");
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
    const inputCapabilities = asRecord(record.capabilities);
    const inputCompat = asRecord(record.compat);
    const capabilityOverrides = {
      ...buildTokenLimitDeleteMarkers({ ...record, capabilities: inputCapabilities }),
      ...buildTopProviderDeleteMarkers(topProvider),
    };

    // OpenRouter (and similar passthrough catalogs) report the context window as
    // `context_length` / `top_provider.context_length`, not `inputTokenLimit`.
    // Fall back across those names so synced models carry a real window instead
    // of the provider default (128K). Explicit `inputTokenLimit` still wins. #3202
    const inputTokenLimit = firstPositiveNumber(
      record.inputTokenLimit,
      record.max_input_tokens,
      record.context_length,
      record.contextLength,
      topProvider.context_length,
      inputCapabilities.contextWindow,
      inputCapabilities.maxInputTokens
    );
    const outputTokenLimit = firstPositiveNumber(
      record.outputTokenLimit,
      record.max_output_tokens,
      topProvider.max_completion_tokens,
      inputCapabilities.maxOutputTokens
    );

    // #4264: capture image-input (vision) capability at sync time. OpenRouter (and
    // similar passthrough catalogs) declare it via `architecture.input_modalities`
    // (e.g. ["text","image"]) or the string `architecture.modality` ("text+image->text");
    // some providers expose a top-level `input_modalities`. Without this, synced
    // models reached the catalog with no vision flag and vision-capable models
    // (which work at request time) showed up as non-vision after import.
    const supportsVision =
      typeof inputCapabilities.supportsVision === "boolean"
        ? inputCapabilities.supportsVision
        : typeof record.supportsVision === "boolean"
          ? record.supportsVision
          : detectVisionInput(record);
    const supportsTools =
      typeof inputCapabilities.supportsTools === "boolean"
        ? inputCapabilities.supportsTools
        : typeof record.supportsTools === "boolean"
          ? record.supportsTools
          : typeof record.toolCalling === "boolean"
            ? record.toolCalling
            : undefined;
    const supportsReasoning =
      typeof inputCapabilities.supportsReasoning === "boolean"
        ? inputCapabilities.supportsReasoning
        : typeof inputCapabilities.supportsThinking === "boolean"
          ? inputCapabilities.supportsThinking
          : typeof record.supportsReasoning === "boolean"
            ? record.supportsReasoning
            : typeof record.supportsThinking === "boolean"
              ? record.supportsThinking
              : undefined;
    const supportsXHighEffort =
      typeof inputCapabilities.supportsXHighEffort === "boolean"
        ? inputCapabilities.supportsXHighEffort
        : typeof record.supportsXHighEffort === "boolean"
          ? record.supportsXHighEffort
          : undefined;
    const supportsMaxEffort =
      typeof inputCapabilities.supportsMaxEffort === "boolean"
        ? inputCapabilities.supportsMaxEffort
        : typeof record.supportsMaxEffort === "boolean"
          ? record.supportsMaxEffort
          : undefined;
    const defaultThinkingBudget = firstNonNegativeNumber(
      inputCapabilities.defaultThinkingBudget,
      record.defaultThinkingBudget
    );
    const thinkingBudgetCap = firstNonNegativeNumber(
      inputCapabilities.thinkingBudgetCap,
      inputCapabilities.maxThinkingBudget,
      record.thinkingBudgetCap,
      record.maxThinkingBudget
    );
    const interleavedField =
      toNonEmptyString(inputCapabilities.interleavedField) ||
      toNonEmptyString(record.interleavedField);
    const capabilities = {
      ...(typeof inputTokenLimit === "number"
        ? { contextWindow: inputTokenLimit, maxInputTokens: inputTokenLimit }
        : {}),
      ...(typeof outputTokenLimit === "number" ? { maxOutputTokens: outputTokenLimit } : {}),
      ...(typeof supportsVision === "boolean" ? { supportsVision } : {}),
      ...(typeof supportsTools === "boolean" ? { supportsTools } : {}),
      ...(typeof supportsReasoning === "boolean" ? { supportsReasoning } : {}),
      ...(typeof supportsXHighEffort === "boolean" ? { supportsXHighEffort } : {}),
      ...(typeof supportsMaxEffort === "boolean" ? { supportsMaxEffort } : {}),
      ...(typeof defaultThinkingBudget === "number" ? { defaultThinkingBudget } : {}),
      ...(typeof thinkingBudgetCap === "number" ? { thinkingBudgetCap } : {}),
      ...(interleavedField ? { interleavedField } : {}),
    };
    const targetFormat =
      toNonEmptyString(record.targetFormat) || toNonEmptyString(inputCompat.targetFormat);
    const unsupportedParams = Array.isArray(record.unsupportedParams)
      ? record.unsupportedParams
      : Array.isArray(inputCompat.unsupportedParams)
        ? inputCompat.unsupportedParams
        : undefined;
    const compat = buildModelCompatFields({
      ...inputCompat,
      ...(targetFormat ? { targetFormat } : {}),
      ...(Array.isArray(unsupportedParams) && unsupportedParams.length > 0
        ? {
            unsupportedParams: unsupportedParams.filter((entry) => typeof entry === "string"),
          }
        : {}),
    });

    deduped.set(id, {
      id,
      name,
      source: "imported",
      ...(toNonEmptyString(record.apiFormat)
        ? { apiFormat: toNonEmptyString(record.apiFormat)! }
        : {}),
      ...(supportedEndpoints && supportedEndpoints.length > 0 ? { supportedEndpoints } : {}),
      ...(typeof record.description === "string" ? { description: record.description } : {}),
      ...(Object.keys(capabilities).length > 0 ? { capabilities } : {}),
      ...(Object.keys(capabilityOverrides).length > 0 ? { capabilityOverrides } : {}),
      ...(Object.keys(compat).length > 0 ? { compat } : {}),
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
  if (normalized.length === 0) {
    return getSyncedAvailableModelsForConnection(providerId, connectionId);
  }
  return replaceSyncedAvailableModelsForConnection(providerId, connectionId, normalized);
}
