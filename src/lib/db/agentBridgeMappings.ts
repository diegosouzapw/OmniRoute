/**
 * Database module: AgentBridgeMappings
 * CRUD operations for agent_bridge_mappings table.
 */

import { getDbInstance } from "./core";
import type { AgentBridgeMappingRow } from "./_rowTypes";

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
  db.prepare(
    "DELETE FROM agent_bridge_mappings WHERE agent_id = ? AND source_model = ?"
  ).run(agentId, source);
}
