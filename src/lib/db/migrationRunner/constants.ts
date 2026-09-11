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
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "124",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "125",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "126",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "127",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "128",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "131",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 133 collided with 133_call_logs_session_tag once that landed on release.
    fromVersion: "133",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 135 and 136 are canonical release migrations now.
    fromVersion: "135",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "136",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 139 and 140 are occupied by CCR and connection runtime state.
    fromVersion: "139",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "140",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 143 is the API-key cache mode; 144–145 are the stacked Radar caches.
    fromVersion: "143",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 144 was published by this PR before the Radar reservation landed.
    fromVersion: "144",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // inspector_custom_hosts was once published in slot 074, now occupied by
    // discovery_results. Its canonical idempotent migration lives at 081.
    fromVersion: "074",
    fromName: "inspector_custom_hosts",
    toVersion: "081",
    toName: "inspector_custom_hosts",
  },
  {
    fromVersion: "134",
    fromName: "ccr_blocks",
    toVersion: "139",
    toName: "ccr_blocks",
  },
  {
    fromVersion: "139",
    fromName: "job_registry",
    toVersion: "146",
    toName: "job_registry",
  },
  {
    // The cumulative Radar branch used 143 before 143_api_key_cache_default_mode
    // landed on release/v3.8.50. Rehome already-applied Radar rows to the next
    // free slot so the canonical API-key migration can still run.
    fromVersion: "143",
    fromName: "radar_local_model_state",
    toVersion: "153",
    toName: "radar_local_model_state",
  },
  {
    fromVersion: "056",
    fromName: "provider_default",
    toVersion: "056",
    toName: "mcp_accessibility_compression",
  },
  {
    fromVersion: "073",
    fromName: "discovery_results",
    toVersion: "073",
    toName: "per_model_token_limits",
  },
  {
    fromVersion: "077",
    fromName: "plugin_metrics",
    toVersion: "077",
    toName: "api_key_stream_default_mode",
  },
  {
    fromVersion: "101",
    fromName: "proxy_pool_rotation",
    toVersion: "101",
    toName: "api_key_usage_limits",
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
