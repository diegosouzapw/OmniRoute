"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import type { ProgressState } from "./useCatalogTestRunner";

/** The run's progress bar while it runs, then the cancelled notice when it was stopped. */
function CatalogBulkProgress({ running, progress }: { running: boolean; progress: ProgressState }) {
  const t = useTranslations("modelCatalog");
  const percent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const counts = { completed: progress.completed, total: progress.total };
  const progressText =
    progress.kind === "combos"
      ? t("testingProgressCombos", counts)
      : t("testingProgressModels", counts);
  const cancelledText =
    progress.kind === "combos"
      ? t("testsCancelledCombos", counts)
      : t("testsCancelledModels", counts);

  if (running) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-2 w-32 overflow-hidden rounded-full bg-black/10 dark:bg-white/10 sm:w-48">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-label={t("bulkTestProgress")}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={progressText}
          />
        </div>
        <span className="text-xs font-medium text-text-muted" aria-hidden="true">
          {progressText}
        </span>
      </div>
    );
  }
  return progress.cancelled ? (
    <p role="status" className="text-xs font-medium text-text-muted">
      {cancelledText}
    </p>
  ) : null;
}

export default function CatalogBulkActionBar({
  selectedCount,
  filteredCount,
  running,
  progress,
  hasTestResults,
  onTestSelected,
  onTestFiltered,
  onCancel,
  onClearResults,
  onAssign,
}: {
  selectedCount: number;
  filteredCount: number;
  running: boolean;
  progress: ProgressState;
  hasTestResults: boolean;
  onTestSelected: () => void;
  onTestFiltered: () => void;
  onCancel: () => void;
  onClearResults: () => void;
  onAssign?: () => void;
}) {
  const t = useTranslations("modelCatalog");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-black/[0.01] px-4 py-2.5 dark:bg-white/[0.01]">
      <div className="flex flex-wrap items-center gap-2">
        {onAssign && (
          <Button
            variant="secondary"
            size="sm"
            data-testid="assign-keys-btn"
            disabled={selectedCount === 0 || running}
            onClick={onAssign}
          >
            {t("assignToKeys")}
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          disabled={selectedCount === 0 || running}
          onClick={onTestSelected}
          data-testid="test-selected-btn"
        >
          {t("testSelected", { count: selectedCount })}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={filteredCount === 0 || running}
          onClick={onTestFiltered}
          data-testid="test-all-filtered-btn"
        >
          {t("testAllFiltered", { count: filteredCount })}
        </Button>

        {running && (
          <Button variant="danger" size="sm" onClick={onCancel} data-testid="cancel-tests-btn">
            {t("cancel")}
          </Button>
        )}

        {hasTestResults && !running && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearResults}
            data-testid="clear-test-results-btn"
          >
            {t("clearResults")}
          </Button>
        )}
      </div>

      <CatalogBulkProgress running={running} progress={progress} />
    </div>
  );
}
