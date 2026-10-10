"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Toggle from "@/shared/components/Toggle";

type VisibilitySettings = { hideAutoCombos: boolean; hideNoThinkVariants: boolean };
const FLAGS = ["hideAutoCombos", "hideNoThinkVariants"] as const;

function visibilitySettings(value: Partial<VisibilitySettings>): VisibilitySettings {
  return {
    hideAutoCombos: value.hideAutoCombos === true,
    hideNoThinkVariants: value.hideNoThinkVariants === true,
  };
}

export default function CatalogVisibilityCard() {
  const t = useTranslations("settings");
  const common = useTranslations("common");
  const [value, setValue] = useState<VisibilitySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<"load" | "save" | null>(null);
  const [saved, setSaved] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch("/api/settings", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("settings_load_failed");
        const data = await response.json();
        if (!controller.signal.aborted) setValue(visibilitySettings(data));
      } catch {
        if (!controller.signal.aborted) setError("load");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [loadAttempt]);

  const save = useCallback(
    async (key: keyof VisibilitySettings, checked: boolean) => {
      if (!value || loading || saving) return;
      setSaving(true);
      setSaved(false);
      setError(null);
      try {
        const response = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: checked }),
        });
        if (!response.ok) throw new Error("settings_save_failed");
        setValue(visibilitySettings(await response.json()));
        setSaved(true);
      } catch {
        setError("save");
      } finally {
        setSaving(false);
      }
    },
    [value, loading, saving]
  );

  return (
    <Card title={t("catalogScopeTitle")} subtitle={t("catalogVisibilityHint")}>
      <div className="space-y-4">
        {FLAGS.map((key) => (
          <Toggle
            key={key}
            label={`${common("hide")} ${key === "hideAutoCombos" ? "auto/*" : "no-think/*"}`}
            checked={value?.[key] ?? false}
            disabled={loading || saving || !value}
            onChange={(checked) => void save(key, checked)}
          />
        ))}
        {error && (
          <p role="alert" className="text-sm text-rose-500">
            {error === "load" ? common("failedToLoad") : t("settingSaveFailed")}
            {error === "load" && (
              <button
                type="button"
                className="ml-3 underline"
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  setLoadAttempt((attempt) => attempt + 1);
                }}
              >
                {common("retry")}
              </button>
            )}
          </p>
        )}
        <p role="status" className="text-sm text-text-muted">
          {loading ? t("loading") : saving ? t("saving") : saved ? t("settingSaved") : ""}
        </p>
      </div>
    </Card>
  );
}
