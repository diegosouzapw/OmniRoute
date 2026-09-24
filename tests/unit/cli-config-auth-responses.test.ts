import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-config-auth-"));
const originalDataDir = process.env.DATA_DIR;
const originalPassword = process.env.INITIAL_PASSWORD;
process.env.DATA_DIR = dataDir;
process.env.INITIAL_PASSWORD = "test-cli-management-password";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const config = await import("../../src/app/api/cli-tools/config/route.ts");
const apply = await import("../../src/app/api/cli-tools/apply/route.ts");

test.before(async () => {
  await updateSettings({ requireLogin: true, password: "" });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalPassword === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = originalPassword;
});

for (const { route, method, handler } of [
  { route: "config", method: "GET", handler: config.GET },
  { route: "config", method: "POST", handler: config.POST },
  { route: "apply", method: "POST", handler: apply.POST },
]) {
  test(`${method} ${route} preserves private 401/403 responses before reading input`, async () => {
    for (const authenticated of [false, true]) {
      const request = new Request(`http://localhost/api/cli-tools/${route}`, {
        method,
        headers: authenticated ? { authorization: "Bearer invalid-test-management-token" } : {},
        // A malformed body must not take precedence over the auth rejection.
        ...(method === "POST" ? { body: "{invalid" } : {}),
      });
      const response = await handler(request);
      assert.equal(response.status, authenticated ? 403 : 401);
      assert.equal(response.headers.get("cache-control"), "no-store");
      const body = await response.json();
      assert.equal(
        body.error.message,
        authenticated ? "Invalid management token" : "Authentication required"
      );
      assert.ok(!JSON.stringify(body).includes("invalid-test-management-token"));
      assert.ok(!JSON.stringify(body).includes("at /"));
      assert.equal(request.bodyUsed, false, "rejected callers must not reach input processing");
    }
  });
}
