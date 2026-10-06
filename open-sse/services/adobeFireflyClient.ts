/**
 * Adobe Firefly (unofficial) media client.
 *
 * Talks to the same Firefly 3P async APIs that firefly.adobe.com uses (live browser
 * captures in repo `adobe/`):
 *   POST https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async
 *   POST https://firefly-3p.ff.adobe.io/v2/3p-videos/generate-async
 *   POST https://firefly-3p.ff.adobe.io/v2/models/discovery
 *   GET  https://firefly.adobe.io/v1/credits/balance
 * then polls BKS job result URLs rewritten from links.result.
 *
 * Auth is an Adobe IMS access token (Bearer, client_id = clio-playground-web).
 * Callers may pass either:
 *   - a raw IMS access_token JWT (from Authorization: Bearer on Firefly), or
 *   - a browser Cookie header from firefly.adobe.com (exchanged via IMS check/v6/token
 *     with client_id clio-playground-web; Express projectx_webapp as fallback).
 *
 * x-api-key on generate/discovery MUST match the token's IMS client
 * (`clio-playground-web`). Mismatch → HTTP 401 invalid token.
 *
 * Unofficial — tokens/cookies are short-lived; Adobe may change the wire contract.
 */

import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  buildAdobeSubmitHeaders,
  hasBrowserAdobeArpSession,
  resolveAdobeArpSessionId,
} from "./adobeFireflyArp.ts";
import {
  ADOBE_FIREFLY_IMAGE_SUBMIT_URL,
  ADOBE_FIREFLY_VIDEO_SUBMIT_URL,
  DEFAULT_IMAGE_TIMEOUT_MS,
  DEFAULT_VIDEO_TIMEOUT_MS,
} from "./adobeFireflyCatalog.ts";
import { AdobeFireflyError, extractAdobeCookieHeader } from "./adobeFireflyCredentials.ts";
import {
  buildAdobeImagePayload,
  buildAdobeVideoPayload,
  normalizeAdobeAspectRatio,
  normalizeAdobeOutputResolution,
  resolveAdobeImageModel,
  resolveAdobeVideoModel,
} from "./adobeFireflyPayload.ts";
import { pollAdobeJob, sleep } from "./adobeFireflyPoll.ts";
import {
  extractAdobeResultLink,
  formatAdobeSystemUnderLoadError,
  isAdobeTransientSubmitError,
  normalizeAdobePollUrl,
} from "./adobeFireflyResponses.ts";

export { decodeAdobeJwtPayload } from "./adobeFireflySecurity.ts";
export type { AdobeFireflyDiscoveredModel } from "./adobeFireflyModels.ts";

/**
 * Collect reference image sources from an OpenAI-style / Media-page image|video body.
 * Supports: image_url, image, images[], image_urls[], input_image(s), reference_images,
 * provider_options.*, and prompt_image fields used by the WinUI Media page.
 */
export {
  extractAdobeSourceImageReferences,
  normalizeAdobeReferenceBlobs,
} from "./adobeFireflyReferences.ts";

