"use client";

import { useState, useEffect } from "react";
import { Card, Toggle } from "@/shared/components";
import { useTheme } from "@/shared/hooks/useTheme";
import { cn } from "@/shared/utils/cn";
import { useTranslations } from "next-intl";

export default function AppearanceTab() {
  const { theme, setTheme, isDark } = useTheme();
  const t = useTranslations("settings");
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const themeOptionLabels: Record<string, string> = {
    light: t("themeLight"),
    dark: t("themeDark"),
    system: t("themeSystem"),
  };

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateSetting = async (key: string, value: any) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, [key]: value }));
      }
    } catch (err) {
      console.error(`Failed to update ${key}:`, err);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            palette
          </span>
        </div>
        <h3 className="text-lg font-semibold">{t("appearance")}</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{t("darkMode")}</p>
            <p className="text-sm text-text-muted">{t("switchThemes")}</p>
          </div>
          <Toggle checked={isDark} onChange={() => setTheme(isDark ? "light" : "dark")} />
        </div>

        <div className="pt-4 border-t border-border">
          <div
            role="tablist"
            aria-label={t("themeSelectionAria")}
            className="inline-flex p-1 rounded-lg bg-black/5 dark:bg-white/5"
          >
            {["light", "dark", "system"].map((option) => (
              <button
                key={option}
                role="tab"
                aria-selected={theme === option}
                onClick={() => setTheme(option)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all",
                  theme === option
                    ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
                    : "text-text-muted hover:text-text-main"
                )}
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  {option === "light" ? "light_mode" : option === "dark" ? "dark_mode" : "contrast"}
                </span>
                <span>{themeOptionLabels[option] || option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("hideHealthLogs")}</p>
              <p className="text-sm text-text-muted">{t("hideHealthLogsDesc")}</p>
            </div>
            <Toggle
              checked={settings.hideHealthCheckLogs === true}
              onChange={() => updateSetting("hideHealthCheckLogs", !settings.hideHealthCheckLogs)}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
