"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, ConfirmModal } from "@/shared/components";
import { AddWebhookWizard } from "./components/AddWebhookWizard";
import { HowItWorksSidebar } from "./components/HowItWorksSidebar";
import { WebhooksList } from "./components/WebhooksList";
import type { WebhookItem } from "./components/WebhookCard";

type FeedbackState = { type: "success" | "error"; message: string } | null;

function getStatus(wh: WebhookItem): "active" | "inactive" | "errored" {
  if (!wh.enabled) return "inactive";
  if (wh.failure_count > 0 || (wh.last_status !== null && wh.last_status >= 400)) return "errored";
  return "active";
}

export function WebhooksPageClient() {
  const t = useTranslations("webhooks");

  const [webhooks, setWebhooks] = useState<WebhookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<WebhookItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/webhooks");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("loadFailed"));
      setWebhooks(Array.isArray(data.webhooks) ? data.webhooks : []);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("loadFailed"),
      });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = useMemo(
    () =>
      webhooks.reduce(
        (acc, wh) => {
          acc.total += 1;
          acc[getStatus(wh)] += 1;
          return acc;
        },
        { total: 0, active: 0, inactive: 0, errored: 0 }
      ),
    [webhooks]
  );

  const handleTest = async (wh: WebhookItem) => {
    setTestingId(wh.id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/webhooks/${wh.id}/test`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.delivered === false) throw new Error(data.error || t("testFailed"));
      setFeedback({ type: "success", message: t("testSuccess") });
      await load();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("testFailed"),
      });
    } finally {
      setTestingId(null);
    }
  };

  const handleToggleEnabled = async (wh: WebhookItem) => {
    setFeedback(null);
    try {
      const res = await fetch(`/api/webhooks/${wh.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !wh.enabled }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("saveFailed"));
      setWebhooks((prev) =>
        prev.map((item) => (item.id === wh.id ? { ...item, enabled: !wh.enabled } : item))
      );
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("saveFailed"),
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/webhooks/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("deleteFailed"));
      setWebhooks((prev) => prev.filter((w) => w.id !== deleteTarget.id));
      setDeleteTarget(null);
      setFeedback({ type: "success", message: t("deleteSuccess") });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : t("deleteFailed"),
      });
    } finally {
      setDeleting(false);
    }
  };

  const tFn = (key: string, opts?: Record<string, unknown>) =>
    opts ? t(key as any, opts as any) : t(key as any);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-text-main">{t("title")}</h1>
          <p className="mt-0.5 text-sm text-text-muted">{t("description")}</p>
        </div>
        <button
          type="button"
          onClick={() => setWizardOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          {t("addWebhook")}
        </button>
      </div>

      {feedback && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: t("total"), value: stats.total, icon: "webhook", tone: "text-primary" },
              {
                label: t("active"),
                value: stats.active,
                icon: "check_circle",
                tone: "text-emerald-500",
              },
              {
                label: t("inactive"),
                value: stats.inactive,
                icon: "pause_circle",
                tone: "text-text-muted",
              },
              { label: t("errored"), value: stats.errored, icon: "error", tone: "text-red-500" },
            ].map((stat) => (
              <Card key={stat.label} className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-text-main">{stat.value}</p>
                  </div>
                  <span className={`material-symbols-outlined text-[24px] ${stat.tone}`}>
                    {stat.icon}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden">
            <div className="border-b border-border p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-text-main">
                    {t("configuredWebhooks")}
                  </h2>
                  <p className="mt-1 text-xs text-text-muted">{t("configuredWebhooksDesc")}</p>
                </div>
                <button
                  type="button"
                  onClick={() => void load()}
                  disabled={loading}
                  title={t("refresh")}
                  className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:bg-surface/60 hover:text-text-main disabled:opacity-40"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}
                  >
                    refresh
                  </span>
                </button>
              </div>
            </div>
            <div className="p-4">
              <WebhooksList
                webhooks={webhooks}
                loading={loading}
                testingId={testingId}
                t={tFn}
                onTest={(wh) => void handleTest(wh)}
                onToggleEnabled={(wh) => void handleToggleEnabled(wh)}
                onEdit={() => setWizardOpen(true)}
                onDelete={setDeleteTarget}
              />
            </div>
          </Card>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-4">
            <HowItWorksSidebar t={tFn} />
          </div>
        </aside>
      </div>

      <AddWebhookWizard
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onCreated={async () => {
          await load();
        }}
        t={tFn}
      />

      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={t("delete")}
        message={t("deleteConfirm")}
        confirmText={t("delete")}
        cancelText={t("wizard.cancel")}
        loading={deleting}
      />
    </div>
  );
}
