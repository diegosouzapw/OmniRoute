"use client";

import { useTranslations } from "next-intl";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  mergeDashboardSessions,
  type DashboardSession,
  type ExclusiveDashboardSession,
  type RecentSessionForDashboard,
} from "@/lib/sessionObservability";
import { Card } from "@/shared/components";

type SessionsResponse = {
  sessions: RecentSessionForDashboard[];
  exclusiveSessions: ExclusiveDashboardSession[];
};

const EMPTY_DATA: SessionsResponse = {
  sessions: [],
  exclusiveSessions: [],
};

function isLeaseBackedSession(session: DashboardSession): session is ExclusiveDashboardSession {
  return "leaseBacked" in session && session.leaseBacked;
}

export default function SessionsTab() {
  const t = useTranslations("usage");
  const tCommon = useTranslations("common");
  const [data, setData] = useState<SessionsResponse>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);

  const loadSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/sessions");
      if (res.ok) {
        const next = await res.json();
        setData({
          sessions: Array.isArray(next.sessions) ? next.sessions : [],
          exclusiveSessions: Array.isArray(next.exclusiveSessions) ? next.exclusiveSessions : [],
        });
      }
    } catch {
      // A failed background poll leaves the last successful Sessions snapshot visible.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await loadSessions();
    })();
    const interval = setInterval(loadSessions, 5000);
    return () => clearInterval(interval);
  }, [loadSessions]);

  const displaySessions = useMemo(() => {
    return mergeDashboardSessions(data.exclusiveSessions, data.sessions);
  }, [data.exclusiveSessions, data.sessions]);

  const formatAge = (ms: number | null) => {
    if (ms == null) return t("notAvailableSymbol");
    if (ms < 60000) return t("durationSecondsShort", { value: Math.floor(ms / 1000) });
    if (ms < 3600000) return t("durationMinutesShort", { value: Math.floor(ms / 60000) });
    return t("durationHoursShort", { value: Math.floor(ms / 3600000) });
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            fingerprint
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("activeSessions")}</h3>
          <p className="text-sm text-text-muted">{t("sessionsTrackedHint")}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span
              className="text-sm font-semibold tabular-nums text-cyan-400"
              data-testid="session-count"
            >
              {displaySessions.length}
            </span>
          </span>
        </div>
      </div>

      {displaySessions.length === 0 ? (
        <div className="text-center py-8 text-text-muted">
          <span
            className="material-symbols-outlined text-[40px] mb-2 block opacity-40"
            aria-hidden="true"
          >
            fingerprint
          </span>
          <p className="text-sm">{t("noSessions")}</p>
          <p className="text-xs mt-1">{t("sessionsHint")}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-2 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {t("session")}
                </th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {t("age")}
                </th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {t("requests")}
                </th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {t("connection")}
                </th>
              </tr>
            </thead>
            <tbody>
              {displaySessions.map((s) => {
                const leaseBacked = isLeaseBackedSession(s);
                return (
                  <tr
                    key={s.sessionId}
                    className="border-b border-border/10 hover:bg-surface/20 transition-colors"
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-xs px-2 py-1 rounded bg-surface/40 text-text-muted"
                          title={s.sessionId}
                        >
                          {s.sessionId.slice(0, 12)}…
                        </span>
                        {leaseBacked && s.active && (
                          <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full border text-green-400 border-green-500/30 bg-green-500/10">
                            {tCommon("active")}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-text-muted tabular-nums">
                      {formatAge(s.ageMs)}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="font-semibold tabular-nums">{s.requestCount}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      {s.connectionId ? (
                        <span className="text-xs font-mono text-cyan-400" title={s.connectionId}>
                          {(leaseBacked && s.connectionName) || s.connectionId.slice(0, 10)}
                        </span>
                      ) : (
                        <span className="text-text-muted/40">{t("notAvailableSymbol")}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
