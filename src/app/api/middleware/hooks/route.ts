import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getAllMiddlewareHooks,
  createMiddlewareHook,
  getMiddlewareHook,
  getHookLogs,
} from "@/lib/localDb";
import { registerHook, getAllHooks } from "@/lib/middleware/registry";
import type { HookConfig, CreateHookRequest } from "@/lib/middleware/types";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const hookScopeSchema = z.union([
  z.object({ type: z.literal("global") }),
  z.object({ type: z.literal("combo"), comboId: z.string().trim().min(1) }),
]);

const createHookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "name must contain only letters, numbers, hyphens, and underscores"),
  description: z.string().optional().default(""),
  priority: z.number().int().optional().default(200),
  scope: hookScopeSchema.optional().default({ type: "global" }),
  code: z.string().trim().min(1, "code is required"),
});

/**
 * GET /api/middleware/hooks — List all registered hooks
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const hookName = url.searchParams.get("name");
    const includeLogs = url.searchParams.get("logs") === "true";
    const logLimit = parseInt(url.searchParams.get("logLimit") || "10", 10);

    if (hookName) {
      const hook = getMiddlewareHook(hookName);
      if (!hook) {
        return NextResponse.json({ error: "Hook not found" }, { status: 404 });
      }

      const result: Record<string, unknown> = { hook };
      if (includeLogs) {
        result.logs = getHookLogs(hookName, logLimit);
      }
      return NextResponse.json(result);
    }

    const hooks = getAllMiddlewareHooks();
    const registryHooks = getAllHooks();

    return NextResponse.json({
      hooks,
      registryStats: {
        dbCount: hooks.length,
        registryCount: registryHooks.length,
      },
    });
  } catch (error) {
    console.error("[API] GET /api/middleware/hooks error:", error);
    return NextResponse.json({ error: "Failed to list hooks" }, { status: 500 });
  }
}

/**
 * POST /api/middleware/hooks — Register a new hook
 *
 * Body: { name, description?, priority?, scope?, code }
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(createHookSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body: CreateHookRequest = validation.data;

    // Check for duplicate
    const existing = getMiddlewareHook(body.name);
    if (existing) {
      return NextResponse.json({ error: `Hook "${body.name}" already exists` }, { status: 409 });
    }

    const hookConfig: HookConfig = {
      name: body.name,
      description: body.description || "",
      priority: body.priority ?? 200,
      scope: body.scope || { type: "global" },
      enabled: true,
      code: body.code,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      runCount: 0,
    };

    // Persist to DB
    const saved = createMiddlewareHook(hookConfig);

    // Register in runtime registry
    registerHook(saved);

    return NextResponse.json({ hook: saved }, { status: 201 });
  } catch (error: any) {
    console.error("[API] POST /api/middleware/hooks error:", error);
    return NextResponse.json({ error: error?.message || "Failed to create hook" }, { status: 500 });
  }
}
