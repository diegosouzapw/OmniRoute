"use client";

import { useCallback, useState } from "react";
import {
  useLiveDashboard,
  type UseLiveDashboardOptions,
  type WsEventPayload,
} from "./useLiveDashboard";
import {
  compressionEventToModel,
  stepEventsToRunModel,
  appendInFlightStep,
  clearInFlightOnComplete,
  type CompressionRunModel,
  type InFlightCompressionRun,
} from "@/app/(dashboard)/dashboard/compression/studio/compressionFlowModel";
import type { CompressionCompletedPayload, CompressionStepPayload } from "@/lib/events/types";

// ── Constants ─────────────────────────────────────────────────────────────

const MAX_RUNS = 100;

// ── Accumulator (pure reducer — exported for unit tests) ─────────────────

/**
 * Pure accumulator: prepend the new run and cap at `maxRuns`.
 * Most-recent-first order.
 */
export function accumulateRun(
  prev: CompressionRunModel[],
  payload: CompressionCompletedPayload,
  maxRuns = MAX_RUNS
): CompressionRunModel[] {
  const model = compressionEventToModel(payload);
  return [model, ...prev].slice(0, maxRuns);
}

// ── useLiveCompression hook ───────────────────────────────────────────────

export interface UseLiveCompressionReturn {
  /** All accumulated runs, most-recent-first. */
  runs: CompressionRunModel[];
  /** The most recently received run, or null. */
  lastRun: CompressionRunModel | null;
  /** Quick lookup by requestId. */
  getRunById: (requestId: string) => CompressionRunModel | undefined;
  isConnected: boolean;
  reconnect: () => void;
}

/**
 * Subscribes to the `compression` WS channel and accumulates
 * `CompressionRunModel[]` (most-recent-first, capped at 100).
 *
 * Mirrors the pattern of `useLiveComboStatus` and `useLiveRequests`.
 */
export function useLiveCompression(options?: UseLiveDashboardOptions): UseLiveCompressionReturn {
  const [runs, setRuns] = useState<CompressionRunModel[]>([]);
  const [inFlight, setInFlight] = useState<InFlightCompressionRun | null>(null);

  const handleEvent = useCallback((event: WsEventPayload) => {
    if (event.channel !== "compression") return;
    if (event.event === "compression.step") {
      setInFlight((prev) => appendInFlightStep(prev, event.data as CompressionStepPayload));
      return;
    }
    if (event.event === "compression.completed") {
      const payload = event.data as CompressionCompletedPayload;
      setInFlight((prev) => clearInFlightOnComplete(prev, payload.requestId));
      setRuns((prev) => accumulateRun(prev, payload));
    }
  }, []);

  const { connection, reconnect } = useLiveDashboard({
    channels: ["compression"],
    onEvent: handleEvent,
    ...options,
  });

  const getRunById = useCallback(
    (requestId: string) => runs.find((r) => r.requestId === requestId),
    [runs]
  );

  const inFlightRun =
    inFlight && inFlight.steps.length > 0 ? stepEventsToRunModel(inFlight.steps) : null;

  return {
    runs,
    // Prefer the live in-flight run so the studio shows engines as they stream in (F3.3),
    // falling back to the latest completed run.
    lastRun: inFlightRun ?? runs[0] ?? null,
    getRunById,
    isConnected: connection.isConnected,
    reconnect,
  };
}
