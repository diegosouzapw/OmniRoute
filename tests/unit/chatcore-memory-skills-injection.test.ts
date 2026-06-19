import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR set BEFORE importing anything that touches the DB
// (injectMemoryAndSkills -> getMemorySettings / retrieveMemories / injectSkills).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mem-skills-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getSkillsProviderForFormat, injectMemoryAndSkills } = await import(
  "../../open-sse/handlers/chatCore/memorySkillsInjection.ts"
);
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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
  assert.equal(getSkillsProviderForFormat("gemini-cli"), "openai");
  assert.equal(getSkillsProviderForFormat("codex"), "openai");
  assert.equal(getSkillsProviderForFormat("totally-unknown"), "openai");
  assert.equal(getSkillsProviderForFormat(""), "openai");
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
  assert.equal(result.memorySettings.enabled, true);
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
