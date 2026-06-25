"use client";

/** PoolWizard — 3-step guided pool creation/edit wizard for quota-share pools. */

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/components";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { maskEmailLikeValue } from "@/shared/utils/maskEmail";
import { getKnownPlan } from "@/lib/quota/planRegistry";
import { quotaModelName } from "@/lib/quota/quotaModelNaming";
import type {
  Policy,
  PoolAllocation,
  QuotaDimension,
  QuotaUnit,
  QuotaWindow,
} from "@/lib/quota/dimensions";
import type { QuotaPool } from "@/lib/db/quotaPools";

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

interface PlanInfo {
  dimensions: QuotaDimension[];
  source: "auto" | "manual";
}

interface QuotaGroup {
  id: string;
  name: string;
  createdAt: string;
}

export interface PoolWizardProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  connections: Connection[];
  apiKeys: ApiKey[];
  plans: Record<string, PlanInfo>;
  existingPoolConnectionIds: Set<string>;
  groups?: QuotaGroup[];
  selectedGroupId?: string;
  /** When provided, the wizard enters edit mode — pre-fills from the pool and PATCHes instead of POSTing. */
  editPool?: QuotaPool;
  /** Whether the pool being edited is currently exclusive. Used to pre-fill the exclusive checkbox in edit mode. */
  editPoolExclusive?: boolean;
  /** connectionId → name of the pool it already belongs to, for the "already used" hint. */
  connectionPoolName?: Record<string, string>;
}

const UNIT_OPTIONS: QuotaUnit[] = ["percent", "requests", "tokens", "usd"];
const WINDOW_OPTIONS: QuotaWindow[] = ["5h", "hourly", "daily", "weekly", "monthly"];

const SLICE_PALETTE = [
  "#a78bfa",
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#22d3ee",
  "#f472b6",
  "#94a3b8",
];

/** A few representative model names to show in the preview. */
const PREVIEW_MODELS_BY_PROVIDER: Record<string, string[]> = {
  openai: ["gpt-4o", "gpt-4o-mini", "o3", "gpt-4-turbo"],
  anthropic: ["claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-3-5"],
  gemini: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
  cx: ["gpt-5.4-mini", "gpt-5.4", "o3"],
  codex: ["codex-mini-latest", "codex-latest"],
  glm: ["glm-4", "glm-4v", "glm-z1-airx"],
  minimax: ["minimax-m1", "minimax-text-01"],
  kimi: ["moonshot-v1-8k", "moonshot-v1-32k"],
  default: ["model-a", "model-b", "model-c"],
};

function getPreviewModels(provider: string): string[] {
  return PREVIEW_MODELS_BY_PROVIDER[provider] ?? PREVIEW_MODELS_BY_PROVIDER["default"];
}

