"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, ModelSelectModal, ManualConfigModal } from "@/shared/components";
import Image from "next/image";

const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL;

export default function ClineToolCard({
  tool,
  isExpanded,
  onToggle,
  baseUrl,
  hasActiveProviders,
  apiKeys,
  activeProviders,
  cloudEnabled,
}) {
  const [clineStatus, setClineStatus] = useState(null);
  const [checkingCline, setCheckingCline] = useState(false);
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
  const cliReady = !!(clineStatus?.installed && clineStatus?.runnable);

  const getConfigStatus = () => {
    if (!cliReady) return null;
    if (!clineStatus.hasOmniRoute) return "not_configured";
    const baseUrlVal = clineStatus.settings?.openAiBaseUrl || "";
    const localMatch = baseUrlVal.includes("localhost") || baseUrlVal.includes("127.0.0.1");
    const cloudMatch = cloudEnabled && CLOUD_URL && baseUrlVal.startsWith(CLOUD_URL);
    if (localMatch || cloudMatch) return "configured";
    return "other";
  };

  const configStatus = getConfigStatus();

  useEffect(() => {
    if (apiKeys?.length > 0 && !selectedApiKey) {
      setSelectedApiKey(apiKeys[0].key);
    }
  }, [apiKeys, selectedApiKey]);

  useEffect(() => {
    if (isExpanded && !clineStatus) {
      checkClineStatus();
      fetchModelAliases();
      fetchBackups();
    }
  }, [isExpanded, clineStatus]);

  useEffect(() => {
    if (clineStatus?.settings && !hasInitializedModel.current) {
      const currentModel = clineStatus.settings.openAiModelId;
      if (currentModel) {
        setSelectedModel(currentModel);
        hasInitializedModel.current = true;
      }
    }
  }, [clineStatus]);

  const fetchModelAliases = async () => {
    try {
      const res = await fetch("/api/models/alias");
      if (res.ok) {
        const data = await res.json();
        setModelAliases(data.aliases || {});
      }
    } catch {
      /* ignore */
    }
  };

  const fetchBackups = async () => {
    try {
      const res = await fetch("/api/cli-tools/backups?toolId=cline");
      if (res.ok) {
        const data = await res.json();
        setBackups(data.backups || []);
      }
    } catch {
      /* ignore */
    }
  };

  const handleRestoreBackup = async (backupId) => {
    setRestoringBackup(backupId);
    try {
      const res = await fetch("/api/cli-tools/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId: "cline", backupId }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Backup restored! Reloading status..." });
        await checkClineStatus();
        await fetchBackups();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to restore backup" });
      }
    } catch (e) {
      setMessage({ type: "error", text: e.message });
    } finally {
      setRestoringBackup(null);
    }
  };

  const checkClineStatus = async () => {
    setCheckingCline(true);
    try {
      const res = await fetch("/api/cli-tools/cline-settings");
      const data = await res.json();
      setClineStatus(data);
    } catch (error) {
      setClineStatus({ error: error.message });
    } finally {
      setCheckingCline(false);
    }
  };

  const getEffectiveBaseUrl = () => {
    if (customBaseUrl) return customBaseUrl;
    return baseUrl || "http://localhost:20128";
  };

  const handleApply = async () => {
    setApplying(true);
    setMessage(null);
    try {
      const effectiveBaseUrl = getEffectiveBaseUrl();
      const normalizedBaseUrl = effectiveBaseUrl.endsWith("/v1")
        ? effectiveBaseUrl
        : `${effectiveBaseUrl}/v1`;

      const res = await fetch("/api/cli-tools/cline-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: normalizedBaseUrl,
          apiKey: selectedApiKey || "sk_omniroute",
          model: selectedModel,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || "Applied!" });
        await checkClineStatus();
        await fetchBackups();
      } else {
        setMessage({ type: "error", text: data.error || "Failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setApplying(false);
    }
  };

  const handleReset = async () => {
    setRestoring(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/cline-settings", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || "Reset!" });
        setSelectedModel("");
        hasInitializedModel.current = false;
        await checkClineStatus();
        await fetchBackups();
      } else {
        setMessage({ type: "error", text: data.error || "Failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setRestoring(false);
    }
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model.value);
    setModalOpen(false);
  };

  const handleManualConfig = (config) => {
    if (config.model) setSelectedModel(config.model);
    if (config.apiKey) setSelectedApiKey(config.apiKey);
    if (config.baseUrl) setCustomBaseUrl(config.baseUrl);
    setShowManualConfigModal(false);
  };

  const renderStatusBadge = () => {
    if (!cliReady) return null;
    const badges = {
      configured: {
        class: "bg-green-500/10 text-green-600 dark:text-green-400",
        text: "Connected",
      },
      not_configured: {
        class: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
        text: "Not configured",
      },
      other: { class: "bg-blue-500/10 text-blue-600 dark:text-blue-400", text: "Custom config" },
    };
    const badge = badges[configStatus];
    if (!badge) return null;
    return (
      <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${badge.class}`}>
        {badge.text}
      </span>
    );
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0">
            {tool.image ? (
              <Image
                src={tool.image}
                alt={tool.name}
                width={32}
                height={32}
                className="size-8 object-contain rounded-lg"
                sizes="32px"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <span className="material-symbols-outlined text-xl" style={{ color: tool.color }}>
                terminal
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{tool.name}</h3>
              {renderStatusBadge()}
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
        <div className="mt-6 pt-6 border-t border-border">
          {checkingCline && (
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <span className="material-symbols-outlined animate-spin text-base">
                progress_activity
              </span>
              <span>Checking Cline CLI...</span>
            </div>
          )}

          {clineStatus && !checkingCline && (
            <div className="flex flex-col gap-4">
              {/* Runtime status */}
              <div className="flex items-start gap-3 p-3 rounded-lg border bg-bg-secondary/50 border-border">
                <span
                  className={`material-symbols-outlined text-lg ${cliReady ? "text-green-500" : "text-yellow-500"}`}
                >
                  {cliReady ? "check_circle" : "warning"}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">
                    {cliReady
                      ? "Cline CLI detected and ready"
                      : clineStatus.installed
                        ? "Cline CLI installed but not runnable"
                        : "Cline CLI not detected"}
                  </p>
                  {clineStatus.commandPath && (
                    <p className="text-xs text-text-muted">
                      Binary:{" "}
                      <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">
                        {clineStatus.commandPath}
                      </code>
                    </p>
                  )}
                  {clineStatus.globalStatePath && (
                    <p className="text-xs text-text-muted">
                      Config:{" "}
                      <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">
                        {clineStatus.globalStatePath}
                      </code>
                    </p>
                  )}
                </div>
              </div>

              {cliReady && (
                <>
                  {/* Current config info */}
                  {configStatus === "configured" && (
                    <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <span className="material-symbols-outlined text-green-500 text-lg">
                        check_circle
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          OmniRoute is configured as OpenAI-compatible provider
                        </p>
                        <p className="text-xs text-text-muted">
                          Provider: <strong>openai</strong> • Model:{" "}
                          <strong>{clineStatus.settings?.openAiModelId || "—"}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Model selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-text-muted">Model</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        placeholder="provider/model-id"
                        className="flex-1 px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setModalOpen(true)}
                        disabled={!hasActiveProviders}
                      >
                        Select
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowManualConfigModal(true)}
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </Button>
                    </div>
                  </div>

                  {/* API Key selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-text-muted">API Key</label>
                    {apiKeys && apiKeys.length > 0 ? (
                      <select
                        value={selectedApiKey}
                        onChange={(e) => setSelectedApiKey(e.target.value)}
                        className="px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                      >
                        {apiKeys.map((key) => (
                          <option key={key.id} value={key.key}>
                            {key.key}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm text-text-muted">
                        {cloudEnabled ? "No API keys available" : "Using default: sk_omniroute"}
                      </p>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleApply}
                      disabled={!selectedModel}
                      loading={applying}
                    >
                      <span className="material-symbols-outlined text-[14px] mr-1">save</span>
                      {configStatus === "configured" ? "Update Config" : "Apply Config"}
                    </Button>
                    {configStatus === "configured" && (
                      <Button variant="outline" size="sm" onClick={handleReset} loading={restoring}>
                        <span className="material-symbols-outlined text-[14px] mr-1">
                          restart_alt
                        </span>
                        Reset
                      </Button>
                    )}
                  </div>

                  {/* Message */}
                  {message && (
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${message.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {message.type === "success" ? "check_circle" : "error"}
                      </span>
                      <span>{message.text}</span>
                    </div>
                  )}

                  {/* Backups section */}
                  <div className="border-t border-border pt-3 mt-1">
                    <button
                      onClick={() => setShowBackups(!showBackups)}
                      className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] transition-transform ${showBackups ? "rotate-90" : ""}`}
                      >
                        chevron_right
                      </span>
                      <span className="material-symbols-outlined text-[16px]">backup</span>
                      Backups {backups.length > 0 && `(${backups.length})`}
                    </button>
                    {showBackups && backups.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1.5 pl-6">
                        {backups.map((b) => (
                          <div
                            key={b.id}
                            className="flex items-center justify-between gap-2 p-2 rounded bg-bg-secondary/50 text-xs"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{b.originalFile}</span>
                              <span className="text-text-muted">
                                {new Date(b.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRestoreBackup(b.id)}
                              loading={restoringBackup === b.id}
                            >
                              Restore
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {showBackups && backups.length === 0 && (
                      <p className="mt-2 pl-6 text-xs text-text-muted">No backups available.</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <ModelSelectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectModel}
        selectedModel={selectedModel}
        activeProviders={activeProviders}
        title="Select Model for Cline"
      />
      <ManualConfigModal
        isOpen={showManualConfigModal}
        onClose={() => setShowManualConfigModal(false)}
        onApply={handleManualConfig}
        currentConfig={{
          model: selectedModel,
          apiKey: selectedApiKey,
          baseUrl: customBaseUrl || baseUrl,
        }}
        title="Cline Manual Configuration"
      />
    </Card>
  );
}
