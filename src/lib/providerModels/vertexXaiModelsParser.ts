import { isVertexXaiModel } from "@omniroute/open-sse/config/vertexModels.ts";

import { parseVertexPublisherModels } from "./vertexPublisherModelsParser";

export interface VertexXaiDiscoveryModel {
  id: string;
  name: string;
  supportedEndpoints: string[];
  targetFormat: "openai";
  owned_by: "xai";
  description?: string;
}

/** Parse the v1beta1 Model Garden xAI publisher list into routable MaaS model rows. */
export function parseVertexXaiModels(data: unknown): VertexXaiDiscoveryModel[] {
  return parseVertexPublisherModels(data, "xai").flatMap((model) =>
    isVertexXaiModel(model.id)
      ? [
          {
            ...model,
            supportedEndpoints: ["chat"],
            targetFormat: "openai" as const,
            owned_by: "xai" as const,
          },
        ]
      : []
  );
}
