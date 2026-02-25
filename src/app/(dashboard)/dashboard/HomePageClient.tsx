"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardSkeleton, Button, Modal } from "@/shared/components";
import { AI_PROVIDERS, FREE_PROVIDERS, OAUTH_PROVIDERS } from "@/shared/constants/providers";
import { useNotificationStore } from "@/store/notificationStore";

export default function HomePageClient({ machineId }) {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const [providerConnections, setProviderConnections] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState("/v1");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providerMetrics, setProviderMetrics] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.origin}/v1`);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [provRes, modelsRes, metricsRes] = await Promise.all([
        fetch("/api/providers"),
        fetch("/api/models"),
        fetch("/api/provider-metrics"),
      ]);
      if (provRes.ok) {
        const provData = await provRes.json();
        setProviderConnections(provData.connections || []);
      }
      if (modelsRes.ok) {
        const modelsData = await modelsRes.json();
        setModels(modelsData.models || []);
      }
      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setProviderMetrics(metricsData.metrics || {});
      }
    } catch (e) {
      console.log("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const providerStats = useMemo(() => {
    return Object.entries(AI_PROVIDERS).map(([providerId, providerInfo]) => {
      const connections = providerConnections.filter((conn) => conn.provider === providerId);
      const connected = connections.filter(
        (conn) =>
          conn.isActive !== false &&
          (conn.testStatus === "active" ||
            conn.testStatus === "success" ||
            conn.testStatus === "unknown")
      ).length;
      const errors = connections.filter(
        (conn) =>
          conn.isActive !== false &&
          (conn.testStatus === "error" ||
            conn.testStatus === "expired" ||
            conn.testStatus === "unavailable")
      ).length;

      const providerKeys = new Set([providerId, providerInfo.alias].filter(Boolean));
      const providerModels = models.filter((m) => providerKeys.has(m.provider));

      // Determine auth type
      const authType = FREE_PROVIDERS[providerId]
        ? "free"
        : OAUTH_PROVIDERS[providerId]
          ? "oauth"
          : "apikey";

      return {
        id: providerId,
        provider: providerInfo,
        total: connections.length,
        connected,
        errors,
        modelCount: providerModels.length,
        authType,
      };
    });
  }, [providerConnections, models]);

  // Models for selected provider
  const selectedProviderModels = useMemo(() => {
    if (!selectedProvider) return [];
    const providerKeys = new Set(
      [selectedProvider.id, selectedProvider.provider?.alias].filter(Boolean)
    );
    return models.filter((m) => providerKeys.has(m.provider));
  }, [selectedProvider, models]);

  const quickStartLinks = [
    { label: t("documentation"), href: "/docs", icon: "menu_book" },
    { label: tc("provider") + "s", href: "/dashboard/providers", icon: "dns" },
    { label: "Combos", href: "/dashboard/combos", icon: "layers" },
    { label: "Analytics", href: "/dashboard/analytics", icon: "analytics" },
    { label: t("healthMonitor"), href: "/dashboard/health", icon: "health_and_safety" },
    { label: "CLI Tools", href: "/dashboard/cli-tools", icon: "terminal" },
    {
      label: t("reportIssue"),
      href: "https://github.com/diegosouzapw/OmniRoute/issues",
      external: true,
      icon: "bug_report",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const currentEndpoint = baseUrl;

  return (
    <div className="flex flex-col gap-8">
      {/* Quick Start */}
      <Card>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{t("quickStart")}</h2>
              <p className="text-sm text-text-muted">{t("quickStartDesc")}</p>
            </div>
            <Link
              href="/docs"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">menu_book</span>
              {t("fullDocs")}
            </Link>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="rounded-lg border border-border bg-bg-subtle p-4 flex gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">key</span>
              </div>
              <div>
                <span className="font-semibold">{t("step1Title")}</span>
                <p className="text-text-muted mt-0.5">
                  Go to{" "}
                  <Link href="/dashboard/endpoint" className="text-primary hover:underline">
                    Endpoint
                  </Link>{" "}
                  → Registered Keys. Generate one key per environment.
                </p>
              </div>
            </li>
            <li className="rounded-lg border border-border bg-bg-subtle p-4 flex gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-green-500/10 text-green-500 shrink-0">
                <span className="material-symbols-outlined text-[18px]">dns</span>
              </div>
              <div>
                <span className="font-semibold">{t("step2Title")}</span>
                <p className="text-text-muted mt-0.5">
                  Add accounts in{" "}
                  <Link href="/dashboard/providers" className="text-primary hover:underline">
                    Providers
                  </Link>
                  . Supports OAuth, API Key, and free tiers.
                </p>
              </div>
            </li>
            <li className="rounded-lg border border-border bg-bg-subtle p-4 flex gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                <span className="material-symbols-outlined text-[18px]">link</span>
              </div>
              <div>
                <span className="font-semibold">{t("step3Title")}</span>
                <p className="text-text-muted mt-0.5">
                  Set base URL to{" "}
                  <code className="px-1.5 py-0.5 rounded bg-surface text-xs font-mono">
                    {currentEndpoint}
                  </code>{" "}
                  in your IDE or API client.
                </p>
              </div>
            </li>
            <li className="rounded-lg border border-border bg-bg-subtle p-4 flex gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                <span className="material-symbols-outlined text-[18px]">analytics</span>
              </div>
              <div>
                <span className="font-semibold">{t("step4Title")}</span>
                <p className="text-text-muted mt-0.5">
                  Track tokens, cost and errors in{" "}
                  <Link href="/dashboard/usage" className="text-primary hover:underline">
                    Request Logs
                  </Link>{" "}
                  and{" "}
                  <Link href="/dashboard/analytics" className="text-primary hover:underline">
                    Analytics
                  </Link>
                  .
                </p>
              </div>
            </li>
          </ol>

          <div className="flex flex-wrap gap-2">
            {quickStartLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {link.icon || (link.external ? "open_in_new" : "arrow_forward")}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Card>

      {/* Providers Overview */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{t("providersOverview")}</h2>
            <p className="text-sm text-text-muted">
              {providerStats.filter((item) => item.total > 0).length} configured of{" "}
              {providerStats.length} available providers
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-[11px] text-text-muted">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-green-500" /> Free
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-blue-500" /> OAuth
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-amber-500" /> API Key
              </span>
            </div>
            <Link
              href="/dashboard/providers"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">settings</span>
              Manage
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {providerStats.map((item) => (
            <ProviderOverviewCard
              key={item.id}
              item={item}
              metrics={providerMetrics[item.provider.alias] || providerMetrics[item.id]}
              onClick={() => setSelectedProvider(item)}
            />
          ))}
        </div>
      </Card>

      {/* Provider Models Modal */}
      {selectedProvider && (
        <ProviderModelsModal
          provider={selectedProvider}
          models={selectedProviderModels}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}

HomePageClient.propTypes = {
  machineId: PropTypes.string,
};

function ProviderOverviewCard({ item, metrics, onClick }) {
  const [imgError, setImgError] = useState(false);

  const statusVariant =
    item.errors > 0 ? "text-red-500" : item.connected > 0 ? "text-green-500" : "text-text-muted";

  const authTypeConfig = {
    free: { color: "bg-green-500", label: "Free" },
    oauth: { color: "bg-blue-500", label: "OAuth" },
    apikey: { color: "bg-amber-500", label: "API Key" },
  };
  const authInfo = authTypeConfig[item.authType] || authTypeConfig.apikey;

  return (
    <button
      onClick={onClick}
      className="border border-border rounded-lg p-3 hover:bg-surface/40 transition-colors text-left cursor-pointer w-full"
    >
      <div className="flex items-center gap-2.5">
        <div
          className="size-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${item.provider.color || "#888"}15` }}
        >
          {imgError ? (
            <span
              className="text-[10px] font-bold"
              style={{ color: item.provider.color || "#888" }}
            >
              {item.provider.textIcon || item.provider.id.slice(0, 2).toUpperCase()}
            </span>
          ) : (
            <Image
              src={`/providers/${item.provider.id}.png`}
              alt={item.provider.name}
              width={26}
              height={26}
              className="object-contain rounded-lg"
              sizes="26px"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold truncate">{item.provider.name}</p>
            <span
              className={`size-2 rounded-full ${authInfo.color} shrink-0`}
              title={authInfo.label}
            />
          </div>
          <p className={`text-xs ${statusVariant}`}>
            {item.total === 0
              ? tc("notConfigured")
              : `${item.connected} active · ${item.errors} error`}
          </p>
          {metrics && metrics.totalRequests > 0 && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-text-muted">
                <span className="text-emerald-500">{metrics.totalSuccesses}</span>/
                {metrics.totalRequests} reqs
              </span>
              <span className="text-[10px] text-text-muted">{metrics.successRate}%</span>
              <span className="text-[10px] text-text-muted">~{metrics.avgLatencyMs}ms</span>
            </div>
          )}
        </div>

        <div className="text-right shrink-0">
          <p className="text-xs font-medium text-text-main">{item.modelCount}</p>
          <p className="text-[10px] text-text-muted">models</p>
        </div>
      </div>
    </button>
  );
}

ProviderOverviewCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    provider: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
      textIcon: PropTypes.string,
      alias: PropTypes.string,
    }).isRequired,
    total: PropTypes.number.isRequired,
    connected: PropTypes.number.isRequired,
    errors: PropTypes.number.isRequired,
    modelCount: PropTypes.number.isRequired,
    authType: PropTypes.string.isRequired,
  }).isRequired,
  metrics: PropTypes.shape({
    totalRequests: PropTypes.number,
    totalSuccesses: PropTypes.number,
    successRate: PropTypes.number,
    avgLatencyMs: PropTypes.number,
  }),
  onClick: PropTypes.func.isRequired,
};

function ProviderModelsModal({ provider, models, onClose }) {
  const [copiedModel, setCopiedModel] = useState(null);
  const notify = useNotificationStore();
  const router = useRouter();

  const navigateTo = (path) => {
    onClose();
    router.push(path);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedModel(text);
    notify.success(`Copied: ${text}`);
    setTimeout(() => setCopiedModel(null), 2000);
  };

  return (
    <Modal isOpen={true} title={`${provider.provider.name} — Models`} onClose={onClose}>
      <div className="flex flex-col gap-3">
        {/* Summary */}
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span className="material-symbols-outlined text-[16px]">token</span>
          {models.length} model{models.length !== 1 ? "s" : ""} available
          {provider.total > 0 && (
            <span className="ml-auto text-xs text-green-500">
              ● {provider.connected} connection{provider.connected !== 1 ? "s" : ""} active
            </span>
          )}
        </div>

        {models.length === 0 ? (
          <div className="text-center py-6">
            <span className="material-symbols-outlined text-[32px] text-text-muted mb-2">
              search_off
            </span>
            <p className="text-sm text-text-muted">{t("noModelsAvailable")}</p>
            <p className="text-xs text-text-muted mt-1">
              Configure a connection first in{" "}
              <button
                onClick={() => navigateTo("/dashboard/providers")}
                className="text-primary hover:underline cursor-pointer"
              >
                Providers
              </button>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto">
            {models.map((m) => (
              <div
                key={m.fullModel}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface/50 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm text-text-main truncate">{m.fullModel}</p>
                  {m.alias !== m.model && (
                    <p className="text-[10px] text-text-muted">alias: {m.alias}</p>
                  )}
                </div>
                <button
                  onClick={() => handleCopy(m.fullModel)}
                  className="shrink-0 ml-2 p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors opacity-0 group-hover:opacity-100"
                  title={t("copyModelName")}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedModel === m.fullModel ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <Button
            variant="secondary"
            fullWidth
            size="sm"
            onClick={() => navigateTo(`/dashboard/providers/${provider.id}`)}
            className="flex-1"
          >
            <span className="material-symbols-outlined text-[14px] mr-1">settings</span>
            {t("configureProvider")}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

ProviderModelsModal.propTypes = {
  provider: PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
