"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, ModelSelectModal, ManualConfigModal } from "@/shared/components";
import Image from "next/image";
import CliStatusBadge from "./CliStatusBadge";

const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL;

export default function DroidToolCard({
  tool,
  isExpanded,
  onToggle,
  baseUrl,
  hasActiveProviders,
  apiKeys,
  activeProviders,
  cloudEnabled,
  batchStatus,
  lastConfiguredAt,
}) {
  const [droidStatus, setDroidStatus] = useState(null);
  const [checkingDroid, setCheckingDroid] = useState(false);
  const [applying, setApplying] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modelAliases, setModelAliases] = useState({});
  const [showManualConfigModal, setShowManualConfigModal] = useState(false);
  const [customBaseUrl, setCustomBaseUrl] = useState("");
  const hasInitializedModel = useRef(false);
  // Backups state
  const [backups, setBackups] = useState([]);
  const [showBackups, setShowBackups] = useState(false);
  const [restoringBackup, setRestoringBackup] = useState(null);
  const cliReady = !!(droidStatus?.installed && droidStatus?.runnable);

  const getConfigStatus = () => {
    if (!cliReady) return null;
    const currentConfig = droidStatus.settings?.customModels?.find(
      (m) => m.id === "custom:OmniRoute-0"
    );
    if (!currentConfig) return "not_configured";
    const localMatch =
      currentConfig.baseUrl?.includes("localhost") || currentConfig.baseUrl?.includes("127.0.0.1");
    const cloudMatch = cloudEnabled && CLOUD_URL && currentConfig.baseUrl?.startsWith(CLOUD_URL);
    if (localMatch || cloudMatch) return "configured";
    return "other";
  };

  const configStatus = getConfigStatus();

  // Use batch status as fallback when card hasn't been expanded yet
  const effectiveConfigStatus = configStatus || batchStatus?.configStatus || null;

  useEffect(() => {
    if (apiKeys?.length > 0 && !selectedApiKey) {
      setSelectedApiKey(apiKeys[0].key);
    }
  }, [apiKeys, selectedApiKey]);

  useEffect(() => {
    if (isExpanded && !droidStatus) {
      checkDroidStatus();
      fetchModelAliases();
      fetchBackups();
    }
  }, [isExpanded, droidStatus]);

  const fetchModelAliases = async () => {
    try {
      const res = await fetch("/api/models/alias");
      const data = await res.json();
      if (res.ok) setModelAliases(data.aliases || {});
    } catch (error) {
      console.log("Error fetching model aliases:", error);
    }
  };

  useEffect(() => {
    if (droidStatus?.installed && !hasInitializedModel.current) {
      hasInitializedModel.current = true;
      const customModel = droidStatus.settings?.customModels?.find(
        (m) => m.id === "custom:OmniRoute-0"
      );
      if (customModel) {
        if (customModel.model) setSelectedModel(customModel.model);
        if (customModel.apiKey && apiKeys?.some((k) => k.key === customModel.apiKey)) {
          setSelectedApiKey(customModel.apiKey);
        }
      }
    }
  }, [droidStatus, apiKeys]);

  const checkDroidStatus = async () => {
    setCheckingDroid(true);
    try {
      const res = await fetch("/api/cli-tools/droid-settings");
      const data = await res.json();
      setDroidStatus(data);
    } catch (error) {
      setDroidStatus({ installed: false, error: error.message });
    } finally {
      setCheckingDroid(false);
    }
  };

  const getEffectiveBaseUrl = () => {
    const url = customBaseUrl || baseUrl;
    return url.endsWith("/v1") ? url : `${url}/v1`;
  };

  const getDisplayUrl = () => {
    const url = customBaseUrl || baseUrl;
    return url.endsWith("/v1") ? url : `${url}/v1`;
  };

  const handleApplySettings = async () => {
    setApplying(true);
    setMessage(null);
    try {
      const keyToUse =
        selectedApiKey?.trim() ||
        (apiKeys?.length > 0 ? apiKeys[0].key : null) ||
        (!cloudEnabled ? "sk_omniroute" : null);

      const res = await fetch("/api/cli-tools/droid-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: getEffectiveBaseUrl(),
          apiKey: keyToUse,
          model: selectedModel,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Settings applied successfully!" });
        checkDroidStatus();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to apply settings" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setApplying(false);
    }
  };

  const handleResetSettings = async () => {
    setRestoring(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/droid-settings", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Settings reset successfully!" });
        setSelectedModel("");
        setSelectedApiKey("");
        checkDroidStatus();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to reset settings" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setRestoring(false);
    }
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model.value);
    setModalOpen(false);
  };

  // ── Backups ──
  const fetchBackups = async () => {
    try {
      const res = await fetch("/api/cli-tools/backups?tool=droid");
      const data = await res.json();
      if (res.ok) setBackups(data.backups || []);
    } catch (error) {
      console.log("Error fetching backups:", error);
    }
  };

  const handleRestoreBackup = async (backupId) => {
    setRestoringBackup(backupId);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "droid", backupId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Backup restored!" });
        checkDroidStatus();
        fetchBackups();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to restore" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setRestoringBackup(null);
    }
  };

  const getManualConfigs = () => {
    const keyToUse =
      selectedApiKey && selectedApiKey.trim()
        ? selectedApiKey
        : !cloudEnabled
          ? "sk_omniroute"
          : "<API_KEY_FROM_DASHBOARD>";

    const settingsContent = {
      customModels: [
        {
          model: selectedModel || "provider/model-id",
          id: "custom:OmniRoute-0",
          index: 0,
          baseUrl: getEffectiveBaseUrl(),
          apiKey: keyToUse,
          displayName: selectedModel || "provider/model-id",
          maxOutputTokens: 131072,
          noImageSupport: false,
          provider: "openai",
        },
      ],
    };

    const platform = typeof navigator !== "undefined" && navigator.platform;
    const isWindows = platform?.toLowerCase().includes("win");
    const settingsPath = isWindows
      ? "%USERPROFILE%\\.factory\\settings.json"
      : "~/.factory/settings.json";

    return [
      {
        filename: settingsPath,
        content: JSON.stringify(settingsContent, null, 2),
      },
    ];
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center shrink-0">
            <Image
              src="/providers/droid.png"
              alt={tool.name}
              width={32}
              height={32}
              className="size-8 object-contain rounded-lg"
              sizes="32px"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{tool.name}</h3>
              <CliStatusBadge
                effectiveConfigStatus={effectiveConfigStatus}
                batchStatus={batchStatus}
                lastConfiguredAt={lastConfiguredAt}
              />
            </div>
            <p className="text-xs text-text-muted truncate">{tool.description}</p>
          </div>
        </div>
        <span
          className={`material-symbols-outlined text-text-muted text-[20px] transition-transform ${isExpanded ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border flex flex-col gap-4">
          {checkingDroid && (
            <div className="flex items-center gap-2 text-text-muted">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              <span>Checking Factory Droid CLI...</span>
            </div>
          )}

          {!checkingDroid && droidStatus && !cliReady && (
            <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <span className="material-symbols-outlined text-yellow-500">warning</span>
              <div className="flex-1">
                <p className="font-medium text-yellow-600 dark:text-yellow-400">
                  {droidStatus.installed
                    ? "Factory Droid CLI not runnable"
                    : "Factory Droid CLI not installed"}
                </p>
                <p className="text-sm text-text-muted">
                  {droidStatus.installed
                    ? `Factory Droid CLI was found but failed runtime healthcheck${droidStatus.reason ? ` (${droidStatus.reason})` : ""}.`
                    : "Please install Factory Droid CLI to use this feature."}
                </p>
              </div>
            </div>
          )}

          {!checkingDroid && cliReady && (
            <>
              <div className="flex flex-col gap-2">
                {/* Current Base URL */}
                {droidStatus?.settings?.customModels?.find((m) => m.id === "custom:OmniRoute-0")
                  ?.baseUrl && (
                  <div className="flex items-center gap-2">
                    <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                      Current
                    </span>
                    <span className="material-symbols-outlined text-text-muted text-[14px]">
                      arrow_forward
                    </span>
                    <span className="flex-1 px-2 py-1.5 text-xs text-text-muted truncate">
                      {
                        droidStatus.settings.customModels.find((m) => m.id === "custom:OmniRoute-0")
                          .baseUrl
                      }
                    </span>
                  </div>
                )}

                {/* Base URL */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    Base URL
                  </span>
                  <span className="material-symbols-outlined text-text-muted text-[14px]">
                    arrow_forward
                  </span>
                  <input
                    type="text"
                    value={getDisplayUrl()}
                    onChange={(e) => setCustomBaseUrl(e.target.value)}
                    placeholder="https://.../v1"
                    className="flex-1 px-2 py-1.5 bg-surface rounded border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  {customBaseUrl && customBaseUrl !== baseUrl && (
                    <button
                      onClick={() => setCustomBaseUrl("")}
                      className="p-1 text-text-muted hover:text-primary rounded transition-colors"
                      title="Reset to default"
                    >
                      <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                    </button>
                  )}
                </div>

                {/* API Key */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    API Key
                  </span>
                  <span className="material-symbols-outlined text-text-muted text-[14px]">
                    arrow_forward
                  </span>
                  {apiKeys.length > 0 ? (
                    <select
                      value={selectedApiKey}
                      onChange={(e) => setSelectedApiKey(e.target.value)}
                      className="flex-1 px-2 py-1.5 bg-surface rounded text-xs border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                    >
                      {apiKeys.map((key) => (
                        <option key={key.id} value={key.key}>
                          {key.key}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="flex-1 text-xs text-text-muted px-2 py-1.5">
                      {cloudEnabled
                        ? "No API keys - Create one in Keys page"
                        : "sk_omniroute (default)"}
                    </span>
                  )}
                </div>

                {/* Model */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    Model
                  </span>
                  <span className="material-symbols-outlined text-text-muted text-[14px]">
                    arrow_forward
                  </span>
                  <input
                    type="text"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    placeholder="provider/model-id"
                    className="flex-1 px-2 py-1.5 bg-surface rounded border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <button
                    onClick={() => setModalOpen(true)}
                    disabled={!hasActiveProviders}
                    className={`px-2 py-1.5 rounded border text-xs transition-colors shrink-0 whitespace-nowrap ${hasActiveProviders ? "bg-surface border-border text-text-main hover:border-primary cursor-pointer" : "opacity-50 cursor-not-allowed border-border"}`}
                  >
                    Select Model
                  </button>
                  {selectedModel && (
                    <button
                      onClick={() => setSelectedModel("")}
                      className="p-1 text-text-muted hover:text-red-500 rounded transition-colors"
                      title="Clear"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  )}
                </div>
              </div>

              {message && (
                <div
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${message.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {message.type === "success" ? "check_circle" : "error"}
                  </span>
                  <span>{message.text}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApplySettings}
                  disabled={!selectedModel}
                  loading={applying}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">save</span>Apply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetSettings}
                  disabled={!droidStatus?.hasOmniRoute}
                  loading={restoring}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">restore</span>Reset
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowManualConfigModal(true)}>
                  <span className="material-symbols-outlined text-[14px] mr-1">content_copy</span>
                  Manual Config
                </Button>
                <div className="flex-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowBackups(!showBackups);
                    if (!showBackups) fetchBackups();
                  }}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">history</span>Backups
                  {backups.length > 0 && ` (${backups.length})`}
                </Button>
              </div>

              {showBackups && (
                <div className="mt-2 p-3 bg-surface border border-border rounded-lg">
                  <h4 className="text-xs font-semibold text-text-main mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">history</span>
                    Config Backups
                  </h4>
                  {backups.length === 0 ? (
                    <p className="text-xs text-text-muted">
                      No backups yet. Backups are created automatically before each Apply or Reset.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {backups.map((b) => (
                        <div
                          key={b.id}
                          className="flex items-center gap-2 px-2 py-1.5 bg-black/5 dark:bg-white/5 rounded text-xs"
                        >
                          <span className="material-symbols-outlined text-[14px] text-text-muted">
                            description
                          </span>
                          <span className="flex-1 truncate font-mono" title={b.id}>
                            {b.id}
                          </span>
                          <span className="text-text-muted whitespace-nowrap">
                            {new Date(b.createdAt).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleRestoreBackup(b.id)}
                            disabled={restoringBackup === b.id}
                            className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
                          >
                            {restoringBackup === b.id ? "..." : "Restore"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      <ModelSelectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleModelSelect}
        selectedModel={selectedModel}
        activeProviders={activeProviders}
        modelAliases={modelAliases}
        title="Select Model for Factory Droid"
      />

      <ManualConfigModal
        isOpen={showManualConfigModal}
        onClose={() => setShowManualConfigModal(false)}
        title="Factory Droid - Manual Configuration"
        configs={getManualConfigs()}
      />
    </Card>
  );
}
