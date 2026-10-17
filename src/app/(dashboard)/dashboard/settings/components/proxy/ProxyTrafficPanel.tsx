"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { fmtFull } from "@/shared/utils/formatting";
import type { TrafficCounters, TrafficItem } from "@/lib/db/proxyTraffic";

type TrafficReport = {
  items: TrafficItem[];
  total: TrafficCounters;
  proxied: TrafficCounters;
  direct: TrafficCounters;
  unattributed: TrafficCounters;
  persistenceIncomplete: boolean;
};

export default function ProxyTrafficPanel() {
  const t = useTranslations("settings.proxyTraffic");
  const [report, setReport] = useState<TrafficReport | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/settings/proxies/traffic", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Payload traffic unavailable");
        return response.json() as Promise<TrafficReport>;
      })
      .then((data) => {
        if (!controller.signal.aborted) setReport(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [revision]);

  return (
    <section
      className="rounded-lg border border-border bg-bg-secondary p-4 space-y-3"
      aria-labelledby="proxy-traffic-heading"
      aria-busy={loading}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id="proxy-traffic-heading" className="text-sm font-semibold text-text">
          {t("title")}
        </h3>
        <button
          type="button"
          className="text-sm text-primary hover:underline disabled:opacity-50"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            setError(false);
            setRevision((value) => value + 1);
          }}
        >
          {t("refresh")}
        </button>
      </div>
      <p className="text-xs text-text-muted">{t("description")}</p>
      <p className="text-xs text-text-muted">{t("coverageNote")}</p>
      {report?.persistenceIncomplete && (
        <p role="alert" className="text-sm text-text">
          {t("persistenceIncomplete")}
        </p>
      )}
      {error ? (
        <p role="alert" className="text-sm text-text">
          {t("error")}
        </p>
      ) : !report ? (
        <p role="status" className="text-sm text-text-muted">
          {t("loading")}
        </p>
      ) : report.items.length === 0 ? (
        <p className="text-sm text-text-muted">{t("empty")}</p>
      ) : (
        <TrafficTable report={report} />
      )}
    </section>
  );
}

function TrafficTable({ report }: { report: TrafficReport }) {
  const t = useTranslations("settings.proxyTraffic");
  const rows = [
    { key: "overall", name: t("overall"), ...report.total },
    { key: "proxied", name: t("proxied"), ...report.proxied },
    ...report.items.map((item) => ({
      ...item,
      name:
        item.kind === "direct"
          ? t("direct")
          : item.kind === "unattributed"
            ? t("unattributed")
            : (item.name ??
              (item.kind === "registry"
                ? t("removed", { id: item.proxyId ?? "" })
                : t("legacy", { id: item.key.slice(-8) }))),
    })),
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <caption className="sr-only">{t("title")}</caption>
        <thead className="text-xs text-text-muted">
          <tr>
            {[
              "route",
              "upload",
              "download",
              "attempts",
              "knownUpload",
              "completed",
              "failed",
              "cancelled",
              "errored",
            ].map((key) => (
              <th key={key} scope="col" className="px-3 py-2 whitespace-nowrap">
                {t(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-t border-border">
              <th scope="row" className="px-3 py-2 font-medium text-text whitespace-nowrap">
                {row.name}
              </th>
              <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                {fmtFull(row.uploadBytes)} B
              </td>
              <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                {fmtFull(row.downloadBytes)} B
              </td>
              <td className="px-3 py-2 tabular-nums">{fmtFull(row.attempts)}</td>
              <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                {fmtFull(row.knownUploadAttempts)} / {fmtFull(row.attempts)}
              </td>
              <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                {fmtFull(row.completedDownloads)} / {fmtFull(row.attempts)}
              </td>
              <td className="px-3 py-2 tabular-nums">{fmtFull(row.failedAttempts)}</td>
              <td className="px-3 py-2 tabular-nums">{fmtFull(row.cancelledDownloads)}</td>
              <td className="px-3 py-2 tabular-nums">{fmtFull(row.erroredDownloads)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
