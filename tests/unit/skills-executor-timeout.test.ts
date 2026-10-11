import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import "../_setup/isolateDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP ||= "true";

const core = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { skillExecutor } = await import("../../src/lib/skills/executor.ts");
const { SkillStatus } = await import("../../src/lib/skills/types.ts");

const SCHEMA = { input: {}, output: {} };
const API_KEY_ID = "executor-timeout";

skillExecutor.registerHandler("timeout-fast", async () => ({ ok: true }));
skillExecutor.registerHandler("timeout-slow", () => new Promise(() => {}));

test.after(() => {
  core.resetDbInstance();
});

function pendingTimers(): number {
  return process.getActiveResourcesInfo().filter((name) => name === "Timeout").length;
}

async function registerSkill(handler: string) {
  const name = `${handler}-${randomUUID().slice(0, 8)}`;
  await skillRegistry.register({ name, schema: SCHEMA, handler, apiKeyId: API_KEY_ID });
  return name;
}

test("a skill that outlives the executor timeout is recorded as timeout and persisted that way", async () => {
  skillExecutor.setTimeout(100);
  const name = await registerSkill("timeout-slow");
  const run = await skillExecutor.execute(name, {}, { apiKeyId: API_KEY_ID });
  assert.equal(run.status, SkillStatus.TIMEOUT);
  assert.equal(run.errorMessage, "Skill execution timed out");

  const row = core
    .getDbInstance()
    .prepare("SELECT status FROM skill_executions WHERE id = ?")
    .get(run.id) as { status: string };
  assert.equal(row.status, "timeout");
});

test("a handler that settles in time leaves no pending timeout timer behind", async () => {
  skillExecutor.setTimeout(30_000);
  const name = await registerSkill("timeout-fast");
  const before = pendingTimers();
  const run = await skillExecutor.execute(name, {}, { apiKeyId: API_KEY_ID });
  assert.equal(run.status, SkillStatus.SUCCESS);
  assert.ok(
    pendingTimers() <= before,
    "the 30s race timer must be cleared once the handler settles"
  );
});
