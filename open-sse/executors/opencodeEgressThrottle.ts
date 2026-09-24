/**
 * opencodeEgressThrottle.ts — per-egress pacing plus fleet-wide backoff for the
 * opencode multi-account rotation.
 *
 * Pure store, same pattern as proxyRefusalMemory: no flag reads at the hot path
 * (the caller resolves config once and injects it), injectable clock (`nowMs`)
 * and RNG (`rand`) so unit tests drive time deterministically, test-only
 * reset/size helpers. Zero business imports — no breaker, no cooldown, no
 * lockout, no featureFlags (activation is an env var local to this module,
 * default off, same truthy motif as the opencodeHeaders falsy guard
 * (opencodeHeaders.ts:61, negative form `/^(0|false|no|off)$/`).
 *
 * Fail-open everywhere: a saturated queue, an elapsed wait budget, a disabled
 * module or an aborted wait resolves `null` — the caller proceeds WITHOUT a
 * slot rather than ever rejecting a dispatchable request.
 */

import { sleepAbortable } from "./opencodeTransientFailure.ts";
import { classifyUpstream429, type RateLimit429Verdict } from "./opencodeRateLimited.ts";
import { proxyKeyOf } from "./opencodeGeoBlock.ts";
import { noteProxyRefusal, proxyEgressKey } from "../utils/proxyRefusalMemory.ts";

export const DIRECT_EGRESS_SENTINEL = "direct";

/** Upper bound on tracked egress keys (active egress keys stay far below refused-pair counts). */
export const MAX_EGRESS_KEYS = 512;

export interface EgressThrottleConfig {
  enabled: boolean;
  cap: number;
  waitMinMs: number;
  waitMaxMs: number;
  waitBudgetMs: number;
  fleetWindowMs: number;
  fleetThreshold: number;
  suspectMinMs: number;
  suspectMaxMs: number;
  suspectSlots: number;
}

export const EGRESS_THROTTLE_DEFAULTS: EgressThrottleConfig = {
  enabled: false,
  cap: 2,
  waitMinMs: 5000,
  waitMaxMs: 15000,
  waitBudgetMs: 30000,
  fleetWindowMs: 60000,
  fleetThreshold: 10,
  suspectMinMs: 60000,
  suspectMaxMs: 120000,
  suspectSlots: 2,
};

function envFlagEnabled(raw: string | undefined): boolean {
  return raw != null && /^(1|true|yes|on)$/i.test(raw.trim());
}

function envNum(raw: string | undefined, fallback: number, min: number, max: number): number {
  if (raw == null || raw.trim() === "") return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < min || n > max) return fallback;
  return n;
}

/**
 * Resolve config from the environment (never throws: unreadable values fall
 * back to defaults, off). Pass an explicit `env` in tests; defaults to
 * `process.env`.
 */
export function resolveEgressThrottleConfig(
  env: NodeJS.ProcessEnv = process.env
): EgressThrottleConfig {
  const d = EGRESS_THROTTLE_DEFAULTS;
  const waitMinMs = envNum(env.OPENCODE_EGRESS_THROTTLE_WAIT_MIN_MS, d.waitMinMs, 0, 120_000);
  return {
    enabled: envFlagEnabled(env.OPENCODE_EGRESS_THROTTLE_ENABLED),
    cap: Math.floor(envNum(env.OPENCODE_EGRESS_THROTTLE_CAP, d.cap, 1, 64)),
    waitMinMs,
    waitMaxMs: Math.max(
      waitMinMs,
      envNum(env.OPENCODE_EGRESS_THROTTLE_WAIT_MAX_MS, d.waitMaxMs, 0, 120_000)
    ),
    waitBudgetMs: envNum(env.OPENCODE_EGRESS_THROTTLE_WAIT_BUDGET_MS, d.waitBudgetMs, 0, 300_000),
    fleetWindowMs: envNum(
      env.OPENCODE_EGRESS_THROTTLE_FLEET_WINDOW_MS,
      d.fleetWindowMs,
      1_000,
      600_000
    ),
    fleetThreshold: Math.floor(
      envNum(env.OPENCODE_EGRESS_THROTTLE_FLEET_THRESHOLD, d.fleetThreshold, 1, 10_000)
    ),
    suspectMinMs: envNum(env.OPENCODE_EGRESS_THROTTLE_SUSPECT_MIN_MS, d.suspectMinMs, 0, 600_000),
    suspectMaxMs: Math.max(
      envNum(env.OPENCODE_EGRESS_THROTTLE_SUSPECT_MIN_MS, d.suspectMinMs, 0, 600_000),
      envNum(env.OPENCODE_EGRESS_THROTTLE_SUSPECT_MAX_MS, d.suspectMaxMs, 0, 600_000)
    ),
    suspectSlots: Math.floor(
      envNum(env.OPENCODE_EGRESS_THROTTLE_SUSPECT_SLOTS, d.suspectSlots, 1, 64)
    ),
  };
}

