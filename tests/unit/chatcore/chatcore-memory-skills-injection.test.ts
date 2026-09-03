import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR set BEFORE importing anything that touches the DB
// (injectMemoryAndSkills -> getMemorySettings / retrieveMemories / injectSkills).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mem-skills-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  getSkillsProviderForFormat,
  injectMemoryAndSkills,
  sortToolsByName,
  mergeInjectedFallbackOwnerNames,
} = await import("../../../open-sse/handlers/chatCore/memorySkillsInjection.ts");
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");
const core = await import("../../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../../src/lib/skills/registry.ts");

function resetSkillsRegistry() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
  skillRegistry.invalidateCache();
}

test.after(() => {
  resetSkillsRegistry();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─── getSkillsProviderForFormat (pure switch) ────────────────────────────────

test("getSkillsProviderForFormat maps CLAUDE -> anthropic", () => {
  assert.equal(getSkillsProviderForFormat(FORMATS.CLAUDE), "anthropic");
});

test("getSkillsProviderForFormat maps GEMINI -> google", () => {
  assert.equal(getSkillsProviderForFormat(FORMATS.GEMINI), "google");
});

test("getSkillsProviderForFormat maps OPENAI and any unknown format -> openai (default)", () => {
  assert.equal(getSkillsProviderForFormat(FORMATS.OPENAI), "openai");
  // any other / unknown format falls through to the default branch
  assert.equal(getSkillsProviderForFormat("removed-google-cli"), "openai");
  assert.equal(getSkillsProviderForFormat("codex"), "openai");
  assert.equal(getSkillsProviderForFormat("totally-unknown"), "openai");
  assert.equal(getSkillsProviderForFormat(""), "openai");
});

test("sortToolsByName sorts tools deterministically by function name or top-level name", () => {
  const unsorted = [
    { function: { name: "z_tool" } },
    { name: "a_tool" },
    { function: { name: "m_tool" } },
  ];
  const sorted = sortToolsByName(unsorted);
  assert.deepEqual(sorted, [
    { name: "a_tool" },
    { function: { name: "m_tool" } },
    { function: { name: "z_tool" } },
  ]);
});

// ─── injectMemoryAndSkills ───────────────────────────────────────────────────

test("injectMemoryAndSkills with memoryOwnerId=null skips both branches and returns the body unchanged", async () => {
  // memoryOwnerId is null -> memorySettings stays null -> the memory guard is false
  // (no getMemorySettings/retrieveMemories) AND the skills guard (memorySettings?.skillsEnabled)
  // is false. The body is returned verbatim with memorySettings=null.
  const body: Record<string, unknown> = {
    model: "gpt-4o",
    messages: [{ role: "user", content: "hello world" }],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: null,
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: null,
  });

  assert.equal(result.memorySettings, null, "memorySettings is null when no owner is provided");
  // body is returned as-is (same reference, no injection happened)
  assert.equal(result.body, body);
  assert.deepEqual(result.body.messages, [{ role: "user", content: "hello world" }]);
  assert.equal("tools" in result.body, false, "no skills were injected");
});

test("injectMemoryAndSkills with an empty DB resolves settings, finds nothing to inject, returns body unchanged", async () => {
  // memoryOwnerId is set -> getMemorySettings() resolves DB defaults (enabled, skillsEnabled).
  // The body has NO `messages` array (only `input`), so shouldInjectMemory() returns false and
  // the memory-retrieval branch is skipped. The skills branch runs injectSkills(), but the
  // empty DB registry has no skills, so mergedTools.length == existingTools.length and the body
  // is NOT cloned/mutated. This exercises the realistic "nothing to inject" path end-to-end.
  const log = {
    debug: (..._args: unknown[]) => {
      /* swallow */
    },
  };
  const body: Record<string, unknown> = {
    model: "gpt-4o",
    input: [{ role: "user", content: "no messages array here" }],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: "owner-empty-db",
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log,
  });

  // memorySettings was resolved (defaults) — it is a real object, not null.
  assert.ok(result.memorySettings, "memorySettings resolved from DB defaults");
  // PRD-2026-06-19: memory is now OFF by default (skills still default on).
  assert.equal(result.memorySettings.enabled, false);
  assert.equal(result.memorySettings.skillsEnabled, true);
  // No skills in the empty registry -> body returned unchanged (same reference).
  assert.equal(result.body, body);
  assert.equal("tools" in result.body, false, "no skills injected from an empty registry");
});

