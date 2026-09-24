/**
 * Shared multi-account rotation mechanics for noauth executors that round-robin
 * across several "accounts" (fingerprints), each with an optional dedicated
 * proxy — currently `OpencodeExecutor`.
 *
 * Extracted after both executors independently implemented the same
 * pickAccount/markCooldown/markSuccess skeleton with the same exponential
 * backoff, and independently needed the same fix for the same latent bug (a
 * network exception was treated as account-scoped rotation fodder even for
 * accounts sharing the default egress — see `isNetworkErrorRotatable`).
 */

// Reuses the repo's established "transient, not clearly attributable" failure
// cooldown (already used by accountFallback.ts for network-error dedup, see
// its "one transient blip opens the whole-provider breaker" comment) instead
// of inventing a separate constant — same magnitude the codebase already
// applies whether the failure is a 429 or a network-level throw.
import { TRANSIENT_COOLDOWN_MS, COOLDOWN_MS } from "../config/errorConfig.ts";
// M1 gate (default-off): the sticky/drain head only acts when the operator opted
// into skipping recently failed proxies; flag-off keeps the plain rotation
// byte-identical (R4). Same reader module as the opencode executor caller.
import { isProxySkipRecentlyFailedEnabled } from "@/shared/utils/featureFlags";
// M2 single authority: the shared refusal store (pure: errorConfig + proxyFamily
// + node:net only). The head never derives its own window.
import { isProxyAvoided, proxyEgressKey } from "../utils/proxyRefusalMemory.ts";

/** Per-account proxy configuration, persisted by NoAuthAccountCard under
 * `providerSpecificData.accountProxies` (keyed by the account id, which the UI
 * stores in `providerSpecificData.fingerprints`). */
export interface AccountProxyConfig {
  fingerprint: string;
  proxy: {
    type: string;
    host: string;
    port: number;
    username?: string;
    password?: string;
    relayAuth?: string;
  } | null;
}

/** The subset of per-account state the rotation mechanics need. Executors may
 * carry additional fields (e.g. mimocode's `jwt`/`expiresAt`) — this is the
 * minimum shape `pickAccount`/`markCooldown`/`markSuccess` operate on. */
export interface RotatableAccount {
  fingerprint: string;
  cooldownUntil: number;
  consecutiveFails: number;
  proxy: AccountProxyConfig["proxy"];
  evictedAt?: number | null;
}

export type CooldownKind = "transient" | "terminal";

const EVICT_AFTER_TERMINAL = 3;

export function isAccountEvicted(account: RotatableAccount): boolean {
  return account.evictedAt != null;
}

const COOLDOWN_BASE_MS = TRANSIENT_COOLDOWN_MS;
const COOLDOWN_MAX_MS = COOLDOWN_MS.transientMax;

export function isAccountReady(account: RotatableAccount): boolean {
  return account.cooldownUntil <= Date.now();
}

/** Round-robin pick, skipping accounts not `isReady`; falls back to the next
 * index (even if not ready) so a caller always gets an account rather than
 * hanging when every account is unavailable. Mutates `state.nextAccountIdx`.
 *
 * `isReady` defaults to the plain cooldown check (`isAccountReady`); pass a
 * custom predicate when readiness depends on more than cooldown.
 *
 * Sticky/drain head (opt-in via PROXY_SKIP_RECENTLY_FAILED, default off): when
 * the flag is on, the last served member (`state.lastHealthyFingerprint`) is
 * preferred while still `isReady`, and store-refused members (`isProxyAvoided`,
 * direct/null-key never) are skipped when a healthy member exists. Flag off =
 * the plain rotation below, byte-identical. Precedence: `isReady` false is
 * never served, never overridden.
 *
 * `isReady` defaults to the plain cooldown check (`isAccountReady`); pass a
 * custom predicate when readiness depends on more than cooldown. */
