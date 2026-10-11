// Nonce binding, schema validation and malformed-envelope detection for DeepSeek Web tool
// calls (#15448). Split from deepseekWebTools.ts so the parser stays under its size cap;
// deepseekWebTools.ts re-exports the public detectors.

import Ajv2020, { type ValidateFunction } from "ajv/dist/2020.js";

import {
  getRequestedToolNames,
  getToolNonce,
  parseLooseJsonObject,
  resolveRequestedToolName,
  type OpenAIToolCall,
} from "./webTools.ts";

export interface OpenAIToolDef {
  type?: string;
  function?: { name?: string; description?: string; parameters?: unknown };
}

const ajv = new Ajv2020({ strict: false, allErrors: false, validateFormats: false });
const toolValidatorCache = new WeakMap<object, Map<string, ValidateFunction | null>>();

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function requestedToolDefinition(requestedTools: unknown, name: string): OpenAIToolDef | null {
  if (!Array.isArray(requestedTools)) return null;
  return (requestedTools as OpenAIToolDef[]).find((tool) => tool?.function?.name === name) ?? null;
}

export function validateToolArguments(
  requestedTools: unknown,
  name: string,
  args: Record<string, unknown>
): boolean {
  const definition = requestedToolDefinition(requestedTools, name);
  if (!definition) return false;
  const schema = definition.function?.parameters;
  if (schema === undefined) return true;
  if ((typeof schema !== "object" || schema === null) && typeof schema !== "boolean") return false;

  let validators = toolValidatorCache.get(requestedTools as object);
  if (!validators) {
    validators = new Map();
    toolValidatorCache.set(requestedTools as object, validators);
  }
  let validate = validators.get(name);
  if (validate === undefined) {
    try {
      validate = ajv.compile(schema as object | boolean);
    } catch {
      validate = null;
    }
    validators.set(name, validate);
  }
  return validate ? validate(args) === true : false;
}

/**
 * Binding-aware finaliser for the shared tag/DSML path.
 *
 * `finalizeParsedToolCalls` holds every call to the full nonce + schema contract, which is correct
 * for the shapes this fork parses but rejects upstream's nameless `<tool>`/`<parameter>` shape that
 * carries no JSON body to bind. This variant applies the full contract only to calls whose
 * ARGUMENTS carry `_nonce`, and leaves the rest to upstream's own policy. Note the canonical
 * `<tool>{"name",…,"_nonce"}</tool>` envelope puts `_nonce` at the envelope top level: the shared
 * webTools parser checks it there (only when present) and strips it, so those calls reach this
 * function without `_nonce` and are NOT schema-validated.
 */
export function finalizeBoundCalls(
  rawText: string,
  parsed: { content: string; toolCalls: OpenAIToolCall[] | null },
  requestedTools: unknown
): { content: string; toolCalls: OpenAIToolCall[] | null } {
  if (!parsed.toolCalls) return parsed;
  const nonce = getToolNonce(requestedTools);
  const cleaned: OpenAIToolCall[] = [];
  for (const call of parsed.toolCalls) {
    const args = parseLooseJsonObject(call.function.arguments);
    if (!args) return { content: rawText, toolCalls: null };
    if (!("_nonce" in args)) {
      cleaned.push(call);
      continue;
    }
    if (args._nonce !== nonce) return { content: rawText, toolCalls: null };
    const { _nonce: _boundNonce, ...rest } = args;
    if (!validateToolArguments(requestedTools, call.function.name, rest)) {
      return { content: rawText, toolCalls: null };
    }
    cleaned.push({ ...call, function: { ...call.function, arguments: JSON.stringify(rest) } });
  }
  return { content: parsed.content, toolCalls: cleaned };
}

export function finalizeParsedToolCalls(
  rawText: string,
  parsed: { content: string; toolCalls: OpenAIToolCall[] | null },
  requestedTools: unknown
): { content: string; toolCalls: OpenAIToolCall[] | null } {
  if (!parsed.toolCalls) return parsed;
  const nonce = getToolNonce(requestedTools);
  const cleaned: OpenAIToolCall[] = [];

  for (const call of parsed.toolCalls) {
    const args = parseLooseJsonObject(call.function.arguments);
    if (!args) return { content: rawText, toolCalls: null };
    const nestedNonce = args._nonce;
    if (nestedNonce !== undefined && nestedNonce !== nonce) {
      return { content: rawText, toolCalls: null };
    }
    const { _nonce: _boundNonce, ...cleanArgs } = args;
    if (!validateToolArguments(requestedTools, call.function.name, cleanArgs)) {
      return { content: rawText, toolCalls: null };
    }
    cleaned.push({
      ...call,
      function: { ...call.function, arguments: JSON.stringify(cleanArgs) },
    });
  }

  return { content: parsed.content, toolCalls: cleaned };
}

export function hasMalformedDeepSeekToolMarkup(text: string): boolean {
  if (typeof text !== "string" || !text.trim()) return false;
  // `\s*`: DeepSeek emits both `<|DSML| invoke` and the no-space `<|DSML|invoke`.
  if (/<\/?(?:｜｜|\|\|?)DSML(?:｜｜|\|\|?)\s*(?:calls|invoke|parameter)\b/i.test(text)) {
    return true;
  }
  return /<\/?(?:tool|tool_call)(?::|\s|>)/i.test(text);
}

/** True only for output shapes that express tool intent but failed safe parsing. */
export function hasMalformedDeepSeekToolIntent(text: string, requestedTools: unknown): boolean {
  if (hasMalformedDeepSeekToolMarkup(text)) return true;
  if (typeof text !== "string" || !text.trim()) return false;

  const parsed = parseLooseJsonObject(text);
  if (!parsed || parsed.arguments === undefined) return false;
  const emittedName =
    [parsed.name, parsed.command].find(
      (value): value is string => typeof value === "string" && value.length > 0
    ) ?? null;
  return (
    !!emittedName && !!resolveRequestedToolName(emittedName, getRequestedToolNames(requestedTools))
  );
}
