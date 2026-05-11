import {
  parseEmbeddingModel,
  getAllEmbeddingModels,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1EmbeddingsSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

import { getAllCustomModels, getApiKeyMetadata } from "@/lib/localDb";
import { createEmbeddingResponse, type EmbeddingHandlerOptions } from "@/lib/embeddings/service";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";

function toProviderScopedModelId(providerId: string, modelId: string): string {
  return modelId.startsWith(`${providerId}/`) ? modelId : `${providerId}/${modelId}`;
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET() {
  const builtInModels = getAllEmbeddingModels();
  const timestamp = Math.floor(Date.now() / 1000);

  const data = builtInModels.map((m) => ({
    id: m.id,
    object: "model",
    created: timestamp,
    owned_by: m.provider,
    type: "embedding",
    dimensions: m.dimensions,
  }));

  try {
    const customModelsMap = (await getAllCustomModels()) as Record<string, any>;
    for (const [providerId, models] of Object.entries(customModelsMap)) {
      if (!Array.isArray(models)) continue;
      for (const model of models) {
        if (!model?.id || !Array.isArray(model.supportedEndpoints)) continue;
        if (!model.supportedEndpoints.includes("embeddings")) continue;
        const fullId = toProviderScopedModelId(providerId, model.id);
        if (data.some((d) => d.id === fullId)) continue;
        data.push({
          id: fullId,
          object: "model",
          created: timestamp,
          owned_by: providerId,
          type: "embedding",
          dimensions: null,
        });
      }
    }
  } catch {}

  return new Response(JSON.stringify({ object: "list", data }), {
    headers: { "Content-Type": "application/json" },
  });
}

type ValidatedEmbeddingBody = Record<string, unknown> & { model: string };

export async function handleValidatedEmbeddingRequestBody(
  body: ValidatedEmbeddingBody,
  options: EmbeddingHandlerOptions = {}
) {
  return createEmbeddingResponse(body, options);
}

export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    log.warn("EMBED", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1EmbeddingsSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;

  // Auth check
  const apiKeyRaw = extractApiKey(request);
  if (process.env.REQUIRE_API_KEY === "true" && !apiKeyRaw) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }
  if (apiKeyRaw && !(await isValidApiKey(apiKeyRaw))) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  // Extract API key info for logging
  const apiKeyMeta = apiKeyRaw ? await getApiKeyMetadata(apiKeyRaw) : null;

  // Build client raw request for logging
  const clientRawRequest = {
    endpoint: "/v1/embeddings",
    body: rawBody,
    headers: Object.fromEntries(request.headers.entries()),
  };

  return handleValidatedEmbeddingRequestBody(body as ValidatedEmbeddingBody, {
    clientRawRequest,
    apiKeyId: apiKeyMeta?.id || null,
    apiKeyName: apiKeyMeta?.name || null,
    connectionId: null,
  });
}
