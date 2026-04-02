"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Card,
  Button,
  Modal,
  Input,
  Toggle,
  CardSkeleton,
  ModelSelectModal,
  ProxyConfigModal,
  EmptyState,
} from "@/shared/components";
import Tooltip from "@/shared/components/Tooltip";
import ModelRoutingSection from "@/shared/components/ModelRoutingSection";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { useNotificationStore } from "@/store/notificationStore";
import { ROUTING_STRATEGIES } from "@/shared/constants/routingStrategies";
import { useTranslations } from "next-intl";

// Validate combo name: letters, numbers, -, _, /, .
const VALID_NAME_REGEX = /^[a-zA-Z0-9_/.-]+$/;

const STRATEGY_OPTIONS = ROUTING_STRATEGIES.map((strategy) => ({
  value: strategy.value,
  labelKey: strategy.labelKey,
  descKey: strategy.combosDescKey,
  icon: strategy.icon,
}));

const STRATEGY_GUIDANCE_FALLBACK = {
  priority: {
    when: "Use when you have one preferred model and only want fallback on failure.",
    avoid: "Avoid when you need balanced load between models.",
    example: "Example: Primary coding model with cheaper backup for outages.",
  },
  weighted: {
    when: "Use when you need controlled traffic split across models.",
    avoid: "Avoid when weights are not maintained or you need strict fairness.",
    example: "Example: 80% stable model and 20% canary model for safe rollout.",
  },
  "round-robin": {
    when: "Use when you need predictable, even request distribution.",
    avoid: "Avoid when model latency/cost differs significantly.",
    example: "Example: Same model across multiple accounts to spread throughput.",
  },
  random: {
    when: "Use when you want a simple spread with low configuration effort.",
    avoid: "Avoid when requests must be distributed with strict guarantees.",
    example: "Example: Prototyping with equivalent models and no traffic policy.",
  },
  "least-used": {
    when: "Use when you want adaptive balancing based on recent demand.",
    avoid: "Avoid when your traffic is too low to benefit from usage balancing.",
    example: "Example: Mixed workloads where one model tends to get overloaded.",
  },
  "cost-optimized": {
    when: "Use when minimizing cost is the top priority.",
    avoid: "Avoid when pricing data is missing or outdated.",
    example: "Example: Batch or background jobs where lower cost matters most.",
  },
  "fill-first": {
    when: "Use when you want to drain one provider's quota fully before moving to the next.",
    avoid: "Avoid when you need request-level load balancing across providers.",
    example: "Example: Use all $200 Deepgram credits before falling to Groq.",
  },
  p2c: {
    when: "Use when you want low-latency selection using Power-of-Two-Choices algorithm.",
    avoid: "Avoid for small combos with 2 or fewer models — no benefit over round-robin.",
    example: "Example: High-throughput inference across 4+ equivalent model endpoints.",
  },
  "strict-random": {
    when: "Use when you want perfectly even spread — each model used once before repeating.",
    avoid: "Avoid when models have different quality or latency and order matters.",
    example: "Example: Multiple accounts of the same model to distribute usage evenly.",
  },
};

const ADVANCED_FIELD_HELP_FALLBACK = {
  maxRetries: "How many retries are attempted before failing the request.",
  retryDelay: "Initial delay between retries. Higher values reduce burst pressure.",
  timeout: "Maximum request time before aborting. Set higher for long generations.",
  healthcheck: "Skips unhealthy models/providers from routing decisions when enabled.",
  concurrencyPerModel: "Max simultaneous requests sent to each model in round-robin.",
  queueTimeout: "How long a request can wait in queue before timeout in round-robin.",
};

const STRATEGY_RECOMMENDATIONS_FALLBACK = {
  priority: {
    title: "Fail-safe baseline",
    description: "Use one primary model and keep fallback chain short and reliable.",
    tips: [
      "Put your most reliable model first.",
      "Keep 1-2 backup models with similar quality.",
      "Use safe retries to absorb transient provider failures.",
    ],
  },
  weighted: {
    title: "Controlled traffic split",
    description: "Great for canary rollouts and gradual migration between models.",
    tips: [
      "Start with conservative split like 90/10.",
      "Keep the total at 100% and auto-balance after changes.",
      "Monitor success and latency before increasing canary weight.",
    ],
  },
  "round-robin": {
    title: "Predictable load sharing",
    description: "Best when models are equivalent and you need smooth distribution.",
    tips: [
      "Use at least 2 models.",
      "Set concurrency limits to avoid burst overload.",
      "Use queue timeout to fail fast under saturation.",
    ],
  },
  random: {
    title: "Quick spread with low setup",
    description: "Use when you need simple distribution without strict guarantees.",
    tips: [
      "Use models with similar latency profiles.",
      "Keep retries enabled to absorb random misses.",
      "Prefer this for experimentation, not strict SLAs.",
    ],
  },
  "least-used": {
    title: "Adaptive balancing",
    description: "Routes to less-used models to reduce hotspots over time.",
    tips: [
      "Works better under continuous traffic.",
      "Combine with health checks for safer balancing.",
      "Track per-model usage to validate distribution gains.",
    ],
  },
  "cost-optimized": {
    title: "Budget-first routing",
    description: "Routes to lower-cost models when pricing metadata is available.",
    tips: [
      "Ensure pricing coverage for all selected models.",
      "Keep a quality fallback for hard prompts.",
      "Use for batch/background jobs where cost is the main KPI.",
    ],
  },
  "fill-first": {
    title: "Quota drain strategy",
    description: "Exhausts one provider's quota before moving to the next in chain.",
    tips: [
      "Order models by free quota size — biggest first.",
      "Enable health checks to skip drained providers.",
      "Ideal for free-tier stacking (Deepgram → Groq → NIM).",
    ],
  },
  p2c: {
    title: "Power-of-Two-Choices",
    description:
      "Picks the less-loaded of two random candidates per request — low latency at scale.",
    tips: [
      "Use with 4+ models for best effect.",
      "Requires latency telemetry enabled in Settings.",
      "Great replacement for round-robin in high-throughput combos.",
    ],
  },
  "strict-random": {
    title: "Shuffle deck distribution",
    description: "Each model is used exactly once per cycle before reshuffling.",
    tips: [
      "Use at least 2 models for meaningful distribution.",
      "Ideal for same-model accounts to evenly spread quota.",
      "Guarantees no model is skipped or repeated within a cycle.",
    ],
  },
};

const COMBO_USAGE_GUIDE_STORAGE_KEY = "omniroute:combos:hide-usage-guide";

const COMBO_TEMPLATE_FALLBACK = {
  title: "Quick templates",
  description: "Apply a starting profile, then adjust models and config.",
  apply: "Apply template",
  highAvailabilityTitle: "High availability",
  highAvailabilityDesc: "Priority routing with health checks and safe retries.",
  costSaverTitle: "Cost saver",
  costSaverDesc: "Cost-optimized routing for budget-first workloads.",
  balancedTitle: "Balanced load",
  balancedDesc: "Least-used routing to spread demand over time.",
  freeStackTitle: "Free Stack ($0)",
  freeStackDesc:
    "Round-robin across all free providers: Kiro, iFlow, Qwen, Gemini CLI. Zero cost, never stops.",
  paidPremiumTitle: "Paid Premium",
  paidPremiumDesc:
    "Round-robin across paid subscriptions: Cursor, Antigravity. Top-tier models, distributed load.",
};

