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
    content.trim().length < config.minContentLength
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
