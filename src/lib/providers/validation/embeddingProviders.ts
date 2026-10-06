// Embedding / rerank / clarifai provider key validators. Extracted from validation.ts (god-file
// decomposition) — top-level functions with no dispatcher-state captures; behavior is byte-identical
// to the original inline defs.
import { normalizeBaseUrl, addModelsSuffix, resolveChatUrl } from "./urlHelpers";
import { buildBearerHeaders, buildClarifaiHeaders } from "./headers";
import { toValidationErrorResult, validationRead, validationWrite } from "./transport";

export async function validateClarifaiProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) || "https://api.clarifai.com/v2/ext/openai/v1";
  const modelsUrl = addModelsSuffix(baseUrl);

  try {
    const modelsRes = await validationRead(modelsUrl, {
      method: "GET",
      headers: buildClarifaiHeaders(apiKey, providerSpecificData),
    });

    if (modelsRes.ok) {
      return { valid: true, error: null, method: "clarifai_models" };
    }

    if (modelsRes.status === 401 || modelsRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    const chatUrl = resolveChatUrl("clarifai", baseUrl, providerSpecificData);
    const chatRes = await validationWrite(chatUrl, {
      method: "POST",
      headers: buildClarifaiHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model:
          providerSpecificData?.validationModelId || "openai/chat-completion/models/gpt-oss-120b",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (chatRes.ok || chatRes.status === 400 || chatRes.status === 422 || chatRes.status === 429) {
      return { valid: true, error: null, method: "clarifai_chat_probe" };
    }

    if (chatRes.status === 401 || chatRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (chatRes.status === 404 || chatRes.status === 405) {
      return { valid: false, error: "Provider validation endpoint not supported" };
    }

    if (chatRes.status >= 500) {
      return { valid: false, error: `Provider unavailable (${chatRes.status})` };
    }

    return { valid: true, error: null, method: "clarifai_chat_probe" };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateEmbeddingApiProvider({
  apiKey,
  providerSpecificData = {},
  url,
  modelId,
}: any) {
  if (!url) {
    return { valid: false, error: "Missing embedding endpoint" };
  }

  try {
    const response = await validationWrite(url, {
      method: "POST",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model: providerSpecificData?.validationModelId || modelId,
        input: ["test"],
      }),
    });

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

/**
 * Jina Foundation API key probe.
 *
 * Dashboard Test used to POST rerank with jina-reranker-v3, which can 200
 * while production Omni embed / rerank-v3.5 403. Prefer GET /v1/models
 * (key validity). Embeddings fallback hits jina-embeddings-v5-omni-small
 * so Test exercises the Omni SKU, not a text-only stand-in. Always report
 * the endpoint and model that were hit.
 */
export async function validateJinaFoundationProvider({
  apiKey,
  providerSpecificData = {},
}: {
  apiKey: string;
  providerSpecificData?: { validationModelId?: string; [key: string]: unknown };
}) {
  const modelsUrl = "https://api.jina.ai/v1/models";
  const embeddingsUrl = "https://api.jina.ai/v1/embeddings";
  const embeddingsModel =
    providerSpecificData?.validationModelId || "jina-embeddings-v5-omni-small";

  try {
    const modelsRes = await validationRead(modelsUrl, {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });

    if (modelsRes.ok) {
      return {
        valid: true,
        error: null,
        method: "jina_models",
        testedEndpoint: "GET https://api.jina.ai/v1/models",
      };
    }

    if (modelsRes.status === 401 || modelsRes.status === 403) {
      return {
        valid: false,
        error: `Invalid API key (GET https://api.jina.ai/v1/models)`,
        method: "jina_models",
        testedEndpoint: "GET https://api.jina.ai/v1/models",
      };
    }

    const embedRes = await validationWrite(embeddingsUrl, {
      method: "POST",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model: embeddingsModel,
        input: ["test"],
      }),
    });

    if (embedRes.status === 401 || embedRes.status === 403) {
      return {
        valid: false,
        error: `Invalid API key (POST https://api.jina.ai/v1/embeddings model=${embeddingsModel})`,
        method: "jina_embeddings",
        testedEndpoint: "POST https://api.jina.ai/v1/embeddings",
        testedModel: embeddingsModel,
      };
    }

    if (
      embedRes.ok ||
      embedRes.status === 400 ||
      embedRes.status === 422 ||
      embedRes.status === 429
    ) {
      return {
        valid: true,
        error: null,
        method: "jina_embeddings",
        testedEndpoint: "POST https://api.jina.ai/v1/embeddings",
        testedModel: embeddingsModel,
      };
    }

    if (embedRes.status >= 500) {
      return {
        valid: false,
        error: `Provider unavailable (${embedRes.status}) at POST https://api.jina.ai/v1/embeddings model=${embeddingsModel}`,
        method: "jina_embeddings",
        testedEndpoint: "POST https://api.jina.ai/v1/embeddings",
        testedModel: embeddingsModel,
      };
    }

    return {
      valid: false,
      error: `Validation failed: ${embedRes.status} (POST https://api.jina.ai/v1/embeddings model=${embeddingsModel})`,
      method: "jina_embeddings",
      testedEndpoint: "POST https://api.jina.ai/v1/embeddings",
      testedModel: embeddingsModel,
    };
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}

export async function validateRerankApiProvider({ apiKey, providerSpecificData = {}, url, modelId }: any) {
  if (!url) {
    return { valid: false, error: "Missing rerank endpoint" };
  }

  try {
    const response = await validationWrite(url, {
      method: "POST",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model: providerSpecificData?.validationModelId || modelId,
        query: "test",
        documents: ["test"],
        top_n: 1,
        return_documents: false,
      }),
    });

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
