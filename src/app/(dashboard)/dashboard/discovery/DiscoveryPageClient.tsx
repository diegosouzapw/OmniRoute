"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, Input, Badge, EmptyState, Spinner, ConfirmModal } from "@/shared/components";

interface DiscoveryResult {
  id: number;
  providerId: string;
  method: string;
  endpoint?: string | null;
  authType: string;
  models?: string[];
  rateLimit?: string | null;
  feasibility: number;
  riskLevel: string;
  status: string;
  notes?: string | null;
  discoveredAt?: string;
  verifiedAt?: string | null;
}

type Feedback = { type: "success" | "error"; message: string } | null;
type Translate = ReturnType<typeof useTranslations>;

type BadgeVariant = "default" | "success" | "warning" | "error";

const RISK_VARIANT: Record<string, BadgeVariant> = {
  none: "success",
  low: "success",
  medium: "warning",
  high: "error",
  critical: "error",
};

const STATUS_VARIANT: Record<string, BadgeVariant> = {
  verified: "success",
  testing: "warning",
  pending: "default",
  rejected: "error",
};

/** Run a fetch, surface a localized error via `setFeedback`, and report success. */
async function callApi(
  fn: () => Promise<Response>,
  t: Translate,
  failKey: string,
  setFeedback: (f: Feedback) => void
): Promise<boolean> {
  setFeedback(null);
  try {
    const res = await fn();
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.message || t(failKey));
    return true;
  } catch (err) {
    setFeedback({ type: "error", message: err instanceof Error ? err.message : t(failKey) });
    return false;
  }
}

/** Results list + loading + feedback state, plus the reload function. */
function useDiscoveryResults(t: Translate) {
  const [results, setResults] = useState<DiscoveryResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/discovery/results");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error?.message || t("loadFailed"));
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : t("loadFailed") });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  return { results, loading, feedback, setFeedback, load };
}

/** Scan / verify / delete actions and their transient state. */
function useDiscoveryActions(
  t: Translate,
  load: () => Promise<void>,
  setFeedback: (f: Feedback) => void
) {
  const [scanTarget, setScanTarget] = useState("");
  const [scanning, setScanning] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DiscoveryResult | null>(null);

  const scan = useCallback(async () => {
    const providerId = scanTarget.trim();
    if (!providerId) return;
    setScanning(true);
    const ok = await callApi(
      () =>
        fetch("/api/discovery/scan", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ providerId }),
        }),
      t,
      "scanFailed",
      setFeedback
    );
    setScanning(false);
    if (ok) {
      setScanTarget("");
      setFeedback({ type: "success", message: t("scanQueued", { provider: providerId }) });
      await load();
    }
  }, [scanTarget, t, load, setFeedback]);

  const verify = useCallback(
    async (row: DiscoveryResult) => {
      setBusyId(row.id);
      const ok = await callApi(
        () => fetch(`/api/discovery/verify/${row.id}`, { method: "POST" }),
        t,
        "verifyFailed",
        setFeedback
      );
      setBusyId(null);
      if (ok) await load();
    },
    [t, load, setFeedback]
  );

  const remove = useCallback(async () => {
    if (!deleteTarget) return;
    setBusyId(deleteTarget.id);
    const ok = await callApi(
      () => fetch(`/api/discovery/results/${deleteTarget.id}`, { method: "DELETE" }),
      t,
      "deleteFailed",
      setFeedback
    );
    setBusyId(null);
    if (ok) {
      setDeleteTarget(null);
      await load();
    }
  }, [deleteTarget, t, load, setFeedback]);

  return {
    scanTarget,
    setScanTarget,
    scanning,
    busyId,
    deleteTarget,
    setDeleteTarget,
    scan,
    verify,
    remove,
  };
}

/** State + data orchestration for the discovery page, kept out of the view. */
function useDiscovery() {
  const t = useTranslations("discovery");
  const { results, loading, feedback, setFeedback, load } = useDiscoveryResults(t);
  const actions = useDiscoveryActions(t, load, setFeedback);
  return { t, results, loading, feedback, ...actions };
}

function DiscoveryScanForm({
  t,
  value,
  onChange,
  onScan,
  scanning,
}: {
  t: Translate;
  value: string;
  onChange: (v: string) => void;
  onScan: () => void;
  scanning: boolean;
}) {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium" htmlFor="discovery-scan-target">
            {t("scanLabel")}
          </label>
          <Input
            id="discovery-scan-target"
            value={value}
            placeholder={t("scanPlaceholder")}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onScan();
            }}
          />
        </div>
        <Button onClick={onScan} disabled={scanning || !value.trim()}>
          {scanning ? t("scanning") : t("scan")}
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{t("localOnlyNote")}</p>
    </Card>
  );
}

function DiscoveryResultCard({
  t,
  row,
  busy,
  onVerify,
  onDelete,
}: {
  t: Translate;
  row: DiscoveryResult;
  busy: boolean;
  onVerify: () => void;
  onDelete: () => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{row.providerId}</span>
            <Badge variant={STATUS_VARIANT[row.status] ?? "default"}>{row.status}</Badge>
            <Badge variant={RISK_VARIANT[row.riskLevel] ?? "default"}>
              {t("risk")}: {row.riskLevel}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            {t("method")}: {row.method} · {t("auth")}: {row.authType} · {t("feasibility")}:{" "}
            {row.feasibility}/5
          </div>
          {row.endpoint && (
            <div className="text-xs text-muted-foreground break-all">{row.endpoint}</div>
          )}
          {row.models && row.models.length > 0 && (
            <div className="text-xs text-muted-foreground">
              {t("models")}: {row.models.join(", ")}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {row.status !== "verified" && (
            <Button variant="secondary" onClick={onVerify} disabled={busy}>
              {t("verify")}
            </Button>
          )}
          <Button variant="danger" onClick={onDelete} disabled={busy}>
            {t("delete")}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function DiscoveryPageClient() {
  const d = useDiscovery();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">{d.t("title")}</h1>
        <p className="text-sm text-muted-foreground">{d.t("subtitle")}</p>
      </header>

      <DiscoveryScanForm
        t={d.t}
        value={d.scanTarget}
        onChange={d.setScanTarget}
        onScan={() => void d.scan()}
        scanning={d.scanning}
      />

      {d.feedback && (
        <div
          role="status"
          className={
            d.feedback.type === "error"
              ? "rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
              : "rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700"
          }
        >
          {d.feedback.message}
        </div>
      )}

      {d.loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : d.results.length === 0 ? (
        <EmptyState title={d.t("emptyTitle")} description={d.t("emptyDescription")} />
      ) : (
        <ul className="space-y-3">
          {d.results.map((row) => (
            <li key={row.id}>
              <DiscoveryResultCard
                t={d.t}
                row={row}
                busy={d.busyId === row.id}
                onVerify={() => void d.verify(row)}
                onDelete={() => d.setDeleteTarget(row)}
              />
            </li>
          ))}
        </ul>
      )}

      <ConfirmModal
        isOpen={d.deleteTarget !== null}
        title={d.t("deleteTitle")}
        message={d.t("deleteConfirm", { provider: d.deleteTarget?.providerId ?? "" })}
        confirmText={d.t("delete")}
        onConfirm={() => void d.remove()}
        onClose={() => d.setDeleteTarget(null)}
      />
    </div>
  );
}
