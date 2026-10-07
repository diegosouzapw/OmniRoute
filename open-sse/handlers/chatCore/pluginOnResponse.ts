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
  headers?: Record<string, string | string[] | undefined>;
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
        headers: args.headers,
        metadata: {},
      },
      args.response
    ).catch(() => {});
  } catch (_) {
    /* plugin onResponse optional */
  }
}

/**
 * Payload passed to plugin onStreamComplete hooks after a streaming response is consumed.
 * Carries usage token counts, timing metrics (latency, TTFT), model, provider, and error code.
 */
export type PluginOnStreamCompletePayload = {
  status: number;
  /** Correlates this stream-completion event with the originating request — the same
   *  id passed to onRequest/onResponse for the request (chatCore's traceId). (#11825) */
  requestId?: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    reasoning_tokens?: number;
    cache_read_input_tokens?: number;
    cache_creation_input_tokens?: number;
  };
  timing?: {
    latencyMs: number;
    ttft?: number;
  };
  model?: string;
  provider?: string;
  errorCode?: string;
};

/**
 * Run plugin onStreamComplete hooks — fire-and-forget and fail-open.
 * Called inside the onStreamComplete callback (chatCore.ts) where usage and timing data
 * converge after an SSE stream is fully consumed.
 */
export async function runPluginOnStreamCompleteHook(args: {
  status: number;
  usage?: Record<string, unknown>;
  ttft?: number;
  model: string | null | undefined;
  provider: string | null | undefined;
  errorCode?: string | null | undefined;
  startTime: number;
  requestId?: string;
}): Promise<void> {
  try {
    const { runOnStreamComplete } = await import("@/lib/plugins/hooks");
    runOnStreamComplete({
      status: args.status,
      requestId: args.requestId,
      usage: args.usage as PluginOnStreamCompletePayload["usage"],
      timing: {
        latencyMs: Date.now() - args.startTime,
        ttft: args.ttft,
      },
      model: args.model ?? undefined,
      provider: args.provider ?? undefined,
      errorCode: args.errorCode ?? undefined,
    }).catch(() => {});
  } catch (_) {
    /* plugin onStreamComplete optional */
  }
}
