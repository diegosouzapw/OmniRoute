import { handleRerank } from "@omniroute/open-sse/handlers/rerank.ts";
import { getProviderCredentials, clearRecoveredProviderState } from "@/sse/services/auth";
import { parseRerankModel, getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1RerankSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { getProviderNodes } from "@/lib/localDb";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * Build dynamic rerank provider from a local provider_node.
 * Local OpenAI-compatible backends (oMLX, vLLM, etc.) expose /v1/rerank
 * under the same base URL as chat.
 */
function buildDynamicRerankProvider(node: any) {
  // Strip trailing /v1 if present — we'll add /rerank
  let base = node.baseUrl || "";
  if (base.endsWith("/v1")) base = base.slice(0, -3);
  return {
    id: node.prefix,
    baseUrl: `${base}/v1/rerank`,
    authType: "apikey",
    authHeader: "bearer",
    providerId: node.id, // full provider connection ID for credential lookup
  };
}

/**
 * POST /v1/rerank - Cohere-compatible rerank endpoint
 *
 * Supports cloud providers (Cohere, Together, NVIDIA, Fireworks)
 * and local provider_nodes (oMLX, vLLM, etc.) via dynamic routing.
 */
export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1RerankSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  // Load local provider_nodes for rerank routing (localhost only)
  let localProviders: ReturnType<typeof buildDynamicRerankProvider>[] = [];
  try {
    const nodes = await getProviderNodes();
    localProviders = (Array.isArray(nodes) ? nodes : [])
      .filter((n: any) => {
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
          return buildDynamicRerankProvider(n);
        } catch {
          return null;
        }
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);
  } catch {
    // Non-critical — continue with cloud providers only
  }

  // Try cloud registry first
  const { provider, model: modelId } = parseRerankModel(body.model);

  if (provider) {
    // Cloud provider matched
    const credentials = await getProviderCredentials(provider);
    if (!credentials) {
      return errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${provider}`);
    }

    const response = await handleRerank({
      model: body.model,
      query: body.query,
      documents: body.documents,
      top_n: body.top_n,
      return_documents: body.return_documents,
      credentials,
    });
    if (response?.ok) {
      await clearRecoveredProviderState(credentials);
    }
    return response;
  }

  // Try local provider_nodes (model format: prefix/model-name)
  const parts = body.model.split("/");
  if (parts.length >= 2) {
    const prefix = parts[0];
    const localModel = parts.slice(1).join("/");
    const localProvider = localProviders.find((p) => p.id === prefix);

    if (localProvider) {
      const credentials = await getProviderCredentials(localProvider.providerId);
      if (!credentials) {
        return errorResponse(
          HTTP_STATUS.BAD_REQUEST,
          `No credentials for local provider: ${prefix}`
        );
      }

      const token = credentials?.apiKey || credentials?.accessToken;
      try {
        const res = await fetch(localProvider.baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            model: localModel,
            query: body.query,
            documents: body.documents,
            top_n: body.top_n || body.documents.length,
            return_documents: body.return_documents !== false,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          return errorResponse(
            res.status,
            errData.message || errData.detail || `Provider returned HTTP ${res.status}`
          );
        }

        const data = await res.json();
        return Response.json(data, {
          headers: {},
        });
      } catch (err: any) {
        return errorResponse(500, `Rerank request failed: ${err.message}`);
      }
    }
  }

  return errorResponse(
    HTTP_STATUS.BAD_REQUEST,
    `Invalid rerank model: ${body.model}. Use format: provider/model`
  );
}
