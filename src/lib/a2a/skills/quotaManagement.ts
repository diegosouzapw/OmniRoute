/**
 * Quota Management A2A Skill
 *
 * Per-tenant quota ledger with three operations:
 *
 *   - check   — read-only snapshot of usage against the cap.
 *   - consume — atomic debit; rejected when the requested amount would
 *               exceed the cap (`over_limit`) or when the tenant is
 *               unknown (`unknown_tenant`).
 *   - reset   — UPSERT a tenant's cap and zero its `used` counter;
 *               the previous state is returned alongside the new one.
 *
 * Backed by the `tenant_quotas` table added in migration 100. The
 * (tenant_id, resource) pair is the primary key, so different resources
 * (tokens / requests / cost_usd) are isolated per tenant.
 *
 * Concurrency: the consume path runs a single `UPDATE ... WHERE used + ?
 * <= "limit"` statement. SQLite serialises writes, so two concurrent
 * debits cannot both succeed past the cap — the loser sees
 * `changes() === 0` and is reported as `over_limit`.
 *
 * Inputs (via task.metadata):
 *   - tenantId  (required, string)
 *   - action    (required, "check" | "consume" | "reset")
 *   - resource  (required, "tokens" | "requests" | "cost_usd")
 *   - amount    (consume only, required, number > 0)
 *   - limit     (reset only, required, number > 0)
 *   - resetAt   (optional, ISO8601 string — defaults to now + 30 days)
 *
 * Output (artifacts[0].content is JSON):
 *   check:   { allowed, used, limit, remaining, resetAt, warnings }
 *   consume: { accepted, used, limit, remaining, rejected?: { reason, suggestedWaitSec? } }
 *   reset:   { previous: { used, limit }, reset: { used, limit, resetAt } }
 *   errors:  { error: "missing_metadata" | "invalid_input", message }
 */

import { A2ATask } from "../taskManager";
import { A2ASkillResult } from "../taskExecution";
import { getDbInstance } from "@/lib/db/core";

type QuotaResource = "tokens" | "requests" | "cost_usd";
type QuotaAction = "check" | "consume" | "reset";

const VALID_RESOURCES: ReadonlySet<QuotaResource> = new Set([
  "tokens",
  "requests",
  "cost_usd",
]);
const VALID_ACTIONS: ReadonlySet<QuotaAction> = new Set([
  "check",
  "consume",
  "reset",
]);
const DEFAULT_RESET_WINDOW_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

interface TenantQuotaRow {
  tenant_id: string;
  resource: string;
  used: number;
  limit: number;
  reset_at: string;
  created_at: string;
  updated_at: string;
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function buildDefaultResetAtIso(): string {
  return new Date(Date.now() + DEFAULT_RESET_WINDOW_MS).toISOString();
}

function parseResetAt(value: unknown): { ok: true; iso: string } | { ok: false } {
  if (typeof value !== "string" || value.length === 0) return { ok: false };
  const ms = Date.parse(value);
  if (!Number.isFinite(ms)) return { ok: false };
  return { ok: true, iso: new Date(ms).toISOString() };
}

function secondsUntil(iso: string): number {
  const ms = Date.parse(iso) - Date.now();
  return Math.max(0, Math.ceil(ms / 1000));
}

function errorResult(
  code: "missing_metadata" | "invalid_input",
  message: string,
  success: boolean,
): A2ASkillResult {
  return {
    artifacts: [{ type: "text", content: JSON.stringify({ error: code, message }) }],
    metadata: { success, error: code },
  };
}

function readRow(tenantId: string, resource: QuotaResource): TenantQuotaRow | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT tenant_id, resource, used, "limit", reset_at, created_at, updated_at
         FROM tenant_quotas
        WHERE tenant_id = ? AND resource = ?`,
    )
    .get(tenantId, resource) as TenantQuotaRow | undefined;
  return row ?? null;
}

function handleCheck(
  tenantId: string,
  resource: QuotaResource,
): A2ASkillResult {
  const row = readRow(tenantId, resource);
  if (!row) {
    return {
      artifacts: [
        {
          type: "text",
          content: JSON.stringify({
            allowed: false,
            used: 0,
            limit: 0,
            remaining: 0,
            resetAt: buildDefaultResetAtIso(),
            warnings: ["unknown_tenant"],
          }),
        },
      ],
      metadata: { success: true, action: "check", tenantId, resource, known: false },
    };
  }
  const used = row.used;
  const limit = row.limit;
  const remaining = Math.max(0, limit - used);
  const allowed = used < limit;
  const warnings: string[] = [];
  if (used >= limit) warnings.push("at_cap");
  if (limit > 0 && used / limit >= 0.8) warnings.push("approaching_cap");

  return {
    artifacts: [
      {
        type: "text",
        content: JSON.stringify({
          allowed,
          used,
          limit,
          remaining,
          resetAt: row.reset_at,
          warnings,
        }),
      },
    ],
    metadata: { success: true, action: "check", tenantId, resource, known: true },
  };
}

function handleConsume(
  tenantId: string,
  resource: QuotaResource,
  amount: number,
): A2ASkillResult {
  const db = getDbInstance();
  const now = new Date().toISOString();

  // Atomic compare-and-swap: the WHERE clause guarantees the cap is
  // honoured even under concurrent debits. SQLite serialises writes,
  // so if two transactions both see `used + amount <= limit`, only the
  // first UPDATE will affect a row; the second will see `changes() === 0`
  // and surface as `over_limit`.
  const stmt = db.prepare(
    `UPDATE tenant_quotas
        SET used = used + ?,
            updated_at = ?
      WHERE tenant_id = ?
        AND resource = ?
        AND used + ? <= "limit"`,
  );
  const changes = stmt.run(amount, now, tenantId, resource, amount).changes;

  const row = readRow(tenantId, resource);
  if (!row) {
    return {
      artifacts: [
        {
          type: "text",
          content: JSON.stringify({
            accepted: false,
            used: 0,
            limit: 0,
            remaining: 0,
            rejected: { reason: "unknown_tenant" },
          }),
        },
      ],
      metadata: {
        success: true,
        action: "consume",
        tenantId,
        resource,
        amount,
        accepted: false,
        reason: "unknown_tenant",
      },
    };
  }

  if (changes === 0) {
    return {
      artifacts: [
        {
          type: "text",
          content: JSON.stringify({
            accepted: false,
            used: row.used,
            limit: row.limit,
            remaining: Math.max(0, row.limit - row.used),
            rejected: {
              reason: "over_limit",
              suggestedWaitSec: secondsUntil(row.reset_at),
            },
          }),
        },
      ],
      metadata: {
        success: true,
        action: "consume",
        tenantId,
        resource,
        amount,
        accepted: false,
        reason: "over_limit",
      },
    };
  }

  return {
    artifacts: [
      {
        type: "text",
        content: JSON.stringify({
          accepted: true,
          used: row.used,
          limit: row.limit,
          remaining: Math.max(0, row.limit - row.used),
        }),
      },
    ],
    metadata: {
      success: true,
      action: "consume",
      tenantId,
      resource,
      amount,
      accepted: true,
    },
  };
}

function handleReset(
  tenantId: string,
  resource: QuotaResource,
  limit: number,
  resetAt: string,
): A2ASkillResult {
  const db = getDbInstance();
  const previousRow = readRow(tenantId, resource);
  const previous = previousRow
    ? { used: previousRow.used, limit: previousRow.limit }
    : { used: 0, limit: 0 };

  // Single-statement UPSERT: insert if missing, otherwise zero `used`
  // and apply the new cap + reset_at. Uses `ON CONFLICT ... DO UPDATE`
  // so the row is created on first reset and updated thereafter.
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO tenant_quotas
        (tenant_id, resource, used, "limit", reset_at, created_at, updated_at)
     VALUES (?, ?, 0, ?, ?, ?, ?)
     ON CONFLICT(tenant_id, resource) DO UPDATE SET
        used = 0,
        "limit" = excluded."limit",
        reset_at = excluded.reset_at,
        updated_at = excluded.updated_at`,
  ).run(tenantId, resource, limit, resetAt, now, now);

  return {
    artifacts: [
      {
        type: "text",
        content: JSON.stringify({
          previous,
          reset: { used: 0, limit, resetAt },
        }),
      },
    ],
    metadata: {
      success: true,
      action: "reset",
      tenantId,
      resource,
      limit,
      resetAt,
    },
  };
}