test("injectMemoryAndSkills resolves cleanly for a CLAUDE-format body with no owner (provider-mapping path)", async () => {
  // Characterizes the no-owner short-circuit for a non-OpenAI source format. Nothing is
  // injected; the function just returns the body untouched and memorySettings=null.
  const body: Record<string, unknown> = {
    model: "claude-3-5-sonnet",
    messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: null,
    provider: "claude",
    effectiveModel: "claude-3-5-sonnet",
    sourceFormat: FORMATS.CLAUDE,
    targetFormat: FORMATS.CLAUDE,
    backgroundReason: "background-task",
    log: null,
  });

  assert.equal(result.memorySettings, null);
  assert.equal(result.body, body);
});

test("injectMemoryAndSkills injects memory tools when memory is enabled", async () => {
  const { updateSettings } = await import("../../../src/lib/db/settings.ts");
  const { invalidateMemorySettingsCache } = await import("../../../src/lib/memory/settings.ts");
  const { MEMORY_BUILTIN_TOOL_NAMES } = await import("../../../src/lib/skills/memoryBuiltins.ts");

  await updateSettings({ memoryEnabled: true, memoryMaxTokens: 2000 });
  invalidateMemorySettingsCache();

  const body: Record<string, unknown> = {
    model: "gpt-4o",
    messages: [{ role: "user", content: "hello" }],
    tools: [{ type: "function", function: { name: "some_client_tool", description: "x" } }],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: "owner-mem-on",
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: { debug: () => {} },
  });

  assert.equal(result.memorySettings?.enabled, true);
  const toolNames = (result.body.tools as { function?: { name?: string }; name?: string }[]).map(
    (tool) => tool.function?.name ?? tool.name
  );
  for (const memoryTool of MEMORY_BUILTIN_TOOL_NAMES) {
    assert.ok(
      toolNames.includes(memoryTool),
      `expected ${memoryTool} to be injected into body.tools`
    );
  }
  assert.ok(toolNames.includes("some_client_tool"), "client tools are preserved");

  invalidateMemorySettingsCache();
});

test("injectMemoryAndSkills does not inject server memory tools for stream requests", async () => {
  const { updateSettings } = await import("../../../src/lib/db/settings.ts");
  const { invalidateMemorySettingsCache } = await import("../../../src/lib/memory/settings.ts");
  const { MEMORY_BUILTIN_TOOL_NAMES } = await import("../../../src/lib/skills/memoryBuiltins.ts");

  await updateSettings({ memoryEnabled: true, memoryMaxTokens: 2000 });
  invalidateMemorySettingsCache();

  const body: Record<string, unknown> = {
    model: "gpt-4o",
    stream: true,
    messages: [{ role: "user", content: "hello" }],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: "owner-stream",
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: { debug: () => {} },
  });

  assert.equal(result.memorySettings?.enabled, true);
  const tools =
    (result.body.tools as { function?: { name?: string }; name?: string }[] | undefined) ?? [];
  const toolNames = tools.map((tool) => tool.function?.name ?? tool.name);
  for (const memoryTool of MEMORY_BUILTIN_TOOL_NAMES) {
    assert.equal(
      toolNames.includes(memoryTool),
      false,
      `expected ${memoryTool} to be absent for stream requests (client-side MCP path)`
    );
  }

  invalidateMemorySettingsCache();
});

