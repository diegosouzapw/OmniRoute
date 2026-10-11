/**
 * chatCore streaming response headers (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Extracted from handleChatCore's streaming success path: assemble the streaming response header map
 * — the upstream-derived streaming headers (via buildStreamingResponseHeaders, with zeroed
 * latency/usage/cost since those are not yet known at stream start), the per-request id, and the
 * optional compression header. Pure builder (returns a fresh map). Behaviour is byte-identical to
 * the previous inline block.
 */
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import { buildStreamingResponseHeaders as defaultBuildStreaming } from "./responseHeaders.ts";
import {
  shouldStripAnthropicAccountHeaders,
  type AnthropicAccountHeaderPolicyKeyInfo,
} from "./upstreamAccountHeaders.ts";

export function assembleStreamingResponseHeaders(
  args: {
    providerHeaders: Headers;
    provider: string | null | undefined;
    model: string | null | undefined;
    pendingRequestId: string;
    compressionResponseMeta?: string | null | undefined;
    comboStrategy?: string | null | undefined;
    fallbackAttempts?: number;
    // #14116: combo/pool account-identity triple, forwarded straight into
    // buildStreamingResponseHeaders so a foreign-combo-account response never
    // leaks that account's Codex quota headers to the caller. All optional —
    // omitting them preserves today's unconditional-forwarding behavior.
    isCombo?: boolean;
    requestedConnectionId?: string | null;
    selectedConnectionId?: string | null;
    // The requesting key's upstream anthropic-ratelimit-* / anthropic-organization-id
    // header policy (see upstreamAccountHeaders.ts). Omitted = forward as before.
    apiKeyInfo?: AnthropicAccountHeaderPolicyKeyInfo | null;
  },
  buildStreamingResponseHeaders: typeof defaultBuildStreaming = defaultBuildStreaming
): Record<string, string> {
  const responseHeaders: Record<string, string> = {
    ...buildStreamingResponseHeaders(args.providerHeaders, {
      provider: args.provider,
      model: args.model,
      cacheHit: false,
      latencyMs: 0,
      usage: null,
      costUsd: 0,
      strategy: args.comboStrategy ?? "single",
      ...(args.fallbackAttempts !== undefined ? { fallbackAttempts: args.fallbackAttempts } : {}),
      isCombo: args.isCombo,
      requestedConnectionId: args.requestedConnectionId,
      selectedConnectionId: args.selectedConnectionId,
      stripAnthropicAccountHeaders: shouldStripAnthropicAccountHeaders(
        args.apiKeyInfo,
        args.provider
      ),
    }),
    "x-omniroute-request-id": args.pendingRequestId,
  };
  if (args.compressionResponseMeta) {
    responseHeaders[OMNIROUTE_RESPONSE_HEADERS.compression] = args.compressionResponseMeta;
  }
  return responseHeaders;
}
