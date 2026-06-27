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
import { resolveDisabledGuardrails as defaultResolveDisabled } from "@/lib/guardrails";

type LoggerLike = unknown;
type HeadersLike = Headers | Record<string, unknown> | null;

export function buildPostCallGuardrailContext(
  args: {
    apiKeyInfo: unknown;
    body: unknown;
    clientRawRequest: { headers?: unknown; endpoint?: unknown } | null | undefined;
    log?: LoggerLike;
    model: string | null | undefined;
    provider: string | null | undefined;
    responsePayloadFormat: unknown;
    clientResponseFormat: unknown;
  },
  resolveDisabledGuardrails: typeof defaultResolveDisabled = defaultResolveDisabled
) {
  const headers = (args.clientRawRequest?.headers as HeadersLike) ?? null;
  return {
    apiKeyInfo: args.apiKeyInfo,
    disabledGuardrails: resolveDisabledGuardrails({
      apiKeyInfo: (args.apiKeyInfo as Record<string, unknown> | null) ?? null,
      body: args.body,
      headers,
    }),
    endpoint: args.clientRawRequest?.endpoint || null,
    headers,
    log: args.log,
    method: "POST",
    model: args.model,
    provider: args.provider,
    sourceFormat: args.responsePayloadFormat,
    stream: false,
    targetFormat: args.clientResponseFormat,
  } as const;
}