function Stepper({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const t = useTranslations("quotaShare");

  const steps: Array<{ num: 1 | 2 | 3; label: string }> = [
    { num: 1, label: t("wizardStep1Label") },
    { num: 2, label: t("wizardStep2Label") },
    { num: 3, label: t("wizardStep3Label") },
  ];

  return (
    <div className="flex items-center gap-0 px-4 py-3 border-b border-border bg-bg-alt shrink-0">
      {steps.map((step, idx) => (
        <div key={step.num} className="flex items-center">
          {idx > 0 && (
            <div
              className={`h-px w-8 mx-2 transition-colors ${
                currentStep > step.num ? "bg-primary" : "bg-border"
              }`}
            />
          )}
          <div className="flex items-center gap-1.5">
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-semibold transition-colors ${
                currentStep === step.num
                  ? "bg-primary text-white"
                  : currentStep > step.num
                    ? "bg-primary/20 text-primary"
                    : "bg-border text-text-muted"
              }`}
            >
              {currentStep > step.num ? (
                <span className="material-symbols-outlined text-[12px]">check</span>
              ) : (
                step.num
              )}
            </span>
            <span
              className={`text-xs font-medium transition-colors ${
                currentStep === step.num ? "text-text-main" : "text-text-muted"
              }`}
            >
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PoolWizard({
  open,
  onClose,
  onSaved,
  connections,
  apiKeys,
  plans,
  existingPoolConnectionIds,
  groups = [],
  selectedGroupId: initialGroupId = "group-demo",
  editPool,
  editPoolExclusive,
  connectionPoolName = {},
}: PoolWizardProps) {
  const t = useTranslations("quotaShare");
  const tPlans = useTranslations("quotaPlans");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

  // ── Wizard step ───────────────────────────────────────────────────────────
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // ── Step 1 state ──────────────────────────────────────────────────────────
  // Multi-select: ordered array of selected connection IDs. First element is primary.
  const [connectionIds, setConnectionIds] = useState<string[]>([]);
  const [poolName, setPoolName] = useState("");
  const [defaultPolicy, setDefaultPolicy] = useState<Policy>("hard");

  // ── Step 2 state ──────────────────────────────────────────────────────────
  const [editDimensions, setEditDimensions] = useState<QuotaDimension[]>([]);
  const [dimensionsEdited, setDimensionsEdited] = useState(false);

  // ── Step 3 state ──────────────────────────────────────────────────────────
  const [allocations, setAllocations] = useState<PoolAllocation[]>([]);
  const [exclusive, setExclusive] = useState(false);

  // ── Group selection ───────────────────────────────────────────────────────
  const [groupId, setGroupId] = useState<string>(initialGroupId);

  // ── Saving ────────────────────────────────────────────────────────────────
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Derived state ─────────────────────────────────────────────────────────
  // The first selected connection is the "primary" — used for plan fetch/PUT.
  const primaryConnectionId = connectionIds[0] ?? "";

  // ── Helpers ───────────────────────────────────────────────────────────────

  const connLabel = (c: Connection) => {
    const detail = c.name || c.email || c.displayName || c.id.slice(0, 12);
    const maskedDetail = emailsVisible ? detail : maskEmailLikeValue(detail);
    return `${c.provider} / ${maskedDetail}`;
  };

  const selectedConn = useMemo(
    () => connections.find((c) => c.id === primaryConnectionId),
    [connections, primaryConnectionId]
  );

  // Locked provider: once the first connection is selected, all subsequent
  // selections must use the same provider (single-provider rule, Task 3).
  const lockedProvider = useMemo(() => {
    const first = connections.find((c) => c.id === connectionIds[0]);
    return first?.provider ?? null;
  }, [connections, connectionIds]);

  const availableConnections = useMemo(
    () =>
      connections.filter(
        (c) =>
          !existingPoolConnectionIds.has(c.id) &&
          (lockedProvider ? c.provider === lockedProvider : true)
      ),
    [connections, existingPoolConnectionIds, lockedProvider]
  );

  // ── Load dimensions when primary connection changes ───────────────────────

  useEffect(() => {
    if (!primaryConnectionId) {
      setEditDimensions([]);
      setDimensionsEdited(false);
      return;
    }
    const existingPlan = plans[primaryConnectionId];
    if (existingPlan && existingPlan.dimensions.length > 0) {
      setEditDimensions([...existingPlan.dimensions]);
    } else {
      const catalogPlan = selectedConn ? getKnownPlan(selectedConn.provider) : null;
      setEditDimensions(catalogPlan ? [...catalogPlan.dimensions] : []);
    }
    setDimensionsEdited(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryConnectionId]);

  // ── Reset wizard on open/close ────────────────────────────────────────────

  useEffect(() => {
    if (!open) {
      // Closing: always reset to defaults.
      setStep(1);
      setConnectionIds([]);
      setPoolName("");
      setDefaultPolicy("hard");
      setEditDimensions([]);
      setDimensionsEdited(false);
      setAllocations([]);
      setExclusive(false);
      setError(null);
      setSaving(false);
      setGroupId(initialGroupId);
    } else if (editPool) {
      // Opening in edit mode: pre-fill from the existing pool.
      const ids =
        Array.isArray(editPool.connectionIds) && editPool.connectionIds.length > 0
          ? editPool.connectionIds
          : [editPool.connectionId];
      setConnectionIds(ids);
      setPoolName(editPool.name);
      setGroupId(editPool.groupId ?? initialGroupId);
      setAllocations(editPool.allocations ?? []);
      // Preserve the pool's current exclusivity state so editing an exclusive pool
      // doesn't silently un-exclusive it. Falls back to false only when not provided.
      setExclusive(editPoolExclusive ?? false);
      // Pre-load plan dimensions for the primary connection (same as create path).
      // dimensionsEdited stays false so the PUT is skipped unless the user actively edits.
      const primaryId = ids[0];
      const existingPlan = plans[primaryId];
      if (existingPlan && existingPlan.dimensions.length > 0) {
        setEditDimensions([...existingPlan.dimensions]);
      } else {
        setEditDimensions([]);
      }
      setDimensionsEdited(false);
      setError(null);
      setSaving(false);
      setStep(1);
    }
    // When open && !editPool (create mode): the existing create-reset on close handles defaults.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editPool, initialGroupId]);

  // Keep the group <select> on a real, selectable option: if the inherited page
  // filter was "all" (or an unknown id), snap to the first real group once groups
  // load. Prevents persisting groupId="all" (which renders under no group → B1).
  useEffect(() => {
    if (!open || editPool) return;
    if (groups.length === 0) return;
    if (groupId === "all" || !groups.some((g) => g.id === groupId)) {
      setGroupId(groups[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editPool, groups]);

  // ── Step 2 — dimension editors ────────────────────────────────────────────

  const addDimension = () => {
    setEditDimensions((prev) => [...prev, { unit: "percent", window: "daily", limit: 100 }]);
    setDimensionsEdited(true);
  };

  const removeDimension = (i: number) => {
    setEditDimensions((prev) => prev.filter((_, idx) => idx !== i));
    setDimensionsEdited(true);
  };

  const updateDimension = (i: number, patch: Partial<QuotaDimension>) => {
    setEditDimensions((prev) => prev.map((d, idx) => (idx === i ? { ...d, ...patch } : d)));
    setDimensionsEdited(true);
  };

  // ── Step 3 — allocation editors ───────────────────────────────────────────

  const totalWeight = allocations.reduce(
    (s, a) => s + (Number.isFinite(a.weight) ? a.weight : 0),
    0
  );

  const availableKeys = apiKeys.filter((k) => !allocations.some((a) => a.apiKeyId === k.id));

  const keyLabel = (id: string) => apiKeys.find((k) => k.id === id)?.name || id.slice(0, 12) + "…";

  const addKey = (id: string) => {
    setAllocations((prev) => {
      const next = [...prev, { apiKeyId: id, weight: 0, policy: defaultPolicy }];
      // Equal-split: after adding, recompute weights so no key starts at 0.
      const n = next.length;
      const each = Math.floor(100 / n);
      const remainder = 100 - each * n;
      return next.map((a, i) => ({ ...a, weight: each + (i < remainder ? 1 : 0) }));
    });
  };

  const updateWeight = (id: string, value: number) => {
    setAllocations((prev) =>
      prev.map((a) => (a.apiKeyId === id ? { ...a, weight: Math.max(0, Math.min(100, value)) } : a))
    );
  };

  const updateAllocationPolicy = (id: string, policy: Policy) => {
    setAllocations((prev) => prev.map((a) => (a.apiKeyId === id ? { ...a, policy } : a)));
  };

  const updateCapValue = (id: string, capValue: number | undefined) => {
    setAllocations((prev) => prev.map((a) => (a.apiKeyId === id ? { ...a, capValue } : a)));
  };

  const removeAllocation = (id: string) => {
    setAllocations((prev) => prev.filter((a) => a.apiKeyId !== id));
  };

  const equalSplit = () => {
    if (allocations.length === 0) return;
    const each = Math.floor(100 / allocations.length);
    const remainder = 100 - each * allocations.length;
    setAllocations((prev) =>
      prev.map((a, i) => ({ ...a, weight: each + (i < remainder ? 1 : 0) }))
    );
  };

  // ── Preview model names ───────────────────────────────────────────────────

  // Per-provider preview: { provider, names[], totalModels }
  // Keep the preview tied to connectionIds.map((cid) so multi-provider pools render each provider.
  const previewByProvider = useMemo(() => {
    const name = poolName.trim();
    if (connectionIds.length === 0 || !name) return [];

    const MAX_PER_PROVIDER = 3;
    return connectionIds
      .map((cid) => {
        const conn = connections.find((c) => c.id === cid);
        if (!conn) return null;
        const allModels = getPreviewModels(conn.provider);
        const names = allModels
          .slice(0, MAX_PER_PROVIDER)
          .map((m) => quotaModelName(name, conn.provider, m));
        return { provider: conn.provider, names, totalModels: allModels.length };
      })
      .filter(Boolean) as Array<{ provider: string; names: string[]; totalModels: number }>;
  }, [connectionIds, connections, poolName]);

  // Flat list (for legacy single-provider path, kept for step-3 rendering simplicity)
  const previewNames = useMemo(
    () => previewByProvider.flatMap((p) => p.names),
    [previewByProvider]
  );

  // Default pool name uses provider slug — NOT the raw connection label/email.
  const effectivePoolName = poolName.trim() || (selectedConn ? selectedConn.provider : "");

  // ── Save sequence ─────────────────────────────────────────────────────────

  const handleFinish = async () => {
    if (!selectedConn || connectionIds.length === 0) return;
    setSaving(true);
    setError(null);

    // Never persist the "all" filter sentinel (or an unknown id) as a real group.
    // Fall back to the first real group — the seed "group-demo" always exists (migration 088).
    const resolvedGroupId =
      groupId && groupId !== "all" && groups.some((g) => g.id === groupId)
        ? groupId
        : (groups[0]?.id ?? "group-demo");

    try {
      if (!editPool) {
        // ── Create mode: POST → optional PUT → PATCH ──────────────────────

        // 1. POST /api/quota/pools → get new pool id
        const createRes = await fetch("/api/quota/pools", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            connectionId: primaryConnectionId,
            connectionIds,
            name: effectivePoolName,
            allocations: [],
            groupId: resolvedGroupId,
          }),
        });
        if (!createRes.ok) {
          const errBody = await createRes.json().catch(() => null);
          throw new Error(
            errBody?.error?.message || `POST /api/quota/pools failed: HTTP ${createRes.status}`
          );
        }
        const createData = (await createRes.json()) as { pool: { id: string } };
        const newPoolId = createData.pool.id;

        // 2. PUT /api/quota/plans/[primaryConnectionId] — only when user edited dimensions
        if (dimensionsEdited && editDimensions.length > 0) {
          const planRes = await fetch(`/api/quota/plans/${primaryConnectionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dimensions: editDimensions }),
          });
          if (!planRes.ok) {
            const errBody = await planRes.json().catch(() => null);
            throw new Error(
              errBody?.error?.message || `PUT /api/quota/plans failed: HTTP ${planRes.status}`
            );
          }
        }

        // 3. PATCH /api/quota/pools/[id] — allocations + exclusive flag
        const patchRes = await fetch(`/api/quota/pools/${newPoolId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ allocations, exclusive }),
        });
        if (!patchRes.ok) {
          const errBody = await patchRes.json().catch(() => null);
          throw new Error(
            errBody?.error?.message || `PATCH /api/quota/pools failed: HTTP ${patchRes.status}`
          );
        }
      } else {
        // ── Edit mode: single PATCH (folds name, groupId, connectionIds, allocations, exclusive)
        // + optional PUT for plan dimensions when user edited them.

        // 1. PATCH /api/quota/pools/[id] — all editable fields in one call
        const editPatchRes = await fetch(`/api/quota/pools/${editPool.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: effectivePoolName,
            groupId: resolvedGroupId,
            connectionIds,
            allocations,
            exclusive,
          }),
        });
        if (!editPatchRes.ok) {
          const errBody = await editPatchRes.json().catch(() => null);
          throw new Error(
            errBody?.error?.message || `PATCH /api/quota/pools failed: HTTP ${editPatchRes.status}`
          );
        }

        // 2. PUT /api/quota/plans/[primaryConnectionId] — only when user actually edited dimensions
        if (dimensionsEdited && editDimensions.length > 0) {
          const planRes = await fetch(`/api/quota/plans/${primaryConnectionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dimensions: editDimensions }),
          });
          if (!planRes.ok) {
            const errBody = await planRes.json().catch(() => null);
            throw new Error(
              errBody?.error?.message || `PUT /api/quota/plans failed: HTTP ${planRes.status}`
            );
          }
        }
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create pool");
    } finally {
      setSaving(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (!open) return null;

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={editPool ? t("editPoolTitle") : t("wizardTitle")}
      size="lg"
    >
      <div className="flex flex-col" style={{ minHeight: 420 }}>
        <Stepper currentStep={step} />

        {/* ── Step 1: Conta ───────────────────────────────────────────── */}
        {step === 1 && (
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div>
              <h2 className="text-sm font-semibold text-text-main mb-0.5">
                {t("wizardStep1Title")}
              </h2>
              <p className="text-[11px] text-text-muted">{t("wizardStep1Subtitle")}</p>
            </div>

            {/* Connection multi-select (checkboxes) */}
            <div>
              <label className="text-[11px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
                {t("wizardConnectionsLabel")}
              </label>
              {lockedProvider && (
                <p className="text-[10px] text-amber-400 mb-1.5">
                  {t("wizardSingleProviderNote")} ({lockedProvider})
                </p>
              )}
              <div className="space-y-1.5 rounded border border-border bg-bg-base px-3 py-2 max-h-48 overflow-y-auto">
                {availableConnections.map((c) => {
                  const checked = connectionIds.includes(c.id);
                  const isPrimary = connectionIds[0] === c.id;
                  return (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 cursor-pointer select-none py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setConnectionIds((prev) => {
                            if (prev.includes(c.id)) {
                              const next = prev.filter((id) => id !== c.id);
                              if (next.length === 0) setPoolName("");
                              return next;
                            } else {
                              return [...prev, c.id];
                            }
                          });
                        }}
                        className="accent-primary w-3.5 h-3.5 shrink-0"
                      />
                      <span className="text-sm truncate">{connLabel(c)}</span>
                      {isPrimary && (
                        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded shrink-0">
                          {t("wizardPrimaryBadge")}
                        </span>
                      )}
                    </label>
                  );
                })}
                {connections
                  .filter((c) => existingPoolConnectionIds.has(c.id))
                  .map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 cursor-not-allowed select-none py-0.5 opacity-40"
                    >
                      <input
                        type="checkbox"
                        disabled
                        checked={false}
                        readOnly
                        className="w-3.5 h-3.5 shrink-0"
                      />
                      <span className="text-sm truncate">
                        {connLabel(c)} {t("alreadyUsedSuffix")}
                        {connectionPoolName[c.id] ? ` — ${connectionPoolName[c.id]}` : ""}
                      </span>
                    </label>
                  ))}
              </div>
              {connections.length === 0 && (
                <p className="text-[10px] text-amber-400 mt-1">{t("noEligibleConnections")}</p>
              )}
            </div>

            {/* Pool name */}
            {connectionIds.length > 0 && (
              <div>
                <label className="text-[11px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
                  {t("wizardPoolNameLabel")}
                </label>
                <input
                  type="text"
                  value={poolName}
                  onChange={(e) => setPoolName(e.target.value)}
                  placeholder={
                    selectedConn ? selectedConn.provider : t("wizardPoolNamePlaceholder")
                  }
                  className="w-full px-3 py-2 rounded border border-border bg-bg-base text-sm"
                />
              </div>
            )}

            {/* Group picker */}
            {connectionIds.length > 0 && groups.length > 0 && (
              <div>
                <label className="text-[11px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
                  {t("wizardGroupLabel")}
                </label>
                <select
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-border bg-bg-base text-sm"
                >
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Default policy */}
            {connectionIds.length > 0 && (
              <div>
                <label className="text-[11px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
                  {t("policyLabel")}
                </label>
                <div className="flex gap-1">
                  {(["hard", "soft", "burst"] as Policy[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setDefaultPolicy(p)}
                      className={`px-3 py-1.5 rounded-md border text-xs cursor-pointer transition-colors ${
                        defaultPolicy === p
                          ? "bg-primary/15 border-primary/40 text-primary font-semibold"
                          : "border-border text-text-muted hover:text-text-main"
                      }`}
                    >
                      {p === "hard"
                        ? t("policyHard")
                        : p === "soft"
                          ? t("policySoft")
                          : t("policyBurst")}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(2)}
                disabled={connectionIds.length === 0}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("wizardNext")}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Limite ──────────────────────────────────────────── */}
        {step === 2 && (
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div>
              <h2 className="text-sm font-semibold text-text-main mb-0.5">
                {t("wizardStep2Title")}
              </h2>
              <p className="text-[11px] text-text-muted">{t("wizardStep2Subtitle")}</p>
            </div>

            {/* Dimensions editor (ported from ProviderPlanConfigClient) */}
            <div className="rounded-lg border border-border/40 bg-bg-subtle/10 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wide font-bold text-text-muted">
                  {tPlans("dimensionLabel")}
                </span>
                <button
                  type="button"
                  onClick={addDimension}
                  className="text-[11px] text-primary hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  {tPlans("addDimension")}
                </button>
              </div>

              {editDimensions.length === 0 && (
                <div className="text-[11px] text-text-muted italic py-3 text-center">
                  {tPlans("unconfiguredLabel")} — {tPlans("addDimension")}
                </div>
              )}

              <div className="space-y-2">
                {editDimensions.map((dim, i) => (
                  <div
                    key={i}
                    className="grid items-center gap-2"
                    style={{ gridTemplateColumns: "1fr 1fr 90px 24px" }}
                  >
                    <select
                      value={dim.unit}
                      onChange={(e) => updateDimension(i, { unit: e.target.value as QuotaUnit })}
                      className="px-2 py-1.5 rounded border border-border bg-bg-base text-xs"
                    >
                      {UNIT_OPTIONS.map((u) => (
                        <option key={u} value={u}>
                          {tPlans(`unitOptions.${u}`)}
                        </option>
                      ))}
                    </select>
                    <select
                      value={dim.window}
                      onChange={(e) =>
                        updateDimension(i, { window: e.target.value as QuotaWindow })
                      }
                      className="px-2 py-1.5 rounded border border-border bg-bg-base text-xs"
                    >
                      {WINDOW_OPTIONS.map((w) => (
                        <option key={w} value={w}>
                          {tPlans(`windowOptions.${w}`)}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={0}
                      value={dim.limit}
                      onChange={(e) => updateDimension(i, { limit: Number(e.target.value) })}
                      placeholder={tPlans("limitLabel")}
                      className="px-2 py-1.5 rounded border border-border bg-bg-base text-xs tabular-nums text-right"
                    />
                    <button
                      type="button"
                      onClick={() => removeDimension(i)}
                      className="p-0.5 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {dimensionsEdited && (
              <p className="text-[10px] text-amber-400">{t("wizardDimensionsEditedNotice")}</p>
            )}

            {/* Helper note when pool has multiple connections */}
            {connectionIds.length > 1 && (
              <p className="text-[10px] text-text-muted bg-bg-subtle/40 px-3 py-2 rounded border border-border/40">
                {t("wizardAdditionalConnectionsNote")}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-border text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                {t("wizardBack")}
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                {t("wizardNext")}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Chaves ──────────────────────────────────────────── */}
        {step === 3 && (
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div>
              <h2 className="text-sm font-semibold text-text-main mb-0.5">
                {t("wizardStep3Title")}
              </h2>
              <p className="text-[11px] text-text-muted">{t("wizardStep3Subtitle")}</p>
            </div>

            {/* Allocation rows for the edit flow. */}
            {allocations.length === 0 ? (
              <div className="text-[12px] text-text-muted italic py-4 text-center bg-bg-subtle/40 rounded-md">
                {t("noKeysAdded")}
              </div>
            ) : (
              <div className="space-y-2">
                {allocations.map((a, i) => {
                  const color = SLICE_PALETTE[i % SLICE_PALETTE.length];
                  return (
                    <div
                      key={a.apiKeyId}
                      className="grid items-center gap-2"
                      style={{ gridTemplateColumns: "12px minmax(0,1fr) 70px 80px 90px 24px" }}
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-sm"
                        style={{ background: color }}
                      />
                      <span className="text-[12px] font-mono truncate">{keyLabel(a.apiKeyId)}</span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={a.weight}
                        onChange={(e) => updateWeight(a.apiKeyId, Number(e.target.value))}
                        className="px-2 py-1 rounded border border-border bg-bg-base text-sm text-right tabular-nums"
                        title="Weight %"
                      />
                      <input
                        type="number"
                        min={0}
                        value={a.capValue ?? ""}
                        onChange={(e) =>
                          updateCapValue(
                            a.apiKeyId,
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                        placeholder={t("policyCapAbsolutePlaceholder")}
                        className="px-2 py-1 rounded border border-border bg-bg-base text-xs tabular-nums"
                        title={t("policyCapAbsoluteLabel")}
                      />
                      <select
                        value={a.policy}
                        onChange={(e) =>
                          updateAllocationPolicy(a.apiKeyId, e.target.value as Policy)
                        }
                        className="px-1 py-1 rounded border border-border bg-bg-base text-xs"
                      >
                        <option value="hard">{t("policyHard")}</option>
                        <option value="soft">{t("policySoft")}</option>
                        <option value="burst">{t("policyBurst")}</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeAllocation(a.apiKeyId)}
                        className="p-0.5 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add key + equal split controls */}
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border/40">
              <span
                className={`font-bold tabular-nums ${
                  totalWeight === 100
                    ? "text-emerald-400"
                    : totalWeight > 100
                      ? "text-red-400"
                      : "text-amber-400"
                }`}
              >
                {t("totalLabel", { percent: totalWeight })}{" "}
                {totalWeight > 100 && t("totalExceeded")}
              </span>
              <div className="flex items-center gap-2">
                {availableKeys.length > 0 && (
                  <select
                    value=""
                    onChange={(e) => e.target.value && addKey(e.target.value)}
                    className="px-2 py-1 rounded border border-border bg-bg-base text-xs"
                  >
                    <option value="">{t("addKey")}</option>
                    {availableKeys.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.name || k.id.slice(0, 12) + "…"}
                      </option>
                    ))}
                  </select>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={equalSplit}
                  disabled={allocations.length === 0}
                >
                  {t("equalSplit")}
                </Button>
              </div>
            </div>

            {/* Exclusive checkbox */}
            <label className="flex items-start gap-2 cursor-pointer select-none pt-1 border-t border-border/40">
              <input
                type="checkbox"
                checked={exclusive}
                onChange={(e) => setExclusive(e.target.checked)}
                className="mt-0.5 accent-primary w-4 h-4"
              />
              <div>
                <span className="text-sm font-semibold text-text-main">
                  {t("wizardExclusiveLabel")}
                </span>
                <p className="text-[11px] text-text-muted mt-0.5">{t("wizardExclusiveHint")}</p>
              </div>
            </label>

            {/* quotaModelName preview — grouped by provider */}
            {previewByProvider.length > 0 && (
              <div className="rounded-md border border-border/40 bg-bg-subtle/30 p-3 text-[11px]">
                <div className="font-semibold text-text-muted uppercase tracking-wide mb-1.5 text-[10px]">
                  {t("wizardPreviewLabel")}
                </div>
                <div className="space-y-2">
                  {previewByProvider.map(({ provider, names, totalModels }) => {
                    const extra = totalModels - names.length;
                    return (
                      <div key={provider}>
                        {previewByProvider.length > 1 && (
                          <div className="text-[10px] uppercase tracking-wide text-text-muted font-semibold mb-0.5">
                            {provider}
                          </div>
                        )}
                        <div className="space-y-0.5">
                          {names.map((name) => (
                            <div key={name} className="font-mono text-text-main truncate">
                              {name}
                            </div>
                          ))}
                          {extra > 0 && (
                            <div className="text-text-muted italic">
                              {t("wizardPreviewMoreModels", { count: extra })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {error && (
              <p className="text-[11px] text-red-400 bg-red-500/10 px-3 py-2 rounded">{error}</p>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <button
                onClick={() => setStep(2)}
                disabled={saving}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-border text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                {t("wizardBack")}
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => void handleFinish()}
                disabled={totalWeight > 100 || saving}
              >
                {saving ? t("loading") : editPool ? t("saveChanges") : t("wizardCreatePool")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
