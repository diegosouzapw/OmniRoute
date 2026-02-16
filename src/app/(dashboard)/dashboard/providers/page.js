"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { Card, CardSkeleton, Badge, Button, Input, Modal, Select } from "@/shared/components";
import { OAUTH_PROVIDERS, APIKEY_PROVIDERS } from "@/shared/constants/config";
import {
  FREE_PROVIDERS,
  OPENAI_COMPATIBLE_PREFIX,
  ANTHROPIC_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";
import Link from "next/link";
import { getErrorCode, getRelativeTime } from "@/shared/utils";
import { useNotificationStore } from "@/store/notificationStore";
import ModelAvailabilityBadge from "./components/ModelAvailabilityBadge";

// Shared helper function to avoid code duplication between ProviderCard and ApiKeyProviderCard
function getStatusDisplay(connected, error, errorCode) {
  const parts = [];
  if (connected > 0) {
    parts.push(
      <Badge key="connected" variant="success" size="sm" dot>
        {connected} Connected
      </Badge>
    );
  }
  if (error > 0) {
    const errText = errorCode ? `${error} Error (${errorCode})` : `${error} Error`;
    parts.push(
      <Badge key="error" variant="error" size="sm" dot>
        {errText}
      </Badge>
    );
  }
  if (parts.length === 0) {
    return <span className="text-text-muted">No connections</span>;
  }
  return parts;
}

function getConnectionErrorTag(connection) {
  if (!connection) return null;

  const explicitType = connection.lastErrorType;
  if (explicitType === "runtime_error") return "RUNTIME";
  if (
    explicitType === "upstream_auth_error" ||
    explicitType === "auth_missing" ||
    explicitType === "token_refresh_failed" ||
    explicitType === "token_expired"
  ) {
    return "AUTH";
  }
  if (explicitType === "upstream_rate_limited") return "429";
  if (explicitType === "upstream_unavailable") return "5XX";
  if (explicitType === "network_error") return "NET";

  const numericCode = Number(connection.errorCode);
  if (Number.isFinite(numericCode) && numericCode >= 400) {
    return String(numericCode);
  }

  const fromMessage = getErrorCode(connection.lastError);
  if (fromMessage === "401" || fromMessage === "403") return "AUTH";
  if (fromMessage && fromMessage !== "ERR") return fromMessage;

  const msg = (connection.lastError || "").toLowerCase();
  if (msg.includes("runtime") || msg.includes("not runnable") || msg.includes("not installed"))
    return "RUNTIME";
  if (
    msg.includes("invalid api key") ||
    msg.includes("token invalid") ||
    msg.includes("revoked") ||
    msg.includes("unauthorized")
  )
    return "AUTH";

  return "ERR";
}

export default function ProvidersPage() {
  const [connections, setConnections] = useState([]);
  const [providerNodes, setProviderNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCompatibleModal, setShowAddCompatibleModal] = useState(false);
  const [showAddAnthropicCompatibleModal, setShowAddAnthropicCompatibleModal] = useState(false);
  const [testingMode, setTestingMode] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const notify = useNotificationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [connectionsRes, nodesRes] = await Promise.all([
          fetch("/api/providers"),
          fetch("/api/provider-nodes"),
        ]);
        const connectionsData = await connectionsRes.json();
        const nodesData = await nodesRes.json();
        if (connectionsRes.ok) setConnections(connectionsData.connections || []);
        if (nodesRes.ok) setProviderNodes(nodesData.nodes || []);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getProviderStats = (providerId, authType) => {
    const providerConnections = connections.filter(
      (c) => c.provider === providerId && c.authType === authType
    );

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

    // Get latest error info
    const latestError = errorConns.sort(
      (a, b) => new Date(b.lastErrorAt || 0) - new Date(a.lastErrorAt || 0)
    )[0];
    const errorCode = latestError ? getConnectionErrorTag(latestError) : null;
    const errorTime = latestError?.lastErrorAt ? getRelativeTime(latestError.lastErrorAt) : null;

    return { connected, error, total, errorCode, errorTime };
  };

  const handleBatchTest = async (mode, providerId = null) => {
    if (testingMode) return;
    setTestingMode(mode === "provider" ? providerId : mode);
    setTestResults(null);
    try {
      const res = await fetch("/api/providers/test-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, providerId }),
      });
      const data = await res.json();
      setTestResults(data);
      if (data.summary) {
        const { passed, failed, total } = data.summary;
        if (failed === 0) notify.success(`All ${total} tests passed`);
        else notify.warning(`${passed}/${total} passed, ${failed} failed`);
      }
    } catch (error) {
      setTestResults({ error: "Test request failed" });
      notify.error("Provider test failed");
    } finally {
      setTestingMode(null);
    }
  };

  const compatibleProviders = providerNodes
    .filter((node) => node.type === "openai-compatible")
    .map((node) => ({
      id: node.id,
      name: node.name || "OpenAI Compatible",
      color: "#10A37F",
      textIcon: "OC",
      apiType: node.apiType,
    }));

  const anthropicCompatibleProviders = providerNodes
    .filter((node) => node.type === "anthropic-compatible")
    .map((node) => ({
      id: node.id,
      name: node.name || "Anthropic Compatible",
      color: "#D97757",
      textIcon: "AC",
    }));

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* OAuth Providers */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            OAuth Providers <span className="size-2.5 rounded-full bg-blue-500" title="OAuth" />
          </h2>
          <div className="flex items-center gap-2">
            <ModelAvailabilityBadge />
            <button
              onClick={() => handleBatchTest("oauth")}
              disabled={!!testingMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                testingMode === "oauth"
                  ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                  : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
              }`}
              title="Test all OAuth connections"
              aria-label="Test all OAuth connections"
            >
              <span className="material-symbols-outlined text-[14px]">
                {testingMode === "oauth" ? "sync" : "play_arrow"}
              </span>
              {testingMode === "oauth" ? "Testing..." : "Test All"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.entries(OAUTH_PROVIDERS).map(([key, info]) => (
            <ProviderCard
              key={key}
              providerId={key}
              provider={info}
              stats={getProviderStats(key, "oauth")}
              authType="oauth"
            />
          ))}
        </div>
      </div>

      {/* Free Providers */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Free Providers <span className="size-2.5 rounded-full bg-green-500" title="Free" />
          </h2>
          <button
            onClick={() => handleBatchTest("free")}
            disabled={!!testingMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              testingMode === "free"
                ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
            }`}
            title="Test all Free connections"
            aria-label="Test all Free provider connections"
          >
            <span className="material-symbols-outlined text-[14px]">
              {testingMode === "free" ? "sync" : "play_arrow"}
            </span>
            {testingMode === "free" ? "Testing..." : "Test All"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.entries(FREE_PROVIDERS).map(([key, info]) => (
            <ProviderCard
              key={key}
              providerId={key}
              provider={info}
              stats={getProviderStats(key, "oauth")}
              authType="free"
            />
          ))}
        </div>
      </div>

      {/* API Key Providers — fixed list */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            API Key Providers{" "}
            <span className="size-2.5 rounded-full bg-amber-500" title="API Key" />
          </h2>
          <button
            onClick={() => handleBatchTest("apikey")}
            disabled={!!testingMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              testingMode === "apikey"
                ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
            }`}
            title="Test all API Key connections"
            aria-label="Test all API Key connections"
          >
            <span className="material-symbols-outlined text-[14px]">
              {testingMode === "apikey" ? "sync" : "play_arrow"}
            </span>
            {testingMode === "apikey" ? "Testing..." : "Test All"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.entries(APIKEY_PROVIDERS).map(([key, info]) => (
            <ApiKeyProviderCard
              key={key}
              providerId={key}
              provider={info}
              stats={getProviderStats(key, "apikey")}
              authType="apikey"
            />
          ))}
        </div>
      </div>

      {/* API Key Compatible Providers — dynamic (OpenAI/Anthropic compatible) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            API Key Compatible Providers{" "}
            <span className="size-2.5 rounded-full bg-orange-500" title="Compatible" />
          </h2>
          <div className="flex gap-2">
            {(compatibleProviders.length > 0 || anthropicCompatibleProviders.length > 0) && (
              <button
                onClick={() => handleBatchTest("compatible")}
                disabled={!!testingMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  testingMode === "compatible"
                    ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                    : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
                }`}
                title="Test all Compatible connections"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {testingMode === "compatible" ? "sync" : "play_arrow"}
                </span>
                {testingMode === "compatible" ? "Testing..." : "Test All"}
              </button>
            )}
            <Button size="sm" icon="add" onClick={() => setShowAddAnthropicCompatibleModal(true)}>
              Add Anthropic Compatible
            </Button>
            <Button
              size="sm"
              variant="secondary"
              icon="add"
              onClick={() => setShowAddCompatibleModal(true)}
              className="!bg-white !text-black hover:!bg-gray-100"
            >
              Add OpenAI Compatible
            </Button>
          </div>
        </div>
        {compatibleProviders.length === 0 && anthropicCompatibleProviders.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-border rounded-xl">
            <span className="material-symbols-outlined text-[32px] text-text-muted mb-2">
              extension
            </span>
            <p className="text-text-muted text-sm">No compatible providers added yet</p>
            <p className="text-text-muted text-xs mt-1">
              Use the buttons above to add OpenAI or Anthropic compatible endpoints
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...compatibleProviders, ...anthropicCompatibleProviders].map((info) => (
              <ApiKeyProviderCard
                key={info.id}
                providerId={info.id}
                provider={info}
                stats={getProviderStats(info.id, "apikey")}
                authType="compatible"
              />
            ))}
          </div>
        )}
      </div>
      <AddOpenAICompatibleModal
        isOpen={showAddCompatibleModal}
        onClose={() => setShowAddCompatibleModal(false)}
        onCreated={(node) => {
          setProviderNodes((prev) => [...prev, node]);
          setShowAddCompatibleModal(false);
        }}
      />
      <AddAnthropicCompatibleModal
        isOpen={showAddAnthropicCompatibleModal}
        onClose={() => setShowAddAnthropicCompatibleModal(false)}
        onCreated={(node) => {
          setProviderNodes((prev) => [...prev, node]);
          setShowAddAnthropicCompatibleModal(false);
        }}
      />
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
              <h3 className="font-semibold">Test Results</h3>
              <button
                onClick={() => setTestResults(null)}
                className="p-1 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close test results"
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

