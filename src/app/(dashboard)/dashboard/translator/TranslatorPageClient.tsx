"use client";

import { useTranslations } from "next-intl";

import { useState } from "react";
import { SegmentedControl } from "@/shared/components";
import PlaygroundMode from "./components/PlaygroundMode";
import ChatTesterMode from "./components/ChatTesterMode";
import TestBenchMode from "./components/TestBenchMode";
import LiveMonitorMode from "./components/LiveMonitorMode";

export default function TranslatorPageClient() {
  const t = useTranslations("translator");
  const [mode, setMode] = useState("playground");
  const modes = [
    { value: "playground", label: t("playground"), icon: "code" },
    { value: "chat-tester", label: t("chatTester"), icon: "chat" },
    { value: "test-bench", label: t("testBench"), icon: "science" },
    { value: "live-monitor", label: t("liveMonitor"), icon: "monitoring" },
  ];
  const modeDescriptions: Record<string, string> = {
    playground: t("modeDescriptionPlayground"),
    "chat-tester": t("modeDescriptionChatTester"),
    "test-bench": t("modeDescriptionTestBench"),
    "live-monitor": t("modeDescriptionLiveMonitor"),
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">translate</span>
            {t("playgroundTitle")}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {modeDescriptions[mode] || t("modeDescriptionFallback")}
          </p>
        </div>
        <SegmentedControl options={modes} value={mode} onChange={setMode} size="md" />
      </div>

      {/* Mode Content */}
      {mode === "playground" && <PlaygroundMode />}
      {mode === "chat-tester" && <ChatTesterMode />}
      {mode === "test-bench" && <TestBenchMode />}
      {mode === "live-monitor" && <LiveMonitorMode />}
    </div>
  );
}
