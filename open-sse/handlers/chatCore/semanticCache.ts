import {
  generateSignature,
  getCachedResponse,
  isCacheableForRead,
} from "@/lib/semanticCache";
import { calculateCost } from "@/lib/usage/costCalculator";
import { trackPendingRequest } from "@/lib/usageDb";
import { synthesizeOpenAiSseFromJson } from "../../utils/jsonToSse.ts";
import { buildOmniRouteResponseMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { extractUsageFromResponse } from "../usageExtractor.ts";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";

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
}: {
  semanticCacheEnabled: boolean;
  body: any;
  clientRawRequest: any;
  model: string;
  provider: string;
  stream: boolean;
  reqLogger: any;
  effectiveServiceTier: any;
  connectionId: string | null;
  startTime: number;
  log: any;
  persistAttemptLogs: (args: any) => void;
}) {
  if (semanticCacheEnabled && isCacheableForRead(body, clientRawRequest?.headers)) {
    const signature = generateSignature(
      model,
      body.messages ?? body.input,
      body.temperature,
      body.top_p
    );
    const cached = getCachedResponse(signature);
    if (cached) {
      log?.debug?.("CACHE", `Semantic cache HIT for ${model} (stream=${stream})`);
      reqLogger.logConvertedResponse(cached as Record<string, unknown>);
      const cachedUsage =
        extractUsageFromResponse(cached as Record<string, unknown>, provider) ||
        ((cached as Record<string, unknown>)?.usage as Record<string, unknown> | undefined);
      const cachedCost = cachedUsage
        ? await calculateCost(provider, model, cachedUsage as Record<string, number>, {
            serviceTier: effectiveServiceTier,
          })
        : 0;
      persistAttemptLogs({
        status: 200,
        tokens: (cached as Record<string, unknown>)?.usage,
        responseBody: cached,
        providerRequest: null,
        providerResponse: null,
        clientResponse: cached,
        cacheSource: "semantic",
      });
      trackPendingRequest(model, provider, connectionId, false);
      const cachedSse = stream ? synthesizeOpenAiSseFromJson(JSON.stringify(cached)) : "";
      const cacheHitMetaHeaders = buildOmniRouteResponseMetaHeaders({
        provider,
        model,
        cacheHit: true,
        latencyMs: Date.now() - startTime,
        usage: cachedUsage,
        costUsd: cachedCost,
      });
      return {
        success: true,
        response: new Response(cachedSse || JSON.stringify(cached), {
          headers: {
            "Content-Type": cachedSse ? "text/event-stream" : "application/json",
            [OMNIROUTE_RESPONSE_HEADERS.cache]: "HIT",
            ...cacheHitMetaHeaders,
          },
        }),
      };
    }
  }
  return null;
}