// Barrel: this module was a 2,952-line god-file. Its public surface is unchanged —
// every symbol below still resolves through `adobeFireflyClient.ts`, so the 15
// importing source and test files need no edit.
export {
  discoverAdobeFireflyModels,
  fetchAdobeCreditsBalance,
  parseAdobeCreditsBalance,
  parseAdobeModelsDiscovery,
} from "./adobeFireflyAccount.ts";
export type { AdobeFireflyCreditsBalance } from "./adobeFireflyAccount.ts";
export {
  ADOBE_FIREFLY_ARKOSE_PUBLIC_KEY,
  ADOBE_FIREFLY_FTR_MAGIC,
  ADOBE_FIREFLY_MAX_UPLOAD_BYTES,
  buildAdobeArpSessionId,
  buildAdobeSubmitHeaders,
  buildAdobeSubmitNonce,
  buildAdobeUploadHeaders,
  extractAdobeArpSessionId,
  generateAdobeNonce,
  hasBrowserAdobeArpSession,
  isValidAdobeArpSessionId,
  resolveAdobeArpSessionId,
} from "./adobeFireflyArp.ts";
export {
  ADOBE_FIREFLY_CREDITS_BALANCE_URL,
  ADOBE_FIREFLY_IMAGE_MODELS,
  ADOBE_FIREFLY_IMAGE_SUBMIT_URL,
  ADOBE_FIREFLY_IMAGE_UPLOAD_URL,
  ADOBE_FIREFLY_IMS_REFRESH_URL,
  ADOBE_FIREFLY_IMS_SCOPE,
  ADOBE_FIREFLY_MODELS_DISCOVERY_URL,
  ADOBE_FIREFLY_VIDEO_MODELS,
  ADOBE_FIREFLY_VIDEO_SUBMIT_URL,
} from "./adobeFireflyCatalog.ts";
export type {
  AdobeFireflyImageModelId,
  AdobeFireflyImageModelSpec,
  AdobeFireflyVideoModelId,
  AdobeFireflyVideoModelSpec,
} from "./adobeFireflyCatalog.ts";
export {
  AdobeFireflyError,
  adobeFireflyApiKey,
  adobeFireflyBalanceApiKey,
  adobeFireflyExpressClientId,
  extractAdobeAccountIdFromToken,
  extractAdobeCookieHeader,
  extractAdobeCredentialToken,
  isAdobeGuestAccessToken,
  isAdobeUserAccessToken,
  looksLikeAdobeCookieBlob,
  looksLikeAdobeJwt,
} from "./adobeFireflyCredentials.ts";
export { exchangeAdobeCookieForAccessToken, resolveAdobeAccessToken } from "./adobeFireflyIms.ts";
export {
  buildAdobeImagePayload,
  buildAdobeVideoPayload,
  normalizeAdobeAspectRatio,
  normalizeAdobeOutputResolution,
  resolveAdobeImageModel,
  resolveAdobeVideoModel,
} from "./adobeFireflyPayload.ts";
export { pollAdobeJob } from "./adobeFireflyPoll.ts";
export {
  buildAdobeBalanceHeaders,
  buildAdobeDiscoveryHeaders,
  buildAdobePollHeaders,
  extractAdobeMediaUrl,
  extractAdobeResultLink,
  formatAdobeSystemUnderLoadError,
  isAdobeJobFailed,
  isAdobeJobInProgress,
  isAdobeTransientSubmitError,
  normalizeAdobePollUrl,
} from "./adobeFireflyResponses.ts";
export {
  extractAdobeSourceImageSources,
  parseAdobeImageSourceBytes,
  parseAdobeStorageUploadResponse,
  resolveAdobeSourceImageIds,
  uploadAdobeFireflyImage,
} from "./adobeFireflyUpload.ts";

const SUBMIT_MAX_ATTEMPTS = 5;
/** Base backoff after 408; combined with withAdobeFireflySubmitGate (~12s min gap). */
function submitBaseDelayMs(): number {
  if (
    process.env.ADOBE_FIREFLY_SUBMIT_BASE_DELAY_MS != null &&
    process.env.ADOBE_FIREFLY_SUBMIT_BASE_DELAY_MS !== ""
  ) {
    return Math.max(0, Number(process.env.ADOBE_FIREFLY_SUBMIT_BASE_DELAY_MS) || 0);
  }
  if (process.env.NODE_ENV === "test" || process.env.VITEST || process.env.NODE_TEST_CONTEXT)
    return 20;
  return 8000;
}

