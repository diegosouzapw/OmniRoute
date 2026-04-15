import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-injection-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { injectSkills, injectSkillTools, detectProvider } =
  await import("../../src/lib/skills/injection.ts");

function resetRegistryState() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
}

async function resetStorage() {
  resetRegistryState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function registerSkills() {
  await skillRegistry.register({
    name: "search",
    version: "1.0.0",
    description: "search the web",
    schema: { input: { query: "string" }, output: { results: [] } },
    handler: "search-handler",
    enabled: true,
    apiKeyId: "key-a",
  });
  await skillRegistry.register({
    name: "disabled",
    version: "1.0.0",
    description: "should not be exposed",
    schema: { input: {}, output: {} },
    handler: "disabled-handler",
    enabled: false,
    apiKeyId: "key-a",
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  resetRegistryState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("injectSkills renders enabled tools in provider-specific shapes", async () => {
  await registerSkills();

  const openaiTools = injectSkills({
    provider: "openai",
    existingTools: [{ name: "existing-tool" }],
    apiKeyId: "key-a",
  });
  const claudeTools = injectSkills({ provider: "anthropic", apiKeyId: "key-a" });
  const geminiTools = injectSkills({ provider: "google", apiKeyId: "key-a" });
  const fallbackTools = injectSkills({ provider: "other", apiKeyId: "key-a" });

  assert.equal(openaiTools.length, 2);
  assert.deepEqual(openaiTools[0], {
    type: "function",
    function: {
      name: "search@1.0.0",
      description: "search the web",
      parameters: { query: "string" },
    },
  });
  assert.deepEqual(openaiTools[1], { name: "existing-tool" });
  assert.deepEqual(claudeTools, [
    {
      name: "search@1.0.0",
      description: "search the web",
      input_schema: { query: "string" },
    },
  ]);
  assert.deepEqual(geminiTools, [
    {
      name: "search@1.0.0",
      description: "search the web",
      parameters: { query: "string" },
    },
  ]);
  assert.deepEqual(fallbackTools, [openaiTools[0]]);
});

test("injectSkillTools only injects into the last user message without tools", async () => {
  await registerSkills();

  const injected = injectSkillTools(
    [
      { role: "system", content: "be helpful" },
      { role: "user", content: "search docs" },
    ],
    "openai",
    "key-a"
  );

  assert.equal(injected.length, 2);
  assert.equal(injected[1].role, "user");
  assert.equal(Array.isArray(injected[1].tools), true);

  const unchangedWhenToolsExist = injectSkillTools(
    [{ role: "user", content: "already has tools", tools: [{ name: "existing" }] }],
    "openai",
    "key-a"
  );
  const unchangedAssistant = injectSkillTools(
    [{ role: "assistant", content: "no user tail" }],
    "openai",
    "key-a"
  );
  const unchangedWithoutSkills = injectSkillTools(
    [{ role: "user", content: "nothing to inject" }],
    "openai",
    "missing-key"
  );

  assert.deepEqual(unchangedWhenToolsExist, [
    { role: "user", content: "already has tools", tools: [{ name: "existing" }] },
  ]);
  assert.deepEqual(unchangedAssistant, [{ role: "assistant", content: "no user tail" }]);
  assert.deepEqual(unchangedWithoutSkills, [{ role: "user", content: "nothing to inject" }]);
});

test("detectProvider maps known model families and falls back to other", () => {
  assert.equal(detectProvider("gpt-4.1"), "openai");
  assert.equal(detectProvider("claude-sonnet-4"), "anthropic");
  assert.equal(detectProvider("gemini-2.5-pro"), "google");
  assert.equal(detectProvider("custom-router-model"), "other");
});
