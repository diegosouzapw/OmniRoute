"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/components";
import type { QuotaPool, Policy, QuotaDimension } from "@/lib/quota/dimensions";

interface Connection {
  id: string;
  provider: string;
  name?: string;
  displayName?: string;
  email?: string;
}

interface PlanInfo {
  dimensions: QuotaDimension[];
  source: "auto" | "manual";
}

interface CreatePoolModalProps {
  connections: Connection[];
  plans: Record<string, PlanInfo>;
  existingPools: QuotaPool[];
  onClose: () => void;
  onCreate: (pool: Omit<QuotaPool, "id" | "createdAt">) => Promise<void>;
}

export default function CreatePoolModal({
  connections,
  plans,
  existingPools,
  onClose,
  onCreate,
}: CreatePoolModalProps) {
  const t = useTranslations("quotaShare");
  const [connectionId, setConnectionId] = useState("");
  const [name, setName] = useState("");
  const [defaultPolicy, setDefaultPolicy] = useState<Policy>("hard");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const usedConnectionIds = useMemo(
    () => new Set(existingPools.map((p) => p.connectionId)),
    [existingPools]
  );

  const selectedConn = connections.find((c) => c.id === connectionId);
  const planInfo = connectionId ? plans[connectionId] : undefined;
  const hasPlan = planInfo && planInfo.dimensions.length > 0;

  const connLabel = (c: Connection) =>
    `${c.provider} / ${c.name || c.email || c.displayName || c.id.slice(0, 12)}`;

  const handleCreate = async () => {
    if (!selectedConn) return;
    if (usedConnectionIds.has(connectionId)) {
      setError(t("duplicatePoolError"));
      return;
    }
    const poolName = name.trim() || connLabel(selectedConn);
    setSaving(true);
    setError(null);
    try {
      await onCreate({
        connectionId,
        name: poolName,
        allocations: [],
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create pool");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title={t("newPoolTitle")}>
      <div className="space-y-3">
        {/* Connection selector */}
        <div>
          <label className="text-[11px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
            {t("providerConnection")}
          </label>
          <select
            value={connectionId}
            onChange={(e) => {
              setConnectionId(e.target.value);
              setName("");
            }}
            className="w-full px-3 py-2 rounded border border-border bg-bg-base text-sm"
          >
            <option value="">{t("selectConnection")}</option>
            {connections.map((c) => (
              <option key={c.id} value={c.id} disabled={usedConnectionIds.has(c.id)}>
                {connLabel(c)} {usedConnectionIds.has(c.id) ? t("alreadyUsedSuffix") : ""}
              </option>
            ))}
          </select>
          {connections.length === 0 && (
            <p className="text-[10px] text-amber-400 mt-1">{t("noEligibleConnections")}</p>
          )}
        </div>

        {/* Pool name */}
        {connectionId && (
          <div>
            <label className="text-[11px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
              Pool name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={selectedConn ? connLabel(selectedConn) : "My quota pool"}
              className="w-full px-3 py-2 rounded border border-border bg-bg-base text-sm"
            />
          </div>
        )}

        {/* Default policy */}
        {connectionId && (
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
                  {p === "hard" ? t("policyHard") : p === "soft" ? t("policySoft") : t("policyBurst")}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Plan info */}
        {connectionId && hasPlan && (
          <div className="rounded-md border border-border/40 bg-bg-subtle/30 p-3 text-[11px] text-text-muted">
            <div className="font-semibold text-text-main mb-1">
              {t("multiDimensionLabel")} ({planInfo.source})
            </div>
            {planInfo.dimensions.map((d, i) => (
              <div key={i}>
                {d.unit} / {d.window}: {d.limit}
              </div>
            ))}
          </div>
        )}

        {/* Cap absolute notice */}
        {connectionId && (
          <div className="text-[10px] text-text-muted">
            <span className="font-semibold">{t("policyCapAbsoluteLabel")}:</span>{" "}
            {t("policyCapAbsolutePlaceholder")}
          </div>
        )}

        {error && (
          <p className="text-[11px] text-red-400 bg-red-500/10 px-3 py-2 rounded">{error}</p>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={saving}>
            {t("cancel")}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleCreate}
            disabled={!selectedConn || saving}
          >
            {saving ? t("loading") : t("createPool")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
