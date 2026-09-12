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
import {
  ANTIGRAVITY_BOOTSTRAP_BASE_URLS,
  getAntigravityOnboardUrls,
} from "../config/antigravityUpstream.ts";

const LOAD_CODE_ASSIST_PATH = "/v1internal:loadCodeAssist";
const BOOTSTRAP_TIMEOUT_MS = 8_000;
const ONBOARD_TIMEOUT_MS = 15_000;
const DEFAULT_TIER_ID = "legacy-tier";

// onboardUser is a Long-Running Operation: Google frequently answers the
// first call with {"done": false} (no cloudaicompanionProject field yet) and
// expects the SAME request re-sent every couple of seconds until the
// operation settles with {"done": true, response: {...}}. Treating the
// first "done:false" response as "no project" (BYOP) misclassifies a normal
// in-progress onboarding as "bring your own project" and permanently caches
// that wrong verdict. Poll bounded, matching 9router's onboardUser().
const ONBOARD_POLL_MAX_ATTEMPTS = 5;
const ONBOARD_POLL_INTERVAL_MS = 2_000;

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
const onboardLocks = new Map<string, Promise<void>>();

/**
 * Sentinel returned by ensureAntigravityProjectAssigned when Google's
 * onboardUser completed but did NOT return a project id — no automatic
 * project creation for standard-tier (personal) accounts (tracked in #8491),
 * so Google requires a user-defined GCP project (BYOP). The
 * caller must fail fast with a clear "enter your GCP project id" error
 * instead of retrying (a fabricated id gets a delayed 429 RESOURCE_EXHAUSTED).
 */
export const ANTIGRAVITY_REQUIRES_MANUAL_PROJECT = "__REQUIRES_GCP_PROJECT__";

/**
 * Per-token cache of accounts Google told us to Bring Your Own Project.
 * Permanent for the process lifetime (LRU-capped): re-running onboardUser
 * for such an account is a pointless ~18s quota-check round-trip that
 * always comes back empty. Cleared by clearAntigravityProjectCache(); a
 * manually-entered project id (stored on the connection) short-circuits
 * before this is consulted.
 */
const requiresManualProjectCache = new Set<string>();

function markRequiresManualProject(key: string): void {
  if (requiresManualProjectCache.size >= MAX_CACHE_SIZE) {
    const oldest = requiresManualProjectCache.values().next().value;
    if (oldest !== undefined) requiresManualProjectCache.delete(oldest);
  }
  requiresManualProjectCache.add(key);
}

/** Outcome of an onboardUser attempt — three-way so the caller can distinguish
 * "transient failure (retry later)" from "Google says bring your own project". */
