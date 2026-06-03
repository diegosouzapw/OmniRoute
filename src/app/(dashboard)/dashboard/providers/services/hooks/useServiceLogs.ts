"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface LogLine {
  ts: number;
  stream: "stdout" | "stderr";
  line: string;
}

interface UseServiceLogsOptions {
  tail?: number;
  filter?: string;
}

interface UseServiceLogsResult {
  lines: LogLine[];
  isPaused: boolean;
  togglePause: () => void;
  clear: () => void;
  setFilter: (filter: string) => void;
}

const MAX_LINES = 1000;

export function useServiceLogs(
  name: string,
  options: UseServiceLogsOptions = {}
): UseServiceLogsResult {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState(options.filter ?? "");
  const pauseRef = useRef(false);
  const esRef = useRef<EventSource | null>(null);

  const togglePause = useCallback(() => {
    setIsPaused((p) => {
      pauseRef.current = !p;
      return !p;
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (options.tail !== undefined) params.set("tail", String(options.tail));
    if (filter) params.set("filter", filter);

    const url = `/api/services/${name}/logs?${params.toString()}`;
    const es = new EventSource(url);
    esRef.current = es;

    es.addEventListener("snapshot", (e) => {
      try {
        const snapshot = JSON.parse(e.data) as LogLine[];
        setLines(snapshot.slice(-MAX_LINES));
      } catch {}
    });

    es.addEventListener("log", (e) => {
      if (pauseRef.current) return;
      try {
        const line = JSON.parse(e.data) as LogLine;
        setLines((prev) => {
          const next = [...prev, line];
          return next.length > MAX_LINES ? next.slice(-MAX_LINES) : next;
        });
      } catch {}
    });

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [name, filter, options.tail]);

  return { lines, isPaused, togglePause, clear, setFilter };
}
