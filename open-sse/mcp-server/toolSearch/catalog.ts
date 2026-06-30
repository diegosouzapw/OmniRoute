/**
 * getAllToolDefinitions — unified catalog of all MCP tool definitions.
 *
 * Aggregates the same collections referenced by TOTAL_MCP_TOOL_COUNT in server.ts:
 *   MCP_TOOLS + memoryTools + skillTools + agentSkillTools + poolTools +
 *   gamificationTools + pluginTools + notionTools + obsidianTools
 *
 * Tolerates both Array and Record shapes. Deduplicates by name (first wins).
 */

import { MCP_TOOLS } from "../schemas/tools.ts";
import { memoryTools } from "../tools/memoryTools.ts";
import { skillTools } from "../tools/skillTools.ts";
import { agentSkillTools } from "../tools/agentSkillTools.ts";
import { poolTools } from "../tools/poolTools.ts";
import { gamificationTools } from "../tools/gamificationTools.ts";
import { pluginTools } from "../tools/pluginTools.ts";
import { notionTools } from "../tools/notionTools.ts";
import { obsidianTools } from "../tools/obsidianTools.ts";

import type { ToolCatalogEntry } from "./search.ts";

type AnyToolLike = {
  name?: unknown;
  description?: unknown;
  scopes?: unknown;
  inputSchema?: unknown;
};

function normalizeEntry(raw: AnyToolLike): ToolCatalogEntry | null {
  const name = typeof raw.name === "string" ? raw.name : null;
  const description = typeof raw.description === "string" ? raw.description : "";
  if (!name) return null;

  const scopes: readonly string[] = Array.isArray(raw.scopes)
    ? (raw.scopes as string[]).filter((s): s is string => typeof s === "string")
    : [];

  return { name, description, scopes, inputSchema: raw.inputSchema };
}

function collectFromArray(arr: AnyToolLike[]): ToolCatalogEntry[] {
  const result: ToolCatalogEntry[] = [];
  for (const item of arr) {
    const entry = normalizeEntry(item);
    if (entry) result.push(entry);
  }
  return result;
}

function collectFromRecord(rec: Record<string, AnyToolLike>): ToolCatalogEntry[] {
  return collectFromArray(Object.values(rec));
}

function collectAny(collection: unknown): ToolCatalogEntry[] {
  if (Array.isArray(collection)) return collectFromArray(collection as AnyToolLike[]);
  if (collection && typeof collection === "object") {
    return collectFromRecord(collection as Record<string, AnyToolLike>);
  }
  return [];
}

/**
 * Returns a deduplicated list of all registered MCP tool catalog entries.
 * Deduplication: first occurrence by name wins.
 */
export function getAllToolDefinitions(): ToolCatalogEntry[] {
  const collections: unknown[] = [
    MCP_TOOLS,
    memoryTools,
    skillTools,
    agentSkillTools,
    poolTools,
    gamificationTools,
    pluginTools,
    notionTools,
    obsidianTools,
  ];

  const seen = new Set<string>();
  const result: ToolCatalogEntry[] = [];

  for (const collection of collections) {
    for (const entry of collectAny(collection)) {
      if (!seen.has(entry.name)) {
        seen.add(entry.name);
        result.push(entry);
      }
    }
  }

  return result;
}
