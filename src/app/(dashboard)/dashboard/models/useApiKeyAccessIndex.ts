"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  applyAssignResult,
  applyOptimisticAccess,
  classifyAssignResponse,
  networkErrorOutcome,
  parseAccessKeysPage,
  planKeyAssignment,
  revertOptimisticAccess,
  type AccessKey,
  type AccessKind,
  type AssignBody,
  type AssignOutcome,
} from "./keyAccessAssignUtils";

const PAGE_LIMIT = 100;

function useAccessKeyToggle({
  assign,
  setKeys,
  setPendingKeys,
  pendingKeysRef,
}: {
  assign: (id: string, body: AssignBody) => Promise<AssignOutcome>;
  setKeys: React.Dispatch<React.SetStateAction<AccessKey[]>>;
  setPendingKeys: React.Dispatch<React.SetStateAction<ReadonlySet<string>>>;
  pendingKeysRef: React.RefObject<Set<string>>;
}) {
  const setPending = useCallback(
    (id: string, pending: boolean) => {
      if (pending) pendingKeysRef.current.add(id);
      else pendingKeysRef.current.delete(id);
      setPendingKeys(new Set(pendingKeysRef.current));
    },
    [pendingKeysRef, setPendingKeys]
  );

  const toggle = useCallback(
    async (key: AccessKey, kind: AccessKind, id: string, allowed: boolean) => {
      if (pendingKeysRef.current.has(key.id)) {
        return { status: "skipped", reason: "pending" } as AssignOutcome;
      }
      const plan = planKeyAssignment({
        key,
        kind,
        action: allowed ? "add" : "remove",
        items: [id],
        switchOptIn: false,
      });
      if (plan.type === "skip") {
        return {
          status: plan.reason === "would_empty" ? "would_empty" : "skipped",
        } as AssignOutcome;
      }
      setPending(key.id, true);
      setKeys((current) =>
        current.map((entry) =>
          entry.id === key.id ? applyOptimisticAccess(entry, kind, id, allowed) : entry
        )
      );
      const outcome = await assign(key.id, plan.body);
      if (!outcome.result) {
        // Undo only this toggle; anything written since (a dialog run, a refresh) stays.
        setKeys((current) =>
          current.map((entry) =>
            entry.id === key.id ? revertOptimisticAccess(entry, key, kind, id, allowed) : entry
          )
        );
      }
      setPending(key.id, false);
      return outcome;
    },
    [assign, setPending, pendingKeysRef, setKeys]
  );

  return toggle;
}
export function useApiKeyAccessIndex() {
  const [keys, setKeys] = useState<AccessKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pendingKeys, setPendingKeys] = useState<ReadonlySet<string>>(new Set());
  // When the key list was loaded: the reference time for expiry, kept out of render.
  const [checkedAt, setCheckedAt] = useState(0);
  const loadedRef = useRef(false);
  const loadRef = useRef<Promise<void> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const pendingKeysRef = useRef(new Set<string>());

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
          const response = await fetch(`/api/keys?limit=${PAGE_LIMIT}&offset=${offset}`, {
            signal: controller.signal,
          });
          if (!response.ok) throw new Error("Key list request failed");
          const page = parseAccessKeysPage(await response.json());
          fetched.push(...page.keys);
          // Page by the rows the server returned, so a skipped malformed row cannot repeat a page.
          offset += page.rawCount;
          if (
            page.rawCount === 0 ||
            (page.total !== null ? offset >= page.total : page.rawCount < PAGE_LIMIT)
          )
            break;
        }
        if (!controller.signal.aborted) {
          setKeys(fetched);
          setCheckedAt(Date.now());
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

  const toggle = useAccessKeyToggle({ assign, setKeys, setPendingKeys, pendingKeysRef });
  return { keys, checkedAt, loading, error, pendingKeys, refresh, ensureLoaded, assign, toggle };
}
export type ApiKeyAccessIndex = ReturnType<typeof useApiKeyAccessIndex>;
