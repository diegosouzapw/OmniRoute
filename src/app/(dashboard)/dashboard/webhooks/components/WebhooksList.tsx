"use client";

import { WebhookCard, type WebhookItem } from "./WebhookCard";

interface WebhooksListProps {
  webhooks: WebhookItem[];
  loading: boolean;
  testingId: string | null;
  t: (key: string, opts?: Record<string, unknown>) => string;
  onTest: (wh: WebhookItem) => void;
  onToggleEnabled: (wh: WebhookItem) => void;
  onEdit: (wh: WebhookItem) => void;
  onDelete: (wh: WebhookItem) => void;
}

export function WebhooksList({
  webhooks,
  loading,
  testingId,
  t,
  onTest,
  onToggleEnabled,
  onEdit,
  onDelete,
}: WebhooksListProps) {
  if (loading) {
    return <p className="py-10 text-center text-sm text-text-muted">{t("loading")}</p>;
  }

  if (webhooks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-14 text-center">
        <span className="material-symbols-outlined text-[48px] text-text-muted">webhook</span>
        <p className="text-sm text-text-muted">{t("noWebhooks")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {webhooks.map((wh) => (
        <WebhookCard
          key={wh.id}
          webhook={wh}
          t={t}
          testingId={testingId}
          onTest={onTest}
          onToggleEnabled={onToggleEnabled}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
