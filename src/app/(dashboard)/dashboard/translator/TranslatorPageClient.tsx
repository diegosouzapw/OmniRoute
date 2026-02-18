"use client";

import { useState } from "react";
import { SegmentedControl } from "@/shared/components";
import PlaygroundMode from "./components/PlaygroundMode";
import ChatTesterMode from "./components/ChatTesterMode";
import TestBenchMode from "./components/TestBenchMode";
import LiveMonitorMode from "./components/LiveMonitorMode";

const MODES = [
  { value: "playground", label: "Playground", icon: "code" },
  { value: "chat-tester", label: "Chat Tester", icon: "chat" },
  { value: "test-bench", label: "Test Bench", icon: "science" },
  { value: "live-monitor", label: "Live Monitor", icon: "monitoring" },
];

const MODE_DESCRIPTIONS: Record<string, string> = {
  playground:
    "Paste any API request body and see how OmniRoute translates it between provider formats (OpenAI ↔ Claude ↔ Gemini ↔ Responses API)",
  "chat-tester":
    "Send real chat requests through OmniRoute and see the full round-trip: your input, the translated request, the provider response, and the translated output",
  "test-bench":
    "Define multiple test cases with different inputs and expected outputs, run them all at once, and compare results across providers and models",
  "live-monitor":
    "Watch incoming requests in real-time as they flow through OmniRoute — see format translations happening live and identify issues instantly",
};

export default function TranslatorPageClient() {
  const [mode, setMode] = useState("playground");

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">translate</span>
            Translator Playground
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {MODE_DESCRIPTIONS[mode] ||
              "Debug, test, and visualize how OmniRoute translates API requests between providers"}
          </p>
        </div>
        <SegmentedControl options={MODES} value={mode} onChange={setMode} size="md" />
      </div>

      {/* Mode Content */}
      {mode === "playground" && <PlaygroundMode />}
      {mode === "chat-tester" && <ChatTesterMode />}
      {mode === "test-bench" && <TestBenchMode />}
      {mode === "live-monitor" && <LiveMonitorMode />}
    </div>
  );
}
