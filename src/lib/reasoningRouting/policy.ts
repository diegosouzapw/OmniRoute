import { getComboById } from "@/lib/db/combos";
import {
  getReasoningRoutingRules,
  type ReasoningBudgetAction,
  type ReasoningEffort,
  type ReasoningRoutingRule,
  type ReasoningSourceEffort,
} from "@/lib/db/reasoningRoutingRules";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { normalizeRoutingTags } from "@/domain/tagRouter";
import { splitClaudeEffortSuffix } from "@omniroute/open-sse/config/providerModels.ts";

type JsonRecord = Record<string, unknown>;
const EFFORTS = new Set<ReasoningEffort>([
  "none",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
  "ultra",
]);
const SCOPE_RANK: Record<ReasoningRoutingRule["scope"], number> = {
  apiKey: 4,
  combo: 3,
  model: 2,
  global: 1,
  connection: 0,
};

export interface ExtractedReasoningIntent {
  model: string;
  effort: ReasoningEffort | null;
  sourceEffort: Exclude<ReasoningSourceEffort, "any"> | "signal";
  hasReasoningSignal: boolean;
  hasThinkingBudget: boolean;
}

export interface ReasoningRuleDecision {
  rule: ReasoningRoutingRule;
  sourceModel: string;
  sourceEffort: Exclude<ReasoningSourceEffort, "any"> | "signal";
  targetModel: string;
  targetCombo: JsonRecord | null;
  targetEffort: ReasoningEffort | null;
  capability: "supported" | "unsupported" | "unknown";
  requiresReasoning: boolean;
  warnings: string[];
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function effort(value: unknown): ReasoningEffort | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase() as ReasoningEffort;
  return EFFORTS.has(normalized) ? normalized : null;
}

function thinkingLevelEffort(value: unknown): ReasoningEffort | null {
  if (value === false) return "none";
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (["disabled", "off", "false"].includes(normalized)) return "none";
  return effort(normalized);
}

function splitGenericEffortSuffix(model: string): {
  model: string;
  effort: ReasoningEffort | null;
} {
  const claude = model.toLowerCase().includes("claude") ? splitClaudeEffortSuffix(model) : null;
  if (claude?.effort) return { model: claude.baseModel, effort: claude.effort };
  return splitCodexEffortSuffix(model) ?? { model, effort: null };
}

function supportsCodexSuffix(candidate: string, normalizedBase: string): boolean {
  if (candidate === "max") return /^gpt-5\.6-(?:sol|terra|luna)$/.test(normalizedBase);
  if (candidate === "ultra") return /^gpt-5\.6-(?:sol|terra)$/.test(normalizedBase);
  return true;
}

