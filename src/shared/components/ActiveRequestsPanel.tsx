"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type ActiveRequestRow = {
  model: string;
  provider: string;
  account: string;
  startedAt: number;
  runningTimeMs: number;
  count: number;
  clientEndpoint?: string | null;
  clientRequest?: unknown;
  providerRequest?: unknown;
  providerUrl?: string | null;
};

function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes <= 0) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m ${seconds}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export default function ActiveRequestsPanel() {
  const t = useTranslations("logs");
  const [rows, setRows] = useState<ActiveRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<ActiveRequestRow | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/logs/active", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setRows(Array.isArray(data.activeRequests) ? data.activeRequests : []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load active requests:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    const interval = setInterval(load, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const handleClearAll = async () => {
    if (!window.confirm(t("confirmClearActiveRequests") || "Clear all active requests?")) return;
    try {
      const res = await fetch("/api/logs/active", { method: "DELETE" });
      if (res.ok) {
        setRows([]);
        setSelectedRow(null);
      }
    } catch (error) {
      console.error("Failed to clear active requests:", error);
    }
  };

  if (!loading && rows.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-main">
            {t("runningRequests")}
          </h3>
          <p className="text-xs text-text-muted">{t("runningRequestsDesc")}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {loading ? t("loading") : t("activeCount", { count: rows.length })}
          </div>
          {rows.length > 0 && (
            <button
              onClick={handleClearAll}
              className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
            >
              {t("clearAll") || "Clear All"}
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-sidebar/40 text-left text-xs uppercase tracking-wide text-text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("model")}</th>
              <th className="px-4 py-3 font-medium">{t("provider")}</th>
              <th className="px-4 py-3 font-medium">{t("account")}</th>
              <th className="px-4 py-3 font-medium">{t("elapsed")}</th>
              <th className="px-4 py-3 font-medium">{t("count")}</th>
              <th className="px-4 py-3 font-medium">{t("payloads")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.account}:${row.provider}:${row.model}:${row.startedAt}`}
                className="border-t border-border/60"
              >
                <td className="px-4 py-3 font-medium text-text-main">{row.model}</td>
                <td className="px-4 py-3 text-text-muted">{row.provider}</td>
                <td className="px-4 py-3 text-text-muted">{row.account}</td>
                <td className="px-4 py-3 text-text-main">{formatDuration(row.runningTimeMs)}</td>
                <td className="px-4 py-3 text-text-main">{row.count}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRow(row)}
                    className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-text-main transition-colors hover:bg-sidebar/40"
                  >
                    {t("viewPayloads")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
          <div className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <h4 className="text-lg font-semibold text-text-main">
                  {selectedRow.provider} / {selectedRow.model}
                </h4>
                <p className="mt-1 text-sm text-text-muted">
                  {t("runningRequestDetailMeta", {
                    account: selectedRow.account,
                    elapsed: formatDuration(selectedRow.runningTimeMs),
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRow(null)}
                className="rounded-full border border-border p-2 text-text-muted transition-colors hover:bg-sidebar/40 hover:text-text-main"
                aria-label={t("close")}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="grid gap-4 overflow-y-auto px-5 py-5 md:grid-cols-2">
              <section className="rounded-xl border border-border bg-bg-subtle p-4">
                <div className="mb-3">
                  <h5 className="text-sm font-semibold text-text-main">{t("clientPayload")}</h5>
                  <p className="mt-1 text-xs text-text-muted">
                    {selectedRow.clientEndpoint || t("notAvailable")}
                  </p>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-border/70 bg-bg p-3 text-xs text-text-muted">
                  {JSON.stringify(selectedRow.clientRequest || {}, null, 2)}
                </pre>
              </section>

              <section className="rounded-xl border border-border bg-bg-subtle p-4">
                <div className="mb-3">
                  <h5 className="text-sm font-semibold text-text-main">{t("upstreamPayload")}</h5>
                  <p className="mt-1 break-all text-xs text-text-muted">
                    {selectedRow.providerUrl || t("upstreamNotSentYet")}
                  </p>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-border/70 bg-bg p-3 text-xs text-text-muted">
                  {JSON.stringify(selectedRow.providerRequest || {}, null, 2)}
                </pre>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
