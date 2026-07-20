"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";

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
  error: string | null;
  togglePause: () => void;
  clear: () => void;
  setFilter: (filter: string) => void;
}

const MAX_LINES = 1000;

export function useServiceLogs(
  name: string,
  options: UseServiceLogsOptions = {}
): UseServiceLogsResult {
  const t = useTranslations("embeddedServices");
  const [lines, setLines] = useState<LogLine[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

    // Clear any prior error once the stream actually (re)connects, rather than
    // calling setError synchronously in the effect body (which triggers a
    // cascading render and is flagged by react-hooks/set-state-in-effect).
    es.addEventListener("open", () => setError(null));

    es.addEventListener("snapshot", (e) => {
      try {
        const snapshot = JSON.parse(e.data) as LogLine[];
        setLines(snapshot.slice(-MAX_LINES));
        setError(null);
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
        setError(null);
      } catch {}
    });

    es.onerror = () => {
      setError(t("logStreamFailed", { name }));
      es.close();
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [name, filter, options.tail, t]);

  return { lines, isPaused, error, togglePause, clear, setFilter };
}
