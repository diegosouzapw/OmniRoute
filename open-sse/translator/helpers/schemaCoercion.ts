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

function isPlainObject(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
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
  provider: unknown
): unknown {
  if (!Array.isArray(messages) || String(provider || "").toLowerCase() !== "deepseek") {
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
