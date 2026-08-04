import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Set DATA_DIR BEFORE any DB modules are imported so core.ts uses the temp dir.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pf-db-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports — these modules initialize SQLite on load, so DATA_DIR must be
// set first.
const core = await import("../../src/lib/db/core.ts");
const {
  setParamFilterConfig,
  getParamFilterConfig,
  deleteParamFilterConfig,
  loadParamFilterConfigs,
  addParamToBlocklist,
  isAutoLearnGloballyEnabled,
  setGlobalAutoLearnEnabled,
} = await import("../../src/lib/db/paramFilters.ts");
const { stripUnsupportedParams } = await import("../../open-sse/translator/paramSupport.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// setParamFilterConfig / getParamFilterConfig
// ---------------------------------------------------------------------------

test("setParamFilterConfig stores and getParamFilterConfig retrieves a config", () => {
  const config = {
    block: ["thinking", "reasoning_budget"],
    allow: [],
    autoLearn: true,
  };
  setParamFilterConfig("test-provider", config);
  const retrieved = getParamFilterConfig("test-provider");
  assert.notEqual(retrieved, null);
  assert.deepEqual(retrieved!.block, ["thinking", "reasoning_budget"]);
  assert.deepEqual(retrieved!.allow, []);
  assert.equal(retrieved!.autoLearn, true);
});

test("getParamFilterConfig returns null for unconfigured provider", () => {
  assert.equal(getParamFilterConfig("nonexistent"), null);
});

test("getParamFilterConfig returns null for empty provider", () => {
  assert.equal(getParamFilterConfig(""), null);
});

test("setParamFilterConfig with model overrides stores correctly", () => {
  const config = {
    block: ["thinking"],
    allow: [],
    models: {
      "deepseek-r1": { block: ["max_tokens"] },
      "deepseek-r2": { block: ["temperature"], allow: ["reasoning"] },
    },
    autoLearn: false,
  };
  setParamFilterConfig("nvidia", config);
  const retrieved = getParamFilterConfig("nvidia");
  assert.notEqual(retrieved, null);
  assert.deepEqual(retrieved!.models?.["deepseek-r1"]?.block, ["max_tokens"]);
  assert.deepEqual(retrieved!.models?.["deepseek-r2"]?.block, ["temperature"]);
  assert.deepEqual(retrieved!.models?.["deepseek-r2"]?.allow, ["reasoning"]);
});

// ---------------------------------------------------------------------------
// deleteParamFilterConfig
// ---------------------------------------------------------------------------

test("deleteParamFilterConfig removes config and getParamFilterConfig returns null", () => {
  setParamFilterConfig("ephemeral", { block: ["param1"], allow: [], autoLearn: false });
  assert.notEqual(getParamFilterConfig("ephemeral"), null);
  deleteParamFilterConfig("ephemeral");
  assert.equal(getParamFilterConfig("ephemeral"), null);
});

test("deleteParamFilterConfig is a no-op for unconfigured provider", () => {
  deleteParamFilterConfig("nothing-here");
});

// ---------------------------------------------------------------------------
// loadParamFilterConfigs
// ---------------------------------------------------------------------------

test("loadParamFilterConfigs returns all configured providers", () => {
  setParamFilterConfig("provider-a", { block: ["a"], allow: [], autoLearn: false });
  setParamFilterConfig("provider-b", { block: ["b"], allow: [], autoLearn: true });
  const all = loadParamFilterConfigs();
  assert.equal(all.has("provider-a"), true);
  assert.equal(all.has("provider-b"), true);
  assert.equal(all.get("provider-a")!.block[0], "a");
  assert.equal(all.get("provider-b")!.autoLearn, true);
});

// ---------------------------------------------------------------------------
// addParamToBlocklist
// ---------------------------------------------------------------------------

test("addParamToBlocklist adds param to provider-level block list", () => {
  setParamFilterConfig("test", { block: ["thinking"], allow: [], autoLearn: false });
  addParamToBlocklist("test", "reasoning_budget");
  const config = getParamFilterConfig("test");
  assert.deepEqual(config!.block, ["thinking", "reasoning_budget"]);
});

test("addParamToBlocklist is idempotent — does not add duplicate", () => {
  setParamFilterConfig("test-dup", { block: ["thinking"], allow: [], autoLearn: false });
  addParamToBlocklist("test-dup", "thinking");
  addParamToBlocklist("test-dup", "thinking");
  const config = getParamFilterConfig("test-dup");
  assert.deepEqual(config!.block, ["thinking"]);
});

test("addParamToBlocklist creates config if none exists", () => {
  addParamToBlocklist("fresh-provider", "thinking");
  const config = getParamFilterConfig("fresh-provider");
  assert.notEqual(config, null);
  assert.deepEqual(config!.block, ["thinking"]);
  assert.equal(config!.autoLearn, false);
});

test("addParamToBlocklist with model param adds to model-level block list", () => {
  setParamFilterConfig("test-model", { block: [], allow: [], autoLearn: false });
  addParamToBlocklist("test-model", "temperature", "deepseek-r1");
  const config = getParamFilterConfig("test-model");
  assert.deepEqual(config!.models?.["deepseek-r1"]?.block, ["temperature"]);
});

// ---------------------------------------------------------------------------
// Global auto-learn flag
// ---------------------------------------------------------------------------

test("isAutoLearnGloballyEnabled returns false by default", () => {
  assert.equal(isAutoLearnGloballyEnabled(), false);
});

test("setGlobalAutoLearnEnabled(true) enables global auto-learn", () => {
  setGlobalAutoLearnEnabled(true);
  assert.equal(isAutoLearnGloballyEnabled(), true);
});

test("setGlobalAutoLearnEnabled(false) disables global auto-learn", () => {
  setGlobalAutoLearnEnabled(true);
  assert.equal(isAutoLearnGloballyEnabled(), true);
  setGlobalAutoLearnEnabled(false);
  assert.equal(isAutoLearnGloballyEnabled(), false);
});

test("setGlobalAutoLearnEnabled does not affect per-provider configs", () => {
  setParamFilterConfig("test-global-safe", { block: ["thinking"], allow: [], autoLearn: false });
  setGlobalAutoLearnEnabled(true);
  const config = getParamFilterConfig("test-global-safe");
  assert.deepEqual(config!.block, ["thinking"]);
  assert.equal(config!.autoLearn, false);
  // Global is independent
  assert.equal(isAutoLearnGloballyEnabled(), true);
});

// ---------------------------------------------------------------------------
// Full pipeline: DB config → stripUnsupportedParams
// ---------------------------------------------------------------------------

test("stripUnsupportedParams strips config-driven provider-level denylist", () => {
  setParamFilterConfig("nvidia", {
    block: ["thinking", "reasoning_budget"],
    allow: [],
    autoLearn: false,
  });
  loadParamFilterConfigs();

  const body = { model: "deepseek-r1", thinking: "enabled", max_tokens: 100 };
  const result = stripUnsupportedParams("nvidia", "deepseek-r1", body);
  assert.equal((result as Record<string, unknown>).thinking, undefined);
  assert.equal((result as Record<string, unknown>).reasoning_budget, undefined);
  assert.equal((result as Record<string, unknown>).max_tokens, 100);
});

test("stripUnsupportedParams strips config-driven model-level denylist (stricter)", () => {
  setParamFilterConfig("nvidia", {
    block: ["thinking"],
    allow: [],
    models: { "deepseek-r1": { block: ["max_tokens"] } },
    autoLearn: false,
  });
  loadParamFilterConfigs();

  const body = { model: "deepseek-r1", thinking: "enabled", max_tokens: 100, temperature: 0.7 };
  const result = stripUnsupportedParams("nvidia", "deepseek-r1", body);
  assert.equal((result as Record<string, unknown>).thinking, undefined);
  assert.equal((result as Record<string, unknown>).max_tokens, undefined);
  assert.equal((result as Record<string, unknown>).temperature, 0.7);
});

test("stripUnsupportedParams allowlist restores a denied param from original body", () => {
  setParamFilterConfig("nvidia", {
    block: ["thinking", "reasoning_budget"],
    allow: ["thinking"],
    autoLearn: false,
  });
  loadParamFilterConfigs();

  const body = { model: "deepseek-r1", thinking: "enabled", max_tokens: 100 };
  const result = stripUnsupportedParams("nvidia", "deepseek-r1", body);
  assert.equal((result as Record<string, unknown>).thinking, "enabled");
  assert.equal((result as Record<string, unknown>).reasoning_budget, undefined);
  assert.equal((result as Record<string, unknown>).max_tokens, 100);
});

test("stripUnsupportedParams allowlist does not introduce params not in original body", () => {
  setParamFilterConfig("nvidia", {
    block: [],
    allow: ["nonexistent_param"],
    autoLearn: false,
  });
  loadParamFilterConfigs();

  const body = { model: "deepseek-r1", thinking: "enabled" };
  const result = stripUnsupportedParams("nvidia", "deepseek-r1", body);
  assert.equal((result as Record<string, unknown>).nonexistent_param, undefined);
});

test("stripUnsupportedParams model-level denylist overrides provider-level allowlist", () => {
  setParamFilterConfig("nvidia", {
    block: ["thinking"],
    allow: ["thinking"],
    models: { "deepseek-r1": { block: ["thinking"] } },
    autoLearn: false,
  });
  loadParamFilterConfigs();

  // Provider allowlist re-adds thinking, but model-level denylist strips it again
  const body = { model: "deepseek-r1", thinking: "enabled", max_tokens: 100 };
  const result = stripUnsupportedParams("nvidia", "deepseek-r1", body);
  assert.equal(
    (result as Record<string, unknown>).thinking,
    undefined,
    "model denylist should win over provider allowlist"
  );
  assert.equal((result as Record<string, unknown>).max_tokens, 100);
});

test("stripUnsupportedParams no-op when no DB config exists (default behavior)", () => {
  const body = { model: "deepseek-r1", thinking: "enabled", max_tokens: 100 };
  const result = stripUnsupportedParams("unknown", "deepseek-r1", body);
  assert.equal((result as Record<string, unknown>).thinking, "enabled");
  assert.equal((result as Record<string, unknown>).max_tokens, 100);
});
