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
import { loadRerankProviderNodes } from "@/app/api/v1/_shared/rerankProviderNodes";
import {
  buildLocalRerankRequestBody,
  normalizeLocalRerankResponse,
} from "@/app/api/v1/_shared/rerankLocalNodeShapes";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { saveCallLog } from "@/lib/usageDb";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { CORS_HEADERS } from "@omniroute/open-sse/utils/cors.ts";
import { deriveRerankProviderForChatProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
import { resolveAlibabaQwen3RerankUrl } from "@/shared/constants/alibabaProviderRegions";

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
 * POST /v1/rerank - Cohere-compatible rerank endpoint
 *
 * Supports cloud providers (Cohere, Together, NVIDIA, Fireworks)
 * and OpenAI-compatible provider_nodes (oMLX, vLLM, Infinity, TEI behind a gateway, …)
 * via dynamic routing. Loopback nodes are always eligible; remote nodes require the
 * `RERANK_REMOTE_PROVIDER_NODES` opt-in and must pass the provider outbound URL policy
 * (see `_shared/rerankProviderNodes.ts`).
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

  // Load eligible provider_nodes for rerank routing (loopback always; remote when
  // RERANK_REMOTE_PROVIDER_NODES is on and the URL passes the outbound policy).
  const localProviders = await loadRerankProviderNodes();

  // Try cloud registry first
  const { provider, model: modelId } = parseRerankModel(body.model);
  const prefixSeparator = body.model.indexOf("/");
  const resolvedModelId =
    provider || prefixSeparator < 0 ? modelId : body.model.slice(prefixSeparator + 1);

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
    const credentials = await getProviderCredentialsWithQuotaPreflight(
      effectiveProviderId,
      null,
      null,
      resolvedModelId
    );
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for provider: ${effectiveProviderId}`
      );
    }
    if (isAllRateLimitedCredentials(credentials)) {
      return rateLimitedProviderResponse(effectiveProviderId, credentials);
    }

    let runtimeProvider = derivedProvider as
      | (NonNullable<ReturnType<typeof deriveRerankProviderForChatProvider>> & {
          format?: string;
        })
      | null;
    if (
      (effectiveProviderId === "alibaba" || effectiveProviderId === "alibaba-cn") &&
      resolvedModelId === "qwen3-rerank"
    ) {
      const providerSpecificData = (
        credentials as { providerSpecificData?: Record<string, unknown> | null }
      ).providerSpecificData;
      const baseUrl = resolveAlibabaQwen3RerankUrl(
        effectiveProviderId,
        providerSpecificData,
        derivedProvider?.baseUrl || ""
      );
      if (!baseUrl) {
        return errorResponse(
          HTTP_STATUS.BAD_REQUEST,
          `No rerank endpoint configured for provider: ${effectiveProviderId}`
        );
      }
      runtimeProvider = {
        id: effectiveProviderId,
        baseUrl,
        authType: "apikey",
        authHeader: "bearer",
        models: [],
        format: "alibaba-qwen3",
      };
    }

    const response = await handleRerank({
      model: body.model,
      query: body.query,
      documents: body.documents,
      top_n: body.top_n,
      return_documents: body.return_documents,
      credentials,
      resolvedProvider: runtimeProvider,
      resolvedModel: resolvedModelId,
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
      // One body serves every known local server: Cohere/OpenAI spelling (`documents`,
      // `return_documents`) plus the TEI spelling (`texts`, `return_text`). See
      // `_shared/rerankLocalNodeShapes.ts`.
      const upstreamBody = JSON.stringify(
        buildLocalRerankRequestBody({
          model: localModel,
          query: body.query,
          documents: body.documents,
          top_n: body.top_n as number | undefined,
          return_documents: body.return_documents as boolean | undefined,
        })
      );
      const upstreamInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: upstreamBody,
      };
      try {
        let res = await fetch(localProvider.baseUrl, upstreamInit);

        // Some local providers (e.g. Infinity, TEI) mount at /rerank rather than /v1/rerank
        if (res.status === 404 && localProvider.baseUrl.endsWith("/v1/rerank")) {
          const fallbackUrl = localProvider.baseUrl.replace(/\/v1\/rerank$/, "/rerank");
          try {
            const fallbackRes = await fetch(fallbackUrl, upstreamInit);
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

        // Fold TEI's bare `[{index, score, text}]`, `score`-only gateways, and
        // Voyage-style `{data: [...]}` into the Cohere envelope clients (and the
        // memory engine, which reads `relevance_score`) expect.
        const data = normalizeLocalRerankResponse(await res.json(), body.documents, {
          top_n: body.top_n as number | undefined,
          return_documents: body.return_documents as boolean | undefined,
        });
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
