import { handleEmbedding } from "@omniroute/open-sse/handlers/embeddings.ts";
import {
  getProviderCredentials,
  clearRecoveredProviderState,
  extractApiKey,
  isValidApiKey,
} from "@/sse/services/auth";
import {
  parseEmbeddingModel,
  getAllEmbeddingModels,
  getEmbeddingProvider,
  buildDynamicEmbeddingProvider,
  type EmbeddingProviderNodeRow,
  type EmbeddingProvider,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1EmbeddingsSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

import { getAllCustomModels, getProviderNodes } from "@/lib/localDb";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * GET /v1/embeddings — list available embedding models
 */
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

  // Include custom models tagged for embeddings
  try {
    const customModelsMap = (await getAllCustomModels()) as Record<string, any>;
    for (const [providerId, models] of Object.entries(customModelsMap)) {
      if (!Array.isArray(models)) continue;
      for (const model of models) {
        if (!model?.id || !Array.isArray(model.supportedEndpoints)) continue;
        if (!model.supportedEndpoints.includes("embeddings")) continue;
        const fullId = `${providerId}/${model.id}`;
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

/**
 * POST /v1/embeddings — create embeddings
 */
type ValidatedEmbeddingBody = Record<string, unknown> & { model: string };

export async function handleValidatedEmbeddingRequestBody(body: ValidatedEmbeddingBody) {
  // Load local provider_nodes for embedding routing (only localhost — prevents auth bypass/SSRF)
  let dynamicProviders: ReturnType<typeof buildDynamicEmbeddingProvider>[] = [];
  try {
    const nodes = (await getProviderNodes()) as unknown as EmbeddingProviderNodeRow[];
    dynamicProviders = (Array.isArray(nodes) ? nodes : [])
      .filter((n) => {
        // provider_nodes apiType is "chat", "responses" or "embeddings" — local OpenAI-compatible
        // backends expose /embeddings under the same base URL as chat, so we build the URL as baseUrl + /embeddings.
        const validTypes = ["chat", "responses", "embeddings"];
        if (!validTypes.includes(n.apiType || "")) return false;
        try {
          const hostname = new URL(n.baseUrl).hostname;
          // Strictly matching 172.16.0.0/12 (Docker/local) and explicitly blocking ::1 per SSRF hardening
          return (
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname)
          );
        } catch {
          return false;
        }
      })
      .map((n) => {
        try {
          return buildDynamicEmbeddingProvider(n);
        } catch (err) {
          log.error("EMBED", `Skipping invalid provider_node ${n.prefix}: ${err}`);
          return null;
        }
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);
  } catch (err) {
    log.error("EMBED", `Failed to load provider_nodes for embeddings: ${err}`);
  }

  // Parse model to get provider
  const { provider, model: resolvedModel } = parseEmbeddingModel(body.model, dynamicProviders);
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid embedding model: ${body.model}. Use format: provider/model`
    );
  }

  // Resolve provider config — dynamic first (local override), then hardcoded
  let providerConfig: EmbeddingProvider | null =
    dynamicProviders.find((dp) => dp.id === provider) || getEmbeddingProvider(provider) || null;
  let credentialsProviderId = provider;

  // #496: Fallback — resolve from ALL provider_nodes (not just localhost)
  // This enables custom embedding models (e.g. google/gemini-embedding-001) whose
  // providers have remote baseUrls. Safe because getProviderCredentials() authenticates.
  if (!providerConfig) {
    try {
      const allNodes = (await getProviderNodes()) as unknown as EmbeddingProviderNodeRow[];
      const matchingNode = (Array.isArray(allNodes) ? allNodes : []).find(
        (n) =>
          n.prefix === provider &&
          (n.apiType === "chat" || n.apiType === "responses" || n.apiType === "embeddings") &&
          n.baseUrl
      );
      if (matchingNode) {
        const baseUrl = String(matchingNode.baseUrl).replace(/\/+$/, "");
        providerConfig = {
          id: matchingNode.prefix,
          baseUrl: `${baseUrl}/embeddings`,
          authType: "apikey",
          authHeader: "bearer",
          models: [],
        };
        credentialsProviderId = matchingNode.id || provider;
        log.info(
          "EMBED",
          `Resolved custom embedding provider: ${provider} → ${providerConfig.baseUrl}`
        );
      }
    } catch (err) {
      log.error("EMBED", `Failed to resolve custom embedding provider ${provider}: ${err}`);
    }
  }

  if (!providerConfig) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Unknown embedding provider: ${provider}. No matching hardcoded or local provider found.`
    );
  }

  // Get credentials — skip for local providers (authType: "none")
  let credentials = null;
  if (providerConfig && providerConfig.authType !== "none") {
    credentials = await getProviderCredentials(credentialsProviderId);
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for embedding provider: ${provider}`
      );
    }
    if (credentials.allRateLimited) {
      return unavailableResponse(
        HTTP_STATUS.RATE_LIMITED,
        `[${provider}] All accounts rate limited`,
        credentials.retryAfter,
        credentials.retryAfterHuman
      );
    }
  }

  const result = await handleEmbedding({
    body,
    credentials,
    log,
    resolvedProvider: providerConfig,
    resolvedModel,
  });

  if (result.success) {
    if (credentials) await clearRecoveredProviderState(credentials);
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

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  return handleValidatedEmbeddingRequestBody(body as ValidatedEmbeddingBody);
}
