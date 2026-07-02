import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
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
});

const CACHE_CONFIG_KEYS = [
  "semanticCacheEnabled",
  "semanticCacheMaxSize",
  "semanticCacheTTL",
  "promptCacheEnabled",
  "promptCacheStrategy",
  "alwaysPreserveClientCache",
  "idempotencyWindowMs",
] as const;

const DEFAULTS = {
  semanticCacheEnabled: true,
  semanticCacheMaxSize: 100,
  semanticCacheTTL: 1800000,
  promptCacheEnabled: true,
  promptCacheStrategy: "auto",
  alwaysPreserveClientCache: "auto",
  idempotencyWindowMs: 5000,
};

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getSettings();
    const config: Record<string, unknown> = {};
    for (const key of CACHE_CONFIG_KEYS) {
      config[key] = settings[key] ?? DEFAULTS[key];
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

    const updates: Record<string, unknown> = {};
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
    if (body.alwaysPreserveClientCache !== undefined) {
      updates.alwaysPreserveClientCache = body.alwaysPreserveClientCache;
    }
    if (body.idempotencyWindowMs !== undefined) {
      updates.idempotencyWindowMs = body.idempotencyWindowMs;
    }

    await updateSettings(updates);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
