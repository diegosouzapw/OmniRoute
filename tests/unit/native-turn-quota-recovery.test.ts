import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "turn-quota-recovery-"));
process.env.DATA_DIR = dir;
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { lockExactModel, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { getNativeCodexTurnPin, clearNativeCodexTurnPinsForTests } =
  await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  clearAllModelLockouts();
  clearNativeCodexTurnPinsForTests();
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
test("same single-model native turn resumes after quota lock clears", async () => {
  const model = "codex/gpt-6-astra";
  const body = {
    stream: false,
    input: [{ role: "user", content: "hello" }],
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({ thread_id: "quota-test", turn_id: "same-turn" }),
    },
  };
  const combo = {
    name: "quota-recovery",
    strategy: "priority" as const,
    models: [{ id: "one", kind: "model" as const, model, connectionId: "account", weight: 1 }],
    config: { maxRetries: 0 },
  };
  let dispatched = 0;
  const run = () =>
    handleComboChat({
      body,
      combo,
      clientManagedResponsesContext: true,
      settings: { resilienceSettings: { comboCooldownWait: { enabled: false } } },
      allCombos: null,
      log: { info() {}, warn() {}, debug() {} },
      isModelAvailable: async () => true,
      handleSingleModel: async (_body, selected) => {
        assert.equal(selected, model);
        dispatched++;
        return new Response("{}", { headers: { "x-omniroute-selected-connection-id": "account" } });
      },
    });
  assert.equal((await run()).status, 200);
  lockExactModel("codex", "account", "gpt-6-astra", "quota_exhausted", 120000);
  const limited = await run();
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("Retry-After")) > 0);
  assert.equal(dispatched, 1);
  assert.equal(getNativeCodexTurnPin(body, combo.name)?.connectionId, "account");
  clearAllModelLockouts();
  assert.equal((await run()).status, 200);
  assert.equal(dispatched, 2);
});

// A plain turn (no opaque state, no pending tool call) is NOT pinned through an account
// block: it auto-resumes on the healthy alternate (#13180/#13564) — see the test below.
for (const continuation of ["opaque", "pending-tool"]) {
  test(`account availability without a model lock preserves the ${continuation} turn`, async () => {
    clearAllModelLockouts();
    clearNativeCodexTurnPinsForTests();
    const model = "codex/gpt-6-astra";
    const body = {
      stream: false,
      input: [
        { role: "user", content: "hello" },
        ...(continuation === "opaque"
          ? [{ type: "reasoning", encrypted_content: "synthetic-continuation" }]
          : continuation === "pending-tool"
            ? [{ type: "function_call", call_id: "pending", name: "test", arguments: "{}" }]
            : []),
      ],
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "availability",
          turn_id: continuation,
        }),
      },
    };
    const combo = {
      name: `account-availability-${continuation}`,
      strategy: "priority" as const,
      // No explicit connection, matching the production auto-selected target.
      models: [model, "openai/other-model"],
      config: { maxRetries: 0, maxSetRetries: 0 },
    };
    let available = true;
    let dispatched = 0;
    const run = () =>
      handleComboChat({
        body,
        combo,
        clientManagedResponsesContext: true,
        settings: { resilienceSettings: { comboCooldownWait: { enabled: false } } },
        allCombos: null,
        log: { info() {}, warn() {}, debug() {} },
        // Quota policy + persisted account cooldowns collapse to false here,
        // even when no in-memory per-model lock exists anymore.
        isModelAvailable: async (selected) => selected !== model || available,
        handleSingleModel: async (_body, selected) => {
          assert.equal(selected, model, "must not send continuation state to an alternate model");
          dispatched++;
          return new Response("{}", {
            headers: { "x-omniroute-selected-connection-id": "account" },
          });
        },
      });
    assert.equal((await run()).status, 200);
    available = false;
    const unavailable = await run();
    assert.equal(unavailable.status, 503);
    assert.ok(!(await unavailable.text()).includes("Start a new turn"));
    assert.equal(dispatched, 1);
    assert.equal(getNativeCodexTurnPin(body, combo.name)?.modelStr, model);
    available = true;
    assert.equal((await run()).status, 200);
    assert.equal(dispatched, 2);
  });
}

