/**
 * Batch model-test endpoint.
 *
 * Loops sequentially over `modelIds` so the `withRateLimit` Bottleneck can
 * serialize dispatches against the upstream provider/connection. Stops the
 * loop early if it sees `CONSECUTIVE_RATE_LIMIT_STOP_THRESHOLD` rate-limited
 * results in a row — a 429 storm usually means the upstream is down and the
 * remaining models will only burn the timeout window.
 *
 * When `autoHideFailed` is true, models that return a hard error (NOT
 * rate-limited) are persisted as hidden via `setModelIsHidden`.
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { DEFAULT_MODEL_TEST_TIMEOUT_MS, runSingleModelTest } from "@/lib/api/modelTestRunner";
import { setModelIsHidden } from "@/lib/localDb";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getSettings } from "@/lib/db/settings";
import { isFreeModel, providerHasFreeModels } from "@/shared/utils/freeModels";
import * as log from "@/sse/utils/logger";

const CONSECUTIVE_RATE_LIMIT_STOP_THRESHOLD = 3;
/** Web-session providers (esp. Arena/CF) ban burst probes — pause between models. */
const SLOW_PROBE_PROVIDERS = new Set(["lmarena", "lma"]);
/** Fixed inter-model delay for SLOW_PROBE_PROVIDERS (no env — avoids doc-sync drift). */
const SLOW_PROBE_DELAY_MS = 3500;
const CONSECUTIVE_BOT_STOP_THRESHOLD = 2;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const testAllSchema = z.object({
  providerId: z.string().min(1),
  modelIds: z.array(z.string().min(1)).min(1).max(100),
  connectionId: z.string().optional(),
  respectRateLimit: z.boolean().optional().default(true),
  autoHideFailed: z.boolean().optional().default(false),
});

export interface BatchTestResultEntry {
  status: "ok" | "error" | "slow";
  latencyMs: number;
  responseText?: string;
  error?: string;
  statusCode?: number;
  rateLimited?: boolean;
  isTransient?: boolean;
  hidden?: boolean;
  isTimeout?: boolean;
}

