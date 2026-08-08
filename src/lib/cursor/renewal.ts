import { homedir } from "os";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createKeyedMutex } from "@/shared/utils/keyedMutex";
import { resolveCursorAgentBinary, runCursorAgent } from "@/lib/providerModels/cursorAgent";
import { tryAgentAuth, tryIdeAuth } from "@/lib/cursor/tokenExtractor";

const CURSOR_AGENT_NUDGE_TIMEOUT_MS = 10_000;
const CURSOR_AGENT_STATUS_TIMEOUT_MS = 5_000;

/**
 * cursor-agent nudge/availability checks are semantically different
 * invocations with different result shapes — keyed so a `nudge` call is
 * never coalesced into a concurrent `status` call's promise, or vice versa.
 * There is only ever one local `cursor-agent` session per host for a given
 * command, so this caps concurrent processes to at most one PER command type.
 */
const inFlightCursorAgentSpawns = new Map<"nudge" | "status", Promise<unknown>>();

async function runLockedCursorAgentSpawn<T>(
  key: "nudge" | "status",
  spawnFn: () => Promise<T>
): Promise<T> {
  const existing = inFlightCursorAgentSpawns.get(key);
  if (existing) {
    return existing as Promise<T>;
  }
  const promise = spawnFn();
  inFlightCursorAgentSpawns.set(key, promise);
  try {
    return await promise;
  } finally {
    if (inFlightCursorAgentSpawns.get(key) === promise) {
      inFlightCursorAgentSpawns.delete(key);
    }
  }
}

/**
 * The ACTUAL renewal-nudge attempt: `cursor-agent --list-models` makes a
 * genuine authenticated network call to Cursor's API (unlike `status`, which
 * is a pure local read with no observable side effect) — the kind of action
 * a well-behaved OAuth client typically refreshes-before-expiry against.
 *
 * SECURITY: this function must NEVER be called with any argv other than
 * `["--list-models"]` — no `login`, no other subcommand. Enforced by not
 * accepting an `args` parameter at all; the argv is hardcoded inline.
 */
export async function runCursorAgentNudge(
  binary: string,
  timeoutMs: number
): Promise<{ stdout: string; stderr: string; code: number | null; signal: NodeJS.Signals | null }> {
  return runLockedCursorAgentSpawn("nudge", () =>
    runCursorAgent(binary, ["--list-models"], timeoutMs, {
      sigkillFollowupMs: Math.max(1, Math.floor(timeoutMs / 2)),
    })
  );
}

interface CursorAgentStatusJson {
  status?: string;
  isAuthenticated?: boolean;
  hasAccessToken?: boolean;
  hasRefreshToken?: boolean;
  userInfo?: unknown;
}

/**
 * Pure, side-effect-free availability predicate. Never performs the renewal
 * nudge (that's `runCursorAgentNudge()`, called separately and only from
 * `renewCursorConnection()`'s actual renewal attempt). Resolves the binary
 * via fixed candidate paths only (no PATH fallback) — unattended/unconfirmed
 * execution should not trust PATH resolution.
 */
export async function checkCursorAgentAvailability(): Promise<{
  available: boolean;
  binaryPath: string | null;
}> {
  const binary = resolveCursorAgentBinary({ allowPathFallback: false });
  if (!binary) {
    return { available: false, binaryPath: null };
  }

  let result: { stdout: string; stderr: string };
  try {
    result = await runLockedCursorAgentSpawn("status", () =>
      runCursorAgent(binary, ["status", "--format", "json"], CURSOR_AGENT_STATUS_TIMEOUT_MS, {
        sigkillFollowupMs: Math.max(1, Math.floor(CURSOR_AGENT_STATUS_TIMEOUT_MS / 2)),
      })
    );
  } catch {
    // Spawn itself failed (e.g. binary vanished between resolve and spawn) —
    // treat as unavailable rather than propagating; the binary was found on
    // disk but its authenticated status could not be confirmed.
    return { available: false, binaryPath: binary };
  }

  try {
    const parsed = JSON.parse(result.stdout) as CursorAgentStatusJson;
    return { available: parsed.isAuthenticated === true, binaryPath: binary };
  } catch {
    // Unparseable/empty output (e.g. an older CLI release predating
    // `--format json` support on `status`). Fall back to the same legacy
    // auth-detection convention `cursorAgent.ts` already uses for
    // `--list-models`/`--model --help`: absent an explicit "not
    // authenticated" signal in stdout/stderr, treat the binary as available.
    const combined = `${result.stdout}\n${result.stderr}`;
    if (/Authentication required|Not logged in/i.test(combined)) {
      return { available: false, binaryPath: binary };
    }
    return { available: true, binaryPath: binary };
  }
}