function ProviderCard({ providerId, provider, stats, authType }) {
  const { connected, error, errorCode, errorTime } = stats;
  const [imgError, setImgError] = useState(false);

  const dotColors = {
    free: "bg-green-500",
    oauth: "bg-blue-500",
    apikey: "bg-amber-500",
    compatible: "bg-orange-500",
  };
  const dotLabels = { free: "Free", oauth: "OAuth", apikey: "API Key", compatible: "Compatible" };

  return (
    <Link href={`/dashboard/providers/${providerId}`} className="group">
      <Card
        padding="xs"
        className="h-full hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="size-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${provider.color}15` }}
            >
              {imgError ? (
                <span className="text-xs font-bold" style={{ color: provider.color }}>
                  {provider.textIcon || provider.id.slice(0, 2).toUpperCase()}
                </span>
              ) : (
                <Image
                  src={`/providers/${provider.id}.png`}
                  alt={provider.name}
                  width={30}
                  height={30}
                  className="object-contain rounded-lg max-w-[32px] max-h-[32px]"
                  sizes="32px"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-1.5">
                {provider.name}
                <span
                  className={`size-2 rounded-full ${dotColors[authType] || dotColors.oauth} shrink-0`}
                  title={dotLabels[authType] || "OAuth"}
                />
              </h3>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                {getStatusDisplay(connected, error, errorCode)}
                {errorTime && <span className="text-text-muted">• {errorTime}</span>}
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
            chevron_right
          </span>
        </div>
      </Card>
    </Link>
  );
}

ProviderCard.propTypes = {
  providerId: PropTypes.string.isRequired,
  provider: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    textIcon: PropTypes.string,
  }).isRequired,
  stats: PropTypes.shape({
    connected: PropTypes.number,
    error: PropTypes.number,
    errorCode: PropTypes.string,
    errorTime: PropTypes.string,
  }).isRequired,
  authType: PropTypes.string,
};

// API Key providers - use image with textIcon fallback (same as OAuth providers)
function ApiKeyProviderCard({ providerId, provider, stats, authType }) {
  const { connected, error, errorCode, errorTime } = stats;
  const isCompatible = providerId.startsWith(OPENAI_COMPATIBLE_PREFIX);
  const isAnthropicCompatible = providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX);
  const [imgError, setImgError] = useState(false);

  const dotColors = {
    free: "bg-green-500",
    oauth: "bg-blue-500",
    apikey: "bg-amber-500",
    compatible: "bg-orange-500",
  };
  const dotLabels = { free: "Free", oauth: "OAuth", apikey: "API Key", compatible: "Compatible" };

  // Determine icon path: OpenAI Compatible providers use specialized icons
  const getIconPath = () => {
    if (isCompatible) {
      return provider.apiType === "responses" ? "/providers/oai-r.png" : "/providers/oai-cc.png";
    }
    if (isAnthropicCompatible) {
      return "/providers/anthropic-m.png"; // Use Anthropic icon as base
    }
    return `/providers/${provider.id}.png`;
  };

  return (
    <Link href={`/dashboard/providers/${providerId}`} className="group">
      <Card
        padding="xs"
        className="h-full hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="size-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${provider.color}15` }}
            >
              {imgError ? (
                <span className="text-xs font-bold" style={{ color: provider.color }}>
                  {provider.textIcon || provider.id.slice(0, 2).toUpperCase()}
                </span>
              ) : (
                <Image
                  src={getIconPath()}
                  alt={provider.name}
                  width={30}
                  height={30}
                  className="object-contain rounded-lg max-w-[30px] max-h-[30px]"
                  sizes="30px"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-1.5">
                {provider.name}
                <span
                  className={`size-2 rounded-full ${dotColors[authType] || dotColors.apikey} shrink-0`}
                  title={dotLabels[authType] || "API Key"}
                />
              </h3>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                {getStatusDisplay(connected, error, errorCode)}
                {isCompatible && (
                  <Badge variant="default" size="sm">
                    {provider.apiType === "responses" ? "Responses" : "Chat"}
                  </Badge>
                )}
                {isAnthropicCompatible && (
                  <Badge variant="default" size="sm">
                    Messages
                  </Badge>
                )}
                {errorTime && <span className="text-text-muted">• {errorTime}</span>}
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
            chevron_right
          </span>
        </div>
      </Card>
    </Link>
  );
}

