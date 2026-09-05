import test from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity } = await import(
  "../../../open-sse/translator/helpers/geminiHelper.ts"
);

test("#9268 injects type:object on nested properties without type", () => {
  const input = {
    type: "object",
    properties: {
      name: { type: "string" },
      address: {
        // nested node with properties but NO type — should get type:object
        properties: {
          street: { type: "string" },
          city: { type: "string" },
        },
      },
    },
    required: ["name"],
  };

  const result = cleanJSONSchemaForAntigravity(input) as Record<string, unknown>;
  const props = result.properties as Record<string, unknown>;
  const address = props.address as Record<string, unknown>;

  assert.equal(address.type, "object", "nested object with properties must get type:object");
});

test("#9268 injects type:object on nested items array schemas", () => {
  const input = {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          // array items schema with properties but NO type
          properties: {
            id: { type: "integer" },
            label: { type: "string" },
          },
        },
      },
    },
  };

  const result = cleanJSONSchemaForAntigravity(input) as Record<string, unknown>;
  const props = result.properties as Record<string, unknown>;
  const items = props.items as Record<string, unknown>;
  const inner = items.items as Record<string, unknown>;

  assert.equal(inner.type, "object", "array items schema with properties must inject type:object");
});

test("#9268 injects type:object on deeply nested schemas (3+ levels)", () => {
  const input = {
    type: "object",
    properties: {
      level1: {
        properties: {
          level2: {
            properties: {
              level3: {
                properties: {
                  value: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  };

  const result = cleanJSONSchemaForAntigravity(input) as Record<string, unknown>;
  const l1 = (result.properties as Record<string, unknown>).level1 as Record<string, unknown>;
  const l2 = (l1.properties as Record<string, unknown>).level2 as Record<string, unknown>;
  const l3 = (l2.properties as Record<string, unknown>).level3 as Record<string, unknown>;

  assert.equal(l1.type, "object", "level1 must have type:object");
  assert.equal(l2.type, "object", "level2 must have type:object");
  assert.equal(l3.type, "object", "level3 must have type:object");
});

test("#9268 schema already typed is not double-injected", () => {
  const input = {
    type: "object",
    properties: {
      nested: {
        type: "object",
        properties: {
          x: { type: "string" },
        },
      },
    },
  };

  const result = cleanJSONSchemaForAntigravity(input) as Record<string, unknown>;
  const nested = (result.properties as Record<string, unknown>).nested as Record<string, unknown>;

  assert.equal(nested.type, "object", "already-typed nested must keep its type");
  // Ensure properties is not clobbered
  const nestedProps = nested.properties as Record<string, unknown>;
  assert.ok(nestedProps, "nested properties must be preserved");
  assert.ok("x" in nestedProps, "nested property 'x' must exist");
});

test("#9268 node with required but no properties still gets type:object", () => {
  // Edge case: a node that has `required` but no `type` and no `properties`
  // should still get type:object injection (Gemini needs it).
  const input = {
    type: "object",
    properties: {
      ref: {
        // has required but no type nor properties (e.g. an incomplete $ref stub)
        required: ["id"],
      },
    },
  };

  const result = cleanJSONSchemaForAntigravity(input) as Record<string, unknown>;
  const ref = (result.properties as Record<string, unknown>).ref as Record<string, unknown>;

  assert.equal(ref.type, "object", "node with required but no type must get type:object");
});

test("#9268 null/undefined fields do not crash the normalizer", () => {
  const input = {
    type: "object",
    properties: {
      a: null,
      b: undefined,
      // @ts-expect-error - testing runtime resilience
      c: { properties: null },
    },
  };

  assert.doesNotThrow(() => {
    cleanJSONSchemaForAntigravity(input);
  }, "null/undefined fields must not crash the normalizer");
});
