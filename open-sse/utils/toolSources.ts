/**
 * toolSources.ts — diagnostic classification of request tool definitions.
 *
 * Pure helpers that summarize the `tools` array of a chat request into a
 * single human-readable line (tool count, per-source counts, and the first
 * N tool names). Gated behind the `logToolSources` setting and emitted as a
 * `log.debug("TOOLS", ...)` line in the chat handler so operators can see, at
 * a glance, which MCP servers / hosted tools / client tools a request carries.
 *
 * No side effects — safe to unit test in isolation.
 */

/** A loosely-typed tool definition as it arrives on a chat request body. */
export interface ToolLike {
  name?: string;
  type?: string;
  function?: { name?: string };
  [key: string]: unknown;
}

const MAX_VISIBLE_NAMES = 80;

/**
 * Resolve the display name of a tool across the OpenAI/Claude/Gemini shapes:
 * top-level `name`, nested `function.name`, or `type` (hosted tools), falling
 * back to `"unknown"`.
 */
export function getToolName(tool: ToolLike | null | undefined): string {
  return tool?.name || tool?.function?.name || tool?.type || "unknown";
}

/**
 * Classify a tool name into its source bucket:
 * - `mcp:<server>` / `mcp` for `mcp__<server>__<tool>` names
 * - `hosted:web` for `web_search` / `web_fetch`
 * - `hosted:computer` for `computer_*` / `str_replace_*`
 * - `client` for everything else (client-defined function tools)
 */
export function getToolSource(name: string): string {
  if (name.startsWith("mcp__")) {
    const parts = name.split("__");
    return parts[1] ? `mcp:${parts[1]}` : "mcp";
  }
  if (name.startsWith("web_search") || name.startsWith("web_fetch")) return "hosted:web";
  if (name.startsWith("computer_") || name.startsWith("str_replace_")) return "hosted:computer";
  return "client";
}

/**
 * Build a one-line diagnostic summary of a request's tools, or `null` when
 * there are no tools to report. Shape:
 *   `<N> tools | sources: <src>=<n>, ... | names: <a>, <b>, ... +<k> more`
 */
export function summarizeToolSources(tools: unknown): string | null {
  if (!Array.isArray(tools) || tools.length === 0) return null;
  const names = tools.map((tool) => getToolName(tool as ToolLike));
  const sourceCounts = new Map<string, number>();
  for (const name of names) {
    const source = getToolSource(name);
    sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
  }
  const sources = Array.from(sourceCounts.entries())
    .map(([source, count]) => `${source}=${count}`)
    .join(", ");
  const visibleNames = names.slice(0, MAX_VISIBLE_NAMES).join(", ");
  const suffix =
    names.length > MAX_VISIBLE_NAMES ? `, ... +${names.length - MAX_VISIBLE_NAMES} more` : "";
  return `${tools.length} tools | sources: ${sources} | names: ${visibleNames}${suffix}`;
}
