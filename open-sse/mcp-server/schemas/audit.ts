/**
 * MCP/A2A Audit Types — Interfaces for audit log entries.
 *
 * These types define the format of audit log entries stored in the
 * `mcp_tool_audit` and `a2a_task_events` tables.
 *
 * Security: Input data is never stored in clear text. Only SHA-256 hashes
 * of input and truncated output summaries are persisted.
 */

// ============ MCP Audit Entry ============

export interface McpAuditEntry {
  /** ISO 8601 timestamp */
  timestamp: string;
  /** MCP tool name that was invoked */
  toolName: string;
  /** SHA-256 hash of the serialized input (never stores raw data) */
  inputHash: string;
  /** Truncated first 200 chars of the output, or response type */
  outputSummary: string;
  /** Execution duration in milliseconds */
  durationMs: number;
  /** API key ID used for the invocation (null for anonymous/stdio) */
  apiKeyId: string | null;
  /** Whether the tool execution succeeded */
  success: boolean;
  /** Error code if execution failed */
  errorCode?: string;
  /** Error message summary (truncated, no sensitive data) */
  errorMessage?: string;
}

// ============ A2A Task Event ============

export interface A2aTaskEvent {
  /** ISO 8601 timestamp */
  timestamp: string;
  /** Task ID this event belongs to */
  taskId: string;
  /** Type of event */
  eventType:
    | "task_created"
    | "task_working"
    | "task_completed"
    | "task_failed"
    | "task_cancelled"
    | "task_expired"
    | "provider_selected"
    | "fallback_triggered"
    | "budget_check"
    | "quota_check"
    | "streaming_started"
    | "streaming_ended";
  /** Event-specific data (JSON-serialized) */
  data?: Record<string, unknown>;
}

// ============ Routing Decision Log ============

export interface RoutingDecisionLog {
  /** Unique request identifier */
  requestId: string;
  /** Type of task (coding, review, etc.) */
  taskType: string | null;
  /** Combo used for routing */
  comboId: string | null;
  /** Provider selected by the routing engine */
  providerSelected: string;
  /** Model selected */
  modelSelected: string;
  /** Composite score from the scoring function */
  score: number;
  /** Breakdown of scoring factors */
  factors: RoutingFactor[];
  /** Number of fallbacks triggered during execution */
  fallbacksTriggered: number;
  /** Whether the request succeeded */
  success: boolean;
  /** Total latency in milliseconds */
  latencyMs: number;
  /** Actual cost in USD */
  cost: number;
  /** Source: 'api' | 'mcp' | 'a2a' */
  source: "api" | "mcp" | "a2a";
}

export interface RoutingFactor {
  /** Factor name (quota, health, cost, latency, task_fit, stability) */
  name: string;
  /** Raw factor value [0..1] */
  value: number;
  /** Weight applied to this factor */
  weight: number;
  /** Weighted contribution (value × weight) */
  contribution: number;
}

// ============ Audit Helpers ============

/**
 * Create a SHA-256 hash of input data for audit logging.
 * This ensures we never store raw prompts/data in audit logs.
 */
export async function hashInput(input: unknown): Promise<string> {
  const data = JSON.stringify(input);
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Truncate output to a summary string for audit logging.
 */
export function summarizeOutput(output: unknown, maxLength = 200): string {
  if (output === null || output === undefined) return "(null)";
  const str = typeof output === "string" ? output : JSON.stringify(output);
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "…";
}