const COMBO_TEMPLATES = [
  {
    id: "free-stack",
    icon: "volunteer_activism",
    titleKey: "templateFreeStack",
    descKey: "templateFreeStackDesc",
    fallbackTitle: COMBO_TEMPLATE_FALLBACK.freeStackTitle,
    fallbackDesc: COMBO_TEMPLATE_FALLBACK.freeStackDesc,
    strategy: "round-robin",
    suggestedName: "free-stack",
    isFeatured: true,
    config: {
      maxRetries: 3,
      retryDelayMs: 500,
      healthCheckEnabled: true,
    },
  },
  {
    id: "high-availability",
    icon: "shield",
    titleKey: "templateHighAvailability",
    descKey: "templateHighAvailabilityDesc",
    fallbackTitle: COMBO_TEMPLATE_FALLBACK.highAvailabilityTitle,
    fallbackDesc: COMBO_TEMPLATE_FALLBACK.highAvailabilityDesc,
    strategy: "priority",
    suggestedName: "high-availability",
    config: {
      maxRetries: 2,
      retryDelayMs: 1500,
      healthCheckEnabled: true,
    },
  },
  {
    id: "cost-saver",
    icon: "savings",
    titleKey: "templateCostSaver",
    descKey: "templateCostSaverDesc",
    fallbackTitle: COMBO_TEMPLATE_FALLBACK.costSaverTitle,
    fallbackDesc: COMBO_TEMPLATE_FALLBACK.costSaverDesc,
    strategy: "cost-optimized",
    suggestedName: "cost-saver",
    config: {
      maxRetries: 1,
      retryDelayMs: 500,
      healthCheckEnabled: true,
    },
  },
  {
    id: "balanced",
    icon: "balance",
    titleKey: "templateBalanced",
    descKey: "templateBalancedDesc",
    fallbackTitle: COMBO_TEMPLATE_FALLBACK.balancedTitle,
    fallbackDesc: COMBO_TEMPLATE_FALLBACK.balancedDesc,
    strategy: "least-used",
    suggestedName: "balanced-load",
    config: {
      maxRetries: 1,
      retryDelayMs: 1000,
      healthCheckEnabled: true,
    },
  },
  {
    id: "paid-premium",
    icon: "workspace_premium",
    titleKey: "templatePaidPremium",
    descKey: "templatePaidPremiumDesc",
    fallbackTitle: COMBO_TEMPLATE_FALLBACK.paidPremiumTitle,
    fallbackDesc: COMBO_TEMPLATE_FALLBACK.paidPremiumDesc,
    strategy: "round-robin",
    suggestedName: "paid-premium",
    config: {
      maxRetries: 2,
      retryDelayMs: 1000,
      healthCheckEnabled: true,
    },
  },
];

function getStrategyMeta(strategy) {
  return STRATEGY_OPTIONS.find((s) => s.value === strategy) || STRATEGY_OPTIONS[0];
}

function getStrategyLabel(t, strategy) {
  return t(getStrategyMeta(strategy).labelKey);
}

function getStrategyDescription(t, strategy) {
  return t(getStrategyMeta(strategy).descKey);
}

function getStrategyBadgeClass(strategy) {
  if (strategy === "weighted") return "bg-amber-500/15 text-amber-600 dark:text-amber-400";
  if (strategy === "round-robin") return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";
  if (strategy === "random") return "bg-purple-500/15 text-purple-600 dark:text-purple-400";
  if (strategy === "least-used") return "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400";
  if (strategy === "cost-optimized") return "bg-teal-500/15 text-teal-600 dark:text-teal-400";
  if (strategy === "fill-first") return "bg-orange-500/15 text-orange-600 dark:text-orange-400";
  if (strategy === "p2c") return "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400";
  return "bg-blue-500/15 text-blue-600 dark:text-blue-400";
}

function getI18nOrFallback(t, key, fallback) {
  if (typeof t.has === "function" && t.has(key)) return t(key);
  return fallback;
}

function getStrategyGuideText(t, strategy, field) {
  const strategyFallback =
    STRATEGY_GUIDANCE_FALLBACK[strategy] || STRATEGY_GUIDANCE_FALLBACK.priority;
  const key = `strategyGuide.${strategy}.${field}`;
  return getI18nOrFallback(t, key, strategyFallback[field]);
}

function getStrategyRecommendationText(t, strategy, field) {
  const strategyFallback =
    STRATEGY_RECOMMENDATIONS_FALLBACK[strategy] || STRATEGY_RECOMMENDATIONS_FALLBACK.priority;

  if (field === "tips") {
    return strategyFallback.tips.map((tip, index) =>
      getI18nOrFallback(t, `strategyRecommendations.${strategy}.tip${index + 1}`, tip)
    );
  }

  return getI18nOrFallback(
    t,
    `strategyRecommendations.${strategy}.${field}`,
    strategyFallback[field]
  );
}

// ─────────────────────────────────────────────
// Helper: normalize model entry (legacy string ↔ new object)
// ─────────────────────────────────────────────
function normalizeModelEntry(entry) {
  if (typeof entry === "string") return { model: entry, weight: 0 };
  return { model: entry.model, weight: entry.weight || 0 };
}

