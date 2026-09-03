import test from "node:test";
import assert from "node:assert/strict";

const { captureConfiguredHeaders } = await import("../../../open-sse/services/inAppLoginService.ts");

test("captureConfiguredHeaders records configured headers case-insensitively", () => {
  const credentials: Record<string, string> = {};

  captureConfiguredHeaders(
    [{ type: "header", name: "Authorization" }],
    { authorization: "Bearer access-token", accept: "application/json" },
    credentials
  );

  assert.deepEqual(credentials, { Authorization: "Bearer access-token" });
});

test("captureConfiguredHeaders ignores cookies and does not replace a captured token", () => {
  const credentials = { Authorization: "Bearer first-token" };

  captureConfiguredHeaders(
    [
      { type: "cookie", name: "session", domain: ".example.com" },
      { type: "header", name: "Authorization" },
    ],
    { authorization: "Bearer replacement-token", cookie: "session=value" },
    credentials
  );

  assert.deepEqual(credentials, { Authorization: "Bearer first-token" });
});
