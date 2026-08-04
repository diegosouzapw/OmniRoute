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
import { getCachedProviderNodes, getComboByName, getCombos, getDatabaseSettings } from "@/lib/localDb";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { handleComboChat } from "@omniroute/open-sse/services/combo.ts";
import { resolveBareModelToConnectionDefault } from "@omniroute/open-sse/services/model.ts";
import { findEmbeddingComboDimensionConflict } from "./familyGuard";
import { isPrivateHost, isCloudMetadataHost } from "@/shared/network/outboundUrlGuard";
import { calculateCost } from "@/lib/usage/costCalculator";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";

type ValidatedEmbeddingBody = Record<string, unknown> & { model: string };
type ProviderCredentialsResult = Awaited<ReturnType<typeof getProviderCredentials>>;

// #6925: a private/LAN host (RFC1918 10/8, 192.168/16, 172.16/12, CGNAT 100.64/10,
// loopback, .local/.internal, ULA/link-local IPv6) is treated as a trusted no-auth
// local embedding provider — mirrors the outbound-URL guard's private-host
// classification instead of the old hand-rolled localhost/127.0.0.1/172.16-31-only
// regex, which excluded common LAN ranges (10.x, 192.168.x) and forced them through
// the apikey/bearer fallback even when no credentials exist. Cloud-metadata hosts
// (169.254.169.254 etc.) are never treated as no-auth local providers.
function isNoAuthLocalEmbeddingHost(hostname: string): boolean {
  return isPrivateHost(hostname) && !isCloudMetadataHost(hostname);
}

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
  const modelStr = body.model;
  const startTime = Date.now();

  if (!modelStr.includes("/")) {
    try {
      const combo = await getComboByName(modelStr);
      if (combo) {
        let allCombos: Awaited<ReturnType<typeof getCombos>> = [];
        try {
          allCombos = await getCombos();
        } catch {}

        // Guard: an embedding combo whose targets span multiple vector
        // dimensions would corrupt any vector store on failover (vectors from
        // different models are not comparable). The generic combo engine has no
        // notion of embedding families, so reject loudly here before dispatch.
        // See _tasks/features-v3.8.12/01-embeddings-combo-family-guard.plan.md.
        const dimConflict = findEmbeddingComboDimensionConflict(
          combo as any,
          allCombos as any
        );
        if (dimConflict.conflict) {
          return errorResponse(
            HTTP_STATUS.BAD_REQUEST,
            `Embedding combo "${modelStr}" mixes models with incompatible vector ` +
              `dimensions (${dimConflict.distinct.join(", ")}). Failover between them ` +
              `would corrupt your vector store — use a single embedding dimension per combo.`
          );
        }

        let settings = {};
        try {
          settings = getDatabaseSettings();
        } catch {}

        // Inject the combo's configured dimensions into the request body so that
        // every upstream embedding call within this combo receives the same
        // dimensions override. The client's own dimensions value takes precedence
        // if already set. Ported from decolua/9router#1530.
        const comboRecord = combo as Record<string, unknown>;
        const comboDimensions =
          comboRecord.dimensions !== undefined && comboRecord.dimensions !== null
            ? String(comboRecord.dimensions)
            : undefined;
        const bodyWithDimensions =
          comboDimensions !== undefined && body.dimensions === undefined
            ? { ...body, dimensions: comboDimensions }
            : body;

        return handleComboChat({
          body: bodyWithDimensions,
          combo: combo as any,
          handleSingleModel: async (reqBody: any, targetModelStr: string, target?: any) => {
            const newBody = { ...reqBody, model: targetModelStr };
            return createEmbeddingResponse(newBody, {
              ...options,
              connectionId: target?.connectionId || options.connectionId,
            });
          },
          isModelAvailable: undefined,
          log,
          settings,
          allCombos: allCombos as any,
          relayOptions: undefined,
          signal: undefined,
        });
      }
    } catch (err) {
      log.error("EMBED", `Combo resolution failed for ${modelStr}: ${err}`);
    }
  }
  let dynamicProviders: ReturnType<typeof buildDynamicEmbeddingProvider>[] = [];
  try {
    const nodes = (await getCachedProviderNodes()) as unknown as EmbeddingProviderNodeRow[];
    dynamicProviders = (Array.isArray(nodes) ? nodes : [])
      .filter((n) => {
        const validTypes = ["chat", "responses", "embeddings"];
        if (!validTypes.includes(n.apiType || "")) return false;
        try {
          const hostname = new URL(n.baseUrl).hostname;
          return isNoAuthLocalEmbeddingHost(hostname);
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
      const allNodes = (await getCachedProviderNodes()) as unknown as EmbeddingProviderNodeRow[];
      const matchingNode = (Array.isArray(allNodes) ? allNodes : []).find(
        (n) =>
          n.prefix === provider &&
          (n.apiType === "chat" || n.apiType === "responses" || n.apiType === "embeddings") &&
          n.baseUrl
      );
      if (matchingNode) {
        const baseUrl = String(matchingNode.baseUrl).replace(/\/+$/, "");
        // #6925: a private/LAN node reaching this fallback (e.g. a matching
        // prefix that skipped the dynamicProviders pass above) must never be
        // forced through bearer-auth — only a non-private host falls back to
        // apikey/bearer credential resolution.
        let nodeHostname = "";
        try {
          nodeHostname = new URL(matchingNode.baseUrl).hostname;
        } catch {
          nodeHostname = "";
        }
        const isNoAuthLocal = nodeHostname !== "" && isNoAuthLocalEmbeddingHost(nodeHostname);
        providerConfig = {
          id: matchingNode.prefix,
          baseUrl: `${baseUrl}/embeddings`,
          authType: isNoAuthLocal ? "none" : "apikey",
          authHeader: isNoAuthLocal ? "none" : "bearer",
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

  let credentials: ProviderCredentialsResult | null = null;
  if (providerConfig.authType !== "none") {
    credentials = await getProviderCredentials(credentialsProviderId);
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for embedding provider: ${provider}`
      );
    }
    if ("allRateLimited" in credentials && credentials.allRateLimited) {
      return unavailableResponse(
        HTTP_STATUS.RATE_LIMITED,
        `[${provider}] All accounts rate limited`,
        credentials.retryAfter,
        credentials.retryAfterHuman
      );
    }
  }

  // #474: when the request used a bare model name (no "/" — e.g. an alias that
  // resolved to "auto") and the selected connection declares a defaultModel,
  // resolve the bare name to that real model ID before the upstream call so the
  // provider receives a concrete model. A "/"-qualified name is left untouched.
  const connectionDefaultModel =
    credentials && typeof (credentials as { defaultModel?: unknown }).defaultModel === "string"
      ? ((credentials as { defaultModel?: string }).defaultModel as string)
      : null;
  const effectiveModel = resolveBareModelToConnectionDefault(
    modelStr,
    resolvedModel,
    connectionDefaultModel
  );

  // Resolve the connection-level proxy so the upstream embedding request honors
  // the same per-connection pinning as chat, image generation, and count_tokens
  // (#1904-style behavior). Without this, embeddings silently fall back to the
  // global/env proxy and ignore a connection's pinned proxy. Ported from
  // upstream decolua/9router#1701.
  let proxyInfo: Awaited<ReturnType<typeof resolveProxyForConnection>> | null = null;
  const connectionIdForProxy = (credentials as { connectionId?: string } | null)?.connectionId;
  if (connectionIdForProxy) {
    try {
      proxyInfo = await resolveProxyForConnection(connectionIdForProxy);
    } catch (err) {
      log.error("EMBED", `Failed to resolve proxy for connection ${connectionIdForProxy}: ${err}`);
    }
  }

  const runEmbedding = () =>
    handleEmbedding({
      body:
        effectiveModel !== resolvedModel ? { ...body, model: `${provider}/${effectiveModel}` } : body,
      // getProviderCredentials returns a richer connection object; handleEmbedding
      // only reads apiKey/accessToken, both present at runtime. Bridge the wider
      // selection type to the handler's narrow credential shape.
      credentials: credentials as { apiKey?: string; accessToken?: string } | null,
      log,
      resolvedProvider: providerConfig,
      resolvedModel: effectiveModel,
      clientRawRequest: options.clientRawRequest || null,
      apiKeyId: options.apiKeyId || null,
      apiKeyName: options.apiKeyName || null,
      connectionId: options.connectionId || null,
    });

  const result = connectionIdForProxy
    ? await runWithProxyContext(proxyInfo?.proxy || null, runEmbedding)
    : await runEmbedding();

  const responseHeaders = new Headers(result.headers);

  if (result.success) {
    if (credentials) await clearRecoveredProviderState(credentials);
    responseHeaders.set("Content-Type", "application/json");
    const usage = (result.data as { usage?: Record<string, number> })?.usage ?? null;
    const costUsd = usage ? await calculateCost(provider, effectiveModel ?? "", usage) : 0;
    attachOmniRouteMetaHeaders(responseHeaders, {
      provider,
      model: effectiveModel,
      usage,
      costUsd,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
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
