import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Set DATA_DIR to a temp dir before any imports that touch the DB.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-interception-rules-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const {
  getInterceptionRules,
  setInterceptionRules,
  deleteInterceptionRules,
  resolveInterceptSearch,
} = await import("../../src/lib/db/interceptionRules.ts");

// #3384 — per-model web-search/web-fetch interception rule store.
describe("db/interceptionRules — per-model interception rules (#3384)", () => {
  function resetDb() {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true });
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  beforeEach(() => {
    resetDb();
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns null for an unconfigured provider", () => {
    assert.equal(getInterceptionRules("anthropic"), null);
  });

  it("round-trips a provider-level rule via set/get", () => {
    setInterceptionRules("anthropic", { interceptSearch: true, interceptFetch: false });
    const rules = getInterceptionRules("anthropic");
    assert.equal(rules?.interceptSearch, true);
    assert.equal(rules?.interceptFetch, false);
  });

  it("round-trips a per-model override", () => {
    setInterceptionRules("anthropic", {
      interceptSearch: false,
      models: { "claude-opus-4": { interceptSearch: true } },
    });
    const rules = getInterceptionRules("anthropic");
    assert.equal(rules?.interceptSearch, false);
    assert.equal(rules?.models?.["claude-opus-4"]?.interceptSearch, true);
  });

  it("delete resets a provider back to unconfigured", () => {
    setInterceptionRules("anthropic", { interceptSearch: true });
    deleteInterceptionRules("anthropic");
    assert.equal(getInterceptionRules("anthropic"), null);
  });

  it("invalidates the in-memory cache after a write", () => {
    setInterceptionRules("openai", { interceptSearch: true });
    assert.equal(getInterceptionRules("openai")?.interceptSearch, true);
    setInterceptionRules("openai", { interceptSearch: false });
    assert.equal(getInterceptionRules("openai")?.interceptSearch, false);
  });

  describe("resolveInterceptSearch — precedence", () => {
    it("returns undefined when no rule is configured (caller falls back to bypass defaults)", () => {
      assert.equal(resolveInterceptSearch("anthropic", "claude-opus-4"), undefined);
    });

    it("returns the provider-level rule when no model override exists", () => {
      setInterceptionRules("anthropic", { interceptSearch: true });
      assert.equal(resolveInterceptSearch("anthropic", "claude-opus-4"), true);
      assert.equal(resolveInterceptSearch("anthropic", "claude-haiku-4"), true);
    });

    it("per-model rule overrides the provider-level rule", () => {
      setInterceptionRules("anthropic", {
        interceptSearch: false,
        models: { "claude-opus-4": { interceptSearch: true } },
      });
      assert.equal(resolveInterceptSearch("anthropic", "claude-opus-4"), true);
      assert.equal(resolveInterceptSearch("anthropic", "claude-haiku-4"), false);
    });

    it("returns undefined for an empty/missing provider", () => {
      assert.equal(resolveInterceptSearch("", "claude-opus-4"), undefined);
      assert.equal(resolveInterceptSearch(null, "claude-opus-4"), undefined);
      assert.equal(resolveInterceptSearch(undefined, "claude-opus-4"), undefined);
    });
  });
});
