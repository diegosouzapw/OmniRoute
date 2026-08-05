/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
import type { CodexTool } from "../types";

/** The function name the chat model sees + the name the loop intercepts. */
export const WEB_SEARCH_TOOL_NAME = "web_search";

/**
 * Find the hosted `{type:"web_search", ...}` entry in a Responses request's `tools[]` and return it
 * verbatim (so its config — external_web_access/filters/user_location/search_context_size — can be
 * replayed into the sidecar's REAL web_search tool). Returns undefined when web search isn't enabled.
 */
export function extractHostedWebSearch(
  tools: unknown[] | undefined
): Record<string, unknown> | undefined {
  if (!Array.isArray(tools)) return undefined;
  for (const t of tools) {
    if (t && typeof t === "object" && (t as { type?: string }).type === "web_search") {
      return t as Record<string, unknown>;
    }
  }
  return undefined;
}

/**
 * The synthetic function tool exposed to the browser-backed model in place of the dropped hosted
 * web_search. The model calls it like any function; the proxy intercepts the call and runs the real
 * search via the sidecar (the call is never relayed to Codex). `webSearch:true` flags it for the loop.
 */
export function buildWebSearchTool(): CodexTool {
  return {
    name: WEB_SEARCH_TOOL_NAME,
    description:
      "Search the web for current, real-world, or post-training-cutoff information. " +
      "Returns a concise answer synthesized from live results, with sources. " +
      "Use it whenever the user asks about recent events, versions, prices, docs, or anything you are unsure is current.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "A single search query — a focused natural-language question or keywords.",
        },
        queries: {
          type: "array",
          items: { type: "string" },
          description:
            "Optional: run several related queries together in one call. Use instead of `query` to batch independent searches.",
        },
      },
      // Either `query` or `queries` is accepted; the proxy normalizes them.
    },
    webSearch: true,
  };
}
