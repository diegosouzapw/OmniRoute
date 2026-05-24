"use client";

import { useState, useEffect, useCallback } from "react";
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
  const map: Record<
    TargetSimulation["status"],
    { label: string; variant: "success" | "error" | "warning" | "info" }
  > = {
    available: { label: "Available", variant: "success" },
    no_quota: { label: "No Quota", variant: "error" },
    degraded: { label: "Degraded", variant: "warning" },
    error: { label: "Error", variant: "error" },
    unknown: { label: "Unknown", variant: "info" },
  };
  return (
    <Badge variant={map[status].variant} size="sm">
      {map[status].label}
    </Badge>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ComboPlaygroundClient() {
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
        comboName: "Error",
        strategy: "-",
        targets: [],
        totalEstimatedCost: 0,
        totalEstimatedLatencyMs: 0,
        warnings: [],
        errors: ["Network error during simulation"],
      });
    } finally {
      setLoading(false);
    }
  }, [selectedComboId, promptTokens]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Combo Playground</h1>
          <p className="text-sm text-text-muted mt-1">
            Simulate how requests will be routed through your combos
          </p>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card>
        <div className="p-4 space-y-4">
          <h2 className="text-sm font-semibold">Configuration</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Combo Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">Combo</label>
              <select
                className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                value={selectedComboId}
                onChange={(e) => setSelectedComboId(e.target.value)}
              >
                {combos.length === 0 && <option value="">No combos configured</option>}
                {combos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.strategy}, {c.isActive ? "active" : "inactive"})
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt Tokens */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Estimated Prompt Tokens: <strong>{promptTokens}</strong>
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
            {loading ? "Simulating..." : "Simulate Route"}
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
                <h2 className="text-sm font-semibold">Routing Path</h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-text-muted">
                    Strategy: <strong>{result.strategy}</strong>
                  </span>
                  <span className="text-text-muted">
                    Est. Cost: <strong>${result.totalEstimatedCost.toFixed(6)}</strong>
                  </span>
                  <span className="text-text-muted">
                    Est. Latency: <strong>{result.totalEstimatedLatencyMs.toFixed(0)}ms</strong>
                  </span>
                </div>
              </div>

              {/* Visual Cascade */}
              <div className="space-y-0">
                {result.targets.map((t, i) => (
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
                            <span className="text-[10px]">fallback</span>
                          )}
                          {result.strategy === "weighted" && (
                            <span className="text-[10px]">weight {t.rank}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Target Card */}
                    <div
                      className={`border rounded-lg p-3 ${
                        t.status === "available"
                          ? "border-green-500/30 bg-green-500/5"
                          : t.status === "error"
                            ? "border-red-500/30 bg-red-500/5"
                            : t.status === "unknown"
                              ? "border-yellow-500/30 bg-yellow-500/5"
                              : "border-border bg-surface/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {t.rank}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{t.provider}</div>
                            <div className="text-xs text-text-muted font-mono">{t.model}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusTag status={t.status} />
                          <span className="text-xs text-text-muted">
                            ${t.estimatedCost.toFixed(6)}
                          </span>
                          <span className="text-xs text-text-muted">{t.estimatedLatencyMs}ms</span>
                          {t.contextWindow && (
                            <span className="text-xs text-text-muted">
                              {(t.contextWindow / 1000).toFixed(0)}K ctx
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
                  Warnings ({result.warnings.length})
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
                  Errors ({result.errors.length})
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
              Select a combo and click <strong>Simulate Route</strong> to see the routing path.
            </p>
          </div>
        </Card>
      )}

      {combos.length === 0 && (
        <Card>
          <div className="p-8 text-center">
            <p className="text-text-muted">
              No combos configured yet.{" "}
              <a href="/dashboard/combos" className="text-primary hover:underline">
                Create one first
              </a>
              .
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
