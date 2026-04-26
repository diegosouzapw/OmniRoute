"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { CardSkeleton } from "@/shared/components/Loading";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import Toggle from "@/shared/components/Toggle";
import Tooltip from "@/shared/components/Tooltip";
import EmailPrivacyToggle from "@/shared/components/EmailPrivacyToggle";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { useNotificationStore } from "@/store/notificationStore";
import { ROUTING_STRATEGIES } from "@/shared/constants/routingStrategies";
import {
  COMBO_BUILDER_AUTO_CONNECTION,
  COMBO_BUILDER_STAGES,
  buildManualComboModelStep,
  buildPrecisionComboModelStep,
  canAccessComboBuilderStage,
  findNextSuggestedConnectionId,
  getComboBuilderStageChecks,
  getComboBuilderStages,
  getNextComboBuilderStage,
  getPreviousComboBuilderStage,
  hasExactModelStepDuplicate,
  isIntelligentBuilderStrategy,
  parseQualifiedModel,
  resolveComboBuilderProviderId,
} from "@/lib/combos/builderDraft";
import { normalizeComboConfigMode } from "@/shared/constants/comboConfigMode";
import BuilderIntelligentStep from "./BuilderIntelligentStep";
import IntelligentComboPanel from "./IntelligentComboPanel";
import {
  filterCombosByStrategyCategory,
  getStrategyCategory,
  isIntelligentStrategy,
  normalizeIntelligentRoutingFilter,
  normalizeIntelligentRoutingConfig,
} from "@/lib/combos/intelligentRouting";
import { useTranslations } from "next-intl";

const ModelSelectModal = dynamic(() => import("@/shared/components/ModelSelectModal"), {
  ssr: false,
});
const ProxyConfigModal = dynamic(() => import("@/shared/components/ProxyConfigModal"), {
  ssr: false,
});

// Validate combo name: letters, numbers, -, _, /, .
const VALID_NAME_REGEX = /^[a-zA-Z0-9_/.-]+$/;

const STRATEGY_OPTIONS = ROUTING_STRATEGIES.map((strategy) => ({
  value: strategy.value,
  labelKey: strategy.labelKey,
  descKey: strategy.combosDescKey,
  icon: strategy.icon,
}));

const STRATEGY_LABEL_FALLBACK = {
  "context-relay": "Context Relay",
};

const STRATEGY_DESC_FALLBACK = {
  "context-relay":
    "Priority-style routing with automatic context handoffs when account rotation happens.",
};

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
  "context-relay": {
    when: "Use when long sessions must survive account rotation without losing the working context.",
    avoid:
      "Avoid when account switching is rare or when you do not want extra summarization requests.",
    example: "Example: Codex sessions that rotate across multiple accounts near quota exhaustion.",
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
  auto: {
    when: "Use when you want multi-factor scoring based on cost, latency, and quality.",
    avoid: "Avoid when you need strict priority ordering or historical persistence.",
    example: "Example: Balance requests between models with different strengths.",
  },
  lkgp: {
    when: "Use when you want routing based on historical success rates and performance.",
    avoid: "Avoid when historical data is limited or unreliable.",
    example: "Example: Route to models with proven track records for specific tasks.",
  },
  "context-optimized": {
    when: "Use when you need to optimize for context window usage across models.",
    avoid: "Avoid when models have similar context lengths or simple tasks.",
    example: "Example: Distribute long conversations across models with large context windows.",
  },
};

const ADVANCED_FIELD_HELP_FALLBACK = {
  maxRetries: "How many retries are attempted before failing the request.",
  retryDelay: "Initial delay between retries. Higher values reduce burst pressure.",
  concurrencyPerModel:
    "Round-robin combo/model limit: max simultaneous requests sent to each model target. This is separate from any provider account-only cap.",
  queueTimeout:
    "How long a request can wait for a round-robin model slot before timing out. This queue is separate from any account-only concurrency cap.",
};

const LEGACY_COMBO_RESILIENCE_KEYS = new Set([
  "timeoutMs",
  "healthCheckEnabled",
  "healthCheckTimeoutMs",
]);

function sanitizeComboRuntimeConfig(config) {
  if (!config || typeof config !== "object") return {};
  return Object.fromEntries(
    Object.entries(config).filter(
      ([key, value]) =>
        value !== undefined && value !== null && !LEGACY_COMBO_RESILIENCE_KEYS.has(key)
    )
  );
}

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
  "context-relay": {
    title: "Session continuity first",
    description:
      "Best when account rotation is expected and the next account must inherit a condensed task summary.",
    tips: [
      "Use with providers that rotate accounts for the same model family.",
      "Keep the handoff threshold below the hard quota cutoff to give the summary time to generate.",
      "Set a dedicated summary model only when the primary model is too expensive or unstable.",
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
  auto: {
    title: "Multi-factor optimization",
    description: "Routes based on real-time scoring of cost, latency, quality, and health.",
    tips: [
      "Let the engine balance across multiple factors automatically.",
      "Monitor which factors drive routing decisions in the logs.",
      "Use for complex workloads where no single factor dominates.",
    ],
  },
  lkgp: {
    title: "History-based routing",
    description: "Routes based on historical success rates and persistent performance data.",
    tips: [
      "Let success history accumulate before relying on this strategy.",
      "Models with better track records get preference over time.",
      "Ideal for stable workloads with consistent model availability.",
    ],
  },
  "context-optimized": {
    title: "Context-aware distribution",
    description: "Routes to optimize context window usage and conversation continuity.",
    tips: [
      "Best for long conversations that span multiple requests.",
      "Selects models with appropriate context capacity automatically.",
      "Use when context limits are a bottleneck for your workload.",
    ],
  },
};

const COMBO_USAGE_GUIDE_STORAGE_KEY = "omniroute:combos:hide-usage-guide";
const COMBO_FORM_STAGE_META = [
  {
    id: "basics",
    fallbackLabel: "Basics",
    fallbackDescription: "Name and starting template.",
    icon: "looks_one",
  },
  {
    id: "steps",
    fallbackLabel: "Steps",
    fallbackDescription: "Provider, model and account selection.",
    icon: "looks_two",
  },
  {
    id: "strategy",
    fallbackLabel: "Strategy",
    fallbackDescription: "Routing behavior and advanced settings.",
    icon: "looks_3",
  },
  {
    id: "intelligent",
    fallbackLabel: "Intelligent",
    fallbackDescription: "Auto-routing candidate pool, presets and scoring.",
    icon: "auto_awesome",
  },
  {
    id: "review",
    fallbackLabel: "Review",
    fallbackDescription: "Final verification before saving.",
    icon: "fact_check",
  },
];

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
    "Round-robin across all free providers: Kiro, Qoder, Qwen, Gemini CLI. Zero cost, never stops.",
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
    },
  },
];

function getStrategyMeta(strategy) {
  return STRATEGY_OPTIONS.find((s) => s.value === strategy) || STRATEGY_OPTIONS[0];
}

function getStrategyLabel(t, strategy) {
  const key = getStrategyMeta(strategy).labelKey;
  return getI18nOrFallback(t, key, STRATEGY_LABEL_FALLBACK[strategy] || strategy);
}

function getStrategyDescription(t, strategy) {
  const key = getStrategyMeta(strategy).descKey;
  return getI18nOrFallback(
    t,
    key,
    STRATEGY_DESC_FALLBACK[strategy] || STRATEGY_DESC_FALLBACK.priority || strategy
  );
}

function getStrategyBadgeClass(strategy) {
  if (strategy === "weighted") return "bg-amber-500/15 text-amber-600 dark:text-amber-400";
  if (strategy === "round-robin") return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";
  if (strategy === "context-relay")
    return "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400";
  if (strategy === "random") return "bg-purple-500/15 text-purple-600 dark:text-purple-400";
  if (strategy === "least-used") return "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400";
  if (strategy === "cost-optimized") return "bg-teal-500/15 text-teal-600 dark:text-teal-400";
  if (strategy === "fill-first") return "bg-orange-500/15 text-orange-600 dark:text-orange-400";
  if (strategy === "p2c") return "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400";
  return "bg-blue-500/15 text-blue-600 dark:text-blue-400";
}

function getI18nOrFallback(t, key, fallback) {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key);
  } catch {
    // Some translations require ICU variables; fallback keeps optional helper text safe.
  }
  return fallback;
}

function moveArrayItem(items, fromIndex, toIndex) {
  const nextItems = [...items];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, movedItem);
  return nextItems;
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
  if (entry?.kind === "combo-ref") {
    return {
      ...entry,
      model: entry.comboName,
      weight: entry.weight || 0,
    };
  }
  return {
    ...entry,
    model: entry.model,
    weight: entry.weight || 0,
  };
}

function getModelString(entry) {
  if (typeof entry === "string") return entry;
  if (entry?.kind === "combo-ref") return entry.comboName;
  return entry.model;
}

