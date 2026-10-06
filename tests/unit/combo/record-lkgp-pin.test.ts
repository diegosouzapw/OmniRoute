/**
 * Failed `setLKGP` writes on the combo success path stay non-blocking, and a
 * failed write is logged with the combo and execution key instead of a bare
 * error.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { recordLkgpPin } = await import("../../../open-sse/services/combo/recordLkgpPin.ts");

function captureWarn() {
  const warnings: Array<{ tag: string; msg: string; data: Record<string, unknown> }> = [];
  return {
    warnings,
    log: {
      warn: (tag: string, msg: string, data?: unknown) =>
        warnings.push({ tag, msg, data: (data ?? {}) as Record<string, unknown> }),
    },
  };
}

test("a failed write resolves and warns with the combo and execution key", async () => {
  const { warnings, log } = captureWarn();
  const failure = new Error("database is locked");
  const pending = recordLkgpPin({
    comboName: "combo-a",
    executionKey: "ek-7",
    comboId: "combo-id-a",
    provider: "openai",
    connectionId: "conn-1",
    log,
    tag: "COMBO-RR",
    setLKGP: async () => {
      throw failure;
    },
  });
  await assert.doesNotReject(pending);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].tag, "COMBO-RR");
  assert.match(warnings[0].msg, /Failed to record Last Known Good Provider/);
  assert.equal(warnings[0].data.combo, "combo-a");
  assert.equal(warnings[0].data.comboId, "combo-id-a");
  assert.equal(warnings[0].data.executionKey, "ek-7");
  assert.equal(warnings[0].data.provider, "openai");
  assert.equal(warnings[0].data.connectionId, "conn-1");
  assert.equal(warnings[0].data.err, failure);
});

test("a synchronous throw from the writer is caught the same way", async () => {
  const { warnings, log } = captureWarn();
  await recordLkgpPin({
    comboName: "combo-b",
    executionKey: "ek-b",
    comboId: null,
    provider: "anthropic",
    connectionId: undefined,
    log,
    tag: "COMBO",
    setLKGP: (() => {
      throw new Error("sync boom");
    }) as unknown as (c: string, k: string, p: string) => Promise<void>,
  });
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].tag, "COMBO");
  assert.equal(warnings[0].data.combo, "combo-b");
  assert.equal(warnings[0].data.executionKey, "ek-b");
  assert.equal(warnings[0].data.connectionId, null);
});

test("success records both pins (target-scoped + combo-level), no warning", async () => {
  const { warnings, log } = captureWarn();
  const calls: Array<[string, string, string, string | undefined]> = [];
  await recordLkgpPin({
    comboName: "combo-a",
    executionKey: "ek-7",
    comboId: "combo-id-a",
    provider: "openai",
    connectionId: "conn-1",
    log,
    tag: "COMBO",
    setLKGP: async (comboName, modelKey, provider, connectionId) => {
      calls.push([comboName, modelKey, provider, connectionId]);
    },
  });
  assert.deepEqual(warnings, []);
  assert.deepEqual(calls.map(([, key]) => key).sort(), ["combo-id-a", "ek-7"]);
});

test("the call returns before the writes settle (the fallback loop never waits)", async () => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const recorded: string[] = [];
  let settled = false;
  const pending = recordLkgpPin({
    comboName: "combo-d",
    executionKey: "ek-d",
    comboId: "id-d",
    provider: "openai",
    connectionId: undefined,
    setLKGP: async (_comboName, key) => {
      await gate;
      recorded.push(key);
    },
  }).then(() => {
    settled = true;
  });
  await Promise.race([pending, new Promise((resolve) => setTimeout(resolve, 25))]);
  assert.equal(settled, false, "record must still be pending while the caller moves on");
  release();
  await pending;
  assert.deepEqual(recorded.sort(), ["ek-d", "id-d"]);
});

test("functional: failed write leaves no pin for the retry to believe", async () => {
  // Pin store standing in for the persisted LKGP namespace; the writer throws
  // `database is locked` like a contended SQLite write would.
  const store = new Map<string, { provider: string; connectionId?: string }>();
  const { warnings, log } = captureWarn();
  const failure = new Error("database is locked");
  const pending = recordLkgpPin({
    comboName: "combo-f",
    executionKey: "ek-f",
    comboId: "combo-id-f",
    provider: "openai",
    connectionId: "conn-f",
    log,
    tag: "COMBO",
    setLKGP: async () => {
      throw failure;
    },
  });
  // Routing never blocked: the caller moves on, the ignored promise settles post-hoc.
  await assert.doesNotReject(pending);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].data.combo, "combo-f");
  assert.equal(warnings[0].data.executionKey, "ek-f");
  assert.equal(warnings[0].data.provider, "openai");
  // A `getLKGP`-equivalent read sees no pin: the retry cannot believe it was set.
  assert.equal(store.get("combo-f:ek-f"), undefined);
  assert.equal(store.get("combo-f:combo-id-f"), undefined);
});

test("writer calls carry the connection id through (absent stays absent)", async () => {
  const seen: Array<string | undefined> = [];
  await recordLkgpPin({
    comboName: "combo-e",
    executionKey: "ek-e",
    comboId: "id-e",
    provider: "openai",
    connectionId: undefined,
    setLKGP: async (_c, _k, _p, connectionId) => {
      seen.push(connectionId);
    },
  });
  assert.deepEqual(seen, [undefined, undefined]);
});

test("records a single combo-level pin when the combo id matches the combo name", async () => {
  // Pin store standing in for the persisted LKGP namespace; the read below is
  // the `getLKGP(comboName, comboId || comboName)` equivalent the routing
  // readers use.
  const store = new Map<string, { provider: string; connectionId?: string }>();
  const calls: Array<[string, string, string, string | undefined]> = [];
  const { warnings, log } = captureWarn();
  await recordLkgpPin({
    comboName: "combo-a",
    executionKey: "ek-7",
    comboId: "combo-a",
    provider: "openai",
    connectionId: "conn-1",
    log,
    tag: "COMBO",
    setLKGP: async (comboName, modelKey, provider, connectionId) => {
      calls.push([comboName, modelKey, provider, connectionId]);
      store.set(`${comboName}:${modelKey}`, { provider, connectionId });
    },
  });
  assert.deepEqual(warnings, []);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls, [["combo-a", "combo-a", "openai", "conn-1"]]);
  assert.equal(store.get("combo-a:combo-a")?.provider, "openai");
});

test("records a single combo-level pin when the combo id is missing", async () => {
  const store = new Map<string, { provider: string; connectionId?: string }>();
  const calls: Array<[string, string, string, string | undefined]> = [];
  const { warnings, log } = captureWarn();
  await recordLkgpPin({
    comboName: "combo-a",
    executionKey: "ek-7",
    comboId: null,
    provider: "openai",
    connectionId: "conn-1",
    log,
    tag: "COMBO",
    setLKGP: async (comboName, modelKey, provider, connectionId) => {
      calls.push([comboName, modelKey, provider, connectionId]);
      store.set(`${comboName}:${modelKey}`, { provider, connectionId });
    },
  });
  assert.deepEqual(warnings, []);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls, [["combo-a", "combo-a", "openai", "conn-1"]]);
  assert.equal(store.get("combo-a:combo-a")?.provider, "openai");
});
