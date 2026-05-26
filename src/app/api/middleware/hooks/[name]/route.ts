import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getMiddlewareHook,
  updateMiddlewareHook,
  deleteMiddlewareHook,
  getHookLogs,
} from "@/lib/localDb";
import { registerHook, unregisterHook, updateHook } from "@/lib/middleware/registry";
import type { HookConfig } from "@/lib/middleware/types";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const updateHookSchema = z.object({
  description: z.string().optional(),
  priority: z.number().int().optional(),
  scope: z.unknown().optional(),
  enabled: z.boolean().optional(),
  code: z.string().optional(),
});

type RouteParams = { params: Promise<{ name: string }> };

/**
 * GET /api/middleware/hooks/[name] — Get a single hook details
 */
export async function GET(request: Request, { params }: RouteParams) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { name } = await params;
    const url = new URL(request.url);
    const includeLogs = url.searchParams.get("logs") === "true";
    const logLimit = parseInt(url.searchParams.get("logLimit") || "20", 10);

    const hook = getMiddlewareHook(name);
    if (!hook) {
      return NextResponse.json({ error: "Hook not found" }, { status: 404 });
    }

    const result: Record<string, unknown> = { hook };
    if (includeLogs) {
      result.logs = getHookLogs(name, logLimit);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[API] GET /api/middleware/hooks/[name] error:", error);
    return NextResponse.json({ error: "Failed to get hook" }, { status: 500 });
  }
}

/**
 * PUT /api/middleware/hooks/[name] — Update a hook
 *
 * Body: { description?, priority?, scope?, enabled?, code? }
 */
export async function PUT(request: Request, { params }: RouteParams) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { name } = await params;
    const raw = await request.json();
    const parsed = updateHookSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }
    const body = parsed.data;

    const existing = getMiddlewareHook(name);
    if (!existing) {
      return NextResponse.json({ error: "Hook not found" }, { status: 404 });
    }

    // Build updates from request body
    const updates: Partial<HookConfig> = {};
    if (body.description !== undefined) updates.description = body.description;
    if (body.priority !== undefined) updates.priority = body.priority;
    if (body.scope !== undefined) updates.scope = body.scope as HookConfig["scope"];
    if (body.enabled !== undefined) updates.enabled = body.enabled;
    if (body.code !== undefined) updates.code = body.code;

    // Persist to DB
    const saved = updateMiddlewareHook(name, updates);
    if (!saved) {
      return NextResponse.json({ error: "Failed to update hook" }, { status: 500 });
    }

    // Update runtime registry
    if (body.code !== undefined) {
      // Re-register with new code
      unregisterHook(name);
      registerHook(saved);
    }

    return NextResponse.json({ hook: saved });
  } catch (error: any) {
    console.error("[API] PUT /api/middleware/hooks/[name] error:", error);
    return NextResponse.json({ error: error?.message || "Failed to update hook" }, { status: 500 });
  }
}

/**
 * DELETE /api/middleware/hooks/[name] — Delete a hook
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { name } = await params;

    const existing = getMiddlewareHook(name);
    if (!existing) {
      return NextResponse.json({ error: "Hook not found" }, { status: 404 });
    }

    // Remove from DB
    const deleted = deleteMiddlewareHook(name);
    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete hook" }, { status: 500 });
    }

    // Remove from runtime registry
    unregisterHook(name);

    return NextResponse.json({ success: true, message: `Hook "${name}" deleted` });
  } catch (error) {
    console.error("[API] DELETE /api/middleware/hooks/[name] error:", error);
    return NextResponse.json({ error: "Failed to delete hook" }, { status: 500 });
  }
}