test("account availability without a model lock auto-resumes a plain turn on the healthy alternate", async () => {
  clearAllModelLockouts();
  clearNativeCodexTurnPinsForTests();
  const model = "codex/gpt-6-astra";
  const alternate = "openai/other-model";
  const body = {
    stream: false,
    input: [{ role: "user", content: "hello" }],
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({ thread_id: "availability", turn_id: "plain" }),
    },
  };
  const combo = {
    name: "account-availability-plain",
    strategy: "priority" as const,
    models: [model, alternate],
    config: { maxRetries: 0, maxSetRetries: 0 },
  };
  let available = true;
  const selections: string[] = [];
  const run = () =>
    handleComboChat({
      body,
      combo,
      clientManagedResponsesContext: true,
      settings: { resilienceSettings: { comboCooldownWait: { enabled: false } } },
      allCombos: null,
      log: { info() {}, warn() {}, debug() {} },
      isModelAvailable: async (selected) => selected !== model || available,
      handleSingleModel: async (_body, selected) => {
        selections.push(selected);
        return new Response("{}", {
          headers: { "x-omniroute-selected-connection-id": "account" },
        });
      },
    });
  assert.equal((await run()).status, 200);
  available = false;
  // An account block of unknown length must not strand a resumable plain turn on 503.
  assert.equal((await run()).status, 200);
  assert.deepEqual(selections, [model, alternate]);
});

test("persisted account cooldown plus exhausted sibling quota recovers without a new turn", async () => {
  clearAllModelLockouts();
  clearNativeCodexTurnPinsForTests();
  const providers = await import("../../src/lib/db/providers.ts");
  const auth = await import("../../src/sse/services/auth.ts");
  const quotaCache = await import("../../src/domain/quotaCache.ts");
  const createAccount = (name: string) =>
    providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name,
      isActive: true,
      testStatus: "active",
      accessToken: "synthetic-access",
      refreshToken: "synthetic-refresh",
    });
  const healthy = await createAccount("cooling-account");
  const exhausted = await createAccount("quota-account");
  await providers.updateProviderConnection(exhausted.id, {
    providerSpecificData: {
      codexQuotaStateByScope: {
        codex: {
          usage5h: 100,
          limit5h: 100,
          resetAt5h: new Date(Date.now() + 3600000).toISOString(),
          usage7d: 10,
          limit7d: 100,
          resetAt7d: new Date(Date.now() + 86400000).toISOString(),
          observedAt: new Date().toISOString(),
        },
      },
    },
  });
  const model = "codex/gpt-6-astra";
  const body = {
    stream: false,
    input: [{ type: "reasoning", encrypted_content: "synthetic-state" }],
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({ thread_id: "persisted", turn_id: "same" }),
    },
  };
  const combo = {
    name: "persisted-availability",
    strategy: "priority" as const,
    models: [model],
    config: { maxRetries: 0 },
  };
  let dispatched = 0;
  const select = () =>
    auth.getProviderCredentials("codex", null, [healthy.id, exhausted.id], "gpt-6-astra");
  const run = () =>
    handleComboChat({
      body,
      combo,
      clientManagedResponsesContext: true,
      settings: { resilienceSettings: { comboCooldownWait: { enabled: false } } },
      allCombos: null,
      log: { info() {}, warn() {}, debug() {} },
      isModelAvailable: async () => Boolean((await select())?.connectionId),
      handleSingleModel: async () => {
        const creds = await select();
        assert.equal(creds?.connectionId, healthy.id);
        dispatched++;
        return new Response("{}", {
          headers: { "x-omniroute-selected-connection-id": healthy.id },
        });
      },
    });
  assert.equal((await run()).status, 200);
  await providers.updateProviderConnection(healthy.id, {
    rateLimitedUntil: new Date(Date.now() + 30000).toISOString(),
    testStatus: "unavailable",
    lastError: "synthetic upstream overload",
    errorCode: "502",
  });
  assert.ok(!(await select())?.connectionId, "both accounts must actually be filtered");
  const blocked = await run();
  assert.ok(
    [429, 503].includes(blocked.status),
    `expected retryable response, got ${blocked.status}`
  );
  assert.ok(!(await blocked.text()).includes("Start a new turn"));
  assert.equal(getNativeCodexTurnPin(body, combo.name)?.connectionId, healthy.id);
  assert.equal(dispatched, 1);
  await providers.updateProviderConnection(healthy.id, {
    rateLimitedUntil: new Date(Date.now() - 1000).toISOString(),
    testStatus: "active",
  });
  assert.equal((await run()).status, 200);
  assert.equal(dispatched, 2);
  quotaCache.__clearForTests();
});
