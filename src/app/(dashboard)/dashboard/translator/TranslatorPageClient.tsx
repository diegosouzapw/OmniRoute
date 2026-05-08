"use client";

import { useTranslations } from "next-intl";

import { useCallback, useState } from "react";
import { Badge, Card, SegmentedControl } from "@/shared/components";
import PlaygroundMode from "./components/PlaygroundMode";
import ChatTesterMode from "./components/ChatTesterMode";
import TestBenchMode from "./components/TestBenchMode";
import LiveMonitorMode from "./components/LiveMonitorMode";
import StreamTransformerMode from "./components/StreamTransformerMode";

export default function TranslatorPageClient() {
  const t = useTranslations("translator");
  const [showFeatures, setShowFeatures] = useState(false);
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

      <Card className="border-primary/10 bg-primary/5">
        <button
          onClick={() => setShowFeatures((prev) => !prev)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">
              auto_fix_high
            </span>
            <h3 className="text-sm font-semibold text-text-main">{t("autoFeaturesTitle")}</h3>
            <Badge variant="primary" size="sm">
              {t("autoFeaturesCount")}
            </Badge>
          </div>
          <span className="material-symbols-outlined text-[18px] text-text-muted">
            {showFeatures ? "expand_less" : "expand_more"}
          </span>
        </button>

        {showFeatures && (
          <div className="grid grid-cols-1 gap-3 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureChip
              icon="psychology"
              title={t("featureReasoningCache")}
              description={t("featureReasoningCacheDesc")}
              color="purple"
            />
            <FeatureChip
              icon="schema"
              title={t("featureSchemaCoercion")}
              description={t("featureSchemaCoercionDesc")}
              color="blue"
            />
            <FeatureChip
              icon="swap_vert"
              title={t("featureRoleNormalization")}
              description={t("featureRoleNormalizationDesc")}
              color="amber"
            />
            <FeatureChip
              icon="fingerprint"
              title={t("featureToolCallIds")}
              description={t("featureToolCallIdsDesc")}
              color="emerald"
            />
            <FeatureChip
              icon="add_circle"
              title={t("featureMissingToolResponse")}
              description={t("featureMissingToolResponseDesc")}
              color="cyan"
            />
            <FeatureChip
              icon="tune"
              title={t("featureThinkingBudget")}
              description={t("featureThinkingBudgetDesc")}
              color="orange"
            />
            <FeatureChip
              icon="alt_route"
              title={t("featureDirectPaths")}
              description={t("featureDirectPathsDesc")}
              color="pink"
            />
            <FeatureChip
              icon="photo_size_select_large"
              title={t("featureImageMapping")}
              description={t("featureImageMappingDesc")}
              color="indigo"
            />
          </div>
        )}
      </Card>

      {/* Mode Content */}
      {mode === "playground" && <PlaygroundMode />}
      {mode === "chat-tester" && <ChatTesterMode />}
      {mode === "test-bench" && <TestBenchMode />}
      {mode === "stream-transformer" && <StreamTransformerMode />}
      {mode === "live-monitor" && <LiveMonitorMode />}
    </div>
  );
}

function FeatureChip({
  icon,
  title,
  description,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  color: "purple" | "blue" | "amber" | "emerald" | "cyan" | "orange" | "pink" | "indigo";
}) {
  const colorMap = {
    purple: {
      shell: "border-purple-500/20 bg-purple-500/5",
      icon: "text-purple-500",
    },
    blue: {
      shell: "border-blue-500/20 bg-blue-500/5",
      icon: "text-blue-500",
    },
    amber: {
      shell: "border-amber-500/20 bg-amber-500/5",
      icon: "text-amber-500",
    },
    emerald: {
      shell: "border-emerald-500/20 bg-emerald-500/5",
      icon: "text-emerald-500",
    },
    cyan: {
      shell: "border-cyan-500/20 bg-cyan-500/5",
      icon: "text-cyan-500",
    },
    orange: {
      shell: "border-orange-500/20 bg-orange-500/5",
      icon: "text-orange-500",
    },
    pink: {
      shell: "border-pink-500/20 bg-pink-500/5",
      icon: "text-pink-500",
    },
    indigo: {
      shell: "border-indigo-500/20 bg-indigo-500/5",
      icon: "text-indigo-500",
    },
  }[color];

  return (
    <div className={`rounded-lg border p-3 ${colorMap.shell}`}>
      <div className="mb-1 flex items-center gap-2">
        <span className={`material-symbols-outlined text-[16px] ${colorMap.icon}`}>{icon}</span>
        <p className="text-xs font-semibold text-text-main">{title}</p>
      </div>
      <p className="text-[10px] leading-relaxed text-text-muted">{description}</p>
    </div>
  );
}
