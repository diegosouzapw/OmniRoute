import { NextResponse } from "next/server";
import { z } from "zod";

import { authorizeA2ATaskRoute } from "@/app/api/a2a/_auth";
import { listA2ATaskHistory } from "@/lib/db/a2aTasks";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

/**
 * `GET /api/a2a/tasks/history` — persisted A2A task history (Orchestration Canvas Fase 2,
 * Task C3). Distinct from `GET /api/a2a/tasks` (in-memory, TTL-bound `A2ATaskManager` map): this
 * route reads the `a2a_tasks` rows `A2ATaskManager.persist()` writes on every state transition
 * (Task C2), so a task stays queryable here after it expires out of the in-memory map. Errors
 * follow the house rule for new routes — `buildErrorBody()` (HR#12), unlike the legacy
 * `GET /api/a2a/tasks` and `GET /api/a2a/tasks/[id]` routes this endpoint sits next to.
 */

const A2A_HISTORY_STATES = ["submitted", "working", "completed", "failed", "cancelled"] as const;

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 500;

// `limit` clamps down to MAX_LIMIT rather than rejecting an over-large value with 400 — a caller
// asking for "as much as possible" gets the largest page instead of an error.
const historyQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  skill: z.string().min(1).optional(),
  state: z.enum(A2A_HISTORY_STATES).optional(),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .default(DEFAULT_LIMIT)
    .transform((value) => Math.min(value, MAX_LIMIT)),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

export interface A2AHistoryItem {
  id: string;
  state: string;
  skill: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export async function GET(request: Request) {
  // Same auth contract as the in-memory list route (GET /api/a2a/tasks): management session or
  // a valid API key, owner-scoped for keyed callers. See src/app/api/a2a/_auth.ts.
  const auth = await authorizeA2ATaskRoute(request);
  if (auth instanceof Response) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const parsed = historyQuerySchema.safeParse({
      from: searchParams.get("from") ?? undefined,
      to: searchParams.get("to") ?? undefined,
      skill: searchParams.get("skill") ?? undefined,
      state: searchParams.get("state") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      offset: searchParams.get("offset") ?? undefined,
    });

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? "Invalid query parameters";
      return NextResponse.json(buildErrorBody(400, `Invalid history query: ${firstIssue}`), {
        status: 400,
      });
    }

    const { from, to, skill, state, limit, offset } = parsed.data;
    const { rows, total } = listA2ATaskHistory({
      from,
      to,
      skill,
      state,
      owner: auth.owner,
      limit,
      offset,
    });

    const tasks: A2AHistoryItem[] = rows.map((row) => ({
      id: row.id,
      state: row.state,
      skill: row.skill_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at,
    }));

    return NextResponse.json({ tasks, total, limit, offset });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list A2A task history";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
