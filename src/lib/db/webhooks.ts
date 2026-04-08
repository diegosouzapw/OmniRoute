/**
 * Database module: Webhooks
 * CRUD operations for webhook event subscriptions
 */

import { getDbInstance } from "./core";
import crypto from "crypto";

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string | null;
  enabled: boolean;
  description: string;
  created_at: string;
  last_triggered_at: string | null;
  last_status: number | null;
  failure_count: number;
}

interface WebhookRow {
  id: string;
  url: string;
  events: string;
  secret: string | null;
  enabled: number;
  description: string;
  created_at: string;
  last_triggered_at: string | null;
  last_status: number | null;
  failure_count: number;
}

function rowToWebhook(row: WebhookRow): Webhook {
  return {
    ...row,
    events: JSON.parse(row.events || '["*"]'),
    enabled: row.enabled === 1,
  };
}

const WEBHOOKS_COLUMNS = [
  "id",
  "url",
  "events",
  "secret",
  "enabled",
  "description",
  "created_at",
  "last_triggered_at",
  "last_status",
  "failure_count",
].join(", ");

export function getWebhooks(): Webhook[] {
  const db = getDbInstance();
  const rows = db
    .prepare(`SELECT ${WEBHOOKS_COLUMNS} FROM webhooks ORDER BY created_at DESC`)
    .all() as WebhookRow[];
  return rows.map(rowToWebhook);
}

export function getWebhook(id: string): Webhook | null {
  const db = getDbInstance();
  const row = db.prepare(`SELECT ${WEBHOOKS_COLUMNS} FROM webhooks WHERE id = ?`).get(id) as
    | WebhookRow
    | undefined;
  return row ? rowToWebhook(row) : null;
}

export function getEnabledWebhooks(): Webhook[] {
  const db = getDbInstance();
  const rows = db
    .prepare(`SELECT ${WEBHOOKS_COLUMNS} FROM webhooks WHERE enabled = 1`)
    .all() as WebhookRow[];
  return rows.map(rowToWebhook);
}

export function createWebhook(data: {
  url: string;
  events?: string[];
  secret?: string;
  description?: string;
}): Webhook {
  const db = getDbInstance();
  const id = crypto.randomUUID();
  const secret = data.secret || `whsec_${crypto.randomBytes(24).toString("hex")}`;

  db.prepare(
    `INSERT INTO webhooks (id, url, events, secret, description)
       VALUES (?, ?, ?, ?, ?)`
  ).run(id, data.url, JSON.stringify(data.events || ["*"]), secret, data.description || "");

  return getWebhook(id)!;
}

export function updateWebhook(
  id: string,
  data: Partial<{
    url: string;
    events: string[];
    secret: string;
    enabled: boolean;
    description: string;
  }>
): Webhook | null {
  const db = getDbInstance();
  const existing = getWebhook(id);
  if (!existing) return null;

  const fields: string[] = [];
  const values: any[] = [];

  if (data.url !== undefined) {
    fields.push("url = ?");
    values.push(data.url);
  }
  if (data.events !== undefined) {
    fields.push("events = ?");
    values.push(JSON.stringify(data.events));
  }
  if (data.secret !== undefined) {
    fields.push("secret = ?");
    values.push(data.secret);
  }
  if (data.enabled !== undefined) {
    fields.push("enabled = ?");
    values.push(data.enabled ? 1 : 0);
  }
  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }

  if (fields.length === 0) return existing;

  values.push(id);
  db.prepare(`UPDATE webhooks SET ${fields.join(", ")} WHERE id = ?`).run(...values);

  return getWebhook(id);
}

export function deleteWebhook(id: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM webhooks WHERE id = ?").run(id);
  return (result as any).changes > 0;
}

export function recordWebhookDelivery(id: string, status: number, success: boolean): void {
  const db = getDbInstance();
  if (success) {
    db.prepare(
      `UPDATE webhooks SET last_triggered_at = datetime('now'), last_status = ?, failure_count = 0 WHERE id = ?`
    ).run(status, id);
  } else {
    db.prepare(
      `UPDATE webhooks SET last_triggered_at = datetime('now'), last_status = ?, failure_count = failure_count + 1 WHERE id = ?`
    ).run(status, id);
  }
}

export function disableWebhooksWithHighFailures(threshold = 10): number {
  const db = getDbInstance();
  const result = db
    .prepare(`UPDATE webhooks SET enabled = 0 WHERE failure_count >= ? AND enabled = 1`)
    .run(threshold);
  return (result as any).changes;
}
