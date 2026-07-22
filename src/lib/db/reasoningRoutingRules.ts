import { randomUUID } from "node:crypto";
import { getDbInstance } from "./core";
import { registerDbStateResetter } from "./stateReset";

export type ReasoningRuleScope = "global" | "apiKey" | "combo" | "model" | "connection";
export type ReasoningEffort = "none" | "low" | "medium" | "high" | "xhigh" | "max" | "ultra";
export type ReasoningSourceEffort = "any" | "missing" | ReasoningEffort;
export type ReasoningEffortMode = "inherit" | "default" | "force";
export type ReasoningTargetKind = "keep" | "model" | "combo";
export type ReasoningBudgetAction = "preserve" | "remove" | "set";

export interface ReasoningRoutingRule {
  id: string;
  name: string;
  description: string;
  scope: ReasoningRuleScope;
  apiKeyId: string | null;
  comboId: string | null;
  connectionId: string | null;
  modelPattern: string | null;
  sourceEffort: ReasoningSourceEffort;
  requestTags: string[];
  tagMatchMode: "any" | "all";
  effortMode: ReasoningEffortMode;
  targetEffort: ReasoningEffort | null;
  targetKind: ReasoningTargetKind;
  targetModel: string | null;
  targetComboId: string | null;
  budgetAction: ReasoningBudgetAction;
  budgetTokens: number | null;
  priority: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ReasoningRoutingRuleInput = Omit<
  ReasoningRoutingRule,
  "id" | "createdAt" | "updatedAt"
>;

type RuleRow = Record<string, unknown>;
let cache: { version: number; rules: ReasoningRoutingRule[] } | null = null;
let version = 0;

function parseTags(value: unknown): string[] {
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    return Array.isArray(parsed)
      ? [
          ...new Set(
            parsed
              .filter((tag): tag is string => typeof tag === "string")
              .map((tag) => tag.trim().toLowerCase())
              .filter(Boolean)
          ),
        ]
      : [];
  } catch {
    return [];
  }
}

