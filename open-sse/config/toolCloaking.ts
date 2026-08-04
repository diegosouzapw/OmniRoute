type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/**
 * Recursively strip `enumDescriptions` from a JSON schema.
 *
 * VSCode Copilot emits `enumDescriptions` inside tool parameter schemas, but the
 * Antigravity API rejects any request carrying that field with HTTP 400. Walk the
 * entire value tree so the field is removed from composition keywords (`anyOf`,
 * `allOf`, `oneOf`), `$defs`, `additionalProperties`, and future schema shapes too.
 */
export function stripEnumDescriptions(schema: unknown): unknown {
  if (!schema || typeof schema !== "object") return schema;

  if (Array.isArray(schema)) {
    return schema.map((entry) => stripEnumDescriptions(entry));
  }

  const result: JsonRecord = {};
  for (const [key, value] of Object.entries(schema as JsonRecord)) {
    if (key !== "enumDescriptions") {
      result[key] = stripEnumDescriptions(value);
    }
  }

  return result;
}

/**
 * Sanitize Antigravity tool schemas without changing client-declared tool identity.
 *
 * Declaration order, declaration names, historical function calls, function responses,
 * tool configuration, and non-function tools are preserved. Only schema fields rejected
 * by Cloud Code are removed.
 */
export function sanitizeAntigravityToolPayload<T extends JsonRecord>(body: T): T {
  const request = asRecord(body.request);
  if (!request || !Array.isArray(request.tools)) {
    return body;
  }

  let changed = false;
  const tools = request.tools.map((toolValue) => {
    const tool = asRecord(toolValue);
    if (!tool || !Array.isArray(tool.functionDeclarations)) {
      return toolValue;
    }

    let declarationsChanged = false;
    const functionDeclarations = tool.functionDeclarations.map((declarationValue) => {
      const declaration = asRecord(declarationValue);
      if (!declaration || declaration.parameters === undefined) {
        return declarationValue;
      }

      declarationsChanged = true;
      return {
        ...declaration,
        parameters: stripEnumDescriptions(declaration.parameters),
      };
    });

    if (!declarationsChanged) {
      return toolValue;
    }

    changed = true;
    return { ...tool, functionDeclarations };
  });

  if (!changed) {
    return body;
  }

  return {
    ...body,
    request: {
      ...request,
      tools,
    },
  };
}
