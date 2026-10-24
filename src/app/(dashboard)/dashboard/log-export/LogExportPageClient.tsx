"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import EmptyState from "@/shared/components/EmptyState";
import Loading from "@/shared/components/Loading";
import { ConfirmModal } from "@/shared/components/Modal";
import { DestinationCard } from "./components/DestinationCard";
import { DestinationFormModal } from "./components/DestinationFormModal";
import type { LogExportDestination, LogExportStatus, LogExportTypeDescriptor } from "./types";

type Feedback = { type: "success" | "error"; message: string } | null;

interface SubmitPayload {
  name: string;
  type: string;
  enabled: boolean;
  config: Record<string, unknown>;
  batchSize: number;
  includeBodies: boolean;
  maxBodyBytes: number;
  maxRowsPerRun: number;
}

interface ApiErrorPayload {
  error?: string | { message?: string; details?: Array<{ field: string; message: string }> };
}

function errorText(payload: ApiErrorPayload | undefined, fallback: string): string {
  const error = payload?.error;
  if (typeof error === "string") return error;
  if (error?.message) {
    const details = Array.isArray(error.details)
      ? error.details.map((detail) => `${detail.field}: ${detail.message}`).join(", ")
      : "";
    return details ? `${error.message} (${details})` : error.message;
  }
  return fallback;
}

export function LogExportPageClient() {
  const t = useTranslations("logExport");
  const [status, setStatus] = useState<LogExportStatus | null>(null);
  const [types, setTypes] = useState<LogExportTypeDescriptor[]>([]);
  const [loading, setLoading] = useState(true);
  const tc = useTranslations("common");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<LogExportDestination | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState<{ id: string; action: "test" | "run" | "toggle" } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LogExportDestination | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    try {
      const [statusRes, typesRes] = await Promise.all([
        fetch("/api/log-export/status"),
        fetch("/api/log-export/types"),
      ]);
      const statusData = await statusRes.json().catch(() => ({}));
      const typesData = await typesRes.json().catch(() => ({}));
      if (!statusRes.ok) throw new Error(errorText(statusData, t("errLoadStatus")));
      setStatus(statusData as LogExportStatus);
      setTypes(Array.isArray(typesData.types) ? typesData.types : []);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("errLoadStatus"),
      });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void (async () => {
      await load();
    })();
  }, [load]);

  const handleSubmit = async (payload: SubmitPayload) => {
    setSaving(true);
    setFormError(null);
    try {
      const url = editing
        ? `/api/log-export/destinations/${editing.id}`
        : "/api/log-export/destinations";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing ? { ...payload, type: undefined } : payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(errorText(data, t("errSaveDestination")));
      setFormOpen(false);
      setEditing(null);
      setFeedback({ type: "success", message: t("msgDestinationSaved") });
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t("errSaveDestination"));
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async (destination: LogExportDestination) => {
    setBusy({ id: destination.id, action: "test" });
    setFeedback(null);
    try {
      const res = await fetch(`/api/log-export/destinations/${destination.id}/test`, {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      setFeedback({
        type: data.ok ? "success" : "error",
        message: data.detail || errorText(data, t("errConnectionTest")),
      });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("errConnectionTest"),
      });
    } finally {
      setBusy(null);
    }
  };

  const handleRun = async (destination: LogExportDestination) => {
    setBusy({ id: destination.id, action: "run" });
    setFeedback(null);
    try {
      const res = await fetch(`/api/log-export/destinations/${destination.id}/run`, {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(errorText(data, t("errExportRun")));
      const result = data.result;
      let message: string;
      if (result?.skipped) {
        message = t("msgRunInFlight");
      } else if (result?.success) {
        message = `Exported ${result.exported} rows in ${result.batches} batch(es). ${result.pendingAfterRun} still pending.`;
      } else {
        message = result?.error || t("errExportRun");
      }
      setFeedback({ type: result?.success ? "success" : "error", message });
      await load();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("errExportRun"),
      });
    } finally {
      setBusy(null);
    }
  };

  const handleToggle = async (destination: LogExportDestination) => {
    setBusy({ id: destination.id, action: "toggle" });
    try {
      const res = await fetch(`/api/log-export/destinations/${destination.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !destination.enabled }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(errorText(data, t("errUpdateDestination")));
      await load();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("errUpdateDestination"),
      });
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/log-export/destinations/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(errorText(data, t("errDeleteDestination")));
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("errDeleteDestination"),
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;

  const destinations = status?.destinations ?? [];
  const lastRun = status?.runs?.[0] ?? null;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        compact
        title={t("pageTitle")}
        description={t("pageSubtitle")}
        actions={
          <Button
            icon="add"
            onClick={() => {
              setEditing(null);
              setFormError(null);
              setFormOpen(true);
            }}
          >
            {t("addDestination")}
          </Button>
        }
      />

      {feedback ? (
        <Alert
          variant={feedback.type === "success" ? "success" : "critical"}
          description={feedback.message}
          dismissLabel={tc("dismissNotification")}
          onDismiss={() => setFeedback(null)}
        />
      ) : null}

      <Card padding="sm" title={t("scheduleTitle")}>
        <div className="grid gap-3 text-xs text-text-muted sm:grid-cols-3">
          <div>
            <span className="block text-text-main">{t("cronLabel")}</span>
            {status?.job?.cron ?? t("notScheduled")} ({status?.job?.timezone ?? "UTC"})
          </div>
          <div>
            <span className="block text-text-main">{t("lastScheduledRun")}</span>
            {lastRun
              ? t("lastRunSummary", {
                  startedAt: new Date(lastRun.startedAt).toLocaleString(),
                  status: lastRun.status,
                  rows: lastRun.recordsAffected,
                })
              : t("never")}
          </div>
          <div>
            <span className="block text-text-main">{t("highWaterMark")}</span>
            {t("rowPrefix", { id: status?.maxCallLogRowId ?? 0 })}
          </div>
        </div>
      </Card>

      {destinations.length === 0 ? (
        <EmptyState
          icon="cloud_upload"
          title={t("noDestinations")}
          description={t("noDestinationsHint")}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              busy={busy?.id === destination.id ? busy.action : null}
              onTest={() => void handleTest(destination)}
              onRun={() => void handleRun(destination)}
              onToggle={() => void handleToggle(destination)}
              onEdit={() => {
                setEditing(destination);
                setFormError(null);
                setFormOpen(true);
              }}
              onDelete={() => setDeleteTarget(destination)}
            />
          ))}
        </div>
      )}

      <DestinationFormModal
        open={formOpen}
        types={types}
        editing={editing}
        saving={saving}
        error={formError}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        variant="danger"
        title={t("deleteTitle")}
        message={t("deleteConfirm", { name: deleteTarget?.name ?? "" })}
      />
    </div>
  );
}