export async function adobeFireflyGenerateImage(opts: {
  accessToken: string;
  prompt: string;
  model: string;
  size?: unknown;
  aspectRatio?: unknown;
  quality?: unknown;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
  /** Optional Cookie blob — used only to lift sherlockToken → x-arp-session-id */
  sessionCookie?: string;
  /** Shared ARP (sid+ark+ftr). Reuse with uploads; do not mint per retry. */
  arpSessionId?: string;
  /** Session cache key from ensureAdobeFireflySession — sticky ARP across batch jobs. */
  sessionFingerprint?: string;
  /** Chrome profile key (provider connection id) for CDP warm/login isolation. */
  sessionBrowserKey?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<{ url: string; b64_json?: string; latest: unknown }> {
  const fetchImpl = opts.fetchImpl || fetch;
  const { spec } = resolveAdobeImageModel(opts.model);
  const aspectRatio = normalizeAdobeAspectRatio(opts.aspectRatio ?? opts.size, "1:1");
  const outputResolution = normalizeAdobeOutputResolution(opts.quality, opts.size);
  const payload = buildAdobeImagePayload({
    prompt: opts.prompt,
    aspectRatio,
    outputResolution,
    modelSpec: spec,
    quality: opts.quality,
    seed: opts.seed,
    sourceImageIds: opts.sourceImageIds,
    negativePrompt: opts.negativePrompt,
  });

  const sessionCookie = String(opts.sessionCookie || "").trim();
  let activeCookie = extractAdobeCookieHeader(sessionCookie) || sessionCookie;
  // Prefer real browser sherlockToken / cookie rebuild (forter+arkose). Only the raw
  // credential paste counts as "browser ARP" — never the pure synthetic fallback.
  const hadBrowserArp = hasBrowserAdobeArpSession(activeCookie);
  let arpSessionId =
    (opts.arpSessionId && String(opts.arpSessionId).trim()) ||
    resolveAdobeArpSessionId(activeCookie);
  let submitData: unknown = {};
  let submitHeaders: Headers | Record<string, string | null | undefined> = new Headers();
  let lastSubmitError = "";
  let sawSystemUnderLoad = false;
  let accessToken = opts.accessToken;
  let authRefreshAttempted = false;

  const {
    withAdobeFireflySubmitGate,
    markAdobeFireflyArpSuccess,
    noteAdobeFireflySubmitFailure,
    rotateAdobeFireflySessionOnError,
    resolveAdobeArpSessionIdSmart,
    fingerprintAdobeCredential,
    estimateAdobeTokenExpiry,
  } = await import("./adobeFireflySession.ts");

  // Stable sticky key — do NOT include arpSessionId (it changes and would break sticky).
  const fingerprint =
    String(opts.sessionFingerprint || "").trim() ||
    fingerprintAdobeCredential([accessToken, activeCookie].filter(Boolean).join("\n"));
  const browserSessionKey = String(opts.sessionBrowserKey || "").trim() || fingerprint;

  // Gate ONLY the actual generate-async HTTP call (min gap). CDP warm / backoff run
  // outside so interactive browser login and other Firefly submits are not blocked for minutes.
  let submitOk = false;
  for (let attempt = 1; attempt <= SUBMIT_MAX_ATTEMPTS; attempt++) {
    const submitResp = await withAdobeFireflySubmitGate(() =>
      fetchImpl(ADOBE_FIREFLY_IMAGE_SUBMIT_URL, {
        method: "POST",
        headers: buildAdobeSubmitHeaders(accessToken, {
          arpSessionId,
          prompt: opts.prompt,
          cookie: activeCookie || undefined,
        }),
        body: JSON.stringify(payload),
      })
    );

    if (submitResp.status === 401 || submitResp.status === 403) {
      noteAdobeFireflySubmitFailure();
      const accessError = submitResp.headers.get("x-access-error") || "";
      if (accessError === "taste_exhausted") {
        throw new AdobeFireflyError(
          "Adobe Firefly quota exhausted for this account",
          429,
          "quota_exhausted"
        );
      }
      if (!authRefreshAttempted && attempt < SUBMIT_MAX_ATTEMPTS) {
        authRefreshAttempted = true;
        const refreshed = await rotateAdobeFireflySessionOnError(
          {
            accessToken,
            cookie: activeCookie,
            arpSessionId,
            tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
            updatedAt: Date.now(),
            fingerprint,
            browserSessionKey,
            source: "rebuild",
          },
          { attempt, authFailure: true, tryBrowser: true, log: opts.log }
        ).catch(() => null);
        if (refreshed?.accessToken && refreshed?.arpSessionId) {
          accessToken = refreshed.accessToken;
          activeCookie = refreshed.cookie || activeCookie;
          arpSessionId = refreshed.arpSessionId;
          opts.log?.info?.(
            "ADOBE-FIREFLY",
            `image submit auth ${submitResp.status}; retrying once with renewed CDP session`
          );
          continue;
        }
      }
      throw new AdobeFireflyError(
        "Adobe Firefly session is no longer authenticated and automatic browser renewal failed. " +
          "Sign in once through the Adobe Firefly browser login to restore durable renewal.",
        401,
        "auth"
      );
    }

    if (!submitResp.ok) {
      const text = await submitResp.text().catch(() => "");
      if (isAdobeTransientSubmitError(submitResp.status, text)) {
        sawSystemUnderLoad = true;
      }
      lastSubmitError = `Adobe Firefly image submit failed (${submitResp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`;
      if (isAdobeTransientSubmitError(submitResp.status, text) && attempt < SUBMIT_MAX_ATTEMPTS) {
        const { getAdobeForterAgeMs: forterAgeMsFn, extractAdobeForterTimestampMs: forterTsFn } =
          await import("./adobeFireflySession.ts");
        // Only treat as known-stale when the cookie embeds a parseable forter timestamp.
        // Missing timestamp (tests / synthetic ARP) must keep the full retry ladder.
        const forterTs = forterTsFn(activeCookie || "");
        const forterAgeBefore = forterAgeMsFn(activeCookie || "");
        const forterKnownStale =
          forterTs > 0 && Number.isFinite(forterAgeBefore) && forterAgeBefore > 4 * 60_000;
        // Stale risk session: at most 2 attempts (warm once + one retry). Avoid ~600s thrash.
        if (forterKnownStale && attempt >= 2) {
          noteAdobeFireflySubmitFailure();
          throw new AdobeFireflyError(
            formatAdobeSystemUnderLoadError("image", attempt, { hadBrowserArp }) +
              " Risk session looks expired — open Providers → Adobe Firefly → Sign in with browser once.",
            408,
            "system_under_load"
          );
        }
        try {
          if (activeCookie) {
            const rotated = await rotateAdobeFireflySessionOnError(
              {
                accessToken,
                cookie: activeCookie,
                arpSessionId,
                tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
                updatedAt: Date.now(),
                fingerprint,
                browserSessionKey,
                source: "rebuild",
              },
              {
                // Stale forter warms immediately; fresh forter quiet-reuses on 1–2 then warms.
                attempt,
                tryBrowser: process.env.ADOBE_FIREFLY_BROWSER_REFRESH !== "0",
                log: opts.log,
              }
            );
            accessToken = rotated.accessToken || accessToken;
            activeCookie = rotated.cookie || activeCookie;
            arpSessionId = rotated.arpSessionId;
          } else {
            arpSessionId = resolveAdobeArpSessionIdSmart(sessionCookie, {
              rotate: true,
            });
          }
        } catch {
          // Keep prior ARP — synthetic thrash rarely recovers colligo 408.
        }
        const base = submitBaseDelayMs();
        const delay =
          base <= 50
            ? base
            : Math.min(90_000, base * Math.pow(2, attempt - 1)) + Math.floor(Math.random() * 1500);
        opts.log?.info?.(
          "ADOBE-FIREFLY",
          `image submit transient ${submitResp.status}, retry ${attempt}/${SUBMIT_MAX_ATTEMPTS} in ${delay}ms (recovery attempt=${attempt})`
        );
        await sleep(delay);
        continue;
      }
      noteAdobeFireflySubmitFailure();
      if (sawSystemUnderLoad && isAdobeTransientSubmitError(submitResp.status, text)) {
        throw new AdobeFireflyError(
          formatAdobeSystemUnderLoadError("image", attempt, {
            hadBrowserArp,
          }),
          408,
          "system_under_load"
        );
      }
      throw new AdobeFireflyError(
        lastSubmitError,
        submitResp.status >= 400 && submitResp.status < 500 ? submitResp.status : 502
      );
    }

    submitData = await submitResp.json().catch(() => ({}));
    submitHeaders = submitResp.headers;
    // Sticky: remember ARP that colligo accepted so the next batch image reuses it.
    markAdobeFireflyArpSuccess(fingerprint, arpSessionId);
    submitOk = true;
    break;
  }
  if (!submitOk && !lastSubmitError) {
    throw new AdobeFireflyError(
      formatAdobeSystemUnderLoadError("image", SUBMIT_MAX_ATTEMPTS, { hadBrowserArp }),
      408,
      "system_under_load"
    );
  }

  let pollUrl = extractAdobeResultLink(submitHeaders, submitData);
  if (!pollUrl) {
    if (sawSystemUnderLoad) {
      throw new AdobeFireflyError(
        formatAdobeSystemUnderLoadError("image", SUBMIT_MAX_ATTEMPTS, {
          hadBrowserArp,
        }),
        408,
        "system_under_load"
      );
    }
    throw new AdobeFireflyError(
      lastSubmitError || "Adobe Firefly image submit succeeded but no poll URL was returned",
      502
    );
  }
  pollUrl = normalizeAdobePollUrl(pollUrl);

  const { mediaUrl, latest } = await pollAdobeJob({
    pollUrl,
    accessToken,
    kind: "image",
    timeoutMs: opts.timeoutMs && opts.timeoutMs > 0 ? opts.timeoutMs : DEFAULT_IMAGE_TIMEOUT_MS,
    fetchImpl,
    log: opts.log,
  });

  return { url: mediaUrl, latest };
}

export async function adobeFireflyGenerateVideo(opts: {
  accessToken: string;
  prompt: string;
  model: string;
  size?: unknown;
  aspectRatio?: unknown;
  duration?: unknown;
  quality?: unknown;
  resolution?: unknown;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
  generateAudio?: boolean;
  sessionCookie?: string;
  /** Shared ARP (sid+ark+ftr). Reuse with frame uploads. */
  arpSessionId?: string;
  /** Session cache key from ensureAdobeFireflySession — sticky ARP across batch jobs. */
  sessionFingerprint?: string;
  /** Chrome profile key (provider connection id) for CDP warm/login isolation. */
  sessionBrowserKey?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<{
  url: string;
  b64_json?: string;
  format: string;
  latest: unknown;
}> {
  const fetchImpl = opts.fetchImpl || fetch;
  const { spec } = resolveAdobeVideoModel(opts.model);
  const aspectRatio = normalizeAdobeAspectRatio(opts.aspectRatio ?? opts.size, "16:9");
  const duration =
    typeof opts.duration === "number"
      ? opts.duration
      : typeof opts.duration === "string" && opts.duration.trim()
        ? Number(opts.duration)
        : spec.defaultDuration;
  const resolution =
    typeof opts.resolution === "string" && opts.resolution.trim()
      ? opts.resolution
      : typeof opts.quality === "string" && /p$/i.test(opts.quality)
        ? opts.quality
        : spec.defaultResolution;

  const payload = buildAdobeVideoPayload({
    prompt: opts.prompt,
    aspectRatio,
    duration: Number.isFinite(duration) ? Number(duration) : spec.defaultDuration,
    modelSpec: spec,
    resolution,
    seed: opts.seed,
    sourceImageIds: opts.sourceImageIds,
    negativePrompt: opts.negativePrompt,
    generateAudio: opts.generateAudio,
  });

  const sessionCookie = String(opts.sessionCookie || "").trim();
  let activeCookie = extractAdobeCookieHeader(sessionCookie) || sessionCookie;
  const hadBrowserArp = hasBrowserAdobeArpSession(activeCookie);
  let arpSessionId =
    (opts.arpSessionId && String(opts.arpSessionId).trim()) ||
    resolveAdobeArpSessionId(activeCookie);
  let submitData: unknown = {};
  let submitHeaders: Headers | Record<string, string | null | undefined> = new Headers();
  let lastSubmitError = "";
  let sawSystemUnderLoad = false;
  let accessToken = opts.accessToken;
  let authRefreshAttempted = false;

  const {
    withAdobeFireflySubmitGate,
    markAdobeFireflyArpSuccess,
    noteAdobeFireflySubmitFailure,
    rotateAdobeFireflySessionOnError,
    resolveAdobeArpSessionIdSmart,
    fingerprintAdobeCredential,
    estimateAdobeTokenExpiry,
  } = await import("./adobeFireflySession.ts");

  const fingerprint =
    String(opts.sessionFingerprint || "").trim() ||
    fingerprintAdobeCredential([accessToken, activeCookie].filter(Boolean).join("\n"));
  const browserSessionKey = String(opts.sessionBrowserKey || "").trim() || fingerprint;

  let videoSubmitOk = false;
  for (let attempt = 1; attempt <= SUBMIT_MAX_ATTEMPTS; attempt++) {
    const submitResp = await withAdobeFireflySubmitGate(() =>
      fetchImpl(ADOBE_FIREFLY_VIDEO_SUBMIT_URL, {
        method: "POST",
        headers: buildAdobeSubmitHeaders(accessToken, {
          arpSessionId,
          prompt: opts.prompt,
          cookie: activeCookie || undefined,
        }),
        body: JSON.stringify(payload),
      })
    );

    if (submitResp.status === 401 || submitResp.status === 403) {
      noteAdobeFireflySubmitFailure();
      const accessError = submitResp.headers.get("x-access-error") || "";
      if (accessError === "taste_exhausted") {
        throw new AdobeFireflyError(
          "Adobe Firefly quota exhausted for this account",
          429,
          "quota_exhausted"
        );
      }
      if (!authRefreshAttempted && attempt < SUBMIT_MAX_ATTEMPTS) {
        authRefreshAttempted = true;
        const refreshed = await rotateAdobeFireflySessionOnError(
          {
            accessToken,
            cookie: activeCookie,
            arpSessionId,
            tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
            updatedAt: Date.now(),
            fingerprint,
            browserSessionKey,
            source: "rebuild",
          },
          { attempt, authFailure: true, tryBrowser: true, log: opts.log }
        ).catch(() => null);
        if (refreshed?.accessToken && refreshed?.arpSessionId) {
          accessToken = refreshed.accessToken;
          activeCookie = refreshed.cookie || activeCookie;
          arpSessionId = refreshed.arpSessionId;
          opts.log?.info?.(
            "ADOBE-FIREFLY",
            `video submit auth ${submitResp.status}; retrying once with renewed CDP session`
          );
          continue;
        }
      }
      throw new AdobeFireflyError(
        "Adobe Firefly session is no longer authenticated and automatic browser renewal failed. " +
          "Sign in once through the Adobe Firefly browser login to restore durable renewal.",
        401,
        "auth"
      );
    }

    if (!submitResp.ok) {
      const text = await submitResp.text().catch(() => "");
      if (isAdobeTransientSubmitError(submitResp.status, text)) {
        sawSystemUnderLoad = true;
      }
      lastSubmitError = `Adobe Firefly video submit failed (${submitResp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`;
      if (isAdobeTransientSubmitError(submitResp.status, text) && attempt < SUBMIT_MAX_ATTEMPTS) {
        const { getAdobeForterAgeMs: forterAgeMsFn, extractAdobeForterTimestampMs: forterTsFn } =
          await import("./adobeFireflySession.ts");
        const forterTs = forterTsFn(activeCookie || "");
        const forterAgeBefore = forterAgeMsFn(activeCookie || "");
        const forterKnownStale =
          forterTs > 0 && Number.isFinite(forterAgeBefore) && forterAgeBefore > 4 * 60_000;
        if (forterKnownStale && attempt >= 2) {
          noteAdobeFireflySubmitFailure();
          throw new AdobeFireflyError(
            formatAdobeSystemUnderLoadError("video", attempt, { hadBrowserArp }) +
              " Risk session looks expired — open Providers → Adobe Firefly → Sign in with browser once.",
            408,
            "system_under_load"
          );
        }
        try {
          if (activeCookie) {
            const rotated = await rotateAdobeFireflySessionOnError(
              {
                accessToken,
                cookie: activeCookie,
                arpSessionId,
                tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
                updatedAt: Date.now(),
                fingerprint,
                browserSessionKey,
                source: "rebuild",
              },
              {
                attempt,
                tryBrowser: process.env.ADOBE_FIREFLY_BROWSER_REFRESH !== "0",
                log: opts.log,
              }
            );
            accessToken = rotated.accessToken || accessToken;
            activeCookie = rotated.cookie || activeCookie;
            arpSessionId = rotated.arpSessionId;
          } else {
            arpSessionId = resolveAdobeArpSessionIdSmart(sessionCookie, {
              rotate: true,
            });
          }
        } catch {
          /* keep prior ARP */
        }
        const base = submitBaseDelayMs();
        const delay =
          base <= 50
            ? base
            : Math.min(90_000, base * Math.pow(2, attempt - 1)) + Math.floor(Math.random() * 1500);
        opts.log?.info?.(
          "ADOBE-FIREFLY",
          `video submit transient ${submitResp.status}, retry ${attempt}/${SUBMIT_MAX_ATTEMPTS} in ${delay}ms (recovery attempt=${attempt})`
        );
        await sleep(delay);
        continue;
      }
      noteAdobeFireflySubmitFailure();
      if (sawSystemUnderLoad && isAdobeTransientSubmitError(submitResp.status, text)) {
        throw new AdobeFireflyError(
          formatAdobeSystemUnderLoadError("video", attempt, {
            hadBrowserArp,
          }),
          408,
          "system_under_load"
        );
      }
      throw new AdobeFireflyError(
        lastSubmitError,
        submitResp.status >= 400 && submitResp.status < 500 ? submitResp.status : 502
      );
    }

    submitData = await submitResp.json().catch(() => ({}));
    submitHeaders = submitResp.headers;
    markAdobeFireflyArpSuccess(fingerprint, arpSessionId);
    videoSubmitOk = true;
    break;
  }
  if (!videoSubmitOk && !lastSubmitError) {
    throw new AdobeFireflyError(
      formatAdobeSystemUnderLoadError("video", SUBMIT_MAX_ATTEMPTS, { hadBrowserArp }),
      408,
      "system_under_load"
    );
  }

  let pollUrl = extractAdobeResultLink(submitHeaders, submitData);
  if (!pollUrl) {
    if (sawSystemUnderLoad) {
      throw new AdobeFireflyError(
        formatAdobeSystemUnderLoadError("video", SUBMIT_MAX_ATTEMPTS, {
          hadBrowserArp,
        }),
        408,
        "system_under_load"
      );
    }
    throw new AdobeFireflyError(
      lastSubmitError || "Adobe Firefly video submit succeeded but no poll URL was returned",
      502
    );
  }
  pollUrl = normalizeAdobePollUrl(pollUrl);

  const { mediaUrl, latest } = await pollAdobeJob({
    pollUrl,
    accessToken,
    kind: "video",
    timeoutMs: opts.timeoutMs && opts.timeoutMs > 0 ? opts.timeoutMs : DEFAULT_VIDEO_TIMEOUT_MS,
    sessionCookie: activeCookie || sessionCookie || undefined,
    sessionFingerprint: fingerprint,
    fetchImpl,
    log: opts.log,
  });

  return { url: mediaUrl, format: "mp4", latest };
}
