import { NextResponse } from "next/server";
import {
  getAllMiddlewareHooks,
  createMiddlewareHook,
  getMiddlewareHook,
  getHookLogs,
} from "@/lib/localDb";
import { registerHook, getAllHooks } from "@/lib/middleware/registry";
import type { HookConfig, CreateHookRequest } from "@/lib/middleware/types";

/**
 * GET /api/middleware/hooks — List all registered hooks
 */
export async function GET(request: Request) {
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
  try {
    const body: CreateHookRequest = await request.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    if (!body.code || !body.code.trim()) {
      return NextResponse.json({ error: "code is required" }, { status: 400 });
    }

    // Validate name format
    if (!/^[a-zA-Z0-9_-]+$/.test(body.name)) {
      return NextResponse.json(
        { error: "name must contain only letters, numbers, hyphens, and underscores" },
        { status: 400 }
      );
    }

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
