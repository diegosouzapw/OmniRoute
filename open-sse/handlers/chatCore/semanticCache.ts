import { generateSignature, getCachedResponse, isCacheableForRead } from "@/lib/semanticCache";
import { calculateCost } from "@/lib/usage/costCalculator";
import { trackPendingRequest } from "@/lib/usageDb";
import { synthesizeOpenAiSseFromJson } from "../../utils/jsonToSse.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { extractUsageFromResponse } from "../usageExtractor.ts";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";

function usageTokenCount(usage: Record<string, unknown> | undefined, candidates: string[]): number {
  if (!usage) return 0;
  for (const candidate of candidates) {
    const value = usage[candidate];
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      return value;
    }
  }
  return 0;
}

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
}: {
  semanticCacheEnabled: boolean;
  body: Record<string, unknown>;
  clientRawRequest: unknown;
  model: string;
  provider: string;
  stream: boolean;
  reqLogger: unknown;
  effectiveServiceTier: unknown;
  connectionId: string | null;
  startTime: number;
  log: unknown;
  persistAttemptLogs: (args: unknown) => void;
  apiKeyId?: string | null;
}) {
  if (semanticCacheEnabled && isCacheableForRead(body, clientRawRequest?.headers)) {
    const signature = generateSignature(
      model,
      body.messages ?? body.input,
      body.temperature,
      body.top_p,
      apiKeyId ?? undefined
    );
    const cached = getCachedResponse(signature);
    if (cached) {
      log?.debug?.("CACHE", `Semantic cache HIT for ${model} (stream=${stream})`);
      reqLogger.logConvertedResponse(cached as Record<string, unknown>);
      const rawCachedUsage = (cached as Record<string, unknown>)?.usage as
        Record<string, unknown> | undefined;
      const cachedUsage =
        extractUsageFromResponse(cached as Record<string, unknown>, provider) || rawCachedUsage;
      const cachedCost = cachedUsage
        ? await calculateCost(provider, model, cachedUsage as Record<string, number>, {
            serviceTier: effectiveServiceTier,
          })
        : 0;
      const avoidedInputTokens = usageTokenCount(cachedUsage, [
        "prompt_tokens",
        "input_tokens",
        "inputTokens",
      ]);
      const avoidedOutputTokens = usageTokenCount(cachedUsage, [
        "completion_tokens",
        "output_tokens",
        "outputTokens",
      ]);
      persistAttemptLogs({
        status: 200,
        // A semantic HIT does not call upstream. Keep the original cached
        // usage only as analytics metadata and persist zero billable counters
        // so downstream billing cannot charge the original tokens again.
        tokens: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
          input_tokens: 0,
          output_tokens: 0,
          cache_read_input_tokens: 0,
          cache_creation_input_tokens: 0,
          reasoning_tokens: 0,
        },
        responseBody: cached,
        providerRequest: null,
        providerResponse: null,
        clientResponse: cached,
        semanticCacheUsageMeta: {
          status: "hit",
          isolationScope: apiKeyId ? "api_key" : "local",
          scopeId: apiKeyId ?? null,
          avoidedUsage: rawCachedUsage ?? null,
        },
        cacheSource: "semantic",
        cacheResult: {
          source: "semantic",
          status: "hit",
          scope: apiKeyId ? "api_key" : "local",
          scopeId: apiKeyId ?? null,
          avoidedInputTokens,
          avoidedOutputTokens,
        },
      });
      trackPendingRequest(model, provider, connectionId, false);
      const cachedSse = stream ? synthesizeOpenAiSseFromJson(JSON.stringify(cached)) : "";
      const headers: Record<string, string> = {
        "Content-Type": cachedSse ? "text/event-stream" : "application/json",
        [OMNIROUTE_RESPONSE_HEADERS.cache]: "HIT",
      };
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
