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

export function DiscoveryPageClient() {
  const t = useTranslations("discovery");

  const [results, setResults] = useState<DiscoveryResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanTarget, setScanTarget] = useState("");
  const [scanning, setScanning] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DiscoveryResult | null>(null);
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

  const handleScan = async () => {
    const providerId = scanTarget.trim();
    if (!providerId) return;
    setScanning(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/discovery/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ providerId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error?.message || t("scanFailed"));
      setScanTarget("");
      setFeedback({ type: "success", message: t("scanQueued", { provider: providerId }) });
      await load();
    } catch (err) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : t("scanFailed") });
    } finally {
      setScanning(false);
    }
  };

  const handleVerify = async (row: DiscoveryResult) => {
    setBusyId(row.id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/discovery/verify/${row.id}`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error?.message || t("verifyFailed"));
      await load();
    } catch (err) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : t("verifyFailed") });
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setBusyId(deleteTarget.id);
    try {
      const res = await fetch(`/api/discovery/results/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error?.message || t("deleteFailed"));
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : t("deleteFailed") });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </header>

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium" htmlFor="discovery-scan-target">
              {t("scanLabel")}
            </label>
            <Input
              id="discovery-scan-target"
              value={scanTarget}
              placeholder={t("scanPlaceholder")}
              onChange={(e) => setScanTarget(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleScan();
              }}
            />
          </div>
          <Button onClick={() => void handleScan()} disabled={scanning || !scanTarget.trim()}>
            {scanning ? t("scanning") : t("scan")}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{t("localOnlyNote")}</p>
      </Card>

      {feedback && (
        <div
          role="status"
          className={
            feedback.type === "error"
              ? "rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
              : "rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700"
          }
        >
          {feedback.message}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : results.length === 0 ? (
        <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <ul className="space-y-3">
          {results.map((row) => (
            <li key={row.id}>
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
                      <Button
                        variant="secondary"
                        onClick={() => void handleVerify(row)}
                        disabled={busyId === row.id}
                      >
                        {t("verify")}
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => setDeleteTarget(row)}
                      disabled={busyId === row.id}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title={t("deleteTitle")}
        message={t("deleteConfirm", { provider: deleteTarget?.providerId ?? "" })}
        confirmText={t("delete")}
        onConfirm={() => void handleDelete()}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
