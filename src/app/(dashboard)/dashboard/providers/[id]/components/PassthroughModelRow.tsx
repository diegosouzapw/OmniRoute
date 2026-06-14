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
import React from "react";
import { Badge } from "@/shared/components";
import { providerText } from "../providerPageHelpers";
import ModelCompatPopover from "./ModelCompatPopover";
import { ModelSourceBadge, type ModelCompatSavePatch } from "./ModelRow";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PassthroughModelRowProps {
  modelId: string;
  fullModel: string;
  source?: string;
  isFree?: boolean;
  isHidden?: boolean;
  copied?: string;
  onCopy: (text: string, key: string) => void;
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PassthroughModelRow({
  modelId,
  fullModel,
  source,
  isFree,
  isHidden,
  copied,
  onCopy,
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
}: PassthroughModelRowProps) {
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
      </div>
      <div className="flex min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <ModelSourceBadge source={source} />
          {isFree && (
            <Badge variant="success" className="shrink-0 px-1.5 py-0 text-[10px]">
              {providerText(t, "freeBadge", "Free")}
            </Badge>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
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
