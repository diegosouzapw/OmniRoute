/**
 * Fleet Health Check Types
 *
 * Shared TypeScript types for fleet node health monitoring,
 * configuration versioning, scaling policies, alert rules,
 * and health event streaming.
 *
 * @module fleet/types
 */

// ---------------------------------------------------------------------------
// Node state machine
// ---------------------------------------------------------------------------

/** Current operational status of a fleet node. */
export type FleetNodeStatus = "online" | "draining" | "offline" | "decommissioned";

/** Functional role assigned to a fleet node. */
export type FleetNodeRole = "omniroute" | "bifrost" | "agent";

// ---------------------------------------------------------------------------
// Core node info
// ---------------------------------------------------------------------------

/** Core node info returned by list / get operations. */
export interface FleetNodeInfo {
  id: string;
  hostname: string;
  region: string;
  zone: string;
  version: string;
  status: FleetNodeStatus;
  role: FleetNodeRole;
  cpuCores: number;
  memoryTotalBytes: number;
  gpuCount: number;
  labels: Record<string, string>;
  ipAddress: string;
  agentPort: number;
  lastHeartbeat: string | null;
  firstSeen: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Health snapshot (per node)
// ---------------------------------------------------------------------------

/** Per-node health snapshot at a point in time. */
export interface NodeHealthSnapshot {
  nodeId: string;
  compositeScore: number;
  components: {
    cpu: number;
    memory: number;
    io: number;
    network: number;
    gpu: number;
    requests: number;
  };
  metrics: {
    cpuUtilizationPct: number;
    memoryUtilizationPct: number;
    ioWaitPct: number;
    dropRatePct: number;
    gpuUtilizationPct: number | null;
    activeRequests: number;
    maxConcurrent: number;
  };
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Fleet health summary (aggregated)
// ---------------------------------------------------------------------------

/** Aggregated fleet-wide health summary. */
export interface FleetHealthSummary {
  totalNodes: number;
  onlineNodes: number;
  drainingNodes: number;
  offlineNodes: number;
  decommissionedNodes: number;
  avgCompositeScore: number;
  minCompositeScore: number;
  maxCompositeScore: number;
  healthyNodes: number;
  degradedNodes: number;
  criticalNodes: number;
  lastUpdated: string;
}

// ---------------------------------------------------------------------------
// Configuration version
// ---------------------------------------------------------------------------

/** A versioned fleet configuration entry (from fleet_config table). */
export interface FleetConfigVersion {
  id: string;
  version: number;
  config: Record<string, unknown>;
  checksum: string;
  appliedBy: string;
  appliedAt: string;
  status: string;
}

// ---------------------------------------------------------------------------
// Scaling policy
// ---------------------------------------------------------------------------

/** A scaling policy entry (from scaling_policies table). */
export interface ScalingPolicy {
  id: string;
  name: string;
  description: string;
  metric: string;
  threshold: number;
  minReplicas: number;
  maxReplicas: number;
  cooldownSeconds: number;
  scaleUpPolicy: Record<string, unknown>;
  scaleDownPolicy: Record<string, unknown>;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Alert rule
// ---------------------------------------------------------------------------

/** An alert rule entry (from alert_rules table). */
export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: string;
  threshold: number;
  durationSeconds: number;
  severity: string;
  channels: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Health event (for SSE streaming)
// ---------------------------------------------------------------------------

/** Discriminated event type for fleet health SSE streams. */
export type FleetHealthEventType =
  | "node_joined"
  | "node_left"
  | "node_status_change"
  | "health_degraded"
  | "health_critical"
  | "health_restored"
  | "config_applied"
  | "config_failed"
  | "scaling_triggered";

/** A single fleet health event pushed over SSE or stored in the event log. */
export interface FleetHealthEvent {
  id: string;
  type: FleetHealthEventType;
  nodeId?: string;
  message: string;
  details?: Record<string, unknown>;
  severity: string;
  timestamp: string;
}
