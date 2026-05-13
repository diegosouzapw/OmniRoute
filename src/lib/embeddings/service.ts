import { handleEmbedding } from "@omniroute/open-sse/handlers/embeddings.ts";
import {
  parseEmbeddingModel,
  getEmbeddingProvider,
  buildDynamicEmbeddingProvider,
  type EmbeddingProviderNodeRow,
  type EmbeddingProvider,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { getProviderCredentials, clearRecoveredProviderState } from "@/sse/services/auth";
import { getProviderNodes } from "@/lib/localDb";

type ValidatedEmbeddingBody = Record<string, unknown> & { model: string };

export interface EmbeddingHandlerOptions {
  clientRawRequest?: {
    endpoint: string;
    body: Record<string, unknown>;
    headers: Record<string, string>;
  };
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  connectionId?: string | null;
}

export async function createEmbeddingResponse(
  body: ValidatedEmbeddingBody,
  options: EmbeddingHandlerOptions = {}
): Promise<Response> {
  let dynamicProviders: ReturnType<typeof buildDynamicEmbeddingProvider>[] = [];
  try {
    const nodes = (await getProviderNodes()) as unknown as EmbeddingProviderNodeRow[];
    dynamicProviders = (Array.isArray(nodes) ? nodes : [])
      .filter((n) => {
        const validTypes = ["chat", "responses", "embeddings"];
        if (!validTypes.includes(n.apiType || "")) return false;
        try {
          const hostname = new URL(n.baseUrl).hostname;
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

  const { provider, model: resolvedModel } = parseEmbeddingModel(body.model, dynamicProviders);
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid embedding model: ${body.model}. Use format: provider/model`
    );
  }

  let providerConfig: EmbeddingProvider | null =
    dynamicProviders.find((dp) => dp.id === provider) || getEmbeddingProvider(provider) || null;
  let credentialsProviderId = provider;

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
          `Resolved custom embedding provider: ${provider} -> ${providerConfig.baseUrl}`
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

  let credentials = null;
  if (providerConfig.authType !== "none") {
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
    clientRawRequest: options.clientRawRequest || null,
    apiKeyId: options.apiKeyId || null,
    apiKeyName: options.apiKeyName || null,
    connectionId: options.connectionId || null,
  });

  const responseHeaders = new Headers(result.headers);

  if (result.success) {
    if (credentials) await clearRecoveredProviderState(credentials);
    responseHeaders.set("Content-Type", "application/json");
    return new Response(JSON.stringify(result.data), {
      status: result.status,
      headers: responseHeaders,
    });
  }

  responseHeaders.set("Content-Type", "application/json");
  const errorPayload = toJsonErrorPayload(result.error, "Embedding provider error");
  return new Response(JSON.stringify(errorPayload), {
    status: result.status,
    headers: responseHeaders,
  });
}
