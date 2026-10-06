"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Spinner } from "@/shared/components/Loading";

interface HealthPayload {
  status?: string;
  timestamp?: string;
  system?: {
    version?: string;
    uptime?: number;
    nodeVersion?: string;
    platform?: string;
    pid?: number;
  };
  providerHealth?: Record<string, { state?: string; failures?: number }>;
  error?: string;
}

function formatUptime(
  seconds: number | undefined,
  format: (key: string, values?: Record<string, number>) => string
) {
  if (!seconds || seconds <= 0) return format("status.uptimeMinutes", { minutes: 0 });
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (hours > 0) return format("status.uptimeHoursMinutes", { hours, minutes });
  return format("status.uptimeMinutes", { minutes });
}

export default function StatusPage() {
  const t = useTranslations("publicSystem");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/monitoring/health", { cache: "no-store" });
      const data = (await response.json()) as HealthPayload;
      if (!response.ok) {
        setError(data.error || t("status.failedToLoad"));
        setHealth(null);
        return;
      }
      setHealth(data);
    } catch {
      setError(t("status.unableToReachHealth"));
      setHealth(null);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void (async () => {
      await loadHealth();
    })();
  }, [loadHealth]);

  const providerStats = useMemo(() => {
    const providers = Object.entries(health?.providerHealth || {});
    const open = providers.filter(([, p]) => p.state === "OPEN").length;
    const halfOpen = providers.filter(([, p]) => p.state === "HALF_OPEN").length;
    const closed = providers.filter(([, p]) => p.state === "CLOSED").length;
    return { total: providers.length, open, halfOpen, closed };
  }, [health]);

  return (
    <main className="min-h-screen text-text-main p-6 sm:p-10">
      <section className="max-w-4xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("status.title")}</h1>
            <p className="text-text-muted mt-1">{t("status.description")}</p>
          </div>
          <button
            onClick={() => void loadHealth()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-br from-primary to-primary-hover text-white transition-all duration-200 motion-reduce:transition-none"
          >
            {tc("refresh")}
          </button>
        </header>

        {loading && (
          <div
            className="rounded-xl border border-border bg-surface p-6 flex items-center gap-3"
            role="status"
            aria-live="polite"
          >
            <Spinner size="md" />
            <span className="text-text-muted">{t("status.loadingHealth")}</span>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6" role="alert">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
              {t("status.healthCheckFailed")}
            </h2>
            <p className="mt-2 text-sm text-text-muted">{error}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/offline"
                className="px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-bg-alt transition-colors"
              >
                {t("status.openConnectivityHelp")}
              </Link>
              <Link
                href="/maintenance"
                className="px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-bg-alt transition-colors"
              >
                {t("status.maintenanceInfo")}
              </Link>
            </div>
          </div>
        )}

        {!loading && health && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">
                  {t("status.service")}
                </p>
                <p className="mt-2 text-xl font-semibold">{health.status || t("status.unknown")}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">{tc("version")}</p>
                <p className="mt-2 text-xl font-semibold">
                  {health.system?.version || t("status.notAvailable")}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">{tc("uptime")}</p>
                <p className="mt-2 text-xl font-semibold">
                  {formatUptime(health.system?.uptime, t)}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">
                  {t("status.providersTracked")}
                </p>
                <p className="mt-2 text-xl font-semibold">{providerStats.total}</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">{t("status.circuitBreakerState")}</h2>
              <p className="text-sm text-text-muted mt-1">
                OPEN: {providerStats.open} · HALF_OPEN: {providerStats.halfOpen} · CLOSED:{" "}
                {providerStats.closed}
              </p>
              <p className="mt-4 text-xs text-text-muted">
                {t("status.lastUpdate", {
                  timestamp: health.timestamp
                    ? new Date(health.timestamp).toLocaleString()
                    : t("status.notAvailable"),
                })}
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
