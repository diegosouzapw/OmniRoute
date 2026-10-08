import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "connection-test-message-"));
process.env.DATA_DIR = directory;
process.env.APP_LOG_TO_FILE = "false";
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/providers/[id]/test-message/route.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const originalFetch = globalThis.fetch;
const context = (id: string) => ({ params: Promise.resolve({ id }) });
const request = (id: string, method: string, body?: unknown) =>
  makeManagementSessionRequest(`http://localhost/api/providers/${id}/test-message`, {
    method,
    ...(body === undefined ? {} : { body }),
  });
async function connection(apiKey: string, extra: Record<string, unknown> = {}) {
  return db.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { connectionTestModel: "gpt-4o-2024-11-20" },
    ...extra,
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(async () => {
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  flushProxyLogsSync();
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("all connection-message operations require management authentication", async () => {
  await settingsDb.updateSettings({ requireLogin: true, password: "test" });
  for (const method of ["GET", "PUT", "POST"] as const) {
    const response = await route[method](
      new Request("http://localhost/api/providers/missing/test-message", { method }),
      context("missing")
    );
    assert.equal(response.status, 401);
  }
});

test("model settings are per connection, preserve provider data and do not send", async () => {
  const first = await connection("sk-connection-test-a", {
    providerSpecificData: { workspaceId: "workspace-a" },
  });
  const second = await connection("sk-connection-test-b");
  globalThis.fetch = async () => {
    throw new Error("Saving must not send upstream");
  };
  const response = await route.PUT(
    await request(first.id, "PUT", { modelId: "gpt-4o-mini" }),
    context(first.id)
  );
  assert.equal(response.status, 200);
  const saved = await db.getProviderConnectionById(first.id);
  assert.equal(saved?.providerSpecificData.workspaceId, "workspace-a");
  assert.equal(saved?.providerSpecificData.connectionTestModel, "gpt-4o-mini");
  const firstConfig = await (
    await route.GET(await request(first.id, "GET"), context(first.id))
  ).json();
  const secondConfig = await (
    await route.GET(await request(second.id, "GET"), context(second.id))
  ).json();
  assert.equal(firstConfig.modelId, "gpt-4o-mini");
  assert.equal(secondConfig.modelId, "gpt-4o-2024-11-20");
  assert.equal(JSON.stringify(firstConfig).includes("sk-connection"), false);
});

test("custom prompt goes to exactly the selected account and repeat sends bypass cache", async () => {
  await connection("sk-unselected-account");
  const selected = await connection("sk-selected-account");
  await settingsDb.updateSettings({
    connectionTestPrompt: "Reply with only 2.",
    hidePaidModels: false,
  });
  let calls = 0;
  globalThis.fetch = async (_url, init) => {
    calls++;
    const headers = new Headers(init?.headers);
    assert.equal(headers.get("authorization"), "Bearer sk-selected-account");
    const body = JSON.parse(String(init?.body));
    assert.equal(body.model, "gpt-4o-2024-11-20");
    assert.deepEqual(body.messages, [{ role: "user", content: "Reply with only 2." }]);
    assert.equal(body.max_tokens, 64);
    return Response.json({ choices: [{ message: { role: "assistant", content: "2" } }] });
  };
  for (let i = 0; i < 2; i++) {
    const response = await route.POST(await request(selected.id, "POST"), context(selected.id));
    const body = await response.json();
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.equal(body.responseText, "2");
    assert.equal(body.prompt, "Reply with only 2.");
  }
  assert.equal(calls, 2);
});

test("disabled and unconfigured accounts never dispatch", async () => {
  const disabled = await connection("sk-disabled", { isActive: false });
  const unconfigured = await connection("sk-unconfigured", { providerSpecificData: {} });
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("unexpected upstream");
  };
  assert.equal(
    (await route.POST(await request(disabled.id, "POST"), context(disabled.id))).status,
    409
  );
  assert.equal(
    (await route.POST(await request(unconfigured.id, "POST"), context(unconfigured.id))).status,
    400
  );
  assert.equal(calls, 0);
});

test("concurrent clicks send only one upstream request for a connection", async () => {
  const selected = await connection("sk-concurrent-account");
  let release!: () => void;
  let started!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  const dispatched = new Promise<void>((resolve) => {
    started = resolve;
  });
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    started();
    await pending;
    return Response.json({ choices: [{ message: { role: "assistant", content: "2" } }] });
  };
  const first = route.POST(await request(selected.id, "POST"), context(selected.id));
  await dispatched;
  try {
    assert.equal(
      (await route.POST(await request(selected.id, "POST"), context(selected.id))).status,
      409
    );
  } finally {
    release();
  }
  assert.equal((await first).status, 200);
  assert.equal(calls, 1);
});

test("invalid models and oversized or blank messages are rejected", async () => {
  assert.equal(updateSettingsSchema.safeParse({ connectionTestPrompt: " " }).success, false);
  assert.equal(
    updateSettingsSchema.safeParse({ connectionTestPrompt: "x".repeat(501) }).success,
    false
  );
  assert.equal(updateSettingsSchema.safeParse({ connectionTestPrompt: "Hello" }).success, true);
  const selected = await connection("sk-invalid-model");
  const response = await route.PUT(
    await request(selected.id, "PUT", { modelId: "bad\nmodel" }),
    context(selected.id)
  );
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.error.message.includes("at /"), false);
});

