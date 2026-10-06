/**
 * Adobe Firefly — async job polling.
 *
 * Split out of adobeFireflyClient.ts.
 */

import { sanitizeErrorMessage } from "../utils/error.ts";
import { DEFAULT_POLL_INTERVAL_MS } from "./adobeFireflyCatalog.ts";
import { AdobeFireflyError, isAdobeUserAccessToken } from "./adobeFireflyCredentials.ts";
import {
  buildAdobePollHeaders,
  extractAdobeMediaUrl,
  isAdobeJobFailed,
  isAdobeTransientSubmitError,
} from "./adobeFireflyResponses.ts";

export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function pollAdobeJob(opts: {
  pollUrl: string;
  accessToken: string;
  kind: "image" | "video";
  timeoutMs: number;
  pollIntervalMs?: number;
  /** Optional session cookie so a mid-poll 401 can renew JWT once via CDP. */
  sessionCookie?: string;
  sessionFingerprint?: string;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<{ mediaUrl: string; latest: unknown }> {
  const fetchImpl = opts.fetchImpl || fetch;
  const deadline = Date.now() + opts.timeoutMs;
  const interval =
    opts.pollIntervalMs && opts.pollIntervalMs > 0 ? opts.pollIntervalMs : DEFAULT_POLL_INTERVAL_MS;
  let attempt = 0;
  let latest: unknown = {};
  let accessToken = opts.accessToken;
  let authRefreshAttempted = false;

  while (Date.now() < deadline) {
    attempt += 1;
    const pollResp = await fetchImpl(opts.pollUrl, {
      method: "GET",
      headers: buildAdobePollHeaders(accessToken),
    });

    if (pollResp.status === 401 || pollResp.status === 403) {
      const accessError = pollResp.headers.get("x-access-error") || "";
      if (accessError === "taste_exhausted") {
        throw new AdobeFireflyError(
          "Adobe Firefly quota exhausted for this account",
          429,
          "quota_exhausted"
        );
      }
      // One CDP JWT renewal mid-poll (long jobs can outlive a near-expiry IMS token).
      if (!authRefreshAttempted && opts.sessionCookie) {
        authRefreshAttempted = true;
        try {
          const {
            rotateAdobeFireflySessionOnError,
            fingerprintAdobeCredential,
            estimateAdobeTokenExpiry,
          } = await import("./adobeFireflySession.ts");
          const fp =
            String(opts.sessionFingerprint || "").trim() ||
            fingerprintAdobeCredential(
              [accessToken, opts.sessionCookie].filter(Boolean).join("\n")
            );
          const refreshed = await rotateAdobeFireflySessionOnError(
            {
              accessToken,
              cookie: opts.sessionCookie,
              arpSessionId: "",
              tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
              updatedAt: Date.now(),
              fingerprint: fp,
              source: "rebuild",
            },
            { attempt: 3, authFailure: true, tryBrowser: true, log: opts.log }
          );
          if (refreshed?.accessToken && isAdobeUserAccessToken(refreshed.accessToken)) {
            accessToken = refreshed.accessToken;
            opts.log?.info?.(
              "ADOBE-FIREFLY",
              `poll auth ${pollResp.status}; retrying once with renewed JWT`
            );
            continue;
          }
        } catch {
          /* fall through to auth error */
        }
      }
      throw new AdobeFireflyError("Adobe Firefly token invalid or expired", 401, "auth");
    }

    if (!pollResp.ok) {
      const text = await pollResp.text().catch(() => "");
      if (
        pollResp.status === 408 ||
        pollResp.status === 429 ||
        pollResp.status === 451 ||
        pollResp.status >= 500 ||
        isAdobeTransientSubmitError(pollResp.status, text)
      ) {
        opts.log?.info?.("ADOBE-FIREFLY", `poll temporary ${pollResp.status}, attempt #${attempt}`);
        await sleep(interval);
        continue;
      }
      throw new AdobeFireflyError(
        `Adobe Firefly poll failed (${pollResp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`,
        502
      );
    }

    latest = await pollResp.json().catch(() => ({}));
    const statusHeader = String(pollResp.headers.get("x-task-status") || "").toUpperCase();
    const statusVal = String(
      (latest && typeof latest === "object" ? (latest as Record<string, unknown>).status : "") ||
        statusHeader ||
        ""
    ).toUpperCase();

    const mediaUrl = extractAdobeMediaUrl(latest, opts.kind);
    if (mediaUrl) {
      return { mediaUrl, latest };
    }

    if (isAdobeJobFailed(statusVal)) {
      throw new AdobeFireflyError(
        `Adobe Firefly ${opts.kind} job failed: ${sanitizeErrorMessage(JSON.stringify(latest).slice(0, 300))}`,
        502,
        "job_failed"
      );
    }

    opts.log?.info?.(
      "ADOBE-FIREFLY",
      `${opts.kind} pending #${attempt} status=${statusVal || "unknown"}`
    );
    await sleep(interval);
  }

  throw new AdobeFireflyError(`Adobe Firefly ${opts.kind} generation timed out`, 504, "timeout");
}

// Colligo often returns instant 408 with x-colligo-timeout:0.0 under load OR when
// generate-async is hammered in a batch. Space submits (gate) + reuse sticky ARP;
// do NOT thrash synthetic rebuilds on every retry (identical forter → no-op).
// More attempts: 1–2 reuse sticky ARP when forter is fresh; stale forter / attempt 3+ → off-screen Chrome warm.
