import { NextRequest, NextResponse } from "next/server";
import {
  getDatabaseSettings,
  updateDatabaseSettings,
  type UserDatabaseSettings,
} from "@/lib/db/databaseSettings";
import { getSettings, updateSettings } from "@/lib/db/settings";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { ensureSemanticCacheDbBridge } from "@/lib/cache/semanticCacheDbBridge";
import { resetSemanticCacheManager } from "@omniroute/open-sse/services/cache/semanticCacheManager";
import { getEmbeddingOptions } from "./embeddingOptions";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

ensureSemanticCacheDbBridge();

const cacheConfigUpdateSchema = z.object({
  semanticCacheEnabled: z.boolean().optional(),
  semanticCacheMaxSize: z.number().positive().optional(),
  semanticCacheTTL: z.number().positive().optional(),
  semanticCacheBackend: z.enum(["memory", "redis"]).optional(),
  semanticCacheThreshold: z.number().min(0).max(1).optional(),
  semanticCacheEmbeddingProvider: z.string().trim().optional(),
  semanticCacheEmbeddingModel: z.string().trim().optional(),
  semanticCacheEmbeddingDimension: z.number().positive().nullable().optional(),
  semanticCacheEmbeddingBaseUrl: z.string().trim().nullable().optional(),
  semanticCacheEmbeddingApiKey: z.string().trim().nullable().optional(),
  semanticCacheRedisUrl: z.string().trim().nullable().optional(),
  semanticCacheRedisPrefix: z.string().trim().optional(),
  semanticCacheRequireZeroTemp: z.boolean().optional(),
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
  "semanticCacheBackend",
  "semanticCacheThreshold",
  "semanticCacheEmbeddingProvider",
  "semanticCacheEmbeddingModel",
  "semanticCacheEmbeddingDimension",
  "semanticCacheEmbeddingBaseUrl",
  "semanticCacheEmbeddingApiKey",
  "semanticCacheRedisUrl",
  "semanticCacheRedisPrefix",
  "semanticCacheRequireZeroTemp",
  "promptCacheEnabled",
  "promptCacheStrategy",
  "alwaysPreserveClientCache",
  "idempotencyWindowMs",
  "modelCatalogCacheTtlMs",
] as const;

const DEFAULTS = {
  semanticCacheEnabled: true,
  semanticCacheMaxSize: 1000,
  semanticCacheTTL: 1800000,
  semanticCacheBackend: "memory",
  semanticCacheThreshold: 0.8,
  semanticCacheEmbeddingProvider: "lemonade",
  semanticCacheEmbeddingModel: "harrier-oss-v1-0.6b",
  semanticCacheEmbeddingDimension: 1024,
  semanticCacheEmbeddingBaseUrl: "",
  semanticCacheEmbeddingApiKey: "",
  semanticCacheRedisUrl: "",
  semanticCacheRedisPrefix: "omniroute:semcache:",
  semanticCacheRequireZeroTemp: true,
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
    const [flatSettings, embeddingOptions] = await Promise.all([
      getSettings(),
      getEmbeddingOptions(),
    ]);
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
    config.embeddingOptions = embeddingOptions;
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
    if (body.semanticCacheBackend !== undefined) {
      updates.semanticCacheBackend = body.semanticCacheBackend;
    }
    if (body.semanticCacheThreshold !== undefined) {
      updates.semanticCacheThreshold = body.semanticCacheThreshold;
    }
    if (body.semanticCacheEmbeddingProvider !== undefined) {
      updates.semanticCacheEmbeddingProvider = body.semanticCacheEmbeddingProvider;
    }
    if (body.semanticCacheEmbeddingModel !== undefined) {
      updates.semanticCacheEmbeddingModel = body.semanticCacheEmbeddingModel;
    }
    if (body.semanticCacheEmbeddingDimension !== undefined) {
      updates.semanticCacheEmbeddingDimension = body.semanticCacheEmbeddingDimension ?? undefined;
    }
    if (body.semanticCacheEmbeddingBaseUrl !== undefined) {
      updates.semanticCacheEmbeddingBaseUrl = body.semanticCacheEmbeddingBaseUrl ?? undefined;
    }
    if (body.semanticCacheEmbeddingApiKey !== undefined) {
      updates.semanticCacheEmbeddingApiKey = body.semanticCacheEmbeddingApiKey ?? undefined;
    }
    if (body.semanticCacheRedisUrl !== undefined) {
      updates.semanticCacheRedisUrl = body.semanticCacheRedisUrl ?? undefined;
    }
    if (body.semanticCacheRedisPrefix !== undefined) {
      updates.semanticCacheRedisPrefix = body.semanticCacheRedisPrefix;
    }
    if (body.semanticCacheRequireZeroTemp !== undefined) {
      updates.semanticCacheRequireZeroTemp = body.semanticCacheRequireZeroTemp;
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
      // Drop the in-memory semantic cache manager so the next request rebuilds it
      // from the freshly-persisted databaseSettings (dual-layer cache work).
      resetSemanticCacheManager();
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
