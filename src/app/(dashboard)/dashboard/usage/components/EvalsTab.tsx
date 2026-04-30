"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  Button,
  EmptyState,
  DataTable,
  FilterBar,
  Input,
  Modal,
  Select,
} from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

type EvalTargetType = "suite-default" | "model" | "combo";

interface EvalTargetOption {
  key: string;
  type: EvalTargetType;
  id: string | null;
  label: string;
  description: string;
}

interface EvalApiKeyOption {
  id: string;
  name: string;
  isActive: boolean;
}

interface EvalCasePreview {
  id: string;
  name: string;
  model?: string;
  input?: {
    messages?: Array<{ role: string; content: string }>;
  };
  expected?: {
    strategy?: string;
    value?: string;
  };
  tags?: string[];
}

interface EvalSuite {
  id: string;
  name: string;
  description?: string;
  source?: "built-in" | "custom";
  caseCount?: number;
  cases?: EvalCasePreview[];
  updatedAt?: string;
}

interface EvalResult {
  caseId: string;
  caseName: string;
  passed: boolean;
  durationMs: number;
  error?: string;
  details?: {
    expected?: string;
    actual?: string;
    actualSnippet?: string;
    searchTerm?: string;
    pattern?: string;
  };
}

interface EvalRunSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
}

interface EvalRun {
  id: string;
  runGroupId: string | null;
  suiteId: string;
  suiteName: string;
  target: {
    type: EvalTargetType;
    id: string | null;
    key: string;
    label: string;
  };
  avgLatencyMs: number;
  summary: EvalRunSummary;
  results: EvalResult[];
  outputs: Record<string, string>;
  createdAt: string;
}

interface EvalScorecard {
  suites: number;
  totalCases: number;
  totalPassed: number;
  overallPassRate: number;
  perSuite: Array<{ id: string; name: string; passRate: number }>;
}

interface EvalSuiteRunState {
  runs: EvalRun[];
  scorecard: EvalScorecard | null;
}

interface EvalsDashboardPayload {
  suites: EvalSuite[];
  recentRuns: EvalRun[];
  scorecard: EvalScorecard | null;
  targets: EvalTargetOption[];
  apiKeys: EvalApiKeyOption[];
}

type BuilderStrategy = "contains" | "exact" | "regex";

interface EvalCaseDraft {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  strategy: BuilderStrategy;
  expectedValue: string;
  tags: string;
}

interface EvalSuiteDraft {
  id?: string;
  name: string;
  description: string;
  cases: EvalCaseDraft[];
}

interface ImportedEvalCase {
  id?: string;
  name?: string;
  model?: string;
  input?: {
    messages?: Array<{ role?: string; content?: string }>;
  };
  expected?: {
    strategy?: string;
    value?: string;
  };
  tags?: string[];
}

interface ImportedEvalSuiteFile {
  name?: string;
  description?: string;
  cases?: ImportedEvalCase[];
}

interface RunAllProgress {
  current: number;
  total: number;
  suiteName: string;
  completed: number;
  failedSuites: number;
}

const STRATEGIES = [
  {
    name: "contains",
    labelKey: "evalsStrategyContainsLabel",
    icon: "search",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    descriptionKey: "evalsStrategyContainsDescription",
  },
  {
    name: "exact",
    labelKey: "evalsStrategyExactLabel",
    icon: "check_circle",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    descriptionKey: "evalsStrategyExactDescription",
  },
  {
    name: "regex",
    labelKey: "evalsStrategyRegexLabel",
    icon: "code",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    descriptionKey: "evalsStrategyRegexDescription",
  },
  {
    name: "custom",
    labelKey: "evalsStrategyCustomLabel",
    icon: "tune",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    descriptionKey: "evalsStrategyCustomDescription",
  },
];

const HISTORY_COLUMNS = [
  { key: "suiteName", labelKey: "historyColumnSuiteName" },
  { key: "target", labelKey: "historyColumnTarget" },
  { key: "passRate", labelKey: "historyColumnPassRate" },
  { key: "avgLatencyMs", labelKey: "historyColumnAvgLatencyMs" },
  { key: "createdAt", labelKey: "historyColumnCreatedAt" },
];

const NO_COMPARE_TARGET = "__none__";
const AUTO_API_KEY = "__auto__";

function createDraftId() {
  return `draft-${Math.random().toString(36).slice(2, 10)}`;
}

function createEmptyCaseDraft(): EvalCaseDraft {
  return {
    id: createDraftId(),
    name: "",
    model: "",
    systemPrompt: "",
    userPrompt: "",
    strategy: "contains",
    expectedValue: "",
    tags: "",
  };
}

function createEmptySuiteDraft(): EvalSuiteDraft {
  return {
    name: "",
    description: "",
    cases: [createEmptyCaseDraft()],
  };
}

function normalizeBuilderStrategy(value: unknown): BuilderStrategy {
  return value === "exact" || value === "regex" ? value : "contains";
}

function joinPromptMessages(
  messages: Array<{ role: string; content: string }> | undefined,
  role: string
): string {
  return (messages || [])
    .filter((message) => message.role === role && typeof message.content === "string")
    .map((message) => message.content)
    .join("\n\n");
}

function suiteToDraft(suite: EvalSuite): EvalSuiteDraft {
  return {
    id: suite.id,
    name: suite.name || "",
    description: suite.description || "",
    cases:
      suite.cases && suite.cases.length > 0
        ? suite.cases.map((evalCase) => ({
            id: evalCase.id || createDraftId(),
            name: evalCase.name || "",
            model: evalCase.model || "",
            systemPrompt: joinPromptMessages(evalCase.input?.messages, "system"),
            userPrompt:
              joinPromptMessages(evalCase.input?.messages, "user") ||
              (evalCase.input?.messages || [])
                .filter((message) => message.role !== "system")
                .map((message) => message.content)
                .join("\n\n"),
            strategy: normalizeBuilderStrategy(evalCase.expected?.strategy),
            expectedValue: evalCase.expected?.value || "",
            tags: (evalCase.tags || []).join(", "),
          }))
        : [createEmptyCaseDraft()],
  };
}

function suiteToCloneDraft(
  suite: EvalSuite,
  t: (key: string, values?: Record<string, unknown>) => string
): EvalSuiteDraft {
  const draft = suiteToDraft(suite);
  return {
    name: `${draft.name || suite.id} ${t("suiteBuilderCloneSuffix")}`.trim(),
    description: draft.description,
    cases: draft.cases.map((evalCase) => ({
      ...evalCase,
      id: createDraftId(),
      name: evalCase.name ? `${evalCase.name} ${t("suiteBuilderCloneSuffix")}`.trim() : "",
    })),
  };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "";
}

