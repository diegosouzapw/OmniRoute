/**
 * Sanitize OpenAI-format tool definitions for strict upstream JSON Schema
 * validators (e.g. Moonshot AI behind opencode-go/kimi-k2.6).
 *
 * The concrete bug this was written for: ForgeCode emits enum schemas like
 *   { type: "string", enum: ["a", "b", "c", null], nullable: true }
 * for nullable optional fields. Lenient providers (Z.AI / GLM) accept the null
 * entry; Moonshot rejects with
 *   "At path 'properties.X.enum': enum value (<nil>) does not match any type
 *    in [string]"
 * before the request reaches the model.
 *
 * The fix is to strip null/undefined from `enum` arrays. Everything else here
 * is defensive hygiene: ensures `parameters` is always a valid object schema,
 * filters `required[]` to keys that exist in `properties`, and normalizes a
 * few other shapes that strict validators tend to reject.
 */

const MAX_RECURSION_DEPTH = 32;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function hasOwn(obj: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function keepOpaqueObjectSchemasOpen(schema: Record<string, unknown>): void {
  const explicitAdditionalProperties = hasOwn(schema, "additionalProperties");
  if (explicitAdditionalProperties) return;

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

function sanitizeSchema(value: unknown, depth = 0): Record<string, unknown> {
  if (depth > MAX_RECURSION_DEPTH) return {};
  if (!isPlainObject(value)) return {};

  const result: Record<string, unknown> = {};

  for (const [k, v] of Object.entries(value)) {
    if (v === null || v === undefined) continue;

    if (k === "properties" && isPlainObject(v)) {
      const cleaned: Record<string, unknown> = {};
      for (const [pk, pv] of Object.entries(v)) {
        if (isPlainObject(pv)) {
          cleaned[pk] = sanitizeSchema(pv, depth + 1);
        } else if (typeof pv === "boolean") {
          // JSON Schema 2019 boolean form: `true` (anything) / `false` (nothing).
          // Preserve as-is; Moonshot accepts these.
          cleaned[pk] = pv;
        } else {
          cleaned[pk] = {};
        }
      }
      result[k] = cleaned;
    } else if (k === "items") {
      // Recurse into items if it's a single schema. Tuple-form (array) is
      // valid JSON Schema but rejected by Moonshot; coerce to single schema.
      if (Array.isArray(v)) {
        const firstObject = v.find(isPlainObject);
        result[k] = firstObject ? sanitizeSchema(firstObject, depth + 1) : {};
      } else if (isPlainObject(v)) {
        result[k] = sanitizeSchema(v, depth + 1);
      }
    } else if (k === "anyOf" || k === "oneOf" || k === "allOf") {
      // Moonshot recursively validates inside `anyOf` (confirmed empirically),
      // so we must descend to strip null-in-enum etc. `oneOf`/`allOf` aren't
      // currently validated by Moonshot but are recursed for symmetry/defense.
      if (Array.isArray(v)) {
        result[k] = v.map((s) => (isPlainObject(s) ? sanitizeSchema(s, depth + 1) : {}));
      }
    } else if (k === "additionalProperties") {
      // Moonshot recursively validates the schema form of additionalProperties
      // (confirmed empirically). The boolean form is also valid JSON Schema.
      if (isPlainObject(v)) {
        result[k] = sanitizeSchema(v, depth + 1);
      } else if (typeof v === "boolean") {
        result[k] = v;
      }
    } else if (k === "enum" && Array.isArray(v)) {
      // The actual fix: strip null/undefined entries that ForgeCode adds for
      // nullable optional fields.
      result[k] = v.filter((e) => e !== null && e !== undefined);
    } else if (k === "required" && Array.isArray(v)) {
      result[k] = v.filter((r) => typeof r === "string");
    } else {
      result[k] = v;
    }
  }

  if (Array.isArray(result.required) && isPlainObject(result.properties)) {
    const validKeys = new Set(Object.keys(result.properties));
    result.required = (result.required as string[]).filter((r) => validKeys.has(r));
  }

  keepOpaqueObjectSchemasOpen(result);

  return result;
}

/**
 * OpenAI's Responses API strict validator requires the ROOT parameters schema to
 * declare `type: "object"` explicitly. Clients like the Codex app emit
 * `type: null` (rejected upstream as: schema must be a JSON Schema of
 * 'type: "object"', got 'type: null' — issue #6359). sanitizeSchema drops the
 * null, so at the root we re-add the mandatory "object". Combinator roots
 * (anyOf/oneOf/allOf) are left alone — injecting a sibling `type` would change
 * their meaning — and explicit root types are preserved as-is.
 */
function ensureRootObjectType(schema: Record<string, unknown>): void {
  if (hasOwn(schema, "type")) return;
  if (hasOwn(schema, "anyOf") || hasOwn(schema, "oneOf") || hasOwn(schema, "allOf")) return;
  schema.type = "object";
  if (!isPlainObject(schema.properties)) {
    schema.properties = {};
    if (!hasOwn(schema, "additionalProperties")) schema.additionalProperties = true;
  }
}

function normalizeParameters(parameters: unknown): unknown {
  if (isPlainObject(parameters)) {
    const sanitized = sanitizeSchema(parameters);
    ensureRootObjectType(sanitized);
    return sanitized;
  }
  if (parameters === null || parameters === undefined) {
    return { type: "object", properties: {}, additionalProperties: true };
  }
  return { type: "object", properties: {}, additionalProperties: true };
}

export function sanitizeOpenAITool(tool: unknown): unknown {
  if (!isPlainObject(tool)) return tool;
  const t = { ...tool };

  if (isPlainObject(t.function)) {
    // Chat Completions format: { type: "function", function: { name, parameters } }
    const f = { ...t.function };
    f.parameters = normalizeParameters(f.parameters);
    t.function = f;
  } else if (t.type === "function") {
    // Responses API format: { type: "function", name, parameters } — no `function`
    // wrapper. /v1/responses requests reach chatCore in this shape and are only
    // unwrapped later by the request translator, so we have to sanitize here too.
    t.parameters = normalizeParameters(t.parameters);
  }

  return t;
}

export function sanitizeOpenAITools(tools: unknown[]): unknown[] {
  return tools.map(sanitizeOpenAITool);
}
