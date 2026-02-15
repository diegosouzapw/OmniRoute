"use client";

/**
 * EvalsTab — Batch F
 *
 * Lists evaluation suites, runs evals against real LLM endpoints,
 * and shows results.
 * API: GET/POST /api/evals, GET /api/evals/[suiteId]
 */

import { useState, useEffect, useCallback } from "react";
import { Card, Button, EmptyState, DataTable, FilterBar } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

export default function EvalsTab() {
  const [suites, setSuites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState({});
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const notify = useNotificationStore();

  const fetchSuites = useCallback(async () => {
    try {
      const res = await fetch("/api/evals");
      if (res.ok) {
        const data = await res.json();
        setSuites(Array.isArray(data) ? data : data.suites || []);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuites();
  }, [fetchSuites]);

  /**
   * Call the proxy LLM endpoint for a single eval case.
   * Returns the assistant's response text.
   */
  const callLLM = async (evalCase) => {
    try {
      const res = await fetch("/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: evalCase.model || "gpt-4o",
          messages: evalCase.input?.messages || [],
          max_tokens: 512,
          stream: false,
        }),
      });
      if (!res.ok) {
        return `[ERROR: HTTP ${res.status}]`;
      }
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "[No content returned]";
    } catch (err) {
      return `[ERROR: ${err.message}]`;
    }
  };

  /**
   * Run all cases: call LLM for each, then submit outputs for evaluation.
   */
  const handleRunEval = async (suite) => {
    const cases = suite.cases || [];
    if (cases.length === 0) {
      notify.warning("No test cases defined for this suite");
      return;
    }

    setRunning(suite.id);
    setProgress({ current: 0, total: cases.length });

    try {
      // Step 1: Call LLM for each case and collect outputs
      const outputs = {};
      for (let i = 0; i < cases.length; i++) {
        setProgress({ current: i + 1, total: cases.length });
        const response = await callLLM(cases[i]);
        outputs[cases[i].id] = response;
      }

      // Step 2: Submit outputs for evaluation
      const res = await fetch("/api/evals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suiteId: suite.id,
          outputs,
        }),
      });
      const data = await res.json();
      setResults((prev) => ({ ...prev, [suite.id]: data }));

      // Notify with results
      if (data.summary) {
        const { passed, failed, total } = data.summary;
        if (failed === 0) {
          notify.success(`All ${total} cases passed ✅`, `Eval: ${suite.name}`);
        } else {
          notify.warning(`${passed}/${total} passed, ${failed} failed`, `Eval: ${suite.name}`);
        }
      }

      // Auto-expand to show results
      setExpanded(suite.id);
    } catch {
      notify.error("Eval run failed");
    } finally {
      setRunning(null);
      setProgress({ current: 0, total: 0 });
    }
  };

  const filtered = suites.filter((s) => {
    if (!search) return true;
    return (
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.id?.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-muted p-8 animate-pulse">
        <span className="material-symbols-outlined text-[20px]">science</span>
        Loading eval suites...
      </div>
    );
  }

  if (suites.length === 0) {
    return (
      <EmptyState
        icon="science"
        title="No Eval Suites"
        description="Eval suites can be defined via the API to test model outputs against expected results."
      />
    );
  }

  const RESULT_COLUMNS = [
    { key: "caseName", label: "Case" },
    { key: "status", label: "Status" },
    { key: "durationMs", label: "Latency" },
    { key: "details", label: "Details" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
            <span className="material-symbols-outlined text-[20px]">science</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Evaluation Suites</h3>
            <p className="text-xs text-text-muted">
              Run test cases against your LLM endpoints to validate response quality
            </p>
          </div>
        </div>

        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          placeholder="Search suites..."
          filters={[]}
          activeFilters={{}}
          onFilterChange={() => {}}
        />

        <div className="flex flex-col gap-3 mt-4">
          {filtered.map((suite) => {
            const suiteResult = results[suite.id];
            const isRunning = running === suite.id;
            const isExpanded = expanded === suite.id;
            const caseCount = suite.cases?.length || suite.caseCount || 0;

            return (
              <div key={suite.id} className="border border-border/30 rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-surface/30 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : suite.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[16px] text-text-muted">
                      {isExpanded ? "expand_more" : "chevron_right"}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text-main">{suite.name || suite.id}</p>
                      <p className="text-xs text-text-muted">
                        {caseCount} case{caseCount !== 1 ? "s" : ""}
                        {suite.description && <span className="ml-1">— {suite.description}</span>}
                        {suiteResult?.summary && (
                          <span className="ml-2">
                            • Last run: {suiteResult.summary.passed || 0} ✅{" "}
                            {suiteResult.summary.failed || 0} ❌ ({suiteResult.summary.passRate}%)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isRunning && progress.total > 0 && (
                      <span className="text-xs text-text-muted font-mono tabular-nums">
                        {progress.current}/{progress.total}
                      </span>
                    )}
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRunEval(suite);
                      }}
                      loading={isRunning}
                      disabled={isRunning}
                    >
                      {isRunning ? `Running ${progress.current}/${progress.total}...` : "Run Eval"}
                    </Button>
                  </div>
                </div>

                {isExpanded && suiteResult?.results && (
                  <div className="border-t border-border/20 p-4">
                    {/* Summary bar */}
                    {suiteResult.summary && (
                      <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-surface/30 border border-border/20">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-lg font-bold ${
                              suiteResult.summary.passRate === 100
                                ? "text-emerald-400"
                                : suiteResult.summary.passRate >= 80
                                  ? "text-amber-400"
                                  : "text-red-400"
                            }`}
                          >
                            {suiteResult.summary.passRate}%
                          </span>
                          <span className="text-xs text-text-muted">pass rate</span>
                        </div>
                        <div className="text-xs text-text-muted">
                          {suiteResult.summary.passed} passed · {suiteResult.summary.failed} failed
                          · {suiteResult.summary.total} total
                        </div>
                      </div>
                    )}
                    <DataTable
                      columns={RESULT_COLUMNS}
                      data={suiteResult.results.map((r, i) => ({
                        ...r,
                        id: r.caseId || i,
                      }))}
                      renderCell={(row, col) => {
                        if (col.key === "status") {
                          return row.passed ? (
                            <span className="text-emerald-400">✅ Passed</span>
                          ) : (
                            <span className="text-red-400">❌ Failed</span>
                          );
                        }
                        if (col.key === "durationMs") {
                          return (
                            <span className="text-text-muted text-xs font-mono">
                              {row.durationMs != null ? `${row.durationMs}ms` : "—"}
                            </span>
                          );
                        }
                        if (col.key === "details") {
                          const d = row.details || {};
                          return (
                            <span className="text-text-muted text-xs truncate max-w-[300px] block">
                              {d.searchTerm
                                ? `Contains: "${d.searchTerm}"`
                                : d.pattern
                                  ? `Regex: ${d.pattern}`
                                  : d.expected
                                    ? `Expected: "${String(d.expected).slice(0, 50)}"`
                                    : row.error || "—"}
                            </span>
                          );
                        }
                        return (
                          <span className="text-sm text-text-main">{row[col.key] || "—"}</span>
                        );
                      }}
                      maxHeight="400px"
                      emptyMessage="No results yet"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
