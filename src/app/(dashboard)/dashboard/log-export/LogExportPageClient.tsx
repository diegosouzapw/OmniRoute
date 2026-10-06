"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Card, ConfirmModal, EmptyState, Loading } from "@/shared/components";
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
  const [status, setStatus] = useState<LogExportStatus | null>(null);
  const [types, setTypes] = useState<LogExportTypeDescriptor[]>([]);
  const [loading, setLoading] = useState(true);
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
      if (!statusRes.ok) throw new Error(errorText(statusData, "Failed to load export status"));
      setStatus(statusData as LogExportStatus);
      setTypes(Array.isArray(typesData.types) ? typesData.types : []);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to load export status",
      });
    } finally {
      setLoading(false);
    }
  }, []);

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
      if (!res.ok) throw new Error(errorText(data, "Failed to save destination"));
      setFormOpen(false);
      setEditing(null);
      setFeedback({ type: "success", message: "Destination saved." });
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save destination");
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
        message: data.detail || errorText(data, "Connection test failed"),
      });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Connection test failed",
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
      if (!res.ok) throw new Error(errorText(data, "Export run failed"));
      const result = data.result;
      let message: string;
      if (result?.skipped) {
        message = "A run for this destination is already in flight; nothing was sent twice.";
      } else if (result?.success) {
        message = `Exported ${result.exported} rows in ${result.batches} batch(es). ${result.pendingAfterRun} still pending.`;
      } else {
        message = result?.error || "Export run failed";
      }
      setFeedback({ type: result?.success ? "success" : "error", message });
      await load();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Export run failed",
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
      if (!res.ok) throw new Error(errorText(data, "Failed to update destination"));
      await load();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to update destination",
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
      if (!res.ok) throw new Error(errorText(data, "Failed to delete destination"));
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to delete destination",
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
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-text-main">Log export</h1>
          <p className="text-xs text-text-muted">
            Continuously ship the call logs from the Logs tab to an external analytics store.
          </p>
        </div>
        <Button
          icon="add"
          onClick={() => {
            setEditing(null);
            setFormError(null);
            setFormOpen(true);
          }}
        >
          Add destination
        </Button>
      </div>

      {feedback ? (
        <p
          className={
            feedback.type === "success"
              ? "rounded-control bg-green-500/10 p-2 text-xs text-green-600 dark:text-green-400"
              : "rounded-control bg-red-500/10 p-2 text-xs text-red-600 dark:text-red-400"
          }
        >
          {feedback.message}
        </p>
      ) : null}

      <Card padding="sm" title="Schedule">
        <div className="grid gap-3 text-xs text-text-muted sm:grid-cols-3">
          <div>
            <span className="block text-text-main">Cron</span>
            {status?.job?.cron ?? "not scheduled"} ({status?.job?.timezone ?? "UTC"})
          </div>
          <div>
            <span className="block text-text-main">Last scheduled run</span>
            {lastRun
              ? `${new Date(lastRun.startedAt).toLocaleString()} — ${lastRun.status}, ${lastRun.recordsAffected} rows`
              : "never"}
          </div>
          <div>
            <span className="block text-text-main">Call logs high-water mark</span>
            row {status?.maxCallLogRowId ?? 0}
          </div>
        </div>
      </Card>

      {destinations.length === 0 ? (
        <EmptyState
          icon="cloud_upload"
          title="No export destinations"
          description="Add a destination to start shipping call logs on the hourly schedule."
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
        title="Delete destination"
        message={`Delete "${deleteTarget?.name ?? ""}"? Its export cursor is removed too, so re-adding it starts from the oldest retained call log.`}
      />
    </div>
  );
}