function toBatchEntry(
  result: Awaited<ReturnType<typeof runSingleModelTest>>
): BatchTestResultEntry {
  const entry: BatchTestResultEntry = {
    status: result.status === "ok" ? "ok" : result.status === "slow" ? "slow" : "error",
    latencyMs: result.latencyMs,
  };
  if (result.responseText !== undefined) entry.responseText = result.responseText;
  if (result.error !== undefined) entry.error = result.error;
  if (result.statusCode !== undefined) entry.statusCode = result.statusCode;
  if (result.rateLimited === true) entry.rateLimited = true;
  if (result.isTransient === true) entry.isTransient = true;
  if (result.isTimeout === true) entry.isTimeout = true;
  return entry;
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  const validation = testAllSchema.safeParse(rawBody);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.format() }, { status: 400 });
  }
  const { providerId, modelIds, connectionId, respectRateLimit, autoHideFailed } = validation.data;

  // #6328 (follow-up to #6495): REMOVE — not just hide — paid Test-all dispatches
  // when hidePaidModels is on. Paid ids are skipped inside the loop with a
  // "Skipped" entry; the skip does NOT touch the consecutive-rate-limit halt
  // counter (skips are not upstream failures). Fail open on settings read.
  let hidePaid = false;
  try {
    const settings = await getSettings();
    hidePaid = settings?.hidePaidModels === true;
  } catch {}

  log.info(
    "MODEL_TEST_ALL",
    `Starting batch test for ${modelIds.length} model(s) on provider ${providerId}`,
    {
      providerId,
      modelCount: modelIds.length,
      hasConnection: Boolean(connectionId),
      respectRateLimit,
      autoHideFailed,
    }
  );

  const results: Record<string, BatchTestResultEntry> = {};
  let consecutiveRateLimits = 0;
  let consecutiveBotBlocks = 0;
  let stoppedEarly = false;
  let stopReason: "consecutive_rate_limits" | "consecutive_bot_blocks" | undefined;
  const slowProbe = SLOW_PROBE_PROVIDERS.has(providerId);
  let testedUpstream = 0;

  for (const modelId of modelIds) {
    // #6328: skip paid ids without dispatching; do not increment
    // consecutiveRateLimits — skip is not a rate-limited failure.
    if (
      hidePaid &&
      !(providerHasFreeModels(providerId) && isFreeModel(providerId, { id: modelId }))
    ) {
      results[modelId] = {
        status: "error",
        latencyMs: 0,
        error: "Skipped: paid model with hidePaidModels enabled",
      };
      continue;
    }

    let entry: BatchTestResultEntry;
    try {
      // Space out Arena/CF probes — sequential alone still looks like a burst.
      if (slowProbe && testedUpstream > 0 && SLOW_PROBE_DELAY_MS > 0) {
        await sleep(SLOW_PROBE_DELAY_MS);
      }
      // `runSingleModelTest` only engages the Bottleneck rate limiter when
      // `connectionId` is provided. To honor `respectRateLimit=false`, we
      // omit the connectionId so the runner bypasses `withRateLimit`.
      const effectiveConnectionId =
        connectionId && respectRateLimit !== false ? connectionId : undefined;
      const result = await runSingleModelTest({
        providerId,
        modelId,
        ...(effectiveConnectionId ? { connectionId: effectiveConnectionId } : {}),
        timeoutMs: DEFAULT_MODEL_TEST_TIMEOUT_MS,
        streamChat: true,
      });
      entry = toBatchEntry(result);
      testedUpstream += 1;
    } catch (error: unknown) {
      log.error("MODEL_TEST_ALL", `Unexpected error testing model ${modelId}`, {
        providerId,
        modelId,
        error: sanitizeErrorMessage(error),
      });
      entry = {
        status: "error",
        latencyMs: 0,
        error: sanitizeErrorMessage(error) || "Unknown error",
      };
    }

    if (entry.rateLimited) {
      consecutiveRateLimits += 1;
    } else {
      consecutiveRateLimits = 0;
    }

    const botBlocked =
      entry.statusCode === 403 ||
      (typeof entry.error === "string" &&
        /cloudflare|bot management|recaptcha|cf-chl|just a moment/i.test(entry.error));
    if (botBlocked) {
      consecutiveBotBlocks += 1;
    } else if (entry.status === "ok") {
      consecutiveBotBlocks = 0;
    }

    if (
      autoHideFailed &&
      entry.status === "error" &&
      !entry.rateLimited &&
      !entry.isTimeout &&
      !entry.isTransient
    ) {
      try {
        await setModelIsHidden(providerId, modelId, true);
        entry.hidden = true;
        log.info("MODEL_TEST_ALL", `Auto-hidden model ${modelId} after test failure`, {
          providerId,
          modelId,
        });
      } catch (hideError: unknown) {
        log.error("MODEL_TEST_ALL", `Failed to auto-hide model ${modelId}`, {
          providerId,
          modelId,
          error: sanitizeErrorMessage(hideError),
        });
      }
    }

    results[modelId] = entry;
    log.info(
      "MODEL_TEST_ALL",
      `Tested ${modelId}: ${entry.status}${entry.rateLimited ? " (rate-limited)" : ""}${entry.isTimeout ? " (timeout)" : ""}`,
      {
        providerId,
        modelId,
        latencyMs: entry.latencyMs,
        rateLimited: entry.rateLimited,
        isTimeout: entry.isTimeout,
        hidden: entry.hidden,
      }
    );

    if (consecutiveRateLimits >= CONSECUTIVE_RATE_LIMIT_STOP_THRESHOLD) {
      stoppedEarly = true;
      stopReason = "consecutive_rate_limits";
      log.warn(
        "MODEL_TEST_ALL",
        `Stopping batch early after ${consecutiveRateLimits} consecutive rate-limited results`,
        {
          providerId,
          testedCount: Object.keys(results).length,
          totalCount: modelIds.length,
        }
      );
      break;
    }

    if (slowProbe && consecutiveBotBlocks >= CONSECUTIVE_BOT_STOP_THRESHOLD) {
      stoppedEarly = true;
      stopReason = "consecutive_bot_blocks";
      log.warn(
        "MODEL_TEST_ALL",
        `Stopping batch early after ${consecutiveBotBlocks} consecutive bot/Cloudflare blocks (avoid session ban)`,
        {
          providerId,
          testedCount: Object.keys(results).length,
          totalCount: modelIds.length,
        }
      );
      break;
    }
  }

  log.info(
    "MODEL_TEST_ALL",
    `Batch test complete: ${Object.keys(results).length}/${modelIds.length} model(s)`,
    {
      providerId,
      tested: Object.keys(results).length,
      total: modelIds.length,
      stoppedEarly,
    }
  );

  return NextResponse.json({
    results,
    ...(stoppedEarly && stopReason ? { stoppedEarly: true, stopReason } : {}),
  });
}
