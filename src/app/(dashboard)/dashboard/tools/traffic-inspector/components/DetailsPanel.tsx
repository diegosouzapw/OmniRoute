"use client";

import { useState } from "react";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { cn } from "@/shared/utils/cn";
import { HeadersTab } from "./tabs/HeadersTab";
import { RequestBodyTab } from "./tabs/RequestBodyTab";
import { ResponseBodyTab } from "./tabs/ResponseBodyTab";
import { TimingTab } from "./tabs/TimingTab";
import { LlmDetailsTab } from "./tabs/LlmDetailsTab";
import { ConversationTab } from "./tabs/ConversationTab";
import { StatsTab } from "./tabs/StatsTab";
import { AnnotationField } from "./shared/AnnotationField";

type TabId = "conversation" | "headers" | "request" | "response" | "timing" | "llm" | "stats";

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  llmOnly?: boolean;
}

const TABS: Tab[] = [
  { id: "conversation", label: "Conversation", icon: "chat_bubble" },
  { id: "headers", label: "Headers", icon: "list" },
  { id: "request", label: "Request", icon: "upload" },
  { id: "response", label: "Response", icon: "download" },
  { id: "timing", label: "Timing", icon: "timer" },
  { id: "llm", label: "LLM", icon: "psychology", llmOnly: true },
  { id: "stats", label: "Stats", icon: "bar_chart" },
];

interface DetailsPanelProps {
  request: InterceptedRequest | null;
  allRequests: InterceptedRequest[];
}

export function DetailsPanel({ request, allRequests }: DetailsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("conversation");

  if (!request) {
    return (
      <div className="h-full flex items-center justify-center text-text-muted">
        <div className="text-center space-y-2">
          <span
            className="material-symbols-outlined text-[36px] block"
            aria-hidden="true"
          >
            info
          </span>
          <p className="text-sm">Select a request to inspect it.</p>
        </div>
      </div>
    );
  }

  const isLlm = request.detectedKind === "llm";
  const visibleTabs = TABS.filter((t) => !t.llmOnly || isLlm);

  // Ensure active tab is valid
  const currentTab = visibleTabs.find((t) => t.id === activeTab) ? activeTab : "conversation";

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Request details"
        className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 pt-1 bg-bg-subtle shrink-0"
      >
        {visibleTabs.map((tab) => {
          const selected = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-1 h-8 px-2 text-xs rounded-t border-b-2 transition-colors focus-ring",
                selected
                  ? "border-blue-500 text-blue-400 bg-surface"
                  : "border-transparent text-text-muted hover:text-text-main hover:bg-surface/50"
              )}
            >
              <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {currentTab === "conversation" && <ConversationTab request={request} />}
        {currentTab === "headers" && <HeadersTab request={request} />}
        {currentTab === "request" && <RequestBodyTab request={request} />}
        {currentTab === "response" && <ResponseBodyTab request={request} />}
        {currentTab === "timing" && <TimingTab request={request} />}
        {currentTab === "llm" && isLlm && <LlmDetailsTab request={request} />}
        {currentTab === "stats" && <StatsTab requests={allRequests} />}
      </div>

      {/* Annotation footer */}
      <div className="shrink-0 border-t border-border px-3 py-2 bg-bg-subtle">
        <AnnotationField requestId={request.id} initialValue={request.annotation ?? ""} />
      </div>
    </div>
  );
}
