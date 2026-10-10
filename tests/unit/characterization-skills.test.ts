// Characterization tests — src/lib/skills (rail 3.8.55, Task 12 "caracterização B").
//
// The skills subsystem has no barrel: external code imports individual modules (registry,
// executor, providerSettings, toolLoopTypes, interception, …). This file pins the export
// surface of every module consumed from outside src/lib/skills, plus the registry →
// load → execute lifecycle of a fixture skill and the sandbox runner contract (with an
// injected container provider — no real Docker/Podman is touched). Current behavior that
// looks wrong is pinned under `characterization: … currently …`.
import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import "../_setup/isolateDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP ||= "true";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const registryModule = await import("../../src/lib/skills/registry.ts");
const executorModule = await import("../../src/lib/skills/executor.ts");
const sandboxModule = await import("../../src/lib/skills/sandbox.ts");
const builtinsModule = await import("../../src/lib/skills/builtins.ts");
const { SkillStatus } = await import("../../src/lib/skills/types.ts");

const { skillRegistry, GLOBAL_SKILL_OWNER_ID } = registryModule;
const { skillExecutor, projectSkillOutputForBoundary } = executorModule;
const { sandboxRunner } = sandboxModule;

const SCHEMA = { input: { text: { type: "string" } }, output: { echoed: { type: "string" } } };

function uniqueName(prefix: string) {
  return `${prefix}-${randomUUID().slice(0, 8)}`;
}

// Short executor timeout so the timeout case runs fast. NOTE: executeWithTimeout never
// clears its timer, so every execution leaves a pending timer of this length behind.
skillExecutor.setTimeout(200);

skillExecutor.registerHandler("char-echo", async (input) => ({ echoed: String(input.text) }));
skillExecutor.registerHandler("char-soft-fail", async () => ({
  success: false,
  error: "upstream said no",
}));
skillExecutor.registerHandler("char-throws", async () => {
  throw new Error("handler exploded");
});
skillExecutor.registerHandler(
  "char-slow",
  () => new Promise((resolve) => setTimeout(() => resolve({ late: true }), 1_000))
);

test.after(() => {
  core.resetDbInstance();
});

// ─── (a) Public surface snapshot ─────────────────────────────────────────────

test("skills modules consumed outside src/lib/skills export exactly this surface", async () => {
  const modules = [
    "builtins",
    "executor",
    "githubCollector",
    "injection",
    "interception",
    "memoryBuiltins",
    "providerSettings",
    "registry",
    "sandbox",
    "schemas",
    "serverOwnedToolLoop",
    "skillssh",
    "stableJson",
    "toolLoopTypes",
    "types",
  ];
  const surface: Record<string, string[]> = {};
  for (const name of modules) {
    surface[name] = Object.keys(await import(`../../src/lib/skills/${name}.ts`)).sort();
  }
  assert.deepEqual(surface, {
    builtins: ["builtinSkills", "registerBuiltinSkills"],
    executor: ["projectSkillOutputForBoundary", "skillExecutor"],
    githubCollector: [
      "GitHubSkillsInstallSchema",
      "GitHubSkillsScanSchema",
      "GitHubSkillsSearchSchema",
      "INSTALL_TARGETS",
      "QUERY_STRATEGIES",
      "inferCategory",
      "resolveInstallPath",
      "scanText",
      "scoreRepo",
      "searchGitHubSkills",
    ],
    injection: [
      "decodeSkillToolName",
      "detectProvider",
      "encodeSkillToolName",
      "injectSkillTools",
      "injectSkills",
      "injectSkillsWithMetadata",
    ],
    interception: [
      "ServerOwnedExecutionError",
      "buildWebSearchCallItem",
      "classifyServerOwnedCalls",
      "executeServerOwned",
      "extractToolCalls",
      "formatEscapeHatchResponse",
      "handleToolCallExecution",
      "interceptToolCalls",
      "setFenceFnForTesting",
    ],
    memoryBuiltins: [
      "MEMORY_BUILTIN_TOOL_NAMES",
      "MEMORY_DELETE_TOOL_NAME",
      "MEMORY_SAVE_TOOL_NAME",
      "MEMORY_SEARCH_TOOL_NAME",
      "MEMORY_UPDATE_TOOL_NAME",
      "buildMemoryClaudeTools",
      "buildMemoryGeminiTools",
      "buildMemoryOpenAITools",
      "buildMemoryToolsForProvider",
      "memoryBuiltinHandlers",
    ],
    providerSettings: [
      "DEFAULT_SKILLS_PROVIDER",
      "getSkillsProviderSetting",
      "normalizeSkillsProvider",
    ],
    registry: ["GLOBAL_SKILL_OWNER_ID", "skillRegistry"],
    sandbox: ["sandboxRunner"],
    schemas: [
      "SkillConfigSchema",
      "SkillCreateInputSchema",
      "SkillSchema",
      "SkillUpdateInputSchema",
    ],
    serverOwnedToolLoop: [
      "LOOP_BUDGET_MS",
      "MAX_FOLLOW_UPS",
      "MIN_REMAINING_FOR_FOLLOW_UP_MS",
      "aggregateProviderLegUsage",
      "runServerOwnedToolLoop",
    ],
    skillssh: [
      "SkillsShSearchResponseSchema",
      "SkillsShSkillSchema",
      "fetchSkillMd",
      "searchSkillsSh",
    ],
    stableJson: ["canonicalJson", "canonicalJsonSha256", "deriveToolRequestIdentity"],
    toolLoopTypes: [],
    types: ["SkillMode", "SkillStatus"],
  });
});

