"use strict";

/**
 * HTTP client-abort / recoverable-upstream-timeout crash guard
 * (#fix-dev-server-aborted, #12861).
 *
 * Node's http.Server turns an 'error' event on an IncomingMessage/ServerResponse
 * into an uncaughtException (and therefore a process exit) WHENEVER the emitter
 * has no listener. The single most common such error is a *client* abort: the
 * browser closes the TCP socket (navigation, Back/Forward cache, HMR reconnect,
 * cancelling a fetch) while the server is still streaming the response. Node
 * emits `Error: aborted` / `ERR_STREAM_PREMATURE_CLOSE` / `ECONNRESET` on the
 * request stream, and absent a handler it kills the whole server process.
 *
 * That surfaced as "login succeeds, then the dashboard hangs with a wall of
 * `net::ERR_CONNECTION_REFUSED`": after auth the SPA opens many polling
 * connections + a live WebSocket; stray client-side socket closes during
 * navigation/HMR were taking the dev server down.
 *
 * Two more categories were added after the 2026-09-14 agnes-cn upstream storm
 * produced two sibling escapes in production: an intentional combo hedge
 * cancellation (`AbortError: hedge-cancelled` — the sibling leg already won,
 * so the cancellation is expected, not a fault) and undici fetch failures
 * (`TypeError: fetch failed` with a socket-level code) against a flapping
 * upstream. Both are runtime/environmental conditions the request layer
 * already handles; neither is a process-fatal logic bug.
 *
 * A further, unrelated category covers #12861: `directFetchWithBoundedResponseStart`'s
 * response-start timeout (`DIRECT_RESPONSE_START_TIMEOUT`) is a *recoverable*
 * signal `proxyFetch.ts` already retries on a fresh socket — but a narrow
 * timer/promise-settlement race can still deliver its abort reason to a
 * promise nobody is awaiting anymore, which otherwise kills the whole process
 * over a single upstream stall that the retry path was built to handle.
 *
 * Two layers:
 *   1. `attachRequestStreamGuards(req, res)` — per-request listeners that absorb
 *      client-abort errors so they never bubble to the process level. Call it
 *      inside every `http.createServer((req, res) => …)` request listener.
 *   2. `installProcessCrashGuard()` — a last-resort safety net on
 *      `process.on('uncaughtException' | 'unhandledRejection')` that swallows
 *      the same benign errors but otherwise preserves the existing crash
 *      semantics (so genuine bugs still surface). Idempotent.
 *
 * Kept as a `.mjs` module (no build step) so it is importable both from the
 * Node-only dev server (`scripts/dev/run-next.mjs`) and from the TypeScript
 * servers under `src/` (tsconfig `allowJs: true`).
 *
 * @module
 */

/**
 * Abort reasons raised by combo target dispatch. Mirror of
 * open-sse/services/combo/comboAbortReasons.ts — keep the two in sync.
 */
const COMBO_ABORT_REASONS = new Set(["hedge-cancelled", "combo-per-model-timeout"]);

/**
 * Raw string reasons open-sse/utils/streamHandler.ts passes to
 * handleDisconnect() / abortController.abort() when the client goes away.
 */
const CLIENT_DISCONNECT_REASONS = new Set(["request_signal_aborted", "client_closed", "cancelled"]);

/**
 * @param {unknown} err
 * @returns {boolean} true when `err` represents a client closing the
 *   connection rather than a server-side fault.
 */
