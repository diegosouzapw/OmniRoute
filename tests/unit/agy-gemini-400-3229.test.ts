/**
 * #3229 — agy upstream 400 responses were MASKED as an empty
 * `chat.completion` envelope.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveAntigravityModelId } from "../../open-sse/config/antigravityModelAliases.ts";
import {
  buildAntigravityUpstreamError,
  projectAntigravityValidationDiagnostic,
} from "../../open-sse/executors/antigravityUpstreamError.ts";

test("(a) agy gemini-3.1-pro-low passes through to upstream unchanged (#3696)", () => {
  assert.equal(resolveAntigravityModelId("gemini-3.1-pro-low"), "gemini-3.1-pro-low");
  assert.equal(resolveAntigravityModelId("gemini-3.1-pro"), "gemini-3.1-pro");
});

test("(b) a non-ok upstream response becomes a generic error body", () => {
  const secret = "should-not-reach-client";
  const body = buildAntigravityUpstreamError(
    400,
    "Bad Request containing provider text",
    JSON.stringify({
      error: {
        code: 400,
        message: `Invalid function_declarations schema: ${secret}`,
        details: [{ prompt: secret }],
      },
    })
  );

  assert.notEqual((body as { object?: string }).object, "chat.completion");
  // Compare the SERIALIZED body: that is what the client actually receives, and it is the
  // surface the privacy rule is about. buildErrorBody always defines an `error.reason` key
  // (undefined here, so it never serializes); asserting on the in-memory object would pin an
  // unrelated implementation detail instead of the wire contract.
  assert.deepEqual(JSON.parse(JSON.stringify(body)), {
    error: {
      message: "Antigravity upstream error (400)",
      type: "invalid_request_error",
      code: "bad_request",
    },
  });
  assert.doesNotMatch(JSON.stringify(body), new RegExp(secret));

  const body2 = buildAntigravityUpstreamError(503, "Service Unavailable", "<html>oops</html>");
  assert.equal(body2.error.message, "Antigravity upstream error (503)");
  assert.equal("upstream_details" in body2, false);
});

test("projects only allowlisted scalar tokens and fixed validation classifications", () => {
  const diagnostic = projectAntigravityValidationDiagnostic(
    400,
    JSON.stringify({
      error: {
        code: 400,
        status: "INVALID_ARGUMENT",
        reason: "BAD_REQUEST",
        message: "Function declarations cannot contain additionalProperties",
        requestId: "request-secret",
        details: [{ field: "tools[0]", description: "prompt-secret" }],
      },
      unknown: "root-secret",
    })
  );

  assert.deepEqual(diagnostic, {
    httpStatus: 400,
    providerCode: 400,
    providerStatus: "INVALID_ARGUMENT",
    providerReason: "BAD_REQUEST",
    validationCategory: "tool_schema",
    validationField: "tools",
    schemaKeyword: "additionalProperties",
  });
  const serialized = JSON.stringify(diagnostic);
  assert.doesNotMatch(serialized, /request-secret|prompt-secret|root-secret|details|unknown/);
});

test("rejects non-token scalars and all compound provider fields", () => {
  const diagnostic = projectAntigravityValidationDiagnostic(
    400,
    JSON.stringify({
      error: {
        code: true,
        status: ["INVALID_ARGUMENT"],
        reason: { value: "BAD_REQUEST" },
        message: ["Function declarations are invalid"],
        details: { authorization: "Bearer secret" },
      },
    })
  );

  assert.deepEqual(diagnostic, {
    httpStatus: 400,
    validationCategory: "unknown_validation",
  });
});

test("does not project malformed, non-object, multiline, long, or sensitive scalars", () => {
  for (const rawBody of ["", "not json", "[]", '"string"', "null", "true"]) {
    assert.deepEqual(projectAntigravityValidationDiagnostic(502, rawBody), { httpStatus: 502 });
  }

  const longStatus = `INVALID_${"X".repeat(100)}`;
  const diagnostic = projectAntigravityValidationDiagnostic(
    400,
    JSON.stringify({
      error: {
        code: "Bearer secret-token",
        status: longStatus,
        reason: "BAD_REQUEST\nAuthorization: Bearer secret-token",
        message:
          "Validation failed at /private/service/source.ts with data:text/plain,secret payload",
      },
    })
  );

  assert.deepEqual(diagnostic, {
    httpStatus: 400,
    validationCategory: "unknown_validation",
  });
  const serialized = JSON.stringify(diagnostic);
  assert.doesNotMatch(serialized, /secret-token|private|data:text|Authorization/);
});

test("classifies supported request-validation categories without retaining messages", () => {
  const cases = [
    ["Missing thought_signature on function call", "thought_signature", "thought_signature"],
    ["Function call has no matching function response", "tool_pairing", "contents"],
    ["Function name is invalid", "tool_name", "tools"],
    ["Built-in tools cannot be mixed with custom function tools", "mixed_tool_types", "tools"],
    ["Invalid system_instruction", "system_instruction", "system_instruction"],
    ["Invalid role in contents[2]", "content_shape", "contents"],
  ] as const;

  for (const [message, validationCategory, validationField] of cases) {
    assert.deepEqual(
      projectAntigravityValidationDiagnostic(400, JSON.stringify({ error: { message } })),
      { httpStatus: 400, validationCategory, validationField }
    );
  }

  assert.deepEqual(
    projectAntigravityValidationDiagnostic(
      400,
      JSON.stringify({ error: { message: "Blocked due to safety policy" } })
    ),
    { httpStatus: 400, validationCategory: "policy_rejection" }
  );
});

// The classification is the only thing we keep, so a wrong one sends the repair at the wrong
// translator hook. Gemini phrases schema violations with the word "name" ("Unknown name
// \"additionalProperties\" at 'tools[0].function_declarations[0].parameters'") — that is a
// schema defect, not a tool-naming one.
test("a schema violation phrased with 'unknown name' is not misfiled as tool_name", () => {
  assert.deepEqual(
    projectAntigravityValidationDiagnostic(
      400,
      JSON.stringify({
        error: {
          message:
            "Invalid JSON payload received. Unknown name \"additionalProperties\" at 'tools[0].function_declarations[0].parameters'",
        },
      })
    ),
    {
      httpStatus: 400,
      validationCategory: "tool_schema",
      validationField: "tools",
      schemaKeyword: "additionalProperties",
    }
  );

  assert.equal(
    projectAntigravityValidationDiagnostic(
      400,
      JSON.stringify({
        error: { message: "Invalid function name: names must match ^[a-zA-Z0-9_-]{1,64}$" },
      })
    ).validationCategory,
    "tool_name"
  );
});
