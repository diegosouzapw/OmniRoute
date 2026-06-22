/**
 * #4481 layer 2 — per-tool web-search model routing (CCR-style `Router.webSearch`).
 *
 * Some providers expose an Anthropic-compatible (Claude-format) endpoint but do NOT
 * implement Anthropic's typed server tools, so forwarding `web_search_20250305` to them
 * makes the upstream 400 (e.g. MiniMax: `invalid params ... (2013)`). Layer 1
 * (`webSearchFallback.ts`) already converts the tool to OmniRoute's own `/v1/search`
 * fallback for such providers. Layer 2 is the alternative an operator can opt into:
 * route the WHOLE request to a model that natively runs web search, the way
 * claude-code-router's `Router.webSearch` does, while leaving every non-search request on
 * the default model.
 *
 * Pure (no DB / no I/O) so it can be unit-tested and wired into the request entrypoint
 * BEFORE combo/auto routing and before the layer-1 fallback is computed for the target.
 */

interface WebSearchRouteResult {
  wasRouted: boolean;
  model: string;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * True when the request body declares a NATIVE web-search server tool — `web_search`,
 * `web_search_preview`, or any Anthropic dated variant (`web_search_20250305`, future
 * `web_search_YYYYMMDD`). A custom *function* tool that merely happens to be named
 * "web_search" (it carries a `function` field) is NOT a native server tool and is ignored.
 *
 * Uses a `web_search` prefix match on purpose: at the request entrypoint the client's tool
 * is still in its raw form (Claude Code sends the versioned `web_search_20250305`), which
 * the exact-set check in `webSearchFallback.ts` only sees after normalization.
 */
export function hasNativeWebSearchTool(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const tools = (body as { tools?: unknown }).tools;
  if (!Array.isArray(tools)) return false;
  return tools.some((tool) => {
    if (!tool || typeof tool !== "object") return false;
    const record = tool as { type?: unknown; function?: unknown };
    if (record.function) return false; // a custom function tool, not the server tool
    return asString(record.type).startsWith("web_search");
  });
}

/**
 * Resolve whether this request should be routed to the operator-configured web-search
 * model. Routes only when (a) the request carries a native web-search tool, (b)
 * `webSearchRouteModel` is a non-empty string, and (c) it differs from the current model
 * (so re-entry on the already-chosen target is a no-op). The returned `model` is a model
 * string (`provider,model` / `provider/model` / alias / combo name) resolved downstream
 * by the normal routing pipeline.
 */
export function resolveWebSearchRouteOverride(
  currentModel: string,
  body: unknown,
  settings: Record<string, unknown> | null | undefined
): WebSearchRouteResult {
  const fallthrough: WebSearchRouteResult = { wasRouted: false, model: currentModel };
  if (!hasNativeWebSearchTool(body)) return fallthrough;

  const configured = asString(settings?.webSearchRouteModel).trim();
  if (!configured || configured === currentModel) return fallthrough;

  return { wasRouted: true, model: configured };
}
