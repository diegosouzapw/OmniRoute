/**
 * Ported from decolua/9router#4169 and #4283.
 *
 * Gemini / Antigravity reject tool schemas with a hard 400 when:
 *  - #4283: an `errorMessage` keyword (ajv-errors extension) survives —
 *    "Unknown name \"errorMessage\" ... Cannot find field".
 *  - #4169: an Anthropic `cache_control` annotation survives (it was even
 *    rewritten to `{ type: "string" }` by the protobuf type sanitizer), or a
 *    `properties` entry uses a shorthand string (`"metadata": "object"`)
 *    instead of a schema object — "Expected '{'".
 */
import test from "node:test";
import assert from "node:assert/strict";

import { cleanJSONSchemaForAntigravity } from "../../open-sse/translator/helpers/geminiHelper.ts";

type Rec = Record<string, unknown>;

function containsKey(node: unknown, key: string): boolean {
  if (Array.isArray(node)) return node.some((item) => containsKey(item, key));
  if (!node || typeof node !== "object") return false;
  return Object.entries(node as Rec).some(([k, v]) => k === key || containsKey(v, key));
}

test("#4283: errorMessage keyword is stripped at every nesting level", () => {
  const schema = {
    type: "object",
    errorMessage: "top-level",
    properties: {
      value: {
        type: "array",
        items: {
          type: "object",
          errorMessage: { required: "missing" },
          properties: { label: { type: "string", errorMessage: "bad label" } },
        },
      },
    },
  };

  const cleaned = cleanJSONSchemaForAntigravity(schema) as Rec;
  assert.equal(containsKey(cleaned, "errorMessage"), false);
  const items = ((cleaned.properties as Rec).value as Rec).items as Rec;
  assert.deepEqual((items.properties as Rec).label, { type: "string" });
});

test("#4283: a PROPERTY named errorMessage survives (only the keyword is stripped)", () => {
  const schema = {
    type: "object",
    properties: {
      value: {
        type: "array",
        items: {
          type: "object",
          properties: { errorMessage: { type: "string", description: "error text" } },
          required: ["errorMessage"],
        },
      },
    },
  };

  const cleaned = cleanJSONSchemaForAntigravity(schema) as Rec;
  const items = ((cleaned.properties as Rec).value as Rec).items as Rec;
  assert.deepEqual((items.properties as Rec).errorMessage, {
    type: "string",
    description: "error text",
  });
  assert.deepEqual(items.required, ["errorMessage"]);
});

test("#4169: cache_control is stripped at every level", () => {
  const schema = {
    type: "object",
    cache_control: { type: "ephemeral" },
    properties: {
      q: { type: "string", cache_control: { type: "ephemeral" } },
      list: {
        type: "array",
        items: { type: "object", cache_control: { type: "ephemeral" }, properties: {} },
      },
    },
  };

  const cleaned = cleanJSONSchemaForAntigravity(schema) as Rec;
  assert.equal(containsKey(cleaned, "cache_control"), false);
  assert.deepEqual((cleaned.properties as Rec).q, { type: "string" });
});

test("#4169: shorthand string property values are normalized to schema objects", () => {
  const schema = {
    type: "object",
    properties: {
      metadata: "object",
      name: "string",
      nested: { type: "object", properties: { count: "integer" } },
    },
    required: ["name"],
  };

  const cleaned = cleanJSONSchemaForAntigravity(schema) as Rec;
  const props = cleaned.properties as Rec;
  const metadata = props.metadata as Rec;
  assert.equal(metadata.type, "object");
  // Empty objects get the Antigravity placeholder, so the node is a valid schema.
  assert.ok(metadata.properties && typeof metadata.properties === "object");
  assert.deepEqual(props.name, { type: "string" });
  assert.deepEqual(((props.nested as Rec).properties as Rec).count, { type: "integer" });
  assert.deepEqual(cleaned.required, ["name"]);
  for (const value of Object.values(props)) {
    assert.equal(typeof value, "object", "every properties entry must be a schema object");
  }
});

test("#4169: unknown shorthand type strings fall back to a valid Gemini type", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: { blob: "dict", weird: "whatever" },
  }) as Rec;
  const props = cleaned.properties as Rec;
  assert.equal((props.blob as Rec).type, "object");
  assert.deepEqual(props.weird, { type: "string" });
});

test("#4169 x #13057: a property NAMED properties is not mistaken for a shorthand map", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      properties: { type: "array", items: { type: "string" } },
      tag: "string",
    },
  }) as Rec;
  const props = cleaned.properties as Rec;
  assert.deepEqual(props.properties, { type: "array", items: { type: "string" } });
  assert.deepEqual(props.tag, { type: "string" });
});
