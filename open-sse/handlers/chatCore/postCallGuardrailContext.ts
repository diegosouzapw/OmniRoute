/**
 * chatCore post-call guardrail context builder (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's non-streaming success path: assemble the context object passed to
 * `guardrailRegistry.runPostCallHooks`. Pure value builder — no side effects, no early-returns. The
 * `disabledGuardrails` field is resolved via `resolveDisabledGuardrails` (injectable for tests).
 * Behaviour is byte-identical to the previous inline literal, including the `method: "POST"` /
 * `stream: false` constants and the headers/endpoint null-coalescing.
 */
import {
  resolveDisabledGuardrails as defaultResolveDisabled,
  type GuardrailContext,
} from "@/lib/guardrails";

type HeadersLike = Headers | Record<string, unknown> | null;

export function buildPostCallGuardrailContext(
  args: {
    apiKeyInfo: unknown;
    body: unknown;
    clientRawRequest: { headers?: unknown; endpoint?: unknown } | null | undefined;
    log?: GuardrailContext["log"];
    model: string | null | undefined;
    provider: string | null | undefined;
    responsePayloadFormat: string | null | undefined;
    clientResponseFormat: string | null | undefined;
  },
  resolveDisabledGuardrails: typeof defaultResolveDisabled = defaultResolveDisabled
): GuardrailContext {
  const headers = (args.clientRawRequest?.headers as HeadersLike) ?? null;
  const apiKeyInfo =
    args.apiKeyInfo && typeof args.apiKeyInfo === "object" && !Array.isArray(args.apiKeyInfo)
      ? (args.apiKeyInfo as Record<string, unknown>)
      : null;
  const endpoint =
    typeof args.clientRawRequest?.endpoint === "string" ? args.clientRawRequest.endpoint : null;
  return {
    apiKeyInfo,
    disabledGuardrails: resolveDisabledGuardrails({
      apiKeyInfo,
      body: args.body,
      headers,
    }),
    endpoint,
    headers,
    log: args.log,
    method: "POST",
    model: args.model,
    provider: args.provider,
    sourceFormat: args.responsePayloadFormat,
    stream: false,
    targetFormat: args.clientResponseFormat,
  };
}
