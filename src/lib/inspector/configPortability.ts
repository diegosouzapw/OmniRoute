/**
 * Portable AgentBridge configuration (Gap 4).
 *
 * Serialises the operator-tunable AgentBridge state — user bypass patterns,
 * custom hosts, and per-agent model mappings — into a versioned JSON blob so a
 * setup can be replicated across machines (ProxyBridge ships the same
 * import/export-rules portability). Defaults (bank/gov/okta bypass, etc.) live
 * in code and are intentionally NOT exported, so importing never duplicates or
 * fights them.
 */
import { z } from "zod";
import { getUserBypassPatterns, replaceUserBypassPatterns } from "@/lib/db/agentBridgeBypass";
import { listCustomHosts, addCustomHost } from "@/lib/db/inspectorCustomHosts";
import { getMappingsForAgent, setMappings } from "@/lib/db/agentBridgeMappings";
import { ALL_TARGETS } from "@/mitm/targets/index";

export const AgentBridgeConfigSchema = z.object({
  version: z.literal(1),
  bypassPatterns: z.array(z.string()),
  customHosts: z.array(
    z.object({
      host: z.string().min(1),
      kind: z.enum(["llm", "app", "custom"]).default("custom"),
      label: z.string().nullable().optional(),
    })
  ),
  agentMappings: z.record(
    z.string(),
    z.array(z.object({ source: z.string(), target: z.string() }))
  ),
});

export type AgentBridgeConfig = z.infer<typeof AgentBridgeConfigSchema>;

/** Read the current operator-tunable AgentBridge state into a portable blob. */
export function exportConfig(): AgentBridgeConfig {
  const customHosts = listCustomHosts().map((h) => ({
    host: h.host,
    kind: (h.kind as "llm" | "app" | "custom") ?? "custom",
    label: h.label ?? null,
  }));

  const agentMappings: Record<string, Array<{ source: string; target: string }>> = {};
  for (const target of ALL_TARGETS) {
    const rows = getMappingsForAgent(target.id);
    if (rows.length > 0) {
      agentMappings[target.id] = rows.map((r) => ({
        source: r.source_model,
        target: r.target_model,
      }));
    }
  }

  return {
    version: 1,
    bypassPatterns: getUserBypassPatterns(),
    customHosts,
    agentMappings,
  };
}

export interface ImportResult {
  bypassPatterns: number;
  customHosts: number;
  agents: number;
}

/** Apply a validated config to the DB. Bypass + mappings replace wholesale;
 * custom hosts are added idempotently (INSERT OR IGNORE). */
export function importConfig(config: AgentBridgeConfig): ImportResult {
  replaceUserBypassPatterns(config.bypassPatterns);

  for (const h of config.customHosts) {
    addCustomHost(h.host, h.kind, h.label ?? undefined);
  }

  for (const [agentId, mappings] of Object.entries(config.agentMappings)) {
    setMappings(agentId, mappings);
  }

  return {
    bypassPatterns: config.bypassPatterns.length,
    customHosts: config.customHosts.length,
    agents: Object.keys(config.agentMappings).length,
  };
}
