import { getAllToolDefinitions } from "./catalog.ts";
import { searchTools } from "./search.ts";
import { zodToTsSignature } from "./signature.ts";

export function handleToolSearch(args: { query: string; limit?: number }) {
  const entries = getAllToolDefinitions().filter((t) => t.name !== "omniroute_tool_search");
  const hits = searchTools(entries, args.query, args.limit ?? 8);
  return {
    query: args.query,
    count: hits.length,
    tools: hits.map((h) => ({
      name: h.name,
      description: h.description,
      scopes: [...h.scopes],
      signature: zodToTsSignature(h.name, h.inputSchema),
    })),
  };
}
