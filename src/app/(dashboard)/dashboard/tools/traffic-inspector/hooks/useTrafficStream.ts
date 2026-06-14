"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { InterceptedRequest, ListFilters, WsEvent } from "@/mitm/inspector/types";
import type { FiltersState } from "./useTrafficFilters";

const WS_PATH = "/api/tools/traffic-inspector/ws";
const INITIAL_BACKOFF_MS = 500;
const MAX_BACKOFF_MS = 30_000;
const BACKOFF_MULTIPLIER = 2;

export interface TrafficStreamState {
  requests: InterceptedRequest[];
  connected: boolean;
  paused: boolean;
  total: number;
  pendingCount: number;
}

export interface TrafficStreamActions {
  pause: () => void;
  resume: () => void;
  clear: () => void;
}

export function useTrafficStream(
  filters: FiltersState | ListFilters
): [TrafficStreamState, TrafficStreamActions] {
  const [requests, setRequests] = useState<InterceptedRequest[]>([]);
  const [connected, setConnected] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const backoffRef = useRef(INITIAL_BACKOFF_MS);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  const pausedRef = useRef(false);
  const pendingRef = useRef<InterceptedRequest[]>([]);
  const filtersRef = useRef(filters);
  // connectRef breaks the circular dep between connect's closure and onclose
  const connectRef = useRef<() => void>(() => {});

  // Keep filtersRef in sync without triggering re-render (effect runs after render)
  useEffect(() => {
    filtersRef.current = filters;
  });

  const applyFilter = useCallback((req: InterceptedRequest): boolean => {
    const f = filtersRef.current as FiltersState;
    if (f.profile === "llm" && req.detectedKind !== "llm") return false;
    if (f.profile === "custom" && req.source !== "custom-host") return false;
    if (f.host && !req.host.includes(f.host)) return false;
    if (f.agent && req.agent !== f.agent) return false;
    if (f.source && req.source !== f.source) return false;
    if (f.sessionId && req.sessionId !== f.sessionId) return false;
    if (f.sameContextKey && req.contextKey !== f.sameContextKey) return false;
    if (f.status) {
      const s = req.status;
      if (typeof s === "number") {
        const cat = `${Math.floor(s / 100)}xx`;
        if (cat !== f.status) return false;
      } else if (f.status === "error" && s !== "error") {
        return false;
      }
    }
    return true;
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    const connect = () => {
      if (!mountedRef.current) return;
      if (wsRef.current && wsRef.current.readyState < WebSocket.CLOSING) {
        wsRef.current.close();
      }

      const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
      const url = `${proto}//${window.location.host}${WS_PATH}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!mountedRef.current) return;
        backoffRef.current = INITIAL_BACKOFF_MS;
        setConnected(true);
      };

      ws.onmessage = (ev: MessageEvent) => {
        if (!mountedRef.current) return;
        let event: WsEvent;
        try {
          event = JSON.parse(ev.data as string) as WsEvent;
        } catch {
          return;
        }

        if (pausedRef.current) {
          if (event.type === "new") {
            pendingRef.current.push(event.data);
            setPendingCount(pendingRef.current.length);
          }
          if (event.type === "update") {
            const idx = pendingRef.current.findIndex((r) => r.id === event.data.id);
            if (idx !== -1) pendingRef.current[idx] = event.data;
          }
          return;
        }

        if (event.type === "snapshot") {
          setRequests(event.data.filter(applyFilter));
        } else if (event.type === "new") {
          if (applyFilter(event.data)) {
            setRequests((prev) => [event.data, ...prev].slice(0, 1000));
          }
        } else if (event.type === "update") {
          setRequests((prev) =>
            prev.map((r) => (r.id === event.data.id ? event.data : r))
          );
        } else if (event.type === "clear") {
          setRequests([]);
        }
      };

      ws.onclose = () => {
        if (!mountedRef.current) return;
        setConnected(false);
        const delay = Math.min(backoffRef.current, MAX_BACKOFF_MS);
        backoffRef.current = Math.min(
          backoffRef.current * BACKOFF_MULTIPLIER,
          MAX_BACKOFF_MS
        );
        reconnectTimerRef.current = setTimeout(() => {
          // Use ref so we always call the current connect version
          connectRef.current();
        }, delay);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    // Store in ref for reconnect callback
    connectRef.current = connect;
    connect();

    return () => {
      mountedRef.current = false;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
    };
  }, [applyFilter]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
    setPaused(false);
    if (pendingRef.current.length > 0) {
      const pending = pendingRef.current.filter(applyFilter);
      pendingRef.current = [];
      setPendingCount(0);
      setRequests((prev) => [...pending, ...prev].slice(0, 1000));
    }
  }, [applyFilter]);

  const clear = useCallback(() => {
    setRequests([]);
    pendingRef.current = [];
    setPendingCount(0);
  }, []);

  const state: TrafficStreamState = {
    requests,
    connected,
    paused,
    total: requests.length,
    pendingCount,
  };

  return [state, { pause, resume, clear }];
}
