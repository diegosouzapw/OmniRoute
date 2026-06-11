/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { CROF_USAGE_URL } from "./constants.ts";
import { JsonRecord, UsageQuota } from "./types.ts";
import { toRecord, toNumber } from "./utils.ts";

// CrofAI surfaces a tiny endpoint with two signals:
//   GET https://crof.ai/usage_api/  →  { usable_requests: number|null, credits: number }
// `usable_requests` is the daily request bucket on a subscription plan; `null`
// for pay-as-you-go. `credits` is the USD credit balance. We surface both as
// quotas so the Limits & Quotas page can render whichever the account uses.
export async function getCrofUsage(apiKey: string) {
  if (!apiKey) {
    return { message: "CrofAI API key not available. Add a key to view usage." };
  }

  let response: Response;
  try {
    response = await fetch(CROF_USAGE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });
  } catch (error) {
    return { message: `CrofAI connected. Unable to fetch usage: ${(error as Error).message}` };
  }

  const rawText = await response.text();

  if (response.status === 401 || response.status === 403) {
    return { message: "CrofAI connected. The API key was rejected by /usage_api/." };
  }

  if (!response.ok) {
    return { message: `CrofAI connected. /usage_api/ returned HTTP ${response.status}.` };
  }

  let payload: JsonRecord = {};
  if (rawText) {
    try {
      payload = toRecord(JSON.parse(rawText));
    } catch {
      return { message: "CrofAI connected. Unable to parse /usage_api/ response." };
    }
  }

  const usableRequestsRaw = payload["usable_requests"];
  const usableRequests =
    usableRequestsRaw === null || usableRequestsRaw === undefined
      ? null
      : toNumber(usableRequestsRaw, 0);
  const credits = toNumber(payload["credits"], 0);

  const quotas: Record<string, UsageQuota> = {};

  if (usableRequests !== null) {
    // CrofAI's /usage_api/ returns only the remaining count; the daily
    // allotment is not exposed. CrofAI Pro plan = 1,000 requests/day per
    // their pricing page, so use that as the baseline total. If the user
    // is on a plan with a higher cap we widen the total to whatever they
    // currently report so we never compute a negative `used`.
    // Without this, total=0 makes the dashboard's percentage formula read
    // 0% (interpreted as "depleted" → red) even on a fresh bucket.
    const CROF_DAILY_BASELINE = 1000;
    const remaining = Math.max(0, usableRequests);
    const total = Math.max(CROF_DAILY_BASELINE, remaining);
    const used = Math.max(0, total - remaining);

    // CrofAI also does not return a reset timestamp and the docs only say
    // "requests left today". The Crof.ai dashboard shows the daily bucket
    // resetting at ~05:00 UTC (verified against the live countdown on
    // 2026-04-25), so synthesize the next 05:00 UTC instant to match.
    // Swap for a real field if Crof ever exposes one.
    const now = new Date();
    const RESET_HOUR_UTC = 5;
    const todayResetMs = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      RESET_HOUR_UTC
    );
    const nextResetMs =
      todayResetMs > now.getTime() ? todayResetMs : todayResetMs + 24 * 60 * 60 * 1000;
    const nextResetIso = new Date(nextResetMs).toISOString();

    quotas["Requests Today"] = {
      used,
      total,
      remaining,
      resetAt: nextResetIso,
      unlimited: false,
      displayName: `Requests Today: ${remaining} left`,
    };
  }

  // Credits are an open balance — render as unlimited so the UI shows the
  // dollar value rather than a misleading 0/0 bar.
  quotas["Credits"] = {
    used: 0,
    total: 0,
    remaining: 0,
    resetAt: null,
    unlimited: true,
    displayName: `Credits: $${credits.toFixed(4)}`,
  };

  return { quotas };
}
