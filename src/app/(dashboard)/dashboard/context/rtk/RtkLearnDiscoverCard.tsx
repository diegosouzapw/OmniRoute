"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface NoiseCandidate {
  pattern: string;
  hits: number;
}

interface SuggestedFilter {
  id: string;
  label: string;
  description: string;
  [key: string]: unknown;
}

/**
 * RTK Learn & Discover card (F2.1 / Item 2).
 *
 * Surfaces the two read-only suggestion endpoints over the opt-in raw-output sample
 * store:
 *   - Discover: GET /api/context/rtk/discover  → ranked repeated-noise candidates.
 *   - Learn:    GET /api/context/rtk/learn?command=X → a suggested filter draft.
 *
 * Suggestions only — the operator reviews the output and saves filters via the
 * existing filter trust path. Fail-soft: any error shows an inline message.
 */
export default function RtkLearnDiscoverCard() {
  const t = useTranslations("contextRtk");

  const [discovering, setDiscovering] = useState(false);
  const [candidates, setCandidates] = useState<NoiseCandidate[] | null>(null);
  const [discoverCount, setDiscoverCount] = useState(0);

  const [command, setCommand] = useState("");
  const [learning, setLearning] = useState(false);
  const [suggested, setSuggested] = useState<SuggestedFilter | null>(null);
  const [learnCount, setLearnCount] = useState(0);

  const [error, setError] = useState<string | null>(null);

  async function runDiscover() {
    setDiscovering(true);
    setError(null);
    try {
      const res = await fetch("/api/context/rtk/discover");
      if (!res.ok) throw new Error(String(res.status));
      const body = (await res.json()) as { sampleCount: number; candidates: NoiseCandidate[] };
      setDiscoverCount(body.sampleCount);
      setCandidates(Array.isArray(body.candidates) ? body.candidates : []);
    } catch {
      setError(t("suggestionError"));
      setCandidates(null);
    } finally {
      setDiscovering(false);
    }
  }

  async function runLearn() {
    if (!command.trim()) return;
    setLearning(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/context/rtk/learn?command=${encodeURIComponent(command.trim())}`
      );
      if (!res.ok) throw new Error(String(res.status));
      const body = (await res.json()) as { sampleCount: number; filter: SuggestedFilter };
      setLearnCount(body.sampleCount);
      setSuggested(body.filter ?? null);
    } catch {
      setError(t("suggestionError"));
      setSuggested(null);
    } finally {
      setLearning(false);
    }
  }

  return (
    <section
      className="rounded-lg border border-border bg-surface p-4"
      data-testid="rtk-learn-discover"
    >
      <h2 className="text-sm font-semibold text-text-main">{t("learnDiscoverTitle")}</h2>
      <p className="mt-1 text-xs text-text-muted">{t("learnDiscoverDesc")}</p>

      {error && (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400" data-testid="rtk-ld-error">
          {error}
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* ── Discover ─────────────────────────────────────────────── */}
        <div>
          <h3 className="text-xs font-medium text-text-main">{t("discoverHeading")}</h3>
          <button
            type="button"
            onClick={runDiscover}
            disabled={discovering}
            data-testid="rtk-discover-button"
            className="mt-2 rounded border border-border px-2.5 py-1 text-xs font-medium text-text-main hover:bg-surface-hover disabled:opacity-50"
          >
            {discovering ? t("discoverScanning") : t("discoverButton")}
          </button>

          {candidates !== null && (
            <div className="mt-3" data-testid="rtk-discover-results">
              <p className="text-[11px] text-text-muted">
                {t("discoverSamples", { count: discoverCount })}
              </p>
              {candidates.length === 0 ? (
                <p className="mt-1 text-[11px] text-text-muted">{t("discoverEmpty")}</p>
              ) : (
                <ul className="mt-2 flex flex-col gap-1">
                  {candidates.slice(0, 20).map((candidate, index) => (
                    <li
                      key={`${candidate.pattern}-${index}`}
                      className="flex items-start justify-between gap-2 text-[11px]"
                    >
                      <code className="min-w-0 truncate text-text-main">{candidate.pattern}</code>
                      <span className="shrink-0 text-text-muted">
                        {t("discoverHits", { hits: candidate.hits })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* ── Learn ────────────────────────────────────────────────── */}
        <div>
          <h3 className="text-xs font-medium text-text-main">{t("learnHeading")}</h3>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder={t("learnCommandPlaceholder")}
              data-testid="rtk-learn-command"
              className="min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1 text-xs text-text-main"
            />
            <button
              type="button"
              onClick={runLearn}
              disabled={learning || !command.trim()}
              data-testid="rtk-learn-button"
              className="shrink-0 rounded border border-border px-2.5 py-1 text-xs font-medium text-text-main hover:bg-surface-hover disabled:opacity-50"
            >
              {t("learnButton")}
            </button>
          </div>

          {suggested === null ? (
            <p className="mt-3 text-[11px] text-text-muted">{t("learnEmpty")}</p>
          ) : (
            <div className="mt-3" data-testid="rtk-learn-results">
              <p className="text-[11px] text-text-muted">
                {t("learnSamplesUsed", { count: learnCount })}
              </p>
              <pre className="mt-2 max-h-48 overflow-auto rounded bg-surface-hover p-2 text-[10px] text-text-main">
                {JSON.stringify(suggested, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