ApiKeyProviderCard.propTypes = {
  providerId: PropTypes.string.isRequired,
  provider: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    textIcon: PropTypes.string,
    apiType: PropTypes.string,
  }).isRequired,
  stats: PropTypes.shape({
    connected: PropTypes.number,
    error: PropTypes.number,
    errorCode: PropTypes.string,
    errorTime: PropTypes.string,
  }).isRequired,
  authType: PropTypes.string,
};

function AddOpenAICompatibleModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    prefix: "",
    apiType: "chat",
    baseUrl: "https://api.openai.com/v1",
  });
  const [submitting, setSubmitting] = useState(false);
  const [checkKey, setCheckKey] = useState("");
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const apiTypeOptions = [
    { value: "chat", label: "Chat Completions" },
    { value: "responses", label: "Responses API" },
  ];

  useEffect(() => {
    const defaultBaseUrl = "https://api.openai.com/v1";
    setFormData((prev) => ({
      ...prev,
      baseUrl: defaultBaseUrl,
    }));
  }, [formData.apiType]);

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/provider-nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          prefix: formData.prefix,
          apiType: formData.apiType,
          baseUrl: formData.baseUrl,
          type: "openai-compatible",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        onCreated(data.node);
        setFormData({
          name: "",
          prefix: "",
          apiType: "chat",
          baseUrl: "https://api.openai.com/v1",
        });
        setCheckKey("");
        setValidationResult(null);
      }
    } catch (error) {
      console.log("Error creating OpenAI Compatible node:", error);
    } finally {
      setSubmitting(false);
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
          type: "openai-compatible",
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

  return (
    <Modal isOpen={isOpen} title="Add OpenAI Compatible" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="OpenAI Compatible (Prod)"
          hint="Required. A friendly label for this node."
        />
        <Input
          label="Prefix"
          value={formData.prefix}
          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
          placeholder="oc-prod"
          hint="Required. Used as the provider prefix for model IDs."
        />
        <Select
          label="API Type"
          options={apiTypeOptions}
          value={formData.apiType}
          onChange={(e) => setFormData({ ...formData, apiType: e.target.value })}
        />
        <Input
          label="Base URL"
          value={formData.baseUrl}
          onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
          placeholder="https://api.openai.com/v1"
          hint="Use the base URL (ending in /v1) for your OpenAI-compatible API."
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
              !formData.name.trim() ||
              !formData.prefix.trim() ||
              !formData.baseUrl.trim() ||
              submitting
            }
          >
            {submitting ? "Creating..." : "Create"}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

AddOpenAICompatibleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func.isRequired,
};

function AddAnthropicCompatibleModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    prefix: "",
    baseUrl: "https://api.anthropic.com/v1",
  });
  const [submitting, setSubmitting] = useState(false);
  const [checkKey, setCheckKey] = useState("");
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  useEffect(() => {
    // Reset validation when modal opens
    if (isOpen) {
      setValidationResult(null);
      setCheckKey("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/provider-nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          prefix: formData.prefix,
          baseUrl: formData.baseUrl,
          type: "anthropic-compatible",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        onCreated(data.node);
        setFormData({
          name: "",
          prefix: "",
          baseUrl: "https://api.anthropic.com/v1",
        });
        setCheckKey("");
        setValidationResult(null);
      }
    } catch (error) {
      console.log("Error creating Anthropic Compatible node:", error);
    } finally {
      setSubmitting(false);
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
          type: "anthropic-compatible",
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

  return (
    <Modal isOpen={isOpen} title="Add Anthropic Compatible" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Anthropic Compatible (Prod)"
          hint="Required. A friendly label for this node."
        />
        <Input
          label="Prefix"
          value={formData.prefix}
          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
          placeholder="ac-prod"
          hint="Required. Used as the provider prefix for model IDs."
        />
        <Input
          label="Base URL"
          value={formData.baseUrl}
          onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
          placeholder="https://api.anthropic.com/v1"
          hint="Use the base URL (ending in /v1) for your Anthropic-compatible API. The system will append /messages."
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
              !formData.name.trim() ||
              !formData.prefix.trim() ||
              !formData.baseUrl.trim() ||
              submitting
            }
          >
            {submitting ? "Creating..." : "Create"}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

AddAnthropicCompatibleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func.isRequired,
};

// ─── Provider Test Results View (mirrors combo TestResultsView) ──────────────

function ProviderTestResultsView({ results }) {
  if (results.error && !results.results) {
    return (
      <div className="text-center py-6">
        <span className="material-symbols-outlined text-red-500 text-[32px] mb-2 block">error</span>
        <p className="text-sm text-red-400">{results.error}</p>
      </div>
    );
  }

  const { summary, mode } = results;
  const items = results.results || [];

  const modeLabel =
    {
      oauth: "OAuth",
      free: "Free",
      apikey: "API Key",
      provider: "Provider",
      all: "All",
    }[mode] || mode;

  return (
    <div className="flex flex-col gap-3">
      {/* Summary header */}
      {summary && (
        <div className="flex items-center gap-3 text-xs mb-1">
          <span className="text-text-muted">{modeLabel} Test</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-medium">
            {summary.passed} passed
          </span>
          {summary.failed > 0 && (
            <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-medium">
              {summary.failed} failed
            </span>
          )}
          <span className="text-text-muted ml-auto">{summary.total} tested</span>
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
            <span className="font-medium">{r.connectionName}</span>
            <span className="text-text-muted ml-1.5">({r.provider})</span>
          </div>
          {r.latencyMs !== undefined && (
            <span className="text-text-muted font-mono tabular-nums">{r.latencyMs}ms</span>
          )}
          <span
            className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
              r.valid ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
            }`}
          >
            {r.valid ? "OK" : r.diagnosis?.type || "ERROR"}
          </span>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center py-4 text-text-muted text-sm">
          No active connections found for this group.
        </div>
      )}
    </div>
  );
}

ProviderTestResultsView.propTypes = {
  results: PropTypes.shape({
    mode: PropTypes.string,
    results: PropTypes.array,
    summary: PropTypes.shape({
      total: PropTypes.number,
      passed: PropTypes.number,
      failed: PropTypes.number,
    }),
    error: PropTypes.string,
  }).isRequired,
};