test("builtin skill handler names", () => {
  assert.deepEqual(Object.keys(builtinsModule.builtinSkills).sort(), [
    "eval_code",
    "execute_command",
    "file_read",
    "file_write",
    "http_request",
    "web_fetch",
    "web_search",
  ]);
  assert.equal(GLOBAL_SKILL_OWNER_ID, "system");
});

// ─── (b) Registry / load / execute lifecycle of a fixture skill ──────────────

test("register → getSkill (by name, name@version, id) → latest version wins", async () => {
  const name = uniqueName("char-echo");
  const v1 = await skillRegistry.register({
    name,
    version: "1.0.0",
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-owner",
  });
  const v2 = await skillRegistry.register({
    name,
    version: "1.2.0",
    description: "second",
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-owner",
  });

  assert.equal(v1.enabled, true);
  assert.equal(v1.mode, "on");
  assert.deepEqual(v1.tags, []);
  assert.equal(v1.installCount, 0);
  assert.equal(v1.description, "");

  assert.equal(skillRegistry.getSkill(name, "char-owner")?.id, v2.id);
  assert.equal(skillRegistry.getSkill(`${name}@1.0.0`, "char-owner")?.id, v1.id);
  assert.equal(skillRegistry.getSkill(v1.id, "char-owner")?.version, "1.0.0");
  assert.deepEqual(
    skillRegistry.getSkillVersions(name, "char-owner").map((s) => s.version),
    ["1.2.0", "1.0.0"]
  );
  assert.equal(skillRegistry.resolveVersion(name, "^1.0.0", "char-owner")?.version, "1.2.0");
  assert.equal(skillRegistry.resolveVersion(name, "~1.0.0", "char-owner")?.version, "1.0.0");
  assert.equal(skillRegistry.resolveVersion(name, "1.0.0", "char-owner")?.version, "1.0.0");
  // Another key does not see a non-global owner's skills.
  assert.equal(skillRegistry.getSkill(name, "char-stranger"), undefined);
});

test("global-owner skills are visible to every key; an owned name@version shadows the global one", async () => {
  const name = uniqueName("char-global");
  const globalSkill = await skillRegistry.register({
    name,
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: GLOBAL_SKILL_OWNER_ID,
  });
  assert.equal(globalSkill.version, "1.0.0", "version defaults to 1.0.0");
  assert.equal(skillRegistry.getSkill(name, "any-key")?.id, globalSkill.id);

  const owned = await skillRegistry.register({
    name,
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-shadow",
  });
  assert.equal(skillRegistry.getSkill(name, "char-shadow")?.id, owned.id);
  assert.equal(skillRegistry.getSkill(name, "any-key")?.id, globalSkill.id);
});

test("loadFromDatabase picks up rows written outside the registry", async () => {
  const name = uniqueName("char-loaded");
  const id = randomUUID();
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO skills (id, api_key_id, name, version, description, schema, handler, enabled, mode, source_provider, tags, install_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      id,
      "char-loader",
      name,
      "2.0.0",
      "from db",
      JSON.stringify(SCHEMA),
      "char-echo",
      1,
      "auto",
      "skillssh",
      '["x", 1]',
      7,
      now,
      now
    );

  assert.equal(skillRegistry.getSkill(name, "char-loader"), undefined);
  skillRegistry.invalidateCache();
  await skillRegistry.loadFromDatabase("char-loader");

  const loaded = skillRegistry.getSkill(name, "char-loader");
  assert.ok(loaded);
  assert.equal(loaded.id, id);
  assert.equal(loaded.mode, "auto");
  assert.equal(loaded.sourceProvider, "skillssh");
  assert.deepEqual(loaded.tags, ["x"], "non-string tags are dropped");
  assert.equal(loaded.installCount, 7);
});

