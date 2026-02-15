"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { Card, Button, Input, Modal, CardSkeleton } from "@/shared/components";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { AI_PROVIDERS, getProviderByAlias } from "@/shared/constants/providers";

const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL;
const CLOUD_ACTION_TIMEOUT_MS = 15000;

export default function APIPageClient({ machineId }) {
  const [keys, setKeys] = useState([]);
  const [providerConnections, setProviderConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState(null);

  // Endpoints / models state
  const [allModels, setAllModels] = useState([]);
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);

  // Cloud sync state
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState(null);
  const [syncStep, setSyncStep] = useState(""); // "syncing" | "verifying" | "disabling" | ""
  const [selectedProvider, setSelectedProvider] = useState(null); // for provider models popup

  const { copied, copy } = useCopyToClipboard();

  useEffect(() => {
    fetchData();
    loadCloudSettings();
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await fetch("/v1/models");
      if (res.ok) {
        const data = await res.json();
        setAllModels(data.data || []);
      }
    } catch (e) {
      console.log("Error fetching models:", e);
    }
  };

  // Categorize models by endpoint type
  const endpointData = useMemo(() => {
    const chat = allModels.filter((m) => !m.type);
    const embeddings = allModels.filter((m) => m.type === "embedding");
    const images = allModels.filter((m) => m.type === "image");
    const rerank = allModels.filter((m) => m.type === "rerank");
    const audioTranscription = allModels.filter(
      (m) => m.type === "audio" && m.subtype === "transcription"
    );
    const audioSpeech = allModels.filter((m) => m.type === "audio" && m.subtype === "speech");
    const moderation = allModels.filter((m) => m.type === "moderation");
    return { chat, embeddings, images, rerank, audioTranscription, audioSpeech, moderation };
  }, [allModels]);

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

      return {
        id: providerId,
        provider: providerInfo,
        total: connections.length,
        connected,
        errors,
      };
    });
  }, [providerConnections]);

  const postCloudAction = async (action, timeoutMs = CLOUD_ACTION_TIMEOUT_MS) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch("/api/sync/cloud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (error) {
      if (error?.name === "AbortError") {
        return { ok: false, status: 408, data: { error: "Cloud request timeout" } };
      }
      return { ok: false, status: 500, data: { error: error.message || "Cloud request failed" } };
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const loadCloudSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setCloudEnabled(data.cloudEnabled || false);
      }
    } catch (error) {
      console.log("Error loading cloud settings:", error);
    }
  };

  const fetchData = async () => {
    try {
      const [keysRes, providersRes] = await Promise.all([
        fetch("/api/keys"),
        fetch("/api/providers"),
      ]);

      const [keysData, providersData] = await Promise.all([keysRes.json(), providersRes.json()]);

      if (keysRes.ok) {
        setKeys(keysData.keys || []);
      }

      if (providersRes.ok) {
        setProviderConnections(providersData.connections || []);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloudToggle = (checked) => {
    if (checked) {
      setShowCloudModal(true);
    } else {
      setShowDisableModal(true);
    }
  };

  const handleEnableCloud = async () => {
    setCloudSyncing(true);
    setSyncStep("syncing");
    try {
      const { ok, data } = await postCloudAction("enable");
      if (ok) {
        setSyncStep("verifying");

        if (data.verified) {
          setCloudEnabled(true);
          setCloudStatus({ type: "success", message: "Cloud Proxy connected and verified!" });
          setShowCloudModal(false);
        } else {
          setCloudEnabled(true);
          setCloudStatus({
            type: "warning",
            message: data.verifyError || "Connected but verification failed",
          });
          setShowCloudModal(false);
        }

        // Refresh keys list if new key was created
        if (data.createdKey) {
          await fetchData();
        }
      } else {
        setCloudStatus({ type: "error", message: data.error || "Failed to enable cloud" });
      }
    } catch (error) {
      setCloudStatus({ type: "error", message: error.message });
    } finally {
      setCloudSyncing(false);
      setSyncStep("");
    }
  };

  const handleConfirmDisable = async () => {
    setCloudSyncing(true);
    setSyncStep("syncing");

    try {
      // Step 1: Sync latest data from cloud
      await postCloudAction("sync");

      setSyncStep("disabling");

      // Step 2: Disable cloud
      const { ok, data } = await postCloudAction("disable");

      if (ok) {
        setCloudEnabled(false);
        setCloudStatus({ type: "success", message: "Cloud disabled" });
        setShowDisableModal(false);
      } else {
        setCloudStatus({ type: "error", message: data.error || "Failed to disable cloud" });
      }
    } catch (error) {
      console.log("Error disabling cloud:", error);
      setCloudStatus({ type: "error", message: "Failed to disable cloud" });
    } finally {
      setCloudSyncing(false);
      setSyncStep("");
    }
  };

  const handleSyncCloud = async () => {
    if (!cloudEnabled) return;

    setCloudSyncing(true);
    try {
      const { ok, data } = await postCloudAction("sync");
      if (ok) {
        setCloudStatus({ type: "success", message: "Synced successfully" });
      } else {
        setCloudStatus({ type: "error", message: data.error });
      }
    } catch (error) {
      setCloudStatus({ type: "error", message: error.message });
    } finally {
      setCloudSyncing(false);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;

    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName }),
      });
      const data = await res.json();

      if (res.ok) {
        setCreatedKey(data.key);
        await fetchData();
        setNewKeyName("");
        setShowAddModal(false);
      }
    } catch (error) {
      console.log("Error creating key:", error);
    }
  };

  const handleDeleteKey = async (id) => {
    if (!confirm("Delete this API key?")) return;

    try {
      const res = await fetch(`/api/keys/${id}`, { method: "DELETE" });
      if (res.ok) {
        setKeys(keys.filter((k) => k.id !== id));
      }
    } catch (error) {
      console.log("Error deleting key:", error);
    }
  };

  const [baseUrl, setBaseUrl] = useState("/v1");
  const cloudEndpointNew = `${CLOUD_URL}/v1`;

  // Hydration fix: Only access window on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.origin}/v1`);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  // Use new format endpoint (machineId embedded in key)
  const currentEndpoint = cloudEnabled ? cloudEndpointNew : baseUrl;

  const cloudBenefits = [
    { icon: "public", title: "Access Anywhere", desc: "No port forwarding needed" },
    { icon: "group", title: "Share Endpoint", desc: "Easy team collaboration" },
    { icon: "schedule", title: "Always Online", desc: "24/7 availability" },
    { icon: "speed", title: "Global Edge", desc: "Fast worldwide access" },
  ];

  const quickStartLinks = [
    { label: "Documentation", href: "/docs" },
    { label: "OpenAI API compatibility", href: "/docs#api-reference" },
    { label: "Cherry/Codex compatibility", href: "/docs#client-compatibility" },
    { label: "Report issue", href: "https://github.com/decolua/omniroute/issues", external: true },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Endpoint Card */}
      <Card className={cloudEnabled ? "" : ""}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">API Endpoint</h2>
            <p className="text-sm text-text-muted">
              {cloudEnabled ? "Using Cloud Proxy" : "Using Local Server"}
            </p>
            {machineId && (
              <p className="text-xs text-text-muted mt-1">Machine ID: {machineId.slice(0, 8)}...</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {cloudEnabled ? (
              <Button
                size="sm"
                variant="secondary"
                icon="cloud_off"
                onClick={() => handleCloudToggle(false)}
                disabled={cloudSyncing}
                className="bg-red-500/10! text-red-500! hover:bg-red-500/20! border-red-500/30!"
              >
                Disable Cloud
              </Button>
            ) : (
              <Button
                variant="primary"
                icon="cloud_upload"
                onClick={() => handleCloudToggle(true)}
                disabled={cloudSyncing}
                className="bg-linear-to-r from-primary to-blue-500 hover:from-primary-hover hover:to-blue-600"
              >
                Enable Cloud
              </Button>
            )}
          </div>
        </div>

        {/* Endpoint URL */}
        <div className="flex gap-2 mb-3">
          <Input
            value={currentEndpoint}
            readOnly
            className={`flex-1 font-mono text-sm ${cloudEnabled ? "animate-border-glow" : ""}`}
          />
          <Button
            variant="secondary"
            icon={copied === "endpoint_url" ? "check" : "content_copy"}
            onClick={() => copy(currentEndpoint, "endpoint_url")}
          >
            {copied === "endpoint_url" ? "Copied!" : "Copy"}
          </Button>
        </div>

        {/* Registered Keys — collapsible section inside API Endpoint card */}
        <div className="border border-border rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setExpandedEndpoint(expandedEndpoint === "keys" ? null : "keys")}
            className="w-full flex items-center gap-3 p-4 hover:bg-surface/50 transition-colors text-left"
          >
            <div className="flex items-center justify-center size-10 rounded-lg bg-amber-500/10 shrink-0">
              <span className="material-symbols-outlined text-xl text-amber-500">vpn_key</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Registered Keys</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface text-text-muted font-medium">
                  {keys.length} {keys.length === 1 ? "key" : "keys"}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Manage API keys used to authenticate requests to this endpoint
              </p>
            </div>
            <span
              className={`material-symbols-outlined text-text-muted text-lg transition-transform ${expandedEndpoint === "keys" ? "rotate-180" : ""}`}
            >
              expand_more
            </span>
          </button>

          {expandedEndpoint === "keys" && (
            <div className="border-t border-border px-4 pb-4">
              <div className="flex items-center justify-between mt-3 mb-3">
                <p className="text-xs text-text-muted">
                  Each key isolates usage tracking and can be revoked independently.
                </p>
                <Button size="sm" icon="add" onClick={() => setShowAddModal(true)}>
                  Create Key
                </Button>
              </div>

              {keys.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                    <span className="material-symbols-outlined text-[24px]">vpn_key</span>
                  </div>
                  <p className="text-text-main font-medium mb-1 text-sm">No API keys yet</p>
                  <p className="text-xs text-text-muted mb-3">
                    Create your first API key to get started
                  </p>
                  <Button size="sm" icon="add" onClick={() => setShowAddModal(true)}>
                    Create Key
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col">
                  {keys.map((key) => (
                    <div
                      key={key.id}
                      className="group flex items-center justify-between py-3 border-b border-black/[0.03] dark:border-white/[0.03] last:border-b-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{key.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs text-text-muted font-mono">{key.key}</code>
                          <button
                            onClick={() => copy(key.key, key.id)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {copied === key.id ? "check" : "content_copy"}
                            </span>
                          </button>
                        </div>
                        <p className="text-xs text-text-muted mt-1">
                          Created {new Date(key.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteKey(key.id)}
                        className="p-2 hover:bg-red-500/10 rounded text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Available Endpoints */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Available Endpoints</h2>
            <p className="text-sm text-text-muted">
              {allModels.length} models across{" "}
              {
                [
                  endpointData.chat,
                  endpointData.embeddings,
                  endpointData.images,
                  endpointData.rerank,
                  endpointData.audioTranscription,
                  endpointData.audioSpeech,
                  endpointData.moderation,
                ].filter((a) => a.length > 0).length
              }{" "}
              endpoints
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* Chat Completions */}
          <EndpointSection
            icon="chat"
            iconColor="text-blue-500"
            iconBg="bg-blue-500/10"
            title="Chat Completions"
            path="/v1/chat/completions"
            description="Streaming & non-streaming chat with all providers"
            models={endpointData.chat}
            expanded={expandedEndpoint === "chat"}
            onToggle={() => setExpandedEndpoint(expandedEndpoint === "chat" ? null : "chat")}
            copy={copy}
            copied={copied}
            baseUrl={currentEndpoint}
          />

          {/* Embeddings */}
          <EndpointSection
            icon="data_array"
            iconColor="text-emerald-500"
            iconBg="bg-emerald-500/10"
            title="Embeddings"
            path="/v1/embeddings"
            description="Text embeddings for search & RAG pipelines"
            models={endpointData.embeddings}
            expanded={expandedEndpoint === "embeddings"}
            onToggle={() =>
              setExpandedEndpoint(expandedEndpoint === "embeddings" ? null : "embeddings")
            }
            copy={copy}
            copied={copied}
            baseUrl={currentEndpoint}
          />

          {/* Image Generation */}
          <EndpointSection
            icon="image"
            iconColor="text-purple-500"
            iconBg="bg-purple-500/10"
            title="Image Generation"
            path="/v1/images/generations"
            description="Generate images from text prompts"
            models={endpointData.images}
            expanded={expandedEndpoint === "images"}
            onToggle={() => setExpandedEndpoint(expandedEndpoint === "images" ? null : "images")}
            copy={copy}
            copied={copied}
            baseUrl={currentEndpoint}
          />

          {/* Rerank */}
          <EndpointSection
            icon="sort"
            iconColor="text-amber-500"
            iconBg="bg-amber-500/10"
            title="Rerank"
            path="/v1/rerank"
            description="Rerank documents by relevance to a query"
            models={endpointData.rerank}
            expanded={expandedEndpoint === "rerank"}
            onToggle={() => setExpandedEndpoint(expandedEndpoint === "rerank" ? null : "rerank")}
            copy={copy}
            copied={copied}
            baseUrl={currentEndpoint}
          />

          {/* Audio Transcription */}
          <EndpointSection
            icon="mic"
            iconColor="text-rose-500"
            iconBg="bg-rose-500/10"
            title="Audio Transcription"
            path="/v1/audio/transcriptions"
            description="Transcribe audio files to text (Whisper)"
            models={endpointData.audioTranscription}
            expanded={expandedEndpoint === "audioTranscription"}
            onToggle={() =>
              setExpandedEndpoint(
                expandedEndpoint === "audioTranscription" ? null : "audioTranscription"
              )
            }
            copy={copy}
            copied={copied}
            baseUrl={currentEndpoint}
          />

          {/* Audio Speech (TTS) */}
          <EndpointSection
            icon="record_voice_over"
            iconColor="text-cyan-500"
            iconBg="bg-cyan-500/10"
            title="Text to Speech"
            path="/v1/audio/speech"
            description="Convert text to natural-sounding speech"
            models={endpointData.audioSpeech}
            expanded={expandedEndpoint === "audioSpeech"}
            onToggle={() =>
              setExpandedEndpoint(expandedEndpoint === "audioSpeech" ? null : "audioSpeech")
            }
            copy={copy}
            copied={copied}
            baseUrl={currentEndpoint}
          />

          {/* Moderations */}
          <EndpointSection
            icon="shield"
            iconColor="text-orange-500"
            iconBg="bg-orange-500/10"
            title="Moderations"
            path="/v1/moderations"
            description="Content moderation and safety classification"
            models={endpointData.moderation}
            expanded={expandedEndpoint === "moderation"}
            onToggle={() =>
              setExpandedEndpoint(expandedEndpoint === "moderation" ? null : "moderation")
            }
            copy={copy}
            copied={copied}
            baseUrl={currentEndpoint}
          />
        </div>
      </Card>

      {/* Cloud Proxy Card - Hidden */}
      {false && (
        <Card className={cloudEnabled ? "bg-primary/5" : ""}>
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg ${cloudEnabled ? "bg-primary text-white" : "bg-sidebar text-text-muted"}`}
                >
                  <span className="material-symbols-outlined text-xl">cloud</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Cloud Proxy</h2>
                  <p className="text-xs text-text-muted">
                    {cloudEnabled ? "Connected & Ready" : "Access your API from anywhere"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cloudEnabled ? (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="cloud_off"
                    onClick={() => handleCloudToggle(false)}
                    disabled={cloudSyncing}
                    className="bg-red-500/10! text-red-500! hover:bg-red-500/20! border-red-500/30!"
                  >
                    Disable
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    icon="cloud_upload"
                    onClick={() => handleCloudToggle(true)}
                    disabled={cloudSyncing}
                    className="bg-linear-to-r from-primary to-blue-500 hover:from-primary-hover hover:to-blue-600 px-6"
                  >
                    Enable Cloud
                  </Button>
                )}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cloudBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col items-center text-center p-3 rounded-lg bg-sidebar/50"
                >
                  <span className="material-symbols-outlined text-xl text-primary mb-1">
                    {benefit.icon}
                  </span>
                  <p className="text-xs font-semibold">{benefit.title}</p>
                  <p className="text-xs text-text-muted">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Cloud Enable Modal */}
      <Modal
        isOpen={showCloudModal}
        title="Enable Cloud Proxy"
        onClose={() => setShowCloudModal(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
              What you will get
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Access your API from anywhere in the world</li>
              <li>• Share endpoint with your team easily</li>
              <li>• No need to open ports or configure firewall</li>
              <li>• Fast global edge network</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium mb-1">Note</p>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>
                • Cloud will keep your auth session for 1 day. If not used, it will be automatically
                deleted.
              </li>
              <li>• Cloud is currently unstable with Claude Code OAuth in some cases.</li>
            </ul>
          </div>

          {/* Sync Progress */}
          {cloudSyncing && (
            <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
              <span className="material-symbols-outlined animate-spin text-primary">
                progress_activity
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  {syncStep === "syncing" && "Syncing data to cloud..."}
                  {syncStep === "verifying" && "Verifying connection..."}
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleEnableCloud} fullWidth disabled={cloudSyncing}>
              {cloudSyncing ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">
                    progress_activity
                  </span>
                  {syncStep === "syncing" ? "Syncing..." : "Verifying..."}
                </span>
              ) : (
                "Enable Cloud"
              )}
            </Button>
            <Button
              onClick={() => setShowCloudModal(false)}
              variant="ghost"
              fullWidth
              disabled={cloudSyncing}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Key Modal */}
      <Modal
        isOpen={showAddModal}
        title="Create API Key"
        onClose={() => {
          setShowAddModal(false);
          setNewKeyName("");
        }}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Key Name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Production Key"
          />
          <div className="flex gap-2">
            <Button onClick={handleCreateKey} fullWidth disabled={!newKeyName.trim()}>
              Create
            </Button>
            <Button
              onClick={() => {
                setShowAddModal(false);
                setNewKeyName("");
              }}
              variant="ghost"
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Created Key Modal */}
      <Modal isOpen={!!createdKey} title="API Key Created" onClose={() => setCreatedKey(null)}>
        <div className="flex flex-col gap-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2 font-medium">
              Save this key now!
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This is the only time you will see this key. Store it securely.
            </p>
          </div>
          <div className="flex gap-2">
            <Input value={createdKey || ""} readOnly className="flex-1 font-mono text-sm" />
            <Button
              variant="secondary"
              icon={copied === "created_key" ? "check" : "content_copy"}
              onClick={() => copy(createdKey, "created_key")}
            >
              {copied === "created_key" ? "Copied!" : "Copy"}
            </Button>
          </div>
          <Button onClick={() => setCreatedKey(null)} fullWidth>
            Done
          </Button>
        </div>
      </Modal>

      {/* Disable Cloud Modal */}
      <Modal
        isOpen={showDisableModal}
        title="Disable Cloud Proxy"
        onClose={() => !cloudSyncing && setShowDisableModal(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400">
                warning
              </span>
              <div>
                <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-1">Warning</p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  All auth sessions will be deleted from cloud.
                </p>
              </div>
            </div>
          </div>

          {/* Sync Progress */}
          {cloudSyncing && (
            <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
              <span className="material-symbols-outlined animate-spin text-primary">
                progress_activity
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  {syncStep === "syncing" && "Syncing latest data..."}
                  {syncStep === "disabling" && "Disabling cloud..."}
                </p>
              </div>
            </div>
          )}

          <p className="text-sm text-text-muted">Are you sure you want to disable cloud proxy?</p>

          <div className="flex gap-2">
            <Button
              onClick={handleConfirmDisable}
              fullWidth
              disabled={cloudSyncing}
              className="bg-red-500! hover:bg-red-600! text-white!"
            >
              {cloudSyncing ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">
                    progress_activity
                  </span>
                  {syncStep === "syncing" ? "Syncing..." : "Disabling..."}
                </span>
              ) : (
                "Disable Cloud"
              )}
            </Button>
            <Button
              onClick={() => setShowDisableModal(false)}
              variant="ghost"
              fullWidth
              disabled={cloudSyncing}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      {/* Provider Models Popup */}
      {selectedProvider && (
        <ProviderModelsModal
          provider={selectedProvider}
          models={allModels}
          copy={copy}
          copied={copied}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}

APIPageClient.propTypes = {
  machineId: PropTypes.string.isRequired,
};

function ProviderOverviewCard({ item, onClick }) {
  const [imgError, setImgError] = useState(false);

  const statusVariant =
    item.errors > 0 ? "text-red-500" : item.connected > 0 ? "text-green-500" : "text-text-muted";

  return (
    <div
      className="border border-border rounded-lg p-3 hover:bg-surface/40 transition-colors cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="size-8 rounded-lg flex items-center justify-center"
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

        <span className="text-xs text-text-muted">#{item.total}</span>
      </div>
    </div>
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
  }).isRequired,
  onClick: PropTypes.func,
};

// -- Sub-component: Provider Models Modal ------------------------------------------

function ProviderModelsModal({ provider, models, copy, copied, onClose }) {
  // Get provider alias for matching models
  const providerAlias = provider.provider.alias || provider.id;
  const providerModels = useMemo(() => {
    return models.filter((m) => m.owned_by === providerAlias || m.owned_by === provider.id);
  }, [models, providerAlias, provider.id]);

  const chatModels = providerModels.filter((m) => !m.type);
  const embeddingModels = providerModels.filter((m) => m.type === "embedding");
  const imageModels = providerModels.filter((m) => m.type === "image");

  const renderModelGroup = (title, icon, groupModels) => {
    if (groupModels.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">{icon}</span>
          {title} ({groupModels.length})
        </h4>
        <div className="flex flex-col gap-1">
          {groupModels.map((m) => {
            const copyKey = `modal-${m.id}`;
            return (
              <div
                key={m.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface/60 group"
              >
                <code className="text-sm font-mono flex-1 truncate">{m.id}</code>
                {m.custom && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                    custom
                  </span>
                )}
                <button
                  onClick={() => copy(m.id, copyKey)}
                  className="p-1 hover:bg-sidebar rounded text-text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy model ID"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied === copyKey ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen onClose={onClose} title={`${provider.provider.name} — Models`}>
      <div className="max-h-[60vh] overflow-y-auto">
        {providerModels.length === 0 ? (
          <p className="text-sm text-text-muted py-4 text-center">
            No models available for this provider.
          </p>
        ) : (
          <>
            {renderModelGroup("Chat", "chat", chatModels)}
            {renderModelGroup("Embedding", "data_array", embeddingModels)}
            {renderModelGroup("Image", "image", imageModels)}
          </>
        )}
      </div>
    </Modal>
  );
}

ProviderModelsModal.propTypes = {
  provider: PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
  copy: PropTypes.func.isRequired,
  copied: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

// -- Sub-component: Endpoint Section ------------------------------------------

function EndpointSection({
  icon,
  iconColor,
  iconBg,
  title,
  path,
  description,
  models,
  expanded,
  onToggle,
  copy,
  copied,
  baseUrl,
}) {
  const grouped = useMemo(() => {
    const map = {};
    for (const m of models) {
      const owner = m.owned_by || "unknown";
      if (!map[owner]) map[owner] = [];
      map[owner].push(m);
    }
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [models]);

  const resolveProvider = (id) => AI_PROVIDERS[id] || getProviderByAlias(id);
  const providerColor = (id) => resolveProvider(id)?.color || "#888";
  const providerName = (id) => resolveProvider(id)?.name || id;
  const copyId = `endpoint_${path}`;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Header (always visible) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 hover:bg-surface/50 transition-colors text-left"
      >
        <div className={`flex items-center justify-center size-10 rounded-lg ${iconBg} shrink-0`}>
          <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{title}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface text-text-muted font-medium">
              {models.length} {models.length === 1 ? "model" : "models"}
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        </div>
        <span
          className={`material-symbols-outlined text-text-muted text-lg transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border px-4 pb-4">
          {/* Endpoint path + copy */}
          <div className="flex items-center gap-2 mt-3 mb-3">
            <code className="flex-1 text-xs font-mono text-text-muted bg-surface/80 px-3 py-1.5 rounded-lg truncate">
              {baseUrl.replace(/\/v1$/, "")}
              {path}
            </code>
            <button
              onClick={() => copy(`${baseUrl.replace(/\/v1$/, "")}${path}`, copyId)}
              className="p-1.5 hover:bg-surface rounded-lg text-text-muted hover:text-primary transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied === copyId ? "check" : "content_copy"}
              </span>
            </button>
          </div>

          {/* Models grouped by provider */}
          <div className="flex flex-col gap-2">
            {grouped.map(([providerId, providerModels]) => (
              <div key={providerId}>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: providerColor(providerId) }}
                  />
                  <span className="text-xs font-semibold text-text-main">
                    {providerName(providerId)}
                  </span>
                  <span className="text-xs text-text-muted">({providerModels.length})</span>
                </div>
                <div className="ml-5 flex flex-wrap gap-1.5">
                  {providerModels.map((m) => (
                    <span
                      key={m.id}
                      className="text-xs px-2 py-0.5 rounded-md bg-surface/80 text-text-muted font-mono"
                      title={m.id}
                    >
                      {m.root || m.id.split("/").pop()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

EndpointSection.propTypes = {
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  iconBg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  models: PropTypes.array.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  copied: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
};