test("injectMemoryAndSkills does not inject memory tools when memory is disabled", async () => {
  const { updateSettings } = await import("../../../src/lib/db/settings.ts");
  const { invalidateMemorySettingsCache } = await import("../../../src/lib/memory/settings.ts");
  const { MEMORY_BUILTIN_TOOL_NAMES } = await import("../../../src/lib/skills/memoryBuiltins.ts");

  await updateSettings({ memoryEnabled: false });
  invalidateMemorySettingsCache();

  const body: Record<string, unknown> = {
    model: "gpt-4o",
    messages: [{ role: "user", content: "hello" }],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: "owner-mem-off",
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: { debug: () => {} },
  });

  const tools =
    (result.body.tools as { function?: { name?: string }; name?: string }[] | undefined) ?? [];
  const toolNames = tools.map((tool) => tool.function?.name ?? tool.name);
  for (const memoryTool of MEMORY_BUILTIN_TOOL_NAMES) {
    assert.equal(
      toolNames.includes(memoryTool),
      false,
      `expected ${memoryTool} to be absent when memory is disabled`
    );
  }

  invalidateMemorySettingsCache();
});

// ─── Task 3: owner-set provenance + stream gate RED tests ────────────────────

test("stream:true + skills enabled + registry has items → no custom skill tool injected, injectedCustomSkillNames=[]", async () => {
  const { updateSettings } = await import("../../src/lib/db/settings.ts");
  const { invalidateMemorySettingsCache: inv2 } = await import("../../src/lib/memory/settings.ts");

  await updateSettings({ memoryEnabled: true, memoryMaxTokens: 2000, skillsEnabled: true });
  inv2();
  resetSkillsRegistry();

  await skillRegistry.register({
    name: "test-skill",
    version: "1.0.0",
    description: "test skill for stream gate",
    schema: { input: {}, output: {} },
    handler: "test-handler",
    enabled: true,
    apiKeyId: "owner-stream-skills",
    mode: "on",
  });

  const body: Record<string, unknown> = {
    model: "gpt-4o",
    stream: true,
    messages: [{ role: "user", content: "hello" }],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: "owner-stream-skills",
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: { debug: () => {} },
  });

  const toolNames = (
    (result.body.tools as { function?: { name?: string }; name?: string }[] | undefined) ?? []
  ).map((t) => t.function?.name ?? t.name);
  const hasCustomSkill = toolNames.some(
    (n) => typeof n === "string" && (n.includes("test-skill") || n.startsWith("omr_skill_"))
  );
  assert.equal(hasCustomSkill, false, "stream:true must not inject custom skill tools");

  assert.deepEqual(
    (result as Record<string, unknown>).injectedCustomSkillNames,
    [],
    "injectedCustomSkillNames must be empty for stream requests"
  );

  resetSkillsRegistry();
  inv2();
});

test("memory actual injection → builtinToolNames equals exactly the newly added memory tool names", async () => {
  const { updateSettings } = await import("../../src/lib/db/settings.ts");
  const { invalidateMemorySettingsCache: inv3 } = await import("../../src/lib/memory/settings.ts");
  const { MEMORY_BUILTIN_TOOL_NAMES } = await import("../../src/lib/skills/memoryBuiltins.ts");

  await updateSettings({ memoryEnabled: true, memoryMaxTokens: 2000 });
  inv3();
  resetSkillsRegistry();

  const body: Record<string, unknown> = {
    model: "gpt-4o",
    messages: [{ role: "user", content: "hello" }],
    tools: [{ type: "function", function: { name: "some_client_tool", description: "x" } }],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: "owner-builtin-own",
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: { debug: () => {} },
  });

  const builtinToolNames = (result as Record<string, unknown>).builtinToolNames as
    string[] | undefined;
  assert.ok(builtinToolNames, "builtinToolNames must be present in result");

  const expectedNewMemoryNames = [...MEMORY_BUILTIN_TOOL_NAMES];
  assert.deepEqual(
    builtinToolNames.sort(),
    expectedNewMemoryNames.sort(),
    "builtinToolNames must equal exactly the newly added memory tool names"
  );

  resetSkillsRegistry();
  inv3();
});

