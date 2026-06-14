"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Card, Button, Toggle, ProxyConfigModal } from "@/shared/components";
import { useTranslations } from "next-intl";

type GlobalProxyConfig = { type: string; host: string; port: number } | null;

type HealthcheckResult = {
  proxyUrl: string;
  ok: boolean;
  latencyMs: number | null;
};

type HealthcheckSummary = {
  total: number;
  working: number;
  failed: number;
};

export default function GlobalConfigTab() {
  const [proxyModalOpen, setProxyModalOpen] = useState(false);
  const [globalProxy, setGlobalProxy] = useState<GlobalProxyConfig>(null);
  const [perKeyProxyEnabled, setPerKeyProxyEnabled] = useState(false);
  const [perKeyLoading, setPerKeyLoading] = useState(true);
  const [targetUrl, setTargetUrl] = useState("https://api.openai.com/v1/models");
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<HealthcheckResult[] | null>(null);
  const [summary, setSummary] = useState<HealthcheckSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const t = useTranslations("settings");
  const tc = useTranslations("common");

  const loadGlobalProxy = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/proxy?level=global");
      if (res.ok) {
        const data = await res.json();
        setGlobalProxy(data.proxy || null);
      }
    } catch {}
  }, []);

  const loadPerKeyProxyEnabled = useCallback(async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (mountedRef.current) setPerKeyProxyEnabled(data.perKeyProxyEnabled === true);
      }
    } catch {
      /* leave default */
    } finally {
      if (mountedRef.current) setPerKeyLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    loadGlobalProxy();
    loadPerKeyProxyEnabled();
    return () => {
      mountedRef.current = false;
    };
  }, [loadGlobalProxy, loadPerKeyProxyEnabled]);

  const handleTogglePerKeyProxyEnabled = async () => {
    const newValue = !perKeyProxyEnabled;
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ perKeyProxyEnabled: newValue }),
      });
      if (res.ok) {
        setPerKeyProxyEnabled(newValue);
      }
    } catch (err) {
      console.error("Failed to update per-key proxy setting:", err);
    }
  };

  const runHealthcheck = async () => {
    setTesting(true);
    setResults(null);
    setSummary(null);
    setError(null);

    try {
      const res = await fetch("/api/proxy-fallback/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        setError(err.error || `HTTP ${res.status}`);
        return;
      }

      const data = await res.json();
      setResults(data.results);
      setSummary(data.summary);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("healthcheckFailed"));
    } finally {
      setTesting(false);
    }
  };

  return (
    <>
      <Card className="p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
              vpn_lock
            </span>
            <h2 className="text-lg font-bold">{t("globalProxy")}</h2>
          </div>
          <p className="text-sm text-text-muted mb-4">{t("globalProxyDesc")}</p>
          <div className="flex items-center gap-3">
            {globalProxy ? (
              <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {globalProxy.type}://{globalProxy.host}:{globalProxy.port}
              </span>
            ) : (
              <span className="text-sm text-text-muted">{t("noGlobalProxy")}</span>
            )}
            <Button
              size="sm"
              variant={globalProxy ? "secondary" : "primary"}
              icon="settings"
              onClick={() => {
                loadGlobalProxy();
                setProxyModalOpen(true);
              }}
            >
              {globalProxy ? tc("edit") : t("configure")}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-xl text-violet-500"
                aria-hidden="true"
              >
                key
              </span>
              <div>
                <h2 className="text-lg font-bold">{t("perKeyProxyEnabled")}</h2>
                <p className="text-sm text-text-muted">{t("perKeyProxyEnabledDesc")}</p>
              </div>
            </div>
            <Toggle
              checked={perKeyProxyEnabled}
              disabled={perKeyLoading}
              onChange={handleTogglePerKeyProxyEnabled}
            />
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
              network_check
            </span>
            <h2 className="text-lg font-bold">{t("bulkHealthcheck")}</h2>
          </div>
          <p className="text-sm text-text-muted mb-4">{t("bulkHealthcheckDesc")}</p>
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://api.openai.com/v1/models"
              className="flex-1 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button
              size="sm"
              variant="primary"
              icon={testing ? "refresh" : "play_arrow"}
              disabled={testing}
              onClick={runHealthcheck}
            >
              {testing ? t("healthcheckTesting") : t("healthcheckAll")}
            </Button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
              {error}
            </div>
          )}

          {testing && !results && (
            <div className="flex items-center gap-2 text-sm text-text-muted py-2">
              <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
              {t("healthcheckTestingAll")}
            </div>
          )}

          {summary && (
            <div className="flex items-center gap-4 mb-3 text-sm">
              <span className="text-text-muted">
                {t("healthcheckTotal")}: <strong>{summary.total}</strong>
              </span>
              <span className="text-emerald-400">
                {t("healthcheckWorking")}: <strong>{summary.working}</strong>
              </span>
              <span className="text-red-400">
                {t("healthcheckFailedLabel")}: <strong>{summary.failed}</strong>
              </span>
            </div>
          )}

          {results && results.length > 0 && (
            <div className="max-h-64 overflow-y-auto rounded-lg border border-black/10 dark:border-white/10">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-black/5 dark:bg-white/5">
                    <th className="text-left px-3 py-2 font-medium text-text-muted">
                      {t("healthcheckStatus")}
                    </th>
                    <th className="text-left px-3 py-2 font-medium text-text-muted">
                      {t("healthcheckProxyUrl")}
                    </th>
                    <th className="text-right px-3 py-2 font-medium text-text-muted">
                      {t("healthcheckLatency")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-t border-black/5 dark:border-white/5">
                      <td className="px-3 py-1.5">
                        {r.ok ? (
                          <span className="text-emerald-400 text-sm">✓</span>
                        ) : (
                          <span className="text-red-400 text-sm">✗</span>
                        )}
                      </td>
                      <td className="px-3 py-1.5 font-mono truncate max-w-xs">{r.proxyUrl}</td>
                      <td className="px-3 py-1.5 text-right text-text-muted">
                        {r.latencyMs !== null ? `${r.latencyMs}ms` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>

      <ProxyConfigModal
        isOpen={proxyModalOpen}
        onClose={() => setProxyModalOpen(false)}
        level="global"
        levelLabel={t("globalLabel")}
        onSaved={loadGlobalProxy}
      />
    </>
  );
}
