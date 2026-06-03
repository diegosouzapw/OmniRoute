"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, Button, Input, Toggle } from "@/shared/components";

interface Settings {
  cliproxyapi_fallback_enabled?: boolean;
  cliproxyapi_url?: string;
  cliproxyapi_fallback_codes?: string;
  [key: string]: unknown;
}

interface VersionManagerEntry {
  tool: string;
  status: string;
  installedVersion: string | null;
  healthStatus: string;
  port: number;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function CliproxyapiSettingsTab() {
  const t = useTranslations("settings");
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [toolState, setToolState] = useState<VersionManagerEntry | null>(null);
  const [toolStateError, setToolStateError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => {
        if (!r.ok) throw new Error(`Settings API returned ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load settings:", err);
        setLoading(false);
      });

    fetch("/api/version-manager/status")
      .then((r) => {
        if (!r.ok) throw new Error(`Version manager API returned ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const entry = Array.isArray(data)
          ? data.find((t: VersionManagerEntry) => t.tool === "cliproxyapi")
          : null;
        setToolState(entry ?? null);
        setToolStateError(null);
      })
      .catch((err) => {
        console.error("Failed to load version manager status:", err);
        setToolStateError("Unable to reach version manager service");
        setToolState(null);
      });
  }, []);

  const updateSetting = useCallback(async (key: string, value: boolean | string) => {
    if (key === "cliproxyapi_url" && typeof value === "string" && value.trim() !== "") {
      if (!isValidUrl(value)) {
        setMessage({ type: "error", text: "Invalid URL format. Use http:// or https://" });
        return;
      }
    }

    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      await res.json();
      setSettings((prev) => ({ ...prev, [key]: value }));
      setMessage({ type: "success", text: "Setting saved" });
    } catch {
      setMessage({ type: "error", text: "Failed to save setting" });
    } finally {
      setSaving(false);
    }
  }, []);

  const cpaEnabled = settings.cliproxyapi_fallback_enabled === true;
  const cpaUrl = settings.cliproxyapi_url || "http://127.0.0.1:8317";
  const cpaCodes = settings.cliproxyapi_fallback_codes || "502,401,403,429,503";

  const statusColor =
    toolState?.status === "running"
      ? "text-green-600 dark:text-green-400"
      : toolState?.status === "error"
        ? "text-red-600 dark:text-red-400"
        : "text-text-muted";

  const statusIcon =
    toolState?.status === "running"
      ? "check_circle"
      : toolState?.status === "error"
        ? "error"
        : "help";

  return (
    <div className="space-y-4">
      {/* Migration banner — new lifecycle management lives in the Services page */}
      <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
        <span className="material-symbols-outlined text-[14px] mt-0.5 shrink-0">info</span>
        <span>
          CLIProxyAPI lifecycle management (install, start, stop) has moved to{" "}
          <Link
            href="/dashboard/providers/services"
            className="underline underline-offset-2 hover:opacity-80"
          >
            Providers → Services
          </Link>
          . Fallback routing settings below remain here.
        </span>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
            message.type === "success"
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {message.type === "success" ? "check_circle" : "error"}
          </span>
          {message.text}
        </div>
      )}

      <Card padding="md">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-8 rounded-lg flex items-center justify-center bg-indigo-500/10">
            <span className="material-symbols-outlined text-indigo-500 text-xl">swap_horiz</span>
          </div>
          <div>
            <h3 className="font-medium text-sm">{t("cliproxyapiFallback")}</h3>
            <p className="text-xs text-text-muted">
              When enabled, failed requests are retried through CLIProxyAPI (localhost:8317)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-text-main">{t("cliproxyapiEnableFallback")}</label>
            <Toggle
              checked={cpaEnabled}
              onChange={(checked) => updateSetting("cliproxyapi_fallback_enabled", checked)}
            />
          </div>

          {cpaEnabled && (
            <>
              <div>
                <label className="text-xs text-text-muted mb-1.5 block">
                  {t("cliproxyapiUrl")}
                </label>
                <Input
                  value={cpaUrl}
                  onChange={(e) => updateSetting("cliproxyapi_url", e.target.value)}
                  placeholder="http://127.0.0.1:8317"
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs text-text-muted mb-1.5 block">
                  Fallback Status Codes (comma-separated)
                </label>
                <Input
                  value={cpaCodes}
                  onChange={(e) => updateSetting("cliproxyapi_fallback_codes", e.target.value)}
                  placeholder="502,401,403,429,503"
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>
      </Card>

      <Card padding="md">
        <h3 className="font-medium text-sm mb-4">{t("cliproxyapiStatus")}</h3>
        {loading ? (
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <span className="material-symbols-outlined animate-spin text-base">
              progress_activity
            </span>
            Loading...
          </div>
        ) : toolStateError ? (
          <p className="text-sm text-text-muted">{toolStateError}</p>
        ) : toolState ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-bg-secondary">
              <p className="text-xs text-text-muted mb-1">Status</p>
              <div className="flex items-center gap-1.5">
                <span className={`material-symbols-outlined text-sm ${statusColor}`}>
                  {statusIcon}
                </span>
                <p className={`text-sm font-medium capitalize ${statusColor}`}>
                  {toolState.status?.replace("_", " ") || "Unknown"}
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-bg-secondary">
              <p className="text-xs text-text-muted mb-1">Version</p>
              <p className="text-sm font-medium">
                {toolState.installedVersion ? `v${toolState.installedVersion}` : "Not installed"}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-bg-secondary">
              <p className="text-xs text-text-muted mb-1">Health</p>
              <p
                className={`text-sm font-medium ${
                  toolState.healthStatus === "healthy"
                    ? "text-green-600 dark:text-green-400"
                    : toolState.healthStatus === "unhealthy"
                      ? "text-red-600 dark:text-red-400"
                      : "text-text-muted"
                }`}
              >
                {toolState.healthStatus === "healthy"
                  ? "Healthy"
                  : toolState.healthStatus === "unhealthy"
                    ? "Unhealthy"
                    : "Unknown"}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-bg-secondary">
              <p className="text-xs text-text-muted mb-1">Port</p>
              <p className="text-sm font-mono">{toolState.port || 8317}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted">{t("cliproxyapiNotDetected")}</p>
        )}
      </Card>
    </div>
  );
}