const CURSOR_AGENT_AVAILABILITY_CACHE_TTL_MS = 5 * 60 * 1000;

let cachedAvailability: {
  result: { available: boolean; binaryPath: string | null };
  expiresAt: number;
} | null = null;

/**
 * Cached wrapper around checkCursorAgentAvailability(), for INFORMATIONAL/UI
 * callers only (5-minute TTL) — e.g. the dashboard's install-nudge banner,
 * which may mount/refetch frequently. Task 3's sweep and Task 4's manual
 * refresh route continue calling the UNCACHED checkCursorAgentAvailability()
 * directly: a "refresh now" click must always see a fresh status, never a
 * stale cached answer.
 */
export async function getCachedCursorAgentAvailability(): Promise<{
  available: boolean;
  binaryPath: string | null;
}> {
  const now = Date.now();
  if (cachedAvailability && cachedAvailability.expiresAt > now) {
    return cachedAvailability.result;
  }
  const result = await checkCursorAgentAvailability();
  cachedAvailability = { result, expiresAt: now + CURSOR_AGENT_AVAILABILITY_CACHE_TTL_MS };
  return result;
}

const IDE_AUTH_DEDUP_TTL_MS = 5_000;

/**
 * Busy-timeout for a background-triggered tryIdeAuth() open — deliberately
 * much shorter than tryIdeAuth()'s own 2000ms default (used by the one-shot,
 * user-initiated auto-import modal, a code path outside this orchestrator).
 * Both the sweep AND the manual-refresh route share the same Node event loop
 * as the HTTP server, so either one blocking on a WAL-lock collision stalls
 * every other in-flight request on the instance — not just their own. An
 * automated/backend-triggered call should fail fast and let the existing
 * exponential circuit-breaker (sweep) or the user's next click (manual route)
 * retry, rather than risk up to ~2s per driver in the fallback cascade
 * (worst case ~4s total). Exported so the manual-refresh route can reuse the
 * same value when it bypasses the dedup cache below for freshness.
 */
export const BACKGROUND_IDE_AUTH_TIMEOUT_MS = 250;

let cachedIdeAuthCall: {
  home: string;
  promise: ReturnType<typeof tryIdeAuth>;
  expiresAt: number;
} | null = null;

/**
 * Collapses duplicate tryIdeAuth() calls — each of which opens and queries
 * the host's Cursor state.vscdb — across multiple Cursor connections that
 * become due for renewal in the same sweep tick. Mirrors
 * getCachedCursorAgentAvailability()'s short-TTL cache pattern above; keyed
 * by homedir() since that determines which physical file(s) tryIdeAuth()
 * would probe. Only wraps the REAL tryIdeAuth() — renewCursorConnection()'s
 * `deps.tryIdeAuth` test override bypasses this cache entirely (a test mock
 * isn't reading a real shared file, so there is nothing to dedup).
 */
function dedupedTryIdeAuth(): ReturnType<typeof tryIdeAuth> {
  const home = homedir();
  const now = Date.now();
  if (cachedIdeAuthCall && cachedIdeAuthCall.home === home && cachedIdeAuthCall.expiresAt > now) {
    return cachedIdeAuthCall.promise;
  }
  const promise = tryIdeAuth({ timeoutMs: BACKGROUND_IDE_AUTH_TIMEOUT_MS });
  cachedIdeAuthCall = { home, promise, expiresAt: now + IDE_AUTH_DEDUP_TTL_MS };
  return promise;
}

export type CursorRenewalResult =
  | {
      status: "renewed";
      accessToken: string;
      machineId?: string;
      source: "cursor-ide" | "cursor-agent";
    }
  | { status: "unchanged" }
  | { status: "error"; error: string };

/** Cursor's ~24h import-token lifetime — the single shared source for both
 * the sweep (Task 3) and the manual-refresh route (Task 4) when computing a
 * fresh expiry after a renewal. The pre-existing independent `86400` literals
 * in src/lib/oauth/services/cursor.ts and src/lib/oauth/providers/cursor.ts
 * are for INITIAL token import, a separate code path — left untouched. */
export const CURSOR_TOKEN_LIFETIME_S = 86400;

/**
 * Orchestrates a Cursor renewal attempt: nudges `cursor-agent` (if available)
 * to encourage an internal refresh, then re-scrapes both credential sources
 * independently and compares against the currently-stored token.
 *
 * This function must NEVER call anything that invokes `cursor-agent login`.
 *
 * `deps` is an optional testability seam (mirrors tokenExtractor.ts's
 * `verifyLinuxCursorInstalled(probe)` injection pattern) — defaults to the
 * real module functions, so the two real call sites (the sweep, the manual
 * refresh route) that call this with no 2nd argument get identical behavior
 * to before. It exists so tests can inject a throwing mock for one/both
 * credential sources to exercise the outer catch/sanitizeErrorMessage()
 * branch, which is otherwise unreachable black-box (tryIdeAuth()/
 * tryAgentAuth() always resolve to `{found: false}` rather than throwing).
 */