function getResultExpectedValue(result: EvalResult): string {
  if (result.details?.expected) return String(result.details.expected);
  if (result.details?.searchTerm) return String(result.details.searchTerm);
  if (result.details?.pattern) return String(result.details.pattern);
  return "—";
}

function getResultActualValue(result: EvalResult, output?: string): string {
  const actual = output || result.details?.actual || result.details?.actualSnippet || "";
  return typeof actual === "string" && actual.trim().length > 0 ? actual : "—";
}

function createDraftFromImportedSuite(
  payload: ImportedEvalSuiteFile,
  fallbackName: string
): EvalSuiteDraft {
  const cases = Array.isArray(payload.cases) ? payload.cases : [];

  return {
    name:
      typeof payload.name === "string" && payload.name.trim().length > 0
        ? payload.name.trim()
        : fallbackName,
    description: typeof payload.description === "string" ? payload.description : "",
    cases:
      cases.length > 0
        ? cases.map((evalCase, index) => {
            const importedMessages = evalCase.input?.messages;
            const messages = Array.isArray(importedMessages)
              ? importedMessages
                  .map((message) => ({
                    role: typeof message.role === "string" ? message.role : "",
                    content: typeof message.content === "string" ? message.content : "",
                  }))
                  .filter((message) => message.role && message.content.trim())
              : [];

            return {
              id: createDraftId(),
              name:
                typeof evalCase.name === "string" && evalCase.name.trim().length > 0
                  ? evalCase.name.trim()
                  : `Case ${index + 1}`,
              model: typeof evalCase.model === "string" ? evalCase.model : "",
              systemPrompt: joinPromptMessages(messages, "system"),
              userPrompt:
                joinPromptMessages(messages, "user") ||
                messages
                  .filter((message) => message.role !== "system")
                  .map((message) => message.content)
                  .join("\n\n"),
              strategy: normalizeBuilderStrategy(evalCase.expected?.strategy),
              expectedValue:
                typeof evalCase.expected?.value === "string" ? evalCase.expected.value : "",
              tags: Array.isArray(evalCase.tags) ? evalCase.tags.join(", ") : "",
            };
          })
        : [createEmptyCaseDraft()],
  };
}

function getTargetLabel(
  target: { type: EvalTargetType; id: string | null },
  t: (key: string, values?: Record<string, unknown>) => string
): string {
  if (target.type === "combo") {
    return `${t("targetTypeCombo")}: ${target.id || "—"}`;
  }

  if (target.type === "model") {
    return `${t("targetTypeModel")}: ${target.id || "—"}`;
  }

  return t("targetSuiteDefaults");
}

function parseTargetKey(value: string): { type: EvalTargetType; id: string | null } {
  const [rawType, ...rawId] = value.split(":");
  const idValue = rawId.join(":");

  if (rawType === "combo") {
    return { type: "combo", id: idValue || null };
  }

  if (rawType === "model") {
    return { type: "model", id: idValue || null };
  }

  return { type: "suite-default", id: null };
}

