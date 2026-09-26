"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildModelBatches,
  BULK_CONCURRENCY,
  dedupeComboTargets,
  dedupeModelTargets,
  runWithConcurrency,
  type ComboTestTarget,
  type ModelTestTarget,
} from "./catalogBulkUtils";
import {
  mapBatchResponse,
  mapComboResponse,
  mapRequestFailure,
  mapSingleModelResponse,
  readJsonBody,
  type BatchModelTestResponse,
  type ComboTestResponse,
  type SingleModelTestResponse,
} from "./catalogTestResponses";
import {
  clearCatalogTestResults,
  getComboTestKey,
  getModelTestKey,
  loadCatalogTestResults,
  saveBatchTestResults,
  type CatalogTestResult,
} from "./catalogTestStorage";

export type BulkRunKind = "models" | "combos";

export interface ProgressState {
  kind: BulkRunKind;
  completed: number;
  total: number;
  cancelled: boolean;
}

const IDLE_PROGRESS: ProgressState = { kind: "models", completed: 0, total: 0, cancelled: false };
const JSON_HEADERS = { "Content-Type": "application/json" };

export function useCatalogTestRunner() {
  const [testResults, setTestResults] = useState<Record<string, CatalogTestResult>>({});
  const [running, setRunning] = useState(false);
  const [activeItemKey, setActiveItemKey] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressState>(IDLE_PROGRESS);

  const mountedRef = useRef(false);
  /** Controller of the bulk run that currently owns `running`/`progress`; null when idle. */
  const runControllerRef = useRef<AbortController | null>(null);
  /** Controllers of per-row tests, aborted on unmount. */
  const singleControllersRef = useRef(new Set<AbortController>());

  useEffect(() => {
    mountedRef.current = true;
    const runRef = runControllerRef;
    const singleControllers = singleControllersRef.current;
    // Stored results only exist in the browser, so load them after mount (the pattern
    // DashboardLayout uses for its sidebar state) to keep the first render equal to the SSR HTML.
    const timer = window.setTimeout(() => {
      if (mountedRef.current) setTestResults(loadCatalogTestResults());
    }, 0);
    return () => {
      mountedRef.current = false;
      window.clearTimeout(timer);
      runRef.current?.abort();
      runRef.current = null;
      for (const controller of singleControllers) controller.abort();
      singleControllers.clear();
    };
  }, []);

  /** Store results unless the owning request was cancelled or the page is gone. */
  const persist = useCallback((results: CatalogTestResult[], signal: AbortSignal) => {
    if (!mountedRef.current || signal.aborted || results.length === 0) return;
    setTestResults({ ...saveBatchTestResults(results) });
  }, []);

  const releaseActiveKey = useCallback((key: string, signal: AbortSignal) => {
    if (!mountedRef.current || signal.aborted) return;
    setActiveItemKey((current) => (current === key ? null : current));
  }, []);

  const withSingleController = useCallback(async (work: (signal: AbortSignal) => Promise<void>) => {
    const controller = new AbortController();
    singleControllersRef.current.add(controller);
    try {
      await work(controller.signal);
    } finally {
      singleControllersRef.current.delete(controller);
    }
  }, []);

  const runComboTest = useCallback(
    async (comboName: string, signal: AbortSignal) => {
      const key = getComboTestKey(comboName);
      setActiveItemKey(key);
      try {
        const res = await fetch("/api/combos/test", {
          method: "POST",
          headers: JSON_HEADERS,
          body: JSON.stringify({ comboName }),
          signal,
        });
        const body = await readJsonBody<ComboTestResponse>(res);
        persist([mapComboResponse(comboName, res, body, Date.now())], signal);
      } catch (failure) {
        persist(
          [mapRequestFailure({ targetType: "combo", comboName }, failure, Date.now())],
          signal
        );
      } finally {
        releaseActiveKey(key, signal);
      }
    },
    [persist, releaseActiveKey]
  );

  const testSingleModel = useCallback(
    (providerId: string, modelId: string) =>
      withSingleController(async (signal) => {
        const key = getModelTestKey(providerId, modelId);
        setActiveItemKey(key);
        try {
          const res = await fetch("/api/models/test", {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify({ providerId, modelId }),
            signal,
          });
          const body = await readJsonBody<SingleModelTestResponse>(res);
          persist([mapSingleModelResponse(providerId, modelId, res, body, Date.now())], signal);
        } catch (failure) {
          persist(
            [mapRequestFailure({ targetType: "model", providerId, modelId }, failure, Date.now())],
            signal
          );
        } finally {
          releaseActiveKey(key, signal);
        }
      }),
    [persist, releaseActiveKey, withSingleController]
  );

  const testSingleCombo = useCallback(
    (comboName: string) => withSingleController((signal) => runComboTest(comboName, signal)),
    [runComboTest, withSingleController]
  );

  const startRun = useCallback((kind: BulkRunKind, total: number) => {
    runControllerRef.current?.abort();
    const controller = new AbortController();
    runControllerRef.current = controller;
    setRunning(true);
    setProgress({ kind, completed: 0, total, cancelled: false });
    return controller;
  }, []);

  /** Only the run that still owns the runner may move the progress bar or end the run. */
  const advanceRun = useCallback((controller: AbortController, count: number) => {
    if (!mountedRef.current || runControllerRef.current !== controller) return;
    setProgress((current) => ({
      ...current,
      completed: Math.min(current.completed + count, current.total),
    }));
  }, []);

  const finishRun = useCallback((controller: AbortController) => {
    if (runControllerRef.current !== controller) return;
    runControllerRef.current = null;
    if (mountedRef.current) setRunning(false);
  }, []);

  const testBulkModels = useCallback(
    async (targets: ModelTestTarget[]) => {
      const unique = dedupeModelTargets(targets);
      if (unique.length === 0) return;
      const controller = startRun("models", unique.length);
      const { signal } = controller;
      try {
        await runWithConcurrency(
          buildModelBatches(unique),
          BULK_CONCURRENCY,
          signal,
          async (batch) => {
            try {
              const res = await fetch("/api/models/test-all", {
                method: "POST",
                headers: JSON_HEADERS,
                body: JSON.stringify({
                  providerId: batch.providerId,
                  modelIds: batch.modelIds,
                  respectRateLimit: true,
                }),
                signal,
              });
              const body = await readJsonBody<BatchModelTestResponse>(res);
              persist(mapBatchResponse(batch, res, body, Date.now()), signal);
            } catch (failure) {
              const testedAt = Date.now();
              persist(
                batch.modelIds.map((modelId) =>
                  mapRequestFailure(
                    { targetType: "model", providerId: batch.providerId, modelId },
                    failure,
                    testedAt
                  )
                ),
                signal
              );
            } finally {
              advanceRun(controller, batch.modelIds.length);
            }
          }
        );
      } finally {
        finishRun(controller);
      }
    },
    [advanceRun, finishRun, persist, startRun]
  );

  const testBulkCombos = useCallback(
    async (targets: ComboTestTarget[]) => {
      const unique = dedupeComboTargets(targets);
      if (unique.length === 0) return;
      const controller = startRun("combos", unique.length);
      try {
        await runWithConcurrency(unique, BULK_CONCURRENCY, controller.signal, async (target) => {
          try {
            // The run's signal, so Cancel also aborts combo tests already in flight.
            await runComboTest(target.comboName, controller.signal);
          } finally {
            advanceRun(controller, 1);
          }
        });
      } finally {
        finishRun(controller);
      }
    },
    [advanceRun, finishRun, runComboTest, startRun]
  );

  const cancelTest = useCallback(() => {
    const controller = runControllerRef.current;
    if (!controller) return;
    runControllerRef.current = null;
    controller.abort();
    setRunning(false);
    setActiveItemKey(null);
    setProgress((current) => ({ ...current, cancelled: true }));
  }, []);

  const clearResults = useCallback(() => {
    clearCatalogTestResults();
    setTestResults({});
  }, []);

  return {
    testResults,
    running,
    activeItemKey,
    progress,
    testSingleModel,
    testSingleCombo,
    testBulkModels,
    testBulkCombos,
    cancelTest,
    clearResults,
  };
}
