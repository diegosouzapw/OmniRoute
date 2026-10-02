"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

import type { AgentSessionRecentUsage, AgentSessionRecord } from "@/lib/db/agentSessions";
import { Modal, Select } from "@/shared/components";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import { formatDateTime, splitTokens } from "./format";
import { CacheTokens, useTokenLabels } from "./TokenFigures";

const PAGE_SIZE = 25;
const SORT_FIELDS = ["lastSeen", "firstSeen", "requests", "tokens", "cost"] as const;
type SessionSort = (typeof SORT_FIELDS)[number];

interface SessionsPanelProps {
  /** Report filters as a query string; paging and sorting are added here. */
  query: string;
  /** Bumped by the page's refresh button. */
  refreshToken: number;
}

interface SessionDetail {
  session: AgentSessionRecord;
  recentRequests: AgentSessionRecentUsage[];
}

function SessionDetailModal({ sessionId, onClose }: { sessionId: string; onClose: () => void }) {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  const [detail, setDetail] = useState<SessionDetail | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/reports/sessions/${encodeURIComponent(sessionId)}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setDetail)
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, [sessionId]);

  const session = detail?.session;
  const tokens = session && splitTokens(session.tokens);
  const facts: Array<[string, ReactNode]> = session
    ? [
        [t("member"), session.apiKeyName ?? session.apiKeyId ?? "-"],
        [t("project"), session.projectName ?? "-"],
        [t("colBranch"), session.gitBranch ?? "-"],
        [t("colCost"), formatCost(session.costUsd)],
        [t("colRequests"), `${session.requestCount} (${session.errorCount} ${t("colErrors")})`],
        [tokenLabels.input, fmtCompact(tokens.input)],
        [tokenLabels.output, fmtCompact(tokens.output)],
        [tokenLabels.cache, <CacheTokens key="cache" split={tokens} />],
        [t("colFirstSeen"), formatDateTime(session.firstSeenAt)],
        [t("colLastActive"), formatDateTime(session.lastSeenAt)],
      ]
    : [];
  return (
    <Modal isOpen onClose={onClose} size="xl" title={t("sessionDetail")}>
      {!session ? (
        <p className="py-8 text-center text-sm text-text-muted">
          {failed ? t("loadFailed") : t("loading")}
        </p>
      ) : (
        <div className="space-y-4 text-sm">
          <dl className="grid grid-cols-2 gap-3 rounded-lg border border-border p-3 sm:grid-cols-4">
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt className="text-xs uppercase text-text-muted">{term}</dt>
                <dd className="font-medium text-text-main">{value}</dd>
              </div>
            ))}
          </dl>
          {session.projectPath && (
            <p className="truncate font-mono text-xs text-text-muted">{session.projectPath}</p>
          )}
          <h4 className="font-semibold">{t("recentRequests")}</h4>
          <div className="max-h-[50vh] overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/30 text-left text-text-muted">
                  <th className="py-2 px-2">{t("colTime")}</th>
                  <th className="py-2 px-2">{t("provider")}</th>
                  <th className="py-2 px-2">{t("colModel")}</th>
                  <th className="py-2 px-2 text-right">{tokenLabels.input}</th>
                  <th className="py-2 px-2 text-right">{tokenLabels.output}</th>
                  <th className="py-2 px-2 text-right">{tokenLabels.cache}</th>
                  <th className="py-2 px-2 text-right">{t("colLatency")}</th>
                  <th className="py-2 px-2">{t("colStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {detail.recentRequests.map((request) => (
                  <tr key={request.id} className="border-b border-border/10">
                    <td className="py-1.5 px-2 text-text-muted">
                      {formatDateTime(request.timestamp)}
                    </td>
                    <td className="py-1.5 px-2">{request.provider ?? "-"}</td>
                    <td className="py-1.5 px-2 font-mono">{request.model ?? "-"}</td>
                    <td className="py-1.5 px-2 text-right tabular-nums">
                      {fmtCompact(splitTokens(request.tokens).input)}
                    </td>
                    <td className="py-1.5 px-2 text-right tabular-nums">
                      {fmtCompact(splitTokens(request.tokens).output)}
                    </td>
                    <td className="py-1.5 px-2 text-right tabular-nums">
                      <CacheTokens split={splitTokens(request.tokens)} />
                    </td>
                    <td className="py-1.5 px-2 text-right tabular-nums">{request.latencyMs}ms</td>
                    <td
                      className={`py-1.5 px-2 ${request.success ? "text-green-500" : "text-red-500"}`}
                    >
                      {request.status ?? (request.success ? "ok" : "error")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default function SessionsPanel({ query, refreshToken }: SessionsPanelProps) {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  const [sort, setSort] = useState<SessionSort>("lastSeen");
  const [desc, setDesc] = useState(true);
  // Paging is tied to the query it was chosen for, so a filter change starts again at page 1.
  const [paging, setPaging] = useState({ query, page: 0 });
  const page = paging.query === query ? paging.page : 0;
  const [data, setData] = useState<{ sessions: AgentSessionRecord[]; total: number } | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(query);
    params.set("sort", sort);
    params.set("order", desc ? "desc" : "asc");
    params.set("limit", String(PAGE_SIZE));
    params.set("offset", String(page * PAGE_SIZE));
    const controller = new AbortController();
    fetch(`/api/reports/sessions?${params}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((next) => next && setData(next))
      .catch(() => {
        // Aborted by a newer query or a failed load; the last page stays visible.
      });
    return () => controller.abort();
  }, [query, sort, desc, page, refreshToken]);

  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-xs text-text-muted">{t("sessionsWindowHint")}</p>
        <div className="flex items-end gap-2">
          <Select
            label={t("sortBy")}
            value={sort}
            onChange={(event) => setSort(event.target.value as SessionSort)}
            options={SORT_FIELDS.map((field) => ({ value: field, label: t(`sort_${field}`) }))}
          />
          <button
            type="button"
            onClick={() => setDesc((current) => !current)}
            className="h-9 rounded-lg border border-border px-3 text-xs"
            aria-label={desc ? t("sortDesc") : t("sortAsc")}
          >
            {desc ? t("sortDesc") : t("sortAsc")}
          </button>
        </div>
      </div>

      {data && data.sessions.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-muted">{t("noData")}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-left text-xs uppercase tracking-wider text-text-muted">
                <th className="py-2 px-3">{t("member")}</th>
                <th className="py-2 px-3">{t("project")}</th>
                <th className="py-2 px-3">{t("client")}</th>
                <th className="py-2 px-3">{t("colBranch")}</th>
                <th className="py-2 px-3 text-right">{t("colRequests")}</th>
                <th className="py-2 px-3 text-right">{tokenLabels.input}</th>
                <th className="py-2 px-3 text-right">{tokenLabels.output}</th>
                <th className="py-2 px-3 text-right">{tokenLabels.cache}</th>
                <th className="py-2 px-3 text-right">{t("colCost")}</th>
                <th className="py-2 px-3">{t("colLastActive")}</th>
                <th className="py-2 px-3" />
              </tr>
            </thead>
            <tbody>
              {(data?.sessions ?? []).map((session) => (
                <tr
                  key={session.id}
                  className="border-b border-border/10 transition-colors hover:bg-surface/20"
                >
                  <td className="py-2.5 px-3 font-medium">
                    {session.apiKeyName ?? session.apiKeyId ?? "-"}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-xs">{session.projectName ?? "-"}</td>
                  <td className="py-2.5 px-3 text-text-muted">{session.client ?? "-"}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-text-muted">
                    {session.gitBranch ?? "-"}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums">{session.requestCount}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums">
                    {fmtCompact(splitTokens(session.tokens).input)}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums">
                    {fmtCompact(splitTokens(session.tokens).output)}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums">
                    <CacheTokens split={splitTokens(session.tokens)} />
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-green-500">
                    {formatCost(session.costUsd)}
                  </td>
                  <td className="py-2.5 px-3 text-text-muted">
                    {formatDateTime(session.lastSeenAt)}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedId(session.id)}
                      className="rounded px-2 py-1 text-xs text-primary hover:bg-primary/10"
                    >
                      {t("details")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border/30 pt-3 text-xs">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => setPaging({ query, page: page - 1 })}
          className="rounded border border-border px-3 py-1 disabled:opacity-40"
        >
          {t("previous")}
        </button>
        <span className="text-text-muted">{t("pageOf", { page: page + 1, pages, total })}</span>
        <button
          type="button"
          disabled={page + 1 >= pages}
          onClick={() => setPaging({ query, page: page + 1 })}
          className="rounded border border-border px-3 py-1 disabled:opacity-40"
        >
          {t("next")}
        </button>
      </div>

      {selectedId && (
        <SessionDetailModal sessionId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
