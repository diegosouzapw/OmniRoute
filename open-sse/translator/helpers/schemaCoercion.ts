import {
  isDeepSeekReasoningModel,
  requiresReasoningReplay,
} from "../../services/reasoningCache.ts";

/**
 * Shared sanitizers for tool payloads that arrive from IDEs/SDKs with
 * JSON Schema numeric constraints encoded as strings or invalid descriptions.
 */

type JsonRecord = Record<string, unknown>;

const NUMERIC_SCHEMA_FIELDS = [
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "minLength",
  "maxLength",
  "minItems",
  "maxItems",
  "minProperties",
  "maxProperties",
  "multipleOf",
] as const;

// Fix (9router#1556): OpenAI/Codex's Responses API rejects JSON Schema `pattern`
// values that use regex lookaround (lookahead/lookbehind) with
// "Invalid JSON schema: regex lookaround is not supported.". IDE/SDK agent
// harnesses commonly emit lookahead patterns (e.g. `^(?=.*@).+$`), so any
// `pattern` field containing `(?=`, `(?!`, `(?<=`, or `(?<!` must be dropped
// before the schema reaches the Codex/OpenAI upstream.
const REGEX_LOOKAROUND_PATTERN = /\(\?<?[=!]/;

function hasUnsupportedRegexLookaround(pattern: unknown): boolean {
  return typeof pattern === "string" && REGEX_LOOKAROUND_PATTERN.test(pattern);
}

function isPlainObject(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasOwn(obj: JsonRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function keepOpaqueObjectSchemasOpen(schema: JsonRecord): void {
  if (hasOwn(schema, "additionalProperties")) return;

  const properties = schema.properties;
  const isObjectSchema = schema.type === "object" || isPlainObject(properties);
  if (!isObjectSchema) return;

  if (properties === undefined) {
    schema.properties = {};
    schema.additionalProperties = true;
  } else if (isPlainObject(properties) && Object.keys(properties).length === 0) {
    schema.additionalProperties = true;
  }
}

function coerceNumericString(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (trimmed.length === 0) return value;

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : value;
}

function mapRecordValues(record: JsonRecord): JsonRecord {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, coerceSchemaNumericFields(value)])
  );
}

function sanitizeDescriptionValue(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (value === null) return "";
  return typeof value === "string" ? value : String(value);
}

export function coerceSchemaNumericFields(schema: unknown): unknown {
  if (Array.isArray(schema)) {
    return schema.map((entry) => coerceSchemaNumericFields(entry));
  }
  if (!isPlainObject(schema)) return schema;

  const result: JsonRecord = { ...schema };

  // Fix #1782: Strip 'default' property to prevent upstream models from eagerly injecting optional fields
  if ("default" in result) {
    delete result.default;
  }

  // Fix (9router#1556): drop unsupported regex lookaround from `pattern`.
  if (hasUnsupportedRegexLookaround(result.pattern)) {
    delete result.pattern;
  }

  for (const field of NUMERIC_SCHEMA_FIELDS) {
    if (field in result) {
      result[field] = coerceNumericString(result[field]);
    }
  }

  if (isPlainObject(result.properties)) {
    result.properties = mapRecordValues(result.properties);
  }
  if (isPlainObject(result.patternProperties)) {
    result.patternProperties = mapRecordValues(result.patternProperties);
  }
  if (isPlainObject(result.definitions)) {
    result.definitions = mapRecordValues(result.definitions);
  }
  if (isPlainObject(result.$defs)) {
    result.$defs = mapRecordValues(result.$defs);
  }
  if (isPlainObject(result.dependentSchemas)) {
    result.dependentSchemas = mapRecordValues(result.dependentSchemas);
  }

  if (result.items !== undefined) {
    result.items = coerceSchemaNumericFields(result.items);
  }
  if (result.additionalProperties && typeof result.additionalProperties === "object") {
    result.additionalProperties = coerceSchemaNumericFields(result.additionalProperties);
  }
  if (result.unevaluatedProperties && typeof result.unevaluatedProperties === "object") {
    result.unevaluatedProperties = coerceSchemaNumericFields(result.unevaluatedProperties);
  }
  if (Array.isArray(result.prefixItems)) {
    result.prefixItems = result.prefixItems.map((entry) => coerceSchemaNumericFields(entry));
  }
  if (Array.isArray(result.anyOf)) {
    result.anyOf = result.anyOf.map((entry) => coerceSchemaNumericFields(entry));
  }
  if (Array.isArray(result.oneOf)) {
    result.oneOf = result.oneOf.map((entry) => coerceSchemaNumericFields(entry));
  }
  if (Array.isArray(result.allOf)) {
    result.allOf = result.allOf.map((entry) => coerceSchemaNumericFields(entry));
  }
  if (isPlainObject(result.not)) {
    result.not = coerceSchemaNumericFields(result.not);
  }
  if (isPlainObject(result.if)) {
    result.if = coerceSchemaNumericFields(result.if);
  }
  if (isPlainObject(result.then)) {
    result.then = coerceSchemaNumericFields(result.then);
  }
  if (isPlainObject(result.else)) {
    result.else = coerceSchemaNumericFields(result.else);
  }

  keepOpaqueObjectSchemasOpen(result);

  return result;
}

