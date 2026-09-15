import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { writeTerminalStatus } from "@/shared/utils/terminalStatus";

import { PROVIDER_ERROR_TYPES } from "../../services/errorClassifier.ts";
import {
  hasRequestRejectedStreak,
  recordRequestRejected,
  seedRequestRejectedStreak,
} from "../../services/requestRejectedStreak.ts";

/**
 * chatCore leaf for PROVIDER_ERROR_TYPES.REQUEST_REJECTED (#12859 — Anthropic
 * OAuth 403 "Request not allowed").
 *
 * The upstream refused THIS request, not the credential: the same token serves
 * the next request. One refusal must not ban the connection — but a run of
 * them is enforcement, and re-sending every request into it would be wrong.
 * So: exclude the connection for a short, growing cooldown and escalate to
 * `banned` only for consecutive refusals (services/requestRejectedStreak).
 *
 * Probe-origin failures (dashboard test-all) are recorded on the connection
 * but never touch the streak, cool it down or ban it (#9817).
 */
export async function handleRequestRejectedFailure(params: {
  connectionId: string;
  statusCode: number;
  message: string;
}): Promise<void> {
  const { connectionId, statusCode, message } = params;
  const nowIso = new Date().toISOString();

  if (await shouldIsolateProbeFailures()) {
    await updateProviderConnection(connectionId, {
      lastErrorType: PROVIDER_ERROR_TYPES.REQUEST_REJECTED,
      lastError: message,
      lastErrorAt: nowIso,
      errorCode: statusCode,
    });
    console.warn(
      `[provider] Node ${connectionId} probe refused by upstream (${statusCode}) — connection stays active`
    );
    return;
  }

  // First refusal seen by this process: pick up one that happened before a
  // restart so a crash loop cannot reset the count on every boot.
  if (!hasRequestRejectedStreak(connectionId)) {
    try {
      const row = await getProviderConnectionById(connectionId);
      if (row?.lastErrorType === PROVIDER_ERROR_TYPES.REQUEST_REJECTED && row.lastErrorAt) {
        seedRequestRejectedStreak(connectionId, Date.parse(String(row.lastErrorAt)));
      }
    } catch {
      // best-effort — the in-memory streak still works without the seed
    }
  }

  const verdict = recordRequestRejected(connectionId);
  const windowH = Math.round(verdict.windowMs / 3_600_000);

  if (!verdict.counted) {
    console.warn(
      `[provider] Node ${connectionId} request refused by upstream (${statusCode}) while already excluded — same episode, not counted (refusal ${verdict.streak}/${verdict.threshold})`
    );
    return;
  }

  if (verdict.escalate) {
    await writeTerminalStatus(
      connectionId,
      {
        testStatus: "banned",
        isActive: false,
        lastError: `${message} (${verdict.streak} consecutive refusals within ${windowH}h — treated as upstream enforcement)`,
        lastErrorType: PROVIDER_ERROR_TYPES.FORBIDDEN,
        errorCode: String(statusCode),
      },
      "production"
    );
    console.warn(
      `[provider] Node ${connectionId} refused ${verdict.streak}x in a row (${statusCode}) — disabling, reconnect required`
    );
    return;
  }

  const until = new Date(Date.now() + verdict.cooldownMs).toISOString();
  // Same shape as the other connection-level cooldowns (testStatus
  // "unavailable" + ISO rateLimitedUntil): the dashboard shows the countdown
  // and the recovery tick restores "active" once the window has elapsed.
  await updateProviderConnection(connectionId, {
    testStatus: "unavailable",
    rateLimitedUntil: until,
    lastErrorType: PROVIDER_ERROR_TYPES.REQUEST_REJECTED,
    lastError: message,
    lastErrorAt: nowIso,
    errorCode: statusCode,
  });
  console.warn(
    `[provider] Node ${connectionId} request refused by upstream (${statusCode}) — excluded until ${until} (refusal ${verdict.streak}/${verdict.threshold} in a row), trying other accounts`
  );
}
