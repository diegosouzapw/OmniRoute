"use client";
/**
 * ModelRow — Issue #3501 Phase 1e
 *
 * Extracted from ProviderDetailPageClient.tsx. Contains:
 *   - ModelSourceBadge (tiny utility)
 *   - ModelVisibilityToolbar (filter/test toolbar)
 *   - ModelRow (catalog model row with compat controls)
 *
 * Leaf component: imports from shared, leaf helpers, and sibling components.
 * Never imports from ProviderDetailPageClient.
 */
import React, { useState, useRef, useEffect } from "react";
import {
  getModelCatalogSourceLabel,
  normalizeModelCatalogSource,
} from "@/shared/utils/modelCatalogSearch";
import { providerText } from "../providerPageHelpers";
import ModelCompatPopover from "./ModelCompatPopover";

// ---------------------------------------------------------------------------
// Shared prop types
// ---------------------------------------------------------------------------

/** PATCH fields for provider model compat (matches API + `ModelCompatPerProtocol` shape). */
export type ModelCompatSavePatch = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  upstreamHeaders?: Record<string, string>;
  compatByProtocol?: Record<
    string,
    {
      normalizeToolCallId?: boolean;
      preserveOpenAIDeveloperRole?: boolean;
      upstreamHeaders?: Record<string, string>;
    }
  >;
  isHidden?: boolean;
};

// ---------------------------------------------------------------------------
// ModelSourceBadge
// ---------------------------------------------------------------------------

function getModelSourceBadgeClass(source?: string): string {
  switch (normalizeModelCatalogSource(source)) {
    case "imported":
      return "border-sky-500/30 bg-sky-500/10 text-sky-300";
    case "custom":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "fallback":
      return "border-amber-500/30 bg-amber-500/10 text-amber-300";
    case "alias":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "system":
    default:
      return "border-border bg-sidebar/70 text-text-muted";
  }
}

