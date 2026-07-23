import test from "node:test";
import assert from "node:assert/strict";

// #4296: the dashboard "Try It" panel pre-fills request bodies generated from
// the OpenAPI request-body schema by generateExampleFromSchema (in the
// /api/openapi/spec route). These tests pin that generator's behaviour: type
// handling, property-name heuristics, $ref/oneOf/anyOf/allOf resolution, the
// "required + first 3 optional" object policy, and the depth-3 recursion guard.
const { generateExampleFromSchema } = await import("@/app/api/openapi/spec/route");

const NO_COMPONENTS = {};

test("uses an explicit example/default before anything else", () => {
  assert.equal(generateExampleFromSchema({ type: "string", example: "hi" }, NO_COMPONENTS), "hi");
  assert.equal(generateExampleFromSchema({ type: "number", default: 7 }, NO_COMPONENTS), 7);
});

test("string types: enum, formats, and a plain default", () => {
  assert.equal(generateExampleFromSchema({ type: "string", enum: ["a", "b"] }, NO_COMPONENTS), "a");
  assert.equal(
    generateExampleFromSchema({ type: "string", format: "date-time" }, NO_COMPONENTS),
    "2024-01-01T00:00:00Z"
  );
  assert.equal(
    generateExampleFromSchema({ type: "string", format: "email" }, NO_COMPONENTS),
    "user@example.com"
  );
  assert.equal(generateExampleFromSchema({ type: "string" }, NO_COMPONENTS), "string");
});

test("string property-name heuristics produce realistic values", () => {
  const s = (name: string) =>
    generateExampleFromSchema({ type: "string" }, NO_COMPONENTS, 0, name);
  assert.equal(s("model"), "openai/gpt-4o");
  assert.equal(s("prompt"), "Write a function to sort an array");
  assert.equal(s("system"), "You are a concise, helpful assistant.");
  assert.equal(s("query"), "What is the capital of France?");
  assert.equal(s("provider"), "openai");
});

test("number / integer / boolean defaults", () => {
  assert.equal(generateExampleFromSchema({ type: "integer", minimum: 3 }, NO_COMPONENTS), 3);
  assert.equal(generateExampleFromSchema({ type: "number" }, NO_COMPONENTS), 0);
  assert.equal(generateExampleFromSchema({ type: "boolean" }, NO_COMPONENTS), false);
  assert.equal(generateExampleFromSchema({ type: "boolean", default: true }, NO_COMPONENTS), true);
});

test("arrays wrap a single generated item", () => {
  assert.deepEqual(
    generateExampleFromSchema({ type: "array", items: { type: "string" } }, NO_COMPONENTS),
    ["string"]
  );
});

test("objects include all required + only the first 3 optional properties", () => {
  const schema = {
    type: "object",
    required: ["model"],
    properties: {
      model: { type: "string" },
      a: { type: "string" },
      b: { type: "string" },
      c: { type: "string" },
      d: { type: "string" }, // 4th optional — must be dropped
    },
  };
  const out = generateExampleFromSchema(schema, NO_COMPONENTS) as Record<string, unknown>;
  assert.equal(out.model, "openai/gpt-4o");
  assert.deepEqual(Object.keys(out).sort(), ["a", "b", "c", "model"]);
  assert.ok(!("d" in out), "the 4th optional property must be omitted");
});

test("resolves $ref against components and merges allOf", () => {
  const components = { Msg: { type: "object", properties: { role: { type: "string" } } } };
  const refOut = generateExampleFromSchema({ $ref: "#/components/schemas/Msg" }, components) as Record<
    string,
    unknown
  >;
  assert.equal(refOut.role, "string");

  const allOfOut = generateExampleFromSchema(
    { allOf: [{ type: "object", properties: { x: { type: "boolean" } } }, { $ref: "#/components/schemas/Msg" }] },
    components
  ) as Record<string, unknown>;
  assert.equal(allOfOut.x, false);
  assert.equal(allOfOut.role, "string");
});

test("oneOf / anyOf pick the first branch", () => {
  assert.equal(
    generateExampleFromSchema({ oneOf: [{ type: "string" }, { type: "number" }] }, NO_COMPONENTS),
    "string"
  );
  assert.equal(
    generateExampleFromSchema({ anyOf: [{ type: "integer", minimum: 5 }] }, NO_COMPONENTS),
    5
  );
});

test("depth guard stops infinite recursion on self-referential $ref", () => {
  const components = { Node: { $ref: "#/components/schemas/Node" } };
  // Must not throw / stack-overflow; returns null once depth > 3.
  const out = generateExampleFromSchema({ $ref: "#/components/schemas/Node" }, components);
  assert.equal(out, null);
});
