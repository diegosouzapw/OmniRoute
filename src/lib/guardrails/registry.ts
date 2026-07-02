import { BaseGuardrail, type GuardrailContext, type GuardrailExecutionResult } from "./base";
import { PIIMaskerGuardrail } from "./piiMasker";
import { PromptInjectionGuardrail } from "./promptInjection";
import { VisionBridgeGuardrail } from "./visionBridge";

type HeadersLike = Headers | Record<string, unknown> | null | undefined;

function isHeaderStore(headers: HeadersLike): headers is Headers {
  return Boolean(headers && typeof (headers as Headers).get === "function");
}

function getHeaderValue(headers: HeadersLike, name: string) {
  if (!headers) return null;
  if (isHeaderStore(headers)) return headers.get(name);

  const lowered = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() !== lowered || typeof value !== "string") continue;
    return value;
  }

  return null;
}

function normalizeGuardrailName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");
}

function coerceDisabledGuardrails(value: unknown) {
  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => normalizeGuardrailName(entry))
      .filter(Boolean);
  }

  if (!Array.isArray(value)) return [];

  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => normalizeGuardrailName(entry))
    .filter(Boolean);
}

function getGuardrailLogger(context: GuardrailContext) {
  return context.log || console;
}

export function resolveDisabledGuardrails({
  apiKeyInfo,
  body,
  headers,
}: {
  apiKeyInfo?: Record<string, unknown> | null;
  body?: unknown;
  headers?: HeadersLike;
}): string[] {
  const bodyRecord = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const metadata =
    bodyRecord?.metadata && typeof bodyRecord.metadata === "object"
      ? (bodyRecord.metadata as Record<string, unknown>)
      : null;
  const apiKeyDisabled =
    apiKeyInfo && typeof apiKeyInfo === "object"
      ? (apiKeyInfo as Record<string, unknown>).disabledGuardrails
      : undefined;
  const headerDisabled =
    getHeaderValue(headers, "x-omniroute-disabled-guardrails") ||
    getHeaderValue(headers, "x-disabled-guardrails");

  return [...coerceDisabledGuardrails(apiKeyDisabled)]
    .concat(coerceDisabledGuardrails(bodyRecord?.disabledGuardrails))
    .concat(coerceDisabledGuardrails(metadata?.disabledGuardrails))
    .concat(coerceDisabledGuardrails(headerDisabled))
    .filter((value, index, list) => list.indexOf(value) === index);
}

export class GuardrailRegistry {
  private guardrails: BaseGuardrail[] = [];

  register(guardrail: BaseGuardrail) {
    if (!(guardrail instanceof BaseGuardrail)) {
      throw new Error("Guardrail must extend BaseGuardrail");
    }

    this.guardrails = this.guardrails.filter(
      (existing) => normalizeGuardrailName(existing.name) !== normalizeGuardrailName(guardrail.name)
    );
    this.guardrails.push(guardrail);
    this.guardrails.sort((left, right) => left.priority - right.priority);
    return guardrail;
  }

  clear() {
    this.guardrails = [];
  }

  list() {
    return [...this.guardrails];
  }

  private isDisabled(guardrail: BaseGuardrail, context: GuardrailContext) {
    const disabled = new Set(
      (context.disabledGuardrails || []).map((entry) => normalizeGuardrailName(entry))
    );
    return disabled.has(normalizeGuardrailName(guardrail.name));
  }

  async runPreCallHooks<TPayload = unknown>(payload: TPayload, context: GuardrailContext = {}) {
    const logger = getGuardrailLogger(context);
    const results: GuardrailExecutionResult[] = [];
    let currentPayload = payload;

    for (const guardrail of this.guardrails) {
      if (!guardrail.enabled || this.isDisabled(guardrail, context)) {
        results.push({
          blocked: false,
          guardrail: guardrail.name,
          modified: false,
          skipped: true,
          stage: "pre",
        });
        continue;
      }

      try {
        const result = await guardrail.preCall(currentPayload, context);
        const modified = result?.modifiedPayload !== undefined;
        const meta = result?.meta || null;

        if (modified) {
          currentPayload = result?.modifiedPayload as TPayload;
        }

        const execution: GuardrailExecutionResult = {
          blocked: result?.block === true,
          guardrail: guardrail.name,
          message: result?.message,
          meta,
          modified,
          skipped: false,
          stage: "pre",
        };
        results.push(execution);

        logger.debug?.(
          "GUARDRAIL",
          `${guardrail.name} pre-call ${execution.blocked ? "blocked" : modified ? "modified" : "passed"}`,
          meta || undefined
        );

        if (execution.blocked) {
          return {
            blocked: true,
            guardrail: guardrail.name,
            message: result?.message,
            payload: currentPayload,
            results,
          };
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        results.push({
          blocked: false,
          error: message,
          guardrail: guardrail.name,
          modified: false,
          skipped: false,
          stage: "pre",
        });
        logger.warn?.("GUARDRAIL", `${guardrail.name} pre-call failed open`, { error: message });
      }
    }

    return {
      blocked: false,
      payload: currentPayload,
      results,
    };
  }

  async runPostCallHooks<TResponse = unknown>(response: TResponse, context: GuardrailContext = {}) {
    const logger = getGuardrailLogger(context);
    const results: GuardrailExecutionResult[] = [];
    let currentResponse = response;

    for (const guardrail of this.guardrails) {
      if (!guardrail.enabled || this.isDisabled(guardrail, context)) {
        results.push({
          blocked: false,
          guardrail: guardrail.name,
          modified: false,
          skipped: true,
          stage: "post",
        });
        continue;
      }

      try {
        const result = await guardrail.postCall(currentResponse, context);
        const modified = result?.modifiedResponse !== undefined;
        const meta = result?.meta || null;

        if (modified) {
          currentResponse = result?.modifiedResponse as TResponse;
        }

        const execution: GuardrailExecutionResult = {
          blocked: result?.block === true,
          guardrail: guardrail.name,
          message: result?.message,
          meta,
          modified,
          skipped: false,
          stage: "post",
        };
        results.push(execution);

        logger.debug?.(
          "GUARDRAIL",
          `${guardrail.name} post-call ${execution.blocked ? "blocked" : modified ? "modified" : "passed"}`,
          meta || undefined
        );

        if (execution.blocked) {
          return {
            blocked: true,
            guardrail: guardrail.name,
            message: result?.message,
            response: currentResponse,
            results,
          };
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        results.push({
          blocked: false,
          error: message,
          guardrail: guardrail.name,
          modified: false,
          skipped: false,
          stage: "post",
        });
        logger.warn?.("GUARDRAIL", `${guardrail.name} post-call failed open`, { error: message });
      }
    }

    return {
      blocked: false,
      response: currentResponse,
      results,
    };
  }
}

export const guardrailRegistry = new GuardrailRegistry();

let defaultGuardrailsRegistered = false;

export function registerDefaultGuardrails() {
  if (defaultGuardrailsRegistered) return guardrailRegistry;

  guardrailRegistry.register(new VisionBridgeGuardrail());
  guardrailRegistry.register(new PIIMaskerGuardrail());
  guardrailRegistry.register(new PromptInjectionGuardrail());
  defaultGuardrailsRegistered = true;

  return guardrailRegistry;
}

export function resetGuardrailsForTests({ registerDefaults = true } = {}) {
  guardrailRegistry.clear();
  defaultGuardrailsRegistered = false;
  if (registerDefaults) {
    registerDefaultGuardrails();
  }
}

registerDefaultGuardrails();