test("execute a fixture skill: success output, execution row persisted", async () => {
  const name = uniqueName("char-exec");
  const skill = await skillRegistry.register({
    name,
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-exec-key",
  });

  const execution = await skillExecutor.execute(
    name,
    { text: "hello" },
    { apiKeyId: "char-exec-key", sessionId: "sess-1" }
  );
  assert.equal(execution.status, SkillStatus.SUCCESS);
  assert.equal(execution.skillId, skill.id);
  assert.deepEqual(execution.output, { echoed: "hello" });
  assert.equal(execution.errorMessage, null);
  assert.equal(typeof execution.durationMs, "number");

  const stored = skillExecutor.getExecution(execution.id);
  assert.ok(stored);
  assert.equal(stored.status, "success");
  assert.deepEqual(stored.input, { text: "hello" });
  assert.deepEqual(stored.output, { echoed: "hello" });
  assert.equal(stored.sessionId, "sess-1");
  assert.equal(skillExecutor.countExecutions("char-exec-key"), 1);
});

test("execute: a failure-shaped output and a throwing handler both resolve with status error", async () => {
  const soft = uniqueName("char-soft");
  await skillRegistry.register({
    name: soft,
    schema: SCHEMA,
    handler: "char-soft-fail",
    apiKeyId: "char-err",
  });
  const softRun = await skillExecutor.execute(soft, {}, { apiKeyId: "char-err" });
  assert.equal(softRun.status, SkillStatus.ERROR);
  assert.equal(softRun.errorMessage, "upstream said no");
  assert.equal(softRun.output?.success, false);

  const hard = uniqueName("char-hard");
  await skillRegistry.register({
    name: hard,
    schema: SCHEMA,
    handler: "char-throws",
    apiKeyId: "char-err",
  });
  const hardRun = await skillExecutor.execute(hard, {}, { apiKeyId: "char-err" });
  assert.equal(hardRun.status, SkillStatus.ERROR);
  assert.equal(hardRun.errorMessage, "handler exploded");
  assert.equal(hardRun.output, null);
});

test("characterization: a timed-out skill is currently recorded as status error, never timeout", async () => {
  const name = uniqueName("char-slow");
  await skillRegistry.register({
    name,
    schema: SCHEMA,
    handler: "char-slow",
    apiKeyId: "char-slow",
  });
  const run = await skillExecutor.execute(name, {}, { apiKeyId: "char-slow" });
  // SkillStatus.TIMEOUT exists and the DB CHECK allows 'timeout', but the executor maps a
  // timeout to ERROR with this message.
  assert.equal(run.status, SkillStatus.ERROR);
  assert.equal(run.errorMessage, "Skill execution timed out");
});

test("projectSkillOutputForBoundary keeps safe output and sanitizes failure output", () => {
  assert.deepEqual(projectSkillOutputForBoundary({ ok: 1, nested: { a: "b" } }), {
    ok: 1,
    nested: { a: "b" },
  });
  const failure = projectSkillOutputForBoundary({ success: false, error: "boom" });
  assert.equal(failure.success, false);
});

test("sandboxRunner.run spawns through the resolved provider and reports stdout/exit code", async () => {
  const fakeProvider = {
    id: "docker" as const,
    displayName: "fake",
    detect: () => true,
    killCommand: process.execPath,
    buildKillArgs: () => ["-e", ""],
    buildRun: (_image: string, command: string[]) => ({
      command: process.execPath,
      args: command,
      killArgs: () => [],
    }),
  };
  (sandboxRunner as unknown as { cachedProvider: unknown }).cachedProvider = fakeProvider;
  assert.equal(await sandboxRunner.getProvider(), fakeProvider);

  const ok = await sandboxRunner.run(
    "ignored:image",
    ["-e", "process.stdout.write('sandbox:' + process.env.CHAR_SANDBOX_VAR); process.exit(3)"],
    { CHAR_SANDBOX_VAR: "hi" }
  );
  assert.equal(ok.runtime, "docker");
  assert.equal(ok.stdout, "sandbox:hi");
  assert.equal(ok.exitCode, 3);
  assert.equal(ok.killed, false);
  assert.equal(sandboxRunner.getRunningCount(), 0);

  const slow = await sandboxRunner.run(
    "ignored:image",
    ["-e", "setTimeout(() => {}, 10000)"],
    {},
    { timeout: 100 }
  );
  assert.equal(slow.killed, true);
  assert.equal(slow.exitCode, null);
});

