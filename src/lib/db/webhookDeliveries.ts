import { getDbInstance } from "./core";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

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

/** Safe projection for the deliveries list API — excludes `payload_snapshot`
 *  by default so audit-list responses never leak the captured request body. */
export type WebhookDeliverySafe = Omit<WebhookDelivery, "payload_snapshot">;

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
  // Sanitize the error before persistence so raw stack traces, hostnames or
  // upstream-internal messages never enter the audit log. The audit log is
  // read back via the deliveries API and rendered in the dashboard.
  const sanitizedError = opts.error != null ? sanitizeErrorMessage(opts.error) || null : null;
  db.transaction(() => {
    insertStmt.run(
      opts.webhookId,
      opts.eventType,
      opts.status,
      opts.httpStatus ?? null,
      opts.latencyMs ?? null,
      sanitizedError,
      opts.payloadSnapshot ?? null
    );
    rotateStmt.run(opts.webhookId, opts.webhookId, MAX_DELIVERIES_PER_WEBHOOK);
  })();
}

/** List recent deliveries excluding `payload_snapshot` (default — used by UI). */
export function getDeliveries(webhookId: string, limit: number): WebhookDeliverySafe[] {
  const db = getDbInstance();
  return db
    .prepare(
      `SELECT id, webhook_id, event_type, status, http_status, latency_ms, error, created_at
       FROM webhook_deliveries
       WHERE webhook_id = ?
       ORDER BY created_at DESC, id DESC
       LIMIT ?`
    )
    .all(webhookId, limit) as WebhookDeliverySafe[];
}

/** Fetch one delivery including `payload_snapshot` — used for opt-in detail view. */
export function getDeliveryDetail(webhookId: string, deliveryId: number): WebhookDelivery | null {
  const db = getDbInstance();
  const row = db
    .prepare(`SELECT * FROM webhook_deliveries WHERE webhook_id = ? AND id = ? LIMIT 1`)
    .get(webhookId, deliveryId);
  return (row as WebhookDelivery | undefined) ?? null;
}
