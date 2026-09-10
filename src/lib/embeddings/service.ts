import { handleEmbedding } from "@omniroute/open-sse/handlers/embeddings.ts";
import {
  parseEmbeddingModel,
  getEmbeddingProvider,
  buildDynamicEmbeddingProvider,
  deriveEmbeddingProviderForChatProvider,
  type EmbeddingProviderNodeRow,
  type EmbeddingProvider,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import {
  getProviderCredentials,
  clearRecoveredProviderState,
  markAccountUnavailable,
} from "@/sse/services/auth";
import { getCachedProviderNodes } from "@/lib/db/readCache";
import { getComboByName, getCombos } from "@/lib/db/combos";
import { getDatabaseSettings } from "@/lib/db/databaseSettings";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { handleComboChat } from "@omniroute/open-sse/services/combo.ts";
import { resolveBareModelToConnectionDefault } from "@omniroute/open-sse/services/model.ts";
import { findEmbeddingComboDimensionConflict } from "./familyGuard";
import {
  formatMissingEmbeddingCredentialsError,
  formatUnknownEmbeddingProviderError,
} from "./errors";
import { isPrivateHost, isCloudMetadataHost } from "@/shared/network/outboundUrlGuard";
import { calculateCost } from "@/lib/usage/costCalculator";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { resolveLocalSyncedEndpointRoute } from "@/lib/providerModels/syncedEndpointRouting";

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
  resolvedProvider?: EmbeddingProvider | null;
  resolvedModel?: string | null;
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
        const dimConflict = findEmbeddingComboDimensionConflict(combo as any, allCombos as any);
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

  const parsedModel = options.resolvedProvider
    ? {
        provider: options.resolvedProvider.id,
        model: options.resolvedModel ?? body.model,
      }
    : parseEmbeddingModel(body.model, dynamicProviders);
  let { provider, model: resolvedModel } = parsedModel;
  // #11088: a bare local-model request routes through the connection that
  // advertises the requested endpoint — only when no explicit resolvedProvider
  // already won above (explicit resolution takes precedence).
  const syncedEndpointRoute = options.resolvedProvider
    ? null
    : await resolveLocalSyncedEndpointRoute(body.model, "embeddings");
  if (syncedEndpointRoute) {
    provider = syncedEndpointRoute.provider;
    resolvedModel = syncedEndpointRoute.model;
  }
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid embedding model: ${body.model}. Use format: provider/model`
    );
  }

  let credentials: ProviderCredentialsResult | null = null;
  let providerConfig: EmbeddingProvider | null =
    options.resolvedProvider ||
    dynamicProviders.find((dp) => dp.id === provider) ||
    getEmbeddingProvider(provider) ||
    null;
  let credentialsProviderId = provider;

  // #11088: synced-endpoint route — the connection advertising this endpoint
  // supplies credentials and its configured base URL directly.
  if (syncedEndpointRoute) {
    credentials = await getProviderCredentials(
      provider,
      null,
      syncedEndpointRoute.connectionIds,
      syncedEndpointRoute.model
    );
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

    const providerSpecificData = (credentials as { providerSpecificData?: Record<string, unknown> })
      .providerSpecificData;
    const configuredBaseUrl = providerSpecificData?.baseUrl;
    if (typeof configuredBaseUrl !== "string" || configuredBaseUrl.trim().length === 0) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No base URL configured for embedding provider: ${provider}`
      );
    }
    let baseUrl = configuredBaseUrl.trim();
    while (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
    providerConfig = {
      id: provider,
      baseUrl: baseUrl.endsWith("/embeddings") ? baseUrl : `${baseUrl}/embeddings`,
      authType: "apikey",
      authHeader: "bearer",
      models: [],
    };
  }

  // Generic fallback: a configured OpenAI-compatible chat provider with no
  // curated embedding entry (groq, mistral, upstage, ...) still serves
  // embeddings via the standard <base>/embeddings endpoint. Curated registry
  // entries are checked first and keep their specialized configuration.
  if (!providerConfig && !options.resolvedProvider) {
    try {
      const { REGISTRY } = await import("@omniroute/open-sse/config/providerRegistry.ts");
      const chatEntry = (REGISTRY as Record<string, { baseUrl?: string } | undefined>)[provider];
      providerConfig = deriveEmbeddingProviderForChatProvider(provider, chatEntry);
      if (providerConfig) {
        log.info(
          "EMBED",
          `Derived generic embedding endpoint for configured provider ${provider}: ${providerConfig.baseUrl}`
        );
      }
    } catch (err) {
      log.error("EMBED", `Failed to derive generic embedding provider ${provider}: ${err}`);
    }
  }

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
      formatUnknownEmbeddingProviderError(provider, resolvedModel)
    );
  }

  if (!credentials && providerConfig.authType !== "none") {
    credentials = await getProviderCredentials(credentialsProviderId);
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        formatMissingEmbeddingCredentialsError(provider)
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
    if ("allExpired" in credentials && credentials.allExpired) {
      const expiredStatus = (credentials as { expiredStatus?: string }).expiredStatus;
      const quota = expiredStatus === "credits_exhausted";
      const reason = quota ? "credits exhausted" : "authentication expired";
      return errorResponse(
        quota ? HTTP_STATUS.PAYMENT_REQUIRED : HTTP_STATUS.UNAUTHORIZED,
        `[${provider}] All ${credentials.expiredCount || 1} connection(s) ${reason} — please reconnect in the dashboard`
      );
    }
  } else if (provider === "ollama-local" || provider === "lmstudio") {
    // Ollama and LM Studio are keyless, but a configured connection can still
    // provide a custom local host. Hydrate that optional connection without
    // imposing an authentication requirement, then keep the static localhost
    // default when no connection exists. getProviderCredentials("lmstudio")
    // resolves the dashboard's hyphenated "lm-studio" connection via the
    // provider search pool/alias (#11233); a selection or rate-limit failure
    // must not break the flow — proceed without credentials.
    const localCredentials = await getProviderCredentials(credentialsProviderId);
    if (
      localCredentials &&
      !("allRateLimited" in localCredentials) &&
      !("allExpired" in localCredentials)
    ) {
      credentials = localCredentials;
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
        effectiveModel !== resolvedModel
          ? { ...body, model: `${provider}/${effectiveModel}` }
          : body,
      // getProviderCredentials returns a richer connection object; handleEmbedding
      // reads auth plus the optional local baseUrl override. Bridge the wider
      // selection type to the handler's narrow credential shape.
      credentials: credentials as {
        apiKey?: string;
        accessToken?: string;
        providerSpecificData?: Record<string, unknown> | null;
      } | null,
      log,
      resolvedProvider: providerConfig,
      resolvedModel: effectiveModel,
      clientRawRequest: options.clientRawRequest || null,
      apiKeyId: options.apiKeyId || null,
      apiKeyName: options.apiKeyName || null,
      // #10347 — thread the selected connection id so handleEmbedding can cool the
      // account on a hard upstream failure (previously always null on /v1/embeddings).
      connectionId:
        (credentials as { connectionId?: string } | null)?.connectionId ||
        options.connectionId ||
        connectionIdForProxy ||
        null,
    });

  const result = connectionIdForProxy
    ? await runWithProxyContext(proxyInfo?.proxy || null, runEmbedding)
    : await runEmbedding();

  const responseHeaders = new Headers(result.headers);

  if (result.success) {
    if (credentials) await clearRecoveredProviderState(credentials as Record<string, unknown>);
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

  // #10347: cool down the account on hard errors (402 subscription expired,
  // 401 revoked, 403 forbidden, 404 model gone, 429 rate limit, 5xx server
  // errors) so the next embedding request skips this account. Mirrors chat.ts
  // behavior.
  // Skip for 400 (bad request) — the account is fine, the request was wrong.
  // Best-effort: don't block the error response on the DB write.
  const HARD_ERROR_STATUSES = new Set([401, 402, 403, 404, 429, 500, 502, 503, 504]);
  if (
    credentials &&
    "connectionId" in credentials &&
    typeof credentials.connectionId === "string" &&
    HARD_ERROR_STATUSES.has(result.status)
  ) {
    markAccountUnavailable(
      credentials.connectionId,
      result.status,
      result.error || "Embedding provider error",
      provider,
      resolvedModel || null
    ).catch((err) => {
      log.debug(
        "EMBED",
        `Cooldown write failed for ${provider}/${credentials.connectionId?.slice(0, 8)}: ${err}`
      );
    });
  }

  responseHeaders.set("Content-Type", "application/json");
  const errorPayload = toJsonErrorPayload(result.error, "Embedding provider error");
  return new Response(JSON.stringify(errorPayload), {
    status: result.status,
    headers: responseHeaders,
  });
}
