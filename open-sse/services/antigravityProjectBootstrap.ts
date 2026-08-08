/**
 * Antigravity project bootstrap — loadCodeAssist + onboardUser.
 *
 * The Google Cloud Code Assist API (/v1internal:models) requires a prior
 * /v1internal:loadCodeAssist call to assign a project context to the
 * OAuth token. Without this bootstrap, :models returns 404.
 *
 * This module provides an idempotent ensureAntigravityProjectAssigned()
 * helper that is called once per access-token before every discovery
 * attempt. Results are memoized per-token for the process lifetime to
 * avoid redundant round-trips.
 *
 * When loadCodeAssist returns no project (account never onboarded),
 * the fallback calls onboardUser to create the project, then retries.
 */

import {
  getAntigravityContentHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "./antigravityHeaders.ts";
import { extractCodeAssistOnboardTierId } from "./codeAssistSubscription.ts";
import type { AntigravityClientProfile } from "./antigravityClientProfile.ts";
import { ANTIGRAVITY_BOOTSTRAP_BASE_URLS, getAntigravityOnboardUrls } from "../config/antigravityUpstream.ts";

const LOAD_CODE_ASSIST_PATH = "/v1internal:loadCodeAssist";
const BOOTSTRAP_TIMEOUT_MS = 8_000;
const ONBOARD_TIMEOUT_MS = 15_000;
const DEFAULT_TIER_ID = "legacy-tier";

/** Ordered list of loadCodeAssist endpoint URLs. */
export function getAntigravityLoadCodeAssistUrls(): string[] {
  return ANTIGRAVITY_BOOTSTRAP_BASE_URLS.map((base) => `${base}${LOAD_CODE_ASSIST_PATH}`);
}

/** Max entries in the per-token caches (prevents unbounded growth). */
const MAX_CACHE_SIZE = 256;

/** LRU-style Map: deleting and re-inserting moves the key to the end. */
function evictOldest(cache: Map<string, unknown>): void {
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

/** Per-token memoization cache (lives for the process lifetime). */
const projectCache = new Map<string, string>();

/** Per-key lock to prevent concurrent onboard attempts for the same token. */
const onboardLocks = new Map<string, Promise<boolean>>();

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

function getProjectCacheKey(accessToken: string, clientProfile: AntigravityClientProfile): string {
  return `${clientProfile}:${accessToken}`;
}

type LoadCodeAssistResult = { projectId: string | null; tierId: string };

/**
 * Attempt loadCodeAssist against each known base URL in order.
 * Returns the discovered project id and tier id, or null projectId if all endpoints fail.
 */
async function tryLoadCodeAssist(
  accessToken: string,
  fetchImpl: FetchLike,
  clientProfile: AntigravityClientProfile,
  signal?: AbortSignal
): Promise<LoadCodeAssistResult> {
  const urls = getAntigravityLoadCodeAssistUrls();
  const headers = getAntigravityContentHeaders(clientProfile, accessToken);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    if (signal?.aborted) throw signal.reason;
    try {
      const timeoutSignal = AbortSignal.timeout(BOOTSTRAP_TIMEOUT_MS);
      const response = await fetchImpl(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ metadata: getAntigravityLoadCodeAssistMetadata() }),
        signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
      });

      if (!response.ok) {
        console.warn(
          `[models] antigravity loadCodeAssist failed at ${url} (${response.status}) — trying next`
        );
        continue;
      }

      const data = (await response.json()) as Record<string, unknown>;

      // cloudaicompanionProject may be a plain string or an object with an id field.
      const raw = data.cloudaicompanionProject;
      const projectId =
        typeof raw === "string"
          ? raw.trim()
          : raw &&
              typeof raw === "object" &&
              typeof (raw as Record<string, unknown>).id === "string"
            ? ((raw as Record<string, unknown>).id as string).trim()
            : "";

      const tierId = extractCodeAssistOnboardTierId(data) || DEFAULT_TIER_ID;

      if (projectId) {
        return { projectId, tierId };
      }

      // Continue to next URL if available — a different endpoint might
      // have the project. Only return empty when this is the last URL.
      if (i === urls.length - 1) {
        return { projectId: null, tierId };
      }
      console.warn(
        `[models] antigravity loadCodeAssist at ${url} returned no project id — trying next`
      );
    } catch (error) {
      if (signal?.aborted || (error instanceof Error && error.name === "AbortError")) {
        throw signal?.reason ?? error;
      }
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`[models] antigravity loadCodeAssist threw for ${url}: ${msg} — trying next`);
    }
  }
  return { projectId: null, tierId: DEFAULT_TIER_ID };
}

/**
 * Attempt onboardUser to create a Cloud Code project for the account.
 * Called when loadCodeAssist returns no project — the account has never
 * been onboarded. Returns true if any endpoint reports success.
 */
