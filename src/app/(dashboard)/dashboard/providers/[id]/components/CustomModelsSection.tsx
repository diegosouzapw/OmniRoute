"use client";
/**
 * CustomModelsSection — Issue #3501 Phase 1e
 *
 * Extracted from ProviderDetailPageClient.tsx. Renders the "custom models"
 * panel for ALL providers. This section is self-contained: it fetches its
 * own model state from the API and manages local loading/saving state.
 *
 * Never imports from ProviderDetailPageClient.
 */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Button, CapabilityBadge } from "@/shared/components";
import {
  normalizeModelSupportedEndpoints,
  type ModelSupportedEndpoint,
} from "@/shared/constants/modelSupportedEndpoints";
import { useNotificationStore } from "@/store/notificationStore";
import {
  buildCompatMap,
  anyNormalizeCompatBadge,
  anyNoPreserveCompatBadge,
  anyUpstreamHeadersBadge,
  effectiveNormalizeForProtocol,
  effectivePreserveForProtocol,
  effectiveUpstreamHeadersForProtocol,
  formatProviderModelsErrorResponse,
  parseContextWindowOverrideInput,
  providerText,
  targetFormatBadgeI18nKey,
  type CompatModelRow,
  type CompatByProtocolMap,
} from "../providerPageHelpers";
import ModelCompatPopover from "./ModelCompatPopover";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface CustomModelsSectionProps {
  providerId: string;
  providerAlias: string;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onModelsChanged?: () => void;
  syncedModelIds?: readonly string[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map a targetFormat value to its display label, used for the model row badge. */
function targetFormatLabel(value: string, t: (key: string) => string): string {
  const key = targetFormatBadgeI18nKey(value);
  return key ? t(key) : value;
}

const MODEL_ENDPOINT_OPTIONS: ModelSupportedEndpoint[] = [
  "chat",
  "embeddings",
  "rerank",
  "images",
  "videos",
  "audio-speech",
  "audio-transcriptions",
];

// Layout shared by the add form and the inline edit form: two columns on phones (fields
// pair up, endpoint checkboxes form a tidy grid), one flowing row from lg up.
const FORMAT_FIELDS_GRID = "grid grid-cols-2 items-end gap-3 lg:flex lg:flex-wrap lg:gap-x-4";
const ENDPOINTS_GRID =
  "grid grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:gap-y-1";
const CHECK_LABEL = "flex min-w-0 items-center gap-1.5 text-xs text-text-main cursor-pointer";

function endpointLabel(endpoint: ModelSupportedEndpoint, t: (key: string) => string): string {
  const labels: Partial<Record<ModelSupportedEndpoint, string>> = {
    chat: t("supportedEndpointChat"),
    embeddings: t("supportedEndpointEmbeddings"),
    rerank: providerText(t, "rerankEndpoint", "Rerank"),
    images: t("supportedEndpointImages"),
    videos: "Video",
    "audio-speech": t("audioSpeech"),
    "audio-transcriptions": t("audioTranscriptions"),
  };
  return labels[endpoint] || endpoint;
}

// Fetch + parse extracted from the component so errors surface as a return
// value (logged here) instead of state writes inside catch/finally blocks —
// the load callback then only sets state after the await, which lets the
// mount effect call it without a synchronous setState.
async function fetchProviderModelsPayload(providerId: string): Promise<{
  models: CompatModelRow[];
  overrides: Array<CompatModelRow & { id: string }>;
} | null> {
  try {
    const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerId)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return { models: data.models || [], overrides: data.modelCompatOverrides || [] };
  } catch (e) {
    console.error("Failed to fetch custom models:", e);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CustomModelsSection({
  providerId,
  providerAlias,
  copied,
  onCopy,
  onModelsChanged,
  syncedModelIds = [],
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
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [editingApiFormat, setEditingApiFormat] = useState("chat-completions");
  const [editingEndpoints, setEditingEndpoints] = useState<string[]>(["chat"]);
  // #2905: per-model upstream wire-format override (empty string = no override,
  // use provider default). Round-trips through the targetFormat field on the
  // custom model record.
  const [editingTargetFormat, setEditingTargetFormat] = useState("");
  const [newTargetFormat, setNewTargetFormat] = useState("");
  const [savingModelId, setSavingModelId] = useState<string | null>(null);
  const [togglingModelId, setTogglingModelId] = useState<string | null>(null);
  // #4125: manual context-window override (Feature 5004 table) — free text so the
  // field can be left blank (no override) without fighting a number input's "0".
  const [editingContextWindowOverride, setEditingContextWindowOverride] = useState("");
  // #1904: manual vision-capability override — some self-hosted/local OpenAI-compatible
  // backends don't self-report an image input modality, so the user needs a way to flag
  // the model as vision-capable by hand (read back by getCustomVisionCapabilityFields()).
  const [newSupportsVision, setNewSupportsVision] = useState(false);
  const [editingSupportsVision, setEditingSupportsVision] = useState(false);
  const [newIsFree, setNewIsFree] = useState(false);
  const [editingIsFree, setEditingIsFree] = useState(false);

  const customMap = useMemo(() => buildCompatMap(customModels), [customModels]);
  const overrideMap = useMemo(() => buildCompatMap(modelCompatOverrides), [modelCompatOverrides]);
  const syncedModelIdSet = useMemo(() => new Set(syncedModelIds), [syncedModelIds]);

  const fetchCustomModels = useCallback(async () => {
    const payload = await fetchProviderModelsPayload(providerId);
    if (payload) {
      setCustomModels(payload.models);
      setModelCompatOverrides(payload.overrides);
    }
    setLoading(false);
  }, [providerId]);

  // Initial load: the async work is defined INSIDE the effect (calling the
  // component-scope fetchCustomModels callback synchronously from an effect is
  // rejected by the compiler rules); every setState here runs after the await.
  useEffect(() => {
    const run = async () => {
      const payload = await fetchProviderModelsPayload(providerId);
      if (payload) {
        setCustomModels(payload.models);
        setModelCompatOverrides(payload.overrides);
      }
      setLoading(false);
    };
    void run();
  }, [providerId]);

  const handleAdd = async () => {
    if (!newModelId.trim() || adding) return;
    setAdding(true);
    try {
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
          ...(newSupportsVision ? { supportsVision: true } : {}),
          ...(newIsFree ? { isFree: true } : {}),
        }),
      });
      if (res.ok) {
        setNewModelId("");
        setNewModelName("");
        setNewApiFormat("chat-completions");
        setNewEndpoints(["chat"]);
        setNewTargetFormat("");
        setNewSupportsVision(false);
        setNewIsFree(false);
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

  const handleResetToUpstreamDefaults = async (modelId: string) => {
    try {
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerId)}&model=${encodeURIComponent(modelId)}&resetOverride=true`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error("Failed to reset model override");
      }
      await fetchCustomModels();
      onModelsChanged?.();
      notify.success(
        providerText(t, "resetToUpstreamDefaultsSuccess", "Restored upstream model defaults")
      );
    } catch (error) {
      console.error("Failed to reset model override:", error);
      notify.error(
        providerText(
          t,
          "resetToUpstreamDefaultsFailed",
          "Failed to restore upstream model defaults"
        )
      );
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
        ? normalizeModelSupportedEndpoints(model.supportedEndpoints)
        : ["chat"]
    );
    setEditingTargetFormat(model.targetFormat || "");
    setEditingContextWindowOverride(
      typeof model.contextWindowOverride === "number" ? String(model.contextWindowOverride) : ""
    );
    setEditingSupportsVision(model.supportsVision === true);
    setEditingIsFree(model.isFree === true);
  };

  const cancelEdit = () => {
    setEditingModelId(null);
    setEditingApiFormat("chat-completions");
    setEditingEndpoints(["chat"]);
    setEditingTargetFormat("");
    setEditingContextWindowOverride("");
    setEditingSupportsVision(false);
    setEditingIsFree(false);
    setSavingModelId(null);
  };

  const saveCustomCompat = async (
    modelId: string,
    patch: { compatByProtocol?: CompatByProtocolMap }
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

  // Split out of saveEdit (which only validates + delegates) so the #4125 context-window
  // validation stays a single early-return in the caller instead of adding a branch to
  // this already-large PUT/fetch/error-handling body.
  const performSaveEdit = async (modelId: string, contextWindowOverride: number | null) => {
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
          // #2905: send targetFormat only when set; the API treats the field
          // as optional. Sending an empty string would fail Zod's enum check,
          // so we omit it entirely when the user picks "Default (auto)".
          ...(editingTargetFormat ? { targetFormat: editingTargetFormat } : {}),
          // #4125: manual context-window override — number to set, null to clear.
          contextWindowOverride,
          supportsVision: editingSupportsVision ? true : null,
          isFree: editingIsFree ? true : null,
        }),
      });

      if (!res.ok) {
        const detail = await formatProviderModelsErrorResponse(res);
        throw new Error(
          detail ||
            providerText(
              t,
              "failedSaveModelEndpointSettings",
              "Failed to save model endpoint settings"
            )
        );
      }

      await fetchCustomModels();
      onModelsChanged?.();
      notify.success(
        providerText(t, "savedModelEndpointSettings", "Saved model endpoint settings")
      );
      cancelEdit();
    } catch (e) {
      console.error("Failed to save custom model:", e);
      notify.error(
        e instanceof Error && e.message
          ? e.message
          : providerText(
              t,
              "failedSaveModelEndpointSettings",
              "Failed to save model endpoint settings"
            )
      );
    } finally {
      setSavingModelId(null);
    }
  };

  const saveEdit = async (modelId: string) => {
    if (!editingModelId || editingModelId !== modelId) return;
    if (!editingEndpoints.length) {
      notify.error(
        providerText(t, "selectSupportedEndpoint", "Select at least one supported endpoint")
      );
      return;
    }

    const contextOverride = parseContextWindowOverrideInput(editingContextWindowOverride);
    if (contextOverride.invalid) {
      notify.error(t("contextWindowOverrideInvalid"));
      return;
    }

    await performSaveEdit(modelId, contextOverride.value);
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-primary">tune</span>
        {t("customModels")}
      </h3>
      <p className="text-xs text-text-muted mb-3">{t("customModelsHint")}</p>

      {/* Add form */}
      <div className="flex flex-col gap-3 mb-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2 sm:flex sm:flex-wrap">
          <div className="col-span-2 flex-1 basis-48 min-w-0">
            <label htmlFor="custom-model-id" className="text-xs text-text-muted mb-1 block">
              {t("modelId")}
            </label>
            <input
              id="custom-model-id"
              type="text"
              value={newModelId}
              onChange={(e) => setNewModelId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder={t("customModelPlaceholder")}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>
          <div className="min-w-0 sm:w-40">
            <label htmlFor="custom-model-name" className="text-xs text-text-muted mb-1 block">
              {t("displayName")}
            </label>
            <input
              id="custom-model-name"
              type="text"
              value={newModelName}
              onChange={(e) => setNewModelName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder={t("optional")}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>
          <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModelId.trim() || adding}>
            {adding ? t("adding") : t("add")}
          </Button>
        </div>

        {/* API Format + Supported Endpoints */}
        <div className={FORMAT_FIELDS_GRID}>
          <div className="min-w-0 lg:w-48">
            <label htmlFor="custom-api-format" className="text-xs text-text-muted mb-1 block">
              API Format
            </label>
            <select
              id="custom-api-format"
              value={newApiFormat}
              onChange={(e) => setNewApiFormat(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="chat-completions">{t("chatCompletions")}</option>
              <option value="responses">{t("responsesApi")}</option>
              <option value="embeddings">{t("embeddings")}</option>
              <option value="rerank">Rerank</option>
              <option value="audio-transcriptions">{t("audioTranscriptions")}</option>
              <option value="audio-speech">{t("audioSpeech")}</option>
              <option value="images-generations">{t("imagesGenerations")}</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="min-w-0 lg:w-48">
            <label htmlFor="custom-target-format" className="text-xs text-text-muted mb-1 block">
              {t("targetFormatLabel")}
            </label>
            <select
              id="custom-target-format"
              value={newTargetFormat}
              onChange={(e) => setNewTargetFormat(e.target.value)}
              title={t("targetFormatHint")}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="">{t("targetFormatAuto")}</option>
              <option value="openai">{t("compatProtocolOpenAI")}</option>
              <option value="openai-responses">{t("compatProtocolOpenAIResponses")}</option>
              <option value="claude">{t("compatProtocolClaude")}</option>
              <option value="gemini">{t("targetFormatGemini")}</option>
              <option value="antigravity">{t("targetFormatAntigravity")}</option>
            </select>
          </div>
          <div className="col-span-2 min-w-0 lg:flex-1">
            <span className="text-xs text-text-muted mb-1 block">
              {t("supportedEndpointsLabel")}
            </span>
            <div className={ENDPOINTS_GRID}>
              {MODEL_ENDPOINT_OPTIONS.map((ep) => (
                <label key={ep} className={CHECK_LABEL}>
                  <input
                    type="checkbox"
                    checked={newEndpoints.includes(ep)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewEndpoints((prev) => [...prev, ep]);
                      } else {
                        setNewEndpoints((prev) => prev.filter((x) => x !== ep));
                      }
                    }}
                    className="rounded border-border"
                  />
                  {endpointLabel(ep, t)}
                </label>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex flex-wrap gap-x-4 gap-y-1 lg:block">
            <span className="hidden text-xs text-text-muted mb-1 lg:block">&nbsp;</span>
            <label
              htmlFor="custom-model-supports-vision"
              className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer whitespace-nowrap"
              title={t("visionCapableHint")}
            >
              <input
                id="custom-model-supports-vision"
                type="checkbox"
                checked={newSupportsVision}
                onChange={(e) => setNewSupportsVision(e.target.checked)}
                className="rounded border-border"
              />
              {t("visionCapableLabel")}
            </label>
            <label
              htmlFor="custom-model-is-free"
              className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer whitespace-nowrap"
              title="Mark as free-tier (shown even when hide paid models is on)"
            >
              <input
                id="custom-model-is-free"
                type="checkbox"
                checked={newIsFree}
                onChange={(e) => setNewIsFree(e.target.checked)}
                className="rounded border-border"
              />
              FREE
            </label>
          </div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-xs text-text-muted">{t("loading")}</p>
      ) : customModels.length > 0 ? (
        <div className="flex flex-col gap-2">
          {customModels.map((model) => {
            const fullModel = `${providerAlias}/${model.id}`;
            const copyKey = `custom-${model.id}`;
            const hasSyncedBase = model.id ? syncedModelIdSet.has(model.id) : false;
            return (
              <div
                key={model.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-sidebar/50"
              >
                {editingModelId !== model.id && (
                  <span className="material-symbols-outlined text-base text-primary shrink-0">
                    tune
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{model.name || model.id}</p>
                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                    <code className="text-xs text-text-muted font-mono bg-sidebar px-1.5 py-0.5 rounded">
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
                    {hasSyncedBase && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                        title={providerText(
                          t,
                          "overridesUpstreamModelHint",
                          "Your settings override this upstream model"
                        )}
                      >
                        {providerText(t, "overridesUpstreamModel", "Overrides upstream")}
                      </span>
                    )}
                    {model.targetFormat && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium"
                        title={t("targetFormatHint")}
                      >
                        {`→ ${targetFormatLabel(model.targetFormat, t)}`}
                      </span>
                    )}
                    {typeof model.contextWindowOverride === "number" && (
                      <CapabilityBadge
                        icon="width_normal"
                        className="bg-orange-500/15 text-orange-400"
                        title={t("contextWindowOverrideHint")}
                      >
                        {model.contextWindowOverride.toLocaleString()}
                      </CapabilityBadge>
                    )}
                    {model.supportsVision === true && (
                      <CapabilityBadge
                        icon="visibility"
                        className="bg-pink-500/15 text-pink-400"
                        title={t("visionCapableHint")}
                      >
                        {t("visionCapableLabel")}
                      </CapabilityBadge>
                    )}
                    {model.isFree === true && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium">
                        FREE
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("embeddings") && (
                      <CapabilityBadge
                        icon="scatter_plot"
                        className="bg-purple-500/15 text-purple-400"
                      >
                        {t("supportedEndpointEmbeddings")}
                      </CapabilityBadge>
                    )}
                    {model.supportedEndpoints?.includes("images") && (
                      <CapabilityBadge icon="image" className="bg-amber-500/15 text-amber-400">
                        {t("imagesShortLabel")}
                      </CapabilityBadge>
                    )}
                    {model.supportedEndpoints?.includes("audio") && (
                      <CapabilityBadge icon="volume_up" className="bg-green-500/15 text-green-400">
                        {t("audioShortLabel")}
                      </CapabilityBadge>
                    )}
                    {(model.supportedEndpoints?.includes("videos") ||
                      model.supportedEndpoints?.includes("video")) && (
                      <CapabilityBadge icon="movie" className="bg-red-500/15 text-red-400">
                        Video
                      </CapabilityBadge>
                    )}
                    {model.supportedEndpoints?.includes("audio-speech") && (
                      <CapabilityBadge icon="volume_up" className="bg-green-500/15 text-green-400">
                        {t("audioSpeech")}
                      </CapabilityBadge>
                    )}
                    {model.supportedEndpoints?.includes("audio-transcriptions") && (
                      <CapabilityBadge icon="mic" className="bg-cyan-500/15 text-cyan-400">
                        {t("audioTranscriptions")}
                      </CapabilityBadge>
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
                      <div className={FORMAT_FIELDS_GRID}>
                        <div className="min-w-0 lg:w-[11rem] lg:shrink-0">
                          <label className="text-xs text-text-muted mb-1 block">
                            {t("apiFormatLabel")}
                          </label>
                          <select
                            value={editingApiFormat}
                            onChange={(e) => setEditingApiFormat(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs border border-border rounded-lg bg-background text-text-main focus:outline-none focus:border-primary"
                          >
                            <option value="chat-completions">{t("chatCompletions")}</option>
                            <option value="responses">{t("responsesApi")}</option>
                            <option value="embeddings">{t("embeddings")}</option>
                            <option value="rerank">Rerank</option>
                            <option value="audio-transcriptions">{t("audioTranscriptions")}</option>
                            <option value="audio-speech">{t("audioSpeech")}</option>
                            <option value="images-generations">{t("imagesGenerations")}</option>
                            <option value="video">Video</option>
                          </select>
                        </div>
                        <div className="min-w-0 lg:w-[11rem] lg:shrink-0">
                          <label className="text-xs text-text-muted mb-1 block">
                            {t("targetFormatLabel")}
                          </label>
                          <select
                            value={editingTargetFormat}
                            onChange={(e) => setEditingTargetFormat(e.target.value)}
                            title={t("targetFormatHint")}
                            className="w-full px-2.5 py-2 text-xs border border-border rounded-lg bg-background text-text-main focus:outline-none focus:border-primary"
                          >
                            <option value="">{t("targetFormatAuto")}</option>
                            <option value="openai">{t("compatProtocolOpenAI")}</option>
                            <option value="openai-responses">
                              {t("compatProtocolOpenAIResponses")}
                            </option>
                            <option value="claude">{t("compatProtocolClaude")}</option>
                            <option value="gemini">{t("targetFormatGemini")}</option>
                            <option value="antigravity">{t("targetFormatAntigravity")}</option>
                          </select>
                        </div>
                        <div className="min-w-0 lg:w-[10rem] lg:shrink-0">
                          <label className="text-xs text-text-muted mb-1 block">
                            {t("contextWindowOverrideLabel")}
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={editingContextWindowOverride}
                            onChange={(e) => setEditingContextWindowOverride(e.target.value)}
                            placeholder={t("contextWindowOverridePlaceholder")}
                            title={t("contextWindowOverrideHint")}
                            className="w-full px-2.5 py-2 text-xs border border-border rounded-lg bg-background text-text-main focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="flex min-w-0 flex-col lg:w-[9rem] lg:shrink-0">
                          <label className="hidden text-xs text-text-muted mb-1 lg:block">
                            &nbsp;
                          </label>
                          <label
                            htmlFor={`custom-model-edit-vision-${model.id}`}
                            className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer whitespace-nowrap py-1 lg:px-2.5 lg:py-2"
                            title={t("visionCapableHint")}
                          >
                            <input
                              id={`custom-model-edit-vision-${model.id}`}
                              type="checkbox"
                              checked={editingSupportsVision}
                              onChange={(e) => setEditingSupportsVision(e.target.checked)}
                              className="rounded border-border"
                            />
                            {t("visionCapableLabel")}
                          </label>
                          <label
                            htmlFor={`custom-model-edit-free-${model.id}`}
                            className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer whitespace-nowrap py-1 lg:px-2.5 lg:py-2"
                            title="Mark as free-tier"
                          >
                            <input
                              id={`custom-model-edit-free-${model.id}`}
                              type="checkbox"
                              checked={editingIsFree}
                              onChange={(e) => setEditingIsFree(e.target.checked)}
                              className="rounded border-border"
                            />
                            FREE
                          </label>
                        </div>
                        <div className="col-span-2 flex min-w-0 flex-col gap-1 lg:flex-1 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-3">
                          <span className="text-xs text-text-muted shrink-0">
                            {t("supportedEndpointsLabel")}
                          </span>
                          <div className={ENDPOINTS_GRID}>
                            {MODEL_ENDPOINT_OPTIONS.map((ep) => (
                              <label key={ep} className={CHECK_LABEL}>
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
                                {endpointLabel(ep, t)}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-2 flex flex-wrap items-center gap-2 pb-0.5 lg:shrink-0">
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
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => beginEdit(model)}
                    className="rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary"
                    title={t("edit")}
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <ModelCompatPopover
                    t={t}
                    providerId={providerId}
                    modelId={model.id!}
                    effectiveModelNormalize={(p) =>
                      effectiveNormalizeForProtocol(model.id!, p, customMap, overrideMap)
                    }
                    effectiveModelPreserveDeveloper={(p) =>
                      effectivePreserveForProtocol(model.id!, p, customMap, overrideMap)
                    }
                    getUpstreamHeadersRecord={(p) =>
                      effectiveUpstreamHeadersForProtocol(model.id!, p, customMap, overrideMap)
                    }
                    onCompatPatch={(protocol, payload) =>
                      saveCustomCompat(model.id!, {
                        compatByProtocol: { [protocol]: payload },
                      })
                    }
                    showDeveloperToggle
                    disabled={savingModelId === model.id}
                  />
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
                  {hasSyncedBase && (
                    <button
                      onClick={() => handleResetToUpstreamDefaults(model.id!)}
                      className="rounded p-1 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20"
                      title={providerText(
                        t,
                        "resetToUpstreamDefaults",
                        "Restore upstream defaults"
                      )}
                    >
                      <span className="material-symbols-outlined text-sm">restart_alt</span>
                    </button>
                  )}
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
