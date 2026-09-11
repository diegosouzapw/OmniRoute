import { NextRequest, NextResponse } from "next/server";
import {
  getDatabaseSettings,
  updateDatabaseSettings,
  type UserDatabaseSettings,
} from "@/lib/db/databaseSettings";
import { getSettings, updateSettings } from "@/lib/db/settings";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const cacheConfigUpdateSchema = z.object({
  semanticCacheEnabled: z.boolean().optional(),
  semanticCacheMaxSize: z.number().positive().optional(),
  semanticCacheTTL: z.number().positive().optional(),
  promptCacheEnabled: z.boolean().optional(),
  promptCacheStrategy: z.enum(["auto", "system-only", "manual"]).optional(),
  alwaysPreserveClientCache: z.enum(["auto", "always", "never"]).optional(),
  idempotencyWindowMs: z.number().positive().optional(),
  modelCatalogCacheTtlMs: z.number().positive().optional(),
});

const CACHE_CONFIG_KEYS = [
  "semanticCacheEnabled",
  "semanticCacheMaxSize",
  "semanticCacheTTL",
  "promptCacheEnabled",
  "promptCacheStrategy",
  "alwaysPreserveClientCache",
  "idempotencyWindowMs",
  "modelCatalogCacheTtlMs",
] as const;

const DEFAULTS = {
  semanticCacheEnabled: true,
  semanticCacheMaxSize: 100,
  semanticCacheTTL: 1800000,
  promptCacheEnabled: true,
  promptCacheStrategy: "auto",
  alwaysPreserveClientCache: "auto",
  idempotencyWindowMs: 5000,
  // Mirrors DEFAULT_DATABASE_SETTINGS.cache.modelCatalogCacheTtlMs so the value this
  // endpoint reports matches the one the catalog actually uses.
  modelCatalogCacheTtlMs: 60_000,
};

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dbSettings = getDatabaseSettings();
    const cache = dbSettings.cache ?? {};
    // idempotencyWindowMs is not part of the databaseSettings "cache" section —
    // it lives in the flat general settings (src/lib/db/settings.ts), which is
    // where src/lib/idempotencyLayer.ts actually reads it from.
    const flatSettings = await getSettings();
    const config: Record<string, unknown> = {};
    for (const key of CACHE_CONFIG_KEYS) {
      if (key === "idempotencyWindowMs" || key === "alwaysPreserveClientCache") {
        // These live in the flat general settings (src/lib/db/settings.ts):
        // idempotencyLayer and getCacheControlSettings() both read from there,
        // so reporting the databaseSettings "cache" copy would show a value the
        // runtime never uses.
        config[key] = flatSettings[key] ?? DEFAULTS[key];
      } else {
        config[key] = (cache as Record<string, unknown>)[key] ?? DEFAULTS[key];
      }
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateBody(cacheConfigUpdateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return validation.response;
    }

    const updates: Partial<UserDatabaseSettings["cache"]> = {};
    const body = validation.data;

    if (body.semanticCacheEnabled !== undefined) {
      updates.semanticCacheEnabled = body.semanticCacheEnabled;
    }
    if (body.semanticCacheMaxSize !== undefined) {
      updates.semanticCacheMaxSize = body.semanticCacheMaxSize;
    }
    if (body.semanticCacheTTL !== undefined) {
      updates.semanticCacheTTL = body.semanticCacheTTL;
    }
    if (body.promptCacheEnabled !== undefined) {
      updates.promptCacheEnabled = body.promptCacheEnabled;
    }
    if (body.promptCacheStrategy !== undefined) {
      updates.promptCacheStrategy = body.promptCacheStrategy;
    }
    if (body.modelCatalogCacheTtlMs !== undefined) {
      updates.modelCatalogCacheTtlMs = body.modelCatalogCacheTtlMs;
    }

    // updateDatabaseSettings() calls invalidateDbCache("settings") internally,
    // which bumps the model-catalog cache version so in-flight responses pick
    // up the fresh TTL — no separate version bump needed here.
    if (Object.keys(updates).length > 0) {
      updateDatabaseSettings({ cache: updates });
    }

    // idempotencyWindowMs and alwaysPreserveClientCache are read from the flat
    // general settings (see GET) — persisting them into the databaseSettings
    // "cache" section would be a silent no-op for the runtime, which is what
    // made this endpoint's alwaysPreserveClientCache writes ineffective before.
    const flatUpdates: Record<string, unknown> = {};
    if (body.idempotencyWindowMs !== undefined) {
      flatUpdates.idempotencyWindowMs = body.idempotencyWindowMs;
    }
    if (body.alwaysPreserveClientCache !== undefined) {
      flatUpdates.alwaysPreserveClientCache = body.alwaysPreserveClientCache;
    }
    if (Object.keys(flatUpdates).length > 0) {
      await updateSettings(flatUpdates);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
