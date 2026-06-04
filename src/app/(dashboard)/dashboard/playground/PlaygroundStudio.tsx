"use client";

// src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import StudioTopBar, { type StudioTab } from "./components/StudioTopBar";
import StudioConfigPane, { type ConfigState } from "./components/StudioConfigPane";
import { DEFAULT_PARAMS } from "./components/ParamSliders";
import dynamic from "next/dynamic";
import type { StreamMetrics } from "@/shared/schemas/playground";

// Lazy-load tabs to reduce initial bundle size
const ChatTab = dynamic(() => import("./components/tabs/ChatTab"), { ssr: false });
const ApiTab = dynamic(() => import("./components/tabs/ApiTab"), { ssr: false });
const CompareTab = dynamic(() => import("./components/tabs/CompareTab"), { ssr: false });
const BuildTab = dynamic(() => import("./components/tabs/BuildTab"), { ssr: false });

const INITIAL_METRICS: StreamMetrics = {
  ttftMs: null,
  totalMs: null,
  tokensIn: 0,
  tokensOut: 0,
  tps: null,
  costUsd: null,
};

const INITIAL_CONFIG: ConfigState = {
  endpoint: "chat.completions",
  baseUrl: typeof window !== "undefined" ? window.location.origin : "http://localhost:20128",
  model: "",
  systemPrompt: "You are a helpful assistant.",
  params: DEFAULT_PARAMS,
};

function resolveTab(value: string | null): StudioTab {
  if (value === "chat" || value === "compare" || value === "api" || value === "build") {
    return value;
  }
  return "chat";
}

/**
 * PlaygroundStudio — orchestrator component for the Playground Studio.
 * - Manages active tab state (supports ?tab=chat|compare|api|build deep-link)
 * - Manages shared configState for all tabs
 * - Renders StudioTopBar + content + StudioConfigPane
 *
 * F7 SLOTS:
 * - SLOT_PRESETS: F7 will replace the comment in StudioConfigPane with PresetPicker
 * - SLOT_IMPROVE: F7 will replace the comment in StudioConfigPane with ImprovePromptButton
 */
export function PlaygroundStudio() {
  const searchParams = useSearchParams();
  // Derive active tab from URL — no effect needed, avoids setState-in-effect lint violation.
  // When URL changes (client nav), searchParams updates, component re-renders with new tab.
  const activeTab: StudioTab = resolveTab(searchParams.get("tab"));
  const [manualTab, setManualTab] = useState<StudioTab | null>(null);
  const effectiveTab = manualTab ?? activeTab;

  const [configState, setConfigState] = useState<ConfigState>(INITIAL_CONFIG);
  const [metrics, setMetrics] = useState<StreamMetrics>(INITIAL_METRICS);

  function handleTabChange(tab: StudioTab) {
    setManualTab(tab);
  }

  function handleMetricsUpdate(m: StreamMetrics) {
    setMetrics(m);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Top bar with tabs + token/cost counter + export button */}
      <StudioTopBar
        activeTab={effectiveTab}
        onTabChange={handleTabChange}
        metrics={metrics}
        exportState={{
          endpoint: configState.endpoint,
          baseUrl: configState.baseUrl,
          model: configState.model,
          systemPrompt: configState.systemPrompt,
          params: configState.params,
        }}
      />

      {/* Main content area: tab content + config pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tab content */}
        <div className="flex-1 overflow-hidden">
          {effectiveTab === "chat" && (
            <ChatTab configState={configState} onMetricsUpdate={handleMetricsUpdate} />
          )}
          {effectiveTab === "compare" && (
            <CompareTab configState={configState} />
          )}
          {effectiveTab === "api" && (
            <ApiTab configState={configState} />
          )}
          {effectiveTab === "build" && (
            <BuildTab configState={configState} />
          )}
        </div>

        {/* Config pane — always visible, collapsible */}
        {/* SLOT_PRESETS and SLOT_IMPROVE are inside StudioConfigPane */}
        <StudioConfigPane
          configState={configState}
          setConfigState={setConfigState}
        />
      </div>
    </div>
  );
}
