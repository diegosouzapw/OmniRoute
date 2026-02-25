"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect } from "react";
import { Card, Button, Select, Badge } from "@/shared/components";
import { EXAMPLE_TEMPLATES, FORMAT_META, FORMAT_OPTIONS } from "../exampleTemplates";
import { useProviderOptions } from "../hooks/useProviderOptions";
import { useAvailableModels } from "../hooks/useAvailableModels";

/**
 * Test Bench Mode:
 * Run translation + send scenarios between providers to validate compatibility.
 *
 * How it works:
 * Predefined scenarios (Simple Chat, Tool Calling, etc.) are loaded from example templates,
 * translated from the source format to the target provider, and sent to the provider API.
 * Results show pass/fail, latency, and chunk count, with a compatibility percentage.
 */

const SCENARIOS = [
  { id: "simple-chat", name: "Simple Chat", icon: "chat", templateId: "simple-chat" },
  { id: "tool-calling", name: "Tool Calling", icon: "build", templateId: "tool-calling" },
  { id: "multi-turn", name: "Multi-turn", icon: "forum", templateId: "multi-turn" },
  { id: "thinking", name: "Thinking", icon: "psychology", templateId: "thinking" },
  { id: "system-prompt", name: "System Prompt", icon: "settings", templateId: "system-prompt" },
  { id: "streaming", name: "Streaming", icon: "stream", templateId: "streaming" },
];

