/**
 * useLiveDashboard — React hooks for real-time dashboard WebSocket
 *
 * Provides hooks for connecting to the live dashboard WebSocket server
 * and subscribing to event channels.
 *
 * Usage:
 *   const { requests, isConnected } = useLiveRequests();
 *   const { comboEvents, lastComboEvent } = useLiveComboStatus();
 */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { DashboardChannel, DashboardEventName } from "@/lib/events/types";

// ── Config ────────────────────────────────────────────────────────────────

const WS_RECONNECT_DELAYS = [1000, 2000, 4000, 8000, 16000, 30000];
const DEFAULT_WS_URL = `ws://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:20129`;

// ── Types ─────────────────────────────────────────────────────────────────

export interface WsEventPayload {
  event: string;
  channel: DashboardChannel;
  data: unknown;
  timestamp: number;
}

export interface DashboardConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  reconnectAttempt: number;
}

// ── Core Hook ─────────────────────────────────────────────────────────────

export interface UseLiveDashboardOptions {
  /** WebSocket URL (default: ws://hostname:20129) */
  wsUrl?: string;
  /** API key for authentication */
  apiKey?: string;
  /** Channels to subscribe to */
  channels?: DashboardChannel[];
  /** Auto-reconnect on disconnect (default: true) */
  autoReconnect?: boolean;
}

/**
 * Core WebSocket connection hook.
 * Manages connection lifecycle, reconnection, and event streaming.
 */
export function useLiveDashboard({
  wsUrl = DEFAULT_WS_URL,
  apiKey,
  channels = ["requests", "combo", "credentials"],
  autoReconnect = true,
}: UseLiveDashboardOptions = {}) {
  const [connection, setConnection] = useState<DashboardConnectionState>({
    isConnected: false,
    isConnecting: false,
    error: null,
    reconnectAttempt: 0,
  });

  const [events, setEvents] = useState<WsEventPayload[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  const maxEvents = 500;

  const connect = useCallback(() => {
    if (!mountedRef.current) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setConnection((prev) => ({
      ...prev,
      isConnecting: true,
      error: null,
    }));

    try {
      const wsUrlWithAuth = apiKey
        ? `${wsUrl}?token=${encodeURIComponent(apiKey)}`
        : wsUrl;

      const ws = new WebSocket(wsUrlWithAuth);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!mountedRef.current) return;
        setConnection({
          isConnected: true,
          isConnecting: false,
          error: null,
          reconnectAttempt: 0,
        });

        // Subscribe to channels
        ws.send(JSON.stringify({ type: "subscribe", channels }));
      };

      ws.onmessage = (event) => {
        if (!mountedRef.current) return;
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === "event") {
            const payload: WsEventPayload = {
              event: msg.event,
              channel: msg.channel,
              data: msg.data,
              timestamp: msg.timestamp || Date.now(),
            };
            setEvents((prev) => {
              const next = [...prev, payload];
              return next.length > maxEvents ? next.slice(-maxEvents) : next;
            });
          } else if (msg.type === "pong") {
            // Heartbeat response
          } else if (msg.type === "welcome") {
            // Send backlog
            if (Array.isArray(msg.data)) {
              setEvents((prev) => {
                const next = [...prev, ...msg.data];
                return next.length > maxEvents ? next.slice(-maxEvents) : next;
              });
            }
          } else if (msg.type === "error") {
            console.error("[LiveWS] Server error:", msg.code, msg.message);
          }
        } catch {
          // Ignore parse errors
        }
      };

      ws.onclose = () => {
        if (!mountedRef.current) return;
        wsRef.current = null;
        setConnection((prev) => ({
          ...prev,
          isConnected: false,
          isConnecting: false,
        }));

        if (autoReconnect) {
          const attempt = connection.reconnectAttempt;
          const delay = WS_RECONNECT_DELAYS[Math.min(attempt, WS_RECONNECT_DELAYS.length - 1)];
          reconnectTimeoutRef.current = setTimeout(() => {
            setConnection((prev) => ({
              ...prev,
              reconnectAttempt: prev.reconnectAttempt + 1,
            }));
          }, delay);
        }
      };

      ws.onerror = () => {
        if (!mountedRef.current) return;
        setConnection((prev) => ({
          ...prev,
          isConnecting: false,
          error: "Connection failed",
        }));
      };
    } catch (err) {
      setConnection((prev) => ({
        ...prev,
        isConnecting: false,
        error: err instanceof Error ? err.message : "Connection failed",
      }));
    }
  }, [wsUrl, apiKey, channels.join(","), autoReconnect, connection.reconnectAttempt]);

  // Connect on mount and on reconnect trigger
  useEffect(() => {
    connect();
    return () => {
      mountedRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      wsRef.current?.close();
    };
  }, [connect]);

  // Connect (for manual retry)
  const reconnect = useCallback(() => {
    wsRef.current?.close();
    setConnection((prev) => ({
      ...prev,
      reconnectAttempt: prev.reconnectAttempt + 1,
    }));
  }, []);

  return {
    connection,
    events,
    reconnect,
    /** Filter events by channel */
    getEventsByChannel: useCallback(
      (channel: DashboardChannel) => events.filter((e) => e.channel === channel),
      [events],
    ),
    /** Filter events by name */
    getEventsByName: useCallback(
      (eventName: string) => events.filter((e) => e.event === eventName),
      [events],
    ),
    /** Clear event history */
    clearEvents: useCallback(() => setEvents([]), []),
  };
}

