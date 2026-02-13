"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge, Modal, Input, ModelSelectModal } from "@/shared/components";
import Image from "next/image";

export default function AntigravityToolCard({
  tool,
  isExpanded,
  onToggle,
  baseUrl,
  apiKeys,
  activeProviders,
  hasActiveProviders,
  cloudEnabled,
}) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [sudoPassword, setSudoPassword] = useState("");
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [message, setMessage] = useState(null);
  const [modelMappings, setModelMappings] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEditingAlias, setCurrentEditingAlias] = useState(null);

  useEffect(() => {
    if (apiKeys?.length > 0 && !selectedApiKey) {
      setSelectedApiKey(apiKeys[0].key);
    }
  }, [apiKeys, selectedApiKey]);

  useEffect(() => {
    if (isExpanded && !status) {
      fetchStatus();
      loadSavedMappings();
    }
  }, [isExpanded, status]);

  const loadSavedMappings = async () => {
    try {
      const res = await fetch("/api/cli-tools/antigravity-mitm/alias?tool=antigravity");
      if (res.ok) {
        const data = await res.json();
        const aliases = data.aliases || {};

        if (Object.keys(aliases).length > 0) {
          setModelMappings(aliases);
        }
      }
    } catch (error) {
      console.log("Error loading saved mappings:", error);
    }
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/cli-tools/antigravity-mitm");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (error) {
      console.log("Error fetching status:", error);
      setStatus({ running: false });
    }
  };

  // Windows uses UAC dialog, no sudo needed
  const isWindows = typeof navigator !== "undefined" && navigator.userAgent?.includes("Windows");

  const handleStart = () => {
    if (isWindows || status?.hasCachedPassword) {
      doStart("");
    } else {
      setShowPasswordModal(true);
      setMessage(null);
    }
  };

  const handleStop = () => {
    if (isWindows || status?.hasCachedPassword) {
      doStop("");
    } else {
      setShowPasswordModal(true);
      setMessage(null);
    }
  };

  const doStart = async (password) => {
    setLoading(true);
    setMessage(null);
    try {
      const keyToUse =
        selectedApiKey?.trim() ||
        (apiKeys?.length > 0 ? apiKeys[0].key : null) ||
        (!cloudEnabled ? "sk_omniroute" : null);

      const res = await fetch("/api/cli-tools/antigravity-mitm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: keyToUse, sudoPassword: password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "MITM started" });
        setShowPasswordModal(false);
        setSudoPassword("");
        fetchStatus();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to start" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const doStop = async (password) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/antigravity-mitm", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sudoPassword: password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "MITM stopped" });
        setShowPasswordModal(false);
        setSudoPassword("");
        fetchStatus();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to stop" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPassword = () => {
    if (!sudoPassword.trim()) {
      setMessage({ type: "error", text: "Sudo password is required" });
      return;
    }
    if (status?.running) {
      doStop(sudoPassword);
    } else {
      doStart(sudoPassword);
    }
  };

  const openModelSelector = (alias) => {
    setCurrentEditingAlias(alias);
    setModalOpen(true);
  };

  const handleModelSelect = (model) => {
    if (currentEditingAlias) {
      setModelMappings((prev) => ({
        ...prev,
        [currentEditingAlias]: model.value,
      }));
    }
  };

  const handleModelMappingChange = (alias, value) => {
    setModelMappings((prev) => ({
      ...prev,
      [alias]: value,
    }));
  };

  const handleSaveMappings = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/cli-tools/antigravity-mitm/alias", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "antigravity", mappings: modelMappings }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save mappings");
      }

      setMessage({ type: "success", text: "Mappings saved!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const isRunning = status?.running;

  return (
    <Card padding="sm" className="overflow-hidden">
      <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center shrink-0">
            <Image
              src="/providers/antigravity.png"
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
              {isRunning ? (
                <Badge variant="success" size="sm">
                  Active
                </Badge>
              ) : (
                <Badge variant="default" size="sm">
                  Inactive
                </Badge>
              )}
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
          {/* Start/Stop Button - always on top */}
          <div className="flex items-center gap-2">
            {isRunning ? (
              <button
                onClick={handleStop}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 font-medium text-sm flex items-center gap-2 hover:bg-red-500/20 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">stop_circle</span>
                Stop MITM
              </button>
            ) : (
              <button
                onClick={handleStart}
                disabled={loading || !hasActiveProviders}
                className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-medium text-sm flex items-center gap-2 hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                Start MITM
              </button>
            )}
          </div>

          {message?.type === "error" && (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded text-xs bg-red-500/10 text-red-600">
              <span className="material-symbols-outlined text-[14px]">error</span>
              <span>{message.text}</span>
            </div>
          )}

          {/* When running: API Key + Model Mappings */}
          {isRunning && (
            <>
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

              {tool.defaultModels.map((model) => (
                <div key={model.alias} className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    {model.name}
                  </span>
                  <span className="material-symbols-outlined text-text-muted text-[14px]">
                    arrow_forward
                  </span>
                  <input
                    type="text"
                    value={modelMappings[model.alias] || ""}
                    onChange={(e) => handleModelMappingChange(model.alias, e.target.value)}
                    placeholder="provider/model-id"
                    className="flex-1 px-2 py-1.5 bg-surface rounded border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <button
                    onClick={() => openModelSelector(model.alias)}
                    disabled={!hasActiveProviders}
                    className={`px-2 py-1.5 rounded border text-xs transition-colors shrink-0 whitespace-nowrap ${hasActiveProviders ? "bg-surface border-border text-text-main hover:border-primary cursor-pointer" : "opacity-50 cursor-not-allowed border-border"}`}
                  >
                    Select
                  </button>
                  {modelMappings[model.alias] && (
                    <button
                      onClick={() => handleModelMappingChange(model.alias, "")}
                      className="p-1 text-text-muted hover:text-red-500 rounded transition-colors"
                      title="Clear"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveMappings}
                  disabled={loading || Object.keys(modelMappings).length === 0}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">save</span>
                  Save Mappings
                </Button>
              </div>
            </>
          )}

          {/* When stopped: how it works */}
          {!isRunning && (
            <div className="flex flex-col gap-1.5 px-1">
              <p className="text-xs text-text-muted">
                <span className="font-medium text-text-main">How it works:</span> Intercepts
                Antigravity traffic via DNS redirect, letting you reroute models through OmniRoute.
              </p>
              <div className="flex flex-col gap-0.5 text-[11px] text-text-muted">
                <span>1. Generates SSL cert & adds to system keychain</span>
                <span>
                  2. Redirects{" "}
                  <code className="text-[10px] bg-surface px-1 rounded">
                    daily-cloudcode-pa.googleapis.com
                  </code>{" "}
                  → localhost
                </span>
                <span>3. Maps Antigravity models to any provider via OmniRoute</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setSudoPassword("");
          setMessage(null);
        }}
        title="Sudo Password Required"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <span className="material-symbols-outlined text-yellow-500 text-[20px]">warning</span>
            <p className="text-xs text-text-muted">
              Required for SSL certificate and DNS configuration
            </p>
          </div>

          <Input
            type="password"
            placeholder="Enter sudo password"
            value={sudoPassword}
            onChange={(e) => setSudoPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleConfirmPassword();
            }}
          />

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

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowPasswordModal(false);
                setSudoPassword("");
                setMessage(null);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmPassword} loading={loading}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Model Select Modal */}
      <ModelSelectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleModelSelect}
        selectedModel={currentEditingAlias ? modelMappings[currentEditingAlias] : null}
        activeProviders={activeProviders}
        title={`Select model for ${currentEditingAlias}`}
      />
    </Card>
  );
}
