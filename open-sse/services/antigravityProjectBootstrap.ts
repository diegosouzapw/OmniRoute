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
import {
  getAntigravityBootstrapHeaders,
  type AntigravityClientProfile,
} from "./antigravityClientProfile.ts";
import { ANTIGRAVITY_BASE_URLS } from "../config/antigravityUpstream.ts";
import { extractCodeAssistOnboardTierId } from "./codeAssistSubscription.ts";

const LOAD_CODE_ASSIST_PATH = "/v1internal:loadCodeAssist";
const ONBOARD_USER_PATH = "/v1internal:onboardUser";
const BOOTSTRAP_TIMEOUT_MS = 8_000;
// onboardUser provisions a managed Cloud Code project asynchronously; poll until done.
const ONBOARD_MAX_RETRIES = 6;
const ONBOARD_RETRY_DELAY_MS = 2_000;

/** Ordered list of loadCodeAssist endpoint URLs (mirrors the models discovery order). */
export function getAntigravityLoadCodeAssistUrls(): string[] {
  return ANTIGRAVITY_BASE_URLS.map((base) => `${base}${LOAD_CODE_ASSIST_PATH}`);
}

/** Ordered list of onboardUser endpoint URLs. */
export function getAntigravityOnboardUserUrls(): string[] {
  return ANTIGRAVITY_BASE_URLS.map((base) => `${base}${ONBOARD_USER_PATH}`);
}

/** Per-token memoization cache (lives for the process lifetime). */
const projectCache = new Map<string, string>();

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

function getProjectCacheKey(accessToken: string, clientProfile: AntigravityClientProfile): string {
  return `${clientProfile}:${accessToken}`;
}

/** Pull a cloudaicompanionProject id (string or {id}) out of a response payload. */
function extractProjectId(data: Record<string, unknown>): string {
  const raw = data.cloudaicompanionProject;
  return typeof raw === "string"
    ? raw.trim()
    : raw &&
        typeof raw === "object" &&
        typeof (raw as Record<string, unknown>).id === "string"
      ? ((raw as Record<string, unknown>).id as string).trim()
      : "";
}

/**
 * Attempt loadCodeAssist against each known base URL in order.
 * Returns the discovered project id (or "") and the onboarding tier id — the tier
 * is needed to bootstrap a managed project for subscription accounts that have no
 * cloudaicompanionProject assigned yet.
 */
async function tryLoadCodeAssist(
  accessToken: string,
  fetchImpl: FetchLike,
  clientProfile: AntigravityClientProfile
): Promise<{ projectId: string; tierId: string }> {
  const urls = getAntigravityLoadCodeAssistUrls();
  const headers =
    clientProfile === "harness"
      ? getAntigravityBootstrapHeaders(clientProfile, accessToken)
      : getAntigravityHeaders("loadCodeAssist", accessToken);

  for (const url of urls) {
    try {
      const response = await fetchImpl(url, {
        method: "POST",
        headers,
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
      const projectId = extractProjectId(data);
      const tierId = extractCodeAssistOnboardTierId(data);

      if (projectId) {
        return { projectId, tierId };
      }

      // No project yet, but we learned the tier — caller can onboard to provision one.
      console.warn(
        `[models] antigravity loadCodeAssist at ${url} returned no project id (tier=${tierId}) — will attempt onboarding`
      );
      return { projectId: "", tierId };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`[models] antigravity loadCodeAssist threw for ${url}: ${msg} — trying next`);
    }
  }
  return { projectId: "", tierId: "" };
}

/**
 * Onboard the account to Gemini Code Assist, provisioning a Google-managed
 * cloudaicompanionProject for subscription accounts (no user GCP project needed).
 * Polls onboardUser until `done`, then returns the provisioned project id.
 */
async function tryOnboardProject(
  accessToken: string,
  tierId: string,
  fetchImpl: FetchLike,
  clientProfile: AntigravityClientProfile
): Promise<string | undefined> {
  if (!tierId) return undefined;
  const urls = getAntigravityOnboardUserUrls();
  const headers =
    clientProfile === "harness"
      ? getAntigravityBootstrapHeaders(clientProfile, accessToken)
      : getAntigravityHeaders("loadCodeAssist", accessToken);
  const metadata = getAntigravityLoadCodeAssistMetadata();

  for (const url of urls) {
    try {
      for (let attempt = 0; attempt < ONBOARD_MAX_RETRIES; attempt++) {
        const response = await fetchImpl(url, {
          method: "POST",
          headers,
          body: JSON.stringify({ tier_id: tierId, metadata }),
          signal: AbortSignal.timeout(BOOTSTRAP_TIMEOUT_MS),
        });

        if (!response.ok) {
          console.warn(
            `[models] antigravity onboardUser failed at ${url} (${response.status}) — trying next endpoint`
          );
          break; // try next base URL
        }

        const result = (await response.json()) as Record<string, unknown>;
        if (result.done === true) {
          const respProject = (result.response as Record<string, unknown>)?.cloudaicompanionProject;
          const projectId =
            typeof respProject === "string"
              ? respProject.trim()
              : respProject &&
                  typeof respProject === "object" &&
                  typeof (respProject as Record<string, unknown>).id === "string"
                ? ((respProject as Record<string, unknown>).id as string).trim()
                : "";
          if (projectId) return projectId;
          console.warn(`[models] antigravity onboardUser done but returned no project id`);
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, ONBOARD_RETRY_DELAY_MS));
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`[models] antigravity onboardUser threw for ${url}: ${msg} — trying next`);
    }
  }
  return undefined;
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
  clientProfile: AntigravityClientProfile = "ide"
): Promise<string | undefined> {
  const cacheKey = getProjectCacheKey(accessToken, clientProfile);
  if (projectCache.has(cacheKey)) {
    return projectCache.get(cacheKey); // already bootstrapped for this token
  }

  const { projectId, tierId } = await tryLoadCodeAssist(accessToken, fetchImpl, clientProfile);

  if (projectId) {
    projectCache.set(cacheKey, projectId);
    return projectId;
  }

  // Subscription accounts have no project until onboarding creates one. Provision a
  // Google-managed Cloud Code project on demand (no user GCP project required).
  const onboardedProjectId = await tryOnboardProject(accessToken, tierId, fetchImpl, clientProfile);
  if (onboardedProjectId) {
    projectCache.set(cacheKey, onboardedProjectId);
    return onboardedProjectId;
  }

  // Non-fatal: if all endpoints failed, we proceed without caching.
  return undefined;
}

/** Exported for tests. */
export function clearAntigravityProjectCache(): void {
  projectCache.clear();
}

/** Exported for tests — inspect cache state. */
export function getAntigravityProjectFromCache(
  accessToken: string,
  clientProfile: AntigravityClientProfile = "ide"
): string | undefined {
  return projectCache.get(getProjectCacheKey(accessToken, clientProfile));
}
