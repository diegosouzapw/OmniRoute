import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "oauth-export-test-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/oauth/[provider]/import-export/route.ts");

test.before(async () => {
  await settings.updateSettings({ requireLogin: false });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function post(provider: string, body: unknown) {
  return route.POST(
    new Request(`http://localhost/api/oauth/${provider}/import-export`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    { params: Promise.resolve({ provider }) }
  );
}

test("rejects unsupported providers before any upstream request", async () => {
  assert.equal((await post("codex", { accounts: [] })).status, 400);
});

test("rejects empty and oversized account arrays", async () => {
  assert.equal((await post("antigravity", { accounts: [] })).status, 400);
  assert.equal(
    (
      await post(
        "antigravity",
        Array.from({ length: 101 }, () => ({}))
      )
    ).status,
    400
  );
});

test("invalid and mismatched records return partial failure without credentials", async () => {
  const response = await post("antigravity", {
    accounts: [{ provider: "codex", access_token: "test-secret-not-for-response" }, {}],
  });
  const body = await response.json();
  assert.equal(body.imported, 0);
  assert.equal(body.failed, 2);
  assert.equal(body.success, false);
  assert.ok(!JSON.stringify(body).includes("test-secret-not-for-response"));
});

test("unauthenticated import is rejected when dashboard login is enabled", async () => {
  await settings.updateSettings({ requireLogin: true, password: "test-password-hash" });
  try {
    assert.equal((await post("antigravity", {})).status, 401);
  } finally {
    await settings.updateSettings({ requireLogin: false });
  }
});