function getModelString(entry) {
  return typeof entry === "string" ? entry : entry.model;
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function CombosPage() {
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCombo, setEditingCombo] = useState(null);
  const [activeProviders, setActiveProviders] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [testingCombo, setTestingCombo] = useState(null);
  const { copied, copy } = useCopyToClipboard();
  const notify = useNotificationStore();
  const [proxyTargetCombo, setProxyTargetCombo] = useState(null);
  const [proxyConfig, setProxyConfig] = useState(null);
  const [providerNodes, setProviderNodes] = useState([]);
  const [showUsageGuide, setShowUsageGuide] = useState(true);
  const [recentlyCreatedCombo, setRecentlyCreatedCombo] = useState("");

  useEffect(() => {
    fetchData();
    fetch("/api/settings/proxy")
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => setProxyConfig(c))
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      if (globalThis.localStorage?.getItem(COMBO_USAGE_GUIDE_STORAGE_KEY) === "1") {
        setShowUsageGuide(false);
      }
    } catch {
      // Ignore storage access errors (privacy mode / restricted environments)
    }
  }, []);

  const fetchData = async () => {
    try {
      const [combosRes, providersRes, metricsRes, nodesRes] = await Promise.all([
        fetch("/api/combos"),
        fetch("/api/providers"),
        fetch("/api/combos/metrics"),
        fetch("/api/provider-nodes"),
      ]);
      const combosData = await combosRes.json();
      const providersData = await providersRes.json();
      const metricsData = await metricsRes.json();
      const nodesData = nodesRes.ok ? await nodesRes.json() : { nodes: [] };

      if (combosRes.ok) setCombos(combosData.combos || []);
      if (providersRes.ok) {
        const active = (providersData.connections || []).filter(
          (c) => c.testStatus === "active" || c.testStatus === "success"
        );
        setActiveProviders(active);
      }
      if (metricsRes.ok) setMetrics(metricsData.metrics || {});
      setProviderNodes(nodesData.nodes || []);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await fetch("/api/combos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchData();
        setShowCreateModal(false);
        setRecentlyCreatedCombo(data.name?.trim() || "");
        notify.success(t("comboCreated"));
      } else {
        const err = await res.json();
        notify.error(err.error?.message || err.error || t("failedCreate"));
      }
    } catch (error) {
      notify.error(t("errorCreating"));
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await fetch(`/api/combos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchData();
        setEditingCombo(null);
        notify.success(t("comboUpdated"));
      } else {
        const err = await res.json();
        notify.error(err.error?.message || err.error || t("failedUpdate"));
      }
    } catch (error) {
      notify.error(t("errorUpdating"));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t("deleteConfirm"))) return;
    try {
      const res = await fetch(`/api/combos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCombos(combos.filter((c) => c.id !== id));
        notify.success(t("comboDeleted"));
      }
    } catch (error) {
      notify.error(t("errorDeleting"));
    }
  };

  const handleDuplicate = async (combo) => {
    const baseName = combo.name.replace(/-copy(-\d+)?$/, "");
    const existingNames = combos.map((c) => c.name);
    let newName = `${baseName}-copy`;
    let counter = 1;
    while (existingNames.includes(newName)) {
      counter++;
      newName = `${baseName}-copy-${counter}`;
    }

    const data = {
      name: newName,
      models: combo.models,
      strategy: combo.strategy || "priority",
      config: combo.config || {},
    };

    await handleCreate(data);
  };

  const handleTestCombo = async (combo) => {
    setTestingCombo(combo.name);
    setTestResults(null);
    try {
      const res = await fetch("/api/combos/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comboName: combo.name }),
      });
      const data = await res.json();
      setTestResults(data);
    } catch (error) {
      setTestResults({ error: t("testFailed") });
      notify.error(t("testFailed"));
    }
  };

  const handleToggleCombo = async (combo) => {
    const newActive = combo.isActive === false ? true : false;
    // Optimistic update
    setCombos((prev) => prev.map((c) => (c.id === combo.id ? { ...c, isActive: newActive } : c)));
    try {
      await fetch(`/api/combos/${combo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newActive }),
      });
    } catch (error) {
      // Revert on error
      setCombos((prev) =>
        prev.map((c) => (c.id === combo.id ? { ...c, isActive: !newActive } : c))
      );
      notify.error(t("failedToggle"));
    }
  };

  const handleHideUsageGuideForever = () => {
    setShowUsageGuide(false);
    try {
      globalThis.localStorage?.setItem(COMBO_USAGE_GUIDE_STORAGE_KEY, "1");
    } catch {}
  };

  const handleShowUsageGuide = () => {
    setShowUsageGuide(true);
    try {
      globalThis.localStorage?.removeItem(COMBO_USAGE_GUIDE_STORAGE_KEY);
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-text-muted mt-1">{t("description")}</p>
        </div>
        <div className="flex items-center gap-2">
          {!showUsageGuide && (
            <Button size="sm" variant="ghost" onClick={handleShowUsageGuide}>
              {getI18nOrFallback(t, "usageGuideShow", "Show guide")}
            </Button>
          )}
          <Button icon="add" onClick={() => setShowCreateModal(true)}>
            {t("createCombo")}
          </Button>
        </div>
      </div>

      {showUsageGuide && (
        <ComboUsageGuide
          onHide={() => setShowUsageGuide(false)}
          onHideForever={handleHideUsageGuideForever}
        />
      )}

      {recentlyCreatedCombo && (
        <Card
          padding="sm"
          className="border border-emerald-500/20 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.08]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {getI18nOrFallback(
                  t,
                  "quickTestTitle",
                  `Combo "${recentlyCreatedCombo}" ready to validate`
                )}
              </p>
              <code className="inline-block text-[11px] mt-0.5 px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                {recentlyCreatedCombo}
              </code>
              <p className="text-xs text-text-muted mt-0.5">
                {getI18nOrFallback(
                  t,
                  "quickTestDescription",
                  "Run a test now to confirm fallback and latency behavior."
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                icon="play_arrow"
                onClick={() => {
                  handleTestCombo({ name: recentlyCreatedCombo });
                  setRecentlyCreatedCombo("");
                }}
              >
                {getI18nOrFallback(t, "testNow", "Test now")}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setRecentlyCreatedCombo("")}>
                {tc("close")}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Model Routing Rules (#563) */}
      <ModelRoutingSection combos={combos} />

      {/* Combos List */}
      {combos.length === 0 ? (
        <EmptyState
          icon="🧩"
          title={t("noCombosYet")}
          description={t("description")}
          actionLabel={t("createCombo")}
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {combos.map((combo) => (
            <ComboCard
              key={combo.id}
              combo={combo}
              metrics={metrics[combo.name]}
              providerNodes={providerNodes}
              copied={copied}
              onCopy={copy}
              onEdit={() => setEditingCombo(combo)}
              onDelete={() => handleDelete(combo.id)}
              onDuplicate={() => handleDuplicate(combo)}
              onTest={() => handleTestCombo(combo)}
              testing={testingCombo === combo.name}
              onProxy={() => setProxyTargetCombo(combo)}
              hasProxy={!!proxyConfig?.combos?.[combo.id]}
              onToggle={() => handleToggleCombo(combo)}
            />
          ))}
        </div>
      )}

      {/* Test Results Modal */}
      {testResults && (
        <Modal
          isOpen={!!testResults}
          onClose={() => {
            setTestResults(null);
            setTestingCombo(null);
          }}
          title={t("testResults", { name: testingCombo })}
        >
          <TestResultsView results={testResults} />
        </Modal>
      )}

      {/* Create Modal */}
      <ComboFormModal
        key="create"
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreate}
        activeProviders={activeProviders}
        combo={null}
      />

      {/* Edit Modal */}
      <ComboFormModal
        key={editingCombo?.id || "new"}
        isOpen={!!editingCombo}
        combo={editingCombo}
        onClose={() => setEditingCombo(null)}
        onSave={(data) => handleUpdate(editingCombo.id, data)}
        activeProviders={activeProviders}
      />

      {/* Proxy Config Modal */}
      {proxyTargetCombo && (
        <ProxyConfigModal
          isOpen={!!proxyTargetCombo}
          onClose={() => setProxyTargetCombo(null)}
          level="combo"
          levelId={proxyTargetCombo.id}
          levelLabel={proxyTargetCombo.name}
        />
      )}
    </div>
  );
}

function ComboUsageGuide({ onHide, onHideForever }) {
  const t = useTranslations("combos");
  const guideStrategies = ["priority", "cost-optimized", "least-used"];

  return (
    <Card padding="sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[16px]">
              tips_and_updates
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold">{t("routingStrategy")}</h2>
            <p className="text-xs text-text-muted mt-0.5">{t("description")}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button size="sm" variant="ghost" onClick={onHide} className="!h-6 px-2 text-[10px]">
            {getI18nOrFallback(t, "usageGuideHide", "Hide")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onHideForever}
            className="!h-6 px-2 text-[10px]"
          >
            {getI18nOrFallback(t, "usageGuideDontShowAgain", "Don't show again")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        {guideStrategies.map((strategyValue) => {
          const strategyMeta = getStrategyMeta(strategyValue);
          return (
            <div
              key={strategyValue}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-2.5"
            >
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-primary">
                  {strategyMeta.icon}
                </span>
                <span className="text-xs font-medium">{getStrategyLabel(t, strategyValue)}</span>
              </div>
              <p className="text-[11px] leading-4 text-text-muted mt-1.5">
                {getStrategyDescription(t, strategyValue)}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function StrategyGuidanceCard({ strategy }) {
  const t = useTranslations("combos");
  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-2.5">
      <div className="text-[11px] text-text-muted">
        {getI18nOrFallback(t, "strategyGuideTitle", "How to use this strategy")}
      </div>
      <div className="mt-1.5 flex flex-col gap-1.5 text-[11px]">
        <p className="text-text-main">
          <span className="font-semibold">
            {getI18nOrFallback(t, "strategyGuideWhen", "When to use")}:
          </span>{" "}
          {getStrategyGuideText(t, strategy, "when")}
        </p>
        <p className="text-text-main">
          <span className="font-semibold">
            {getI18nOrFallback(t, "strategyGuideAvoid", "Avoid when")}:
          </span>{" "}
          {getStrategyGuideText(t, strategy, "avoid")}
        </p>
        <p className="text-text-main">
          <span className="font-semibold">
            {getI18nOrFallback(t, "strategyGuideExample", "Example")}:
          </span>{" "}
          {getStrategyGuideText(t, strategy, "example")}
        </p>
      </div>
    </div>
  );
}

function StrategyRecommendationsPanel({ strategy, onApply, showNudge }) {
  const t = useTranslations("combos");
  const strategyLabel = getStrategyLabel(t, strategy);
  const title = getStrategyRecommendationText(t, strategy, "title");
  const description = getStrategyRecommendationText(t, strategy, "description");
  const tips = getStrategyRecommendationText(t, strategy, "tips");

  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] text-text-muted">
            {getI18nOrFallback(t, "recommendationsLabel", "Recommended setup")}
          </p>
          <p className="text-xs font-semibold text-text-main mt-0.5">
            {title} · <span className="text-primary">{strategyLabel}</span>
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">{description}</p>
        </div>
        <Button size="sm" variant="ghost" onClick={onApply} className="!h-6 px-2 text-[10px]">
          {getI18nOrFallback(t, "applyRecommendations", "Apply recommendations")}
        </Button>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-1">
        {tips.map((tip, index) => (
          <div
            key={`${strategy}-tip-${index + 1}`}
            className="flex items-start gap-1 rounded-md bg-black/[0.02] dark:bg-white/[0.03] px-1.5 py-1"
          >
            <span className="material-symbols-outlined text-[12px] text-primary mt-0.5">check</span>
            <p className="text-[10px] text-text-main">{tip}</p>
          </div>
        ))}
      </div>

      {showNudge && (
        <div
          data-testid="strategy-change-nudge"
          className="mt-2 rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] text-primary"
        >
          {getI18nOrFallback(
            t,
            "recommendationsUpdated",
            "Recommendations updated for {strategy}."
          ).replace("{strategy}", strategyLabel)}
        </div>
      )}
    </div>
  );
}

function FieldLabelWithHelp({ label, help }) {
  return (
    <div className="flex items-center gap-1 mb-0.5">
      <label className="text-[10px] text-text-muted">{label}</label>
      <Tooltip content={help}>
        <span className="material-symbols-outlined text-[12px] text-text-muted cursor-help">
          help
        </span>
      </Tooltip>
    </div>
  );
}

function ComboReadinessPanel({ checks, blockers }) {
  const t = useTranslations("combos");
  const hasBlockers = blockers.length > 0;

  return (
    <div
      data-testid="combo-readiness-panel"
      className={`rounded-lg border px-2.5 py-2 ${
        hasBlockers
          ? "border-amber-500/30 bg-amber-500/5"
          : "border-emerald-500/20 bg-emerald-500/[0.04]"
      }`}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`material-symbols-outlined text-[14px] ${
            hasBlockers
              ? "text-amber-600 dark:text-amber-400"
              : "text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {hasBlockers ? "rule" : "check_circle"}
        </span>
        <p className="text-[11px] font-medium text-text-main">
          {getI18nOrFallback(t, "readinessTitle", "Ready to save?")}
        </p>
      </div>

      <p className="text-[10px] text-text-muted mt-0.5">
        {getI18nOrFallback(
          t,
          "readinessDescription",
          "Review the checklist before creating or updating this combo."
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
        {checks.map((check) => (
          <div
            key={check.id}
            className="flex items-center gap-1 rounded-md px-1.5 py-1 bg-black/[0.02] dark:bg-white/[0.02]"
          >
            <span
              className={`material-symbols-outlined text-[12px] ${
                check.ok ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              {check.ok ? "task_alt" : "pending"}
            </span>
            <span className="text-[10px] text-text-main">{check.label}</span>
          </div>
        ))}
      </div>

      {hasBlockers && (
        <div
          data-testid="combo-save-blockers"
          className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1.5"
        >
          <p className="text-[10px] font-medium text-amber-700 dark:text-amber-300">
            {getI18nOrFallback(
              t,
              "saveBlockedTitle",
              "Save is blocked until the following items are fixed:"
            )}
          </p>
          <div className="mt-1 flex flex-col gap-0.5">
            {blockers.map((blocker, index) => (
              <p
                key={`${blocker}-${index}`}
                className="text-[10px] text-amber-700 dark:text-amber-300"
              >
                • {blocker}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Combo Card
// ─────────────────────────────────────────────
function ComboCard({
  combo,
  metrics,
  copied,
  onCopy,
  onEdit,
  onDelete,
  onDuplicate,
  onTest,
  testing,
  onProxy,
  hasProxy,
  onToggle,
  providerNodes,
}) {
  const strategy = combo.strategy || "priority";
  const models = combo.models || [];
  const isDisabled = combo.isActive === false;
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const strategyDescription = getStrategyDescription(t, strategy);

  // Resolve provider UUID to user-defined name
  const formatModelDisplay = (modelValue) => {
    const parts = modelValue.split("/");
    if (parts.length !== 2) return modelValue;
    const [providerIdentifier, modelId] = parts;
    const matchedNode = (providerNodes || []).find(
      (node) => node.id === providerIdentifier || node.prefix === providerIdentifier
    );
    return matchedNode ? `${matchedNode.name}/${modelId}` : modelValue;
  };

  return (
    <Card padding="sm" className={`group ${isDisabled ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[18px]">layers</span>
          </div>
          <div className="min-w-0 flex-1">
            {/* Name + Strategy Badge + Copy */}
            <div className="flex items-center gap-2">
              <code className="text-sm font-medium font-mono truncate">{combo.name}</code>
              <Tooltip content={strategyDescription}>
                <span
                  className={`text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded-full ${getStrategyBadgeClass(
                    strategy
                  )}`}
                >
                  {getStrategyLabel(t, strategy)}
                </span>
              </Tooltip>
              {hasProxy && (
                <span
                  className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary flex items-center gap-0.5"
                  title={t("proxyConfigured")}
                >
                  <span className="material-symbols-outlined text-[11px]">vpn_lock</span>
                  proxy
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(combo.name, `combo-${combo.id}`);
                }}
                className="p-0.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
                title={t("copyComboName")}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied === `combo-${combo.id}` ? "check" : "content_copy"}
                </span>
              </button>
            </div>

            {/* Model tags with weights */}
            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
              {models.length === 0 ? (
                <span className="text-xs text-text-muted italic">{t("noModels")}</span>
              ) : (
                models.slice(0, 3).map((entry, index) => {
                  const { model, weight } = normalizeModelEntry(entry);
                  return (
                    <code
                      key={index}
                      className="text-[10px] font-mono bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded text-text-muted"
                    >
                      {formatModelDisplay(model)}
                      {strategy === "weighted" && weight > 0 ? ` (${weight}%)` : ""}
                    </code>
                  );
                })
              )}
              {models.length > 3 && (
                <span className="text-[10px] text-text-muted">
                  {t("more", { count: models.length - 3 })}
                </span>
              )}
            </div>

            {/* Metrics row */}
            {metrics && (
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-text-muted">
                  <span className="text-emerald-500">{metrics.totalSuccesses}</span>/
                  {metrics.totalRequests} {t("reqs")}
                </span>
                <span className="text-[10px] text-text-muted">
                  {metrics.successRate}% {t("success")}
                </span>
                <span className="text-[10px] text-text-muted">~{metrics.avgLatencyMs}ms</span>
                {metrics.fallbackRate > 0 && (
                  <span className="text-[10px] text-amber-500">
                    {metrics.fallbackRate}% fallback
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <Toggle
            size="sm"
            checked={!isDisabled}
            onChange={onToggle}
            title={isDisabled ? t("enableCombo") : t("disableCombo")}
          />
          <div className="flex items-center gap-1 transition-opacity">
            <button
              onClick={onTest}
              disabled={testing}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-emerald-500 transition-colors"
              title={t("testCombo")}
            >
              <span
                className={`material-symbols-outlined text-[16px] ${testing ? "animate-spin" : ""}`}
              >
                {testing ? "progress_activity" : "play_arrow"}
              </span>
            </button>
            <button
              onClick={onDuplicate}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary transition-colors"
              title={t("duplicate")}
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
            </button>
            <button
              onClick={onProxy}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary transition-colors"
              title={t("proxyConfig")}
            >
              <span className="material-symbols-outlined text-[16px]">vpn_lock</span>
            </button>
            <button
              onClick={onEdit}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary transition-colors"
              title={tc("edit")}
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 hover:bg-red-500/10 rounded text-red-500 transition-colors"
              title={tc("delete")}
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Test Results View
// ─────────────────────────────────────────────
function TestResultsView({ results }) {
  if (results.error) {
    return (
      <div className="flex items-center gap-2 text-red-500 text-sm">
        <span className="material-symbols-outlined text-[18px]">error</span>
        {typeof results.error === "string" ? results.error : JSON.stringify(results.error)}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {results.resolvedBy && (
        <div className="flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-emerald-500 text-[18px]">
            check_circle
          </span>
          <span>
            Resolved by:{" "}
            <code className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
              {results.resolvedBy}
            </code>
          </span>
        </div>
      )}
      {results.results?.map((r, i) => (
        <div
          key={i}
          title={r.error || undefined}
          className="flex items-center gap-2 text-xs px-2 py-1.5 rounded bg-black/[0.02] dark:bg-white/[0.02]"
        >
          <span
            className={`material-symbols-outlined text-[14px] ${
              r.status === "ok"
                ? "text-emerald-500"
                : r.status === "skipped"
                  ? "text-text-muted"
                  : "text-red-500"
            }`}
          >
            {r.status === "ok" ? "check_circle" : r.status === "skipped" ? "skip_next" : "error"}
          </span>
          <code className="font-mono flex-1">{r.model}</code>
          {r.latencyMs !== undefined && <span className="text-text-muted">{r.latencyMs}ms</span>}
          <span
            className={`text-[10px] uppercase font-medium ${
              r.status === "ok"
                ? "text-emerald-500"
                : r.status === "skipped"
                  ? "text-text-muted"
                  : "text-red-500"
            }`}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Combo Form Modal
// ─────────────────────────────────────────────
function ComboFormModal({ isOpen, combo, onClose, onSave, activeProviders }) {
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const notify = useNotificationStore();
  const [name, setName] = useState(combo?.name || "");
  const [models, setModels] = useState(() => {
    return (combo?.models || []).map((m) => normalizeModelEntry(m));
  });
  const [strategy, setStrategy] = useState(combo?.strategy || "priority");
  const [showModelSelect, setShowModelSelect] = useState(false);
  const [saving, setSaving] = useState(false);
  const [nameError, setNameError] = useState("");
  const [pricingByProvider, setPricingByProvider] = useState({});
  const [modelAliases, setModelAliases] = useState({});
  const [providerNodes, setProviderNodes] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [config, setConfig] = useState(combo?.config || {});
  const [showStrategyNudge, setShowStrategyNudge] = useState(false);
  const strategyChangeMountedRef = useRef(false);
  // Agent features (#399 / #401 / #454)
  const [agentSystemMessage, setAgentSystemMessage] = useState<string>(combo?.system_message || "");
  const [agentToolFilter, setAgentToolFilter] = useState<string>(combo?.tool_filter_regex || "");
  const [agentContextCache, setAgentContextCache] = useState<boolean>(
    !!combo?.context_cache_protection
  );

  // DnD state
  const hasPricingForModel = useCallback(
    (modelValue) => {
      const parts = modelValue.split("/");
      if (parts.length !== 2) return false;

      const [providerIdentifier, modelId] = parts;
      const matchedNode = providerNodes.find(
        (node) => node.id === providerIdentifier || node.prefix === providerIdentifier
      );

      const providerCandidates = [providerIdentifier];
      if (matchedNode?.apiType) providerCandidates.push(matchedNode.apiType);
      if (matchedNode?.name) providerCandidates.push(String(matchedNode.name).toLowerCase());

      return providerCandidates.some((candidate) => !!pricingByProvider?.[candidate]?.[modelId]);
    },
    [pricingByProvider, providerNodes]
  );

  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const weightTotal = models.reduce((sum, modelEntry) => sum + (modelEntry.weight || 0), 0);
  const pricedModelCount = models.reduce(
    (count, modelEntry) => count + (hasPricingForModel(modelEntry.model) ? 1 : 0),
    0
  );
  const pricingCoveragePercent =
    models.length > 0 ? Math.round((pricedModelCount / models.length) * 100) : 0;
  const hasNoModels = models.length === 0;
  const hasRoundRobinSingleModel = strategy === "round-robin" && models.length === 1;
  const hasCostOptimizedWithoutPricing =
    strategy === "cost-optimized" && models.length > 0 && pricedModelCount === 0;
  const hasCostOptimizedPartialPricing =
    strategy === "cost-optimized" &&
    models.length > 0 &&
    pricedModelCount > 0 &&
    pricedModelCount < models.length;
  const hasInvalidWeightedTotal =
    strategy === "weighted" && models.length > 0 && weightTotal !== 100;
  const saveBlocked =
    !name.trim() ||
    !!nameError ||
    saving ||
    hasNoModels ||
    hasInvalidWeightedTotal ||
    hasCostOptimizedWithoutPricing;
  const readinessChecks = [
    {
      id: "name",
      ok: !!name.trim() && !nameError,
      label: getI18nOrFallback(t, "readinessCheckName", "Combo name is valid"),
    },
    {
      id: "models",
      ok: !hasNoModels,
      label: getI18nOrFallback(t, "readinessCheckModels", "At least one model is selected"),
    },
    {
      id: "weights",
      ok: strategy === "weighted" ? !hasInvalidWeightedTotal : true,
      label:
        strategy === "weighted"
          ? getI18nOrFallback(t, "readinessCheckWeights", "Weighted total is 100%")
          : getI18nOrFallback(t, "readinessCheckWeightsOptional", "Weight rule not required"),
    },
    {
      id: "pricing",
      ok: strategy === "cost-optimized" ? !hasCostOptimizedWithoutPricing : true,
      label:
        strategy === "cost-optimized"
          ? getI18nOrFallback(t, "readinessCheckPricing", "Pricing data is available")
          : getI18nOrFallback(t, "readinessCheckPricingOptional", "Pricing rule not required"),
    },
  ];
  const saveBlockers = [];
  if (!name.trim()) {
    saveBlockers.push(getI18nOrFallback(t, "saveBlockName", "Define a combo name."));
  } else if (nameError) {
    saveBlockers.push(nameError);
  }
  if (hasNoModels) {
    saveBlockers.push(getI18nOrFallback(t, "saveBlockModels", "Add at least one model."));
  }
  if (hasInvalidWeightedTotal) {
    saveBlockers.push(
      typeof t.has === "function" && t.has("saveBlockWeighted")
        ? t("saveBlockWeighted", { total: weightTotal })
        : `Set weights to 100% (current: ${weightTotal}%).`
    );
  }
  if (hasCostOptimizedWithoutPricing) {
    saveBlockers.push(
      getI18nOrFallback(
        t,
        "saveBlockPricing",
        "Add pricing for at least one model or choose a different strategy."
      )
    );
  }

  const fetchModalData = async () => {
    try {
      const [aliasesRes, nodesRes, pricingRes] = await Promise.all([
        fetch("/api/models/alias"),
        fetch("/api/provider-nodes"),
        fetch("/api/pricing"),
      ]);

      if (!aliasesRes.ok || !nodesRes.ok) {
        throw new Error(
          `Failed to fetch data: aliases=${aliasesRes.status}, nodes=${nodesRes.status}`
        );
      }
      const pricingData = pricingRes.ok ? await pricingRes.json() : {};

      const [aliasesData, nodesData] = await Promise.all([aliasesRes.json(), nodesRes.json()]);
      setPricingByProvider(
        pricingData && typeof pricingData === "object" && !Array.isArray(pricingData)
          ? pricingData
          : {}
      );
      setModelAliases(aliasesData.aliases || {});
      setProviderNodes(nodesData.nodes || []);
    } catch (error) {
      console.error("Error fetching modal data:", error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchModalData();
  }, [isOpen]);

  useEffect(() => {
    if (!strategyChangeMountedRef.current) {
      strategyChangeMountedRef.current = true;
      return;
    }

    setShowStrategyNudge(true);
    const timeoutId = setTimeout(() => setShowStrategyNudge(false), 2600);
    return () => clearTimeout(timeoutId);
  }, [strategy]);

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError(t("nameRequired"));
      return false;
    }
    if (!VALID_NAME_REGEX.test(value)) {
      setNameError(t("nameInvalid"));
      return false;
    }
    setNameError("");
    return true;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value) validateName(value);
    else setNameError("");
  };

  const handleAddModel = (model) => {
    if (!models.find((m) => m.model === model.value)) {
      setModels([...models, { model: model.value, weight: 0 }]);
    }
  };

  const handleRemoveModel = (index) => {
    setModels(models.filter((_, i) => i !== index));
  };

  const handleWeightChange = (index, weight) => {
    const newModels = [...models];
    newModels[index] = {
      ...newModels[index],
      weight: Math.max(0, Math.min(100, Number(weight) || 0)),
    };
    setModels(newModels);
  };

  const handleAutoBalance = () => {
    const count = models.length;
    if (count === 0) return;
    const weight = Math.floor(100 / count);
    const remainder = 100 - weight * count;
    setModels(
      models.map((m, i) => ({
        ...m,
        weight: weight + (i === 0 ? remainder : 0),
      }))
    );
  };

  const applyStrategyRecommendations = () => {
    const strategyDefaults = {
      priority: { maxRetries: 2, retryDelayMs: 1500, healthCheckEnabled: true },
      weighted: { maxRetries: 1, retryDelayMs: 1000, healthCheckEnabled: true },
      "round-robin": {
        maxRetries: 1,
        retryDelayMs: 750,
        healthCheckEnabled: true,
        concurrencyPerModel: 3,
        queueTimeoutMs: 30000,
      },
      random: { maxRetries: 1, retryDelayMs: 1000, healthCheckEnabled: true },
      "least-used": { maxRetries: 1, retryDelayMs: 1000, healthCheckEnabled: true },
      "cost-optimized": { maxRetries: 1, retryDelayMs: 500, healthCheckEnabled: true },
    };

    const defaults = strategyDefaults[strategy] || strategyDefaults.priority;
    setConfig((prev) => {
      const next = { ...prev };
      for (const [key, value] of Object.entries(defaults)) {
        if (next[key] === undefined || next[key] === null || next[key] === "") {
          next[key] = value;
        }
      }
      return next;
    });

    if (strategy === "weighted" && models.length > 1) {
      handleAutoBalance();
    }

    if (strategy === "round-robin") {
      setShowAdvanced(true);
    }

    notify.success(
      getI18nOrFallback(t, "recommendationsApplied", "Recommendations applied to this combo.")
    );
  };

  const FREE_STACK_PRESET_MODELS = [
    { model: "gemini-cli/gemini-3-flash-preview", weight: 0 },
    { model: "kr/claude-sonnet-4.5", weight: 0 },
    { model: "if/kimi-k2-thinking", weight: 0 },
    { model: "if/qwen3-coder-plus", weight: 0 },
    { model: "if/deepseek-v3.2", weight: 0 },
    { model: "nvidia/llama-3.3-70b-instruct", weight: 0 },
    { model: "groq/llama-3.3-70b-versatile", weight: 0 },
  ];

  const PAID_PREMIUM_PRESET_MODELS = [
    { model: "cu/claude-4.6-opus-high", weight: 0 },
    { model: "antigravity/claude-sonnet-4-6", weight: 0 },
    { model: "cu/claude-4.6-sonnet-high", weight: 0 },
    { model: "antigravity/gemini-3.1-pro-high", weight: 0 },
    { model: "antigravity/gemini-3-pro-high", weight: 0 },
  ];

  const applyTemplate = (template) => {
    setStrategy(template.strategy);
    setConfig((prev) => ({ ...prev, ...template.config }));
    if (!name.trim()) setName(template.suggestedName);
    if (template.id === "free-stack") {
      setModels(FREE_STACK_PRESET_MODELS);
    } else if (template.id === "paid-premium") {
      setModels(PAID_PREMIUM_PRESET_MODELS);
    }
  };

  // Format model display name with readable provider name
  const formatModelDisplay = useCallback(
    (modelValue) => {
      const parts = modelValue.split("/");
      if (parts.length !== 2) return modelValue;

      const [providerIdentifier, modelId] = parts;
      // Match by node ID or prefix
      const matchedNode = providerNodes.find(
        (node) => node.id === providerIdentifier || node.prefix === providerIdentifier
      );

      if (matchedNode) {
        return `${matchedNode.name}/${modelId}`;
      }

      return modelValue;
    },
    [providerNodes]
  );

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newModels = [...models];
    [newModels[index - 1], newModels[index]] = [newModels[index], newModels[index - 1]];
    setModels(newModels);
  };

  const handleMoveDown = (index) => {
    if (index === models.length - 1) return;
    const newModels = [...models];
    [newModels[index], newModels[index + 1]] = [newModels[index + 1], newModels[index]];
    setModels(newModels);
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
    // Make drag image slightly transparent
    if (e.target) {
      setTimeout(() => ((e.currentTarget as HTMLElement).style.opacity = "0.5"), 0);
    }
  };

  const handleDragEnd = (e) => {
    if (e.target) (e.currentTarget as HTMLElement).style.opacity = "1";
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const fromIndex = dragIndex;
    if (fromIndex === null || fromIndex === dropIndex) return;

    const newModels = [...models];
    const [moved] = newModels.splice(fromIndex, 1);
    newModels.splice(dropIndex, 0, moved);
    setModels(newModels);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleSave = async () => {
    if (!validateName(name)) return;
    if (hasNoModels || hasInvalidWeightedTotal || hasCostOptimizedWithoutPricing) return;
    setSaving(true);

    const saveData: any = {
      name: name.trim(),
      models: strategy === "weighted" ? models : models.map((m) => m.model),
      strategy,
    };

    // Include config only if any values are set
    const configToSave = { ...config };
    // Add round-robin specific fields to config
    if (strategy === "round-robin") {
      if (config.concurrencyPerModel !== undefined)
        configToSave.concurrencyPerModel = config.concurrencyPerModel;
      if (config.queueTimeoutMs !== undefined) configToSave.queueTimeoutMs = config.queueTimeoutMs;
    }
    if (Object.keys(configToSave).length > 0) {
      saveData.config = configToSave;
    }

    // Agent features (#399 / #401 / #454)
    if (agentSystemMessage.trim()) saveData.system_message = agentSystemMessage.trim();
    else delete saveData.system_message;
    if (agentToolFilter.trim()) saveData.tool_filter_regex = agentToolFilter.trim();
    else delete saveData.tool_filter_regex;
    if (agentContextCache) saveData.context_cache_protection = true;
    else delete saveData.context_cache_protection;

    await onSave(saveData);
    setSaving(false);
  };

  const isEdit = !!combo;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? t("editCombo") : t("createCombo")}
        size="full"
      >
        <div className="flex flex-col gap-3">
          {/* Name */}
          <div>
            <Input
              label={t("comboName")}
              value={name}
              onChange={handleNameChange}
              placeholder={t("comboNamePlaceholder")}
              error={nameError}
            />
            <p className="text-[10px] text-text-muted mt-0.5">{t("nameHint")}</p>
          </div>

          {!isEdit && (
            <div className="rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-3">
              <div className="mb-2">
                <p className="text-xs font-medium">
                  {getI18nOrFallback(t, "templatesTitle", COMBO_TEMPLATE_FALLBACK.title)}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5">
                  {getI18nOrFallback(
                    t,
                    "templatesDescription",
                    COMBO_TEMPLATE_FALLBACK.description
                  )}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {COMBO_TEMPLATES.map((template) => (
                  <button
                    type="button"
                    key={template.id}
                    onClick={() => applyTemplate(template)}
                    className={`text-left rounded-md border px-3 py-2 transition-all ${
                      template.isFeatured
                        ? "border-emerald-500/50 bg-emerald-500/5 hover:border-emerald-500/80 hover:bg-emerald-500/10 ring-1 ring-emerald-500/20"
                        : "border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-[16px] ${template.isFeatured ? "text-emerald-500" : "text-primary"}`}
                      >
                        {template.icon}
                      </span>
                      <span className="text-[12px] font-semibold text-text-main">
                        {getI18nOrFallback(t, template.titleKey, template.fallbackTitle)}
                      </span>
                      {template.isFeatured && (
                        <span className="ml-auto text-[9px] font-bold uppercase tracking-wide bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                          FREE
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-text-muted mt-1.5 leading-[1.5]">
                      {getI18nOrFallback(t, template.descKey, template.fallbackDesc)}
                    </p>
                    <p
                      className={`text-[10px] mt-1.5 font-medium ${template.isFeatured ? "text-emerald-500" : "text-primary"}`}
                    >
                      {getI18nOrFallback(t, "templateApply", COMBO_TEMPLATE_FALLBACK.apply)} →
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Strategy Toggle */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="text-sm font-medium">{t("routingStrategy")}</label>
              <Tooltip content={getStrategyDescription(t, strategy)}>
                <span className="material-symbols-outlined text-[13px] text-text-muted cursor-help">
                  help
                </span>
              </Tooltip>
            </div>
            <div className="grid grid-cols-3 gap-1 p-0.5 bg-black/5 dark:bg-white/5 rounded-lg">
              {STRATEGY_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStrategy(s.value)}
                  data-testid={`strategy-option-${s.value}`}
                  title={t(s.descKey)}
                  aria-label={`${getStrategyLabel(t, s.value)}. ${t(s.descKey)}`}
                  className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
                    strategy === s.value
                      ? "bg-white dark:bg-bg-main shadow-sm text-primary"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px] align-middle mr-0.5">
                    {s.icon}
                  </span>
                  {getStrategyLabel(t, s.value)}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-text-muted mt-0.5">
              {getStrategyDescription(t, strategy)}
            </p>
            <div className="mt-2">
              <StrategyGuidanceCard strategy={strategy} />
            </div>
            <div className="mt-2">
              <StrategyRecommendationsPanel
                strategy={strategy}
                onApply={applyStrategyRecommendations}
                showNudge={showStrategyNudge}
              />
            </div>
          </div>

          {/* Models */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium">{t("models")}</label>
              {strategy === "weighted" && models.length > 1 && (
                <button
                  onClick={handleAutoBalance}
                  className="text-[10px] text-primary hover:text-primary/80 transition-colors"
                >
                  {t("autoBalance")}
                </button>
              )}
            </div>

            {models.length === 0 ? (
              <div className="text-center py-4 border border-dashed border-black/10 dark:border-white/10 rounded-lg bg-black/[0.01] dark:bg-white/[0.01]">
                <span className="material-symbols-outlined text-text-muted text-xl mb-1">
                  layers
                </span>
                <p className="text-xs text-text-muted">{t("noModelsYet")}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1 max-h-[240px] overflow-y-auto">
                {models.map((entry, index) => (
                  <div
                    key={`${entry.model}-${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`group/item flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all cursor-grab active:cursor-grabbing ${
                      dragOverIndex === index && dragIndex !== index
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border border-transparent"
                    } ${dragIndex === index ? "opacity-50" : ""}`}
                  >
                    {/* Drag handle */}
                    <span className="material-symbols-outlined text-[14px] text-text-muted/40 cursor-grab shrink-0">
                      drag_indicator
                    </span>

                    {/* Index badge */}
                    <span className="text-[10px] font-medium text-text-muted w-3 text-center shrink-0">
                      {index + 1}
                    </span>

                    {/* Model display */}
                    <div className="flex-1 min-w-0 px-1 text-xs text-text-main truncate">
                      {formatModelDisplay(entry.model)}
                    </div>

                    {strategy === "cost-optimized" && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase font-semibold ${
                          hasPricingForModel(entry.model)
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                        }`}
                        title={
                          hasPricingForModel(entry.model)
                            ? getI18nOrFallback(t, "pricingAvailable", "Pricing available")
                            : getI18nOrFallback(t, "pricingMissing", "No pricing")
                        }
                      >
                        {hasPricingForModel(entry.model)
                          ? getI18nOrFallback(t, "pricingAvailableShort", "priced")
                          : getI18nOrFallback(t, "pricingMissingShort", "no-price")}
                      </span>
                    )}

                    {/* Weight input (weighted mode only) */}
                    {strategy === "weighted" && (
                      <div className="flex items-center gap-0.5 shrink-0">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={entry.weight}
                          onChange={(e) => handleWeightChange(index, e.target.value)}
                          className="w-10 text-[11px] text-center py-0.5 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                        />
                        <span className="text-[10px] text-text-muted">%</span>
                      </div>
                    )}

                    {/* Priority arrows (priority mode) */}
                    {strategy === "priority" && (
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className={`p-0.5 rounded ${index === 0 ? "text-text-muted/20 cursor-not-allowed" : "text-text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"}`}
                          title={t("moveUp")}
                        >
                          <span className="material-symbols-outlined text-[12px]">
                            arrow_upward
                          </span>
                        </button>
                        <button
                          onClick={() => handleMoveDown(index)}
                          disabled={index === models.length - 1}
                          className={`p-0.5 rounded ${index === models.length - 1 ? "text-text-muted/20 cursor-not-allowed" : "text-text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"}`}
                          title={t("moveDown")}
                        >
                          <span className="material-symbols-outlined text-[12px]">
                            arrow_downward
                          </span>
                        </button>
                      </div>
                    )}

                    {/* Remove */}
                    <button
                      onClick={() => handleRemoveModel(index)}
                      className="p-0.5 hover:bg-red-500/10 rounded text-text-muted hover:text-red-500 transition-all"
                      title={t("removeModel")}
                    >
                      <span className="material-symbols-outlined text-[12px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Weight total indicator */}
            {strategy === "weighted" && models.length > 0 && <WeightTotalBar models={models} />}

            {strategy === "cost-optimized" && models.length > 0 && (
              <div className="mt-2 rounded-md border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-2 py-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-text-muted">
                    {getI18nOrFallback(t, "pricingCoverage", "Pricing coverage")}
                  </span>
                  <span className="font-medium text-text-main">
                    {pricedModelCount}/{models.length} ({pricingCoveragePercent}%)
                  </span>
                </div>
                <div className="h-1.5 mt-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      pricingCoveragePercent === 100
                        ? "bg-emerald-500"
                        : pricingCoveragePercent > 0
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${pricingCoveragePercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-text-muted mt-1">
                  {getI18nOrFallback(
                    t,
                    "pricingCoverageHint",
                    "Cost-optimized works best when all combo models have pricing."
                  )}
                </p>
              </div>
            )}

            {hasNoModels && (
              <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-[10px] text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">warning</span>
                <span>{t("noModelsYet")}</span>
              </div>
            )}

            {hasInvalidWeightedTotal && (
              <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-[10px] text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">warning</span>
                <span>
                  {t("weighted")} {weightTotal}% {"\u2260"} 100%. {t("autoBalance")}
                </span>
              </div>
            )}

            {hasRoundRobinSingleModel && (
              <div className="mt-2 rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1.5 text-[10px] text-blue-700 dark:text-blue-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">info</span>
                <span>
                  {getI18nOrFallback(
                    t,
                    "warningRoundRobinSingleModel",
                    "Round-robin is most useful with at least 2 models."
                  )}
                </span>
              </div>
            )}

            {hasCostOptimizedPartialPricing && (
              <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-[10px] text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">warning</span>
                <span>
                  {typeof t.has === "function" && t.has("warningCostOptimizedPartialPricing")
                    ? t("warningCostOptimizedPartialPricing", {
                        priced: pricedModelCount,
                        total: models.length,
                      })
                    : `Only ${pricedModelCount} of ${models.length} models have pricing. Routing may be partially cost-aware.`}
                </span>
              </div>
            )}

            {hasCostOptimizedWithoutPricing && (
              <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-[10px] text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">warning</span>
                <span>
                  {getI18nOrFallback(
                    t,
                    "warningCostOptimizedNoPricing",
                    "No pricing data found for this combo. Cost-optimized may route unexpectedly."
                  )}
                </span>
              </div>
            )}

            <div className="mt-2">
              <ComboReadinessPanel checks={readinessChecks} blockers={saveBlockers} />
            </div>

            {/* Add Model button */}
            <button
              onClick={() => setShowModelSelect(true)}
              className="w-full mt-2 py-2 border border-dashed border-black/10 dark:border-white/10 rounded-lg text-xs text-text-muted hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              {t("addModel")}
            </button>
          </div>

          {/* Advanced Config Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-text-main transition-colors self-start"
          >
            <span className="material-symbols-outlined text-[14px]">
              {showAdvanced ? "expand_less" : "expand_more"}
            </span>
            {t("advancedSettings")}
          </button>

          {showAdvanced && (
            <div className="flex flex-col gap-2 p-3 bg-black/[0.02] dark:bg-white/[0.02] rounded-lg border border-black/5 dark:border-white/5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <FieldLabelWithHelp
                    label={t("maxRetries")}
                    help={getI18nOrFallback(
                      t,
                      "advancedHelp.maxRetries",
                      ADVANCED_FIELD_HELP_FALLBACK.maxRetries
                    )}
                  />
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={config.maxRetries ?? ""}
                    placeholder="1"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        maxRetries: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <FieldLabelWithHelp
                    label={t("retryDelay")}
                    help={getI18nOrFallback(
                      t,
                      "advancedHelp.retryDelay",
                      ADVANCED_FIELD_HELP_FALLBACK.retryDelay
                    )}
                  />
                  <input
                    type="number"
                    min="0"
                    max="60000"
                    step="500"
                    value={config.retryDelayMs ?? ""}
                    placeholder="2000"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        retryDelayMs: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <FieldLabelWithHelp
                    label={t("timeout")}
                    help={getI18nOrFallback(
                      t,
                      "advancedHelp.timeout",
                      ADVANCED_FIELD_HELP_FALLBACK.timeout
                    )}
                  />
                  <input
                    type="number"
                    min="1000"
                    max="600000"
                    step="1000"
                    value={config.timeoutMs ?? ""}
                    placeholder="120000"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        timeoutMs: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <FieldLabelWithHelp
                    label={t("healthcheck")}
                    help={getI18nOrFallback(
                      t,
                      "advancedHelp.healthcheck",
                      ADVANCED_FIELD_HELP_FALLBACK.healthcheck
                    )}
                  />
                  <input
                    type="checkbox"
                    checked={config.healthCheckEnabled !== false}
                    onChange={(e) => setConfig({ ...config, healthCheckEnabled: e.target.checked })}
                    className="accent-primary"
                  />
                </div>
              </div>
              {strategy === "round-robin" && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                  <div>
                    <FieldLabelWithHelp
                      label={t("concurrencyPerModel")}
                      help={getI18nOrFallback(
                        t,
                        "advancedHelp.concurrencyPerModel",
                        ADVANCED_FIELD_HELP_FALLBACK.concurrencyPerModel
                      )}
                    />
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={config.concurrencyPerModel ?? ""}
                      placeholder="3"
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          concurrencyPerModel: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <FieldLabelWithHelp
                      label={t("queueTimeout")}
                      help={getI18nOrFallback(
                        t,
                        "advancedHelp.queueTimeout",
                        ADVANCED_FIELD_HELP_FALLBACK.queueTimeout
                      )}
                    />
                    <input
                      type="number"
                      min="1000"
                      max="120000"
                      step="1000"
                      value={config.queueTimeoutMs ?? ""}
                      placeholder="30000"
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          queueTimeoutMs: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}
              <p className="text-[10px] text-text-muted">{t("advancedHint")}</p>
            </div>
          )}

          {/* Agent Features (#399 / #401 / #454) */}
          <div className="flex flex-col gap-2 p-3 bg-black/[0.02] dark:bg-white/[0.02] rounded-lg border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-[14px] text-primary">smart_toy</span>
              <p className="text-xs font-medium">Agent Features</p>
              <span className="text-[10px] text-text-muted">
                — optional, for agent/tool workflows
              </span>
            </div>

            {/* System Message Override */}
            <div>
              <label className="text-[11px] font-medium text-text-muted block mb-0.5">
                System Message Override
              </label>
              <textarea
                rows={2}
                value={agentSystemMessage}
                onChange={(e) => setAgentSystemMessage(e.target.value)}
                placeholder="Override the system prompt for all requests routed through this combo…"
                className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none resize-none"
              />
              <p className="text-[10px] text-text-muted mt-0.5">
                Replaces any system message sent by the client. Leave empty to pass through client
                system messages.
              </p>
            </div>

            {/* Tool Filter Regex */}
            <div>
              <label className="text-[11px] font-medium text-text-muted block mb-0.5">
                Tool Filter Regex
              </label>
              <input
                type="text"
                value={agentToolFilter}
                onChange={(e) => setAgentToolFilter(e.target.value)}
                placeholder="e.g. ^(bash|computer)$"
                className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none font-mono"
              />
              <p className="text-[10px] text-text-muted mt-0.5">
                Only tools whose name matches this regex are forwarded to the provider. Leave empty
                to forward all tools.
              </p>
            </div>

            {/* Context Cache Protection */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <label className="text-[11px] font-medium text-text-muted block">
                  Context Cache Protection
                </label>
                <p className="text-[10px] text-text-muted">
                  Pins the provider/model across turns to preserve cache sessions. Internal tags are
                  stripped before forwarding to the provider.
                </p>
              </div>
              <input
                type="checkbox"
                checked={agentContextCache}
                onChange={(e) => setAgentContextCache(e.target.checked)}
                className="accent-primary shrink-0"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button onClick={onClose} variant="ghost" fullWidth size="sm">
              {tc("cancel")}
            </Button>
            <Button onClick={handleSave} fullWidth size="sm" disabled={saveBlocked}>
              {saving ? t("saving") : isEdit ? tc("save") : t("createCombo")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Model Select Modal */}
      <ModelSelectModal
        isOpen={showModelSelect}
        onClose={() => setShowModelSelect(false)}
        onSelect={handleAddModel}
        activeProviders={activeProviders}
        modelAliases={modelAliases}
        title={t("addModelToCombo")}
        selectedModel={null}
        addedModelValues={models.map((m) => m.model)}
      />
    </>
  );
}

// ─────────────────────────────────────────────
// Weight Total Bar
// ─────────────────────────────────────────────
function WeightTotalBar({ models }) {
  const total = models.reduce((sum, m) => sum + (m.weight || 0), 0);
  const isValid = total === 100;
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-orange-500",
    "bg-indigo-500",
  ];

  return (
    <div className="mt-1.5">
      {/* Visual bar */}
      <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden flex">
        {models.map((m, i) => {
          if (!m.weight) return null;
          return (
            <div
              key={i}
              className={`${colors[i % colors.length]} transition-all duration-300`}
              style={{ width: `${Math.min(m.weight, 100)}%` }}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-0.5">
        <div className="flex gap-1">
          {models.map(
            (m, i) =>
              m.weight > 0 && (
                <span key={i} className="flex items-center gap-0.5 text-[9px] text-text-muted">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${colors[i % colors.length]}`}
                  />
                  {m.weight}%
                </span>
              )
          )}
        </div>
        <span
          className={`text-[10px] font-medium ${
            isValid ? "text-emerald-500" : total > 100 ? "text-red-500" : "text-amber-500"
          }`}
        >
          {total}%{!isValid && total > 0 && " ≠ 100%"}
        </span>
      </div>
    </div>
  );
}
