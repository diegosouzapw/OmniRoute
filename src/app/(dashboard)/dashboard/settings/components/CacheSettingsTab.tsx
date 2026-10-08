"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Card, Badge, Toggle, Select, SegmentedControl } from "@/shared/components";
import { useFormatter, useTranslations } from "next-intl";

type Message = { type: "success" | "error"; text: string };

interface AvailableEmbeddingModelOption {
  id: string;
  rawId: string;
  name: string;
  dimensions?: number;
  maxTokens?: number;
  supportedInputTypes: string[];
}

interface EmbeddingProviderOption {
  id: string;
  name: string;
  hasConnection: boolean;
  baseUrl?: string;
  models: AvailableEmbeddingModelOption[];
}

interface CacheConfigResponse {
  modelCatalogCacheTtlMs: number;
  semanticCacheEnabled?: boolean;
  semanticCacheMaxSize?: number;
  semanticCacheTTL?: number;
  semanticCacheVectorEnabled?: boolean;
  semanticCacheBackend?: "memory" | "redis";
  semanticCacheThreshold?: number;
  semanticCacheEmbeddingProvider?: string;
  semanticCacheEmbeddingModel?: string;
  semanticCacheEmbeddingDimension?: number;
  semanticCacheEmbeddingBaseUrl?: string;
  semanticCacheEmbeddingApiKey?: string;
  semanticCacheRedisUrl?: string;
  semanticCacheRedisPrefix?: string;
  semanticCacheRequireZeroTemp?: boolean;
  embeddingOptions?: EmbeddingProviderOption[];
  [key: string]: unknown;
}

const DEFAULT_TTL_MS = 1500;
const MIN_TTL_MS = 100;
const MAX_TTL_MS = 60000;

