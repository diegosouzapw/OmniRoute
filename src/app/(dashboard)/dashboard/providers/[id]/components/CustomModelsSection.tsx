"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import {
  providerText,
  buildCompatMap,
  anyNormalizeCompatBadge,
  anyNoPreserveCompatBadge,
  anyUpstreamHeadersBadge,
  effectiveNormalizeForProtocol,
  effectivePreserveForProtocol,
  effectiveUpstreamHeadersForProtocol,
  formatProviderModelsErrorResponse,
  type CompatModelRow,
  type CompatByProtocolMap,
} from "../providerPageHelpers";
import {
  effectiveModelCapabilitiesFromRows,
  hasModelConfigOverride,
  mergeModelConfigRow,
  modelCapabilitiesFromRow,
  targetFormatBadgeI18nKey,
} from "../modelConfigHelpers";
import {
  buildNewModelCapabilities,
  parseUnsupportedParamsDraft,
  type BooleanCapabilityChoice,
} from "../customModelFormHelpers";
import AddCustomModelForm from "./AddCustomModelForm";
import ModelCompatPopover from "./ModelCompatPopover";

export interface CustomModelsSectionProps {
  providerId: string;
  providerAlias: string;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onModelsChanged?: () => void;
  onResetModelConfig?: (modelId: string) => Promise<void>;
}

function targetFormatLabel(value: string, t: (key: string) => string): string {
  const key = targetFormatBadgeI18nKey(value);
  return key ? providerText(t, key, value) : value;
}

