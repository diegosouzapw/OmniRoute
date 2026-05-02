import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

import { runMigrations, getMigrationStatus } from "../../src/lib/db/migrationRunner.ts";

const db = new Database(":memory:");
db.exec(`
  CREATE TABLE IF NOT EXISTS _omniroute_migrations (
    version TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  INSERT INTO _omniroute_migrations (version, name) VALUES ('001', 'initial_schema');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('002', 'mcp_a2a_tables');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('003', 'provider_node_custom_paths');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('004', 'proxy_registry');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('005', 'combo_agent_fields');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('006', 'detailed_request_logs');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('007', 'search_request_type');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('008', 'registered_keys');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('009', 'requested_model');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('010', 'model_combo_mappings');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('011', 'webhooks');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('012', 'fix_token_input_cache_tokens');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('013', 'quota_snapshots');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('014', 'unified_log_artifacts');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('015', 'create_memories');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('016', 'create_skills');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('017', 'version_manager_upstream_proxy');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('018', 'call_logs_detailed_tokens');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('019', 'context_handoffs');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('020', 'combo_sort_order');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('021', 'combo_call_log_targets');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('026', 'call_logs_cache_source');
  INSERT INTO _omniroute_migrations (version, name) VALUES ('029', 'provider_connection_max_concurrent');
`);

console.log("Status before:", getMigrationStatus(db));

try {
  runMigrations(db, { isNewDb: false });
} catch (e) {
  console.error("Migration threw error:", e);
}

console.log("Status after:", getMigrationStatus(db));