export function isClientAbortError(err) {
  // open-sse/utils/streamHandler.ts aborts the stream controller with a RAW
  // STRING reason (getClientAbortReason / handleDisconnect), and undici rejects
  // with signal.reason verbatim, so a cancellation can surface at the process
  // level as a bare string rather than an Error object.
  if (typeof err === "string") {
    return COMBO_ABORT_REASONS.has(err) || CLIENT_DISCONNECT_REASONS.has(err);
  }
  if (!err || typeof err !== "object") return false;
  const e = /** @type {NodeJS.ErrnoException} */ (err);
  // Node emits `Error: aborted` (no code) from http.Server#abortIncoming.
  if (e.message === "aborted" || e.message === "Aborted") return true;
  // ANY AbortError/TimeoutError reaching the process level is a raced abort
  // or timeout signal from OmniRoute's own orchestration: client disconnects
  // (`request_signal_aborted`), per-model combo timeouts
  // (`combo-per-model-timeout`), ProxyFetch retry signals, fetch/DOM
  // cancellation. The operation has already failed; killing the process for
  // it only converts one failed request into a full server outage (#12164).
  if (e.name === "AbortError" || e.name === "TimeoutError") return true;
  if (e.code === "DIRECT_RESPONSE_START_TIMEOUT") return true;
  // Combo dispatch cancels a losing hedged target / a stalled target by
  // aborting with `new Error(reason)` for one of the reasons in
  // open-sse/services/combo/comboAbortReasons.ts (targetTimeoutRunner.ts).
  // streamHandler.ts forwards that reason to the stream controller as a plain
  // string, and a leaked abort listener in
  // open-sse/handlers/chatCore/upstreamTimeouts.ts (executeWithUpstreamStartTimeout)
  // rebuilt it via createAbortError() as an AbortError-named Error to reject a
  // promise nothing was awaiting. That unhandledRejection reached this guard,
  // which re-threw it as an uncaughtException. Production exit 2026-08-31:
  //   Error [AbortError]: hedge-cancelled
  // The listener leak is fixed at the source; this stays as the last-resort net.
  // A sibling target winning / a target stalling is never a server fault, so
  // match the exact reason text whatever `name` the thrower stamped on it —
  // some call sites raise a plain `new Error(reason)` with no relabelling at
  // all, so `e.name` alone (checked above) is not enough to catch those.
  // Inlined rather than imported from comboAbortReasons.ts: this file runs
  // under plain node (scripts/dev/run-next.mjs, no tsx) and must not depend on
  // type-stripping being available for that .ts module.
  if (COMBO_ABORT_REASONS.has(String(e.message))) return true;
  // Node ≥20 autoSelectFamily connect attempts aggregate per-address errors
  // (e.g. IPv6 EHOSTUNREACH + IPv4 ETIMEDOUT against Cloudflare fronts). A
  // pure connect-failure aggregate is a transient network condition, not a
  // server fault — absorb it (#12164).
  if (
    e.name === "AggregateError" &&
    Array.isArray(/** @type {AggregateError} */ (e).errors) &&
    /** @type {AggregateError} */ (e).errors.length > 0 &&
    /** @type {AggregateError} */ (e).errors.every(
      (x) => typeof x?.code === "string" && /^(ECONN|EHOST|ENET|ETIMED|EPIPE|EAI_)/.test(x.code)
    )
  ) {
    return true;
  }
  // Socket-level failures arrive as `TypeError: fetch failed` with the real
  // errno on `.cause` (undici wraps the underlying connect/read error). Walk a
  // short cause chain so those transient network conditions are absorbed
  // instead of escaping as "fetch failed" uncaught exceptions (observed:
  // EADDRNOTAVAIL read error on opencode-go egress → exit 7).
  const causes = [e];
  for (let depth = 0; depth < 3; depth += 1) {
    const cause = causes[causes.length - 1]?.cause;
    if (!cause || typeof cause !== "object") break;
    causes.push(/** @type {NodeJS.ErrnoException} */ (cause));
  }
  const anyNetworkCode = causes.some((c) => {
    if (
      typeof c.code === "string" &&
      /^(ECONN|EHOST|ENET|ETIMED|EPIPE|EADDR|EAI_|ENOTCONN)/.test(c.code)
    ) {
      return true;
    }
    // An AggregateError cause carries its members' codes on `.errors`, not on
    // itself (undici autoSelectFamily connect failures nest this way).
    if (
      c.name === "AggregateError" &&
      Array.isArray(/** @type {AggregateError} */ (c).errors) &&
      /** @type {AggregateError} */ (c).errors.length > 0
    ) {
      return /** @type {Array<NodeJS.ErrnoException>} */ (c.errors).every(
        (member) =>
          typeof member?.code === "string" &&
          /^(ECONN|EHOST|ENET|ETIMED|EPIPE|EADDR|EAI_|ENOTCONN)/.test(member.code)
      );
    }
    return false;
  });
  if (anyNetworkCode) return true;
  switch (e.code) {
    case "ERR_STREAM_PREMATURE_CLOSE":
    case "ECONNRESET":
    case "EPIPE":
    case "ECONNABORTED":
    case "ETIMEDOUT":
    case "EHOSTUNREACH":
    case "ENETUNREACH":
    case "ECONNREFUSED":
    case "EADDRNOTAVAIL":
    case "EAI_AGAIN":
    case "ENOTCONN":
    case "ECANCELED":
      return true;
    default:
      return false;
  }
}

