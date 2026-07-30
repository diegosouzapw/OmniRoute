import {
  generateSignature,
  getCachedResponse,
  isCacheableForRead,
} from "@/lib/semanticCache";
import { calculateCost } from "@/lib/usage/costCalculator";
import { trackPendingRequest } from "@/lib/usageDb";
import { synthesizeOpenAiSseFromJson } from "../../utils/jsonToSse.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
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
      const headers: Record<string, string> = {
        "Content-Type": cachedSse ? "text/event-stream" : "application/json",
        [OMNIROUTE_RESPONSE_HEADERS.cache]: "HIT",
        // Marker for latency measurement tools: this response served from cache
        // has synthetic (near-zero) latency, not real upstream latency.
        [OMNIROUTE_RESPONSE_HEADERS.cacheLatency]: "synthetic",
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
