"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Card, Button, ModelSelectModal } from "@/shared/components";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function DefaultToolCard({
  toolId,
  tool,
  isExpanded,
  onToggle,
  baseUrl,
  apiKeys,
  activeProviders = [],
  cloudEnabled = false,
  batchStatus,
}) {
  const t = useTranslations("cliTools");
  const translateOrFallback = useCallback(
    (key, fallback, values) => {
      try {
        return t(key, values);
      } catch {
        return fallback;
      }
    },
    [t]
  );
  const [copiedField, setCopiedField] = useState(null);
  const [showModelModal, setShowModelModal] = useState(false);
  const [modelValue, setModelValue] = useState("");
  const [runtimeStatus, setRuntimeStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const runtimeFetchStartedRef = useRef(false);

  // Initialize state directly with computed value
  const [selectedApiKey, setSelectedApiKey] = useState(() =>
    apiKeys?.length > 0 ? apiKeys[0].key : ""
  );

  // Persist and restore model selection per tool via localStorage
  useEffect(() => {
    const savedModel = localStorage.getItem(`omniroute-cli-model-${toolId}`);
    if (savedModel) setModelValue(savedModel);
    const savedKey = localStorage.getItem(`omniroute-cli-key-${toolId}`);
    if (savedKey && apiKeys?.some((k) => k.key === savedKey)) setSelectedApiKey(savedKey);
  }, [toolId, apiKeys]);

  const handleModelChange = useCallback(
    (value) => {
      setModelValue(value);
      if (value) {
        localStorage.setItem(`omniroute-cli-model-${toolId}`, value);
      } else {
        localStorage.removeItem(`omniroute-cli-model-${toolId}`);
      }
    },
    [toolId]
  );

  const handleApiKeyChange = useCallback(
    (value) => {
      setSelectedApiKey(value);
      if (value) {
        localStorage.setItem(`omniroute-cli-key-${toolId}`, value);
      }
    },
    [toolId]
  );

  useEffect(() => {
    if (!isExpanded || runtimeStatus || runtimeFetchStartedRef.current) return;

    runtimeFetchStartedRef.current = true;
    fetch(`/api/cli-tools/runtime/${toolId}`)
      .then((res) => res.json())
      .then((data) => setRuntimeStatus(data))
      .catch((error) => setRuntimeStatus({ error: error?.message || t("runtimeCheckFailed") }));
  }, [isExpanded, runtimeStatus, toolId]);

  const replaceVars = (text) => {
    const keyToUse =
      selectedApiKey && selectedApiKey.trim()
        ? selectedApiKey
        : !cloudEnabled
          ? "sk_omniroute"
          : t("yourApiKeyPlaceholder");

    const normalizedBaseUrl = baseUrl || "http://localhost:20128";
    const baseUrlWithV1 = normalizedBaseUrl.endsWith("/v1")
      ? normalizedBaseUrl
      : `${normalizedBaseUrl}/v1`;

    return text
      .replace(/\{\{baseUrl\}\}/g, baseUrlWithV1)
      .replace(/\{\{apiKey\}\}/g, keyToUse)
      .replace(/\{\{model\}\}/g, modelValue || t("modelPlaceholder"));
  };

  const handleCopy = async (text, field) => {
    await navigator.clipboard.writeText(replaceVars(text));
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSelectModel = (model) => {
    handleModelChange(model.value);
  };

  const hasActiveProviders = activeProviders.length > 0;
  const checkingRuntime = isExpanded && runtimeStatus === null;

  // Save config to file (for tools that support it, like Continue)
  const handleSaveConfig = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const keyToUse =
        selectedApiKey && selectedApiKey.trim()
          ? selectedApiKey
          : !cloudEnabled
            ? "sk_omniroute"
            : "";

      const normalizedBaseUrl = baseUrl || "http://localhost:20128";
      const baseUrlWithV1 = normalizedBaseUrl.endsWith("/v1")
        ? normalizedBaseUrl
        : `${normalizedBaseUrl}/v1`;

      const res = await fetch(`/api/cli-tools/guide-settings/${toolId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: baseUrlWithV1,
          apiKey: keyToUse,
          model: modelValue,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || t("configurationSaved") });
      } else {
        setMessage({ type: "error", text: data.error || t("failedToSave") });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  };

  // Check if this tool supports direct config file write
  const supportsDirectSave = ["continue"].includes(toolId);

  const renderApiKeySelector = () => {
    return (
      <div className="mt-2 flex items-center gap-2">
        {apiKeys && apiKeys.length > 0 ? (
          <>
            <select
              value={selectedApiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="flex-1 px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
            >
              {apiKeys.map((key) => (
                <option key={key.id} value={key.key}>
                  {key.key}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleCopy(selectedApiKey, "apiKey")}
              className="shrink-0 px-3 py-2 bg-bg-secondary hover:bg-bg-tertiary rounded-lg border border-border transition-colors"
            >
              <span className="material-symbols-outlined text-lg">
                {copiedField === "apiKey" ? "check" : "content_copy"}
              </span>
            </button>
          </>
        ) : (
          <span className="text-sm text-text-muted">
            {cloudEnabled ? t("noApiKeysCreateOne") : "sk_omniroute"}
          </span>
        )}
      </div>
    );
  };

  const renderModelSelector = () => {
    return (
      <div className="mt-2 flex items-center gap-2">
        <input
          type="text"
          value={modelValue}
          onChange={(e) => handleModelChange(e.target.value)}
          placeholder={t("modelPlaceholder")}
          className="flex-1 px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
        <button
          onClick={() => setShowModelModal(true)}
          disabled={!hasActiveProviders}
          className={`shrink-0 px-3 py-2 rounded-lg border text-sm transition-colors ${
            hasActiveProviders
              ? "bg-bg-secondary border-border text-text-main hover:border-primary cursor-pointer"
              : "opacity-50 cursor-not-allowed border-border"
          }`}
        >
          {t("selectModel")}
        </button>
        {modelValue && (
          <>
            <button
              onClick={() => handleCopy(modelValue, "model")}
              className="shrink-0 px-3 py-2 bg-bg-secondary hover:bg-bg-tertiary rounded-lg border border-border transition-colors"
            >
              <span className="material-symbols-outlined text-lg">
                {copiedField === "model" ? "check" : "content_copy"}
              </span>
            </button>
            <button
              onClick={() => handleModelChange("")}
              className="p-2 text-text-muted hover:text-red-500 rounded transition-colors"
              title={t("clear")}
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </>
        )}
      </div>
    );
  };

  const renderNotes = () => {
    if (!tool.notes || tool.notes.length === 0) return null;

    return (
      <div className="flex flex-col gap-2 mb-4">
        {tool.notes.map((note, index) => {
          if (note.type === "cloudCheck" && cloudEnabled) return null;

          const isWarning = note.type === "warning";
          const isError = note.type === "cloudCheck" && !cloudEnabled;

          let bgClass = "bg-blue-500/10 border-blue-500/30";
          let textClass = "text-blue-600 dark:text-blue-400";
          let iconClass = "text-blue-500";
          let icon = "info";

          if (isWarning) {
            bgClass = "bg-yellow-500/10 border-yellow-500/30";
            textClass = "text-yellow-600 dark:text-yellow-400";
            iconClass = "text-yellow-500";
            icon = "warning";
          } else if (isError) {
            bgClass = "bg-red-500/10 border-red-500/30";
            textClass = "text-red-600 dark:text-red-400";
            iconClass = "text-red-500";
            icon = "error";
          }

          return (
            <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${bgClass}`}>
              <span className={`material-symbols-outlined text-lg ${iconClass}`}>{icon}</span>
              <p className={`text-sm ${textClass}`}>
                {translateOrFallback(`guides.${toolId}.notes.${index}`, note.text)}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const canShowGuide = () => {
    if (tool.requiresCloud && !cloudEnabled) return false;
    return true;
  };

  const renderGuideSteps = () => {
    if (!tool.guideSteps) return <p className="text-text-muted text-sm">{t("comingSoon")}</p>;

    return (
      <div className="flex flex-col gap-4">
        {checkingRuntime && (
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <span className="material-symbols-outlined animate-spin text-base">
              progress_activity
            </span>
            <span>{t("checkingRuntime")}</span>
          </div>
        )}
        {!checkingRuntime && runtimeStatus && !runtimeStatus.error && (
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <span className="material-symbols-outlined text-blue-500 text-lg">
              {runtimeStatus.reason === "not_required"
                ? "info"
                : runtimeStatus.installed && runtimeStatus.runnable
                  ? "check_circle"
                  : "warning"}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {runtimeStatus.reason === "not_required"
                  ? t("guideOnlyIntegration")
                  : runtimeStatus.installed && runtimeStatus.runnable
                    ? t("cliRuntimeDetected")
                    : runtimeStatus.installed
                      ? t("cliFoundNotRunnable", {
                          reason: runtimeStatus.reason ? `: ${runtimeStatus.reason}` : "",
                        })
                      : t("cliRuntimeNotDetected")}
              </p>
              {runtimeStatus.commandPath && (
                <p className="text-xs text-text-muted">
                  {t("binary")}:{" "}
                  <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">
                    {runtimeStatus.commandPath}
                  </code>
                </p>
              )}
              {runtimeStatus.configPath && (
                <p className="text-xs text-text-muted">
                  {t("configPath")}:{" "}
                  <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">
                    {runtimeStatus.configPath}
                  </code>
                </p>
              )}
            </div>
          </div>
        )}
        {!checkingRuntime && runtimeStatus?.error && (
          <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <span className="material-symbols-outlined text-red-500 text-lg">error</span>
            <p className="text-sm text-red-600 dark:text-red-400">
              {t("failedCheckRuntimeStatus")}
            </p>
          </div>
        )}
        {renderNotes()}
        {canShowGuide() &&
          tool.guideSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div
                className="size-8 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold text-white"
                style={{ backgroundColor: tool.color }}
              >
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text">
                  {translateOrFallback(`guides.${toolId}.steps.${item.step}.title`, item.title)}
                </p>
                {item.desc && (
                  <p className="text-sm text-text-muted mt-0.5">
                    {translateOrFallback(`guides.${toolId}.steps.${item.step}.desc`, item.desc)}
                  </p>
                )}
                {item.type === "apiKeySelector" && renderApiKeySelector()}
                {item.type === "modelSelector" && renderModelSelector()}
                {item.value && (
                  <div className="mt-2 flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-bg-secondary rounded-lg text-sm font-mono border border-border truncate">
                      {replaceVars(item.value)}
                    </code>
                    {item.copyable && (
                      <button
                        onClick={() => handleCopy(item.value, `${item.step}-${item.title}`)}
                        className="shrink-0 px-3 py-2 bg-bg-secondary hover:bg-bg-tertiary rounded-lg border border-border transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {copiedField === `${item.step}-${item.title}` ? "check" : "content_copy"}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

        {canShowGuide() && tool.codeBlock && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted uppercase tracking-wide">
                {tool.codeBlock.language}
              </span>
              <button
                onClick={() => handleCopy(tool.codeBlock.code, "codeblock")}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-bg-secondary hover:bg-bg-tertiary rounded border border-border transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedField === "codeblock" ? "check" : "content_copy"}
                </span>
                {copiedField === "codeblock" ? t("copied") : t("copy")}
              </button>
            </div>
            <pre className="p-4 bg-bg-secondary rounded-lg border border-border overflow-x-auto">
              <code className="text-sm font-mono whitespace-pre">
                {replaceVars(tool.codeBlock.code)}
              </code>
            </pre>
          </div>
        )}

        {/* Save / Action buttons */}
        {canShowGuide() && (
          <div className="mt-2">
            {message && (
              <div
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs mb-2 ${message.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {message.type === "success" ? "check_circle" : "error"}
                </span>
                <span>{message.text}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              {supportsDirectSave && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveConfig}
                  disabled={!modelValue}
                  loading={saving}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">save</span>
                  {t("saveConfig")}
                </Button>
              )}
              {tool.codeBlock && (
                <Button
                  variant={supportsDirectSave ? "outline" : "primary"}
                  size="sm"
                  onClick={() => handleCopy(tool.codeBlock.code, "codeblock")}
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">
                    {copiedField === "codeblock" ? "check" : "content_copy"}
                  </span>
                  {copiedField === "codeblock" ? t("copied") : t("copyConfig")}
                </Button>
              )}
              {modelValue && (
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-green-500">
                    check_circle
                  </span>
                  {t("selectionSaved")}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderIcon = () => {
    if (tool.image) {
      return (
        <Image
          src={tool.image}
          alt={tool.name}
          width={32}
          height={32}
          className="size-8 object-contain rounded-lg"
          sizes="32px"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
      );
    }
    if (tool.icon) {
      return (
        <span className="material-symbols-outlined text-xl" style={{ color: tool.color }}>
          {tool.icon}
        </span>
      );
    }
    return (
      <Image
        src={`/providers/${toolId}.png`}
        alt={tool.name}
        width={32}
        height={32}
        className="size-8 object-contain rounded-lg"
        sizes="32px"
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = "none";
        }}
      />
    );
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{tool.name}</h3>
              {(() => {
                // Use runtime status if available (after expanding), otherwise use batch status
                const rs = runtimeStatus;
                const bs = batchStatus;
                const isGuide = rs?.reason === "not_required" || tool.configType === "guide";
                const isDetected = rs ? rs.installed && rs.runnable : bs?.installed && bs?.runnable;
                const isInstalled = rs ? rs.installed : bs?.installed;

                if (isGuide) {
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <span className="size-1.5 rounded-full bg-blue-500" />
                      {t("guide")}
                    </span>
                  );
                }
                if (isDetected) {
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                      <span className="size-1.5 rounded-full bg-green-500" />
                      {t("detected")}
                    </span>
                  );
                }
                if (isInstalled === false && (rs || bs)) {
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-zinc-500/10 text-zinc-500 dark:text-zinc-400">
                      <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                      {t("notInstalled")}
                    </span>
                  );
                }
                if (isInstalled && !isDetected && (rs || bs)) {
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                      <span className="size-1.5 rounded-full bg-yellow-500" />
                      {t("notReady")}
                    </span>
                  );
                }
                return null;
              })()}
            </div>
            <p className="text-xs text-text-muted truncate">
              {translateOrFallback(`toolDescriptions.${toolId}`, tool.description)}
            </p>
          </div>
        </div>
        <span
          className={`material-symbols-outlined text-text-muted text-[20px] transition-transform ${isExpanded ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </div>

      {isExpanded && <div className="mt-6 pt-6 border-t border-border">{renderGuideSteps()}</div>}

      <ModelSelectModal
        isOpen={showModelModal}
        onClose={() => setShowModelModal(false)}
        onSelect={handleSelectModel}
        selectedModel={modelValue}
        activeProviders={activeProviders}
        title={t("selectModel")}
      />
    </Card>
  );
}
