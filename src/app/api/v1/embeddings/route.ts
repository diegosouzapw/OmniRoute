import { handleEmbedding } from "@omniroute/open-sse/handlers/embeddings.js";
import { getProviderCredentials, extractApiKey, isValidApiKey } from "@/sse/services/auth";
import {
  parseEmbeddingModel,
  getAllEmbeddingModels,
} from "@omniroute/open-sse/config/embeddingRegistry.js";
import { errorResponse } from "@omniroute/open-sse/utils/error.js";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.js";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * GET /v1/embeddings — list available embedding models
 */
export async function GET() {
  const models = getAllEmbeddingModels();
  return new Response(
    JSON.stringify({
      object: "list",
      data: models.map((m) => ({
        id: m.id,
        object: "model",
        created: Math.floor(Date.now() / 1000),
        owned_by: m.provider,
        type: "embedding",
        dimensions: m.dimensions,
      })),
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * POST /v1/embeddings — create embeddings
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    log.warn("EMBED", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  // Optional API key validation
  if (process.env.REQUIRE_API_KEY === "true") {
    const apiKey = extractApiKey(request);
    if (!apiKey) {
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Missing API key");
    }
    const valid = await isValidApiKey(apiKey);
    if (!valid) {
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
    }
  }

  if (!body.model) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  if (!body.input) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing input");
  }

  // Parse model to get provider
  const { provider } = parseEmbeddingModel(body.model);
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid embedding model: ${body.model}. Use format: provider/model`
    );
  }

  // Get credentials for the embedding provider
  const credentials = await getProviderCredentials(provider);
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for embedding provider: ${provider}`
    );
  }

  const result = await handleEmbedding({ body, credentials, log });

  if (result.success) {
    return new Response(JSON.stringify(result.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const errorPayload = toJsonErrorPayload(result.error, "Embedding provider error");
  return new Response(JSON.stringify(errorPayload), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
}
