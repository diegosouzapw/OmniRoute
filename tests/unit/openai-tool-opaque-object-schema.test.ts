import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeOpenAITool } from "../../open-sse/services/toolSchemaSanitizer.ts";
import { coerceToolSchemas } from "../../open-sse/translator/helpers/schemaCoercion.ts";

test("OpenAI sanitizer keeps generic MCP wrapper args open-world", () => {
  const sanitized = sanitizeOpenAITool({
    type: "function",
    function: {
      name: "SPLOX_EXECUTE_TOOL",
      parameters: {
        type: "object",
        properties: {
          mcp_server_id: { type: "string" },
          slug: { type: "string" },
          args: { type: "object", properties: {} },
        },
        required: ["mcp_server_id", "slug", "args"],
      },
    },
  }) as any;

  assert.equal(
    sanitized.function.parameters.properties.args.additionalProperties,
    true
  );
  assert.deepEqual(sanitized.function.parameters.properties.args.properties, {});
});

test("OpenAI Responses sanitizer keeps opaque execution/schema/additional_vars slots open-world", () => {
  const sanitized = sanitizeOpenAITool({
    type: "function",
    name: "dynamic_tools_register",
    parameters: {
      type: "object",
      properties: {
        execution: { type: "object", properties: {} },
        schema: { type: "object" },
        additional_vars: { type: "object", properties: {} },
      },
      required: ["execution", "schema"],
    },
  }) as any;

  const props = sanitized.parameters.properties;
  assert.equal(props.execution.additionalProperties, true);
  assert.equal(props.schema.additionalProperties, true);
  assert.deepEqual(props.schema.properties, {});
  assert.equal(props.additional_vars.additionalProperties, true);
});

test("schema coercion opens opaque nested objects after translation", () => {
  const coerced = coerceToolSchemas([
    {
      type: "function",
      function: {
        name: "remote_server_write_env",
        parameters: {
          type: "object",
          properties: {
            path: { type: "string" },
            additional_vars: { type: "object", properties: {} },
          },
        },
      },
    },
  ]) as any;

  assert.equal(
    coerced[0].function.parameters.properties.additional_vars.additionalProperties,
    true
  );
});

test("explicitly closed object schemas stay closed", () => {
  const sanitized = sanitizeOpenAITool({
    type: "function",
    function: {
      name: "closed",
      parameters: {
        type: "object",
        properties: {
          payload: {
            type: "object",
            properties: {},
            additionalProperties: false,
          },
        },
      },
    },
  }) as any;

  assert.equal(
    sanitized.function.parameters.properties.payload.additionalProperties,
    false
  );
});
