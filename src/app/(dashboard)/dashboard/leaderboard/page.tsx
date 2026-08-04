"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/shared/components";

type LeaderboardScope = "global" | "weekly" | "monthly" | "tokens_shared";

interface LeaderboardEntry {
  apiKeyId: string;
  score: number;
}

const SCOPE_LABEL_KEYS: Record<LeaderboardScope, string> = {
  global: "leaderboardScopes.allTime",
  weekly: "leaderboardScopes.weekly",
  monthly: "leaderboardScopes.monthly",
  tokens_shared: "leaderboardScopes.tokensShared",
};

const MEDAL_COLORS = [
  "from-amber-400 to-yellow-600", // gold
  "from-gray-300 to-gray-500", // silver
  "from-amber-600 to-orange-800", // bronze
];

const MEDAL_EMOJI = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const t = useTranslations("common");
  const tg = useTranslations("gamification");
  const locale = useLocale();
  const [scope, setScope] = useState<LeaderboardScope>("global");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const eventSourceRef = useRef<EventSource | null>(null);

  const fetchLeaderboard = useCallback(
    async (s: LeaderboardScope) => {
      try {
        const res = await fetch(`/api/gamification/leaderboard?scope=${s}&limit=50`);
        if (!res.ok) throw new Error(tg("leaderboardLoadFailed", { status: res.status }));
        const data = await res.json();
        setEntries(data.entries || []);
        setMyRank(data.myRank ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : tg("leaderboardLoadFailed"));
      } finally {
        setLoading(false);
      }
    },
    [tg]
  );

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void fetchLeaderboard(scope);
    }, 0);

    // SSE real-time updates
    const es = new EventSource(`/api/gamification/stream?scope=${scope}`);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "leaderboard" && data.scope === scope) {
          setEntries(data.entries || []);
        }
      } catch {
        // ignore parse errors from heartbeats
      }
    };

    es.onerror = () => {
      es.close();
      // Reconnect after 3s with exponential backoff
      setTimeout(() => {
        if (eventSourceRef.current === es) {
          fetchLeaderboard(scope);
        }
      }, 3000);
    };

    return () => {
      window.clearTimeout(loadTimer);
      es.close();
      eventSourceRef.current = null;
    };
  }, [scope, fetchLeaderboard]);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="flex flex-col gap-6">
      {/* Scope selector */}
      <div className="flex items-center gap-2 flex-wrap">
        {(Object.keys(SCOPE_LABEL_KEYS) as LeaderboardScope[]).map((s) => (
          <button
            key={s}
            onClick={() => {
              setLoading(true);
              setError("");
              setScope(s);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              scope === s
                ? "bg-violet-500 border-violet-500 text-white"
                : "border-border text-text-muted hover:text-text-main hover:border-violet-500/50"
            }`}
          >
            {tg(SCOPE_LABEL_KEYS[s])}
          </button>
        ))}
      </div>

      {/* Your Rank */}
      {myRank !== null && (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">{t("leaderboardYourRank")}</p>
              <p className="text-3xl font-bold mt-1">#{myRank}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-muted">{tg("scope")}</p>
              <p className="text-lg font-semibold">{tg(SCOPE_LABEL_KEYS[scope])}</p>
            </div>
          </div>
        </Card>
      )}

      {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted">{t("leaderboardLoading")}</div>
        </div>
      ) : (
        <>
          {/* Podium — Top 3 */}
          {top3.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {top3.map((entry, idx) => (
                <Card key={entry.apiKeyId} className="relative overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${MEDAL_COLORS[idx]}`}
                  />
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{MEDAL_EMOJI[idx]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-muted truncate">
                        {entry.apiKeyId.slice(0, 8)}...
                      </p>
                      <p className="text-2xl font-bold mt-1">
                        {entry.score.toLocaleString(locale)}
                      </p>
                      <p className="text-xs text-text-muted">
                        {scope === "tokens_shared" ? tg("tokensShared") : tg("points")}
                      </p>
                    </div>
                    <div className="text-5xl font-black text-text-muted/20">{idx + 1}</div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Rest of leaderboard table */}
          {rest.length > 0 && (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-text-muted border-b border-border">
                      <th className="pb-3 font-medium w-16">{tg("rank")}</th>
                      <th className="pb-3 font-medium">{tg("name")}</th>
                      <th className="pb-3 font-medium text-right">{tg("score")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rest.map((entry, idx) => (
                      <tr
                        key={entry.apiKeyId}
                        className="border-b border-border/50 last:border-b-0"
                      >
                        <td className="py-3 text-text-muted font-mono">{idx + 4}</td>
                        <td className="py-3 font-medium">{entry.apiKeyId.slice(0, 12)}...</td>
                        <td className="py-3 text-right font-mono">
                          {entry.score.toLocaleString(locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {entries.length === 0 && !error && (
            <Card>
              <div className="text-center py-12 text-text-muted">{tg("leaderboardEmpty")}</div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
