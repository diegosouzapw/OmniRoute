"use client";
import React from "react";
import { type ConnectionRowConnection } from "./ConnectionRow";
import ConnectionRow from "./ConnectionRow";
import { Button } from "@/shared/components";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import { readBooleanToggle, providerCountText } from "../providerPageHelpers";
import { compareTr } from "@/shared/utils/turkishText";
import type { CodexGlobalServiceMode } from "@/lib/providers/codexFastTier";

type ConnectionsListPanelProps = {
  connections: ConnectionRowConnection[];
  providerId: string;
  isCcCompatible: boolean;
  isOAuth: boolean;
  codexGlobalServiceMode: CodexGlobalServiceMode | string;
  selectedIds: Set<string>;
  batchUpdating: string | null;
  batchRetesting: boolean;
  batchDeleting: boolean;
  batchTesting: boolean;
  retestingId: string | null;
  refreshingId: string | null;
  distributingProxies: boolean;
  healthFilter: string;
  page: number;
  PAGE_SIZE: number;
  connProxyMap: Record<string, { proxy?: { host?: string }; level?: string } | undefined>;
  proxyConfig: any;
  applyingCodexAuthId: string | null;
  exportingCodexAuthId: string | null;
  applyingClaudeAuthId: string | null;
  exportingClaudeAuthId: string | null;
  applyingGeminiAuthId: string | null;
  exportingGeminiAuthId: string | null;
  emailsVisible: boolean;
  // Setters
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setHealthFilter: (v: string) => void;
  // Callbacks from useProviderConnections
  handleDelete: (id: string) => void;
  handleUpdateConnectionStatus: (id: string, isActive: boolean) => void;
  handleToggleRateLimit: (id: string, enabled: boolean) => void;
  handleToggleClaudeExtraUsage: (id: string, enabled: boolean) => void;
  handleToggleCliproxyapiMode: (id: string, enabled: boolean) => void;
  handleToggleCodexLimit: (id: string, type: "use5h" | "useWeekly", enabled: boolean) => void;
  handleToggleProxyEnabled: (id: string, enabled: boolean) => void;
  handleTogglePerKeyProxyEnabled: (id: string, enabled: boolean) => void;
  handleRetestConnection: (id: string) => void;
  handleRefreshToken: (id: string) => void;
  handleSwapPriority: (a: ConnectionRowConnection, b: ConnectionRowConnection) => void;
  handleBatchSetActive: (active: boolean) => void;
  handleBatchDeleteOpenModal: () => void;
  handleBatchRetest: () => void;
  handleToggleSelectOne: (id: string) => void;
  handleToggleSelectAll: () => void;
  handleDistributeProxies: (tag?: string) => void;
  cpaProviderEnabled: boolean;
  // Modal triggers (all pass through from client, no closing over client internals)
  onOpenEditModal: (conn: ConnectionRowConnection) => void;
  onOpenOAuth: (conn: ConnectionRowConnection) => void;
  onSetProxyTarget: (target: { level: string; id: string; label: string }) => void;
  onOpenApplyCodexModal: (connId: string) => void;
  onExportCodexAuthFile: (connId: string) => void;
  onOpenApplyClaudeModal: (connId: string) => void;
  onExportClaudeAuthFile: (connId: string) => void;
  onOpenApplyGeminiModal: (connId: string) => void;
  onExportGeminiAuthFile: (connId: string) => void;
  gateConnectionFlow: (callback: () => void) => void;
  t: any; // ProviderMessageTranslator
};

