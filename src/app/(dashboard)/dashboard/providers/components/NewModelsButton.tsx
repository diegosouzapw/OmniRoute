"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/components";

interface NewModelsInboxModel {
  modelId: string;
  isFree: boolean;
  firstSeenAt: string;
}

interface NewModelsInboxGroup {
  provider: string;
  providerName: string;
  models: NewModelsInboxModel[];
}

interface NewModelsInboxResponse {
  totalUnseen?: number;
  groups?: NewModelsInboxGroup[];
}

async function fetchInbox(): Promise<{ totalUnseen: number; groups: NewModelsInboxGroup[] }> {
  const res = await fetch("/api/models/new", { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as NewModelsInboxResponse;
  return {
    totalUnseen: typeof data.totalUnseen === "number" ? data.totalUnseen : 0,
    groups: Array.isArray(data.groups) ? data.groups : [],
  };
}

async function acknowledge(body: Record<string, unknown>): Promise<void> {
  const res = await fetch("/api/models/new/acknowledge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
}

/**
 * Providers-page button for the "New models" inbox: models that a model sync found
 * for the first time. Shows an unread badge and opens a modal grouped by provider.
 */
export default function NewModelsButton() {
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const [groups, setGroups] = useState<NewModelsInboxGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const inbox = await fetchInbox();
      setGroups(inbox.groups);
      setUnseenCount(inbox.totalUnseen);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchInbox()
      .then((inbox) => {
        if (!cancelled) setUnseenCount(inbox.totalUnseen);
      })
      .catch(() => {
        // Badge is best-effort; the modal surfaces load errors.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
    void load();
  };

  const markRead = async (body: Record<string, unknown>) => {
    try {
      await acknowledge(body);
    } catch {
      setError(true);
      return;
    }
    await load();
  };

  const markProviderRead = (group: NewModelsInboxGroup) =>
    markRead({
      models: group.models.map((m) => ({ provider: group.provider, modelId: m.modelId })),
    });

  const badgeLabel = t("newModelsBadgeAria", { count: unseenCount });

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40 transition-colors"
        title={t("newModelsButtonTitle")}
        aria-label={unseenCount > 0 ? `${t("newModelsButton")} (${badgeLabel})` : undefined}
        data-testid="new-models-button"
      >
        <span className="material-symbols-outlined text-[14px]">new_releases</span>
        {t("newModelsButton")}
        {unseenCount > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1"
            aria-hidden="true"
          >
            {unseenCount > 99 ? "99+" : unseenCount}
          </span>
        )}
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={t("newModelsTitle")}
        size="lg"
        footer={
          groups.length > 0 ? (
            <Button
              size="sm"
              variant="secondary"
              icon="done_all"
              onClick={() => void markRead({ all: true })}
            >
              {t("newModelsMarkAllRead")}
            </Button>
          ) : undefined
        }
      >
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          {loading && groups.length === 0 ? (
            <div className="flex items-center justify-center gap-2 py-6 text-sm text-text-muted">
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              {tc("loading")}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-2 py-6 text-sm text-red-500">
              <span>{t("newModelsLoadError")}</span>
              <Button size="sm" variant="secondary" icon="refresh" onClick={() => void load()}>
                {tc("retry")}
              </Button>
            </div>
          ) : groups.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-sm text-text-muted text-center">
              <span className="material-symbols-outlined text-[28px]">new_releases</span>
              <span className="font-medium text-text-main">{t("newModelsEmpty")}</span>
              <span className="text-xs">{t("newModelsEmptyDesc")}</span>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.provider} className="border border-border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between gap-2 px-3 py-2 bg-bg-subtle border-b border-border">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-medium text-text-main truncate">
                      {group.providerName}
                    </span>
                    <span className="text-[10px] text-text-muted rounded-full px-1.5 py-0.5 border border-border">
                      {group.models.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => void markProviderRead(group)}
                    className="text-xs text-text-muted hover:text-text-primary transition-colors"
                  >
                    {t("newModelsMarkProviderRead")}
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {group.models.map((model) => (
                    <div key={model.modelId} className="flex items-center gap-2 px-3 py-1.5">
                      {model.isFree && (
                        <span className="shrink-0 text-[9px] font-bold uppercase text-green-600 bg-green-500/10 rounded px-1 py-0.5">
                          {t("freeBadge")}
                        </span>
                      )}
                      <code className="text-xs font-mono text-text-muted truncate flex-1">
                        {model.modelId}
                      </code>
                      <span className="text-[10px] text-text-muted shrink-0">
                        {t("newModelsFirstSeen", { date: formatDate(model.firstSeenAt) })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </>
  );
}
