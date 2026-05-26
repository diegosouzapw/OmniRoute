"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";

export default function SystemPromptTab() {
  const [config, setConfig] = useState({ enabled: false, prefixPrompt: "", suffixPrompt: "" });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const configRef = useRef(config);
  const t = useTranslations("settings");

  useEffect(() => {
    fetch("/api/settings/system-prompt")
      .then((res) => res.json())
      .then((data) => {
        setConfig({
          enabled: data?.enabled ?? false,
          prefixPrompt: data?.prefixPrompt ?? "",
          suffixPrompt: data?.suffixPrompt ?? "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async (updates) => {
    const newConfig = { ...configRef.current, ...updates };
    setConfig(newConfig);
    configRef.current = newConfig;
    setStatus("");
    try {
      const res = await fetch("/api/settings/system-prompt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      }
    } catch {
      setStatus("error");
    }
  };

  const handleFieldChange = (field, text) => {
    const updated = { ...configRef.current, [field]: text };
    setConfig(updated);
    configRef.current = updated;
    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        save({ [field]: text });
      }, 800)
    );
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            edit_note
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("globalSystemPrompt")}</h3>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
              {t("saved")}
            </span>
          )}
          <Toggle
            checked={config.enabled}
            onChange={() => save({ enabled: !config.enabled })}
            disabled={loading}
          />
        </div>
      </div>

      {config.enabled && (
        <div className="flex flex-col gap-5">
          {/* Before Prompt — injected BEFORE agent/provider instructions */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">vertical_align_top</span>
              {t("beforePromptLabel")}
            </label>
            <p className="text-xs text-text-muted/70">{t("beforePromptDesc")}</p>
            <div className="relative">
              <textarea
                value={config.prefixPrompt}
                onChange={(e) => handleFieldChange("prefixPrompt", e.target.value)}
                placeholder={t("beforePromptPlaceholder")}
                rows={9}
                className="w-full px-4 py-3 rounded-lg border border-border/50 bg-surface/30 text-sm
                           placeholder:text-text-muted/50 resize-y min-h-[220px]
                           focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/50
                           transition-colors"
                disabled={loading}
              />
              <div className="absolute bottom-2 right-3 text-xs text-text-muted/60 tabular-nums">
                {t("chars", { count: config.prefixPrompt.length })}
              </div>
            </div>
          </div>

          {/* After Prompt — injected AFTER agent/provider instructions */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">vertical_align_bottom</span>
              {t("afterPromptLabel")}
            </label>
            <p className="text-xs text-text-muted/70">{t("afterPromptDesc")}</p>
            <div className="relative">
              <textarea
                value={config.suffixPrompt}
                onChange={(e) => handleFieldChange("suffixPrompt", e.target.value)}
                placeholder={t("afterPromptPlaceholder")}
                rows={9}
                className="w-full px-4 py-3 rounded-lg border border-border/50 bg-surface/30 text-sm
                           placeholder:text-text-muted/50 resize-y min-h-[220px]
                           focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/50
                           transition-colors"
                disabled={loading}
              />
              <div className="absolute bottom-2 right-3 text-xs text-text-muted/60 tabular-nums">
                {t("chars", { count: config.suffixPrompt.length })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
