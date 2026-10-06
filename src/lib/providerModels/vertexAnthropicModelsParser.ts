interface VertexPublisherModel {
  name?: string;
  displayName?: string;
  description?: string;
  supportedActions?: string[];
  versionId?: string;
  [key: string]: unknown;
}

export interface VertexAnthropicDiscoveryModel {
  id: string;
  name: string;
  supportedEndpoints: string[];
  targetFormat: string;
  owned_by: string;
  description?: string;
  [key: string]: unknown;
}

export function parseVertexAnthropicModels(data: unknown): VertexAnthropicDiscoveryModel[] {
  if (!data || typeof data !== "object") return [];
  const record = data as { models?: unknown[]; publisherModels?: unknown[] };
  // The Model Garden publisher-model list is served by the v1beta1 API, which
  // returns `{ publisherModels: [...] }`. Accept both the v1beta1 envelope and
  // the generic `{ models: [...] }` shape for robustness.
  const models = Array.isArray(record.publisherModels)
    ? record.publisherModels
    : Array.isArray(record.models)
      ? record.models
      : [];

  return models
    .map((m: unknown) => {
      const model = m as VertexPublisherModel;
      const rawName = typeof model.name === "string" ? model.name : "";
      // "publishers/anthropic/models/claude-sonnet-4-6" or
      // "projects/x/locations/y/publishers/anthropic/models/claude-sonnet-4-6"
      const id =
        rawName.replace(
          /^(?:projects\/[^/]+\/locations\/[^/]+\/)?publishers\/anthropic\/models\//,
          ""
        ) || rawName;
      if (!id) return null;

      return {
        id,
        name: (typeof model.displayName === "string" && model.displayName) || id,
        supportedEndpoints: ["chat"],
        targetFormat: "claude",
        ...(typeof model.description === "string" ? { description: model.description } : {}),
        owned_by: "anthropic",
      } satisfies VertexAnthropicDiscoveryModel;
    })
    .filter((m): m is VertexAnthropicDiscoveryModel => m !== null);
}
