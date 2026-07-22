import { createHash } from "crypto";

import { ANTIGRAVITY_BOOTSTRAP_BASE_URLS } from "../config/antigravityUpstream.ts";
import {
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "./antigravityHeaders.ts";
import {
  getAntigravityBootstrapHeaders,
  type AntigravityClientProfile,
} from "./antigravityClientProfile.ts";
import { extractCodeAssistOnboardTierId } from "./codeAssistSubscription.ts";

const LOAD_CODE_ASSIST_PATH = "/v1internal:loadCodeAssist";
const ONBOARD_USER_PATH = "/v1internal:onboardUser";
const BOOTSTRAP_TIMEOUT_MS = 8_000;
// onboardUser is a long-running provisioning op. Bound it so a first-time account never
// hangs the request path: a few short, abort-aware polls within a total deadline. If the
// server hasn't finished provisioning inside the budget we fail closed (422) for THIS
// request — onboarding was kicked off server-side, so a subsequent request self-heals via
// the cache once loadCodeAssist returns the freshly-provisioned project.
const ONBOARD_ATTEMPT_TIMEOUT_MS = 8_000;
const ONBOARD_MAX_ATTEMPTS = 3;
const ONBOARD_RETRY_DELAY_MS = 2_000;

export function getAntigravityLoadCodeAssistUrls(): string[] {
  return ANTIGRAVITY_BOOTSTRAP_BASE_URLS.map((base) => `${base}${LOAD_CODE_ASSIST_PATH}`);
}

export function getAntigravityOnboardUserUrls(): string[] {
  return ANTIGRAVITY_BOOTSTRAP_BASE_URLS.map((base) => `${base}${ONBOARD_USER_PATH}`);
}

const projectCache = new Map<string, string>();

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

type InFlightBootstrap = {
  controller: AbortController;
  promise: Promise<string | undefined>;
  settled: boolean;
  waiters: number;
};

const inFlightBootstrap = new Map<string, InFlightBootstrap>();

export function getAntigravityProjectCacheKey(
  accessToken: string,
  clientProfile: AntigravityClientProfile
): string {
  const tokenHash = createHash("sha256").update(accessToken, "utf8").digest("hex");
  return `${clientProfile}:${tokenHash}`;
}

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  );
}

function extractProjectId(raw: unknown): string {
  if (typeof raw === "string") return raw.trim();
  if (raw && typeof raw === "object" && typeof (raw as Record<string, unknown>).id === "string") {
    return ((raw as Record<string, unknown>).id as string).trim();
  }
  return "";
}

type LoadCodeAssistResult = {
  projectId: string | null;
  tierId: string;
  // True only when at least one endpoint returned HTTP 200. Distinguishes a genuine
  // first-time account (loaded, but no project → onboardUser can provision) from a
  // transient failure (503/network/all-endpoints-exhausted → do NOT provision; retry
  // on a later request). onboardUser must never run off an unconfirmed account state.
  loaded: boolean;
};

async function tryLoadCodeAssist(
  accessToken: string,
  fetchImpl: FetchLike,
  clientProfile: AntigravityClientProfile,
  signal?: AbortSignal
): Promise<LoadCodeAssistResult> {
  const urls = getAntigravityLoadCodeAssistUrls();
  const headers =
    clientProfile === "harness"
      ? getAntigravityBootstrapHeaders(clientProfile, accessToken)
      : getAntigravityHeaders("loadCodeAssist", accessToken);

  let tierId = "legacy-tier";
  let loaded = false;

  for (const url of urls) {
    if (signal?.aborted) throw signal.reason;

    try {
      const timeoutSignal = AbortSignal.timeout(BOOTSTRAP_TIMEOUT_MS);
      const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
      const response = await fetchImpl(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ metadata: getAntigravityLoadCodeAssistMetadata() }),
        signal: combinedSignal,
      });

      if (!response.ok) {
        console.warn(
          `[models] antigravity loadCodeAssist failed at ${url} (${response.status}) — trying next`
        );
        continue;
      }

      // A 200 confirms the account state, even if no project is assigned yet.
      loaded = true;
      const data = (await response.json()) as Record<string, unknown>;
      tierId = extractCodeAssistOnboardTierId(data);
      const projectId = extractProjectId(data.cloudaicompanionProject);

      if (projectId) return { projectId, tierId, loaded };

      console.warn(
        `[models] antigravity loadCodeAssist at ${url} returned no project id — trying next`
      );
    } catch (error) {
      if (signal?.aborted || isAbortError(error)) throw signal?.reason ?? error;
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`[models] antigravity loadCodeAssist threw for ${url}: ${msg} — trying next`);
    }
  }

  return { projectId: null, tierId, loaded };
}

/**
 * onboardUser fallback: run when loadCodeAssist returned no project (first-time account
 * whose Cloud Code project hasn't been provisioned yet). Polls the long-running op until
 * `done === true`, then reads `response.cloudaicompanionProject` (string or `.id`). Matches
 * the known-good 9Router projectId.js shape. Bounded and abort-aware so it never hangs the
 * request path; returns null if provisioning does not finish inside the budget.
 */