export async function renewCursorConnection(
  current: {
    accessToken: string;
    machineId?: string | null;
  },
  deps?: {
    tryIdeAuth?: typeof tryIdeAuth;
    tryAgentAuth?: typeof tryAgentAuth;
    checkCursorAgentAvailability?: typeof checkCursorAgentAvailability;
  }
): Promise<CursorRenewalResult> {
  const resolveIdeAuth = deps?.tryIdeAuth ?? dedupedTryIdeAuth;
  const resolveAgentAuth = deps?.tryAgentAuth ?? tryAgentAuth;
  const resolveAvailability = deps?.checkCursorAgentAvailability ?? checkCursorAgentAvailability;

  try {
    const availability = await resolveAvailability();
    if (availability.available && availability.binaryPath) {
      try {
        await runCursorAgentNudge(availability.binaryPath, CURSOR_AGENT_NUDGE_TIMEOUT_MS);
      } catch {
        // A crashing/timed-out cursor-agent should degrade to "nudge didn't
        // happen", not abort the whole renewal attempt — the IDE may still
        // have a perfectly valid, independently-refreshed token below.
      }
    }
    // Unavailable/unauthenticated cursor-agent doesn't preclude the IDE
    // having a separately-valid session, so re-scrape regardless.

    const [ideResult, agentResult] = await Promise.all([resolveIdeAuth(), resolveAgentAuth()]);

    if (ideResult.found && ideResult.accessToken && ideResult.accessToken !== current.accessToken) {
      return {
        status: "renewed",
        accessToken: ideResult.accessToken,
        machineId: ideResult.machineId,
        source: "cursor-ide",
      };
    }

    if (
      agentResult.found &&
      agentResult.accessToken &&
      agentResult.accessToken !== current.accessToken
    ) {
      return {
        status: "renewed",
        accessToken: agentResult.accessToken,
        source: "cursor-agent",
      };
    }

    return { status: "unchanged" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { status: "error", error: sanitizeErrorMessage(message) };
  }
}

/**
 * Builds the fully self-contained field set to persist on a `"renewed"`
 * result — mirrors the cleanup field set the generic provider success path
 * already sets in tokenHealthCheck.ts's checkConnection() onPersist callback,
 * so a successful Cursor renewal doesn't leave a stale lastHealthCheckAt
 * timestamp or leftover error/retry state. Callers do NOT need to separately
 * call clearRefreshCircuit() or set testStatus: "active" on top of this.
 */
export function buildCursorRenewedUpdate(
  current: { providerSpecificData?: Record<string, unknown> | null },
  result: Extract<CursorRenewalResult, { status: "renewed" }>,
  now: string
): Record<string, unknown> {
  const providerSpecificData: Record<string, unknown> = {
    ...(current.providerSpecificData || {}),
  };
  delete providerSpecificData.refreshCircuit;
  if (result.machineId) {
    providerSpecificData.machineId = result.machineId;
  }

  const expiresAt = new Date(Date.parse(now) + CURSOR_TOKEN_LIFETIME_S * 1000).toISOString();

  return {
    accessToken: result.accessToken,
    expiresAt,
    tokenExpiresAt: expiresAt,
    testStatus: "active",
    lastHealthCheckAt: now,
    lastError: null,
    lastErrorAt: null,
    lastErrorType: null,
    lastErrorSource: null,
    errorCode: null,
    expiredRetryCount: null,
    expiredRetryAt: null,
    providerSpecificData,
  };
}

/**
 * Per-connection mutex around the full renew-then-persist cycle. Unlike
 * every other provider's refresh path (which goes through getAccessToken()'s
 * connectionRefreshMutex in open-sse/services/tokenRefresh.ts, a DEDUP cache),
 * this wraps a SERIALIZATION queue (src/shared/utils/keyedMutex.ts) — the
 * sweep and the manual-refresh route have different return shapes and side
 * effects, so each caller must get back its OWN full cycle's result, just
 * run one at a time per connection to avoid interleaved DB writes.
 */
const cursorRenewalMutex = createKeyedMutex();

export function runCursorRenewalExclusive<T>(
  connectionId: string,
  fn: () => Promise<T>
): Promise<T> {
  return cursorRenewalMutex.run(connectionId, fn as () => Promise<unknown>) as Promise<T>;
}