/** Egress key for an account proxy; `direct` accounts share one sentinel (shared egress). */
export function egressKeyOf(proxy: { host: string; port: number } | null): string {
  return proxyEgressKey(proxy) ?? DIRECT_EGRESS_SENTINEL;
}

// ---------------------------------------------------------------------------
// Per-egress semaphore
// ---------------------------------------------------------------------------

interface Waiter {
  startWait: (slot: () => void) => void;
  abort: () => void;
  enqueuedAt: number;
}

interface EgressGate {
  running: number;
  queue: Waiter[];
  lastUsed: number;
}

const gates = new Map<string, EgressGate>();

function getGate(key: string, nowMs: number): EgressGate {
  let gate = gates.get(key);
  if (!gate) {
    gate = { running: 0, queue: [], lastUsed: nowMs };
    gates.set(key, gate);
    if (gates.size > MAX_EGRESS_KEYS) {
      // Evict the stalest idle gate (never one with running slots or waiters).
      let oldestKey: string | undefined;
      let oldestUsed = Infinity;
      for (const [k, g] of gates) {
        if (k !== key && g.running === 0 && g.queue.length === 0 && g.lastUsed < oldestUsed) {
          oldestUsed = g.lastUsed;
          oldestKey = k;
        }
      }
      if (oldestKey !== undefined) gates.delete(oldestKey);
      else gates.delete(gates.keys().next().value as string);
    }
  }
  gate.lastUsed = nowMs;
  return gate;
}

function createReleaseFn(key: string): () => void {
  let released = false;
  return () => {
    if (released) return;
    released = true;
    const gate = gates.get(key);
    if (!gate || gate.running <= 0) return;
    gate.running--;
    gate.lastUsed = Date.now();
    // Drain FIFO while slots are free.
    while (gate.queue.length > 0 && gate.running < currentCap(key)) {
      const next = gate.queue.shift();
      if (!next) break;
      gate.running++;
      next.startWait(createReleaseFn(key));
    }
    if (gate.running === 0 && gate.queue.length === 0) {
      gates.delete(key);
      caps.delete(key); // m-d: caps follows gates so idle keys leave no residue
    }
  };
}

// Cap recorded per key at acquire time (config is per-process; last writer wins,
// same lazy pattern as rateLimitSemaphore.getGate).
const caps = new Map<string, number>();
function currentCap(key: string): number {
  return caps.get(key) ?? EGRESS_THROTTLE_DEFAULTS.cap;
}

export interface AcquireEgressSlotOptions {
  signal?: AbortSignal | null;
  rand?: () => number;
  nowMs?: number;
}

/**
 * Acquire one of `cfg.cap` concurrent slots for `key`. Resolves a release
 * callback (call exactly once, in `finally`), or `null` when the caller must
 * proceed WITHOUT a slot: module disabled, empty key, queue wait elapsed
 * (5-15 s jittered, bounded by the per-call wait budget), or client abort.
 */
