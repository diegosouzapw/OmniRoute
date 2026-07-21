"use client";

import { useCallback, useEffect, useState } from "react";

import { getQuotaVisibilityKey } from "./utils";

type QuotaVisibilityMap = Record<string, { hidden?: string[] }>;

type Translate = (key: string, fallback: string) => string;

interface NotifyLike {
  error: (message: string) => void;
}

/**
 * Per-operator quota row visibility (upstream 9router#2371 port). Keyed by
 * provider id → { hidden: [<quota visibility key>] }, persisted server-side
 * via PATCH /api/settings so it survives refresh/reload.
 *
 * Extracted from ProviderLimits/index.tsx to keep the container under the
 * frozen file-size budget — same pattern as useCodexResetCreditRedemption.
 */
export function useQuotaVisibility(tr: Translate, notify: NotifyLike) {
  const [quotaVisibility, setQuotaVisibility] = useState<QuotaVisibilityMap>({});

  // Load persisted per-operator quota row visibility once on mount. Best
  // effort — a fetch failure just leaves every row visible (safe default).
  useEffect(() => {
    let alive = true;
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : {}))
      .then((s: { quotaVisibility?: QuotaVisibilityMap }) => {
        if (alive) setQuotaVisibility(s?.quotaVisibility || {});
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const persistQuotaVisibility = useCallback(
    async (next: QuotaVisibilityMap, previous: QuotaVisibilityMap) => {
      setQuotaVisibility(next);
      try {
        const response = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotaVisibility: next }),
        });
        if (!response.ok) throw new Error("Failed to update quota visibility");
      } catch {
        setQuotaVisibility(previous);
        notify.error(tr("quotaVisibilityUpdateFailed", "Failed to update quota visibility"));
      }
    },
    [notify, tr]
  );

  const toggleQuotaKey = useCallback(
    (provider: string, quotaRow: any, hide: boolean) => {
      const key = getQuotaVisibilityKey(quotaRow);
      if (!provider || !key) return;
      const previous = quotaVisibility;
      const providerVisibility = previous[provider] || {};
      const hidden = new Set(providerVisibility.hidden || []);
      if (hide) hidden.add(key);
      else hidden.delete(key);
      const next = {
        ...previous,
        [provider]: { ...providerVisibility, hidden: [...hidden] },
      };
      persistQuotaVisibility(next, previous);
    },
    [quotaVisibility, persistQuotaVisibility]
  );

  const handleHideQuota = useCallback(
    (provider: string, quotaRow: any) => toggleQuotaKey(provider, quotaRow, true),
    [toggleQuotaKey]
  );

  const handleShowQuota = useCallback(
    (provider: string, quotaRow: any) => toggleQuotaKey(provider, quotaRow, false),
    [toggleQuotaKey]
  );

  return { quotaVisibility, handleHideQuota, handleShowQuota };
}
