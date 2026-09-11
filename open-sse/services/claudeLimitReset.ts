/**
 * claudeLimitReset.ts — Claude OAuth once-a-week session-limit reset.
 *
 * OmniRoute counterpart of Claude Code's hidden `/limit-reset` command (wire contract
 * captured from Claude Code 2.1.263, program name `juniper_tide`). At the 5-hour usage
 * wall a subscription account may be allowed to reset its session window once per week;
 * the reset still counts toward the weekly limit.
 *
 * Wire contract:
 *   Status  GET  https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1
 *           → body.juniper_tide = { eligible, ineligible_reason, in_experiment,
 *             arm: "control"|"reset", available, next_available_at, weekly_resets_at,
 *             resets_per_week }
 *   Claim   POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits
 *           body { program: "juniper_tide" }
 *           → { result: "reset"|"already_used"|"not_limited"|"ineligible"|"unavailable",
 *               next_available_at, weekly_resets_at }
 *
 * Both calls use the OAuth bearer token (scope `user:profile` for the status read — the
 * scope OmniRoute already requests). The organization UUID comes from the connection's
 * `providerSpecificData.organizationUUID` (persisted at OAuth provisioning) with the
 * `/api/claude_cli/bootstrap` lookup as fallback.
 *
 * A per-connection memo (in-memory) remembers "not before" so a wall that cannot be reset
 * (already used this week, not in the experiment, …) does not re-query on every request.
 */

import { fetchClaudeBootstrap, getClaudeCodeVersion } from "../executors/claudeIdentity.ts";
import { setBoundedEntry } from "./claudeLowPriority.ts";

type JsonRecord = Record<string, unknown>;
type FetchLike = typeof fetch;

export const CLAUDE_LIMIT_RESET_PROGRAM = "juniper_tide";
export const CLAUDE_LIMIT_RESET_STATUS_URL =
  "https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1";
export const CLAUDE_LIMIT_RESET_STATUS_TIMEOUT_MS = 5_000;
export const CLAUDE_LIMIT_RESET_CLAIM_TIMEOUT_MS = 25_000;
/** Back-off after a failed/unavailable claim before the next wall may re-query. */
export const CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS = 15 * 60_000;
/** Fallback "next available" horizon when the server does not announce one. */
export const CLAUDE_LIMIT_RESET_WEEK_MS = 7 * 86_400_000;

export function claudeLimitResetClaimUrl(organizationUuid: string): string {
  return `https://api.anthropic.com/api/organizations/${encodeURIComponent(organizationUuid)}/reset_rate_limits`;
}

export type ClaudeLimitResetArm = "control" | "reset";

export type ClaudeLimitResetStatus = {
  eligible: boolean;
  ineligibleReason: string | null;
  inExperiment: boolean;
  arm: ClaudeLimitResetArm | null;
  available: boolean;
  nextAvailableAt: string | null;
  weeklyResetsAt: string | null;
  resetsPerWeek: number;
};

export type ClaudeLimitResetResult =
  | "reset"
  | "already_used"
  | "not_limited"
  | "ineligible"
  | "unavailable"
  | "rate_limited"
  | "auth_error"
  | "error";

