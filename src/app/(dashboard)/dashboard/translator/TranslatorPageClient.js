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
            Debug, test, and visualize API format translations
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
