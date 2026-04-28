import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { sanitizeOpenAITool, sanitizeOpenAITools } =
  await import("../../open-sse/services/toolSchemaSanitizer.ts");

describe("toolSchemaSanitizer", () => {
  describe("enum null filter (the actual fix)", () => {
    it("strips null entries from enum (ForgeCode + Moonshot reproduction)", () => {
      const tool = {
        type: "function",
        function: {
          name: "fs_search",
          parameters: {
            type: "object",
            properties: {
              output_mode: {
                type: "string",
                enum: ["content", "files_with_matches", "count", null],
                nullable: true,
              },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.output_mode.enum, [
        "content",
        "files_with_matches",
        "count",
      ]);
    });

    it("strips undefined entries from enum", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: { mode: { type: "string", enum: ["a", undefined, "b"] } },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.mode.enum, ["a", "b"]);
    });

    it("preserves enum without null/undefined", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: { mode: { type: "string", enum: ["a", "b", "c"] } },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.mode.enum, ["a", "b", "c"]);
    });
  });

  describe("required[] filter", () => {
    it("drops required keys that are absent from properties", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: { a: { type: "string" } },
            required: ["a", "b", "c"],
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.a, { type: "string" });
      assert.deepEqual(out.function.parameters.required, ["a"]);
    });

    it("filters non-string entries in required[]", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: { a: { type: "string" } },
            required: ["a", null, 123, undefined],
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.required, ["a"]);
    });
  });

  describe("items normalization", () => {
    it("collapses tuple items to first plain-object schema", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              list: { type: "array", items: [{ type: "string" }, { type: "number" }] },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.list.items, {
        type: "string",
      });
    });

    it("falls back to empty schema when tuple has no plain-object entries", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              list: { type: "array", items: [null, "junk", 1] },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.list.items, {});
    });

    it("preserves single-object items unchanged", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              list: { type: "array", items: { type: "string" } },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.list.items, {
        type: "string",
      });
    });
  });

  describe("parameters shape normalization", () => {
    it("creates empty object schema when parameters is null", () => {
      const tool = {
        type: "function",
        function: { name: "x", parameters: null },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters, { type: "object", properties: {} });
    });

    it("creates empty object schema when parameters is missing", () => {
      const tool = { type: "function", function: { name: "x" } };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters, { type: "object", properties: {} });
    });

    it("replaces non-object/non-boolean property values with empty schema", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: { a: null, b: 1, c: "string-not-object" },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.a, {});
      assert.deepEqual(out.function.parameters.properties.b, {});
      assert.deepEqual(out.function.parameters.properties.c, {});
    });

    it("preserves valid property schemas", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              a: { type: "string", description: "first" },
              b: { type: "integer", minimum: 0 },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.a, {
        type: "string",
        description: "first",
      });
      assert.deepEqual(out.function.parameters.properties.b, {
        type: "integer",
        minimum: 0,
      });
    });
  });

  describe("anyOf / oneOf / allOf recursion", () => {
    it("strips null from enum nested inside anyOf (Moonshot validates here)", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              mode: {
                anyOf: [{ type: "string", enum: ["a", "b", null] }, { type: "null" }],
              },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.mode.anyOf[0].enum, ["a", "b"]);
    });

    it("strips null from enum nested inside oneOf", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              mode: {
                oneOf: [{ type: "string", enum: ["a", null] }, { type: "integer" }],
              },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.mode.oneOf[0].enum, ["a"]);
    });

    it("strips null from enum nested inside allOf", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              mode: {
                allOf: [{ type: "string", enum: ["a", null] }],
              },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.mode.allOf[0].enum, ["a"]);
    });

    it("replaces non-object entries inside anyOf/oneOf/allOf with empty schema", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              mode: { anyOf: [{ type: "string" }, null, "junk", 1] },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.mode.anyOf, [
        { type: "string" },
        {},
        {},
        {},
      ]);
    });
  });

  describe("additionalProperties recursion", () => {
    it("strips null from enum nested inside additionalProperties (Moonshot validates here)", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              map: {
                type: "object",
                additionalProperties: { type: "string", enum: ["a", null] },
              },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.map.additionalProperties.enum, ["a"]);
    });

    it("preserves boolean additionalProperties", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: {
              map: { type: "object", additionalProperties: false },
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.equal(out.function.parameters.properties.map.additionalProperties, false);
    });
  });

  describe("boolean property schemas (JSON Schema 2019)", () => {
    it("preserves true / false property values rather than coercing to {}", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: { allow_anything: true, deny_anything: false },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.equal(out.function.parameters.properties.allow_anything, true);
      assert.equal(out.function.parameters.properties.deny_anything, false);
    });

    it("still coerces other non-object property values (null, string, number) to {}", () => {
      const tool = {
        type: "function",
        function: {
          name: "x",
          parameters: {
            type: "object",
            properties: { a: null, b: "junk", c: 1 },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.function.parameters.properties.a, {});
      assert.deepEqual(out.function.parameters.properties.b, {});
      assert.deepEqual(out.function.parameters.properties.c, {});
    });
  });

  describe("Responses API tool shape (top-level parameters)", () => {
    it("strips null from enum in Responses-format tool (top-level parameters)", () => {
      // /v1/responses tools have { type, name, parameters } at top level — no
      // `function` wrapper. They reach chatCore in this shape before the
      // request translator unwraps them, so the sanitizer must handle both.
      const tool = {
        type: "function",
        name: "fs_search",
        description: "search",
        parameters: {
          type: "object",
          properties: {
            output_mode: {
              type: "string",
              enum: ["a", "b", null],
            },
          },
        },
      };
      const out = sanitizeOpenAITool(tool);
      assert.equal(out.name, "fs_search");
      assert.deepEqual(out.parameters.properties.output_mode.enum, ["a", "b"]);
    });

    it("normalizes missing parameters in Responses-format tool", () => {
      const tool = { type: "function", name: "x" };
      const out = sanitizeOpenAITool(tool);
      assert.deepEqual(out.parameters, { type: "object", properties: {} });
    });

    it("does not touch Responses-format tool without type=function", () => {
      const tool = { type: "web_search", name: "websearch" };
      assert.deepEqual(sanitizeOpenAITool(tool), {
        type: "web_search",
        name: "websearch",
      });
    });
  });

  describe("non-function tools", () => {
    it("leaves Responses API built-in tool types untouched", () => {
      const tool = { type: "web_search" };
      assert.deepEqual(sanitizeOpenAITool(tool), { type: "web_search" });
    });
  });

  describe("sanitizeOpenAITools", () => {
    it("maps over an array", () => {
      const tools = [
        {
          type: "function",
          function: {
            name: "a",
            parameters: {
              type: "object",
              properties: { m: { type: "string", enum: ["x", null] } },
            },
          },
        },
        {
          type: "function",
          function: {
            name: "b",
            parameters: {
              type: "object",
              properties: { n: { type: "string" } },
            },
          },
        },
      ];
      const out = sanitizeOpenAITools(tools);
      assert.deepEqual(out[0].function.parameters.properties.m.enum, ["x"]);
      assert.deepEqual(out[1].function.parameters.properties.n, { type: "string" });
    });
  });
});
