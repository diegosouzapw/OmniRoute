import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-13022-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { injectSkills } = await import("../../src/lib/skills/injection.ts");

function resetRegistryState() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
}

test.after(() => {
  resetRegistryState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#13022: nested bare property map survives skill injection for OpenAI-format providers (agnes/nvidia/DeepSeek)", async () => {
  await skillRegistry.register({
    name: "nested-tool",
    version: "1.0.0",
    description: "a skill with a nested bare property map, like a local/skillssh author would ship",
    schema: { input: { query: "string", opts: { limit: { type: "number" } } }, output: {} },
    handler: "nested-tool-handler",
    enabled: true,
    apiKeyId: "issue-13022-key",
  });

  const tools = injectSkills({ provider: "openai", apiKeyId: "issue-13022-key" }) as Array<{
    function: { parameters: Record<string, unknown> };
  }>;
  assert.equal(tools.length, 1);

  const parameters = tools[0].function.parameters;
  const properties = parameters.properties as Record<string, Record<string, unknown>>;

  assert.equal(
    properties.query.type,
    "string",
    "#11881 root shorthand expansion should still work"
  );

  const opts = properties.opts;
  assert.equal(
    opts.type,
    "object",
    "BUG #13022: nested bare property map missing type:object wrapper"
  );
});

test("#13022: per-property boolean required:true survives skill injection for OpenAI-format providers", async () => {
  await skillRegistry.register({
    name: "required-bool-tool",
    version: "1.0.0",
    description:
      "a skill declaring required as a boolean on the property, not an array on the schema",
    schema: { input: { content: { type: "string", required: true } }, output: {} },
    handler: "required-bool-handler",
    enabled: true,
    apiKeyId: "issue-13022-key-2",
  });

  const tools = injectSkills({ provider: "openai", apiKeyId: "issue-13022-key-2" }) as Array<{
    function: { parameters: Record<string, unknown> };
  }>;
  assert.equal(tools.length, 1);

  const parameters = tools[0].function.parameters;
  const properties = parameters.properties as Record<string, Record<string, unknown>>;

  assert.equal(
    "required" in properties.content,
    false,
    "BUG #13022: boolean required:true survived on the property"
  );
  assert.deepEqual(
    parameters.required,
    ["content"],
    "BUG #13022: boolean required:true was not promoted"
  );
});
