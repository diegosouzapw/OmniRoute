/**
 * POST /api/conductor/tasks — creates a task on the Conductor hub (Orchestration Canvas
 * Fase 2, "Repeat" action on the drawer). Thin creation route: validate → auth → delegate
 * to `createConductorTask`. A hub refusal comes back as the hub's status with a sanitized
 * body (never the raw upstream body — Hard Rule #12).
 */

import { NextResponse } from "next/server";
import { z } from "zod";

import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createConductorTask } from "@/lib/conductor/hubProxy";

/**
 * Clamps a hub status before it is used as OUR response status. `createConductorTask`
 * mirrors whatever the hub answered, and `Response.json()` throws a `RangeError` for any
 * status outside 200-599 — a hub (or a stubbed fetch) answering `0`/`600` would turn a
 * hub refusal into a 500 from an unhandled throw. A 3xx/2xx reaching this branch is
 * equally meaningless as an error status, so anything outside 400-599 becomes 502
 * (Bad Gateway — the honest description of "the upstream hub answered something we
 * cannot forward").
 */
function clampErrorStatus(status: unknown): number {
  const s = Number(status);
  return Number.isInteger(s) && s >= 400 && s <= 599 ? s : 502;
}

const createTaskSchema = z.object({
  repoUrl: z.string().min(1),
  prompt: z.string().min(1),
  baseRef: z.string().optional(),
  mode: z.string().optional(),
  cli: z.string().optional(),
  model: z.string().optional(),
});

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = createTaskSchema.safeParse(rawBody);
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  const result = await createConductorTask(parsed.data);
  if (!result.ok || !result.task_id) {
    return createErrorResponse({
      status: clampErrorStatus(result.status),
      message: `Conductor hub refused the task creation (HTTP ${result.status})`,
    });
  }
  return NextResponse.json({ task_id: result.task_id }, { status: 201 });
}
