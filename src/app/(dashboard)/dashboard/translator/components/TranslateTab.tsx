"use client";

import { useState } from "react";
import { Card } from "@/shared/components";
import { useTranslateSession } from "../hooks/useTranslateSession";
import type { UseTranslateSessionReturn } from "../hooks/useTranslateSession";
import { useProviderOptions } from "../hooks/useProviderOptions";
import SimpleControls from "./SimpleControls";
import ResultNarrated from "./ResultNarrated";
import type { AdvancedSlug, FormatId, TranslateMode } from "../types";

interface TranslateTabProps {
  /**
   * F9 integration: tells TranslateTab to open a specific advanced accordion.
   * When null, no accordion is forced open.
   */
  forceOpenAdvancedSlug?: AdvancedSlug | null;
  /**
   * F9 integration: called when an advanced accordion slug should change
   * (open or close). F9 syncs this with the URL query string.
   */
  onAdvancedSlugChange?: (slug: AdvancedSlug | null) => void;
  /**
   * Optional session lifted from shell (TranslatorPageClient) so PipelineView
   * can read the result at the shell level. When undefined, an internal session
   * is used (isolated rendering mode, e.g. tests).
   */
  session?: UseTranslateSessionReturn;
  /**
   * Callback to sync internal inputText with the shell-level sharedInputContent (GAP-NOVO-2).
   * When provided, called every time inputText changes so CompressionPreviewAccordion
   * and pipeline Step 1 see the real input text.
   */
  onInputChange?: (text: string) => void;
}

export default function TranslateTab({
  forceOpenAdvancedSlug = null,
  onAdvancedSlugChange,
  session: sessionProp,
  onInputChange,
}: TranslateTabProps) {
  // Internal simple-mode state
  const [source, setSource] = useState<FormatId>("claude");
  const [inputText, setInputText] = useState<string>("");
  const [mode, setMode] = useState<TranslateMode>("send");

  // Unified input change handler — keeps internal state and notifies shell (GAP-NOVO-2)
  const handleInputChange = (text: string) => {
    setInputText(text);
    onInputChange?.(text);
  };

  // Provider/target state: derive from useProviderOptions
  // GAP-3: useProviderOptions lives only here; SimpleControls receives it as props
  const { provider, setProvider, providerOptions, loading } = useProviderOptions("openai");
  // target FormatId mirrors provider selection; managed via SimpleControls callback
  const [target, setTarget] = useState<FormatId>("openai");

  // Rules of Hooks: always call unconditionally; fall back to prop when provided
  const internalSession = useTranslateSession();
  const { result, run } = sessionProp ?? internalSession;

  const handleSubmit = () => {
    run({ source, target, provider, inputText, mode });
  };

  const handleOpenAdvanced = (slug: AdvancedSlug = "rawjson") => {
    if (onAdvancedSlugChange) {
      onAdvancedSlugChange(slug);
    }
    // Restore scroll-into-view after URL change (UX polish — was lost in GAP-5 cleanup)
    if (typeof document !== "undefined") {
      const advancedEl = document.getElementById("translator-advanced-section");
      if (advancedEl && typeof advancedEl.scrollIntoView === "function") {
        // Defer to next tick so React commits the open state first
        requestAnimationFrame(() => {
          advancedEl.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  };

  const handleSeeTranslatedJson = () => {
    handleOpenAdvanced("rawjson");
  };

  const handleSeePipeline = () => {
    handleOpenAdvanced("pipeline");
  };

  // Sync provider options: when providerOptions loads, keep provider in sync
  // (useProviderOptions handles this internally; we just need to expose setProvider)
  const handleProviderChange = (prov: string) => {
    setProvider(prov);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 2-column grid: SimpleControls (left) + ResultNarrated (right) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: controls */}
        <Card className="p-4">
          <SimpleControls
            source={source}
            target={target}
            provider={provider}
            inputText={inputText}
            mode={mode}
            onSourceChange={setSource}
            onTargetChange={setTarget}
            onProviderChange={handleProviderChange}
            onInputChange={handleInputChange}
            onModeChange={setMode}
            onSubmit={handleSubmit}
            onOpenAdvanced={() => handleOpenAdvanced("rawjson")}
            isLoading={result.status === "translating" || result.status === "sending"}
            providerOptions={providerOptions}
            loading={loading}
          />
        </Card>

        {/* Right: narrated result */}
        <ResultNarrated
          result={result}
          onSeeTranslatedJson={handleSeeTranslatedJson}
          onSeePipeline={handleSeePipeline}
        />
      </div>
    </div>
  );
}