async function tryOnboardUser(
  accessToken: string,
  tierId: string,
  fetchImpl: FetchLike,
  clientProfile: AntigravityClientProfile,
  signal?: AbortSignal
): Promise<string | null> {
  const urls = getAntigravityOnboardUserUrls();
  const headers =
    clientProfile === "harness"
      ? getAntigravityBootstrapHeaders(clientProfile, accessToken)
      : getAntigravityHeaders("loadCodeAssist", accessToken);
  const body = JSON.stringify({ tierId, metadata: getAntigravityLoadCodeAssistMetadata() });

  for (let attempt = 1; attempt <= ONBOARD_MAX_ATTEMPTS; attempt += 1) {
    if (signal?.aborted) throw signal.reason;

    for (const url of urls) {
      if (signal?.aborted) throw signal.reason;

      try {
        const timeoutSignal = AbortSignal.timeout(ONBOARD_ATTEMPT_TIMEOUT_MS);
        const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
        const response = await fetchImpl(url, {
          method: "POST",
          headers,
          body,
          signal: combinedSignal,
        });

        if (!response.ok) {
          console.warn(
            `[models] antigravity onboardUser failed at ${url} (${response.status}) — trying next`
          );
          continue;
        }

        const data = (await response.json()) as Record<string, unknown>;
        if (data.done === true) {
          const responseObj = (data.response ?? {}) as Record<string, unknown>;
          const projectId = extractProjectId(responseObj.cloudaicompanionProject);
          if (projectId) return projectId;
          console.warn(`[models] antigravity onboardUser done but no project id at ${url}`);
          return null;
        }
        // Not done yet — break the endpoint loop and wait before the next poll attempt.
        break;
      } catch (error) {
        if (signal?.aborted || isAbortError(error)) throw signal?.reason ?? error;
        const msg = error instanceof Error ? error.message : String(error);
        console.warn(`[models] antigravity onboardUser threw for ${url}: ${msg} — trying next`);
      }
    }

    if (attempt < ONBOARD_MAX_ATTEMPTS) {
      await sleepWithSignal(ONBOARD_RETRY_DELAY_MS, signal);
    }
  }

  return null;
}

function sleepWithSignal(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal?.reason);
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function waitForBootstrap(
  entry: InFlightBootstrap,
  signal?: AbortSignal
): Promise<string | undefined> {
  entry.waiters += 1;

  return new Promise<string | undefined>((resolve, reject) => {
    let completed = false;

    const finish = (callback: () => void) => {
      if (completed) return;
      completed = true;
      signal?.removeEventListener("abort", onAbort);
      entry.waiters -= 1;
      if (entry.waiters === 0 && !entry.settled) {
        entry.controller.abort(new DOMException("Bootstrap has no active callers", "AbortError"));
      }
      callback();
    };

    const onAbort = () => finish(() => reject(signal?.reason));
    signal?.addEventListener("abort", onAbort, { once: true });

    entry.promise.then(
      (projectId) => finish(() => resolve(projectId)),
      (error) => finish(() => reject(error))
    );
  });
}

export async function ensureAntigravityProjectAssigned(
  accessToken: string,
  fetchImpl: FetchLike = fetch,
  clientProfile: AntigravityClientProfile = "ide",
  signal?: AbortSignal
): Promise<string | undefined> {
  if (signal?.aborted) throw signal.reason;

  const cacheKey = getAntigravityProjectCacheKey(accessToken, clientProfile);
  const cachedProject = projectCache.get(cacheKey);
  if (cachedProject) return cachedProject;

  let entry = inFlightBootstrap.get(cacheKey);
  if (entry?.controller.signal.aborted && entry.waiters === 0) {
    inFlightBootstrap.delete(cacheKey);
    entry = undefined;
  }

  if (!entry) {
    const controller = new AbortController();
    entry = {
      controller,
      settled: false,
      waiters: 0,
      promise: Promise.resolve(undefined),
    };

    entry.promise = (async () => {
      const { projectId, tierId, loaded } = await tryLoadCodeAssist(
        accessToken,
        fetchImpl,
        clientProfile,
        controller.signal
      );
      if (projectId) {
        projectCache.set(cacheKey, projectId);
        return projectId;
      }

      // Only attempt onboardUser when loadCodeAssist DEFINITIVELY succeeded (HTTP 200) but
      // returned no project — a genuine first-time account we can provision. A transient
      // failure (503/network/all-endpoints-exhausted) leaves the account state unconfirmed:
      // return undefined so a later request retries loadCodeAssist, rather than provisioning
      // off an unknown state.
      if (!loaded) return undefined;

      // loadCodeAssist returned no project: first-time account whose Cloud Code project
      // hasn't been provisioned yet. Kick off (and poll) onboardUser exactly once within
      // this logical request. On success we cache and self-heal; on failure we return
      // undefined and the executor fails closed with 422 (never fabricate a project id).
      const onboardedProjectId = await tryOnboardUser(
        accessToken,
        tierId,
        fetchImpl,
        clientProfile,
        controller.signal
      );
      if (onboardedProjectId) {
        projectCache.set(cacheKey, onboardedProjectId);
        return onboardedProjectId;
      }

      return undefined;
    })().finally(() => {
      entry!.settled = true;
      if (inFlightBootstrap.get(cacheKey) === entry) {
        inFlightBootstrap.delete(cacheKey);
      }
    });
    inFlightBootstrap.set(cacheKey, entry);
  }

  return waitForBootstrap(entry, signal);
}

export function clearAntigravityProjectCache(): void {
  projectCache.clear();
  inFlightBootstrap.clear();
}

export function getAntigravityProjectFromCache(
  accessToken: string,
  clientProfile: AntigravityClientProfile = "ide"
): string | undefined {
  return projectCache.get(getAntigravityProjectCacheKey(accessToken, clientProfile));
}