// Sub-schema maps keyed by property name (each value is itself walked recursively).
const REGEX_STRIP_OBJECT_MAP_FIELDS = [
  "properties",
  "patternProperties",
  "definitions",
  "$defs",
] as const;

// Sub-schema lists (each entry is itself walked recursively).
const REGEX_STRIP_ARRAY_MAP_FIELDS = ["prefixItems", "anyOf", "oneOf", "allOf"] as const;

/** Recursively strips unsupported regex lookaround from every value of an object map field. */
function stripRegexFromObjectMap(record: JsonRecord): JsonRecord {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, stripUnsupportedRegexPatterns(value)])
  );
}

/**
 * Strip regex `pattern` constraints that use lookaround (lookahead/lookbehind),
 * which OpenAI/Codex's Responses API rejects outright with a 400
 * ("Invalid JSON schema: regex lookaround is not supported."). Walks the same
 * JSON Schema shape as `coerceSchemaNumericFields` (properties, items,
 * anyOf/oneOf/allOf, $defs/definitions, etc). See 9router#1556.
 */
export function stripUnsupportedRegexPatterns(schema: unknown): unknown {
  if (Array.isArray(schema)) {
    return schema.map((entry) => stripUnsupportedRegexPatterns(entry));
  }
  if (!isPlainObject(schema)) return schema;

  const result: JsonRecord = { ...schema };

  if (hasUnsupportedRegexLookaround(result.pattern)) {
    delete result.pattern;
  }

  for (const field of REGEX_STRIP_OBJECT_MAP_FIELDS) {
    if (isPlainObject(result[field])) {
      result[field] = stripRegexFromObjectMap(result[field]);
    }
  }

  for (const field of REGEX_STRIP_ARRAY_MAP_FIELDS) {
    if (Array.isArray(result[field])) {
      result[field] = (result[field] as unknown[]).map((entry) =>
        stripUnsupportedRegexPatterns(entry)
      );
    }
  }

  if (result.items !== undefined) {
    result.items = stripUnsupportedRegexPatterns(result.items);
  }
  if (result.additionalProperties && typeof result.additionalProperties === "object") {
    result.additionalProperties = stripUnsupportedRegexPatterns(result.additionalProperties);
  }
  if (isPlainObject(result.not)) {
    result.not = stripUnsupportedRegexPatterns(result.not);
  }

  return result;
}

export function sanitizeToolDescription(tool: unknown): unknown {
  if (!isPlainObject(tool)) return tool;

  const result: JsonRecord = { ...tool };

  if (isPlainObject(result.function) && "description" in result.function) {
    const description = sanitizeDescriptionValue(result.function.description);
    if (description !== undefined) {
      result.function = { ...result.function, description };
    }
  }

  if (!isPlainObject(result.function) && "description" in result) {
    const description = sanitizeDescriptionValue(result.description);
    if (description !== undefined) {
      result.description = description;
    }
  }

  if (Array.isArray(result.functionDeclarations)) {
    result.functionDeclarations = result.functionDeclarations.map((declaration) => {
      if (!isPlainObject(declaration) || !("description" in declaration)) return declaration;
      const description = sanitizeDescriptionValue(declaration.description);
      return description === undefined ? declaration : { ...declaration, description };
    });
  }

  return result;
}

