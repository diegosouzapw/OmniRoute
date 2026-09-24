// Regression coverage for issue #13591: Antigravity double-wraps its own errors, so
// parseUpstreamError() (the shared chatCore failure-classification path) only ever saw
// the generic "Antigravity upstream error (400)" template instead of the real Gemini
// upstream detail buried under `upstream_details`. buildAntigravityUpstreamError() must
// surface the real upstream message as `error.message` directly.
import assert from "node:assert/strict";
import { test } from "node:test";
import { buildAntigravityUpstreamError } from "../../open-sse/executors/antigravityUpstreamError.ts";
import { parseUpstreamError } from "../../open-sse/utils/error.ts";

test("issue #13591: parseUpstreamError surfaces the real upstream detail for an Antigravity-wrapped 400", async () => {
  const rawUpstreamGeminiBody = JSON.stringify({
    error: {
      code: 400,
      message:
        "Invalid value at 'tools[0].function_declarations[0].parameters.properties[0].value' " +
        '(type.googleapis.com/google.ai.generativelanguage.v1beta.Schema), "string"',
      status: "INVALID_ARGUMENT",
    },
  });

  const wrappedErrorBody = buildAntigravityUpstreamError(400, "", rawUpstreamGeminiBody);

  assert.ok(
    JSON.stringify(wrappedErrorBody).includes("function_declarations"),
    "sanity: buildAntigravityUpstreamError should embed the real upstream detail somewhere in the body"
  );
  assert.ok(
    (wrappedErrorBody as { error: { message: string } }).error.message.includes(
      "function_declarations"
    ),
    "buildAntigravityUpstreamError should surface the real upstream detail directly in error.message"
  );

  const wrappedResponse = new Response(JSON.stringify(wrappedErrorBody), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });

  const parsed = await parseUpstreamError(wrappedResponse, "antigravity");

  assert.ok(
    parsed.message.includes("function_declarations"),
    `expected parseUpstreamError to surface the real upstream detail, but got: ${JSON.stringify(parsed.message)}`
  );
});

test("issue #13591: geo-blocked branch keeps its explicit hint message untouched", () => {
  const geoBlockedBody = JSON.stringify({
    error: {
      message: "User location is not supported for the API use.",
    },
  });

  const wrappedErrorBody = buildAntigravityUpstreamError(400, "Bad Request", geoBlockedBody) as {
    error: { message: string };
  };

  assert.ok(
    wrappedErrorBody.error.message.includes(
      "not offered from this server's current egress location"
    ),
    "geo-blocked responses must keep the operator-facing hint, not the raw upstream text"
  );
});

test("issue #13591: non-JSON upstream body falls back to the generic templated message without throwing", () => {
  const htmlErrorPage = "<html><body>502 Bad Gateway</body></html>";

  const wrappedErrorBody = buildAntigravityUpstreamError(502, "Bad Gateway", htmlErrorPage) as {
    error: { message: string };
  };

  assert.equal(wrappedErrorBody.error.message, "Antigravity upstream error (502): Bad Gateway");
});
