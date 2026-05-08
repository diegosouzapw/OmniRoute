"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";

const TRANSPARENT_MITM_PORT = 443;

type MitmTargetRoute = {
  id: string;
  name: string;
  targetHost: string;
  targetPort: number;
  localPort: number;
  endpoints: string[];
  enabled: boolean;
};

type MitmStatus = {
  running: boolean;
  pid: number | null;
  dnsConfigured: boolean;
  certExists: boolean;
  hasCachedPassword: boolean;
  port: number;
  targets: MitmTargetRoute[];
  stats: {
    startedAt: string | null;
    totalRequests: number;
    interceptedRequests: number;
    activeConnections: number;
    lastRequestAt: string | null;
    lastInterceptAt: string | null;
  };
};

function emptyStatus(): MitmStatus {
  return {
    running: false,
    pid: null,
    dnsConfigured: false,
    certExists: false,
    hasCachedPassword: false,
    port: 443,
    targets: [],
    stats: {
      startedAt: null,
      totalRequests: 0,
      interceptedRequests: 0,
      activeConnections: 0,
      lastRequestAt: null,
      lastInterceptAt: null,
    },
  };
}

function formatDate(value: string | null) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function MitmProxyTab() {
  const t = useTranslations("mitm");
  const [status, setStatus] = useState<MitmStatus>(emptyStatus);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [port, setPort] = useState("443");
  const [apiKey, setApiKey] = useState("");
  const [sudoPassword, setSudoPassword] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/settings/mitm");
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || t("loadFailed"));
      setStatus(data);
      setPort(String(TRANSPARENT_MITM_PORT));
      setFeedback(null);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("loadFailed"),
      });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  const updateMitm = async (payload: Record<string, unknown>, successMessage: string) => {
    setSaving(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/settings/mitm", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || t("saveFailed"));
      setStatus(data);
      setPort(String(TRANSPARENT_MITM_PORT));
      setFeedback({ type: "success", message: successMessage });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("saveFailed"),
      });
    } finally {
      setSaving(false);
    }
  };

  const savePort = () => {
    const parsedPort = Number.parseInt(port, 10);
    if (parsedPort !== TRANSPARENT_MITM_PORT) {
      setFeedback({ type: "error", message: t("invalidPort") });
      setPort(String(TRANSPARENT_MITM_PORT));
      return;
    }
    void updateMitm({ port: TRANSPARENT_MITM_PORT }, t("settingsSaved"));
  };

  const toggleMitm = () => {
    void updateMitm(
      {
        enabled: !status.running,
        port: TRANSPARENT_MITM_PORT,
        apiKey: String(apiKey || "").trim() || undefined,
        sudoPassword: sudoPassword || undefined,
      },
      status.running ? t("stoppedSuccess") : t("startedSuccess")
    );
  };

  const regenerateCertificate = async () => {
    if (!confirm(t("regenerateConfirm"))) return;

    setSaving(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/settings/mitm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "regenerate-cert" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || t("regenerateFailed"));
      setStatus(data);
      setFeedback({ type: "success", message: t("regenerateSuccess") });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("regenerateFailed"),
      });
    } finally {
      setSaving(false);
    }
  };

  const statusTone = status.running
    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
    : "border-border bg-sidebar text-text-muted";

  return (
    <Card className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-text-main">
            <span className="material-symbols-outlined text-[20px] text-primary">lan</span>
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-text-muted">{t("description")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${statusTone}`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {status.running ? "play_circle" : "pause_circle"}
            </span>
            {status.running ? t("running") : t("stopped")}
          </span>
          <button
            onClick={() => void loadStatus()}
            disabled={loading}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
          >
            {t("refresh")}
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
              : "border-red-500/30 bg-red-500/10 text-red-600"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface/50 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-main">{t("enable")}</p>
                <p className="text-xs text-text-muted">{t("enableDesc")}</p>
              </div>
              <button
                onClick={toggleMitm}
                disabled={saving || loading}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-40 ${
                  status.running ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {status.running ? "stop_circle" : "play_circle"}
                </span>
                {status.running ? t("stop") : t("start")}
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  {t("port")}
                </span>
                <input
                  value={port}
                  readOnly
                  disabled={status.running}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
                />
              </label>
              <label className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  {t("apiKey")}
                </span>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(event) => setApiKey(event.target.value)}
                  placeholder={t("apiKeyPlaceholder")}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </label>
              <label className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  {t("sudoPassword")}
                </span>
                <input
                  type="password"
                  value={sudoPassword}
                  onChange={(event) => setSudoPassword(event.target.value)}
                  placeholder={status.hasCachedPassword ? t("cachedPassword") : t("sudoPassword")}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </label>
            </div>
            <button
              onClick={savePort}
              disabled={saving || status.running}
              className="mt-3 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
            >
              {t("saveSettings")}
            </button>
          </div>

          <div className="rounded-xl border border-border bg-surface/50 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-main">{t("certificate")}</p>
                <p className="text-xs text-text-muted">
                  {status.certExists ? t("certificateReady") : t("certificateMissing")}
                </p>
              </div>
              <span
                className={`rounded-full border px-2 py-1 text-xs ${
                  status.certExists
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-600"
                }`}
              >
                {status.certExists ? t("available") : t("missing")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/api/settings/mitm?download=cert"
                className={`inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors ${
                  status.certExists
                    ? "text-text-main hover:bg-sidebar"
                    : "pointer-events-none text-text-muted opacity-50"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                {t("downloadCert")}
              </a>
              <button
                onClick={regenerateCertificate}
                disabled={saving || status.running}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[18px]">autorenew</span>
                {t("regenerateCert")}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {[
            {
              label: t("interceptedRequests"),
              value: status.stats.interceptedRequests.toLocaleString(),
              icon: "swap_horiz",
            },
            {
              label: t("activeConnections"),
              value: status.stats.activeConnections.toLocaleString(),
              icon: "hub",
            },
            {
              label: t("dnsConfigured"),
              value: status.dnsConfigured ? t("yes") : t("no"),
              icon: "dns",
            },
            {
              label: t("pid"),
              value: status.pid ? String(status.pid) : "-",
              icon: "tag",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-surface/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-text-main">{item.value}</p>
                </div>
                <span className="material-symbols-outlined rounded-lg bg-primary/10 p-2 text-[20px] text-primary">
                  {item.icon}
                </span>
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-border bg-surface/50 p-4 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("lastIntercept")}
            </p>
            <p className="mt-1 text-sm text-text-main">
              {formatDate(status.stats.lastInterceptAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border">
        <div className="border-b border-border bg-sidebar/40 px-4 py-3">
          <h3 className="text-sm font-semibold text-text-main">{t("targetRoutes")}</h3>
        </div>
        {status.targets.length === 0 ? (
          <div className="p-6 text-center text-sm text-text-muted">{t("noTargets")}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">{t("target")}</th>
                  <th className="px-4 py-3 font-medium">{t("host")}</th>
                  <th className="px-4 py-3 font-medium">{t("localPort")}</th>
                  <th className="px-4 py-3 font-medium">{t("endpoints")}</th>
                  <th className="px-4 py-3 font-medium">{t("status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {status.targets.map((target) => (
                  <tr key={target.id}>
                    <td className="px-4 py-3 font-medium text-text-main">{target.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">
                      {target.targetHost}:{target.targetPort}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">
                      {target.localPort}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {target.endpoints.map((endpoint) => (
                          <span
                            key={endpoint}
                            className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs text-text-muted"
                          >
                            {endpoint}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-border bg-sidebar px-2 py-1 text-xs text-text-muted">
                        {target.enabled ? t("enabled") : t("configured")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}
