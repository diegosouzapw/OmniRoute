import assert from "node:assert/strict";
import test from "node:test";
import {
  __test_resetCredentialHealthCache,
  getCredentialHealth,
  isCredentialHealthy,
  setCredentialHealth,
} from "../../src/lib/credentialHealth/cache.ts";
import { persistConnectionTestHealth } from "../../src/app/api/providers/[id]/test/connectionTestHealth.ts";

const options = () => ({
  connectionId: "synthetic-manual",
  provider: "codex",
  connection: {
    testStatus: "error",
    lastError: "Quota window is closed",
    lastErrorAt: "2026-10-14T00:00:00.000Z",
    lastErrorType: "quota_exhausted",
    lastErrorSource: "upstream",
    errorCode: "429",
    rateLimitedUntil: "2099-01-01T00:00:00.000Z",
  },
  latest: {},
  result: { valid: true },
  diagnosis: { type: "ok", source: "upstream", code: null },
  operatorDisabled: false,
  clearErrorState: false,
  now: "2026-10-14T00:01:00.000Z",
});

test.afterEach(() => __test_resetCredentialHealthCache());

test(
  "persisted manual success immediately recovers cache without clearing future quota",
  { timeout: 2000 },
  async () => {
    const input = options();
    setCredentialHealth(
      input.connectionId,
      input.provider,
      "error",
      "Rejected",
      "upstream_auth_error"
    );
    let update: Record<string, unknown> | undefined;
    await persistConnectionTestHealth({
      ...input,
      persist: async (id, fields) => {
        assert.equal(id, input.connectionId);
        assert.equal(
          isCredentialHealthy(id),
          false,
          "recovery must wait for committed persistence"
        );
        update = fields;
      },
    });
    assert.equal(isCredentialHealthy(input.connectionId), true);
    assert.equal(getCredentialHealth(input.connectionId)?.lastError, undefined);
    assert.equal(update?.rateLimitedUntil, input.connection.rateLimitedUntil);
    assert.equal(update?.testStatus, "error");
    assert.equal(update?.lastError, input.connection.lastError);
    assert.equal(update?.lastErrorType, "quota_exhausted");
    assert.equal(update?.errorCode, "429");
    assert.equal(Object.hasOwn(update!, "backoffLevel"), false);
  }
);

test("failed persistence cannot advertise recovered credentials", { timeout: 2000 }, async () => {
  const input = options();
  setCredentialHealth(
    input.connectionId,
    input.provider,
    "error",
    "Rejected",
    "upstream_auth_error"
  );
  await assert.rejects(
    persistConnectionTestHealth({
      ...input,
      persist: async () => {
        throw new Error("Synthetic write failure");
      },
    }),
    /Synthetic write failure/
  );
  assert.equal(isCredentialHealthy(input.connectionId), false);
});

test(
  "a connection deleted during validation cannot advertise recovered credentials",
  { timeout: 2000 },
  async () => {
    const input = options();
    setCredentialHealth(
      input.connectionId,
      input.provider,
      "error",
      "Rejected",
      "upstream_auth_error"
    );
    await assert.rejects(
      persistConnectionTestHealth({ ...input, persist: async () => null }),
      /Connection no longer exists/
    );
    assert.equal(isCredentialHealthy(input.connectionId), false);
  }
);

test(
  "operator-disabled success preserves activation guard and existing clear-state decision",
  { timeout: 2000 },
  async () => {
    let update: Record<string, unknown> = {};
    await persistConnectionTestHealth({
      ...options(),
      operatorDisabled: true,
      clearErrorState: true,
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(Object.hasOwn(update, "isActive"), false);
    assert.equal(update.testStatus, "active");
    assert.equal(update.rateLimitedUntil, null);
    assert.equal(update.lastError, null);
    assert.equal(update.backoffLevel, 0);
  }
);

test(
  "failed probes keep transient cooldown and terminal-state update semantics",
  { timeout: 2000 },
  async () => {
    const input = options();
    let update: Record<string, unknown> = {};
    await persistConnectionTestHealth({
      ...input,
      result: { valid: false, error: "Transient network failure" },
      diagnosis: { type: "network_error", source: "upstream", code: "network_error" },
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(update.testStatus, "error");
    assert.equal(Object.hasOwn(update, "isActive"), false);
    assert.ok(Date.parse(String(update.rateLimitedUntil)) > Date.now());
    assert.equal(getCredentialHealth(input.connectionId), undefined);
    await persistConnectionTestHealth({
      ...input,
      result: { valid: false, error: "Terminal failure" },
      diagnosis: { type: "expired", source: "account", code: "expired" },
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(update.rateLimitedUntil, input.connection.rateLimitedUntil);
  }
);