export function coerceToolSchemas(tools: unknown): unknown {
  if (!Array.isArray(tools)) return tools;

  return tools.map((tool) => {
    if (!isPlainObject(tool)) return tool;

    const result: JsonRecord = { ...tool };

    if (isPlainObject(result.function) && "parameters" in result.function) {
      result.function = {
        ...result.function,
        parameters: coerceSchemaNumericFields(result.function.parameters),
      };
    }

    if (result.input_schema !== undefined) {
      result.input_schema = coerceSchemaNumericFields(result.input_schema);
    }

    if ("parameters" in result && !isPlainObject(result.function)) {
      result.parameters = coerceSchemaNumericFields(result.parameters);
    }

    if (Array.isArray(result.functionDeclarations)) {
      result.functionDeclarations = result.functionDeclarations.map((declaration) => {
        if (!isPlainObject(declaration) || !("parameters" in declaration)) return declaration;
        return {
          ...declaration,
          parameters: coerceSchemaNumericFields(declaration.parameters),
        };
      });
    }

    return result;
  });
}

// #7023 — Responses API strict mode forces every "optional" tool property into
// `required`, so a model that intends to OMIT an optional enum property (no declared
// `default`) must still emit a concrete value (e.g. Agent.isolation:"remote"). Neither
// #6992 op (drop-if-default / drop-if-empty) can catch this, so we widen such properties
// to accept `null` on the request side (OpenAI's own documented nullable-union idiom for
// this exact strict-mode limitation) and drop the key response-side when the model emits
// `null` (see pureHelpers.ts::isDroppableNullEntry). Scope: top-level
// `properties[key].enum` only — does not recurse into `items`/`anyOf`/`oneOf` branches
// (no real-world case beyond Agent.isolation is documented; extend with a concrete repro).
function shouldInjectNullOmission(key: string, propSchema: unknown, required: Set<string>): boolean {
  return (
    isPlainObject(propSchema) &&
    Array.isArray(propSchema.enum) &&
    !required.has(key) &&
    !hasOwn(propSchema, "default")
  );
}

function widenPropertyForNullOmission(propSchema: JsonRecord): JsonRecord {
  const widened: JsonRecord = { ...propSchema };
  const enumValues = propSchema.enum as unknown[];
  widened.enum = enumValues.includes(null) ? enumValues : [...enumValues, null];
  if (typeof propSchema.type === "string") {
    widened.type = [propSchema.type, "null"];
  } else if (Array.isArray(propSchema.type) && !propSchema.type.includes("null")) {
    widened.type = [...propSchema.type, "null"];
  }
  const note = "null = omit this parameter";
  widened.description =
    typeof propSchema.description === "string" && propSchema.description.length > 0
      ? `${propSchema.description} (${note})`
      : note;
  return widened;
}

export function injectOptionalEnumOmissionSentinel(schema: unknown): unknown {
  if (!isPlainObject(schema) || !isPlainObject(schema.properties)) return schema;

  const required = new Set(Array.isArray(schema.required) ? schema.required : []);
  let changed = false;
  const nextProperties: JsonRecord = { ...schema.properties };

  for (const [key, propSchema] of Object.entries(schema.properties)) {
    if (!shouldInjectNullOmission(key, propSchema, required)) continue;
    nextProperties[key] = widenPropertyForNullOmission(propSchema as JsonRecord);
    changed = true;
  }

  if (!changed) return schema;
  return { ...schema, properties: nextProperties };
}

export function injectOptionalEnumOmissionForTools(tools: unknown): unknown {
  if (!Array.isArray(tools)) return tools;

  return tools.map((tool) => {
    if (!isPlainObject(tool)) return tool;

    const result: JsonRecord = { ...tool };
    if ("parameters" in result && !isPlainObject(result.function)) {
      result.parameters = injectOptionalEnumOmissionSentinel(result.parameters);
    }
    return result;
  });
}

