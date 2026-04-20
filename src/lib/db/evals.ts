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
