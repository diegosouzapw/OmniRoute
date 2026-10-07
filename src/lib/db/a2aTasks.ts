/**
 * db/a2aTasks.ts — A2A task history writer/reader over the tables created by migration
 * `002_mcp_a2a_tables.sql` (`a2a_tasks`, `a2a_task_events`). No new migration: this module only
 * adds the write/read surface those tables never had (Orchestration Canvas Fase 2, Task C1).
 *
 * Owner visibility mirrors `A2ATaskManager.isVisibleTo` (src/lib/a2a/taskManager.ts): with an
 * `owner` given, a row is visible when `api_key_id IS NULL OR api_key_id = owner`; without one,
 * every row is visible.
 */
import { getDbInstance } from "./core.ts";

export interface A2ATaskHistoryRow {
  id: string;
  state: string;
  skill_id: string | null;
  input_json: string | null;
  output_json: string | null;
  api_key_id: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface A2ATaskHistoryEventRow {
  event_type: string;
  data_json: string | null;
  created_at: string;
}

export interface A2AHistoryFilter {
  /** ISO timestamp — created_at >= from */
  from?: string;
  /** ISO timestamp — created_at <= to */
  to?: string;
  skill?: string;
  state?: string;
  /** See owner semantics in the module doc comment above. */
  owner?: string;
  limit: number;
  offset: number;
}

export interface UpsertA2ATaskInput {
  id: string;
  state: string;
  skillId: string | null;
  inputJson: string | null;
  outputJson: string | null;
  apiKeyId: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

const HISTORY_COLUMNS =
  "id, state, skill_id, input_json, output_json, api_key_id, created_at, updated_at, completed_at";

/** Builds the shared WHERE clause (+ params) for filter/owner conditions used by list/count. */
function buildHistoryWhere(f: Pick<A2AHistoryFilter, "from" | "to" | "skill" | "state" | "owner">) {
  const clauses: string[] = [];
  const params: Record<string, unknown> = {};

  if (f.from !== undefined) {
    clauses.push("created_at >= @from");
    params.from = f.from;
  }
  if (f.to !== undefined) {
    clauses.push("created_at <= @to");
    params.to = f.to;
  }
  if (f.skill !== undefined) {
    clauses.push("skill_id = @skill");
    params.skill = f.skill;
  }
  if (f.state !== undefined) {
    clauses.push("state = @state");
    params.state = f.state;
  }
  if (f.owner !== undefined) {
    clauses.push("(api_key_id IS NULL OR api_key_id = @owner)");
    params.owner = f.owner;
  }

  const where = clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";
  return { where, params };
}

/**
 * Insert a new task history row, or update the mutable fields of an existing one keyed by `id`.
 */
export function upsertA2ATask(row: UpsertA2ATaskInput): void {
  const db = getDbInstance();
  db.prepare(
    `
    INSERT INTO a2a_tasks (
      id, state, skill_id, input_json, output_json, api_key_id,
      created_at, updated_at, completed_at
    ) VALUES (
      @id, @state, @skillId, @inputJson, @outputJson, @apiKeyId,
      @createdAt, @updatedAt, @completedAt
    )
    ON CONFLICT(id) DO UPDATE SET
      state = excluded.state,
      output_json = excluded.output_json,
      updated_at = excluded.updated_at,
      completed_at = excluded.completed_at
  `
  ).run(row);
}

/** Append an event to a task's event log. */
export function appendA2ATaskEvent(taskId: string, eventType: string, dataJson?: string): void {
  const db = getDbInstance();
  db.prepare(
    `
    INSERT INTO a2a_task_events (task_id, event_type, data_json)
    VALUES (@taskId, @eventType, @dataJson)
  `
  ).run({ taskId, eventType, dataJson: dataJson ?? null });
}

/** List a task's events in insertion order (oldest first). */
export function listA2ATaskEvents(taskId: string): A2ATaskHistoryEventRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT event_type, data_json, created_at
      FROM a2a_task_events
      WHERE task_id = @taskId
      ORDER BY id ASC
    `
    )
    .all({ taskId }) as A2ATaskHistoryEventRow[];
}

/** List finished/in-flight task history, newest first, filtered and paginated. */
export function listA2ATaskHistory(f: A2AHistoryFilter): {
  rows: A2ATaskHistoryRow[];
  total: number;
} {
  const db = getDbInstance();
  const { where, params } = buildHistoryWhere(f);

  const total = db
    .prepare(`SELECT COUNT(*) AS count FROM a2a_tasks ${where}`)
    .get(params) as { count: number };

  const rows = db
    .prepare(
      `
      SELECT ${HISTORY_COLUMNS}
      FROM a2a_tasks
      ${where}
      ORDER BY created_at DESC
      LIMIT @limit OFFSET @offset
    `
    )
    .all({ ...params, limit: f.limit, offset: f.offset }) as A2ATaskHistoryRow[];

  return { rows, total: total.count };
}

/**
 * Fetch a single task history row by id, applying the same owner rule as `listA2ATaskHistory`.
 * Returns `null` when the row does not exist or is not visible to `owner`.
 */
export function getA2ATaskHistoryById(id: string, owner?: string): A2ATaskHistoryRow | null {
  const db = getDbInstance();
  const { where, params } = buildHistoryWhere({ owner });
  const clause = where ? `${where} AND id = @id` : "WHERE id = @id";

  const row = db
    .prepare(
      `
      SELECT ${HISTORY_COLUMNS}
      FROM a2a_tasks
      ${clause}
    `
    )
    .get({ ...params, id }) as A2ATaskHistoryRow | undefined;

  return row ?? null;
}

/**
 * Delete task history rows older than `retentionDays`, along with their events. Does NOT rely
 * on the `ON DELETE CASCADE` foreign key declared on `a2a_task_events.task_id` (migration 002):
 * `better-sqlite3` runs with foreign keys enabled, but the other drivers under
 * `src/lib/db/adapters/` never issue `PRAGMA foreign_keys = ON`, and migrations 072/073/126
 * already document that this project does not depend on cascade behavior. On a
 * non-better-sqlite3 driver, a cascade-reliant purge would silently leave that task's
 * `a2a_task_events` rows behind forever — this module's only unbounded-growth path. Both
 * deletes run inside one transaction so a crash between them cannot leave orphaned events.
 * Returns the number of `a2a_tasks` rows deleted.
 */
export function purgeA2AHistory(retentionDays: number): number {
  const db = getDbInstance();
  const purge = db.transaction((days: number) => {
    db.prepare(
      `
      DELETE FROM a2a_task_events
      WHERE task_id IN (
        SELECT id FROM a2a_tasks WHERE created_at < datetime('now', '-' || @days || ' days')
      )
    `
    ).run({ days });

    const result = db
      .prepare(
        `
        DELETE FROM a2a_tasks
        WHERE created_at < datetime('now', '-' || @days || ' days')
      `
      )
      .run({ days });

    return result.changes;
  });

  return purge(retentionDays);
}