export function sanitizeToolDescriptions(tools: unknown): unknown {
  if (!Array.isArray(tools)) return tools;
  return tools.map((tool) => sanitizeToolDescription(tool));
}

export function sanitizeToolId(id: string | undefined): string {
  if (!id) return `tool_${crypto.randomUUID().replace(/-/g, "_")}`;
  const sanitized = id.replace(/[^a-zA-Z0-9_-]/g, "_");
  return sanitized || `tool_${crypto.randomUUID().replace(/-/g, "_")}`;
}

export function injectEmptyReasoningContentForToolCalls(
  messages: unknown,
  provider: unknown,
  model: unknown
): unknown {
  const normalizedProvider = String(provider ?? "");
  const normalizedModel = String(model ?? "");

  // Check if this provider/model requires reasoning replay (DeepSeek V4, Kimi K2, etc.)
  const needsReasoning = requiresReasoningReplay({
    provider: normalizedProvider,
    model: normalizedModel,
    thinkingEnabled: true,
  });

  if (!Array.isArray(messages) || !needsReasoning) {
    return messages;
  }

  return messages.map((message) => {
    if (!isPlainObject(message)) return message;
    if (
      message.role !== "assistant" ||
      !Array.isArray(message.tool_calls) ||
      message.tool_calls.length === 0 ||
      message.reasoning_content !== undefined
    ) {
      return message;
    }

    return { ...message, reasoning_content: "" };
  });
}

/**
 * Anthropic's first-party Messages API strictly validates tool `input_schema`
 * against JSON Schema draft 2020-12. IDE/SDK agent harnesses that deep-truncate
 * their schemas emit invalid constructs — most commonly an array keyword
 * (`enum`, `required`, …) replaced by a placeholder string such as
 * `"[MaxDepth]"`, or an index-keyed object (`{"0":"a","1":"b"}`) where an array
 * is expected. Anthropic rejects these with
 * `tools.N.custom.input_schema: JSON schema is invalid` (surfaced as a
 * misleading `400 out of extra usage` placeholder when streaming). Non-Anthropic
 * targets (OpenAI/Codex) tolerate them, which is why the same request succeeds
 * on a fallback provider. This sanitizer coerces or drops the invalid
 * constructs so legitimate native-Claude-OAuth traffic is not spuriously
 * rejected. See Spec E (Claude Code OAuth wire compatibility).
 */
const SCHEMA_PLACEHOLDER_PATTERN = /^\[(?:MaxDepth|Truncated|Circular|Object|Array)\]$/;
const ARRAY_SCHEMA_KEYS = ["enum", "required", "anyOf", "oneOf", "allOf", "prefixItems"];
const SCHEMA_ARRAY_OF_SCHEMAS = new Set(["anyOf", "oneOf", "allOf", "prefixItems"]);
const SCHEMA_SLOT_KEYS = [
  "items",
  "additionalProperties",
  "propertyNames",
  "contains",
  "not",
  "if",
  "then",
  "else",
  "unevaluatedProperties",
  "additionalItems",
];

function coerceIndexedObjectToArray(value: unknown): unknown[] | null {
  if (Array.isArray(value)) return value;
  if (isPlainObject(value)) {
    const keys = Object.keys(value);
    if (keys.length > 0 && keys.every((key, index) => String(index) === key)) {
      return keys.map((key) => value[key]);
    }
  }
  return null;
}

function isSchemaPlaceholder(value: unknown): boolean {
  return typeof value === "string" && SCHEMA_PLACEHOLDER_PATTERN.test(value.trim());
}