export function pickAccount<T extends RotatableAccount>(
  accounts: T[],
  state: { nextAccountIdx: number; lastHealthyFingerprint?: string },
  isReady: (account: T) => boolean = isAccountReady,
  keyOfMember: RotationEgressKeyOf = defaultRotationEgressKeyOf
): T {
  const serve = (idx: number): T => {
    const acct = accounts[idx];
    state.nextAccountIdx = (idx + 1) % accounts.length;
    if (isStickyDrainEnabled()) state.lastHealthyFingerprint = acct.fingerprint;
    return acct;
  };
  const stickyIdx = stickyServeIndex(accounts, state, isReady, keyOfMember);
  if (stickyIdx !== null) return serve(stickyIdx);
  for (let i = 0; i < accounts.length; i++) {
    const idx = (state.nextAccountIdx + i) % accounts.length;
    if (isReady(accounts[idx]) && !isStoreDrained(accounts[idx], keyOfMember)) {
      return serve(idx);
    }
  }
  for (let i = 0; i < accounts.length; i++) {
    const idx = (state.nextAccountIdx + i) % accounts.length;
    const acct = accounts[idx];
    if (isReady(acct)) {
      state.nextAccountIdx = (idx + 1) % accounts.length;
      return acct;
    }
  }
  const fallbackIdx = state.nextAccountIdx % accounts.length;
  state.nextAccountIdx = (state.nextAccountIdx + 1) % accounts.length;
  return accounts[fallbackIdx];
}

/** Key derivation for the refusal store, injectable for pool-served members. */
export type RotationEgressKeyOf = (account: RotatableAccount) => string | null;

/** Default derivation: the account's own egress key (direct never). */
const defaultRotationEgressKeyOf: RotationEgressKeyOf = (account) => proxyEgressKey(account.proxy);

/** Flag gate, isolated for tests: default-off keeps the plain rotation. */
function isStickyDrainEnabled(): boolean {
  try {
    return isProxySkipRecentlyFailedEnabled();
  } catch {
    return false;
  }
}

// Sticky is the within-wave fallback: only when the store holds a set-aside for
// this fleet (a refusal just happened) AND the cursor already advanced past the
// memorized serve (a next pick follows a completed attempt in the same wave)
// does the memorized healthy member win over a blind re-scan. Fresh requests
// (cursor at-or-behind the memorized serve) always start at the shared cursor,
// keeping the existing cross-request set-aside rhythm identical.
function stickyServeIndex<T extends RotatableAccount>(
  accounts: T[],
  state: { nextAccountIdx: number; lastHealthyFingerprint?: string },
  isReady: (account: T) => boolean,
  keyOfMember: RotationEgressKeyOf = defaultRotationEgressKeyOf
): number | null {
  if (!isStickyDrainEnabled() || !hasStoreHistory(accounts, keyOfMember)) return null;
  const wanted = state.lastHealthyFingerprint;
  if (!wanted) return null;
  const sticky = accounts.findIndex((a) => a.fingerprint === wanted);
  if (
    sticky === -1 ||
    !isReady(accounts[sticky]) ||
    isStoreDrained(accounts[sticky], keyOfMember)
  ) {
    return null;
  }
  if (state.nextAccountIdx <= sticky) return null;
  const cursorIdx = state.nextAccountIdx % accounts.length;
  if (isReady(accounts[cursorIdx]) && !isStoreDrained(accounts[cursorIdx], keyOfMember))
    return null;
  return sticky;
}

/** True when the shared store holds this member aside (direct never). */
function isStoreDrained(
  account: RotatableAccount,
  keyOfMember: RotationEgressKeyOf = defaultRotationEgressKeyOf
): boolean {
  if (!isStickyDrainEnabled()) return false;
  return isProxyAvoided(keyOfMember(account));
}

/** True when the store holds any candidate of this fleet aside. */
function hasStoreHistory(
  accounts: RotatableAccount[],
  keyOfMember: RotationEgressKeyOf = defaultRotationEgressKeyOf
): boolean {
  for (const a of accounts) {
    if (isProxyAvoided(keyOfMember(a))) return true;
  }
  return false;
}

export function markCooldown(account: RotatableAccount, kind: CooldownKind = "transient"): void {
  account.consecutiveFails++;
  const backoff = Math.min(
    COOLDOWN_BASE_MS * Math.pow(2, account.consecutiveFails - 1),
    COOLDOWN_MAX_MS
  );
  account.cooldownUntil = Date.now() + backoff + Math.random() * 1000;
  if (kind === "terminal" && account.consecutiveFails >= EVICT_AFTER_TERMINAL) {
    account.evictedAt = Date.now();
  }
}

export function markSuccess(account: RotatableAccount): void {
  account.consecutiveFails = 0;
  account.evictedAt = null;
}

