import { getDbInstance } from "./core";

export interface WebhookDelivery {
  id: number;
  webhook_id: string;
  event_type: string;
  status: string;
  http_status: number | null;
  latency_ms: number | null;
  error: string | null;
  payload_snapshot: string | null;
  created_at: string;
}

const MAX_DELIVERIES_PER_WEBHOOK = 100;

export function insertDelivery(opts: {
  webhookId: string;
  eventType: string;
  status: string;
  httpStatus?: number | null;
  latencyMs?: number | null;
  error?: string | null;
  payloadSnapshot?: string | null;
}): void {
  const db = getDbInstance();
  const insertStmt = db.prepare(
    `INSERT INTO webhook_deliveries
       (webhook_id, event_type, status, http_status, latency_ms, error, payload_snapshot)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const rotateStmt = db.prepare(
    `DELETE FROM webhook_deliveries
     WHERE webhook_id = ?
       AND id NOT IN (
         SELECT id FROM webhook_deliveries
         WHERE webhook_id = ?
         ORDER BY created_at DESC, id DESC
         LIMIT ?
       )`
  );
  db.transaction(() => {
    insertStmt.run(
      opts.webhookId,
      opts.eventType,
      opts.status,
      opts.httpStatus ?? null,
      opts.latencyMs ?? null,
      opts.error ?? null,
      opts.payloadSnapshot ?? null
    );
    rotateStmt.run(opts.webhookId, opts.webhookId, MAX_DELIVERIES_PER_WEBHOOK);
  })();
}

export function getDeliveries(webhookId: string, limit: number): WebhookDelivery[] {
  const db = getDbInstance();
  return db
    .prepare(
      `SELECT * FROM webhook_deliveries
       WHERE webhook_id = ?
       ORDER BY created_at DESC, id DESC
       LIMIT ?`
    )
    .all(webhookId, limit) as WebhookDelivery[];
}
