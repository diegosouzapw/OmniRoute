"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button } from "@/shared/components";

interface ToolState {
  tool: string;
  installedVersion: string | null;
  currentVersion: string | null;
  status: string;
  pid: number | null;
  port: number;
  healthStatus: string;
  autoUpdate: boolean;
  autoStart: boolean;
  lastHealthCheck: string | null;
  errorMessage: string | null;
}

interface UpdateInfo {
  current: string | null;
  latest: string;
  updateAvailable: boolean;
}

export default function CliproxyapiToolCard({ isExpanded, onToggle }) {
  const [toolState, setToolState] = useState<ToolState | null>(null);
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/version-manager/status");
      if (!res.ok) return;
      const data = await res.json();
      const entry = Array.isArray(data)
        ? data.find((t: ToolState) => t.tool === "cliproxyapi")
        : null;
      setToolState(entry || null);
    } catch (err) {
      console.error("Failed to fetch CLIProxyAPI status:", err);
    }
  }, []);

  const fetchUpdateInfo = useCallback(async () => {
    try {
      const res = await fetch("/api/version-manager/check-update?tool=cliproxyapi");
      if (!res.ok) return;
      setUpdateInfo(await res.json());
    } catch (err) {
      console.error("Failed to fetch CLIProxyAPI update info:", err);
    }
  }, []);

  useEffect(() => {
    if (isExpanded) {
      fetchStatus();
      fetchUpdateInfo();
    }
  }, [isExpanded, fetchStatus, fetchUpdateInfo]);

  const apiCall = async (action: string, body?: Record<string, unknown>) => {
    setLoading(action);
    setMessage(null);
    try {
      const res = await fetch(`/api/version-manager/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "cliproxyapi", ...body }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || `${action} succeeded` });
        await fetchStatus();
        if (action === "install" || action === "restart") await fetchUpdateInfo();
      } else {
        setMessage({ type: "error", text: data.error || `${action} failed` });
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Request failed" });
    } finally {
      setLoading(null);
    }
  };

  const statusBadge = () => {
    if (!toolState) return null;
    const s = toolState.status;
    const map: Record<string, { label: string; color: string }> = {
      running: { label: "Running", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
      stopped: { label: "Stopped", color: "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400" },
      not_installed: {
        label: "Not Installed",
        color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      },
      installed: { label: "Installed", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
      error: { label: "Error", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
    };
    const badge = map[s] || map.not_installed;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full ${badge.color}`}
      >
        <span className="size-1.5 rounded-full bg-current" />
        {badge.label}
      </span>
    );
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-500/10">
            <span className="material-symbols-outlined text-indigo-500 text-xl">swap_horiz</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">CLIProxyAPI</h3>
              {statusBadge()}
            </div>
            <p className="text-xs text-text-muted truncate">
              Upstream proxy fallback (Go-based OAuth)
            </p>
          </div>
        </div>
        <span
          className={`material-symbols-outlined text-text-muted text-[20px] transition-transform ${isExpanded ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border space-y-4">
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

          {updateInfo?.updateAvailable && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-500 text-lg">
                  system_update
                </span>
                <span className="text-sm text-yellow-700 dark:text-yellow-300">
                  Update available: v{updateInfo.current} → v{updateInfo.latest}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => apiCall("install", { version: updateInfo.latest })}
                loading={loading === "install"}
              >
                Update
              </Button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-bg-secondary">
              <p className="text-xs text-text-muted mb-1">Version</p>
              <p className="text-sm font-medium">
                {toolState?.installedVersion ? `v${toolState.installedVersion}` : "Not installed"}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-bg-secondary">
              <p className="text-xs text-text-muted mb-1">Health</p>
              <p
                className={`text-sm font-medium ${toolState?.healthStatus === "healthy" ? "text-green-600 dark:text-green-400" : toolState?.healthStatus === "unhealthy" ? "text-red-600 dark:text-red-400" : "text-text-muted"}`}
              >
                {toolState?.healthStatus === "healthy"
                  ? `Healthy`
                  : toolState?.healthStatus === "unhealthy"
                    ? "Unhealthy"
                    : "Unknown"}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-bg-secondary">
              <p className="text-xs text-text-muted mb-1">Port</p>
              <p className="text-sm font-mono">{toolState?.port || 8317}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {!toolState?.installedVersion && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => apiCall("install")}
                loading={loading === "install"}
              >
                <span className="material-symbols-outlined text-[14px] mr-1">download</span>
                Install
              </Button>
            )}
            {toolState?.status === "running" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => apiCall("stop")}
                loading={loading === "stop"}
              >
                <span className="material-symbols-outlined text-[14px] mr-1">stop</span>
                Stop
              </Button>
            ) : toolState?.installedVersion ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => apiCall("start")}
                loading={loading === "start"}
              >
                <span className="material-symbols-outlined text-[14px] mr-1">play_arrow</span>
                Start
              </Button>
            ) : null}
            {toolState?.status === "running" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => apiCall("restart")}
                loading={loading === "restart"}
              >
                <span className="material-symbols-outlined text-[14px] mr-1">restart_alt</span>
                Restart
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchUpdateInfo}
              loading={loading === "check"}
            >
              <span className="material-symbols-outlined text-[14px] mr-1">sync</span>
              Check Updates
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
