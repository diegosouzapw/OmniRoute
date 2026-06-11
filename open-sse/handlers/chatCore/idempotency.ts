import { getIdempotencyKey, checkIdempotency } from "@/lib/idempotencyLayer";
import { calculateCost } from "@/lib/usage/costCalculator";
import { buildOmniRouteResponseMetaHeaders } from "@/domain/omnirouteResponseMeta";

export async function checkIdempotencyCache({
  clientRawRequest,
  provider,
  model,
  effectiveServiceTier,
  startTime,
  log,
}: {
  clientRawRequest: unknown;
  provider: string;
  model: string;
  effectiveServiceTier: unknown;
  startTime: number;
  log: unknown;
}) {
  const idempotencyKey = getIdempotencyKey(clientRawRequest?.headers);
  const cachedIdemp = checkIdempotency(idempotencyKey);
  if (cachedIdemp) {
    log?.debug?.("IDEMPOTENCY", `Hit for key=${idempotencyKey?.slice(0, 12)}...`);
    const idempotentUsage =
      cachedIdemp.response && typeof cachedIdemp.response === "object"
        ? ((cachedIdemp.response as Record<string, unknown>).usage as
            | Record<string, unknown>
            | undefined)
        : undefined;
    const idempotentCost = idempotentUsage
      ? await calculateCost(provider, model, idempotentUsage as Record<string, number>, {
          serviceTier: effectiveServiceTier,
        })
      : 0;
    return {
      success: true,
      response: new Response(JSON.stringify(cachedIdemp.response), {
        status: cachedIdemp.status,
        headers: {
          "Content-Type": "application/json",
          "X-OmniRoute-Idempotent": "true",
          ...buildOmniRouteResponseMetaHeaders({
            provider,
            model,
            cacheHit: false,
            latencyMs: Date.now() - startTime,
            usage: idempotentUsage,
            costUsd: idempotentCost,
          }),
        },
      }),
    };
  }
  return null;
}
