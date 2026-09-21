/**
 * Regression for #12269 — skills injection 400s Antigravity Gemini because two
 * schema shapes survive `cleanJSONSchemaForAntigravity` and Gemini's proto
 * rejects them:
 *
 * 1. A property carrying boolean `required: true`. `cleanupRequired()` only
 *    acts when `required` is an array, so the scalar passes through; Gemini
 *    declares `required` as `repeated string`.
 * 2. A nested bare property map (`{ opts: { limit: { type: "number" } } }`).
 *    `normalizeInputSchema()` only expands string shorthands at the skill root.
 *
 * Diego named the missing pre-pass after CLIProxyAPI
 * `normalizeMalformedSchemaObjects`: promote boolean `required` onto the parent
 * array, lift a bare property map into `{ type: "object", properties }`.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity } = await import(
  "../../open-sse/translator/helpers/geminiHelper.ts"
);
const { buildGeminiTools } = await import(
  "../../open-sse/translator/helpers/geminiToolsSanitizer.ts"
);

function paramsOf(tools: ReturnType<typeof buildGeminiTools>): Record<string, unknown> {
  const first = tools[0] as { functionDeclarations?: Array<{ parameters?: unknown }> };
  return first.functionDeclarations?.[0]?.parameters as Record<string, unknown>;
}

function hasBooleanRequired(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some(hasBooleanRequired);
  const record = value as Record<string, unknown>;
  if (typeof record.required === "boolean") return true;
  return Object.values(record).some(hasBooleanRequired);
}

test("#12269 lifts boolean required:true off a string property onto the parent array", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      query: { type: "string", required: true },
    },
  }) as Record<string, unknown>;

  const properties = cleaned.properties as Record<string, Record<string, unknown>>;
  assert.equal(properties.query.type, "string");
  assert.equal("required" in properties.query, false, "scalar required must leave the property");
  assert.deepEqual(cleaned.required, ["query"]);
  assert.equal(hasBooleanRequired(cleaned), false);
});

test("#12269 drops required:false instead of promoting it", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      query: { type: "string", required: false },
      hint: { type: "string" },
    },
  }) as Record<string, unknown>;

  const properties = cleaned.properties as Record<string, Record<string, unknown>>;
  assert.equal("required" in properties.query, false);
  assert.equal(cleaned.required, undefined);
});

test("#12269 lifts a nested bare property map into type/object + properties", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      opts: { limit: { type: "number" } },
    },
  }) as Record<string, unknown>;

  const properties = cleaned.properties as Record<string, Record<string, unknown>>;
  const opts = properties.opts;
  assert.equal(opts.type, "object");
  assert.equal("limit" in opts, false, "bare key must move under properties");
  const optsProps = opts.properties as Record<string, Record<string, unknown>>;
  assert.equal(optsProps.limit.type, "number");
});

test("#12269 boolean required and bare map survive buildGeminiTools together", () => {
  const tools = buildGeminiTools([
    {
      type: "function",
      function: {
        name: "skill_search",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", required: true },
            opts: { limit: { type: "number" } },
          },
        },
      },
    },
  ]);

  const params = paramsOf(tools);
  const properties = params.properties as Record<string, Record<string, unknown>>;
  assert.equal(properties.query.type, "string");
  assert.equal("required" in properties.query, false);
  assert.deepEqual(params.required, ["query"]);
  const opts = properties.opts;
  assert.equal(opts.type, "object");
  assert.equal((opts.properties as Record<string, Record<string, unknown>>).limit.type, "number");
  assert.equal(hasBooleanRequired(params), false);
});

test("#12269 does not wrap schema-keyword objects as property maps", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      options: {
        additionalProperties: { type: "string" },
      },
    },
  }) as Record<string, unknown>;

  const properties = cleaned.properties as Record<string, Record<string, unknown>>;
  assert.deepEqual(properties.options, {});
  assert.equal("properties" in properties.options, false);
});

test("#12269 strips unsupported validation keywords without wrapping them as property maps", () => {
  // These keys are in GEMINI_UNSUPPORTED_SCHEMA_KEYS (Gemini 400s on them);
  // they must be REMOVED, and removal must not go through the bare-map lift
  // (which would turn `{minLength: 1}` into `{type:"object", properties:{...}}`).
  for (const [keyword, value] of Object.entries({
    minLength: 1,
    maxLength: 8,
    multipleOf: 2,
    minItems: 1,
    maxItems: 4,
    uniqueItems: true,
  })) {
    const cleaned = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: {
        value: { [keyword]: value },
      },
    }) as Record<string, unknown>;

    const properties = cleaned.properties as Record<string, Record<string, unknown>>;
    assert.deepEqual(properties.value, {}, `unsupported ${keyword} must be stripped`);
    assert.equal("properties" in properties.value, false);
  }
});

test("#12269 preserves supported validation keywords without wrapping them", () => {
  // `minimum`/`maximum`/`pattern` are accepted by Antigravity and must survive
  // untouched; `minProperties`/`maxProperties` are not in the strip set either.
  for (const [keyword, value] of Object.entries({
    minimum: 0,
    maximum: 10,
    pattern: "^[a-z]+$",
    minProperties: 1,
  })) {
    const cleaned = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: {
        value: { [keyword]: value },
      },
    }) as Record<string, unknown>;

    const properties = cleaned.properties as Record<string, Record<string, unknown>>;
    assert.deepEqual(properties.value, { [keyword]: value }, `supported ${keyword} must be preserved`);
    assert.equal("properties" in properties.value, false);
  }
});

test("#12269 recursively lifts more than one nested bare property map", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      opts: { settings: { limit: { type: "number" } } },
    },
  }) as Record<string, unknown>;

  const opts = (cleaned.properties as Record<string, Record<string, unknown>>).opts;
  const settings = (opts.properties as Record<string, Record<string, unknown>>).settings;
  assert.equal(opts.type, "object");
  assert.equal(settings.type, "object");
  assert.equal(
    (settings.properties as Record<string, Record<string, unknown>>).limit.type,
    "number"
  );
});

test("#12269 preserves a pre-existing parent required entry without duplication", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      query: { type: "string", required: true },
    },
    required: ["query"],
  }) as Record<string, unknown>;

  assert.deepEqual(cleaned.required, ["query"]);
});

test("#12269 removes every non-array property-level required value", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      numeric: { type: "string", required: 1 },
      textual: { type: "string", required: "yes" },
      nil: { type: "string", required: null },
    },
  }) as Record<string, unknown>;

  const properties = cleaned.properties as Record<string, Record<string, unknown>>;
  assert.equal("required" in properties.numeric, false);
  assert.equal("required" in properties.textual, false);
  assert.equal("required" in properties.nil, false);
  assert.equal(cleaned.required, undefined);
});

test("#12269 does not promote an object whose only child is an array", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      malformed: { values: [1, 2, 3] },
    },
  }) as Record<string, unknown>;

  const malformed = (cleaned.properties as Record<string, Record<string, unknown>>).malformed;
  assert.equal(malformed.type, undefined);
  assert.equal(malformed.properties, undefined);
});

test("#12269 promotes required:true from a typed object child before cleaning it", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      config: {
        type: "object",
        required: true,
        properties: {
          timeout: { type: "number" },
        },
      },
    },
  }) as Record<string, unknown>;

  assert.deepEqual(cleaned.required, ["config"]);
  const properties = cleaned.properties as Record<string, Record<string, unknown>>;
  assert.equal("required" in properties.config, false);
});

test("#12269 preserves a well-formed object schema byte-stable on required/properties", () => {
  const input = {
    type: "object",
    properties: {
      query: { type: "string" },
      limit: { type: "number" },
    },
    required: ["query"],
  };
  const cleaned = cleanJSONSchemaForAntigravity(input) as Record<string, unknown>;
  const properties = cleaned.properties as Record<string, Record<string, unknown>>;
  assert.equal(properties.query.type, "string");
  assert.equal(properties.limit.type, "number");
  assert.deepEqual(cleaned.required, ["query"]);
});
