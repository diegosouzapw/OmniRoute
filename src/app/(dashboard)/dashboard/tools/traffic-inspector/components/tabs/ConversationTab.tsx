"use client";

import { useTranslations } from "next-intl";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { normalizeConversation } from "@/mitm/inspector/conversationNormalizer";
import { ChatBubble } from "../chat/ChatBubble";

interface ConversationTabProps {
  request: InterceptedRequest;
}

export function ConversationTab({ request }: ConversationTabProps) {
  const t = useTranslations("trafficInspector");
  const conversation = normalizeConversation(request);

  if (!conversation) {
    return (
      <div className="p-4 text-sm text-text-muted">{t("conversationNotAvailable")}</div>
    );
  }

  const allTurns = [...conversation.request, ...conversation.response];

  if (allTurns.length === 0) {
    return (
      <div className="p-4 text-sm text-text-muted">{t("conversationNoMessages")}</div>
    );
  }

  return (
    <div className="h-full overflow-auto p-3 space-y-2">
      {conversation.contextKey && (
        <div className="text-xs text-text-muted mb-2">
          {t("contextFingerprint")}{" "}
          <span className="font-mono text-blue-400">#{conversation.contextKey.slice(0, 12)}</span>
        </div>
      )}
      {conversation.request.length > 0 && (
        <>
          <div className="flex items-center gap-2 mt-2 mb-1 text-[11px] uppercase tracking-wider text-text-muted font-semibold">
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span>{t("contextHistory")}</span>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>
          {conversation.request.map((turn, i) => (
            <ChatBubble key={`req-${i}`} turn={turn} />
          ))}
        </>
      )}
      {conversation.response.length > 0 && (
        <>
          <div className="flex items-center gap-2 mt-3 mb-1 text-[11px] uppercase tracking-wider text-text-muted font-semibold">
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span>{t("modelResponse")}</span>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>
          {conversation.response.map((turn, i) => (
            <ChatBubble key={`res-${i}`} turn={turn} />
          ))}
        </>
      )}
    </div>
  );
}
