"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildModelBatches,
  BULK_CONCURRENCY,
  dedupeComboTargets,
  dedupeModelTargets,
  runWithConcurrency,
  runModelBatches,
  type ComboTestTarget,
  type ModelTestTarget,
} from "./catalogBulkUtils";
import {
  requestComboTest,
  requestSingleModelTest,
  requestModelBatchTest,
} from "./catalogTestRequests";
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

function useCatalogRunnerState() {
  const [testResults, setTestResults] = useState<Record<string, CatalogTestResult>>({});
  const [running, setRunning] = useState(false);
  const [activeItemKeys, setActiveItemKeys] = useState<Set<string>>(new Set());
  const activeSignalsRef = useRef(new Map<string, AbortSignal>());
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

  const claimActiveKey = useCallback((key: string, signal: AbortSignal) => {
    if (activeSignalsRef.current.has(key)) return false;
    activeSignalsRef.current.set(key, signal);
    setActiveItemKeys(new Set(activeSignalsRef.current.keys()));
    return true;
  }, []);

  const releaseActiveKey = useCallback((key: string, signal: AbortSignal) => {
    if (activeSignalsRef.current.get(key) !== signal) return;
    activeSignalsRef.current.delete(key);
    if (mountedRef.current) setActiveItemKeys(new Set(activeSignalsRef.current.keys()));
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

  return {
    testResults,
    setTestResults,
    running,
    setRunning,
    activeItemKeys,
    setActiveItemKeys,
    activeSignalsRef,
    progress,
    setProgress,
    mountedRef,
    runControllerRef,
    singleControllersRef,
    persist,
    claimActiveKey,
    releaseActiveKey,
    withSingleController,
  };
}

function useCatalogRunProgress(state: ReturnType<typeof useCatalogRunnerState>) {
  const {
    runControllerRef,
    setRunning,
    setProgress,
    mountedRef,
    activeSignalsRef,
    setActiveItemKeys,
  } = state;
  const startRun = useCallback(
    (kind: BulkRunKind, total: number) => {
      runControllerRef.current?.abort();
      const controller = new AbortController();
      runControllerRef.current = controller;
      setRunning(true);
      setProgress({ kind, completed: 0, total, cancelled: false });
      return controller;
    },
    [runControllerRef, setProgress, setRunning]
  );

  /** Only the run that still owns the runner may move the progress bar or end the run. */
  const advanceRun = useCallback(
    (controller: AbortController, count: number) => {
      if (!mountedRef.current || runControllerRef.current !== controller) return;
      setProgress((current) => ({
        ...current,
        completed: Math.min(current.completed + count, current.total),
      }));
    },
    [mountedRef, runControllerRef, setProgress]
  );

  const finishRun = useCallback(
    (controller: AbortController) => {
      if (runControllerRef.current !== controller) return;
      runControllerRef.current = null;
      if (mountedRef.current) setRunning(false);
    },
    [mountedRef, runControllerRef, setRunning]
  );

  const cancelTest = useCallback(() => {
    const controller = runControllerRef.current;
    if (!controller) return;
    runControllerRef.current = null;
    controller.abort();
    setRunning(false);
    for (const [key, signal] of activeSignalsRef.current) {
      if (signal === controller.signal) activeSignalsRef.current.delete(key);
    }
    setActiveItemKeys(new Set(activeSignalsRef.current.keys()));
    setProgress((current) => ({ ...current, cancelled: true }));
  }, [activeSignalsRef, runControllerRef, setActiveItemKeys, setProgress, setRunning]);

  return { startRun, advanceRun, finishRun, cancelTest };
}

function useCatalogRowTests(state: ReturnType<typeof useCatalogRunnerState>) {
  const { claimActiveKey, releaseActiveKey, persist, withSingleController } = state;
  const runComboTest = useCallback(
    async (comboName: string, signal: AbortSignal) => {
      const key = getComboTestKey(comboName);
      if (!claimActiveKey(key, signal)) return;
      try {
        persist([await requestComboTest(comboName, signal)], signal);
      } finally {
        releaseActiveKey(key, signal);
      }
    },
    [claimActiveKey, persist, releaseActiveKey]
  );

  const testSingleModel = useCallback(
    (providerId: string, modelId: string) =>
      withSingleController(async (signal) => {
        const key = getModelTestKey(providerId, modelId);
        if (!claimActiveKey(key, signal)) return;
        try {
          persist([await requestSingleModelTest(providerId, modelId, signal)], signal);
        } finally {
          releaseActiveKey(key, signal);
        }
      }),
    [claimActiveKey, persist, releaseActiveKey, withSingleController]
  );

  const testSingleCombo = useCallback(
    (comboName: string) => withSingleController((signal) => runComboTest(comboName, signal)),
    [runComboTest, withSingleController]
  );

  return { runComboTest, testSingleModel, testSingleCombo };
}

export function useCatalogTestRunner() {
  const state = useCatalogRunnerState();
  const { testResults, setTestResults, running, activeItemKeys, progress, persist } = state;
  const { runComboTest, testSingleModel, testSingleCombo } = useCatalogRowTests(state);
  const { startRun, advanceRun, finishRun, cancelTest } = useCatalogRunProgress(state);
  const testBulkModels = useCallback(
    async (targets: ModelTestTarget[]) => {
      const unique = dedupeModelTargets(targets);
      if (unique.length === 0) return;
      const controller = startRun("models", unique.length);
      const { signal } = controller;
      try {
        await runModelBatches(buildModelBatches(unique), signal, async (batch) => {
          try {
            persist(await requestModelBatchTest(batch, signal), signal);
          } finally {
            advanceRun(controller, batch.modelIds.length);
          }
        });
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

  const clearResults = useCallback(() => {
    clearCatalogTestResults();
    setTestResults({});
  }, [setTestResults]);

  return {
    testResults,
    running,
    activeItemKeys,
    progress,
    testSingleModel,
    testSingleCombo,
    testBulkModels,
    testBulkCombos,
    cancelTest,
    clearResults,
  };
}
