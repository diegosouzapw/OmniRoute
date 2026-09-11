import { NextResponse } from "next/server";
import { getTaskManager } from "@/lib/a2a/taskManager";
import { authorizeA2ATaskRoute } from "@/app/api/a2a/_auth";
import {
  getA2ATaskHistoryById,
  listA2ATaskEvents,
  type A2ATaskHistoryRow,
} from "@/lib/db/a2aTasks";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/** JSON.parse with a fallback on malformed/absent input — persisted history rows are our own
 * writes (A2ATaskManager.persist()) but are still parsed defensively. */
function safeJsonParse<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

const STATE_EVENT_PREFIX = "state:";
/** Event type written by `collectMemoryHits` (src/lib/a2a/taskExecution.ts). */
const MEMORY_HITS_EVENT_TYPE = "memory_hits";
const MEMORY_HIT_FIELDS = ["id", "key", "type", "snippet"] as const;

interface MemoryHit {
  id: string;
  key: string;
  type: string;
  snippet: string;
}

/**
 * Parse a persisted `memory_hits` event's `data_json` into the hits the drawer renders.
 * Mirrors `DrawerMemory`'s validation in
 * `src/app/(dashboard)/dashboard/orchestration/drawer/OrchestrationDrawer.tsx`: `metadata` is
 * caller-supplied and unvalidated end to end, so what got persisted can be anything —
 * a bare string (`"boom"`, whose `.length` is truthy), an object, or an array carrying entries
 * with a non-string `key`/`type`/`snippet` (rendered as React children, so an object there
 * would throw "Objects are not valid as a React child" and take the whole drawer down).
 * Never throws: a malformed payload degrades to an empty list, so the route answers 200
 * with `metadata: {}` instead of 500.
 */
function parseMemoryHits(dataJson: string | null | undefined): MemoryHit[] {
  const raw = safeJsonParse<unknown>(dataJson, null);
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (hit): hit is MemoryHit =>
      !!hit &&
      typeof hit === "object" &&
      MEMORY_HIT_FIELDS.every(
        (field) => typeof (hit as Record<string, unknown>)[field] === "string"
      )
  );
}

/**
 * Reconstitute the in-memory `A2ATask` shape (src/lib/a2a/taskManager.ts) from a persisted
 * history row + its events (Orchestration Canvas Fase 2, Task C3), so the dashboard's existing
 * task-detail drawer works unchanged for a task that has already left the in-memory TTL window.
 * `A2ATaskManager.persist()` writes one `state:<TaskState>` event per transition — the runtime
 * state each event represents is recovered by stripping that prefix.
 */
function reconstituteHistoricalTask(row: A2ATaskHistoryRow) {
  const input = safeJsonParse<{
    skill: string;
    messages: Array<{ role: string; content: string }>;
  }>(row.input_json, { skill: row.skill_id ?? "", messages: [] });
  const artifacts = safeJsonParse<unknown[]>(row.output_json, []);
  const eventRows = listA2ATaskEvents(row.id);

  // `memory_hits` is observability, not a state transition — it is hydrated into `metadata`
  // (Fase 3, Task C1) and kept out of the timeline the drawer renders.
  const memoryHits = eventRows
    .filter((event) => event.event_type === MEMORY_HITS_EVENT_TYPE)
    .flatMap((event) => parseMemoryHits(event.data_json));

  const events = eventRows
    .filter((event) => event.event_type !== MEMORY_HITS_EVENT_TYPE)
    .map((event) => {
      const data = safeJsonParse<{ message?: string } | null>(event.data_json, null);
      const state = event.event_type.startsWith(STATE_EVENT_PREFIX)
        ? event.event_type.slice(STATE_EVENT_PREFIX.length)
        : row.state;
      return {
        timestamp: event.created_at,
        state,
        ...(data?.message !== undefined ? { message: data.message } : {}),
      };
    });

  return {
    id: row.id,
    skill: row.skill_id,
    state: row.state,
    input,
    artifacts,
    events,
    metadata: memoryHits.length > 0 ? { memoryHits } : {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    expiresAt: row.updated_at,
  };
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // GHSA-jcm5-6wpp-wjj8: this route had no auth call at all — open regardless
  // of configuration. Another principal's task answers 404, same as a missing
  // one, so an IDOR probe cannot tell the two apart.
  const auth = await authorizeA2ATaskRoute(request);
  if (auth instanceof Response) return auth;
  try {
    const { id } = await params;
    const tm = getTaskManager();
    const task = tm.getTask(id, auth.owner);
    if (task) {
      return NextResponse.json({ task });
    }

    // Fallen out of the in-memory TTL window — fall back to the persisted history row (Task C3).
    // NOTE — owner semantics diverge from the live lookup above by design: `tm.getTask(id,
    // undefined)` (via `A2ATaskManager.isVisibleTo`) hides an owned task from an owner-less
    // caller, while `getA2ATaskHistoryById(id, undefined)` applies no owner clause at all, so a
    // keyed task can 404 here while live and become readable once it ages into history. This
    // matches `listA2ATaskHistory`'s existing owner rule (management/keyless callers see
    // everything, same posture as `listTasks`) — intentional, not a bug. Do not "fix" it by
    // passing a stricter owner clause into the history fallback.
    const historyRow = getA2ATaskHistoryById(id, auth.owner);
    if (historyRow) {
      return NextResponse.json({ task: reconstituteHistoricalTask(historyRow) });
    }

    return NextResponse.json({ error: `Task not found: ${id}` }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      {
        error: sanitizeErrorMessage(
          error instanceof Error ? error.message : "Failed to load A2A task"
        ),
      },
      { status: 500 }
    );
  }
}
