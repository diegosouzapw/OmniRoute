"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, ConfirmModal, Modal } from "@/shared/components";

type WebhookItem = {
  id: string;
  url: string;
  events: string[];
  secret: string | null;
  enabled: boolean;
  description: string;
  created_at: string;
  last_triggered_at: string | null;
  last_status: number | null;
  failure_count: number;
};

type WebhookFormState = {
  url: string;
  name: string;
  secret: string;
  events: string[];
  enabled: boolean;
};

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

const WEBHOOK_EVENTS = [
  "request.completed",
  "request.failed",
  "provider.error",
  "provider.recovered",
  "quota.exceeded",
  "combo.switched",
] as const;

const EMPTY_FORM: WebhookFormState = {
  url: "",
  name: "",
  secret: "",
  events: ["*"],
  enabled: true,
};

function getWebhookStatus(webhook: WebhookItem): "active" | "inactive" | "errored" {
  if (!webhook.enabled) return "inactive";
  if (webhook.failure_count > 0 || (webhook.last_status !== null && webhook.last_status >= 400)) {
    return "errored";
  }
  return "active";
}

export default function WebhooksPage() {
  const t = useTranslations("webhooks");
  const tc = useTranslations("common");
  const [webhooks, setWebhooks] = useState<WebhookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [form, setForm] = useState<WebhookFormState>(EMPTY_FORM);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [editingWebhook, setEditingWebhook] = useState<WebhookItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WebhookItem | null>(null);

  const loadWebhooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/webhooks");
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || t("loadFailed"));
      }
      setWebhooks(Array.isArray(data.webhooks) ? data.webhooks : []);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("loadFailed"),
      });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadWebhooks();
  }, [loadWebhooks]);

  const stats = useMemo(() => {
    return webhooks.reduce(
      (acc, webhook) => {
        const status = getWebhookStatus(webhook);
        acc.total += 1;
        acc[status] += 1;
        return acc;
      },
      { total: 0, active: 0, inactive: 0, errored: 0 }
    );
  }, [webhooks]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setFormMode(null);
    setEditingWebhook(null);
  };

  const openCreateModal = () => {
    setFeedback(null);
    setForm(EMPTY_FORM);
    setFormMode("create");
    setEditingWebhook(null);
  };

  const openEditModal = (webhook: WebhookItem) => {
    setFeedback(null);
    setFormMode("edit");
    setEditingWebhook(webhook);
    setForm({
      url: webhook.url,
      name: webhook.description || "",
      secret: "",
      events: webhook.events.length > 0 ? webhook.events : ["*"],
      enabled: webhook.enabled,
    });
  };

  const closeModal = () => {
    if (saving) return;
    resetForm();
  };

  const toggleEvent = (eventName: string) => {
    setForm((prev) => {
      if (eventName === "*") {
        return { ...prev, events: ["*"] };
      }

      if (prev.events.includes("*")) {
        return { ...prev, events: [eventName] };
      }

      const nextEvents = prev.events.includes(eventName)
        ? prev.events.filter((event) => event !== eventName)
        : [...prev.events, eventName];

      return { ...prev, events: nextEvents.length > 0 ? nextEvents : ["*"] };
    });
  };

  const saveWebhook = async () => {
    if (!form.url.trim()) return;

    setSaving(true);
    setFeedback(null);

    const payload: Record<string, unknown> = {
      url: form.url.trim(),
      events: form.events,
      description: form.name.trim(),
      enabled: form.enabled,
    };

    if (form.secret.trim()) {
      payload.secret = form.secret.trim();
    }

    const isEditing = formMode === "edit" && Boolean(editingWebhook?.id);

    try {
      const response = await fetch(
        isEditing ? `/api/webhooks/${editingWebhook?.id}` : "/api/webhooks",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || t("saveFailed"));
      }

      setFeedback({ type: "success", message: t("saveSuccess") });
      resetForm();
      await loadWebhooks();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("saveFailed"),
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleEnabled = async (webhook: WebhookItem) => {
    setFeedback(null);
    try {
      const response = await fetch(`/api/webhooks/${webhook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !webhook.enabled }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || t("saveFailed"));
      }

      setWebhooks((prev) =>
        prev.map((item) => (item.id === webhook.id ? { ...item, enabled: !webhook.enabled } : item))
      );
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("saveFailed"),
      });
    }
  };

  const testWebhook = async (webhook: WebhookItem) => {
    setTestingId(webhook.id);
    setFeedback(null);
    try {
      const response = await fetch(`/api/webhooks/${webhook.id}/test`, { method: "POST" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.delivered === false) {
        throw new Error(data.error || t("testFailed"));
      }

      setFeedback({ type: "success", message: t("testSuccess") });
      await loadWebhooks();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("testFailed"),
      });
    } finally {
      setTestingId(null);
    }
  };

  const deleteWebhook = async () => {
    if (!deleteTarget) return;

    setSaving(true);
    setFeedback(null);
    try {
      const response = await fetch(`/api/webhooks/${deleteTarget.id}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || t("deleteFailed"));
      }

      setWebhooks((prev) => prev.filter((webhook) => webhook.id !== deleteTarget.id));
      setDeleteTarget(null);
      setFeedback({ type: "success", message: t("deleteSuccess") });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("deleteFailed"),
      });
    } finally {
      setSaving(false);
    }
  };

  const modalTitle = formMode === "edit" ? t("editWebhook") : t("addWebhook");
  const isModalOpen = formMode !== null;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary">webhook</span>
            <h1 className="text-3xl font-bold tracking-tight text-text-main">{t("title")}</h1>
          </div>
          <p className="mt-1 text-sm text-text-muted">{t("description")}</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
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
              <h2 className="text-base font-semibold text-text-main">{t("configuredWebhooks")}</h2>
              <p className="mt-1 text-xs text-text-muted">{t("configuredWebhooksDesc")}</p>
            </div>
            <button
              onClick={() => void loadWebhooks()}
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

        {loading ? (
          <div className="p-8 text-center text-sm text-text-muted">{t("loading")}</div>
        ) : webhooks.length === 0 ? (
          <div className="p-10 text-center">
            <span className="material-symbols-outlined text-[40px] text-text-muted">webhook</span>
            <p className="mt-3 text-sm text-text-muted">{t("noWebhooks")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="border-b border-border bg-sidebar/40 text-xs uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">{t("name")}</th>
                  <th className="px-4 py-3 font-medium">{t("url")}</th>
                  <th className="px-4 py-3 font-medium">{t("events")}</th>
                  <th className="px-4 py-3 font-medium">{t("status")}</th>
                  <th className="px-4 py-3 font-medium">{t("lastTriggered")}</th>
                  <th className="px-4 py-3 text-right font-medium">{t("actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {webhooks.map((webhook) => {
                  const status = getWebhookStatus(webhook);
                  return (
                    <tr key={webhook.id} className="transition-colors hover:bg-sidebar/30">
                      <td className="px-4 py-3">
                        <div className="font-medium text-text-main">
                          {webhook.description || t("unnamedWebhook")}
                        </div>
                        <div className="text-xs text-text-muted">
                          {t("failureCount", { count: webhook.failure_count })}
                        </div>
                      </td>
                      <td className="max-w-[320px] px-4 py-3">
                        <code className="block truncate rounded bg-sidebar px-2 py-1 text-xs text-text-main">
                          {webhook.url}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex max-w-[260px] flex-wrap gap-1">
                          {webhook.events.map((eventName) => (
                            <span
                              key={eventName}
                              className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs text-text-muted"
                            >
                              {eventName === "*" ? t("allEvents") : eventName}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${
                            status === "active"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                              : status === "errored"
                                ? "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300"
                                : "border-border bg-sidebar text-text-muted"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {status === "active"
                              ? "check_circle"
                              : status === "errored"
                                ? "error"
                                : "pause_circle"}
                          </span>
                          {t(status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-muted">
                        {webhook.last_triggered_at
                          ? new Date(webhook.last_triggered_at).toLocaleString()
                          : t("never")}
                        {webhook.last_status ? (
                          <span className="ml-1 font-mono text-xs">({webhook.last_status})</span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => void testWebhook(webhook)}
                            disabled={testingId === webhook.id}
                            title={t("testWebhook")}
                            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-primary/10 hover:text-primary disabled:opacity-40"
                          >
                            <span
                              className={`material-symbols-outlined text-[18px] ${
                                testingId === webhook.id ? "animate-spin" : ""
                              }`}
                            >
                              {testingId === webhook.id ? "sync" : "send"}
                            </span>
                          </button>
                          <button
                            onClick={() => void toggleEnabled(webhook)}
                            title={webhook.enabled ? t("disable") : t("enable")}
                            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface/60 hover:text-text-main"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {webhook.enabled ? "toggle_on" : "toggle_off"}
                            </span>
                          </button>
                          <button
                            onClick={() => openEditModal(webhook)}
                            title={t("edit")}
                            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface/60 hover:text-text-main"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteTarget(webhook)}
                            title={t("delete")}
                            className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-500/10"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[20px] text-amber-500">vpn_key</span>
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-text-main">{t("signatureTitle")}</h2>
            <p className="text-sm text-text-muted">{t("signatureDescription")}</p>
            <code className="block whitespace-pre-wrap rounded-lg bg-sidebar p-3 text-xs text-text-main">
              {`const sig = "sha256=" + crypto.createHmac("sha256", secret).update(body).digest("hex");`}
            </code>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        size="lg"
        footer={
          <>
            <button
              onClick={closeModal}
              disabled={saving}
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-sidebar hover:text-text-main disabled:opacity-40"
            >
              {tc("cancel")}
            </button>
            <button
              onClick={() => void saveWebhook()}
              disabled={saving || !form.url.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-40"
            >
              {saving && (
                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
              )}
              {tc("save")}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("name")}
            </label>
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder={t("namePlaceholder")}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("url")}
            </label>
            <input
              value={form.url}
              onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
              placeholder="https://example.com/webhook"
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("secret")}
            </label>
            <input
              value={form.secret}
              onChange={(event) => setForm((prev) => ({ ...prev, secret: event.target.value }))}
              placeholder={
                formMode === "edit" ? t("secretEditPlaceholder") : t("secretPlaceholder")
              }
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("events")}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => toggleEvent("*")}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  form.events.includes("*")
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-surface text-text-muted hover:text-text-main"
                }`}
              >
                {t("allEvents")}
              </button>
              {WEBHOOK_EVENTS.map((eventName) => (
                <button
                  key={eventName}
                  type="button"
                  onClick={() => toggleEvent(eventName)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    form.events.includes("*") || form.events.includes(eventName)
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-surface text-text-muted hover:text-text-main"
                  }`}
                >
                  {eventName}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-3 rounded-lg border border-border p-3">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(event) => setForm((prev) => ({ ...prev, enabled: event.target.checked }))}
              className="size-4 accent-primary"
            />
            <span>
              <span className="block text-sm font-medium text-text-main">{t("enabled")}</span>
              <span className="block text-xs text-text-muted">{t("enabledDesc")}</span>
            </span>
          </label>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteWebhook}
        title={t("delete")}
        message={t("deleteConfirm")}
        confirmText={t("delete")}
        cancelText={tc("cancel")}
        loading={saving}
      />
    </div>
  );
}
