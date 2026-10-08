"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";

const count = z.number().int().nonnegative();
const timestamp = z.string().datetime();
const counters = { running: count, queued: count };
const snapshotSchema = z.object({
  timestamp,
  comboQueues: z.record(
    z.string(),
    z.object({ ...counters, max: count, rateLimitedUntil: timestamp.nullable() })
  ),
  semaphores: z.record(
    z.string(),
    z.object({ ...counters, maxConcurrency: count, blockedUntil: timestamp.nullable() })
  ),
});

export type ConcurrencySnapshot = z.infer<typeof snapshotSchema>;
type SnapshotError = "unavailable" | "unauthorized" | null;
const POLL_MS = 3_000;
const DEADLINE_MS = 5_000;
const STALE_MS = 10_000;

function scheduleSnapshotAge(snapshot: ConcurrencySnapshot, setAged: (aged: boolean) => void) {
  const age = Math.max(0, Date.now() - Date.parse(snapshot.timestamp));
  setAged(age >= STALE_MS);
  return age < STALE_MS ? setTimeout(() => setAged(true), STALE_MS - age) : undefined;
}

/** Independent, read-only polling. At most one live request per mounted card. */
export function useConcurrencySnapshot() {
  const [data, setData] = useState<ConcurrencySnapshot | null>(null);
  const [error, setError] = useState<SnapshotError>(null);
  const [refreshing, setRefreshing] = useState(true);
  const [aged, setAged] = useState(false);
  const refreshRef = useRef<() => void>(() => {});

  useEffect(() => {
    let mounted = true;
    let current: AbortController | null = null;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    let staleTimer: ReturnType<typeof setTimeout> | undefined;

    const acceptSnapshot = (snapshot: ConcurrencySnapshot) => {
      setData(snapshot);
      setError(null);
      clearTimeout(staleTimer);
      staleTimer = scheduleSnapshotAge(snapshot, setAged);
    };

    const refresh = async () => {
      if (!mounted || current) return;
      const controller = new AbortController();
      current = controller;
      setRefreshing(true);
      const isCurrent = () => mounted && current === controller;
      const finish = () => {
        clearTimeout(deadline);
        current = null;
        setRefreshing(false);
      };
      // Finalize here too: a late/abort-ignoring transport must not wedge polling
      // or replace a newer snapshot (including an authorization failure).
      deadline = setTimeout(() => {
        if (!isCurrent()) return;
        controller.abort();
        setError("unavailable");
        finish();
      }, DEADLINE_MS);

      try {
        const response = await fetch("/api/admin/concurrency", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!isCurrent()) return;
        if ([401, 403].includes(response.status)) {
          setData(null);
          setError("unauthorized");
          clearTimeout(staleTimer);
          return;
        }
        if (!response.ok) throw new Error("Snapshot unavailable");
        const snapshot = snapshotSchema.parse(await response.json());
        if (!isCurrent()) return;
        acceptSnapshot(snapshot);
      } catch {
        // Network, JSON and schema failures share an explicit localized error;
        // retain the last good snapshot rather than rendering a false empty one.
        if (isCurrent()) setError("unavailable");
      } finally {
        if (isCurrent()) finish();
      }
    };

    refreshRef.current = () => {
      void refresh();
    };
    const initial = setTimeout(refresh, 0);
    const interval = setInterval(refresh, POLL_MS);
    return () => {
      mounted = false;
      clearTimeout(initial);
      clearInterval(interval);
      clearTimeout(deadline);
      clearTimeout(staleTimer);
      current?.abort();
      refreshRef.current = () => {};
    };
  }, []);

  return {
    data,
    error,
    refreshing,
    stale: Boolean(data && (error || aged)),
    refresh: () => refreshRef.current(),
  };
}