function splitCodexEffortSuffix(model: string): { model: string; effort: ReasoningEffort } | null {
  const lower = model.toLowerCase();
  for (const candidate of ["ultra", "xhigh", "medium", "high", "none", "low", "max"] as const) {
    if (!lower.endsWith(`-${candidate}`)) continue;
    const baseModel = model.slice(0, -(candidate.length + 1));
    const normalizedBase = baseModel.toLowerCase().replace(/^(?:codex|cx)\//, "");
    if (/^gpt-[\w.-]+$/.test(normalizedBase) && supportsCodexSuffix(candidate, normalizedBase)) {
      return { model: baseModel, effort: candidate };
    }
  }
  return null;
}

function firstDefinedEffort(
  body: JsonRecord,
  reasoning: JsonRecord,
  thinking: JsonRecord,
  thinkingConfig: JsonRecord,
  suffixEffort: ReasoningEffort | null
): ReasoningEffort | null {
  const output = asRecord(body.output_config);
  const values = [
    effort(reasoning.effort),
    effort(body.reasoning_effort),
    effort(body.reasoningEffort),
    effort(body.effort),
    effort(output.effort),
    thinkingLevelEffort(body.thinkingLevel),
    thinkingLevelEffort(body.thinking_level),
    thinkingLevelEffort(thinkingConfig.thinkingLevel ?? thinkingConfig.thinking_level),
    body.thinking === false || thinking.type === "disabled" ? "none" : null,
    suffixEffort,
  ];
  return values.find((value): value is ReasoningEffort => value !== null) ?? null;
}

function hasNumericField(record: JsonRecord, key: string): boolean {
  return typeof record[key] === "number";
}

function detectThinkingBudget(
  body: JsonRecord,
  reasoning: JsonRecord,
  thinking: JsonRecord,
  thinkingConfig: JsonRecord
): boolean {
  return [
    [thinking, "budget_tokens"],
    [thinking, "budgetTokens"],
    [reasoning, "budget_tokens"],
    [reasoning, "budgetTokens"],
    [reasoning, "max_tokens"],
    [body, "thinking_budget"],
    [body, "thinkingBudget"],
    [thinkingConfig, "thinkingBudget"],
    [thinkingConfig, "thinking_budget"],
  ].some(([record, key]) => hasNumericField(record, key));
}

function hasReasoningSignal(
  body: JsonRecord,
  reasoning: JsonRecord,
  thinkingConfig: JsonRecord,
  explicitEffort: ReasoningEffort | null,
  hasBudget: boolean
): boolean {
  return (
    explicitEffort !== null ||
    [
      body.thinking,
      body.thinkingLevel,
      body.thinking_level,
      reasoning.effort,
      body.reasoning_effort,
      body.reasoningEffort,
      body.effort,
      asRecord(body.output_config).effort,
      thinkingConfig.thinkingLevel,
      thinkingConfig.thinking_level,
    ].some((value) => value !== undefined) ||
    hasBudget
  );
}

export function extractReasoningIntent(
  modelInput: unknown,
  bodyInput: unknown
): ExtractedReasoningIntent {
  const body = asRecord(bodyInput);
  const rawModel = typeof modelInput === "string" ? modelInput.trim() : "";
  const suffixed = splitGenericEffortSuffix(rawModel);
  const reasoning = asRecord(body.reasoning);
  const thinking = asRecord(body.thinking);
  const generationConfig = asRecord(body.generationConfig);
  const thinkingConfig = asRecord(
    generationConfig.thinkingConfig ?? generationConfig.thinking_config
  );
  const explicitEffort = firstDefinedEffort(
    body,
    reasoning,
    thinking,
    thinkingConfig,
    suffixed.effort
  );
  const hasThinkingBudget = detectThinkingBudget(body, reasoning, thinking, thinkingConfig);
  const hasReasoningSignalValue = hasReasoningSignal(
    body,
    reasoning,
    thinkingConfig,
    explicitEffort,
    hasThinkingBudget
  );
  return {
    model: suffixed.model,
    effort: explicitEffort,
    sourceEffort: explicitEffort ?? (hasReasoningSignalValue ? "signal" : "missing"),
    hasReasoningSignal: hasReasoningSignalValue,
    hasThinkingBudget,
  };
}

export function globMatches(pattern: string, value: string): boolean {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*")
    .replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`, "i").test(value);
}

export async function resolveReasoningSourceModels(
  model: string,
  resolve: (model: string) => Promise<{ provider?: string | null; model?: string | null }>
): Promise<{ normalized: string; aliases: string[] }> {
  try {
    const resolved = await resolve(model);
    const resolvedModel =
      typeof resolved?.model === "string" && resolved.model.trim() ? resolved.model.trim() : null;
    const provider =
      typeof resolved?.provider === "string" && resolved.provider.trim()
        ? resolved.provider.trim()
        : null;
    const normalized =
      provider && resolvedModel ? `${provider}/${resolvedModel}` : resolvedModel || model;
    return {
      normalized,
      aliases: normalized.toLowerCase() === model.toLowerCase() ? [] : [model],
    };
  } catch {
    return { normalized: model, aliases: [] };
  }
}

function tagsMatch(rule: ReasoningRoutingRule, requestTags: string[]): boolean {
  if (rule.requestTags.length === 0) return true;
  const available = new Set(normalizeRoutingTags(requestTags));
  return rule.tagMatchMode === "all"
    ? rule.requestTags.every((tag) => available.has(tag))
    : rule.requestTags.some((tag) => available.has(tag));
}

function modelMatches(rule: ReasoningRoutingRule, model: string): boolean {
  if (!rule.modelPattern) return true;
  return globMatches(rule.modelPattern, model);
}

function isExactModelMatch(rule: ReasoningRoutingRule, model: string): boolean {
  return (
    !!rule.modelPattern &&
    !/[?*]/.test(rule.modelPattern) &&
    rule.modelPattern.toLowerCase() === model.toLowerCase()
  );
}

function capabilityFor(
  model: string,
  targetEffort: ReasoningEffort | null,
  requiresReasoning = Boolean(targetEffort && targetEffort !== "none")
) {
  if (!requiresReasoning || targetEffort === "none") return "supported" as const;
  const capabilities = getResolvedModelCapabilities(model);
  if (capabilities.supportsThinking === false) return "unsupported" as const;
  if (targetEffort === "max" || targetEffort === "ultra") {
    const normalized = model.toLowerCase().replace(/^(?:codex|cx)\//, "");
    const supported =
      targetEffort === "ultra"
        ? /^gpt-5\.6-(?:sol|terra)(?:-|$)/.test(normalized)
        : /^gpt-5\.6-(?:sol|terra|luna)(?:-|$)/.test(normalized);
    if (supported) return "supported" as const;
    if (capabilities.supportsThinking === null) return "unknown" as const;
    return "unsupported" as const;
  }
  return capabilities.supportsThinking === null ? ("unknown" as const) : ("supported" as const);
}

type RoutingInput = {
  sourceModel: string;
  sourceModelAliases?: string[];
  sourceEffort: Exclude<ReasoningSourceEffort, "any"> | "signal";
  hasReasoningSignal: boolean;
  hasThinkingBudget?: boolean;
  apiKeyId?: string | null;
  comboId?: string | null;
  connectionId?: string | null;
  requestTags?: string[];
  connectionOnly?: boolean;
  capabilityModel?: string | null;
};

function inputModels(input: RoutingInput): string[] {
  return [input.sourceModel, ...(input.sourceModelAliases ?? [])];
}

function scopeMatches(rule: ReasoningRoutingRule, input: RoutingInput): boolean {
  if (input.connectionOnly ? rule.scope !== "connection" : rule.scope === "connection") {
    return false;
  }
  if (rule.scope === "apiKey" && rule.apiKeyId !== input.apiKeyId) return false;
  if (rule.scope === "combo" && rule.comboId !== input.comboId) return false;
  if (rule.scope === "connection" && rule.connectionId !== input.connectionId) return false;
  return rule.sourceEffort === "any" || rule.sourceEffort === input.sourceEffort;
}

function ruleMatches(rule: ReasoningRoutingRule, input: RoutingInput): boolean {
  return (
    scopeMatches(rule, input) &&
    inputModels(input).some((model) => modelMatches(rule, model)) &&
    tagsMatch(rule, input.requestTags ?? [])
  );
}

function exactMatchScore(rule: ReasoningRoutingRule, input: RoutingInput): number {
  return Number(inputModels(input).some((model) => isExactModelMatch(rule, model)));
}

function compareRules(input: RoutingInput) {
  return (a: ReasoningRoutingRule, b: ReasoningRoutingRule) =>
    SCOPE_RANK[b.scope] - SCOPE_RANK[a.scope] ||
    b.priority - a.priority ||
    exactMatchScore(b, input) - exactMatchScore(a, input) ||
    a.createdAt.localeCompare(b.createdAt) ||
    a.id.localeCompare(b.id);
}

function resolveTargetModel(
  rule: ReasoningRoutingRule,
  sourceModel: string,
  combo: JsonRecord | null
) {
  if (combo) return typeof combo.name === "string" ? combo.name : rule.targetComboId;
  return rule.targetKind === "model" && rule.targetModel ? rule.targetModel : sourceModel;
}

async function resolveTarget(rule: ReasoningRoutingRule, sourceModel: string) {
  if (rule.targetKind !== "combo" || !rule.targetComboId) {
    return { targetCombo: null, targetModel: resolveTargetModel(rule, sourceModel, null) };
  }
  const targetCombo = (await getComboById(rule.targetComboId)) as JsonRecord | null;
  if (!targetCombo) throw new Error("Reasoning routing target combo does not exist");
  return { targetCombo, targetModel: resolveTargetModel(rule, sourceModel, targetCombo) };
}

function resolveTargetEffort(
  rule: ReasoningRoutingRule,
  input: RoutingInput
): ReasoningEffort | null {
  const inherits =
    rule.effortMode === "inherit" || (rule.effortMode === "default" && input.hasReasoningSignal);
  if (!inherits) return rule.targetEffort;
  return input.sourceEffort === "missing" || input.sourceEffort === "signal"
    ? null
    : input.sourceEffort;
}

function resolveCapability(
  targetCombo: JsonRecord | null,
  targetModel: string,
  targetEffort: ReasoningEffort | null,
  requiresReasoning: boolean
): { capability: ReasoningRuleDecision["capability"]; warnings: string[] } {
  if (!targetCombo) {
    return {
      capability: capabilityFor(targetModel, targetEffort, requiresReasoning),
      warnings: [],
    };
  }
  const models = Array.isArray(targetCombo.models) ? targetCombo.models : [];
  const statuses = models.map((entry) => {
    const record = asRecord(entry);
    const model =
      typeof entry === "string"
        ? entry
        : typeof record.model === "string"
          ? String(record.model)
          : null;
    return model ? capabilityFor(model, targetEffort, requiresReasoning) : "unknown";
  });
  const capability =
    statuses.length > 0 && statuses.every((status) => status === "unsupported")
      ? "unsupported"
      : statuses.some((status) => status === "unknown")
        ? "unknown"
        : "supported";
  const unsupportedCount = statuses.filter((status) => status === "unsupported").length;
  const warnings =
    unsupportedCount > 0 && capability !== "unsupported"
      ? [`${unsupportedCount} incompatible combo target(s) will be skipped`]
      : [];
  return { capability, warnings };
}

export async function resolveReasoningRoutingRule(
  input: RoutingInput
): Promise<ReasoningRuleDecision | null> {
  const rules = await getReasoningRoutingRules({ enabledOnly: true });
  const candidates = rules.filter((rule) => ruleMatches(rule, input)).sort(compareRules(input));
  const rule = candidates[0];
  if (!rule) return null;

  const { targetCombo, targetModel } = await resolveTarget(rule, input.sourceModel);
  const targetEffort = resolveTargetEffort(rule, input);
  const budgetAction = targetEffort === "none" ? "remove" : rule.budgetAction;
  const requiresReasoning =
    targetEffort !== "none" &&
    (Boolean(targetEffort) ||
      budgetAction === "set" ||
      (budgetAction === "preserve" && input.hasThinkingBudget === true));
  const capabilityResult = resolveCapability(
    targetCombo,
    input.capabilityModel || targetModel,
    targetEffort,
    requiresReasoning
  );
  const capability = capabilityResult.capability;
  const warnings = capabilityResult.warnings;
  if (capability === "unknown") warnings.push("Reasoning capability could not be verified");
  return {
    rule,
    sourceModel: input.sourceModel,
    sourceEffort: input.sourceEffort,
    targetModel,
    targetCombo,
    targetEffort,
    capability,
    requiresReasoning,
    warnings,
  };
}

function clearReasoning(body: JsonRecord): void {
  delete body.reasoning_effort;
  delete body.reasoningEffort;
  delete body.reasoning;
  delete body.effort;
  delete body.thinking;
  delete body.thinkingLevel;
  delete body.thinking_level;
  delete body.thinking_budget;
  delete body.thinkingBudget;
  if (body.output_config && typeof body.output_config === "object") {
    const output = { ...asRecord(body.output_config) };
    delete output.effort;
    body.output_config = output;
  }
}

function clearDiscreteReasoning(body: JsonRecord): void {
  delete body.reasoning_effort;
  delete body.reasoningEffort;
  delete body.effort;
  delete body.thinkingLevel;
  delete body.thinking_level;
  if (body.reasoning && typeof body.reasoning === "object") {
    const reasoning = { ...asRecord(body.reasoning) };
    delete reasoning.effort;
    if (Object.keys(reasoning).length > 0) body.reasoning = reasoning;
    else delete body.reasoning;
  }
  if (body.output_config && typeof body.output_config === "object") {
    const output = { ...asRecord(body.output_config) };
    delete output.effort;
    if (Object.keys(output).length > 0) body.output_config = output;
    else delete body.output_config;
  }
  const thinking = asRecord(body.thinking);
  if (body.thinking !== undefined && typeof thinking.budget_tokens !== "number") {
    delete body.thinking;
  }
}

function removeBudgets(body: JsonRecord): void {
  delete body.thinking_budget;
  delete body.thinkingBudget;
  const thinking = { ...asRecord(body.thinking) };
  delete thinking.budget_tokens;
  delete thinking.budgetTokens;
  if (Object.keys(thinking).length > 0 && body.thinking !== undefined) body.thinking = thinking;
  else delete body.thinking;
  const reasoning = { ...asRecord(body.reasoning) };
  delete reasoning.budget_tokens;
  delete reasoning.budgetTokens;
  delete reasoning.max_tokens;
  if (Object.keys(reasoning).length > 0 && body.reasoning !== undefined) body.reasoning = reasoning;
  else if (body.reasoning !== undefined) delete body.reasoning;
  const generationConfig = { ...asRecord(body.generationConfig) };
  delete generationConfig.thinkingConfig;
  delete generationConfig.thinking_config;
  if (Object.keys(generationConfig).length > 0) body.generationConfig = generationConfig;
  else delete body.generationConfig;
}

function applyBudget(body: JsonRecord, action: ReasoningBudgetAction, budget: number | null): void {
  if (action === "preserve") return;
  removeBudgets(body);
  if (action === "remove") return;
  body.thinking = { type: "enabled", budget_tokens: budget };
}

export function attachReasoningRuleDirective(
  bodyInput: unknown,
  decision: ReasoningRuleDecision
): JsonRecord {
  const source = asRecord(bodyInput);
  const body = {
    ...source,
    model: decision.rule.scope === "connection" ? source.model : decision.targetModel,
  };
  body._omnirouteReasoningRule = {
    id: decision.rule.id,
    effortMode: decision.rule.effortMode,
    targetEffort: decision.targetEffort,
    budgetAction: decision.targetEffort === "none" ? "remove" : decision.rule.budgetAction,
    budgetTokens: decision.rule.budgetTokens,
  };
  body._omnirouteReasoningRouteTrace = {
    ruleId: decision.rule.id,
    ruleName: decision.rule.name,
    scope: decision.rule.scope,
    sourceModel: decision.sourceModel,
    targetModel: decision.targetModel,
    sourceEffort: decision.sourceEffort,
    targetEffort: decision.targetEffort,
    effortMode: decision.rule.effortMode,
    budgetAction: decision.targetEffort === "none" ? "remove" : decision.rule.budgetAction,
    capability: decision.capability,
    warnings: decision.warnings,
  };
  return body;
}

export function applyReasoningRuleDirective(bodyInput: unknown): unknown {
  const source = asRecord(bodyInput);
  const directive = asRecord(source._omnirouteReasoningRule);
  if (!directive.id) return bodyInput;
  const body = { ...source };
  delete body._omnirouteReasoningRule;
  const effortMode = directive.effortMode;
  const targetEffort = effort(directive.targetEffort);
  if (effortMode === "force" && targetEffort === "none") clearReasoning(body);
  else if ((effortMode === "force" || effortMode === "default") && targetEffort) {
    if (effortMode === "force") clearDiscreteReasoning(body);
    body.reasoning_effort = targetEffort;
    body.reasoning = { ...asRecord(body.reasoning), effort: targetEffort };
    body.output_config = { ...asRecord(body.output_config), effort: targetEffort };
  }
  applyBudget(
    body,
    directive.budgetAction as ReasoningBudgetAction,
    typeof directive.budgetTokens === "number" ? directive.budgetTokens : null
  );
  return body;
}

export function filterComboForReasoningDecision(
  comboInput: unknown,
  decision: ReasoningRuleDecision
): { combo: JsonRecord | null; removed: string[] } {
  const combo = { ...asRecord(comboInput) };
  if (!Array.isArray(combo.models) || !decision.requiresReasoning) return { combo, removed: [] };
  const removed: string[] = [];
  combo.models = combo.models.filter((entry) => {
    const model =
      typeof entry === "string"
        ? entry
        : typeof asRecord(entry).model === "string"
          ? String(asRecord(entry).model)
          : null;
    if (!model) return true;
    if (capabilityFor(model, decision.targetEffort, true) !== "unsupported") return true;
    removed.push(model);
    return false;
  });
  return { combo: (combo.models as unknown[]).length > 0 ? combo : null, removed };
}

export function isCodexTarget(model: string): boolean {
  return !model.includes("/") || /^(?:codex|cx)\//i.test(model);
}

export function validateCodexWsDecision(decision: ReasoningRuleDecision): string | null {
  if (decision.targetCombo) {
    const models = Array.isArray(decision.targetCombo.models) ? decision.targetCombo.models : [];
    const allCodex =
      models.length > 0 &&
      models.every((entry) => {
        const model =
          typeof entry === "string"
            ? entry
            : typeof asRecord(entry).model === "string"
              ? String(asRecord(entry).model)
              : "";
        return !!model && isCodexTarget(model);
      });
    if (!allCodex) return "Codex WebSocket reasoning rules require a Codex-only target";
    return "Codex WebSocket transport cannot execute combo targets";
  }
  return isCodexTarget(decision.targetModel)
    ? null
    : "Codex WebSocket reasoning rules require a Codex target model";
}
