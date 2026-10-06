"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/shared/components";
import { shouldAutoSyncOnOpen } from "@/lib/radar/autoSync";
import { isValidSupporterKeyFormat } from "@/lib/radar/supporterKey";
import { RadarAccessExplainer } from "./RadarAccessExplainer";
import { RadarCatalogTable, type RadarMergedEntry } from "./RadarCatalogTable";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RadarMeta {
  version: string;
  tier: string;
  fetchedAt: string;
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
  hasEntries: boolean
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

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function RadarPage() {
  const t = useTranslations("radarPage");
  const [entries, setEntries] = useState<RadarMergedEntry[]>([]);
  const [meta, setMeta] = useState<RadarMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [featureAvailable, setFeatureAvailable] = useState<boolean | null>(null);
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
  const fetchCatalog = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/radar/catalog", { cache: "no-store" });
        if (res.status === 404) {
          // Flag off — treat as not found
          setFeatureAvailable(false);
          setEntries([]);
          setMeta(null);
          if (showLoading) setLoading(false);
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setFeatureAvailable(true);
        const data = await res.json();
        setEntries(data.entries || []);
        setMeta(data.meta || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("errorLoading"));
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [t]
  );
  const refreshCatalogSilently = useCallback(() => fetchCatalog(false), [fetchCatalog]);

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
      const settingsRes = await fetch("/api/radar/settings", { cache: "no-store" });
      if (settingsRes.status === 404) {
        // Flag off
        setFeatureAvailable(false);
        setOptIn(null);
        return;
      }
      if (!settingsRes.ok) throw new Error(`HTTP ${settingsRes.status}`);
      const settingsData = await settingsRes.json();
      setFeatureAvailable(true);
      setOptIn(settingsData.optIn === true);
      setHasSupporterKey(settingsData.hasSupporterKey === true);
      setSupporterKeyMasked(
        typeof settingsData.supporterKeyMasked === "string" ? settingsData.supporterKeyMasked : null
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
    void (async () => {
      await fetchSettings();
    })();
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
    void (async () => {
      await handleSync();
    })();
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

  // Feature availability and privacy opt-in are independent states. A successful
  // settings response with `optIn: false` means "show activation", not "flag off".
  const pageState = resolveRadarPageState(
    featureAvailable !== false,
    optIn === true,
    meta !== null
  );

  // Flag off — render not-found
  if (featureAvailable === false && !loading) {
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
        <div className="flex items-center gap-2">
          {(pageState === "empty" || pageState === "populated") && (
            <Link
              href="/dashboard/radar/intel"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-text-main hover:border-violet-500 hover:text-violet-400 transition-colors"
            >
              {t("intel")}
            </Link>
          )}
          {(pageState === "empty" || pageState === "populated") && (
            <Link
              href="/dashboard/radar/offers"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-text-main hover:border-violet-500 hover:text-violet-400 transition-colors"
            >
              {t("offers")}
            </Link>
          )}
          {(pageState === "empty" || pageState === "populated") && (
            <Link
              href="/dashboard/radar/combos"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-text-main hover:border-violet-500 hover:text-violet-400 transition-colors"
            >
              {t("guidedCombos")}
            </Link>
          )}
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

      {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted">{t("loading")}</div>
        </div>
      ) : (
        <>
          {/* Opt-in pending */}
          {pageState === "optin_pending" && (
            <Card>
              <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 py-8 text-center">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-4xl text-violet-400"
                >
                  radar
                </span>
                <h2 className="text-xl font-semibold">{t("activateTitle")}</h2>
                <p className="max-w-2xl text-text-muted">{t("activateDescription")}</p>

                <RadarAccessExplainer />

                {/* F4/T7 — ways to obtain a supporter key. These conditions
                    intentionally precede both activation actions (D32). */}
                {contributorClaimUrl && supporterPlansUrl && (
                  <div className="flex w-full flex-col gap-3 rounded-xl border border-border p-4">
                    <p className="text-sm font-medium">{t("claimSectionTitle")}</p>
                    <div className="flex w-full flex-col gap-3 sm:flex-row">
                      <a
                        href={contributorClaimUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-lg border border-violet-500 px-4 py-2 text-center text-sm font-medium text-violet-400 transition-colors hover:bg-violet-500/10"
                      >
                        {t("contributorButton")}
                      </a>
                      <a
                        href={supporterPlansUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-lg border border-violet-500 px-4 py-2 text-center text-sm font-medium text-violet-400 transition-colors hover:bg-violet-500/10"
                      >
                        {t("supporterButton")}
                      </a>
                    </div>
                    <p className="text-left text-xs text-text-muted">{t("contributorHint")}</p>
                    <p className="text-left text-xs text-text-muted">{t("supporterHint")}</p>
                  </div>
                )}

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
            <RadarCatalogTable
              entries={entries}
              refreshCatalog={refreshCatalogSilently}
              onError={setError}
            />
          )}
        </>
      )}
    </div>
  );
}
