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

export function assembleStreamingResponseHeaders(
  args: {
    providerHeaders: Headers;
    provider: string | null | undefined;
    model: string | null | undefined;
    pendingRequestId: string;
    compressionResponseMeta?: string | null | undefined;
    comboStrategy?: string | null | undefined;
    fallbackAttempts?: number;
    /**
     * #13638/#14116: true when the connection that actually served this response was
     * selected by pool/combo routing rather than being the caller's own direct
     * connection. Forwarded to buildStreamingResponseHeaders so it can strip the
     * `x-codex-*` quota/reset/credits headers — those describe the SELECTED account's
     * quota, not the caller's, and must not leak across accounts. The caller (chatCore.ts)
     * is where the selected-account identity is known; this builder only forwards it.
     */
    isForeignAccount?: boolean;
  },
  buildStreamingResponseHeaders: typeof defaultBuildStreaming = defaultBuildStreaming
): Record<string, string> {
  const responseHeaders: Record<string, string> = {
    ...buildStreamingResponseHeaders(
      args.providerHeaders,
      {
        provider: args.provider,
        model: args.model,
        cacheHit: false,
        latencyMs: 0,
        usage: null,
        costUsd: 0,
        strategy: args.comboStrategy ?? "single",
        ...(args.fallbackAttempts !== undefined ? { fallbackAttempts: args.fallbackAttempts } : {}),
      },
      undefined,
      { isForeignAccount: args.isForeignAccount === true }
    ),
    "x-omniroute-request-id": args.pendingRequestId,
  };
  if (args.compressionResponseMeta) {
    responseHeaders[OMNIROUTE_RESPONSE_HEADERS.compression] = args.compressionResponseMeta;
  }
  return responseHeaders;
}
