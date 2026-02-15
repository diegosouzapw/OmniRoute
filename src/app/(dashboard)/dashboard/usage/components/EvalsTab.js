"use client";

/**
 * EvalsTab — Batch F
 *
 * Lists evaluation suites, runs evals, and shows results.
 * API: GET/POST /api/evals, GET /api/evals/[suiteId]
 */

import { useState, useEffect, useCallback } from "react";
import { Card, Button, EmptyState, DataTable, FilterBar } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

export default function EvalsTab() {
  const [suites, setSuites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(null);
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

  const handleRunEval = async (suite) => {
    setRunning(suite.id);
    try {
      const res = await fetch("/api/evals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suiteId: suite.id,
          outputs: {},
        }),
      });
      const data = await res.json();
      setResults((prev) => ({ ...prev, [suite.id]: data }));
      if (data.passed !== undefined) {
        const total = (data.passed || 0) + (data.failed || 0);
        if (data.failed === 0) {
          notify.success(`All ${total} cases passed`, `Eval: ${suite.name}`);
        } else {
          notify.warning(
            `${data.passed}/${total} passed, ${data.failed} failed`,
            `Eval: ${suite.name}`
          );
        }
      }
    } catch {
      notify.error("Eval run failed");
    } finally {
      setRunning(null);
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
    { key: "caseId", label: "Case" },
    { key: "status", label: "Status" },
    { key: "expected", label: "Expected" },
    { key: "actual", label: "Actual" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
            <span className="material-symbols-outlined text-[20px]">science</span>
          </div>
          <h3 className="text-lg font-semibold">Evaluation Suites</h3>
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
            const caseCount = suite.cases?.length || 0;

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
                        {suiteResult && (
                          <span className="ml-2">
                            • Last run: {suiteResult.passed || 0} ✅ {suiteResult.failed || 0} ❌
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
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
                    {isRunning ? "Running..." : "Run Eval"}
                  </Button>
                </div>

                {isExpanded && suiteResult?.results && (
                  <div className="border-t border-border/20 p-4">
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
                        return (
                          <span className="text-text-muted text-xs truncate max-w-[200px] block">
                            {typeof row[col.key] === "object"
                              ? JSON.stringify(row[col.key])
                              : row[col.key] || "—"}
                          </span>
                        );
                      }}
                      maxHeight="300px"
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
