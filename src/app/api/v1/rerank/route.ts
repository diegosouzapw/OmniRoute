import { handleRerank } from "@omniroute/open-sse/handlers/rerank.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { parseRerankModel, getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1RerankSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { getCachedProviderNodes } from "@/lib/db/readCache";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { saveCallLog } from "@/lib/usageDb";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { CORS_HEADERS } from "@omniroute/open-sse/utils/cors.ts";
import { deriveRerankProviderForChatProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";

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
async function postHandler(request, context) {
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
    const nodes = await getCachedProviderNodes();
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

  // Generic fallback: a configured OpenAI-compatible chat provider with no
  // curated rerank entry (groq, mistral, ...) still exposes a Cohere-compatible
  // <base>/rerank endpoint. Only used when the prefix matches a chat provider
  // that can actually derive an endpoint — otherwise fall through to local nodes.
  let derivedProvider: ReturnType<typeof deriveRerankProviderForChatProvider> = null;
  if (!provider) {
    const prefix = body.model.split("/")[0];
    if (prefix && prefix !== body.model) {
      try {
        const { REGISTRY } = await import("@omniroute/open-sse/config/providerRegistry.ts");
        const chatEntry = (REGISTRY as Record<string, { baseUrl?: string } | undefined>)[prefix];
        derivedProvider = deriveRerankProviderForChatProvider(prefix, chatEntry);
      } catch {
        derivedProvider = null;
      }
    }
  }

  if (provider || derivedProvider) {
    // Cloud provider matched (or a generic Cohere-compatible endpoint was derived)
    const effectiveProviderId = provider || derivedProvider!.id;
    const credentials = await getProviderCredentialsWithQuotaPreflight(effectiveProviderId);
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for provider: ${effectiveProviderId}`
      );
    }
    if (isAllRateLimitedCredentials(credentials)) {
      return rateLimitedProviderResponse(effectiveProviderId, credentials);
    }

    const response = await handleRerank({
      model: body.model,
      query: body.query,
      documents: body.documents,
      top_n: body.top_n,
      return_documents: body.return_documents,
      credentials,
      resolvedProvider: derivedProvider || null,
      connectionId: (credentials as { connectionId?: string } | null)?.connectionId || null,
      apiKeyId: policy.apiKeyInfo?.id || null,
      apiKeyName: policy.apiKeyInfo?.name || null,
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
      const credentials = await getProviderCredentialsWithQuotaPreflight(localProvider.providerId);
      if (!credentials) {
        return errorResponse(
          HTTP_STATUS.BAD_REQUEST,
          `No credentials for local provider: ${prefix}`
        );
      }
      if (isAllRateLimitedCredentials(credentials)) {
        return rateLimitedProviderResponse(prefix, credentials);
      }

      const token = credentials?.apiKey || credentials?.accessToken;
      const startTime = Date.now();
      try {
        let res = await fetch(localProvider.baseUrl, {
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

        // Some local providers (e.g. Infinity, TEI) mount at /rerank rather than /v1/rerank
        if (res.status === 404 && localProvider.baseUrl.endsWith("/v1/rerank")) {
          const fallbackUrl = localProvider.baseUrl.replace(/\/v1\/rerank$/, "/rerank");
          try {
            const fallbackRes = await fetch(fallbackUrl, {
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
            if (fallbackRes.ok || fallbackRes.status !== 404) {
              res = fallbackRes;
            }
          } catch {
            // retain original 404 response if fallback fetch fails
          }
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const errorMessage =
            errData.message || errData.detail || `Provider returned HTTP ${res.status}`;
          saveCallLog({
            method: "POST",
            path: "/v1/rerank",
            status: res.status,
            model: body.model,
            provider: prefix,
            connectionId:
              (credentials as { connectionId?: string } | null)?.connectionId || undefined,
            duration: Date.now() - startTime,
            requestBody: {
              model: body.model,
              query: body.query,
              documents: body.documents,
              top_n: body.top_n,
              return_documents: body.return_documents,
            },
            responseBody: errData,
            error: errorMessage,
            apiKeyId: policy.apiKeyInfo?.id || undefined,
            apiKeyName: policy.apiKeyInfo?.name || undefined,
          }).catch(() => {});
          return errorResponse(res.status, errorMessage);
        }

        const data = await res.json();
        const latencyMs = Date.now() - startTime;
        saveCallLog({
          method: "POST",
          path: "/v1/rerank",
          status: 200,
          model: body.model,
          provider: prefix,
          connectionId:
            (credentials as { connectionId?: string } | null)?.connectionId || undefined,
          duration: latencyMs,
          tokens: { prompt_tokens: 0, completion_tokens: 0 },
          requestBody: {
            model: body.model,
            query: body.query,
            documents: body.documents,
            top_n: body.top_n,
            return_documents: body.return_documents,
          },
          responseBody: data,
          apiKeyId: policy.apiKeyInfo?.id || undefined,
          apiKeyName: policy.apiKeyInfo?.name || undefined,
        }).catch(() => {});

        const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
        attachOmniRouteMetaHeaders(headers, {
          provider: prefix,
          model: localModel,
          costUsd: 0,
          latencyMs,
          requestId: generateRequestId(),
        });
        return new Response(JSON.stringify(data), {
          status: 200,
          headers,
        });
      } catch (err: any) {
        saveCallLog({
          method: "POST",
          path: "/v1/rerank",
          status: 500,
          model: body.model,
          provider: prefix,
          connectionId:
            (credentials as { connectionId?: string } | null)?.connectionId || undefined,
          duration: Date.now() - startTime,
          error: err.message,
          apiKeyId: policy.apiKeyInfo?.id || undefined,
          apiKeyName: policy.apiKeyInfo?.name || undefined,
        }).catch(() => {});
        return errorResponse(500, `Rerank request failed: ${err.message}`);
      }
    }
  }

  return errorResponse(
    HTTP_STATUS.BAD_REQUEST,
    `Invalid rerank model: ${body.model}. Use format: provider/model`
  );
}

export const POST = withInjectionGuard(postHandler);