export async function acquireEgressSlot(
  key: string,
  cfg: EgressThrottleConfig,
  opts: AcquireEgressSlotOptions = {}
): Promise<(() => void) | null> {
  const nowMs = opts.nowMs ?? Date.now();
  if (!cfg.enabled || !key) return null;
  caps.set(key, cfg.cap);
  const gate = getGate(key, nowMs);
  if (gate.running < cfg.cap) {
    gate.running++;
    return createReleaseFn(key);
  }
  const rand = opts.rand ?? Math.random;
  const waitMs = Math.min(
    cfg.waitMinMs + rand() * Math.max(0, cfg.waitMaxMs - cfg.waitMinMs),
    Math.max(0, cfg.waitBudgetMs)
  );
  if (waitMs <= 0) return null;
  return new Promise<(() => void) | null>((resolve) => {
    let settled = false;
    const waiter: Waiter = {
      enqueuedAt: nowMs,
      startWait: (slot) => {
        if (settled) return slot();
        settled = true;
        resolve(slot);
      },
      abort: () => {
        if (settled) return;
        settled = true;
        const idx = gate.queue.indexOf(waiter);
        if (idx !== -1) gate.queue.splice(idx, 1);
        resolve(null);
      },
    };
    gate.queue.push(waiter);
    void sleepAbortable(waitMs, opts.signal ?? null).then((elapsed) => {
      if (!elapsed) waiter.abort();
      else {
        // Wait elapsed without a slot: fail open, leave the queue.
        const idx = gate.queue.indexOf(waiter);
        if (idx !== -1) gate.queue.splice(idx, 1);
        if (!settled) {
          settled = true;
          resolve(null);
        }
      }
    });
    opts.signal?.addEventListener("abort", waiter.abort, { once: true });
  });
}

// Fleet-wide backoff state (burst 429s only; rate-limit verdicts stay on the
// early-stop path and are never recorded here)
// ---------------------------------------------------------------------------

let burst429At: number[] = [];
let suspectUntil = 0;
let suspectSeedRand: (() => number) | null = null;

function pruneBursts(nowMs: number, windowMs: number): void {
  const cutoff = nowMs - windowMs;
  burst429At = burst429At.filter((t) => t > cutoff);
}

/**
 * Record one burst (non-`rate_limited`) 429. Callers only invoke this once the
 * early-stop path has ruled out a rate-limit verdict, so rate-limit verdicts
 * stay on the early-stop path and never reach this counter. Time is
 * injectable; the window is read lazily from the last resolved fleet window.
 */
export function noteEgress429(nowMs: number = Date.now()): void {
  if (!lastEnabled) return;
  burst429At.push(nowMs);
  pruneBursts(nowMs, lastFleetWindowMs);
  if (burst429At.length >= lastFleetThreshold && nowMs >= suspectUntil) {
    const rand = suspectSeedRand ?? Math.random;
    suspectUntil =
      nowMs + lastSuspectMinMs + rand() * Math.max(0, lastSuspectMaxMs - lastSuspectMinMs);
  }
}

// Last resolved fleet params (set by configureFleetForTest / seam wiring;
// defaults otherwise). Kept module-local so noteEgress429 stays sync and cheap.
let lastFleetWindowMs = EGRESS_THROTTLE_DEFAULTS.fleetWindowMs;
let lastFleetThreshold = EGRESS_THROTTLE_DEFAULTS.fleetThreshold;
let lastSuspectMinMs = EGRESS_THROTTLE_DEFAULTS.suspectMinMs;
let lastSuspectMaxMs = EGRESS_THROTTLE_DEFAULTS.suspectMaxMs;
let lastEnabled = false;

/** Wire the fleet params from resolved config (called once per request path setup). */
export function configureFleetFromConfig(cfg: EgressThrottleConfig): void {
  lastEnabled = cfg.enabled;
  lastFleetWindowMs = cfg.fleetWindowMs;
  lastFleetThreshold = cfg.fleetThreshold;
  lastSuspectMinMs = cfg.suspectMinMs;
  lastSuspectMaxMs = cfg.suspectMaxMs;
}

/** The first success clears everything: burst history + suspect. */
export function noteEgressSuccess(): void {
  burst429At = [];
  suspectUntil = 0;
}

/** Lazy read: an expired suspect is invisible without any timer (breaker/cooldown motif). */
export function isFleetSuspect(nowMs: number = Date.now()): boolean {
  return nowMs < suspectUntil;
}

// ---------------------------------------------------------------------------
// Request wiring: keeps the executor seam small (init + one call per arm)
// ---------------------------------------------------------------------------

/** Per-request pacing state. Null budget = fleet-wide backoff inactive. */
export interface EgressPacing {
  config: EgressThrottleConfig;
  slotBudget: number | null;
  slotsUsed: number;
}

