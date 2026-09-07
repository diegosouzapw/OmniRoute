"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PROVIDER_COLORS, getHttpStatusStyle } from "@/shared/constants/colors";
import { formatTime } from "@/shared/utils/formatting";
import { copyToClipboard } from "@/shared/utils/clipboard";
import RequestLoggerDetail from "@/shared/components/RequestLoggerDetail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { ChatBubble } from "@/app/(dashboard)/dashboard/tools/traffic-inspector/components/chat/ChatBubble";
import type { NormalizedBlock, NormalizedTurn } from "@/mitm/inspector/types";

interface ConversationRow {
  id: string;
  turnCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
  lastCallLogId: string | null;
  lastModel: string | null;
  lastProvider: string | null;
  lastStatus: number | null;
  isActive: boolean;
  // The in-flight request's OWN id (from usageHistory's pendingById, keyed by
  // sessionTag) — distinct from lastCallLogId, which joins against call_logs
  // and therefore always lags one request behind while a reply is still
  // streaming (call_logs only gets its row on completion). Used to poll
  // /api/logs/[id] for this conversation's live partial assistant text.
  activeCallLogId: string | null;
  // Whether the latest turn actually used previous_response_id and it
  // resolved server-side — distinct from this row existing at all, which
  // only means the client-side content-hash tracker saw >= 2 turns
  // regardless of transport (see isGenuineContinuationTurn).
  isGenuineContinuation: boolean;
}

// Same spinner used for an in-flight request on /dashboard/logs
// (RequestLoggerV2) — reused here so "in progress" reads the same way in
// both places.
function ActiveSpinner() {
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/25 shrink-0"
      title="In progress"
    >
      <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
    </span>
  );
}

interface ConversationTurn {
  seq: number;
  id: string;
  parentId: string | null;
  role: string;
  textPreview: string;
  blockKind: string;
  toolName: string | null;
  firstSeenAt: string;
}

interface ConversationTurnsPage {
  nodes: ConversationTurn[];
  hasMore: boolean;
}

const CONVERSATION_PAGE_SIZE = 20;

const DEFAULT_POLL_SECONDS = 5;
const POLL_STORAGE_KEY = "conversationsListPollSeconds";
// Matches RequestLoggerDetail's CONVERSATION_ACTIVE_POLL_INTERVAL_MS — same
// live-partial-text source, same cadence, so the two views feel consistent.
const LIVE_TEXT_POLL_INTERVAL_MS = 1200;

function ProviderBadge({ provider }: { provider: string | null }) {
  if (!provider) return <span className="text-text-muted text-[10px]">—</span>;
  const style = (PROVIDER_COLORS as Record<string, { bg: string; text: string; label: string }>)[
    provider
  ];
  if (!style) {
    return (
      <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-bg-subtle text-text-muted border border-border">
        {provider}
      </span>
    );
  }
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
}

function StatusBadge({ status }: { status: number | null }) {
  if (status == null) return <span className="text-text-muted text-[10px]">—</span>;
  const style = getHttpStatusStyle(status);
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold"
      style={{ backgroundColor: style.bg, color: style.text ?? "#fff" }}
    >
      {status}
    </span>
  );
}

// Distinguishes a conversation whose latest turn actually used
// previous_response_id (server-verified — see isGenuineContinuationTurn)
// from one the content-hash tracker merely counts as multi-turn while still
// resending full history each request.
function ContinuationBadge({ isGenuine }: { isGenuine: boolean }) {
  if (!isGenuine) return null;
  return (
    <span
      title="Latest turn used previous_response_id and it resolved server-side"
      className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/25"
    >
      <span className="material-symbols-outlined text-[11px] leading-none">bolt</span>
      continuation
    </span>
  );
}

/**
 * Builds the exact NormalizedBlock (src/mitm/inspector/types.ts) the
 * request-detail panel already builds from buildRequestTurns/
 * buildResponseTurns, so a tool call/result renders through the very same
 * ChatBubble → MessageContent → ToolCallBlock/ToolResultBlock pipeline as
 * the detail view — not a parallel implementation. `textPreview` round-
 * tripped through JSON for a structured tool_use/tool_result turn; parse it
 * best-effort so the block gets a real object, not a JSON string.
 */
