"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PROVIDER_COLORS, getHttpStatusStyle } from "@/shared/constants/colors";
import { formatTime } from "@/shared/utils/formatting";
import { copyToClipboard } from "@/shared/utils/clipboard";
import RequestLoggerDetail from "@/shared/components/RequestLoggerDetail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";

interface ConversationRow {
  id: string;
  turnCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
  lastCallLogId: string | null;
  lastModel: string | null;
  lastProvider: string | null;
  lastStatus: number | null;
}

const DEFAULT_POLL_SECONDS = 5;
const POLL_STORAGE_KEY = "conversationsListPollSeconds";

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

function ConversationsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Read once on mount, mirroring dashboard/logs/page.tsx (#6830/#8354): re-reading the
  // live searchParams on every render re-fires the deep-link open effect right when the
  // panel closes and router.replace() strips the ?id= param.
  const [initialId] = useState(() => searchParams.get("id"));

  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const { emailsVisible } = useEmailPrivacyStore();
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailLoggingEnabled, setDetailLoggingEnabled] = useState(false);
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

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (document.visibilityState !== "visible") return;
      fetch("/api/conversations?limit=100", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (cancelled || !data) return;
          setConversations(Array.isArray(data.conversations) ? data.conversations : []);
          setTotal(typeof data.total === "number" ? data.total : 0);
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    load();
    const interval = setInterval(load, pollSeconds * 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [pollSeconds]);

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

  const openConversation = (row: ConversationRow) => {
    if (!row.lastCallLogId) return;
    openById(row.lastCallLogId).catch(() => {});
  };

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
                  <span className="font-mono text-xs text-text-muted shrink-0">
                    {row.turnCount} turns
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm text-text-main truncate">
                      {row.lastModel ?? "—"}
                    </span>
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
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-text-main">
                      {row.turnCount}
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
          onNavigateToLog={openById}
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
