/**
 * usage/antigravityWeeklyQuota.ts — Antigravity weekly-quota fetcher + parser (#4017).
 *
 * Antigravity enforces both a 5-hour window (already surfaced per-model by
 * `getAntigravityUsage()` via `retrieveUserQuota`) and a separate weekly window.
 * The weekly window is NOT part of the per-model `retrieveUserQuota` response —
 * it lives in a distinct upstream RPC, `v1internal:retrieveUserQuotaSummary`,
 * which groups models into families ("Gemini Models", "Claude and GPT models")
 * and reports one bucket per family per window (5h + weekly), keyed by a
 * `bucketId`/`displayName` pair rather than by individual modelId. There is no
 * dedicated window-type field on the bucket — the window is inferred from the
 * bucketId/displayName text (matches the reverse-engineered shape documented by
 * third-party Antigravity clients, since Google does not publish this API).
 *
 * This module is a small, self-contained leaf so `usage/antigravity.ts` stays a
 * thin caller: fetch (cached, best-effort) + pure parse, mirroring the existing
 * `fetchAntigravityUserQuotaCached` pattern.
 */

import { toRecord, toNumber } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";
import { getAntigravityContentHeaders } from "../antigravityHeaders.ts";
import type { AntigravityClientProfile } from "../antigravityClientProfile.ts";

type JsonRecord = Record<string, unknown>;

interface AntigravityWeeklyQuotaOptions {
  forceRefresh?: boolean;
}

const WEEKLY_QUOTA_CACHE_TTL_MS = 60 * 1000;
const _weeklyQuotaCache = new Map<string, { data: unknown; fetchedAt: number }>();
const _weeklyQuotaInflight = new Map<string, Promise<unknown>>();

// Self-contained purge timer — this leaf owns its own cache, so it owns the cleanup too
// (same pattern as usage/antigravity.ts's module-level caches).
const _weeklyQuotaCacheCleanupTimer = setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of _weeklyQuotaCache) {
      if (now - entry.fetchedAt > WEEKLY_QUOTA_CACHE_TTL_MS) _weeklyQuotaCache.delete(key);
    }
  },
  5 * 60 * 1000
);
_weeklyQuotaCacheCleanupTimer.unref?.();

function buildCacheKey(
  accessToken: string,
  projectId: string | null | undefined,
  clientProfile: AntigravityClientProfile
): string {
  return `${accessToken.substring(0, 16)}:${projectId || "default"}:${clientProfile}`;
}

/**
 * Fetch the weekly-quota-bearing `retrieveUserQuotaSummary` response (cached, best-effort).
 * Returns `null` on any failure — callers must treat this as optional data, never a hard
 * dependency, since the RPC is undocumented and may not be available for every account/tier.
 */
