"use client";

/**
 * Conductor panel (PRD Conductor RF3): fleet + task queue live view over the
 * /api/conductor proxy routes. The browser never talks to the hub — everything
 * goes through the server-side proxy (hub token stays in server env).
 */

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Badge, Card, ConfirmModal, DataTable, EmptyState, Modal } from "@/shared/components";

import FaroChat from "./FaroChat";

interface FleetRunner {
  id: string;
  name: string;
  clis: string[];
  online: boolean;
  draining: boolean;
}

interface FleetTask {
  id: string;
  status: string;
  mode: string;
  repo: string | null;
  runner: string | null;
  summary: string | null;
  branch: string | null;
  error: string | null;
  updated_at: string | null;
}

interface FleetSnapshot {
  offline: boolean;
  runners: FleetRunner[];
  tasks: FleetTask[];
}

interface TaskDetail extends FleetTask {
  prompt: string | null;
  base_ref: string | null;
  council: { candidate_task_ids?: string[] } | null;
}

const REFRESH_MS = 5000;
const TERMINAL = new Set(["completed", "failed", "canceled"]);

function statusVariant(status: string): "success" | "error" | "warning" | "info" | "default" {
  if (status === "completed") return "success";
  if (status === "failed") return "error";
  if (status === "canceled" || status === "input_required") return "warning";
  if (status === "working") return "info";
  return "default";
}

export default function ConductorPageClient() {
  const t = useTranslations("conductor");
  const [snapshot, setSnapshot] = useState<FleetSnapshot | null>(null);
  const [detail, setDetail] = useState<TaskDetail | null>(null);
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/conductor/fleet");
      if (res.ok) setSnapshot(await res.json());
    } catch {
      // rede local instável: mantém o último snapshot; o banner offline vem do servidor
    }
  }, []);

  useEffect(() => {
    void load();
    const timer = setInterval(() => void load(), REFRESH_MS);
    return () => clearInterval(timer);
  }, [load]);

  const openDetail = async (taskId: string) => {
    setErr("");
    try {
      const res = await fetch(`/api/conductor/tasks/${encodeURIComponent(taskId)}`);
      if (res.ok) setDetail(await res.json());
      else setErr(`${t("error")}: HTTP ${res.status}`);
    } catch {
      setErr(t("error"));
    }
  };

  const confirmCancel = async () => {
    if (!cancelTarget) return;
    setCanceling(true);
    setErr("");
    try {
      const res = await fetch(`/api/conductor/tasks/${encodeURIComponent(cancelTarget)}/cancel`, { method: "POST" });
      if (!res.ok) setErr(`${t("cancelFailed")} (HTTP ${res.status})`);
      else {
        setDetail(null);
        await load();
      }
    } catch {
      setErr(t("cancelFailed"));
    } finally {
      setCanceling(false);
      setCancelTarget(null);
    }
  };

  const runners = snapshot?.runners ?? [];
  const tasks = snapshot?.tasks ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="text-sm text-text-muted">{t("subtitle")}</p>
      </div>

      {err && <Badge variant="error">{err}</Badge>}

      {snapshot?.offline ? (
        <Card>
          <EmptyState icon="cloud_off" title={t("hubOffline")} />
        </Card>
      ) : (
        <>
          <Card title={t("runners")}>
            <DataTable
              columns={[
                { key: "name", label: t("colName") },
                { key: "clis", label: t("colClis") },
                { key: "status", label: t("colStatus") },
              ]}
              data={runners.map((r) => ({ ...r, id: r.id }))}
              emptyMessage={t("noRunners")}
              loading={snapshot === null}
              renderCell={(row, column) => {
                const r = row as unknown as FleetRunner;
                if (column.key === "name") return <span className="font-medium">{r.name}</span>;
                if (column.key === "clis") return r.clis.join(" / ");
                if (r.draining) return <Badge variant="warning" dot>{t("draining")}</Badge>;
                return r.online ? (
                  <Badge variant="success" dot>{t("online")}</Badge>
                ) : (
                  <Badge variant="error" dot>{t("offline")}</Badge>
                );
              }}
            />
          </Card>

          <Card title={t("tasks")}>
            <DataTable
              columns={[
                { key: "id", label: t("colTask") },
                { key: "status", label: t("colStatus") },
                { key: "mode", label: t("colMode") },
                { key: "runner", label: t("colRunner") },
                { key: "summary", label: t("colSummary"), maxWidth: "28rem" },
              ]}
              data={tasks.map((task) => ({ ...task, id: task.id }))}
              emptyMessage={t("noTasks")}
              loading={snapshot === null}
              onRowClick={(row) => void openDetail(String(row.id))}
              renderCell={(row, column) => {
                const task = row as unknown as FleetTask;
                if (column.key === "status") return <Badge variant={statusVariant(task.status)} dot>{task.status}</Badge>;
                if (column.key === "id") return <code className="text-xs">{task.id}</code>;
                if (column.key === "summary") return task.summary ?? task.error ?? "—";
                return (task as unknown as Record<string, unknown>)[column.key]?.toString() ?? "—";
              }}
            />
          </Card>
        </>
      )}

      <FaroChat />

      <Modal isOpen={detail !== null} onClose={() => setDetail(null)} title={t("detailTitle")} size="lg">
        {detail && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <code className="text-xs">{detail.id}</code>
              <Badge variant={statusVariant(detail.status)} dot>{detail.status}</Badge>
              <Badge>{detail.mode}</Badge>
              {detail.runner && <Badge variant="info">{detail.runner}</Badge>}
            </div>
            {detail.prompt && (
              <div>
                <div className="font-medium">{t("prompt")}</div>
                <pre className="whitespace-pre-wrap text-xs bg-black/5 dark:bg-white/5 rounded p-2">{detail.prompt}</pre>
              </div>
            )}
            {detail.summary && <p>{detail.summary}</p>}
            {detail.error && <Badge variant="error">{detail.error}</Badge>}
            {detail.branch && (
              <div>
                <div className="font-medium">{t("branch")}</div>
                <code className="text-xs">{detail.branch}</code>
                <p className="text-xs text-text-muted">{t("fetchHint", { branch: detail.branch })}</p>
              </div>
            )}
            {detail.mode.startsWith("council") && detail.council?.candidate_task_ids && (
              <div>
                <div className="font-medium">{t("council")}</div>
                <p className="text-xs">
                  {t("candidates")}: {detail.council.candidate_task_ids.join(", ")}
                </p>
              </div>
            )}
            {!TERMINAL.has(detail.status) && (
              <button
                type="button"
                className="text-sm text-red-600 dark:text-red-400 underline"
                onClick={() => setCancelTarget(detail.id)}
              >
                {t("cancel")}
              </button>
            )}
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={cancelTarget !== null}
        onClose={() => setCancelTarget(null)}
        onConfirm={confirmCancel}
        title={t("cancelConfirmTitle")}
        message={t("cancelConfirmMessage")}
        confirmText={t("cancel")}
        loading={canceling}
      />
    </div>
  );
}