type AntigravityOnboardStatus = "onboarded" | "requires_manual_project" | "failed";

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
  _clientProfile: AntigravityClientProfile,
  signal?: AbortSignal
): Promise<LoadCodeAssistResult> {
  const urls = getAntigravityLoadCodeAssistUrls();
  const headers = getAntigravityContentHeaders(accessToken);

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
 * Extract the project id from a settled ({done:true}) onboardUser response body.
 * The documented LRO shape nests it under `response.cloudaicompanionProject`
 * (matches 9router's onboardUser and Google's Operation envelope), but some
 * observed responses put it at the top level — check both.
 */
function extractProjectIdFromOnboardResponse(data: Record<string, unknown> | null): string | null {
  const nested = (data?.response as Record<string, unknown> | undefined)?.cloudaicompanionProject;
  const project = nested ?? data?.cloudaicompanionProject;
  if (typeof project === "string") {
    const id = project.trim();
    return id || null;
  }
  if (project && typeof project === "object") {
    const id = (project as Record<string, unknown>).id;
    if (typeof id === "string" && id.trim()) return id.trim();
  }
  return null;
}

/**
 * Attempt onboardUser to create a Cloud Code project for the account.
 * Called when loadCodeAssist returns no project — the account has never
 * been onboarded. Polls the same endpoint on {done:false} responses (an
 * in-progress LRO) before concluding anything about the account.
 */
async function tryOnboardUser(
  accessToken: string,
  fetchImpl: FetchLike,
  _clientProfile: AntigravityClientProfile,
  tierId: string,
  signal?: AbortSignal
): Promise<AntigravityOnboardStatus> {
  const urls = getAntigravityOnboardUrls();
  const headers = getAntigravityContentHeaders(accessToken);
  const body = JSON.stringify({
    tier_id: tierId,
    metadata: getAntigravityLoadCodeAssistMetadata(),
  });

  for (const url of urls) {
    for (let attempt = 1; attempt <= ONBOARD_POLL_MAX_ATTEMPTS; attempt++) {
      if (signal?.aborted) throw signal.reason;
      try {
        const timeoutSignal = AbortSignal.timeout(ONBOARD_TIMEOUT_MS);
        const response = await fetchImpl(url, {
          method: "POST",
          headers,
          body,
          signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
        });

        if (!response.ok) {
          console.warn(
            `[models] antigravity onboardUser failed at ${url} (${response.status}) — trying next`
          );
          break;
        }

        const data = (await response.json().catch(() => null)) as Record<string, unknown> | null;

        // Only an EXPLICIT `done: false` means "in-progress LRO, poll again".
        // A proper Google Operation always carries `done` when it is one; a
        // response with `done` absent entirely (e.g. `{}`) is not an LRO in
        // progress — it's Google's immediate, settled "no project" answer for
        // BYOP accounts (#8491) and must fall through to that classification
        // on the first attempt, same as before this polling was added.
        if (data?.done === false) {
          // In-progress LRO — Google hasn't decided (project created, or
          // BYOP required) yet. Re-send the same request after a short wait.
          if (attempt < ONBOARD_POLL_MAX_ATTEMPTS) {
            console.warn(
              `[models] antigravity onboardUser at ${url} not done yet (attempt ${attempt}/${ONBOARD_POLL_MAX_ATTEMPTS}) — waiting`
            );
            await new Promise((resolve) => setTimeout(resolve, ONBOARD_POLL_INTERVAL_MS));
            continue;
          }
          console.warn(
            `[models] antigravity onboardUser at ${url} still not done after ${ONBOARD_POLL_MAX_ATTEMPTS} attempts — treating as failed`
          );
          break;
        }

        // done:true — Google has settled the operation. Accounts Google
        // expects to Bring Their Own Project answer with done:true and no
        // cloudaicompanionProject — no automatic project creation for
        // standard-tier/personal accounts (tracked in #8491). Only now is it
        // safe to draw that conclusion.
        if (extractProjectIdFromOnboardResponse(data)) {
          return "onboarded";
        }
        console.warn(
          `[models] antigravity onboardUser done but no project in response at ${url} — Google BYOP (user-defined GCP project) required`
        );
        return "requires_manual_project";
      } catch (error) {
        if (signal?.aborted || (error instanceof Error && error.name === "AbortError")) {
          throw signal?.reason ?? error;
        }
        const msg = error instanceof Error ? error.message : String(error);
        console.warn(`[models] antigravity onboardUser threw for ${url}: ${msg} — trying next`);
        break;
      }
    }
  }
  return "failed";
}

/**
 * Per-token failure backoff for the onboardUser creation path.
 *
 * A FAILED onboard attempt must never be memoized as "done": a transient
 * upstream/network error would otherwise poison the account for the whole
 * process lifetime, so every later request 422s with "Missing Google
 * projectId" even though onboarding would succeed on retry. Instead we record
 * WHEN a failure happened and only skip re-attempts while the short backoff
 * window is open — the account heals itself on the next request after it
 * expires. Successful discoveries are memoized in `projectCache` (with LRU
 * eviction) and clear any pending failure marker.
 */
const onboardFailureAt = new Map<string, number>();
const ONBOARD_RETRY_BACKOFF_MS = 5 * 60 * 1000;

function markOnboardFailure(key: string): void {
  if (onboardFailureAt.size >= MAX_CACHE_SIZE) {
    const oldest = onboardFailureAt.keys().next().value;
    if (oldest !== undefined) onboardFailureAt.delete(oldest);
  }
  onboardFailureAt.set(key, Date.now());
}

function isOnboardOnBackoff(key: string): boolean {
  const failedAt = onboardFailureAt.get(key);
  if (failedAt === undefined) return false;
  if (Date.now() - failedAt >= ONBOARD_RETRY_BACKOFF_MS) {
    onboardFailureAt.delete(key);
    return false;
  }
  return true;
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
  clientProfile: AntigravityClientProfile = "cli",
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
    accessToken,
    fetchImpl,
    clientProfile,
    signal
  );

  let projectId = initialProjectId;

  // Google told us this account must Bring Its Own Project — fail fast with
  // the sentinel instead of repeating the pointless ~18s onboard round-trip.
  if (!projectId && requiresManualProjectCache.has(cacheKey)) {
    return ANTIGRAVITY_REQUIRES_MANUAL_PROJECT;
  }

  // loadCodeAssist is read-only — if the account was never onboarded, it returns
  // empty. Call onboardUser to create the project, then retry discovery.
  // Re-attempts are bounded by a short failure backoff (not a permanent memo),
  // so a transient onboard failure heals on the next request. Accounts Google
  // marks BYOP are cached permanently and short-circuit above.
  if (!projectId && !isOnboardOnBackoff(cacheKey)) {
    // Per-key lock: concurrent calls for the same token share one onboard attempt.
    let lock = onboardLocks.get(cacheKey);
    if (!lock) {
      lock = (async () => {
        let aborted = false;
        let succeeded = false;
        let requiresManual = false;
        try {
          const status = await tryOnboardUser(
            accessToken,
            fetchImpl,
            clientProfile,
            tierId,
            signal
          );
          if (status === "requires_manual_project") {
            markRequiresManualProject(cacheKey);
            requiresManual = true;
            return;
          }
          if (status === "onboarded") {
            const retry = await tryLoadCodeAssist(accessToken, fetchImpl, clientProfile, signal);
            if (retry.projectId) {
              evictOldest(projectCache);
              projectCache.set(cacheKey, retry.projectId);
              succeeded = true;
              return;
            }
          }
        } catch (e) {
          aborted = signal?.aborted === true;
          return;
        } finally {
          onboardLocks.delete(cacheKey);
          if (!aborted && !requiresManual) {
            if (succeeded) onboardFailureAt.delete(cacheKey);
            else markOnboardFailure(cacheKey);
          }
        }
      })();
      onboardLocks.set(cacheKey, lock);
    }
    await lock;
    if (projectCache.has(cacheKey)) return projectCache.get(cacheKey);
    if (requiresManualProjectCache.has(cacheKey)) return ANTIGRAVITY_REQUIRES_MANUAL_PROJECT;
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
  onboardFailureAt.clear();
  requiresManualProjectCache.clear();
  onboardLocks.clear();
}

/** Test-only: clear the onboard failure backoff (simulates backoff expiry). */
export function clearAntigravityOnboardBackoff(key?: string): void {
  if (key) onboardFailureAt.delete(key);
  else onboardFailureAt.clear();
}

/** Exported for tests — inspect cache state. */
export function getAntigravityProjectFromCache(
  accessToken: string,
  clientProfile: AntigravityClientProfile = "cli"
): string | undefined {
  return projectCache.get(getProjectCacheKey(accessToken, clientProfile));
}
