"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardSkeleton, Button, Modal } from "@/shared/components";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import { useNotificationStore } from "@/store/notificationStore";

export default function HomePageClient({ machineId }) {
  const [providerConnections, setProviderConnections] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState("/v1");
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.origin}/v1`);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [provRes, modelsRes] = await Promise.all([
        fetch("/api/providers"),
        fetch("/api/models"),
      ]);
      if (provRes.ok) {
        const provData = await provRes.json();
        setProviderConnections(provData.connections || []);
      }
      if (modelsRes.ok) {
        const modelsData = await modelsRes.json();
        setModels(modelsData.models || []);
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

      const providerModels = models.filter((m) => m.provider === providerId);

      return {
        id: providerId,
        provider: providerInfo,
        total: connections.length,
        connected,
        errors,
        modelCount: providerModels.length,
      };
    });
  }, [providerConnections, models]);

  // Models for selected provider
  const selectedProviderModels = useMemo(() => {
    if (!selectedProvider) return [];
    return models.filter((m) => m.provider === selectedProvider.id);
  }, [selectedProvider, models]);

  const quickStartLinks = [
    { label: "Documentation", href: "/docs" },
    { label: "OpenAI API compatibility", href: "/docs#api-reference" },
    { label: "Cherry/Codex compatibility", href: "/docs#client-compatibility" },
    { label: "Report issue", href: "https://github.com/decolua/omniroute/issues", external: true },
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
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold">Quick Start</h2>
            <p className="text-sm text-text-muted">
              First-time setup checklist for API clients and IDE tools.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="rounded-lg border border-border bg-bg-subtle p-3">
              <span className="font-semibold">1. Create API key</span>
              <p className="text-text-muted mt-1">
                Generate one key per environment to isolate usage and revoke safely.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-bg-subtle p-3">
              <span className="font-semibold">2. Connect provider account</span>
              <p className="text-text-muted mt-1">
                Configure providers in Dashboard and validate with Test Connection.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-bg-subtle p-3">
              <span className="font-semibold">3. Use endpoint</span>
              <p className="text-text-muted mt-1">
                Point clients to <code>{currentEndpoint}</code> and send requests to{" "}
                <code>/chat/completions</code>.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-bg-subtle p-3">
              <span className="font-semibold">4. Monitor usage</span>
              <p className="text-text-muted mt-1">
                Track requests, tokens, errors, and cost in Usage and Request Logger.
              </p>
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
                  {link.external ? "open_in_new" : "arrow_forward"}
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
            <h2 className="text-lg font-semibold">Providers Overview</h2>
            <p className="text-sm text-text-muted">
              {providerStats.filter((item) => item.total > 0).length} configured of{" "}
              {providerStats.length} available providers
            </p>
          </div>
          <Link
            href="/dashboard/providers"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">settings</span>
            Manage Providers
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {providerStats.map((item) => (
            <ProviderOverviewCard
              key={item.id}
              item={item}
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

function ProviderOverviewCard({ item, onClick }) {
  const [imgError, setImgError] = useState(false);

  const statusVariant =
    item.errors > 0 ? "text-red-500" : item.connected > 0 ? "text-green-500" : "text-text-muted";

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
          <p className="text-sm font-semibold truncate">{item.provider.name}</p>
          <p className={`text-xs ${statusVariant}`}>
            {item.total === 0
              ? "Not configured"
              : `${item.connected} active · ${item.errors} error`}
          </p>
        </div>

        <span className="text-xs text-text-muted">#{item.modelCount}</span>
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
    }).isRequired,
    total: PropTypes.number.isRequired,
    connected: PropTypes.number.isRequired,
    errors: PropTypes.number.isRequired,
    modelCount: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

function ProviderModelsModal({ provider, models, onClose }) {
  const [copiedModel, setCopiedModel] = useState(null);
  const notify = useNotificationStore();

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
            <p className="text-sm text-text-muted">No models available for this provider.</p>
            <p className="text-xs text-text-muted mt-1">
              Configure a connection first in{" "}
              <Link href="/dashboard/providers" className="text-primary hover:underline">
                Providers
              </Link>
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
                  title="Copy model name"
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
          <Link href={`/dashboard/providers/${provider.id}`} className="flex-1">
            <Button variant="secondary" fullWidth size="sm">
              <span className="material-symbols-outlined text-[14px] mr-1">settings</span>
              Configure Provider
            </Button>
          </Link>
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
