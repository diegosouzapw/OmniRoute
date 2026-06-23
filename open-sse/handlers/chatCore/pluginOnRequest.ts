/**
 * chatCore plugin onRequest hook (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Extracted from handleChatCore's request entry: run the registered plugin `onRequest` hooks. The
 * hook may block the request (→ the handler returns a 403), rewrite the body (→ the handler
 * reassigns `body`), or do nothing. Fail-open — a misbehaving plugin is logged and ignored. Returns
 * a discriminated result so the early-return + body reassignment stay in the handler; behaviour is
 * byte-identical to the previous inline block.
 */

type LoggerLike =
  | { info?: (...args: unknown[]) => void; debug?: (...args: unknown[]) => void }
  | null
  | undefined;

export type PluginOnRequestGate =
  | { blocked: true; response: Response }
  | { blocked: false; body?: unknown };

const JSON_HEADERS = { status: 403, headers: { "Content-Type": "application/json" } } as const;

export async function runPluginOnRequestHook(args: {
  requestId: string;
  body: unknown;
  model: string | null | undefined;
  provider: string | null | undefined;
  apiKeyInfo: unknown;
  log?: LoggerLike;
}): Promise<PluginOnRequestGate> {
  try {
    const { runOnRequest } = await import("@/lib/plugins/hooks");
    const pluginCtx = {
      requestId: args.requestId,
      body: args.body,
      model: args.model,
      provider: args.provider,
      apiKeyInfo: args.apiKeyInfo,
      metadata: {},
    };
    const pluginResult = await runOnRequest(pluginCtx);
    if (pluginResult?.blocked) {
      args.log?.info?.("PLUGIN", `Request blocked by plugin`);
      const response = pluginResult.response
        ? new Response(JSON.stringify(pluginResult.response), JSON_HEADERS)
        : new Response(
            JSON.stringify({
              error: { message: "Request blocked by plugin", type: "plugin_block" },
            }),
            JSON_HEADERS
          );
      return { blocked: true, response };
    }
    if (pluginResult?.metadata) {
      Object.assign(pluginCtx.metadata, pluginResult.metadata);
    }
    return { blocked: false, body: pluginResult?.body };
  } catch (pluginErr) {
    args.log?.debug?.(
      "PLUGIN",
      `onRequest hook error (non-fatal): ${pluginErr instanceof Error ? pluginErr.message : String(pluginErr)}`
    );
    return { blocked: false };
  }
}
