import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cleanJSONSchemaForAntigravity } from "../../../open-sse/translator/helpers/geminiHelper";

type SchemaNode = {
  type?: string;
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  required?: string[];
  [key: string]: unknown;
};

describe("Gemini array items sanitizer (#10578)", () => {
  it("should inject a string items schema for array types that are missing it", () => {
    const sloppySchema = {
      type: "object",
      properties: {
        emails: {
          type: "array",
        },
      },
      required: ["emails"],
    };

    const cleanedSchema = cleanJSONSchemaForAntigravity(sloppySchema as unknown) as SchemaNode;

    assert.equal(cleanedSchema.properties?.emails?.type, "array");
    assert.ok(cleanedSchema.properties?.emails?.items, "items should be injected");
    assert.equal(cleanedSchema.properties?.emails?.items?.type, "string");
  });

  it("should safely ignore arrays that already have valid items", () => {
    const goodSchema = {
      type: "object",
      properties: {
        tags: {
          type: "array",
          items: { type: "number" },
        },
      },
    };

    const cleanedSchema = cleanJSONSchemaForAntigravity(goodSchema as unknown) as SchemaNode;

    assert.equal(cleanedSchema.properties?.tags?.items?.type, "number");
  });
});