// ── Request Monitoring Hook ───────────────────────────────────────────────

export interface LiveRequest {
  id: string;
  model: string;
  provider: string;
  timestamp: number;
  status: "pending" | "running" | "success" | "error";
  tokensInput?: number;
  tokensOutput?: number;
  latencyMs?: number;
  error?: string;
  comboName?: string;
}

/**
 * Hook for monitoring live requests.
 */
export function useLiveRequests(options?: UseLiveDashboardOptions) {
  const { events, connection, reconnect } = useLiveDashboard({
    channels: ["requests"],
    ...options,
  });

  const [activeRequests, setActiveRequests] = useState<Map<string, LiveRequest>>(new Map());
  const [completedRequests, setCompletedRequests] = useState<LiveRequest[]>([]);
  const maxCompleted = 100;

  useEffect(() => {
    setActiveRequests((prev) => {
      const next = new Map(prev);

      for (const event of events) {
        if (event.event === "request.started") {
          const data = event.data as any;
          next.set(data.id, {
            id: data.id,
            model: data.model,
            provider: data.provider,
            timestamp: data.timestamp,
            status: "pending",
            comboName: data.comboName,
          });
        } else if (event.event === "request.streaming") {
          const data = event.data as any;
          const existing = next.get(data.id);
          if (existing) {
            next.set(data.id, { ...existing, status: "running" });
          }
        } else if (event.event === "request.completed") {
          const data = event.data as any;
          const existing = next.get(data.id);
          if (existing) {
            next.delete(data.id);
            setCompletedRequests((prev) => {
              const done: LiveRequest = {
                ...existing,
                status: data.status === "success" ? "success" : "error",
                tokensInput: data.tokensInput,
                tokensOutput: data.tokensOutput,
                latencyMs: data.latencyMs,
                error: data.error,
              };
              return [done, ...prev].slice(0, maxCompleted);
            });
          }
        } else if (event.event === "request.failed") {
          const data = event.data as any;
          const existing = next.get(data.id);
          if (existing) {
            next.delete(data.id);
            setCompletedRequests((prev) => {
              const done: LiveRequest = {
                ...existing,
                status: "error",
                error: data.error,
                latencyMs: data.latencyMs,
              };
              return [done, ...prev].slice(0, maxCompleted);
            });
          }
        }
      }

      return next;
    });

    // Reset events after processing
  }, [events]);

  return {
    activeRequests: Array.from(activeRequests.values()),
    completedRequests,
    activeCount: activeRequests.size,
    isConnected: connection.isConnected,
    reconnect,
  };
}

// ── Combo Status Hook ─────────────────────────────────────────────────────

export interface LiveComboEvent {
  comboName: string;
  targetIndex: number;
  provider: string;
  model: string;
  type: "attempt" | "succeeded" | "failed";
  latencyMs?: number;
  error?: string;
  timestamp: number;
}

/**
 * Hook for monitoring live combo cascade status.
 */
export function useLiveComboStatus(options?: UseLiveDashboardOptions) {
  const { events, connection, reconnect } = useLiveDashboard({
    channels: ["combo"],
    ...options,
  });

  const [comboEvents, setComboEvents] = useState<LiveComboEvent[]>([]);
  const maxComboEvents = 200;

  useEffect(() => {
    for (const event of events) {
      const data = event.data as any;
      let comboEvent: LiveComboEvent | null = null;

      if (event.event === "combo.target.attempt") {
        comboEvent = {
          comboName: data.comboName,
          targetIndex: data.targetIndex,
          provider: data.provider,
          model: data.model,
          type: "attempt",
          timestamp: event.timestamp,
        };
      } else if (event.event === "combo.target.succeeded") {
        comboEvent = {
          comboName: data.comboName,
          targetIndex: data.targetIndex,
          provider: data.provider,
          model: data.model,
          type: "succeeded",
          latencyMs: data.latencyMs,
          timestamp: event.timestamp,
        };
      } else if (event.event === "combo.target.failed") {
        comboEvent = {
          comboName: data.comboName,
          targetIndex: data.targetIndex,
          provider: data.provider,
          model: data.model,
          type: "failed",
          error: data.error,
          latencyMs: data.latencyMs,
          timestamp: event.timestamp,
        };
      }

      if (comboEvent) {
        setComboEvents((prev) => [comboEvent!, ...prev].slice(0, maxComboEvents));
      }
    }
  }, [events]);

  /** Get events for a specific combo */
  const getComboHistory = useCallback(
    (comboName: string) => comboEvents.filter((e) => e.comboName === comboName),
    [comboEvents],
  );

  /** Get the last event for a specific combo */
  const getLastComboEvent = useCallback(
    (comboName: string) => comboEvents.find((e) => e.comboName === comboName),
    [comboEvents],
  );

  return {
    comboEvents,
    activeCombos: new Set(comboEvents.map((e) => e.comboName)),
    isConnected: connection.isConnected,
    getComboHistory,
    getLastComboEvent,
    reconnect,
  };
}

// ── Connection Status Hook ────────────────────────────────────────────────

/**
 * Hook for checking connection status only (no events).
 */
export function useLiveConnectionStatus(options?: UseLiveDashboardOptions) {
  const { connection, reconnect } = useLiveDashboard({
    channels: [],
    ...options,
  });
  return { ...connection, reconnect };
}
