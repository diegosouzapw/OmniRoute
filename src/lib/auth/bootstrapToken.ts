/**
 * One-shot fresh-install bootstrap token (#14296).
 *
 * Docker's port-forwarding NAT (and Docker Desktop's VM relay) changes the TCP
 * peer address the app sees inside the container — it is the docker0 bridge
 * gateway (e.g. 172.17.0.1), never 127.0.0.1 — so a container published with
 * `-p 20128:20128` cannot be told apart from an arbitrary remote caller by
 * peer address alone. Owner decision (2026-09-21): NEVER treat that gateway
 * peer as loopback — every external client arrives with the same peer, so
 * doing so would open the fresh-install bootstrap window (and the LOCAL_ONLY
 * spawn-capable route tier, Hard Rules #15/#17) to the whole internet.
 *
 * Instead, when a fresh install (no password / OIDC / INITIAL_PASSWORD /
 * session) sees a non-loopback caller try to complete onboarding, the server
 * mints a random, single-use token, prints it to the process/container log
 * (stdout — reachable only to whoever can already read the container's logs,
 * i.e. the operator), and accepts it as an alternate proof of "this is the
 * local operator" for exactly one onboarding bootstrap write
 * (`POST /api/settings/require-login`). The general `PATCH /api/settings` is
 * NOT token-reachable — once requireLogin=false is written (or the operator
 * logs in with the new password) the wizard's setupComplete PATCH passes on
 * its own. The token is invalidated the first time it is successfully
 * consumed.
 *
 * This module is a pure in-memory, per-process singleton — the token cannot
 * outlive the process, and a restart mints a fresh one, matching the
 * "wizard shows the log line, operator pastes it" flow it exists for.
 */
import { randomBytes, timingSafeEqual } from "node:crypto";

let currentToken: string | null = null;
let announced = false;

function generateToken(): string {
  return randomBytes(24).toString("base64url");
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * Lazily mints (once per process) and returns the current bootstrap token,
 * printing it to stdout the first time it is minted so an operator watching
 * `docker logs` can retrieve it. Callers gate this behind "no credentials
 * configured anywhere" — a normal install with a password never sees it.
 */
export function getOrCreateBootstrapToken(logger: Pick<Console, "log"> = console): string {
  if (!currentToken) {
    currentToken = generateToken();
    announced = false;
  }
  if (!announced) {
    announced = true;
    logger.log(
      "[BOOTSTRAP] Fresh install detected from a non-loopback peer (e.g. a Docker " +
        "port-forwarded connection) with no password configured yet. Paste this " +
        "ONE-TIME bootstrap token into the onboarding wizard to continue: " +
        currentToken
    );
  }
  return currentToken;
}

/**
 * Non-mutating check: does `candidate` match the current token? Safe to call
 * from multiple independent auth layers for the same request (the policy
 * gate and a route's own guard) without consuming it early.
 */
export function peekBootstrapToken(candidate: string | null | undefined): boolean {
  if (!currentToken || !candidate) return false;
  return timingSafeStringEqual(currentToken, candidate);
}

/**
 * Validates `candidate` and, on a match, invalidates the token (one-shot).
 * Route handlers call this once, after a bootstrap write has actually
 * succeeded, so the token cannot be replayed for a second write.
 */
export function consumeBootstrapToken(candidate: string | null | undefined): boolean {
  if (!peekBootstrapToken(candidate)) return false;
  currentToken = null;
  announced = false;
  return true;
}

/** Test helper — resets the module singleton between test cases. */
export function __resetBootstrapTokenForTest(): void {
  currentToken = null;
  announced = false;
}
