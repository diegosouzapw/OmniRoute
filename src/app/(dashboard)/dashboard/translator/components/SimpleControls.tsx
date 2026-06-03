"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button, Select, SegmentedControl } from "@/shared/components";
import { InfoTooltip } from "@/shared/components";
import { FORMAT_OPTIONS, FORMAT_META, getExampleTemplates } from "../exampleTemplates";
import type { FormatId, TranslateMode } from "../types";

interface SimpleControlsProps {
  source: FormatId;
  target: FormatId;
  provider: string;
  inputText: string;
  mode: TranslateMode;
  onSourceChange: (source: FormatId) => void;
  onTargetChange: (target: FormatId) => void;
  onProviderChange: (provider: string) => void;
  onInputChange: (text: string) => void;
  onModeChange: (mode: TranslateMode) => void;
  onSubmit: () => void;
  onOpenAdvanced: () => void;
  isLoading?: boolean;
  providerOptions: Array<{ value: string; label: string }>;
  loading?: boolean;
}

export default function SimpleControls({
  source,
  target,
  provider,
  inputText,
  mode,
  onSourceChange,
  onTargetChange,
  onProviderChange,
  onInputChange,
  onModeChange,
  onSubmit,
  onOpenAdvanced,
  isLoading = false,
  providerOptions,
  loading = false,
}: SimpleControlsProps) {
  const t = useTranslations("translator");

  const tr = useCallback(
    (key: string, fallback: string): string => {
      try {
        const translated = t(key as Parameters<typeof t>[0]);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const examples = getExampleTemplates(t as (key: string) => string);

  // Map provider string to a FormatId when a provider is selected
  const providerToFormatId = useCallback((prov: string): FormatId => {
    const normalized = prov.toLowerCase();
    if (normalized.includes("gemini")) return "gemini";
    if (normalized.includes("claude") || normalized.includes("anthropic")) return "claude";
    if (normalized.includes("cursor")) return "cursor";
    if (normalized.includes("kiro")) return "kiro";
    if (normalized.includes("antigravity")) return "antigravity";
    // Check FORMAT_META directly
    const metaKeys = Object.keys(FORMAT_META) as FormatId[];
    const exactMatch = metaKeys.find((k) => k === normalized);
    if (exactMatch) return exactMatch;
    return "openai";
  }, []);

  const handleProviderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const prov = e.target.value;
      onProviderChange(prov);
      onTargetChange(providerToFormatId(prov));
    },
    [onProviderChange, onTargetChange, providerToFormatId]
  );

  const handleExampleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = e.target.value;
      if (selectedId === "__custom__") {
        onOpenAdvanced();
        return;
      }
      const template = examples.find((ex) => ex.id === selectedId);
      if (!template) return;
      // Load template body for the current source format
      const body =
        template.formats[source] ??
        template.formats["openai"] ??
        Object.values(template.formats)[0];
      if (body) {
        onInputChange(JSON.stringify(body, null, 2));
      }
    },
    [examples, source, onInputChange, onOpenAdvanced]
  );

  const modeOptions = [
    { value: "preview", label: tr("simpleModePreview", "Preview translation only") },
    { value: "send", label: tr("simpleModeSend", "Send and see response") },
  ];

  const exampleSelectOptions = [
    ...examples.map((ex) => ({ value: ex.id, label: ex.name })),
    { value: "__custom__", label: tr("simpleStartWithCustomOption", "Paste your request (advanced)") },
  ];

  const sourceOptions = FORMAT_OPTIONS;

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: source format + provider (destination) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-text-main">
              {tr("simpleAppUsesLabel", "My app uses")}
            </span>
            <InfoTooltip text={tr("simpleAppUsesHint", "The API format your app speaks (e.g. Anthropic SDK = claude).")} />
          </div>
          <Select
            aria-label={tr("simpleAppUsesLabel", "My app uses")}
            options={sourceOptions}
            value={source}
            onChange={(e) => onSourceChange(e.target.value as FormatId)}
          />
        </div>

        <div className="hidden items-center pt-8 sm:flex">
          <span className="material-symbols-outlined text-[20px] text-text-muted" aria-hidden="true">
            arrow_forward
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-text-main">
              {tr("simpleSendToLabel", "Send to")}
            </span>
            <InfoTooltip text={tr("simpleSendToHint", "Where to actually send the request (a provider connected in OmniRoute).")} />
          </div>
          <Select
            aria-label={tr("simpleSendToLabel", "Send to")}
            options={providerOptions.length > 0 ? providerOptions : [{ value: provider, label: provider }]}
            value={provider}
            onChange={handleProviderChange}
            disabled={loading}
          />
        </div>
      </div>

      {/* Row 2: example picker */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-main">
          {tr("simpleStartWithLabel", "Start with")}
        </span>
        <Select
          aria-label={tr("simpleStartWithLabel", "Start with")}
          options={exampleSelectOptions}
          value=""
          onChange={handleExampleChange}
          placeholder={tr("simpleStartWithExamplePlaceholder", "Select a ready-made example")}
        />
      </div>

      {/* Row 3: mode segmented control */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-main">
          {tr("simpleModeLabel", "Mode")}
        </span>
        <SegmentedControl
          options={modeOptions}
          value={mode}
          onChange={(v) => onModeChange(v as TranslateMode)}
          aria-label={tr("simpleModeLabel", "Mode")}
        />
      </div>

      {/* Row 4: textarea */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-main">
          {tr("simpleInputPanelTitle", "Input")}
        </span>
        <textarea
          aria-label={tr("simpleInputPanelTitle", "Input")}
          rows={6}
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={tr("simpleInputPanelHint", "Free-text message or ready-made example")}
          className="w-full resize-y rounded-lg border border-black/10 bg-white px-3 py-2 font-mono text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-white/5"
        />
      </div>

      {/* Row 5: footer actions */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!inputText.trim() || isLoading}
          loading={isLoading}
          aria-label={tr("simpleModeSend", "Send and see response")}
        >
          {mode === "preview"
            ? tr("simpleModePreview", "Preview translation only")
            : tr("simpleModeSend", "Send and see response")}
        </Button>

        <button
          type="button"
          onClick={onOpenAdvanced}
          aria-label={tr("simpleAdvancedToggle", "Advanced")}
          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-black/5 hover:text-text-main dark:hover:bg-white/5"
        >
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">tune</span>
          {tr("simpleAdvancedToggle", "Advanced")}
        </button>
      </div>
    </div>
  );
}
