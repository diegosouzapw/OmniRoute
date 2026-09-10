import {
  generateSignature,
  getCachedResponse,
  isCacheableForRead,
  recordSemanticCacheHit,
} from "@/lib/semanticCache";
import { calculateCost } from "@/lib/usage/costCalculator";
import { trackPendingRequest } from "@/lib/usageDb";
import { synthesizeOpenAiSseFromJson } from "../../utils/jsonToSse.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { extractUsageFromResponse } from "../usageExtractor.ts";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import { getSemanticCacheManager } from "../../services/cache/semanticCacheManager.ts";

export async function checkSemanticCache({
  semanticCacheEnabled,
  body,
  clientRawRequest,
  model,
  provider,
  stream,
  reqLogger,
  effectiveServiceTier,
  connectionId,
  startTime,
  log,
  persistAttemptLogs,
  apiKeyId,
  cacheDefaultMode,
}: {
  semanticCacheEnabled: boolean;
  // Only the fields this read path actually touches are named; everything else
  // on the request body stays `unknown` via the index signature.
  body: Record<string, unknown> & { temperature?: number; top_p?: number };
  clientRawRequest: { headers?: unknown } | null;
  model: string;
  provider: string;
  stream: boolean;
  reqLogger: { logConvertedResponse: (response: Record<string, unknown>) => void };
  effectiveServiceTier: string | null | undefined;
  connectionId: string | null;
  startTime: number;
  log: { debug?: (...args: unknown[]) => void } | null;
  persistAttemptLogs: (args: unknown) => void;
  apiKeyId?: string | null;
  cacheDefaultMode?: "legacy" | "bypass" | null;
}) {
  // Per-key bypass: skip cache lookup entirely when the API key opts out.
  if (cacheDefaultMode === "bypass") return null;
  if (semanticCacheEnabled && isCacheableForRead(body, clientRawRequest?.headers)) {
    const manager = getSemanticCacheManager();
    const managerResult = await manager.lookup({
      body,
      headers: clientRawRequest?.headers,
      model,
      provider,
      stream,
      apiKeyId: apiKeyId ?? undefined,
      cacheDefaultMode,
    });

    let cached: Record<string, unknown> | null = null;
    let hitType: "exact" | "semantic" = "exact";
    let similarity: number | undefined;

    if (managerResult.hit && managerResult.entry) {
      cached = managerResult.entry.response;
      hitType = managerResult.type || "exact";
      similarity = managerResult.similarity;
    } else {
      // Legacy SQLite / in-memory cache check fallback
      const signature = generateSignature(
        model,
        body.messages ?? body.input,
        body.temperature,
        body.top_p,
        apiKeyId ?? undefined
      );
      const legacyCached = getCachedResponse(signature);
      if (legacyCached) {
        cached = legacyCached as Record<string, unknown>;
        hitType = "exact";
      }
    }

    if (cached) {
      log?.debug?.("CACHE", `Semantic cache HIT (${hitType}) for ${model} (stream=${stream})`);
      reqLogger.logConvertedResponse(cached);
      const cachedUsage =
        extractUsageFromResponse(cached, provider) ||
        (cached?.usage as Record<string, unknown> | undefined);
      const cachedCost = cachedUsage
        ? await calculateCost(provider, model, cachedUsage as Record<string, number>, {
            serviceTier: effectiveServiceTier,
          })
        : 0;
      persistAttemptLogs({
        status: 200,
        tokens: cached?.usage,
        responseBody: cached,
        providerRequest: null,
        providerResponse: null,
        clientResponse: cached,
        cacheSource: hitType === "semantic" ? "semantic_similarity" : "semantic",
      });
      trackPendingRequest(model, provider, connectionId, false);

      const cachedSse = stream
        ? managerResult.entry
          ? manager.synthesizeSseFromEntry(managerResult.entry)
          : synthesizeOpenAiSseFromJson(JSON.stringify(cached))
        : "";

      const tokensSaved = managerResult.entry
        ? (managerResult.tokensSaved ?? 0)
        : cachedUsage
          ? (Number(cachedUsage.prompt_tokens) || 0) + (Number(cachedUsage.completion_tokens) || 0)
          : 0;

      const requestSignature = generateSignature(
        model,
        body.messages ?? body.input,
        body.temperature,
        body.top_p,
        apiKeyId ?? undefined
      );

      const targetSignature =
        managerResult.entry?.signature ||
        (hitType === "exact" ? requestSignature : managerResult.entry?.hash);

      if (targetSignature) {
        recordSemanticCacheHit(targetSignature, tokensSaved);
      }

      const headers: Record<string, string> = {
        "Content-Type": cachedSse ? "text/event-stream" : "application/json",
        [OMNIROUTE_RESPONSE_HEADERS.cache]:
          hitType === "semantic" ? "HIT (semantic)" : "HIT (exact)",
        [OMNIROUTE_RESPONSE_HEADERS.cacheLatency]: "synthetic",
        [OMNIROUTE_RESPONSE_HEADERS.savingsTokens]: String(tokensSaved),
      };

      if (hitType === "semantic" && typeof similarity === "number") {
        headers[OMNIROUTE_RESPONSE_HEADERS.cacheSimilarity] = similarity.toFixed(4);
      }

      // A cache HIT serves WITHOUT an upstream call, so the incremental cost billed to
      // the client is 0 (consumers that sum X-OmniRoute-Response-Cost must not charge for
      // hits). The original/would-have-been cost is surfaced via X-OmniRoute-Cost-Saved.
      attachOmniRouteMetaHeaders(headers, {
        provider,
        model,
        cacheHit: true,
        latencyMs: Date.now() - startTime,
        usage: cachedUsage,
        costUsd: 0,
        costSavedUsd: cachedCost,
      });
      return {
        success: true,
        response: new Response(cachedSse || JSON.stringify(cached), {
          headers,
        }),
      };
    }
  }
  return null;
}
