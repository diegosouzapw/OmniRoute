"use client";

import { useCallback, useRef, useState } from "react";
import {
  classifyError,
  clearCatalogTestResults,
  getComboTestKey,
  getModelTestKey,
  loadCatalogTestResults,
  normalizeTestStatus,
  saveBatchTestResults,
  saveSingleTestResult,
  type CatalogTestResult,
} from "./catalogTestStorage";

interface SingleModelTestResponse {
  status?: string;
  latencyMs?: number;
  error?: string;
  statusCode?: number;
  rateLimited?: boolean;
}

interface BatchModelTestResponse {
  results?: Record<
    string,
    {
      status: string;
      latencyMs: number;
      error?: string;
      statusCode?: number;
      rateLimited?: boolean;
      isQuota?: boolean;
      isTimeout?: boolean;
    }
  >;
}

interface ComboTestTargetResult {
  model: string;
  provider?: string;
  status?: string;
  latencyMs?: number;
  error?: string;
  statusCode?: number;
}

interface ComboTestResponse {
  comboName?: string;
  resolvedBy?: string | null;
  results?: ComboTestTargetResult[];
  error?: string;
}

export interface ProgressState {
  completed: number;
  total: number;
  message: string;
}

async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  signal: AbortSignal,
  worker: (item: T) => Promise<void>
): Promise<void> {
  let index = 0;
  const executing = new Set<Promise<void>>();

  while (index < items.length && !signal.aborted) {
    while (executing.size < limit && index < items.length && !signal.aborted) {
      const item = items[index++];
      const task: Promise<void> = (async () => {
        try {
          if (!signal.aborted) {
            await worker(item);
          }
        } finally {
          executing.delete(task);
        }
      })();
      executing.add(task);
    }
    if (executing.size > 0) {
      await Promise.race(executing);
    }
  }
  await Promise.all(executing);
}

