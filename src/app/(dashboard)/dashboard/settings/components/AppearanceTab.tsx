"use client";

import { useState, useEffect } from "react";
import { Button, Card, Toggle } from "@/shared/components";
import { useTheme } from "@/shared/hooks/useTheme";
import useThemeStore, { COLOR_THEMES } from "@/store/themeStore";
import { cn } from "@/shared/utils/cn";
import { useTranslations } from "next-intl";
import {
  HIDDEN_SIDEBAR_ITEMS_SETTING_KEY,
  SIDEBAR_SECTIONS,
  SIDEBAR_SETTINGS_UPDATED_EVENT,
  normalizeHiddenSidebarItems,
  type HideableSidebarItemId,
} from "@/shared/constants/sidebarVisibility";

export default function AppearanceTab() {
  const { theme, setTheme, isDark } = useTheme();
  const { colorTheme, customColor, setColorTheme, setCustomColorTheme } = useThemeStore();
  const t = useTranslations("settings");
  const tSidebar = useTranslations("sidebar");
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [customThemeColor, setCustomThemeColor] = useState(customColor || "#3b82f6");
  const isValidHex = /^#([0-9a-fA-F]{6})$/.test(
    customThemeColor.startsWith("#") ? customThemeColor : `#${customThemeColor}`
  );
  const hiddenSidebarItems = normalizeHiddenSidebarItems(
    settings[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]
  );
  const hiddenSidebarSet = new Set(hiddenSidebarItems);

  const getSettingsLabel = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key) ? t(key) : fallback;
  const getSidebarLabel = (key: string, fallback: string) =>
    typeof tSidebar.has === "function" && tSidebar.has(key) ? tSidebar(key) : fallback;

  useEffect(() => {
    const unsubscribe = useThemeStore.subscribe((state) => {
      if (state.customColor && state.customColor !== customThemeColor) {
        setCustomThemeColor(state.customColor);
      }
    });
    return unsubscribe;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        setSettings({
          ...data,
          [HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]: normalizeHiddenSidebarItems(
            data[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]
          ),
        });
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
        setSettings((prev) => ({
          ...prev,
          [key]:
            key === HIDDEN_SIDEBAR_ITEMS_SETTING_KEY ? normalizeHiddenSidebarItems(value) : value,
        }));
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent(SIDEBAR_SETTINGS_UPDATED_EVENT, {
              detail: { [key]: value },
            })
          );
        }
      }
    } catch (err) {
      console.error(`Failed to update ${key}:`, err);
    }
  };

  const presetThemes = [
    { id: "coral", color: COLOR_THEMES.coral, label: t("themeCoral") },
    { id: "blue", color: COLOR_THEMES.blue, label: t("themeBlue") },
    { id: "red", color: COLOR_THEMES.red, label: t("themeRed") },
    { id: "green", color: COLOR_THEMES.green, label: t("themeGreen") },
    { id: "violet", color: COLOR_THEMES.violet, label: t("themeViolet") },
    { id: "orange", color: COLOR_THEMES.orange, label: t("themeOrange") },
    { id: "cyan", color: COLOR_THEMES.cyan, label: t("themeCyan") },
  ];

  const sidebarSections = SIDEBAR_SECTIONS.map((section) => ({
    ...section,
    title: getSidebarLabel(section.titleKey, section.titleFallback),
    items: section.items.map((item) => ({ ...item, label: tSidebar(item.i18nKey) })),
  }));

  const toggleSidebarItem = (itemId: HideableSidebarItemId) => {
    const nextHiddenItems = hiddenSidebarSet.has(itemId)
      ? hiddenSidebarItems.filter((id) => id !== itemId)
      : [...hiddenSidebarItems, itemId];

    updateSetting(HIDDEN_SIDEBAR_ITEMS_SETTING_KEY, nextHiddenItems);
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
          <p className="font-medium mb-1">{t("themeAccent")}</p>
          <p className="text-sm text-text-muted mb-3">{t("themeAccentDesc")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {presetThemes.map((item) => {
              const active = colorTheme === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setColorTheme(item.id)}
                  className={cn(
                    "flex items-center justify-between gap-2 p-2 rounded-lg border transition-colors",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-surface/50 text-text-main"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="size-4 rounded-full border border-black/10 dark:border-white/20"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customThemeColor}
              onChange={(e) => setCustomThemeColor(e.target.value)}
              className="h-10 w-12 rounded border border-border bg-surface cursor-pointer"
              aria-label={t("themeCustom")}
            />
            <input
              type="text"
              value={customThemeColor}
              onChange={(e) => setCustomThemeColor(e.target.value)}
              placeholder="#3b82f6"
              maxLength={7}
              className={`flex-1 h-10 px-3 rounded-lg bg-surface border text-sm text-text-main focus:outline-none ${isValidHex ? "border-border focus:border-primary" : "border-red-400 focus:border-red-500"}`}
            />
            <Button onClick={() => setCustomColorTheme(customThemeColor)} disabled={!isValidHex}>
              {t("themeCreate")}
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="mb-3">
            <p className="font-medium">
              {getSettingsLabel("sidebarVisibility", "Hide sidebar items")}
            </p>
            <p className="text-sm text-text-muted">
              {getSettingsLabel(
                "sidebarVisibilityDesc",
                "Hide any sidebar navigation entry to reduce visual clutter without disabling any features"
              )}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {sidebarSections.map((section) => (
              <div key={section.id} className="rounded-lg border border-border bg-surface/40">
                <div className="px-4 py-3 border-b border-border/70">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted/70">
                    {section.title}
                  </p>
                </div>

                <div className="divide-y divide-border/70">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 px-4 py-3"
                    >
                      <p className="font-medium">{item.label}</p>
                      <Toggle
                        checked={hiddenSidebarSet.has(item.id)}
                        onChange={() => toggleSidebarItem(item.id)}
                        disabled={loading}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-text-muted">
            {getSettingsLabel(
              "sidebarVisibilityHint",
              "Any sidebar section is hidden automatically when all of its entries are hidden"
            )}
          </p>
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
