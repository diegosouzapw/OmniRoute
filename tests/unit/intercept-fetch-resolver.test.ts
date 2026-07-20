import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Set DATA_DIR to a temp dir before any imports that touch the DB.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-intercept-fetch-resolver-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const { setInterceptionRules, resolveInterceptFetch } = await import(
  "../../src/lib/db/interceptionRules.ts"
);

// #7339 — resolveInterceptFetch, a structural twin of resolveInterceptSearch
// (tests/unit/interception-rules.test.ts), covering Phase 3 of #3384.
describe("db/interceptionRules — resolveInterceptFetch precedence (#7339)", () => {
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

  it("returns undefined when no provider/model rule exists", () => {
    assert.equal(resolveInterceptFetch("anthropic", "claude-opus-4"), undefined);
  });

  it("returns the provider-level interceptFetch value when only a provider rule is set", () => {
    setInterceptionRules("anthropic", { interceptFetch: true });
    assert.equal(resolveInterceptFetch("anthropic", "claude-opus-4"), true);
    assert.equal(resolveInterceptFetch("anthropic", "claude-haiku-4"), true);
  });

  it("model-level interceptFetch wins over the provider-level rule when both are set", () => {
    setInterceptionRules("anthropic", {
      interceptFetch: false,
      models: { "claude-opus-4": { interceptFetch: true } },
    });
    assert.equal(resolveInterceptFetch("anthropic", "claude-opus-4"), true);
    assert.equal(resolveInterceptFetch("anthropic", "claude-haiku-4"), false);
  });

  it("does not read interceptSearch when resolving interceptFetch (fields stay independent)", () => {
    setInterceptionRules("anthropic", { interceptSearch: true, interceptFetch: false });
    assert.equal(resolveInterceptFetch("anthropic", "claude-opus-4"), false);
  });

  it("returns undefined for an empty/missing provider", () => {
    assert.equal(resolveInterceptFetch("", "claude-opus-4"), undefined);
    assert.equal(resolveInterceptFetch(null, "claude-opus-4"), undefined);
    assert.equal(resolveInterceptFetch(undefined, "claude-opus-4"), undefined);
  });
});