test("client already has memory_search → not injected, not in builtinToolNames", async () => {
  const { updateSettings } = await import("../../src/lib/db/settings.ts");
  const { invalidateMemorySettingsCache: inv4 } = await import("../../src/lib/memory/settings.ts");
  const { MEMORY_SEARCH_TOOL_NAME } = await import("../../src/lib/skills/memoryBuiltins.ts");

  await updateSettings({ memoryEnabled: true, memoryMaxTokens: 2000 });
  inv4();
  resetSkillsRegistry();

  const body: Record<string, unknown> = {
    model: "gpt-4o",
    messages: [{ role: "user", content: "hello" }],
    tools: [
      {
        type: "function",
        function: { name: MEMORY_SEARCH_TOOL_NAME, description: "client memory" },
      },
    ],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: "owner-client-mem",
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: { debug: () => {} },
  });

  const toolNames = (
    (result.body.tools as { function?: { name?: string }[] | undefined }) ?? []
  ).map((t: { function?: { name?: string } }) => t.function?.name);

  const memorySearchCount = toolNames.filter((n) => n === MEMORY_SEARCH_TOOL_NAME).length;
  assert.equal(memorySearchCount, 1, "only one memory_search (client's) must exist");

  const builtinToolNames = (result as Record<string, unknown>).builtinToolNames as
    string[] | undefined;
  assert.ok(builtinToolNames, "builtinToolNames must be present");
  assert.equal(
    builtinToolNames.includes(MEMORY_SEARCH_TOOL_NAME),
    false,
    "client-owned memory_search must NOT be in builtinToolNames"
  );

  resetSkillsRegistry();
  inv4();
});

test("custom skill client collision: client has same encoded skill name → not injected, not in injectedCustomSkillNames", async () => {
  const { updateSettings } = await import("../../src/lib/db/settings.ts");
  const { invalidateMemorySettingsCache: inv5 } = await import("../../src/lib/memory/settings.ts");
  const { encodeSkillToolName } = await import("../../src/lib/skills/injection.ts");

  await updateSettings({ memoryEnabled: true, memoryMaxTokens: 2000, skillsEnabled: true });
  inv5();
  resetSkillsRegistry();

  await skillRegistry.register({
    name: "collision-skill",
    version: "1.0.0",
    description: "skill that collides",
    schema: { input: {}, output: {} },
    handler: "collision-handler",
    enabled: true,
    apiKeyId: "owner-collision",
    mode: "on",
  });

  const encodedName = encodeSkillToolName("collision-skill", "1.0.0");

  const body: Record<string, unknown> = {
    model: "gpt-4o",
    messages: [{ role: "user", content: "hello" }],
    tools: [{ type: "function", function: { name: encodedName, description: "client collision" } }],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: "owner-collision",
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: { debug: () => {} },
  });

  const toolNames = (
    (result.body.tools as { function?: { name?: string }[] | undefined }) ?? []
  ).map((t: { function?: { name?: string } }) => t.function?.name);

  const count = toolNames.filter((n) => n === encodedName).length;
  assert.equal(count, 1, "only one instance of encoded name must exist (client's)");

  const injectedCustomSkillNames = (result as Record<string, unknown>).injectedCustomSkillNames as
    string[] | undefined;
  assert.ok(injectedCustomSkillNames, "injectedCustomSkillNames must be present");
  assert.equal(
    injectedCustomSkillNames.includes(encodedName),
    false,
    "client-owned skill name must NOT be in injectedCustomSkillNames"
  );

  resetSkillsRegistry();
  inv5();
});

test("web-search fallback: client has same tool name → not added to builtinToolNames", async () => {
  const { updateSettings } = await import("../../src/lib/db/settings.ts");
  const { invalidateMemorySettingsCache: inv6 } = await import("../../src/lib/memory/settings.ts");
  const { OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME } =
    await import("../../open-sse/services/webSearchFallback.ts");

  await updateSettings({ memoryEnabled: true, memoryMaxTokens: 2000 });
  inv6();
  resetSkillsRegistry();

  const body: Record<string, unknown> = {
    model: "gpt-4o",
    messages: [{ role: "user", content: "hello" }],
    tools: [
      {
        type: "function",
        function: { name: OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME, description: "client search" },
      },
    ],
  };

  const result = await injectMemoryAndSkills({
    body,
    memoryOwnerId: "owner-websearch",
    provider: "openai",
    effectiveModel: "gpt-4o",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: { debug: () => {} },
  });

  const builtinToolNames = (result as Record<string, unknown>).builtinToolNames as
    string[] | undefined;
  assert.ok(builtinToolNames, "builtinToolNames must be present");
  assert.equal(
    builtinToolNames.includes(OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME),
    false,
    "client-owned web search tool must NOT be in builtinToolNames"
  );

  resetSkillsRegistry();
  inv6();
});