/**
 * #12861: a recoverable upstream-fetch timeout that `proxyFetch.ts` already
 * retries on a fresh socket (see `open-sse/utils/directResponseStartTimeout.ts`).
 * A narrow timer/promise-settlement race can still deliver its abort reason to
 * a promise nobody is awaiting anymore, which otherwise surfaces here as an
 * unhandledRejection/uncaughtException — even though the retry path already
 * handles this exact condition and normally logs it as a plain 504.
 *
 * Kept as a bare string-code check (no import of the `.ts` source of truth)
 * because this file has to stay build-free/plain-JS-loadable — see the module
 * docstring. `DIRECT_RESPONSE_START_TIMEOUT_CODE` in
 * `open-sse/utils/directResponseStartTimeout.ts` is the canonical definition;
 * keep this string literal in sync with it.
 *
 * @param {unknown} err
 * @returns {boolean}
 */
export function isRecoverableUpstreamTimeoutError(err) {
  // Same reason-shape tolerance as isIntentionalComboAbort: a bare string
  // reason rejects waiters with the string itself, not an Error object.
  if (err === "DIRECT_RESPONSE_START_TIMEOUT") return true;
  if (!err || typeof err !== "object") return false;
  return /** @type {NodeJS.ErrnoException} */ (err).code === "DIRECT_RESPONSE_START_TIMEOUT";
}

/**
 * Intentional combo-leg cancellation. When a combo dispatches hedged targets,
 * the losing legs are aborted with a distinctive reason once a sibling wins
 * (`hedge-cancelled`) or exceeds its per-model budget (`combo-per-model-timeout`)
 * — see `COMBO_HEDGE_CANCELLED_REASON` / `COMBO_PER_MODEL_TIMEOUT_REASON` in
 * `open-sse/services/combo/comboAbortReasons.ts` (bare literals duplicated here
 * because this file must stay build-free; keep in sync). On 2026-09-14 such a
 * cancellation escaped its promise chain and killed production with
 * `Error [AbortError]: hedge-cancelled` — the request it belonged to had
 * already completed 200 via the winning leg.
 *
 * Distinct from a *client* abort: only these exact reasons qualify, so an
 * AbortError from an unknown subsystem still crashes loudly.
 *
 * @param {unknown} err
 * @returns {boolean}
 */
export function isIntentionalComboAbort(err) {
  const reasons = new Set(["hedge-cancelled", "combo-per-model-timeout"]);
  // AbortSignal.reason is whatever was handed to abort(): a raw string
  // reason rejects waiters with the string itself, not an Error object.
  if (typeof err === "string") return reasons.has(err);
  if (!err || typeof err !== "object") return false;
  const e = /** @type {NodeJS.ErrnoException} */ (err);
  if (e.name !== "AbortError") return false;
  if (reasons.has(String(e.message))) return true;
  const cause = /** @type {{ cause?: unknown }} */ (err).cause;
  return typeof cause === "string" && reasons.has(cause);
}

/**
 * A network/IO failure against an upstream or its proxy — undici surfaces it
 * as `TypeError: fetch failed` (fixed message; the syscall code rides on
 * `cause`) or as an error carrying a `PROXY_UNREACHABLE` / `UND_ERR_*` code.
 * On 2026-09-14 one of these (`PROXY_UNREACHABLE` / ECONNRESET to
 * api.agnes-ai.cn) escaped as an uncaughtException and killed production.
 * The request that triggered the fetch already fails through the normal
 * error path; the stray copy delivered to nobody must not be process-fatal.
 *
 * The "fetch failed" message match is exact on purpose: it is undici's fixed
 * wrapping message, so arbitrary TypeErrors still crash loudly.
 *
 * @param {unknown} err
 * @returns {boolean}
 */
