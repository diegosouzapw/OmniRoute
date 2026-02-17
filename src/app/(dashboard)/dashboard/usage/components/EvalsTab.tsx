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

// ── Strategy config for visual legend ──────────────────────────────────
const STRATEGIES = [
  {
    name: "contains",
    label: "Contains",
    icon: "search",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    description: "Checks if the response contains a specific text (case-insensitive)",
  },
  {
    name: "exact",
    label: "Exact Match",
    icon: "check_circle",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    description: "Response must be an exact character-for-character match",
  },
  {
    name: "regex",
    label: "Regex Pattern",
    icon: "code",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    description: "Matches response against a regular expression pattern",
  },
  {
    name: "custom",
    label: "Custom Function",
    icon: "tune",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    description: "Uses a custom function for advanced evaluation logic",
  },
];

export default function EvalsTab() {
  const [suites, setSuites] = useState([]);
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState({});
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
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

  const fetchApiKey = useCallback(async () => {
    try {
      const res = await fetch("/api/keys");
      if (!res.ok) return;
      const data = await res.json();
      const firstKey = data?.keys?.[0]?.key || null;
      setApiKey(firstKey);
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchSuites();
    fetchApiKey();
  }, [fetchSuites, fetchApiKey]);

  /**
   * Call the proxy LLM endpoint for a single eval case.
   * Returns the assistant's response text.
   */
  const callLLM = async (evalCase) => {
    try {
      const headers: any = { "Content-Type": "application/json" };
      if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

      const res = await fetch("/v1/chat/completions", {
        method: "POST",
        headers,
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

  // Count total cases and unique models across all suites
  const totalCases = suites.reduce((sum, s) => sum + (s.cases?.length || s.caseCount || 0), 0);
  const uniqueModels = [
    ...new Set(suites.flatMap((s) => (s.cases || []).map((c) => c.model).filter(Boolean))),
  ];

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
      <div className="flex flex-col gap-6">
        {/* Hero Section — always visible */}
        <HeroSection />
        <EmptyState
          icon="science"
          title="No Eval Suites Found"
          description="Eval suites can be defined via the API or in code. They test model outputs against expected results using strategies like contains, regex, exact match, and custom functions."
        />
      </div>
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
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            Suites
          </span>
          <div className="text-2xl font-bold mt-1 text-violet-400">{suites.length}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            Test Cases
          </span>
          <div className="text-2xl font-bold mt-1 text-sky-400">{totalCases}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            Models
          </span>
          <div className="text-2xl font-bold mt-1 text-emerald-400">{uniqueModels.length}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            Coverage
          </span>
          <div className="text-2xl font-bold mt-1 text-amber-400">
            {STRATEGIES.length} strategies
          </div>
        </Card>
      </div>

      {/* How It Works — Collapsible */}
      <Card className="p-0 overflow-hidden">
        <button
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/30 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[20px]">help</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-main">How It Works</h3>
              <p className="text-xs text-text-muted">
                Learn how evaluations validate your LLM responses
              </p>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-text-muted transition-transform duration-200 ${
              showHowItWorks ? "rotate-180" : ""
            }`}
          >
            expand_more
          </span>
        </button>

        {showHowItWorks && (
          <div className="px-6 pb-6 border-t border-border/10">
            {/* 3-step process */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-violet-500/5 border border-violet-500/10">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-violet-400">1</span>
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-1">Define</h4>
                <p className="text-xs text-text-muted">
                  Create test cases with input prompts and expected output criteria using strategies
                  like contains, regex, or exact match.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-sky-500/5 border border-sky-500/10">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-sky-400">2</span>
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-1">Run</h4>
                <p className="text-xs text-text-muted">
                  Execute test cases against your LLM endpoints through OmniRoute. Each case is sent
                  as a real API request.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-emerald-400">3</span>
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-1">Evaluate</h4>
                <p className="text-xs text-text-muted">
                  Responses are compared against expected criteria. See pass/fail for each case with
                  latency metrics and detailed feedback.
                </p>
              </div>
            </div>

            {/* Evaluation Strategies */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                Evaluation Strategies
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {STRATEGIES.map((s) => (
                  <div
                    key={s.name}
                    className={`flex items-center gap-3 p-3 rounded-lg ${s.bg} border border-transparent`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${s.color}`}>
                      {s.icon}
                    </span>
                    <div>
                      <span className={`text-xs font-mono font-semibold ${s.color}`}>{s.name}</span>
                      <p className="text-xs text-text-muted mt-0.5">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Coverage */}
            {uniqueModels.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                  Models Under Test
                </h4>
                <div className="flex flex-wrap gap-2">
                  {uniqueModels.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Suite List */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
            <span className="material-symbols-outlined text-[20px]">science</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Evaluation Suites</h3>
            <p className="text-xs text-text-muted">
              Click a suite to view test cases, then run to evaluate your LLM endpoints
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
        >
          {null}
        </FilterBar>

        <div className="flex flex-col gap-3 mt-4">
          {filtered.map((suite) => {
            const suiteResult = results[suite.id];
            const isRunning = running === suite.id;
            const isExpanded = expanded === suite.id;
            const caseCount = suite.cases?.length || suite.caseCount || 0;

            // Count unique models in this suite
            const suiteModels = [
              ...new Set((suite.cases || []).map((c) => c.model).filter(Boolean)),
            ];

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
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-text-main">
                          {suite.name || suite.id}
                        </p>
                        {suiteResult?.summary && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              suiteResult.summary.passRate === 100
                                ? "bg-emerald-500/10 text-emerald-400"
                                : suiteResult.summary.passRate >= 80
                                  ? "bg-amber-500/10 text-amber-400"
                                  : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {suiteResult.summary.passRate}% pass
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted">
                        {caseCount} case{caseCount !== 1 ? "s" : ""}
                        {suite.description && <span className="ml-1">— {suite.description}</span>}
                      </p>
                      {suiteModels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {suiteModels.map((m) => (
                            <span
                              key={m}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono text-text-muted bg-black/5 dark:bg-white/5"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isRunning && progress.total > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-violet-500 rounded-full transition-all duration-300"
                            style={{
                              width: `${(progress.current / progress.total) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-text-muted font-mono tabular-nums">
                          {progress.current}/{progress.total}
                        </span>
                      </div>
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

                {isExpanded && (
                  <div className="border-t border-border/20 p-4">
                    {suiteResult?.results ? (
                      <>
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
                              {suiteResult.summary.passed} passed · {suiteResult.summary.failed}{" "}
                              failed · {suiteResult.summary.total} total
                            </div>
                            {/* Visual pass/fail bar */}
                            <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${suiteResult.summary.passRate}%`,
                                  background:
                                    suiteResult.summary.passRate === 100
                                      ? "linear-gradient(90deg, #22c55e, #16a34a)"
                                      : suiteResult.summary.passRate >= 80
                                        ? "linear-gradient(90deg, #f59e0b, #d97706)"
                                        : "linear-gradient(90deg, #ef4444, #dc2626)",
                                }}
                              />
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
                                  {String(
                                    (d as any).searchTerm
                                      ? `Contains: "${(d as any).searchTerm}"`
                                      : (d as any).pattern
                                        ? `Regex: ${(d as any).pattern}`
                                        : (d as any).expected
                                          ? `Expected: "${String((d as any).expected).slice(0, 50)}"`
                                          : row.error || "—"
                                  )}
                                </span>
                              );
                            }
                            return (
                              <span className="text-sm text-text-main">
                                {(row as any)[col.key] || "—"}
                              </span>
                            );
                          }}
                          maxHeight="400px"
                          emptyMessage="No results yet"
                        />
                      </>
                    ) : (
                      /* Show test cases before running eval */
                      <>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="material-symbols-outlined text-[16px] text-text-muted">
                            checklist
                          </span>
                          <span className="text-xs text-text-muted font-medium">
                            Test Cases ({(suite.cases || []).length})
                          </span>
                        </div>
                        <DataTable
                          columns={[
                            { key: "name", label: "Case" },
                            { key: "model", label: "Model" },
                            { key: "strategy", label: "Strategy" },
                            { key: "expected", label: "Expected" },
                          ]}
                          data={(suite.cases || []).map((c, i) => ({
                            id: c.id || i,
                            name: c.name,
                            model: c.model || "—",
                            strategy: c.expected?.strategy || "—",
                            expected: c.expected?.value
                              ? String(c.expected.value).slice(0, 80)
                              : "—",
                          }))}
                          renderCell={(row, col) => {
                            if (col.key === "strategy") {
                              const strat = STRATEGIES.find(
                                (s) => s.name === (row as any).strategy
                              );
                              return (
                                <span
                                  className={`text-xs font-mono font-semibold ${strat?.color || "text-text-muted"}`}
                                >
                                  {(row as any).strategy}
                                </span>
                              );
                            }
                            if (col.key === "model") {
                              return (
                                <span className="text-xs font-mono text-primary/80">
                                  {(row as any).model}
                                </span>
                              );
                            }
                            if (col.key === "expected") {
                              return (
                                <span className="text-text-muted text-xs font-mono truncate max-w-[300px] block">
                                  {(row as any).expected}
                                </span>
                              );
                            }
                            return (
                              <span className="text-sm text-text-main">
                                {(row as any)[col.key] || "—"}
                              </span>
                            );
                          }}
                          maxHeight="400px"
                          emptyMessage="No test cases defined"
                        />
                        <p className="text-xs text-text-muted mt-3 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">info</span>
                          Click &quot;Run Eval&quot; to execute all cases against your LLM endpoint.
                          Each test sends a real request through OmniRoute.
                        </p>
                      </>
                    )}
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

// ── Hero Section Component ─────────────────────────────────────────────
function HeroSection() {
  return (
    <Card className="p-0 overflow-hidden">
      <div
        className="p-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(16, 185, 129, 0.05) 100%)",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500">
            <span className="material-symbols-outlined text-[28px]">science</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-text-main mb-1">Model Evaluations</h2>
            <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
              Test and validate your LLM endpoints by running predefined evaluation suites. Each
              suite contains test cases that send real prompts through OmniRoute and compare
              responses against expected criteria — helping you detect regressions, compare models,
              and ensure response quality across providers.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">
                  verified
                </span>
                Quality Validation
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-sky-400">compare</span>
                Model Comparison
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-amber-400">
                  bug_report
                </span>
                Regression Detection
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-violet-400">speed</span>
                Latency Benchmarks
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