/** Mask an account id for logs (UI calls it a fingerprint). */
export function maskAccountId(fingerprint: string): string {
  if (!fingerprint) return "direct";
  return `${fingerprint.slice(0, 8)}…`;
}

/** One per-account rotation entry, keyed by connection id (never a fingerprint). */
export interface RotationAccountSnapshot {
  /** Already-masked id (`maskAccountId` output) — never the full fingerprint. */
  masked: string;
  ready: boolean;
  cooldownUntilMs: number | null;
  consecutiveFails: number;
}

const rotationSnapshots = new Map<string, RotationAccountSnapshot[]>();

/** Record the current rotation state for a connection (sync, in-memory only). */
export function recordRotationSnapshot(
  connectionKey: string,
  entries: RotationAccountSnapshot[]
): void {
  rotationSnapshots.set(connectionKey, [...entries]);
}

/** Read the last recorded rotation state (no side effects — never clears). */
export function readRotationSnapshot(connectionKey: string): RotationAccountSnapshot[] | null {
  const snap = rotationSnapshots.get(connectionKey);
  return snap ? [...snap] : null;
}

/**
 * Whether a network exception (timeout, connection refused/reset) on this
 * account should trigger rotation to the next account, vs propagating.
 *
 * Only true when the account has its own egress (a configured proxy) — that's
 * the case a dead/unreachable proxy genuinely justifies rotating away from.
 * Accounts sharing the default egress (no proxy) can all fail at once on a
 * real network outage: rotating there would just retry the same failure
 * against every account while poisoning each one's cooldown for a cause that
 * isn't theirs.
 */
export function isNetworkErrorRotatable(account: RotatableAccount): boolean {
  return account.proxy !== null;
}

/**
 * Detect an *empty* upstream rejection: a 400 whose body carries no usable
 * completion — the kind `OpencodeExecutor` must rotate/retry on instead of
 * propagating as a fatal success.
 *
 * Signature is deliberately strict and scoped to the observed malformed
 * envelope (`choices[0].message` with no `error`, no real `content`,
 * `finish_reason: null`):
 *  - status must be exactly 400 (anything else → false);
 *  - body must parse and contain a `choices` array with at least one entry
 *    holding a `message` object;
 *  - an `error` field (present or empty) → false, so genuine 400s keep
 *    propagating immediately (#10460 precedent: classify by signature before
 *    rotating);
 *  - `tool_calls` / `reasoning_content` → false (real content);
 *  - `message.content` absent / null / "" → eligible; any other value
 *    (non-empty text, number, block array…) → false (conservative);
 *  - a literal `finish_reason` (not null) → false (a completed, if empty, turn).
 *
 * Does NOT reuse `detectMalformedNonStream` (diagnostics.ts): that classifier
 * also flags `{error:{…}}` bodies as `empty_choices`, which would rotate on
 * real errors — a false-positive class with a history here.
 */
export function isEmptyUpstreamRejection(status: number, bodyText: string): boolean {
  if (status !== 400) return false;
  let parsed: unknown;
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    return false;
  }
  const choices = (parsed as { choices?: unknown })?.choices;
  if (!Array.isArray(choices) || choices.length === 0) return false;
  const first = choices[0] as { message?: unknown; finish_reason?: unknown };
  if (typeof first !== "object" || first === null) return false;
  const rawMessage = (first as { message?: unknown }).message;
  if (typeof rawMessage === "undefined" || rawMessage === null) return false;
  if (typeof parsed !== "object" || parsed === null) return false;
  if ("error" in (parsed as Record<string, unknown>)) return false;
  const msg = rawMessage as Record<string, unknown>;
  if ("tool_calls" in msg) return false;
  if ("reasoning_content" in msg) return false;
  const content = msg.content;
  if (content !== undefined && content !== null && content !== "") return false;
  if (first.finish_reason !== null && first.finish_reason !== undefined) return false;
  return true;
}

/** Best-effort extraction of the upstream `chatcmpl_*` id from a response body,
 * for observability logging. Returns `"unknown"` when absent or unparseable. */
export function extractChatcmplId(bodyText: string): string {
  const match = /"id"\s*:\s*"(chatcmpl_[^"]+)"/.exec(bodyText);
  return match ? match[1] : "unknown";
}