export async function fetchAntigravityUserQuotaSummaryCached(
  accessToken: string,
  projectId?: string | null,
  clientProfile: AntigravityClientProfile = "ide",
  options: AntigravityWeeklyQuotaOptions = {}
): Promise<unknown | null> {
  if (!accessToken || !projectId) return null;

  const cacheKey = buildCacheKey(accessToken, projectId, clientProfile);
  const cached = _weeklyQuotaCache.get(cacheKey);
  if (
    !options.forceRefresh &&
    cached &&
    Date.now() - cached.fetchedAt < WEEKLY_QUOTA_CACHE_TTL_MS
  ) {
    return cached.data;
  }

  const inflight = _weeklyQuotaInflight.get(cacheKey);
  if (inflight !== undefined) return inflight;

  const promise = (async () => {
    try {
      const response = await fetch(
        "https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuotaSummary",
        {
          method: "POST",
          headers: getAntigravityContentHeaders(clientProfile, accessToken),
          body: JSON.stringify({ project: projectId }),
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!response.ok) return null;

      const data = await response.json();
      _weeklyQuotaCache.set(cacheKey, { data, fetchedAt: Date.now() });
      return data;
    } catch {
      return null;
    }
  })().finally(() => {
    _weeklyQuotaInflight.delete(cacheKey);
  });

  _weeklyQuotaInflight.set(cacheKey, promise);
  return promise;
}

/** Matches a bucket's combined bucketId+displayName text against a window keyword. */
function bucketMatchesWindow(bucket: JsonRecord, keyword: RegExp): boolean {
  const text = `${String(bucket.bucketId || "")} ${String(bucket.displayName || "")}`.toLowerCase();
  return keyword.test(text);
}

const WEEKLY_KEYWORD = /\bweekly\b/;

/** Turns a group displayName (e.g. "Gemini Models", "Claude and GPT models") into a quota key. */
function slugifyGroupWeeklyKey(displayName: string): string | null {
  const cleaned = String(displayName || "")
    .toLowerCase()
    .replace(/\bmodels?\b/g, "")
    .replace(/\band\b/g, " ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return cleaned ? `${cleaned}_weekly` : null;
}

/**
 * Parse the raw `retrieveUserQuotaSummary` response into weekly `UsageQuota` entries,
 * one per model family group. Tolerant of the two response envelopes third-party
 * Antigravity clients have observed (`groups[]` at the top level, or nested under
 * `quotaSummary.groups[]`) since the RPC is undocumented and unversioned by Google.
 */
export function parseAntigravityWeeklyQuotas(summaryData: unknown): Record<string, UsageQuota> {
  const quotas: Record<string, UsageQuota> = {};
  for (const groupValue of extractSummaryGroups(summaryData)) {
    const entry = parseGroupWeeklyQuota(toRecord(groupValue));
    if (entry) quotas[entry.key] = entry.quota;
  }
  return quotas;
}

/** Extracts `groups[]` from either observed response envelope (top-level or nested). */
function extractSummaryGroups(summaryData: unknown): unknown[] {
  const root = toRecord(summaryData);
  if (Array.isArray(root.groups)) return root.groups;
  const nested = toRecord(root.quotaSummary).groups;
  return Array.isArray(nested) ? nested : [];
}

/** Parses one model-family group into its weekly quota entry, or null when absent/invalid. */
function parseGroupWeeklyQuota(group: JsonRecord): { key: string; quota: UsageQuota } | null {
  const buckets = Array.isArray(group.buckets) ? group.buckets : [];
  const weeklyBucketValue = buckets.find(
    (b) => b && typeof b === "object" && bucketMatchesWindow(toRecord(b), WEEKLY_KEYWORD)
  );
  if (!weeklyBucketValue) return null;

  const weeklyBucket = toRecord(weeklyBucketValue);
  if (weeklyBucket.disabled === true) return null;

  const key = slugifyGroupWeeklyKey(String(group.displayName || ""));
  if (!key) return null;

  const rawFraction = toNumber(weeklyBucket.remainingFraction, -1);
  if (rawFraction < 0) return null;

  const remainingFraction = Math.max(0, Math.min(1, rawFraction));
  const resetAt = parseResetTime(weeklyBucket.resetTime);
  const isUnlimited = !resetAt && remainingFraction >= 1;
  const QUOTA_NORMALIZED_BASE = 1000;
  const total = QUOTA_NORMALIZED_BASE;
  const remaining = Math.round(total * remainingFraction);

  return {
    key,
    quota: {
      used: isUnlimited ? 0 : Math.max(0, total - remaining),
      total: isUnlimited ? 0 : total,
      resetAt,
      remainingPercentage: isUnlimited ? 100 : remainingFraction * 100,
      unlimited: isUnlimited,
      fractionReported: true,
      quotaSource: "retrieveUserQuota",
      displayName: String(group.displayName || "").trim() || undefined,
    },
  };
}

/** Fetch + parse in one call — the only entry point `usage/antigravity.ts` needs. */
export async function fetchAndParseAntigravityWeeklyQuotas(
  accessToken: string,
  projectId: string | undefined | null,
  clientProfile: AntigravityClientProfile = "ide",
  options: AntigravityWeeklyQuotaOptions = {}
): Promise<Record<string, UsageQuota>> {
  const data = await fetchAntigravityUserQuotaSummaryCached(
    accessToken,
    projectId,
    clientProfile,
    options
  );
  return parseAntigravityWeeklyQuotas(data);
}
