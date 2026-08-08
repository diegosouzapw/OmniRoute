/**
 * db/migrationRunner/constants.ts — Static migration-compatibility data tables.
 *
 * Pure data (no imports, no DB, no behaviour) extracted verbatim from
 * migrationRunner.ts: the renamed/legacy/superseded migration maps and the
 * physical/initial schema sentinels used by the reconciliation, dedup, and
 * already-applied detection paths. Kept separate so the orchestrator host
 * file holds logic, not data tables.
 */

export const RENAMED_MIGRATION_COMPATIBILITY = [
  {
    fromVersion: "022",
    fromName: "call_logs_summary_storage",
    toVersion: "025",
    toName: "call_logs_summary_storage",
  },
  {
    fromVersion: "028",
    fromName: "provider_connection_max_concurrent",
    toVersion: "029",
    toName: "provider_connection_max_concurrent",
  },
  {
    fromVersion: "028",
    fromName: "compression_settings",
    toVersion: "034",
    toName: "compression_settings",
  },
  {
    fromVersion: "032",
    fromName: "create_reasoning_cache",
    toVersion: "033",
    toName: "create_reasoning_cache",
  },
  {
    fromVersion: "032",
    fromName: "compression_analytics",
    toVersion: "038",
    toName: "compression_analytics",
  },
  {
    fromVersion: "033",
    fromName: "compression_cache_stats",
    toVersion: "039",
    toName: "compression_cache_stats",
  },
  {
    fromVersion: "041",
    fromName: "session_account_affinity",
    toVersion: "050",
    toName: "session_account_affinity",
  },
  {
    fromVersion: "051",
    fromName: "usage_history_service_tier",
    toVersion: "054",
    toName: "usage_history_service_tier",
  },
  {
    fromVersion: "052",
    fromName: "manifest_routing",
    toVersion: "059",
    toName: "manifest_routing",
  },
  {
    fromVersion: "056",
    fromName: "manifest_routing",
    toVersion: "059",
    toName: "manifest_routing",
  },
  {
    fromVersion: "123",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "124",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "125",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "126",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "127",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "128",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "131",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 133 collided with 133_call_logs_session_tag once that landed on release/v3.8.49
    // ahead of this branch; installs that ran this migration from the PR at 133 are
    // reconciled to 144 here, same as every earlier slot this file has occupied.
    fromVersion: "133",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 135 was published on this PR branch before release added
    // 135_migrate_model_capability_max_token. Move the legacy marker first so
    // the canonical 135 migration can still run without replaying this one.
    fromVersion: "135",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 136 was published on this PR branch before release added
    // 136_radar_cache_settings. Move the legacy marker to the next free slot so
    // the Radar migration can still run without replaying this one.
    fromVersion: "136",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 139 was published on this PR branch before release added 139_ccr_blocks.
    // Move that legacy marker so the CCR migration can run without replaying Devin.
    fromVersion: "139",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 140 was published on this PR before release assigned that slot to
    // connection_runtime_state. Preserve those installs and free 140 for release.
    fromVersion: "140",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 143 was published on this PR before #9023 reserved that slot for the
    // retired-provider purge. Preserve those installs and free 143 for #9023.
    fromVersion: "143",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "144",
    toName: "windsurf_to_devin_desktop",
  },
] as const;

export const LEGACY_VERSION_SLOT_MIGRATIONS = [
  { version: "028", name: "evals_tables" },
  { version: "029", name: "webhooks_templates" },
  { version: "030", name: "mcp_scopes_api_keys" },
  { version: "031", name: "api_keys_expires" },
  { version: "032", name: "detailed_logs_warnings" },
  { version: "033", name: "provider_connections_block_extra_usage" },
  { version: "033", name: "add_batch_id_to_call_logs" },
  { version: "046", name: "remove_status_from_files" },
  { version: "051", name: "remove_status_from_files" },
] as const;

export const SUPERSEDED_DUPLICATE_MIGRATIONS = [
  {
    version: "041",
    name: "session_account_affinity",
    supersededByVersion: "050",
    supersededByName: "session_account_affinity",
  },
] as const;

export const PHYSICAL_SCHEMA_SENTINELS = [
  { version: "028", tableName: "batches", description: "batches table" },
  { version: "024", tableName: "sync_tokens", description: "sync_tokens table" },
  { version: "022", tableName: "memory_fts", description: "memory_fts virtual table" },
  { version: "019", tableName: "context_handoffs", description: "context_handoffs table" },
  {
    version: "064",
    tableName: "session_model_history",
    description: "session_model_history table",
  },
  { version: "017", tableName: "version_manager", description: "version_manager table" },
  { version: "016", tableName: "skill_executions", description: "skill_executions table" },
  { version: "015", tableName: "memories", description: "memories table" },
  { version: "013", tableName: "quota_snapshots", description: "quota_snapshots table" },
  { version: "011", tableName: "webhooks", description: "webhooks table" },
  { version: "010", tableName: "model_combo_mappings", description: "model_combo_mappings table" },
  { version: "008", tableName: "registered_keys", description: "registered_keys table" },
  { version: "006", tableName: "request_detail_logs", description: "request_detail_logs table" },
  { version: "004", tableName: "proxy_registry", description: "proxy_registry table" },
  { version: "002", tableName: "mcp_tool_audit", description: "mcp_tool_audit table" },
] as const;

export const INITIAL_SCHEMA_SENTINELS = ["provider_connections", "combos", "call_logs"] as const;
export const OPTIONAL_FTS5_MIGRATION_VERSIONS = new Set(["022", "023"]);
