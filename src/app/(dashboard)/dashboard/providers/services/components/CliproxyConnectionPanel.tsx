"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card, Toggle, Input } from "@/shared/components";

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

interface FallbackSettings {
  cliproxyapi_fallback_enabled: boolean;
  cliproxyapi_url: string;
  cliproxyapi_fallback_codes: string;
}

export function CliproxyConnectionPanel() {
  const t = useTranslations("embeddedServices");
  const [settings, setSettings] = useState<FallbackSettings>({
    cliproxyapi_fallback_enabled: false,
    cliproxyapi_url: "http://127.0.0.1:8317",
    cliproxyapi_fallback_codes: "502,401,403,429,503",
  });
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, unknown>) => {
        setSettings({
          cliproxyapi_fallback_enabled: data.cliproxyapi_fallback_enabled === true,
          cliproxyapi_url:
            typeof data.cliproxyapi_url === "string"
              ? data.cliproxyapi_url
              : "http://127.0.0.1:8317",
          cliproxyapi_fallback_codes:
            typeof data.cliproxyapi_fallback_codes === "string"
              ? data.cliproxyapi_fallback_codes
              : "502,401,403,429,503",
        });
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const saveSetting = useCallback(
    async (key: string, value: boolean | string) => {
      if (key === "cliproxyapi_url" && typeof value === "string" && value.trim() !== "") {
        if (!isValidUrl(value)) {
          setMsg({ ok: false, text: t("invalidUrl") });
          return;
        }
      }
      setSaving(true);
      setMsg(null);
      try {
        const res = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: value }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setSettings((prev) => ({ ...prev, [key]: value }));
        setMsg({ ok: true, text: t("saved") });
      } catch {
        setMsg({ ok: false, text: t("saveFailed") });
      } finally {
        setSaving(false);
      }
    },
    [t]
  );

  if (!loaded) return null;

  return (
    <Card padding="md">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-8 rounded-lg flex items-center justify-center bg-indigo-500/10">
          <span className="material-symbols-outlined text-indigo-500 text-xl">swap_horiz</span>
        </div>
        <div>
          <h3 className="font-medium text-sm">{t("fallbackRouting")}</h3>
          <p className="text-xs text-text-muted">{t("fallbackRoutingDescription")}</p>
        </div>
      </div>

      {msg && (
        <div
          className={`flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded text-xs ${
            msg.ok
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          <span className="material-symbols-outlined text-[12px]">
            {msg.ok ? "check_circle" : "error"}
          </span>
          {msg.text}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm">{t("enableFallback")}</label>
          <Toggle
            checked={settings.cliproxyapi_fallback_enabled}
            onChange={(v) => saveSetting("cliproxyapi_fallback_enabled", v)}
            disabled={saving}
          />
        </div>

        {settings.cliproxyapi_fallback_enabled && (
          <>
            <div>
              <label className="text-xs text-text-muted mb-1.5 block">{t("cliproxyUrl")}</label>
              <Input
                value={settings.cliproxyapi_url}
                onChange={(e) => saveSetting("cliproxyapi_url", e.target.value)}
                placeholder="http://127.0.0.1:8317"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1.5 block">{t("fallbackCodes")}</label>
              <Input
                value={settings.cliproxyapi_fallback_codes}
                onChange={(e) => saveSetting("cliproxyapi_fallback_codes", e.target.value)}
                placeholder="502,401,403,429,503"
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