export default function CacheSettingsTab() {
  const t = useTranslations("settings");
  const format = useFormatter();
  const inputTypeLabels: Record<string, string> = {
    text: t("semanticCacheInputText"),
    image: t("semanticCacheInputImage"),
    audio: t("semanticCacheInputAudio"),
    video: t("semanticCacheInputVideo"),
  };

  // Model Catalog Cache State
  const [catalogTtl, setCatalogTtl] = useState(String(DEFAULT_TTL_MS));
  const [savedCatalogTtl, setSavedCatalogTtl] = useState(String(DEFAULT_TTL_MS));
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogSaving, setCatalogSaving] = useState(false);
  const [catalogMessage, setCatalogMessage] = useState<Message | null>(null);

  // Semantic Cache State
  const [semEnabled, setSemEnabled] = useState(true);
  // Vector-similarity layer is opt-in (#14159): off unless the operator turns it on.
  const [semVectorEnabled, setSemVectorEnabled] = useState(false);
  const [semBackend, setSemBackend] = useState<"memory" | "redis">("memory");
  const [semThreshold, setSemThreshold] = useState(0.8);
  const [semTtlMinutes, setSemTtlMinutes] = useState(30);
  const [semMaxSize, setSemMaxSize] = useState(1000);
  const [semProvider, setSemProvider] = useState("lemonade");
  const [semModel, setSemModel] = useState("harrier-oss-v1-0.6b");
  const [semDimension, setSemDimension] = useState<number | undefined>(1024);
  const [semBaseUrl, setSemBaseUrl] = useState("");
  const [semApiKey, setSemApiKey] = useState("");
  const [semRedisUrl, setSemRedisUrl] = useState("");
  const [semRedisPrefix, setSemRedisPrefix] = useState("omniroute:semcache:");
  const [semRequireZeroTemp, setSemRequireZeroTemp] = useState(true);

  // Saved Semantic Cache State
  const [semSaving, setSemSaving] = useState(false);
  const [semMessage, setSemMessage] = useState<Message | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Dynamic Options
  const [embeddingOptions, setEmbeddingOptions] = useState<EmbeddingProviderOption[]>([]);

  // Test Connection State
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    latencyMs?: number;
    dimensions?: number;
    resolvedBaseUrl?: string;
    error?: string;
  } | null>(null);

  // Clear Cache State
  const [clearingCache, setClearingCache] = useState(false);
  const [clearMessage, setClearMessage] = useState<string | null>(null);

  // Load Cache Config and Dynamic Options in a single request
  useEffect(() => {
    let active = true;

    fetch("/api/settings/cache-config")
      .then((response) => {
        if (!response.ok) throw new Error(`Cache config API returned ${response.status}`);
        return response.json() as Promise<CacheConfigResponse>;
      })
      .then((config) => {
        if (!active) return;
        const ms = config.modelCatalogCacheTtlMs ?? DEFAULT_TTL_MS;
        const str =
          typeof ms === "number" && Number.isFinite(ms) ? String(ms) : String(DEFAULT_TTL_MS);
        setCatalogTtl(str);
        setSavedCatalogTtl(str);

        if (config.semanticCacheEnabled !== undefined) {
          setSemEnabled(config.semanticCacheEnabled);
        }
        if (config.semanticCacheVectorEnabled !== undefined) {
          setSemVectorEnabled(config.semanticCacheVectorEnabled);
        }
        if (config.semanticCacheBackend === "redis" || config.semanticCacheBackend === "memory") {
          setSemBackend(config.semanticCacheBackend);
        }
        if (typeof config.semanticCacheThreshold === "number") {
          setSemThreshold(config.semanticCacheThreshold);
        }
        if (typeof config.semanticCacheTTL === "number") {
          setSemTtlMinutes(Math.round(config.semanticCacheTTL / 60000));
        }
        if (typeof config.semanticCacheMaxSize === "number") {
          setSemMaxSize(config.semanticCacheMaxSize);
        }
        if (config.semanticCacheEmbeddingProvider) {
          setSemProvider(config.semanticCacheEmbeddingProvider);
        }
        if (config.semanticCacheEmbeddingModel) {
          setSemModel(config.semanticCacheEmbeddingModel);
        }
        if (typeof config.semanticCacheEmbeddingDimension === "number") {
          setSemDimension(config.semanticCacheEmbeddingDimension);
        }
        if (typeof config.semanticCacheEmbeddingBaseUrl === "string") {
          setSemBaseUrl(config.semanticCacheEmbeddingBaseUrl);
        }
        if (typeof config.semanticCacheEmbeddingApiKey === "string") {
          setSemApiKey(config.semanticCacheEmbeddingApiKey);
        }
        if (typeof config.semanticCacheRedisUrl === "string") {
          setSemRedisUrl(config.semanticCacheRedisUrl);
        }
        if (typeof config.semanticCacheRedisPrefix === "string") {
          setSemRedisPrefix(config.semanticCacheRedisPrefix);
        }
        if (config.semanticCacheRequireZeroTemp !== undefined) {
          setSemRequireZeroTemp(config.semanticCacheRequireZeroTemp);
        }
        if (Array.isArray(config.embeddingOptions)) {
          setEmbeddingOptions(config.embeddingOptions);
        }
      })
      .catch((error) => {
        console.error("Failed to load cache config:", error);
        if (active) setCatalogMessage({ type: "error", text: t("cacheConfigLoadFailed") });
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });

    return () => {
      active = false;
    };
  }, [t]);

  // Catalog TTL validation and save
  const catalogDirty = catalogTtl.trim() !== savedCatalogTtl;

  const saveCatalogTtl = useCallback(async () => {
    if (!catalogDirty) return;

    const parsed = Number(catalogTtl.trim());
    if (!Number.isInteger(parsed)) return;
    if (parsed < MIN_TTL_MS || parsed > MAX_TTL_MS) return;

    setCatalogSaving(true);
    setCatalogMessage(null);

    try {
      const response = await fetch("/api/settings/cache-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelCatalogCacheTtlMs: parsed }),
      });

      if (!response.ok) throw new Error(`Cache config API returned ${response.status}`);

      const config = (await response.json()) as CacheConfigResponse;
      const saved = String(config.modelCatalogCacheTtlMs ?? parsed);
      setCatalogTtl(saved);
      setSavedCatalogTtl(saved);
      setCatalogMessage({ type: "success", text: t("cacheConfigSaveSuccess") });
    } catch (error) {
      console.error("Failed to save cache config:", error);
      setCatalogMessage({ type: "error", text: t("cacheConfigSaveFailed") });
    } finally {
      setCatalogSaving(false);
    }
  }, [catalogDirty, t, catalogTtl, setCatalogTtl, setCatalogMessage]);

  const catalogValidationError = (() => {
    const trimmed = catalogTtl.trim();
    if (!trimmed) return t("modelCatalogTtlRequired");
    const parsed = Number(trimmed);
    if (!Number.isInteger(parsed)) return t("modelCatalogTtlWholeNumberError");
    if (parsed < MIN_TTL_MS) return t("modelCatalogTtlMinimumError", { min: MIN_TTL_MS });
    if (parsed > MAX_TTL_MS) return t("modelCatalogTtlMaximumError", { max: MAX_TTL_MS });
    return null;
  })();

  // Current selected provider and model details
  const selectedProviderOption = embeddingOptions.find((p) => p.id === semProvider);
  const availableModelsForProvider = selectedProviderOption?.models || [];
  const selectedModelOption = availableModelsForProvider.find(
    (m) => m.rawId === semModel || m.id === semModel
  );

  // Sync dimensions when model selection changes
  const handleModelChange = (modelIdOrRaw: string) => {
    setSemModel(modelIdOrRaw);
    const m = availableModelsForProvider.find(
      (item) => item.rawId === modelIdOrRaw || item.id === modelIdOrRaw
    );
    if (m?.dimensions) {
      setSemDimension(m.dimensions);
    }
    setTestResult(null);
  };

  const handleProviderChange = (newProvider: string) => {
    setSemProvider(newProvider);
    const provider = embeddingOptions.find((p) => p.id === newProvider);
    if (provider && provider.models.length > 0) {
      const firstModel = provider.models[0];
      setSemModel(firstModel.rawId || firstModel.id);
      if (firstModel.dimensions) {
        setSemDimension(firstModel.dimensions);
      }
    }
    setTestResult(null);
  };

  // Save Semantic Cache Config
  const saveSemanticCache = async () => {
    setSemSaving(true);
    setSemMessage(null);

    const payload = {
      semanticCacheEnabled: semEnabled,
      semanticCacheVectorEnabled: semVectorEnabled,
      semanticCacheBackend: semBackend,
      semanticCacheThreshold: Number(semThreshold),
      semanticCacheTTL: semTtlMinutes * 60000,
      semanticCacheMaxSize: Number(semMaxSize),
      semanticCacheEmbeddingProvider: semProvider,
      semanticCacheEmbeddingModel: semModel,
      semanticCacheEmbeddingDimension: semDimension ? Number(semDimension) : null,
      semanticCacheEmbeddingBaseUrl: semBaseUrl.trim() || selectedProviderOption?.baseUrl || null,
      semanticCacheEmbeddingApiKey: semApiKey.trim() || null,
      semanticCacheRedisUrl: semRedisUrl.trim() || null,
      semanticCacheRedisPrefix: semRedisPrefix.trim() || "omniroute:semcache:",
      semanticCacheRequireZeroTemp: semRequireZeroTemp,
    };

    try {
      const res = await fetch("/api/settings/cache-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Save failed with status ${res.status}`);

      setSemMessage({ type: "success", text: t("semanticCacheSaveSuccess") });
    } catch (err) {
      console.error("Failed to save semantic cache settings:", err);
      setSemMessage({ type: "error", text: t("semanticCacheSaveFailed") });
    } finally {
      setSemSaving(false);
    }
  };

  // Test embedding connection
  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/settings/cache-config/test-embedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: semProvider,
          model: semModel,
          baseUrl: semBaseUrl.trim() || selectedProviderOption?.baseUrl || undefined,
          apiKey: semApiKey.trim() || undefined,
          dimensions: semDimension,
        }),
      });

      const data = await res.json();
      setTestResult(data);
    } catch {
      setTestResult({ ok: false, error: t("semanticCacheConnectionError") });
    } finally {
      setTestingConnection(false);
    }
  };

  // Clear cache
  const handleClearCache = async () => {
    setClearingCache(true);
    setClearMessage(null);

    try {
      const res = await fetch("/api/cache", { method: "DELETE" });
      if (!res.ok) {
        setClearMessage(`${t("semanticCacheClearFailed")} HTTP ${res.status}`);
        return;
      }
      setClearMessage(t("semanticCacheClearSuccess"));
    } catch {
      setClearMessage(t("semanticCacheClearFailed"));
    } finally {
      setClearingCache(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* ── 1. Semantic Caching Card ── */}
      <Card className="p-6">
        <div className="flex flex-col gap-5">
          {/* Card Header & Master Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base text-text-primary">
                  {t("semanticCacheTitle")}
                </h3>
                <Badge variant={semEnabled ? "success" : "default"} size="sm">
                  {semEnabled ? t("semanticCacheEnabled") : t("semanticCacheDisabled")}
                </Badge>
              </div>
              <p className="text-sm text-text-muted mt-1">{t("semanticCacheDescription")}</p>
            </div>
            <Toggle
              checked={semEnabled}
              onChange={setSemEnabled}
              ariaLabel={t("semanticCacheEnable")}
            />
          </div>

          {semEnabled && (
            <div className="flex flex-col gap-5">
              {/* Vector-similarity layer opt-in (default off) */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {t("semanticCacheVectorTitle")}
                  </p>
                  <p className="text-xs text-text-muted">{t("semanticCacheVectorDescription")}</p>
                </div>
                <Toggle
                  checked={semVectorEnabled}
                  onChange={setSemVectorEnabled}
                  ariaLabel={t("semanticCacheVectorEnable")}
                />
              </div>

              {/* Provider & Model Selection Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sem-provider"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    {t("semanticCacheProvider")}
                  </label>
                  <Select
                    id="sem-provider"
                    value={semProvider}
                    onChange={(e) => handleProviderChange(e.target.value)}
                    disabled={catalogLoading || semSaving}
                    options={
                      embeddingOptions.length > 0
                        ? embeddingOptions.map((opt) => ({
                            value: opt.id,
                            label: opt.hasConnection
                              ? t("semanticCacheConfiguredProvider", { name: opt.name })
                              : opt.name,
                          }))
                        : [{ value: semProvider, label: semProvider }]
                    }
                  />
                  {selectedProviderOption && (
                    <p className="text-xs text-text-muted mt-1">
                      {selectedProviderOption.hasConnection
                        ? t("semanticCacheConfiguredConnection", {
                            url: selectedProviderOption.baseUrl || t("semanticCacheDefaultUrl"),
                          })
                        : t("semanticCacheConnectionRequired")}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="sem-model"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    {t("semanticCacheModel")}
                  </label>
                  <Select
                    id="sem-model"
                    value={semModel}
                    onChange={(e) => handleModelChange(e.target.value)}
                    disabled={
                      catalogLoading || semSaving || availableModelsForProvider.length === 0
                    }
                    options={
                      availableModelsForProvider.length > 0
                        ? availableModelsForProvider.map((m) => ({
                            value: m.rawId || m.id,
                            label: m.dimensions
                              ? t("semanticCacheModelDimensions", {
                                  name: m.name || m.rawId,
                                  count: m.dimensions,
                                })
                              : m.name || m.rawId,
                          }))
                        : [{ value: semModel, label: semModel }]
                    }
                  />

                  {/* Model Metadata Badges */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {semDimension ? (
                      <Badge variant="primary" size="sm">
                        {t("semanticCacheDimensions", { count: semDimension })}
                      </Badge>
                    ) : null}
                    {selectedModelOption?.maxTokens ? (
                      <Badge variant="info" size="sm">
                        {t("semanticCacheMaxTokens", { count: selectedModelOption.maxTokens })}
                      </Badge>
                    ) : null}
                    {selectedModelOption?.supportedInputTypes ? (
                      <Badge variant="default" size="sm">
                        {t("semanticCacheInputTypes", {
                          types: format.list(
                            selectedModelOption.supportedInputTypes.map(
                              (type) => inputTypeLabels[type] || type
                            )
                          ),
                        })}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Threshold Slider & TTL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="sem-threshold"
                      className="text-sm font-medium text-text-primary"
                    >
                      {t("semanticCacheThreshold")}
                    </label>
                    <span className="text-xs font-mono font-bold text-primary">
                      {format.number(semThreshold, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <input
                    id="sem-threshold"
                    type="range"
                    min="0.50"
                    max="1.00"
                    step="0.01"
                    value={semThreshold}
                    onChange={(e) => setSemThreshold(parseFloat(e.target.value))}
                    className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-primary"
                    disabled={semSaving}
                  />
                  <p className="text-xs text-text-muted mt-1">{t("semanticCacheThresholdHint")}</p>
                </div>

                <div>
                  <label
                    htmlFor="sem-retention"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    {t("semanticCacheRetention")}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="sem-retention"
                      type="number"
                      min={1}
                      max={10080}
                      value={semTtlMinutes}
                      onChange={(e) => setSemTtlMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-28 px-3 py-1.5 rounded bg-surface-2 border border-border text-sm text-text-primary"
                      disabled={semSaving}
                    />
                    <span className="text-xs text-text-muted">{t("semanticCacheMinutes")}</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">{t("semanticCacheRetentionHint")}</p>
                </div>
              </div>

              {/* Storage Backend Selection */}
              <div className="pt-2 border-t border-border/40">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t("semanticCacheStorage")}
                </label>
                <SegmentedControl
                  value={semBackend}
                  onChange={(val) => setSemBackend(val as "memory" | "redis")}
                  options={[
                    { value: "memory", label: t("semanticCacheMemory") },
                    { value: "redis", label: t("semanticCacheRedis") },
                  ]}
                />

                {semBackend === "memory" ? (
                  <div className="mt-3">
                    <label
                      htmlFor="sem-max-entries"
                      className="block text-xs font-medium text-text-muted mb-1"
                    >
                      {t("semanticCacheMaxEntries")}
                    </label>
                    <input
                      id="sem-max-entries"
                      type="number"
                      min={10}
                      max={100000}
                      value={semMaxSize}
                      onChange={(e) => setSemMaxSize(parseInt(e.target.value) || 100)}
                      className="w-32 px-3 py-1.5 rounded bg-surface-2 border border-border text-sm text-text-primary"
                      disabled={semSaving}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div>
                      <label
                        htmlFor="sem-redis-url"
                        className="block text-xs font-medium text-text-muted mb-1"
                      >
                        {t("semanticCacheRedisUrl")}
                      </label>
                      <input
                        id="sem-redis-url"
                        type="text"
                        placeholder="redis://127.0.0.1:6379"
                        value={semRedisUrl}
                        onChange={(e) => setSemRedisUrl(e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-surface-2 border border-border text-sm text-text-primary"
                        disabled={semSaving}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sem-redis-prefix"
                        className="block text-xs font-medium text-text-muted mb-1"
                      >
                        {t("semanticCacheRedisPrefix")}
                      </label>
                      <input
                        id="sem-redis-prefix"
                        type="text"
                        value={semRedisPrefix}
                        onChange={(e) => setSemRedisPrefix(e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-surface-2 border border-border text-sm text-text-primary"
                        disabled={semSaving}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Determinism Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {t("semanticCacheDeterminism")}
                  </p>
                  <p className="text-xs text-text-muted">{t("semanticCacheDeterminismHint")}</p>
                </div>
                <Toggle
                  checked={semRequireZeroTemp}
                  onChange={setSemRequireZeroTemp}
                  ariaLabel={t("semanticCacheZeroTemperature")}
                />
              </div>

              {/* Advanced Overrides Accordion */}
              <div className="pt-2 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  aria-expanded={showAdvanced}
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  {showAdvanced ? t("semanticCacheHideAdvanced") : t("semanticCacheShowAdvanced")}
                </button>

                {showAdvanced && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 p-3 rounded-lg bg-surface-2/40 border border-border/40">
                    <div>
                      <label
                        htmlFor="sem-base-url"
                        className="block text-xs font-medium text-text-muted mb-1"
                      >
                        {t("semanticCacheBaseUrl")}
                      </label>
                      <input
                        id="sem-base-url"
                        type="text"
                        placeholder="https://custom-embedding.internal/v1"
                        value={semBaseUrl}
                        onChange={(e) => setSemBaseUrl(e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-surface-2 border border-border text-xs text-text-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sem-api-key"
                        className="block text-xs font-medium text-text-muted mb-1"
                      >
                        {t("semanticCacheApiKey")}
                      </label>
                      <input
                        id="sem-api-key"
                        type="password"
                        placeholder={t("semanticCacheApiKeyPlaceholder")}
                        value={semApiKey}
                        onChange={(e) => setSemApiKey(e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-surface-2 border border-border text-xs text-text-primary"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons & Feedback */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleTestConnection}
                    disabled={testingConnection || semSaving}
                  >
                    {testingConnection ? t("semanticCacheTesting") : t("semanticCacheTest")}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleClearCache}
                    disabled={clearingCache}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    {clearingCache ? t("semanticCachePurging") : t("semanticCacheClear")}
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={saveSemanticCache}
                  disabled={semSaving}
                >
                  {semSaving ? t("semanticCacheSaving") : t("semanticCacheSave")}
                </Button>
              </div>

              {/* Test Connection Output */}
              {testResult && (
                <div
                  className={`p-3 rounded-md text-xs border ${
                    testResult.ok
                      ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300"
                      : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  {testResult.ok ? (
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{t("semanticCacheConnectionVerified")}</span>
                      <span>
                        {testResult.resolvedBaseUrl
                          ? t("semanticCacheTestSuccessVia", {
                              dimensions: testResult.dimensions,
                              latency: testResult.latencyMs,
                              url: testResult.resolvedBaseUrl,
                            })
                          : t("semanticCacheTestSuccess", {
                              dimensions: testResult.dimensions,
                              latency: testResult.latencyMs,
                            })}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold">{t("semanticCacheConnectionFailed")} </span>
                      <span>{testResult.error || t("semanticCacheUnknownError")}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Clear Message */}
              {clearMessage && <p className="text-xs text-text-muted italic">{clearMessage}</p>}

              {/* Save Message */}
              {semMessage && (
                <p
                  className={`text-xs ${
                    semMessage.type === "success"
                      ? "text-green-600 dark:text-green-400 font-medium"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {semMessage.text}
                </p>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* ── 2. Model Catalog Cache Card (Preserved Compatibility) ── */}
      <Card className="p-6">
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">{t("modelCatalogCacheTtl")}</p>
            <p className="text-sm text-text-muted mt-1">{t("modelCatalogCacheTtlDescription")}</p>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="model-catalog-ttl-ms" className="sr-only">
              {t("modelCatalogCacheTtlLabel")}
            </label>
            <input
              id="model-catalog-ttl-ms"
              type="number"
              min={MIN_TTL_MS}
              max={MAX_TTL_MS}
              step={100}
              value={catalogTtl}
              onChange={(event) => {
                setCatalogTtl(event.target.value);
                setCatalogMessage(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && catalogDirty) void saveCatalogTtl();
              }}
              className="w-32 px-3 py-1.5 rounded bg-surface-2 border border-border text-sm text-text-primary"
              disabled={catalogLoading || catalogSaving}
            />
            <span className="text-xs text-text-muted">{t("semanticCacheMilliseconds")}</span>
            <Button
              size="sm"
              variant="primary"
              disabled={catalogLoading || Boolean(catalogValidationError) || !catalogDirty}
              onClick={saveCatalogTtl}
            >
              {catalogSaving ? t("modelCatalogCacheTtlSaving") : t("modelCatalogCacheTtlSave")}
            </Button>
            {catalogDirty && (
              <span className="text-xs text-text-muted">
                {t("modelCatalogCacheTtlCurrent", { value: savedCatalogTtl })}
              </span>
            )}
          </div>
          {catalogValidationError && (
            <p className="text-xs text-red-500">{catalogValidationError}</p>
          )}
          {catalogMessage && (
            <p
              className={`text-xs ${
                catalogMessage.type === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {catalogMessage.text}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