export function useCatalogTestRunner() {
  const [testResults, setTestResults] = useState<Record<string, CatalogTestResult>>(() =>
    loadCatalogTestResults()
  );
  const [running, setRunning] = useState(false);
  const [activeItemKey, setActiveItemKey] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressState>({
    completed: 0,
    total: 0,
    message: "",
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelTest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setRunning(false);
    setActiveItemKey(null);
    setProgress((prev) => ({
      ...prev,
      message: "Cancelled",
    }));
  }, []);

  const testSingleModel = useCallback(
    async (providerId: string, modelId: string): Promise<CatalogTestResult> => {
      const key = getModelTestKey(providerId, modelId);
      setActiveItemKey(key);

      const controller = new AbortController();
      try {
        const res = await fetch("/api/models/test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ providerId, modelId }),
          signal: controller.signal,
        });

        const data: unknown = await res.json().catch(() => null);
        const json = (
          typeof data === "object" && data !== null ? data : {}
        ) as SingleModelTestResponse;

        const status = normalizeTestStatus(
          typeof json.status === "string" ? json.status : res.ok ? "ok" : "error",
          typeof json.latencyMs === "number" ? json.latencyMs : undefined
        );

        const errorClass = classifyError(
          json.error,
          typeof json.statusCode === "number" ? json.statusCode : res.status,
          { rateLimited: json.rateLimited }
        );

        const result: CatalogTestResult = {
          id: key,
          targetType: "model",
          providerId,
          modelId,
          status,
          latencyMs: json.latencyMs,
          testedAt: Date.now(),
          error: json.error,
          errorClass,
          statusCode: json.statusCode ?? res.status,
        };

        const updated = saveSingleTestResult(result);
        setTestResults({ ...updated });
        return result;
      } catch (err) {
        const errorText = err instanceof Error ? err.message : String(err);
        const result: CatalogTestResult = {
          id: key,
          targetType: "model",
          providerId,
          modelId,
          status: "error",
          testedAt: Date.now(),
          error: errorText,
          errorClass: classifyError(errorText),
        };
        const updated = saveSingleTestResult(result);
        setTestResults({ ...updated });
        return result;
      } finally {
        setActiveItemKey((current) => (current === key ? null : current));
      }
    },
    []
  );

  const testSingleCombo = useCallback(async (comboName: string): Promise<CatalogTestResult> => {
    const key = getComboTestKey(comboName);
    setActiveItemKey(key);

    const controller = new AbortController();
    try {
      const res = await fetch("/api/combos/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comboName }),
        signal: controller.signal,
      });

      const data: unknown = await res.json().catch(() => null);
      const json = (typeof data === "object" && data !== null ? data : {}) as ComboTestResponse;

      const okResult = json.results?.find((r) => r.status === "ok");
      const status =
        res.ok && (json.resolvedBy || okResult)
          ? normalizeTestStatus("ok", okResult?.latencyMs)
          : "error";

      const lastError =
        json.results?.find((r) => r.error)?.error ||
        json.error ||
        (status === "error" ? "Combo test failed" : undefined);
      const latencyMs = okResult?.latencyMs ?? json.results?.[0]?.latencyMs;
      const statusCode = okResult?.statusCode ?? json.results?.[0]?.statusCode ?? res.status;

      const result: CatalogTestResult = {
        id: key,
        targetType: "combo",
        comboName,
        status,
        latencyMs,
        testedAt: Date.now(),
        error: lastError,
        errorClass: classifyError(lastError, statusCode),
        statusCode,
      };

      const updated = saveSingleTestResult(result);
      setTestResults({ ...updated });
      return result;
    } catch (err) {
      const errorText = err instanceof Error ? err.message : String(err);
      const result: CatalogTestResult = {
        id: key,
        targetType: "combo",
        comboName,
        status: "error",
        testedAt: Date.now(),
        error: errorText,
        errorClass: classifyError(errorText),
      };
      const updated = saveSingleTestResult(result);
      setTestResults({ ...updated });
      return result;
    } finally {
      setActiveItemKey((current) => (current === key ? null : current));
    }
  }, []);

  const testBulkModels = useCallback(
    async (models: Array<{ providerId: string; modelId: string }>) => {
      if (models.length === 0) return;

      const controller = new AbortController();
      abortControllerRef.current = controller;
      setRunning(true);

      const byProvider = new Map<string, string[]>();
      for (const m of models) {
        const list = byProvider.get(m.providerId) || [];
        list.push(m.modelId);
        byProvider.set(m.providerId, list);
      }

      const batches: Array<{ providerId: string; modelIds: string[] }> = [];
      for (const [providerId, modelIds] of byProvider.entries()) {
        for (let i = 0; i < modelIds.length; i += 100) {
          batches.push({ providerId, modelIds: modelIds.slice(i, i + 100) });
        }
      }

      const totalModels = models.length;
      let completedCount = 0;
      setProgress({
        completed: 0,
        total: totalModels,
        message: `Testing 0 of ${totalModels} models...`,
      });

      try {
        await runWithConcurrency(batches, 2, controller.signal, async (batch) => {
          if (controller.signal.aborted) return;

          try {
            const res = await fetch("/api/models/test-all", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                providerId: batch.providerId,
                modelIds: batch.modelIds,
                respectRateLimit: true,
              }),
              signal: controller.signal,
            });

            const data: unknown = await res.json().catch(() => null);
            const json = (
              typeof data === "object" && data !== null ? data : {}
            ) as BatchModelTestResponse;

            const mappedResults: CatalogTestResult[] = [];
            const resultsRecord = json.results ?? {};

            for (const modelId of batch.modelIds) {
              const entry = resultsRecord[modelId];
              if (entry) {
                mappedResults.push({
                  id: getModelTestKey(batch.providerId, modelId),
                  targetType: "model",
                  providerId: batch.providerId,
                  modelId,
                  status: normalizeTestStatus(entry.status, entry.latencyMs),
                  latencyMs: entry.latencyMs,
                  testedAt: Date.now(),
                  error: entry.error,
                  errorClass: classifyError(entry.error, entry.statusCode, {
                    rateLimited: entry.rateLimited,
                    isQuota: entry.isQuota,
                    isTimeout: entry.isTimeout,
                  }),
                  statusCode: entry.statusCode,
                });
              } else {
                mappedResults.push({
                  id: getModelTestKey(batch.providerId, modelId),
                  targetType: "model",
                  providerId: batch.providerId,
                  modelId,
                  status: "error",
                  testedAt: Date.now(),
                  error: res.ok ? "No test result reported" : `HTTP ${res.status}`,
                  errorClass: classifyError(undefined, res.status),
                  statusCode: res.status,
                });
              }
            }

            const updated = saveBatchTestResults(mappedResults);
            setTestResults({ ...updated });
          } catch (batchErr) {
            if (!controller.signal.aborted) {
              const errText = batchErr instanceof Error ? batchErr.message : String(batchErr);
              const failedResults = batch.modelIds.map((modelId) => ({
                id: getModelTestKey(batch.providerId, modelId),
                targetType: "model" as const,
                providerId: batch.providerId,
                modelId,
                status: "error" as const,
                testedAt: Date.now(),
                error: errText,
                errorClass: classifyError(errText),
              }));
              const updated = saveBatchTestResults(failedResults);
              setTestResults({ ...updated });
            }
          } finally {
            completedCount += batch.modelIds.length;
            setProgress({
              completed: Math.min(completedCount, totalModels),
              total: totalModels,
              message: `Testing ${Math.min(completedCount, totalModels)} of ${totalModels} models...`,
            });
          }
        });
      } finally {
        setRunning(false);
        abortControllerRef.current = null;
      }
    },
    []
  );

  const testBulkCombos = useCallback(
    async (combos: Array<{ comboName: string }>) => {
      if (combos.length === 0) return;

      const controller = new AbortController();
      abortControllerRef.current = controller;
      setRunning(true);

      const totalCombos = combos.length;
      let completedCount = 0;
      setProgress({
        completed: 0,
        total: totalCombos,
        message: `Testing 0 of ${totalCombos} combos...`,
      });

      try {
        await runWithConcurrency(combos, 2, controller.signal, async (item) => {
          if (controller.signal.aborted) return;

          try {
            await testSingleCombo(item.comboName);
          } finally {
            completedCount += 1;
            setProgress({
              completed: Math.min(completedCount, totalCombos),
              total: totalCombos,
              message: `Testing ${Math.min(completedCount, totalCombos)} of ${totalCombos} combos...`,
            });
          }
        });
      } finally {
        setRunning(false);
        abortControllerRef.current = null;
      }
    },
    [testSingleCombo]
  );

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
