"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { NormalizedTurn } from "@/mitm/inspector/types";
import { cn } from "@/shared/utils/cn";
import { MessageContent } from "./MessageContent";

interface ChatBubbleProps {
  turn: NormalizedTurn;
}

const ROLE_STYLES: Record<NormalizedTurn["role"], string> = {
  system: "border border-red-500/40 bg-red-900/20 text-red-200",
  user: "ml-auto bg-blue-600/30 border border-blue-500/30 text-blue-100",
  assistant: "bg-purple-900/30 border border-purple-500/30 text-purple-100",
  tool: "bg-gray-800 border border-gray-600/30 text-gray-200",
};

const ROLE_LABEL_KEY: Record<NormalizedTurn["role"], string> = {
  system: "roleSystem",
  user: "roleUser",
  assistant: "roleAssistant",
  tool: "roleTool",
};

export function ChatBubble({ turn }: ChatBubbleProps) {
  const t = useTranslations("trafficInspector");
  const [collapsed, setCollapsed] = useState(turn.role === "system");

  const isSystem = turn.role === "system";
  const isUser = turn.role === "user";

  return (
    <div
      className={cn(
        "max-w-[85%] rounded-lg px-3 py-2",
        isUser ? "ml-auto" : "mr-auto",
        ROLE_STYLES[turn.role]
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="text-xs font-medium opacity-70">{t(ROLE_LABEL_KEY[turn.role])}</span>
        {isSystem && (
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="text-xs opacity-70 hover:opacity-100 focus-ring rounded"
          >
            {collapsed ? t("expand") : t("collapse")}
          </button>
        )}
      </div>
      {!collapsed && <MessageContent blocks={turn.blocks} />}
      {collapsed && isSystem && (
        <p className="text-xs opacity-60 italic">{t("systemPromptHidden")}</p>
      )}
    </div>
  );
}
