/**
 * chatCore plugin onResponse hook (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Extracted from handleChatCore's streaming finalization: runs the registered plugin `onResponse`
 * hooks for a completed response. Fire-and-forget and fail-open — the inner run is not awaited
 * and both the dynamic import and the run swallow their own errors, so a misbehaving plugin never
 * affects the response. Non-streaming callers pass the translated JSON body as `data`; streaming
 * callers pass `{ streamed: true }` because the SSE body is not materialized yet (#8711).
 */

/** Payload passed to plugin onResponse hooks from chatCore success paths. */
export type PluginOnResponsePayload = {
  status: number;
  /** Client-facing JSON body (non-streaming only). */
  data?: unknown;
  /** True when the handler returns an SSE stream whose body is not yet available. */
  streamed?: boolean;
};

export async function runPluginOnResponseHook(args: {
  requestId: string;
  body: unknown;
  model: string | null | undefined;
  provider: string | null | undefined;
  apiKeyInfo: unknown;
  response: PluginOnResponsePayload;
}): Promise<void> {
  try {
    const { runOnResponse } = await import("@/lib/plugins/hooks");
    runOnResponse(
      {
        requestId: args.requestId,
        body: args.body,
        model: args.model,
        provider: args.provider,
        apiKeyInfo: args.apiKeyInfo,
        metadata: {},
      },
      args.response
    ).catch(() => {});
  } catch (_) {
    /* plugin onResponse optional */
  }
}
