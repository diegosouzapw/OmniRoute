"use client";

import { useTranslations } from "next-intl";

export interface CompareResult {
  provider: string;
  latency: number;
  cost: number;
  resultCount: number;
  responseSize: number;
  urls: string[];
  error?: string;
}

interface ProviderComparisonProps {
  initialProvider: string;
  initialResult: CompareResult;
  otherResults: CompareResult[];
  loading: boolean;
  onClose: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function ProviderComparison({
  initialProvider,
  initialResult,
  otherResults,
  loading,
  onClose,
}: ProviderComparisonProps) {
  const t = useTranslations("search");

  const allResults = [initialResult, ...otherResults];
  const initialUrls = new Set(initialResult.urls);

  const valid = allResults.filter((r) => !r.error);
  const latencies = valid.map((r) => r.latency);
  const costs = valid.map((r) => r.cost);
  const sizes = valid.map((r) => r.responseSize);
  const bestLatency = Math.min(...latencies);
  const worstLatency = Math.max(...latencies);
  const bestCost = Math.min(...costs);
  const worstCost = Math.max(...costs);
  const bestSize = Math.min(...sizes);
  const worstSize = Math.max(...sizes);

  const getLatencyColor = (val: number) => {
    if (val === bestLatency) return "text-success font-medium";
    if (val === worstLatency) return "text-warning";
    return "text-text-main";
  };

  const getCostColor = (val: number) => {
    if (val === bestCost) return "text-success font-medium";
    if (val === worstCost) return "text-warning";
    return "text-text-main";
  };

  const getSizeColor = (val: number) => {
    if (val === bestSize) return "text-success font-medium";
    if (val === worstSize) return "text-warning";
    return "text-text-main";
  };

  return (
    <div className="bg-surface border border-accent/20 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2.5 bg-accent/5 border-b border-accent/15">
        <span className="text-xs font-semibold text-accent flex items-center gap-1.5">
          ⇕ {t("compareProviders")}
        </span>
        <button onClick={onClose} className="text-text-muted text-xs hover:text-text-main">
          ✕
        </button>
      </div>
      <div className="p-3 overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <span className="material-symbols-outlined text-[20px] text-accent animate-spin">
              progress_activity
            </span>
            <span className="text-xs text-text-muted ml-2">{t("compareProviders")}...</span>
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 text-text-muted font-semibold" />
                {allResults.map((r) => (
                  <th
                    key={r.provider}
                    className={`text-center p-2 font-semibold ${
                      r.provider === initialProvider ? "text-primary" : "text-text-muted"
                    }`}
                  >
                    {r.provider.replace("-search", "")}
                    {r.provider === initialProvider && " ✓"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="p-2 text-text-muted">{t("latency")}</td>
                {allResults.map((r) => (
                  <td
                    key={r.provider}
                    className={`text-center p-2 ${r.error ? "text-error" : getLatencyColor(r.latency)}`}
                  >
                    {r.error ? "Error" : `${r.latency}ms`}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-2 text-text-muted">{t("cost")}</td>
                {allResults.map((r) => (
                  <td
                    key={r.provider}
                    className={`text-center p-2 ${r.error ? "text-error" : getCostColor(r.cost)}`}
                  >
                    {r.error ? "Error" : `$${r.cost.toFixed(4)}`}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-2 text-text-muted">{t("results")}</td>
                {allResults.map((r) => (
                  <td
                    key={r.provider}
                    className={`text-center p-2 ${r.error ? "text-error" : "text-text-main"}`}
                  >
                    {r.error ? "Error" : r.resultCount}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-2 text-text-muted">{t("size")}</td>
                {allResults.map((r) => (
                  <td
                    key={r.provider}
                    className={`text-center p-2 ${r.error ? "text-error" : getSizeColor(r.responseSize)}`}
                  >
                    {r.error ? "Error" : formatBytes(r.responseSize)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 text-text-muted">{t("urlOverlap")}</td>
                {allResults.map((r) => (
                  <td key={r.provider} className="text-center p-2 text-text-main">
                    {r.provider === initialProvider
                      ? "—"
                      : r.error
                        ? "Error"
                        : `${r.urls.filter((u) => initialUrls.has(u)).length}/${r.resultCount}`}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
