import { getDbInstance } from "@/lib/db/core.ts";

export interface CloudAgentTaskRow {
  id: string;
  provider_id: string;
  external_id: string | null;
  status: string;
  prompt: string;
  source: string;
  options: string;
  result: string | null;
  activities: string;
  error: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export function createCloudAgentTaskTable(): void {
  const db = getDbInstance();

  db.exec(`
    CREATE TABLE IF NOT EXISTS cloud_agent_tasks (
      id TEXT PRIMARY KEY,
      provider_id TEXT NOT NULL,
      external_id TEXT,
      status TEXT NOT NULL DEFAULT 'queued',
      prompt TEXT NOT NULL,
      source TEXT NOT NULL,
      options TEXT DEFAULT '{}',
      result TEXT,
      activities TEXT DEFAULT '[]',
      error TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      completed_at TEXT
    )
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_provider
    ON cloud_agent_tasks(provider_id)
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_status
    ON cloud_agent_tasks(status)
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_created
    ON cloud_agent_tasks(created_at DESC)
  `);
}

export function insertCloudAgentTask(task: CloudAgentTaskRow): void {
  const db = getDbInstance();
  db.prepare(
    `
    INSERT INTO cloud_agent_tasks (
      id, provider_id, external_id, status, prompt, source,
      options, result, activities, error, created_at, updated_at, completed_at
    ) VALUES (
      @id, @provider_id, @external_id, @status, @prompt, @source,
      @options, @result, @activities, @error, @created_at, @updated_at, @completed_at
    )
  `
  ).run(task);
}

// Whitelist of allowed columns for update operations
const ALLOWED_UPDATE_COLUMNS = new Set([
  "status",
  "prompt",
  "source",
  "options",
  "result",
  "activities",
  "error",
  "completed_at",
]);

export function updateCloudAgentTask(
  id: string,
  updates: Partial<Omit<CloudAgentTaskRow, "id">>
): void {
  const db = getDbInstance();

  // Validate keys against whitelist to prevent SQL injection
  const validUpdates: Partial<Omit<CloudAgentTaskRow, "id">> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (ALLOWED_UPDATE_COLUMNS.has(key)) {
      (validUpdates as Record<string, unknown>)[key] = value;
    }
  }

  const fields = Object.keys(validUpdates)
    .map((key) => `${key} = @${key}`)
    .join(", ");

  if (!fields) return; // No valid updates

  db.prepare(
    `
    UPDATE cloud_agent_tasks
    SET ${fields}, updated_at = datetime('now')
    WHERE id = @id
  `
  ).run({ id, ...validUpdates });
}

export function getCloudAgentTaskById(id: string): CloudAgentTaskRow | null {
  const db = getDbInstance();
  return db
    .prepare("SELECT * FROM cloud_agent_tasks WHERE id = ?")
    .get(id) as CloudAgentTaskRow | null;
}

export function getCloudAgentTasksByProvider(providerId: string, limit = 50): CloudAgentTaskRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      "SELECT * FROM cloud_agent_tasks WHERE provider_id = ? ORDER BY created_at DESC LIMIT ?"
    )
    .all(providerId, limit) as CloudAgentTaskRow[];
}

export function getCloudAgentTasksByStatus(status: string, limit = 50): CloudAgentTaskRow[] {
  const db = getDbInstance();
  return db
    .prepare("SELECT * FROM cloud_agent_tasks WHERE status = ? ORDER BY created_at DESC LIMIT ?")
    .all(status, limit) as CloudAgentTaskRow[];
}

export function getAllCloudAgentTasks(limit = 100): CloudAgentTaskRow[] {
  const db = getDbInstance();
  return db
    .prepare("SELECT * FROM cloud_agent_tasks ORDER BY created_at DESC LIMIT ?")
    .all(limit) as CloudAgentTaskRow[];
}

export function deleteCloudAgentTask(id: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM cloud_agent_tasks WHERE id = ?").run(id);
}
