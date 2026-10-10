import assert from "node:assert/strict";
import fs from "node:fs";
import { Socket } from "node:net";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";

const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mid-models-16127-"));
const previousEnv = { DATA_DIR: process.env.DATA_DIR, HOME: process.env.HOME };
process.env.DATA_DIR = path.join(testRoot, "data");
process.env.HOME = path.join(testRoot, "home");
fs.mkdirSync(process.env.DATA_DIR, { recursive: true });
fs.mkdirSync(process.env.HOME, { recursive: true });
mock.method(globalThis, "fetch", async () => {
  throw new Error("Unexpected network request in the model capability matrix");
});
mock.method(Socket.prototype, "connect", () => {
  throw new Error("Unexpected socket in the model capability matrix");
});

const { shouldUseMidConversationSystem, selectBetaFlags } =
  await import("../../open-sse/executors/claudeIdentity.ts");

test.after(() => {
  mock.restoreAll();
  for (const [key, value] of Object.entries(previousEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(testRoot, { recursive: true, force: true });
});

function agentBody(model: string) {
  return { model, system: "You are a careful assistant.", tools: [{ name: "Read" }] };
}

for (const model of ["claude-sonnet-5-5", "claude-haiku-5-5"]) {
  for (const id of [model, `claude/${model}`, `${model}[1m]`, `claude/${model}[1m]`]) {
    test(`${id} supports mid-conversation system instructions (#16127)`, () => {
      assert.equal(shouldUseMidConversationSystem(agentBody(id)), true);
    });
  }
  for (const [shape, change] of [
    ["missing system", { system: undefined }],
    ["empty string system", { system: "" }],
    ["empty block system", { system: [] }],
    ["missing tools", { tools: undefined }],
    ["empty tools", { tools: [] }],
  ] as const) {
    test(`${model} retains the ${shape} exclusion`, () => {
      assert.equal(shouldUseMidConversationSystem({ ...agentBody(model), ...change }), false);
    });
  }
  test(`${model} accepts an existing system block array`, () => {
    assert.equal(
      shouldUseMidConversationSystem({
        ...agentBody(model),
        system: [{ type: "text", text: "Base" }],
      }),
      true
    );
  });
}

for (const model of ["claude-sonnet-5", "claude-sonnet-4-6", "claude-haiku-4-5", "gpt-6"]) {
  test(`${model} keeps the legacy mid-conversation exclusion`, () => {
    assert.equal(shouldUseMidConversationSystem(agentBody(model)), false);
    assert.ok(!selectBetaFlags(agentBody(model)).includes("mid-conversation-system-2026-04-07"));
  });
}

for (const model of [
  "claude-opus-4-7",
  "claude/claude-opus-5[1m]",
  "claude-fable-5",
  "claude-fable-5-1",
]) {
  test(`${model} retains its existing support`, () => {
    assert.equal(shouldUseMidConversationSystem(agentBody(model)), true);
  });
}

test("the resolved model overrides body.model in both directions", () => {
  assert.equal(
    shouldUseMidConversationSystem(agentBody("claude-sonnet-5"), "claude-sonnet-5-5"),
    true
  );
  assert.equal(
    shouldUseMidConversationSystem(agentBody("claude-sonnet-5-5"), "claude-sonnet-5"),
    false
  );
});

test("null or missing request bodies do not enable the feature", () => {
  assert.equal(shouldUseMidConversationSystem(null, "claude-sonnet-5-5"), false);
  assert.equal(shouldUseMidConversationSystem(undefined, "claude-haiku-5-5"), false);
});

test("Sonnet 5.5 adds the existing mid-system beta without enabling context-1m", () => {
  const flags = selectBetaFlags(agentBody("claude-sonnet-5-5"));
  assert.ok(flags.includes("mid-conversation-system-2026-04-07"));
  assert.ok(!flags.includes("context-1m-2025-08-07"));
  assert.ok(flags.includes("advanced-tool-use-2025-11-20"));
});

test("Haiku 5.5 adds the existing mid-system beta without heavy-agent flags", () => {
  const flags = selectBetaFlags(agentBody("claude-haiku-5-5"));
  assert.ok(flags.includes("mid-conversation-system-2026-04-07"));
  for (const excluded of [
    "context-1m-2025-08-07",
    "advanced-tool-use-2025-11-20",
    "effort-2025-11-24",
  ]) {
    assert.ok(!flags.includes(excluded));
  }
});