function toTurn(node: ConversationTurn): NormalizedTurn {
  const role: NormalizedTurn["role"] =
    node.role === "system" || node.role === "user" || node.role === "assistant"
      ? node.role
      : "tool";

  let block: NormalizedBlock;
  if (node.blockKind === "tool_use") {
    let input: unknown = node.textPreview;
    try {
      input = JSON.parse(node.textPreview);
    } catch {
      // Arguments weren't valid JSON — show the raw string.
    }
    block = { type: "tool_use", id: node.id.slice(0, 12), name: node.toolName ?? "tool", input };
  } else if (node.blockKind === "tool_result") {
    let content: unknown = node.textPreview;
    try {
      content = JSON.parse(node.textPreview);
    } catch {
      // Not JSON — show the raw string.
    }
    block = { type: "tool_result", tool_use_id: node.id.slice(0, 12), content };
  } else {
    block = { type: "text", text: node.textPreview || "_(empty)_" };
  }

  return { role, blocks: [block], timestamp: node.firstSeenAt };
}

/**
 * Renders a conversation's turns top to bottom, oldest first — always a
 * flat, chronological list. Every OmniRoute conversation is a single
 * straight line (an edited/duplicated turn mints its own independent
 * conversation instead of branching this one — see conversationTracker.ts's
 * 2026-08-06 redesign), so there is no fork/indentation logic here at all
 * anymore. `onLoadOlder` renders as a button above the turns when more
 * (older) history exists than the current page.
 */
function ConversationLogView({
  nodes,
  hasMore,
  loadingMore,
  onLoadOlder,
  livePartialText,
}: {
  nodes: ConversationTurn[];
  hasMore: boolean;
  loadingMore: boolean;
  onLoadOlder: () => void;
  // The reply currently streaming for this conversation, if any — not yet a
  // persisted conversation_turn_nodes row (see the live-text poll effect's
  // comment for why), rendered as a provisional bubble below the real turns.
  livePartialText: string;
}) {
  if (nodes.length === 0 && !livePartialText) {
    return (
      <div className="text-sm text-text-muted py-4">No turns recorded for this conversation.</div>
    );
  }
  return (
    <div className="flex flex-col gap-1.5 py-2 w-full min-w-0">
      {hasMore && (
        <button
          type="button"
          onClick={onLoadOlder}
          disabled={loadingMore}
          className="self-center mb-2 px-3 py-1.5 rounded-md border border-border text-xs text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors disabled:opacity-50"
        >
          {loadingMore ? "Loading…" : "Load more"}
        </button>
      )}
      {nodes.map((node) => (
        <ChatBubble key={node.id} turn={toTurn(node)} />
      ))}
      {livePartialText && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[10px] text-amber-600 dark:text-amber-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Generating…
          </div>
          <ChatBubble
            turn={{
              role: "assistant",
              blocks: [{ type: "text", text: livePartialText }],
            }}
          />
        </div>
      )}
    </div>
  );
}

function ConversationsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Read once on mount, mirroring dashboard/logs/page.tsx (#6830/#8354): re-reading the
  // live searchParams on every render re-fires the deep-link open effect right when the
  // panel closes and router.replace() strips the ?id= param.
  const [initialId] = useState(() => searchParams.get("id"));
  // Deep link for the conversation modal — separate param from `id` (the
  // request-detail panel) so either overlay can be linked independently.
  const [initialConversationParam] = useState(() => searchParams.get("tree"));

  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const { emailsVisible } = useEmailPrivacyStore();
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailLoggingEnabled, setDetailLoggingEnabled] = useState(false);
  const [activeConversation, setActiveConversation] = useState<ConversationRow | null>(null);
  // Extracted so effects that only care "which conversation" (not its
  // summary fields) can depend on this stable primitive instead of the
  // whole activeConversation object — that object gets a fresh reference
  // every list-poll tick once opened (see the resync effect below), which
  // would otherwise rebind timers/listeners on every poll tick.
  const activeConversationId = activeConversation?.id ?? null;
  // Only the identifier, not the whole activeConversation object, for the same
  // reason as activeConversationId above: this changes identity every list-poll
  // tick, which would otherwise tear down/restart the live-text poll effect.
  const activeCallLogId = activeConversation?.activeCallLogId ?? null;
  const [livePartialText, setLivePartialText] = useState("");
  const [conversationNodes, setConversationNodes] = useState<ConversationTurn[]>([]);
  const [conversationLoading, setConversationLoading] = useState(false);
  const [conversationHasMore, setConversationHasMore] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [pollSeconds, setPollSeconds] = useState(() => {
    try {
      const saved = localStorage.getItem(POLL_STORAGE_KEY);
      const parsed = saved ? Number(saved) : DEFAULT_POLL_SECONDS;
      return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_POLL_SECONDS;
    } catch {
      return DEFAULT_POLL_SECONDS;
    }
  });
  const initialOpenedRef = useRef(false);
  const initialConversationOpenedRef = useRef(false);
  const conversationPanelRef = useRef<HTMLDivElement>(null);
  const conversationContentRef = useRef<HTMLDivElement>(null);
  // True right after opening a conversation (or clicking "Go to bottom"),
  // cleared once the user scrolls away from the bottom themselves. A large
  // conversation's last page can include multi-KB tool-output/context turns
  // whose markdown takes more than one animation frame to lay out, so a
  // single scrollTop=scrollHeight right after fetch can undershoot — the
  // ResizeObserver below re-pins on every subsequent layout change while
  // this stays true, instead of a one-shot scroll that races the render.
  const pinnedToBottomRef = useRef(false);
  // Set right before prepending an older page, so the effect below can
  // adjust scrollTop by exactly how much content grew above the fold —
  // otherwise "Load more" would visually yank the view to the top.
  const prependAdjustRef = useRef<{ prevScrollHeight: number; prevScrollTop: number } | null>(null);
  // Mirrors the newest loaded turn's seq without needing conversationNodes
  // itself in the poll effect's dependency array (which would tear down and
  // restart the interval on every single appended turn).
  const newestSeqRef = useRef<number | null>(null);
  // Tracks the PREVIOUS render's activeCallLogId truthiness, so the
  // reply-just-finished effect below can detect the true->false transition
  // specifically (not "is currently falsy", which would also fire on mount
  // / switching conversations).
  const wasReplyActiveRef = useRef(false);

  // The background list poll below only runs this while no conversation
  // modal is open — see loadActiveConversationSummary and the poll effect
  // for the lighter single-row path used while one is open.
  const loadConversations = useCallback(() => {
    if (document.visibilityState !== "visible") return;
    return fetch("/api/conversations?limit=100", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setConversations(Array.isArray(data.conversations) ? data.conversations : []);
        setTotal(typeof data.total === "number" ? data.total : 0);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // While the modal is open, only the one open conversation's summary needs
  // to stay live (see the resync effect below) — refetching and
  // re-annotating the whole up-to-100-row list every poll tick just to pluck
  // that one row back out is pure waste, and at a 1s poll interval it's
  // waste on every tick. Patches the row in place so the existing resync
  // effect (keyed on `conversations`) picks it up unchanged.
  const loadActiveConversationSummary = useCallback((id: string) => {
    if (document.visibilityState !== "visible") return;
    return fetch(`/api/conversations/${id}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const fresh = data?.conversation;
        if (!fresh) return;
        setConversations((prev) => {
          const idx = prev.findIndex((c) => c.id === fresh.id);
          if (idx === -1) return prev;
          const next = prev.slice();
          next[idx] = fresh;
          return next;
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const poll = () =>
      activeConversationId
        ? loadActiveConversationSummary(activeConversationId)
        : loadConversations();
    poll();
    const interval = setInterval(poll, pollSeconds * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [pollSeconds, loadConversations, loadActiveConversationSummary, activeConversationId]);

  // activeConversation is a snapshot taken once at openConversation() time —
  // it's never touched again while the modal stays open (the turns-poll
  // effect below only appends conversationNodes). Without this, "Goto latest
  // request" and any other displayed summary field (lastModel/lastStatus/
  // turnCount) go stale the moment a new request lands in this conversation
  // while you're still reading it. Re-synced from `conversations` whenever
  // that refreshes — the effect above keeps it fresh whether the modal is
  // closed (full list poll) or open (single-conversation poll patches this
  // same row in place).
  useEffect(() => {
    if (!activeConversationId) return;
    const fresh = conversations.find((c) => c.id === activeConversationId);
    if (!fresh) return;
    void (async () => {
      await Promise.resolve();
      setActiveConversation((prev) => (prev && prev.id === fresh.id ? fresh : prev));
    })();
  }, [conversations, activeConversationId]);

  useEffect(() => {
    fetch("/api/logs/detail?limit=1")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setDetailLoggingEnabled(data.enabled === true);
      })
      .catch(() => {});
  }, []);

  // Opens a request's detail panel in-place — used for the initial row click and for
  // every subsequent turn/next-message navigation, so viewing a conversation never
  // navigates away from this page (matches RequestLoggerV2/RequestTimeline).
  const openById = useCallback(
    async (id: string) => {
      try {
        const url = new URL(globalThis.location.href);
        url.searchParams.set("id", id);
        router.replace(url.pathname + url.search);
      } catch {
        // ignore navigation errors
      }
      setDetailLoading(true);
      try {
        const res = await fetch(`/api/logs/${id}`, { cache: "no-store" });
        const data = res.ok ? await res.json() : null;
        if (data) {
          setSelectedLog({
            id: data.id ?? id,
            timestamp: data.timestamp,
            status: data.status ?? 0,
            model: data.model ?? null,
            provider: data.provider ?? null,
            account: data.account ?? null,
            duration: data.duration ?? 0,
            tokens: data.tokens ?? { in: 0, out: 0 },
            active: data.active,
            error: data.error ?? null,
            path: data.path ?? null,
          });
          setDetailData(data);
        }
      } catch {
        // ignore fetch errors
      } finally {
        setDetailLoading(false);
      }
    },
    [router]
  );

  const closeDetail = useCallback(() => {
    setSelectedLog(null);
    setDetailData(null);
    try {
      const url = new URL(globalThis.location.href);
      url.searchParams.delete("id");
      router.replace(url.pathname + url.search);
    } catch {
      // ignore navigation errors
    }
  }, [router]);

  useEffect(() => {
    if (!initialId || initialOpenedRef.current) return;
    initialOpenedRef.current = true;
    openById(initialId).catch(() => {});
  }, [initialId, openById]);

  const scrollToBottom = useCallback(() => {
    pinnedToBottomRef.current = true;
    const el = conversationPanelRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      try {
        el.scrollTop = el.scrollHeight;
      } catch {}
    });
  }, []);

  // Keeps the panel pinned to its bottom while conversationContentRef's
  // height keeps changing (initial render of a large page, late-settling
  // markdown/tool-output layout, a new turn arriving via poll) — see
  // pinnedToBottomRef's comment above for why a single scrollToBottom call
  // isn't enough on its own for a heavy page.
  useEffect(() => {
    const content = conversationContentRef.current;
    const panel = conversationPanelRef.current;
    if (!content || !panel) return;
    const observer = new ResizeObserver(() => {
      if (!pinnedToBottomRef.current) return;
      panel.scrollTop = panel.scrollHeight;
    });
    observer.observe(content);
    return () => observer.disconnect();
    // Keyed on the id, not the whole object: activeConversation's summary
    // fields (lastCallLogId etc.) get resynced from the list poll while the
    // modal stays open (see that effect's comment), which would otherwise
    // tear down and recreate this observer on every poll tick.
  }, [activeConversation?.id]);

  // Un-pin as soon as the user scrolls away from the bottom themselves (e.g.
  // to read earlier turns or click "Load more"), so later content growth
  // doesn't yank them back down against their will. Re-pins automatically if
  // they scroll back down to the bottom on their own.
  useEffect(() => {
    const panel = conversationPanelRef.current;
    if (!panel) return;
    const NEAR_BOTTOM_PX = 24;
    const onScroll = () => {
      const distanceFromBottom = panel.scrollHeight - panel.scrollTop - panel.clientHeight;
      pinnedToBottomRef.current = distanceFromBottom <= NEAR_BOTTOM_PX;
    };
    panel.addEventListener("scroll", onScroll, { passive: true });
    return () => panel.removeEventListener("scroll", onScroll);
  }, [activeConversation?.id]);

  const fetchConversationPage = useCallback(
    (id: string, params: string): Promise<ConversationTurnsPage | null> =>
      fetch(`/api/conversations/${id}/tree?${params}`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) =>
          data && Array.isArray(data.nodes)
            ? { nodes: data.nodes, hasMore: Boolean(data.hasMore) }
            : null
        )
        .catch(() => null),
    []
  );

  const openConversation = useCallback(
    (row: ConversationRow) => {
      setActiveConversation(row);
      setConversationNodes([]);
      setConversationHasMore(false);
      setConversationLoading(true);
      setLivePartialText("");
      try {
        const url = new URL(globalThis.location.href);
        url.searchParams.set("tree", row.id);
        router.replace(url.pathname + url.search);
      } catch {
        // ignore navigation errors
      }
      // `row` is a snapshot from whenever the list last polled — if a reply
      // started streaming after that tick, row.activeCallLogId is still null
      // and the live-text poll effect never starts until a fresh summary
      // lands (the exact "opened it and saw nothing, closed and reopened and
      // saw it live" report). setActiveConversation above already changes
      // activeConversationId, which is a dependency of the poll effect below
      // — it tears down and re-fires immediately on that change, forcing the
      // single-row resync here for free without a second explicit call.
      fetchConversationPage(row.id, `limit=${CONVERSATION_PAGE_SIZE}`)
        .then((page) => {
          setConversationNodes(page?.nodes ?? []);
          setConversationHasMore(page?.hasMore ?? false);
        })
        .finally(() => {
          setConversationLoading(false);
          // A freshly-opened conversation should start scrolled to the
          // latest (bottom-most) turn, not the oldest one on the page.
          scrollToBottom();
        });
    },
    [router, fetchConversationPage, scrollToBottom]
  );

  const closeConversation = useCallback(() => {
    setActiveConversation(null);
    try {
      const url = new URL(globalThis.location.href);
      url.searchParams.delete("tree");
      router.replace(url.pathname + url.search);
    } catch {
      // ignore navigation errors
    }
  }, [router]);

  const loadOlderTurns = useCallback(() => {
    const panel = conversationPanelRef.current;
    const oldestSeq = conversationNodes[0]?.seq;
    if (!activeConversation || !panel || oldestSeq == null || loadingOlder) return;
    setLoadingOlder(true);
    prependAdjustRef.current = {
      prevScrollHeight: panel.scrollHeight,
      prevScrollTop: panel.scrollTop,
    };
    fetchConversationPage(
      activeConversation.id,
      `limit=${CONVERSATION_PAGE_SIZE}&beforeSeq=${oldestSeq}`
    )
      .then((page) => {
        if (page && page.nodes.length > 0) {
          setConversationNodes((prev) => [...page.nodes, ...prev]);
        }
        setConversationHasMore(page?.hasMore ?? false);
      })
      .finally(() => setLoadingOlder(false));
  }, [activeConversation, conversationNodes, loadingOlder, fetchConversationPage]);

  // Preserve scroll position across a "load more" prepend — otherwise
  // adding older turns above the fold visually yanks the view to the top.
  useEffect(() => {
    const adjust = prependAdjustRef.current;
    if (!adjust) return;
    prependAdjustRef.current = null;
    const panel = conversationPanelRef.current;
    if (!panel) return;
    requestAnimationFrame(() => {
      panel.scrollTop = adjust.prevScrollTop + (panel.scrollHeight - adjust.prevScrollHeight);
    });
  }, [conversationNodes]);

  useEffect(() => {
    newestSeqRef.current =
      conversationNodes.length > 0 ? conversationNodes[conversationNodes.length - 1].seq : null;
  }, [conversationNodes]);

  useEffect(() => {
    if (!activeConversationId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeConversation();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // activeConversationId, not the whole activeConversation object: it
    // gets resynced (new object reference) from the list poll while the
    // modal stays open (see that effect's comment) — depending on the
    // object here would rebind this listener on every poll tick for no
    // reason.
  }, [activeConversationId, closeConversation]);

  // While the conversation is open, keep polling for turns that arrive
  // later (the request that opened it may not be the last one — OpenClaw
  // can send another turn while you're still reading). Reuses the same
  // "Auto-refresh Xs" setting as the list, rather than a separate interval,
  // so there's one poll cadence to reason about on this page. Only ever
  // APPENDS newer turns (via afterSeq) — it never re-fetches or replaces
  // the whole page, so a "Load more" page loaded earlier stays put, and it
  // deliberately does NOT re-scroll on every refresh (only the initial open
  // does that), so it doesn't yank the view mid-read.
  //
  // Depends on activeConversationId, NOT the whole activeConversation
  // object: activeConversation gets a fresh object reference every list-poll
  // tick (see the resync effect above, needed so "Goto latest request"
  // doesn't go stale) — on the SAME poll cadence as this effect's own
  // interval. Depending on the object would tear down and recreate this
  // setInterval every single tick, resetting its countdown each time and
  // starving it of ever actually firing — silently breaking the exact
  // "keep filling in new turns while open" behavior this effect exists for.
  useEffect(() => {
    if (!activeConversationId) return;
    const tick = () => {
      if (document.visibilityState !== "visible") return;
      if (newestSeqRef.current == null) return;
      fetchConversationPage(activeConversationId, `afterSeq=${newestSeqRef.current}`).then(
        (page) => {
          if (page && page.nodes.length > 0) {
            setConversationNodes((prev) => [...prev, ...page.nodes]);
          }
        }
      );
    };
    const interval = setInterval(tick, pollSeconds * 1000);
    return () => clearInterval(interval);
  }, [activeConversationId, pollSeconds, fetchConversationPage]);

  // Live incident (2026-09-02): resolveConversationId reassigns a node's
  // last_correlation_id to the CURRENT request at request-START (before its
  // reply streams), but that request's call-log artifact -- what
  // resolveTurnDisplayContent needs to show real text -- is only written at
  // completion. A node touched by a still-in-flight request therefore
  // legitimately resolves empty if fetched during that window; the afterSeq
  // poll above only ever APPENDS strictly newer nodes, so one already
  // rendered empty stays empty in local state forever, even once its
  // artifact exists moments later -- the exact "empty until you close and
  // reopen the conversation" symptom. Once a reply that was streaming
  // finishes (activeCallLogId's true -> false transition -- see the
  // wasReplyActiveRef doc comment), re-fetch the recent page and merge it in
  // by id (never drop older "Load more" history) so any node that resolved
  // empty during the race gets its real content without a manual reopen.
  useEffect(() => {
    const wasActive = wasReplyActiveRef.current;
    wasReplyActiveRef.current = Boolean(activeCallLogId);
    if (!wasActive || activeCallLogId || !activeConversationId) return;

    fetchConversationPage(activeConversationId, `limit=${CONVERSATION_PAGE_SIZE}`).then((page) => {
      if (!page || page.nodes.length === 0) return;
      setConversationNodes((prev) => {
        const byId = new Map(prev.map((n) => [n.id, n] as const));
        for (const n of page.nodes) byId.set(n.id, n);
        return [...byId.values()].sort((a, b) => a.seq - b.seq);
      });
    });
  }, [activeCallLogId, activeConversationId, fetchConversationPage]);

  // Live preview of the CURRENTLY streaming reply, if any: conversation_turn_nodes
  // only gains a node for an assistant turn once the client resends it as
  // history on its NEXT request (resolveConversationId reads only the request
  // body), so the turns-poll effect above has nothing new to fetch while a
  // reply is still generating — the transcript would sit frozen despite the
  // request actively producing text. Same live-partial-text source
  // RequestLoggerDetail's ConversationContextSection already polls
  // (/api/logs/[id]'s partialAssistantText, built from in-flight streamChunks),
  // rendered here as a provisional bubble that's never written to
  // conversationNodes/DB. Uses a short fixed interval (not the user's
  // Auto-refresh Xs list-poll setting) since a still-generating reply is worth
  // refreshing faster than "is there a new conversation" — matches
  // RequestLoggerDetail's CONVERSATION_ACTIVE_POLL_INTERVAL_MS.
  useEffect(() => {
    if (!activeCallLogId) {
      void (async () => {
        await Promise.resolve();
        setLivePartialText("");
      })();
      return;
    }
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      if (cancelled) return;
      if (document.visibilityState !== "visible") {
        timeoutId = setTimeout(tick, LIVE_TEXT_POLL_INTERVAL_MS);
        return;
      }
      fetch(`/api/logs/${activeCallLogId}`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (cancelled || !data) return;
          setLivePartialText(
            typeof data.partialAssistantText === "string" ? data.partialAssistantText : ""
          );
          if (data.active) timeoutId = setTimeout(tick, LIVE_TEXT_POLL_INTERVAL_MS);
        })
        .catch(() => {
          timeoutId = setTimeout(tick, LIVE_TEXT_POLL_INTERVAL_MS);
        });
    };

    timeoutId = setTimeout(tick, LIVE_TEXT_POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeCallLogId]);

  // Deep link: /dashboard/conversations?tree=<id> opens that conversation.
  // Prefer the already-loaded row (has lastCallLogId for "Goto latest
  // request"); fall back to a minimal row if the conversation isn't in the
  // current page of the list (still fully works — the API only needs the
  // id).
  useEffect(() => {
    if (!initialConversationParam || initialConversationOpenedRef.current || loading) return;
    initialConversationOpenedRef.current = true;
    const found = conversations.find((c) => c.id === initialConversationParam);
    openConversation(
      found ?? {
        id: initialConversationParam,
        turnCount: 0,
        firstSeenAt: "",
        lastSeenAt: "",
        lastCallLogId: null,
        lastModel: null,
        lastProvider: null,
        lastStatus: null,
        isActive: false,
        activeCallLogId: null,
        isGenuineContinuation: false,
      }
    );
  }, [initialConversationParam, loading, conversations, openConversation]);

  const gotoLatestRequest = () => {
    const id = activeConversation?.lastCallLogId;
    if (!id) return;
    closeConversation();
    openById(id).catch(() => {});
  };

  // Previous/Next navigate to the adjacent row in the currently loaded list —
  // same idea as RequestLoggerDetail's onPrevious/onNext, but one level up
  // (between conversations, not between requests within one). Index is
  // recomputed from `conversations` on every click rather than memoized: the
  // list refreshes under a poll while the modal is open (see the resync
  // effect above), so a stale captured index could skip/repeat a row.
  const activeConversationIndex = activeConversation
    ? conversations.findIndex((c) => c.id === activeConversation.id)
    : -1;
  const hasPreviousConversation = activeConversationIndex > 0;
  const hasNextConversation =
    activeConversationIndex !== -1 && activeConversationIndex < conversations.length - 1;

  const goToPreviousConversation = useCallback(() => {
    const index = conversations.findIndex((c) => c.id === activeConversation?.id);
    if (index <= 0) return;
    openConversation(conversations[index - 1]);
  }, [conversations, activeConversation, openConversation]);

  const goToNextConversation = useCallback(() => {
    const index = conversations.findIndex((c) => c.id === activeConversation?.id);
    if (index === -1 || index >= conversations.length - 1) return;
    openConversation(conversations[index + 1]);
  }, [conversations, activeConversation, openConversation]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-lg font-semibold text-text-main">Conversations</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted">
            {total} conversation{total === 1 ? "" : "s"} with 2+ turns
          </span>
          <label
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-text-muted bg-bg-subtle rounded-md border border-border"
            title="How often this list re-fetches from the server."
          >
            <span>Auto-refresh</span>
            <input
              type="number"
              min={1}
              step={1}
              value={pollSeconds}
              onChange={(e) => {
                const next = Math.max(1, Number(e.target.value) || 1);
                setPollSeconds(next);
                try {
                  localStorage.setItem(POLL_STORAGE_KEY, String(next));
                } catch {}
              }}
              className="w-10 bg-transparent text-center font-mono focus:outline-none"
            />
            <span>s</span>
          </label>
        </div>
      </div>

      {loading && conversations.length === 0 && (
        <div className="flex items-center justify-center py-12 text-text-muted text-sm">
          Loading conversations...
        </div>
      )}

      {!loading && conversations.length === 0 && (
        <div className="flex items-center justify-center py-12 text-text-muted text-sm">
          No multi-turn conversations yet.
        </div>
      )}

      {conversations.length > 0 && (
        <>
          {/* Mobile: stacked cards — avoids the horizontal-scroll table entirely on
              narrow viewports instead of squeezing 6 columns into one row. */}
          <div className="flex flex-col gap-2 sm:hidden">
            {conversations.map((row) => (
              <div
                key={row.id}
                onClick={() => openConversation(row)}
                className="rounded-xl border border-border p-3 flex flex-col gap-2 active:bg-bg-subtle cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 min-w-0">
                    {row.isActive && <ActiveSpinner />}
                    <span
                      title={row.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(row.id);
                      }}
                      className="font-mono text-[11px] text-text-main hover:underline truncate"
                    >
                      {row.id.slice(0, 16)}…
                    </span>
                    <ContinuationBadge isGenuine={row.isGenuineContinuation} />
                  </span>
                  <span className="font-mono text-xs text-text-muted shrink-0">
                    {row.turnCount} turns
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm text-text-main truncate">{row.lastModel ?? "—"}</span>
                    <ProviderBadge provider={row.lastProvider} />
                  </div>
                  <StatusBadge status={row.lastStatus} />
                </div>
                <div className="text-right text-[11px] text-text-muted">
                  {formatTime(row.lastSeenAt)}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/tablet: full table */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-bg-subtle text-left text-[11px] uppercase tracking-wider text-text-muted">
                  <th className="px-3 py-2">Conversation</th>
                  <th className="px-3 py-2 text-right">Turns</th>
                  <th className="px-3 py-2">Continuation</th>
                  <th className="px-3 py-2">Last Model</th>
                  <th className="px-3 py-2">Provider</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-right">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {conversations.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border/50 last:border-0 hover:bg-bg-subtle cursor-pointer transition-colors"
                    onClick={() => openConversation(row)}
                  >
                    <td className="px-3 py-2 font-mono text-[11px] text-text-main">
                      <span className="flex items-center gap-1.5">
                        {row.isActive && <ActiveSpinner />}
                        <span
                          title={row.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(row.id);
                          }}
                          className="hover:underline"
                        >
                          {row.id.slice(0, 16)}…
                        </span>
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-text-main">
                      {row.turnCount}
                    </td>
                    <td className="px-3 py-2">
                      <ContinuationBadge isGenuine={row.isGenuineContinuation} />
                    </td>
                    <td className="px-3 py-2 text-text-main">{row.lastModel ?? "—"}</td>
                    <td className="px-3 py-2">
                      <ProviderBadge provider={row.lastProvider} />
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge status={row.lastStatus} />
                    </td>
                    <td className="px-3 py-2 text-right text-text-muted">
                      {formatTime(row.lastSeenAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeConversation && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-2 pt-[5vh] sm:px-4"
          onClick={closeConversation}
          role="dialog"
          aria-modal="true"
          aria-label="Conversation"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            ref={conversationPanelRef}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-bg-primary shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-bg-primary/95 backdrop-blur-sm rounded-t-xl sm:px-6 sm:py-4">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-text-main">Conversation</h3>
                <span
                  title={activeConversation.id}
                  className="block truncate font-mono text-[11px] text-text-muted"
                >
                  {activeConversation.id.slice(0, 24)}…
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={goToPreviousConversation}
                  disabled={!hasPreviousConversation}
                  title="Previous conversation"
                  aria-label="Previous conversation"
                  className="p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={goToNextConversation}
                  disabled={!hasNextConversation}
                  title="Next conversation"
                  aria-label="Next conversation"
                  className="p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
                {activeConversation.lastCallLogId && (
                  <button
                    type="button"
                    onClick={gotoLatestRequest}
                    className="px-2 py-1 rounded-md border border-border text-[11px] text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors whitespace-nowrap"
                  >
                    Goto latest request
                  </button>
                )}
                <button
                  type="button"
                  onClick={scrollToBottom}
                  title="Go to bottom"
                  className="p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Go to bottom"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    vertical_align_bottom
                  </span>
                </button>
                <button
                  type="button"
                  onClick={closeConversation}
                  className="p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Close conversation"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>
            <div ref={conversationContentRef} className="p-4 sm:p-6">
              {conversationLoading ? (
                <div className="text-sm text-text-muted py-4">Loading…</div>
              ) : (
                <ConversationLogView
                  nodes={conversationNodes}
                  hasMore={conversationHasMore}
                  loadingMore={loadingOlder}
                  onLoadOlder={loadOlderTurns}
                  livePartialText={livePartialText}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {selectedLog && (
        <RequestLoggerDetail
          log={selectedLog}
          detail={detailData}
          loading={detailLoading}
          debugEnabled={selectedLog?.active ? true : detailLoggingEnabled}
          emailsVisible={emailsVisible}
          onClose={closeDetail}
          onCopy={copyToClipboard}
          onPrevious={undefined}
          onNext={undefined}
          relatedLogs={[]}
          onSelectRelated={undefined}
        />
      )}
    </div>
  );
}

export default function ConversationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12 text-text-muted text-sm">
          Loading conversations...
        </div>
      }
    >
      <ConversationsPageContent />
    </Suspense>
  );
}
