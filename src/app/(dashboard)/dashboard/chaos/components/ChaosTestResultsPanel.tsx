"use client";

export interface ChaosModelResult {
  providerId: string;
  providerName: string;
  modelId: string;
  status: "success" | "error" | "skipped";
  content: string | null;
  error?: string;
  durationMs: number;
}

export interface ChaosTestResult {
  task: string;
  mode: string;
  startedAt: string;
  totalProviders: number;
  totalResults: number;
  models: ChaosModelResult[];
  summary?: string;
}

/**
 * Test-run results panel for the Chaos Mode config page. Extracted out of
 * ChaosConfigPageClient.tsx to keep the page component under the
 * complexity/size ratchet (config/quality/complexity-baseline.json).
 */
export function ChaosTestResultsPanel({ result }: { result: ChaosTestResult }) {
  return (
    <div className="p-3 rounded-lg border border-border bg-surface/40 space-y-3">
      <h3 className="text-sm font-bold text-text-main">
        Test Results — {result.mode} mode ({result.totalProviders} providers)
      </h3>
      <div className="text-xs text-text-muted">
        Started: {new Date(result.startedAt).toLocaleTimeString()}
      </div>
      {result.models.map((model, idx) => (
        <div
          key={idx}
          className={`p-2 rounded-md text-xs ${
            model.status === "success"
              ? "bg-green-500/5 border border-green-500/20"
              : "bg-red-500/5 border border-red-500/20"
          }`}
        >
          <div className="font-medium text-text-main">
            [{idx + 1}] {model.providerName} / {model.modelId}
            <span className="ml-2 text-text-muted">({model.durationMs}ms)</span>
            <span
              className={`ml-2 ${model.status === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {model.status}
            </span>
          </div>
          {model.status === "success" && model.content && (
            <div className="mt-1 text-text-muted line-clamp-3 whitespace-pre-wrap">
              {model.content.slice(0, 300)}
              {model.content.length > 300 ? "..." : ""}
            </div>
          )}
          {model.error && <div className="mt-1 text-red-500">{model.error}</div>}
        </div>
      ))}
    </div>
  );
}
