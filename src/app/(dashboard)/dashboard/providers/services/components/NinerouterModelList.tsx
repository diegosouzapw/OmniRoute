/**
 * G-09 — Model list for 9Router.
 * Fetches GET /api/services/9router/models (with optional ?refresh=true).
 * Displays a paginated list (20 per page, client-side) with a "Refresh now" button.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card, Button } from "@/shared/components";

const NAME = "9router";
const PAGE_SIZE = 20;

interface ServiceModel {
  id: string;
  name?: string;
  available?: boolean;
}

// ── Exported helper (for unit tests) ─────────────────────────────────────────

/**
 * Returns the slice of models for a given page (1-indexed).
 */
export function paginateModels(
  models: ServiceModel[],
  page: number,
  pageSize: number
): ServiceModel[] {
  const start = (page - 1) * pageSize;
  return models.slice(start, start + pageSize);
}

// ── Component ─────────────────────────────────────────────────────────────────

export function NinerouterModelList() {
  const t = useTranslations("embeddedServices");
  const [models, setModels] = useState<ServiceModel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = useCallback(
    async (refresh = false) => {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      try {
        const url = `/api/services/${NAME}/models${refresh ? "?refresh=true" : ""}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();
        const data: ServiceModel[] = Array.isArray(body?.data) ? body.data : [];
        setModels(data);
        setPage(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("modelsLoadFailed"));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [t]
  );

  useEffect(() => {
    void fetchModels(false);
  }, [fetchModels]);

  const totalPages = Math.max(1, Math.ceil(models.length / PAGE_SIZE));
  const visibleModels = paginateModels(models, page, PAGE_SIZE);

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center bg-cyan-500/10">
            <span className="material-symbols-outlined text-cyan-500 text-xl">list</span>
          </div>
          <div>
            <h3 className="font-medium text-sm">{t("availableModels")}</h3>
            <p className="text-xs text-text-muted">
              {loading ? t("modelsLoading") : t("modelsDiscovered", { count: models.length })}
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => fetchModels(true)}
          disabled={loading || refreshing}
          className="shrink-0"
        >
          {refreshing ? (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined animate-spin text-[12px]">
                progress_activity
              </span>
              {t("refreshing")}
            </span>
          ) : (
            t("refreshNow")
          )}
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded text-xs bg-red-500/10 text-red-600 dark:text-red-400">
          <span className="material-symbols-outlined text-[12px]">error</span>
          {error}
        </div>
      )}

      {!loading && models.length === 0 && !error && (
        <p className="text-xs text-text-muted text-center py-4">{t("noModels")}</p>
      )}

      {visibleModels.length > 0 && (
        <div className="space-y-1">
          {visibleModels.map((model) => (
            <div
              key={model.id}
              className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-bg-subtle transition-colors"
            >
              <code className="text-xs font-mono text-text truncate">{model.id}</code>
              {model.available === false && (
                <span className="ml-2 text-[10px] font-medium text-text-muted bg-bg-subtle px-1.5 py-0.5 rounded shrink-0">
                  {t("unavailable")}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
          <span className="text-xs text-text-muted">
            {t("pageOf", { page, total: totalPages })}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-2 py-1 text-xs rounded border border-border disabled:opacity-40 hover:bg-bg-subtle transition-colors"
            >
              {t("previous")}
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-2 py-1 text-xs rounded border border-border disabled:opacity-40 hover:bg-bg-subtle transition-colors"
            >
              {t("next")}
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
