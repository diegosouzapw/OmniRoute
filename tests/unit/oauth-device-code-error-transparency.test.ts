import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression guard for "qwen / codebuddy-cn device-code show 'ошибка сервера OmniRoute'".
// The dynamic OAuth GET handler used to swallow EVERY thrown error into a generic
// `{ error: "Internal server error" }` 500, so a device-code upstream failure (qwen.ai /
// copilot.tencent.com — geo-block, outage, bad client) was indistinguishable from a real
// server bug. The fix surfaces the SANITIZED upstream message via sanitizeErrorMessage.
//
// Source-level guard: the route runs inside the Next server (auth + module graph), so a
// behavioural test would need a full request/auth/upstream mock; this pins the exact change.
const here = dirname(fileURLToPath(import.meta.url));
const route = readFileSync(
  resolve(here, "../../src/app/api/oauth/[provider]/[action]/route.ts"),
  "utf8"
);

test("OAuth GET catch surfaces the sanitized upstream reason, not a bare generic 500", () => {
  assert.match(
    route,
    /const detail = sanitizeErrorMessage\(/,
    "the GET catch must sanitize and surface the real error"
  );
  assert.match(
    route,
    /error:\s*detail\s*\|\|\s*"Internal server error"/,
    "the GET catch must return the sanitized detail (falling back to the generic only when empty)"
  );
});
