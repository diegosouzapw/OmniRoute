"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input } from "@/shared/components";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import {
  AUTO_DISABLE_BANNED_SCOPES,
  normalizeAutoDisableBannedScope,
  type AutoDisableBannedScope,
} from "@/shared/utils/autoDisableBanned";

type AutoDisableForm = {
  enabled: boolean;
  threshold: number;
  scope: AutoDisableBannedScope;
};

function normalizeForm(json: Partial<AutoDisableForm> | null | undefined): AutoDisableForm {
  return {
    enabled: Boolean(json?.enabled),
    threshold: typeof json?.threshold === "number" ? json.threshold : 3,
    scope: normalizeAutoDisableBannedScope(json?.scope),
  };
}

export default function AutoDisableCard() {
  const [data, setData] = useState<AutoDisableForm>({
    enabled: false,
    threshold: 3,
    scope: "all",
  });
  const [draft, setDraft] = useState<AutoDisableForm>({
    enabled: false,
    threshold: 3,
    scope: "all",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const notify = useNotificationStore();

  useEffect(() => {
    fetch("/api/settings/auto-disable-accounts")
      .then((res) => res.json())
      .then((json) => {
        const next = normalizeForm(json);
        setData(next);
        setDraft(next);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings/auto-disable-accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error("Failed to save auto-disable config");
      const savedData = normalizeForm(await res.json());
      setData(savedData);
      setEditMode(false);
      notify.success(t("savedSuccessfully"));
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Error saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  const current = editMode ? draft : data;
  const scopes = AUTO_DISABLE_BANNED_SCOPES;

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
              block
            </span>
            <h2 className="text-lg font-bold">{t("autoDisableBannedAccounts")}</h2>
          </div>
          {editMode ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setDraft(data);
                  setEditMode(false);
                }}
              >
                {tc("cancel")}
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon="save"
                onClick={handleSave}
                disabled={saving}
              >
                {tc("save")}
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="secondary" icon="edit" onClick={() => setEditMode(true)}>
              {tc("edit")}
            </Button>
          )}
        </div>

        <p className="text-sm text-text-muted mb-4">{t("autoDisableDescription")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg bg-black/5 dark:bg-white/5 p-4 flex flex-col justify-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={current.enabled}
                onChange={(e) => setDraft((prev) => ({ ...prev, enabled: e.target.checked }))}
                disabled={!editMode}
                className="w-4 h-4 text-primary bg-surface/50 border-white/20 rounded focus:ring-primary/50"
              />
              <span className="text-sm font-medium">{t("autoDisableBannedAccounts")}</span>
            </label>
          </div>

          <div className="rounded-lg bg-black/5 dark:bg-white/5 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              {t("autoDisableThreshold")}
            </h3>
            {editMode ? (
              <Input
                type="number"
                min="1"
                max="10"
                value={draft.threshold}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, threshold: parseInt(e.target.value) || 1 }))
                }
              />
            ) : (
              <span className={`text-sm font-mono ${!data.enabled && "opacity-50"}`}>
                {t("failures", { count: data.threshold })}
              </span>
            )}
            <p className="text-xs text-text-muted mt-2">{t("autoDisableThresholdDesc")}</p>
          </div>
        </div>

        <div className={`mt-4 rounded-lg bg-black/5 dark:bg-white/5 p-4 ${!current.enabled ? "opacity-50" : ""}`}>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2">
            {t("autoDisableBannedScope")}
          </h3>
          <p className="text-xs text-text-muted mb-3">{t("autoDisableBannedScopeDesc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scopes.map((scope) => (
              <label
                key={scope}
                className={`flex items-start gap-3 rounded-lg border border-white/10 p-3 ${editMode && current.enabled ? "cursor-pointer" : "cursor-default"}`}
              >
                <input
                  type="radio"
                  name="auto-disable-banned-scope"
                  value={scope}
                  checked={current.scope === scope}
                  onChange={() => setDraft((prev) => ({ ...prev, scope }))}
                  disabled={!editMode || !current.enabled}
                  className="mt-1 w-4 h-4 text-primary bg-surface/50 border-white/20 focus:ring-primary/50"
                />
                <span>
                  <span className="block text-sm font-medium">
                    {scope === "all"
                      ? t("autoDisableBannedScopeAll")
                      : t("autoDisableBannedScopeSubscription")}
                  </span>
                  <span className="block text-xs text-text-muted mt-1">
                    {scope === "all"
                      ? t("autoDisableBannedScopeAllDesc")
                      : t("autoDisableBannedScopeSubscriptionDesc")}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
