import type { RegistryModel } from "./providers/shared.ts";

const VERTEX_PUBLISHER_RESOURCE_PATTERN =
  /^(?:(?:projects\/[^/]+\/locations\/[^/]+\/)?publishers\/([^/]+)\/models\/|([^/]+)\/models\/)(.+)$/i;
const NATIVE_PUBLISHERS = new Set(["google", "anthropic", "mistralai"]);

const LEGACY_OPENAI_MAAS_PUBLISHERS = [
  { prefix: "deepseek-", publisher: "deepseek-ai" },
  { prefix: "qwen", publisher: "qwen" },
  { prefix: "llama-", publisher: "meta" },
  { prefix: "glm-", publisher: "zai-org" },
  { prefix: "gpt-oss-", publisher: "openai" },
  { prefix: "kimi-", publisher: "moonshotai" },
  { prefix: "minimax-", publisher: "minimaxai" },
] as const;

export type VertexModelTransport = "gemini" | "anthropic" | "mistral" | "openai";

function normalizePublisherModel(publisher: string, model: string): string {
  const normalizedPublisher = publisher.toLowerCase();
  if (NATIVE_PUBLISHERS.has(normalizedPublisher)) return model;
  return `${normalizedPublisher}/${model}`;
}

/**
 * Convert Model Garden resource/version names to the model value accepted by its inference API.
 * Native Google, Anthropic, and Mistral endpoints encode the publisher in the URL and take a bare
 * model id. OpenAI-compatible MaaS requests keep the publisher namespace in the request body.
 */
export function normalizeVertexModelId(model: string): string {
  const trimmed = model.trim().replace(/^(?:vertex|vp)\//i, "");
  const resourceMatch = trimmed.match(VERTEX_PUBLISHER_RESOURCE_PATTERN);
  if (resourceMatch) {
    const publisher = resourceMatch[1] || resourceMatch[2];
    const modelId = resourceMatch[3];
    if (publisher && modelId) return normalizePublisherModel(publisher, modelId);
  }

  const namespacedMatch = trimmed.match(/^([^/]+)\/(.+)$/);
  if (namespacedMatch && NATIVE_PUBLISHERS.has(namespacedMatch[1].toLowerCase())) {
    return namespacedMatch[2];
  }

  // Keep manually-added historical Grok ids working while emitting Google's documented MaaS
  // request form (`xai/grok-*`) for the OpenAI-compatible endpoint.
  if (/^grok-/i.test(trimmed)) return `xai/${trimmed}`;
  const legacyMaaS = LEGACY_OPENAI_MAAS_PUBLISHERS.find(({ prefix }) =>
    trimmed.toLowerCase().startsWith(prefix)
  );
  if (legacyMaaS) return `${legacyMaaS.publisher}/${trimmed}`;
  return trimmed;
}

/** Resolve the Vertex transport from either a request id or a Model Garden resource name. */
export function getVertexModelTransport(model: string): VertexModelTransport {
  const normalized = normalizeVertexModelId(model).toLowerCase();
  if (normalized.startsWith("claude-")) return "anthropic";
  if (normalized.startsWith("mistral-")) return "mistral";
  if (normalized.includes("/")) return "openai";
  return "gemini";
}

/** Wire format used before the request reaches the provider-specific Vertex executor. */
export function getVertexModelTargetFormat(model: string): "claude" | "openai" | null {
  const transport = getVertexModelTransport(model);
  if (transport === "anthropic") return "claude";
  if (transport === "mistral" || transport === "openai") return "openai";
  return null;
}

/** True for xAI models served through Vertex's OpenAI-compatible MaaS endpoint. */
export function isVertexXaiModel(model: string): boolean {
  return /^xai\/grok-/i.test(normalizeVertexModelId(model));
}

/** True only for models exposed by the project-less Vertex Express API. */
export function isVertexExpressModel(model: string): boolean {
  return (
    getVertexModelTransport(model) === "gemini" && /^gemini-/i.test(normalizeVertexModelId(model))
  );
}

/** Curated fallback metadata for Vertex xAI MaaS models. */
export const VERTEX_XAI_MODELS = [
  {
    id: "xai/grok-4.6",
    name: "Grok 4.6",
    contextLength: 524288,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
    targetFormat: "openai",
  },
  { id: "xai/grok-4.3", name: "Grok 4.3", targetFormat: "openai" },
  {
    id: "xai/grok-4.20-reasoning",
    name: "Grok 4.20 Reasoning",
    supportsReasoning: true,
    targetFormat: "openai",
  },
  {
    id: "xai/grok-4.20-non-reasoning",
    name: "Grok 4.20 Non-Reasoning",
    targetFormat: "openai",
  },
] as const satisfies readonly RegistryModel[];
