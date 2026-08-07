/**
 * Database module: AgentBridgeMappings
 * CRUD operations for agent_bridge_mappings table.
 */

import { getDbInstance } from "./core";
import type { AgentBridgeMappingRow } from "./_rowTypes";
import { setMitmAliasAll } from "./models/mitmAlias";

/** Agents that have a registered alias key in standaloneRouting.cjs::AGENT_ROUTE_CONFIG. */
const MITM_ALIAS_AGENTS = new Set(["antigravity", "claude-code", "kiro"]);

export function getMappingsForAgent(agentId: string): AgentBridgeMappingRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT agent_id, source_model, target_model, updated_at FROM agent_bridge_mappings WHERE agent_id = ? ORDER BY source_model ASC"
    )
    .all(agentId) as AgentBridgeMappingRow[];
  return rows;
}

export function setMappings(
  agentId: string,
  mappings: Array<{ source: string; target: string }>
): void {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const deleteStmt = db.prepare("DELETE FROM agent_bridge_mappings WHERE agent_id = ?");
  const insertStmt = db.prepare(
    `INSERT INTO agent_bridge_mappings (agent_id, source_model, target_model, updated_at)
     VALUES (?, ?, ?, ?)`
  );

  const runTransaction = db.transaction(() => {
    deleteStmt.run(agentId);
    for (const mapping of mappings) {
      insertStmt.run(agentId, mapping.source, mapping.target, now);
    }
  });

  runTransaction();
}

export function deleteMapping(agentId: string, source: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM agent_bridge_mappings WHERE agent_id = ? AND source_model = ?").run(
    agentId,
    source
  );
}

/**
 * Sync agent_bridge_mappings for the given agent to the key_value table as
 * mitmAlias entries so the MITM proxy (server.cjs) can read them during
 * interception.
 *
 * Only syncs agents that have a dedicated alias key in
 * standaloneRouting.cjs::AGENT_ROUTE_CONFIG (antigravity, claude-code, kiro).
 * Other agents fall through to the antigravity config and don't need their own
 * entry.
 *
 * Fix #8656: model mappings saved via the UI were invisible to the MITM proxy
 * because the proxy reads from key_value (namespace='mitmAlias'), not from
 * agent_bridge_mappings.
 */
export function syncAgentBridgeMappingsToMitmAlias(agentId: string): void {
  if (!MITM_ALIAS_AGENTS.has(agentId)) return;
  const rows = getMappingsForAgent(agentId);
  const mappings: Record<string, string> = {};
  for (const row of rows) {
    mappings[row.source_model] = row.target_model;
  }
  setMitmAliasAll(agentId, mappings);
}
