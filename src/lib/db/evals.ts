import { getDbInstance, rowToCamel } from "./core";

export interface EvalSuite {
  id: string;
  name: string;
  description: string;
  createdAt: number;
}

export function saveEvalResult(
  suiteId: string,
  targetId: string,
  targetType: "combo" | "model",
  passRate: number,
  avgLatency: number,
  rawResults: any
) {
  const db = getDbInstance();
  const id = `run_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const stmt = db.prepare(`
    INSERT INTO eval_results (id, suite_id, target_id, target_type, run_date, pass_rate, avg_latency, raw_results)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    suiteId,
    targetId,
    targetType,
    Date.now(),
    passRate,
    avgLatency,
    JSON.stringify(rawResults)
  );
  return id;
}

export function getEvalHistory(suiteId: string) {
  const db = getDbInstance();
  const stmt = db.prepare(`
    SELECT * FROM eval_results WHERE suite_id = ? ORDER BY run_date DESC LIMIT 50
  `);
  return stmt.all(suiteId).map(rowToCamel);
}

export function getEvalRunsByIds(ids: string[]) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  const db = getDbInstance();
  const placeholders = ids.map(() => "?").join(", ");
  const stmt = db.prepare(`SELECT * FROM eval_results WHERE id IN (${placeholders})`);
  const rows = stmt.all(...ids).map(rowToCamel) as Record<string, any>[];
  const rowById = new Map(rows.map((row) => [String(row.id), row]));

  return ids.map((id) => rowById.get(id)).filter(Boolean);
}
