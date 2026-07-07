/**
 * #6453 — Provider-family auto combos (`auto/glm`, `auto/minimax`, `auto/zai`,
 * `auto/mimo`, `auto/gemma`, `auto/llama`, `auto/gemini`).
 *
 * See: `open-sse/services/autoCombo/modelFamily.ts` (pure family detection) and
 * `open-sse/services/autoCombo/builtinCatalog.ts` (recognition + materialization).
 *
 * NOTE: tests/unit/autoCombo/ is a vitest-only scope (see vitest.mcp.config.ts);
 * the node:test runner does not walk this dir.
 */
import { describe, it, beforeEach, afterAll, vi } from "vitest";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  detectModelFamily,
  isValidModelFamily,
  AUTO_FAMILY_IDS,
} from "../../../open-sse/services/autoCombo/modelFamily";

// First-touch DB migrations run once per worker and can exceed vitest's 5s
// default in a cold thread; the DB-backed materialization tests below need it.
vi.setConfig({ testTimeout: 20_000 });

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-family-combo-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const builtinCatalog = await import("../../../open-sse/services/autoCombo/builtinCatalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

beforeEach(async () => {
  await resetStorage();
});

afterAll(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

describe("detectModelFamily (pure)", () => {
  it("recognizes glm model ids", () => {
    assert.equal(detectModelFamily("glm-5.2"), "glm");
    assert.equal(detectModelFamily("zai/glm-5.2"), "glm");
  });

  it("recognizes minimax, mimo, gemma, llama, gemini model ids", () => {
    assert.equal(detectModelFamily("minimax-m3"), "minimax");
    assert.equal(detectModelFamily("mimo-v2.5"), "mimo");
    assert.equal(detectModelFamily("gemma-3-27b"), "gemma");
    assert.equal(detectModelFamily("llama-3.3-70b"), "llama");
    assert.equal(detectModelFamily("gemini-3-pro"), "gemini");
  });

  it("returns null for unrelated model ids", () => {
    assert.equal(detectModelFamily("gpt-4o"), null);
    assert.equal(detectModelFamily(""), null);
    assert.equal(detectModelFamily(null), null);
  });

  it("never detects zai from a model id (provider-override family)", () => {
    // zai's own models are named glm-*, not zai-*; auto/zai is resolved by
    // provider id, not by a model-name prefix (see modelFamily.ts comment).
    assert.equal(detectModelFamily("zai-glm-5.2"), null);
  });

  it("isValidModelFamily accepts exactly the 7 advertised families", () => {
    for (const family of ["glm", "minimax", "mimo", "zai", "gemma", "llama", "gemini"]) {
      assert.equal(isValidModelFamily(family), true);
    }
    assert.equal(isValidModelFamily("gpt"), false);
    assert.equal(isValidModelFamily(undefined), false);
  });

  it("advertises exactly one auto/<family> catalog id per family", () => {
    assert.deepEqual(
      [...AUTO_FAMILY_IDS].sort(),
      ["auto/gemini", "auto/gemma", "auto/glm", "auto/llama", "auto/mimo", "auto/minimax", "auto/zai"]
    );
  });
});

describe("auto/<family> materialization (#6453)", () => {
  it("resolves auto/glm to a virtual combo spanning every connected GLM backend", async () => {
    await providersDb.createProviderConnection({
      provider: "glm",
      authType: "apikey",
      name: "GLM direct",
      apiKey: "sk-test-glm",
      defaultModel: "glm-5.2",
    });
    await providersDb.createProviderConnection({
      provider: "zai",
      authType: "apikey",
      name: "z.ai",
      apiKey: "sk-test-zai",
      defaultModel: "glm-5.2",
    });
    await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "OpenAI",
      apiKey: "sk-test-openai",
      defaultModel: "gpt-4o-mini",
    });

    const combo = await builtinCatalog.createBuiltinAutoCombo("auto/glm", "glm");

    assert.equal(combo.id, "auto/glm");
    assert.equal(combo.strategy, "auto");
    const providerIds = combo.models.map((m) => m.providerId).sort();
    assert.deepEqual(providerIds, ["glm", "zai"]);
    assert.ok(combo.models.every((m) => m.model.endsWith("glm-5.2")));
  });

  it("resolves auto/zai to ONLY the zai-provider connection (provider-override family)", async () => {
    await providersDb.createProviderConnection({
      provider: "glm",
      authType: "apikey",
      name: "GLM direct",
      apiKey: "sk-test-glm",
      defaultModel: "glm-5.2",
    });
    await providersDb.createProviderConnection({
      provider: "zai",
      authType: "apikey",
      name: "z.ai",
      apiKey: "sk-test-zai",
      defaultModel: "glm-5.2",
    });

    const combo = await builtinCatalog.createBuiltinAutoCombo("auto/zai", "zai");

    assert.equal(combo.id, "auto/zai");
    const providerIds = combo.models.map((m) => m.providerId);
    assert.deepEqual(providerIds, ["zai"]);
  });

  it("degrades gracefully to the family subset, excluding connected-but-unrelated providers", async () => {
    // Free/noAuth backends may still expose a family model (e.g. opencode serves
    // minimax under its own catalog) — the family combo is expected to include
    // those, but MUST exclude a connected provider whose model is a different
    // family entirely. This is the "subset available" degrade path (#6453).
    await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "OpenAI",
      apiKey: "sk-test-openai",
      defaultModel: "gpt-4o-mini",
    });

    const combo = await builtinCatalog.createBuiltinAutoCombo("auto/minimax", "minimax");

    assert.equal(combo.id, "auto/minimax");
    assert.ok(
      combo.models.every((m) => m.providerId !== "openai"),
      "auto/minimax must not include the connected openai/gpt-4o-mini candidate"
    );
    assert.ok(
      combo.models.every((m) => detectModelFamily(m.model) === "minimax"),
      "every candidate in auto/minimax must actually be a minimax model"
    );
  });


  it("rejects auto/<unknownfamily> with the same clean error as any unknown combo", async () => {
    await assert.rejects(
      () => builtinCatalog.createBuiltinAutoCombo("auto/unknownfam", "unknownfam"),
      /Unknown built-in auto combo/
    );
  });

  it("isRecognizedBuiltinAuto recognizes every auto/<family> id", () => {
    for (const family of ["glm", "minimax", "mimo", "zai", "gemma", "llama", "gemini"]) {
      assert.equal(builtinCatalog.isRecognizedBuiltinAuto(`auto/${family}`, family), true);
    }
    assert.equal(builtinCatalog.isRecognizedBuiltinAuto("auto/unknownfam", "unknownfam"), false);
  });
});
