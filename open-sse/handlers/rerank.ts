import { CORS_HEADERS } from "../utils/cors.ts";
/**
 * Rerank Handler
 *
 * Handles /v1/rerank requests following the Cohere rerank API format.
 * Routes to the appropriate provider based on the model prefix or lookup.
 */

import { getRerankProvider, parseRerankModel, RERANK_PROVIDERS } from "../config/rerankRegistry.ts";
import { errorResponse } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import { generateRequestId } from "@/shared/utils/requestId";
import { saveCallLog } from "@/lib/usageDb";

/**
 * Build authorization header for a rerank provider
 */
function buildAuthHeader(providerConfig, token) {
  if (providerConfig.authHeader === "bearer") {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

/**
 * Transform request body for provider-specific formats (e.g. NVIDIA ranking API)
 */
function transformRequestForProvider(providerConfig, body) {
  if (providerConfig.format === "nvidia") {
    return {
      model: body.model,
      query: { text: body.query },
      passages: (body.documents || []).map((doc) => ({
        text: typeof doc === "string" ? doc : doc.text || "",
      })),
      top_n: body.top_n,
    };
  }
  // Default: Cohere-compatible format (used by Together, Fireworks, Cohere)
  return body;
}

/**
 * Transform response from provider-specific formats back to Cohere format
 */
/* @testonly */ export function transformResponseFromProvider(providerConfig, data) {
  if (providerConfig.format === "nvidia") {
    return {
      id: data.id != null ? String(data.id) : `rerank-${Date.now()}`,
      results: (data.rankings || []).map((r) => ({
        index: r.index,
        relevance_score: r.logit || r.score || 0,
        document: { text: r.text || "" },
      })),
      meta: {
        api_version: { version: "2" },
        billed_units: { search_units: 1 },
      },
    };
  }
  return data;
}

/**
 * Handle a rerank request
 *
 * @param {Object} options
 * @param {string} options.model - Model ID (e.g. "rerank-v3.5" or "cohere/rerank-v3.5")
 * @param {string} options.query - Query to rank documents against
 * @param {string[]|Object[]} options.documents - Documents to rerank
 * @param {number} [options.top_n] - Number of top results to return
 * @param {boolean} [options.return_documents] - Whether to include document text in results
 * @param {Object} options.credentials - Provider credentials { apiKey, accessToken }
 * @returns {Response}
 */
/** @returns {Promise<unknown>} */
export async function handleRerank({
  model,
  query,
  documents,
  top_n,
  return_documents,
  credentials,
}) {
  const startTime = Date.now();
  if (!model) return errorResponse(400, "model is required");
  if (!query) return errorResponse(400, "query is required");
  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return errorResponse(400, "documents must be a non-empty array");
  }

  const { provider: providerId, model: modelId } = parseRerankModel(model);
  const providerConfig = providerId ? getRerankProvider(providerId) : null;

  if (!providerConfig) {
    const availableProviders = Object.keys(RERANK_PROVIDERS).join(", ");
    return errorResponse(
      400,
      `No rerank provider found for model "${model}". Available: ${availableProviders}`
    );
  }

  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return errorResponse(401, `No credentials for rerank provider: ${providerId}`);
  }

  const requestBody = transformRequestForProvider(providerConfig, {
    model: modelId,
    query,
    documents,
    top_n: top_n || documents.length,
    return_documents: return_documents !== false,
  });

  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...buildAuthHeader(providerConfig, token),
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return errorResponse(
        res.status,
        errData.message || errData.error?.message || `Provider returned HTTP ${res.status}`
      );
    }

    const data = await res.json();
    const result = transformResponseFromProvider(providerConfig, data);

    const searchUnits = Number(data?.meta?.billed_units?.search_units) || 0;
    const costUsd = await calculateModalCost("rerank", providerId, modelId, { searchUnits });

    saveCallLog({
      method: "POST",
      path: "/v1/rerank",
      status: 200,
      model: `${providerId}/${modelId}`,
      provider: providerId,
      duration: Date.now() - startTime,
      tokens: { prompt_tokens: 0, completion_tokens: 0 },
      responseBody: { results_count: Array.isArray(result?.results) ? result.results.length : 0 },
    }).catch(() => {});

    const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
    attachOmniRouteMetaHeaders(headers, {
      provider: providerId,
      model: modelId,
      costUsd,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
    return new Response(JSON.stringify(result), { status: 200, headers });
  } catch (err) {
    return errorResponse(500, `Rerank request failed: ${err.message}`);
  }
}