export function isUpstreamNetworkError(err) {
  if (!err || typeof err !== "object") return false;
  const e = /** @type {NodeJS.ErrnoException} */ (err);
  if (e.name === "TypeError" && e.message === "fetch failed") return true;
  switch (e.code) {
    case "PROXY_UNREACHABLE":
    case "UND_ERR_SOCKET":
    case "UND_ERR_CONNECT_TIMEOUT":
    case "UND_ERR_HEADERS_TIMEOUT":
    case "UND_ERR_BODY_TIMEOUT":
    case "ECONNREFUSED":
    case "EHOSTUNREACH":
    case "ENETUNREACH":
    case "EAI_AGAIN":
      return true;
    default:
      return false;
  }
}

/**
 * Decide whether a process-level uncaughtException/unhandledRejection should be
 * swallowed (benign client-abort, or a recoverable upstream timeout that a
 * retry path already handles — #12861) or allowed to surface (genuine bug).
 *
 * Pure + exported so it can be unit-tested without poking process listeners.
 *
 * @param {unknown} err
 * @param {string | undefined} origin  Node's uncaughtException origin (e.g.
 *   "uncaughtException" / "unhandledRejection"); absent/empty for rejections.
 * @returns {boolean} true => swallow (log only), false => re-throw / let crash.
 */
export function shouldSwallowUncaught(err, origin) {
  if (
    !isClientAbortError(err) &&
    !isRecoverableUpstreamTimeoutError(err) &&
    !isIntentionalComboAbort(err) &&
    !isUpstreamNetworkError(err)
  ) {
    return false;
  }
  // Only swallow when the origin matches what the guard installed for. If some
  // other subsystem raised it (e.g. a deliberate `throw` in a domain), keep the
  // existing crash semantics.
  return !origin || origin === "uncaughtException" || origin === "unhandledRejection";
}

/**
 * Attach `error` listeners to a request/response pair that swallow client-abort
 * errors. Idempotent per (req, res) pair via a Symbol flag.
 *
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 */
export function attachRequestStreamGuards(req, res) {
  const flag = Symbol.for("omniroute.requestAbortGuard");
  if (req[flag] || res[flag]) return;
  req[flag] = true;
  res[flag] = true;

  req.on("error", (err) => {
    if (!isClientAbortError(err)) {
      // Re-emit a genuine request error through the normal channel so it is
      // still observable in logs, but never as an uncaughtException.
      console.error("[server] request stream error:", err);
    }
  });

  res.on("error", (err) => {
    if (!isClientAbortError(err)) {
      console.error("[server] response stream error:", err);
    }
  });
}

let crashGuardInstalled = false;

/**
 * Install process-level safety nets. Idempotent. Benign client-abort errors are
 * logged once and swallowed; everything else is re-thrown on a fresh stack so
 * the process keeps its current crash semantics (genuine bugs still crash/hang
 * loudly, and a supervisor or test harness sees them).
 *
 * @param {(level: "warn" | "error", ...args: unknown[]) => void} [log]
 */
export function installProcessCrashGuard(log) {
  if (crashGuardInstalled) return;
  crashGuardInstalled = true;

  // `console` is an object, not a callable: `log ?? console` followed by
  // `logger("warn", ...)` throws TypeError and kills the process on the very
  // abort the guard exists to swallow. Default to console.warn as a function.
  const logger = typeof log === "function" ? log : console.warn.bind(console);

  process.on("uncaughtException", (err, origin) => {
    if (shouldSwallowUncaught(err, origin)) {
      // The warn line is the only evidence a swallowed error ever happened;
      // pass the full error object so the stack survives.
      logger("warn", "[server] swallowed benign uncaughtException:", err);
      return;
    }
    throw err;
  });

  process.on("unhandledRejection", (reason) => {
    if (shouldSwallowUncaught(reason, "unhandledRejection")) {
      logger("warn", "[server] swallowed benign unhandledRejection:", reason);
      return;
    }
    throw reason;
  });
}
