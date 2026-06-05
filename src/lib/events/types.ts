/**
 * Event Bus Types
 *
 * Typed event definitions for the real-time event bus.
 * Each event has a name and a typed payload interface.
 */

// ── Event Names ───────────────────────────────────────────────────────────

export type DashboardEventName =
  | "request.started"
  | "request.streaming"
  | "request.completed"
  | "request.failed"
  | "combo.target.attempt"
  | "combo.target.failed"
  | "combo.target.succeeded"
  | "credential.health.changed";

// ── Event Payloads ────────────────────────────────────────────────────────

export interface RequestStartedPayload {
  id: string;
  model: string;
  provider: string;
  timestamp: number;
  comboName?: string;
}

export interface RequestStreamingPayload {
  id: string;
  tokensGenerated: number;
  elapsedMs: number;
}

export interface RequestCompletedPayload {
  id: string;
  status: "success" | "error";
  model: string;
  provider: string;
  tokensInput: number;
  tokensOutput: number;
  latencyMs: number;
  comboName?: string;
  error?: string;
}

export interface RequestFailedPayload {
  id: string;
  error: string;
  statusCode?: number;
  latencyMs: number;
  model?: string;
  provider?: string;
}

export interface ComboTargetAttemptPayload {
  comboName: string;
  targetIndex: number;
  provider: string;
  model: string;
  timestamp: number;
  strategy: string;
}

export interface ComboTargetFailedPayload {
  comboName: string;
  targetIndex: number;
  provider: string;
  model: string;
  error: string;
  latencyMs: number;
}

export interface ComboTargetSucceededPayload {
  comboName: string;
  targetIndex: number;
  provider: string;
  model: string;
  latencyMs: number;
}

export interface CredentialHealthChangedPayload {
  connectionId: string;
  provider: string;
  oldStatus: string;
  newStatus: string;
  timestamp: number;
}

// ── Event Map ─────────────────────────────────────────────────────────────

export interface DashboardEventMap {
  "request.started": RequestStartedPayload;
  "request.streaming": RequestStreamingPayload;
  "request.completed": RequestCompletedPayload;
  "request.failed": RequestFailedPayload;
  "combo.target.attempt": ComboTargetAttemptPayload;
  "combo.target.failed": ComboTargetFailedPayload;
  "combo.target.succeeded": ComboTargetSucceededPayload;
  "credential.health.changed": CredentialHealthChangedPayload;
}

// ── Event Bus Listener ────────────────────────────────────────────────────

export type DashboardEventListener<E extends DashboardEventName> = (
  payload: DashboardEventMap[E]
) => void;

// ── Channel Definitions ───────────────────────────────────────────────────

/** Available subscription channels */
export type DashboardChannel = "requests" | "combo" | "credentials";

/** Map channels to their events */
export const CHANNEL_EVENTS: Record<DashboardChannel, DashboardEventName[]> = {
  requests: ["request.started", "request.streaming", "request.completed", "request.failed"],
  combo: ["combo.target.attempt", "combo.target.failed", "combo.target.succeeded"],
  credentials: ["credential.health.changed"],
};

/** Get channel for an event */
export function getChannelForEvent(event: DashboardEventName): DashboardChannel | undefined {
  for (const [channel, events] of Object.entries(CHANNEL_EVENTS)) {
    if (events.includes(event)) return channel as DashboardChannel;
  }
  return undefined;
}