export async function executeQuotaManagement(task: A2ATask): Promise<A2ASkillResult> {
  const metadata = task.metadata ?? {};

  if (!isString(metadata.tenantId)) {
    return errorResult(
      "missing_metadata",
      "quota-management requires task.metadata.tenantId (string)",
      false,
    );
  }
  if (!isString(metadata.action) || !VALID_ACTIONS.has(metadata.action as QuotaAction)) {
    return errorResult(
      "invalid_input",
      `quota-management requires task.metadata.action to be one of: ${Array.from(VALID_ACTIONS).join(", ")}`,
      false,
    );
  }
  if (
    !isString(metadata.resource) ||
    !VALID_RESOURCES.has(metadata.resource as QuotaResource)
  ) {
    return errorResult(
      "invalid_input",
      `quota-management requires task.metadata.resource to be one of: ${Array.from(VALID_RESOURCES).join(", ")}`,
      false,
    );
  }

  const tenantId = metadata.tenantId as string;
  const action = metadata.action as QuotaAction;
  const resource = metadata.resource as QuotaResource;

  if (action === "check") {
    return handleCheck(tenantId, resource);
  }

  if (action === "consume") {
    if (!isPositiveNumber(metadata.amount)) {
      return errorResult(
        "invalid_input",
        "quota-management consume requires task.metadata.amount (number > 0)",
        false,
      );
    }
    return handleConsume(tenantId, resource, metadata.amount);
  }

  // action === "reset"
  // `limit` is optional: when the row already exists we keep the
  // existing cap and only zero `used` + bump `reset_at`. The first
  // reset for a (tenant, resource) pair must supply a `limit`.
  const existingRow = readRow(tenantId, resource);
  if (metadata.limit === undefined) {
    if (!existingRow) {
      return errorResult(
        "invalid_input",
        "quota-management reset requires task.metadata.limit (number > 0) for a new tenant",
        false,
      );
    }
  } else if (!isPositiveNumber(metadata.limit)) {
    return errorResult(
      "invalid_input",
      "quota-management reset requires task.metadata.limit (number > 0) when supplied",
      false,
    );
  }
  const newLimit = isPositiveNumber(metadata.limit)
    ? metadata.limit
    : (existingRow?.limit ?? 0);
  let resetAt: string;
  if (metadata.resetAt === undefined) {
    resetAt = buildDefaultResetAtIso();
  } else {
    const parsed = parseResetAt(metadata.resetAt);
    if (!parsed.ok) {
      return errorResult(
        "invalid_input",
        "quota-management reset: task.metadata.resetAt must be a valid ISO8601 string",
        false,
      );
    }
    resetAt = parsed.iso;
  }
  return handleReset(tenantId, resource, newLimit, resetAt);
}

// Export helpers for the test suite; not part of the A2A contract.
export const __testing = { VALID_RESOURCES, VALID_ACTIONS };
