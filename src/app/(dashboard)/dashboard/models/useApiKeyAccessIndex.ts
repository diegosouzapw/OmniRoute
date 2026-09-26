"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  applyAssignResult,
  applyOptimisticAccess,
  classifyAssignResponse,
  networkErrorOutcome,
  parseAccessKeysPage,
  type AccessKey,
  type AccessKind,
  type AssignBody,
  type AssignOutcome,
} from "./keyAccessAssignUtils";

export function useApiKeyAccessIndex() {
  const [keys, setKeys] = useState<AccessKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const loadedRef = useRef(false);
  const loadRef = useRef<Promise<void> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);
  const refresh = useCallback((): Promise<void> => {
    if (loadRef.current) return loadRef.current;
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError(false);
    const request = (async () => {
      try {
        const fetched: AccessKey[] = [];
        let offset = 0;
        while (!controller.signal.aborted) {
          const response = await fetch(`/api/keys?limit=100&offset=${offset}`, {
            signal: controller.signal,
          });
          if (!response.ok) throw new Error("Key list request failed");
          const page = parseAccessKeysPage(await response.json());
          fetched.push(...page.keys);
          offset += page.keys.length;
          if (
            page.keys.length === 0 ||
            (page.total !== null ? offset >= page.total : page.keys.length < 100)
          )
            break;
        }
        if (!controller.signal.aborted) {
          setKeys(fetched);
          loadedRef.current = true;
        }
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
        loadRef.current = null;
      }
    })();
    loadRef.current = request;
    return request;
  }, []);
  const ensureLoaded = useCallback(
    () => (loadedRef.current ? Promise.resolve() : refresh()),
    [refresh]
  );

  const assign = useCallback(async (id: string, body: AssignBody): Promise<AssignOutcome> => {
    try {
      const response = await fetch(`/api/keys/${encodeURIComponent(id)}/access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const outcome = classifyAssignResponse(response.status, await response.json());
      if (outcome.result) setKeys((current) => applyAssignResult(current, outcome.result!));
      return outcome;
    } catch {
      return networkErrorOutcome();
    }
  }, []);

  const toggle = useCallback(
    async (key: AccessKey, kind: AccessKind, id: string, allowed: boolean) => {
      setKeys((current) =>
        current.map((entry) =>
          entry.id === key.id ? applyOptimisticAccess(entry, kind, id, allowed) : entry
        )
      );
      const outcome = await assign(key.id, { [allowed ? "add" : "remove"]: { [kind]: [id] } });
      if (!outcome.result)
        setKeys((current) => current.map((entry) => (entry.id === key.id ? key : entry)));
      return outcome;
    },
    [assign]
  );

  return { keys, loading, error, refresh, ensureLoaded, assign, toggle };
}
export type ApiKeyAccessIndex = ReturnType<typeof useApiKeyAccessIndex>;