// ─── (c) Invalid input — current behavior ────────────────────────────────────

test("register rejects an invalid version / unknown keys with a ZodError", async () => {
  await assert.rejects(
    skillRegistry.register({
      name: "bad",
      version: "1.0",
      schema: SCHEMA,
      handler: "h",
      apiKeyId: "k",
    }),
    (err: Error) => err.name === "ZodError"
  );
  await assert.rejects(
    skillRegistry.register({
      name: "bad",
      schema: SCHEMA,
      handler: "h",
      apiKeyId: "k",
      extra: 1,
    } as never),
    (err: Error) => err.name === "ZodError"
  );
  await assert.rejects(
    skillRegistry.register({ name: "", schema: SCHEMA, handler: "h", apiKeyId: "k" }),
    (err: Error) => err.name === "ZodError"
  );
});

test("execute rejects unknown / disabled skills without writing history", async () => {
  await assert.rejects(
    skillExecutor.execute("char-does-not-exist", {}, { apiKeyId: "char-none" }),
    /Skill not found: char-does-not-exist/
  );

  const name = uniqueName("char-disabled");
  await skillRegistry.register({
    name,
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-dis",
    enabled: false,
  });
  await assert.rejects(
    skillExecutor.execute(name, {}, { apiKeyId: "char-dis" }),
    new RegExp(`Skill is disabled: ${name}`)
  );
  assert.equal(skillExecutor.countExecutions("char-dis"), 0);
});

test("execute with an unknown handler rejects AND leaves an error row in history", async () => {
  const name = uniqueName("char-nohandler");
  await skillRegistry.register({
    name,
    schema: SCHEMA,
    handler: "char-missing-handler",
    apiKeyId: "char-nh",
  });
  await assert.rejects(
    skillExecutor.execute(name, {}, { apiKeyId: "char-nh" }),
    /Handler not found: char-missing-handler/
  );
  const rows = skillExecutor.listExecutions("char-nh");
  assert.equal(rows.length, 1);
  assert.equal(rows[0].status, "error");
  assert.equal(rows[0].errorMessage, "Handler not found: char-missing-handler");
});

test("execute rejects when skills are disabled in settings", async () => {
  const name = uniqueName("char-settings-off");
  await skillRegistry.register({
    name,
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-off",
  });
  await updateSettings({ skillsEnabled: false });
  try {
    await assert.rejects(
      skillExecutor.execute(name, {}, { apiKeyId: "char-off" }),
      /Skills execution is disabled\. Enable Skills in Settings > AI\./
    );
  } finally {
    await updateSettings({ skillsEnabled: true });
  }
});

test("resolveVersion honors >=, <= and == constraints", async () => {
  const name = uniqueName("char-range");
  await skillRegistry.register({
    name,
    version: "1.0.0",
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-range",
  });
  await skillRegistry.register({
    name,
    version: "2.0.0",
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-range",
  });

  // Single-char operators work.
  assert.equal(skillRegistry.resolveVersion(name, ">1.0.0", "char-range")?.version, "2.0.0");
  assert.equal(skillRegistry.resolveVersion(name, "<2.0.0", "char-range")?.version, "1.0.0");
  // Two-char operators are matched before their one-char prefixes (#16186).
  assert.equal(skillRegistry.resolveVersion(name, ">=1.0.0", "char-range")?.version, "2.0.0");
  assert.equal(skillRegistry.resolveVersion(name, "<=2.0.0", "char-range")?.version, "2.0.0");
  assert.equal(skillRegistry.resolveVersion(name, "==1.0.0", "char-range")?.version, "1.0.0");
});

test("unregister by name@version and by id", async () => {
  const name = uniqueName("char-unreg");
  const a = await skillRegistry.register({
    name,
    version: "1.0.0",
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-u",
  });
  const b = await skillRegistry.register({
    name,
    version: "1.1.0",
    schema: SCHEMA,
    handler: "char-echo",
    apiKeyId: "char-u",
  });

  assert.equal(await skillRegistry.unregister(name, "1.0.0", "char-u"), true);
  assert.equal(skillRegistry.getSkill(a.id, "char-u"), undefined);
  assert.equal(await skillRegistry.unregisterById(b.id), true);
  assert.equal(await skillRegistry.unregisterById(b.id), false);
  assert.equal(await skillRegistry.unregister(name, undefined, "char-u"), false);
});
