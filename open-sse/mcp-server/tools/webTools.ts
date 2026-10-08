/**
 * Web-retrieval MCP tool handlers: web search, X search, web fetch.
 *
 * #15159 M-01 — "file = register + wrap. handle* -> tools/canonical/*.ts".
 *
 * Extracted verbatim from `server.ts`; no behavioural change. See the header of
 * `opsTools.ts` for the grouping rationale and the downward-import rule.
 *
 * NAMING: `handleWebFetch` here collides by name with the unrelated
 * `handleWebFetch` in `open-sse/handlers/webFetch.ts` (the web-fetch API route
 * handler — a different concern entirely, not reachable from MCP). They never
 * appear in the same module, so this is not a runtime hazard, but graft drops
 * ambiguous cross-file edges rather than guessing, which makes the graph
 * under-report callers for this name. If that ever matters, disambiguate here
 * rather than at the call site.
 */

import { logToolCall } from "../audit.ts";
import { toSafeMcpErrorMessage } from "../errorMessage.ts";
import { mcpFetchTimeoutSignal } from "../fetchTimeout.ts";
import { omniRouteFetch } from "../internalFetch.ts";

export async function handleWebSearch(args: {
  query: string;
  max_results?: number;
  search_type?: "web" | "news";
  provider?: string;
}) {
  const start = Date.now();
  try {
    const body: Record<string, unknown> = {
      query: args.query,
      max_results: args.max_results ?? 5,
      search_type: args.search_type ?? "web",
    };
    if (args.provider) body.provider = args.provider;

    const result = await omniRouteFetch("/v1/search", {
      method: "POST",
      body: JSON.stringify(body),
      signal: mcpFetchTimeoutSignal("upstream"),
    });
    await logToolCall("omniroute_web_search", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_web_search", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleXSearch(args: {
  query: string;
  max_results?: number;
  provider?: "x-search" | "xquik-search";
}) {
  const start = Date.now();
  try {
    const result = await omniRouteFetch("/v1/search", {
      method: "POST",
      body: JSON.stringify({
        query: args.query,
        max_results: args.max_results ?? 5,
        search_type: "x",
        provider: args.provider ?? "x-search",
      }),
      signal: AbortSignal.timeout(120000),
    });
    await logToolCall("omniroute_x_search", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_x_search", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleWebFetch(args: {
  url: string;
  provider?:
    | "firecrawl"
    | "jina-reader"
    | "tavily-search"
    | "tinyfish"
    | "context7"
    | "nimble-search"
    | "anysearch-search";
  format?: "markdown" | "html" | "links" | "screenshot";
  include_metadata?: boolean;
  depth?: number;
  wait_for_selector?: string;
}) {
  const start = Date.now();
  try {
    const body: Record<string, unknown> = {
      url: args.url,
      format: args.format ?? "markdown",
      include_metadata: args.include_metadata ?? false,
    };
    if (args.provider) body.provider = args.provider;
    if (args.depth !== undefined) body.depth = args.depth;
    if (args.wait_for_selector) body.wait_for_selector = args.wait_for_selector;

    const result = await omniRouteFetch("/v1/web/fetch", {
      method: "POST",
      body: JSON.stringify(body),
      signal: mcpFetchTimeoutSignal("upstream"),
    });
    await logToolCall("omniroute_web_fetch", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = toSafeMcpErrorMessage(err);
    await logToolCall("omniroute_web_fetch", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}
