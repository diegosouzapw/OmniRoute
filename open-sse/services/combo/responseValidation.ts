/**
 * Feature 4985 — configurable response-body validation for combo routing.
 *
 * A combo can declare a `responseValidation` predicate. When an upstream returns 200 OK
 * but the parsed body fails the predicate, `validateResponseQuality` reports it as
 * invalid, which the combo orchestrator already treats exactly like an HTTP error
 * (skip this target → fail over to the next). All checks are declarative and safe:
 * substring matching (no regex / no ReDoS) and a bounded dot-path resolver (no eval).
 */

export type JsonPathCondition = "exists" | "nonEmpty" | "equals" | "notEquals";

export interface JsonPathPredicate {
  path: string;
  condition: JsonPathCondition;
  value?: string | number | boolean;
}

export interface ResponseValidationConfig {
  /** The assistant content must NOT contain any of these substrings. */
  forbiddenSubstrings?: string[];
  /** The assistant content must contain ALL of these substrings. */
  requiredSubstrings?: string[];
  /** The trimmed assistant content must be at least this many characters. */
  minContentLength?: number;
  /** Structural/value checks against the parsed JSON body (shape validation). */
  jsonPathPredicates?: JsonPathPredicate[];
}

export interface ResponseValidationResult {
  valid: boolean;
  reason?: string;
}

const MAX_REASON_SNIPPET = 60;

function snippet(value: string): string {
  return value.length > MAX_REASON_SNIPPET ? `${value.slice(0, MAX_REASON_SNIPPET)}…` : value;
}

/**
 * Parse a dot/bracket path (e.g. `choices[0].message.content`) into tokens with a
 * single bounded left-to-right scan — no regex, no backtracking, no eval.
 */
export function parseJsonPath(path: string): Array<string | number> {
  const tokens: Array<string | number> = [];
  let buf = "";
  const flush = () => {
    if (buf) {
      tokens.push(buf);
      buf = "";
    }
  };
  for (let i = 0; i < path.length; i++) {
    const ch = path[i];
    if (ch === ".") {
      flush();
    } else if (ch === "[") {
      flush();
      let inner = "";
      i++;
      while (i < path.length && path[i] !== "]") {
        inner += path[i];
        i++;
      }
      const trimmed = inner.trim();
      const n = Number(trimmed);
      tokens.push(trimmed !== "" && Number.isInteger(n) ? n : trimmed);
    } else {
      buf += ch;
    }
  }
  flush();
  return tokens;
}

/** Resolve a dot-path against a parsed JSON value. Returns `undefined` if any hop misses. */
export function resolveJsonPath(root: unknown, path: string): unknown {
  let current: unknown = root;
  for (const token of parseJsonPath(path)) {
    if (current === null || current === undefined) return undefined;
    if (typeof token === "number") {
      if (!Array.isArray(current)) return undefined;
      current = current[token];
    } else {
      if (typeof current !== "object") return undefined;
      current = (current as Record<string, unknown>)[token];
    }
  }
  return current;
}

function isNonEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value as object).length > 0;
  return Boolean(value);
}

function checkCondition(value: unknown, condition: JsonPathCondition, expected: unknown): boolean {
  switch (condition) {
    case "exists":
      return value !== undefined && value !== null;
    case "nonEmpty":
      return isNonEmpty(value);
    case "equals":
      return value === expected;
    case "notEquals":
      return value !== expected;
  }
}

