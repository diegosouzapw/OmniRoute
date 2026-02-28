"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@/shared/components";
import Image from "next/image";
import { useTranslations } from "next-intl";

/**
 * GitHub Copilot Configuration Generator
 *
 * Generates the chatLanguageModels.json block for VS Code GitHub Copilot
 * using the Azure vendor pattern as required by Copilot's architecture.
 *
 * Feature request: https://github.com/diegosouzapw/OmniRoute/issues/142
 */
export default function CopilotToolCard({
  tool,
  isExpanded,
  onToggle,
  baseUrl,
  apiKeys,
  activeProviders = [],
  hasActiveProviders = false,
  cloudEnabled = false,
  batchStatus,
}) {
  const t = useTranslations("cliTools");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set<string>();
    try {
      const saved = localStorage.getItem("omniroute-copilot-selected-models");
      return saved ? new Set<string>(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });
  const [selectedApiKey, setSelectedApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("omniroute-cli-key-copilot");
      if (savedKey && apiKeys?.some((k: any) => k.key === savedKey)) return savedKey;
    }
    return apiKeys?.length > 0 ? apiKeys[0].key : "";
  });
  const [maxInputTokens, setMaxInputTokens] = useState(128000);
  const [maxOutputTokens, setMaxOutputTokens] = useState(16000);
  const [toolCalling, setToolCalling] = useState(true);
  const [vision, setVision] = useState(false);
  const [allModels, setAllModels] = useState<Array<{ value: string; label: string }>>([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // Fetch ALL models dynamically from /v1/models (includes combos, custom, aliased)
  // Per @alpgul feedback: /api/models/alias doesn't include combo definitions
  useEffect(() => {
    if (!isExpanded || modelsLoaded) return;
    let cancelled = false;
    fetch("/v1/models")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const modelList = (data.data || [])
          .filter((m: any) => m && !m.type && !m.parent && m.id) // Only chat models with valid IDs
          .map((m: any) => ({
            value: m.id,
            label: m.id,
          }));
        setAllModels(modelList);
        setModelsLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setModelsLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isExpanded, modelsLoaded]);

  // Filter models by search
  const availableModels = searchFilter
    ? allModels.filter((m) => m.label.toLowerCase().includes(searchFilter.toLowerCase()))
    : allModels;

  // Persist selection
  useEffect(() => {
    if (selectedModels.size > 0) {
      localStorage.setItem(
        "omniroute-copilot-selected-models",
        JSON.stringify([...selectedModels])
      );
    }
  }, [selectedModels]);

  const toggleModel = (modelValue: string) => {
    setSelectedModels((prev) => {
      const next = new Set(prev);
      if (next.has(modelValue)) {
        next.delete(modelValue);
      } else {
        next.add(modelValue);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedModels(new Set(allModels.map((m) => m.value)));
  };

  const deselectAll = () => {
    setSelectedModels(new Set());
  };

  const getBaseUrlForConfig = () => {
    const url = baseUrl;
    return `${url}/v1/chat/completions`;
  };

  // Generate the Copilot chatLanguageModels.json config
  const generateConfig = () => {
    const models = [...selectedModels].map((modelId) => ({
      id: modelId,
      name: modelId,
      url: `${getBaseUrlForConfig()}#models.ai.azure.com`,
      toolCalling,
      vision,
      maxInputTokens,
      maxOutputTokens,
    }));

    const config = {
      name: "OmniRoute",
      vendor: "azure",
      apiKey: `\${input:chat.lm.secret.omniroute}`,
      models,
    };

    return JSON.stringify(config, null, 2);
  };

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleApiKeyChange = (value: string) => {
    setSelectedApiKey(value);
    if (value) localStorage.setItem("omniroute-cli-key-copilot", value);
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0">
            <Image
              src={tool.image || "/providers/copilot.png"}
              alt={tool.name}
              width={32}
              height={32}
              className="size-8 object-contain rounded-lg"
              sizes="32px"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{tool.name}</h3>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <span className="size-1.5 rounded-full bg-blue-500" />
                {t("guide")}
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

      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col gap-5">
            {/* Info box */}
            <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <span className="material-symbols-outlined text-blue-500 text-lg">info</span>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium">GitHub Copilot Config Generator</p>
                <p className="mt-1 text-xs opacity-80">
                  Generates the{" "}
                  <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">
                    chatLanguageModels.json
                  </code>{" "}
                  block for VS Code GitHub Copilot using the Azure vendor pattern. Select the models
                  you want, then copy the JSON into your config file.
                </p>
              </div>
            </div>

            {/* Version compatibility warning */}
            <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <span className="material-symbols-outlined text-yellow-500 text-lg">warning</span>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                This configuration uses the Azure vendor workaround for custom model lists. Tested
                with <strong>VS Code ≥ 1.109</strong> and{" "}
                <strong>GitHub Copilot Chat ≥ v0.37</strong>. Future extension updates may change
                this behavior.
              </p>
            </div>

            {/* Step 2: API Key (if cloud enabled) */}
            {cloudEnabled && apiKeys?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="size-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: tool.color }}
                  >
                    1
                  </div>
                  <span className="font-medium text-sm">API Key</span>
                </div>
                <select
                  value={selectedApiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                >
                  {apiKeys.map((key: any) => (
                    <option key={key.id} value={key.key}>
                      {key.key}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Step 3: Model Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="size-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: tool.color }}
                  >
                    {cloudEnabled && apiKeys?.length > 0 ? "2" : "1"}
                  </div>
                  <span className="font-medium text-sm">
                    Select Models ({selectedModels.size}/{availableModels.length})
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="px-2 py-1 text-xs bg-bg-secondary hover:bg-bg-tertiary rounded border border-border transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={deselectAll}
                    className="px-2 py-1 text-xs bg-bg-secondary hover:bg-bg-tertiary rounded border border-border transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Search filter */}
              <div className="mb-2">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter models..."
                  className="w-full px-3 py-1.5 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>

              {!modelsLoaded && allModels.length === 0 ? (
                <div className="flex items-center gap-2 p-3 text-text-muted text-sm">
                  <span className="material-symbols-outlined animate-spin text-base">
                    progress_activity
                  </span>
                  <span>Loading models...</span>
                </div>
              ) : availableModels.length === 0 && allModels.length === 0 ? (
                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <span className="material-symbols-outlined text-yellow-500 text-lg">warning</span>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    {t("noActiveProviders")}
                  </p>
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto rounded-lg border border-border bg-bg-secondary">
                  {availableModels.map((model) => (
                    <label
                      key={model.value}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-bg-tertiary cursor-pointer border-b border-border last:border-0 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedModels.has(model.value)}
                        onChange={() => toggleModel(model.value)}
                        className="rounded border-border text-primary accent-[#1F6FEB]"
                      />
                      <span className="text-sm font-mono truncate">{model.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Step 4: Advanced options (collapsible) */}
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer text-sm text-text-muted hover:text-text-main transition-colors">
                <span className="material-symbols-outlined text-base group-open:rotate-90 transition-transform">
                  chevron_right
                </span>
                Advanced Options
              </summary>
              <div className="mt-3 grid grid-cols-2 gap-3 pl-6">
                <div>
                  <label className="text-xs text-text-muted block mb-1">Max Input Tokens</label>
                  <input
                    type="number"
                    value={maxInputTokens}
                    onChange={(e) => setMaxInputTokens(Number(e.target.value) || 128000)}
                    className="w-full px-3 py-1.5 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted block mb-1">Max Output Tokens</label>
                  <input
                    type="number"
                    value={maxOutputTokens}
                    onChange={(e) => setMaxOutputTokens(Number(e.target.value) || 16000)}
                    className="w-full px-3 py-1.5 bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={toolCalling}
                    onChange={(e) => setToolCalling(e.target.checked)}
                    className="rounded border-border accent-[#1F6FEB]"
                  />
                  <span className="text-sm">Tool Calling</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vision}
                    onChange={(e) => setVision(e.target.checked)}
                    className="rounded border-border accent-[#1F6FEB]"
                  />
                  <span className="text-sm">Vision</span>
                </label>
              </div>
            </details>

            {/* Step 5: Generated config */}
            {selectedModels.size > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                      style={{ backgroundColor: tool.color }}
                    >
                      {cloudEnabled && apiKeys?.length > 0 ? "3" : "2"}
                    </div>
                    <span className="font-medium text-sm">
                      Copy Config ({selectedModels.size} model{selectedModels.size !== 1 ? "s" : ""}
                      )
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCopy(generateConfig(), "config")}
                  >
                    <span className="material-symbols-outlined text-[14px] mr-1">
                      {copiedField === "config" ? "check" : "content_copy"}
                    </span>
                    {copiedField === "config" ? t("copied") : t("copyConfig")}
                  </Button>
                </div>
                <pre className="p-4 bg-bg-secondary rounded-lg border border-border overflow-x-auto max-h-80">
                  <code className="text-xs font-mono whitespace-pre text-text-main">
                    {generateConfig()}
                  </code>
                </pre>

                {/* Usage instructions */}
                <div className="mt-3 p-3 bg-bg-secondary rounded-lg border border-border">
                  <p className="text-xs text-text-muted">
                    <span className="font-medium text-text-main">Paste into: </span>
                    <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">
                      ~/.config/Code/User/chatLanguageModels.json
                    </code>
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    Then reload VS Code and set the API key in the input prompt.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