export type ClaudeLimitResetClaim = {
  result: ClaudeLimitResetResult;
  nextAvailableAt: string | null;
  weeklyResetsAt: string | null;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function oauthHeaders(accessToken: string): Record<string, string> {
  // Same shape as the existing /api/oauth/usage poller (usage/claude.ts): axios-style
  // `claude-code/<version>` UA, not the Stainless `claude-cli/…` one.
  return {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "User-Agent": `claude-code/${getClaudeCodeVersion()}`,
    "anthropic-beta": "oauth-2025-04-20",
  };
}

/** Parse the `juniper_tide` block of a `/api/oauth/usage?at_wall=1` body. Null when absent/malformed. */
export function parseClaudeLimitResetStatus(usageBody: unknown): ClaudeLimitResetStatus | null {
  const block = asRecord(usageBody).juniper_tide;
  if (block === undefined || block === null) return null;
  const r = asRecord(block);
  if (typeof r.eligible !== "boolean") return null;
  const arm = r.arm === "control" || r.arm === "reset" ? r.arm : null;
  const resetsPerWeek =
    typeof r.resets_per_week === "number" && Number.isFinite(r.resets_per_week)
      ? r.resets_per_week
      : 1;
  return {
    eligible: r.eligible,
    ineligibleReason: stringOrNull(r.ineligible_reason),
    inExperiment: r.in_experiment === true,
    arm,
    available: r.available === true,
    nextAvailableAt: stringOrNull(r.next_available_at),
    weeklyResetsAt: stringOrNull(r.weekly_resets_at),
    resetsPerWeek,
  };
}

/** Parse the `reset_rate_limits` response body. Unknown/malformed → `unavailable`. */
export function parseClaudeLimitResetClaim(body: unknown): ClaudeLimitResetClaim {
  const r = asRecord(body);
  const raw = r.result;
  const result: ClaudeLimitResetResult =
    raw === "reset" ||
    raw === "already_used" ||
    raw === "not_limited" ||
    raw === "ineligible" ||
    raw === "unavailable"
      ? raw
      : "unavailable";
  return {
    result,
    nextAvailableAt: stringOrNull(r.next_available_at),
    weeklyResetsAt: stringOrNull(r.weekly_resets_at),
  };
}

async function fetchWithTimeout(
  fetchImpl: FetchLike,
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** GET the at-wall usage snapshot and extract the reset offer. Null on any failure. */
export async function fetchClaudeLimitResetStatus(
  accessToken: string,
  fetchImpl: FetchLike = fetch
): Promise<ClaudeLimitResetStatus | null> {
  try {
    const res = await fetchWithTimeout(
      fetchImpl,
      CLAUDE_LIMIT_RESET_STATUS_URL,
      { method: "GET", headers: oauthHeaders(accessToken) },
      CLAUDE_LIMIT_RESET_STATUS_TIMEOUT_MS
    );
    if (!res.ok) return null;
    const body: unknown = await res.json().catch(() => null);
    return parseClaudeLimitResetStatus(body);
  } catch {
    return null;
  }
}

/** POST the reset claim for one organization. Never throws. */
export async function claimClaudeLimitReset(
  accessToken: string,
  organizationUuid: string,
  fetchImpl: FetchLike = fetch
): Promise<ClaudeLimitResetClaim> {
  try {
    const res = await fetchWithTimeout(
      fetchImpl,
      claudeLimitResetClaimUrl(organizationUuid),
      {
        method: "POST",
        headers: oauthHeaders(accessToken),
        body: JSON.stringify({ program: CLAUDE_LIMIT_RESET_PROGRAM }),
      },
      CLAUDE_LIMIT_RESET_CLAIM_TIMEOUT_MS
    );
    if (res.status === 429)
      return { result: "rate_limited", nextAvailableAt: null, weeklyResetsAt: null };
    if (res.status === 401 || res.status === 403) {
      return { result: "auth_error", nextAvailableAt: null, weeklyResetsAt: null };
    }
    if (!res.ok) return { result: "error", nextAvailableAt: null, weeklyResetsAt: null };
    const body: unknown = await res.json().catch(() => null);
    return parseClaudeLimitResetClaim(body);
  } catch {
    return { result: "error", nextAvailableAt: null, weeklyResetsAt: null };
  }
}

/** Organization UUID: persisted `providerSpecificData` first, bootstrap endpoint as fallback. */
export async function resolveClaudeOrganizationUuid(
  providerSpecificData: unknown,
  accessToken: string
): Promise<string | null> {
  const psd = asRecord(providerSpecificData);
  const persisted = stringOrNull(psd.organizationUUID) ?? stringOrNull(psd.organization_uuid);
  if (persisted) return persisted;
  const bootstrap = await fetchClaudeBootstrap(accessToken).catch(() => null);
  return bootstrap?.organization_uuid ?? null;
}

/**
 * After a granted reset, sibling requests that hit the (now stale) wall in the same breath
 * are told "reset: true" for this long instead of re-querying the server.
 */
export const CLAUDE_LIMIT_RESET_RECENT_WINDOW_MS = 60_000;

/** FIFO cap for the per-connection memos — see CLAUDE_LOW_PRIORITY_CACHE_LIMIT for the why. */
export const CLAUDE_LIMIT_RESET_CACHE_LIMIT = 10_000;

const notBefore = new Map<string, number>();
const recentResetUntil = new Map<string, number>();
const inflight = new Map<string, Promise<ClaudeLimitResetAttempt>>();

function memoise(map: Map<string, number>, key: string, value: number): void {
  setBoundedEntry(map, key, value, CLAUDE_LIMIT_RESET_CACHE_LIMIT);
}

function parseIsoMs(value: string | null): number | undefined {
  if (!value) return undefined;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : undefined;
}

export type ClaudeLimitResetAttempt = {
  reset: boolean;
  outcome:
    | "reset"
    | "not_limited"
    | "recent_reset"
    | "memo_skip"
    | "no_status"
    | "not_offered"
    | "no_organization"
    | ClaudeLimitResetResult;
  nextAvailableAt: string | null;
};

/**
 * Auto-claim at the wall (opt-in per connection). Resolves `reset: true` only when the
 * server confirmed the session window was reset (or reports the account is not limited),
 * i.e. the caller may immediately retry at full speed. Every other outcome memoises a
 * "not before" so the next wall does not re-query immediately.
 */
export async function attemptClaudeLimitReset(opts: {
  key: string;
  accessToken: string;
  providerSpecificData?: unknown;
  now?: number;
  fetchImpl?: FetchLike;
  log?: {
    info?: (tag: string, msg: string) => void;
    warn?: (tag: string, msg: string) => void;
  } | null;
}): Promise<ClaudeLimitResetAttempt> {
  const now = opts.now ?? Date.now();
  const recentUntil = recentResetUntil.get(opts.key);
  if (recentUntil !== undefined && now < recentUntil) {
    return { reset: true, outcome: "recent_reset", nextAvailableAt: null };
  }
  const skipUntil = notBefore.get(opts.key);
  if (skipUntil !== undefined && now < skipUntil) {
    return { reset: false, outcome: "memo_skip", nextAvailableAt: null };
  }
  // Parallel requests on one connection hit the wall together: run a single status+claim
  // round trip and hand every caller the same verdict (no duplicate POST reset_rate_limits).
  const pending = inflight.get(opts.key);
  if (pending) return pending;
  const run = runClaudeLimitResetAttempt(opts, now).finally(() => {
    if (inflight.get(opts.key) === run) inflight.delete(opts.key);
  });
  inflight.set(opts.key, run);
  return run;
}

/** Memoise "do not re-query before": the announced instant when it is in the future, else `fallbackMs` from now. */
function memoiseNotBefore(
  key: string,
  announcedAt: string | null,
  now: number,
  fallbackMs: number
) {
  const next = parseIsoMs(announcedAt);
  memoise(notBefore, key, next !== undefined && next > now ? next : now + fallbackMs);
}

/** The status half: is a reset actually on offer for this account right now? */
async function resolveLimitResetOffer(
  opts: Parameters<typeof attemptClaudeLimitReset>[0],
  now: number,
  fetchImpl: FetchLike
): Promise<ClaudeLimitResetAttempt | null> {
  const status = await fetchClaudeLimitResetStatus(opts.accessToken, fetchImpl);
  if (!status) {
    memoise(notBefore, opts.key, now + CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS);
    return { reset: false, outcome: "no_status", nextAvailableAt: null };
  }
  if (status.eligible && status.arm === "reset" && status.available) return null;
  memoiseNotBefore(opts.key, status.nextAvailableAt, now, CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS);
  opts.log?.info?.(
    "CLAUDE_LIMIT_RESET",
    `not offered (eligible=${status.eligible} arm=${status.arm ?? "-"} available=${status.available} reason=${status.ineligibleReason ?? "-"})`
  );
  return { reset: false, outcome: "not_offered", nextAvailableAt: status.nextAvailableAt };
}

/** The claim half: POST the reset and memoise the outcome. */
async function runLimitResetClaim(
  opts: Parameters<typeof attemptClaudeLimitReset>[0],
  now: number,
  fetchImpl: FetchLike,
  organizationUuid: string
): Promise<ClaudeLimitResetAttempt> {
  const claim = await claimClaudeLimitReset(opts.accessToken, organizationUuid, fetchImpl);
  const granted = claim.result === "reset" || claim.result === "not_limited";
  const spent = granted || claim.result === "already_used";
  memoiseNotBefore(
    opts.key,
    claim.nextAvailableAt,
    now,
    spent ? CLAUDE_LIMIT_RESET_WEEK_MS : CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS
  );
  if (granted) memoise(recentResetUntil, opts.key, now + CLAUDE_LIMIT_RESET_RECENT_WINDOW_MS);
  opts.log?.info?.(
    "CLAUDE_LIMIT_RESET",
    granted
      ? `${claim.result} — next reset available ${claim.nextAvailableAt ?? "in a week"}`
      : `claim result=${claim.result}`
  );
  return { reset: granted, outcome: claim.result, nextAvailableAt: claim.nextAvailableAt };
}

async function runClaudeLimitResetAttempt(
  opts: Parameters<typeof attemptClaudeLimitReset>[0],
  now: number
): Promise<ClaudeLimitResetAttempt> {
  const fetchImpl = opts.fetchImpl ?? fetch;

  const notOffered = await resolveLimitResetOffer(opts, now, fetchImpl);
  if (notOffered) return notOffered;

  const orgUuid = await resolveClaudeOrganizationUuid(opts.providerSpecificData, opts.accessToken);
  if (!orgUuid) {
    memoise(notBefore, opts.key, now + CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS);
    opts.log?.warn?.(
      "CLAUDE_LIMIT_RESET",
      "no organization UUID for this connection; cannot claim"
    );
    return { reset: false, outcome: "no_organization", nextAvailableAt: null };
  }

  return runLimitResetClaim(opts, now, fetchImpl, orgUuid);
}

/** Test-only: forget every memoised "not before" / recent reset / in-flight attempt. */
export function _resetClaudeLimitResetMemo(): void {
  notBefore.clear();
  recentResetUntil.clear();
  inflight.clear();
}