/** Best-effort extraction of the assistant's text content from a chat/Responses body. */
export function extractContentText(json: unknown): string {
  if (!json || typeof json !== "object") return "";
  const obj = json as Record<string, unknown>;

  // Chat Completions: choices[].message.content (string or array of parts).
  const choices = obj.choices;
  if (Array.isArray(choices)) {
    const parts: string[] = [];
    for (const choice of choices) {
      const message = (choice as Record<string, unknown>)?.message as
        | Record<string, unknown>
        | undefined;
      const content = message?.content;
      if (typeof content === "string") parts.push(content);
      else if (Array.isArray(content)) {
        for (const part of content) {
          const text = (part as Record<string, unknown>)?.text;
          if (typeof text === "string") parts.push(text);
        }
      }
    }
    if (parts.length) return parts.join("");
  }

  // Anthropic Messages: accompanying text remains subject to the configured
  // substring predicates even if this response also contains a tool_use block.
  if (obj.type === "message" && obj.role === "assistant" && Array.isArray(obj.content)) {
    const parts = obj.content.filter((part) => part && typeof part === "object" &&
      (part as Record<string, unknown>).type === "text" && typeof (part as Record<string, unknown>).text === "string");
    if (parts.length) return parts.map((part) => (part as Record<string, string>).text).join("");
  }

  // Responses API: output[].content[].text
  const output = obj.output;
  if (Array.isArray(output)) {
    const parts: string[] = [];
    for (const item of output) {
      const content = (item as Record<string, unknown>)?.content;
      if (Array.isArray(content)) {
        for (const part of content) {
          const text = (part as Record<string, unknown>)?.text;
          if (typeof text === "string") parts.push(text);
        }
      }
    }
    if (parts.length) return parts.join("");
  }

  return "";
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validToolId(value: unknown): value is string {
  return typeof value === "string" && value.length <= 512 && /^[^\s\x00-\x1f\x7f]+$/.test(value);
}

function validToolName(value: unknown): boolean {
  return typeof value === "string" && /^[A-Za-z0-9_-]{1,128}$/.test(value);
}

function validJsonArguments(value: unknown): boolean {
  if (typeof value !== "string") return false;
  try {
    return isRecord(JSON.parse(value));
  } catch {
    return false;
  }
}

/**
 * Complete non-streaming function invocations are usable output without prose.
 * This exempts only minContentLength. Required/forbidden text and JSON-path
 * predicates still apply; malformed calls, deltas, results, and duplicates do not.
 */
function hasStructuredToolInvocation(json: unknown): boolean {
  if (!isRecord(json) || (json.error !== undefined && json.error !== null)) return false;

  const ids = new Set<string>();
  const uniqueId = (id: unknown): boolean => {
    if (!validToolId(id) || ids.has(id)) return false;
    ids.add(id);
    return true;
  };

  if (Array.isArray(json.choices)) {
    let found = false;
    for (const choice of json.choices) {
      if (!isRecord(choice) || !isRecord(choice.message)) continue;
      const message = choice.message;
      if (message.tool_calls === undefined) continue;
      if (choice.finish_reason !== undefined && choice.finish_reason !== "tool_calls") return false;
      if (message.role !== "assistant" || !Array.isArray(message.tool_calls) || message.tool_calls.length === 0) return false;
      for (const call of message.tool_calls) {
        if (!isRecord(call) || call.type !== "function" || !uniqueId(call.id)
          || !isRecord(call.function) || !validToolName(call.function.name)
          || !validJsonArguments(call.function.arguments)) return false;
        found = true;
      }
    }
    return found;
  }

  if (json.type === "message" && json.role === "assistant" && Array.isArray(json.content)) {
    if (json.stop_reason !== undefined && json.stop_reason !== "tool_use") return false;
    const calls = json.content.filter((part) => isRecord(part) && part.type === "tool_use");
    return calls.length > 0 && calls.every((call) => isRecord(call)
      && uniqueId(call.id) && validToolName(call.name) && isRecord(call.input));
  }

  if (json.object === "response" && Array.isArray(json.output)) {
    if (json.status !== undefined && json.status !== "completed" && json.status !== "done") return false;
    const calls = json.output.filter((item) => isRecord(item) && item.type === "function_call");
    return calls.length > 0 && calls.every((call) => isRecord(call)
      && uniqueId(call.call_id) && (call.id === undefined || validToolId(call.id))
      && validToolName(call.name) && validJsonArguments(call.arguments)
      && (call.status === undefined || call.status === "completed"));
  }

  return false;
}

/**
 * Evaluate the configured predicate against a parsed JSON response body.
 * Returns `{ valid: true }` when there is no config or all checks pass.
 */
export function evaluateResponseValidation(
  json: unknown,
  config: ResponseValidationConfig | undefined | null
): ResponseValidationResult {
  if (!config || typeof config !== "object") return { valid: true };

  const content = extractContentText(json);

  for (const sub of config.forbiddenSubstrings ?? []) {
    if (typeof sub === "string" && sub.length > 0 && content.includes(sub)) {
      return { valid: false, reason: `response contains forbidden substring "${snippet(sub)}"` };
    }
  }

  for (const sub of config.requiredSubstrings ?? []) {
    if (typeof sub === "string" && sub.length > 0 && !content.includes(sub)) {
      return { valid: false, reason: `response missing required substring "${snippet(sub)}"` };
    }
  }

  if (
    typeof config.minContentLength === "number" &&
    Number.isFinite(config.minContentLength) &&
    config.minContentLength > 0 &&
    content.trim().length < config.minContentLength &&
    !hasStructuredToolInvocation(json)
  ) {
    return {
      valid: false,
      reason: `response content shorter than ${config.minContentLength} chars`,
    };
  }

  for (const predicate of config.jsonPathPredicates ?? []) {
    if (!predicate || typeof predicate.path !== "string" || !predicate.path) continue;
    const resolved = resolveJsonPath(json, predicate.path);
    if (!checkCondition(resolved, predicate.condition, predicate.value)) {
      return {
        valid: false,
        reason: `jsonpath check failed: "${snippet(predicate.path)}" ${predicate.condition}`,
      };
    }
  }

  return { valid: true };
}