/**
 * Resolve config once per request and snapshot the fleet-wide backoff budget.
 * Off by default: rotation unchanged.
 */
export function initEgressPacingForRequest(env: NodeJS.ProcessEnv = process.env): EgressPacing {
  const config = resolveEgressThrottleConfig(env);
  configureFleetFromConfig(config);
  return {
    config,
    slotBudget: config.enabled && isFleetSuspect() ? config.suspectSlots : null,
    slotsUsed: 0,
  };
}

/**
 * Pace one dispatch through the per-egress semaphore. Resolves a release
 * callback, or null when the caller proceeds without a slot (fail-open:
 * module off, elapsed wait budget, saturated queue, aborted wait).
 */
export function acquirePacingSlot(
  pacing: EgressPacing,
  proxy: { host: string; port: number } | null,
  signal: AbortSignal | null | undefined
): Promise<(() => void) | null> {
  if (!pacing.config.enabled) return Promise.resolve(null);
  return acquireEgressSlot(egressKeyOf(proxy), pacing.config, {
    signal: signal ?? null,
  });
}

/**
 * Start one paced dispatch: acquire the per-egress slot (fail-open null when
 * the module is off or the wait elapses) and re-validate the pick — the
 * account may have cooled down meanwhile, so re-pick once instead of serving
 * a dead account. Returns the release and the account to use.
 */
export async function startPacedDispatch<
  A extends { proxy: { host: string; port: number } | null },
>(
  pacing: EgressPacing,
  account: A,
  isCandidate: (a: A) => boolean,
  repick: () => A,
  signal: AbortSignal | null | undefined
): Promise<{ release: (() => void) | null; account: A }> {
  const release = await acquirePacingSlot(pacing, account.proxy, signal);
  if (release !== null && !isCandidate(account)) {
    release();
    return { release: null, account: repick() };
  }
  return { release, account };
}

/**
 * Set-aside note for one refused member: hands the refusal to the proxy
 * memory when the opt-in is on. Returns the set-aside duration for the log.
 */
export function noteRefusedMember(
  proxy: { host: string; port: number } | null,
  skipRecentlyFailed: boolean
): number | null {
  if (!skipRecentlyFailed) return null;
  return noteProxyRefusal(proxyEgressKey(proxy), "ip_quota_429");
}

/**
 * Resolve the 429 verdict for one refused dispatch. When the rate-limited
 * early-stop is on, the classifier decides; a rate-limit verdict stays on the
 * early-stop path and never reaches the burst counter. When the early-stop is
 * off no body is read and the observed 429 counts as a burst by default.
 */
export async function resolveBurstVerdict(
  response: Response,
  earlyStopEnabled: boolean
): Promise<RateLimit429Verdict> {
  if (earlyStopEnabled && (await classifyUpstream429(response)) === "rate_limited") {
    return "rate_limited";
  }
  return "burst";
}

/**
 * Record one burst 429 (a 429 the early-stop did NOT classify as rate-limited)
 * and decide whether this request parks: under fleet-wide backoff the request
 * stops after its slot budget and the caller surfaces the last
 * upstream answer as-is.
 */
export function observeBurst429(pacing: EgressPacing): "rotate" | "park" {
  if (pacing.config.enabled) noteEgress429();
  if (pacing.slotBudget === null) return "rotate";
  pacing.slotsUsed++;
  return pacing.slotsUsed >= pacing.slotBudget ? "park" : "rotate";
}

/** Clear fleet-wide backoff on the first success (any response with ok true). */
export function observePacingSuccess(pacing: EgressPacing, ok: boolean): void {
  if (ok && pacing.config.enabled) noteEgressSuccess();
}

/**
 * Release the pacing slot held for one loop iteration. Every loop exit after
 * the acquire (rotate, park, return, throw) funnels through this single site,
 * so no path can leak a slot. Idempotent: safe to call twice.
 */
export function releasePacingSlot(release: (() => void) | null): void {
  release?.();
}

/**
 * Log one 429 outcome on the request logger. The stop/park/rotate wording
 * lives here so the arm holds one call; the loop control stays at the seam.
 */