export function stripInvalidSchemaConstructs(schema: unknown): unknown {
  if (Array.isArray(schema)) {
    return schema.map((entry) => stripInvalidSchemaConstructs(entry));
  }
  if (!isPlainObject(schema)) {
    return isSchemaPlaceholder(schema) ? {} : schema;
  }

  const result: JsonRecord = {};
  for (const [key, value] of Object.entries(schema)) {
    // Coerce string-encoded numeric constraints (e.g. minimum: "5") to numbers —
    // Anthropic rejects the string form. Done here so the Claude sanitizer covers
    // every slot this function recurses into (incl. contains / propertyNames /
    // additionalItems, which coerceSchemaNumericFields does not visit).
    if ((NUMERIC_SCHEMA_FIELDS as readonly string[]).includes(key)) {
      result[key] = coerceNumericString(value);
      continue;
    }
    if (ARRAY_SCHEMA_KEYS.includes(key)) {
      const array = coerceIndexedObjectToArray(value);
      if (array === null) continue; // drop invalid non-array keyword (e.g. enum: "[MaxDepth]")
      result[key] = SCHEMA_ARRAY_OF_SCHEMAS.has(key)
        ? array.map((entry) => stripInvalidSchemaConstructs(entry))
        : array;
      continue;
    }
    if (SCHEMA_SLOT_KEYS.includes(key)) {
      // Boolean schemas are valid in JSON Schema (e.g. `additionalProperties: false`
      // locks down the object); coercing to {} would silently allow extras and
      // invite the model to hallucinate arguments. Only placeholder strings
      // (e.g. "[MaxDepth]") get replaced with the permissive {}.
      if (isPlainObject(value) || Array.isArray(value)) {
        result[key] = stripInvalidSchemaConstructs(value);
      } else if (typeof value === "boolean") {
        result[key] = value;
      } else if (isSchemaPlaceholder(value)) {
        result[key] = {};
      } else {
        result[key] = value;
      }
      continue;
    }
    if (key === "const") {
      if (isSchemaPlaceholder(value)) continue;
      result[key] = value;
      continue;
    }
    if (key === "properties" && isPlainObject(value)) {
      const properties: JsonRecord = {};
      for (const [propName, propSchema] of Object.entries(value)) {
        // Same boolean-preservation rule as SCHEMA_SLOT_KEYS above:
        // `{ properties: { onlyAdminCanSet: false } }` is a valid permission
        // gate and must not be silently turned into the permissive {}.
        if (isPlainObject(propSchema) || Array.isArray(propSchema)) {
          properties[propName] = stripInvalidSchemaConstructs(propSchema);
        } else if (typeof propSchema === "boolean") {
          properties[propName] = propSchema;
        } else if (isSchemaPlaceholder(propSchema)) {
          properties[propName] = {};
        } else {
          properties[propName] = propSchema;
        }
      }
      result[key] = properties;
      continue;
    }
    if (
      (key === "$defs" ||
        key === "definitions" ||
        key === "patternProperties" ||
        key === "dependentSchemas") &&
      isPlainObject(value)
    ) {
      const defs: JsonRecord = {};
      for (const [defName, defSchema] of Object.entries(value)) {
        defs[defName] = stripInvalidSchemaConstructs(defSchema);
      }
      result[key] = defs;
      continue;
    }
    // Placeholders are only coerced to {} in subschema-expecting positions
    // (handled in the branches above). A placeholder in a scalar annotation
    // keyword (description / title / pattern / format) must stay scalar —
    // turning it into {} is itself invalid draft-2020-12 and would re-trigger
    // the very 400 this sanitizer prevents.
    result[key] =
      isPlainObject(value) || Array.isArray(value) ? stripInvalidSchemaConstructs(value) : value;
  }
  return result;
}

export function sanitizeClaudeToolSchema(schema: unknown): unknown {
  // stripInvalidSchemaConstructs now also coerces numeric-string constraints, so
  // it is the single pass for the Claude path. We deliberately do NOT compose
  // coerceSchemaNumericFields: it strips the valid `default` keyword (Fix #1782,
  // a translator concern) which on the native / passthrough surface would
  // silently alter tool schemas that were previously forwarded verbatim.
  return stripInvalidSchemaConstructs(schema);
}

export function sanitizeClaudeToolSchemas(tools: unknown): unknown {
  if (!Array.isArray(tools)) return tools;
  return tools.map((tool) => {
    if (!isPlainObject(tool) || tool.input_schema === undefined) return tool;
    return { ...tool, input_schema: sanitizeClaudeToolSchema(tool.input_schema) };
  });
}
