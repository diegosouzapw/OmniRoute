"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, ModelSelectModal, ManualConfigModal } from "@/shared/components";
import CliStatusBadge from "./CliStatusBadge";
import { useTranslations } from "next-intl";

import ProviderIcon from "@/shared/components/ProviderIcon";

const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL;

export default function DroidToolCard({
  tool,
  isExpanded = false,
  onToggle = () => {},
  baseUrl,
  hasActiveProviders,
  apiKeys,
  activeProviders,
  cloudEnabled,
  batchStatus,
  lastConfiguredAt,
}) {
  const t = useTranslations("cliTools");
  const [droidStatus, setDroidStatus] = useState(null);
  const [checkingDroid, setCheckingDroid] = useState(false);
  const [applying, setApplying] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedApiKeyId, setSelectedApiKeyId] = useState("");
  // (#618) Multi-model support: list of model ids + input box for the next entry.
  // `selectedModel` is derived as the first entry so existing call sites
  // (manual-config preview, ModelSelectModal) continue to work.
  const [modelList, setModelList] = useState([]);
  const [modelInput, setModelInput] = useState("");
  const selectedModel = modelList[0] || "";
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

  // (#618) Match any custom:OmniRoute-<i> entry (multi-model).
  const isOmniRouteEntry = (m) => typeof m?.id === "string" && m.id.startsWith("custom:OmniRoute");

  const getConfigStatus = () => {
    if (!cliReady) return null;
    const currentConfig = droidStatus.settings?.customModels?.find(isOmniRouteEntry);
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

  // (#523) Store the key *id* (not the masked string) so the backend can
  // resolve the real secret from DB before writing to config files.
  useEffect(() => {
    if (apiKeys?.length > 0 && !selectedApiKeyId) {
      setSelectedApiKeyId(apiKeys[0].id);
    }
  }, [apiKeys, selectedApiKeyId]);

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
      // (#618) Pre-fill the multi-model list from every custom:OmniRoute-<i>
      // entry, preserving the original index order.
      const existing = (droidStatus.settings?.customModels || [])
        .filter(isOmniRouteEntry)
        .slice()
        .sort((a, b) => (a.index || 0) - (b.index || 0));
      if (existing.length > 0) {
        setModelList(existing.map((m) => m.model).filter(Boolean));
        const first = existing[0];
        if (first?.apiKey) {
          // (#523) Keys from /api/keys are masked. Match by prefix/suffix.
          const fileKeyPrefix = first.apiKey.slice(0, 8);
          const fileKeySuffix = first.apiKey.slice(-4);
          const matchedKey = apiKeys?.find(
            (k) => k.key && k.key.startsWith(fileKeyPrefix) && k.key.endsWith(fileKeySuffix)
          );
          if (matchedKey) setSelectedApiKeyId(matchedKey.id);
        }
      }
    }
  }, [droidStatus, apiKeys]);

  // (#618) Multi-model list manipulation helpers.
  const addModel = (value) => {
    const v = (value ?? modelInput).trim();
    if (!v || modelList.includes(v)) return;
    setModelList((prev) => [...prev, v]);
    setModelInput("");
  };
  const removeModel = (id) => setModelList((prev) => prev.filter((m) => m !== id));

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
      // (#523) Prefer keyId lookup so the backend writes the real key to disk.
      const selectedKeyId =
        selectedApiKeyId?.trim() || (apiKeys?.length > 0 ? apiKeys[0].id : null);

      const res = await fetch("/api/cli-tools/droid-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: getEffectiveBaseUrl(),
          apiKey: !cloudEnabled ? "sk_omniroute" : null,
          keyId: selectedKeyId,
          // (#618) Send both `model` (legacy, first entry) and `models` (array).
          // Backend prefers `models` when present; `model` keeps Zod happy
          // for callers still on the single-model contract.
          model: selectedModel,
          models: modelList,
          activeModel: selectedModel,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("settingsApplied") });
        checkDroidStatus();
      } else {
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedApplySettings"),
        });
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
        setMessage({ type: "success", text: t("settingsReset") });
        setModelList([]);
        setSelectedApiKeyId("");
        checkDroidStatus();
      } else {
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedResetSettings"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setRestoring(false);
    }
  };

  const handleModelSelect = (model) => {
    // (#618) Append to the model list rather than replacing the single slot.
    if (!model?.value || modelList.includes(model.value)) {
      setModalOpen(false);
      return;
    }
    setModelList((prev) => [...prev, model.value]);
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
        setMessage({ type: "success", text: t("backupRestored") });
        checkDroidStatus();
        fetchBackups();
      } else {
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedRestore"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setRestoringBackup(null);
    }
  };

  const getManualConfigs = () => {
    // (#523) Look up the key object by id to get the masked display value.
    const selectedKeyObj = apiKeys?.find((k) => k.id === selectedApiKeyId);
    const keyToDisplay =
      selectedKeyObj?.key || (!cloudEnabled ? "sk_omniroute" : "<API_KEY_FROM_DASHBOARD>");

    // (#618) Render one entry per requested model; fall back to a placeholder
    // when the list is empty so manual-config preview still shows the shape.
    const modelsForPreview = modelList.length > 0 ? modelList : ["provider/model-id"];
    const settingsContent = {
      customModels: modelsForPreview.map((m, i) => ({
        model: m,
        id: `custom:OmniRoute-${i}`,
        index: i,
        baseUrl: getEffectiveBaseUrl(),
        apiKey: keyToDisplay,
        displayName: m,
        maxOutputTokens: 131072,
        noImageSupport: false,
        provider: "openai",
      })),
    };

    const platform = typeof navigator !== "undefined" && navigator.platform;
    // eslint-disable-next-line no-restricted-syntax -- teknik string kontrolü, kullanıcı metni araması değil
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
            <ProviderIcon providerId="droid" size={32} type="color" />
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
            <p className="text-xs text-text-muted truncate">{t("toolDescriptions.droid")}</p>
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
              <span>{t("checkingCli", { tool: "Factory Droid" })}</span>
            </div>
          )}

          {!checkingDroid && droidStatus && !cliReady && (
            <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <span className="material-symbols-outlined text-yellow-500">warning</span>
              <div className="flex-1">
                <p className="font-medium text-yellow-600 dark:text-yellow-400">
                  {droidStatus.installed
                    ? t("cliNotRunnable", { tool: "Factory Droid" })
                    : t("cliNotInstalled", { tool: "Factory Droid" })}
                </p>
                <p className="text-sm text-text-muted">
                  {droidStatus.installed
                    ? t("cliFoundFailedHealthcheck", {
                        tool: "Factory Droid",
                        reason: droidStatus.reason ? ` (${droidStatus.reason})` : "",
                      })
                    : t("installCliPrompt", { tool: "Factory Droid" })}
                </p>
              </div>
            </div>
          )}

          {!checkingDroid && cliReady && (
            <>
              <div className="flex flex-col gap-2">
                {/* Current Base URL — first OmniRoute entry, any index (#618) */}
                {droidStatus?.settings?.customModels?.find(isOmniRouteEntry)?.baseUrl && (
                  <div className="flex items-center gap-2">
                    <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                      {t("current")}
                    </span>
                    <span className="material-symbols-outlined text-text-muted text-[14px]">
                      arrow_forward
                    </span>
                    <span className="flex-1 px-2 py-1.5 text-xs text-text-muted truncate">
                      {droidStatus.settings.customModels.find(isOmniRouteEntry).baseUrl}
                    </span>
                  </div>
                )}

                {/* Base URL */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    {t("baseUrl")}
                  </span>
                  <span className="material-symbols-outlined text-text-muted text-[14px]">
                    arrow_forward
                  </span>
                  <input
                    type="text"
                    value={getDisplayUrl()}
                    onChange={(e) => setCustomBaseUrl(e.target.value)}
                    placeholder={t("baseUrlPlaceholder")}
                    className="flex-1 px-2 py-1.5 bg-surface rounded border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  {customBaseUrl && customBaseUrl !== baseUrl && (
                    <button
                      onClick={() => setCustomBaseUrl("")}
                      className="p-1 text-text-muted hover:text-primary rounded transition-colors"
                      title={t("resetToDefault")}
                    >
                      <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                    </button>
                  )}
                </div>

                {/* API Key */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    {t("apiKey")}
                  </span>
                  <span className="material-symbols-outlined text-text-muted text-[14px]">
                    arrow_forward
                  </span>
                  {apiKeys.length > 0 ? (
                    <select
                      value={selectedApiKeyId}
                      onChange={(e) => setSelectedApiKeyId(e.target.value)}
                      className="flex-1 px-2 py-1.5 bg-surface rounded text-xs border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                    >
                      {apiKeys.map((key) => (
                        <option key={key.id} value={key.id}>
                          {key.key}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="flex-1 text-xs text-text-muted px-2 py-1.5">
                      {cloudEnabled ? t("noApiKeysCreateOne") : t("defaultOmnirouteKey")}
                    </span>
                  )}
                </div>

                {/* Models — multi-model support (#618) */}
                <div className="flex items-start gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right pt-1.5">
                    {t("model")}
                    {modelList.length > 0 && (
                      <span className="text-primary"> ({modelList.length})</span>
                    )}
                  </span>
                  <span className="material-symbols-outlined text-text-muted text-[14px] pt-2">
                    arrow_forward
                  </span>
                  <div className="flex-1 flex flex-col gap-1">
                    {modelList.length > 0 && (
                      <div className="flex flex-col gap-0.5 mb-1">
                        {modelList.map((id) => (
                          <div
                            key={id}
                            className="flex items-center gap-1.5 px-2 py-1 bg-bg-secondary rounded border border-border"
                          >
                            <span className="flex-1 text-xs font-mono truncate">{id}</span>
                            <button
                              onClick={() => removeModel(id)}
                              className="text-text-muted hover:text-red-500 transition-colors shrink-0"
                              title={t("clear")}
                            >
                              <span className="material-symbols-outlined text-[12px]">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={modelInput}
                        onChange={(e) => setModelInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addModel();
                          }
                        }}
                        placeholder={t("providerModelPlaceholder")}
                        className="flex-1 px-2 py-1.5 bg-surface rounded border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                      <button
                        onClick={() => setModalOpen(true)}
                        disabled={!hasActiveProviders}
                        className={`px-2 py-1.5 rounded border text-xs transition-colors shrink-0 whitespace-nowrap ${hasActiveProviders ? "bg-surface border-border text-text-main hover:border-primary cursor-pointer" : "opacity-50 cursor-not-allowed border-border"}`}
                      >
                        {t("selectModel")}
                      </button>
                      <button
                        onClick={() => addModel()}
                        disabled={!modelInput.trim() || modelList.includes(modelInput.trim())}
                        className="px-2 py-1.5 rounded border bg-surface border-border hover:border-primary text-xs shrink-0 disabled:opacity-50"
                        title="Add model"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>
                  </div>
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
                  disabled={modelList.length === 0}
                  loading={applying}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">save</span>
                  {t("apply")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetSettings}
                  disabled={!droidStatus?.hasOmniRoute}
                  loading={restoring}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">restore</span>
                  {t("reset")}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowManualConfigModal(true)}>
                  <span className="material-symbols-outlined text-[14px] mr-1">content_copy</span>
                  {t("manualConfig")}
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
                  <span className="material-symbols-outlined text-[14px] mr-1">history</span>
                  {t("backups")}
                  {backups.length > 0 && ` (${backups.length})`}
                </Button>
              </div>

              {showBackups && (
                <div className="mt-2 p-3 bg-surface border border-border rounded-lg">
                  <h4 className="text-xs font-semibold text-text-main mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">history</span>
                    {t("configBackups")}
                  </h4>
                  {backups.length === 0 ? (
                    <p className="text-xs text-text-muted">{t("noBackupsYet")}</p>
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
                            {restoringBackup === b.id ? "..." : t("restore")}
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
        title={t("selectModelForTool", { tool: "Factory Droid" })}
      />

      <ManualConfigModal
        isOpen={showManualConfigModal}
        onClose={() => setShowManualConfigModal(false)}
        title={t("droidManualConfiguration")}
        configs={getManualConfigs()}
      />
    </Card>
  );
}
