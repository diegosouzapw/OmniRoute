import { randomUUID } from "crypto";
import { getDbInstance, rowToCamel } from "./core";
import { backupDbFile } from "./backup";
import { clearApiKeyCaches } from "./apiKeys";

type JsonRecord = Record<string, unknown>;

export type SaasCustomerStatus = "active" | "inactive" | "blocked";
export type SaasBillingStatus = "active" | "past_due" | "canceled";

export interface SaasPlan {
  id: string;
  name: string;
  slug: string;
  monthlyTokenLimit: number;
  priceMonthlyCents: number;
  isActive: boolean;
  allowAllModels: boolean;
  allowAllCombos: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SaasCustomer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: SaasCustomerStatus;
  planId: string | null;
  planName?: string | null;
  monthlyTokenLimit?: number | null;
  priceMonthlyCents?: number | null;
  extraTokenCredits: number;
  billingStatus: SaasBillingStatus;
  paidUntil: string | null;
  billingCycleAnchor: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  apiKeys?: SaasCustomerApiKey[];
  allowedModels?: string[];
  allowedCombos?: string[];
  usage?: SaasUsageSummary;
}

export interface SaasCustomerApiKey {
  id: string;
  customerId: string;
  apiKeyId: string;
  label: string;
  isActive: boolean;
  key?: string | null;
  keyName?: string | null;
  keyPreview?: string | null;
  usedTokens?: number;
  requestCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SaasUsageSummary {
  usedTokens: number;
  limitTokens: number;
  remainingTokens: number;
  percentUsed: number;
  requestCount: number;
  cycleStart: string;
  cycleEnd: string;
  blocked: boolean;
  blockReason: string | null;
}

export interface SaasPolicyContext {
  customer: SaasCustomer;
  plan: SaasPlan | null;
  apiKey: SaasCustomerApiKey;
  allowedModels: string[];
  allowedCombos: string[];
  usage: SaasUsageSummary;
}

let schemaReady = false;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function toBool(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function getColumnNames(db: ReturnType<typeof getDbInstance>, table: string): Set<string> {
  return new Set(
    db
      .prepare(`PRAGMA table_info(${table})`)
      .all()
      .map((row) => toString(toRecord(row).name))
      .filter(Boolean)
  );
}

function ensureColumn(
  db: ReturnType<typeof getDbInstance>,
  table: string,
  column: string,
  definition: string
): void {
  const columns = getColumnNames(db, table);
  if (!columns.has(column)) {
    db.prepare(`ALTER TABLE ${table} ADD COLUMN ${definition}`).run();
  }
}

function normalizeStatus(value: unknown): SaasCustomerStatus {
  return value === "inactive" || value === "blocked" || value === "active" ? value : "active";
}

function normalizeBillingStatus(value: unknown): SaasBillingStatus {
  return value === "past_due" || value === "canceled" || value === "active" ? value : "active";
}

function isPastDue(customer: Pick<SaasCustomer, "billingStatus" | "paidUntil">): boolean {
  if (customer.billingStatus !== "active") return true;
  if (!customer.paidUntil) return false;
  const paidUntil = new Date(customer.paidUntil);
  return Number.isFinite(paidUntil.getTime()) && paidUntil.getTime() < Date.now();
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getUniquePlanSlug(
  db: ReturnType<typeof getDbInstance>,
  preferredSlug: string,
  currentPlanId?: string
): string {
  const baseSlug = slugify(preferredSlug) || "plano";
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const row = toRecord(db.prepare("SELECT id FROM saas_plans WHERE slug = ?").get(candidate));
    const existingId = toString(row.id);
    if (!existingId || existingId === currentPlanId) return candidate;
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

function addMonths(date: Date, months: number): Date {
  const next = new Date(date);
  next.setUTCMonth(next.getUTCMonth() + months);
  return next;
}

function getCycle(anchorIso: string): { start: string; end: string } {
  const anchor = Number.isNaN(new Date(anchorIso).getTime()) ? new Date() : new Date(anchorIso);
  const now = new Date();
  let start = new Date(anchor);
  let end = addMonths(start, 1);

  while (end <= now) {
    start = end;
    end = addMonths(start, 1);
  }

  while (start > now) {
    end = start;
    start = addMonths(end, -1);
  }

  return { start: start.toISOString(), end: end.toISOString() };
}

function mapPlan(row: unknown): SaasPlan {
  const r = toRecord(rowToCamel(row as JsonRecord));
  return {
    id: toString(r.id),
    name: toString(r.name),
    slug: toString(r.slug || r.code),
    monthlyTokenLimit: Math.max(
      0,
      Math.round(toNumber(r.monthlyTokenLimit ?? r.tokenLimitMonthly))
    ),
    priceMonthlyCents: Math.max(0, Math.round(toNumber(r.priceMonthlyCents))),
    isActive:
      r.isActive === undefined ? toString(r.status, "active") === "active" : toBool(r.isActive),
    allowAllModels: r.allowAllModels === undefined ? true : toBool(r.allowAllModels),
    allowAllCombos: r.allowAllCombos === undefined ? true : toBool(r.allowAllCombos),
    createdAt: toString(r.createdAt),
    updatedAt: toString(r.updatedAt),
  };
}

function mapCustomer(row: unknown): SaasCustomer {
  const r = toRecord(rowToCamel(row as JsonRecord));
  return {
    id: toString(r.id),
    name: toString(r.name),
    email: toString(r.email),
    company: toString(r.company),
    status: normalizeStatus(r.status),
    planId: typeof r.planId === "string" ? r.planId : null,
    planName: typeof r.planName === "string" ? r.planName : null,
    monthlyTokenLimit:
      r.monthlyTokenLimit === null || r.monthlyTokenLimit === undefined
        ? null
        : Math.max(0, Math.round(toNumber(r.monthlyTokenLimit))),
    priceMonthlyCents:
      r.priceMonthlyCents === null || r.priceMonthlyCents === undefined
        ? null
        : Math.max(0, Math.round(toNumber(r.priceMonthlyCents))),
    extraTokenCredits: Math.max(0, Math.round(toNumber(r.extraTokenCredits))),
    billingStatus: normalizeBillingStatus(r.billingStatus),
    paidUntil: typeof r.paidUntil === "string" && r.paidUntil ? r.paidUntil : null,
    billingCycleAnchor: toString(r.billingCycleAnchor),
    notes: toString(r.notes),
    createdAt: toString(r.createdAt),
    updatedAt: toString(r.updatedAt),
  };
}

function mapCustomerApiKey(row: unknown): SaasCustomerApiKey {
  const r = toRecord(rowToCamel(row as JsonRecord));
  const keyValue = toString(r.key);
  return {
    id: toString(r.id),
    customerId: toString(r.customerId),
    apiKeyId: toString(r.apiKeyId),
    label: toString(r.label),
    isActive: toBool(r.isActive),
    key: keyValue || null,
    keyName: typeof r.keyName === "string" ? r.keyName : null,
    keyPreview: keyValue ? `${keyValue.slice(0, 10)}...${keyValue.slice(-8)}` : null,
    usedTokens: Math.max(0, Math.round(toNumber(r.usedTokens))),
    requestCount: Math.max(0, Math.round(toNumber(r.requestCount))),
    createdAt: toString(r.createdAt),
    updatedAt: toString(r.updatedAt),
  };
}

export function ensureSaasSchema(): void {
  if (schemaReady) return;
  const db = getDbInstance();
  db.exec(`
    CREATE TABLE IF NOT EXISTS saas_plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      monthly_token_limit INTEGER NOT NULL DEFAULT 0,
      price_monthly_cents INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      allow_all_models INTEGER NOT NULL DEFAULT 1,
      allow_all_combos INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS saas_customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'active',
      billing_status TEXT NOT NULL DEFAULT 'active',
      paid_until TEXT,
      extra_token_credits INTEGER NOT NULL DEFAULT 0,
      plan_id TEXT,
      billing_cycle_anchor TEXT NOT NULL,
      notes TEXT DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_saas_customers_email ON saas_customers(email);
    CREATE INDEX IF NOT EXISTS idx_saas_customers_status ON saas_customers(status);

    CREATE TABLE IF NOT EXISTS saas_customer_api_keys (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      api_key_id TEXT NOT NULL UNIQUE,
      label TEXT DEFAULT '',
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_saas_keys_customer ON saas_customer_api_keys(customer_id);

    CREATE TABLE IF NOT EXISTS saas_customer_model_permissions (
      customer_id TEXT NOT NULL,
      model_id TEXT NOT NULL,
      PRIMARY KEY (customer_id, model_id)
    );

    CREATE TABLE IF NOT EXISTS saas_customer_combo_permissions (
      customer_id TEXT NOT NULL,
      combo_name TEXT NOT NULL,
      PRIMARY KEY (customer_id, combo_name)
    );
  `);

  migrateExistingSaasSchema(db);

  seedDefaultPlans();
  schemaReady = true;
}

function migrateExistingSaasSchema(db: ReturnType<typeof getDbInstance>): void {
  const originalPlanColumns = getColumnNames(db, "saas_plans");
  ensureColumn(db, "saas_plans", "slug", "slug TEXT");
  ensureColumn(
    db,
    "saas_plans",
    "monthly_token_limit",
    "monthly_token_limit INTEGER NOT NULL DEFAULT 0"
  );
  ensureColumn(
    db,
    "saas_plans",
    "price_monthly_cents",
    "price_monthly_cents INTEGER NOT NULL DEFAULT 0"
  );
  ensureColumn(db, "saas_plans", "is_active", "is_active INTEGER NOT NULL DEFAULT 1");
  ensureColumn(db, "saas_plans", "allow_all_models", "allow_all_models INTEGER NOT NULL DEFAULT 1");
  ensureColumn(db, "saas_plans", "allow_all_combos", "allow_all_combos INTEGER NOT NULL DEFAULT 1");
  ensureColumn(
    db,
    "saas_customers",
    "billing_status",
    "billing_status TEXT NOT NULL DEFAULT 'active'"
  );
  ensureColumn(db, "saas_customers", "paid_until", "paid_until TEXT");
  ensureColumn(
    db,
    "saas_customers",
    "extra_token_credits",
    "extra_token_credits INTEGER NOT NULL DEFAULT 0"
  );

  const slugFallback = originalPlanColumns.has("code")
    ? "COALESCE(NULLIF(slug, ''), NULLIF(code, ''), lower(replace(name, ' ', '-')))"
    : "COALESCE(NULLIF(slug, ''), lower(replace(name, ' ', '-')))";
  db.prepare(`UPDATE saas_plans SET slug = ${slugFallback} WHERE slug IS NULL OR slug = ''`).run();

  if (originalPlanColumns.has("token_limit_monthly")) {
    db.prepare(
      `UPDATE saas_plans
       SET monthly_token_limit = COALESCE(NULLIF(monthly_token_limit, 0), token_limit_monthly, 0)
       WHERE monthly_token_limit IS NULL OR monthly_token_limit = 0`
    ).run();
  }

  if (originalPlanColumns.has("price_monthly_cents")) {
    db.prepare(
      `UPDATE saas_plans
       SET price_monthly_cents = COALESCE(price_monthly_cents, 0)
       WHERE price_monthly_cents IS NULL`
    ).run();
  }

  if (originalPlanColumns.has("status")) {
    db.prepare(
      `UPDATE saas_plans
       SET is_active = CASE WHEN COALESCE(status, 'active') = 'active' THEN 1 ELSE 0 END
       WHERE is_active IS NULL`
    ).run();
  }
  db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_saas_plans_slug ON saas_plans(slug)").run();
}

function seedDefaultPlans(): void {
  const db = getDbInstance();
  const count = (db.prepare("SELECT COUNT(*) as count FROM saas_plans").get() as { count: number })
    .count;
  if (count > 0) return;

  const now = new Date().toISOString();
  const insert = db.prepare(`
    INSERT INTO saas_plans (
      id, name, slug, monthly_token_limit, is_active, allow_all_models, allow_all_combos, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insert.run(randomUUID(), "Starter", "starter", 1_000_000, 1, 0, 0, now, now);
  insert.run(randomUUID(), "Pro", "pro", 10_000_000, 1, 1, 1, now, now);
  insert.run(randomUUID(), "Empresarial", "empresarial", 100_000_000, 1, 1, 1, now, now);
}

export function listSaasPlans(): SaasPlan[] {
  ensureSaasSchema();
  const db = getDbInstance();
  return db
    .prepare("SELECT * FROM saas_plans ORDER BY monthly_token_limit ASC, name ASC")
    .all()
    .map(mapPlan);
}

export function upsertSaasPlan(input: {
  id?: string;
  name: string;
  slug?: string;
  monthlyTokenLimit: number;
  priceMonthlyCents?: number;
  isActive?: boolean;
  allowAllModels?: boolean;
  allowAllCombos?: boolean;
}): SaasPlan {
  ensureSaasSchema();
  const db = getDbInstance();
  const now = new Date().toISOString();
  const id = input.id || randomUUID();
  const slug = getUniquePlanSlug(db, input.slug || input.name, input.id);
  const existing = input.id
    ? (db.prepare("SELECT * FROM saas_plans WHERE id = ?").get(input.id) as JsonRecord | undefined)
    : null;
  const planColumns = getColumnNames(db, "saas_plans");
  const monthlyTokenLimit = Math.max(0, Math.round(input.monthlyTokenLimit));
  const priceMonthlyCents = Math.max(0, Math.round(input.priceMonthlyCents || 0));
  const isActive = input.isActive === false ? 0 : 1;
  const allowAllModels = input.allowAllModels === false ? 0 : 1;
  const allowAllCombos = input.allowAllCombos === false ? 0 : 1;

  if (existing) {
    const updates = [
      "name = @name",
      "slug = @slug",
      "monthly_token_limit = @monthlyTokenLimit",
      "price_monthly_cents = @priceMonthlyCents",
      "is_active = @isActive",
      "allow_all_models = @allowAllModels",
      "allow_all_combos = @allowAllCombos",
      "updated_at = @updatedAt",
    ];
    if (planColumns.has("code")) updates.push("code = @slug");
    if (planColumns.has("token_limit_monthly"))
      updates.push("token_limit_monthly = @monthlyTokenLimit");
    if (planColumns.has("status")) updates.push("status = @status");
    db.prepare(`UPDATE saas_plans SET ${updates.join(", ")} WHERE id = @id`).run({
      id,
      name: input.name,
      slug,
      monthlyTokenLimit,
      priceMonthlyCents,
      isActive,
      allowAllModels,
      allowAllCombos,
      status: isActive ? "active" : "inactive",
      updatedAt: now,
    });
  } else {
    const values: Record<string, unknown> = {
      id,
      name: input.name,
      slug,
      monthlyTokenLimit,
      priceMonthlyCents,
      isActive,
      allowAllModels,
      allowAllCombos,
      createdAt: now,
      updatedAt: now,
      code: slug,
      requestLimitMonthly: null,
      tokenLimitMonthly: monthlyTokenLimit,
      maxApiKeys: 1,
      rpmLimit: null,
      status: isActive ? "active" : "inactive",
      metadata: "{}",
    };
    const insertColumns = [
      ["id", "id"],
      ["name", "name"],
      ["slug", "slug"],
      ["monthly_token_limit", "monthlyTokenLimit"],
      ["is_active", "isActive"],
      ["allow_all_models", "allowAllModels"],
      ["allow_all_combos", "allowAllCombos"],
      ["created_at", "createdAt"],
      ["updated_at", "updatedAt"],
      ["code", "code"],
      ["price_monthly_cents", "priceMonthlyCents"],
      ["request_limit_monthly", "requestLimitMonthly"],
      ["token_limit_monthly", "tokenLimitMonthly"],
      ["max_api_keys", "maxApiKeys"],
      ["rpm_limit", "rpmLimit"],
      ["status", "status"],
      ["metadata", "metadata"],
    ].filter(([column]) => planColumns.has(column));
    db.prepare(
      `INSERT INTO saas_plans (${insertColumns.map(([column]) => column).join(", ")})
       VALUES (${insertColumns.map(([, param]) => `@${param}`).join(", ")})`
    ).run(values);
  }

  backupDbFile("pre-write");
  return mapPlan(db.prepare("SELECT * FROM saas_plans WHERE id = ?").get(id));
}

export function deleteSaasPlan(id: string): boolean {
  ensureSaasSchema();
  const db = getDbInstance();
  const used = toNumber(
    toRecord(db.prepare("SELECT COUNT(*) as count FROM saas_customers WHERE plan_id = ?").get(id))
      .count
  );
  if (used > 0) {
    throw new Error("Plano vinculado a clientes. Troque o plano dos clientes antes de excluir.");
  }
  const result = db.prepare("DELETE FROM saas_plans WHERE id = ?").run(id);
  if (result.changes > 0) {
    backupDbFile("pre-write");
    return true;
  }
  return false;
}

export function createSaasCustomer(input: {
  name: string;
  email: string;
  company?: string;
  status?: SaasCustomerStatus;
  planId?: string | null;
  billingStatus?: SaasBillingStatus;
  paidUntil?: string | null;
  extraTokenCredits?: number;
  notes?: string;
  allowedModels?: string[];
  allowedCombos?: string[];
}): SaasCustomer {
  ensureSaasSchema();
  const db = getDbInstance();
  const now = new Date().toISOString();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO saas_customers (
      id, name, email, company, status, billing_status, paid_until, extra_token_credits,
      plan_id, billing_cycle_anchor, notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.name,
    input.email,
    input.company || "",
    input.status || "active",
    input.billingStatus || "active",
    input.paidUntil || null,
    Math.max(0, Math.round(input.extraTokenCredits || 0)),
    input.planId || null,
    now,
    input.notes || "",
    now,
    now
  );
  setSaasCustomerPermissions(id, input.allowedModels || [], input.allowedCombos || []);
  backupDbFile("pre-write");
  return getSaasCustomerById(id) as SaasCustomer;
}

export function updateSaasCustomer(
  id: string,
  input: Partial<{
    name: string;
    email: string;
    company: string;
    status: SaasCustomerStatus;
    billingStatus: SaasBillingStatus;
    paidUntil: string | null;
    extraTokenCredits: number;
    planId: string | null;
    notes: string;
    allowedModels: string[];
    allowedCombos: string[];
  }>
): SaasCustomer | null {
  ensureSaasSchema();
  const db = getDbInstance();
  const current = db.prepare("SELECT * FROM saas_customers WHERE id = ?").get(id);
  if (!current) return null;

  const now = new Date().toISOString();
  const updates: string[] = [];
  const params: Record<string, unknown> = { id, updatedAt: now };
  for (const [field, column] of [
    ["name", "name"],
    ["email", "email"],
    ["company", "company"],
    ["status", "status"],
    ["billingStatus", "billing_status"],
    ["paidUntil", "paid_until"],
    ["extraTokenCredits", "extra_token_credits"],
    ["planId", "plan_id"],
    ["notes", "notes"],
  ] as const) {
    if (field in input) {
      updates.push(`${column} = @${field}`);
      params[field] =
        field === "extraTokenCredits"
          ? Math.max(0, Math.round(Number(input[field]) || 0))
          : (input[field] ?? null);
    }
  }
  if (updates.length > 0) {
    updates.push("updated_at = @updatedAt");
    db.prepare(`UPDATE saas_customers SET ${updates.join(", ")} WHERE id = @id`).run(params);
  }
  if (input.status !== undefined) {
    const updated = getSaasCustomerById(id, { includeUsage: false });
    const active = input.status === "active" && updated && !isPastDue(updated) ? 1 : 0;
    db.prepare(
      "UPDATE saas_customer_api_keys SET is_active = ?, updated_at = ? WHERE customer_id = ?"
    ).run(active, now, id);
    db.prepare(
      `UPDATE api_keys
       SET is_active = ?
       WHERE id IN (SELECT api_key_id FROM saas_customer_api_keys WHERE customer_id = ?)`
    ).run(active, id);
    clearApiKeyCaches();
  }
  if (input.billingStatus !== undefined || input.paidUntil !== undefined) {
    const updated = getSaasCustomerById(id, { includeUsage: false });
    if (updated && isPastDue(updated)) {
      deactivateSaasCustomerApiKeys(id, "billing");
    }
  }
  if (input.allowedModels || input.allowedCombos) {
    const existing = getSaasCustomerById(id);
    setSaasCustomerPermissions(
      id,
      input.allowedModels || existing?.allowedModels || [],
      input.allowedCombos || existing?.allowedCombos || []
    );
  }
  backupDbFile("pre-write");
  return getSaasCustomerById(id);
}

export function deleteSaasCustomer(id: string): boolean {
  ensureSaasSchema();
  const db = getDbInstance();
  const customer = db.prepare("SELECT id FROM saas_customers WHERE id = ?").get(id);
  if (!customer) return false;

  const apiKeyIds = db
    .prepare("SELECT api_key_id FROM saas_customer_api_keys WHERE customer_id = ?")
    .all(id)
    .map((row) => toString(toRecord(row).api_key_id))
    .filter(Boolean);

  const tx = db.transaction(() => {
    db.prepare("DELETE FROM saas_customer_model_permissions WHERE customer_id = ?").run(id);
    db.prepare("DELETE FROM saas_customer_combo_permissions WHERE customer_id = ?").run(id);
    db.prepare("DELETE FROM saas_customer_api_keys WHERE customer_id = ?").run(id);
    db.prepare("DELETE FROM saas_customers WHERE id = ?").run(id);

    for (const apiKeyId of apiKeyIds) {
      db.prepare("DELETE FROM domain_budgets WHERE api_key_id = ?").run(apiKeyId);
      db.prepare("DELETE FROM domain_cost_history WHERE api_key_id = ?").run(apiKeyId);
      db.prepare("DELETE FROM api_keys WHERE id = ?").run(apiKeyId);
    }
  });
  tx();
  clearApiKeyCaches();
  backupDbFile("pre-write");
  return true;
}

export function linkApiKeyToSaasCustomer(input: {
  customerId: string;
  apiKeyId: string;
  label?: string;
  isActive?: boolean;
}): SaasCustomerApiKey {
  ensureSaasSchema();
  const db = getDbInstance();
  const now = new Date().toISOString();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO saas_customer_api_keys (
      id, customer_id, api_key_id, label, is_active, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.customerId,
    input.apiKeyId,
    input.label || "",
    input.isActive === false ? 0 : 1,
    now,
    now
  );
  if (input.isActive === false) {
    db.prepare("UPDATE api_keys SET is_active = 0 WHERE id = ?").run(input.apiKeyId);
    clearApiKeyCaches();
  }
  backupDbFile("pre-write");
  return mapCustomerApiKey(db.prepare("SELECT * FROM saas_customer_api_keys WHERE id = ?").get(id));
}

export function updateSaasCustomerApiKey(
  id: string,
  input: Partial<{ label: string; isActive: boolean }>
): SaasCustomerApiKey | null {
  ensureSaasSchema();
  const db = getDbInstance();
  const current = db.prepare("SELECT * FROM saas_customer_api_keys WHERE id = ?").get(id);
  if (!current) return null;
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE saas_customer_api_keys
     SET label = COALESCE(@label, label), is_active = COALESCE(@isActive, is_active), updated_at = @updatedAt
     WHERE id = @id`
  ).run({
    id,
    label: input.label ?? null,
    isActive: input.isActive === undefined ? null : input.isActive ? 1 : 0,
    updatedAt: now,
  });
  if (input.isActive !== undefined) {
    const row = toRecord(current);
    const apiKeyId = toString(row.api_key_id ?? row.apiKeyId);
    if (apiKeyId) {
      db.prepare("UPDATE api_keys SET is_active = ? WHERE id = ?").run(
        input.isActive ? 1 : 0,
        apiKeyId
      );
      clearApiKeyCaches();
    }
  }
  backupDbFile("pre-write");
  return mapCustomerApiKey(db.prepare("SELECT * FROM saas_customer_api_keys WHERE id = ?").get(id));
}

export function deactivateSaasCustomerApiKeys(
  customerId: string,
  reason: "limit" | "billing" | "manual" = "manual"
): void {
  ensureSaasSchema();
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    "UPDATE saas_customer_api_keys SET is_active = 0, updated_at = ? WHERE customer_id = ?"
  ).run(now, customerId);
  db.prepare(
    `UPDATE api_keys
     SET is_active = 0
     WHERE id IN (SELECT api_key_id FROM saas_customer_api_keys WHERE customer_id = ?)`
  ).run(customerId);
  if (reason !== "manual") {
    db.prepare("UPDATE saas_customers SET status = 'blocked', updated_at = ? WHERE id = ?").run(
      now,
      customerId
    );
  }
  clearApiKeyCaches();
  backupDbFile("pre-write");
}

export function setSaasCustomerPermissions(
  customerId: string,
  allowedModels: string[],
  allowedCombos: string[]
): void {
  ensureSaasSchema();
  const db = getDbInstance();
  const modelValues = [...new Set(allowedModels.map((m) => m.trim()).filter(Boolean))];
  const comboValues = [...new Set(allowedCombos.map((m) => m.trim()).filter(Boolean))];
  const tx = db.transaction(() => {
    db.prepare("DELETE FROM saas_customer_model_permissions WHERE customer_id = ?").run(customerId);
    db.prepare("DELETE FROM saas_customer_combo_permissions WHERE customer_id = ?").run(customerId);
    const insertModel = db.prepare(
      "INSERT INTO saas_customer_model_permissions (customer_id, model_id) VALUES (?, ?)"
    );
    for (const model of modelValues) insertModel.run(customerId, model);
    const insertCombo = db.prepare(
      "INSERT INTO saas_customer_combo_permissions (customer_id, combo_name) VALUES (?, ?)"
    );
    for (const combo of comboValues) insertCombo.run(customerId, combo);
  });
  tx();
}

export function getSaasUsageForCustomer(customerId: string): SaasUsageSummary {
  ensureSaasSchema();
  const db = getDbInstance();
  const customer = getSaasCustomerById(customerId, { includeUsage: false });
  const cycle = getCycle(customer?.billingCycleAnchor || new Date().toISOString());
  const baseLimitTokens = Math.max(0, Number(customer?.monthlyTokenLimit || 0));
  const extraTokenCredits = Math.max(0, Number(customer?.extraTokenCredits || 0));
  const limitTokens = baseLimitTokens + extraTokenCredits;
  const row = db
    .prepare(
      `SELECT
        COALESCE(SUM(
          COALESCE(tokens_input, 0) +
          COALESCE(tokens_output, 0) +
          COALESCE(tokens_cache_read, 0) +
          COALESCE(tokens_cache_creation, 0) +
          COALESCE(tokens_reasoning, 0)
        ), 0) as usedTokens,
        COUNT(*) as requestCount
       FROM usage_history uh
       JOIN saas_customer_api_keys sak ON sak.api_key_id = uh.api_key_id
       WHERE sak.customer_id = ?
         AND datetime(uh.timestamp) >= datetime(?)
         AND datetime(uh.timestamp) < datetime(?)`
    )
    .get(customerId, cycle.start, cycle.end) as { usedTokens?: number; requestCount?: number };
  const usedTokens = Math.max(0, Math.round(toNumber(row?.usedTokens)));
  const overLimit = limitTokens > 0 && usedTokens >= limitTokens;
  const billingBlocked = customer ? isPastDue(customer) : false;
  return {
    usedTokens,
    limitTokens,
    remainingTokens: limitTokens > 0 ? Math.max(0, limitTokens - usedTokens) : 0,
    percentUsed: limitTokens > 0 ? Math.min(1, usedTokens / limitTokens) : 0,
    requestCount: Math.max(0, Math.round(toNumber(row?.requestCount))),
    cycleStart: cycle.start,
    cycleEnd: cycle.end,
    blocked: overLimit || billingBlocked || customer?.status === "blocked",
    blockReason:
      customer?.status === "blocked"
        ? "manual"
        : billingBlocked
          ? "billing"
          : overLimit
            ? "limit"
            : null,
  };
}

export function listSaasCustomers(): SaasCustomer[] {
  ensureSaasSchema();
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT c.*, p.name as plan_name, p.monthly_token_limit, p.price_monthly_cents
       FROM saas_customers c
       LEFT JOIN saas_plans p ON p.id = c.plan_id
       ORDER BY c.created_at DESC`
    )
    .all();
  return rows.map((row) => hydrateCustomer(mapCustomer(row)));
}

export function getSaasCustomerById(
  id: string,
  options: { includeUsage?: boolean } = {}
): SaasCustomer | null {
  ensureSaasSchema();
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT c.*, p.name as plan_name, p.monthly_token_limit, p.price_monthly_cents
       FROM saas_customers c
       LEFT JOIN saas_plans p ON p.id = c.plan_id
       WHERE c.id = ?`
    )
    .get(id);
  if (!row) return null;
  return hydrateCustomer(mapCustomer(row), options);
}

function hydrateCustomer(
  customer: SaasCustomer,
  options: { includeUsage?: boolean } = {}
): SaasCustomer {
  const db = getDbInstance();
  const cycle = getCycle(customer.billingCycleAnchor || new Date().toISOString());
  const apiKeys = db
    .prepare(
      `SELECT
         sak.*,
         ak.name as key_name,
         ak.key as key,
         COALESCE(SUM(
           COALESCE(uh.tokens_input, 0) +
           COALESCE(uh.tokens_output, 0) +
           COALESCE(uh.tokens_cache_read, 0) +
           COALESCE(uh.tokens_cache_creation, 0) +
           COALESCE(uh.tokens_reasoning, 0)
         ), 0) as used_tokens,
         COUNT(uh.id) as request_count
       FROM saas_customer_api_keys sak
       LEFT JOIN api_keys ak ON ak.id = sak.api_key_id
       LEFT JOIN usage_history uh ON uh.api_key_id = sak.api_key_id
         AND datetime(uh.timestamp) >= datetime(?)
         AND datetime(uh.timestamp) < datetime(?)
       WHERE sak.customer_id = ?
       GROUP BY sak.id
       ORDER BY sak.created_at DESC`
    )
    .all(cycle.start, cycle.end, customer.id)
    .map(mapCustomerApiKey);
  const allowedModels = db
    .prepare(
      "SELECT model_id FROM saas_customer_model_permissions WHERE customer_id = ? ORDER BY model_id"
    )
    .all(customer.id)
    .map((r) => toString(toRecord(r).model_id))
    .filter(Boolean);
  const allowedCombos = db
    .prepare(
      "SELECT combo_name FROM saas_customer_combo_permissions WHERE customer_id = ? ORDER BY combo_name"
    )
    .all(customer.id)
    .map((r) => toString(toRecord(r).combo_name))
    .filter(Boolean);
  return {
    ...customer,
    apiKeys,
    allowedModels,
    allowedCombos,
    usage: options.includeUsage === false ? undefined : getSaasUsageForCustomer(customer.id),
  };
}

export function getSaasPolicyForApiKeyId(apiKeyId: string): SaasPolicyContext | null {
  ensureSaasSchema();
  const db = getDbInstance();
  const keyRow = db
    .prepare("SELECT * FROM saas_customer_api_keys WHERE api_key_id = ?")
    .get(apiKeyId);
  if (!keyRow) return null;
  const apiKey = mapCustomerApiKey(keyRow);
  const customer = getSaasCustomerById(apiKey.customerId);
  if (!customer) return null;
  const planRow = customer.planId
    ? db.prepare("SELECT * FROM saas_plans WHERE id = ?").get(customer.planId)
    : null;
  const plan = planRow ? mapPlan(planRow) : null;
  return {
    customer,
    plan,
    apiKey,
    allowedModels: customer.allowedModels || [],
    allowedCombos: customer.allowedCombos || [],
    usage: customer.usage || getSaasUsageForCustomer(customer.id),
  };
}

export function isAllowedBySaasPattern(value: string, patterns: string[]): boolean {
  if (!patterns.length) return false;
  for (const pattern of patterns) {
    if (pattern === value) return true;
    if (pattern.endsWith("/*") && value.startsWith(pattern.slice(0, -1))) return true;
    if (pattern.includes("*")) {
      const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
      if (new RegExp(`^${escaped}$`).test(value)) return true;
    }
  }
  return false;
}
