// #8085 — anonymous fingerprint fallback for keyless Pollinations image requests.
//
// Chat requests to Pollinations already fall back to a fingerprint-pool
// session when no apiKey/accessToken is configured (see
// PollinationsExecutor.execute()'s `isAnonymous` branch in
// open-sse/executors/pollinations.ts). The image path
// (open-sse/handlers/imageGeneration.ts::handleOpenAIImageGeneration) had no
// equivalent: a keyless Pollinations image request went out with no
// Authorization header AND no fingerprint headers, so Pollinations' own
// upstream legitimately rejected it with a 401 — even with a perfectly
// valid OmniRoute API key. This module mirrors that same anonymous
// session-pool fallback for the image path.

import { SessionPool } from "../../services/sessionPool/sessionPool.ts";
import { DEFAULT_POOL_CONFIG } from "../../services/sessionPool/types.ts";
import type { Session } from "../../services/sessionPool/session.ts";

let pollinationsImagePool: SessionPool | null = null;

function getPollinationsImagePool(): SessionPool {
  if (!pollinationsImagePool) {
    pollinationsImagePool = new SessionPool("pollinations", DEFAULT_POOL_CONFIG);
    pollinationsImagePool.warmUp(DEFAULT_POOL_CONFIG.minSessions).catch(() => {});
  }
  return pollinationsImagePool;
}

/**
 * When `providerId` is Pollinations and no real key/token is present, acquire
 * a fingerprint-pool session and return its headers merged over `headers`,
 * plus the session so the caller can release it once the upstream call is
 * done. No-op (returns `{ headers, session: null }`) for every other
 * provider or when a real key is configured.
 */
export async function applyPollinationsAnonymousFallback(
  providerId: string,
  token: string | undefined,
  headers: Record<string, string>
): Promise<{ headers: Record<string, string>; session: Session | null }> {
  if (providerId !== "pollinations" || token) {
    return { headers, session: null };
  }

  const pool = getPollinationsImagePool();
  let session: Session | null = null;
  try {
    session = await pool.acquireBlocking(10_000);
  } catch {
    // Pool exhausted — fall through without fingerprint headers rather than
    // block the request indefinitely.
    session = null;
  }

  if (!session) {
    return { headers, session: null };
  }

  return {
    headers: { ...headers, ...session.buildHeaders() },
    session,
  };
}

/** Report the outcome of an anonymous Pollinations image request back to the pool. */
export function reportPollinationsAnonOutcome(session: Session | null, status: number | undefined): void {
  if (!session || !pollinationsImagePool) return;
  if (status === 429) {
    pollinationsImagePool.reportCooldown(session);
  } else if (typeof status === "number" && status >= 500) {
    pollinationsImagePool.reportDead(session);
  } else {
    pollinationsImagePool.reportSuccess(session);
  }
  session.release();
}
