/**
 * chatCore plugin onResponse hook (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Extracted from handleChatCore's streaming finalization: runs the registered plugin `onResponse`
 * hooks for a completed (status 200) response. Fire-and-forget and fail-open — the inner run is
 * not awaited and both the dynamic import and the run swallow their own errors, so a misbehaving
 * plugin never affects the response. Behaviour is byte-identical to the previous inline block.
 */

export async function runPluginOnResponseHook(args: {
  requestId: string;
  body: unknown;
  model: string | null | undefined;
  provider: string | null | undefined;
  apiKeyInfo: unknown;
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
      { status: 200 }
    ).catch(() => {});
  } catch (_) {
    /* plugin onResponse optional */
  }
}
