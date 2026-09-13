/**
 * Issue #13464: Gemini tool-call requests fail 400 with "Unknown name prefixItems"
 *
 * OpenAI/Claude tool schemas use JSON-Schema 2020-12 keywords like `prefixItems`
 * and `additionalItems` for tuple arrays. Gemini's function_declarations only
 * accept draft-07-style schemas and reject these with HTTP 400.
 *
 * The fix adds `prefixItems` and `additionalItems` to the set of unsupported
 * schema keys that get stripped by `cleanJSONSchemaForAntigravity` before the
 * schema is forwarded to the Gemini API.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  cleanJSONSchemaForAntigravity,
  GEMINI_UNSUPPORTED_SCHEMA_KEYS,
} from "../../open-sse/translator/helpers/geminiHelper.ts";

describe("Issue #13464 — Gemini prefixItems / additionalItems stripping", () => {
  it("prefixItems is in the unsupported set", () => {
    assert.ok(
      GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("prefixItems"),
      "prefixItems must be stripped before sending to Gemini"
    );
  });

  it("additionalItems is in the unsupported set", () => {
    assert.ok(
      GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("additionalItems"),
      "additionalItems must be stripped before sending to Gemini"
    );
  });

  it("cleanJSONSchemaForAntigravity strips prefixItems from nested tool parameters", () => {
    // Simulates a typical OpenAI tool schema with a tuple-array parameter.
    const schema = {
      type: "object",
      properties: {
        coordinates: {
          type: "array",
          prefixItems: [
            { type: "number", description: "latitude" },
            { type: "number", description: "longitude" },
          ],
          minItems: 2,
          maxItems: 2,
        },
      },
      required: ["coordinates"],
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema) as Record<string, unknown>;
    const coords = cleaned.properties as Record<string, Record<string, unknown>>;
    const coordinates = coords.coordinates;

    // prefixItems must be removed
    assert.equal(
      coordinates.prefixItems,
      undefined,
      "prefixItems should be stripped from nested property schema"
    );

    // minItems / maxItems must also be removed (already in the unsupported set)
    assert.equal(coordinates.minItems, undefined, "minItems should be stripped");
    assert.equal(coordinates.maxItems, undefined, "maxItems should be stripped");

    // The top-level type:"array" must survive
    assert.equal(coordinates.type, "array", "type:array should be preserved");
  });

  it("cleanJSONSchemaForAntigravity strips additionalItems from nested schemas", () => {
    const schema = {
      type: "object",
      properties: {
        tags: {
          type: "array",
          items: { type: "string" },
          additionalItems: { type: "number" },
        },
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema) as Record<string, unknown>;
    const props = cleaned.properties as Record<string, Record<string, unknown>>;
    const tags = props.tags;

    assert.equal(tags.additionalItems, undefined, "additionalItems should be stripped");
    // items must survive — it's a supported keyword
    assert.deepEqual(
      tags.items,
      { type: "string" },
      "items should be preserved alongside stripped additionalItems"
    );
  });

  it("Gemini function-declaration-style tool with prefixItems is cleaned", () => {
    // Simulates the full tool object as it flows through buildGeminiTools.
    const geminiTool = {
      functionDeclarations: [
        {
          name: "get_coordinates",
          description: "Get GPS coordinates",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "array",
                prefixItems: [
                  { type: "number" },
                  { type: "number" },
                ],
                minItems: 2,
              },
            },
            required: ["location"],
          },
        },
      ],
    };

    const cleaned = cleanJSONSchemaForAntigravity(
      geminiTool.functionDeclarations[0].parameters
    ) as Record<string, unknown>;
    const props = cleaned.properties as Record<string, Record<string, unknown>>;
    const location = props.location;

    assert.equal(location.prefixItems, undefined, "prefixItems must be stripped");
    assert.equal(location.minItems, undefined, "minItems must be stripped");
    assert.equal(location.type, "array", "type:array must survive");

    // The function declaration structure is intact
    assert.equal(cleaned.type, "object", "root type:object must survive");
  });
});
