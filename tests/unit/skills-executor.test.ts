import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-executor-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const TEST_PLUGINS_DIR = path.join(TEST_ROOT, "plugins");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PLUGINS_DIR = process.env.OMNIROUTE_PLUGINS_DIR;
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
fs.mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;

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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_PLUGINS_DIR === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = ORIGINAL_PLUGINS_DIR;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

test("skillExecutor sanitizes failed outputs and nested error subtrees before persistence", async () => {
  await registerEchoSkill();
  const hostile =
    "tool failed access_token=skill-output-secret at /srv/private/skill-output.ts\n" +
    "    at run (/srv/private/skill-output.ts:8:2)";

  skillExecutor.registerHandler("echo-handler", async () => ({
    success: false,
    status: 502,
    statusText: hostile,
    headers: { authorization: "Bearer skill-output-secret" },
    body: hostile,
    stdout: hostile,
    stderr: hostile,
  }));

  const failedOutput = await skillExecutor.execute(
    "echo@1.0.0",
    { value: "failure" },
    { apiKeyId: "key-a", sessionId: "session-output" }
  );
  const storedFailure = skillExecutor.getExecution(failedOutput.id);
  const failureSerialized = JSON.stringify({ failedOutput, storedFailure });

  assert.equal((failedOutput.output as Record<string, unknown>)?.status, 502);
  assert.doesNotMatch(
    failureSerialized,
    /skill-output-secret|srv\/private|skill-output\.ts|\bat run\b/i
  );

  skillExecutor.registerHandler("echo-handler", async () => ({
    success: true,
    payload: {
      value: "preserve me",
      error: { message: hostile },
    },
    warning: hostile,
  }));
  const successfulOutput = await skillExecutor.execute(
    "echo@1.0.0",
    { value: "success" },
    { apiKeyId: "key-a", sessionId: "session-success" }
  );
  const storedSuccess = skillExecutor.getExecution(successfulOutput.id);
  const successSerialized = JSON.stringify({ successfulOutput, storedSuccess });

  assert.equal(
    ((successfulOutput.output as Record<string, unknown>)?.payload as Record<string, unknown>)
      ?.value,
    "preserve me"
  );
  assert.doesNotMatch(
    successSerialized,
    /skill-output-secret|srv\/private|skill-output\.ts|\bat run\b/i
  );
});

test("skillExecutor treats failure discriminators and aliased error objects as boundary failures", async () => {
  await registerEchoSkill();
  const hostile = "Bearer skill-discriminator-secret at /srv/private/skill-discriminator.ts:8:2";

  for (const result of [
    { type: "error", message: hostile },
    { status: "failed", reason: hostile },
  ]) {
    skillExecutor.registerHandler("echo-handler", async () => result);
    const execution = await skillExecutor.execute(
      "echo@1.0.0",
      { value: "discriminated-failure" },
      { apiKeyId: "key-a", sessionId: "session-discriminated" }
    );
    const stored = skillExecutor.getExecution(execution.id);
    assert.equal(execution.status, "error");
    assert.equal(stored?.status, "error");
    assert.doesNotMatch(
      JSON.stringify({ execution, stored }),
      /skill-discriminator-secret|srv\/private|skill-discriminator\.ts/i
    );
  }

  const shared = { message: hostile };
  skillExecutor.registerHandler("echo-handler", async () => ({
    success: true,
    payload: { error: shared },
    alias: shared,
  }));
  const aliased = await skillExecutor.execute(
    "echo@1.0.0",
    { value: "alias" },
    { apiKeyId: "key-a", sessionId: "session-alias" }
  );
  assert.equal(aliased.status, "success");
  assert.doesNotMatch(
    JSON.stringify({ aliased, stored: skillExecutor.getExecution(aliased.id) }),
    /skill-discriminator-secret|srv\/private|skill-discriminator\.ts/i
  );

  const cyclic: Record<string, unknown> = { success: true, error: shared };
  cyclic.self = cyclic;
  skillExecutor.registerHandler("echo-handler", async () => cyclic);
  const cycleSafe = await skillExecutor.execute(
    "echo@1.0.0",
    { value: "cycle" },
    { apiKeyId: "key-a", sessionId: "session-cycle" }
  );
  assert.equal(cycleSafe.status, "success");
  assert.doesNotThrow(() => JSON.stringify(cycleSafe.output));
  assert.doesNotMatch(
    JSON.stringify({ cycleSafe, stored: skillExecutor.getExecution(cycleSafe.id) }),
    /skill-discriminator-secret|srv\/private|skill-discriminator\.ts/i
  );
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
    throw new Error(
      "handler exploded access_token=skill-db-secret at /srv/private/skill-executor.ts\n" +
        "    at execute (/srv/private/skill-executor.ts:21:5)"
    );
  });

  const failed = await skillExecutor.execute(
    "echo@1.0.0",
    { value: "boom" },
    { apiKeyId: "key-a", sessionId: "session-2" }
  );

  assert.equal(failed.status, "error");
  assert.equal(failed.output, null);
  assert.match(failed.errorMessage, /handler exploded/);
  assert.doesNotMatch(
    String(failed.errorMessage),
    /skill-db-secret|srv\/private|skill-executor\.ts|\bat execute\b/i
  );
  const storedFailure = skillExecutor.getExecution(failed.id);
  assert.match(String(storedFailure?.errorMessage), /handler exploded/);
  assert.doesNotMatch(
    String(storedFailure?.errorMessage),
    /skill-db-secret|srv\/private|skill-executor\.ts|\bat execute\b/i
  );

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
