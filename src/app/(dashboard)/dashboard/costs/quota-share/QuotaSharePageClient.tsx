"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import EmailPrivacyToggle from "@/shared/components/EmailPrivacyToggle";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { maskEmailLikeValue } from "@/shared/utils/maskEmail";
import type { QuotaPool } from "@/lib/quota/dimensions";

import { usePools } from "./hooks/usePools";
import { usePoolUsage } from "./hooks/usePoolUsage";
import { useLocalStoragePoolMigration } from "./hooks/useLocalStoragePoolMigration";
import { usePoolsUsageAggregate } from "./hooks/usePoolsUsageAggregate";
import QuotaConceptCard from "./components/QuotaConceptCard";
import QuotaEndpointsCard from "./components/QuotaEndpointsCard";
import PoolCard from "./components/PoolCard";
import PoolWizard from "./components/PoolWizard";

// ────────────────────────────────────────────────────────────────────────────
// Local types (display layer only)
// ────────────────────────────────────────────────────────────────────────────

interface QuotaGroup {
  id: string;
  name: string;
  createdAt: string;
}

interface Connection {
  id: string;
  provider: string;
  name?: string;
  displayName?: string;
  email?: string;
}

interface ApiKey {
  id: string;
  name?: string;
}

interface PlanDimension {
  unit: string;
  window: string;
  limit: number;
}

interface PlanInfo {
  dimensions: PlanDimension[];
  source: "auto" | "manual";
}

