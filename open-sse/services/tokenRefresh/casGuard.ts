// @ts-nocheck
//
// Compare-and-swap (CAS) guard on the refresh persist — extracted from
// open-sse/services/tokenRefresh.ts. See ../shared.ts for provenance notes.
//
// #4038: Fix A makes [network refresh + DB write] atomic *for a single
// connection's mutex*. It does NOT protect against a THIRD writer (a sibling
// process, a concurrent HealthCheck, or a replica) landing a fresher rotation
// on the same `connection_id` between the moment the caller read the row and
// the moment this persist runs. Overwriting that fresher row reverts the
// sibling's rotation, the next caller loads the reverted (now-consumed)
// refresh_token, and Auth0/Anthropic revoke the whole token family (the 1352×
// claude/aa5dd5cf invalidation storm).
//
// The CAS guard carries the refresh_token the caller PRESENTED (the version
// token, since refresh_tokens rotate on every refresh) plus a `reread` of the
// row's current refresh_token. Right before persisting, `getAccessToken`
// re-reads and, if a concurrent writer already rotated the row past the
// presented token, SKIPS the persist so the DB stays at the fresher state. The
// caller still receives the new accessToken — upstream already authenticated
// the request; only the DB write is skipped. No active guard ⇒ behavior is
// byte-identical to before (opt-in).
import { AsyncLocalStorage } from "node:async_hooks";
import { wasRefreshTokenRotated } from "../refreshSerializer.ts";
import type { RefreshLogger } from "./shared.ts";

type CasGuard = {
  /** The refresh_token the caller presented for this refresh (CAS version token). */
  expectedRefreshToken: string | null;
  /** Re-reads the CURRENT persisted refresh_token for this connection (decrypted). */
  reread: () => Promise<string | null | undefined>;
};
const casGuardStore = new AsyncLocalStorage<CasGuard>();
const casGuardStats = { skipped: 0, persisted: 0 };

export function runWithCasGuard<T>(
  guard: CasGuard | undefined | null,
  fn: () => Promise<T>
): Promise<T> {
  if (!guard) return fn();
  return casGuardStore.run(guard, fn);
}

export function getActiveCasGuard(): CasGuard | undefined {
  return casGuardStore.getStore();
}

/** Skip/persist counters for observability + tests. */
export function getCasGuardStats(): { skipped: number; persisted: number } {
  return { ...casGuardStats };
}

/** Test-only: reset the CAS counters between cases. */
export function _resetCasGuardStats(): void {
  casGuardStats.skipped = 0;
  casGuardStats.persisted = 0;
}

/**
 * Returns true when the persist should be SKIPPED because a concurrent writer
 * already rotated the row's refresh_token past the one we presented (CAS mismatch).
 * Best-effort: any reread failure falls through to persist (never blocks recovery).
 */
export async function casGuardShouldSkipPersist(log?: RefreshLogger): Promise<boolean> {
  const guard = getActiveCasGuard();
  if (!guard || !guard.expectedRefreshToken) return false;
  let current: string | null | undefined;
  try {
    current = await guard.reread();
  } catch {
    return false; // reread failed — fall through to persist (best-effort)
  }
  // wasRefreshTokenRotated is true iff both are non-empty AND current !== expected.
  if (wasRefreshTokenRotated(guard.expectedRefreshToken, current)) {
    casGuardStats.skipped++;
    log?.warn?.(
      "TOKEN_REFRESH",
      "CAS guard: skipping persist — a concurrent writer already rotated the refresh_token (#4038)"
    );
    return true;
  }
  casGuardStats.persisted++;
  return false;
}
