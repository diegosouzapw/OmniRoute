"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { JsonView } from "@/shared/components/jsonView";
import { ChatBubble } from "@/app/(dashboard)/dashboard/tools/traffic-inspector/components/chat/ChatBubble";
import { buildRequestTurns, buildResponseTurns } from "@/mitm/inspector/conversationNormalizer";
import type { InterceptedRequest, NormalizedTurn } from "@/mitm/inspector/types";
import { useTheme } from "@/shared/hooks/useTheme";
import {
  useTimestampTitles,
  timestampMarkerCustomizeNode,
} from "@/shared/hooks/useTimestampTitles";
import { JsonTreeExpandControls } from "@/shared/components/JsonTreeExpandControls";
import { useJsonTreeExpandLevel } from "@/store/jsonTreeExpandStore";

// ─── Payload Code Block ─────────────────────────────────────────────────────
// Renders parsed payloads as a collapsible JSON tree (react18-json-view) so
// deeply nested request/response bodies (tool args, message arrays) can be
// collapsed instead of scrolled through as one raw text dump. Falls back to
// the plain <pre> dump for anything that isn't valid JSON (e.g. a captured
// error string), since json is display text sourced from JSON.stringify with
// a String() fallback on failure -- it is not guaranteed parseable.

export function PayloadSection({
  title,
  sectionId,
  json,
  onCopy,
  collapsible = true,
  defaultOpen = true,
}) {
  const t = useTranslations("requestLogger.detail");
  const { isDark } = useTheme();
  const resolvedSectionId = sectionId || title;
  const expandLevel = useJsonTreeExpandLevel(resolvedSectionId);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(defaultOpen);
  const treeContainerRef = useRef(null);

  const parsedJson = useMemo(() => {
    if (typeof json !== "string") return null;
    try {
      const value = JSON.parse(json);
      return value !== null && typeof value === "object" ? value : null;
    } catch {
      return null;
    }
  }, [json]);

  const handleCopy = async () => {
    const success = await onCopy();
    if (success !== false) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useTimestampTitles(treeContainerRef, open && parsedJson !== null);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-[11px] text-text-muted uppercase tracking-wider font-bold">
            {title}
          </h3>
          {collapsible && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
              aria-label={open ? t("collapse", { title }) : t("expand", { title })}
            >
              <span className="material-symbols-outlined text-[16px]">
                {open ? "expand_less" : "expand_more"}
              </span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors"
            aria-label={t("copyTitle", { title })}
          >
            <span className="material-symbols-outlined text-[14px]">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? t("copied") : t("copy")}
          </button>
          {parsedJson !== null && <JsonTreeExpandControls sectionId={resolvedSectionId} />}
        </div>
      </div>
      {open && parsedJson !== null && (
        <div
          ref={treeContainerRef}
          className="rounded-xl bg-black/5 dark:bg-black/30 border border-border max-h-150 overflow-auto p-4 text-xs font-mono"
        >
          <JsonView
            src={parsedJson}
            dark={isDark}
            collapsed={expandLevel}
            customizeNode={timestampMarkerCustomizeNode}
            displaySize
          />
        </div>
      )}
      {open && parsedJson === null && (
        <pre className="p-4 rounded-xl bg-black/5 dark:bg-black/30 border border-border overflow-x-auto text-xs font-mono text-text-main max-h-150 overflow-y-auto leading-relaxed whitespace-pre-wrap break-words">
          {json}
        </pre>
      )}
    </div>
  );
}

// ─── Conversation context section ───────────────────────────────────────────
// Renders THIS request's own context (its request body's messages/input, plus
// its response) — a plain single-request normalization, same shape as the
// traffic-inspector's ConversationTab, no cross-request reconstruction. While
// the request is still generating (detail.active === true) the response side
// shows the partial text captured so far, refreshed on a short poll scoped to
// just this section.
const CONVERSATION_ACTIVE_POLL_INTERVAL_MS = 1200;

function asInterceptedResponseBody(responseBody: unknown): InterceptedRequest {
  return {
    id: "",
    source: "custom-host",
    timestamp: "",
    method: "POST",
    host: "",
    path: "",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: responseBody != null ? JSON.stringify(responseBody) : null,
    responseSize: 0,
    status: 0,
    detectedKind: "llm",
  };
}

