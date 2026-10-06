"use client";
/**
 * PassthroughModelRow — Issue #3501 Phase 1e
 *
 * Extracted from ProviderDetailPageClient.tsx. Renders one row in the
 * passthrough / compatible models list.
 *
 * Leaf component: imports from shared, leaf helpers, and sibling components.
 * Never imports from ProviderDetailPageClient.
 */
import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/shared/components";
import { parseContextWindowOverrideInput, providerText } from "../providerPageHelpers";
import ModelCompatPopover from "./ModelCompatPopover";
import { ModelSourceBadge, type ModelCompatSavePatch } from "./ModelRow";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PassthroughModelRowProps {
  modelId: string;
  fullModel: string;
  provider: string;
  alias?: string | null;
  // Upstream-provided friendly name (`name` in the /models payload). Gateways that
  // expose opaque model ids (GUID-style presets) still send a readable name — show it
  // instead of "Click to set alias" so the list is not a wall of hex.
  displayName?: string | null;
  source?: string;
  isFree?: boolean;
  isHidden?: boolean;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onDeleteAlias?: () => void;
  onSetAlias?: (alias: string) => void;
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
  testStatus?: "ok" | "error" | "quota" | null;
  testingModel?: boolean;
  // #14337: synced/imported rows had no edit affordance at all, so the manual
  // context-window override that #4125 added for custom models — and that the
  // PUT compatOnly branch has always accepted for these rows — was unreachable
  // from the UI. Absent handler keeps the row exactly as it was.
  contextWindowOverride?: number | null;
  onSaveContextWindowOverride?: (modelId: string, value: number | null) => Promise<void>;
  savingContextOverride?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PassthroughModelRow({
  modelId,
  fullModel,
  alias,
  displayName,
  source,
  isFree,
  isHidden,
  copied,
  onCopy,
  onDeleteAlias,
  onSetAlias,
  t,
  showDeveloperToggle = true,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  provider,
  compatDisabled,
  onToggleHidden,
  togglingHidden,
  onTestModel,
  testStatus,
  testingModel,
  contextWindowOverride,
  onSaveContextWindowOverride,
  savingContextOverride,
}: PassthroughModelRowProps) {
  const [editing, setEditing] = useState(false);
  const [aliasValue, setAliasValue] = useState(alias || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingContext, setEditingContext] = useState(false);
  const [contextValue, setContextValue] = useState("");
  const contextInputRef = useRef<HTMLInputElement>(null);

  // Only useful when it actually differs from the id — otherwise we would just print
  // the opaque id twice.
  const upstreamName =
    displayName && displayName !== modelId && displayName !== fullModel ? displayName : null;

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    if (editingContext && contextInputRef.current) {
      contextInputRef.current.focus();
      contextInputRef.current.select();
    }
  }, [editingContext]);

  const startEditing = () => {
    setAliasValue(alias || "");
    setEditing(true);
  };

  const startEditingContext = () => {
    setContextValue(typeof contextWindowOverride === "number" ? String(contextWindowOverride) : "");
    setEditingContext(true);
  };

  const submitContextOverride = async () => {
    if (!onSaveContextWindowOverride) return;
    const parsed = parseContextWindowOverrideInput(contextValue);
    // Invalid input keeps the editor open rather than silently discarding the
    // value or writing a wrong one; the section surfaces the message.
    if (parsed.invalid) {
      await onSaveContextWindowOverride(modelId, Number.NaN);
      return;
    }
    await onSaveContextWindowOverride(modelId, parsed.value);
    setEditingContext(false);
  };

  const handleContextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void submitContextOverride();
    }
    if (e.key === "Escape") {
      setEditingContext(false);
    }
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
      className={`flex min-w-0 flex-col gap-2 rounded-lg border border-border px-3.5 py-3 transition-opacity hover:bg-sidebar/50 ${
        isHidden ? "opacity-50" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="material-symbols-outlined shrink-0 text-base text-text-muted"
          style={{ color: isHidden ? "var(--color-text-muted)" : undefined }}
        >
          smart_toy
        </span>
        <code
          className="min-w-0 truncate rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted"
          title={fullModel}
        >
          {fullModel}
        </code>
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
                    : upstreamName
                      ? `${upstreamName} — ${providerText(t, "clickToSetAlias", "Click to set alias")}`
                      : providerText(t, "clickToSetAlias", "Click to set alias")
                }
              >
                {alias || upstreamName || providerText(t, "clickToSetAlias", "Click to set alias")}
              </span>
            )}
          </span>
        )}
      </div>
      <div className="flex min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <ModelSourceBadge source={source} />
          {isFree && (
            <Badge variant="success" className="shrink-0 px-1.5 py-0 text-[10px]">
              {providerText(t, "freeBadge", "Free")}
            </Badge>
          )}
          {/* #14337: the same 🪟 badge custom rows carry, so an override set here
              is visible after reload instead of being write-only. */}
          {typeof contextWindowOverride === "number" && !editingContext && (
            <span
              className="shrink-0 rounded-full bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-medium text-orange-400"
              title={t("contextWindowOverrideHint")}
            >
              {`🪟 ${contextWindowOverride.toLocaleString()}`}
            </span>
          )}
          {editingContext && (
            <span className="flex items-center gap-1">
              <input
                ref={contextInputRef}
                type="text"
                inputMode="numeric"
                value={contextValue}
                onChange={(e) => setContextValue(e.target.value)}
                onKeyDown={handleContextKeyDown}
                disabled={savingContextOverride}
                placeholder={t("contextWindowOverridePlaceholder")}
                title={t("contextWindowOverrideHint")}
                aria-label={t("contextWindowOverrideLabel")}
                className="w-28 rounded border border-border bg-background px-1.5 py-0.5 text-[11px]"
              />
              <button
                onClick={() => void submitContextOverride()}
                disabled={savingContextOverride}
                className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-40"
                title={providerText(t, "save", "Save")}
              >
                <span className="material-symbols-outlined text-sm">check</span>
              </button>
              <button
                onClick={() => setEditingContext(false)}
                disabled={savingContextOverride}
                className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-40"
                title={providerText(t, "cancel", "Cancel")}
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {/* #14337: the affordance itself. Rendered only when the section
              supplies a handler, so rows that cannot take an override are
              unchanged. */}
          {onSaveContextWindowOverride && !editingContext && (
            <button
              onClick={startEditingContext}
              className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary"
              title={t("contextWindowOverrideLabel")}
              aria-label={t("contextWindowOverrideLabel")}
            >
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          )}
          <button
            onClick={() => onCopy(fullModel, `model-${modelId}`)}
            className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary"
            title={t("copyModel")}
          >
            <span className="material-symbols-outlined text-sm">
              {copied === `model-${modelId}` ? "check" : "content_copy"}
            </span>
          </button>
          {onTestModel && (
            <button
              onClick={() => onTestModel(modelId, fullModel)}
              disabled={testingModel}
              className={`rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${testStatus === "ok" ? "text-green-500" : testStatus === "quota" ? "text-amber-500" : testStatus === "error" ? "text-red-500" : "text-text-muted hover:text-primary"}`}
              title={
                testingModel
                  ? t("testingModel")
                  : testStatus === "ok"
                    ? "OK"
                    : testStatus === "quota"
                      ? t("modelTestQuotaTooltip")
                      : testStatus === "error"
                        ? providerText(t, "errorShort", "Error")
                        : t("testModel")
              }
            >
              {testingModel ? (
                <span className="material-symbols-outlined text-sm animate-spin">
                  progress_activity
                </span>
              ) : testStatus === "ok" ? (
                <span className="material-symbols-outlined text-sm">check_circle</span>
              ) : testStatus === "quota" ? (
                <span className="material-symbols-outlined text-sm">warning</span>
              ) : testStatus === "error" ? (
                <span className="material-symbols-outlined text-sm">error</span>
              ) : (
                <span className="material-symbols-outlined text-sm">play_circle</span>
              )}
            </button>
          )}
          {onToggleHidden && (
            <button
              onClick={() => onToggleHidden(modelId, !isHidden)}
              disabled={togglingHidden}
              className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
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
            providerId={provider}
            modelId={modelId}
            effectiveModelNormalize={(p) => effectiveModelNormalize(modelId, p)}
            effectiveModelPreserveDeveloper={(p) => effectiveModelPreserveDeveloper(modelId, p)}
            getUpstreamHeadersRecord={getUpstreamHeadersRecord}
            onCompatPatch={(protocol, payload) =>
              saveModelCompatFlags(modelId, { compatByProtocol: { [protocol]: payload } })
            }
            showDeveloperToggle={showDeveloperToggle}
            compact
            disabled={compatDisabled}
          />
          {onDeleteAlias && (
            <button
              onClick={onDeleteAlias}
              className="rounded p-1 text-red-500 hover:bg-red-50"
              title={t("removeModel")}
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
