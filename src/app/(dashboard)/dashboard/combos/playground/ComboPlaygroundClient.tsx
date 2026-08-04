"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";

// ── Types ────────────────────────────────────────────────────────────────────

interface TargetSimulation {
  provider: string;
  model: string;
  strategy: string;
  rank: number;
  estimatedCost: number;
  estimatedLatencyMs: number;
  status: "available" | "no_quota" | "degraded" | "error" | "unknown";
  maxTokens?: number;
  contextWindow?: number;
}

interface SimulateResponse {
  comboId?: string;
  comboName: string;
  strategy: string;
  targets: TargetSimulation[];
  totalEstimatedCost: number;
  totalEstimatedLatencyMs: number;
  warnings: string[];
  errors: string[];
}

interface Combo {
  id: string;
  name: string;
  strategy: string;
  targets: string;
  isActive: boolean;
}

// ── Status helpers ───────────────────────────────────────────────────────────

function StatusTag({ status }: { status: TargetSimulation["status"] }) {
  const t = useTranslations("combos");
  const map: Record<
    TargetSimulation["status"],
    { labelKey: string; variant: "success" | "error" | "warning" | "info" }
  > = {
    available: { labelKey: "playgroundStatusAvailable", variant: "success" },
    no_quota: { labelKey: "playgroundStatusNoQuota", variant: "error" },
    degraded: { labelKey: "playgroundStatusDegraded", variant: "warning" },
    error: { labelKey: "playgroundStatusError", variant: "error" },
    unknown: { labelKey: "playgroundStatusUnknown", variant: "info" },
  };
  return (
    <Badge variant={map[status].variant} size="sm">
      {t(map[status].labelKey)}
    </Badge>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ComboPlaygroundClient() {
  const t = useTranslations("combos");
  const [combos, setCombos] = useState<Combo[]>([]);
  const [selectedComboId, setSelectedComboId] = useState("");
  const [promptTokens, setPromptTokens] = useState(500);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulateResponse | null>(null);

  // Fetch combos on mount
  useEffect(() => {
    fetch("/api/combos")
      .then((r) => r.json())
      .then((data) => {
        const list: Combo[] = Array.isArray(data) ? data : (data?.combos ?? data?.data ?? []);
        setCombos(list);
        if (list.length > 0) setSelectedComboId(list[0].id);
      })
      .catch(() => {});
  }, []);

  const simulate = useCallback(async () => {
    if (!selectedComboId) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/playground/simulate-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comboId: selectedComboId,
          promptTokens,
        }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else setResult(data);
    } catch {
      setResult({
        comboName: t("playgroundStatusError"),
        strategy: "-",
        targets: [],
        totalEstimatedCost: 0,
        totalEstimatedLatencyMs: 0,
        warnings: [],
        errors: [t("playgroundNetworkError")],
      });
    } finally {
      setLoading(false);
    }
  }, [selectedComboId, promptTokens, t]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t("playgroundTitle")}</h1>
          <p className="text-sm text-text-muted mt-1">{t("playgroundDescription")}</p>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card>
        <div className="p-4 space-y-4">
          <h2 className="text-sm font-semibold">{t("playgroundConfiguration")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Combo Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">Combo</label>
              <select
                className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                value={selectedComboId}
                onChange={(e) => setSelectedComboId(e.target.value)}
              >
                {combos.length === 0 && (
                  <option value="">{t("playgroundNoCombosConfigured")}</option>
                )}
                {combos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.strategy}, {c.isActive ? t("active") : t("inactive")})
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt Tokens */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("playgroundEstimatedPromptTokens")}: <strong>{promptTokens}</strong>
              </label>
              <input
                type="range"
                min={100}
                max={100000}
                step={100}
                value={promptTokens}
                onChange={(e) => setPromptTokens(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>100</span>
                <span>100K</span>
              </div>
            </div>
          </div>

          <Button onClick={simulate} disabled={loading || combos.length === 0}>
            {loading ? t("playgroundSimulating") : t("playgroundSimulateRoute")}
          </Button>
        </div>
      </Card>

      {/* Results */}
      {result && (
        <>
          {/* Combo Overview */}
          <Card>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">{t("playgroundRoutingPath")}</h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-text-muted">
                    {t("playgroundStrategy")}: <strong>{result.strategy}</strong>
                  </span>
                  <span className="text-text-muted">
                    {t("playgroundEstimatedCost")}:{" "}
                    <strong>${result.totalEstimatedCost.toFixed(6)}</strong>
                  </span>
                  <span className="text-text-muted">
                    {t("playgroundEstimatedLatency")}:{" "}
                    <strong>{result.totalEstimatedLatencyMs.toFixed(0)}ms</strong>
                  </span>
                </div>
              </div>

              {/* Visual Cascade */}
              <div className="space-y-0">
                {result.targets.map((target, i) => (
                  <div key={i}>
                    {/* Arrow between targets */}
                    {i > 0 && (
                      <div className="flex justify-center py-1">
                        <div className="flex flex-col items-center text-text-muted">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                          {result.strategy === "priority" && (
                            <span className="text-[10px]">{t("playgroundFallback")}</span>
                          )}
                          {result.strategy === "weighted" && (
                            <span className="text-[10px]">
                              {t("playgroundWeight", { value: target.rank })}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Target Card */}
                    <div
                      className={`border rounded-lg p-3 ${
                        target.status === "available"
                          ? "border-green-500/30 bg-green-500/5"
                          : target.status === "error"
                            ? "border-red-500/30 bg-red-500/5"
                            : target.status === "unknown"
                              ? "border-yellow-500/30 bg-yellow-500/5"
                              : "border-border bg-surface/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {target.rank}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{target.provider}</div>
                            <div className="text-xs text-text-muted font-mono">{target.model}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusTag status={target.status} />
                          <span className="text-xs text-text-muted">
                            ${target.estimatedCost.toFixed(6)}
                          </span>
                          <span className="text-xs text-text-muted">
                            {target.estimatedLatencyMs}ms
                          </span>
                          {target.contextWindow && (
                            <span className="text-xs text-text-muted">
                              {(target.contextWindow / 1000).toFixed(0)}K ctx
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Warnings & Errors */}
          {result.warnings.length > 0 && (
            <Card>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                  {t("playgroundWarningCount", { count: result.warnings.length })}
                </h3>
                {result.warnings.map((w, i) => (
                  <p key={i} className="text-sm text-text-muted flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠️</span>
                    {w}
                  </p>
                ))}
              </div>
            </Card>
          )}

          {result.errors.length > 0 && (
            <Card>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                  {t("playgroundErrorCount", { count: result.errors.length })}
                </h3>
                {result.errors.map((e, i) => (
                  <p key={i} className="text-sm text-red-500 flex items-start gap-2">
                    <span className="mt-0.5">🚫</span>
                    {e}
                  </p>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Empty State */}
      {!result && combos.length > 0 && (
        <Card>
          <div className="p-8 text-center">
            <p className="text-text-muted">
              {t.rich("playgroundEmptyHint", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>
        </Card>
      )}

      {combos.length === 0 && (
        <Card>
          <div className="p-8 text-center">
            <p className="text-text-muted">
              {t("playgroundNoCombosYet")}{" "}
              <Link href="/dashboard/combos" className="text-primary hover:underline">
                {t("playgroundCreateFirst")}
              </Link>
              .
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
