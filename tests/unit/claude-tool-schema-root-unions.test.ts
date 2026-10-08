/**
 * Root-level `anyOf` / `oneOf` / `allOf` in a Claude tool `input_schema` (#13552).
 *
 * Anthropic's Messages API refuses such a tool before inference with
 * `tools.N.custom.input_schema: input_schema does not support oneOf, allOf, or
 * anyOf at the top level`, so one offending tool in a client's catalog fails
 * every request that carries it — combo failover cannot recover from a request
 * that never reaches a model.
 *
 * These tests pin the flattening itself plus both conversion paths that build a
 * Claude `input_schema` from a client payload: the OpenAI→Claude translator and
 * the Claude-Code-compatible bridge.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  hasRootLevelSchemaUnion,
  normalizeClaudeToolInputSchema,
  sanitizeClaudeToolSchema,
} from "../../open-sse/translator/helpers/schemaCoercion.ts";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";
import { buildClaudeCodeCompatibleRequest } from "../../open-sse/services/claudeCodeCompatible.ts";

type AnyRecord = Record<string, unknown>;

const ROOT_UNION_KEYWORDS = ["anyOf", "oneOf", "allOf"] as const;

const assertNoRootUnion = (schema: unknown, label: string): void => {
  for (const keyword of ROOT_UNION_KEYWORDS) {
    assert.equal(
      Object.prototype.hasOwnProperty.call(schema as AnyRecord, keyword),
      false,
      `${label} still carries a root-level ${keyword}`
    );
  }
  assert.equal((schema as AnyRecord).type, "object", `${label} root type is not "object"`);
};

describe("hasRootLevelSchemaUnion", () => {
  it("detects each composition keyword at the root", () => {
    for (const keyword of ROOT_UNION_KEYWORDS) {
      assert.equal(hasRootLevelSchemaUnion({ type: "object", [keyword]: [] }), true, keyword);
    }
  });

  it("ignores a union nested inside a property", () => {
    const schema = {
      type: "object",
      properties: { pin: { anyOf: [{ type: "boolean" }, { type: "object" }] } },
    };
    assert.equal(hasRootLevelSchemaUnion(schema), false);
  });

  it("ignores non-object schemas", () => {
    assert.equal(hasRootLevelSchemaUnion(null), false);
    assert.equal(hasRootLevelSchemaUnion("[MaxDepth]"), false);
    assert.equal(hasRootLevelSchemaUnion([{ anyOf: [] }]), false);
  });
});

describe("normalizeClaudeToolInputSchema", () => {
  it("flattens a root anyOf that carries the whole schema", () => {
    const result = normalizeClaudeToolInputSchema({
      anyOf: [
        { type: "object", properties: { a: { type: "string" } } },
        { type: "object", properties: { b: { type: "integer" } } },
      ],
    }) as AnyRecord;

    assertNoRootUnion(result, "flattened anyOf");
    assert.deepEqual(result.properties, {
      a: { type: "string" },
      b: { type: "integer" },
    });
  });

  it("keeps a nested union while removing the root one", () => {
    const result = normalizeClaudeToolInputSchema({
      type: "object",
      properties: { nested: { oneOf: [{ type: "string" }, { type: "number" }] } },
      oneOf: [
        { properties: { a: { type: "string" } }, required: ["a"] },
        { properties: { b: { type: "string" } }, required: ["b"] },
      ],
    }) as AnyRecord;

    assertNoRootUnion(result, "flattened oneOf");
    const properties = result.properties as AnyRecord;
    assert.deepEqual(properties.nested, { oneOf: [{ type: "string" }, { type: "number" }] });
    assert.deepEqual(properties.a, { type: "string" });
    assert.deepEqual(properties.b, { type: "string" });
  });

  it("does not promote alternative branch requirements of anyOf/oneOf", () => {
    // `a` and `b` are alternatives: requiring both would refuse calls the
    // original schema accepts.
    const result = normalizeClaudeToolInputSchema({
      type: "object",
      properties: { a: { type: "string" }, b: { type: "string" } },
      anyOf: [{ required: ["a"] }, { required: ["b"] }],
    }) as AnyRecord;

    assertNoRootUnion(result, "anyOf requirements");
    assert.equal("required" in result, false);
  });

  it("merges properties and requirements of a root allOf", () => {
    // Every allOf branch applies at once, so its requirements are cumulative.
    const result = normalizeClaudeToolInputSchema({
      type: "object",
      properties: { base: { type: "boolean" } },
      required: ["base"],
      allOf: [
        { type: "object", properties: { a: { type: "string" } }, required: ["a"] },
        { properties: { b: { type: "integer" } }, required: ["a", "b"] },
      ],
    }) as AnyRecord;

    assertNoRootUnion(result, "flattened allOf");
    assert.deepEqual(Object.keys(result.properties as AnyRecord).sort(), ["a", "b", "base"]);
    assert.deepEqual(result.required, ["base", "a", "b"]);
  });

  it("keeps the root object's own property when a branch redeclares it", () => {
    const result = normalizeClaudeToolInputSchema({
      type: "object",
      properties: { shared: { type: "string", description: "root wins" } },
      allOf: [{ properties: { shared: { type: "integer" } } }],
    }) as AnyRecord;

    assert.deepEqual((result.properties as AnyRecord).shared, {
      type: "string",
      description: "root wins",
    });
  });

  it("skips branches that cannot contribute object properties", () => {
    const result = normalizeClaudeToolInputSchema({
      type: "object",
      properties: { keep: { type: "string" } },
      anyOf: [
        { type: "string" },
        { type: "null" },
        { type: ["object", "null"], properties: { fromUnionType: { type: "boolean" } } },
      ],
    }) as AnyRecord;

    assertNoRootUnion(result, "mixed branches");
    assert.deepEqual(Object.keys(result.properties as AnyRecord).sort(), ["fromUnionType", "keep"]);
  });

  it("drops a malformed root union instead of forwarding it", () => {
    const result = normalizeClaudeToolInputSchema({
      type: "object",
      properties: { a: { type: "string" } },
      allOf: "not-an-array",
    }) as AnyRecord;

    assertNoRootUnion(result, "malformed allOf");
    assert.deepEqual(result.properties, { a: { type: "string" } });
  });

  it("preserves unrelated keywords and leaves a clean schema untouched", () => {
    const clean = {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"],
      additionalProperties: false,
    };
    assert.equal(normalizeClaudeToolInputSchema(clean), clean);

    const result = normalizeClaudeToolInputSchema({
      title: "Search",
      additionalProperties: false,
      $defs: { Ref: { type: "string" } },
      oneOf: [{ type: "object", properties: { q: { type: "string" } } }],
    }) as AnyRecord;

    assertNoRootUnion(result, "keyword preservation");
    assert.equal(result.title, "Search");
    assert.equal(result.additionalProperties, false);
    assert.deepEqual(result.$defs, { Ref: { type: "string" } });
  });

  it("does not mutate the schema it was given", () => {
    const input = {
      type: "object",
      properties: { a: { type: "string" } },
      anyOf: [{ type: "object", properties: { b: { type: "string" } } }],
    };
    const snapshot = structuredClone(input);

    normalizeClaudeToolInputSchema(input);

    assert.deepEqual(input, snapshot);
  });
});

describe("sanitizeClaudeToolSchema (native OAuth / passthrough surface)", () => {
  it("flattens a root union after repairing invalid constructs", () => {
    const result = sanitizeClaudeToolSchema({
      type: "object",
      properties: { a: { type: "string", enum: { "0": "x", "1": "y" } } },
      anyOf: [{ type: "object", properties: { b: { type: "string" } } }],
    }) as AnyRecord;

    assertNoRootUnion(result, "sanitized schema");
    const properties = result.properties as AnyRecord;
    assert.deepEqual((properties.a as AnyRecord).enum, ["x", "y"]);
    assert.deepEqual(properties.b, { type: "string" });
  });

  it("flattens an index-keyed root union object", () => {
    // stripInvalidSchemaConstructs coerces the index-keyed object back into an
    // array first, so the flattening still sees real branches.
    const result = sanitizeClaudeToolSchema({
      type: "object",
      oneOf: { "0": { type: "object", properties: { a: { type: "string" } } } },
    }) as AnyRecord;

    assertNoRootUnion(result, "index-keyed oneOf");
    assert.deepEqual(result.properties, { a: { type: "string" } });
  });
});

describe("openaiToClaudeRequest — tool input_schema", () => {
  const toolWithRootUnion = {
    type: "function",
    function: {
      name: "kolonie_operator_agent",
      description: "Repro of the reported failure",
      parameters: {
        type: "object",
        properties: { act: { type: "string" } },
        required: ["act"],
        anyOf: [{ type: "object", properties: { delegationId: { type: "string" } } }],
      },
    },
  };

  const baseBody = {
    messages: [{ role: "user", content: "Say OK" }],
    max_tokens: 32,
  };

  it("flattens a root union before the request reaches Anthropic", () => {
    const result = openaiToClaudeRequest(
      "claude-opus-5",
      { ...baseBody, tools: [toolWithRootUnion] },
      false
    ) as AnyRecord;

    const tool = (result.tools as AnyRecord[])[0];
    const schema = tool.input_schema as AnyRecord;
    assertNoRootUnion(schema, "translated tool");
    assert.deepEqual(Object.keys(schema.properties as AnyRecord).sort(), ["act", "delegationId"]);
    assert.deepEqual(schema.required, ["act"]);
  });

  it("leaves a nested union and an ordinary schema untouched", () => {
    const result = openaiToClaudeRequest(
      "claude-opus-5",
      {
        ...baseBody,
        tools: [
          {
            type: "function",
            function: {
              name: "ordinary",
              parameters: {
                type: "object",
                properties: { pin: { anyOf: [{ type: "boolean" }, { type: "object" }] } },
                required: ["pin"],
              },
            },
          },
        ],
      },
      false
    ) as AnyRecord;

    const schema = (result.tools as AnyRecord[])[0].input_schema as AnyRecord;
    assert.deepEqual(schema.properties, {
      pin: { anyOf: [{ type: "boolean" }, { type: "object" }] },
    });
    assert.deepEqual(schema.required, ["pin"]);
  });
});

describe("buildClaudeCodeCompatibleRequest — tool input_schema", () => {
  it("flattens a root union on the Claude-Code-compatible bridge", () => {
    const body = buildClaudeCodeCompatibleRequest({
      model: "claude-opus-5",
      normalizedBody: {
        model: "claude-opus-5",
        messages: [{ role: "user", content: "Say OK" }],
        max_tokens: 32,
        tools: [
          {
            type: "function",
            function: {
              name: "bridge_tool",
              parameters: {
                type: "object",
                properties: { base: { type: "string" } },
                required: ["base"],
                allOf: [{ properties: { extra: { type: "string" } }, required: ["extra"] }],
              },
            },
          },
        ],
      },
    }) as AnyRecord;

    const schema = (body.tools as AnyRecord[])[0].input_schema as AnyRecord;
    assertNoRootUnion(schema, "bridge tool");
    assert.deepEqual(Object.keys(schema.properties as AnyRecord).sort(), ["base", "extra"]);
    assert.deepEqual(schema.required, ["base", "extra"]);
  });
});
