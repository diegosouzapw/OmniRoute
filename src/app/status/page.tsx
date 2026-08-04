"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

function formatUptime(seconds?: number) {
  if (!seconds || seconds <= 0) return "0m";
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function StatusPage() {
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadHealth() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/monitoring/health", { cache: "no-store" });
      const data = (await response.json()) as HealthPayload;
      if (!response.ok) {
        setError(data.error || "Failed to load system health.");
        setHealth(null);
        return;
      }
      setHealth(data);
    } catch {
      setError("Unable to reach health endpoint. Check connectivity and retry.");
      setHealth(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadHealth();
  }, []);

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
            <h1 className="text-3xl font-bold tracking-tight">System Status</h1>
            <p className="text-text-muted mt-1">
              Live operational snapshot for OmniRoute core services.
            </p>
          </div>
          <button
            onClick={() => void loadHealth()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-br from-primary to-primary-hover text-white transition-all duration-200 motion-reduce:transition-none"
          >
            Refresh
          </button>
        </header>

        {loading && (
          <div
            className="rounded-xl border border-border bg-surface p-6 flex items-center gap-3"
            role="status"
            aria-live="polite"
          >
            <Spinner size="md" />
            <span className="text-text-muted">Loading health metrics...</span>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6" role="alert">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Health Check Failed
            </h2>
            <p className="mt-2 text-sm text-text-muted">{error}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/offline"
                className="px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-bg-alt transition-colors"
              >
                Open Connectivity Help
              </Link>
              <Link
                href="/maintenance"
                className="px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-bg-alt transition-colors"
              >
                Maintenance Info
              </Link>
            </div>
          </div>
        )}

        {!loading && health && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">Service</p>
                <p className="mt-2 text-xl font-semibold">{health.status || "unknown"}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">Version</p>
                <p className="mt-2 text-xl font-semibold">{health.system?.version || "n/a"}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">Uptime</p>
                <p className="mt-2 text-xl font-semibold">{formatUptime(health.system?.uptime)}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">Providers Tracked</p>
                <p className="mt-2 text-xl font-semibold">{providerStats.total}</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">Provider Circuit Breaker State</h2>
              <p className="text-sm text-text-muted mt-1">
                OPEN: {providerStats.open} · HALF_OPEN: {providerStats.halfOpen} · CLOSED:{" "}
                {providerStats.closed}
              </p>
              <p className="mt-4 text-xs text-text-muted">
                Last update:{" "}
                {health.timestamp ? new Date(health.timestamp).toLocaleString() : "n/a"}
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
