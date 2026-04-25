"use client";

import { useMemo, useState, useCallback } from "react";
import { Card, Button } from "@/shared/components";
import { useTranslations } from "next-intl";
import { copyToClipboard } from "@/shared/utils/clipboard";
import {
  buildCustomCliEnvScript,
  buildCustomCliJsonConfig,
  normalizeOpenAiBaseUrl,
} from "./customCliConfig";

interface ModelOption {
  value: string;
  label: string;
}

interface CustomCliMappingRow {
  id: string;
  alias: string;
  model: string;
}

export default function CustomCliCard({
  tool,
  isExpanded,
  onToggle,
  baseUrl,
  apiKeys,
  availableModels = [],
  cloudEnabled = false,
  hasActiveProviders = false,
}) {
  const t = useTranslations("cliTools");
  const translateOrFallback = useCallback(
    (key: string, fallback: string, values?: Record<string, unknown>) => {
      try {
        const translated = t(key, values);
        return translated === key || translated === `cliTools.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [cliName, setCliName] = useState("Custom CLI");
  const [defaultModel, setDefaultModel] = useState("");
  const [selectedApiKeyId, setSelectedApiKeyId] = useState(() =>
    apiKeys?.length > 0 ? apiKeys[0].id : ""
  );
  const [aliasMappings, setAliasMappings] = useState<CustomCliMappingRow[]>([]);
  const effectiveSelectedApiKeyId = selectedApiKeyId || apiKeys?.[0]?.id || "";
  const effectiveDefaultModel = defaultModel || availableModels[0]?.value || "";

  const selectedKeyObj = apiKeys?.find((key) => key.id === effectiveSelectedApiKeyId);
  const keyToUse =
    selectedKeyObj?.key ||
    (!cloudEnabled
      ? "sk_omniroute"
      : translateOrFallback("yourApiKeyPlaceholder", "sk-your-omniroute-key"));
  const baseUrlWithV1 = normalizeOpenAiBaseUrl(baseUrl || "http://localhost:20128");
  const chatCompletionsEndpoint = `${baseUrlWithV1}/chat/completions`;

  const envScript = useMemo(
    () =>
      buildCustomCliEnvScript({
        cliName,
        baseUrl: baseUrlWithV1,
        apiKey: keyToUse,
        defaultModel: effectiveDefaultModel,
        aliasMappings,
      }),
    [aliasMappings, baseUrlWithV1, cliName, effectiveDefaultModel, keyToUse]
  );

  const jsonConfig = useMemo(
    () =>
      buildCustomCliJsonConfig({
        cliName,
        baseUrl: baseUrlWithV1,
        apiKey: keyToUse,
        defaultModel: effectiveDefaultModel,
        aliasMappings,
      }),
    [aliasMappings, baseUrlWithV1, cliName, effectiveDefaultModel, keyToUse]
  );

  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddMapping = () => {
    setAliasMappings((prev) => [
      ...prev,
      {
        id: `mapping_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        alias: "",
        model: effectiveDefaultModel,
      },
    ]);
  };

  const handleUpdateMapping = (id: string, field: "alias" | "model", value: string) => {
    setAliasMappings((prev) =>
      prev.map((mapping) => (mapping.id === id ? { ...mapping, [field]: value } : mapping))
    );
  };

  const handleRemoveMapping = (id: string) => {
    setAliasMappings((prev) => prev.filter((mapping) => mapping.id !== id));
  };

  const codeBlockClass =
    "rounded-lg border border-border bg-bg-secondary/70 p-4 text-xs font-mono whitespace-pre-wrap break-all";

  return (
    <Card padding="sm" className="overflow-hidden">
      <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <span className="material-symbols-outlined text-xl">{tool.icon || "terminal"}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{tool.name}</h3>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {translateOrFallback("custom", "Custom")}
              </span>
            </div>
            <p className="text-xs text-text-muted truncate">{tool.description}</p>
          </div>
        </div>
        <span
          className={`material-symbols-outlined text-text-muted text-[20px] transition-transform ${isExpanded ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border space-y-5">
          <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <span className="material-symbols-outlined text-emerald-500 text-lg">
              tips_and_updates
            </span>
            <div className="text-sm text-emerald-700 dark:text-emerald-300">
              <p className="font-medium">
                {translateOrFallback("customCliBuilderTitle", "OpenAI-compatible CLI builder")}
              </p>
              <p className="mt-1 text-xs opacity-90">
                {translateOrFallback(
                  "customCliBuilderDescription",
                  "Generate env vars and JSON snippets for any CLI or SDK that accepts an OpenAI-compatible base URL, API key, and model ID."
                )}
              </p>
            </div>
          </div>

          {!hasActiveProviders && (
            <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <span className="material-symbols-outlined text-yellow-500 text-lg">warning</span>
              <div>
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  {translateOrFallback("noActiveProviders", "No active providers")}
                </p>
                <p className="text-xs text-yellow-700/80 dark:text-yellow-300/80">
                  {translateOrFallback(
                    "customCliNoModels",
                    "Connect at least one provider to populate the model selectors."
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {translateOrFallback("customCliNameLabel", "CLI name")}
                </label>
                <input
                  type="text"
                  value={cliName}
                  onChange={(e) => setCliName(e.target.value)}
                  placeholder={translateOrFallback("customCliNamePlaceholder", "e.g. My Team CLI")}
                  className="w-full px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {translateOrFallback("customCliDefaultModelLabel", "Default model")}
                </label>
                <select
                  value={effectiveDefaultModel}
                  onChange={(e) => setDefaultModel(e.target.value)}
                  disabled={!hasActiveProviders}
                  className="w-full px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-60"
                >
                  <option value="">
                    {translateOrFallback("modelPlaceholder", "Select a model")}
                  </option>
                  {(availableModels as ModelOption[]).map((model) => (
                    <option key={model.value} value={model.value}>
                      {model.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-text-muted">
                  {translateOrFallback(
                    "customCliDefaultModelHelp",
                    "Use any OmniRoute model ID or combo. Most OpenAI-compatible CLIs only need the /v1 base URL plus a model string."
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {translateOrFallback("apiKey", "API Key")}
                </label>
                {apiKeys && apiKeys.length > 0 ? (
                  <select
                    value={effectiveSelectedApiKeyId}
                    onChange={(e) => setSelectedApiKeyId(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                  >
                    {apiKeys.map((key) => (
                      <option key={key.id} value={key.id}>
                        {key.key}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="px-3 py-2 rounded-lg border border-border bg-bg-secondary text-sm text-text-muted">
                    {keyToUse}
                  </div>
                )}
                <p className="mt-2 text-xs text-text-muted">
                  {translateOrFallback(
                    "customCliKeyHelper",
                    "For local installs OmniRoute can use sk_omniroute. In cloud mode, pick one of your management API keys."
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-medium">
                    {translateOrFallback("customCliAliasMappingsLabel", "Alias mappings")}
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    {translateOrFallback(
                      "customCliAliasMappingsHelp",
                      "Optional helper aliases for wrapper scripts or config files that want stable shorthand names."
                    )}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleAddMapping}>
                  <span className="material-symbols-outlined text-[14px] mr-1">add</span>
                  {translateOrFallback("customCliAddAlias", "Add alias")}
                </Button>
              </div>

              {aliasMappings.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-4 text-xs text-text-muted">
                  {translateOrFallback(
                    "customCliNoMappings",
                    "No alias mappings yet. Add one if your wrapper or team scripts use stable short names."
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {aliasMappings.map((mapping) => (
                    <div
                      key={mapping.id}
                      className="grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)_auto] gap-2"
                    >
                      <input
                        type="text"
                        value={mapping.alias}
                        onChange={(e) => handleUpdateMapping(mapping.id, "alias", e.target.value)}
                        placeholder={translateOrFallback(
                          "customCliAliasPlaceholder",
                          "e.g. review"
                        )}
                        className="px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                      <select
                        value={mapping.model}
                        onChange={(e) => handleUpdateMapping(mapping.id, "model", e.target.value)}
                        disabled={!hasActiveProviders}
                        className="px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-60"
                      >
                        <option value="">
                          {translateOrFallback("customCliTargetModelLabel", "Target model")}
                        </option>
                        {(availableModels as ModelOption[]).map((model) => (
                          <option key={model.value} value={model.value}>
                            {model.label}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMapping(mapping.id)}
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-border/60 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-xs text-text-muted">
            <p className="font-medium text-text-main">
              {translateOrFallback("customCliEndpointHintLabel", "How to wire the endpoint")}
            </p>
            <p className="mt-1">
              {translateOrFallback(
                "customCliEndpointHint",
                "Point any OpenAI-compatible client to the OmniRoute /v1 base URL. The raw chat completions endpoint is {endpoint}. Use the JSON block when the tool wants a provider object, or the env script when it reads OPENAI_* variables.",
                { endpoint: chatCompletionsEndpoint }
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-medium">
                  {translateOrFallback("customCliEnvBlockTitle", "Env / shell snippet")}
                </h4>
                <Button variant="outline" size="sm" onClick={() => handleCopy(envScript, "env")}>
                  <span className="material-symbols-outlined text-[14px] mr-1">
                    {copiedField === "env" ? "check" : "content_copy"}
                  </span>
                  {translateOrFallback("copy", "Copy")}
                </Button>
              </div>
              <pre className={codeBlockClass}>{envScript}</pre>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-medium">
                  {translateOrFallback("customCliJsonBlockTitle", "Provider JSON block")}
                </h4>
                <Button variant="outline" size="sm" onClick={() => handleCopy(jsonConfig, "json")}>
                  <span className="material-symbols-outlined text-[14px] mr-1">
                    {copiedField === "json" ? "check" : "content_copy"}
                  </span>
                  {translateOrFallback("copy", "Copy")}
                </Button>
              </div>
              <pre className={codeBlockClass}>{jsonConfig}</pre>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