async function tryOnboardUser(
  accessToken: string,
  fetchImpl: FetchLike,
  clientProfile: AntigravityClientProfile,
  tierId: string,
  signal?: AbortSignal
): Promise<boolean> {
  const urls = getAntigravityOnboardUrls();
  const headers = getAntigravityContentHeaders(clientProfile, accessToken);

  for (const url of urls) {
    if (signal?.aborted) throw signal.reason;
    try {
      const timeoutSignal = AbortSignal.timeout(ONBOARD_TIMEOUT_MS);
      const response = await fetchImpl(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          tier_id: tierId,
          metadata: getAntigravityLoadCodeAssistMetadata(),
        }),
        signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
      });

      if (response.ok) {
        return true;
      }

      console.warn(
        `[models] antigravity onboardUser failed at ${url} (${response.status}) — trying next`
      );
    } catch (error) {
      if (signal?.aborted || (error instanceof Error && error.name === "AbortError")) {
        throw signal?.reason ?? error;
      }
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`[models] antigravity onboardUser threw for ${url}: ${msg} — trying next`);
    }
  }
  return false;
}

/** Per-token memoization for accounts we already tried onboarding (avoid repeated calls). */
const onboardAttemptedCache = new Set<string>();

function addToOnboardAttemptedCache(key: string): void {
  if (onboardAttemptedCache.size >= MAX_CACHE_SIZE) {
    const oldest = onboardAttemptedCache.values().next().value;
    if (oldest !== undefined) onboardAttemptedCache.delete(oldest);
  }
  onboardAttemptedCache.add(key);
}

/**
 * Ensure a project is assigned to the given access token by calling
 * loadCodeAssist if not already cached. Idempotent — repeated calls
 * for the same token return the cached result without a network round-trip.
 *
 * Failures are non-fatal: the caller should proceed with the :models
 * request regardless (the stored project_id in the DB may still be valid).
 *
 * @param accessToken  The OAuth bearer token for the current connection.
 * @param fetchImpl    Injected fetch implementation (defaults to globalThis.fetch).
 */
export async function ensureAntigravityProjectAssigned(
  accessToken: string,
  fetchImpl: FetchLike = fetch,
  clientProfile: AntigravityClientProfile = "ide",
  signal?: AbortSignal
): Promise<string | undefined> {
  const cacheKey = getProjectCacheKey(accessToken, clientProfile);
  if (projectCache.has(cacheKey)) {
    const cached = projectCache.get(cacheKey)!;
    // Touch on read: delete+reinsert moves this entry to the end (LRU).
    projectCache.delete(cacheKey);
    projectCache.set(cacheKey, cached);
    return cached;
  }

  const { projectId: initialProjectId, tierId } = await tryLoadCodeAssist(
    accessToken, fetchImpl, clientProfile, signal
  );

  let projectId = initialProjectId;

  // loadCodeAssist is read-only — if the account was never onboarded, it returns
  // empty. Call onboardUser to create the project, then retry discovery.
  if (!projectId && !onboardAttemptedCache.has(cacheKey)) {
    // Per-key lock: concurrent calls for the same token share one onboard attempt.
    let lock = onboardLocks.get(cacheKey);
    if (!lock) {
      lock = (async () => {
        let aborted = false;
        try {
          const onboarded = await tryOnboardUser(
            accessToken, fetchImpl, clientProfile, tierId, signal
          );
          if (onboarded) {
            const retry = await tryLoadCodeAssist(
              accessToken, fetchImpl, clientProfile, signal
            );
            if (retry.projectId) {
              evictOldest(projectCache);
              projectCache.set(cacheKey, retry.projectId);
              return true;
            }
          }
          return false;
        } catch (e) {
          aborted = signal?.aborted === true;
          return false;
        } finally {
          onboardLocks.delete(cacheKey);
          if (!aborted) addToOnboardAttemptedCache(cacheKey);
        }
      })();
      onboardLocks.set(cacheKey, lock);
    }
    const success = await lock;
    if (success) {
      const cached = projectCache.get(cacheKey);
      if (cached) return cached;
    }
  }

  if (projectId) {
    evictOldest(projectCache);
    projectCache.set(cacheKey, projectId);
    return projectId;
  }
  return undefined;
}

/** Exported for tests. */
export function clearAntigravityProjectCache(): void {
  projectCache.clear();
  onboardAttemptedCache.clear();
  onboardLocks.clear();
}

/** Exported for tests — inspect cache state. */
export function getAntigravityProjectFromCache(
  accessToken: string,
  clientProfile: AntigravityClientProfile = "ide"
): string | undefined {
  return projectCache.get(getProjectCacheKey(accessToken, clientProfile));
}