export function ModelSourceBadge({ source }: { source?: string }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${getModelSourceBadgeClass(
        source
      )}`}
    >
      {getModelCatalogSourceLabel(source)}
    </span>
  );
}

// ---------------------------------------------------------------------------
// ModelVisibilityToolbar
// ---------------------------------------------------------------------------

export interface ModelVisibilityToolbarProps {
  t: ((key: string, values?: Record<string, unknown>) => string) & {
    has?: (key: string) => boolean;
  };
  filterValue: string;
  onFilterChange: (value: string) => void;
  activeCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  selectAllDisabled?: boolean;
  deselectAllDisabled?: boolean;
  onTestAll?: () => void;
  testingAll?: boolean;
  testProgress?: { done: number; total: number } | null;
  visibilityFilter?: "all" | "visible" | "hidden";
  onVisibilityFilterChange?: (filter: "all" | "visible" | "hidden") => void;
  autoHideFailed?: boolean;
  onAutoHideFailedChange?: (v: boolean) => void;
  freeFilter?: "all" | "free" | "paid";
  onFreeFilterChange?: (filter: "all" | "free" | "paid") => void;
  sortFreeFirst?: boolean;
  onSortFreeFirstChange?: (v: boolean) => void;
}

export function ModelVisibilityToolbar({
  t,
  filterValue,
  onFilterChange,
  activeCount: _activeCount,
  totalCount: _totalCount,
  onSelectAll,
  onDeselectAll,
  selectAllDisabled,
  deselectAllDisabled,
  onTestAll,
  testingAll,
  testProgress,
  visibilityFilter,
  onVisibilityFilterChange,
  autoHideFailed,
  onAutoHideFailedChange,
  freeFilter,
  onFreeFilterChange,
  sortFreeFirst,
  onSortFreeFirstChange,
}: ModelVisibilityToolbarProps) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <div className="relative min-w-[220px] flex-1">
        <span className="material-symbols-outlined pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[15px] text-text-muted">
          search
        </span>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder={providerText(t, "filterModels", "Filter models…")}
          className="w-full rounded-lg border border-border bg-sidebar/50 py-1.5 pl-7 pr-3 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      {visibilityFilter !== undefined && onVisibilityFilterChange && (
        <div className="flex items-center gap-1 rounded-lg border border-border bg-sidebar/50 p-0.5">
          {(["all", "visible", "hidden"] as const).map((f) => (
            <button
              key={f}
              onClick={() => onVisibilityFilterChange(f)}
              className={`rounded px-2 py-1 text-xs ${
                visibilityFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {f === "all"
                ? providerText(t, "showAllModels", "All")
                : f === "visible"
                  ? providerText(t, "showVisibleOnly", "Visible")
                  : providerText(t, "showHiddenOnly", "Hidden")}
            </button>
          ))}
        </div>
      )}
      {freeFilter !== undefined && onFreeFilterChange && (
        <div className="flex items-center gap-1 rounded-lg border border-border bg-sidebar/50 p-0.5">
          {(["all", "free", "paid"] as const).map((f) => (
            <button
              key={f}
              onClick={() => onFreeFilterChange(f)}
              className={`rounded px-2 py-1 text-xs ${
                freeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {f === "all"
                ? providerText(t, "freeFilterAll", "All")
                : f === "free"
                  ? providerText(t, "freeFilterFreeOnly", "Free only")
                  : providerText(t, "freeFilterPaidOnly", "Paid only")}
            </button>
          ))}
        </div>
      )}
      {onSortFreeFirstChange && (
        <button
          onClick={() => onSortFreeFirstChange(!sortFreeFirst)}
          aria-pressed={!!sortFreeFirst}
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[12px] ${
            sortFreeFirst
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-transparent text-text-main"
          }`}
          title={providerText(t, "sortFreeFirst", "Free first")}
        >
          <span className="material-symbols-outlined text-[16px]">sort</span>
          <span>{providerText(t, "sortFreeFirst", "Free first")}</span>
        </button>
      )}
      {onAutoHideFailedChange && (
        <label
          className="flex items-center gap-1.5 text-xs text-text-muted"
          title={providerText(
            t,
            "autoHideFailedHint",
            "When enabled, Test all hides non-transient failures from public catalogs such as /v1/models. Single-model tests never auto-hide."
          )}
        >
          <input
            type="checkbox"
            checked={autoHideFailed ?? false}
            onChange={(e) => onAutoHideFailedChange(e.target.checked)}
            className="rounded border-border bg-sidebar"
          />
          {providerText(t, "hideFailedAuto", "Auto-hide failed")}
        </label>
      )}
      {onTestAll && (
        <button
          onClick={onTestAll}
          disabled={testingAll}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50"
          title={providerText(t, "testAllModels", "Test all")}
        >
          <span className="material-symbols-outlined text-[16px]">
            {testingAll ? "progress_activity" : "science"}
          </span>
          <span>
            {testingAll && testProgress
              ? providerText(t, "testingAllModels", "Testing {done}/{total}", testProgress)
              : providerText(t, "testAllModels", "Test all")}
          </span>
        </button>
      )}
      <button
        onClick={onSelectAll}
        disabled={selectAllDisabled}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50"
        title={providerText(t, "showAllModels", "Show all")}
      >
        <span className="material-symbols-outlined text-[16px]">visibility</span>
        <span>{providerText(t, "showAllModels", "Show all")}</span>
      </button>
      <button
        onClick={onDeselectAll}
        disabled={deselectAllDisabled}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50"
        title={providerText(t, "hideAllModels", "Hide all")}
      >
        <span className="material-symbols-outlined text-[16px]">visibility_off</span>
        <span>{providerText(t, "hideAllModels", "Hide all")}</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ModelRow
// ---------------------------------------------------------------------------

export interface ModelRowProps {
  model: { id: string; name?: string; source?: string; isHidden?: boolean };
  fullModel: string;
  provider: string;
  alias?: string;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onSetAlias?: (alias: string) => void;
  onDeleteAlias?: () => void;
  t: (key: string, values?: Record<string, unknown>) => string;
  showDeveloperToggle?: boolean;
  effectiveModelNormalize: (modelId: string, protocol?: string) => boolean;
  effectiveModelPreserveDeveloper: (modelId: string, protocol?: string) => boolean;
  saveModelCompatFlags: (modelId: string, patch: ModelCompatSavePatch) => void;
  getUpstreamHeadersRecord: (protocol: string) => Record<string, string>;
  compatDisabled?: boolean;
  onToggleHidden?: (modelId: string, hidden: boolean) => Promise<void>;
  togglingHidden?: boolean;
  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;
  testStatus?: "ok" | "error" | null;
  testingModel?: boolean;
}

export default function ModelRow({
  model,
  fullModel,
  alias,
  copied,
  onCopy,
  onSetAlias,
  onDeleteAlias,
  t,
  showDeveloperToggle = true,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatDisabled,
  onToggleHidden,
  togglingHidden,
  onTestModel,
  testStatus,
  testingModel,
}: ModelRowProps) {
  const isHidden = Boolean(model.isHidden);
  const [editing, setEditing] = useState(false);
  const [aliasValue, setAliasValue] = useState(alias || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEditing = () => {
    setAliasValue(alias || "");
    setEditing(true);
  };

  const handleAliasSubmit = () => {
    const trimmed = aliasValue.trim();
    if (trimmed && trimmed !== alias) {
      onSetAlias?.(trimmed);
    } else if (!trimmed && alias) {
      onDeleteAlias?.();
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAliasSubmit();
    }
    if (e.key === "Escape") {
      setAliasValue(alias || "");
      setEditing(false);
    }
  };

  return (
    <div
      className={`flex min-w-[220px] max-w-md items-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-sidebar/50 transition-opacity ${
        isHidden ? "opacity-50" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <span
          className="material-symbols-outlined shrink-0 text-base"
          style={{ color: isHidden ? "var(--color-text-muted)" : undefined }}
        >
          smart_toy
        </span>
        <code className="rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted">
          {fullModel}
        </code>
        <ModelSourceBadge source={model.source} />
        {onSetAlias && (
          <span className="flex min-w-0 items-center text-[9px] gap-1">
            {editing ? (
              <input
                ref={inputRef}
                type="text"
                value={aliasValue}
                onChange={(e) => setAliasValue(e.target.value)}
                onBlur={handleAliasSubmit}
                onKeyDown={handleKeyDown}
                placeholder={providerText(t, "aliasInputPlaceholder", "alias name")}
                className="bg-surface border border-primary/50 rounded px-1 py-0.5 text-[9px] text-text-main outline-none w-24"
              />
            ) : (
              <span
                className={`truncate text-[9px] italic cursor-pointer hover:text-primary transition-colors ${alias ? "text-primary/80" : "text-text-muted/70"}`}
                onClick={startEditing}
                title={
                  alias
                    ? providerText(t, "clickToEditAlias", "Alias: {alias} (click to edit)", {
                        alias,
                      })
                    : providerText(t, "clickToSetAlias", "Click to set alias")
                }
              >
                {alias || model.name || providerText(t, "clickToSetAlias", "Click to set alias")}
              </span>
            )}
          </span>
        )}
        <button
          onClick={() => onCopy(fullModel, `model-${model.id}`)}
          className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary"
          title={t("copyModel")}
        >
          <span className="material-symbols-outlined text-sm">
            {copied === `model-${model.id}` ? "check" : "content_copy"}
          </span>
        </button>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {onTestModel && (
          <button
            onClick={() => onTestModel(model.id, fullModel)}
            disabled={testingModel}
            className={`rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${testStatus === "ok" ? "text-green-500" : testStatus === "error" ? "text-red-500" : "text-text-muted hover:text-primary"}`}
            title={
              testingModel
                ? t("testingModel")
                : testStatus === "ok"
                  ? "OK"
                  : testStatus === "error"
                    ? "Error"
                    : t("testModel")
            }
          >
            {testingModel ? (
              <span className="material-symbols-outlined text-sm animate-spin">
                progress_activity
              </span>
            ) : testStatus === "ok" ? (
              <span className="material-symbols-outlined text-sm">check_circle</span>
            ) : testStatus === "error" ? (
              <span className="material-symbols-outlined text-sm">error</span>
            ) : (
              <span className="material-symbols-outlined text-sm">play_circle</span>
            )}
          </button>
        )}
        {onToggleHidden && (
          <button
            onClick={() => onToggleHidden(model.id, !isHidden)}
            disabled={togglingHidden}
            className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"
            title={
              isHidden
                ? providerText(t, "showModel", "Show model")
                : providerText(t, "hideModel", "Hide model")
            }
          >
            <span className="material-symbols-outlined text-sm">
              {isHidden ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
        <ModelCompatPopover
          t={t}
          effectiveModelNormalize={(p) => effectiveModelNormalize(model.id, p)}
          effectiveModelPreserveDeveloper={(p) => effectiveModelPreserveDeveloper(model.id, p)}
          getUpstreamHeadersRecord={getUpstreamHeadersRecord}
          onCompatPatch={(protocol, payload) =>
            saveModelCompatFlags(model.id, { compatByProtocol: { [protocol]: payload } })
          }
          showDeveloperToggle={showDeveloperToggle}
          disabled={compatDisabled}
        />
      </div>
    </div>
  );
}