test("paid-model policy also applies to manual messages", async () => {
  const selected = await connection("sk-policy-model");
  await settingsDb.updateSettings({ hidePaidModels: true });
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("unexpected upstream");
  };
  try {
    assert.equal(
      (await route.POST(await request(selected.id, "POST"), context(selected.id))).status,
      403
    );
  } finally {
    await settingsDb.updateSettings({ hidePaidModels: false });
  }
  assert.equal(calls, 0);
});

test("failed selected account never falls back to another account", async () => {
  await connection("sk-other-on-failure");
  const selected = await connection("sk-selected-failing");
  let calls = 0;
  globalThis.fetch = async (_url, init) => {
    calls++;
    assert.equal(new Headers(init?.headers).get("authorization"), "Bearer sk-selected-failing");
    return Response.json(
      { error: { message: "Model unavailable", type: "invalid_request_error" } },
      { status: 404 }
    );
  };
  const response = await route.POST(await request(selected.id, "POST"), context(selected.id));
  assert.notEqual(response.status, 200);
  assert.equal(calls, 1);
  assert.equal((await db.getProviderConnectionById(selected.id))?.isActive, true);
});

test("Edit Connection persists, preserves and clears the shared test model", async () => {
  const editRoute = await import("../../src/app/api/providers/[id]/route.ts");
  const selected = await connection("sk-edit-connection-test", {
    providerSpecificData: { connectionTestModel: "original", workspaceId: "keep" },
  });
  globalThis.fetch = async () => {
    throw new Error("Saving connection settings must not generate");
  };
  const save = async (providerSpecificData: Record<string, unknown>) => {
    const response = await editRoute.PUT(
      await makeManagementSessionRequest(`http://localhost/api/providers/${selected.id}`, {
        method: "PUT",
        body: { providerSpecificData },
      }),
      context(selected.id)
    );
    assert.equal(response.status, 200);
    return (await route.GET(await request(selected.id, "GET"), context(selected.id))).json();
  };
  assert.equal((await save({ connectionTestModel: "gpt-4o-mini" })).modelId, "gpt-4o-mini");
  assert.equal((await save({ tag: "changed" })).modelId, "gpt-4o-mini");
  assert.equal(
    (await db.getProviderConnectionById(selected.id))?.providerSpecificData.workspaceId,
    "keep"
  );
  assert.equal((await save({ connectionTestModel: null })).modelId, "");
});
