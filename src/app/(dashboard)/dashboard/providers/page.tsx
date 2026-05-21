"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardSkeleton,
  Badge,
  Button,
  Input,
  Toggle,
  CollapsibleSection,
} from "@/shared/components";
import {
  FREE_PROVIDERS,
  OAUTH_PROVIDERS,
  AGGREGATOR_PROVIDER_IDS,
  EMBEDDING_RERANK_PROVIDER_IDS,
  ENTERPRISE_CLOUD_PROVIDER_IDS,
  IDE_PROVIDER_IDS,
  IMAGE_ONLY_PROVIDER_IDS,
  VIDEO_PROVIDER_IDS,
  isClaudeCodeCompatibleProvider,
  CLOUD_AGENT_PROVIDERS,
} from "@/shared/constants/providers";
import { useRouter, useSearchParams } from "next/navigation";
import { getErrorCode, getRelativeTime } from "@/shared/utils";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import {
  buildMergedOAuthProviderEntries,
  buildStaticProviderEntries,
  filterConfiguredProviderEntries,
  shouldApplyConfiguredOnlyFilter,
  shouldShowFirstProviderHint,
} from "./providerPageUtils";
import type { ProviderEntry } from "./providerPageUtils";
import { readConfiguredOnlyPreference, writeConfiguredOnlyPreference } from "./providerPageStorage";
import {
  getCodexEffectiveFastServiceTier,
  isCodexGlobalFastServiceTierEnabled,
} from "@/lib/providers/codexFastTier";
import AddCompatibleProviderModal from "./components/AddCompatibleProviderModal";
import ProviderCard from "./components/ProviderCard";
import ProviderCountBadge from "./components/ProviderCountBadge";

function countConfigured<T>(entries: ProviderEntry<T>[]) {
  return {
    configured: entries.filter((entry) => Number(entry.stats?.total || 0) > 0).length,
    total: entries.length,
  };
}

type ProviderBatchTestResult = {
  connectionId?: string;
  connectionName?: string;
  provider?: string;
  valid?: boolean;
  latencyMs?: number;
  diagnosis?: { type?: string };
};

type ProviderBatchTestResults = {
  mode?: string;
  results?: ProviderBatchTestResult[];
  summary?: {
    total?: number;
    passed?: number;
    failed?: number;
  };
  error?: string | { message?: string };
};

function getConnectionErrorTag(connection) {
  if (!connection) return null;

  const explicitType = connection.lastErrorType;
  if (explicitType === "runtime_error") return "Runtime";
  if (
    explicitType === "upstream_auth_error" ||
    explicitType === "auth_missing" ||
    explicitType === "token_refresh_failed" ||
    explicitType === "token_expired"
  ) {
    return "Auth";
  }
  if (explicitType === "upstream_rate_limited") return "Rate limited";
  if (explicitType === "upstream_unavailable") return "Server error";
  if (explicitType === "network_error") return "Network";

  const numericCode = Number(connection.errorCode);
  if (Number.isFinite(numericCode) && numericCode >= 400) {
    return String(numericCode);
  }

  const fromMessage = getErrorCode(connection.lastError);
  if (fromMessage === "401" || fromMessage === "403") return "Auth";
  if (fromMessage && fromMessage !== "ERR") return fromMessage;

  const msg = (connection.lastError || "").toLowerCase();
  if (msg.includes("runtime") || msg.includes("not runnable") || msg.includes("not installed"))
    return "Runtime";
  if (
    msg.includes("invalid api key") ||
    msg.includes("token invalid") ||
    msg.includes("revoked") ||
    msg.includes("unauthorized")
  )
    return "Auth";

  return "ERR";
}

