"use client";

import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Card, Button, Input, Modal, CardSkeleton } from "@/shared/components";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { AI_PROVIDERS, getProviderByAlias } from "@/shared/constants/providers";

const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL;
const CLOUD_ACTION_TIMEOUT_MS = 15000;

export default function APIPageClient({ machineId }) {
  const [providerConnections, setProviderConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Endpoints / models state
  const [allModels, setAllModels] = useState([]);
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);

  // Cloud sync state
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState(null);
  const [syncStep, setSyncStep] = useState(""); // "syncing" | "verifying" | "disabling" | "done" | ""
  const [modalSuccess, setModalSuccess] = useState(false); // show success state in modal before closing
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
  // Filter out parent models (models with parent field set) to avoid showing duplicates
  const endpointData = useMemo(() => {
    const chat = allModels.filter((m) => !m.type && !m.parent);
    const embeddings = allModels.filter((m) => m.type === "embedding" && !m.parent);
    const images = allModels.filter((m) => m.type === "image" && !m.parent);
    const rerank = allModels.filter((m) => m.type === "rerank" && !m.parent);
    const audioTranscription = allModels.filter(
      (m) => m.type === "audio" && m.subtype === "transcription" && !m.parent
    );
    const audioSpeech = allModels.filter(
      (m) => m.type === "audio" && m.subtype === "speech" && !m.parent
    );
    const moderation = allModels.filter((m) => m.type === "moderation" && !m.parent);
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
      const providersRes = await fetch("/api/providers");

      const providersData = await providersRes.json();

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

  // Auto-dismiss cloudStatus after 5s
  useEffect(() => {
    if (cloudStatus) {
      const timer = setTimeout(() => setCloudStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [cloudStatus]);

  const dispatchCloudChange = () => {
    globalThis.dispatchEvent(new Event("cloud-status-changed"));
  };

  const handleEnableCloud = async () => {
    setCloudSyncing(true);
    setModalSuccess(false);
    setSyncStep("syncing");
    try {
      const { ok, status, data } = await postCloudAction("enable");
      if (ok) {
        setSyncStep("verifying");

        // Brief delay so user sees the verifying step
        await new Promise((r) => setTimeout(r, 600));

        // Sync succeeded — mark as enabled regardless of verify result
        setCloudEnabled(true);
        setSyncStep("done");
        setModalSuccess(true);
        setCloudSyncing(false);
        dispatchCloudChange();

        // Show success in modal for a moment, then close
        await new Promise((r) => setTimeout(r, 1200));
        setShowCloudModal(false);
        setModalSuccess(false);

        if (data.verified) {
          setCloudStatus({ type: "success", message: "Cloud Proxy connected and verified!" });
        } else {
          setCloudStatus({
            type: "warning",
            message: data.verifyError
              ? `Connected — verification pending: ${data.verifyError}`
              : "Connected — verification pending",
          });
        }

        // Refresh keys list if new key was created
        if (data.createdKey) {
          await fetchData();
        }
        // Reload settings to ensure fresh state
        await loadCloudSettings();
      } else {
        // Sync failed — provide a helpful error message
        let errorMessage = data.error || "Failed to enable cloud";
        if (status === 502 || status === 408) {
          errorMessage =
            "Could not reach cloud worker. Make sure the cloud service is running (npm run dev in /cloud).";
        }
        setCloudStatus({ type: "error", message: errorMessage });
        setShowCloudModal(false);
      }
    } catch (error) {
      setCloudStatus({ type: "error", message: error.message || "Connection failed" });
      setShowCloudModal(false);
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
        setCloudStatus({ type: "success", message: "Cloud disabled successfully" });
        setShowDisableModal(false);
        dispatchCloudChange();
        await loadCloudSettings();
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
    {
      label: "Report issue",
      href: "https://github.com/diegosouzapw/OmniRoute/issues",
      external: true,
    },
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

        {/* Cloud Status Toast */}
        {cloudStatus && (
          <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg mb-4 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
              cloudStatus.type === "success"
                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                : cloudStatus.type === "warning"
                  ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {cloudStatus.type === "success"
                ? "check_circle"
                : cloudStatus.type === "warning"
                  ? "warning"
                  : "error"}
            </span>
            <span className="flex-1">{cloudStatus.message}</span>
            <button
              onClick={() => setCloudStatus(null)}
              className="p-0.5 hover:bg-white/10 rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

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
      </Card>

      {/* Available Endpoints */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Available Endpoints</h2>
            <p className="text-sm text-text-muted">
              {Object.values(endpointData).reduce((acc, models) => acc + models.length, 0)} models
              across{" "}
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

          {/* Sync Progress / Success */}
          {(cloudSyncing || modalSuccess) && (
            <div
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                modalSuccess
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-primary/10 border-primary/30"
              }`}
            >
              {modalSuccess ? (
                <span className="material-symbols-outlined text-green-500 text-xl">
                  check_circle
                </span>
              ) : (
                <span className="material-symbols-outlined animate-spin text-primary">
                  progress_activity
                </span>
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    modalSuccess ? "text-green-500" : "text-primary"
                  }`}
                >
                  {modalSuccess && "Cloud Proxy connected!"}
                  {!modalSuccess && syncStep === "syncing" && "Connecting to cloud..."}
                  {!modalSuccess && syncStep === "verifying" && "Verifying connection..."}
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleEnableCloud} fullWidth disabled={cloudSyncing || modalSuccess}>
              {cloudSyncing ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">
                    progress_activity
                  </span>
                  {syncStep === "syncing" ? "Connecting..." : "Verifying..."}
                </span>
              ) : modalSuccess ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check</span>
                  Connected!
                </span>
              ) : (
                "Enable Cloud"
              )}
            </Button>
            <Button
              onClick={() => setShowCloudModal(false)}
              variant="ghost"
              fullWidth
              disabled={cloudSyncing || modalSuccess}
            >
              Cancel
            </Button>
          </div>
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

// -- Sub-component: Provider Models Modal ------------------------------------------

function ProviderModelsModal({ provider, models, copy, copied, onClose }) {
  // Get provider alias for matching models
  // Filter out parent models (models with parent field set) to avoid showing duplicates
  const providerAlias = provider.provider.alias || provider.id;
  const providerModels = useMemo(() => {
    return models.filter(
      (m) => !m.parent && (m.owned_by === providerAlias || m.owned_by === provider.id)
    );
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
    return Object.entries(map).sort(
      (a: any, b: any) => (b[1] as any).length - (a[1] as any).length
    );
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
                  <span className="text-xs text-text-muted">
                    ({(providerModels as any).length})
                  </span>
                </div>
                <div className="ml-5 flex flex-wrap gap-1.5">
                  {(providerModels as any).map((m) => (
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
