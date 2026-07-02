// Nested combo runtime unit execution — see combo.ts for integration.
import { errorResponse } from "../../utils/error.ts";
import { recordComboRequest } from "../comboMetrics.ts";
import { resolveDelayMs } from "./comboPredicates.ts";
import { validateResponseQuality } from "./validateQuality.ts";
import type { ResponseValidationConfig } from "./responseValidation.ts";
import type {
  ComboCollectionLike,
  ComboLike,
  ComboLogger,
  ComboNestingContext,
  HandleComboChatOptions,
  HandleSingleModel,
  IsModelAvailable,
  ResolvedComboRefTarget,
  ResolvedComboUnit,
} from "./types.ts";

export type RuntimeUnitExecutionResult = {
  response: Response;
  unit: ResolvedComboUnit | null;
};

type RuntimeUnitRunner = (options: HandleComboChatOptions) => Promise<Response>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function getCombosList(allCombos: ComboCollectionLike): ComboLike[] {
  const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  return combos.filter(
    (combo): combo is ComboLike => isRecord(combo) && typeof combo.name === "string"
  );
}

function findComboByName(allCombos: ComboCollectionLike, name: string): ComboLike | null {
  return getCombosList(allCombos).find((combo) => combo.name === name) || null;
}

function unitDisplayName(unit: ResolvedComboUnit): string {
  return unit.kind === "combo-ref" ? `combo:${unit.comboName}` : unit.modelStr;
}

