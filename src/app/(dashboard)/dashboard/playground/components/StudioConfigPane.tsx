"use client";

// src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx

import { useState } from "react";
import ParamSliders, { type PlaygroundParams } from "./ParamSliders";
import type { PlaygroundEndpoint } from "@/lib/playground/codeExport";
import { endpointToPath } from "@/lib/playground/codeExport";
import PresetPicker from "./PresetPicker";
import ImprovePromptButton from "./ImprovePromptButton";
import { useProviderOptions } from "@/app/(dashboard)/dashboard/translator/hooks/useProviderOptions";
import { useAvailableModels } from "@/app/(dashboard)/dashboard/translator/hooks/useAvailableModels";

export interface ConfigState {
  endpoint: PlaygroundEndpoint;
  baseUrl: string;
  model: string;
  provider?: string;
  systemPrompt: string;
  params: PlaygroundParams;
}

interface StudioConfigPaneProps {
  configState: ConfigState;
  setConfigState: (s: ConfigState) => void;
}

const ENDPOINT_OPTIONS: Array<{ value: PlaygroundEndpoint; label: string }> = [
  { value: "chat.completions", label: "Chat completions" },
  { value: "responses", label: "Responses" },
  { value: "completions", label: "Completions" },
  { value: "embeddings", label: "Embeddings" },
  { value: "images", label: "Images" },
  { value: "audio.transcriptions", label: "Audio transcriptions" },
  { value: "audio.speech", label: "Audio speech" },
  { value: "video", label: "Video" },
  { value: "music", label: "Music" },
  { value: "moderations", label: "Moderations" },
  { value: "rerank", label: "Rerank" },
  { value: "search", label: "Search" },
  { value: "web.fetch", label: "Web fetch" },
];

/**
 * Right-side collapsible config pane for PlaygroundStudio.
 * Slots for F7:
 *   - SLOT_PRESETS: PresetPicker will be injected here
 *   - SLOT_IMPROVE: ImprovePromptButton will be injected here
 */
export default function StudioConfigPane({ configState, setConfigState }: StudioConfigPaneProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { provider, setProvider, providerOptions, loading: loadingProviders } = useProviderOptions(
    configState.provider ?? ""
  );
  const { availableModels, loading: loadingModels } = useAvailableModels();

  function update<K extends keyof ConfigState>(key: K, value: ConfigState[K]) {
    setConfigState({ ...configState, [key]: value });
  }

  if (collapsed) {
    return (
      <div className="flex flex-col items-center w-8 shrink-0">
        <button
          onClick={() => setCollapsed(false)}
          className="mt-2 p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
          title="Expand config pane"
          aria-label="Expand config pane"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      className="w-72 shrink-0 border-l border-border bg-bg-alt flex flex-col overflow-y-auto"
      aria-label="Config pane"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Config
        </span>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
          title="Collapse config pane"
          aria-label="Collapse config pane"
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
            Endpoint
          </label>
          <select
            value={configState.endpoint}
            onChange={(e) => update("endpoint", e.target.value as PlaygroundEndpoint)}
            className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
          >
            {ENDPOINT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} — {endpointToPath(opt.value)}
              </option>
            ))}
          </select>
        </div>

        {/* Provider */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Provider
          </label>
          <select
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value);
              update("provider", e.target.value);
            }}
            disabled={loadingProviders}
            className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
          >
            <option value="">Auto</option>
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
            Model
          </label>
          {availableModels.length > 0 ? (
            <select
              value={configState.model}
              onChange={(e) => update("model", e.target.value)}
              disabled={loadingModels}
              className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
            >
              {availableModels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={configState.model}
              onChange={(e) => update("model", e.target.value)}
              placeholder="e.g. openai/gpt-4o"
              className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
            />
          )}
        </div>

        {/* System prompt */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            System prompt
          </label>
          <textarea
            value={configState.systemPrompt}
            onChange={(e) => update("systemPrompt", e.target.value)}
            placeholder="You are a helpful assistant."
            rows={4}
            className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main resize-y"
          />
          {/* ImprovePromptButton — injected by F7 */}
          <ImprovePromptButton configState={configState} setConfigState={setConfigState} />
        </div>

        {/* Param sliders */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Parameters
          </span>
          <ParamSliders
            params={configState.params}
            setParams={(p) => update("params", p)}
          />
        </div>
      </div>
    </aside>
  );
}