export default function CustomModelsSection({
  providerId,
  providerAlias,
  copied,
  onCopy,
  onModelsChanged,
  onResetModelConfig,
}: CustomModelsSectionProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [customModels, setCustomModels] = useState<CompatModelRow[]>([]);
  const [modelCompatOverrides, setModelCompatOverrides] = useState<
    Array<CompatModelRow & { id: string }>
  >([]);
  const [newModelId, setNewModelId] = useState("");
  const [newModelName, setNewModelName] = useState("");
  const [newApiFormat, setNewApiFormat] = useState("chat-completions");
  const [newEndpoints, setNewEndpoints] = useState(["chat"]);
  const [newUnsupportedParams, setNewUnsupportedParams] = useState("");
  const [newSupportsVision, setNewSupportsVision] = useState<BooleanCapabilityChoice>("unknown");
  const [newSupportsTools, setNewSupportsTools] = useState<BooleanCapabilityChoice>("unknown");
  const [newSupportsThinking, setNewSupportsThinking] =
    useState<BooleanCapabilityChoice>("unknown");
  const [newSupportsXHigh, setNewSupportsXHigh] = useState<BooleanCapabilityChoice>("unknown");
  const [newSupportsMax, setNewSupportsMax] = useState<BooleanCapabilityChoice>("unknown");
  const [newContextWindow, setNewContextWindow] = useState("");
  const [newMaxOutputTokens, setNewMaxOutputTokens] = useState("");
  const [newDefaultThinkingBudget, setNewDefaultThinkingBudget] = useState("");
  const [newThinkingBudgetCap, setNewThinkingBudgetCap] = useState("");
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [editingApiFormat, setEditingApiFormat] = useState("chat-completions");
  const [editingEndpoints, setEditingEndpoints] = useState<string[]>(["chat"]);
  const [editingTargetFormat, setEditingTargetFormat] = useState("");
  const [newTargetFormat, setNewTargetFormat] = useState("");
  const [savingModelId, setSavingModelId] = useState<string | null>(null);
  const [togglingModelId, setTogglingModelId] = useState<string | null>(null);

  const customMap = useMemo(() => buildCompatMap(customModels), [customModels]);
  const overrideMap = useMemo(() => buildCompatMap(modelCompatOverrides), [modelCompatOverrides]);
  const capabilityChoiceLabels = {
    unknownLabel: providerText(t, "modelCapabilityUnknown", "Unknown"),
    yesLabel: providerText(t, "modelCapabilityYes", "Supported"),
    noLabel: providerText(t, "modelCapabilityNo", "Unsupported"),
  };

  const fetchCustomModels = useCallback(async () => {
    try {
      const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerId)}`);
      if (res.ok) {
        const data = await res.json();
        setCustomModels(data.models || []);
        setModelCompatOverrides(data.modelCompatOverrides || []);
      }
    } catch (e) {
      console.error("Failed to fetch custom models:", e);
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) void fetchCustomModels();
    });
    return () => {
      cancelled = true;
    };
  }, [fetchCustomModels]);

  const handleAdd = async () => {
    if (!newModelId.trim() || adding) return;
    setAdding(true);
    try {
      const capabilities = buildNewModelCapabilities({
        supportsVision: newSupportsVision,
        supportsTools: newSupportsTools,
        supportsThinking: newSupportsThinking,
        supportsXHigh: newSupportsXHigh,
        supportsMax: newSupportsMax,
        contextWindow: newContextWindow,
        maxOutputTokens: newMaxOutputTokens,
        defaultThinkingBudget: newDefaultThinkingBudget,
        thinkingBudgetCap: newThinkingBudgetCap,
      });
      const unsupportedParams = parseUnsupportedParamsDraft(newUnsupportedParams);
      const res = await fetch("/api/provider-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerId,
          modelId: newModelId.trim(),
          modelName: newModelName.trim() || undefined,
          apiFormat: newApiFormat,
          supportedEndpoints: newEndpoints,
          ...(newTargetFormat ? { targetFormat: newTargetFormat } : {}),
          ...(unsupportedParams.length > 0 ? { unsupportedParams } : {}),
          ...(Object.keys(capabilities).length > 0 ? { capabilities } : {}),
        }),
      });
      if (res.ok) {
        setNewModelId("");
        setNewModelName("");
        setNewApiFormat("chat-completions");
        setNewEndpoints(["chat"]);
        setNewTargetFormat("");
        setNewUnsupportedParams("");
        setNewSupportsVision("unknown");
        setNewSupportsTools("unknown");
        setNewSupportsThinking("unknown");
        setNewSupportsXHigh("unknown");
        setNewSupportsMax("unknown");
        setNewContextWindow("");
        setNewMaxOutputTokens("");
        setNewDefaultThinkingBudget("");
        setNewThinkingBudgetCap("");
        await fetchCustomModels();
        onModelsChanged?.();
      }
    } catch (e) {
      console.error("Failed to add custom model:", e);
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (modelId: string) => {
    try {
      await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerId)}&model=${encodeURIComponent(modelId)}`,
        {
          method: "DELETE",
        }
      );
      await fetchCustomModels();
      onModelsChanged?.();
    } catch (e) {
      console.error("Failed to remove custom model:", e);
    }
  };

  const handleToggleHidden = async (modelId: string, hidden: boolean) => {
    setTogglingModelId(modelId);
    try {
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerId)}&modelId=${encodeURIComponent(modelId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isHidden: hidden }),
        }
      );
      if (res.ok) {
        await fetchCustomModels();
        onModelsChanged?.();
      }
    } catch (e) {
      console.error("Failed to toggle model visibility:", e);
    } finally {
      setTogglingModelId(null);
    }
  };

  const beginEdit = (model: CompatModelRow) => {
    setEditingModelId(model.id ?? null);
    setEditingApiFormat(model.apiFormat || "chat-completions");
    setEditingEndpoints(
      Array.isArray(model.supportedEndpoints) && model.supportedEndpoints.length
        ? model.supportedEndpoints
        : ["chat"]
    );
    setEditingTargetFormat(model.compat?.targetFormat || model.targetFormat || "");
  };

  const cancelEdit = () => {
    setEditingModelId(null);
    setEditingApiFormat("chat-completions");
    setEditingEndpoints(["chat"]);
    setEditingTargetFormat("");
    setSavingModelId(null);
  };

  const saveCustomCompat = async (
    modelId: string,
    patch: {
      compatByProtocol?: CompatByProtocolMap;
      capabilities?: Record<string, unknown>;
      targetFormat?: string | null;
      unsupportedParams?: string[] | null;
    }
  ) => {
    setSavingModelId(modelId);
    try {
      const res = await fetch("/api/provider-models", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerId, modelId, ...patch }),
      });
      if (!res.ok) {
        const detail = await formatProviderModelsErrorResponse(res);
        notify.error(
          detail ? `${t("failedSaveCustomModel")} — ${detail}` : t("failedSaveCustomModel")
        );
        return;
      }
    } catch {
      notify.error(t("failedSaveCustomModel"));
      return;
    } finally {
      setSavingModelId(null);
    }
    try {
      await fetchCustomModels();
      onModelsChanged?.();
    } catch {
      /* refresh failure is non-critical — data was already saved */
    }
  };

  const saveEdit = async (modelId: string) => {
    if (!editingModelId || editingModelId !== modelId) return;
    const endpointSettingsError = providerText(
      t,
      "failedSaveModelEndpointSettings",
      "Failed to save model endpoint settings"
    );
    if (!editingEndpoints.length) {
      notify.error(
        providerText(
          t,
          "selectAtLeastOneSupportedEndpoint",
          "Select at least one supported endpoint"
        )
      );
      return;
    }

    setSavingModelId(modelId);
    try {
      const model = customModels.find((m) => m.id === modelId);
      const res = await fetch("/api/provider-models", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerId,
          modelId,
          modelName: model?.name || modelId,
          source: model?.source || "manual",
          apiFormat: editingApiFormat,
          supportedEndpoints: editingEndpoints,
          targetFormat: editingTargetFormat || null,
        }),
      });

      if (!res.ok) {
        const detail = await formatProviderModelsErrorResponse(res);
        throw new Error(detail || endpointSettingsError);
      }

      await fetchCustomModels();
      onModelsChanged?.();
      notify.success(
        providerText(t, "savedModelEndpointSettings", "Saved model endpoint settings")
      );
      cancelEdit();
    } catch (e) {
      console.error("Failed to save custom model:", e);
      notify.error(e instanceof Error && e.message ? e.message : endpointSettingsError);
    } finally {
      setSavingModelId(null);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-primary">tune</span>
        {t("customModels")}
      </h3>
      <p className="text-xs text-text-muted mb-3">{t("customModelsHint")}</p>

      <AddCustomModelForm
        adding={adding}
        newModelId={newModelId}
        newModelName={newModelName}
        newApiFormat={newApiFormat}
        newTargetFormat={newTargetFormat}
        newEndpoints={newEndpoints}
        newUnsupportedParams={newUnsupportedParams}
        newSupportsVision={newSupportsVision}
        newSupportsTools={newSupportsTools}
        newSupportsThinking={newSupportsThinking}
        newSupportsXHigh={newSupportsXHigh}
        newSupportsMax={newSupportsMax}
        newContextWindow={newContextWindow}
        newMaxOutputTokens={newMaxOutputTokens}
        newDefaultThinkingBudget={newDefaultThinkingBudget}
        newThinkingBudgetCap={newThinkingBudgetCap}
        capabilityChoiceLabels={capabilityChoiceLabels}
        onAdd={handleAdd}
        setNewModelId={setNewModelId}
        setNewModelName={setNewModelName}
        setNewApiFormat={setNewApiFormat}
        setNewTargetFormat={setNewTargetFormat}
        setNewEndpoints={setNewEndpoints}
        setNewUnsupportedParams={setNewUnsupportedParams}
        setNewSupportsVision={setNewSupportsVision}
        setNewSupportsTools={setNewSupportsTools}
        setNewSupportsThinking={setNewSupportsThinking}
        setNewSupportsXHigh={setNewSupportsXHigh}
        setNewSupportsMax={setNewSupportsMax}
        setNewContextWindow={setNewContextWindow}
        setNewMaxOutputTokens={setNewMaxOutputTokens}
        setNewDefaultThinkingBudget={setNewDefaultThinkingBudget}
        setNewThinkingBudgetCap={setNewThinkingBudgetCap}
      />

      {loading ? (
        <p className="text-xs text-text-muted">{t("loading")}</p>
      ) : customModels.length > 0 ? (
        <div className="flex flex-col gap-2">
          {customModels.map((model) => {
            const fullModel = `${providerAlias}/${model.id}`;
            const copyKey = `custom-${model.id}`;
            return (
              <div
                key={model.id}
                className="flex flex-col gap-3 rounded-lg border border-border p-3 hover:bg-sidebar/50 sm:flex-row sm:items-center"
              >
                {editingModelId !== model.id && (
                  <span className="material-symbols-outlined text-base text-primary shrink-0">
                    tune
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{model.name || model.id}</p>
                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                    <code
                      className="min-w-0 max-w-full truncate rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted"
                      title={fullModel}
                    >
                      {fullModel}
                    </code>
                    <button
                      onClick={() => onCopy(fullModel, copyKey)}
                      className="p-0.5 hover:bg-sidebar rounded text-text-muted hover:text-primary"
                      title={t("copyModel")}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copied === copyKey ? "check" : "content_copy"}
                      </span>
                    </button>
                    {model.apiFormat === "responses" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-medium">
                        {t("responses")}
                      </span>
                    )}
                    {(model.compat?.targetFormat || model.targetFormat) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium"
                        title={providerText(
                          t,
                          "targetFormatHint",
                          "Override the upstream wire format"
                        )}
                      >
                        {`→ ${targetFormatLabel(model.compat?.targetFormat || model.targetFormat || "", t)}`}
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("embeddings") && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-medium">
                        {`📐 ${t("supportedEndpointEmbeddings")}`}
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("images") && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-medium">
                        {`🖼️ ${t("imagesShortLabel")}`}
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("audio") && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium">
                        {`🔊 ${t("audioShortLabel")}`}
                      </span>
                    )}
                    {anyNormalizeCompatBadge(model.id!, customMap, overrideMap) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-500/15 text-slate-400 font-medium"
                        title={t("normalizeToolCallIdLabel")}
                      >
                        ID×9
                      </span>
                    )}
                    {anyNoPreserveCompatBadge(model.id!, customMap, overrideMap) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-medium"
                        title={t("compatDoNotPreserveDeveloper")}
                      >
                        {t("compatBadgeNoPreserve")}
                      </span>
                    )}
                    {anyUpstreamHeadersBadge(model.id!, customMap, overrideMap) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 font-medium"
                        title={t("compatUpstreamHeadersLabel")}
                      >
                        {t("compatBadgeUpstreamHeaders")}
                      </span>
                    )}
                  </div>

                  {editingModelId === model.id && (
                    <div className="mt-3 min-w-0 max-w-full rounded-lg border border-border bg-muted p-3 dark:bg-zinc-900">
                      <div className="flex min-w-0 flex-wrap items-end gap-x-3 gap-y-2">
                        <div className="w-[11rem] shrink-0 min-w-0">
                          <label className="text-xs text-text-muted mb-1 block">
                            {providerText(t, "apiFormatLabel", "API format")}
                          </label>
                          <select
                            value={editingApiFormat}
                            onChange={(e) => setEditingApiFormat(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs border border-border rounded-lg bg-background text-text-main focus:outline-none focus:border-primary"
                          >
                            <option value="chat-completions">{t("chatCompletions")}</option>
                            <option value="responses">{t("responsesApi")}</option>
                            <option value="embeddings">{t("embeddings")}</option>
                            <option value="rerank">
                              {providerText(t, "apiFormatRerank", "Rerank")}
                            </option>
                            <option value="audio-transcriptions">{t("audioTranscriptions")}</option>
                            <option value="audio-speech">{t("audioSpeech")}</option>
                            <option value="images-generations">{t("imagesGenerations")}</option>
                          </select>
                        </div>
                        <div className="w-[11rem] shrink-0 min-w-0">
                          <label className="text-xs text-text-muted mb-1 block">
                            {providerText(t, "targetFormatLabel", "Target format")}
                          </label>
                          <select
                            value={editingTargetFormat}
                            onChange={(e) => setEditingTargetFormat(e.target.value)}
                            title={providerText(
                              t,
                              "targetFormatHint",
                              "Override the upstream wire format"
                            )}
                            className="w-full px-2.5 py-2 text-xs border border-border rounded-lg bg-background text-text-main focus:outline-none focus:border-primary"
                          >
                            <option value="">
                              {providerText(t, "targetFormatUnset", "No override")}
                            </option>
                            <option value="openai">
                              {providerText(t, "compatProtocolOpenAI", "OpenAI")}
                            </option>
                            <option value="openai-responses">
                              {providerText(t, "compatProtocolOpenAIResponses", "OpenAI Responses")}
                            </option>
                            <option value="claude">
                              {providerText(t, "compatProtocolClaude", "Claude")}
                            </option>
                            <option value="gemini">
                              {providerText(t, "targetFormatGemini", "Gemini")}
                            </option>
                            <option value="antigravity">
                              {providerText(t, "targetFormatAntigravity", "Antigravity")}
                            </option>
                          </select>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 overflow-x-auto overflow-y-visible [scrollbar-width:thin]">
                          <span className="text-xs text-text-muted shrink-0">
                            {t("supportedEndpointsLabel")}
                          </span>
                          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 min-w-0">
                            {["chat", "embeddings", "rerank", "images", "audio"].map((ep) => (
                              <label
                                key={ep}
                                className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer whitespace-nowrap"
                              >
                                <input
                                  type="checkbox"
                                  checked={editingEndpoints.includes(ep)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setEditingEndpoints((prev) =>
                                        prev.includes(ep) ? prev : [...prev, ep]
                                      );
                                    } else {
                                      setEditingEndpoints((prev) => prev.filter((x) => x !== ep));
                                    }
                                  }}
                                  className="rounded border-border"
                                />
                                {ep === "chat"
                                  ? `💬 ${t("supportedEndpointChat")}`
                                  : ep === "embeddings"
                                    ? `📐 ${t("supportedEndpointEmbeddings")}`
                                    : ep === "rerank"
                                      ? providerText(t, "supportedEndpointRerank", "Rerank")
                                      : ep === "images"
                                        ? `🖼️ ${t("supportedEndpointImages")}`
                                        : `🔊 ${t("supportedEndpointAudio")}`}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center gap-2 pb-0.5">
                          <Button
                            size="sm"
                            onClick={() => saveEdit(model.id!)}
                            disabled={savingModelId === model.id}
                          >
                            {savingModelId === model.id ? t("saving") : t("save")}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={cancelEdit}>
                            {t("cancel")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1 self-end sm:self-auto">
                  {(() => {
                    const override = model.id ? overrideMap.get(model.id) : undefined;
                    const effectiveConfig = mergeModelConfigRow(model, override);
                    return (
                      <>
                        <button
                          onClick={() => beginEdit(model)}
                          className="rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary"
                          title={t("edit")}
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <ModelCompatPopover
                          t={t}
                          effectiveModelNormalize={(p) =>
                            effectiveNormalizeForProtocol(model.id!, p, customMap, overrideMap)
                          }
                          effectiveModelPreserveDeveloper={(p) =>
                            effectivePreserveForProtocol(model.id!, p, customMap, overrideMap)
                          }
                          getUpstreamHeadersRecord={(p) =>
                            effectiveUpstreamHeadersForProtocol(
                              model.id!,
                              p,
                              customMap,
                              overrideMap
                            )
                          }
                          capabilities={effectiveModelCapabilitiesFromRows(
                            providerId,
                            model.id!,
                            model,
                            override
                          )}
                          configuredCapabilities={modelCapabilitiesFromRow(effectiveConfig)}
                          targetFormat={
                            effectiveConfig.compat?.targetFormat ??
                            effectiveConfig.targetFormat ??
                            null
                          }
                          configuredTargetFormat={
                            effectiveConfig.compat?.targetFormat ??
                            effectiveConfig.targetFormat ??
                            null
                          }
                          unsupportedParams={
                            effectiveConfig.compat?.unsupportedParams ||
                            effectiveConfig.unsupportedParams ||
                            []
                          }
                          configuredUnsupportedParams={
                            effectiveConfig.compat?.unsupportedParams ||
                            effectiveConfig.unsupportedParams ||
                            []
                          }
                          onCapabilitiesPatch={(payload) =>
                            saveCustomCompat(model.id!, { capabilities: payload })
                          }
                          onModelConfigPatch={(payload) => saveCustomCompat(model.id!, payload)}
                          onReset={
                            onResetModelConfig
                              ? async () => {
                                  setSavingModelId(model.id!);
                                  try {
                                    await onResetModelConfig(model.id!);
                                    await fetchCustomModels();
                                    onModelsChanged?.();
                                  } finally {
                                    setSavingModelId(null);
                                  }
                                }
                              : undefined
                          }
                          hasModelConfigOverride={hasModelConfigOverride(model, override)}
                          onCompatPatch={(protocol, payload) =>
                            saveCustomCompat(model.id!, {
                              compatByProtocol: { [protocol]: payload },
                            })
                          }
                          showDeveloperToggle
                          disabled={savingModelId === model.id}
                        />
                      </>
                    );
                  })()}
                  <button
                    onClick={() => handleToggleHidden(model.id!, !model.isHidden)}
                    disabled={togglingModelId === model.id}
                    className="rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-50"
                    title={model.isHidden ? t("unhideModel") : t("hideModel")}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {model.isHidden ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                  <button
                    onClick={() => handleRemove(model.id!)}
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                    title={t("removeCustomModel")}
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-text-muted">{t("noCustomModels")}</p>
      )}
    </div>
  );
}