function findProviderNodeByIdentifier(providerNodes, providerIdentifier) {
  return (providerNodes || []).find(
    (node) => node.id === providerIdentifier || node.prefix === providerIdentifier
  );
}

function findBuilderProviderByIdentifier(builderProviders, providerIdentifier) {
  return (builderProviders || []).find(
    (provider) =>
      provider.providerId === providerIdentifier ||
      provider.alias === providerIdentifier ||
      provider.prefix === providerIdentifier
  );
}

function formatComboEntryDisplay(
  entry,
  {
    providerNodes = [],
    builderProviders = [],
    includeConnection = false,
    showFullEmails = true,
  }: {
    providerNodes?: any[];
    builderProviders?: any[];
    includeConnection?: boolean;
    showFullEmails?: boolean;
  } = {}
) {
  const normalizedEntry = normalizeModelEntry(entry);
  if (normalizedEntry.kind === "combo-ref") {
    return `Combo → ${normalizedEntry.comboName}`;
  }

  const parsed = parseQualifiedModel(normalizedEntry.model);
  if (!parsed) return normalizedEntry.model;

  const providerIdentifier = normalizedEntry.providerId || parsed.providerId;
  const builderProvider = findBuilderProviderByIdentifier(builderProviders, providerIdentifier);
  const providerNode = findProviderNodeByIdentifier(providerNodes, providerIdentifier);
  const providerLabel = builderProvider?.displayName || providerNode?.name || providerIdentifier;
  const modelLabel =
    builderProvider?.models?.find((model) => model.id === parsed.modelId)?.name || parsed.modelId;

  if (!includeConnection) {
    return `${providerLabel}/${modelLabel}`;
  }

  const connectionId = normalizedEntry.connectionId || null;
  const rawConnectionLabel =
    (connectionId &&
      builderProvider?.connections?.find((connection) => connection.id === connectionId)?.label) ||
    normalizedEntry.label ||
    null;
  const connectionLabel = rawConnectionLabel
    ? pickDisplayValue([rawConnectionLabel], showFullEmails, rawConnectionLabel)
    : null;

  if (connectionId) {
    return `${providerLabel}/${modelLabel} · ${connectionLabel || `acct ${connectionId.slice(0, 8)}`}`;
  }

  if (normalizedEntry.providerId || builderProvider) {
    return `${providerLabel}/${modelLabel} · dynamic account`;
  }

  return `${providerLabel}/${modelLabel}`;
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function CombosPage() {
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const [comboDragIndex, setComboDragIndex] = useState(null);
  const [comboDragOverIndex, setComboDragOverIndex] = useState(null);
  const [savingComboOrder, setSavingComboOrder] = useState(false);
  const [comboConfigMode, setComboConfigMode] = useState("guided");
  const [selectedIntelligentComboId, setSelectedIntelligentComboId] = useState<string | null>(null);
  const comboDragIndexRef = useRef<number | null>(null);
  const activeFilter = normalizeIntelligentRoutingFilter(searchParams.get("filter"));
  const intelligentCombos = useMemo(
    () => combos.filter((combo) => isIntelligentStrategy(combo?.strategy)),
    [combos]
  );
  const filteredCombos = useMemo(
    () => filterCombosByStrategyCategory(combos, activeFilter),
    [combos, activeFilter]
  );
  const selectedIntelligentCombo = useMemo(() => {
    if (intelligentCombos.length === 0) return null;

    const explicitlySelectedCombo =
      intelligentCombos.find((combo) => combo.id === selectedIntelligentComboId) || null;

    if (explicitlySelectedCombo) {
      return explicitlySelectedCombo;
    }

    return activeFilter === "intelligent" ? intelligentCombos[0] : null;
  }, [activeFilter, intelligentCombos, selectedIntelligentComboId]);

  useEffect(() => {
    if (intelligentCombos.length === 0) {
      setSelectedIntelligentComboId(null);
      return;
    }

    if (
      selectedIntelligentComboId &&
      !intelligentCombos.some((combo) => combo.id === selectedIntelligentComboId)
    ) {
      setSelectedIntelligentComboId(null);
    }
  }, [intelligentCombos, selectedIntelligentComboId]);

  useEffect(() => {
    fetchData();
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((settings) => setComboConfigMode(normalizeComboConfigMode(settings?.comboConfigMode)))
      .catch(() => setComboConfigMode("guided"));
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
      config: sanitizeComboRuntimeConfig(combo.config),
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

  const handleFilterChange = (nextFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextFilter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", nextFilter);
    }

    const queryString = params.toString();
    router.replace(`/dashboard/combos${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  const handleIntelligentComboUpdated = (updatedCombo) => {
    setCombos((previousCombos) =>
      previousCombos.map((combo) => (combo.id === updatedCombo?.id ? updatedCombo : combo))
    );
  };

  const resetComboDragState = () => {
    comboDragIndexRef.current = null;
    setComboDragIndex(null);
    setComboDragOverIndex(null);
  };

  const handleComboDragStart = (e, index) => {
    if (savingComboOrder || activeFilter !== "all" || combos.length < 2) {
      e.preventDefault();
      return;
    }
    comboDragIndexRef.current = index;
    setComboDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", combos[index]?.id || `${index}`);
    if (e.currentTarget instanceof HTMLElement) {
      setTimeout(() => {
        e.currentTarget.style.opacity = "0.5";
      }, 0);
    }
  };

  const handleComboDragEnd = (e) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }
    resetComboDragState();
  };

  const handleComboDragOver = (e, index) => {
    e.preventDefault();
    const activeDragIndex = comboDragIndexRef.current ?? comboDragIndex;
    if (activeDragIndex === null || activeDragIndex === index) return;
    e.dataTransfer.dropEffect = "move";
    setComboDragOverIndex(index);
  };

  const handleComboDrop = async (e, dropIndex) => {
    e.preventDefault();
    const fromIndex = comboDragIndexRef.current ?? comboDragIndex;
    resetComboDragState();

    if (fromIndex === null || fromIndex === dropIndex) return;

    const previousCombos = combos;
    const nextCombos = moveArrayItem(combos, fromIndex, dropIndex);
    setCombos(nextCombos);
    setSavingComboOrder(true);

    try {
      const res = await fetch("/api/combos/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comboIds: nextCombos.map((combo) => combo.id) }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || data.error || "Failed to reorder combos");
      }

      if (Array.isArray(data.combos)) {
        setCombos(data.combos);
      }
    } catch {
      setCombos(previousCombos);
      notify.error(getI18nOrFallback(t, "failedReorder", "Failed to save combo order"));
    } finally {
      setSavingComboOrder(false);
    }
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
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-text-muted mt-1">{t("description")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] px-2.5 py-1.5">
            <span className="hidden lg:inline text-xs text-text-muted">
              {getI18nOrFallback(
                t,
                "emailVisibilityHint",
                "Account emails here follow the global privacy toggle."
              )}
            </span>
            <Tooltip
              position="bottom"
              content={getI18nOrFallback(
                t,
                "emailVisibilityTooltip",
                "Use the eye icon to reveal or hide account emails globally across combos, providers and quota screens."
              )}
            >
              <span className="inline-flex">
                <EmailPrivacyToggle size="md" />
              </span>
            </Tooltip>
            <span className="text-[11px] text-text-muted">
              {emailsVisible
                ? getI18nOrFallback(t, "emailVisibilityStateOn", "Emails visible globally")
                : getI18nOrFallback(t, "emailVisibilityStateOff", "Emails masked globally")}
            </span>
          </div>
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
          onCreateCombo={() => setShowCreateModal(true)}
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
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-1">
        {[
          {
            id: "all",
            icon: "layers",
            label: getI18nOrFallback(t, "filterAll", "All"),
            count: combos.length,
          },
          {
            id: "intelligent",
            icon: "auto_awesome",
            label: getI18nOrFallback(t, "filterIntelligent", "Intelligent"),
            count: combos.filter((combo) => getStrategyCategory(combo?.strategy) === "intelligent")
              .length,
          },
          {
            id: "deterministic",
            icon: "sort",
            label: getI18nOrFallback(t, "filterDeterministic", "Deterministic"),
            count: combos.filter(
              (combo) => getStrategyCategory(combo?.strategy) === "deterministic"
            ).length,
          },
        ].map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleFilterChange(tab.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                isActive
                  ? "border border-primary/20 bg-primary/10 text-primary"
                  : "border border-transparent text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
              <span className="rounded-full bg-black/5 dark:bg-white/5 px-1.5 py-0.5 text-[11px] text-text-muted">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {activeFilter === "intelligent" && selectedIntelligentCombo && (
        <IntelligentComboPanel
          t={t}
          combo={selectedIntelligentCombo}
          allCombos={intelligentCombos}
          activeProviders={activeProviders}
          onComboUpdated={handleIntelligentComboUpdated}
        />
      )}

      {/* Combos List */}
      {combos.length === 0 ? (
        <EmptyState
          icon="🧩"
          title={t("noCombosYet")}
          description={t("description")}
          actionLabel={t("createCombo")}
          onAction={() => setShowCreateModal(true)}
        />
      ) : filteredCombos.length === 0 ? (
        <Card padding="sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">filter_alt</span>
              <p className="text-sm font-semibold text-text-main">
                {getI18nOrFallback(t, "filterEmptyTitle", "No combos match this strategy filter.")}
              </p>
            </div>
            <p className="text-sm text-text-muted">
              {activeFilter === "intelligent"
                ? getI18nOrFallback(
                    t,
                    "filterEmptyIntelligentDescription",
                    "Create an auto or LKGP combo to populate the intelligent routing dashboard."
                  )
                : getI18nOrFallback(
                    t,
                    "filterEmptyDeterministicDescription",
                    "Only auto and LKGP combos exist right now. Switch back to All or create a deterministic combo."
                  )}
            </p>
            <div>
              <Button size="sm" icon="add" onClick={() => setShowCreateModal(true)}>
                {t("createCombo")}
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredCombos.map((combo, index) => (
            <div
              key={combo.id}
              data-testid={`combo-card-${combo.id}`}
              onClick={() => {
                if (isIntelligentStrategy(combo?.strategy)) {
                  setSelectedIntelligentComboId(combo.id);
                }
              }}
              onDragOver={(e) => handleComboDragOver(e, index)}
              onDrop={(e) => handleComboDrop(e, index)}
            >
              <ComboCard
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
                dragDisabled={savingComboOrder || activeFilter !== "all" || combos.length < 2}
                isDragged={comboDragIndex === index}
                isDropTarget={comboDragOverIndex === index && comboDragIndex !== index}
                isSelected={selectedIntelligentCombo?.id === combo.id}
                onDragStart={(e) => handleComboDragStart(e, index)}
                onDragEnd={handleComboDragEnd}
              />
            </div>
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
        comboConfigMode={comboConfigMode}
      />

      {/* Edit Modal */}
      <ComboFormModal
        key={editingCombo?.id || "new"}
        isOpen={!!editingCombo}
        combo={editingCombo}
        onClose={() => setEditingCombo(null)}
        onSave={(data) => handleUpdate(editingCombo.id, data)}
        activeProviders={activeProviders}
        comboConfigMode={comboConfigMode}
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

const COMBO_WIZARD_STEPS = [
  {
    step: 1,
    icon: "badge",
    titleKey: "wizardStep1Title",
    descKey: "wizardStep1Desc",
  },
  {
    step: 2,
    icon: "hub",
    titleKey: "wizardStep2Title",
    descKey: "wizardStep2Desc",
  },
  {
    step: 3,
    icon: "route",
    titleKey: "wizardStep3Title",
    descKey: "wizardStep3Desc",
  },
  {
    step: 4,
    icon: "check_circle",
    titleKey: "wizardStep4Title",
    descKey: "wizardStep4Desc",
  },
];

function ComboUsageGuide({ onHide, onHideForever, onCreateCombo }) {
  const t = useTranslations("combos");

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
            <h2 className="text-sm font-semibold">
              {getI18nOrFallback(t, "wizardGuideTitle", "Getting Started with Combos")}
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              {getI18nOrFallback(
                t,
                "wizardGuideDesc",
                "Create model combos to route AI traffic intelligently"
              )}
            </p>
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
        {COMBO_WIZARD_STEPS.map((step, index) => {
          return (
            <div
              key={step.step}
              className="relative rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-2.5"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {step.step}
                </span>
                <span className="material-symbols-outlined text-[14px] text-primary">
                  {step.icon}
                </span>
              </div>
              <p className="text-xs font-medium">
                {getI18nOrFallback(t, step.titleKey, step.titleKey)}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-text-muted">
                {getI18nOrFallback(t, step.descKey, step.descKey)}
              </p>
              {index < COMBO_WIZARD_STEPS.length - 1 && (
                <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-text-muted md:block">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" icon="add" onClick={onCreateCombo}>
          {getI18nOrFallback(t, "createFirstCombo", "Create Your First Combo")}
        </Button>
        <span className="text-[10px] text-text-muted">
          {getI18nOrFallback(t, "wizardGuideHint", "or click + Create Combo above")}
        </span>
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

function FieldLabelWithHelp({ label, help, showHelp = true }) {
  return (
    <div className="flex items-center gap-1 mb-0.5">
      <label className="text-[10px] text-text-muted">{label}</label>
      {showHelp && (
        <Tooltip content={help}>
          <span className="material-symbols-outlined text-[12px] text-text-muted cursor-help">
            help
          </span>
        </Tooltip>
      )}
    </div>
  );
}

function ComboReadinessPanel({ checks, blockers, showDescription = true }) {
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

      {showDescription && (
        <p className="text-[10px] text-text-muted mt-0.5">
          {getI18nOrFallback(
            t,
            "readinessDescription",
            "Review the checklist before creating or updating this combo."
          )}
        </p>
      )}

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
  dragDisabled,
  isDragged,
  isDropTarget,
  isSelected,
  onDragStart,
  onDragEnd,
}) {
  const strategy = combo.strategy || "priority";
  const models = combo.models || [];
  const isDisabled = combo.isActive === false;
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const strategyDescription = getStrategyDescription(t, strategy);

  return (
    <Card
      padding="sm"
      className={`group transition-all ${
        isDisabled ? "opacity-50" : ""
      } ${isDropTarget ? "border border-primary/30 bg-primary/5" : ""} ${
        isDragged ? "opacity-60" : ""
      } ${isSelected ? "border-primary/30 bg-primary/[0.04]" : ""}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0 w-full">
          <button
            type="button"
            draggable={!dragDisabled}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            data-testid={`combo-drag-handle-${combo.id}`}
            className={`p-1 rounded-md transition-colors shrink-0 ${
              dragDisabled
                ? "cursor-not-allowed text-text-muted/40"
                : "cursor-grab active:cursor-grabbing text-text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            title={getI18nOrFallback(t, "reorderHandle", "Drag to reorder combo")}
            aria-label={getI18nOrFallback(t, "reorderHandle", "Drag to reorder combo")}
          >
            <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
          </button>

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
                  const { weight } = normalizeModelEntry(entry);
                  return (
                    <code
                      key={index}
                      className="text-[10px] font-mono bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded text-text-muted"
                    >
                      {formatComboEntryDisplay(entry, {
                        providerNodes,
                        includeConnection: true,
                        showFullEmails: emailsVisible,
                      })}
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
        <div className="flex items-center justify-between md:justify-end gap-1.5 shrink-0 ml-0 md:ml-2 w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t border-black/5 dark:border-white/5 md:border-t-0">
          <div className="flex items-center gap-2">
            <Toggle
              size="sm"
              checked={!isDisabled}
              onChange={onToggle}
              title={isDisabled ? t("enableCombo") : t("disableCombo")}
            />
            <span className="text-[10px] text-text-muted md:hidden">
              {isDisabled ? "Disabled" : "Active"}
            </span>
          </div>
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
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

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
          <div className="min-w-0">
            <div>
              Resolved by:{" "}
              <code className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                {results.resolvedBy}
              </code>
            </div>
            {results.resolvedByTarget?.connectionId || results.resolvedByTarget?.stepId ? (
              <div className="mt-1 text-xs text-text-muted">
                {results.resolvedByTarget?.connectionId
                  ? `account ${results.resolvedByTarget.connectionId.slice(0, 8)}`
                  : "dynamic account"}
                {results.resolvedByTarget?.stepId
                  ? ` · step ${results.resolvedByTarget.stepId}`
                  : ""}
              </div>
            ) : null}
          </div>
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
          <div className="min-w-0 flex-1">
            <code className="font-mono block truncate">
              {pickDisplayValue([r.label], emailsVisible, r.model)}
            </code>
            {r.connectionId || r.stepId ? (
              <div className="mt-0.5 text-[10px] text-text-muted">
                {r.connectionId ? `acct ${r.connectionId.slice(0, 8)}` : "dynamic account"}
                {r.stepId ? ` · ${r.stepId}` : ""}
              </div>
            ) : null}
          </div>
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
function ComboFormModal({ isOpen, combo, onClose, onSave, activeProviders, comboConfigMode }) {
  type CreateDraftSnapshot = {
    name: string;
    models: unknown[];
    strategy: string;
    config: Record<string, unknown>;
    showAdvanced: boolean;
    nameError: string;
    agentSystemMessage: string;
    agentToolFilter: string;
    agentContextCache: boolean;
  };

  const getEmptyCreateDraftSnapshot = useCallback(
    (): CreateDraftSnapshot => ({
      name: "",
      models: [],
      strategy: "priority",
      config: {},
      showAdvanced: false,
      nameError: "",
      agentSystemMessage: "",
      agentToolFilter: "",
      agentContextCache: false,
    }),
    []
  );

  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const notify = useNotificationStore();
  const isExpertMode = normalizeComboConfigMode(comboConfigMode) === "expert";
  const createDraftStateRef = useRef<CreateDraftSnapshot>(getEmptyCreateDraftSnapshot());
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
  const [builderOptions, setBuilderOptions] = useState({ providers: [], comboRefs: [] });
  const [builderLoading, setBuilderLoading] = useState(false);
  const [builderProviderId, setBuilderProviderId] = useState("");
  const [builderModelId, setBuilderModelId] = useState("");
  const [builderConnectionId, setBuilderConnectionId] = useState(COMBO_BUILDER_AUTO_CONNECTION);
  const [manualModelInput, setManualModelInput] = useState("");
  const [manualModelError, setManualModelError] = useState("");
  const [builderComboRefName, setBuilderComboRefName] = useState("");
  const [builderError, setBuilderError] = useState("");
  const [builderStage, setBuilderStage] = useState<string>(COMBO_BUILDER_STAGES[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [config, setConfig] = useState(sanitizeComboRuntimeConfig(combo?.config));
  const [showStrategyNudge, setShowStrategyNudge] = useState(false);
  const strategyChangeMountedRef = useRef(false);
  // Agent features (#399 / #401 / #454)
  const [agentSystemMessage, setAgentSystemMessage] = useState<string>(combo?.system_message || "");
  const [agentToolFilter, setAgentToolFilter] = useState<string>(combo?.tool_filter_regex || "");
  const [agentContextCache, setAgentContextCache] = useState<boolean>(
    !!combo?.context_cache_protection
  );
  const comboBuilderStages = useMemo(() => getComboBuilderStages({ strategy }), [strategy]);
  const visibleStageMeta = useMemo(
    () => COMBO_FORM_STAGE_META.filter((stageMeta) => comboBuilderStages.includes(stageMeta.id)),
    [comboBuilderStages]
  );
  const usesIntelligentBuilderStage = isIntelligentBuilderStrategy(strategy);
  const intelligentConfig = useMemo(() => normalizeIntelligentRoutingConfig(config), [config]);

  const resetFormForCombo = useCallback(
    (nextCombo, comboDefaults = null) => {
      const nextDefaults =
        nextCombo || comboDefaults
          ? {
              ...(comboDefaults || {}),
            }
          : {};
      const nextConfig = nextCombo?.config
        ? sanitizeComboRuntimeConfig(nextCombo.config)
        : sanitizeComboRuntimeConfig(
            Object.fromEntries(Object.entries(nextDefaults).filter(([key]) => key !== "strategy"))
          );

      setName(nextCombo?.name || "");
      setModels((nextCombo?.models || []).map((m) => normalizeModelEntry(m)));
      setStrategy(nextCombo?.strategy || comboDefaults?.strategy || "priority");
      setConfig(nextConfig);
      setShowAdvanced(isExpertMode);
      setNameError("");
      setAgentSystemMessage(nextCombo?.system_message || "");
      setAgentToolFilter(nextCombo?.tool_filter_regex || "");
      setAgentContextCache(!!nextCombo?.context_cache_protection);
    },
    [isExpertMode, setAgentContextCache]
  );

  useEffect(() => {
    createDraftStateRef.current = {
      name,
      models,
      strategy,
      config,
      showAdvanced,
      nameError,
      agentSystemMessage,
      agentToolFilter,
      agentContextCache,
    };
  }, [
    name,
    models,
    strategy,
    config,
    showAdvanced,
    nameError,
    agentSystemMessage,
    agentToolFilter,
    agentContextCache,
  ]);

  useEffect(() => {
    if (!comboBuilderStages.includes(builderStage)) {
      setBuilderStage("strategy");
    }
  }, [builderStage, comboBuilderStages]);

  // DnD state
  const hasPricingForModel = useCallback(
    (modelValue) => {
      const parsed = parseQualifiedModel(modelValue);
      if (!parsed) return false;

      const { providerId: providerIdentifier, modelId } = parsed;
      const matchedNode = findProviderNodeByIdentifier(providerNodes, providerIdentifier);

      const providerCandidates = [providerIdentifier];
      if (matchedNode?.apiType) providerCandidates.push(matchedNode.apiType);
      if (matchedNode?.name) providerCandidates.push(String(matchedNode.name).toLowerCase());

      return providerCandidates.some((candidate) => !!pricingByProvider?.[candidate]?.[modelId]);
    },
    [pricingByProvider, providerNodes]
  );

  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const builderProviders = useMemo(
    () => builderOptions.providers || [],
    [builderOptions.providers]
  );
  const builderComboRefs = (builderOptions.comboRefs || []).filter(
    (comboRef) => comboRef.name !== combo?.name && comboRef.name !== name.trim()
  );
  const selectedBuilderProvider =
    builderProviders.find((provider) => provider.providerId === builderProviderId) || null;
  const selectedBuilderModel =
    selectedBuilderProvider?.models?.find((model) => model.id === builderModelId) || null;
  const selectedBuilderConnections = selectedBuilderProvider?.connections || [];
  const selectedBuilderConnection =
    builderConnectionId && builderConnectionId !== COMBO_BUILDER_AUTO_CONNECTION
      ? selectedBuilderConnections.find((connection) => connection.id === builderConnectionId) ||
        null
      : null;
  const builderCandidateStep =
    selectedBuilderProvider && selectedBuilderModel
      ? buildPrecisionComboModelStep({
          providerId: selectedBuilderProvider.providerId,
          modelId: selectedBuilderModel.id,
          connectionId:
            builderConnectionId !== COMBO_BUILDER_AUTO_CONNECTION ? builderConnectionId : null,
          connectionLabel: selectedBuilderConnection?.label || null,
        })
      : null;
  const builderHasDuplicate =
    builderCandidateStep && hasExactModelStepDuplicate(models, builderCandidateStep);
  const manualModelStep = buildManualComboModelStep({
    value: manualModelInput,
    providers: builderProviders,
  });
  const manualModelHasDuplicate =
    manualModelStep && hasExactModelStepDuplicate(models, manualModelStep);
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
  const builderStageChecks = getComboBuilderStageChecks({
    name,
    nameError,
    modelsCount: models.length,
    hasInvalidWeightedTotal,
    hasCostOptimizedWithoutPricing,
  });
  const canAdvanceFromCurrentStage =
    builderStage === "basics"
      ? builderStageChecks.basics
      : builderStage === "steps"
        ? builderStageChecks.steps
        : builderStage === "intelligent"
          ? true
          : true;
  const currentStageIndex = visibleStageMeta.findIndex(
    (stageMeta) => stageMeta.id === builderStage
  );
  const pinnedAccountCount = models.filter((entry) => Boolean(entry?.connectionId)).length;
  const comboRefCount = models.filter((entry) => entry?.kind === "combo-ref").length;
  const uniqueProviderCount = new Set(
    models
      .map((entry) => {
        const target = getModelString(entry);
        const parsed = parseQualifiedModel(target);
        return entry?.providerId || parsed?.providerId || null;
      })
      .filter(Boolean)
  ).size;
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
  const showInlineReadinessPanel = !isExpertMode || saveBlockers.length > 0;

  const fetchModalData = async () => {
    setBuilderLoading(true);
    try {
      const [aliasesRes, nodesRes, pricingRes, builderRes] = await Promise.all([
        fetch("/api/models/alias"),
        fetch("/api/provider-nodes"),
        fetch("/api/pricing"),
        fetch("/api/combos/builder/options"),
      ]);

      if (!aliasesRes.ok || !nodesRes.ok) {
        throw new Error(
          `Failed to fetch data: aliases=${aliasesRes.status}, nodes=${nodesRes.status}`
        );
      }
      const pricingData = pricingRes.ok ? await pricingRes.json() : {};
      const builderData = builderRes.ok ? await builderRes.json() : {};

      const [aliasesData, nodesData] = await Promise.all([aliasesRes.json(), nodesRes.json()]);
      setPricingByProvider(
        pricingData && typeof pricingData === "object" && !Array.isArray(pricingData)
          ? pricingData
          : {}
      );
      setModelAliases(aliasesData.aliases || {});
      setProviderNodes(nodesData.nodes || []);
      setBuilderOptions({
        providers: builderData.providers || [],
        comboRefs: builderData.comboRefs || [],
      });
    } catch (error) {
      console.error("Error fetching modal data:", error);
      setBuilderOptions({ providers: [], comboRefs: [] });
    } finally {
      setBuilderLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchModalData();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setBuilderProviderId("");
    setBuilderModelId("");
    setBuilderConnectionId(COMBO_BUILDER_AUTO_CONNECTION);
    setManualModelInput("");
    setManualModelError("");
    setBuilderComboRefName("");
    setBuilderError("");
    setBuilderStage("basics");
  }, [combo?.id, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    if (combo) {
      resetFormForCombo(combo);
      return () => {
        cancelled = true;
      };
    }

    createDraftStateRef.current = getEmptyCreateDraftSnapshot();
    resetFormForCombo(null, null);

    const loadDefaults = async () => {
      try {
        const response = await fetch("/api/settings/combo-defaults");
        const data = response.ok ? await response.json() : {};
        const draft = createDraftStateRef.current;
        const isPristineDraft =
          draft.name.trim().length === 0 &&
          draft.models.length === 0 &&
          draft.strategy === "priority" &&
          Object.keys(draft.config || {}).length === 0 &&
          (draft.showAdvanced === false || (isExpertMode && draft.showAdvanced === true)) &&
          draft.nameError.length === 0 &&
          draft.agentSystemMessage.length === 0 &&
          draft.agentToolFilter.length === 0 &&
          draft.agentContextCache === false;

        if (!cancelled && isPristineDraft) {
          resetFormForCombo(null, data.comboDefaults || null);
        }
      } catch {
        // Keep the blank create form if defaults fail to load.
      }
    };

    loadDefaults();

    return () => {
      cancelled = true;
    };
  }, [combo, getEmptyCreateDraftSnapshot, isExpertMode, isOpen, resetFormForCombo]);

  useEffect(() => {
    if (!isOpen) return;
    if (builderProviderId) return;
    if (builderProviders.length === 1) {
      setBuilderProviderId(builderProviders[0].providerId);
    }
  }, [builderProviderId, builderProviders, isOpen]);

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

  const handleBuilderProviderChange = (e) => {
    const nextProviderId = e.target.value;
    setBuilderProviderId(nextProviderId);
    setBuilderModelId("");
    setBuilderConnectionId(COMBO_BUILDER_AUTO_CONNECTION);
    setBuilderError("");
  };

  const handleBuilderModelChange = (e) => {
    const nextModelId = e.target.value;
    setBuilderModelId(nextModelId);
    setBuilderError("");

    if (!nextModelId || !selectedBuilderProvider) {
      setBuilderConnectionId(COMBO_BUILDER_AUTO_CONNECTION);
      return;
    }

    setBuilderConnectionId(
      findNextSuggestedConnectionId(
        models,
        selectedBuilderProvider.providerId,
        nextModelId,
        selectedBuilderProvider.connections || []
      )
    );
  };

  const handleBuilderConnectionChange = (e) => {
    setBuilderConnectionId(e.target.value || COMBO_BUILDER_AUTO_CONNECTION);
    setBuilderError("");
  };

  const handleGoToNextStage = () => {
    setBuilderStage((currentStage) => getNextComboBuilderStage(currentStage, { strategy }));
  };

  const handleGoToPreviousStage = () => {
    setBuilderStage((currentStage) => getPreviousComboBuilderStage(currentStage, { strategy }));
  };

  const handleAddBuilderStep = () => {
    if (!selectedBuilderProvider || !selectedBuilderModel) {
      return;
    }

    const nextStep = buildPrecisionComboModelStep({
      providerId: selectedBuilderProvider.providerId,
      modelId: selectedBuilderModel.id,
      connectionId:
        builderConnectionId !== COMBO_BUILDER_AUTO_CONNECTION ? builderConnectionId : null,
      connectionLabel: selectedBuilderConnection?.label || null,
    });

    if (hasExactModelStepDuplicate(models, nextStep)) {
      setBuilderError(
        getI18nOrFallback(
          t,
          "builderDuplicateExact",
          "This exact provider/model/account step is already in the combo."
        )
      );
      return;
    }

    const nextModels = [...models, nextStep];
    setModels(nextModels);
    setBuilderError("");
    setBuilderConnectionId(
      findNextSuggestedConnectionId(
        nextModels,
        selectedBuilderProvider.providerId,
        selectedBuilderModel.id,
        selectedBuilderConnections
      )
    );
  };

  const handleAddManualModel = () => {
    const parsedManualModel = parseQualifiedModel(manualModelInput);
    if (!parsedManualModel) {
      setManualModelError(
        getI18nOrFallback(t, "manualModelInvalid", "Enter a model as provider/model.")
      );
      return;
    }

    const resolvedProviderId = resolveComboBuilderProviderId(
      parsedManualModel.providerId,
      builderProviders
    );
    if (!resolvedProviderId) {
      setManualModelError(
        getI18nOrFallback(t, "manualModelUnknownProvider", "Unknown provider prefix.")
      );
      return;
    }

    const nextStep = buildManualComboModelStep({
      value: manualModelInput,
      providers: builderProviders,
    });

    if (!nextStep) {
      setManualModelError(
        getI18nOrFallback(t, "manualModelInvalid", "Enter a model as provider/model.")
      );
      return;
    }

    if (hasExactModelStepDuplicate(models, nextStep)) {
      setManualModelError(
        getI18nOrFallback(
          t,
          "builderDuplicateExact",
          "This exact provider/model/account step is already in the combo."
        )
      );
      return;
    }

    setModels([...models, nextStep]);
    setManualModelInput("");
    setManualModelError("");
  };

  const handleAddComboReference = () => {
    if (!builderComboRefName) return;

    setModels([
      ...models,
      {
        kind: "combo-ref",
        comboName: builderComboRefName,
        weight: 0,
      },
    ]);
    setBuilderComboRefName("");
    setBuilderError("");
  };

  const handleAddModel = (model) => {
    const nextEntry = { model: model.value, weight: 0 };
    if (hasExactModelStepDuplicate(models, nextEntry)) {
      setBuilderError(
        getI18nOrFallback(
          t,
          "builderDuplicateExact",
          "This exact provider/model/account step is already in the combo."
        )
      );
      return;
    }
    setModels([...models, nextEntry]);
    setBuilderError("");
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
      priority: { maxRetries: 2, retryDelayMs: 1500 },
      weighted: { maxRetries: 1, retryDelayMs: 1000 },
      "round-robin": {
        maxRetries: 1,
        retryDelayMs: 750,
        concurrencyPerModel: 3,
        queueTimeoutMs: 30000,
      },
      "context-relay": {
        maxRetries: 1,
        retryDelayMs: 750,
        handoffThreshold: 0.85,
        maxMessagesForSummary: 30,
      },
      random: { maxRetries: 1, retryDelayMs: 1000 },
      "least-used": { maxRetries: 1, retryDelayMs: 1000 },
      "cost-optimized": { maxRetries: 1, retryDelayMs: 500 },
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
    (entry) => {
      return formatComboEntryDisplay(entry, {
        providerNodes,
        builderProviders,
        includeConnection: true,
        showFullEmails: emailsVisible,
      });
    },
    [builderProviders, emailsVisible, providerNodes]
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
      models,
      strategy,
    };

    // Include config only if any values are set
    const configToSave = sanitizeComboRuntimeConfig(config);
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
  const showBasicsSection = isExpertMode || builderStage === "basics";
  const showStepsSection = isExpertMode || builderStage === "steps";
  const showStrategySection = isExpertMode || builderStage === "strategy";
  const showIntelligentSection =
    usesIntelligentBuilderStage && (isExpertMode || builderStage === "intelligent");
  const showReviewSection = !isExpertMode && builderStage === "review";
  const advancedConfigVisible = isExpertMode || showAdvanced;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? t("editCombo") : t("createCombo")}
        size="full"
      >
        <div className="flex flex-col gap-3">
          {!isExpertMode && (
            <div className="rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div>
                  <p className="text-xs font-semibold text-text-main">
                    {getI18nOrFallback(t, "builderFlowTitle", "Combo Builder Flow")}
                  </p>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {getI18nOrFallback(
                      t,
                      "builderStagesDescription",
                      "Move through the stages in order to define the combo, build the steps, choose the routing strategy and review the result."
                    )}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wide text-text-muted">
                  {Math.max(currentStageIndex + 1, 1)}/{visibleStageMeta.length}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {visibleStageMeta.map((stageMeta, index) => {
                  const isActive = builderStage === stageMeta.id;
                  const canVisitStage = isActive
                    ? true
                    : canAccessComboBuilderStage(stageMeta.id, builderStageChecks, { strategy });
                  const isCompleted =
                    stageMeta.id === "review"
                      ? false
                      : stageMeta.id === "basics"
                        ? builderStageChecks.basics
                        : stageMeta.id === "steps"
                          ? builderStageChecks.steps
                          : stageMeta.id === "intelligent"
                            ? usesIntelligentBuilderStage
                            : builderStageChecks.strategy;

                  return (
                    <button
                      key={stageMeta.id}
                      type="button"
                      data-testid={`combo-builder-stage-${stageMeta.id}`}
                      onClick={() => {
                        if (!canVisitStage) return;
                        setBuilderStage(stageMeta.id);
                      }}
                      disabled={!canVisitStage}
                      className={`text-left rounded-lg border px-3 py-2 transition-all ${
                        isActive
                          ? "border-primary bg-primary/8"
                          : canVisitStage
                            ? "border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/[0.02] hover:border-primary/40"
                            : "border-black/6 dark:border-white/6 bg-black/[0.015] dark:bg-white/[0.015] opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`material-symbols-outlined text-[14px] ${
                            isCompleted && !isActive
                              ? "text-emerald-500"
                              : isActive
                                ? "text-primary"
                                : "text-text-muted"
                          }`}
                        >
                          {isCompleted && !isActive ? "check_circle" : stageMeta.icon}
                        </span>
                        <span className="text-[11px] font-semibold text-text-main">
                          {getI18nOrFallback(
                            t,
                            `builderStage.${stageMeta.id}.label`,
                            stageMeta.fallbackLabel
                          )}
                        </span>
                      </div>
                      <p className="text-[10px] text-text-muted mt-1 leading-[1.45]">
                        {getI18nOrFallback(
                          t,
                          `builderStage.${stageMeta.id}.description`,
                          stageMeta.fallbackDescription
                        )}
                      </p>
                      <p className="text-[9px] uppercase tracking-wide mt-1 text-text-muted">
                        {index < currentStageIndex
                          ? getI18nOrFallback(t, "builderStageVisited", "Visited")
                          : isActive
                            ? getI18nOrFallback(t, "builderStageCurrent", "Current")
                            : canVisitStage
                              ? getI18nOrFallback(t, "builderStagePending", "Pending")
                              : getI18nOrFallback(t, "builderStageLocked", "Locked")}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {showBasicsSection && (
            <>
              {/* Name */}
              <div>
                <Input
                  label={t("comboName")}
                  data-testid="combo-name-input"
                  value={name}
                  onChange={handleNameChange}
                  placeholder={t("comboNamePlaceholder")}
                  error={nameError}
                />
                {!isExpertMode && (
                  <p className="text-[10px] text-text-muted mt-0.5">{t("nameHint")}</p>
                )}
              </div>

              {!isEdit && !isExpertMode && (
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
                        data-testid={`combo-template-${template.id}`}
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
            </>
          )}

          {/* Strategy Toggle */}
          {showStrategySection && (
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <label className="text-sm font-medium">{t("routingStrategy")}</label>
                {!isExpertMode && (
                  <Tooltip content={getStrategyDescription(t, strategy)}>
                    <span className="material-symbols-outlined text-[13px] text-text-muted cursor-help">
                      help
                    </span>
                  </Tooltip>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1 p-0.5 bg-black/5 dark:bg-white/5 rounded-lg">
                {STRATEGY_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStrategy(s.value)}
                    data-testid={`strategy-option-${s.value}`}
                    title={!isExpertMode ? getStrategyDescription(t, s.value) : undefined}
                    aria-label={
                      isExpertMode
                        ? getStrategyLabel(t, s.value)
                        : `${getStrategyLabel(t, s.value)}. ${getStrategyDescription(t, s.value)}`
                    }
                    className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
                      strategy === s.value
                        ? "bg-white dark:bg-white/5 shadow-sm text-primary"
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
              {!isExpertMode && (
                <>
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
                </>
              )}
            </div>
          )}

          {showIntelligentSection && (
            <BuilderIntelligentStep
              t={t}
              config={config}
              activeProviders={activeProviders}
              onChange={(nextIntelligentConfig: any) =>
                setConfig((previousConfig) => ({
                  ...previousConfig,
                  ...nextIntelligentConfig,
                  weights: {
                    ...(previousConfig?.weights || {}),
                    ...(nextIntelligentConfig?.weights || {}),
                  },
                }))
              }
            />
          )}

          {/* Models */}
          {showStepsSection && (
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

              <div className="rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-3 mb-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-text-main">
                      {getI18nOrFallback(t, "builderTitle", "Precision Builder")}
                    </p>
                    {!isExpertMode && (
                      <p className="text-[10px] text-text-muted mt-0.5">
                        {getI18nOrFallback(
                          t,
                          "builderStepsDescription",
                          "Build each combo step in sequence: provider, model, then account. This allows repeating the same provider and model with different accounts."
                        )}
                      </p>
                    )}
                  </div>
                  {!isExpertMode && (
                    <button
                      type="button"
                      onClick={() => setShowModelSelect(true)}
                      className="text-[10px] shrink-0 text-primary hover:text-primary/80 transition-colors"
                    >
                      {getI18nOrFallback(t, "builderBrowseCatalog", "Legacy model browser")}
                    </button>
                  )}
                </div>

                {isExpertMode && (
                  <div className="mt-3 rounded-md border border-black/8 dark:border-white/8 bg-white/70 dark:bg-white/[0.03] px-2.5 py-2">
                    <label className="text-[10px] font-medium uppercase tracking-wide text-text-muted block mb-1">
                      {getI18nOrFallback(t, "manualModel", "Manual model")}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={manualModelInput}
                        onChange={(e) => {
                          setManualModelInput(e.target.value);
                          setManualModelError("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddManualModel();
                          }
                        }}
                        placeholder="provider/model"
                        data-testid="combo-manual-model-input"
                        className="flex-1 text-xs py-2 px-2 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-text-main focus:border-primary focus:outline-none font-mono"
                      />
                      <Button
                        onClick={handleAddManualModel}
                        size="sm"
                        disabled={!manualModelInput.trim() || !!manualModelHasDuplicate}
                        data-testid="combo-manual-model-add"
                      >
                        {getI18nOrFallback(t, "addModel", "Add model")}
                      </Button>
                    </div>
                    {(manualModelError || manualModelHasDuplicate) && (
                      <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-[10px] text-amber-700 dark:text-amber-300">
                        {manualModelError ||
                          getI18nOrFallback(
                            t,
                            "builderDuplicateExact",
                            "This exact provider/model/account step is already in the combo."
                          )}
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wide text-text-muted block mb-1">
                      1. {getI18nOrFallback(t, "builderProvider", "Provider")}
                    </label>
                    <select
                      value={builderProviderId}
                      onChange={handleBuilderProviderChange}
                      data-testid="combo-builder-provider"
                      className="w-full text-xs py-2 px-2 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-text-main focus:border-primary focus:outline-none"
                    >
                      <option value="">
                        {builderLoading
                          ? getI18nOrFallback(t, "builderLoadingProviders", "Loading providers…")
                          : getI18nOrFallback(t, "builderSelectProvider", "Select provider")}
                      </option>
                      {builderProviders.map((provider) => (
                        <option key={provider.providerId} value={provider.providerId}>
                          {provider.displayName} ({provider.connectionCount} acct
                          {provider.connectionCount === 1 ? "" : "s"})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wide text-text-muted block mb-1">
                      2. {getI18nOrFallback(t, "builderModel", "Model")}
                    </label>
                    <select
                      value={builderModelId}
                      onChange={handleBuilderModelChange}
                      disabled={!selectedBuilderProvider}
                      data-testid="combo-builder-model"
                      className="w-full text-xs py-2 px-2 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-text-main focus:border-primary focus:outline-none disabled:opacity-50"
                    >
                      <option value="">
                        {selectedBuilderProvider
                          ? getI18nOrFallback(t, "builderSelectModel", "Select model")
                          : getI18nOrFallback(t, "builderProviderFirst", "Choose provider first")}
                      </option>
                      {(selectedBuilderProvider?.models || []).map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                          {model.source ? ` · ${model.source}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wide text-text-muted block mb-1">
                      3. {getI18nOrFallback(t, "builderAccount", "Account")}
                    </label>
                    <select
                      value={builderConnectionId}
                      onChange={handleBuilderConnectionChange}
                      disabled={!selectedBuilderModel}
                      data-testid="combo-builder-account"
                      className="w-full text-xs py-2 px-2 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-text-main focus:border-primary focus:outline-none disabled:opacity-50"
                    >
                      <option value={COMBO_BUILDER_AUTO_CONNECTION}>
                        {getI18nOrFallback(
                          t,
                          "autoSelectAccount",
                          "Auto-select account at runtime"
                        )}
                      </option>
                      {selectedBuilderConnections.map((connection) => (
                        <option key={connection.id} value={connection.id}>
                          {pickDisplayValue([connection.label], emailsVisible, connection.label)}
                          {connection.status !== "active" ? ` · ${connection.status}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {isExpertMode ? (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Button
                      onClick={handleAddBuilderStep}
                      size="sm"
                      disabled={!builderCandidateStep || !!builderHasDuplicate}
                      data-testid="combo-builder-add-step"
                    >
                      {getI18nOrFallback(t, "builderAddStep", "Add detailed step")}
                    </Button>
                    {builderHasDuplicate && (
                      <span className="text-[10px] text-amber-600 dark:text-amber-300">
                        {getI18nOrFallback(
                          t,
                          "builderDuplicateExact",
                          "This exact provider/model/account step is already in the combo."
                        )}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mt-2 rounded-md border border-black/8 dark:border-white/8 bg-white/70 dark:bg-white/[0.03] px-2.5 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-text-muted">
                      {getI18nOrFallback(t, "builderPreview", "Current step preview")}
                    </p>
                    <p className="text-xs text-text-main mt-1">
                      {builderCandidateStep
                        ? formatModelDisplay(builderCandidateStep)
                        : getI18nOrFallback(
                            t,
                            "previewNextStep",
                            "Choose provider and model to preview the next step."
                          )}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <Button
                        onClick={handleAddBuilderStep}
                        size="sm"
                        disabled={!builderCandidateStep || !!builderHasDuplicate}
                        data-testid="combo-builder-add-step"
                      >
                        {getI18nOrFallback(t, "builderAddStep", "Add detailed step")}
                      </Button>
                      {builderHasDuplicate && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-300">
                          {getI18nOrFallback(
                            t,
                            "builderDuplicateExact",
                            "This exact provider/model/account step is already in the combo."
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5">
                  <label className="text-[10px] font-medium uppercase tracking-wide text-text-muted block mb-1">
                    {getI18nOrFallback(t, "builderComboRef", "Reference another combo")}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={builderComboRefName}
                      onChange={(e) => setBuilderComboRefName(e.target.value)}
                      className="flex-1 text-xs py-2 px-2 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-text-main focus:border-primary focus:outline-none"
                    >
                      <option value="">
                        {getI18nOrFallback(
                          t,
                          "selectComboToReference",
                          "Select an existing combo to reference"
                        )}
                      </option>
                      {builderComboRefs.map((comboRef) => (
                        <option key={comboRef.id} value={comboRef.name}>
                          {comboRef.name} · {comboRef.strategy} · {comboRef.stepCount} step
                          {comboRef.stepCount === 1 ? "" : "s"}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={handleAddComboReference}
                      variant="ghost"
                      size="sm"
                      disabled={!builderComboRefName}
                    >
                      {getI18nOrFallback(t, "builderAddComboRef", "Add combo ref")}
                    </Button>
                  </div>
                </div>

                {builderError && (
                  <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-[10px] text-amber-700 dark:text-amber-300">
                    {builderError}
                  </div>
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
                      <div className="flex-1 min-w-0 px-1">
                        <div className="text-xs text-text-main truncate">
                          {formatModelDisplay(entry)}
                        </div>
                        <div className="text-[10px] text-text-muted truncate">
                          {entry.kind === "combo-ref"
                            ? getI18nOrFallback(t, "builderComboRefStep", "Nested combo reference")
                            : entry.connectionId
                              ? getI18nOrFallback(t, "builderPinnedAccount", "Pinned account")
                              : entry.providerId
                                ? getI18nOrFallback(
                                    t,
                                    "builderDynamicAccountShort",
                                    "Dynamic account"
                                  )
                                : getI18nOrFallback(t, "builderLegacyEntry", "Legacy model entry")}
                        </div>
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

                      {/* Reorder arrows (Mobile friendly) */}
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
                  {!isExpertMode && (
                    <p className="text-[10px] text-text-muted mt-1">
                      {getI18nOrFallback(
                        t,
                        "pricingCoverageHint",
                        "Cost-optimized works best when all combo models have pricing."
                      )}
                    </p>
                  )}
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

              {!isExpertMode && hasRoundRobinSingleModel && (
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

              {showInlineReadinessPanel && (
                <div className="mt-2">
                  <ComboReadinessPanel
                    checks={readinessChecks}
                    blockers={saveBlockers}
                    showDescription={!isExpertMode}
                  />
                </div>
              )}

              <button
                onClick={() => setShowModelSelect(true)}
                className="w-full mt-2 py-2 border border-dashed border-black/10 dark:border-white/10 rounded-lg text-xs text-text-muted hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center gap-1"
                data-testid="combo-browse-catalog"
              >
                <span className="material-symbols-outlined text-[16px]">travel_explore</span>
                {getI18nOrFallback(t, "browseLegacyCatalog", "Browse legacy model catalog")}
              </button>
            </div>
          )}

          {/* Advanced Config Toggle */}
          {showStrategySection && (
            <>
              {!isExpertMode && (
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-text-main transition-colors self-start"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {showAdvanced ? "expand_less" : "expand_more"}
                  </span>
                  {t("advancedSettings")}
                </button>
              )}

              {advancedConfigVisible && (
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
                        showHelp={!isExpertMode}
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
                        showHelp={!isExpertMode}
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
                          showHelp={!isExpertMode}
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
                              concurrencyPerModel: e.target.value
                                ? Number(e.target.value)
                                : undefined,
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
                          showHelp={!isExpertMode}
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
                  {strategy === "context-relay" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                      <div>
                        <FieldLabelWithHelp
                          label={getI18nOrFallback(
                            t,
                            "contextRelayHandoffThreshold",
                            "Handoff Threshold"
                          )}
                          help={getI18nOrFallback(
                            t,
                            "contextRelayHandoffThresholdHelp",
                            "When quota usage reaches this threshold, OmniRoute generates a structured handoff summary before the account is exhausted."
                          )}
                          showHelp={!isExpertMode}
                        />
                        <input
                          type="number"
                          min="0.5"
                          max="0.94"
                          step="0.01"
                          value={config.handoffThreshold ?? ""}
                          placeholder="0.85"
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              handoffThreshold: e.target.value ? Number(e.target.value) : undefined,
                            })
                          }
                          className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <FieldLabelWithHelp
                          label={getI18nOrFallback(
                            t,
                            "contextRelayMaxMessages",
                            "Max Messages For Summary"
                          )}
                          help={getI18nOrFallback(
                            t,
                            "contextRelayMaxMessagesHelp",
                            "Limits how much recent history is condensed into the relay summary."
                          )}
                          showHelp={!isExpertMode}
                        />
                        <input
                          type="number"
                          min="5"
                          max="100"
                          value={config.maxMessagesForSummary ?? ""}
                          placeholder="30"
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              maxMessagesForSummary: e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            })
                          }
                          className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <FieldLabelWithHelp
                          label={getI18nOrFallback(t, "contextRelaySummaryModel", "Summary Model")}
                          help={getI18nOrFallback(
                            t,
                            "contextRelaySummaryModelHelp",
                            "Optional override model used only for generating the handoff summary. Leave empty to reuse the active combo model."
                          )}
                          showHelp={!isExpertMode}
                        />
                        <input
                          type="text"
                          value={config.handoffModel ?? ""}
                          placeholder="codex/gpt-5.4"
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              handoffModel: e.target.value || undefined,
                            })
                          }
                          className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
                        />
                      </div>
                      {!isExpertMode && (
                        <div className="md:col-span-3 rounded-md border border-fuchsia-500/20 bg-fuchsia-500/5 px-2 py-1.5">
                          <p className="text-[10px] text-fuchsia-700 dark:text-fuchsia-300">
                            {getI18nOrFallback(
                              t,
                              "contextRelayProviderNote",
                              "Context Relay currently generates handoffs for Codex account rotation. Pair it with multiple accounts of the same provider for the best continuity."
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {!isExpertMode && (
                    <p className="text-[10px] text-text-muted">{t("advancedHint")}</p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Agent Features (#399 / #401 / #454) */}
          {showStrategySection && (
            <div className="flex flex-col gap-2 p-3 bg-black/[0.02] dark:bg-white/[0.02] rounded-lg border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[14px] text-primary">
                  smart_toy
                </span>
                <p className="text-xs font-medium">
                  {getI18nOrFallback(t, "agentFeaturesTitle", "Agent features")}
                </p>
                {!isExpertMode && (
                  <span className="text-[10px] text-text-muted">
                    {getI18nOrFallback(
                      t,
                      "agentFeaturesDescription",
                      "Tune agent prompts and tool access for this combo."
                    )}
                  </span>
                )}
              </div>

              {/* System Message Override */}
              <div>
                <label className="text-[11px] font-medium text-text-muted block mb-0.5">
                  {getI18nOrFallback(
                    t,
                    "agentFeaturesSystemMessageOverride",
                    "System message override"
                  )}
                </label>
                <textarea
                  rows={2}
                  value={agentSystemMessage}
                  onChange={(e) => setAgentSystemMessage(e.target.value)}
                  placeholder={getI18nOrFallback(
                    t,
                    "agentFeaturesSystemMessagePlaceholder",
                    "Optional system instructions for this combo"
                  )}
                  className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none resize-none"
                />
                {!isExpertMode && (
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {getI18nOrFallback(
                      t,
                      "agentFeaturesSystemMessageHint",
                      "Applied only when this combo is used as an agent."
                    )}
                  </p>
                )}
              </div>

              {/* Tool Filter Regex */}
              <div>
                <label className="text-[11px] font-medium text-text-muted block mb-0.5">
                  {getI18nOrFallback(t, "agentFeaturesToolFilterRegex", "Tool filter regex")}
                </label>
                <input
                  type="text"
                  value={agentToolFilter}
                  onChange={(e) => setAgentToolFilter(e.target.value)}
                  placeholder="e.g. ^(bash|computer)$"
                  className="w-full text-xs py-1.5 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none font-mono"
                />
                {!isExpertMode && (
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {getI18nOrFallback(
                      t,
                      "agentFeaturesToolFilterHint",
                      "Limit agent tools by name with a regular expression."
                    )}
                  </p>
                )}
              </div>

              {/* Context Cache Protection */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <label className="text-[11px] font-medium text-text-muted block">
                    {getI18nOrFallback(
                      t,
                      "agentFeaturesContextCacheProtection",
                      "Context cache protection"
                    )}
                  </label>
                  {!isExpertMode && (
                    <p className="text-[10px] text-text-muted">
                      {getI18nOrFallback(
                        t,
                        "agentFeaturesContextCacheHint",
                        "Keep cached context isolated when provider state changes."
                      )}
                    </p>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={agentContextCache}
                  onChange={(e) => setAgentContextCache(e.target.checked)}
                  className="accent-primary shrink-0"
                />
              </div>
            </div>
          )}

          {showReviewSection && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-text-muted">
                    {getI18nOrFallback(t, "reviewName", "Name")}
                  </p>
                  <p className="text-sm font-semibold text-text-main mt-1 break-all">
                    {name || "—"}
                  </p>
                </div>
                <div className="rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-text-muted">
                    {getI18nOrFallback(t, "reviewStrategy", "Strategy")}
                  </p>
                  <p className="text-sm font-semibold text-text-main mt-1">
                    {getStrategyLabel(t, strategy)}
                  </p>
                </div>
                <div className="rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-text-muted">
                    {getI18nOrFallback(t, "reviewSteps", "Steps")}
                  </p>
                  <p className="text-sm font-semibold text-text-main mt-1">{models.length}</p>
                </div>
                <div className="rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-text-muted">
                    {getI18nOrFallback(t, "reviewAccounts", "Pinned accounts")}
                  </p>
                  <p className="text-sm font-semibold text-text-main mt-1">{pinnedAccountCount}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="rounded-lg border border-black/8 dark:border-white/8 bg-white/70 dark:bg-white/[0.03] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-text-muted">
                    {getI18nOrFallback(t, "reviewProviders", "Providers")}
                  </p>
                  <p className="text-sm font-semibold text-text-main mt-1">{uniqueProviderCount}</p>
                </div>
                <div className="rounded-lg border border-black/8 dark:border-white/8 bg-white/70 dark:bg-white/[0.03] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-text-muted">
                    {getI18nOrFallback(t, "reviewComboRefs", "Combo refs")}
                  </p>
                  <p className="text-sm font-semibold text-text-main mt-1">{comboRefCount}</p>
                </div>
                <div className="rounded-lg border border-black/8 dark:border-white/8 bg-white/70 dark:bg-white/[0.03] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-text-muted">
                    {getI18nOrFallback(t, "reviewAdvanced", "Advanced config")}
                  </p>
                  <p className="text-sm font-semibold text-text-main mt-1">
                    {Object.keys(config || {}).length}
                  </p>
                </div>
                <div className="rounded-lg border border-black/8 dark:border-white/8 bg-white/70 dark:bg-white/[0.03] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-text-muted">
                    {getI18nOrFallback(t, "reviewAgentFlags", "Agent flags")}
                  </p>
                  <p className="text-sm font-semibold text-text-main mt-1">
                    {
                      [
                        agentSystemMessage,
                        agentToolFilter,
                        agentContextCache ? "cache" : "",
                      ].filter(Boolean).length
                    }
                  </p>
                </div>
              </div>

              {usesIntelligentBuilderStage && (
                <div className="rounded-lg border border-primary/15 bg-primary/[0.04] p-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      auto_awesome
                    </span>
                    <p className="text-sm font-semibold text-text-main">
                      {getI18nOrFallback(t, "reviewIntelligentTitle", "Intelligent Routing Config")}
                    </p>
                  </div>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm">
                    <div>
                      <dt className="text-[10px] uppercase tracking-wide text-text-muted">
                        {getI18nOrFallback(t, "modePackLabel", "Mode Pack")}
                      </dt>
                      <dd className="text-text-main mt-1">{intelligentConfig.modePack}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-wide text-text-muted">
                        {getI18nOrFallback(t, "routerStrategyLabel", "Router Strategy")}
                      </dt>
                      <dd className="text-text-main mt-1">{intelligentConfig.routerStrategy}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-wide text-text-muted">
                        {getI18nOrFallback(t, "explorationRateLabel", "Exploration Rate")}
                      </dt>
                      <dd className="text-text-main mt-1">
                        {Math.round(intelligentConfig.explorationRate * 100)}%
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-wide text-text-muted">
                        {getI18nOrFallback(t, "candidatePoolLabel", "Candidate Pool")}
                      </dt>
                      <dd className="text-text-main mt-1">
                        {intelligentConfig.candidatePool.length > 0
                          ? intelligentConfig.candidatePool.length
                          : getI18nOrFallback(t, "candidatePoolAllProviders", "All providers")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-wide text-text-muted">
                        {getI18nOrFallback(t, "budgetCapLabel", "Budget Cap (USD / request)")}
                      </dt>
                      <dd className="text-text-main mt-1">
                        {intelligentConfig.budgetCap
                          ? `$${intelligentConfig.budgetCap}`
                          : getI18nOrFallback(t, "budgetCapPlaceholder", "No limit")}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}

              <div className="rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-3">
                <p className="text-xs font-semibold text-text-main">
                  {getI18nOrFallback(t, "reviewSequence", "Execution sequence")}
                </p>
                <div className="mt-2 flex flex-col gap-1.5 max-h-[260px] overflow-y-auto">
                  {models.length === 0 ? (
                    <p className="text-[11px] text-text-muted">
                      {getI18nOrFallback(t, "reviewNoSteps", "No steps added yet.")}
                    </p>
                  ) : (
                    models.map((entry, index) => (
                      <div
                        key={`${getModelString(entry) || "entry"}-${index}`}
                        className="rounded-md border border-black/6 dark:border-white/6 bg-white/70 dark:bg-white/[0.03] px-2.5 py-2"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-semibold text-text-muted mt-0.5">
                            {index + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-text-main truncate">
                              {formatModelDisplay(entry)}
                            </p>
                            <p className="text-[10px] text-text-muted mt-0.5">
                              {entry.kind === "combo-ref"
                                ? getI18nOrFallback(
                                    t,
                                    "builderComboRefStep",
                                    "Nested combo reference"
                                  )
                                : entry.connectionId
                                  ? getI18nOrFallback(t, "builderPinnedAccount", "Pinned account")
                                  : entry.providerId
                                    ? getI18nOrFallback(
                                        t,
                                        "builderDynamicAccountShort",
                                        "Dynamic account"
                                      )
                                    : getI18nOrFallback(
                                        t,
                                        "builderLegacyEntry",
                                        "Legacy model entry"
                                      )}
                              {strategy === "weighted" && entry.weight > 0
                                ? ` · ${entry.weight}%`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <ComboReadinessPanel checks={readinessChecks} blockers={saveBlockers} />
            </div>
          )}

          {/* Actions */}
          {isExpertMode ? (
            <div className="flex gap-2 pt-1">
              <Button onClick={onClose} variant="ghost" fullWidth size="sm">
                {tc("cancel")}
              </Button>
              <Button onClick={handleSave} fullWidth size="sm" disabled={saveBlocked}>
                {saving ? t("saving") : isEdit ? tc("save") : t("createCombo")}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 pt-1">
              <Button
                onClick={builderStage === "basics" ? onClose : handleGoToPreviousStage}
                variant="ghost"
                fullWidth
                size="sm"
                data-testid="combo-builder-back"
              >
                {builderStage === "basics" ? tc("cancel") : getI18nOrFallback(tc, "back", "Back")}
              </Button>
              {builderStage === "review" ? (
                <Button onClick={handleSave} fullWidth size="sm" disabled={saveBlocked}>
                  {saving ? t("saving") : isEdit ? tc("save") : t("createCombo")}
                </Button>
              ) : (
                <Button
                  onClick={handleGoToNextStage}
                  fullWidth
                  size="sm"
                  disabled={!canAdvanceFromCurrentStage}
                  data-testid="combo-builder-next"
                >
                  {getI18nOrFallback(tc, "next", "Next")}
                </Button>
              )}
            </div>
          )}

          {(isExpertMode || builderStage !== "review") && !canAdvanceFromCurrentStage && (
            <div className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-[10px] text-amber-700 dark:text-amber-300">
              {builderStage === "basics"
                ? getI18nOrFallback(
                    t,
                    "builderNeedValidName",
                    "Define a valid combo name before continuing."
                  )
                : getI18nOrFallback(
                    t,
                    "addStepBeforeContinue",
                    "Add at least one step before continuing to the next stage."
                  )}
            </div>
          )}
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