function shuffleUnits(units: ResolvedComboUnit[]): ResolvedComboUnit[] {
  const result = [...units];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function selectWeightedUnit(units: ResolvedComboUnit[]): ResolvedComboUnit | null {
  const total = units.reduce((sum, unit) => sum + Math.max(0, Number(unit.weight) || 0), 0);
  if (total <= 0) return units[0] || null;
  let draw = Math.random() * total;
  for (const unit of units) {
    draw -= Math.max(0, Number(unit.weight) || 0);
    if (draw <= 0) return unit;
  }
  return units[units.length - 1] || null;
}

async function executeModelUnit(args: {
  body: Record<string, unknown>;
  unit: Extract<ResolvedComboUnit, { kind: "model" }>;
  handleSingleModel: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  failoverBeforeRetry: unknown;
  effectiveComboStrategy: string;
}): Promise<Response> {
  if (args.isModelAvailable) {
    const available = await args.isModelAvailable(args.unit.modelStr, args.unit);
    if (!available) return errorResponse(503, `Model ${args.unit.modelStr} is unavailable`);
  }
  return args.handleSingleModel(args.body, args.unit.modelStr, {
    ...args.unit,
    effectiveComboStrategy: args.effectiveComboStrategy,
    failoverBeforeRetry: args.failoverBeforeRetry,
  });
}

function buildChildNestingContext(args: {
  context: ComboNestingContext;
  childComboName: string;
}): ComboNestingContext | Response {
  if (args.context.depth >= args.context.maxDepth) {
    return errorResponse(503, `Max combo nesting depth (${args.context.maxDepth}) exceeded`);
  }
  if (args.context.visitedComboNames.includes(args.childComboName)) {
    return errorResponse(503, `Circular combo reference detected: ${args.childComboName}`);
  }
  return {
    ...args.context,
    depth: args.context.depth + 1,
    visitedComboNames: [...args.context.visitedComboNames, args.childComboName],
  };
}

async function executeComboRefUnit(args: {
  body: Record<string, unknown>;
  unit: ResolvedComboRefTarget;
  allCombos: ComboCollectionLike;
  runCombo: RuntimeUnitRunner;
  baseOptions: HandleComboChatOptions;
  nesting: ComboNestingContext;
}): Promise<Response> {
  const childCombo = findComboByName(args.allCombos, args.unit.comboName);
  if (!childCombo) return errorResponse(503, `Nested combo "${args.unit.comboName}" not found`);
  const childNesting = buildChildNestingContext({
    context: args.nesting,
    childComboName: childCombo.name,
  });
  if (childNesting instanceof Response) return childNesting;
  return args.runCombo({
    ...args.baseOptions,
    body: args.body,
    combo: childCombo,
    nesting: childNesting,
  });
}

async function executeRuntimeUnit(args: {
  body: Record<string, unknown>;
  unit: ResolvedComboUnit;
  allCombos: ComboCollectionLike;
  handleSingleModel: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  runCombo: RuntimeUnitRunner;
  baseOptions: HandleComboChatOptions;
  nesting: ComboNestingContext;
  failoverBeforeRetry: unknown;
  effectiveComboStrategy: string;
}): Promise<Response> {
  if (args.unit.kind === "model") {
    return executeModelUnit({
      body: args.body,
      unit: args.unit,
      handleSingleModel: args.handleSingleModel,
      isModelAvailable: args.isModelAvailable,
      failoverBeforeRetry: args.failoverBeforeRetry,
      effectiveComboStrategy: args.effectiveComboStrategy,
    });
  }
  return executeComboRefUnit({
    body: args.body,
    unit: args.unit,
    allCombos: args.allCombos,
    runCombo: args.runCombo,
    baseOptions: args.baseOptions,
    nesting: args.nesting,
  });
}

function orderUnitsForStrategy(strategy: string, units: ResolvedComboUnit[]): ResolvedComboUnit[] {
  if (strategy === "random") return shuffleUnits(units);
  if (strategy === "weighted") {
    const selected = selectWeightedUnit(units);
    if (!selected) return units;
    return [selected, ...units.filter((unit) => unit.executionKey !== selected.executionKey)];
  }
  return units;
}

export async function executeRuntimeUnitCombo(args: {
  body: Record<string, unknown>;
  combo: ComboLike;
  strategy: string;
  effectiveComboStrategy?: string;
  units: ResolvedComboUnit[];
  handleSingleModel: HandleSingleModel;
  isModelAvailable?: IsModelAvailable;
  log: ComboLogger;
  config: Record<string, unknown>;
  settings?: Record<string, unknown> | null;
  allCombos: ComboCollectionLike;
  signal?: AbortSignal | null;
  nesting: ComboNestingContext;
  baseOptions: HandleComboChatOptions;
  runCombo: RuntimeUnitRunner;
}): Promise<RuntimeUnitExecutionResult> {
  const maxRetries = Number(args.config.maxRetries ?? 1);
  const retryDelayMs = resolveDelayMs(args.config.retryDelayMs, 2000);
  const orderedUnits = orderUnitsForStrategy(args.strategy, args.units);
  const clientRequestedStream = args.body?.stream === true;
  const startTime = Date.now();
  const effectiveStrategy = args.effectiveComboStrategy ?? args.strategy;
  let lastResponse: Response | null = null;
  let fallbackCount = 0;

  for (const unit of orderedUnits) {
    for (let retry = 0; retry <= maxRetries; retry += 1) {
      if (args.signal?.aborted)
        return { response: errorResponse(499, "Client disconnected"), unit };
      args.nesting.attemptBudget.count += 1;
      if (args.nesting.attemptBudget.count > args.nesting.attemptBudget.limit) {
        return { response: errorResponse(503, "Maximum combo retry limit reached"), unit };
      }
      if (retry > 0) {
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      }
      args.log.info(
        "COMBO",
        `Trying ${unit.kind} ${unitDisplayName(unit)}${retry > 0 ? ` (retry ${retry})` : ""}`
      );
      const response = await executeRuntimeUnit({
        body: args.body,
        unit,
        allCombos: args.allCombos,
        handleSingleModel: args.handleSingleModel,
        isModelAvailable: args.isModelAvailable,
        runCombo: args.runCombo,
        baseOptions: args.baseOptions,
        nesting: args.nesting,
        failoverBeforeRetry: args.config.failoverBeforeRetry,
        effectiveComboStrategy: effectiveStrategy,
      });
      lastResponse = response;
      if (response.ok) {
        if (unit.kind === "combo-ref") {
          recordComboRequest(args.combo.name, null, {
            success: true,
            latencyMs: Date.now() - startTime,
            fallbackCount,
            strategy: effectiveStrategy,
            target: { executionKey: unit.executionKey, stepId: unit.stepId, label: unit.label },
          });
          return { response, unit };
        }
        const quality = await validateResponseQuality(
          response,
          clientRequestedStream,
          args.log,
          args.config.responseValidation as ResponseValidationConfig | undefined
        );
        if (quality.valid) {
          recordComboRequest(args.combo.name, unit.modelStr, {
            success: true,
            latencyMs: Date.now() - startTime,
            fallbackCount,
            strategy: effectiveStrategy,
            target: { executionKey: unit.executionKey, stepId: unit.stepId, label: unit.label },
          });
          return { response: quality.clonedResponse ?? response, unit };
        }
      }
      if (![408, 429, 500, 502, 503, 504].includes(response.status)) break;
    }
    fallbackCount += 1;
  }
  recordComboRequest(args.combo.name, null, {
    success: false,
    latencyMs: Date.now() - startTime,
    fallbackCount,
    strategy: effectiveStrategy,
  });
  return {
    response: lastResponse || errorResponse(503, "All nested combo units unavailable"),
    unit: null,
  };
}
