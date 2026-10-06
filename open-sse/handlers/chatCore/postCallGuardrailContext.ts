/**
 * chatCore post-call guardrail context builder (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's non-streaming success path: assemble the context object passed to
 * `guardrailRegistry.runPostCallHooks`. Pure value builder — no side effects, no early-returns. The
 * `disabledGuardrails` field is resolved via `resolveDisabledGuardrails` (injectable for tests).
 * Preserves the previous field mapping and constants while narrowing values from
 * the untyped request boundary to the public guardrail contract.
 */
import {
  resolveDisabledGuardrails as defaultResolveDisabled,
  type GuardrailContext,
} from "@/lib/guardrails";

type LoggerLike = GuardrailContext["log"];
type HeadersLike = Headers | Record<string, unknown> | null;

function optionalRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

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
): GuardrailContext {
  const headers = (args.clientRawRequest?.headers as HeadersLike) ?? null;
  const apiKeyInfo = optionalRecord(args.apiKeyInfo);
  return {
    apiKeyInfo,
    disabledGuardrails: resolveDisabledGuardrails({
      apiKeyInfo,
      body: args.body,
      headers,
    }),
    endpoint: optionalString(args.clientRawRequest?.endpoint),
    headers,
    log: args.log,
    method: "POST",
    model: args.model,
    provider: args.provider,
    sourceFormat: optionalString(args.responsePayloadFormat),
    stream: false,
    targetFormat: optionalString(args.clientResponseFormat),
  };
}
