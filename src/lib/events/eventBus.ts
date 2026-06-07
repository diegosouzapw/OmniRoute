/**
 * Event Bus
 *
 * Singleton typed EventEmitter for dashboard real-time events.
 * Uses globalThis pattern to survive HMR.
 *
 * Events are emitted by various parts of the system:
 *   - chatCore.ts: request.started
 *   - stream.ts: request.completed, request.failed
 *   - combo.ts: combo.target.*
 *   - credentialGate.ts: credential.health.changed
 *
 * Consumers (WebSocket server, dashboard hooks, etc.) subscribe
 * to specific event types via on/off.
 */

import {
  type DashboardEventName,
  type DashboardEventMap,
  type DashboardEventListener,
} from "./types";

// ── State (globalThis singleton) ──────────────────────────────────────────

declare global {
  var __omnirouteEventBus:
    | {
        initialized: boolean;
        listeners: Map<DashboardEventName, Set<Function>>;
        wildcardListeners: Set<Function>;
        history: Array<{ event: DashboardEventName; payload: unknown; timestamp: number }>;
        maxHistory: number;
        emitCount: number;
      }
    | undefined;
}

function getBusState() {
  if (!globalThis.__omnirouteEventBus) {
    globalThis.__omnirouteEventBus = {
      initialized: false,
      listeners: new Map(),
      wildcardListeners: new Set(),
      history: [],
      maxHistory: 100,
      emitCount: 0,
    };
  }
  return globalThis.__omnirouteEventBus;
}

// ── Event History ─────────────────────────────────────────────────────────

export interface HistoryEntry {
  event: DashboardEventName;
  payload: unknown;
  timestamp: number;
}

/**
 * Get recent event history (for clients that connect late).
 */
export function getEventHistory(sinceTimestamp?: number, maxEntries = 50): HistoryEntry[] {
  const state = getBusState();
  let history = state.history;
  if (sinceTimestamp) {
    history = history.filter((h) => h.timestamp > sinceTimestamp);
  }
  return history.slice(-maxEntries);
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Emit an event to all subscribers.
 */
export function emit<E extends DashboardEventName>(event: E, payload: DashboardEventMap[E]): void {
  const state = getBusState();
  state.emitCount++;

  const entry = { event, payload, timestamp: Date.now() };
  state.history.push(entry);
  if (state.history.length > state.maxHistory) {
    state.history.shift();
  }

  // Notify specific listeners
  const eventListeners = state.listeners.get(event);
  if (eventListeners) {
    for (const listener of eventListeners) {
      try {
        listener(payload);
      } catch (err) {
        console.error(`[EventBus] Error in listener for ${event}:`, err);
      }
    }
  }

  // Notify wildcard listeners (\*)
  for (const listener of state.wildcardListeners) {
    try {
      listener(event, payload);
    } catch (err) {
      console.error(`[EventBus] Error in wildcard listener for ${event}:`, err);
    }
  }
}

/**
 * Subscribe to a specific event.
 * Returns an unsubscribe function.
 */
export function on<E extends DashboardEventName>(
  event: E,
  listener: DashboardEventListener<E>
): () => void {
  const state = getBusState();
  if (!state.listeners.has(event)) {
    state.listeners.set(event, new Set());
  }
  state.listeners.get(event)!.add(listener as Function);

  return () => {
    state.listeners.get(event)?.delete(listener as Function);
  };
}

/**
 * Subscribe to ALL events (wildcard).
 * Returns an unsubscribe function.
 */
export function onAny(listener: (event: DashboardEventName, payload: unknown) => void): () => void {
  const state = getBusState();
  state.wildcardListeners.add(listener);
  return () => {
    state.wildcardListeners.delete(listener);
  };
}

/**
 * Remove a specific listener.
 */
export function off<E extends DashboardEventName>(
  event: E,
  listener: DashboardEventListener<E>
): void {
  getBusState()
    .listeners.get(event)
    ?.delete(listener as Function);
}

/**
 * Remove all listeners for an event.
 */
export function removeAllListeners(event?: DashboardEventName): void {
  const state = getBusState();
  if (event) {
    state.listeners.delete(event);
  } else {
    state.listeners.clear();
    state.wildcardListeners.clear();
  }
}

/**
 * Get bus stats for monitoring.
 */
export function getBusStats(): {
  totalListeners: number;
  eventsWithListeners: number;
  totalEmitted: number;
  historySize: number;
} {
  const state = getBusState();
  let totalListeners = state.wildcardListeners.size;
  for (const set of state.listeners.values()) {
    totalListeners += set.size;
  }
  return {
    totalListeners,
    eventsWithListeners: state.listeners.size,
    totalEmitted: state.emitCount,
    historySize: state.history.length,
  };
}

/**
 * Initialize event bus (idempotent).
 */
export function initEventBus(): void {
  getBusState().initialized = true;
}

// Auto-initialize on import
initEventBus();
