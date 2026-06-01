/**
 * Row types for F2 DB modules (AgentBridge + Inspector).
 * These are local type definitions used by the CRUD modules in this directory.
 * F1 will create canonical Zod schemas in src/shared/schemas/; F10 reconciles them.
 */

export interface AgentBridgeStateRow {
  agent_id: string;
  dns_enabled: boolean;
  cert_trusted: boolean;
  setup_completed: boolean;
  last_started_at: string | null;
  last_error: string | null;
}

export interface AgentBridgeMappingRow {
  agent_id: string;
  source_model: string;
  target_model: string;
  updated_at: string;
}

export interface AgentBridgeBypassRow {
  pattern: string;
  source: "default" | "user";
  created_at: string;
}

export interface InspectorCustomHostRow {
  host: string;
  enabled: boolean;
  label: string | null;
  kind: "llm" | "app" | "custom";
  added_at: string;
  last_seen_at: string | null;
}

export interface InspectorSessionRow {
  id: string;
  name: string | null;
  started_at: string;
  ended_at: string | null;
  request_count: number;
  profile: "llm" | "custom" | "all" | null;
}
