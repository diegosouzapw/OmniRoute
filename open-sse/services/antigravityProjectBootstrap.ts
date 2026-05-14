/**
 * Antigravity project bootstrap — loadCodeAssist.
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
 * Based on AntigravityService.loadCodeAssist() in
 * src/lib/oauth/services/antigravity.ts and the CLIProxyAPI reference
 * implementation in internal/runtime/executor/antigravity_executor.go.
 */

import {
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "./antigravityHeaders.ts";
import { ANTIGRAVITY_BASE_URLS } from "../config/antigravityUpstream.ts";

const LOAD_CODE_ASSIST_PATH = "/v1internal:loadCodeAssist";
const BOOTSTRAP_TIMEOUT_MS = 8_000;

/** Ordered list of loadCodeAssist endpoint URLs (mirrors the models discovery order). */
export function getAntigravityLoadCodeAssistUrls(): string[] {
  return ANTIGRAVITY_BASE_URLS.map((base) => `${base}${LOAD_CODE_ASSIST_PATH}`);
}

/** Per-token memoization cache (lives for the process lifetime). */
const projectCache = new Map<string, string>();

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

/**
 * Attempt loadCodeAssist against each known base URL in order.
 * Returns the discovered project id, or null if all endpoints fail.
 */
async function tryLoadCodeAssist(
  accessToken: string,
  fetchImpl: FetchLike
): Promise<string | null> {
  const urls = getAntigravityLoadCodeAssistUrls();
  for (const url of urls) {
    try {
      const response = await fetchImpl(url, {
        method: "POST",
        headers: getAntigravityHeaders("loadCodeAssist", accessToken),
        body: JSON.stringify({ metadata: getAntigravityLoadCodeAssistMetadata() }),
        signal: AbortSignal.timeout(BOOTSTRAP_TIMEOUT_MS),
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
      let projectId =
        typeof raw === "string"
          ? raw.trim()
          : raw &&
              typeof raw === "object" &&
              typeof (raw as Record<string, unknown>).id === "string"
            ? ((raw as Record<string, unknown>).id as string).trim()
            : "";

      if (projectId) {
        return projectId;
      }

      console.warn(
        `[models] antigravity loadCodeAssist at ${url} returned no project id — trying next`
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`[models] antigravity loadCodeAssist threw for ${url}: ${msg} — trying next`);
    }
  }
  return null;
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
  fetchImpl: FetchLike = fetch
): Promise<void> {
  if (projectCache.has(accessToken)) {
    return; // already bootstrapped for this token
  }

  const projectId = await tryLoadCodeAssist(accessToken, fetchImpl);

  if (projectId) {
    projectCache.set(accessToken, projectId);
  }
  // Non-fatal: if all endpoints failed, we proceed without caching.
}

/** Exported for tests. */
export function clearAntigravityProjectCache(): void {
  projectCache.clear();
}

/** Exported for tests — inspect cache state. */
export function getAntigravityProjectFromCache(accessToken: string): string | undefined {
  return projectCache.get(accessToken);
}
