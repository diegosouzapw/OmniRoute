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
const providersDb = await import("../../src/lib/db/providers.ts");

async function withFakeUpstream(run: () => Promise<void>) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://oauth2.googleapis.com/token") {
      assert.ok(String(init?.body).includes("test-refresh"));
      return Response.json({ access_token: "test-fresh-access", expires_in: 3600 });
    }
    if (url.includes("/userinfo")) {
      assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer test-fresh-access");
      return Response.json({ email: "imported@example.com" });
    }
    if (url.includes(":loadCodeAssist")) {
      return Response.json({
        cloudaicompanionProject: "test-project",
        currentTier: { id: "test-tier" },
      });
    }
    if (url.includes(":onboardUser")) return Response.json({ done: true });
    throw new Error("Unexpected network request blocked by test");
  };
  try {
    await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

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

test("refreshes before discovery, persists tokens, and reimports without duplicates", async () => {
  await withFakeUpstream(async () => {
    const record = { token: { access_token: "test-stale-access", refresh_token: "test-refresh" } };
    const first = await (await post("antigravity", { accounts: [record] })).json();
    assert.equal(first.imported, 1);
    assert.equal(first.failed, 0);
    const stored = await providersDb.getProviderConnectionById(first.results[0].connectionId);
    assert.equal(stored?.accessToken, "test-fresh-access");
    assert.equal(stored?.refreshToken, "test-refresh");
    assert.equal(stored?.projectId, "test-project");
    assert.equal(stored?.testStatus, "active");
    const second = await (await post("antigravity", [record])).json();
    assert.equal(second.imported, 1);
    assert.equal(second.results[0].connectionId, first.results[0].connectionId);
    const rows = await providersDb.getProviderConnections({ provider: "antigravity" });
    assert.equal(rows.length, 1);
    assert.ok(!JSON.stringify(first).includes("test-refresh"));
    assert.ok(!JSON.stringify(first).includes("test-fresh-access"));
  });
});

test("valid and invalid records yield an accurate partial success", async () => {
  await withFakeUpstream(async () => {
    const body = await (
      await post("agy", {
        accounts: [
          { token: { accessToken: "test-stale-access", refreshToken: "test-refresh" } },
          {},
        ],
      })
    ).json();
    assert.equal(body.imported, 1);
    assert.equal(body.failed, 1);
    assert.equal(body.total, 2);
    assert.equal(body.success, false);
  });
});

test("failed identity lookup cannot overwrite an existing account via claimed email", async () => {
  const existing = (await providersDb.getProviderConnections({ provider: "antigravity" }))[0];
  assert.ok(existing);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ error: "invalid token" }, { status: 401 });
  try {
    const result = await (
      await post("antigravity", {
        accounts: [
          {
            email: existing.email,
            token: { access_token: "test-invalid-token", refresh_token: "test-invalid-refresh" },
          },
        ],
      })
    ).json();
    assert.equal(result.imported, 0);
    assert.equal(result.failed, 1);
    const stored = await providersDb.getProviderConnectionById(String(existing.id));
    assert.equal(stored?.accessToken, existing.accessToken);
    assert.equal(stored?.refreshToken, existing.refreshToken);
    assert.equal((await providersDb.getProviderConnections({ provider: "antigravity" })).length, 1);
    assert.ok(!JSON.stringify(result).includes("test-invalid-token"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
