"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WsEvent } from "@/mitm/inspector/types";

const WS_PATH = "/api/tools/traffic-inspector/ws";
const SNAPSHOT_FLUSH_MS = 500;
const SNAPSHOT_FLUSH_BATCH = 10;

export interface SessionInfo {
  id: string;
  name?: string;
  startedAt: string;
  requestCount: number;
}

async function fetchSessionsRemote(): Promise<SessionInfo[]> {
  const res = await fetch("/api/tools/traffic-inspector/sessions");
  if (!res.ok) return [];
  const data = (await res.json()) as { sessions: SessionInfo[] };
  return data.sessions ?? [];
}

export function useSessionRecorder() {
  const [recording, setRecording] = useState(false);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const mountedRef = useRef(true);
  const recordingWsRef = useRef<WebSocket | null>(null);
  const recordingSessionRef = useRef<SessionInfo | null>(null);
  const pendingSnapshotsRef = useRef<string[]>([]);
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchSessions = useCallback(async () => {
    try {
      const list = await fetchSessionsRemote();
      if (mountedRef.current) setSessions(list);
    } catch {
      // silently ignore
    }
  }, []);

  // Fetch sessions on mount — use an async wrapper to avoid direct setState in effect
  useEffect(() => {
    let cancelled = false;
    fetchSessionsRemote()
      .then((list) => {
        if (!cancelled) setSessions(list);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const flushSnapshots = useCallback(async (sessionId: string) => {
    if (pendingSnapshotsRef.current.length === 0) return;
    const batch = pendingSnapshotsRef.current.splice(0, pendingSnapshotsRef.current.length);
    for (const payload of batch) {
      try {
        await fetch(
          `/api/tools/traffic-inspector/sessions/${encodeURIComponent(sessionId)}/requests`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payload }),
          }
        );
      } catch {
        // best-effort: don't break recording UI on network failure
      }
    }
  }, []);

  const scheduleFlush = useCallback(
    (sessionId: string) => {
      if (flushTimerRef.current) return;
      flushTimerRef.current = setTimeout(() => {
        flushTimerRef.current = null;
        void flushSnapshots(sessionId);
      }, SNAPSHOT_FLUSH_MS);
    },
    [flushSnapshots]
  );

  const stopRecordingWs = useCallback(() => {
    if (flushTimerRef.current) {
      clearTimeout(flushTimerRef.current);
      flushTimerRef.current = null;
    }
    if (recordingWsRef.current) {
      recordingWsRef.current.onclose = null;
      recordingWsRef.current.close();
      recordingWsRef.current = null;
    }
  }, []);

  const start = useCallback(
    async (name?: string) => {
      try {
        const res = await fetch("/api/tools/traffic-inspector/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as { session: SessionInfo };
        const newSession = data.session;
        setSession(newSession);
        recordingSessionRef.current = newSession;
        setRecording(true);
        startTimeRef.current = Date.now();
        setElapsed(0);
        timerRef.current = setInterval(() => {
          setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);

        // Open a dedicated WS to capture traffic events during the recording window
        const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${proto}//${window.location.host}${WS_PATH}`;
        const ws = new WebSocket(wsUrl);
        recordingWsRef.current = ws;

        ws.onmessage = (ev: MessageEvent) => {
          if (!mountedRef.current) return;
          let event: WsEvent;
          try {
            event = JSON.parse(ev.data as string) as WsEvent;
          } catch {
            return;
          }
          if (event.type !== "new") return;
          const sid = recordingSessionRef.current?.id;
          if (!sid) return;
          pendingSnapshotsRef.current.push(JSON.stringify(event.data));
          if (pendingSnapshotsRef.current.length >= SNAPSHOT_FLUSH_BATCH) {
            void flushSnapshots(sid);
          } else {
            scheduleFlush(sid);
          }
        };

        ws.onerror = () => ws.close();
      } catch {
        // ignore
      }
    },
    [flushSnapshots, scheduleFlush]
  );

  const stop = useCallback(async () => {
    if (!session) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRecording(false);
    // Flush any remaining pending snapshots before stopping
    const sid = session.id;
    stopRecordingWs();
    if (pendingSnapshotsRef.current.length > 0) {
      await flushSnapshots(sid);
    }
    recordingSessionRef.current = null;
    try {
      await fetch(`/api/tools/traffic-inspector/sessions/${encodeURIComponent(sid)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stop" }),
      });
    } catch {
      // ignore
    }
    await fetchSessions();
    setSession(null);
  }, [session, fetchSessions, stopRecordingWs, flushSnapshots]);

  const deleteSession = useCallback(async (id: string) => {
    try {
      await fetch(`/api/tools/traffic-inspector/sessions/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      await fetchSessions();
    } catch {
      // ignore
    }
  }, [fetchSessions]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
      if (recordingWsRef.current) {
        recordingWsRef.current.onclose = null;
        recordingWsRef.current.close();
      }
    };
  }, []);

  return {
    recording,
    session,
    elapsed,
    sessions,
    start,
    stop,
    deleteSession,
    fetchSessions,
  };
}
