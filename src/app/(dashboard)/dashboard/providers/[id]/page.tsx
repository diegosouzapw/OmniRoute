"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import PropTypes from "prop-types";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Card,
  Button,
  Badge,
  Input,
  Modal,
  CardSkeleton,
  OAuthModal,
  KiroOAuthWrapper,
  CursorAuthModal,
  Toggle,
  Select,
  ProxyConfigModal,
} from "@/shared/components";
import {
  FREE_PROVIDERS,
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  getProviderAlias,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { getModelsByProviderId } from "@/shared/constants/models";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

export default function ProviderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.id as string;
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [providerNode, setProviderNode] = useState(null);
  const [showOAuthModal, setShowOAuthModal] = useState(false);
  const [showAddApiKeyModal, setShowAddApiKeyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditNodeModal, setShowEditNodeModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [retestingId, setRetestingId] = useState(null);
  const [modelAliases, setModelAliases] = useState({});
  const [headerImgError, setHeaderImgError] = useState(false);
  const { copied, copy } = useCopyToClipboard();
  const t = useTranslations("providers");
  const hasAutoOpened = useRef(false);
  const userDismissed = useRef(false);
  const [proxyTarget, setProxyTarget] = useState(null);
  const [proxyConfig, setProxyConfig] = useState(null);
  const [importingModels, setImportingModels] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importProgress, setImportProgress] = useState({
    current: 0,
    total: 0,
    phase: "idle" as "idle" | "fetching" | "importing" | "done" | "error",
    status: "",
    logs: [] as string[],
    error: "",
    importedCount: 0,
  });

  const providerInfo = providerNode
    ? {
        id: providerNode.id,
        name:
          providerNode.name ||
          (providerNode.type === "anthropic-compatible"
            ? "Anthropic Compatible"
            : "OpenAI Compatible"),
        color: providerNode.type === "anthropic-compatible" ? "#D97757" : "#10A37F",
        textIcon: providerNode.type === "anthropic-compatible" ? "AC" : "OC",
        apiType: providerNode.apiType,
        baseUrl: providerNode.baseUrl,
        type: providerNode.type,
      }
    : (FREE_PROVIDERS as any)[providerId] ||
      (OAUTH_PROVIDERS as any)[providerId] ||
      (APIKEY_PROVIDERS as any)[providerId];
  const isOAuth = !!(FREE_PROVIDERS as any)[providerId] || !!(OAUTH_PROVIDERS as any)[providerId];
  const models = getModelsByProviderId(providerId);
  const providerAlias = getProviderAlias(providerId);

  const isOpenAICompatible = isOpenAICompatibleProvider(providerId);
  const isAnthropicCompatible = isAnthropicCompatibleProvider(providerId);
  const isCompatible = isOpenAICompatible || isAnthropicCompatible;

  const providerStorageAlias = isCompatible ? providerId : providerAlias;
  const providerDisplayAlias = isCompatible ? providerNode?.prefix || providerId : providerAlias;

  // Define callbacks BEFORE the useEffect that uses them
  const fetchAliases = useCallback(async () => {
    try {
      const res = await fetch("/api/models/alias");
      const data = await res.json();
      if (res.ok) {
        setModelAliases(data.aliases || {});
      }
    } catch (error) {
      console.log("Error fetching aliases:", error);
    }
  }, []);

  const fetchConnections = useCallback(async () => {
    try {
      const [connectionsRes, nodesRes] = await Promise.all([
        fetch("/api/providers", { cache: "no-store" }),
        fetch("/api/provider-nodes", { cache: "no-store" }),
      ]);
      const connectionsData = await connectionsRes.json();
      const nodesData = await nodesRes.json();
      if (connectionsRes.ok) {
        const filtered = (connectionsData.connections || []).filter(
          (c) => c.provider === providerId
        );
        setConnections(filtered);
      }
      if (nodesRes.ok) {
        let node = (nodesData.nodes || []).find((entry) => entry.id === providerId) || null;

        // Newly created compatible nodes can be briefly unavailable on one worker.
        // Retry a few times before showing "Provider not found".
        if (!node && isCompatible) {
          for (let attempt = 0; attempt < 3; attempt += 1) {
            await new Promise((resolve) => setTimeout(resolve, 150));
            const retryRes = await fetch("/api/provider-nodes", { cache: "no-store" });
            if (!retryRes.ok) continue;
            const retryData = await retryRes.json();
            node = (retryData.nodes || []).find((entry) => entry.id === providerId) || null;
            if (node) break;
          }
        }

        setProviderNode(node);
      }
    } catch (error) {
      console.log("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  }, [providerId, isCompatible]);

  const handleUpdateNode = async (formData) => {
    try {
      const res = await fetch(`/api/provider-nodes/${providerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setProviderNode(data.node);
        await fetchConnections();
        setShowEditNodeModal(false);
      }
    } catch (error) {
      console.log("Error updating provider node:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
    fetchAliases();
    // Load proxy config for visual indicators
    fetch("/api/settings/proxy")
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => setProxyConfig(c))
      .catch(() => {});
  }, [fetchConnections, fetchAliases]);

  // Auto-open Add Connection modal when no connections exist (better UX)
  // Only fires once on initial load, not on HMR remounts or after user dismissal
  useEffect(() => {
    if (
      !loading &&
      connections.length === 0 &&
      providerInfo &&
      !isCompatible &&
      !hasAutoOpened.current &&
      !userDismissed.current
    ) {
      hasAutoOpened.current = true;
      if (isOAuth) {
        setShowOAuthModal(true);
      } else {
        setShowAddApiKeyModal(true);
      }
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSetAlias = async (modelId, alias, providerAliasOverride = providerAlias) => {
    const fullModel = `${providerAliasOverride}/${modelId}`;
    try {
      const res = await fetch("/api/models/alias", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: fullModel, alias }),
      });
      if (res.ok) {
        await fetchAliases();
      } else {
        const data = await res.json();
        alert(data.error || t("failedSetAlias"));
      }
    } catch (error) {
      console.log("Error setting alias:", error);
    }
  };

  const handleDeleteAlias = async (alias) => {
    try {
      const res = await fetch(`/api/models/alias?alias=${encodeURIComponent(alias)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchAliases();
      }
    } catch (error) {
      console.log("Error deleting alias:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t("deleteConnectionConfirm"))) return;
    try {
      const res = await fetch(`/api/providers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setConnections(connections.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.log("Error deleting connection:", error);
    }
  };

  const handleOAuthSuccess = useCallback(() => {
    fetchConnections();
    setShowOAuthModal(false);
  }, [fetchConnections]);

  const handleSaveApiKey = async (formData) => {
    try {
      const res = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerId, ...formData }),
      });
      if (res.ok) {
        await fetchConnections();
        setShowAddApiKeyModal(false);
        return null;
      }
      const data = await res.json().catch(() => ({}));
      const errorMsg = data.error?.message || data.error || t("failedSaveConnection");
      return errorMsg;
    } catch (error) {
      console.log("Error saving connection:", error);
      return t("failedSaveConnectionRetry");
    }
  };

  const handleUpdateConnection = async (formData) => {
    try {
      const res = await fetch(`/api/providers/${selectedConnection.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await fetchConnections();
        setShowEditModal(false);
      }
    } catch (error) {
      console.log("Error updating connection:", error);
    }
  };

  const handleUpdateConnectionStatus = async (id, isActive) => {
    try {
      const res = await fetch(`/api/providers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (res.ok) {
        setConnections((prev) => prev.map((c) => (c.id === id ? { ...c, isActive } : c)));
      }
    } catch (error) {
      console.log("Error updating connection status:", error);
    }
  };

  const handleToggleRateLimit = async (connectionId, enabled) => {
    try {
      const res = await fetch("/api/rate-limits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionId, enabled }),
      });
      if (res.ok) {
        setConnections((prev) =>
          prev.map((c) => (c.id === connectionId ? { ...c, rateLimitProtection: enabled } : c))
        );
      }
    } catch (error) {
      console.error("Error toggling rate limit:", error);
    }
  };

  const handleRetestConnection = async (connectionId) => {
    if (!connectionId || retestingId) return;
    setRetestingId(connectionId);
    try {
      const res = await fetch(`/api/providers/${connectionId}/test`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || t("failedRetestConnection"));
        return;
      }
      await fetchConnections();
    } catch (error) {
      console.error("Error retesting connection:", error);
    } finally {
      setRetestingId(null);
    }
  };

  const handleSwapPriority = async (conn1, conn2) => {
    if (!conn1 || !conn2) return;
    try {
      // If they have the same priority, we need to ensure the one moving up
      // gets a lower value than the one moving down.
      // We use a small offset which the backend re-indexing will fix.
      let p1 = conn2.priority;
      let p2 = conn1.priority;

      if (p1 === p2) {
        // If moving conn1 "up" (index decreases)
        const isConn1MovingUp = connections.indexOf(conn1) > connections.indexOf(conn2);
        if (isConn1MovingUp) {
          p1 = conn2.priority - 0.5;
        } else {
          p1 = conn2.priority + 0.5;
        }
      }

      await Promise.all([
        fetch(`/api/providers/${conn1.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priority: p1 }),
        }),
        fetch(`/api/providers/${conn2.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priority: p2 }),
        }),
      ]);
      await fetchConnections();
    } catch (error) {
      console.log("Error swapping priority:", error);
    }
  };

  const handleImportModels = async () => {
    if (importingModels) return;
    const activeConnection = connections.find((conn) => conn.isActive !== false);
    if (!activeConnection) return;

    setImportingModels(true);
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      const res = await fetch(`/api/providers/${activeConnection.id}/models`);
      const data = await res.json();
      if (!res.ok) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "error",
          status: t("failedFetchModels"),
          error: data.error || "Failed to import models",
        }));
        return;
      }
      const fetchedModels = data.models || [];
      if (fetchedModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("noModelsFound"),
          logs: ["No models returned from /models endpoint."],
        }));
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "importing",
        total: fetchedModels.length,
        status: `Importing 0 of ${fetchedModels.length} models...`,
        logs: [`Found ${fetchedModels.length} models. Starting import...`],
      }));

      let importedCount = 0;
      for (let i = 0; i < fetchedModels.length; i++) {
        const model = fetchedModels[i];
        const modelId = model.id || model.name || model.model;
        if (!modelId) continue;
        const parts = modelId.split("/");
        const baseAlias = parts[parts.length - 1];

        setImportProgress((prev) => ({
          ...prev,
          current: i + 1,
          status: `Importing ${i + 1} of ${fetchedModels.length} models...`,
          logs: [...prev.logs, `Importing ${modelId}...`],
        }));

        // Save as imported (default) model in the DB
        await fetch("/api/provider-models", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: providerId,
            modelId,
            modelName: model.name || modelId,
            source: "imported",
          }),
        });
        // Also create an alias for routing
        if (!modelAliases[baseAlias]) {
          await handleSetAlias(modelId, baseAlias, providerStorageAlias);
        }
        importedCount += 1;
      }

      await fetchAliases();

      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        current: fetchedModels.length,
        status:
          importedCount > 0
            ? `Successfully imported ${importedCount} model${importedCount === 1 ? "" : "s"}!`
            : "No new models were added (all already exist).",
        logs: [
          ...prev.logs,
          importedCount > 0
            ? `✓ Done! ${importedCount} model${importedCount === 1 ? "" : "s"} imported.`
            : "No new models were added.",
        ],
        importedCount,
      }));

      // Auto-reload after success
      if (importedCount > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }));
    } finally {
      setImportingModels(false);
    }
  };

  // Shared import handler for CompatibleModelsSection
  const handleCompatibleImportWithProgress = async (
    fetchModels: () => Promise<{ models: any[] }>,
    processModel: (model: any) => Promise<boolean>
  ) => {
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      const data = await fetchModels();
      const models = data.models || [];
      if (models.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("noModelsFound"),
          logs: ["No models returned from /models endpoint."],
        }));
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "importing",
        total: models.length,
        status: `Importing 0 of ${models.length} models...`,
        logs: [`Found ${models.length} models. Starting import...`],
      }));

      let importedCount = 0;
      for (let i = 0; i < models.length; i++) {
        const model = models[i];
        const modelId = model.id || model.name || model.model;
        if (!modelId) continue;

        setImportProgress((prev) => ({
          ...prev,
          current: i + 1,
          status: `Importing ${i + 1} of ${models.length} models...`,
          logs: [...prev.logs, `Importing ${modelId}...`],
        }));

        const added = await processModel(model);
        if (added) importedCount += 1;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        current: models.length,
        status:
          importedCount > 0
            ? `Successfully imported ${importedCount} model${importedCount === 1 ? "" : "s"}!`
            : "No new models were added.",
        logs: [
          ...prev.logs,
          importedCount > 0
            ? `✓ Done! ${importedCount} model${importedCount === 1 ? "" : "s"} imported.`
            : "No new models were added.",
        ],
        importedCount,
      }));

      if (importedCount > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }));
    }
  };

  const canImportModels = connections.some((conn) => conn.isActive !== false);

  const renderModelsSection = () => {
    if (isCompatible) {
      return (
        <CompatibleModelsSection
          providerStorageAlias={providerStorageAlias}
          providerDisplayAlias={providerDisplayAlias}
          modelAliases={modelAliases}
          copied={copied}
          onCopy={copy}
          onSetAlias={handleSetAlias}
          onDeleteAlias={handleDeleteAlias}
          connections={connections}
          isAnthropic={isAnthropicCompatible}
          onImportWithProgress={handleCompatibleImportWithProgress}
        />
      );
    }
    if (providerInfo.passthroughModels) {
      return (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button
              size="sm"
              variant="secondary"
              icon="download"
              onClick={handleImportModels}
              disabled={!canImportModels || importingModels}
            >
              {importingModels ? t("importingModels") : t("importFromModels")}
            </Button>
            {!canImportModels && (
              <span className="text-xs text-text-muted">{t("addConnectionToImport")}</span>
            )}
          </div>
          <PassthroughModelsSection
            providerAlias={providerAlias}
            modelAliases={modelAliases}
            copied={copied}
            onCopy={copy}
            onSetAlias={handleSetAlias}
            onDeleteAlias={handleDeleteAlias}
          />
        </div>
      );
    }

    const importButton = (
      <div className="flex items-center gap-2 mb-4">
        <Button
          size="sm"
          variant="secondary"
          icon="download"
          onClick={handleImportModels}
          disabled={!canImportModels || importingModels}
        >
          {importingModels ? t("importingModels") : t("importFromModels")}
        </Button>
        {!canImportModels && (
          <span className="text-xs text-text-muted">{t("addConnectionToImport")}</span>
        )}
      </div>
    );

    if (models.length === 0) {
      return (
        <div>
          {importButton}
          <p className="text-sm text-text-muted">{t("noModelsConfigured")}</p>
        </div>
      );
    }
    return (
      <div>
        {importButton}
        <div className="flex flex-wrap gap-3">
          {models.map((model) => {
            const fullModel = `${providerStorageAlias}/${model.id}`;
            const oldFormatModel = `${providerId}/${model.id}`;
            const existingAlias = Object.entries(modelAliases).find(
              ([, m]) => m === fullModel || m === oldFormatModel
            )?.[0];
            return (
              <ModelRow
                key={model.id}
                model={model}
                fullModel={`${providerDisplayAlias}/${model.id}`}
                alias={existingAlias}
                copied={copied}
                onCopy={copy}
                onSetAlias={(alias) => handleSetAlias(model.id, alias, providerStorageAlias)}
                onDeleteAlias={() => handleDeleteAlias(existingAlias)}
              />
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!providerInfo) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">{t("providerNotFound")}</p>
        <Link href="/dashboard/providers" className="text-primary mt-4 inline-block">
          {t("backToProviders")}
        </Link>
      </div>
    );
  }

  // Determine icon path: OpenAI Compatible providers use specialized icons
  const getHeaderIconPath = () => {
    if (isOpenAICompatible && providerInfo.apiType) {
      return providerInfo.apiType === "responses"
        ? "/providers/oai-r.png"
        : "/providers/oai-cc.png";
    }
    if (isAnthropicCompatible) {
      return "/providers/anthropic-m.png";
    }
    return `/providers/${providerInfo.id}.png`;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/providers"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          {t("backToProviders")}
        </Link>
        <div className="flex items-center gap-4">
          <div
            className="rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${providerInfo.color}15` }}
          >
            {headerImgError ? (
              <span className="text-sm font-bold" style={{ color: providerInfo.color }}>
                {providerInfo.textIcon || providerInfo.id.slice(0, 2).toUpperCase()}
              </span>
            ) : (
              <Image
                src={getHeaderIconPath()}
                alt={providerInfo.name}
                width={48}
                height={48}
                className="object-contain rounded-lg max-w-[48px] max-h-[48px]"
                sizes="48px"
                onError={() => setHeaderImgError(true)}
              />
            )}
          </div>
          <div>
            {providerInfo.website ? (
              <a
                href={providerInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-semibold tracking-tight hover:underline inline-flex items-center gap-2"
                style={{ color: providerInfo.color }}
              >
                {providerInfo.name}
                <span className="material-symbols-outlined text-lg opacity-60">open_in_new</span>
              </a>
            ) : (
              <h1 className="text-3xl font-semibold tracking-tight">{providerInfo.name}</h1>
            )}
            <p className="text-text-muted">
              {connections.length} connection{connections.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>

      {isCompatible && providerNode && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">
                {isAnthropicCompatible
                  ? t("anthropicCompatibleDetails")
                  : t("openaiCompatibleDetails")}
              </h2>
              <p className="text-sm text-text-muted">
                {isAnthropicCompatible
                  ? t("messagesApi")
                  : providerNode.apiType === "responses"
                    ? t("responsesApi")
                    : t("chatCompletions")}{" "}
                · {(providerNode.baseUrl || "").replace(/\/$/, "")}/
                {isAnthropicCompatible
                  ? "messages"
                  : providerNode.apiType === "responses"
                    ? "responses"
                    : "chat/completions"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                icon="add"
                onClick={() => setShowAddApiKeyModal(true)}
                disabled={connections.length > 0}
              >
                Add
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon="edit"
                onClick={() => setShowEditNodeModal(true)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon="delete"
                onClick={async () => {
                  if (
                    !confirm(
                      `Delete this ${isAnthropicCompatible ? "Anthropic" : "OpenAI"} Compatible node?`
                    )
                  )
                    return;
                  try {
                    const res = await fetch(`/api/provider-nodes/${providerId}`, {
                      method: "DELETE",
                    });
                    if (res.ok) {
                      router.push("/dashboard/providers");
                    }
                  } catch (error) {
                    console.log("Error deleting provider node:", error);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
          {connections.length > 0 && (
            <p className="text-sm text-text-muted">
              Only one connection is allowed per compatible node. Add another node if you need more
              connections.
            </p>
          )}
        </Card>
      )}

      {/* Connections */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Connections</h2>
          {!isCompatible && (
            <Button
              size="sm"
              icon="add"
              onClick={() => (isOAuth ? setShowOAuthModal(true) : setShowAddApiKeyModal(true))}
            >
              Add
            </Button>
          )}
        </div>

        {connections.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <span className="material-symbols-outlined text-[32px]">
                {isOAuth ? "lock" : "key"}
              </span>
            </div>
            <p className="text-text-main font-medium mb-1">No connections yet</p>
            <p className="text-sm text-text-muted mb-4">Add your first connection to get started</p>
            {!isCompatible && (
              <Button
                icon="add"
                onClick={() => (isOAuth ? setShowOAuthModal(true) : setShowAddApiKeyModal(true))}
              >
                Add Connection
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-black/[0.03] dark:divide-white/[0.03]">
            {connections
              .sort((a, b) => (a.priority || 0) - (b.priority || 0))
              .map((conn, index) => (
                <ConnectionRow
                  key={conn.id}
                  connection={conn}
                  isOAuth={isOAuth}
                  isFirst={index === 0}
                  isLast={index === connections.length - 1}
                  onMoveUp={() => handleSwapPriority(conn, connections[index - 1])}
                  onMoveDown={() => handleSwapPriority(conn, connections[index + 1])}
                  onToggleActive={(isActive) => handleUpdateConnectionStatus(conn.id, isActive)}
                  onToggleRateLimit={(enabled) => handleToggleRateLimit(conn.id, enabled)}
                  onRetest={() => handleRetestConnection(conn.id)}
                  isRetesting={retestingId === conn.id}
                  onEdit={() => {
                    setSelectedConnection(conn);
                    setShowEditModal(true);
                  }}
                  onDelete={() => handleDelete(conn.id)}
                  onReauth={isOAuth ? () => setShowOAuthModal(true) : undefined}
                  onProxy={() =>
                    setProxyTarget({
                      level: "key",
                      id: conn.id,
                      label: conn.name || conn.email || conn.id,
                    })
                  }
                  hasProxy={!!proxyConfig?.keys?.[conn.id]}
                />
              ))}
          </div>
        )}
      </Card>

      {/* Models */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Available Models</h2>
        {renderModelsSection()}

        {/* Custom Models — available for ALL providers */}
        {!isCompatible && (
          <CustomModelsSection
            providerId={providerId}
            providerAlias={providerDisplayAlias}
            copied={copied}
            onCopy={copy}
          />
        )}
      </Card>

      {/* Modals */}
      {providerId === "kiro" ? (
        <KiroOAuthWrapper
          isOpen={showOAuthModal}
          providerInfo={providerInfo}
          onSuccess={handleOAuthSuccess}
          onClose={() => {
            userDismissed.current = true;
            setShowOAuthModal(false);
          }}
        />
      ) : providerId === "cursor" ? (
        <CursorAuthModal
          isOpen={showOAuthModal}
          onSuccess={handleOAuthSuccess}
          onClose={() => {
            userDismissed.current = true;
            setShowOAuthModal(false);
          }}
        />
      ) : (
        <OAuthModal
          isOpen={showOAuthModal}
          provider={providerId}
          providerInfo={providerInfo}
          onSuccess={handleOAuthSuccess}
          onClose={() => {
            userDismissed.current = true;
            setShowOAuthModal(false);
          }}
        />
      )}
      <AddApiKeyModal
        isOpen={showAddApiKeyModal}
        provider={providerId}
        providerName={providerInfo.name}
        isCompatible={isCompatible}
        isAnthropic={isAnthropicCompatible}
        onSave={handleSaveApiKey}
        onClose={() => setShowAddApiKeyModal(false)}
      />
      <EditConnectionModal
        isOpen={showEditModal}
        connection={selectedConnection}
        onSave={handleUpdateConnection}
        onClose={() => setShowEditModal(false)}
      />
      {isCompatible && (
        <EditCompatibleNodeModal
          isOpen={showEditNodeModal}
          node={providerNode}
          onSave={handleUpdateNode}
          onClose={() => setShowEditNodeModal(false)}
          isAnthropic={isAnthropicCompatible}
        />
      )}
      {/* Proxy Config Modal */}
      {proxyTarget && (
        <ProxyConfigModal
          isOpen={!!proxyTarget}
          onClose={() => setProxyTarget(null)}
          level={proxyTarget.level}
          levelId={proxyTarget.id}
          levelLabel={proxyTarget.label}
        />
      )}
      {/* Import Progress Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => {
          if (importProgress.phase === "done" || importProgress.phase === "error") {
            setShowImportModal(false);
          }
        }}
        title="Importing Models"
        size="md"
        closeOnOverlay={false}
        showCloseButton={importProgress.phase === "done" || importProgress.phase === "error"}
      >
        <div className="flex flex-col gap-4">
          {/* Status text */}
          <div className="flex items-center gap-3">
            {importProgress.phase === "fetching" && (
              <span className="material-symbols-outlined text-primary animate-spin">
                progress_activity
              </span>
            )}
            {importProgress.phase === "importing" && (
              <span className="material-symbols-outlined text-primary animate-spin">
                progress_activity
              </span>
            )}
            {importProgress.phase === "done" && (
              <span className="material-symbols-outlined text-green-500">check_circle</span>
            )}
            {importProgress.phase === "error" && (
              <span className="material-symbols-outlined text-red-500">error</span>
            )}
            <span className="text-sm font-medium text-text-main">{importProgress.status}</span>
          </div>

          {/* Progress bar */}
          {(importProgress.phase === "importing" || importProgress.phase === "done") &&
            importProgress.total > 0 && (
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-muted">
                    {importProgress.current} / {importProgress.total}
                  </span>
                  <span className="text-xs text-text-muted">
                    {Math.round((importProgress.current / importProgress.total) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${(importProgress.current / importProgress.total) * 100}%`,
                      background:
                        importProgress.phase === "done"
                          ? "linear-gradient(90deg, #22c55e, #16a34a)"
                          : "linear-gradient(90deg, var(--color-primary), var(--color-primary-hover, var(--color-primary)))",
                    }}
                  />
                </div>
              </div>
            )}

          {/* Fetching indeterminate bar */}
          {importProgress.phase === "fetching" && (
            <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full animate-pulse"
                style={{
                  width: "60%",
                  background:
                    "linear-gradient(90deg, var(--color-primary), var(--color-primary-hover, var(--color-primary)))",
                }}
              />
            </div>
          )}

          {/* Error message */}
          {importProgress.phase === "error" && importProgress.error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{importProgress.error}</p>
            </div>
          )}

          {/* Log list */}
          {importProgress.logs.length > 0 && (
            <div className="max-h-48 overflow-y-auto rounded-lg bg-black/5 dark:bg-white/5 p-3 border border-black/5 dark:border-white/5">
              <div className="flex flex-col gap-1">
                {importProgress.logs.map((log, i) => (
                  <p
                    key={i}
                    className={`text-xs font-mono ${
                      log.startsWith("✓") ? "text-green-500 font-semibold" : "text-text-muted"
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Auto-reload notice */}
          {importProgress.phase === "done" && importProgress.importedCount > 0 && (
            <p className="text-xs text-text-muted text-center animate-pulse">
              Page will refresh automatically...
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}

function ModelRow({ model, fullModel, alias, copied, onCopy, onSetAlias, onDeleteAlias }: any) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-sidebar/50">
      <span className="material-symbols-outlined text-base text-text-muted">smart_toy</span>
      <code className="text-xs text-text-muted font-mono bg-sidebar px-1.5 py-0.5 rounded">
        {fullModel}
      </code>
      <button
        onClick={() => onCopy(fullModel, `model-${model.id}`)}
        className="p-0.5 hover:bg-sidebar rounded text-text-muted hover:text-primary"
        title="Copy model"
      >
        <span className="material-symbols-outlined text-sm">
          {copied === `model-${model.id}` ? "check" : "content_copy"}
        </span>
      </button>
    </div>
  );
}

ModelRow.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  fullModel: PropTypes.string.isRequired,
  alias: PropTypes.string,
  copied: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
};

function PassthroughModelsSection({
  providerAlias,
  modelAliases,
  copied,
  onCopy,
  onSetAlias,
  onDeleteAlias,
}) {
  const [newModel, setNewModel] = useState("");
  const [adding, setAdding] = useState(false);

  // Filter aliases for this provider - models are persisted via alias
  const providerAliases = Object.entries(modelAliases).filter(([, model]: [string, any]) =>
    (model as string).startsWith(`${providerAlias}/`)
  );

  const allModels = providerAliases.map(([alias, fullModel]: [string, any]) => ({
    modelId: (fullModel as string).replace(`${providerAlias}/`, ""),
    fullModel,
    alias,
  }));

  // Generate default alias from modelId (last part after /)
  const generateDefaultAlias = (modelId) => {
    const parts = modelId.split("/");
    return parts[parts.length - 1];
  };

  const handleAdd = async () => {
    if (!newModel.trim() || adding) return;
    const modelId = newModel.trim();
    const defaultAlias = generateDefaultAlias(modelId);

    // Check if alias already exists
    if (modelAliases[defaultAlias]) {
      alert(
        `Alias "${defaultAlias}" already exists. Please use a different model or edit existing alias.`
      );
      return;
    }

    setAdding(true);
    try {
      await onSetAlias(modelId, defaultAlias);
      setNewModel("");
    } catch (error) {
      console.log("Error adding model:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-muted">
        OpenRouter supports any model. Add models and create aliases for quick access.
      </p>

      {/* Add new model */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label htmlFor="new-model-input" className="text-xs text-text-muted mb-1 block">
            Model ID (from OpenRouter)
          </label>
          <input
            id="new-model-input"
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="anthropic/claude-3-opus"
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
          />
        </div>
        <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModel.trim() || adding}>
          {adding ? "Adding..." : "Add"}
        </Button>
      </div>

      {/* Models list */}
      {allModels.length > 0 && (
        <div className="flex flex-col gap-3">
          {allModels.map(({ modelId, fullModel, alias }) => (
            <PassthroughModelRow
              key={fullModel as string}
              modelId={modelId}
              fullModel={fullModel}
              copied={copied}
              onCopy={onCopy}
              onDeleteAlias={() => onDeleteAlias(alias)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

PassthroughModelsSection.propTypes = {
  providerAlias: PropTypes.string.isRequired,
  modelAliases: PropTypes.object.isRequired,
  copied: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
  onSetAlias: PropTypes.func.isRequired,
  onDeleteAlias: PropTypes.func.isRequired,
};

function PassthroughModelRow({ modelId, fullModel, copied, onCopy, onDeleteAlias }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-sidebar/50">
      <span className="material-symbols-outlined text-base text-text-muted">smart_toy</span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{modelId}</p>

        <div className="flex items-center gap-1 mt-1">
          <code className="text-xs text-text-muted font-mono bg-sidebar px-1.5 py-0.5 rounded">
            {fullModel}
          </code>
          <button
            onClick={() => onCopy(fullModel, `model-${modelId}`)}
            className="p-0.5 hover:bg-sidebar rounded text-text-muted hover:text-primary"
            title="Copy model"
          >
            <span className="material-symbols-outlined text-sm">
              {copied === `model-${modelId}` ? "check" : "content_copy"}
            </span>
          </button>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={onDeleteAlias}
        className="p-1 hover:bg-red-50 rounded text-red-500"
        title="Remove model"
      >
        <span className="material-symbols-outlined text-sm">delete</span>
      </button>
    </div>
  );
}

PassthroughModelRow.propTypes = {
  modelId: PropTypes.string.isRequired,
  fullModel: PropTypes.string.isRequired,
  copied: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
  onDeleteAlias: PropTypes.func.isRequired,
};

// ============ Custom Models Section (for ALL providers) ============

function CustomModelsSection({ providerId, providerAlias, copied, onCopy }) {
  const [customModels, setCustomModels] = useState([]);
  const [newModelId, setNewModelId] = useState("");
  const [newModelName, setNewModelName] = useState("");
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCustomModels = useCallback(async () => {
    try {
      const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerId)}`);
      if (res.ok) {
        const data = await res.json();
        setCustomModels(data.models || []);
      }
    } catch (e) {
      console.error("Failed to fetch custom models:", e);
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  useEffect(() => {
    fetchCustomModels();
  }, [fetchCustomModels]);

  const handleAdd = async () => {
    if (!newModelId.trim() || adding) return;
    setAdding(true);
    try {
      const res = await fetch("/api/provider-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerId,
          modelId: newModelId.trim(),
          modelName: newModelName.trim() || undefined,
        }),
      });
      if (res.ok) {
        setNewModelId("");
        setNewModelName("");
        await fetchCustomModels();
      }
    } catch (e) {
      console.error("Failed to add custom model:", e);
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (modelId) => {
    try {
      await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerId)}&model=${encodeURIComponent(modelId)}`,
        {
          method: "DELETE",
        }
      );
      await fetchCustomModels();
    } catch (e) {
      console.error("Failed to remove custom model:", e);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-primary">tune</span>
        Custom Models
      </h3>
      <p className="text-xs text-text-muted mb-3">
        Add model IDs not in the default list. These will be available for routing.
      </p>

      {/* Add form */}
      <div className="flex items-end gap-2 mb-3">
        <div className="flex-1">
          <label htmlFor="custom-model-id" className="text-xs text-text-muted mb-1 block">
            Model ID
          </label>
          <input
            id="custom-model-id"
            type="text"
            value={newModelId}
            onChange={(e) => setNewModelId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="e.g. gpt-4.5-turbo"
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
          />
        </div>
        <div className="w-40">
          <label htmlFor="custom-model-name" className="text-xs text-text-muted mb-1 block">
            Display Name
          </label>
          <input
            id="custom-model-name"
            type="text"
            value={newModelName}
            onChange={(e) => setNewModelName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Optional"
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
          />
        </div>
        <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModelId.trim() || adding}>
          {adding ? "Adding..." : "Add"}
        </Button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-xs text-text-muted">Loading...</p>
      ) : customModels.length > 0 ? (
        <div className="flex flex-col gap-2">
          {customModels.map((model) => {
            const fullModel = `${providerAlias}/${model.id}`;
            const copyKey = `custom-${model.id}`;
            return (
              <div
                key={model.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-sidebar/50"
              >
                <span className="material-symbols-outlined text-base text-primary">tune</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{model.name || model.id}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <code className="text-xs text-text-muted font-mono bg-sidebar px-1.5 py-0.5 rounded">
                      {fullModel}
                    </code>
                    <button
                      onClick={() => onCopy(fullModel, copyKey)}
                      className="p-0.5 hover:bg-sidebar rounded text-text-muted hover:text-primary"
                      title="Copy model"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copied === copyKey ? "check" : "content_copy"}
                      </span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(model.id)}
                  className="p-1 hover:bg-red-50 rounded text-red-500"
                  title="Remove custom model"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-text-muted">No custom models added yet.</p>
      )}
    </div>
  );
}

CustomModelsSection.propTypes = {
  providerId: PropTypes.string.isRequired,
  providerAlias: PropTypes.string.isRequired,
  copied: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
};

function CompatibleModelsSection({
  providerStorageAlias,
  providerDisplayAlias,
  modelAliases,
  copied,
  onCopy,
  onSetAlias,
  onDeleteAlias,
  connections,
  isAnthropic,
  onImportWithProgress,
}) {
  const [newModel, setNewModel] = useState("");
  const [adding, setAdding] = useState(false);
  const [importing, setImporting] = useState(false);
  const notify = useNotificationStore();

  const providerAliases = Object.entries(modelAliases).filter(([, model]: [string, any]) =>
    (model as string).startsWith(`${providerStorageAlias}/`)
  );

  const allModels = providerAliases.map(([alias, fullModel]: [string, any]) => ({
    modelId: (fullModel as string).replace(`${providerStorageAlias}/`, ""),
    fullModel,
    alias,
  }));

  const generateDefaultAlias = (modelId) => {
    const parts = modelId.split("/");
    return parts[parts.length - 1];
  };

  const resolveAlias = (modelId) => {
    const baseAlias = generateDefaultAlias(modelId);
    if (!modelAliases[baseAlias]) return baseAlias;
    const prefixedAlias = `${providerDisplayAlias}-${baseAlias}`;
    if (!modelAliases[prefixedAlias]) return prefixedAlias;
    return null;
  };

  const handleAdd = async () => {
    if (!newModel.trim() || adding) return;
    const modelId = newModel.trim();
    const resolvedAlias = resolveAlias(modelId);
    if (!resolvedAlias) {
      notify.error(
        "All suggested aliases already exist. Please choose a different model or remove conflicting aliases."
      );
      return;
    }

    setAdding(true);
    try {
      // Save to customModels DB FIRST - only create alias if this succeeds
      const customModelRes = await fetch("/api/provider-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerStorageAlias,
          modelId,
          modelName: modelId,
          source: "manual",
        }),
      });

      if (!customModelRes.ok) {
        let errorData: { error?: { message?: string } } = {};
        try {
          errorData = await customModelRes.json();
        } catch (jsonError) {
          console.error("Failed to parse error response from custom model API:", jsonError);
        }
        throw new Error(errorData.error?.message || "Failed to save custom model");
      }

      // Only create alias after customModel is saved successfully
      await onSetAlias(modelId, resolvedAlias, providerStorageAlias);
      setNewModel("");
      notify.success(`Model ${modelId} added successfully`);
    } catch (error) {
      console.error("Error adding model:", error);
      notify.error(
        error instanceof Error ? error.message : "Failed to add model. Please try again."
      );
    } finally {
      setAdding(false);
    }
  };

  const handleImport = async () => {
    if (importing) return;
    const activeConnection = connections.find((conn) => conn.isActive !== false);
    if (!activeConnection) return;

    setImporting(true);
    try {
      await onImportWithProgress(
        // fetchModels callback
        async () => {
          const res = await fetch(`/api/providers/${activeConnection.id}/models`);
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to import models");
          return data;
        },
        // processModel callback
        async (model: any) => {
          const modelId = model.id || model.name || model.model;
          if (!modelId) return false;
          const resolvedAlias = resolveAlias(modelId);
          if (!resolvedAlias) return false;

          // Save to customModels DB FIRST - only create alias if this succeeds
          const customModelRes = await fetch("/api/provider-models", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: providerStorageAlias,
              modelId,
              modelName: model.name || modelId,
              source: "imported",
            }),
          });

          if (!customModelRes.ok) {
            notify.error("Failed to save imported model to custom database");
            return false;
          }

          // Only create alias after customModel is saved successfully
          await onSetAlias(modelId, resolvedAlias, providerStorageAlias);
          return true;
        }
      );
    } catch (error) {
      console.error("Error importing models:", error);
      notify.error("Failed to import models. Please try again.");
    } finally {
      setImporting(false);
    }
  };

  const canImport = connections.some((conn) => conn.isActive !== false);

  // Handle delete: remove from both alias and customModels DB
  const handleDeleteModel = async (modelId: string, alias: string) => {
    try {
      // Remove from customModels DB
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerStorageAlias)}&model=${encodeURIComponent(modelId)}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error("Failed to remove model from database");
      }
      // Also delete the alias
      await onDeleteAlias(alias);
      notify.success("Model removed successfully");
    } catch (error) {
      console.error("Error deleting model:", error);
      notify.error(
        error instanceof Error ? error.message : "Failed to delete model. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-muted">
        Add {isAnthropic ? "Anthropic" : "OpenAI"}-compatible models manually or import them from
        the /models endpoint.
      </p>

      <div className="flex items-end gap-2 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <label
            htmlFor="new-compatible-model-input"
            className="text-xs text-text-muted mb-1 block"
          >
            Model ID
          </label>
          <input
            id="new-compatible-model-input"
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={isAnthropic ? "claude-3-opus-20240229" : "gpt-4o"}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
          />
        </div>
        <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModel.trim() || adding}>
          {adding ? "Adding..." : "Add"}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          icon="download"
          onClick={handleImport}
          disabled={!canImport || importing}
        >
          {importing ? "Importing..." : "Import from /models"}
        </Button>
      </div>

      {!canImport && (
        <p className="text-xs text-text-muted">Add a connection to enable importing models.</p>
      )}

      {allModels.length > 0 && (
        <div className="flex flex-col gap-3">
          {allModels.map(({ modelId, fullModel, alias }) => (
            <PassthroughModelRow
              key={fullModel as string}
              modelId={modelId}
              fullModel={`${providerDisplayAlias}/${modelId}`}
              copied={copied}
              onCopy={onCopy}
              onDeleteAlias={() => handleDeleteModel(modelId, alias)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

CompatibleModelsSection.propTypes = {
  providerStorageAlias: PropTypes.string.isRequired,
  providerDisplayAlias: PropTypes.string.isRequired,
  modelAliases: PropTypes.object.isRequired,
  copied: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
  onSetAlias: PropTypes.func.isRequired,
  onDeleteAlias: PropTypes.func.isRequired,
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ).isRequired,
  isAnthropic: PropTypes.bool,
  onImportWithProgress: PropTypes.func.isRequired,
};

function CooldownTimer({ until }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const updateRemaining = () => {
      const diff = new Date(until).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining("");
        return;
      }
      const secs = Math.floor(diff / 1000);
      if (secs < 60) {
        setRemaining(`${secs}s`);
      } else if (secs < 3600) {
        setRemaining(`${Math.floor(secs / 60)}m ${secs % 60}s`);
      } else {
        const hrs = Math.floor(secs / 3600);
        const mins = Math.floor((secs % 3600) / 60);
        setRemaining(`${hrs}h ${mins}m`);
      }
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, [until]);

  if (!remaining) return null;

  return <span className="text-xs text-orange-500 font-mono">⏱ {remaining}</span>;
}

CooldownTimer.propTypes = {
  until: PropTypes.string.isRequired,
};

const ERROR_TYPE_LABELS = {
  runtime_error: { label: "Local runtime", variant: "warning" },
  upstream_auth_error: { label: "Upstream auth", variant: "error" },
  auth_missing: { label: "Missing credential", variant: "warning" },
  token_refresh_failed: { label: "Refresh failed", variant: "warning" },
  token_expired: { label: "Token expired", variant: "warning" },
  upstream_rate_limited: { label: "Rate limited", variant: "warning" },
  upstream_unavailable: { label: "Upstream unavailable", variant: "error" },
  network_error: { label: "Network error", variant: "warning" },
  unsupported: { label: "Test unsupported", variant: "default" },
  upstream_error: { label: "Upstream error", variant: "error" },
};

function inferErrorType(connection, isCooldown) {
  if (isCooldown) return "upstream_rate_limited";
  if (connection.lastErrorType) return connection.lastErrorType;

  const code = Number(connection.errorCode);
  if (code === 401 || code === 403) return "upstream_auth_error";
  if (code === 429) return "upstream_rate_limited";
  if (code >= 500) return "upstream_unavailable";

  const msg = (connection.lastError || "").toLowerCase();
  if (!msg) return null;
  if (
    msg.includes("runtime") ||
    msg.includes("not runnable") ||
    msg.includes("not installed") ||
    msg.includes("healthcheck")
  )
    return "runtime_error";
  if (msg.includes("refresh failed")) return "token_refresh_failed";
  if (msg.includes("token expired") || msg.includes("expired")) return "token_expired";
  if (
    msg.includes("invalid api key") ||
    msg.includes("token invalid") ||
    msg.includes("revoked") ||
    msg.includes("access denied") ||
    msg.includes("unauthorized")
  )
    return "upstream_auth_error";
  if (
    msg.includes("rate limit") ||
    msg.includes("quota") ||
    msg.includes("too many requests") ||
    msg.includes("429")
  )
    return "upstream_rate_limited";
  if (
    msg.includes("fetch failed") ||
    msg.includes("network") ||
    msg.includes("timeout") ||
    msg.includes("econn") ||
    msg.includes("enotfound")
  )
    return "network_error";
  if (msg.includes("not supported")) return "unsupported";
  return "upstream_error";
}

function getStatusPresentation(connection, effectiveStatus, isCooldown) {
  if (connection.isActive === false) {
    return {
      statusVariant: "default",
      statusLabel: "disabled",
      errorType: null,
      errorBadge: null,
      errorTextClass: "text-text-muted",
    };
  }

  if (effectiveStatus === "active" || effectiveStatus === "success") {
    return {
      statusVariant: "success",
      statusLabel: "connected",
      errorType: null,
      errorBadge: null,
      errorTextClass: "text-text-muted",
    };
  }

  const errorType = inferErrorType(connection, isCooldown);
  const errorBadge = errorType ? ERROR_TYPE_LABELS[errorType] || null : null;

  if (errorType === "runtime_error") {
    return {
      statusVariant: "warning",
      statusLabel: "runtime issue",
      errorType,
      errorBadge,
      errorTextClass: "text-yellow-600 dark:text-yellow-400",
    };
  }

  if (
    errorType === "upstream_auth_error" ||
    errorType === "auth_missing" ||
    errorType === "token_refresh_failed" ||
    errorType === "token_expired"
  ) {
    return {
      statusVariant: "error",
      statusLabel: "auth failed",
      errorType,
      errorBadge,
      errorTextClass: "text-red-500",
    };
  }

  if (errorType === "upstream_rate_limited") {
    return {
      statusVariant: "warning",
      statusLabel: "rate limited",
      errorType,
      errorBadge,
      errorTextClass: "text-yellow-600 dark:text-yellow-400",
    };
  }

  if (errorType === "network_error") {
    return {
      statusVariant: "warning",
      statusLabel: "network issue",
      errorType,
      errorBadge,
      errorTextClass: "text-yellow-600 dark:text-yellow-400",
    };
  }

  if (errorType === "unsupported") {
    return {
      statusVariant: "default",
      statusLabel: "test unsupported",
      errorType,
      errorBadge,
      errorTextClass: "text-text-muted",
    };
  }

  return {
    statusVariant: "error",
    statusLabel: effectiveStatus || "error",
    errorType,
    errorBadge,
    errorTextClass: "text-red-500",
  };
}

function ConnectionRow({
  connection,
  isOAuth,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onToggleActive,
  onToggleRateLimit,
  onRetest,
  isRetesting,
  onEdit,
  onDelete,
  onReauth,
  onProxy,
  hasProxy,
}) {
  const displayName = isOAuth
    ? connection.name || connection.email || connection.displayName || "OAuth Account"
    : connection.name;

  // Use useState + useEffect for impure Date.now() to avoid calling during render
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    const checkCooldown = () => {
      const cooldown =
        connection.rateLimitedUntil && new Date(connection.rateLimitedUntil).getTime() > Date.now();
      setIsCooldown(cooldown);
    };

    checkCooldown();
    // Update every second while in cooldown
    const interval = connection.rateLimitedUntil ? setInterval(checkCooldown, 1000) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connection.rateLimitedUntil]);

  // Determine effective status (override unavailable if cooldown expired)
  const effectiveStatus =
    connection.testStatus === "unavailable" && !isCooldown
      ? "active" // Cooldown expired → treat as active
      : connection.testStatus;

  const statusPresentation = getStatusPresentation(connection, effectiveStatus, isCooldown);
  const rateLimitEnabled = !!connection.rateLimitProtection;

  return (
    <div
      className={`group flex items-center justify-between p-3 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${connection.isActive === false ? "opacity-60" : ""}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Priority arrows */}
        <div className="flex flex-col">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className={`p-0.5 rounded ${isFirst ? "text-text-muted/30 cursor-not-allowed" : "hover:bg-sidebar text-text-muted hover:text-primary"}`}
          >
            <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className={`p-0.5 rounded ${isLast ? "text-text-muted/30 cursor-not-allowed" : "hover:bg-sidebar text-text-muted hover:text-primary"}`}
          >
            <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </button>
        </div>
        <span className="material-symbols-outlined text-base text-text-muted">
          {isOAuth ? "lock" : "key"}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{displayName}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant={statusPresentation.statusVariant as any} size="sm" dot>
              {statusPresentation.statusLabel}
            </Badge>
            {isCooldown && connection.isActive !== false && (
              <CooldownTimer until={connection.rateLimitedUntil} />
            )}
            {statusPresentation.errorBadge && connection.isActive !== false && (
              <Badge variant={statusPresentation.errorBadge.variant} size="sm">
                {statusPresentation.errorBadge.label}
              </Badge>
            )}
            {connection.lastError && connection.isActive !== false && (
              <span
                className={`text-xs truncate max-w-[300px] ${statusPresentation.errorTextClass}`}
                title={connection.lastError}
              >
                {connection.lastError}
              </span>
            )}
            <span className="text-xs text-text-muted">#{connection.priority}</span>
            {connection.globalPriority && (
              <span className="text-xs text-text-muted">Auto: {connection.globalPriority}</span>
            )}
            {/* Rate Limit Protection — inline toggle with label */}
            <span className="text-text-muted/30 select-none">|</span>
            <button
              onClick={() => onToggleRateLimit(!rateLimitEnabled)}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                rateLimitEnabled
                  ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25"
                  : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
              }`}
              title={
                rateLimitEnabled
                  ? "Click to disable rate limit protection"
                  : "Click to enable rate limit protection"
              }
            >
              <span className="material-symbols-outlined text-[13px]">shield</span>
              {rateLimitEnabled ? "Protected" : "Unprotected"}
            </button>
            {hasProxy && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <span
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-primary/15 text-primary"
                  title="Proxy configured"
                >
                  <span className="material-symbols-outlined text-[13px]">vpn_lock</span>
                  Proxy
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          icon="refresh"
          loading={isRetesting}
          disabled={connection.isActive === false}
          onClick={onRetest}
          className="!h-7 !px-2 text-xs"
          title="Retest authentication"
        >
          Retest
        </Button>
        <Toggle
          size="sm"
          checked={connection.isActive ?? true}
          onChange={onToggleActive}
          title={(connection.isActive ?? true) ? "Disable connection" : "Enable connection"}
        />
        <div className="flex gap-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onReauth && (
            <button
              onClick={onReauth}
              className="p-2 hover:bg-amber-500/10 rounded text-amber-600 hover:text-amber-500"
              title="Re-authenticate this connection"
            >
              <span className="material-symbols-outlined text-[18px]">passkey</span>
            </button>
          )}
          <button
            onClick={onEdit}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={onProxy}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary"
            title="Proxy config"
          >
            <span className="material-symbols-outlined text-[18px]">vpn_lock</span>
          </button>
          <button onClick={onDelete} className="p-2 hover:bg-red-500/10 rounded text-red-500">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

ConnectionRow.propTypes = {
  connection: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
    rateLimitedUntil: PropTypes.string,
    rateLimitProtection: PropTypes.bool,
    testStatus: PropTypes.string,
    isActive: PropTypes.bool,
    priority: PropTypes.number,
    lastError: PropTypes.string,
    lastErrorType: PropTypes.string,
    lastErrorSource: PropTypes.string,
    errorCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    globalPriority: PropTypes.number,
  }).isRequired,
  isOAuth: PropTypes.bool.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  onToggleRateLimit: PropTypes.func.isRequired,
  onRetest: PropTypes.func.isRequired,
  isRetesting: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReauth: PropTypes.func,
};

function AddApiKeyModal({
  isOpen,
  provider,
  providerName,
  isCompatible,
  isAnthropic,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: "",
    apiKey: "",
    priority: 1,
  });
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleValidate = async () => {
    setValidating(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/providers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, apiKey: formData.apiKey }),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async () => {
    if (!provider || !formData.apiKey) return;

    setSaving(true);
    setSaveError(null);
    try {
      let isValid = false;
      try {
        setValidating(true);
        setValidationResult(null);
        const res = await fetch("/api/providers/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider, apiKey: formData.apiKey }),
        });
        const data = await res.json();
        isValid = !!data.valid;
        setValidationResult(isValid ? "success" : "failed");
      } catch {
        setValidationResult("failed");
      } finally {
        setValidating(false);
      }

      if (!isValid) {
        setSaveError("API key validation failed. Please check your key and try again.");
        return;
      }

      const error = await onSave({
        name: formData.name,
        apiKey: formData.apiKey,
        priority: formData.priority,
        testStatus: "active",
      });
      if (error) {
        setSaveError(typeof error === "string" ? error : "Failed to save connection");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!provider) return null;

  return (
    <Modal isOpen={isOpen} title={`Add ${providerName || provider} API Key`} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Production Key"
        />
        <div className="flex gap-2">
          <Input
            label="API Key"
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            className="flex-1"
          />
          <div className="pt-6">
            <Button
              onClick={handleValidate}
              disabled={!formData.apiKey || validating || saving}
              variant="secondary"
            >
              {validating ? "Checking..." : "Check"}
            </Button>
          </div>
        </div>
        {validationResult && (
          <Badge variant={validationResult === "success" ? "success" : "error"}>
            {validationResult === "success" ? "Valid" : "Invalid"}
          </Badge>
        )}
        {saveError && (
          <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {saveError}
          </div>
        )}
        {isCompatible && (
          <p className="text-xs text-text-muted">
            {isAnthropic
              ? `Validation checks ${providerName || "Anthropic Compatible"} by verifying the API key.`
              : `Validation checks ${providerName || "OpenAI Compatible"} via /models on your base URL.`}
          </p>
        )}
        <Input
          label="Priority"
          type="number"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: Number.parseInt(e.target.value) || 1 })
          }
        />
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={!formData.name || !formData.apiKey || saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

AddApiKeyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  provider: PropTypes.string,
  providerName: PropTypes.string,
  isCompatible: PropTypes.bool,
  isAnthropic: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

function EditConnectionModal({ isOpen, connection, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    priority: 1,
    apiKey: "",
    healthCheckInterval: 60,
  });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (connection) {
      setFormData({
        name: connection.name || "",
        priority: connection.priority || 1,
        apiKey: "",
        healthCheckInterval: connection.healthCheckInterval ?? 60,
      });
      setTestResult(null);
      setValidationResult(null);
    }
  }, [connection]);

  const handleTest = async () => {
    if (!connection?.provider) return;
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(`/api/providers/${connection.id}/test`, { method: "POST" });
      const data = await res.json();
      setTestResult({
        valid: !!data.valid,
        diagnosis: data.diagnosis || null,
        message: data.error || null,
      });
    } catch {
      setTestResult({
        valid: false,
        diagnosis: { type: "network_error" },
        message: "Failed to test connection",
      });
    } finally {
      setTesting(false);
    }
  };

  const handleValidate = async () => {
    if (!connection?.provider || !formData.apiKey) return;
    setValidating(true);
    setValidationResult(null);
    try {
      const res = await fetch("/api/providers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: connection.provider, apiKey: formData.apiKey }),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const updates: any = {
        name: formData.name,
        priority: formData.priority,
        healthCheckInterval: formData.healthCheckInterval,
      };
      if (!isOAuth && formData.apiKey) {
        updates.apiKey = formData.apiKey;
        let isValid = validationResult === "success";
        if (!isValid) {
          try {
            setValidating(true);
            setValidationResult(null);
            const res = await fetch("/api/providers/validate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ provider: connection.provider, apiKey: formData.apiKey }),
            });
            const data = await res.json();
            isValid = !!data.valid;
            setValidationResult(isValid ? "success" : "failed");
          } catch {
            setValidationResult("failed");
          } finally {
            setValidating(false);
          }
        }
        if (isValid) {
          updates.testStatus = "active";
          updates.lastError = null;
          updates.lastErrorAt = null;
          updates.lastErrorType = null;
          updates.lastErrorSource = null;
          updates.errorCode = null;
          updates.rateLimitedUntil = null;
        }
      }
      await onSave(updates);
    } finally {
      setSaving(false);
    }
  };

  if (!connection) return null;

  const isOAuth = connection.authType === "oauth";
  const isCompatible =
    isOpenAICompatibleProvider(connection.provider) ||
    isAnthropicCompatibleProvider(connection.provider);
  const testErrorMeta =
    !testResult?.valid && testResult?.diagnosis?.type
      ? ERROR_TYPE_LABELS[testResult.diagnosis.type] || null
      : null;

  return (
    <Modal isOpen={isOpen} title="Edit Connection" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={isOAuth ? "Account name" : "Production Key"}
        />
        {isOAuth && connection.email && (
          <div className="bg-sidebar/50 p-3 rounded-lg">
            <p className="text-sm text-text-muted mb-1">Email</p>
            <p className="font-medium">{connection.email}</p>
          </div>
        )}
        {isOAuth && (
          <Input
            label="Health Check (min)"
            type="number"
            value={formData.healthCheckInterval}
            onChange={(e) =>
              setFormData({
                ...formData,
                healthCheckInterval: Math.max(0, Number.parseInt(e.target.value) || 0),
              })
            }
            hint="Proactive token refresh interval. 0 = disabled."
          />
        )}
        <Input
          label="Priority"
          type="number"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: Number.parseInt(e.target.value) || 1 })
          }
        />
        {!isOAuth && (
          <>
            <div className="flex gap-2">
              <Input
                label="API Key"
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder="Enter new API key"
                hint="Leave blank to keep the current API key."
                className="flex-1"
              />
              <div className="pt-6">
                <Button
                  onClick={handleValidate}
                  disabled={!formData.apiKey || validating || saving}
                  variant="secondary"
                >
                  {validating ? "Checking..." : "Check"}
                </Button>
              </div>
            </div>
            {validationResult && (
              <Badge variant={validationResult === "success" ? "success" : "error"}>
                {validationResult === "success" ? "Valid" : "Invalid"}
              </Badge>
            )}
          </>
        )}

        {/* Test Connection */}
        {!isCompatible && (
          <div className="flex items-center gap-3">
            <Button onClick={handleTest} variant="secondary" disabled={testing}>
              {testing ? "Testing..." : "Test Connection"}
            </Button>
            {testResult && (
              <>
                <Badge variant={testResult.valid ? "success" : "error"}>
                  {testResult.valid ? "Valid" : "Failed"}
                </Badge>
                {testErrorMeta && (
                  <Badge variant={testErrorMeta.variant}>{testErrorMeta.label}</Badge>
                )}
              </>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleSubmit} fullWidth disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

EditConnectionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  connection: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    priority: PropTypes.number,
    authType: PropTypes.string,
    provider: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

function EditCompatibleNodeModal({ isOpen, node, onSave, onClose, isAnthropic }) {
  const [formData, setFormData] = useState({
    name: "",
    prefix: "",
    apiType: "chat",
    baseUrl: "https://api.openai.com/v1",
  });
  const [saving, setSaving] = useState(false);
  const [checkKey, setCheckKey] = useState("");
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  useEffect(() => {
    if (node) {
      setFormData({
        name: node.name || "",
        prefix: node.prefix || "",
        apiType: node.apiType || "chat",
        baseUrl:
          node.baseUrl ||
          (isAnthropic ? "https://api.anthropic.com/v1" : "https://api.openai.com/v1"),
      });
    }
  }, [node, isAnthropic]);

  const apiTypeOptions = [
    { value: "chat", label: "Chat Completions" },
    { value: "responses", label: "Responses API" },
  ];

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim()) return;
    setSaving(true);
    try {
      const payload: any = {
        name: formData.name,
        prefix: formData.prefix,
        baseUrl: formData.baseUrl,
      };
      if (!isAnthropic) {
        payload.apiType = formData.apiType;
      }
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async () => {
    setValidating(true);
    try {
      const res = await fetch("/api/provider-nodes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: formData.baseUrl,
          apiKey: checkKey,
          type: isAnthropic ? "anthropic-compatible" : "openai-compatible",
        }),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };

  if (!node) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={`Edit ${isAnthropic ? "Anthropic" : "OpenAI"} Compatible`}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={`${isAnthropic ? "Anthropic" : "OpenAI"} Compatible (Prod)`}
          hint="Required. A friendly label for this node."
        />
        <Input
          label="Prefix"
          value={formData.prefix}
          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
          placeholder={isAnthropic ? "ac-prod" : "oc-prod"}
          hint="Required. Used as the provider prefix for model IDs."
        />
        {!isAnthropic && (
          <Select
            label="API Type"
            options={apiTypeOptions}
            value={formData.apiType}
            onChange={(e) => setFormData({ ...formData, apiType: e.target.value })}
          />
        )}
        <Input
          label="Base URL"
          value={formData.baseUrl}
          onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
          placeholder={isAnthropic ? "https://api.anthropic.com/v1" : "https://api.openai.com/v1"}
          hint={`Use the base URL (ending in /v1) for your ${isAnthropic ? "Anthropic" : "OpenAI"}-compatible API.`}
        />
        <div className="flex gap-2">
          <Input
            label="API Key (for Check)"
            type="password"
            value={checkKey}
            onChange={(e) => setCheckKey(e.target.value)}
            className="flex-1"
          />
          <div className="pt-6">
            <Button
              onClick={handleValidate}
              disabled={!checkKey || validating || !formData.baseUrl.trim()}
              variant="secondary"
            >
              {validating ? "Checking..." : "Check"}
            </Button>
          </div>
        </div>
        {validationResult && (
          <Badge variant={validationResult === "success" ? "success" : "error"}>
            {validationResult === "success" ? "Valid" : "Invalid"}
          </Badge>
        )}
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={
              !formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim() || saving
            }
          >
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

EditCompatibleNodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  node: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    prefix: PropTypes.string,
    apiType: PropTypes.string,
    baseUrl: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isAnthropic: PropTypes.bool,
};
