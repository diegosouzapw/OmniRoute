import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { captureConfiguredHeaders } = require("../../../electron/lib/loginHeaderCapture.js");

test("Electron login header capture handles original-case request headers", () => {
  const credentials: Record<string, string> = {};

  captureConfiguredHeaders(
    [{ type: "header", name: "Authorization" }],
    { Authorization: "Bearer electron-token", Accept: "application/json" },
    credentials
  );

  assert.deepEqual(credentials, { Authorization: "Bearer electron-token" });
});

test("Electron login header capture ignores non-header sources", () => {
  const credentials: Record<string, string> = {};

  captureConfiguredHeaders(
    [{ type: "cookie", name: "RPSCAuth" }],
    { Cookie: "RPSCAuth=not-an-access-token" },
    credentials
  );

  assert.deepEqual(credentials, {});
});
