import { createHash } from "node:crypto";
import { getIdempotencyKey, checkIdempotency } from "@/lib/idempotencyLayer";
import { calculateCost } from "@/lib/usage/costCalculator";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";

/**
 * NEXA fusion-idempotency fix: compose the effective idempotency key from the raw
 * header key + target provider/model + a digest of the request messages.
 *
 * Why: combo-internal sub-requests (fusion panel members AND the judge) re-enter
 * chatCore SHARING the client's headers, so the raw `Idempotency-Key`/`x-request-id`
 * key was identical for all of them. A panel answer saved under the key and the
 * judge's check (~1ms later, well inside the 5s window) replayed it — the client
 * received a panel member's answer instead of the judge synthesis. Namespacing by
 * model separates panel members; the messages digest separates the judge even when
 * it reuses a panel member's model (the judge body appends the judge directive
 * turn). A genuine client retry (same key, same model, same body) still replays.
 */
export function composeIdempotencyKey({
  rawKey,
  provider,
  model,
  messages,
}: {
  rawKey: string | null | undefined;
  provider: string;
  model: string;
  messages: unknown;
}): string | null {
  if (!rawKey) return null;
  let digest = "";
  try {
    digest = createHash("sha256")
      .update(JSON.stringify(messages ?? ""))
      .digest("hex")
      .slice(0, 16);
  } catch {
    digest = "nodigest";
  }
  return `${rawKey}|${provider}|${model}|${digest}`;
}

/**
 * Resolve the request's idempotency key once and check the idempotency store. Returns the
 * resolved `idempotencyKey` alongside the cache `hit` so the caller can reuse the SAME key
 * for the later save path instead of re-deriving it — eliminating the dual-derivation that
 * the chatCore modularization (#3598) introduced. (#3821-review LEDGER-6)
 */
export async function checkIdempotencyCache({
  clientRawRequest,
  provider,
  model,
  body,
  effectiveServiceTier,
  startTime,
  log,
}: {
  clientRawRequest: unknown;
  provider: string;
  model: string;
  body?: unknown;
  effectiveServiceTier: unknown;
  startTime: number;
  log: unknown;
}): Promise<{ hit: { success: true; response: Response } | null; idempotencyKey: string | null }> {
  // NEXA fusion-idempotency fix: namespace the raw header key (see composeIdempotencyKey).
  const rawIdempotencyKey = getIdempotencyKey(clientRawRequest?.headers);
  const idempotencyKey = composeIdempotencyKey({
    rawKey: rawIdempotencyKey,
    provider,
    model,
    messages: (body as { messages?: unknown } | undefined)?.messages,
  });
  const cachedIdemp = checkIdempotency(idempotencyKey);
  if (cachedIdemp) {
    log?.debug?.("IDEMPOTENCY", `Hit for key=${idempotencyKey?.slice(0, 12)}...`);
    const idempotentUsage =
      cachedIdemp.response && typeof cachedIdemp.response === "object"
        ? ((cachedIdemp.response as Record<string, unknown>).usage as
            Record<string, unknown> | undefined)
        : undefined;
    const idempotentCost = idempotentUsage
      ? await calculateCost(provider, model, idempotentUsage as Record<string, number>, {
          serviceTier: effectiveServiceTier,
        })
      : 0;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-OmniRoute-Idempotent": "true",
    };
    attachOmniRouteMetaHeaders(headers, {
      provider,
      model,
      cacheHit: false,
      latencyMs: Date.now() - startTime,
      usage: idempotentUsage,
      costUsd: idempotentCost,
    });
    return {
      idempotencyKey,
      hit: {
        success: true,
        response: new Response(JSON.stringify(cachedIdemp.response), {
          status: cachedIdemp.status,
          headers,
        }),
      },
    };
  }
  return { hit: null, idempotencyKey };
}