export function log429Outcome(
  log: { warn?: (tag: string, message: string) => void } | undefined,
  cid: string,
  arm: "stop" | "park" | "rotate",
  masked: string,
  setAsideMs: number | null
): void {
  if (arm === "stop") {
    log?.warn?.("OPENCODE", `${cid}rate-limited 429 on account ${masked}, stopping the wave`);
  } else if (arm === "park") {
    log?.warn?.(
      "OPENCODE",
      `${cid}fleet backing off: slot budget used, parking (returning last answer)`
    );
  } else {
    log?.warn?.(
      "OPENCODE",
      `${cid}burst 429 on account ${masked}` +
        (setAsideMs ? `, member set aside for ${Math.round(setAsideMs / 1000)}s` : "") +
        ", rotating to next…"
    );
  }
}
/**
 * Settle the 429 arm: resolve the verdict, release the slot exactly once, and
 * record a burst. Returns "stop" (early-stop: caller returns result),
 * "park" (slot budget spent: caller breaks), or "rotate" (caller continues).
 * The release happens inside, so the arm holds no release call at all.
 */
export async function settle429Arm(
  release: (() => void) | null,
  pacing: EgressPacing,
  response: Response,
  isEarlyStopEnabled: () => boolean
): Promise<"stop" | "park" | "rotate"> {
  const verdict = await resolveBurstVerdict(response, isEarlyStopEnabled());
  releasePacingSlot(release);
  if (verdict === "rate_limited") return "stop";
  return observeBurst429(pacing) === "park" ? "park" : "rotate";
}

/**
 * Rethrow a dispatch error after releasing the pacing slot. Single site for
 * every `throw err` after the acquire, so no throw path can leak a slot.
 */
export function throwPacedError(release: (() => void) | null, err: unknown): never {
  releasePacingSlot(release);
  throw err;
}

/**
 * Rotation-loop wiring for the stall arm: the tried-set plus a mutable stall
 * counter, bundled so the arm holds one call. The loop owns `stalled` and the
 * helper reads-then-bumps it.
 */
export interface StallLoopWiring {
  tried: Set<string>;
  stalled: { attempts: number };
  cooldown: (account: { proxy: { host: string; port: number } | null }) => void;
  markDirect: () => void;
}

/**
 * Settle a stalled dispatch: release the slot, cool the account down, join the
 * tried-set, and bump the stall counter. Returns true on the first stall
 * (caller rotates), false afterwards (caller rethrows). The log line stays at
 * the call site (it needs the request logger).
 */
export function settleStalledDispatch(
  release: (() => void) | null,
  account: { proxy: { host: string; port: number } | null },
  loop: StallLoopWiring
): boolean {
  releasePacingSlot(release);
  loop.cooldown(account);
  const key = proxyKeyOf(account.proxy);
  if (key !== null) loop.tried.add(key);
  else loop.markDirect();
  const first = loop.stalled.attempts === 0;
  loop.stalled.attempts++;
  return first;
}

// ---------------------------------------------------------------------------
// Test helpers (never call in production code)
// ---------------------------------------------------------------------------

/** Clear all throttle state. Tests only. */
export function _clearEgressThrottleForTest(): void {
  for (const [, gate] of gates) {
    for (const w of gate.queue) w.abort();
  }
  gates.clear();
  caps.clear();
  burst429At = [];
  suspectUntil = 0;
  suspectSeedRand = null;
  lastEnabled = false;
  lastFleetWindowMs = EGRESS_THROTTLE_DEFAULTS.fleetWindowMs;
  lastFleetThreshold = EGRESS_THROTTLE_DEFAULTS.fleetThreshold;
  lastSuspectMinMs = EGRESS_THROTTLE_DEFAULTS.suspectMinMs;
  lastSuspectMaxMs = EGRESS_THROTTLE_DEFAULTS.suspectMaxMs;
}

/** Current gate count. Tests only. */
export function _egressThrottleSizeForTest(): number {
  return gates.size;
}

/** Insert an idle gate key (GC test). Tests only. */
export function _touchEgressKeyForTest(key: string, nowMs: number = Date.now()): void {
  getGate(key, nowMs);
}

/** Inject RNG for the suspect duration (deterministic tests). Tests only. */
export function _setSuspectRandForTest(rand: (() => number) | null): void {
  suspectSeedRand = rand;
}
