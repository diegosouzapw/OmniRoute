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
import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "../utils/proxyFetch.ts";
import * as log from "@/sse/utils/logger";

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
/* @testonly */ export function transformRequestForProvider(providerConfig, body) {
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
  // DeepInfra inference API: the model goes in the URL path (handled by the caller), the body
  // carries {queries:[query], documents:[strings]} and the response is a positional {scores:[…]}.
  if (providerConfig.format === "deepinfra") {
    return {
      queries: [body.query],
      documents: (body.documents || []).map((doc) =>
        typeof doc === "string" ? doc : doc.text || ""
      ),
    };
  }
  // Voyage AI: uses `top_k` instead of `top_n`, and rejects only exact empty
  // strings (whitespace-only documents are accepted and ranked upstream). We
  // filter out exact empty strings and track original indices implicitly via the
  // response adapter, which reconstructs the map from options.documents (#7809).
  // `return_documents` is always forced off upstream: Voyage echoes documents as
  // plain strings (not Cohere's {text}), so we never rely on the echo — document
  // text is always synthesized locally from the caller's originals (#7811).
  if (providerConfig.format === "voyage") {
    const docTexts = (body.documents || [])
      .map((doc) => (typeof doc === "string" ? doc : doc?.text || ""))
      .filter((text) => text !== "");
    return {
      model: body.model,
      query: body.query,
      documents: docTexts,
      top_k: body.top_n || docTexts.length,
      return_documents: false,
    };
  }
  // Default: Cohere-compatible format (used by Together, Fireworks, Cohere, SiliconFlow)
  return body;
}

/**
 * Transform response from provider-specific formats back to Cohere format
 */
/* @testonly */ export function transformResponseFromProvider(providerConfig, data, options = {}) {
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
  // DeepInfra returns {scores:[…]} — one float per document, in document order. Map to Cohere's
  // results[] (index + relevance_score + optional document), sorted by score desc, honoring top_n.
  if (providerConfig.format === "deepinfra") {
    const documents = Array.isArray(options.documents) ? options.documents : [];
    const returnDocuments = options.return_documents !== false;
    const scored = (Array.isArray(data.scores) ? data.scores : []).map((score, index) => {
      const doc = documents[index];
      const text = typeof doc === "string" ? doc : doc?.text || "";
      return {
        index,
        relevance_score: typeof score === "number" ? score : 0,
        ...(returnDocuments ? { document: { text } } : {}),
      };
    });
    scored.sort((a, b) => b.relevance_score - a.relevance_score);
    const topN = typeof options.top_n === "number" && options.top_n > 0 ? options.top_n : undefined;
    return {
      id: `rerank-${Date.now()}`,
      results: topN ? scored.slice(0, topN) : scored,
      meta: {
        api_version: { version: "2" },
        billed_units: { search_units: 1 },
      },
    };
  }
  // Voyage AI returns {data:[{relevance_score,index}], usage:{total_tokens}} — `index` refers
  // to the filtered document array we sent (empty strings removed). We remap back to the
  // caller's original positions and sort by score descending, honoring top_n (#7809).
  if (providerConfig.format === "voyage") {
    const documents = Array.isArray(options.documents) ? options.documents : [];
    const returnDocuments = options.return_documents !== false;
    // Reconstruct the index map: the request adapter filtered out exact empty
    // strings, so we replicate that filter here to get original → filtered mapping.
    const indexMap = [];
    documents.forEach((doc, i) => {
      const text = typeof doc === "string" ? doc : doc?.text || "";
      if (text !== "") indexMap.push(i);
    });
    const scored = (Array.isArray(data.data) ? data.data : []).map((entry) => {
      const filteredIdx = entry.index ?? 0;
      const originalIdx = indexMap[filteredIdx] ?? filteredIdx;
      const doc = documents[originalIdx];
      const text = typeof doc === "string" ? doc : doc?.text || "";
      return {
        index: originalIdx,
        relevance_score: typeof entry.relevance_score === "number" ? entry.relevance_score : 0,
        ...(returnDocuments ? { document: { text } } : {}),
      };
    });
    scored.sort((a, b) => b.relevance_score - a.relevance_score);
    const topN = typeof options.top_n === "number" && options.top_n > 0 ? options.top_n : undefined;
    return {
      id: `rerank-${Date.now()}`,
      results: topN ? scored.slice(0, topN) : scored,
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
 * @param {string} [options.connectionId] - Connection ID for per-connection proxy resolution
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
  connectionId = null,
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

  // DeepInfra puts the model in the URL path (POST /v1/inference/<model>); all others use a fixed
  // rerank endpoint with the model in the body.
  const rerankUrl =
    providerConfig.format === "deepinfra"
      ? `${providerConfig.baseUrl}/${modelId}`
      : providerConfig.baseUrl;

  // Resolve per-connection proxy so rerank honors the same proxy pinning as chat
  // and embeddings (#7350). Without this, rerank requests egress directly and fail
  // when the provider blocks certain IP ranges (e.g. Voyage AI from Russian IPs).
  let proxyInfo: Awaited<ReturnType<typeof resolveProxyForConnection>> | null = null;
  if (connectionId) {
    try {
      proxyInfo = await resolveProxyForConnection(connectionId);
    } catch (err) {
      log.error("RERANK", `Proxy resolution failed for connection ${connectionId}: ${err}`);
    }
  }

  const doFetch = () =>
    fetch(rerankUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...buildAuthHeader(providerConfig, token),
      },
      body: JSON.stringify(requestBody),
    });

  try {
    const res = connectionId
      ? await runWithProxyContext(proxyInfo?.proxy || null, doFetch)
      : await doFetch();

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return errorResponse(
        res.status,
        errData.message || errData.error?.message || `Provider returned HTTP ${res.status}`
      );
    }

    const data = await res.json();
    const result = transformResponseFromProvider(providerConfig, data, {
      documents,
      top_n: top_n || documents.length,
      return_documents,
    });

    const searchUnits = Number(result?.meta?.billed_units?.search_units) || 0;
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