export default function TestBenchMode() {
  const t = useTranslations("translator");
  const [sourceFormat, setSourceFormat] = useState("claude");
  const { provider, setProvider, providerOptions } = useProviderOptions("openai");
  const { model, setModel, availableModels, pickModelForFormat } = useAvailableModels();
  const [results, setResults] = useState({});
  const [runningAll, setRunningAll] = useState(false);

  // Pick a smart default model when source format changes or models finish loading
  useEffect(() => {
    const picked = pickModelForFormat(sourceFormat);
    if (picked) setModel(picked);
  }, [sourceFormat, pickModelForFormat, setModel]);

  const runScenario = async (scenario) => {
    setResults((prev) => ({ ...prev, [scenario.id]: { status: "running" } }));

    const start = Date.now();
    try {
      // Find template
      const template = EXAMPLE_TEMPLATES.find((t) => t.id === scenario.templateId);
      const body = template?.formats[sourceFormat] || template?.formats.openai;

      if (!body) {
        setResults((prev) => ({
          ...prev,
          [scenario.id]: { status: "error", error: "No template for this format", latency: 0 },
        }));
        return;
      }

      // Override model in template body with user-selected model
      const bodyWithModel = { ...body, model };
      // For Gemini format that uses 'contents' instead of 'messages'
      if (body.contents) bodyWithModel.model = model;

      // Step 1: Translate
      const translateRes = await fetch("/api/translator/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "direct", sourceFormat, provider, body: bodyWithModel }),
      });
      const translateData = await translateRes.json();

      if (!translateData.success) {
        setResults((prev) => ({
          ...prev,
          [scenario.id]: {
            status: "error",
            error: `Translation failed: ${translateData.error}`,
            latency: Date.now() - start,
          },
        }));
        return;
      }

      // Step 2: Send to provider
      const sendRes = await fetch("/api/translator/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, body: translateData.result }),
      });

      const latency = Date.now() - start;

      if (!sendRes.ok) {
        const errData = await sendRes.json().catch(() => ({}));
        setResults((prev) => ({
          ...prev,
          [scenario.id]: {
            status: "error",
            error: errData.error || `HTTP ${sendRes.status}`,
            latency,
            httpStatus: sendRes.status,
          },
        }));
        return;
      }

      // Read response to consume stream
      const reader = sendRes.body.getReader();
      let chunks = 0;
      while (true) {
        const { done } = await reader.read();
        if (done) break;
        chunks++;
      }

      setResults((prev) => ({
        ...prev,
        [scenario.id]: { status: "pass", latency: Date.now() - start, chunks },
      }));
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [scenario.id]: { status: "error", error: err.message, latency: Date.now() - start },
      }));
    }
  };

  const handleRunAll = async () => {
    setRunningAll(true);
    setResults({});
    for (const scenario of SCENARIOS) {
      await runScenario(scenario);
    }
    setRunningAll(false);
  };

  const passCount = Object.values(results).filter((r: any) => r.status === "pass").length;
  const failCount = Object.values(results).filter((r: any) => r.status === "error").length;
  const totalRun = passCount + failCount;
  const compatibility = totalRun > 0 ? Math.round((passCount / totalRun) * 100) : 0;
  const srcMeta = FORMAT_META[sourceFormat] || FORMAT_META.openai;

  return (
    <div className="space-y-5">
      {/* Info Banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
          info
        </span>
        <div>
          <p className="font-medium text-text-main mb-0.5">{t("compatibilityTester")}</p>
          <p>
            Run predefined scenarios (Simple Chat, Tool Calling, etc.) to verify translation and
            provider compatibility. Select a source format and target provider, then run all tests
            to see a compatibility percentage. Use this to find which features work across
            providers.
          </p>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                Source Format
              </label>
              <Select
                value={sourceFormat}
                onChange={(e) => {
                  setSourceFormat(e.target.value);
                  setResults({});
                }}
                options={FORMAT_OPTIONS.filter((o) =>
                  ["openai", "claude", "gemini", "openai-responses"].includes(o.value)
                )}
              />
            </div>
            <div className="flex items-center justify-center px-2">
              <span className="material-symbols-outlined text-[22px] text-text-muted">
                arrow_forward
              </span>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                Target Provider
              </label>
              <Select
                value={provider}
                onChange={(e) => {
                  setProvider(e.target.value);
                  setResults({});
                }}
                options={providerOptions}
              />
            </div>
            <Button
              icon="play_arrow"
              onClick={handleRunAll}
              loading={runningAll}
              disabled={runningAll}
            >
              Run All Tests
            </Button>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              Model
            </label>
            <div className="relative">
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                list="testbench-model-suggestions"
                placeholder="Select or type a model name..."
                className="w-full bg-bg-subtle border border-border rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
              />
              <datalist id="testbench-model-suggestions">
                {availableModels.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>
          </div>
        </div>
      </Card>

      {/* Results summary bar */}
      {totalRun > 0 && (
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-text-main">{t("compatibilityReport")}</h3>
                <Badge
                  variant={
                    compatibility >= 80 ? "success" : compatibility >= 50 ? "warning" : "error"
                  }
                  size="lg"
                >
                  {compatibility}%
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-green-500" /> {passCount} passed
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-red-500" /> {failCount} failed
                </span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-bg-subtle rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${compatibility}%` }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Scenario cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SCENARIOS.map((scenario) => {
          const result = results[scenario.id];
          const isRunning = result?.status === "running";

          return (
            <Card
              key={scenario.id}
              className={`transition-all ${result?.status === "pass" ? "border-green-500/30" : result?.status === "error" ? "border-red-500/30" : ""}`}
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                        result?.status === "pass"
                          ? "bg-green-500/10 text-green-500"
                          : result?.status === "error"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-bg-subtle text-text-muted"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isRunning
                          ? "progress_activity"
                          : result?.status === "pass"
                            ? "check_circle"
                            : result?.status === "error"
                              ? "error"
                              : scenario.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-main">{scenario.name}</p>
                      <p className="text-[10px] text-text-muted uppercase">
                        {srcMeta.label} →{" "}
                        {providerOptions.find((o) => o.value === provider)?.label || provider}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Result details */}
                {result && result.status !== "running" && (
                  <div
                    className={`rounded-lg p-2 text-xs ${result.status === "pass" ? "bg-green-500/5 text-green-600 dark:text-green-400" : "bg-red-500/5 text-red-600 dark:text-red-400"}`}
                  >
                    {result.status === "pass" ? (
                      <div className="flex items-center justify-between">
                        <span>✅ Passed</span>
                        <span className="text-text-muted">
                          {result.latency}ms • {result.chunks} chunks
                        </span>
                      </div>
                    ) : (
                      <div>
                        <p>❌ {result.error}</p>
                        <p className="text-text-muted mt-0.5">{result.latency}ms</p>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  size="sm"
                  variant={result?.status === "pass" ? "ghost" : "outline"}
                  icon={isRunning ? "progress_activity" : "play_arrow"}
                  onClick={() => runScenario(scenario)}
                  disabled={isRunning || runningAll}
                  className="w-full"
                >
                  {isRunning ? "Running..." : result ? "Re-run" : "Run Test"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
