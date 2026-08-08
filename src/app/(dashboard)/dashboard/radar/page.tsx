"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card } from "@/shared/components";
import { shouldAutoSyncOnOpen } from "@/lib/radar/autoSync";
import { isValidSupporterKeyFormat } from "@/lib/radar/supporterKey";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RadarMeta {
  version: string;
  tier: string;
  fetchedAt: string;
}

interface RadarMergedEntry {
  provider: string;
  modelId: string;
  displayName: string;
  monthlyTokens: number;
  creditTokens: number;
  freeType: string;
  poolKey: string | null;
  tos: string;
  trainsOnPrompts?: boolean;
  enabled?: boolean;
  origin: "baseline" | "radar" | "local";
  disabledBy?: "radar";
  // Extended feed fields (present when origin=radar)
  contextWindow?: number | null;
  capabilities?: { tools: boolean; vision: boolean; thinking: boolean };
  budget?: { kind: string; tokensPerMonth?: number; poolId?: string };
  limits?: { rpm: number | null; rpd: number | null; tpm: number | null; tpd: number | null };
  setup?: { keyUrl: string | null; steps: string[] } | null;
}

type PageState = "flag_off" | "optin_pending" | "empty" | "populated";

/** D28 — referral links / free credits. Client-side mirror of RadarReferral. */
interface RadarReferralItem {
  provider: string;
  url: string;
  kind: "fixo" | "campanha";
  validUntil: string | null;
  requiredAction: string | null;
  isDefault: boolean;
}

interface RadarReferralsState {
  fixed: RadarReferralItem[];
  campaigns: RadarReferralItem[];
  tier: string | null;
}

type RadarTabId = "catalog" | "referrals";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Determine the page state from the fetch result. */
export function resolveRadarPageState(
  flagOn: boolean,
  optedIn: boolean,
  hasEntries: boolean,
): PageState {
  if (!flagOn) return "flag_off";
  if (!optedIn) return "optin_pending";
  if (!hasEntries) return "empty";
  return "populated";
}

