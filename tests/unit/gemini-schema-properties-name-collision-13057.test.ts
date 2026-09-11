import test from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity } = await import(
  "../../open-sse/translator/helpers/geminiHelper.ts"
);

test("#13057 does not inject type:object into properties map when a property is named 'properties'", () => {
  const input = {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: ["ping", "tree", "properties"],
        description: "Which query to perform",
      },
      properties: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Extra property names to read",
      },
    },
    required: ["action"],
  };

  const result = cleanJSONSchemaForAntigravity(input) as Record<string, unknown>;
  const props = result.properties as Record<string, unknown>;

  // Ensure "type" is NOT injected as a sibling property inside properties map
  assert.equal(
    props.type,
    undefined,
    "properties map must not have 'type: object' injected when a property is named 'properties'"
  );

  // Ensure the actual 'properties' field is preserved as an array schema
  assert.ok(props.properties, "property named 'properties' must be preserved");
  const propField = props.properties as Record<string, unknown>;
  assert.equal(propField.type, "array", "property 'properties' must maintain its array type");
  assert.deepEqual(propField.items, { type: "string" }, "property 'properties' items must be preserved");
});

test("#13057 preserves nested object property named 'properties' without corrupting parent maps", () => {
  const input = {
    type: "object",
    properties: {
      action: { type: "string" },
      properties: {
        type: "object",
        properties: {},
        additionalProperties: true,
      },
      instances: {
        type: "array",
        items: {
          type: "object",
          properties: {
            className: { type: "string" },
            properties: {
              type: "object",
              properties: {},
              additionalProperties: true,
            },
          },
          required: ["className"],
        },
      },
    },
    required: ["action"],
  };

  const result = cleanJSONSchemaForAntigravity(input) as Record<string, unknown>;
  const props = result.properties as Record<string, unknown>;

  // Root properties map should not contain "type"
  assert.equal(props.type, undefined, "root properties map must not contain injected 'type' field");

  // Inner properties schema under instances.items.properties
  const instances = props.instances as Record<string, unknown>;
  const items = instances.items as Record<string, unknown>;
  const itemProps = items.properties as Record<string, unknown>;
  assert.equal(itemProps.type, undefined, "item properties map must not contain injected 'type' field");

  const innerProps = itemProps.properties as Record<string, unknown>;
  assert.equal(innerProps.type, "object", "inner 'properties' object schema must remain type: object");
  assert.ok(innerProps.properties, "inner 'properties' placeholder reason must exist");
});
