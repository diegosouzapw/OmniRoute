/**
 * Fleet Wire Types (snake_case serialization format)
 *
 * These types mirror the camelCase types in `src/lib/fleet/types.ts` but use
 * snake_case field names suitable for REST / gRPC JSON wire format.  Use these
 * when deserializing inbound payloads or when you need a strict JSON
 * representation that matches the database column naming convention.
 *
 * @module fleet/proto/fleet-types
 */

// ---------------------------------------------------------------------------
// Node info (wire format)
// ---------------------------------------------------------------------------

/** Wire-format FleetNodeInfo (snake_case). */
export interface FleetNodeWire {
  id: string;
  hostname: string;
  region: string;
  zone: string;
  version: string;
  status: string;
  role: string;
  cpu_cores: number;
  memory_total_bytes: number;
  gpu_count: number;
  labels: Record<string, string>;
  ip_address: string;
  agent_port: number;
  last_heartbeat: string | null;
  first_seen: string;
  last_seen: string;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Health snapshot (wire format)
// ---------------------------------------------------------------------------

/** Wire-format NodeHealthSnapshot (snake_case). */
export interface NodeHealthSnapshotWire {
  node_id: string;
  composite_score: number;
  components: {
    cpu: number;
    memory: number;
    io: number;
    network: number;
    gpu: number;
    requests: number;
  };
  metrics: {
    cpu_utilization_pct: number;
    memory_utilization_pct: number;
    io_wait_pct: number;
    drop_rate_pct: number;
    gpu_utilization_pct: number | null;
    active_requests: number;
    max_concurrent: number;
  };
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Fleet health summary (wire format)
// ---------------------------------------------------------------------------

/** Wire-format FleetHealthSummary (snake_case). */
export interface FleetHealthSummaryWire {
  total_nodes: number;
  online_nodes: number;
  draining_nodes: number;
  offline_nodes: number;
  decommissioned_nodes: number;
  avg_composite_score: number;
  min_composite_score: number;
  max_composite_score: number;
  healthy_nodes: number;
  degraded_nodes: number;
  critical_nodes: number;
  last_updated: string;
}

// ---------------------------------------------------------------------------
// Configuration version (wire format)
// ---------------------------------------------------------------------------

/** Wire-format FleetConfigVersion (snake_case). */
export interface FleetConfigVersionWire {
  id: string;
  version: number;
  config: Record<string, unknown>;
  checksum: string;
  applied_by: string;
  applied_at: string;
  status: string;
}

// ---------------------------------------------------------------------------
// Scaling policy (wire format)
// ---------------------------------------------------------------------------

/** Wire-format ScalingPolicy (snake_case). */
export interface ScalingPolicyWire {
  id: string;
  name: string;
  description: string;
  metric: string;
  threshold: number;
  min_replicas: number;
  max_replicas: number;
  cooldown_seconds: number;
  scale_up_policy: Record<string, unknown>;
  scale_down_policy: Record<string, unknown>;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Alert rule (wire format)
// ---------------------------------------------------------------------------

/** Wire-format AlertRule (snake_case). */
export interface AlertRuleWire {
  id: string;
  name: string;
  metric: string;
  condition: string;
  threshold: number;
  duration_seconds: number;
  severity: string;
  channels: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Health event (wire format)
// ---------------------------------------------------------------------------

/** Wire-format FleetHealthEvent (snake_case). */
export interface FleetHealthEventWire {
  id: string;
  type: string;
  node_id?: string;
  message: string;
  details?: Record<string, unknown>;
  severity: string;
  timestamp: string;
}