// ────────────────────────────────────────────────────────────────────────────
// Stat card helper
// ────────────────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "green" | "amber" | "red";
}) {
  const color =
    tone === "amber"
      ? "text-amber-400"
      : tone === "red"
        ? "text-red-400"
        : tone === "green"
          ? "text-emerald-400"
          : "text-text-main";
  return (
    <div className="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <div className="text-[10px] uppercase tracking-wide text-text-muted font-semibold">
        {label}
      </div>
      <div className={`text-2xl font-bold tabular-nums leading-tight ${color}`}>{value}</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Per-pool wrapper that fetches usage
// ────────────────────────────────────────────────────────────────────────────

function PoolCardWithUsage({
  pool,
  keyLabels,
  connectionLabel,
  provider,
  providers,
  connectionIds,
  onEdit,
  onRemove,
}: {
  pool: QuotaPool;
  keyLabels: Record<string, string>;
  connectionLabel: string;
  provider: string;
  providers?: string[];
  connectionIds?: string[];
  onEdit: () => void;
  onRemove: () => void;
}) {
  const { usage } = usePoolUsage(pool.id);
  return (
    <PoolCard
      pool={pool}
      usage={usage}
      keyLabels={keyLabels}
      connectionLabel={connectionLabel}
      provider={provider}
      providers={providers}
      connectionIds={connectionIds}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────────────

export default function QuotaSharePageClient() {
  const t = useTranslations("quotaShare");
  const { pools, loading, mutate } = usePools();
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

  // LS → DB migration hook (B22) — runs once, idempotent
  useLocalStoragePoolMigration({ pools, mutate });

  const [connections, setConnections] = useState<Connection[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [plans, setPlans] = useState<Record<string, PlanInfo>>({});
  const [, setSideLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<QuotaPool | null>(null);

  // ── Group state ───────────────────────────────────────────────────────────
  const [groups, setGroups] = useState<QuotaGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("all");
  const [newGroupInput, setNewGroupInput] = useState("");
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);
  const [renaming, setRenaming] = useState(false);

  // ── Fetch side data once on mount ─────────────────────────────────────────

  useMemo(() => {
    setSideLoading(true);
    Promise.all([
      fetch("/api/providers/client")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch("/api/keys")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch("/api/quota/plans")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([connsData, keysData, plansData]) => {
        const conns: Connection[] = Array.isArray(connsData?.connections)
          ? connsData.connections
          : [];
        const keys: ApiKey[] = Array.isArray(keysData) ? keysData : keysData?.keys || [];
        setConnections(conns);
        setApiKeys(keys);

        if (Array.isArray(plansData)) {
          const planMap: Record<string, PlanInfo> = {};
          for (const p of plansData as Array<{
            connectionId: string;
            dimensions: PlanDimension[];
            source: "auto" | "manual";
          }>) {
            if (p.connectionId) planMap[p.connectionId] = { dimensions: p.dimensions, source: p.source };
          }
          setPlans(planMap);
        }
      })
      .catch(() => {
        // fail open — side data not critical
      })
      .finally(() => {
        setSideLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Fetch groups ──────────────────────────────────────────────────────────

  const fetchGroups = useCallback(async () => {
    try {
      const res = await fetch("/api/quota/groups");
      if (res.ok) {
        const data = (await res.json()) as { groups: QuotaGroup[] };
        setGroups(Array.isArray(data.groups) ? data.groups : []);
      }
    } catch {
      // fail open — groups list not critical
    }
  }, []);

  useEffect(() => {
    void fetchGroups();
  }, [fetchGroups]);

  // ── Group actions ─────────────────────────────────────────────────────────

  const handleCreateGroup = useCallback(async () => {
    const name = newGroupInput.trim();
    if (!name) return;
    try {
      const res = await fetch("/api/quota/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        const data = (await res.json()) as { group: QuotaGroup };
        await fetchGroups();
        setSelectedGroupId(data.group.id);
      }
    } catch {
      // fail open
    }
    setNewGroupInput("");
    setShowNewGroupInput(false);
  }, [newGroupInput, fetchGroups]);

  const handleRenameGroup = useCallback(async () => {
    const name = prompt(t("groupNamePrompt"), groups.find((g) => g.id === selectedGroupId)?.name ?? "");
    if (!name?.trim()) return;
    setRenaming(true);
    try {
      const res = await fetch(`/api/quota/groups/${selectedGroupId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (res.ok) {
        await fetchGroups();
      }
    } catch {
      // fail open
    }
    setRenaming(false);
  }, [selectedGroupId, groups, fetchGroups, t]);

  // Delete the selected group. The API blocks deletion while the group still has
  // pools (HTTP 409) and protects the seed "group-demo"; surface both to the user.
  const handleDeleteGroup = useCallback(async () => {
    if (selectedGroupId === "all" || selectedGroupId === "group-demo") return;
    if (!confirm(t("deleteGroupConfirm"))) return;
    try {
      const res = await fetch(`/api/quota/groups/${selectedGroupId}`, { method: "DELETE" });
      if (res.ok) {
        setSelectedGroupId("all");
        await fetchGroups();
        await mutate();
      } else if (res.status === 409) {
        alert(t("deleteGroupHasPools"));
      }
    } catch {
      // fail open
    }
  }, [selectedGroupId, fetchGroups, mutate, t]);

  // ── Derived ──────────────────────────────────────────────────────────────

  const keyLabels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const k of apiKeys) map[k.id] = k.name || k.id.slice(0, 12) + "…";
    return map;
  }, [apiKeys]);

  const connLabel = useCallback(
    (connectionId: string) => {
      const conn = connections.find((c) => c.id === connectionId);
      if (!conn) return connectionId.slice(0, 12);
      const raw = conn.name || conn.email || conn.displayName || conn.id.slice(0, 12);
      return emailsVisible ? raw : maskEmailLikeValue(raw);
    },
    [connections, emailsVisible]
  );

  const connProvider = useCallback(
    (connectionId: string) => connections.find((c) => c.id === connectionId)?.provider || "unknown",
    [connections]
  );

  // connectionId → name of the pool it already belongs to (all members, not just
  // primary). Feeds the wizard's "already used" hint so the one-connection-per-pool
  // rule is explicit instead of silently disabling a checkbox.
  const connectionPoolName = useMemo(() => {
    const map: Record<string, string> = {};
    for (const p of pools) {
      const name = (p as unknown as { name?: string }).name ?? p.id.slice(0, 8);
      for (const cid of p.connectionIds ?? [p.connectionId]) {
        if (!(cid in map)) map[cid] = name;
      }
    }
    return map;
  }, [pools]);

  // Pools whose groupId matches no loaded group (e.g. legacy pools saved with the
  // "all" sentinel). Surfaced in an "Ungrouped" bucket so they stay editable/deletable.
  const orphanPools = useMemo(() => {
    const known = new Set(groups.map((g) => g.id));
    return pools.filter(
      (p) => !known.has((p as unknown as { groupId?: string }).groupId ?? "group-demo")
    );
  }, [pools, groups]);

  const aggregate = usePoolsUsageAggregate(pools);

  const stats = useMemo(
    () => ({
      activePools: pools.length,
      keysAllocated: pools.reduce((s, p) => s + p.allocations.length, 0),
      avgUtilization: aggregate.avgUtilizationPercent,
      borrowingNow: aggregate.borrowingKeyCount,
    }),
    [pools, aggregate]
  );

  // Pools filtered by selected group (kept for stats/empty-state checks)
  const filteredPools = useMemo(
    () =>
      selectedGroupId === "all"
        ? pools
        : pools.filter(
            (p) =>
              ((p as unknown as { groupId?: string }).groupId ?? "group-demo") === selectedGroupId
          ),
    [pools, selectedGroupId]
  );

  // Groups to render as stacked sections
  const groupsToRender = useMemo(
    () => (selectedGroupId === "all" ? groups : groups.filter((g) => g.id === selectedGroupId)),
    [groups, selectedGroupId]
  );

  // ── Computed exclusivity for the pool being edited ───────────────────────
  //
  // A pool is exclusive when it has ≥1 allocation AND every allocated key
  // currently has the pool id in its allowedQuotas array.

  const editingExclusive = useMemo(
    () =>
      !!editing &&
      editing.allocations.length > 0 &&
      editing.allocations.every((a) => {
        const k = apiKeys.find((kk) => kk.id === a.apiKeyId);
        const aq = (k as { allowedQuotas?: string[] } | undefined)?.allowedQuotas;
        return Array.isArray(aq) && aq.includes(editing.id);
      }),
    [editing, apiKeys]
  );

  // ── Mutations ─────────────────────────────────────────────────────────────

  const handleRemovePool = useCallback(
    async (id: string) => {
      if (!confirm(t("removeConfirm"))) return;
      await fetch(`/api/quota/pools/${id}`, { method: "DELETE" });
      await mutate();
    },
    [mutate, t]
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary">pie_chart</span>
            {t("title")}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">{t("description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <EmailPrivacyToggle />
          <Button variant="primary" size="sm" onClick={() => setCreateOpen(true)}>
            <span className="material-symbols-outlined text-[14px] mr-1">add</span>
            {t("newPool")}
          </Button>
        </div>
      </div>

      {/* Beta banner — scoped to this page only */}
      <div className="flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-[12px] text-amber-700 dark:text-amber-200">
        <span className="material-symbols-outlined text-[16px] text-amber-500 shrink-0">science</span>
        <span className="flex-1">
          <span className="font-semibold">{t("betaTitle")}</span> — {t("betaText")}
        </span>
        <a
          href="https://github.com/diegosouzapw/OmniRoute/issues/new?labels=quota-share,beta&title=%5Bquota-share%5D%20"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-300 hover:underline"
        >
          <span className="material-symbols-outlined text-[14px]">bug_report</span>
          {t("betaReportLink")}
        </a>
      </div>

      {/* Group bar */}
      <div className="flex items-center gap-2 flex-wrap rounded-lg border border-border/40 bg-bg-subtle/20 px-3 py-2">
        <span className="text-[11px] uppercase tracking-wide text-text-muted font-semibold shrink-0">
          {t("groupLabel")}
        </span>
        <select
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
          title={t("groupSelectHint")}
          className="px-2 py-1 rounded border border-border bg-bg-base text-sm text-text-main min-w-[120px]"
        >
          <option value="all">{t("allGroups")}</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {showNewGroupInput ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={newGroupInput}
              onChange={(e) => setNewGroupInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleCreateGroup();
                if (e.key === "Escape") { setShowNewGroupInput(false); setNewGroupInput(""); }
              }}
              placeholder={t("groupNamePrompt")}
              autoFocus
              className="px-2 py-1 rounded border border-border bg-bg-base text-sm w-36"
            />
            <button
              type="button"
              onClick={() => void handleCreateGroup()}
              disabled={!newGroupInput.trim()}
              className="text-xs px-2 py-1 rounded bg-primary/15 text-primary hover:bg-primary/25 transition-colors disabled:opacity-40"
            >
              {t("newGroup")}
            </button>
            <button
              type="button"
              onClick={() => { setShowNewGroupInput(false); setNewGroupInput(""); }}
              className="text-xs px-2 py-1 rounded border border-border text-text-muted hover:text-text-main transition-colors"
            >
              {t("cancel")}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowNewGroupInput(true)}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-text-main transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            {t("newGroup")}
          </button>
        )}
        {selectedGroupId !== "all" && (
          <button
            type="button"
            onClick={() => void handleRenameGroup()}
            disabled={renaming}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-text-main transition-colors ml-1 disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            {t("renameGroup")}
          </button>
        )}
        {selectedGroupId !== "all" && selectedGroupId !== "group-demo" && (
          <button
            type="button"
            onClick={() => void handleDeleteGroup()}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-red-400 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
            {t("deleteGroup")}
          </button>
        )}
      </div>

      {/* Concept card */}
      <QuotaConceptCard />

      {/* Endpoints card */}
      <QuotaEndpointsCard
        groups={groups}
        pools={pools}
        connections={connections}
        apiKeys={apiKeys}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={t("kpiActivePools")} value={String(stats.activePools)} />
        <StatCard label={t("kpiKeysAllocated")} value={String(stats.keysAllocated)} />
        <StatCard
          label={t("kpiAvgUtilization")}
          value={`${Math.round(stats.avgUtilization)}%`}
          tone={stats.avgUtilization > 80 ? "red" : stats.avgUtilization > 50 ? "amber" : "green"}
        />
        <StatCard
          label={t("kpiBorrowingNow")}
          value={String(stats.borrowingNow)}
          tone={stats.borrowingNow > 0 ? "amber" : undefined}
        />
      </div>

      {/* Pool list */}
      {loading ? (
        <div className="text-text-muted text-sm py-10 text-center animate-pulse">
          {t("loading")}
        </div>
      ) : pools.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface py-16 text-center">
          <span className="material-symbols-outlined text-[64px] opacity-15">pie_chart</span>
          <h3 className="mt-3 text-base font-semibold text-text-main">{t("emptyTitle")}</h3>
          <p className="mt-1 text-sm text-text-muted max-w-md mx-auto">{t("emptyDescription")}</p>
          <Button variant="primary" size="sm" className="mt-4" onClick={() => setCreateOpen(true)}>
            <span className="material-symbols-outlined text-[14px] mr-1">add</span>
            {t("newPool")}
          </Button>
        </div>
      ) : (
        <>
          {groupsToRender.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface py-10 text-center">
              <p className="text-sm text-text-muted">{t("emptyDescription")}</p>
              <Button variant="primary" size="sm" className="mt-3" onClick={() => setCreateOpen(true)}>
                <span className="material-symbols-outlined text-[14px] mr-1">add</span>
                {t("newPool")}
              </Button>
            </div>
          ) : (
            groupsToRender.map((g) => {
              const groupPools = pools.filter(
                (p) =>
                  ((p as unknown as { groupId?: string }).groupId ?? "group-demo") === g.id
              );
              return (
                <div key={g.id} className="flex flex-col gap-3">
                  {/* Per-group heading */}
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-text-muted">
                      folder
                    </span>
                    <span className="text-sm font-semibold text-text-main">{g.name}</span>
                    <span className="text-[11px] text-text-muted">({groupPools.length})</span>
                  </div>
                  {groupPools.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border bg-surface py-6 text-center">
                      <p className="text-sm text-text-muted">{t("emptyDescription")}</p>
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-3"
                        onClick={() => setCreateOpen(true)}
                      >
                        <span className="material-symbols-outlined text-[14px] mr-1">add</span>
                        {t("newPool")}
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                      {groupPools.map((pool) => (
                        <PoolCardWithUsage
                          key={pool.id}
                          pool={pool}
                          keyLabels={keyLabels}
                          connectionLabel={connLabel(pool.connectionId)}
                          provider={connProvider(pool.connectionId)}
                          providers={[
                            ...new Set(
                              (pool.connectionIds ?? [pool.connectionId]).map(connProvider)
                            ),
                          ]}
                          connectionIds={pool.connectionIds ?? [pool.connectionId]}
                          onEdit={() => setEditing(pool)}
                          onRemove={() => void handleRemovePool(pool.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Ungrouped bucket — pools whose group no longer matches (e.g. legacy
              "all" sentinel). Keeps them visible + editable + deletable. */}
          {selectedGroupId === "all" && orphanPools.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-amber-400">
                  folder_off
                </span>
                <span className="text-sm font-semibold text-text-main">{t("ungroupedTitle")}</span>
                <span className="text-[11px] text-text-muted">({orphanPools.length})</span>
              </div>
              <p className="text-[11px] text-amber-400/80">{t("ungroupedHint")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {orphanPools.map((pool) => (
                  <PoolCardWithUsage
                    key={pool.id}
                    pool={pool}
                    keyLabels={keyLabels}
                    connectionLabel={connLabel(pool.connectionId)}
                    provider={connProvider(pool.connectionId)}
                    providers={[
                      ...new Set((pool.connectionIds ?? [pool.connectionId]).map(connProvider)),
                    ]}
                    connectionIds={pool.connectionIds ?? [pool.connectionId]}
                    onEdit={() => setEditing(pool)}
                    onRemove={() => void handleRemovePool(pool.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <PoolWizard
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={() => void mutate()}
        connections={connections}
        apiKeys={apiKeys}
        plans={plans}
        existingPoolConnectionIds={new Set(pools.flatMap((p) => p.connectionIds ?? [p.connectionId]))}
        connectionPoolName={connectionPoolName}
        groups={groups}
        selectedGroupId={selectedGroupId}
      />

      {/* Edit wizard — separate instance from create to avoid shared state */}
      <PoolWizard
        open={!!editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          void mutate();
          setEditing(null);
        }}
        editPool={editing ?? undefined}
        editPoolExclusive={editingExclusive}
        connections={connections}
        apiKeys={apiKeys}
        plans={plans}
        existingPoolConnectionIds={
          new Set(
            pools
              .filter((p) => p.id !== editing?.id)
              .flatMap((p) => p.connectionIds ?? [p.connectionId])
          )
        }
        connectionPoolName={connectionPoolName}
        groups={groups}
        selectedGroupId={selectedGroupId}
      />
    </div>
  );
}
