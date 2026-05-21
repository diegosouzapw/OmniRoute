"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, Collapsible, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";
import {
  CLAUDE_FAST_MODE_DEFAULT_MODELS,
  getClaudeFastModeSupportedModels,
  isClaudeFastModeEnabled,
} from "@/lib/providers/claudeFastMode";

const SUPPORTED_MODEL_CHOICES = [...CLAUDE_FAST_MODE_DEFAULT_MODELS];

export default function ClaudeFastModeTab() {
  const [enabled, setEnabled] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>([
    ...CLAUDE_FAST_MODE_DEFAULT_MODELS,
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");
  const t = useTranslations("settings");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setEnabled(isClaudeFastModeEnabled(data));
        setSelectedModels(getClaudeFastModeSupportedModels(data));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const modelsCount = selectedModels.length;

  const subtitle = useMemo(
    () => t("claudeFastModeModelsLabel", { count: modelsCount }),
    [t, modelsCount]
  );

  const persist = async (payload: { enabled: boolean; supportedModels: string[] }) => {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claudeFastMode: payload }),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
        return false;
      }
    } catch {
      setStatus("error");
      return false;
    } finally {
      setSaving(false);
    }
    return true;
  };

  const saveEnabled = async (next: boolean) => {
    if (saving || loading) return;
    const previous = enabled;
    setEnabled(next);
    const ok = await persist({ enabled: next, supportedModels: selectedModels });
    if (!ok) setEnabled(previous);
  };

  const toggleModel = async (modelId: string, checked: boolean) => {
    if (saving || loading) return;
    const previous = selectedModels;
    const next = checked
      ? Array.from(new Set([...selectedModels, modelId]))
      : selectedModels.filter((id) => id !== modelId);
    setSelectedModels(next);
    const ok = await persist({ enabled, supportedModels: next });
    if (!ok) setSelectedModels(previous);
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            bolt
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("claudeFastModeTitle")}</h3>
          <p className="text-sm text-text-muted">{t("claudeFastModeDesc")}</p>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
              {t("saved")}
            </span>
          )}
          {status === "error" && (
            <span className="text-xs font-medium text-rose-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>{" "}
              {t("claudeFastModeSaveError")}
            </span>
          )}
          <Toggle
            checked={enabled}
            onChange={(value) => saveEnabled(value)}
            disabled={loading || saving}
            ariaLabel={t("claudeFastModeTitle")}
          />
        </div>
      </div>

      {enabled && (
        <div className="mb-3">
          <Collapsible
            title={t("claudeFastModeModelsLabel", { count: modelsCount })}
            subtitle={subtitle}
            icon="checklist"
            variant="inline"
          >
            <div className="flex flex-col gap-2">
              {SUPPORTED_MODEL_CHOICES.map((modelId) => {
                const checked = selectedModels.includes(modelId);
                return (
                  <label
                    key={modelId}
                    className="flex items-center gap-2 text-sm cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => toggleModel(modelId, e.target.checked)}
                      disabled={loading || saving}
                      className="h-4 w-4 rounded border-black/20 dark:border-white/20"
                      aria-label={t("claudeFastModeModelCheckbox", { model: modelId })}
                    />
                    <span className="font-mono text-xs">{modelId}</span>
                  </label>
                );
              })}
            </div>
          </Collapsible>
        </div>
      )}

      <p className="text-xs text-text-muted/80 flex items-start gap-1.5 leading-relaxed">
        <span className="material-symbols-outlined text-[14px] mt-0.5">info</span>
        <span>{t("claudeFastModeHint")}</span>
      </p>
    </Card>
  );
}
