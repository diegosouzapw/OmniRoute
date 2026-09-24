import { createHash } from "node:crypto";
import { getIdempotencyKey, checkIdempotency } from "@/lib/idempotencyLayer";
import { calculateCost } from "@/lib/usage/costCalculator";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import type { EffectiveServiceTier } from "./serviceTier.ts";

type HeadersLike = Headers | Record<string, unknown> | null | undefined;
type IdempotencyRequest = { headers?: HeadersLike } | null | undefined;
type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

const IDEMPOTENCY_SEMANTIC_FIELDS = [
  "messages",
  "input",
  "instructions",
  "tools",
  "tool_choice",
  "response_format",
  "text",
  "temperature",
  "top_p",
  "max_tokens",
  "max_completion_tokens",
  "max_output_tokens",
  "reasoning",
  "parallel_tool_calls",
  "stream",
  "stop",
  "seed",
  "n",
  "modalities",
  "audio",
  "frequency_penalty",
  "presence_penalty",
  "logit_bias",
  "logprobs",
  "top_logprobs",
  "verbosity",
  "previous_response_id",
  "conversation",
  "prompt",
  "include",
  "truncation",
  "service_tier",
  "prediction",
  "web_search_options",
] as const;

function stableSerialize(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(",")}]`;

  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .filter((key) => record[key] !== undefined)
    .map((key) => `${JSON.stringify(key)}:${stableSerialize(record[key])}`)
    .join(",")}}`;
}

function semanticRequestBody(body: unknown, legacyMessages: unknown): Record<string, unknown> {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { messages: legacyMessages };
  }
  const request = body as Record<string, unknown>;
  return Object.fromEntries(
    IDEMPOTENCY_SEMANTIC_FIELDS.filter((field) => request[field] !== undefined).map((field) => [
      field,
      request[field],
    ])
  );
}

/**
 * NEXA fusion-idempotency fix: compose the effective idempotency key from the raw
 * header key + target provider/model + a digest of semantic request fields.
 *
 * Why: combo-internal sub-requests (fusion panel members AND the judge) re-enter
 * chatCore SHARING the client's headers, so the raw `Idempotency-Key`/`x-request-id`
 * key was identical for all of them. A panel answer saved under the key and the
 * judge's check (~1ms later, well inside the 5s window) replayed it — the client
 * received a panel member's answer instead of the judge synthesis. Namespacing by
 * model separates panel members; the request digest separates the judge even when
 * it reuses a panel member's model (the judge body appends the judge directive
 * turn). A genuine client retry (same key, same model, same body) still replays.
 */
export function composeIdempotencyKey({
  rawKey,
  provider,
  model,
  messages,
  body,
}: {
  rawKey: string | null | undefined;
  provider: string;
  model: string;
  messages: unknown;
  body?: unknown;
}): string | null {
  if (!rawKey) return null;
  let digest = "";
  try {
    digest = createHash("sha256")
      .update(stableSerialize(semanticRequestBody(body, messages)))
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
  videoTranscriptSensitive,
}: {
  clientRawRequest: IdempotencyRequest;
  provider: string;
  model: string;
  body?: unknown;
  effectiveServiceTier: EffectiveServiceTier | null | undefined;
  startTime: number;
  log: LoggerLike;
  videoTranscriptSensitive?: boolean;
}): Promise<{ hit: { success: true; response: Response } | null; idempotencyKey: string | null }> {
  // A response may quote the video transcript. No key means neither a replay
  // from a previous entry nor a write at chatCore's later save site.
  if (videoTranscriptSensitive) return { hit: null, idempotencyKey: null };
  // NEXA fusion-idempotency fix: namespace the raw header key (see composeIdempotencyKey).
  const rawIdempotencyKey = getIdempotencyKey(clientRawRequest?.headers);
  const idempotencyKey = composeIdempotencyKey({
    rawKey: rawIdempotencyKey,
    provider,
    model,
    messages: (body as { messages?: unknown } | undefined)?.messages,
    body,
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