export default function ProvidersPage() {
  const router = useRouter();
  const [connections, setConnections] = useState<any[]>([]);
  const [providerNodes, setProviderNodes] = useState<any[]>([]);
  const [ccCompatibleProviderEnabled, setCcCompatibleProviderEnabled] = useState(false);
  const [expirations, setExpirations] = useState<any>(null);
  const [codexGlobalFastServiceTier, setCodexGlobalFastServiceTier] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAllProviders, setShowAllProviders] = useState(false);
  const [showAddCompatibleModal, setShowAddCompatibleModal] = useState(false);
  const [showAddAnthropicCompatibleModal, setShowAddAnthropicCompatibleModal] = useState(false);
  const [showAddCcCompatibleModal, setShowAddCcCompatibleModal] = useState(false);
  const [testingMode, setTestingMode] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any>(null);
  const [showConfiguredOnly, setShowConfiguredOnly] = useState(false);
  const [configuredOnlyPreferenceReady, setConfiguredOnlyPreferenceReady] = useState(false);
  const [oauthEnvRepairStatus, setOauthEnvRepairStatus] = useState<{
    available: boolean;
    missingCount: number;
  } | null>(null);
  const [repairingEnv, setRepairingEnv] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const notify = useNotificationStore();
  const showSection = (category: string) => !activeCategory || activeCategory === category;
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const ccCompatibleLabel = t("ccCompatibleLabel");
  const addCcCompatibleLabel = t("addCcCompatible");
  const searchParams = useSearchParams();

  useEffect(() => {
    setShowConfiguredOnly(readConfiguredOnlyPreference());
    setConfiguredOnlyPreferenceReady(true);
  }, []);

  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [connectionsRes, nodesRes, expirationsRes, settingsRes] = await Promise.all([
          fetch("/api/providers"),
          fetch("/api/provider-nodes"),
          fetch("/api/providers/expiration"),
          fetch("/api/settings", { cache: "no-store" }),
        ]);
        const connectionsData = await connectionsRes.json();
        const nodesData = await nodesRes.json();
        const expirationsData = await expirationsRes.json();
        const settingsData = settingsRes.ok ? await settingsRes.json() : null;
        if (connectionsRes.ok) setConnections(connectionsData.connections || []);
        if (nodesRes.ok) {
          setProviderNodes(nodesData.nodes || []);
          setCcCompatibleProviderEnabled(nodesData.ccCompatibleProviderEnabled === true);
        }
        if (expirationsRes.ok && expirationsData) setExpirations(expirationsData);
        setCodexGlobalFastServiceTier(isCodexGlobalFastServiceTierEnabled(settingsData));
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!configuredOnlyPreferenceReady) return;

    writeConfiguredOnlyPreference(showConfiguredOnly);
  }, [configuredOnlyPreferenceReady, showConfiguredOnly]);

  const fetchOauthEnvRepairStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/system/env/repair", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setOauthEnvRepairStatus({
          available: Boolean(data.available),
          missingCount: Number(data.missingCount || 0),
        });
      } else {
        setOauthEnvRepairStatus(null);
      }
    } catch {
      setOauthEnvRepairStatus(null);
    }
  }, []);

  useEffect(() => {
    void fetchOauthEnvRepairStatus();
  }, [fetchOauthEnvRepairStatus]);

  const handleRepairEnv = async () => {
    if (!oauthEnvRepairStatus?.available || repairingEnv) return;

    setRepairingEnv(true);
    try {
      const res = await fetch("/api/system/env/repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || t("repairEnvFailed"));
      }
      notify.success(
        data.backupPath ? `${t("repairEnvSuccess")} (${data.backupPath})` : t("repairEnvSuccess")
      );
      await fetchOauthEnvRepairStatus();
    } catch (error) {
      notify.error(error instanceof Error ? error.message : t("repairEnvFailed"));
    } finally {
      setRepairingEnv(false);
    }
  };

  const getProviderStats = (providerId, authType) => {
    const providerConnections = connections.filter((c) => {
      if (c.provider !== providerId) return false;
      if (authType === "free") return true;
      return c.authType === authType;
    });

    // Helper: check if connection is effectively active (cooldown expired)
    const getEffectiveStatus = (conn) => {
      const isCooldown =
        conn.rateLimitedUntil && new Date(conn.rateLimitedUntil).getTime() > Date.now();
      return conn.testStatus === "unavailable" && !isCooldown ? "active" : conn.testStatus;
    };

    const connected = providerConnections.filter((c) => {
      const status = getEffectiveStatus(c);
      return status === "active" || status === "success";
    }).length;

    const errorConns = providerConnections.filter((c) => {
      const status = getEffectiveStatus(c);
      return status === "error" || status === "expired" || status === "unavailable";
    });

    const error = errorConns.length;
    const total = providerConnections.length;

    // Check if all connections are manually disabled
    const allDisabled = total > 0 && providerConnections.every((c) => c.isActive === false);

    // Get latest error info
    const latestError = errorConns.sort(
      (a: any, b: any) =>
        (new Date(b.lastErrorAt || 0) as any) - (new Date(a.lastErrorAt || 0) as any)
    )[0];
    const errorCode = latestError ? getConnectionErrorTag(latestError) : null;
    const errorTime = latestError?.lastErrorAt ? getRelativeTime(latestError.lastErrorAt) : null;

    // Check expirations
    const providerExpirations =
      expirations?.list?.filter((e: any) => e.provider === providerId) || [];
    const hasExpired = providerExpirations.some((e: any) => e.status === "expired");
    const hasExpiringSoon = providerExpirations.some((e: any) => e.status === "expiring_soon");
    let expiryStatus = null;
    if (hasExpired) expiryStatus = "expired";
    else if (hasExpiringSoon) expiryStatus = "expiring_soon";

    const codexFastActive =
      providerId === "codex" &&
      (codexGlobalFastServiceTier ||
        providerConnections.some((connection) =>
          getCodexEffectiveFastServiceTier(connection.providerSpecificData, false)
        ));

    // Count API keys in "warning" state across all connections
    const warning = providerConnections.reduce((warnCount, conn) => {
      const health = (conn as any).providerSpecificData?.apiKeyHealth as
        | Record<string, { status: string }>
        | undefined;
      if (!health) return warnCount;
      return warnCount + Object.values(health).filter((h) => h.status === "warning").length;
    }, 0);

    return {
      connected,
      error,
      warning,
      total,
      errorCode,
      errorTime,
      allDisabled,
      expiryStatus,
      codexFastActive,
    };
  };

  // Toggle all connections for a provider on/off
  const handleToggleProvider = async (providerId: string, authType: string, newActive: boolean) => {
    const providerConns = connections.filter((c) => {
      if (c.provider !== providerId) return false;
      if (authType === "free") return true;
      return c.authType === authType;
    });
    // Optimistically update UI
    setConnections((prev) =>
      prev.map((c) =>
        c.provider === providerId && (authType === "free" || c.authType === authType)
          ? { ...c, isActive: newActive }
          : c
      )
    );
    // Fire API calls in parallel
    await Promise.allSettled(
      providerConns.map((c) =>
        fetch(`/api/providers/${c.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: newActive }),
        })
      )
    );
  };

  const handleBatchTest = async (mode, providerId = null) => {
    if (testingMode) return;
    setTestingMode(mode === "provider" ? providerId : mode);
    setTestResults(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90_000); // 90s max
    try {
      const res = await fetch("/api/providers/test-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, providerId }),
        signal: controller.signal,
      });
      let data: any;
      try {
        data = await res.json();
      } catch {
        // Response body is not valid JSON (e.g. truncated due to timeout)
        data = { error: t("providerTestFailed"), results: [], summary: null };
      }
      setTestResults({
        ...data,
        // Normalize error: if API returns an error object { message, details }, extract the string
        error: data.error
          ? typeof data.error === "object"
            ? data.error.message || data.error.error || JSON.stringify(data.error)
            : String(data.error)
          : null,
      });
      if (data?.summary) {
        const { passed, failed, total } = data.summary;
        if (failed === 0) notify.success(t("allTestsPassed", { total }));
        else notify.warning(t("testSummary", { passed, failed, total }));
      }
    } catch (error: any) {
      const isAbort = error?.name === "AbortError";
      const msg = isAbort ? t("providerTestTimeout") : t("providerTestFailed");
      setTestResults({ error: msg, results: [], summary: null });
      notify.error(msg);
    } finally {
      clearTimeout(timeoutId);
      setTestingMode(null);
    }
  };

  const compatibleProviders = providerNodes
    .filter((node) => node.type === "openai-compatible")
    .map((node) => ({
      id: node.id,
      name: node.name || t("openaiCompatibleName"),
      color: "#10A37F",
      textIcon: "OC",
      apiType: node.apiType,
    }));

  const anthropicCompatibleProviders = providerNodes
    .filter(
      (node) => node.type === "anthropic-compatible" && !isClaudeCodeCompatibleProvider(node.id)
    )
    .map((node) => ({
      id: node.id,
      name: node.name || t("anthropicCompatibleName"),
      color: "#D97757",
      textIcon: "AC",
    }));

  const ccCompatibleProviders = providerNodes
    .filter(
      (node) => node.type === "anthropic-compatible" && isClaudeCodeCompatibleProvider(node.id)
    )
    .map((node) => ({
      id: node.id,
      name: node.name || ccCompatibleLabel,
      color: "#B45309",
      textIcon: "CC",
    }));

  const effectiveShowConfiguredOnly = shouldApplyConfiguredOnlyFilter(
    showConfiguredOnly,
    connections.length
  );

  const oauthProviderEntriesAll = buildMergedOAuthProviderEntries(
    OAUTH_PROVIDERS,
    FREE_PROVIDERS,
    getProviderStats
  );
  const oauthProviderEntries = filterConfiguredProviderEntries(
    oauthProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const apiKeyProviderEntriesAll = buildStaticProviderEntries("apikey", getProviderStats);
  const llmProviderEntries = filterConfiguredProviderEntries(
    apiKeyProviderEntriesAll.filter(
      (entry) =>
        !IMAGE_ONLY_PROVIDER_IDS.has(entry.providerId) &&
        !AGGREGATOR_PROVIDER_IDS.has(entry.providerId) &&
        !ENTERPRISE_CLOUD_PROVIDER_IDS.has(entry.providerId) &&
        !VIDEO_PROVIDER_IDS.has(entry.providerId) &&
        !EMBEDDING_RERANK_PROVIDER_IDS.has(entry.providerId)
    ),
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );
  const aggregatorProviderEntries = filterConfiguredProviderEntries(
    apiKeyProviderEntriesAll.filter((entry) => AGGREGATOR_PROVIDER_IDS.has(entry.providerId)),
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );
  const imageProviderEntries = filterConfiguredProviderEntries(
    apiKeyProviderEntriesAll.filter((entry) => IMAGE_ONLY_PROVIDER_IDS.has(entry.providerId)),
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );
  const enterpriseProviderEntries = filterConfiguredProviderEntries(
    apiKeyProviderEntriesAll.filter((entry) => ENTERPRISE_CLOUD_PROVIDER_IDS.has(entry.providerId)),
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );
  const videoProviderEntries = filterConfiguredProviderEntries(
    apiKeyProviderEntriesAll.filter((entry) => VIDEO_PROVIDER_IDS.has(entry.providerId)),
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );
  const embeddingRerankProviderEntries = filterConfiguredProviderEntries(
    apiKeyProviderEntriesAll.filter((entry) => EMBEDDING_RERANK_PROVIDER_IDS.has(entry.providerId)),
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const webCookieProviderEntriesAll = buildStaticProviderEntries("web-cookie", getProviderStats);
  const webCookieProviderEntries = filterConfiguredProviderEntries(
    webCookieProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const localProviderEntriesAll = buildStaticProviderEntries("local", getProviderStats);
  const localProviderEntries = filterConfiguredProviderEntries(
    localProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const searchProviderEntriesAll = buildStaticProviderEntries("search", getProviderStats);
  const searchProviderEntries = filterConfiguredProviderEntries(
    searchProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const audioProviderEntriesAll = buildStaticProviderEntries("audio", getProviderStats);
  const audioProviderEntries = filterConfiguredProviderEntries(
    audioProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const cloudAgentProviderEntriesAll = buildStaticProviderEntries("cloud-agent", getProviderStats);
  const cloudAgentProviderEntries = filterConfiguredProviderEntries(
    cloudAgentProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const upstreamProxyEntriesAll = buildStaticProviderEntries("upstream-proxy", getProviderStats);
  const upstreamProxyEntries = filterConfiguredProviderEntries(
    upstreamProxyEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const compatibleProviderEntriesAll = [
    ...compatibleProviders.map((provider) => ({
      providerId: provider.id,
      provider,
      stats: getProviderStats(provider.id, "apikey"),
      displayAuthType: "compatible" as const,
      toggleAuthType: "apikey" as const,
    })),
    ...anthropicCompatibleProviders.map((provider) => ({
      providerId: provider.id,
      provider,
      stats: getProviderStats(provider.id, "apikey"),
      displayAuthType: "compatible" as const,
      toggleAuthType: "apikey" as const,
    })),
    ...ccCompatibleProviders.map((provider) => ({
      providerId: provider.id,
      provider,
      stats: getProviderStats(provider.id, "apikey"),
      displayAuthType: "compatible" as const,
      toggleAuthType: "apikey" as const,
    })),
  ];
  const compatibleProviderEntries = filterConfiguredProviderEntries(
    compatibleProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const FREE_SECTION_IDS = new Set([
    "kiro",
    "amazon-q",
    "gemini-cli",
    "qoder",
    "pollinations",
    "llm7",
    "opencode",
    "gemini",
    "groq",
    "cerebras",
    "mistral",
    "nvidia",
    "openrouter",
    "cloudflare-ai",
    "together",
    "siliconflow",
    "deepseek",
    "longcat",
    "glhf",
    "morph",
    "bazaarlink",
    "uncloseai",
    "completions",
    "freetheai",
    "enally",
    "puter",
    "blackbox",
  ]);
  const freeSectionEntriesAll = [...oauthProviderEntriesAll, ...apiKeyProviderEntriesAll].filter(
    (e) => FREE_SECTION_IDS.has(e.providerId)
  );
  const freeSectionEntries = filterConfiguredProviderEntries(
    freeSectionEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery
  );

  // IDE providers: subset of oauth/apikey providers that are editors/IDEs with
  // built-in AI subscription. Rendered in a dedicated "IDE Providers" section
  // and excluded from the regular OAuth/API Key sections to avoid duplication.
  const ideProviderEntriesAll = [...oauthProviderEntriesAll, ...apiKeyProviderEntriesAll].filter(
    (e) => IDE_PROVIDER_IDS.has(e.providerId)
  );
  const ideProviderEntries = filterConfiguredProviderEntries(
    ideProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly
  );

  const oauthOnlyEntriesAll = oauthProviderEntriesAll
    .filter((e) => e.toggleAuthType === "oauth")
    .filter((e) => !IDE_PROVIDER_IDS.has(e.providerId));
  const summaryStats = {
    all: {
      configured:
        oauthProviderEntriesAll.filter((e) => Number(e.stats?.total || 0) > 0).length +
        apiKeyProviderEntriesAll.filter((e) => Number(e.stats?.total || 0) > 0).length,
      total: oauthProviderEntriesAll.length + apiKeyProviderEntriesAll.length,
    },
    free: countConfigured(freeSectionEntriesAll),
    oauth: countConfigured(oauthOnlyEntriesAll),
    apikey: countConfigured(apiKeyProviderEntriesAll),
    compatible: countConfigured(compatibleProviderEntriesAll),
    webcookie: countConfigured(webCookieProviderEntriesAll),
    search: countConfigured(searchProviderEntriesAll),
    audio: countConfigured(audioProviderEntriesAll),
    local: countConfigured(localProviderEntriesAll),
    cloudagent: countConfigured(cloudAgentProviderEntriesAll),
    ide: countConfigured(ideProviderEntriesAll),
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const showFirstProviderHint =
    shouldShowFirstProviderHint(connections.length, searchQuery) && !showAllProviders;

  return (
    <div className="flex flex-col gap-6">
      {showFirstProviderHint && (
        <Card padding="lg">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
              <span className="material-symbols-outlined text-[32px] text-primary">dns</span>
            </div>
            <h2 className="text-xl font-semibold text-text-main">
              {t("addFirstProvider") || "Add your first provider"}
            </h2>
            <p className="text-sm text-text-muted mt-2 max-w-md">
              {t("addFirstProviderDesc") ||
                "Connect an AI provider to start routing requests through OmniRoute. You can use free providers, API keys, or OAuth accounts."}
            </p>
            <a
              href="https://docs.omniroute.io/providers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors mt-4"
            >
              <span className="material-symbols-outlined text-[16px]">help</span>
              {t("learnMore") || "Learn more"}
            </a>
          </div>
        </Card>
      )}

      {/* Provider Summary Card */}
      <Card padding="sm">
        <div className="flex flex-col gap-3">
          {/* Row 1: Search + Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[160px]">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchProviders")}
                aria-label={t("searchProviders")}
                icon="search"
                inputClassName={searchQuery ? "pr-9" : ""}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-text-muted hover:text-text-primary transition-colors"
                  aria-label={tc("clear")}
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
            <Toggle
              size="sm"
              checked={effectiveShowConfiguredOnly}
              onChange={setShowConfiguredOnly}
              label={t("showConfiguredOnly")}
              disabled={connections.length === 0}
              className="rounded-lg border border-border bg-bg-subtle px-3 py-1.5"
            />
            <button
              onClick={() => handleBatchTest("all")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "all"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAll")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "all" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "all" ? t("testing") : t("testAll")}
            </button>
          </div>

          {/* Category filter pills with embedded counters */}
          <div className="border-t border-border pt-3 flex flex-wrap items-center gap-2">
            {(
              [
                { key: null, color: null, label: t("providerSummaryAll"), stat: summaryStats.all },
                {
                  key: "free",
                  color: "bg-green-500",
                  label: tc("free"),
                  stat: summaryStats.free,
                },
                {
                  key: "oauth",
                  color: "bg-blue-500",
                  label: t("oauthLabel"),
                  stat: summaryStats.oauth,
                },
                {
                  key: "apikey",
                  color: "bg-amber-500",
                  label: t("apiKeyLabel"),
                  stat: summaryStats.apikey,
                },
                {
                  key: "ide",
                  color: "bg-cyan-500",
                  label: "IDE",
                  stat: summaryStats.ide,
                },
                {
                  key: "compatible",
                  color: "bg-orange-500",
                  label: t("compatibleLabel"),
                  stat: summaryStats.compatible,
                },
                {
                  key: "webcookie",
                  color: "bg-purple-500",
                  label: "Web Cookie",
                  stat: summaryStats.webcookie,
                },
                {
                  key: "search",
                  color: "bg-teal-500",
                  label: "Search",
                  stat: summaryStats.search,
                },
                {
                  key: "audio",
                  color: "bg-rose-500",
                  label: "Audio",
                  stat: summaryStats.audio,
                },
                {
                  key: "local",
                  color: "bg-emerald-500",
                  label: "Local",
                  stat: summaryStats.local,
                },
                {
                  key: "cloudagent",
                  color: "bg-violet-500",
                  label: "Cloud Agent",
                  stat: summaryStats.cloudagent,
                },
              ] as Array<{
                key: string | null;
                color: string | null;
                label: string;
                stat: { configured: number; total: number };
              }>
            ).map((cat) => {
              const isActive =
                (cat.key === null && !activeCategory && !showFreeOnly) ||
                (cat.key === "free" && showFreeOnly) ||
                (cat.key !== "free" &&
                  cat.key !== null &&
                  !showFreeOnly &&
                  activeCategory === cat.key);
              return (
                <button
                  key={cat.key ?? "all"}
                  onClick={() => {
                    if (cat.key === null) {
                      setShowFreeOnly(false);
                      setActiveCategory(null);
                    } else if (cat.key === "free") {
                      setShowFreeOnly(true);
                      setActiveCategory(null);
                    } else {
                      setShowFreeOnly(false);
                      setActiveCategory(cat.key);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/30"
                  }`}
                  title={cat.label}
                >
                  {cat.color && <span className={`size-2 rounded-full shrink-0 ${cat.color}`} />}
                  <span>{cat.label}</span>
                  <span className={`text-[11px] ${isActive ? "text-white/80" : "text-text-muted"}`}>
                    {cat.stat.configured}
                    <span className="opacity-70">/{cat.stat.total}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* API Key Compatible Providers — dynamic (OpenAI/Anthropic compatible) */}
      {showSection("compatible") && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("compatibleProviders")}{" "}
              <span className="size-2.5 rounded-full bg-orange-500" title={t("compatibleLabel")} />
              <ProviderCountBadge {...countConfigured(compatibleProviderEntriesAll)} />
            </h2>
            <div className="flex flex-wrap gap-2">
              {(compatibleProviders.length > 0 ||
                anthropicCompatibleProviders.length > 0 ||
                ccCompatibleProviders.length > 0) && (
                <button
                  onClick={() => handleBatchTest("compatible")}
                  disabled={!!testingMode}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    testingMode === "compatible"
                      ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                      : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
                  }`}
                  title={t("testAllCompatible")}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {testingMode === "compatible" ? "sync" : "play_arrow"}
                  </span>
                  {testingMode === "compatible" ? t("testing") : t("testAll")}
                </button>
              )}
              {ccCompatibleProviderEnabled && (
                <Button size="sm" icon="add" onClick={() => setShowAddCcCompatibleModal(true)}>
                  {addCcCompatibleLabel}
                </Button>
              )}
              <Button size="sm" icon="add" onClick={() => setShowAddAnthropicCompatibleModal(true)}>
                {t("addAnthropicCompatible")}
              </Button>
              <Button size="sm" icon="add" onClick={() => setShowAddCompatibleModal(true)}>
                {t("addOpenAICompatible")}
              </Button>
            </div>
          </div>
          {compatibleProviders.length === 0 &&
          anthropicCompatibleProviders.length === 0 &&
          ccCompatibleProviders.length === 0 ? (
            <div className="flex items-center justify-center gap-2 py-2 border border-dashed border-border rounded-xl text-text-muted text-sm">
              <span className="material-symbols-outlined text-[18px]">extension</span>
              <span>{t("noCompatibleYet")}</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {compatibleProviderEntries.map(
                ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                  <ProviderCard
                    key={providerId}
                    providerId={providerId}
                    provider={provider}
                    stats={stats}
                    authType={displayAuthType}
                    onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
                  />
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* Expiration Banner */}
      {expirations?.summary &&
        (expirations.summary.expired > 0 || expirations.summary.expiringSoon > 0) && (
          <div
            className={`p-4 rounded-xl flex items-start gap-3 border ${
              expirations.summary.expired > 0
                ? "bg-red-500/10 border-red-500/20"
                : "bg-amber-500/10 border-amber-500/20"
            }`}
          >
            <span
              className={`material-symbols-outlined text-[24px] ${
                expirations.summary.expired > 0 ? "text-red-500" : "text-amber-500"
              }`}
            >
              {expirations.summary.expired > 0 ? "error" : "warning"}
            </span>
            <div className="flex-1">
              <h3
                className={`font-semibold ${expirations.summary.expired > 0 ? "text-red-500" : "text-amber-500"}`}
              >
                {expirations.summary.expired > 0
                  ? t("expirationBannerExpired", { count: expirations.summary.expired })
                  : t("expirationBannerExpiringSoon", {
                      count: expirations.summary.expiringSoon,
                    })}
              </h3>
              <p className="text-sm mt-1 opacity-80 text-text-main">
                {expirations.summary.expired > 0
                  ? t("expirationBannerExpiredDesc")
                  : t("expirationBannerExpiringSoonDesc")}
              </p>
            </div>
          </div>
        )}

      {/* Free Tier Providers */}
      {showSection("free") && freeSectionEntries.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {t("freeTierProviders")}
                <span className="size-2.5 rounded-full bg-green-500" title={t("freeTierLabel")} />
                <ProviderCountBadge {...countConfigured(freeSectionEntriesAll)} />
              </h2>
              <p className="text-sm text-text-muted mt-1">{t("freeTierProvidersDesc")}</p>
            </div>
            <button
              onClick={() => handleBatchTest("free")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "free"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAll")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "free" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "free" ? t("testing") : t("testAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {freeSectionEntries.map(
              ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                <ProviderCard
                  key={`free-section-${providerId}`}
                  providerId={providerId}
                  provider={{ ...provider, hasFree: false }}
                  stats={stats}
                  authType={toggleAuthType === "free" ? "free" : displayAuthType}
                  onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
                />
              )
            )}
          </div>
        </div>
      )}

      {/* OAuth Providers (including providers that expose free tiers via OAuth) */}
      {showSection("oauth") && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("oauthProviders")}{" "}
              <span className="size-2.5 rounded-full bg-blue-500" title={t("oauthLabel")} />
              <ProviderCountBadge
                {...countConfigured(
                  oauthProviderEntriesAll.filter((e) => !IDE_PROVIDER_IDS.has(e.providerId))
                )}
              />
            </h2>
            <div className="flex items-center gap-2">
              {oauthEnvRepairStatus?.available && oauthEnvRepairStatus.missingCount > 0 && (
                <button
                  onClick={handleRepairEnv}
                  disabled={repairingEnv}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    repairingEnv
                      ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                      : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
                  }`}
                  title={t("repairEnvHint")}
                  aria-label={t("repairEnv")}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {repairingEnv ? "sync" : "settings_backup_restore"}
                  </span>
                  {repairingEnv ? t("repairEnvWorking") : t("repairEnv")}
                </button>
              )}
              <button
                onClick={() => handleBatchTest("oauth")}
                disabled={!!testingMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  testingMode === "oauth"
                    ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                    : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
                }`}
                title={t("testAllOAuth")}
                aria-label={t("testAllOAuth")}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {testingMode === "oauth" ? "sync" : "play_arrow"}
                </span>
                {testingMode === "oauth" ? t("testing") : t("testAll")}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {oauthProviderEntries
              .filter((e) => !IDE_PROVIDER_IDS.has(e.providerId))
              .map(({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                <ProviderCard
                  key={providerId}
                  providerId={providerId}
                  provider={provider}
                  stats={stats}
                  authType={displayAuthType}
                  onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
                />
              ))}
          </div>
        </div>
      )}

      {/* IDE Providers (Cursor, Zed, Trae) — editors with built-in AI subscription */}
      {showSection("ide") && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("ideProviders") || "IDE Providers"}{" "}
              <span
                className="size-2.5 rounded-full bg-cyan-500"
                title={t("ideProviders") || "IDE Providers"}
              />
              <ProviderCountBadge {...countConfigured(ideProviderEntriesAll)} />
            </h2>
            <button
              onClick={() => handleBatchTest("ide")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "ide"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAll")}
              aria-label={t("testAll")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "ide" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "ide" ? t("testing") : t("testAll")}
            </button>
          </div>
          <p className="text-sm text-text-muted -mt-2">
            {t("ideProvidersDesc") ||
              "Editors with built-in AI subscription. Use the provider page to import credentials directly from the IDE's keychain."}
          </p>
          {ideProviderEntries.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-bg-subtle p-6 text-center text-sm text-text-muted">
              {t("noIdeProviders") || "No IDE providers match the current filters."}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {ideProviderEntries.map(
                ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                  <ProviderCard
                    key={`ide-${providerId}`}
                    providerId={providerId}
                    provider={provider}
                    stats={stats}
                    authType={displayAuthType}
                    onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
                  />
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* API Key Providers — fixed list */}
      {showSection("apikey") && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("apiKeyProviders")}{" "}
              <span className="size-2.5 rounded-full bg-amber-500" title={t("apiKeyLabel")} />
              <ProviderCountBadge {...countConfigured(apiKeyProviderEntriesAll)} />
            </h2>
            <button
              onClick={() => handleBatchTest("apikey")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "apikey"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAllApiKey")}
              aria-label={t("testAllApiKey")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "apikey" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "apikey" ? t("testing") : t("testAll")}
            </button>
          </div>
          {llmProviderEntries.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("llmProviders")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {llmProviderEntries.map(
                  ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                    <ProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType={displayAuthType}
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}

          {aggregatorProviderEntries.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("aggregatorsGateways")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {aggregatorProviderEntries.map(
                  ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                    <ProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType={displayAuthType}
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}

          {enterpriseProviderEntries.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("enterpriseCloud")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {enterpriseProviderEntries.map(
                  ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                    <ProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType={displayAuthType}
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}

          {imageProviderEntries.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("imageProviders")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {imageProviderEntries.map(
                  ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                    <ProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType={displayAuthType}
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}

          {videoProviderEntries.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("videoProviders")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {videoProviderEntries.map(
                  ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                    <ProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType={displayAuthType}
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}

          {embeddingRerankProviderEntries.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("embeddingRerankProviders")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {embeddingRerankProviderEntries.map(
                  ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                    <ProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType={displayAuthType}
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Web / Cookie Providers */}
      {showSection("webcookie") && webCookieProviderEntries.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("webCookieProviders")}{" "}
              <span
                className="size-2.5 rounded-full bg-purple-500"
                title={t("webCookieProviders")}
              />
              <ProviderCountBadge {...countConfigured(webCookieProviderEntriesAll)} />
            </h2>
            <button
              onClick={() => handleBatchTest("web-cookie")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "web-cookie"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAll")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "web-cookie" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "web-cookie" ? t("testing") : t("testAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {webCookieProviderEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
              <ProviderCard
                key={providerId}
                providerId={providerId}
                provider={provider}
                stats={stats}
                authType="web-cookie"
                onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search Providers */}
      {showSection("search") && searchProviderEntries.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("searchProvidersHeading")}{" "}
              <span
                className="size-2.5 rounded-full bg-teal-500"
                title={t("searchProvidersHeading")}
              />
              <ProviderCountBadge {...countConfigured(searchProviderEntriesAll)} />
            </h2>
            <button
              onClick={() => handleBatchTest("search")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "search"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAll")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "search" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "search" ? t("testing") : t("testAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {searchProviderEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
              <ProviderCard
                key={providerId}
                providerId={providerId}
                provider={provider}
                stats={stats}
                authType="search"
                onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Audio Only Providers */}
      {showSection("audio") && audioProviderEntries.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("audioProvidersHeading")}{" "}
              <span
                className="size-2.5 rounded-full bg-rose-500"
                title={t("audioProvidersHeading")}
              />
              <ProviderCountBadge {...countConfigured(audioProviderEntriesAll)} />
            </h2>
            <button
              onClick={() => handleBatchTest("audio")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "audio"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAll")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "audio" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "audio" ? t("testing") : t("testAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {audioProviderEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
              <ProviderCard
                key={providerId}
                providerId={providerId}
                provider={provider}
                stats={stats}
                authType="audio"
                onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Cloud Agent Providers */}
      {showSection("cloudagent") && cloudAgentProviderEntries.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("cloudAgentProviders")}{" "}
              <span
                className="size-2.5 rounded-full bg-violet-500"
                title={t("cloudAgentProviders")}
              />
              <ProviderCountBadge {...countConfigured(cloudAgentProviderEntriesAll)} />
            </h2>
            <button
              onClick={() => handleBatchTest("cloud-agent")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "cloud-agent"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAll")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "cloud-agent" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "cloud-agent" ? t("testing") : t("testAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {cloudAgentProviderEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
              <ProviderCard
                key={providerId}
                providerId={providerId}
                provider={provider}
                stats={stats}
                authType="cloud-agent"
                onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Local / Self-Hosted Providers */}
      {showSection("local") && localProviderEntries.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("localProviders")}{" "}
              <span className="size-2.5 rounded-full bg-emerald-500" title={t("localProviders")} />
              <ProviderCountBadge {...countConfigured(localProviderEntriesAll)} />
            </h2>
            <button
              onClick={() => handleBatchTest("local")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "local"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAll")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "local" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "local" ? t("testing") : t("testAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {localProviderEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
              <ProviderCard
                key={providerId}
                providerId={providerId}
                provider={provider}
                stats={stats}
                authType="local"
                onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upstream Proxy Providers */}
      {upstreamProxyEntries.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
              {t("upstreamProxyProviders")}{" "}
              <span
                className="size-2.5 rounded-full bg-indigo-500"
                title={t("upstreamProxyProviders")}
              />
              <ProviderCountBadge {...countConfigured(upstreamProxyEntriesAll)} />
            </h2>
            <button
              onClick={() => handleBatchTest("upstream-proxy")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "upstream-proxy"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title={t("testAll")}
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "upstream-proxy" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "upstream-proxy" ? t("testing") : t("testAll")}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {upstreamProxyEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
              <ProviderCard
                key={providerId}
                providerId={providerId}
                provider={provider}
                stats={stats}
                authType="upstream-proxy"
                onToggle={(active) => handleToggleProvider(providerId, toggleAuthType, active)}
              />
            ))}
          </div>
        </div>
      )}

      <AddCompatibleProviderModal
        isOpen={showAddCompatibleModal}
        mode="openai"
        onClose={() => setShowAddCompatibleModal(false)}
        onCreated={(node) => {
          setProviderNodes((prev) => [...prev, node]);
          setShowAddCompatibleModal(false);
          router.push(`/dashboard/providers/${node.id}`);
        }}
      />
      <AddCompatibleProviderModal
        isOpen={showAddAnthropicCompatibleModal}
        mode="anthropic"
        onClose={() => setShowAddAnthropicCompatibleModal(false)}
        onCreated={(node) => {
          setProviderNodes((prev) => [...prev, node]);
          setShowAddAnthropicCompatibleModal(false);
          router.push(`/dashboard/providers/${node.id}`);
        }}
      />
      {ccCompatibleProviderEnabled && (
        <AddCompatibleProviderModal
          isOpen={showAddCcCompatibleModal}
          mode="cc"
          title={addCcCompatibleLabel}
          onClose={() => setShowAddCcCompatibleModal(false)}
          onCreated={(node) => {
            setProviderNodes((prev) => [...prev, node]);
            setShowAddCcCompatibleModal(false);
            router.push(`/dashboard/providers/${node.id}`);
          }}
        />
      )}
      {/* Test Results Modal */}
      {testResults && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]"
          onClick={() => setTestResults(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-bg-primary border border-border rounded-xl w-full max-w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-border bg-bg-primary/95 backdrop-blur-sm rounded-t-xl">
              <h3 className="font-semibold">{t("testResults")}</h3>
              <button
                onClick={() => setTestResults(null)}
                className="p-1 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
                aria-label={tc("close")}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-5">
              <ProviderTestResultsView results={testResults} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Provider Test Results View (mirrors combo TestResultsView) ──────────────

function ProviderTestResultsView({ results }: { results: ProviderBatchTestResults }) {
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

  // Guard: never crash on malformed/null results (would trigger error boundary)
  if (!results || typeof results !== "object") {
    return null;
  }

  if (results.error && (!results.results || results.results.length === 0)) {
    return (
      <div className="text-center py-6">
        <span className="material-symbols-outlined text-red-500 text-[32px] mb-2 block">error</span>
        <p className="text-sm text-red-400">
          {typeof results.error === "object"
            ? results.error?.message || JSON.stringify(results.error)
            : String(results.error)}
        </p>
      </div>
    );
  }

  const summary = results.summary ?? null;
  const mode = results.mode ?? "";
  const items = Array.isArray(results.results) ? results.results : [];

  const modeLabel =
    {
      oauth: t("oauthLabel"),
      free: tc("free"),
      apikey: t("apiKeyLabel"),
      compatible: t("compatibleLabel"),
      provider: t("providerLabel"),
      all: tc("all"),
    }[mode] || mode;

  return (
    <div className="flex flex-col gap-3">
      {/* Summary header */}
      {summary && (
        <div className="flex items-center gap-3 text-xs mb-1">
          <span className="text-text-muted">{t("modeTest", { mode: modeLabel })}</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-medium">
            {t("passedCount", { count: summary.passed })}
          </span>
          {summary.failed > 0 && (
            <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-medium">
              {t("failedCount", { count: summary.failed })}
            </span>
          )}
          <span className="text-text-muted ml-auto">
            {t("testedCount", { count: summary.total })}
          </span>
        </div>
      )}

      {/* Individual results */}
      {items.map((r, i) => (
        <div
          key={r.connectionId || i}
          className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03]"
        >
          <span
            className={`material-symbols-outlined text-[16px] ${
              r.valid ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {r.valid ? "check_circle" : "error"}
          </span>
          <div className="flex-1 min-w-0">
            <span className="font-medium">
              {pickDisplayValue([r.connectionName], emailsVisible, r.connectionName)}
            </span>
            <span className="text-text-muted ml-1.5">({r.provider})</span>
          </div>
          {r.latencyMs !== undefined && (
            <span className="text-text-muted font-mono tabular-nums">
              {t("millisecondsAbbr", { value: r.latencyMs })}
            </span>
          )}
          <span
            className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
              r.valid ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
            }`}
          >
            {r.valid ? t("okShort") : r.diagnosis?.type || t("errorShort")}
          </span>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center py-4 text-text-muted text-sm">
          {t("noActiveConnectionsInGroup")}
        </div>
      )}
    </div>
  );
}
