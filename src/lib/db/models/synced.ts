import { isRetiredGitHubCopilotModelId } from "@omniroute/open-sse/config/providers/registry/github/retiredModels.ts";

import { asRecord, toNonEmptyString } from "./shared";

export interface SyncedAvailableModel {
  id: string;
  name: string;
  source: "imported";
  apiFormat?: string;
  targetFormat?: string;
  upstreamProtocol?: string;
  supportedEndpoints?: string[];
  supportedThinkingEfforts?: string[];
  defaultThinkingEffort?: string;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  description?: string;
  supportsThinking?: boolean;
  alwaysThinking?: boolean;
  supportsTools?: boolean;
  supportsVideo?: boolean;
  // #4264: image-input capability captured at sync time (e.g. OpenRouter
  // `architecture.input_modalities`/`modality`) so the catalog can surface vision.
  supportsVision?: boolean;
  dimensions?: number;
  supportedInputTypes?: string[];
  modelType?: "chat" | "embedding" | "image" | "rerank";
}

export type SyncedAvailableModelInput = Omit<SyncedAvailableModel, "source"> & {
  source?: string;
};

function normalizeSyncedAvailableModel(model: unknown): SyncedAvailableModel | null {
  const record = asRecord(model);
  const id =
    toNonEmptyString(record.id) || toNonEmptyString(record.name) || toNonEmptyString(record.model);
  if (!id) return null;

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

  return {
    id,
    name,
    source: "imported",
    ...(toNonEmptyString(record.apiFormat)
      ? { apiFormat: toNonEmptyString(record.apiFormat)! }
      : {}),
    ...(toNonEmptyString(record.targetFormat)
      ? { targetFormat: toNonEmptyString(record.targetFormat)! }
      : {}),
    ...(toNonEmptyString(record.upstreamProtocol)
      ? { upstreamProtocol: toNonEmptyString(record.upstreamProtocol)! }
      : {}),
    ...(supportedEndpoints && supportedEndpoints.length > 0 ? { supportedEndpoints } : {}),
    ...(Array.isArray(record.supportedThinkingEfforts)
      ? {
          supportedThinkingEfforts: record.supportedThinkingEfforts.filter(
            (effort): effort is string => typeof effort === "string" && effort.length > 0
          ),
        }
      : {}),
    ...(toNonEmptyString(record.defaultThinkingEffort)
      ? { defaultThinkingEffort: toNonEmptyString(record.defaultThinkingEffort)! }
      : {}),
    ...(typeof record.inputTokenLimit === "number"
      ? { inputTokenLimit: record.inputTokenLimit }
      : {}),
    ...(typeof record.outputTokenLimit === "number"
      ? { outputTokenLimit: record.outputTokenLimit }
      : {}),
    ...(typeof record.description === "string" ? { description: record.description } : {}),
    ...(typeof record.supportsThinking === "boolean"
      ? { supportsThinking: record.supportsThinking }
      : {}),
    ...(record.alwaysThinking === true ? { alwaysThinking: true } : {}),
    ...(typeof record.supportsTools === "boolean" ? { supportsTools: record.supportsTools } : {}),
    ...(typeof record.supportsVideo === "boolean" ? { supportsVideo: record.supportsVideo } : {}),
    ...(record.supportsVision === true ? { supportsVision: true } : {}),
    ...(typeof record.dimensions === "number" && record.dimensions > 0
      ? { dimensions: record.dimensions }
      : {}),
    ...(Array.isArray(record.supportedInputTypes)
      ? {
          supportedInputTypes: record.supportedInputTypes.filter(
            (t): t is string => typeof t === "string" && t.length > 0
          ),
        }
      : {}),
    ...(typeof record.modelType === "string"
      ? { modelType: record.modelType as "chat" | "embedding" | "image" | "rerank" }
      : {}),
  };
}

export function normalizeSyncedAvailableModels(
  models: unknown,
  providerId?: string
): SyncedAvailableModel[] {
  if (!Array.isArray(models)) return [];
  const deduped = new Map<string, SyncedAvailableModel>();
  for (const model of models) {
    const normalized = normalizeSyncedAvailableModel(model);
    if (normalized && !isRetiredGitHubCopilotModelId(providerId, normalized.id)) {
      deduped.set(normalized.id, normalized);
    }
  }
  return Array.from(deduped.values());
}