function rowToRule(row: RuleRow): ReasoningRoutingRule {
  return {
    id: String(row.id),
    name: String(row.name),
    description: typeof row.description === "string" ? row.description : "",
    scope: row.scope as ReasoningRuleScope,
    apiKeyId: typeof row.api_key_id === "string" ? row.api_key_id : null,
    comboId: typeof row.combo_id === "string" ? row.combo_id : null,
    connectionId: typeof row.connection_id === "string" ? row.connection_id : null,
    modelPattern: typeof row.model_pattern === "string" ? row.model_pattern : null,
    sourceEffort: row.source_effort as ReasoningSourceEffort,
    requestTags: parseTags(row.request_tags),
    tagMatchMode: row.tag_match_mode === "all" ? "all" : "any",
    effortMode: row.effort_mode as ReasoningEffortMode,
    targetEffort:
      typeof row.target_effort === "string" ? (row.target_effort as ReasoningEffort) : null,
    targetKind: row.target_kind as ReasoningTargetKind,
    targetModel: typeof row.target_model === "string" ? row.target_model : null,
    targetComboId: typeof row.target_combo_id === "string" ? row.target_combo_id : null,
    budgetAction: row.budget_action as ReasoningBudgetAction,
    budgetTokens: typeof row.budget_tokens === "number" ? row.budget_tokens : null,
    priority: typeof row.priority === "number" ? row.priority : 0,
    enabled: row.enabled === 1 || row.enabled === true,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function invalidate(): void {
  version += 1;
  cache = null;
}

function referenceExists(table: string, id: string | null): boolean {
  if (!id) return false;
  const allowedTables = new Set(["api_keys", "combos", "provider_connections"]);
  if (!allowedTables.has(table)) return false;
  return Boolean(getDbInstance().prepare(`SELECT 1 FROM ${table} WHERE id = ?`).get(id));
}

export function getReasoningRoutingRuleReferenceErrors(rule: ReasoningRoutingRuleInput): string[] {
  const errors: string[] = [];
  if (rule.scope === "apiKey" && !referenceExists("api_keys", rule.apiKeyId)) {
    errors.push("The referenced API key does not exist");
  }
  if (rule.scope === "combo" && !referenceExists("combos", rule.comboId)) {
    errors.push("The referenced source combo does not exist");
  }
  if (rule.scope === "connection" && !referenceExists("provider_connections", rule.connectionId)) {
    errors.push("The referenced provider connection does not exist");
  }
  if (rule.targetKind === "combo" && !referenceExists("combos", rule.targetComboId)) {
    errors.push("The referenced target combo does not exist");
  }
  return errors;
}

function assertReferences(rule: ReasoningRoutingRuleInput): void {
  const errors = getReasoningRoutingRuleReferenceErrors(rule);
  if (errors.length > 0) throw new Error(errors.join("; "));
}

export async function getReasoningRoutingRules(
  options: { enabledOnly?: boolean } = {}
): Promise<ReasoningRoutingRule[]> {
  if (!cache || cache.version !== version) {
    const rows = getDbInstance()
      .prepare(
        "SELECT * FROM reasoning_routing_rules ORDER BY priority DESC, created_at ASC, id ASC"
      )
      .all() as RuleRow[];
    cache = { version, rules: rows.map(rowToRule) };
  }
  const rules = options.enabledOnly ? cache.rules.filter((rule) => rule.enabled) : cache.rules;
  return rules.map((rule) => ({ ...rule, requestTags: [...rule.requestTags] }));
}

export async function getReasoningRoutingRuleById(
  id: string
): Promise<ReasoningRoutingRule | null> {
  const row = getDbInstance()
    .prepare("SELECT * FROM reasoning_routing_rules WHERE id = ?")
    .get(id) as RuleRow | undefined;
  return row ? rowToRule(row) : null;
}

function ruleParams(
  rule: ReasoningRoutingRuleInput,
  id: string,
  createdAt: string,
  updatedAt: string
) {
  return {
    id,
    name: rule.name,
    description: rule.description || "",
    scope: rule.scope,
    apiKeyId: rule.apiKeyId ?? null,
    comboId: rule.comboId ?? null,
    connectionId: rule.connectionId ?? null,
    modelPattern: rule.modelPattern ?? null,
    sourceEffort: rule.sourceEffort,
    requestTags: JSON.stringify(parseTags(rule.requestTags)),
    tagMatchMode: rule.tagMatchMode,
    effortMode: rule.effortMode,
    targetEffort: rule.effortMode === "inherit" ? null : rule.targetEffort,
    targetKind: rule.targetKind,
    targetModel: rule.targetKind === "model" ? rule.targetModel : null,
    targetComboId: rule.targetKind === "combo" ? rule.targetComboId : null,
    budgetAction: rule.targetEffort === "none" ? "remove" : rule.budgetAction,
    budgetTokens: rule.budgetAction === "set" ? rule.budgetTokens : null,
    priority: rule.priority,
    enabled: rule.enabled ? 1 : 0,
    createdAt,
    updatedAt,
  };
}

export async function createReasoningRoutingRule(
  rule: ReasoningRoutingRuleInput
): Promise<ReasoningRoutingRule> {
  assertReferences(rule);
  const id = randomUUID();
  const now = new Date().toISOString();
  getDbInstance()
    .prepare(
      `INSERT INTO reasoning_routing_rules (
      id, name, description, scope, api_key_id, combo_id, connection_id, model_pattern,
      source_effort, request_tags, tag_match_mode, effort_mode, target_effort, target_kind,
      target_model, target_combo_id, budget_action, budget_tokens, priority, enabled, created_at, updated_at
    ) VALUES (
      @id, @name, @description, @scope, @apiKeyId, @comboId, @connectionId, @modelPattern,
      @sourceEffort, @requestTags, @tagMatchMode, @effortMode, @targetEffort, @targetKind,
      @targetModel, @targetComboId, @budgetAction, @budgetTokens, @priority, @enabled, @createdAt, @updatedAt
    )`
    )
    .run(ruleParams(rule, id, now, now));
  invalidate();
  return (await getReasoningRoutingRuleById(id))!;
}

export async function updateReasoningRoutingRule(
  id: string,
  patch: Partial<ReasoningRoutingRuleInput>
): Promise<ReasoningRoutingRule | null> {
  const existing = await getReasoningRoutingRuleById(id);
  if (!existing) return null;
  const { id: _id, createdAt, updatedAt: _updatedAt, ...base } = existing;
  const next = { ...base, ...patch } as ReasoningRoutingRuleInput;
  assertReferences(next);
  const now = new Date().toISOString();
  getDbInstance()
    .prepare(
      `UPDATE reasoning_routing_rules SET
      name=@name, description=@description, scope=@scope, api_key_id=@apiKeyId,
      combo_id=@comboId, connection_id=@connectionId, model_pattern=@modelPattern,
      source_effort=@sourceEffort, request_tags=@requestTags, tag_match_mode=@tagMatchMode,
      effort_mode=@effortMode, target_effort=@targetEffort, target_kind=@targetKind,
      target_model=@targetModel, target_combo_id=@targetComboId, budget_action=@budgetAction,
      budget_tokens=@budgetTokens, priority=@priority, enabled=@enabled, updated_at=@updatedAt
      WHERE id=@id`
    )
    .run(ruleParams(next, id, createdAt, now));
  invalidate();
  return getReasoningRoutingRuleById(id);
}

export async function deleteReasoningRoutingRule(id: string): Promise<boolean> {
  const result = getDbInstance()
    .prepare("DELETE FROM reasoning_routing_rules WHERE id = ?")
    .run(id);
  if ((result.changes ?? 0) > 0) invalidate();
  return (result.changes ?? 0) > 0;
}

export function invalidateReasoningRoutingRuleCache(): void {
  invalidate();
}

registerDbStateResetter(invalidateReasoningRoutingRuleCache);
