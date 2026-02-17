"use client";

import { useState, useEffect } from "react";
import { Card, Button, ModelSelectModal, ManualConfigModal } from "@/shared/components";
import Image from "next/image";
import CliStatusBadge from "./CliStatusBadge";

export default function CodexToolCard({
  tool,
  isExpanded,
  onToggle,
  baseUrl,
  apiKeys,
  activeProviders,
  cloudEnabled,
  batchStatus,
}) {
  const [codexStatus, setCodexStatus] = useState(null);
  const [checkingCodex, setCheckingCodex] = useState(false);
  const [applying, setApplying] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modelAliases, setModelAliases] = useState({});
  const [showManualConfigModal, setShowManualConfigModal] = useState(false);
  const [customBaseUrl, setCustomBaseUrl] = useState("");
  // Profiles state
  const [profiles, setProfiles] = useState([]);
  const [showProfiles, setShowProfiles] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [activatingProfile, setActivatingProfile] = useState(null);
  // Backups state
  const [backups, setBackups] = useState([]);
  const [showBackups, setShowBackups] = useState(false);
  const [restoringBackup, setRestoringBackup] = useState(null);
  const cliReady = !!(codexStatus?.installed && codexStatus?.runnable);

  useEffect(() => {
    if (apiKeys?.length > 0 && !selectedApiKey) {
      setSelectedApiKey(apiKeys[0].key);
    }
  }, [apiKeys, selectedApiKey]);

  useEffect(() => {
    if (isExpanded && !codexStatus) {
      checkCodexStatus();
      fetchModelAliases();
      fetchProfiles();
      fetchBackups();
    }
  }, [isExpanded, codexStatus]);

  const fetchModelAliases = async () => {
    try {
      const res = await fetch("/api/models/alias");
      const data = await res.json();
      if (res.ok) setModelAliases(data.aliases || {});
    } catch (error) {
      console.log("Error fetching model aliases:", error);
    }
  };

  // Parse model from config content (don't sync URL - always use baseUrl from props)
  useEffect(() => {
    if (codexStatus?.config) {
      const modelMatch = codexStatus.config.match(/^model\s*=\s*"([^"]+)"/m);
      if (modelMatch) setSelectedModel(modelMatch[1]);
    }
  }, [codexStatus]);

  const getConfigStatus = () => {
    if (!cliReady) return null;
    if (!codexStatus.config) return "not_configured";
    const hasBaseUrl =
      codexStatus.config.includes(baseUrl) ||
      codexStatus.config.includes("localhost") ||
      codexStatus.config.includes("127.0.0.1");
    return hasBaseUrl ? "configured" : "other";
  };

  const configStatus = getConfigStatus();

  // Use batch status as fallback when card hasn't been expanded yet
  const effectiveConfigStatus = configStatus || batchStatus?.configStatus || null;

  const getEffectiveBaseUrl = () => {
    const url = customBaseUrl || `${baseUrl}/v1`;
    // Ensure URL ends with /v1
    return url.endsWith("/v1") ? url : `${url}/v1`;
  };

  const getDisplayUrl = () => customBaseUrl || `${baseUrl}/v1`;

  const checkCodexStatus = async () => {
    setCheckingCodex(true);
    try {
      const res = await fetch("/api/cli-tools/codex-settings");
      const data = await res.json();
      setCodexStatus(data);
    } catch (error) {
      setCodexStatus({ installed: false, error: error.message });
    } finally {
      setCheckingCodex(false);
    }
  };

  const handleApplySettings = async () => {
    setApplying(true);
    setMessage(null);
    try {
      // Use sk_omniroute for localhost if no key, otherwise use selected key
      const keyToUse =
        selectedApiKey && selectedApiKey.trim()
          ? selectedApiKey
          : !cloudEnabled
            ? "sk_omniroute"
            : selectedApiKey;

      const res = await fetch("/api/cli-tools/codex-settings", {
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
        checkCodexStatus();
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
      const res = await fetch("/api/cli-tools/codex-settings", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Settings reset successfully!" });
        setSelectedModel("");
        checkCodexStatus();
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

  // ── Profiles ──
  const fetchProfiles = async () => {
    try {
      const res = await fetch("/api/cli-tools/codex-profiles");
      const data = await res.json();
      if (res.ok) setProfiles(data.profiles || []);
    } catch (error) {
      console.log("Error fetching profiles:", error);
    }
  };

  const handleSaveProfile = async () => {
    if (!newProfileName.trim()) return;
    setSavingProfile(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/codex-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProfileName.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: `Profile "${newProfileName}" saved!` });
        setNewProfileName("");
        fetchProfiles();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save profile" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleActivateProfile = async (profileId) => {
    setActivatingProfile(profileId);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/codex-profiles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || "Profile activated!" });
        checkCodexStatus();
        fetchBackups();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to activate profile" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setActivatingProfile(null);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    try {
      const res = await fetch("/api/cli-tools/codex-profiles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId }),
      });
      if (res.ok) fetchProfiles();
    } catch (error) {
      console.log("Error deleting profile:", error);
    }
  };

  // ── Backups ──
  const fetchBackups = async () => {
    try {
      const res = await fetch("/api/cli-tools/backups?tool=codex");
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
        body: JSON.stringify({ tool: "codex", backupId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Backup restored!" });
        checkCodexStatus();
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

    const configContent = `# OmniRoute Configuration for Codex CLI
model = "${selectedModel}"
model_provider = "omniroute"

[model_providers.omniroute]
name = "OmniRoute"
base_url = "${getEffectiveBaseUrl()}"
wire_api = "responses"
`;

    const authContent = JSON.stringify(
      {
        OPENAI_API_KEY: keyToUse,
      },
      null,
      2
    );

    return [
      {
        filename: "~/.codex/config.toml",
        content: configContent,
      },
      {
        filename: "~/.codex/auth.json",
        content: authContent,
      },
    ];
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center shrink-0">
            <Image
              src="/providers/codex.png"
              alt={tool.name}
              width={32}
              height={32}
              className="size-8 object-contain rounded-lg"
              sizes="32px"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{tool.name}</h3>
              <CliStatusBadge
                effectiveConfigStatus={effectiveConfigStatus}
                batchStatus={batchStatus}
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
          {checkingCodex && (
            <div className="flex items-center gap-2 text-text-muted">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              <span>Checking Codex CLI...</span>
            </div>
          )}

          {!checkingCodex && codexStatus && !cliReady && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <span className="material-symbols-outlined text-yellow-500">warning</span>
                <div className="flex-1">
                  <p className="font-medium text-yellow-600 dark:text-yellow-400">
                    {codexStatus.installed ? "Codex CLI not runnable" : "Codex CLI not installed"}
                  </p>
                  <p className="text-sm text-text-muted">
                    {codexStatus.installed
                      ? `Codex CLI was found but failed runtime healthcheck${codexStatus.reason ? ` (${codexStatus.reason})` : ""}.`
                      : "Please install Codex CLI to use auto-apply feature."}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInstallGuide(!showInstallGuide)}
                >
                  <span className="material-symbols-outlined text-[18px] mr-1">
                    {showInstallGuide ? "expand_less" : "help"}
                  </span>
                  {showInstallGuide ? "Hide" : "How to Install"}
                </Button>
              </div>
              {showInstallGuide && (
                <div className="p-4 bg-surface border border-border rounded-lg">
                  <h4 className="font-medium mb-3">Installation Guide</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-text-muted mb-1">macOS / Linux / Windows:</p>
                      <code className="block px-3 py-2 bg-black/5 dark:bg-white/5 rounded font-mono text-xs">
                        npm install -g @openai/codex
                      </code>
                    </div>
                    <p className="text-text-muted">
                      After installation, run{" "}
                      <code className="px-1 bg-black/5 dark:bg-white/5 rounded">codex</code> to
                      verify.
                    </p>
                    <div className="pt-2 border-t border-border">
                      <p className="text-text-muted text-xs">
                        Codex uses{" "}
                        <code className="px-1 bg-black/5 dark:bg-white/5 rounded">
                          ~/.codex/auth.json
                        </code>{" "}
                        with{" "}
                        <code className="px-1 bg-black/5 dark:bg-white/5 rounded">
                          OPENAI_API_KEY
                        </code>
                        . Click &quot;Apply&quot; to auto-configure.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!checkingCodex && cliReady && (
            <>
              <div className="flex flex-col gap-2">
                {/* Current Base URL */}
                {codexStatus?.config &&
                  (() => {
                    const parsed = codexStatus.config.match(/base_url\s*=\s*"([^"]+)"/);
                    const currentBaseUrl = parsed ? parsed[1] : null;
                    return currentBaseUrl ? (
                      <div className="flex items-center gap-2">
                        <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                          Current
                        </span>
                        <span className="material-symbols-outlined text-text-muted text-[14px]">
                          arrow_forward
                        </span>
                        <span className="flex-1 px-2 py-1.5 text-xs text-text-muted truncate">
                          {currentBaseUrl}
                        </span>
                      </div>
                    ) : null;
                  })()}

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
                  {customBaseUrl && customBaseUrl !== `${baseUrl}/v1` && (
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
                    disabled={!activeProviders?.length}
                    className={`px-2 py-1.5 rounded border text-xs transition-colors shrink-0 whitespace-nowrap ${activeProviders?.length ? "bg-surface border-border text-text-main hover:border-primary cursor-pointer" : "opacity-50 cursor-not-allowed border-border"}`}
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
                  disabled={!selectedApiKey || !selectedModel}
                  loading={applying}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">save</span>Apply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetSettings}
                  disabled={!codexStatus.hasOmniRoute}
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
                    setShowProfiles(!showProfiles);
                    if (!showProfiles) fetchProfiles();
                  }}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">
                    manage_accounts
                  </span>
                  Profiles
                </Button>
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

              {/* Profiles Section */}
              {showProfiles && (
                <div className="mt-2 p-3 bg-surface border border-border rounded-lg">
                  <h4 className="text-xs font-semibold text-text-main mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">manage_accounts</span>
                    Saved Profiles
                  </h4>
                  {profiles.length === 0 ? (
                    <p className="text-xs text-text-muted">
                      No profiles saved yet. Save current config as a profile below.
                    </p>
                  ) : (
                    <div className="space-y-1.5 mb-3">
                      {profiles.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-2 px-2 py-1.5 bg-black/5 dark:bg-white/5 rounded text-xs"
                        >
                          <span className="material-symbols-outlined text-[14px] text-text-muted">
                            person
                          </span>
                          <span className="font-medium flex-1 truncate">{p.name}</span>
                          <span
                            className="text-text-muted truncate max-w-[140px]"
                            title={p.authLabel}
                          >
                            {p.authLabel}
                          </span>
                          <button
                            onClick={() => handleActivateProfile(p.id)}
                            disabled={activatingProfile === p.id}
                            className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
                          >
                            {activatingProfile === p.id ? "..." : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteProfile(p.id)}
                            className="p-0.5 text-text-muted hover:text-red-500 transition-colors"
                            title="Delete profile"
                          >
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      placeholder="Profile name (e.g. Personal Account)"
                      className="flex-1 px-2 py-1.5 bg-surface rounded border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                      onKeyDown={(e) => e.key === "Enter" && handleSaveProfile()}
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSaveProfile}
                      disabled={!newProfileName.trim()}
                      loading={savingProfile}
                    >
                      <span className="material-symbols-outlined text-[14px] mr-1">save</span>Save
                      Current
                    </Button>
                  </div>
                </div>
              )}

              {/* Backups Section */}
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
        title="Select Model for Codex"
      />

      <ManualConfigModal
        isOpen={showManualConfigModal}
        onClose={() => setShowManualConfigModal(false)}
        title="Codex CLI - Manual Configuration"
        configs={getManualConfigs()}
      />
    </Card>
  );
}
