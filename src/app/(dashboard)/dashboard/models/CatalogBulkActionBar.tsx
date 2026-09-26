"use client";

import { Button } from "@/shared/components";
import type { ProgressState } from "./useCatalogTestRunner";

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
  entityLabel: _entityLabel = "models",
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
  entityLabel?: "models" | "combos";
}) {
  const percent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-black/[0.01] px-4 py-2.5 dark:bg-white/[0.01]">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={selectedCount === 0 || running}
          onClick={onTestSelected}
          data-testid="test-selected-btn"
        >
          {`Test selected (${selectedCount})`}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={filteredCount === 0 || running}
          onClick={onTestFiltered}
          data-testid="test-all-filtered-btn"
        >
          {`Test all filtered (${filteredCount})`}
        </Button>

        {running && (
          <Button variant="danger" size="sm" onClick={onCancel} data-testid="cancel-tests-btn">
            Cancel
          </Button>
        )}

        {hasTestResults && !running && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearResults}
            data-testid="clear-test-results-btn"
          >
            Clear results
          </Button>
        )}
      </div>

      {running && (
        <div className="flex items-center gap-3">
          <div className="w-32 overflow-hidden rounded-full bg-black/10 h-2 dark:bg-white/10 sm:w-48">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${percent}%` }}
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className="text-xs font-medium text-text-muted">
            {progress.message || `${percent}%`}
          </span>
        </div>
      )}
    </div>
  );
}
