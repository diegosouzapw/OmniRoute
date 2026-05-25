"use client";

import { useState } from "react";
import { EventChecklist } from "./EventChecklist";

interface Step3Props {
  webhookId?: string;
  events: string[];
  enabled: boolean;
  description: string;
  onChangeEvents: (events: string[]) => void;
  onChangeEnabled: (enabled: boolean) => void;
  onChangeDescription: (desc: string) => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

export function Step3EventsAndTest({
  webhookId,
  events,
  enabled,
  description,
  onChangeEvents,
  onChangeEnabled,
  onChangeDescription,
  t,
}: Step3Props) {
  const [testState, setTestState] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [testError, setTestError] = useState<string | null>(null);

  const sendTest = async () => {
    if (!webhookId) return;
    setTestState("sending");
    setTestError(null);
    try {
      const res = await fetch(`/api/webhooks/${webhookId}/test`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.delivered === false) {
        throw new Error(data.error || t("testFailed"));
      }
      setTestState("ok");
    } catch (err) {
      setTestState("fail");
      setTestError(err instanceof Error ? err.message : t("testFailed"));
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {t("name")}
        </label>
        <input
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          placeholder={t("namePlaceholder")}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
          {t("events")}
        </label>
        <EventChecklist
          selected={events}
          onChange={onChangeEvents}
          allEventsLabel={t("allEvents")}
        />
      </div>

      <label className="flex items-center gap-3 rounded-lg border border-border p-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChangeEnabled(e.target.checked)}
          className="size-4 accent-primary"
        />
        <span>
          <span className="block text-sm font-medium text-text-main">{t("enabled")}</span>
          <span className="block text-xs text-text-muted">{t("enabledDesc")}</span>
        </span>
      </label>

      {webhookId && (
        <div className="rounded-lg border border-border p-4">
          <p className="mb-3 text-sm font-medium text-text-main">{t("testWebhook")}</p>
          <button
            type="button"
            onClick={() => void sendTest()}
            disabled={testState === "sending"}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                testState === "sending" ? "animate-spin" : ""
              }`}
            >
              {testState === "sending" ? "sync" : "send"}
            </span>
            {t("testWebhook")}
          </button>
          {testState === "ok" && (
            <p className="mt-2 text-xs text-emerald-500">{t("testSuccess")}</p>
          )}
          {testState === "fail" && (
            <p className="mt-2 text-xs text-red-500">{testError ?? t("testFailed")}</p>
          )}
        </div>
      )}
    </div>
  );
}
