import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-executor-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { skillExecutor } = await import("../../src/lib/skills/executor.ts");

function resetSkillsRuntime() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
  skillExecutor["handlers"].clear();
  skillExecutor.setTimeout(50);
  skillExecutor.setMaxRetries(3);
}

async function resetStorage() {
  resetSkillsRuntime();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function registerEchoSkill(overrides = {}) {
  return skillRegistry.register({
    name: "echo",
    version: "1.0.0",
    description: "echoes input",
    schema: { input: { value: "string" }, output: { echoed: "string" } },
    handler: "echo-handler",
    enabled: true,
    apiKeyId: "key-a",
    ...overrides,
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  resetSkillsRuntime();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("skillExecutor executes a registered handler and persists execution history", async () => {
  const skill = await registerEchoSkill();

  skillExecutor.registerHandler("echo-handler", async (input, context) => ({
    echoed: `${input.value}:${context.apiKeyId}:${context.sessionId}`,
  }));

  const execution = await skillExecutor.execute(
    "echo@1.0.0",
    { value: "hello" },
    { apiKeyId: "key-a", sessionId: "session-1" }
  );

  assert.equal(execution.skillId, skill.id);
  assert.equal(execution.status, "success");
  assert.deepEqual(execution.output, { echoed: "hello:key-a:session-1" });
  assert.equal(execution.errorMessage, null);
  assert.equal(typeof execution.durationMs, "number");

  const stored = skillExecutor.getExecution(execution.id);
  assert.equal(stored?.status, "success");
  assert.deepEqual(stored?.output, { echoed: "hello:key-a:session-1" });

  const listed = skillExecutor.listExecutions("key-a");
  assert.equal(listed.length, 1);
  assert.equal(listed[0].id, execution.id);
});

test("skillExecutor blocks execution when Skills are disabled in settings", async () => {
  await registerEchoSkill();
  await settingsDb.updateSettings({ skillsEnabled: false });

  await assert.rejects(
    skillExecutor.execute("echo@1.0.0", { value: "hello" }, { apiKeyId: "key-a" }),
    /Skills execution is disabled/
  );
});

test("skillExecutor records handler lookup failures as errored executions", async () => {
  await registerEchoSkill();

  await assert.rejects(
    skillExecutor.execute("echo@1.0.0", { value: "hello" }, { apiKeyId: "key-a" }),
    /Handler not found: echo-handler/
  );

  const executions = skillExecutor.listExecutions("key-a");
  assert.equal(executions.length, 1);
  assert.equal(executions[0].status, "error");
  assert.match(executions[0].errorMessage, /Handler not found/);
  assert.equal(executions[0].output, null);
});

test("skillExecutor records disabled skills and missing skills as direct failures", async () => {
  await registerEchoSkill({ enabled: false });

  await assert.rejects(
    skillExecutor.execute("echo@1.0.0", { value: "hello" }, { apiKeyId: "key-a" }),
    /Skill is disabled/
  );
  await assert.rejects(
    skillExecutor.execute("missing@1.0.0", { value: "hello" }, { apiKeyId: "key-a" }),
    /Skill not found/
  );

  assert.equal(skillExecutor.listExecutions("key-a").length, 0);
});

test("skillExecutor turns handler errors and timeouts into error executions", async () => {
  await registerEchoSkill();

  skillExecutor.registerHandler("echo-handler", async () => {
    throw new Error("handler exploded");
  });

  const failed = await skillExecutor.execute(
    "echo@1.0.0",
    { value: "boom" },
    { apiKeyId: "key-a", sessionId: "session-2" }
  );

  assert.equal(failed.status, "error");
  assert.equal(failed.output, null);
  assert.match(failed.errorMessage, /handler exploded/);

  skillExecutor.registerHandler(
    "echo-handler",
    async () =>
      new Promise((resolve) => {
        setTimeout(() => resolve({ late: true }), 25);
      })
  );
  skillExecutor.setTimeout(5);
  skillExecutor.setMaxRetries(7);

  const timedOut = await skillExecutor.execute(
    "echo@1.0.0",
    { value: "slow" },
    { apiKeyId: "key-a", sessionId: "session-3" }
  );

  assert.equal(skillExecutor["maxRetries"], 7);
  assert.equal(timedOut.status, "error");
  assert.equal(timedOut.output, null);
  assert.match(timedOut.errorMessage, /timed out/i);
});
