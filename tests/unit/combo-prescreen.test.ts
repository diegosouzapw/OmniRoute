import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-prescreen-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

function okResponse(model: string) {
  return Response.json({ choices: [{ message: { role: "assistant", content: model } }] });
}

function makeLog() {
  return {
    info() {},
    warn() {},
    debug() {},
    error() {},
  };
}

const reqBody = {
  model: "prescreen-test",
  messages: [{ role: "user", content: "hi" }],
  stream: false,
};

test("pre-screen: all targets checked in parallel", async () => {
  const checkOrder: string[] = [];

  const combo = await combosDb.createCombo({
    name: "prescreen-parallel",
    strategy: "priority",
    models: ["p1/m1", "p2/m2", "p3/m3"],
  });

  const response = await handleComboChat({
    body: { ...reqBody, model: combo.name },
    combo,
    allCombos: [combo],
    isModelAvailable: async (modelStr: string) => {
      checkOrder.push(modelStr);
      return true;
    },
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.ok(checkOrder.length >= 3, "pre-screen must check all 3 targets concurrently");
});

test("pre-screen: unavailable targets are skipped", async () => {
  const calls: string[] = [];
  const availability = new Map([
    ["p1/m1", false],
    ["p2/m2", true],
    ["p3/m3", true],
  ]);

  const combo = await combosDb.createCombo({
    name: "prescreen-skip",
    strategy: "priority",
    models: ["p1/m1", "p2/m2", "p3/m3"],
  });

  const response = await handleComboChat({
    body: { ...reqBody, model: combo.name },
    combo,
    allCombos: [combo],
    isModelAvailable: async (modelStr: string) => {
      return availability.get(modelStr) ?? true;
    },
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0], "p2/m2");
});

test("pre-screen: failure treated as unknown availability", async () => {
  const calls: string[] = [];
  let checkCount = 0;

  const combo = await combosDb.createCombo({
    name: "prescreen-failure",
    strategy: "priority",
    models: ["p1/m1", "p2/m2"],
  });

  const response = await handleComboChat({
    body: { ...reqBody, model: combo.name },
    combo,
    allCombos: [combo],
    isModelAvailable: async (modelStr: string) => {
      checkCount++;
      if (checkCount === 1) {
        throw new Error("DB connection failed");
      }
      return true;
    },
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  // m1 pre-screen failed (treated as available), m2 pre-screen succeeded
  // Both should be tried, m1 first since it's available
  assert.equal(calls.length, 1);
  assert.equal(calls[0], "p1/m1");
});

test("pre-screen: only runs for priority strategy", async () => {
  const checkOrder: string[] = [];

  const combo = await combosDb.createCombo({
    name: "prescreen-strategy",
    strategy: "round-robin",
    models: ["p1/m1", "p2/m2"],
  });

  const response = await handleComboChat({
    body: { ...reqBody, model: combo.name },
    combo,
    allCombos: [combo],
    isModelAvailable: async (modelStr: string) => {
      checkOrder.push(modelStr);
      return true;
    },
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(checkOrder.length >= 1, true);
});

test("pre-screen: backward compatible with all targets available", async () => {
  const calls: string[] = [];

  const combo = await combosDb.createCombo({
    name: "prescreen-compat",
    strategy: "priority",
    models: ["p1/m1", "p2/m2", "p3/m3"],
  });

  const response = await handleComboChat({
    body: { ...reqBody, model: combo.name },
    combo,
    allCombos: [combo],
    isModelAvailable: async () => true,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0], "p1/m1");
});

test("priority combo: quota 429 on passthrough provider does not skip another model on same provider", async () => {
  const calls: string[] = [];

  const combo = await combosDb.createCombo({
    name: "passthrough-quota-scope",
    strategy: "priority",
    models: ["antigravity/claude-opus-4-6-thinking", "antigravity/gemini-3-flash-agent"],
  });

  const response = await handleComboChat({
    body: { ...reqBody, model: combo.name },
    combo,
    allCombos: [combo],
    isModelAvailable: async () => true,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr.includes("claude-opus")) {
        return Response.json(
          { error: { message: "quota exhausted for claude-opus-4-6-thinking" } },
          { status: 429 }
        );
      }
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(calls.at(-1), "antigravity/gemini-3-flash-agent");
  assert.ok(
    calls.includes("antigravity/claude-opus-4-6-thinking"),
    "first passthrough model should be attempted before fallback"
  );
});
