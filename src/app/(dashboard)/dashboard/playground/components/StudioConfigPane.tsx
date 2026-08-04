"use client";

// src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ParamSliders, { type PlaygroundParams } from "./ParamSliders";
import type { PlaygroundEndpoint } from "@/lib/playground/codeExport";
import { endpointToPath } from "@/lib/playground/codeExport";
import PresetPicker from "./PresetPicker";
import ImprovePromptButton from "./ImprovePromptButton";
import { useProviderOptions } from "@/app/(dashboard)/dashboard/translator/hooks/useProviderOptions";
import { useAvailableModels } from "@/app/(dashboard)/dashboard/translator/hooks/useAvailableModels";
import {
  ANTHROPIC_COMPATIBLE_PREFIX,
  CLAUDE_CODE_COMPATIBLE_PREFIX,
  OPENAI_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";
import { filterModelsByQuery, pickDefaultModel, resolveModelFilterKey } from "./modelSelection";
import ReasoningControls from "./ReasoningControls";
import { resolveReasoningControls, type ReasoningControlSpec } from "./reasoningControlUtils";

export interface ConfigState {
  endpoint: PlaygroundEndpoint;
  baseUrl: string;
  model: string;
  provider?: string;
  systemPrompt: string;
  params: PlaygroundParams;
  // #6241: resolved reasoning-control spec for the selected model (which controls to show + the
  // effort tiers). Kept here so the tabs (ChatTab) can gate `effort`/`thinking` on the request
  // body to models that actually support thinking.
  reasoning?: ReasoningControlSpec;
}

interface StudioConfigPaneProps {
  configState: ConfigState;
  setConfigState: (s: ConfigState) => void;
}

const ENDPOINT_OPTIONS: Array<{ value: PlaygroundEndpoint; labelKey: string }> = [
  { value: "chat.completions", labelKey: "chat" },
  { value: "responses", labelKey: "responses" },
  { value: "completions", labelKey: "completions" },
  { value: "embeddings", labelKey: "embeddings" },
  { value: "images", labelKey: "images" },
  { value: "audio.transcriptions", labelKey: "transcription" },
  { value: "audio.speech", labelKey: "speech" },
  { value: "video", labelKey: "video" },
  { value: "music", labelKey: "music" },
  { value: "moderations", labelKey: "moderations" },
  { value: "rerank", labelKey: "rerank" },
  { value: "search", labelKey: "search" },
  { value: "web.fetch", labelKey: "webFetch" },
];

/**
 * Right-side collapsible config pane for PlaygroundStudio.
 * Slots for F7:
 *   - SLOT_PRESETS: PresetPicker will be injected here
 *   - SLOT_IMPROVE: ImprovePromptButton will be injected here
 */
export default function StudioConfigPane({ configState, setConfigState }: StudioConfigPaneProps) {
  const t = useTranslations("common");
  const tp = useTranslations("playground");
  const [collapsed, setCollapsed] = useState(false);
  // #4086: search/filter query for the Model dropdown — flat provider catalogs (e.g.
  // 50+ OpenRouter models) made the plain <select> unusable without scrolling.
  const [modelQuery, setModelQuery] = useState("");
  const {
    provider,
    setProvider,
    providerOptions,
    loading: loadingProviders,
  } = useProviderOptions(configState.provider ?? "");
  // #3505: filter models by the selected provider's catalog namespace. Compatible providers
  // emit models under their node prefix (e.g. "myprefix/gpt-4o"), not under the connection id,
  // so use the option's modelPrefix when present; fall back to the id for built-in providers.
  const selectedProviderOption = providerOptions.find(
    (opt: { value: string; modelPrefix?: string }) => opt.value === provider
  );
  // #3731: a custom OpenAI/Anthropic-compatible connection emits catalog models under a
  // node prefix, NOT under its connection id. When the prefix doesn't resolve, filtering
  // by the raw connection id matched nothing and emptied the selector ("NONE shown").
  const isCompatibleConnectionId =
    provider.startsWith(OPENAI_COMPATIBLE_PREFIX) ||
    provider.startsWith(ANTHROPIC_COMPATIBLE_PREFIX) ||
    provider.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX);
  const modelFilterKey = resolveModelFilterKey(
    provider,
    selectedProviderOption?.modelPrefix,
    isCompatibleConnectionId
  );
  const {
    availableModels,
    modelCapabilities,
    loading: loadingModels,
  } = useAvailableModels(modelFilterKey);

  // #4086: filter the dropdown by the search query, but always keep the currently selected
  // model in the list even when it doesn't match — otherwise typing a query would silently
  // change the active selection out from under the user.
  const filteredModels = useMemo(() => {
    const filtered = filterModelsByQuery(availableModels, modelQuery);
    if (configState.model && !filtered.includes(configState.model)) {
      return [configState.model, ...filtered];
    }
    return filtered;
  }, [availableModels, modelQuery, configState.model]);

  // #6241: resolve the reasoning controls for the currently selected model from the capability
  // flags the /models catalog exposes (supportsThinking / effort_tiers).
  const reasoningSpec = resolveReasoningControls(modelCapabilities[configState.model]);

  // #3731: selecting a provider resets the model to "", and nothing picked a default —
  // so the active model stayed empty and the chat failed with "Set a model". Auto-select
  // the first available model once the list resolves (mirrors the provider-detail chat).
  useEffect(() => {
    const next = pickDefaultModel(configState.model, availableModels);
    if (next !== null) setConfigState({ ...configState, model: next });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableModels, configState.model]);

  // #6241: keep the resolved reasoning spec on configState so the tabs (ChatTab) can gate the
  // `effort`/`thinking` request fields on models that support thinking. Sync only when it changes.
  useEffect(() => {
    const current = configState.reasoning;
    const changed =
      !current ||
      current.show !== reasoningSpec.show ||
      current.effortOptions.join(",") !== reasoningSpec.effortOptions.join(",");
    if (changed) setConfigState({ ...configState, reasoning: reasoningSpec });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reasoningSpec.show, reasoningSpec.effortOptions.join(",")]);

  function update<K extends keyof ConfigState>(key: K, value: ConfigState[K]) {
    setConfigState({ ...configState, [key]: value });
  }

  if (collapsed) {
    return (
      <div className="flex flex-col items-center w-8 shrink-0">
        <button
          onClick={() => setCollapsed(false)}
          className="mt-2 p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
          title={tp("expandConfig")}
          aria-label={tp("expandConfig")}
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      className="w-72 shrink-0 border-l border-border bg-bg-alt flex flex-col overflow-y-auto"
      aria-label={tp("configPane")}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          {tp("configPane")}
        </span>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
          title={tp("collapseConfig")}
          aria-label={tp("collapseConfig")}
        >
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      <div className="flex flex-col gap-5 p-4">
        {/* PresetPicker — injected by F7 */}
        <PresetPicker configState={configState} setConfigState={setConfigState} />

        {/* Endpoint */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {tp("endpointLabel")}
          </label>
          <select
            value={configState.endpoint}
            onChange={(e) => update("endpoint", e.target.value as PlaygroundEndpoint)}
            className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
          >
            {ENDPOINT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {tp(`endpointOptions.${opt.labelKey}`)} — {endpointToPath(opt.value)}
              </option>
            ))}
          </select>
        </div>

        {/* Provider */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {tp("provider")}
          </label>
          <select
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value);
              update("provider", e.target.value);
              update("model", "");
            }}
            disabled={loadingProviders}
            className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
          >
            <option value="">{tp("autoProvider")}</option>
            {providerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {tp("model")}
          </label>
          {availableModels.length > 0 ? (
            <>
              {availableModels.length > 1 && (
                <input
                  type="text"
                  value={modelQuery}
                  onChange={(e) => setModelQuery(e.target.value)}
                  placeholder={t("search")}
                  aria-label={t("search")}
                  className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
                />
              )}
              <select
                value={configState.model}
                onChange={(e) => update("model", e.target.value)}
                disabled={loadingModels}
                className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
              >
                {filteredModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <input
              type="text"
              value={configState.model}
              onChange={(e) => update("model", e.target.value)}
              placeholder={tp("modelPlaceholder")}
              className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
            />
          )}
        </div>

        {/* System prompt */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {tp("systemPrompt")}
          </label>
          <textarea
            value={configState.systemPrompt}
            onChange={(e) => update("systemPrompt", e.target.value)}
            placeholder={tp("systemPromptPlaceholder")}
            rows={4}
            className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main resize-y"
          />
          {/* ImprovePromptButton — injected by F7 */}
          <ImprovePromptButton configState={configState} setConfigState={setConfigState} />
        </div>

        {/* Param sliders */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {tp("parametersLabel")}
          </span>
          <ParamSliders params={configState.params} setParams={(p) => update("params", p)} />
        </div>

        {/* Reasoning controls — only shown when the selected model supports thinking (#6241) */}
        <ReasoningControls
          spec={reasoningSpec}
          params={configState.params}
          setParams={(p) => update("params", p)}
        />
      </div>
    </aside>
  );
}
