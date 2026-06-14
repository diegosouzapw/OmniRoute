/**
 * GET /api/settings/quota-store — read current quota store driver config
 * PUT /api/settings/quota-store — update quota store driver config
 *
 * Hard Rule #12 + B25: The Redis URL (a credential/secret) is NEVER returned
 * in the GET response. Only a boolean flag `redisUrlConfigured` is surfaced.
 *
 * Zod: QuotaStoreSettingsSchema from @/shared/schemas/quota
 * Audit: quota.store.driver_changed on PUT (B26)
 *
 * Driver/URL persistence: stored in the settings DB under the "quotaStore" key
 * (same mechanism as cache-config). The storeFactory reads these on next init.
 * After PUT, the singleton is reset so the next call to getQuotaStore() picks
 * up the new driver.
 *
 * Auth: requireManagementAuth
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { QuotaStoreSettingsSchema } from "@/shared/schemas/quota";
import { getSettings, updateSettings } from "@/lib/localDb";
import { logAuditEvent, getAuditRequestContext } from "@/lib/compliance/index";
import { resetQuotaStoreSingleton } from "@/lib/quota/QuotaStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const settings = await getSettings();
    const raw = settings["quotaStore"];
    let driver: string = process.env.QUOTA_STORE_DRIVER ?? "sqlite";
    let redisUrlConfigured = Boolean(process.env.QUOTA_STORE_REDIS_URL);

    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const obj = raw as Record<string, unknown>;
      if (typeof obj.driver === "string") driver = obj.driver;
      if (typeof obj.redisUrl === "string" && obj.redisUrl.length > 0) {
        redisUrlConfigured = true;
      }
    }

    // Hard Rule #12 / B25 / B1 — NEVER return the Redis URL (it's a credential).
    // Only surface driver + a boolean flag indicating whether a URL is configured.
    return NextResponse.json({
      driver,
      redisUrlConfigured,
      // Explicit: URL is redacted, never returned
      redisUrl: null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read quota store settings";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function PUT(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json().catch(() => null);
    const parsed = QuotaStoreSettingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }

    const { driver, redisUrl } = parsed.data;

    // Validate: redis driver requires a URL
    if (driver === "redis" && !redisUrl) {
      return NextResponse.json(
        buildErrorBody(400, "Redis URL is required when driver is set to 'redis'"),
        { status: 400 }
      );
    }

    // Persist to settings DB (same key structure the storeFactory reads)
    const quotaStoreConfig: Record<string, unknown> = { driver };
    if (redisUrl) {
      quotaStoreConfig.redisUrl = redisUrl;
    }
    await updateSettings({ quotaStore: quotaStoreConfig });

    // Reset singleton so next getQuotaStore() call picks up the new driver
    resetQuotaStoreSingleton();

    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "quota.store.driver_changed",
      metadata: {
        driver,
        redisUrlConfigured: Boolean(redisUrl),
        // NEVER log the actual URL — it's a credential (Hard Rule #1)
      },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    return NextResponse.json({
      driver,
      redisUrlConfigured: Boolean(redisUrl),
      redisUrl: null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update quota store settings";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
