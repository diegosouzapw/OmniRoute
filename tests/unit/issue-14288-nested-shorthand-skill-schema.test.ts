import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-14288-"));
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

// #14288: DeepSeek behind opencode-go rejects injected skill tools with
//   Invalid schema for function 'omr_skill_...': "string" is not of types "boolean", "object"
// because string-shorthand property values nested inside a typed root schema
// are never expanded into { type: <value> } nodes. The root-level shorthand
// expansion from #11881 only runs when the stored schema has no `type` key.

test("#14288: string shorthand nested under properties of a typed root is expanded (openai format)", async () => {
  await skillRegistry.register({
    name: "brainstorming",
    version: "1.0.0",
    description:
      "skill with a typed root and shorthand property values, like marketplace authors ship",
    schema: {
      input: { type: "object", properties: { topic: "string", rounds: "number" } },
      output: {},
    },
    handler: "brainstorming-handler",
    enabled: true,
    apiKeyId: "issue-14288-key",
  });

  const tools = injectSkills({ provider: "openai", apiKeyId: "issue-14288-key" }) as Array<{
    function: { name: string; parameters: Record<string, unknown> };
  }>;
  assert.equal(tools.length, 1);

  const parameters = tools[0].function.parameters;
  const properties = parameters.properties as Record<string, Record<string, unknown>>;

  assert.equal(
    typeof properties.topic,
    "object",
    'BUG #14288: properties.topic is still the raw string shorthand "string" (DeepSeek 400)'
  );
  assert.equal(properties.topic.type, "string");
  assert.equal(properties.rounds.type, "number");
});

test("#14288: mixed shorthand/object bare property map is expanded and lifted", async () => {
  await skillRegistry.register({
    name: "mixed-shorthand",
    version: "1.0.0",
    description: "bare property map mixing string shorthand and full schema nodes",
    schema: {
      input: { query: "string", opts: { limit: { type: "number" } } },
      output: {},
    },
    handler: "mixed-shorthand-handler",
    enabled: true,
    apiKeyId: "issue-14288-key-2",
  });

  const tools = injectSkills({ provider: "openai", apiKeyId: "issue-14288-key-2" }) as Array<{
    function: { parameters: Record<string, unknown> };
  }>;
  assert.equal(tools.length, 1);

  const parameters = tools[0].function.parameters;
  const properties = parameters.properties as Record<string, Record<string, unknown>>;

  assert.equal(
    properties.query.type,
    "string",
    "shorthand sibling of an object value must expand too"
  );
  assert.equal(
    properties.opts.type,
    "object",
    "BUG #13028-style nested bare map must still be lifted after shorthand expansion"
  );
  const optsProps = properties.opts.properties as Record<string, Record<string, unknown>>;
  assert.equal(optsProps.limit.type, "number");
});

test("#14288: shorthand nested under properties survives for claude and google formats too", async () => {
  await skillRegistry.register({
    name: "brainstorming",
    version: "2.0.0",
    description: "same shape as the failing marketplace skill, non-openai providers",
    schema: {
      input: { type: "object", properties: { topic: "string" } },
      output: {},
    },
    handler: "brainstorming-handler-2",
    enabled: true,
    apiKeyId: "issue-14288-key-3",
  });

  const claudeTools = injectSkills({
    provider: "anthropic",
    apiKeyId: "issue-14288-key-3",
  }) as Array<{
    input_schema: Record<string, unknown>;
  }>;
  const claudeProps = claudeTools[0].input_schema.properties as Record<
    string,
    Record<string, unknown>
  >;
  assert.equal(claudeProps.topic.type, "string");

  const geminiTools = injectSkills({ provider: "google", apiKeyId: "issue-14288-key-3" }) as Array<{
    parameters: Record<string, unknown>;
  }>;
  const geminiProps = geminiTools[0].parameters.properties as Record<
    string,
    Record<string, unknown>
  >;
  assert.equal(geminiProps.topic.type, "string");
});
