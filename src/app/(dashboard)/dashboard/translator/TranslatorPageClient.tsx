"use client";

import { useTranslations } from "next-intl";

import { useCallback, useState } from "react";
import { SegmentedControl } from "@/shared/components";
import PlaygroundMode from "./components/PlaygroundMode";
import ChatTesterMode from "./components/ChatTesterMode";
import TestBenchMode from "./components/TestBenchMode";
import LiveMonitorMode from "./components/LiveMonitorMode";
import StreamTransformerMode from "./components/StreamTransformerMode";

export default function TranslatorPageClient() {
  const t = useTranslations("translator");
  const translateOrFallback = useCallback(
    (key: string, fallback: string) => {
      try {
        const translated = t(key);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );
  const [mode, setMode] = useState("playground");
  const modes = [
    { value: "playground", label: translateOrFallback("playground", "Playground"), icon: "code" },
    {
      value: "chat-tester",
      label: translateOrFallback("chatTester", "Chat Tester"),
      icon: "chat",
    },
    {
      value: "test-bench",
      label: translateOrFallback("testBench", "Test Bench"),
      icon: "science",
    },
    {
      value: "stream-transformer",
      label: translateOrFallback("streamTransformer", "Stream Transformer"),
      icon: "swap_horiz",
    },
    {
      value: "live-monitor",
      label: translateOrFallback("liveMonitor", "Live Monitor"),
      icon: "monitoring",
    },
  ];
  const modeDescriptions: Record<string, string> = {
    playground: translateOrFallback(
      "modeDescriptionPlayground",
      "Inspect request translation step-by-step between API formats."
    ),
    "chat-tester": translateOrFallback(
      "modeDescriptionChatTester",
      "Send a real prompt through the selected provider and inspect every translation stage."
    ),
    "test-bench": translateOrFallback(
      "modeDescriptionTestBench",
      "Run compatibility scenarios across source formats and target providers."
    ),
    "stream-transformer": translateOrFallback(
      "modeDescriptionStreamTransformer",
      "Transform Chat Completions SSE into Responses API SSE and inspect emitted events."
    ),
    "live-monitor": translateOrFallback(
      "modeDescriptionLiveMonitor",
      "Watch translation events in real time as requests flow through OmniRoute."
    ),
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 min-w-0">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">translate</span>
            {t("playgroundTitle")}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {modeDescriptions[mode] || t("modeDescriptionFallback")}
          </p>
        </div>
        <div className="w-full sm:w-auto overflow-x-auto">
          <SegmentedControl
            options={modes}
            value={mode}
            onChange={setMode}
            size="md"
            className="min-w-max"
          />
        </div>
      </div>

      {/* Mode Content */}
      {mode === "playground" && <PlaygroundMode />}
      {mode === "chat-tester" && <ChatTesterMode />}
      {mode === "test-bench" && <TestBenchMode />}
      {mode === "stream-transformer" && <StreamTransformerMode />}
      {mode === "live-monitor" && <LiveMonitorMode />}
    </div>
  );
}