export function ConversationContextSection({ log, detail }) {
  const [open, setOpen] = useState(true);
  const [liveDetail, setLiveDetail] = useState(detail);
  const [liveRefresh, setLiveRefresh] = useState(() => {
    try {
      const v = localStorage.getItem("pref:conversationContext:liveRefresh");
      return v == null ? true : v === "1";
    } catch {
      return true;
    }
  });
  const turnsBoxRef = useRef<HTMLDivElement>(null);

  // Adjust state when the `detail` prop changes (render-time adjustment per
  // react.dev "You Might Not Need an Effect" — replaces the old mirror effect).
  const [prevDetail, setPrevDetail] = useState(detail);
  if (detail !== prevDetail) {
    setPrevDetail(detail);
    setLiveDetail(detail);
  }

  // Same live-poll pattern as the SSE Events section (StreamSection below),
  // but gated on liveRefresh too: an active request keeps generating either
  // way, this toggle only controls whether THIS panel keeps fetching/
  // redrawing while the user reads it.
  useEffect(() => {
    if (!liveDetail?.active || !liveRefresh) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      if (cancelled) return;
      if (document.visibilityState !== "visible") {
        timeoutId = setTimeout(tick, CONVERSATION_ACTIVE_POLL_INTERVAL_MS);
        return;
      }
      fetch(`/api/logs/${log.id}`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (cancelled || !data) return;
          setLiveDetail(data);
          if (data.active) timeoutId = setTimeout(tick, CONVERSATION_ACTIVE_POLL_INTERVAL_MS);
        })
        .catch(() => {
          timeoutId = setTimeout(tick, CONVERSATION_ACTIVE_POLL_INTERVAL_MS);
        });
    };

    timeoutId = setTimeout(tick, CONVERSATION_ACTIVE_POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [liveDetail?.active, liveRefresh, log.id]);

  const toggleLiveRefresh = () => {
    const next = !liveRefresh;
    setLiveRefresh(next);
    try {
      localStorage.setItem("pref:conversationContext:liveRefresh", next ? "1" : "0");
    } catch {}
  };

  const scrollToBottom = () => {
    const el = turnsBoxRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      try {
        el.scrollTop = el.scrollHeight;
      } catch {}
    });
  };

  const requestBody =
    liveDetail?.requestBody ?? liveDetail?.pipelinePayloads?.clientRequest ?? null;
  const requestTurns = buildRequestTurns(requestBody) ?? [];

  const responseBody = liveDetail?.responseBody ?? null;
  const responseTurns: NormalizedTurn[] =
    responseBody != null
      ? buildResponseTurns(asInterceptedResponseBody(responseBody))
      : liveDetail?.partialAssistantText
        ? [
            {
              role: "assistant",
              blocks: [{ type: "text", text: liveDetail.partialAssistantText }],
            },
          ]
        : [];

  const allTurns: NormalizedTurn[] = [...requestTurns, ...responseTurns];

  // Follow new content as it streams in — same idea as StreamSection's
  // autoscroll effect, tied to the same liveRefresh toggle.
  useEffect(() => {
    if (!liveRefresh || !open) return;
    scrollToBottom();
  }, [allTurns.length, liveDetail?.partialAssistantText, liveRefresh, open]);

  if (allTurns.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-[11px] text-text-muted uppercase tracking-wider font-bold">
            Conversation Context
          </h3>
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
            aria-label={open ? "Collapse Conversation Context" : "Expand Conversation Context"}
          >
            <span className="material-symbols-outlined text-[16px]">
              {open ? "expand_less" : "expand_more"}
            </span>
          </button>
          {liveDetail?.parentLogId && (
            // Full navigation, not client-side routing: the logs page only reads
            // ?id from a fresh mount (useState(() => searchParams.get("id")) in
            // dashboard/logs/page.tsx), so an in-page route change wouldn't load
            // the parent entry if the user is already on this page.
            <a
              href={`/dashboard/logs?id=${encodeURIComponent(liveDetail.parentLogId)}`}
              className="flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors"
              title={`Continues from ${liveDetail.parentLogId}`}
            >
              <span className="material-symbols-outlined text-[14px]">reply</span>
              continues from parent
            </a>
          )}
          {liveDetail?.sessionTag && (
            // /dashboard/conversations reads its own `?tree=<id>` deep-link param
            // from a fresh mount too (useState(() => searchParams.get("tree")) in
            // that page) -- same full-navigation reasoning as the parent-log link
            // above. sessionTag is the same conv_<id> the conversations list and
            // /api/conversations/[id]/tree both key on.
            <a
              href={`/dashboard/conversations?tree=${encodeURIComponent(liveDetail.sessionTag)}`}
              className="flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors"
              title={`Open conversation ${liveDetail.sessionTag}`}
            >
              <span className="material-symbols-outlined text-[14px]">forum</span>
              view conversation
            </a>
          )}
        </div>
        {open && (
          <div className="flex items-center gap-1">
            {liveDetail?.active && (
              <button
                onClick={toggleLiveRefresh}
                title={liveRefresh ? "Live refresh: on" : "Live refresh: off"}
                className={`p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors ${liveRefresh ? "text-primary" : ""}`}
                aria-pressed={liveRefresh}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {liveRefresh ? "sync" : "sync_disabled"}
                </span>
              </button>
            )}
            <button
              onClick={scrollToBottom}
              title="Go to bottom"
              className="p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
              aria-label="Go to bottom"
            >
              <span className="material-symbols-outlined text-[18px]">vertical_align_bottom</span>
            </button>
          </div>
        )}
      </div>
      {open && (
        <div
          ref={turnsBoxRef}
          className="rounded-xl bg-black/5 dark:bg-black/30 border border-border max-h-150 overflow-y-auto p-3 space-y-2"
        >
          {allTurns.map((turn, i) => (
            <ChatBubble key={i} turn={turn} />
          ))}
        </div>
      )}
    </div>
  );
}
