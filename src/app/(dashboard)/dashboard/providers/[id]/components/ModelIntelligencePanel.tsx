"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { matchesSearch } from "@/shared/utils/turkishText";
import type { ProviderModelIntelligence } from "@/app/api/provider-intelligence/route";

interface ModelIntelligencePanelProps {
  providerId: string;
  providerName: string;
  onClose: () => void;
}

type FetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: ProviderModelIntelligence[] };

export default function ModelIntelligencePanel({
  providerId,
  providerName,
  onClose,
}: ModelIntelligencePanelProps) {
  const [fetchState, setFetchState] = useState<FetchState>({ status: "loading" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [freeOnly, setFreeOnly] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setFetchState({ status: "loading" });
    try {
      const res = await fetch(
        `/api/provider-intelligence?provider=${encodeURIComponent(providerId)}`
      );
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const payload: ProviderModelIntelligence[] = await res.json();
      setFetchState({ status: "success", data: payload });
      setSelected(new Set(payload.map((m) => m.modelId)));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setFetchState({ status: "error", message });
    }
  }, [providerId]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await fetchData();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchData]);

  const data = useMemo(
    () => (fetchState.status === "success" ? fetchState.data : []),
    [fetchState]
  );

  const visibleModels = useMemo(() => {
    return data.filter((m) => {
      if (!selected.has(m.modelId)) return false;
      if (freeOnly && !m.isFree) return false;
      if (search) {
        if (!matchesSearch(m.modelId, search) && !matchesSearch(m.modelName, search)) {
          return false;
        }
      }
      return true;
    });
  }, [data, selected, freeOnly, search]);

  const handleToggleModel = (modelId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(modelId)) next.delete(modelId);
      else next.add(modelId);
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelected(new Set(data.map((m) => m.modelId)));
  };

  if (fetchState.status === "loading") {
    return (
      <div className="absolute inset-0 z-20 flex flex-col bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-main">
            Model Intelligence — {providerName}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded p-1 text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-2xl text-text-muted">
            progress_activity
          </span>
          <span className="ml-2 text-sm text-text-muted">Loading intelligence scores…</span>
        </div>
      </div>
    );
  }

  if (fetchState.status === "error") {
    return (
      <div className="absolute inset-0 z-20 flex flex-col bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-main">
            Model Intelligence — {providerName}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded p-1 text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <p className="text-sm text-red-500">Failed to load intelligence scores.</p>
          <p className="text-xs text-text-muted">{fetchState.message}</p>
          <button
            type="button"
            onClick={fetchData}
            className="rounded-lg border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-text-main hover:bg-black/5 dark:hover:bg-white/5"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-20 flex flex-col overflow-hidden bg-surface border border-border rounded-lg">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-sidebar/30 px-3 py-2">
        <h3 className="text-sm font-semibold text-text-main">
          Model Intelligence — {providerName}
        </h3>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="rounded-lg border border-border bg-transparent px-2.5 py-1 text-xs font-medium text-text-main hover:bg-black/5 dark:hover:bg-white/5"
          >
            Select All
          </button>
          <label className="flex items-center gap-1.5 text-xs text-text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-border accent-[var(--color-accent)]"
            />
            Free-only
          </label>
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[14px] text-text-muted">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search models…"
              className="w-40 rounded-lg border border-border bg-sidebar/50 py-1 pl-7 pr-2 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded p-1 text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex-1 overflow-auto p-3">
        {visibleModels.length === 0 ? (
          <p className="py-8 text-center text-sm text-text-muted">
            {data.length === 0
              ? "No intelligence scores available for this provider."
              : "No models match the active filters."}
          </p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {visibleModels.map((model) => (
              <div key={model.modelId} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.has(model.modelId)}
                  onChange={() => handleToggleModel(model.modelId)}
                  aria-label={`Toggle ${model.modelId}`}
                  className="h-3.5 w-3.5 shrink-0 rounded border-border accent-[var(--color-accent)]"
                />
                <div
                  className="flex flex-1 items-center gap-2 overflow-hidden"
                  title={`${model.modelId} \u00B7 Intelligence: ${model.score.toFixed(3)} \u00B7 ELO: ${model.eloRaw ?? "—"}`}
                >
                  <span className="min-w-0 flex-1 truncate text-xs text-text-main">
                    {model.modelId}
                  </span>
                  <div className="h-5 w-40 shrink-0 overflow-hidden rounded bg-black/5 dark:bg-white/5">
                    <div
                      className="h-full rounded transition-all"
                      style={{
                        width: `${Math.round(model.score * 100)}%`,
                        background: `linear-gradient(90deg, #3b82f6, #22c55e)`,
                        opacity: model.score > 0 ? 1 : 0,
                      }}
                    />
                  </div>
                  <span className="w-12 shrink-0 text-right text-xs tabular-nums text-text-muted">
                    {model.score > 0 ? model.score.toFixed(3) : "No data"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
