/**
 * `omniroute_tool_search` handler.
 *
 * Lexical scoring stays the source of truth; when the `tool_search` lane is on,
 * a decision model may promote one of the returned hits to the front (never
 * adding or dropping tools, never changing the response shape).
 */
import {
  decideToolSelection,
  isJevFeatureEnabled,
  TOOL_SELECTION_NONE,
} from "../../services/jev/index.ts";
import { getAllToolDefinitions } from "./catalog.ts";
import { searchTools, type ScoredTool } from "./search.ts";
import { zodToTsSignature } from "./signature.ts";

/** The decision model is asked about at most this many lexical hits. */
const MAX_SELECTION_CANDIDATES = 24;

/**
 * Ask the decision model to promote its pick to the front of the lexical hits.
 * Returns `null` when the lane is off, nothing was picked, or Jev failed —
 * callers then keep the pure lexical order.
 */
async function pickJevOrder(query: string, hits: ScoredTool[]): Promise<ScoredTool[] | null> {
  if (hits.length < 2 || !isJevFeatureEnabled("tool_search")) return null;
  try {
    const decision = await decideToolSelection({
      query,
      candidates: hits
        .slice(0, MAX_SELECTION_CANDIDATES)
        .map((h) => ({ name: h.name, description: h.description })),
    });
    if (!decision || decision.tool === TOOL_SELECTION_NONE) return null;
    const index = hits.findIndex((h) => h.name === decision.tool);
    if (index <= 0) return null;
    return [hits[index], ...hits.slice(0, index), ...hits.slice(index + 1)];
  } catch {
    return null;
  }
}

export async function handleToolSearch(args: { query: string; limit?: number }) {
  const entries = getAllToolDefinitions().filter((t) => t.name !== "omniroute_tool_search");
  const hits = searchTools(entries, args.query, args.limit ?? 8);
  const ordered = (await pickJevOrder(args.query, hits)) ?? hits;
  return {
    query: args.query,
    count: ordered.length,
    tools: ordered.map((h) => ({
      name: h.name,
      description: h.description,
      scopes: [...h.scopes],
      signature: zodToTsSignature(h.name, h.inputSchema),
    })),
  };
}