/** Relative time string (e.g., "3h ago", "2d ago"). */
function relativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  if (diffMs < 0) return "just now";
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/** Format token count as human-readable. */
function formatTokens(n: number): string {
  if (n === 0) return "rate-only";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/** Budget display string. */
function budgetLabel(entry: RadarMergedEntry): string {
  if (entry.budget?.kind === "shared_pool") {
    return `shared (${formatTokens(entry.budget.tokensPerMonth ?? entry.monthlyTokens)}/mo)`;
  }
  if (entry.budget?.kind === "rate_only" || entry.monthlyTokens === 0) return "rate-only";
  return `${formatTokens(entry.monthlyTokens)}/mo`;
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function RadarPage() {
  const t = useTranslations("radarPage");
  const [entries, setEntries] = useState<RadarMergedEntry[]>([]);
  const [meta, setMeta] = useState<RadarMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [optIn, setOptIn] = useState<boolean | null>(null);
  const [activating, setActivating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<RadarTabId>("catalog");
  const [referrals, setReferrals] = useState<RadarReferralsState>({
    fixed: [],
    campaigns: [],
    tier: null,
  });
  // F4/T7 — "get a supporter key" outbound links, relayed by
  // GET /api/radar/settings (server-resolved, see src/lib/radar/links.ts).
  // Never hardcoded here: this component must never embed an external URL
  // literal (see tests/unit/radar-referrals-page-tab.test.ts).
  const [contributorClaimUrl, setContributorClaimUrl] = useState<string | null>(null);
  const [supporterPlansUrl, setSupporterPlansUrl] = useState<string | null>(null);

  // Paste-key activation — the primary path on the activation screen: paste
  // an already-obtained supporter key (`omr_` + 40 hex) to activate opt-in
  // AND the supporter tier in a single POST. `hasSupporterKey`/
  // `supporterKeyMasked` mirror GET /api/radar/settings so a key set out of
  // band (e.g. a direct curl call before this UI existed) shows the masked
  // form instead of an empty input — the raw key is never displayed.
  const [keyInput, setKeyInput] = useState("");
  const [keySubmitting, setKeySubmitting] = useState(false);
  const [hasSupporterKey, setHasSupporterKey] = useState(false);
  const [supporterKeyMasked, setSupporterKeyMasked] = useState<string | null>(null);
  const [showKeyForm, setShowKeyForm] = useState(false);

  // Fetch catalog
  const fetchCatalog = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/radar/catalog");
      if (res.status === 404) {
        // Flag off — treat as not found
        setOptIn(false);
        setEntries([]);
        setMeta(null);
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEntries(data.entries || []);
      setMeta(data.meta || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorLoading"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  // D28 — fetch the referral links section ("Pegue seus créditos grátis").
  // Best-effort: flag off => 404, no cache => empty shape; either way this
  // never blocks rendering of the rest of the page.
  const fetchReferrals = useCallback(async () => {
    try {
      const res = await fetch("/api/radar/referrals");
      if (!res.ok) return;
      const data = await res.json();
      setReferrals({
        fixed: Array.isArray(data.fixed) ? data.fixed : [],
        campaigns: Array.isArray(data.campaigns) ? data.campaigns : [],
        tier: data.tier ?? null,
      });
    } catch {
      // Best-effort only.
    }
  }, []);

  // Fetch settings to determine opt-in state (GET /api/radar/settings — FIX 3:
  // previously there was no settings GET, so an already-opted-in operator saw
  // the activation screen on every reload).
  const fetchSettings = useCallback(async () => {
    try {
      const settingsRes = await fetch("/api/radar/settings");
      if (settingsRes.status === 404) {
        // Flag off
        setOptIn(false);
        return;
      }
      if (!settingsRes.ok) throw new Error(`HTTP ${settingsRes.status}`);
      const settingsData = await settingsRes.json();
      setOptIn(settingsData.optIn === true);
      setHasSupporterKey(settingsData.hasSupporterKey === true);
      setSupporterKeyMasked(
        typeof settingsData.supporterKeyMasked === "string" ? settingsData.supporterKeyMasked : null,
      );
      // F4/T7 — best-effort: keep whatever we already had if the field is
      // absent (older cached response shape), never fall back to a literal.
      if (typeof settingsData.contributorClaimUrl === "string") {
        setContributorClaimUrl(settingsData.contributorClaimUrl);
      }
      if (typeof settingsData.supporterPlansUrl === "string") {
        setSupporterPlansUrl(settingsData.supporterPlansUrl);
      }

      if (settingsData.optIn === true) {
        // Already opted in — load the catalog now so the populated/empty
        // state renders immediately instead of waiting for a manual sync.
        await fetchCatalog();
        // D28 — load the referral links in parallel; best-effort, never
        // blocks the catalog state above.
        void fetchReferrals();
      }
    } catch {
      setOptIn(null);
    } finally {
      setLoading(false);
    }
  }, [fetchCatalog, fetchReferrals]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Sync (defined before handleActivate which depends on it)
  const handleSync = useCallback(async () => {
    setSyncing(true);
    setError("");
    try {
      const res = await fetch("/api/radar/sync", { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status === "updated" || data.status === "stale") {
        await fetchCatalog();
        void fetchReferrals();
      } else if (data.status === "error" || data.status === "too_large") {
        // "too_large" reuses the generic sync-failed copy — the feed exceeded the
        // client-side size cap (10MB), which is operationally the same as any
        // other sync failure from the operator's point of view.
        setError(data.reason || t("syncFailed"));
      } else if (data.status === "disabled") {
        setError(t("flagDisabled"));
      } else if (data.status === "opt_out") {
        setOptIn(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("syncFailed"));
    } finally {
      setSyncing(false);
    }
  }, [t, fetchCatalog, fetchReferrals]);

  // Auto-sync on open: when the operator is already opted in and the cached
  // feed is stale (or absent), refresh it automatically once per mount so the
  // page always shows current data without requiring the manual Sync button
  // (spec: dados atualizados a cada abrir da página). The ref guards against
  // re-firing when `meta` updates after the sync itself.
  const autoSyncFiredRef = useRef(false);
  useEffect(() => {
    if (loading || syncing || optIn !== true || autoSyncFiredRef.current) return;
    if (!shouldAutoSyncOnOpen(meta?.fetchedAt ?? null, Date.now())) return;
    autoSyncFiredRef.current = true;
    void handleSync();
  }, [loading, syncing, optIn, meta, handleSync]);

  // Activate opt-in
  const handleActivate = useCallback(async () => {
    setActivating(true);
    try {
      const res = await fetch("/api/radar/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optIn: true }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOptIn(true);
      // After activation, trigger a sync
      await handleSync();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("activationFailed"));
    } finally {
      setActivating(false);
    }
  }, [t, handleSync]);

  // Activate with a pasted supporter key — the primary path on this screen.
  // Submitting a key both sets it AND opts in, in a single POST (pasting a
  // key unlocks the activation screen). Client-side format validation is a
  // UX nicety only — the server (Zod) always revalidates.
  const handleSubmitKey = useCallback(async () => {
    setError("");
    const trimmed = keyInput.trim();
    if (!isValidSupporterKeyFormat(trimmed)) {
      setError(t("keyInvalidFormatError"));
      return;
    }
    setKeySubmitting(true);
    try {
      const res = await fetch("/api/radar/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optIn: true, supporterKey: trimmed }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setOptIn(true);
      setHasSupporterKey(true);
      setSupporterKeyMasked(typeof data.supporterKey === "string" ? data.supporterKey : null);
      setKeyInput("");
      setShowKeyForm(false);
      // After activation, trigger a sync so the live tier catalog loads.
      await handleSync();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("activationFailed"));
    } finally {
      setKeySubmitting(false);
    }
  }, [keyInput, t, handleSync]);

  // Determine effective state
  const flagOn = optIn !== false || entries.length > 0 || meta !== null;
  const pageState = resolveRadarPageState(
    optIn !== false, // if we got a 404, optIn=false => flag off
    optIn === true,
    entries.length > 0 && meta !== null,
  );

  // Flag off — render not-found
  if (pageState === "flag_off" && !loading) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-text-muted mt-1">{t("subtitle")}</p>
        </div>
        {pageState === "populated" && (
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-violet-500 text-violet-400 hover:bg-violet-500/10 transition-colors disabled:opacity-50"
          >
            {syncing ? t("syncing") : t("syncNow")}
          </button>
        )}
      </div>

      {/* Feed freshness header */}
      {meta && (
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span>
            {t("feedVersion")}: <span className="font-mono">{meta.version}</span>
          </span>
          <span>
            {t("feedTier")}:{" "}
            <span className={meta.tier === "live" ? "text-green-400" : "text-amber-400"}>
              {meta.tier === "live" ? t("tierLive") : t("tierCommunity")}
            </span>
          </span>
          <span>
            {t("feedFetched")}: {relativeTime(meta.fetchedAt)}
          </span>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted">{t("loading")}</div>
        </div>
      ) : (
        <>
          {/* Opt-in pending */}
          {pageState === "optin_pending" && (
            <Card>
              <div className="flex flex-col items-center gap-6 py-8 text-center max-w-lg mx-auto">
                <div className="text-4xl">📡</div>
                <h2 className="text-xl font-semibold">{t("activateTitle")}</h2>
                <p className="text-text-muted">{t("activateDescription")}</p>
                <div className="flex flex-col gap-2 text-sm text-text-muted text-left w-full">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{t("privacyNoUpload")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{t("privacyOnlySigned")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{t("privacyLocalOnly")}</span>
                  </div>
                </div>

                {/* Paste-key activation — primary path: pasting an already-obtained
                    supporter key both sets it AND opts in (unlocks this screen).
                    The raw key is NEVER displayed — once set, only the masked
                    form (supporterKeyMasked) is shown, with a "change key" escape
                    hatch to paste a new one. */}
                <div className="w-full flex flex-col gap-3 text-left">
                  <p className="text-sm font-medium">{t("keySectionTitle")}</p>
                  {hasSupporterKey && !showKeyForm ? (
                    <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border">
                      <span className="font-mono text-sm text-text-muted">
                        {supporterKeyMasked}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowKeyForm(true)}
                        className="text-sm text-violet-400 hover:underline shrink-0"
                      >
                        {t("changeKeyButton")}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="omr_..."
                        aria-label={t("keySectionTitle")}
                        className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <button
                        type="button"
                        onClick={handleSubmitKey}
                        disabled={keySubmitting || keyInput.trim().length === 0}
                        className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 shrink-0"
                      >
                        {keySubmitting ? t("activating") : t("activateWithKeyButton")}
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-full h-px bg-border" />

                <button
                  onClick={handleActivate}
                  disabled={activating}
                  className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {activating ? t("activating") : t("activateButton")}
                </button>

                {/* F4/T7 — "get a supporter key" outbound links. Both open in a
                    new tab; neither one carries a price/value (D14 — the
                    only place pricing lives is the destination page). */}
                {contributorClaimUrl && supporterPlansUrl && (
                  <div className="w-full pt-6 mt-2 border-t border-border flex flex-col gap-3">
                    <p className="text-sm font-medium">{t("claimSectionTitle")}</p>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <a
                        href={contributorClaimUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 text-sm font-medium text-center rounded-lg border border-violet-500 text-violet-400 hover:bg-violet-500/10 transition-colors"
                      >
                        {t("contributorButton")}
                      </a>
                      <a
                        href={supporterPlansUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 text-sm font-medium text-center rounded-lg border border-violet-500 text-violet-400 hover:bg-violet-500/10 transition-colors"
                      >
                        {t("supporterButton")}
                      </a>
                    </div>
                    <p className="text-xs text-text-muted text-left">{t("contributorHint")}</p>
                    <p className="text-xs text-text-muted text-left">{t("supporterHint")}</p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* D28 — tab bar. Only shown once opted in (empty/populated) — the
              activation gate above is a single full-screen step, not a tab. */}
          {(pageState === "empty" || pageState === "populated") && (
            <div className="flex gap-2 border-b border-border" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === "catalog"}
                onClick={() => setActiveTab("catalog")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "catalog"
                    ? "border-violet-500 text-violet-400"
                    : "border-transparent text-text-muted hover:text-text-main"
                }`}
              >
                {t("catalogTab")}
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "referrals"}
                onClick={() => setActiveTab("referrals")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "referrals"
                    ? "border-violet-500 text-violet-400"
                    : "border-transparent text-text-muted hover:text-text-main"
                }`}
              >
                {t("freeCreditsTab")}
              </button>
            </div>
          )}

          {/* Free credits tab (D28 — referral links) */}
          {(pageState === "empty" || pageState === "populated") && activeTab === "referrals" && (
            <div className="flex flex-col gap-6">
              <p className="text-sm text-text-muted">{t("freeCreditsSubtitle")}</p>

              {referrals.fixed.length === 0 ? (
                <Card>
                  <p className="text-text-muted text-center py-6">{t("fixedLinksEmpty")}</p>
                </Card>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {referrals.fixed.map((referral) => (
                    <Card key={`${referral.provider}:fixed`} padding="sm">
                      <div className="flex flex-col gap-2">
                        <span className="font-medium">{referral.provider}</span>
                        {referral.requiredAction && (
                          <p className="text-xs text-text-muted">
                            {t("requiredActionLabel")} {referral.requiredAction}
                          </p>
                        )}
                        <a
                          href={referral.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-violet-400 hover:underline w-fit"
                        >
                          {t("claimButton")}
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3">{t("campaignsTitle")}</h3>
                {referrals.campaigns.length === 0 ? (
                  <Card>
                    <p className="text-text-muted text-center py-6">
                      {referrals.tier === "community"
                        ? t("campaignsUpsellCommunity")
                        : t("campaignsEmpty")}
                    </p>
                  </Card>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {referrals.campaigns.map((referral, idx) => (
                      <Card key={`${referral.provider}:campaign:${idx}`} padding="sm">
                        <div className="flex flex-col gap-2">
                          <span className="font-medium">{referral.provider}</span>
                          {referral.requiredAction && (
                            <p className="text-xs text-text-muted">
                              {t("requiredActionLabel")} {referral.requiredAction}
                            </p>
                          )}
                          {referral.validUntil && (
                            <p className="text-xs text-amber-400">
                              {t("campaignsValidUntil", {
                                date: new Date(referral.validUntil).toLocaleDateString(),
                              })}
                            </p>
                          )}
                          <a
                            href={referral.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-violet-400 hover:underline w-fit"
                          >
                            {t("claimButton")}
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                          </a>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty cache — opted in but no data yet */}
          {pageState === "empty" && activeTab === "catalog" && (
            <Card>
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <p className="text-text-muted">{t("emptyState")}</p>
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {syncing ? t("syncing") : t("syncCta")}
                </button>
              </div>
            </Card>
          )}

          {/* Populated catalog table */}
          {pageState === "populated" && activeTab === "catalog" && (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-text-muted border-b border-border">
                      <th className="pb-3 font-medium">{t("colProvider")}</th>
                      <th className="pb-3 font-medium">{t("colModel")}</th>
                      <th className="pb-3 font-medium">{t("colQuota")}</th>
                      <th className="pb-3 font-medium">{t("colContext")}</th>
                      <th className="pb-3 font-medium">{t("colCapabilities")}</th>
                      <th className="pb-3 font-medium">{t("colTos")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr
                        key={`${entry.provider}:${entry.modelId}`}
                        className={`border-b border-border/50 last:border-b-0 ${
                          entry.enabled === false ? "opacity-50" : ""
                        }`}
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{entry.provider}</span>
                            {entry.origin === "radar" && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 font-medium">
                                {t("newBadge")}
                              </span>
                            )}
                            {entry.setup?.keyUrl && (
                              <Link
                                href={`/dashboard/radar/setup?provider=${encodeURIComponent(entry.provider)}`}
                                className="text-xs text-violet-400 hover:underline"
                                title={t("setupGuide")}
                              >
                                ⚙
                              </Link>
                            )}
                          </div>
                          {entry.enabled === false && entry.disabledBy === "radar" && (
                            <p className="text-xs text-red-400 mt-0.5">{t("disabledByFeed")}</p>
                          )}
                        </td>
                        <td className="py-3 text-text-muted text-sm font-mono truncate max-w-[200px]">
                          {entry.displayName}
                        </td>
                        <td className="py-3 text-sm">{budgetLabel(entry)}</td>
                        <td className="py-3 text-sm text-text-muted">
                          {entry.contextWindow
                            ? `${(entry.contextWindow / 1000).toFixed(0)}K`
                            : "—"}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            {entry.capabilities?.tools && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">
                                {t("capTools")}
                              </span>
                            )}
                            {entry.capabilities?.vision && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400">
                                {t("capVision")}
                              </span>
                            )}
                            {entry.capabilities?.thinking && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                                {t("capThinking")}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              entry.tos === "ok"
                                ? "bg-green-500/10 text-green-400"
                                : entry.tos === "caution"
                                  ? "bg-yellow-500/10 text-yellow-400"
                                  : entry.tos === "avoid"
                                    ? "bg-red-500/10 text-red-400"
                                    : "bg-gray-500/10 text-gray-400"
                            }`}
                          >
                            {entry.tos}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
