import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { toolSearchInput } from "../schemas/toolSearch.ts";
import type { McpToolExtraLike } from "../scopeEnforcement.ts";
import { handleToolSearch } from "./handler.ts";

type TextToolResult = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};

type ScopeEnforcedHandler = (
  toolName: string,
  handler: (args: unknown, extra?: McpToolExtraLike) => Promise<TextToolResult>,
  toolScopes?: readonly string[]
) => (args: unknown, extra?: McpToolExtraLike) => Promise<TextToolResult>;

export function registerToolSearchTool(
  server: McpServer,
  withScopeEnforcement: ScopeEnforcedHandler
): void {
  server.registerTool(
    "omniroute_tool_search",
    {
      description:
        "Search MCP tools by keyword; returns compact one-line TS signatures for token-efficient discovery.",
      inputSchema: toolSearchInput,
    },
    withScopeEnforcement("omniroute_tool_search", (args) => {
      const parsed = toolSearchInput.parse(args ?? {});
      const result = handleToolSearch(parsed);
      return Promise.resolve({
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      });
    })
  );
}
