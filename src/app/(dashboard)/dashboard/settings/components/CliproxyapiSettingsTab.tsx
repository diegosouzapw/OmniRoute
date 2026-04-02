"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input, Toggle } from "@/shared/components";

export default function CliproxyapiSettingsTab() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [toolState, setToolState] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch("/api/version-manager/status")
      .then((r) => r.json())
      .then((data) => {
        const entry = Array.isArray(data) ? data.find((t: any) => t.tool === "cliproxyapi") : null;
        setToolState(entry);
      })
      .catch(() => {});
  }, []);

  const updateSetting = async (key: string, value: any) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, [key]: value }));
        setMessage({ type: "success", text: "Setting saved" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save setting" });
    } finally {
      setSaving(false);
    }
  };

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
            <h3 className="font-medium text-sm">CLIProxyAPI Fallback</h3>
            <p className="text-xs text-text-muted">
              When enabled, failed requests are retried through CLIProxyAPI (localhost:8317)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-text-main">Enable CLIProxyAPI Fallback</label>
            <Toggle
              checked={cpaEnabled}
              onChange={(checked) => updateSetting("cliproxyapi_fallback_enabled", checked)}
            />
          </div>

          {cpaEnabled && (
            <>
              <div>
                <label className="text-xs text-text-muted mb-1.5 block">CLIProxyAPI URL</label>
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
        <h3 className="font-medium text-sm mb-4">CLIProxyAPI Status</h3>
        {loading ? (
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <span className="material-symbols-outlined animate-spin text-base">
              progress_activity
            </span>
            Loading...
          </div>
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
          <p className="text-sm text-text-muted">CLIProxyAPI not detected</p>
        )}
      </Card>
    </div>
  );
}