// ─── Fix Round 2: Defect 5 — mergeInjectedFallbackOwnerNames + provenance ───

test("mergeInjectedFallbackOwnerNames: adds name only when enabled=true, convertedToolCount>0, toolName non-null, and not already in client tools", () => {
  const result = mergeInjectedFallbackOwnerNames({ builtinToolNames: ["memory_search"] }, [
    { enabled: true, toolName: "omniroute_web_search", convertedToolCount: 2 },
    { enabled: true, toolName: null, convertedToolCount: 1 },
    { enabled: false, toolName: "omniroute_web_fetch", convertedToolCount: 3 },
    { enabled: true, toolName: "omniroute_web_fetch", convertedToolCount: 0 },
  ]);

  assert.deepEqual(result.builtinToolNames, ["memory_search", "omniroute_web_search"]);
});

test("mergeInjectedFallbackOwnerNames: does not mutate input injectionResult", () => {
  const input = { builtinToolNames: ["original"] };
  const plans = [{ enabled: true, toolName: "omniroute_web_search", convertedToolCount: 1 }];
  const result = mergeInjectedFallbackOwnerNames(input, plans);

  // input must be unchanged
  assert.deepEqual(input.builtinToolNames, ["original"]);
  // result is a new object
  assert.notEqual(result, input);
  assert.deepEqual(result.builtinToolNames, ["original", "omniroute_web_search"]);
});

test("mergeInjectedFallbackOwnerNames: skips name already present in pre-conversion client tools", () => {
  const result = mergeInjectedFallbackOwnerNames({ builtinToolNames: ["omniroute_web_search"] }, [
    { enabled: true, toolName: "omniroute_web_search", convertedToolCount: 2 },
  ]);

  // Must not duplicate — omniroute_web_search already present
  assert.deepEqual(result.builtinToolNames, ["omniroute_web_search"]);
});

// ─── Fix Round 3: Defect 3 — pre-conversion collision guard ─────────────────

test("mergeInjectedFallbackOwnerNames: client has omniroute_web_search → not added to builtinToolNames even if enabled=true", () => {
  // Scenario: client sends {type:"web_search"} plus function named omniroute_web_search.
  // prepareWebSearchFallbackBody emits enabled=true, convertedToolCount=2 (from the
  // builtin conversion) but the synthetic tool was NOT added because client already has it.
  // mergeInjectedFallbackOwnerNames must check pre-conversion client names.
  const result = mergeInjectedFallbackOwnerNames(
    { builtinToolNames: [] },
    [{ enabled: true, toolName: "omniroute_web_search", convertedToolCount: 2 }],
    ["omniroute_web_search"]
  );

  // Must NOT add omniroute_web_search — client already owns it
  assert.deepEqual(result.builtinToolNames, []);
});

test("mergeInjectedFallbackOwnerNames: client has omniroute_web_fetch → not added to builtinToolNames", () => {
  const result = mergeInjectedFallbackOwnerNames(
    { builtinToolNames: [] },
    [{ enabled: true, toolName: "omniroute_web_fetch", convertedToolCount: 1 }],
    ["omniroute_web_fetch"]
  );

  assert.deepEqual(result.builtinToolNames, []);
});

test("mergeInjectedFallbackOwnerNames: client does NOT have the fallback name → added to builtinToolNames", () => {
  const result = mergeInjectedFallbackOwnerNames(
    { builtinToolNames: [] },
    [{ enabled: true, toolName: "omniroute_web_search", convertedToolCount: 2 }],
    ["some_other_tool"]
  );

  assert.deepEqual(result.builtinToolNames, ["omniroute_web_search"]);
});

test("mergeInjectedFallbackOwnerNames: no preConversionClientToolNames provided → falls back to existing behavior", () => {
  const result = mergeInjectedFallbackOwnerNames({ builtinToolNames: [] }, [
    { enabled: true, toolName: "omniroute_web_search", convertedToolCount: 2 },
  ]);

  assert.deepEqual(result.builtinToolNames, ["omniroute_web_search"]);
});
