"use client";

import { useState } from "react";
import { WebhookDeliveriesPanel } from "./WebhookDeliveriesPanel";

export type WebhookKind = "slack" | "telegram" | "discord" | "custom";

export interface WebhookItem {
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
  kind: WebhookKind;
  metadata_encrypted?: string | null;
}

const KIND_ICONS: Record<WebhookKind, string> = {
  slack: "chat",
  telegram: "send",
  discord: "forum",
  custom: "webhook",
};

const KIND_COLORS: Record<WebhookKind, string> = {
  slack: "text-emerald-500",
  telegram: "text-blue-500",
  discord: "text-violet-500",
  custom: "text-amber-500",
};

function getStatus(wh: WebhookItem): "active" | "inactive" | "errored" {
  if (!wh.enabled) return "inactive";
  if (wh.failure_count > 0 || (wh.last_status !== null && wh.last_status >= 400)) return "errored";
  return "active";
}

interface WebhookCardProps {
  webhook: WebhookItem;
  t: (key: string, opts?: Record<string, unknown>) => string;
  testingId: string | null;
  onTest: (wh: WebhookItem) => void;
  onToggleEnabled: (wh: WebhookItem) => void;
  onEdit: (wh: WebhookItem) => void;
  onDelete: (wh: WebhookItem) => void;
}

export function WebhookCard({
  webhook,
  t,
  testingId,
  onTest,
  onToggleEnabled,
  onEdit,
  onDelete,
}: WebhookCardProps) {
  const [expanded, setExpanded] = useState(false);
  const status = getStatus(webhook);
  const isTesting = testingId === webhook.id;

  return (
    <div className="rounded-xl border border-border bg-surface transition-shadow hover:shadow-sm">
      <div className="flex items-center gap-3 p-4">
        <span
          className={`material-symbols-outlined shrink-0 text-[22px] ${KIND_COLORS[webhook.kind]}`}
        >
          {KIND_ICONS[webhook.kind]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-main">
            {webhook.description || t("unnamedWebhook")}
          </p>
          <p className="truncate text-xs text-text-muted">{webhook.url}</p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${
            status === "active"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
              : status === "errored"
                ? "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300"
                : "border-border bg-sidebar text-text-muted"
          }`}
        >
          {t(status)}
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onTest(webhook)}
            disabled={isTesting}
            title={t("testWebhook")}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-primary/10 hover:text-primary disabled:opacity-40"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${isTesting ? "animate-spin" : ""}`}
            >
              {isTesting ? "sync" : "send"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onToggleEnabled(webhook)}
            title={webhook.enabled ? t("disable") : t("enable")}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface/60 hover:text-text-main"
          >
            <span className="material-symbols-outlined text-[18px]">
              {webhook.enabled ? "toggle_on" : "toggle_off"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onEdit(webhook)}
            title={t("edit")}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface/60 hover:text-text-main"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(webhook)}
            title={t("delete")}
            className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-500/10"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            title={expanded ? "Collapse" : "Expand"}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface/60 hover:text-text-main"
          >
            <span className="material-symbols-outlined text-[18px]">
              {expanded ? "expand_less" : "expand_more"}
            </span>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <div className="mb-3 flex flex-wrap gap-1">
            {webhook.events.map((ev) => (
              <span
                key={ev}
                className="rounded-full border border-border bg-sidebar px-2 py-0.5 text-xs text-text-muted"
              >
                {ev === "*" ? t("allEvents") : ev}
              </span>
            ))}
          </div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
            {t("deliveries.title")}
          </p>
          <WebhookDeliveriesPanel webhookId={webhook.id} t={t} />
        </div>
      )}
    </div>
  );
}