function formatTimestamp(value: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getResultDetails(
  result: EvalResult,
  t: (key: string, values?: Record<string, unknown>) => string
): string {
  if (result.error) {
    return `${t("resultErrorLabel")}: ${result.error}`;
  }

  if (result.details?.searchTerm) {
    return t("detailsContains", { term: result.details.searchTerm });
  }

  if (result.details?.pattern) {
    return t("detailsRegex", { pattern: result.details.pattern });
  }

  if (result.details?.expected) {
    return t("detailsExpected", {
      expected: String(result.details.expected).slice(0, 60),
    });
  }

  if (result.details?.actualSnippet) {
    return t("actualOutputLabel", {
      value: String(result.details.actualSnippet).slice(0, 60),
    });
  }

  return "—";
}

export default function EvalsTab() {
  const t = useTranslations("usage");
  const notify = useNotificationStore();
  const [suites, setSuites] = useState<EvalSuite[]>([]);
  const [recentRuns, setRecentRuns] = useState<EvalRun[]>([]);
  const [scorecard, setScorecard] = useState<EvalScorecard | null>(null);
  const [targetOptions, setTargetOptions] = useState<EvalTargetOption[]>([]);
  const [apiKeys, setApiKeys] = useState<EvalApiKeyOption[]>([]);
  const [selectedTargetKey, setSelectedTargetKey] = useState("suite-default:__default__");
  const [compareTargetKey, setCompareTargetKey] = useState("");
  const [selectedApiKeyId, setSelectedApiKeyId] = useState("");
  const [suiteRuns, setSuiteRuns] = useState<Record<string, EvalSuiteRunState>>({});
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState<string | null>(null);
  const [runningAll, setRunningAll] = useState(false);
  const [runProgress, setRunProgress] = useState<RunAllProgress | null>(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [suiteDraft, setSuiteDraft] = useState<EvalSuiteDraft>(createEmptySuiteDraft());
  const [savingSuite, setSavingSuite] = useState(false);
  const [deletingSuiteId, setDeletingSuiteId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const response = await fetch("/api/evals");
        if (!response.ok) {
          throw new Error("Eval load failed");
        }

        const payload = (await response.json()) as EvalsDashboardPayload;
        if (!isMounted) return;

        setSuites(Array.isArray(payload.suites) ? payload.suites : []);
        setRecentRuns(Array.isArray(payload.recentRuns) ? payload.recentRuns : []);
        setScorecard(payload.scorecard || null);
        setTargetOptions(Array.isArray(payload.targets) ? payload.targets : []);
        setApiKeys(Array.isArray(payload.apiKeys) ? payload.apiKeys : []);
      } catch {
        if (isMounted) {
          notify.error(t("notifyEvalLoadFailed"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (targetOptions.length === 0) return;
    if (targetOptions.some((option) => option.key === selectedTargetKey)) return;
    setSelectedTargetKey(targetOptions[0]?.key || "suite-default:__default__");
  }, [selectedTargetKey, targetOptions]);

  useEffect(() => {
    if (!compareTargetKey) return;
    if (compareTargetKey === selectedTargetKey) {
      setCompareTargetKey("");
    }
  }, [compareTargetKey, selectedTargetKey]);

  const filteredSuites = !search.trim()
    ? suites
    : suites.filter((suite) => {
        const term = search.toLowerCase();
        return (
          suite.name?.toLowerCase().includes(term) ||
          suite.id?.toLowerCase().includes(term) ||
          suite.description?.toLowerCase().includes(term)
        );
      });

  const totalCases = suites.reduce(
    (sum, suite) => sum + (suite.cases?.length || suite.caseCount || 0),
    0
  );

  const uniqueModels = [
    ...new Set(
      suites
        .flatMap((suite) => suite.cases || [])
        .map((evalCase) => evalCase.model)
        .filter((model): model is string => typeof model === "string" && model.trim().length > 0)
    ),
  ];

  const compareOptions = targetOptions.filter((option) => option.key !== selectedTargetKey);
  const runAllPercent =
    runProgress && runProgress.total > 0
      ? Math.round((runProgress.completed / runProgress.total) * 100)
      : 0;

  async function refreshDashboard() {
    const response = await fetch("/api/evals");
    if (!response.ok) {
      throw new Error(t("notifyEvalLoadFailed"));
    }
    const payload = (await response.json()) as EvalsDashboardPayload;
    setRecentRuns(Array.isArray(payload.recentRuns) ? payload.recentRuns : []);
    setScorecard(payload.scorecard || null);
    setTargetOptions(Array.isArray(payload.targets) ? payload.targets : []);
    setApiKeys(Array.isArray(payload.apiKeys) ? payload.apiKeys : []);
    setSuites(Array.isArray(payload.suites) ? payload.suites : []);
  }

  function openNewSuiteBuilder() {
    setSuiteDraft(createEmptySuiteDraft());
    setIsBuilderOpen(true);
  }

  function openEditSuiteBuilder(suite: EvalSuite) {
    setSuiteDraft(suiteToDraft(suite));
    setIsBuilderOpen(true);
  }

  function handleCloneSuite(suite: EvalSuite) {
    setSuiteDraft(suiteToCloneDraft(suite, t));
    setIsBuilderOpen(true);
  }

  function toggleResultExpansion(resultKey: string) {
    setExpandedResults((prev) => {
      const next = new Set(prev);
      if (next.has(resultKey)) {
        next.delete(resultKey);
      } else {
        next.add(resultKey);
      }
      return next;
    });
  }

  function handleExportSuite(suite: EvalSuite) {
    try {
      const exportPayload = {
        format: "omniroute.eval-suite.v1",
        exportedAt: new Date().toISOString(),
        id: suite.id,
        name: suite.name || suite.id,
        description: suite.description || "",
        source: suite.source || "built-in",
        cases: (suite.cases || []).map((evalCase) => ({
          name: evalCase.name || "",
          model: evalCase.model || "",
          input: {
            messages: Array.isArray(evalCase.input?.messages) ? evalCase.input?.messages : [],
          },
          expected: {
            strategy: normalizeBuilderStrategy(evalCase.expected?.strategy),
            value: evalCase.expected?.value || "",
          },
          tags: evalCase.tags || [],
        })),
      };
      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const slug =
        (suite.name || suite.id || "eval-suite")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || "eval-suite";
      anchor.href = url;
      anchor.download = `${slug}.eval-suite.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      notify.success(t("suiteExported"), t("notifyEvalTitle", { name: suite.name || suite.id }));
    } catch (error: unknown) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: getErrorMessage(error) || t("suiteExportFailed"),
        }),
        t("suiteExportFailed")
      );
    }
  }

  async function handleImportSuite(file: File) {
    try {
      const text = await file.text();
      const payload = JSON.parse(text) as ImportedEvalSuiteFile;
      if (!payload || typeof payload !== "object" || !Array.isArray(payload.cases)) {
        throw new Error(t("suiteImportInvalid"));
      }

      const fallbackName =
        file.name
          .replace(/\.eval-suite\.json$/i, "")
          .replace(/\.json$/i, "")
          .replace(/[-_]+/g, " ")
          .trim() || t("suiteBuilderImportedSuite");

      const draft = createDraftFromImportedSuite(payload, fallbackName);
      setSuiteDraft({
        ...draft,
        name: `${draft.name} ${t("suiteBuilderCloneSuffix")}`.trim(),
      });
      setIsBuilderOpen(true);
      notify.success(t("suiteImportReady"), t("notifyEvalTitle", { name: draft.name }));
    } catch (error: unknown) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: getErrorMessage(error) || t("suiteImportInvalid"),
        }),
        t("suiteImportFailed")
      );
    }
  }

  async function handleSaveSuite() {
    const suiteName = suiteDraft.name.trim();
    if (!suiteName) {
      notify.warning(t("suiteBuilderNameRequired"));
      return;
    }

    if (suiteDraft.cases.length === 0) {
      notify.warning(t("suiteBuilderCasesRequired"));
      return;
    }

    const invalidCaseIndex = suiteDraft.cases.findIndex((draftCase) => {
      const hasMessage =
        draftCase.systemPrompt.trim().length > 0 || draftCase.userPrompt.trim().length > 0;
      return (
        !draftCase.name.trim() ||
        !draftCase.expectedValue.trim() ||
        !hasMessage ||
        !draftCase.model.trim()
      );
    });

    if (invalidCaseIndex >= 0) {
      notify.warning(t("suiteBuilderCaseInvalid", { index: invalidCaseIndex + 1 }));
      return;
    }

    setSavingSuite(true);
    try {
      const payload = {
        name: suiteName,
        description: suiteDraft.description.trim(),
        cases: suiteDraft.cases.map((draftCase) => {
          const messages: Array<{ role: string; content: string }> = [];
          if (draftCase.systemPrompt.trim()) {
            messages.push({ role: "system", content: draftCase.systemPrompt.trim() });
          }
          if (draftCase.userPrompt.trim()) {
            messages.push({ role: "user", content: draftCase.userPrompt.trim() });
          }

          return {
            ...(draftCase.id.startsWith("draft-") ? {} : { id: draftCase.id }),
            name: draftCase.name.trim(),
            model: draftCase.model.trim(),
            input: {
              messages,
            },
            expected: {
              strategy: draftCase.strategy,
              value: draftCase.expectedValue.trim(),
            },
            tags: draftCase.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          };
        }),
      };

      const isEditing = typeof suiteDraft.id === "string" && suiteDraft.id.trim().length > 0;
      const response = await fetch(
        isEditing ? `/api/evals/suites/${encodeURIComponent(suiteDraft.id!)}` : "/api/evals/suites",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result?.error?.message || result?.error || result?.message || t("suiteBuilderSaveFailed")
        );
      }

      await refreshDashboard();
      setExpanded(result?.suite?.id || suiteDraft.id || null);
      setIsBuilderOpen(false);
      setSuiteDraft(createEmptySuiteDraft());
      notify.success(
        isEditing ? t("suiteBuilderUpdated") : t("suiteBuilderCreated"),
        t("notifyEvalTitle", { name: suiteName })
      );
    } catch (error: any) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: error?.message || t("notAvailableSymbol"),
        }),
        t("suiteBuilderSaveFailed")
      );
    } finally {
      setSavingSuite(false);
    }
  }

  async function handleDeleteSuite(suite: EvalSuite) {
    if (suite.source !== "custom") return;
    const confirmDelete = window.confirm(
      t("suiteBuilderDeleteConfirm", { name: suite.name || suite.id })
    );
    if (!confirmDelete) return;

    setDeletingSuiteId(suite.id);
    try {
      const response = await fetch(`/api/evals/suites/${encodeURIComponent(suite.id)}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            result?.error ||
            result?.message ||
            t("suiteBuilderDeleteFailed")
        );
      }
      await refreshDashboard();
      if (expanded === suite.id) {
        setExpanded(null);
      }
      notify.success(
        t("suiteBuilderDeleted"),
        t("notifyEvalTitle", { name: suite.name || suite.id })
      );
    } catch (error: any) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: error?.message || t("notAvailableSymbol"),
        }),
        t("suiteBuilderDeleteFailed")
      );
    } finally {
      setDeletingSuiteId(null);
    }
  }

  async function handleRunAllSuites() {
    const suitesToRun = filteredSuites.filter(
      (suite) => (suite.cases?.length || suite.caseCount || 0) > 0
    );

    if (suitesToRun.length === 0) {
      notify.warning(t("notifyNoTestCases"));
      return;
    }

    if (compareTargetKey && compareTargetKey === selectedTargetKey) {
      notify.warning(t("notifySelectDifferentCompareTarget"));
      return;
    }

    let completed = 0;
    let failedSuites = 0;
    let totalPassed = 0;
    let totalFailed = 0;

    setRunningAll(true);
    setRunProgress({
      current: 0,
      total: suitesToRun.length,
      suiteName: "",
      completed: 0,
      failedSuites: 0,
    });

    try {
      for (const [index, suite] of suitesToRun.entries()) {
        setRunning(suite.id);
        setRunProgress({
          current: index + 1,
          total: suitesToRun.length,
          suiteName: suite.name || suite.id,
          completed,
          failedSuites,
        });

        try {
          const response = await fetch("/api/evals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              suiteId: suite.id,
              target: parseTargetKey(selectedTargetKey),
              ...(compareTargetKey ? { compareTarget: parseTargetKey(compareTargetKey) } : {}),
              ...(selectedApiKeyId ? { apiKeyId: selectedApiKeyId } : {}),
            }),
          });

          const payload = await response.json();
          if (!response.ok) {
            throw new Error(
              payload?.error?.message ||
                payload?.error ||
                payload?.message ||
                t("notifyEvalRunFailed")
            );
          }

          const runs = Array.isArray(payload.runs) ? (payload.runs as EvalRun[]) : [];
          const comparisonScorecard = (payload.scorecard || null) as EvalScorecard | null;
          setSuiteRuns((prev) => ({
            ...prev,
            [suite.id]: {
              runs,
              scorecard: comparisonScorecard,
            },
          }));

          if (Array.isArray(payload.recentRuns)) {
            setRecentRuns(payload.recentRuns as EvalRun[]);
          }
          if (payload.historyScorecard) {
            setScorecard(payload.historyScorecard as EvalScorecard);
          }

          const primaryRun = runs[0];
          totalPassed += primaryRun?.summary.passed || 0;
          totalFailed += primaryRun?.summary.failed || 0;
          completed += 1;
        } catch (error: unknown) {
          failedSuites += 1;
          console.error("[Evals] Run all failed for suite", suite.id, error);
        } finally {
          setRunProgress({
            current: index + 1,
            total: suitesToRun.length,
            suiteName: suite.name || suite.id,
            completed,
            failedSuites,
          });
        }
      }

      await refreshDashboard();
      if (failedSuites > 0) {
        notify.warning(
          t("runAllCompletedWithFailures", { completed, failedSuites }),
          t("notifyEvalTitle", { name: t("runAllSuites") })
        );
      } else {
        notify.success(
          t("runAllCompleted", {
            suites: completed,
            passed: totalPassed,
            failed: totalFailed,
          }),
          t("notifyEvalTitle", { name: t("runAllSuites") })
        );
      }
    } finally {
      setRunning(null);
      setRunningAll(false);
      setRunProgress(null);
    }
  }

  async function handleRunEval(suite: EvalSuite) {
    if (runningAll) return;

    const cases = suite.cases || [];
    if (cases.length === 0) {
      notify.warning(t("notifyNoTestCases"));
      return;
    }

    if (compareTargetKey && compareTargetKey === selectedTargetKey) {
      notify.warning(t("notifySelectDifferentCompareTarget"));
      return;
    }

    setRunning(suite.id);

    try {
      const response = await fetch("/api/evals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suiteId: suite.id,
          target: parseTargetKey(selectedTargetKey),
          ...(compareTargetKey ? { compareTarget: parseTargetKey(compareTargetKey) } : {}),
          ...(selectedApiKeyId ? { apiKeyId: selectedApiKeyId } : {}),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(
          payload?.error?.message || payload?.error || payload?.message || t("notifyEvalRunFailed")
        );
      }

      const runs = Array.isArray(payload.runs) ? (payload.runs as EvalRun[]) : [];
      const comparisonScorecard = (payload.scorecard || null) as EvalScorecard | null;
      setSuiteRuns((prev) => ({
        ...prev,
        [suite.id]: {
          runs,
          scorecard: comparisonScorecard,
        },
      }));
      setExpanded(suite.id);

      if (Array.isArray(payload.recentRuns)) {
        setRecentRuns(payload.recentRuns as EvalRun[]);
      } else {
        await refreshDashboard();
      }

      if (payload.historyScorecard) {
        setScorecard(payload.historyScorecard as EvalScorecard);
      }

      const primaryRun = runs[0];
      if (primaryRun) {
        const score = primaryRun.summary.passRate;
        notify.success(
          compareTargetKey
            ? t("compareCompletedWithScore", { score })
            : t("runCompletedWithScore", { score }),
          t("notifyEvalTitle", { name: suite.name || suite.id })
        );
      }
    } catch (error: any) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: error?.message || t("notAvailableSymbol"),
        }),
        t("notifyEvalTitle", { name: suite.name || suite.id })
      );
    } finally {
      setRunning(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-muted p-8 animate-pulse">
        <span className="material-symbols-outlined text-[20px]">science</span>
        {t("evalsLoading")}
      </div>
    );
  }

  if (suites.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <HeroSection t={t} />
        <EmptyState
          icon="science"
          title={t("noEvalSuitesFound")}
          description={t("noEvalSuitesDescription")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <HeroSection t={t} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            {t("statsSuites")}
          </span>
          <div className="text-2xl font-bold mt-1 text-violet-400">{suites.length}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            {t("statsTestCases")}
          </span>
          <div className="text-2xl font-bold mt-1 text-sky-400">{totalCases}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            {t("statsModels")}
          </span>
          <div className="text-2xl font-bold mt-1 text-emerald-400">{uniqueModels.length}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold tracking-wide">
            {t("statsCoverage")}
          </span>
          <div className="text-2xl font-bold mt-1 text-amber-400">
            {t("statsStrategiesCount", { count: STRATEGIES.length })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[20px]">route</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("evalControlsTitle")}</h3>
            <p className="text-xs text-text-muted">{t("evalControlsHint")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Select
            label={t("evalTarget")}
            value={selectedTargetKey}
            onChange={(event) => setSelectedTargetKey(event.target.value)}
            options={targetOptions.map((option) => ({
              value: option.key,
              label: getTargetLabel(option, t),
            }))}
            hint={t("evalTargetHint")}
          />
          <Select
            label={t("evalCompareTarget")}
            value={compareTargetKey || NO_COMPARE_TARGET}
            onChange={(event) =>
              setCompareTargetKey(
                event.target.value === NO_COMPARE_TARGET ? "" : event.target.value
              )
            }
            options={[
              {
                value: NO_COMPARE_TARGET,
                label: t("evalCompareOptional"),
              },
              ...compareOptions.map((option) => ({
                value: option.key,
                label: getTargetLabel(option, t),
              })),
            ]}
            hint={t("evalCompareHint")}
          />
          <Select
            label={t("evalApiKey")}
            value={selectedApiKeyId || AUTO_API_KEY}
            onChange={(event) =>
              setSelectedApiKeyId(event.target.value === AUTO_API_KEY ? "" : event.target.value)
            }
            options={[
              {
                value: AUTO_API_KEY,
                label: t("evalApiKeyAuto"),
              },
              ...apiKeys
                .filter((key) => key.isActive !== false)
                .map((key) => ({
                  value: key.id,
                  label: key.name,
                })),
            ]}
            hint={t("evalApiKeyHint")}
          />
        </div>
      </Card>

      {scorecard && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("scorecardTitle")}</h3>
              <p className="text-xs text-text-muted">{t("scorecardHint")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {t("scorecardSuites")}
              </p>
              <p className="text-2xl font-bold text-violet-400 mt-1">{scorecard.suites}</p>
            </Card>
            <Card className="px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {t("scorecardCases")}
              </p>
              <p className="text-2xl font-bold text-sky-400 mt-1">{scorecard.totalCases}</p>
            </Card>
            <Card className="px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {t("scorecardPassed")}
              </p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{scorecard.totalPassed}</p>
            </Card>
            <Card className="px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {t("scorecardPassRate")}
              </p>
              <p className="text-2xl font-bold text-amber-400 mt-1">{scorecard.overallPassRate}%</p>
            </Card>
          </div>

          {scorecard.perSuite.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
              {scorecard.perSuite.slice(0, 6).map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-text-main truncate">
                      {entry.name}
                    </span>
                    <span className="text-xs font-semibold text-primary">{entry.passRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        <button
          onClick={() => setShowHowItWorks((prev) => !prev)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/30 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[20px]">help</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-main">{t("howItWorks")}</h3>
              <p className="text-xs text-text-muted">{t("howItWorksSubtitle")}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-violet-500/5 border border-violet-500/10">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-violet-400">1</span>
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-1">{t("define")}</h4>
                <p className="text-xs text-text-muted">{t("defineStepDescription")}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-sky-500/5 border border-sky-500/10">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-sky-400">2</span>
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-1">{t("run")}</h4>
                <p className="text-xs text-text-muted">{t("runStepDescription")}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-emerald-400">3</span>
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-1">{t("evaluate")}</h4>
                <p className="text-xs text-text-muted">{t("evaluateStepDescription")}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                {t("evaluationStrategies")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {STRATEGIES.map((strategy) => (
                  <div
                    key={strategy.name}
                    className={`flex items-center gap-3 p-3 rounded-lg ${strategy.bg}`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${strategy.color}`}>
                      {strategy.icon}
                    </span>
                    <div>
                      <span className={`text-xs font-mono font-semibold ${strategy.color}`}>
                        {t(strategy.labelKey)}
                      </span>
                      <p className="text-xs text-text-muted mt-0.5">{t(strategy.descriptionKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
            <span className="material-symbols-outlined text-[20px]">history</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("recentRunsTitle")}</h3>
            <p className="text-xs text-text-muted">{t("recentRunsHint")}</p>
          </div>
        </div>

        <DataTable
          columns={HISTORY_COLUMNS.map((column) => ({
            key: column.key,
            label: t(column.labelKey),
          }))}
          data={recentRuns.map((run) => ({
            ...run,
            id: run.id,
          }))}
          renderCell={(row, column) => {
            if (column.key === "target") {
              return (
                <span className="text-xs font-medium text-primary">
                  {getTargetLabel(row.target as EvalRun["target"], t)}
                </span>
              );
            }

            if (column.key === "passRate") {
              return (
                <span className="text-xs font-semibold text-emerald-400">
                  {Number((row.summary as EvalRunSummary)?.passRate || 0)}%
                </span>
              );
            }

            if (column.key === "avgLatencyMs") {
              return (
                <span className="text-xs font-mono text-text-muted">
                  {Number(row.avgLatencyMs || 0)}ms
                </span>
              );
            }

            if (column.key === "createdAt") {
              return (
                <span className="text-xs text-text-muted">
                  {formatTimestamp(String(row.createdAt || ""))}
                </span>
              );
            }

            return <span className="text-sm text-text-main">{String(row[column.key] || "—")}</span>;
          }}
          maxHeight="320px"
          emptyMessage={t("historyEmpty")}
        />
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
              <span className="material-symbols-outlined text-[20px]">science</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("evalSuites")}</h3>
              <p className="text-xs text-text-muted">{t("evalSuitesHint")}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label
              className={`inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 text-sm font-medium text-text-main shadow-sm transition-all duration-200 hover:bg-black/5 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/5 ${
                running !== null || runningAll ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                upload_file
              </span>
              {t("importSuite")}
              <input
                type="file"
                accept="application/json,.json"
                className="hidden"
                disabled={running !== null || runningAll}
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    void handleImportSuite(file);
                  }
                  event.currentTarget.value = "";
                }}
              />
            </label>
            <Button
              icon="play_arrow"
              variant="secondary"
              disabled={running !== null || runningAll}
              loading={runningAll}
              onClick={() => void handleRunAllSuites()}
            >
              {runningAll ? t("runAllRunning") : t("runAllSuites")}
            </Button>
            <Button
              icon="add"
              onClick={openNewSuiteBuilder}
              disabled={running !== null || runningAll}
            >
              {t("suiteBuilderNewSuite")}
            </Button>
          </div>
        </div>

        {runProgress && (
          <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-text-main">
                {t("runAllProgress", {
                  current: runProgress.current,
                  total: runProgress.total,
                  name: runProgress.suiteName || t("runAllSuites"),
                })}
              </span>
              <span className="text-xs font-semibold text-primary">{runAllPercent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${runAllPercent}%` }}
              />
            </div>
            {runProgress.failedSuites > 0 && (
              <p className="mt-2 text-xs text-amber-400">
                {t("runAllFailedSuites", { count: runProgress.failedSuites })}
              </p>
            )}
          </div>
        )}

        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          placeholder={t("searchSuitesPlaceholder")}
          filters={[]}
          activeFilters={{}}
          onFilterChange={() => {}}
        >
          {null}
        </FilterBar>

        <div className="flex flex-col gap-3 mt-4">
          {filteredSuites.map((suite) => {
            const isExpanded = expanded === suite.id;
            const isRunning = running === suite.id;
            const suiteModels = [
              ...new Set(
                (suite.cases || [])
                  .map((evalCase) => evalCase.model)
                  .filter(
                    (model): model is string => typeof model === "string" && model.trim().length > 0
                  )
              ),
            ];
            const liveResult = suiteRuns[suite.id] || null;
            const suiteHistory = recentRuns.filter((run) => run.suiteId === suite.id);
            const latestScore =
              liveResult?.runs?.[0]?.summary.passRate ?? suiteHistory[0]?.summary.passRate;

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
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                            suite.source === "custom"
                              ? "bg-sky-500/10 text-sky-400"
                              : "bg-text-muted/10 text-text-muted"
                          }`}
                        >
                          {suite.source === "custom"
                            ? t("suiteBuilderCustomBadge")
                            : t("suiteBuilderBuiltInBadge")}
                        </span>
                        {typeof latestScore === "number" && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              latestScore === 100
                                ? "bg-emerald-500/10 text-emerald-400"
                                : latestScore >= 80
                                  ? "bg-amber-500/10 text-amber-400"
                                  : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {latestScore}% {t("passSuffix")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted">
                        {t("casesCount", { count: suite.cases?.length || suite.caseCount || 0 })}
                        {suite.description ? (
                          <span className="ml-1">- {suite.description}</span>
                        ) : null}
                      </p>
                      {suite.source === "custom" && suite.updatedAt ? (
                        <p className="text-[11px] text-text-muted mt-1">
                          {t("suiteBuilderUpdatedAt", { value: formatTimestamp(suite.updatedAt) })}
                        </p>
                      ) : null}
                      {suiteModels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {suiteModels.map((model) => (
                            <span
                              key={model}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono text-text-muted bg-black/5 dark:bg-white/5"
                            >
                              {model}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      icon="content_copy"
                      disabled={running !== null || runningAll}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCloneSuite(suite);
                      }}
                    >
                      {t("clone")}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="download"
                      disabled={running !== null || runningAll}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleExportSuite(suite);
                      }}
                    >
                      {t("exportSuite")}
                    </Button>
                    {suite.source === "custom" && (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          icon="edit"
                          disabled={running !== null || runningAll || deletingSuiteId === suite.id}
                          onClick={(event) => {
                            event.stopPropagation();
                            openEditSuiteBuilder(suite);
                          }}
                        >
                          {t("edit")}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon="delete"
                          disabled={running !== null || runningAll || deletingSuiteId === suite.id}
                          loading={deletingSuiteId === suite.id}
                          onClick={(event) => {
                            event.stopPropagation();
                            void handleDeleteSuite(suite);
                          }}
                        >
                          {t("delete")}
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="primary"
                      loading={isRunning}
                      disabled={running !== null || runningAll}
                      onClick={(event) => {
                        event.stopPropagation();
                        void handleRunEval(suite);
                      }}
                    >
                      {isRunning ? t("runEvalRunning") : t("runEval")}
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border/20 p-4 flex flex-col gap-4">
                    {liveResult?.scorecard && liveResult.runs.length > 1 && (
                      <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-semibold text-text-main">
                              {t("targetComparisonTitle")}
                            </h4>
                            <p className="text-xs text-text-muted">{t("targetComparisonHint")}</p>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            {liveResult.scorecard.overallPassRate}%
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          {liveResult.runs.map((run) => (
                            <div
                              key={run.id}
                              className="rounded-lg border border-border/20 px-3 py-3"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-text-main">
                                  {getTargetLabel(run.target, t)}
                                </span>
                                <span className="text-xs text-text-muted">
                                  {run.summary.passRate}% {t("passSuffix")}
                                </span>
                              </div>
                              <p className="text-xs text-text-muted mt-1">
                                {t("historyLatency", { value: run.avgLatencyMs })}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {liveResult?.runs?.length ? (
                      <div
                        className={`grid gap-4 ${
                          liveResult.runs.length > 1 ? "xl:grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {liveResult.runs.map((run) => (
                          <Card key={run.id} className="p-4">
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <div>
                                <h4 className="text-sm font-semibold text-text-main">
                                  {getTargetLabel(run.target, t)}
                                </h4>
                                <p className="text-xs text-text-muted">
                                  {formatTimestamp(run.createdAt)} ·{" "}
                                  {t("historyLatency", { value: run.avgLatencyMs })}
                                </p>
                              </div>
                              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                {run.summary.passRate}% {t("passSuffix")}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-surface/30 border border-border/20">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-emerald-400">
                                  {run.summary.passRate}%
                                </span>
                                <span className="text-xs text-text-muted">{t("passRate")}</span>
                              </div>
                              <div className="text-xs text-text-muted">
                                {t("summaryBreakdown", {
                                  passed: run.summary.passed,
                                  failed: run.summary.failed,
                                  total: run.summary.total,
                                })}
                              </div>
                            </div>

                            {run.results.length > 0 ? (
                              <div className="flex max-h-[420px] flex-col gap-2 overflow-auto pr-1">
                                {run.results.map((result, index) => {
                                  const resultKey = `${run.id}:${result.caseId || index}`;
                                  const isResultExpanded = expandedResults.has(resultKey);
                                  const actualOutput = getResultActualValue(
                                    result,
                                    run.outputs?.[result.caseId]
                                  );
                                  const expectedOutput = getResultExpectedValue(result);

                                  return (
                                    <div
                                      key={resultKey}
                                      className="overflow-hidden rounded-lg border border-border/20 bg-surface/20"
                                    >
                                      <button
                                        type="button"
                                        className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-surface/30"
                                        aria-expanded={isResultExpanded}
                                        aria-label={
                                          isResultExpanded ? t("collapseResult") : t("expandResult")
                                        }
                                        onClick={() => toggleResultExpansion(resultKey)}
                                      >
                                        <span className="material-symbols-outlined text-[18px] text-text-muted">
                                          {isResultExpanded ? "expand_less" : "expand_more"}
                                        </span>
                                        <div className="min-w-0">
                                          <div className="flex flex-wrap items-center gap-2">
                                            <span className="truncate text-sm font-medium text-text-main">
                                              {result.caseName || result.caseId || "—"}
                                            </span>
                                            <span
                                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                                result.passed
                                                  ? "bg-emerald-500/10 text-emerald-400"
                                                  : "bg-red-500/10 text-red-400"
                                              }`}
                                            >
                                              {result.passed
                                                ? t("resultPassed")
                                                : t("resultFailed")}
                                            </span>
                                            {result.error ? (
                                              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                                                {t("errorBadge")}
                                              </span>
                                            ) : null}
                                          </div>
                                          <p className="mt-1 truncate text-xs text-text-muted">
                                            {getResultDetails(result, t)}
                                          </p>
                                        </div>
                                        <span className="text-xs font-mono text-text-muted">
                                          {result.durationMs != null
                                            ? `${result.durationMs}ms`
                                            : "—"}
                                        </span>
                                      </button>

                                      {isResultExpanded && (
                                        <div className="grid grid-cols-1 gap-3 border-t border-border/20 p-3 lg:grid-cols-2">
                                          <div>
                                            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                                              {t("expectedOutputLabel")}
                                            </p>
                                            <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-md border border-border/20 bg-black/5 p-3 text-xs text-text-main dark:bg-white/5">
                                              {expectedOutput}
                                            </pre>
                                          </div>
                                          <div>
                                            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                                              {t("actualOutputLabel")}
                                            </p>
                                            <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-md border border-border/20 bg-black/5 p-3 text-xs text-text-main dark:bg-white/5">
                                              {actualOutput}
                                            </pre>
                                            {result.error ? (
                                              <p className="mt-2 text-xs text-red-400">
                                                {result.error}
                                              </p>
                                            ) : null}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="rounded-lg border border-border/20 px-4 py-8 text-center text-sm text-text-muted">
                                {t("noResultsYet")}
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    ) : suiteHistory.length > 0 ? (
                      <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-4">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div>
                            <h4 className="text-sm font-semibold text-text-main">
                              {t("suiteLatestRuns")}
                            </h4>
                            <p className="text-xs text-text-muted">{t("suiteLatestRunsHint")}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {suiteHistory.slice(0, 4).map((run) => (
                            <div
                              key={run.id}
                              className="rounded-lg border border-border/20 px-4 py-3"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-text-main">
                                  {getTargetLabel(run.target, t)}
                                </span>
                                <span className="text-xs font-semibold text-primary">
                                  {run.summary.passRate}%
                                </span>
                              </div>
                              <p className="text-xs text-text-muted mt-1">
                                {formatTimestamp(run.createdAt)}
                              </p>
                              <p className="text-xs text-text-muted mt-1">
                                {t("historyLatency", { value: run.avgLatencyMs })}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-[16px] text-text-muted">
                        checklist
                      </span>
                      <span className="text-xs text-text-muted font-medium">
                        {t("testCasesCount", { count: (suite.cases || []).length })}
                      </span>
                    </div>
                    <DataTable
                      columns={[
                        { key: "name", label: t("columnCase") },
                        { key: "model", label: t("columnModel") },
                        { key: "strategy", label: t("columnStrategy") },
                        { key: "expected", label: t("columnExpected") },
                      ]}
                      data={(suite.cases || []).map((evalCase, index) => ({
                        id: evalCase.id || index,
                        name: evalCase.name,
                        model: evalCase.model || "—",
                        strategy: evalCase.expected?.strategy || "—",
                        expected: evalCase.expected?.value
                          ? String(evalCase.expected.value).slice(0, 80)
                          : "—",
                      }))}
                      renderCell={(row, column) => {
                        if (column.key === "strategy") {
                          const strategy = STRATEGIES.find((item) => item.name === row.strategy);
                          return (
                            <span
                              className={`text-xs font-mono font-semibold ${
                                strategy?.color || "text-text-muted"
                              }`}
                            >
                              {String(row.strategy || "—")}
                            </span>
                          );
                        }

                        if (column.key === "model") {
                          return (
                            <span className="text-xs font-mono text-primary/80">
                              {String(row.model || "—")}
                            </span>
                          );
                        }

                        if (column.key === "expected") {
                          return (
                            <span className="text-text-muted text-xs font-mono truncate max-w-[320px] block">
                              {String(row.expected || "—")}
                            </span>
                          );
                        }

                        return (
                          <span className="text-sm text-text-main">
                            {String(row[column.key] || "—")}
                          </span>
                        );
                      }}
                      maxHeight="320px"
                      emptyMessage={t("noTestCasesDefined")}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <SuiteBuilderModal
        draft={suiteDraft}
        isOpen={isBuilderOpen}
        onChange={setSuiteDraft}
        onClose={() => {
          if (savingSuite) return;
          setIsBuilderOpen(false);
          setSuiteDraft(createEmptySuiteDraft());
        }}
        onSave={() => void handleSaveSuite()}
        saving={savingSuite}
        t={t}
      />
    </div>
  );
}

function HeroSection({ t }: { t: (key: string, values?: Record<string, unknown>) => string }) {
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
            <h2 className="text-xl font-bold text-text-main mb-1">{t("modelEvals")}</h2>
            <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
              {t("evalsHeroDescription")}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">
                  verified
                </span>
                {t("qualityValidation")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-sky-400">compare</span>
                {t("modelComparison")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-amber-400">
                  bug_report
                </span>
                {t("regressionDetection")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-violet-400">speed</span>
                {t("latencyBenchmarks")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SuiteBuilderModal({
  draft,
  isOpen,
  onChange,
  onClose,
  onSave,
  saving,
  t,
}: {
  draft: EvalSuiteDraft;
  isOpen: boolean;
  onChange: (next: EvalSuiteDraft) => void;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
}) {
  const editableStrategies = STRATEGIES.filter((strategy) => strategy.name !== "custom");

  function updateCase(caseId: string, patch: Partial<EvalCaseDraft>) {
    onChange({
      ...draft,
      cases: draft.cases.map((entry) => (entry.id === caseId ? { ...entry, ...patch } : entry)),
    });
  }

  function addCase() {
    onChange({
      ...draft,
      cases: [...draft.cases, createEmptyCaseDraft()],
    });
  }

  function removeCase(caseId: string) {
    if (draft.cases.length <= 1) {
      onChange({
        ...draft,
        cases: [createEmptyCaseDraft()],
      });
      return;
    }

    onChange({
      ...draft,
      cases: draft.cases.filter((entry) => entry.id !== caseId),
    });
  }

  function duplicateCase(caseId: string) {
    const source = draft.cases.find((entry) => entry.id === caseId);
    if (!source) return;

    const sourceIndex = draft.cases.findIndex((entry) => entry.id === caseId);
    const duplicate = {
      ...source,
      id: createDraftId(),
      name: source.name ? `${source.name} ${t("suiteBuilderCloneSuffix")}`.trim() : "",
    };
    const nextCases = [...draft.cases];
    nextCases.splice(sourceIndex + 1, 0, duplicate);
    onChange({
      ...draft,
      cases: nextCases,
    });
  }

  function getExpectedPlaceholder(strategy: BuilderStrategy) {
    if (strategy === "exact") return t("suiteBuilderCaseExpectedPlaceholderExact");
    if (strategy === "regex") return t("suiteBuilderCaseExpectedPlaceholderRegex");
    return t("suiteBuilderCaseExpectedPlaceholderContains");
  }

  function getExpectedHint(strategy: BuilderStrategy) {
    if (strategy === "regex") return t("suiteBuilderCaseExpectedHintRegex");
    return undefined;
  }

  return (
    <Modal
      isOpen={isOpen}
      title={draft.id ? t("suiteBuilderEditTitle") : t("suiteBuilderCreateTitle")}
      onClose={onClose}
    >
      <div className="flex max-h-[75vh] flex-col gap-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label={t("suiteBuilderNameLabel")}
            value={draft.name}
            onChange={(event) => onChange({ ...draft, name: event.target.value })}
            placeholder={t("suiteBuilderNamePlaceholder")}
          />
          <Input
            label={t("suiteBuilderDescriptionLabel")}
            value={draft.description}
            onChange={(event) => onChange({ ...draft, description: event.target.value })}
            placeholder={t("suiteBuilderDescriptionPlaceholder")}
          />
        </div>

        <div className="rounded-xl border border-border/20 bg-surface/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-sm font-semibold text-text-main">
                {t("suiteBuilderCasesTitle")}
              </h4>
              <p className="text-xs text-text-muted">{t("suiteBuilderCasesHint")}</p>
            </div>
            <Button icon="add" variant="secondary" onClick={addCase}>
              {t("suiteBuilderAddCase")}
            </Button>
          </div>
        </div>

        {draft.cases.map((draftCase, index) => {
          const selectedStrategy = editableStrategies.find(
            (strategy) => strategy.name === draftCase.strategy
          );

          return (
            <Card key={draftCase.id} className="p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">
                    {t("suiteBuilderCaseCardTitle", { index: index + 1 })}
                  </h4>
                  <p className="text-xs text-text-muted">
                    {t("suiteBuilderCaseCardHint", { index: index + 1 })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="content_copy"
                    onClick={() => duplicateCase(draftCase.id)}
                  >
                    {t("suiteBuilderDuplicateCase")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon="delete"
                    onClick={() => removeCase(draftCase.id)}
                  >
                    {t("delete")}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label={t("suiteBuilderCaseNameLabel")}
                  value={draftCase.name}
                  onChange={(event) => updateCase(draftCase.id, { name: event.target.value })}
                  placeholder={t("suiteBuilderCaseNamePlaceholder")}
                />
                <Input
                  label={t("suiteBuilderCaseModelLabel")}
                  value={draftCase.model}
                  onChange={(event) => updateCase(draftCase.id, { model: event.target.value })}
                  placeholder={t("suiteBuilderCaseModelPlaceholder")}
                />
                <Input
                  label={t("suiteBuilderCaseTagsLabel")}
                  value={draftCase.tags}
                  onChange={(event) => updateCase(draftCase.id, { tags: event.target.value })}
                  placeholder={t("suiteBuilderCaseTagsPlaceholder")}
                  hint={t("suiteBuilderCaseTagsHint")}
                />
                <Select
                  label={t("suiteBuilderCaseStrategyLabel")}
                  value={draftCase.strategy}
                  onChange={(event) =>
                    updateCase(draftCase.id, { strategy: event.target.value as BuilderStrategy })
                  }
                  options={editableStrategies.map((strategy) => ({
                    value: strategy.name,
                    label: t(strategy.labelKey),
                  }))}
                />
                {selectedStrategy && (
                  <div
                    className={`flex items-start gap-2 rounded-lg px-3 py-2 ${selectedStrategy.bg}`}
                  >
                    <span
                      className={`material-symbols-outlined mt-0.5 text-[18px] ${selectedStrategy.color}`}
                    >
                      {selectedStrategy.icon}
                    </span>
                    <p className="text-xs leading-relaxed text-text-muted">
                      {t(selectedStrategy.descriptionKey)}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-text-main">
                    {t("suiteBuilderCaseSystemPromptLabel")}
                  </span>
                  <textarea
                    value={draftCase.systemPrompt}
                    onChange={(event) =>
                      updateCase(draftCase.id, { systemPrompt: event.target.value })
                    }
                    rows={3}
                    placeholder={t("suiteBuilderCaseSystemPromptPlaceholder")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-text-main">
                    {t("suiteBuilderCaseUserPromptLabel")}
                  </span>
                  <textarea
                    value={draftCase.userPrompt}
                    onChange={(event) =>
                      updateCase(draftCase.id, { userPrompt: event.target.value })
                    }
                    rows={4}
                    placeholder={t("suiteBuilderCaseUserPromptPlaceholder")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                  />
                </label>
                <Input
                  label={t("suiteBuilderCaseExpectedLabel")}
                  value={draftCase.expectedValue}
                  onChange={(event) =>
                    updateCase(draftCase.id, { expectedValue: event.target.value })
                  }
                  placeholder={getExpectedPlaceholder(draftCase.strategy)}
                  hint={getExpectedHint(draftCase.strategy)}
                />
              </div>
            </Card>
          );
        })}

        <div className="flex gap-2">
          <Button fullWidth onClick={onSave} disabled={saving}>
            {saving ? t("saving") : draft.id ? t("save") : t("suiteBuilderCreateAction")}
          </Button>
          <Button fullWidth variant="ghost" onClick={onClose} disabled={saving}>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