export default function ConnectionsListPanel({
  connections,
  providerId,
  isCcCompatible,
  isOAuth,
  codexGlobalServiceMode,
  selectedIds,
  batchUpdating,
  batchRetesting,
  batchDeleting,
  batchTesting,
  retestingId,
  refreshingId,
  distributingProxies,
  healthFilter,
  page,
  PAGE_SIZE,
  connProxyMap,
  proxyConfig,
  applyingCodexAuthId,
  exportingCodexAuthId,
  applyingClaudeAuthId,
  exportingClaudeAuthId,
  applyingGeminiAuthId,
  exportingGeminiAuthId,
  emailsVisible,
  setSelectedIds,
  setPage,
  setHealthFilter,
  handleDelete,
  handleUpdateConnectionStatus,
  handleToggleRateLimit,
  handleToggleClaudeExtraUsage,
  handleToggleCliproxyapiMode,
  handleToggleCodexLimit,
  handleToggleProxyEnabled,
  handleTogglePerKeyProxyEnabled,
  handleRetestConnection,
  handleRefreshToken,
  handleSwapPriority,
  handleBatchSetActive,
  handleBatchDeleteOpenModal,
  handleBatchRetest,
  handleToggleSelectOne,
  handleToggleSelectAll,
  handleDistributeProxies,
  cpaProviderEnabled,
  onOpenEditModal,
  onOpenOAuth,
  onSetProxyTarget,
  onOpenApplyCodexModal,
  onExportCodexAuthFile,
  onOpenApplyClaudeModal,
  onExportClaudeAuthFile,
  onOpenApplyGeminiModal,
  onExportGeminiAuthFile,
  gateConnectionFlow,
  t,
}: ConnectionsListPanelProps) {
  const sorted = [...connections].sort((a, b) => (a.priority || 0) - (b.priority || 0));
  const hasAnyTag = sorted.some((c) => c.providerSpecificData?.tag as string | undefined);
  const allSelected = selectedIds.size === connections.length && connections.length > 0;
  const someSelected = selectedIds.size > 0 && selectedIds.size < connections.length;
  const bulkBusy = batchUpdating !== null || batchRetesting || batchDeleting || batchTesting;
  const bulkActions = selectedIds.size > 0 && (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button
        variant="secondary"
        size="sm"
        icon="toggle_on"
        loading={batchUpdating === "activate"}
        disabled={bulkBusy && batchUpdating !== "activate"}
        onClick={() => handleBatchSetActive(true)}
      >
        {t("batchActivateSelected")}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        icon="toggle_off"
        loading={batchUpdating === "deactivate"}
        disabled={bulkBusy && batchUpdating !== "deactivate"}
        onClick={() => handleBatchSetActive(false)}
      >
        {t("batchDeactivateSelected")}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        icon="play_arrow"
        loading={batchRetesting}
        disabled={(bulkBusy && !batchRetesting) || !!retestingId}
        onClick={handleBatchRetest}
      >
        {t("batchRetestSelected")}
      </Button>
      <Button
        variant="danger"
        size="sm"
        icon="delete"
        loading={batchDeleting}
        disabled={bulkBusy && !batchDeleting}
        onClick={handleBatchDeleteOpenModal}
      >
        {t("batchDeleteSelected", { count: selectedIds.size })}
      </Button>
    </div>
  );

  const isHealthy = (c: ConnectionRowConnection): boolean => {
    const s = c.testStatus;
    return c.isActive !== false && (!s || s === "active" || s === "success");
  };
  const STATUS_FILTER_OPTIONS = [
    { value: "all", label: t("filterAll", "All") },
    { value: "active", label: t("filterActive", "Active") },
    { value: "error", label: t("filterError", "Error") },
    { value: "banned", label: t("filterBanned", "Banned") },
    {
      value: "credits_exhausted",
      label: t("filterCreditsExhausted", "Credits Exhausted"),
    },
  ];
  const filtered =
    healthFilter === "all"
      ? sorted
      : sorted.filter((c) => {
          if (healthFilter === "active") return isHealthy(c);
          if (healthFilter === "error")
            return (
              !isHealthy(c) &&
              c.testStatus !== "banned" &&
              c.testStatus !== "credits_exhausted"
            );
          return c.testStatus === healthFilter;
        });

  const totalFilteredPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalFilteredPages - 1);
  const pageStart = clampedPage * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;

  const filterPills = (
    <div className="flex items-center gap-1.5 flex-wrap">
      {STATUS_FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => {
            setHealthFilter(opt.value);
            setPage(0);
            setSelectedIds(new Set());
          }}
          className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
            healthFilter === opt.value
              ? "bg-primary text-white"
              : "bg-muted/60 text-text-muted hover:bg-muted"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  const paginationBar =
    totalFilteredPages > 1 ? (
      <div className="flex items-center justify-between px-3 py-2 border-t border-border">
        <span className="text-xs text-text-muted">
          {pageStart + 1}–{Math.min(pageEnd, filtered.length)} / {filtered.length}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            icon="chevron_left"
            disabled={clampedPage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          />
          <span className="text-xs text-text-muted min-w-[4rem] text-center">
            {clampedPage + 1} / {totalFilteredPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            icon="chevron_right"
            disabled={clampedPage >= totalFilteredPages - 1}
            onClick={() => setPage((p) => Math.min(totalFilteredPages - 1, p + 1))}
          />
        </div>
      </div>
    ) : null;

  if (!hasAnyTag) {
    const pageConnections = filtered.slice(pageStart, pageEnd);
    const allSelectedPage =
      pageConnections.length > 0 && pageConnections.every((c) => selectedIds.has(c.id));
    const someSelectedPage = pageConnections.some((c) => selectedIds.has(c.id));
    return (
      <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3 py-2 bg-muted/50 rounded-t-lg border border-b-0 border-border">
          <div className="flex items-center gap-2 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allSelectedPage}
                ref={(el) => {
                  if (el) el.indeterminate = someSelectedPage;
                }}
                onChange={() => {
                  if (allSelectedPage) {
                    const toRemove = new Set(pageConnections.map((c) => c.id));
                    setSelectedIds((prev) => {
                      const next = new Set(prev);
                      for (const id of toRemove) next.delete(id);
                      return next;
                    });
                  } else {
                    setSelectedIds((prev) => {
                      const next = new Set(prev);
                      for (const c of pageConnections) next.add(c.id);
                      return next;
                    });
                  }
                }}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
              />
              <span className="text-sm font-medium text-text-muted">
                {selectedIds.size > 0
                  ? providerCountText(
                      t,
                      "selectedCount",
                      selectedIds.size,
                      "{count} selected",
                      "{count} selected"
                    )
                  : providerCountText(
                      t,
                      "accountsCount",
                      filtered.length,
                      "{count} account",
                      "{count} accounts"
                    )}
              </span>
            </label>
            {filterPills}
          </div>

          {bulkActions}
        </div>
        <div className="flex flex-col divide-y divide-black/[0.03] dark:divide-white/[0.03] border border-t-0 border-border rounded-b-lg overflow-hidden">
          {pageConnections.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-text-muted">
              {t("noFilteredConnections", "No connections match the current filter.")}
            </div>
          ) : (
            pageConnections.map((conn, index) => (
              <ConnectionRow
                key={conn.id}
                connection={conn}
                isOAuth={conn.authType === "oauth"}
                isClaude={providerId === "claude"}
                codexGlobalServiceMode={codexGlobalServiceMode}
                isFirst={index === 0}
                isLast={index === pageConnections.length - 1}
                isSelected={selectedIds.has(conn.id)}
                onToggleSelect={() => handleToggleSelectOne(conn.id)}
                onMoveUp={() => handleSwapPriority(conn, sorted[index - 1])}
                onMoveDown={() => handleSwapPriority(conn, sorted[index + 1])}
                onToggleActive={(isActive) => handleUpdateConnectionStatus(conn.id, isActive)}
                onToggleRateLimit={(enabled) => handleToggleRateLimit(conn.id, enabled)}
                onToggleClaudeExtraUsage={(enabled) =>
                  handleToggleClaudeExtraUsage(conn.id, enabled)
                }
                isCodex={providerId === "codex"}
                isGeminiCli={providerId === "gemini-cli"}
                isCcCompatible={isCcCompatible}
                cliproxyapiEnabled={cpaProviderEnabled}
                onToggleCliproxyapiMode={(enabled) =>
                  handleToggleCliproxyapiMode(conn.id, enabled)
                }
                onToggleCodex5h={(enabled) => handleToggleCodexLimit(conn.id, "use5h", enabled)}
                onToggleCodexWeekly={(enabled) =>
                  handleToggleCodexLimit(conn.id, "useWeekly", enabled)
                }
                onRetest={() => handleRetestConnection(conn.id)}
                isRetesting={retestingId === conn.id}
                onEdit={() => onOpenEditModal(conn)}
                onDelete={() => handleDelete(conn.id)}
                onReauth={
                  conn.authType === "oauth"
                    ? () => gateConnectionFlow(() => onOpenOAuth(conn))
                    : undefined
                }
                onRefreshToken={
                  conn.authType === "oauth" ? () => handleRefreshToken(conn.id) : undefined
                }
                isRefreshing={refreshingId === conn.id}
                onApplyCodexAuthLocal={
                  providerId === "codex" ? () => onOpenApplyCodexModal(conn.id) : undefined
                }
                isApplyingCodexAuthLocal={applyingCodexAuthId === conn.id}
                onExportCodexAuthFile={
                  providerId === "codex" ? () => onExportCodexAuthFile(conn.id) : undefined
                }
                isExportingCodexAuthFile={exportingCodexAuthId === conn.id}
                onApplyClaudeAuthLocal={
                  providerId === "claude" ? () => onOpenApplyClaudeModal(conn.id) : undefined
                }
                isApplyingClaudeAuthLocal={applyingClaudeAuthId === conn.id}
                onExportClaudeAuthFile={
                  providerId === "claude" ? () => onExportClaudeAuthFile(conn.id) : undefined
                }
                isExportingClaudeAuthFile={exportingClaudeAuthId === conn.id}
                onApplyGeminiAuthLocal={
                  providerId === "gemini-cli"
                    ? () => onOpenApplyGeminiModal(conn.id)
                    : undefined
                }
                isApplyingGeminiAuthLocal={applyingGeminiAuthId === conn.id}
                onExportGeminiAuthFile={
                  providerId === "gemini-cli"
                    ? () => onExportGeminiAuthFile(conn.id)
                    : undefined
                }
                isExportingGeminiAuthFile={exportingGeminiAuthId === conn.id}
                onProxy={() =>
                  onSetProxyTarget({
                    level: "key",
                    id: conn.id,
                    label: pickDisplayValue([conn.name, conn.email], emailsVisible, conn.id),
                  })
                }
                hasProxy={!!connProxyMap[conn.id]?.proxy}
                proxySource={connProxyMap[conn.id]?.level || null}
                proxyHost={connProxyMap[conn.id]?.proxy?.host || null}
                proxyEnabled={readBooleanToggle(conn.proxyEnabled, true)}
                onToggleProxyEnabled={(enabled) => handleToggleProxyEnabled(conn.id, enabled)}
                perKeyProxyEnabled={readBooleanToggle(conn.perKeyProxyEnabled, false)}
                onTogglePerKeyProxyEnabled={(enabled) =>
                  handleTogglePerKeyProxyEnabled(conn.id, enabled)
                }
              />
            ))
          )}
        </div>
        {paginationBar}
      </>
    );
  }

  // Build ordered tag groups: untagged first, then alphabetically
  const groupMap = new Map<string, ConnectionRowConnection[]>();
  for (const conn of filtered) {
    const tag = (conn.providerSpecificData?.tag as string | undefined)?.trim() || "";
    if (!groupMap.has(tag)) groupMap.set(tag, []);
    groupMap.get(tag)!.push(conn);
  }
  const groupKeys = Array.from(groupMap.keys()).sort((a, b) => {
    if (a === "") return -1;
    if (b === "") return 1;
    return compareTr(a, b);
  });

  return (
    <>
      {selectedIds.size > 0 || connections.length > 0 ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3 py-2 bg-muted/50 rounded-t-lg border border-b-0 border-border">
          <div className="flex items-center gap-2 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={handleToggleSelectAll}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
              />
              <span className="text-sm font-medium text-text-muted">
                {selectedIds.size > 0
                  ? providerCountText(
                      t,
                      "selectedCount",
                      selectedIds.size,
                      "{count} selected",
                      "{count} selected"
                    )
                  : providerCountText(
                      t,
                      "accountsCount",
                      filtered.length,
                      "{count} account",
                      "{count} accounts"
                    )}
              </span>
            </label>
            {filterPills}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {/* Distribute Proxies lives in the provider toolbar (top action bar);
                removed the duplicate here that rendered simultaneously when nothing
                was selected. Per-tag groups keep their own scoped button. */}
            {bulkActions}
          </div>
        </div>
      ) : null}
      <div className="flex flex-col gap-0 border border-t-0 border-border rounded-b-lg overflow-hidden">
        {groupKeys.map((tag, gi) => {
          const groupConns = groupMap.get(tag)!;
          return (
            <div
              key={tag || "__untagged__"}
              className={
                gi > 0
                  ? "border-t border-black/[0.06] dark:border-white/[0.06] mt-1 pt-1"
                  : ""
              }
            >
              {tag && (
                <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                  <span className="material-symbols-outlined text-[13px] text-text-muted/50">
                    label
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60 select-none">
                    {tag}
                  </span>
                  <div className="flex-1 h-px bg-black/[0.04] dark:bg-white/[0.04]" />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="shield"
                    loading={distributingProxies}
                    onClick={() => handleDistributeProxies(tag)}
                  >
                    Distribute Proxies
                  </Button>
                  <span className="text-[10px] text-text-muted/40">{groupConns.length}</span>
                </div>
              )}
              <div className="flex flex-col divide-y divide-black/[0.03] dark:divide-white/[0.03]">
                {groupConns.map((conn, index) => (
                  <ConnectionRow
                    key={conn.id}
                    connection={conn}
                    isOAuth={conn.authType === "oauth"}
                    isClaude={providerId === "claude"}
                    codexGlobalServiceMode={codexGlobalServiceMode}
                    isFirst={gi === 0 && index === 0}
                    isLast={gi === groupKeys.length - 1 && index === groupConns.length - 1}
                    isSelected={selectedIds.has(conn.id)}
                    onToggleSelect={() => handleToggleSelectOne(conn.id)}
                    onMoveUp={() =>
                      handleSwapPriority(conn, sorted[sorted.indexOf(conn) - 1])
                    }
                    onMoveDown={() =>
                      handleSwapPriority(conn, sorted[sorted.indexOf(conn) + 1])
                    }
                    onToggleActive={(isActive) =>
                      handleUpdateConnectionStatus(conn.id, isActive)
                    }
                    onToggleRateLimit={(enabled) => handleToggleRateLimit(conn.id, enabled)}
                    onToggleClaudeExtraUsage={(enabled) =>
                      handleToggleClaudeExtraUsage(conn.id, enabled)
                    }
                    isCodex={providerId === "codex"}
                    isGeminiCli={providerId === "gemini-cli"}
                    isCcCompatible={isCcCompatible}
                    cliproxyapiEnabled={cpaProviderEnabled}
                    onToggleCliproxyapiMode={(enabled) =>
                      handleToggleCliproxyapiMode(conn.id, enabled)
                    }
                    onToggleCodex5h={(enabled) =>
                      handleToggleCodexLimit(conn.id, "use5h", enabled)
                    }
                    onToggleCodexWeekly={(enabled) =>
                      handleToggleCodexLimit(conn.id, "useWeekly", enabled)
                    }
                    onRetest={() => handleRetestConnection(conn.id)}
                    isRetesting={retestingId === conn.id}
                    onEdit={() => onOpenEditModal(conn)}
                    onDelete={() => handleDelete(conn.id)}
                    onReauth={
                      conn.authType === "oauth"
                        ? () => gateConnectionFlow(() => onOpenOAuth(conn))
                        : undefined
                    }
                    onRefreshToken={
                      conn.authType === "oauth"
                        ? () => handleRefreshToken(conn.id)
                        : undefined
                    }
                    isRefreshing={refreshingId === conn.id}
                    onApplyCodexAuthLocal={
                      providerId === "codex"
                        ? () => onOpenApplyCodexModal(conn.id)
                        : undefined
                    }
                    isApplyingCodexAuthLocal={applyingCodexAuthId === conn.id}
                    onExportCodexAuthFile={
                      providerId === "codex"
                        ? () => onExportCodexAuthFile(conn.id)
                        : undefined
                    }
                    isExportingCodexAuthFile={exportingCodexAuthId === conn.id}
                    onApplyClaudeAuthLocal={
                      providerId === "claude"
                        ? () => onOpenApplyClaudeModal(conn.id)
                        : undefined
                    }
                    isApplyingClaudeAuthLocal={applyingClaudeAuthId === conn.id}
                    onExportClaudeAuthFile={
                      providerId === "claude"
                        ? () => onExportClaudeAuthFile(conn.id)
                        : undefined
                    }
                    isExportingClaudeAuthFile={exportingClaudeAuthId === conn.id}
                    onApplyGeminiAuthLocal={
                      providerId === "gemini-cli"
                        ? () => onOpenApplyGeminiModal(conn.id)
                        : undefined
                    }
                    isApplyingGeminiAuthLocal={applyingGeminiAuthId === conn.id}
                    onExportGeminiAuthFile={
                      providerId === "gemini-cli"
                        ? () => onExportGeminiAuthFile(conn.id)
                        : undefined
                    }
                    isExportingGeminiAuthFile={exportingGeminiAuthId === conn.id}
                    onProxy={() =>
                      onSetProxyTarget({
                        level: "key",
                        id: conn.id,
                        label: pickDisplayValue([conn.name, conn.email], emailsVisible, conn.id),
                      })
                    }
                    hasProxy={!!connProxyMap[conn.id]?.proxy}
                    proxySource={connProxyMap[conn.id]?.level || null}
                    proxyHost={connProxyMap[conn.id]?.proxy?.host || null}
                    proxyEnabled={readBooleanToggle(conn.proxyEnabled, true)}
                    onToggleProxyEnabled={(enabled) =>
                      handleToggleProxyEnabled(conn.id, enabled)
                    }
                    perKeyProxyEnabled={readBooleanToggle(conn.perKeyProxyEnabled, false)}
                    onTogglePerKeyProxyEnabled={(enabled) =>
                      handleTogglePerKeyProxyEnabled(conn.id, enabled)
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
