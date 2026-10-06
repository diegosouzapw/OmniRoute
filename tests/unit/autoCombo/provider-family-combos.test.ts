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
  buildFamilyCandidateFilter,
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

beforeEach(async () => {
  await resetStorage();
});

afterAll(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
    assert.equal(detectModelFamily("unrelated-model"), null);
    assert.equal(detectModelFamily(""), null);
    assert.equal(detectModelFamily(null), null);
  });

  it("never detects zai from a model id (provider-override family)", () => {
    // zai's own models are named glm-*, not zai-*; auto/zai is resolved by
    // provider id, not by a model-name prefix (see modelFamily.ts comment).
    assert.equal(detectModelFamily("zai-glm-5.2"), null);
  });

  it("isValidModelFamily accepts exactly the 11 advertised families", () => {
    for (const family of [
      "glm",
      "minimax",
      "mimo",
      "zai",
      "gemma",
      "llama",
      "gemini",
      "kimi",
      "qwen",
      "deepseek",
      "gpt",
    ]) {
      assert.equal(isValidModelFamily(family), true);
    }
    assert.equal(isValidModelFamily("unknown"), false);
    assert.equal(isValidModelFamily(undefined), false);
  });

  it("advertises exactly one auto/<family> catalog id per family", () => {
    assert.deepEqual([...AUTO_FAMILY_IDS].sort(), [
      "auto/deepseek",
      "auto/gemini",
      "auto/gemma",
      "auto/glm",
      "auto/gpt",
      "auto/kimi",
      "auto/llama",
      "auto/mimo",
      "auto/minimax",
      "auto/qwen",
      "auto/zai",
    ]);
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
    // Dedupe to the provider SET: since #7928 the candidate pool is a
    // connections × models Cartesian product, so a provider that serves several
    // glm-5.2-bearing models now contributes one candidate per model rather than
    // exactly one row. The #6453 invariant is which providers span the family,
    // not the per-provider candidate count.
    const providerIds = [...new Set(combo.models.map((m) => m.providerId))].sort();
    // Includes the always-on `auggie` no-auth candidate: its registry (v0.32.0 CLI
    // model ids) advertises a literal "glm-5.2" model, and — same as the
    // "degrades gracefully" test below documents for opencode/minimax — a
    // no-auth backend that genuinely serves a family model IS a legitimate
    // member of the family pool, not just credentialed provider_connections rows.
    // `devin-cli-agentic` joined for the same documented reason as `auggie`:
    // #8914 added the Devin ACP bridge whose catalog (registry/devin/catalog.ts)
    // advertises the glm-5-2* line, so it genuinely serves the family.
    // `zcode` joined for the same documented reason too — #10184 added the local
    // ZCode app-server backend whose registry (registry/zcode) advertises the
    // full GLM_SHARED_MODELS line-up, so it genuinely serves the family.
    // `cloudflare-playground` joined on the same rule — its registry
    // (open-sse/config/providers/registry/cloudflare-playground/index.ts) advertises
    // zai-org/glm-5.2 and zai-org/glm-4.7-flash, so it genuinely serves the family.
    assert.deepEqual(providerIds, [
      "auggie",
      "cloudflare-playground",
      "devin-cli-agentic",
      "glm",
      "zai",
      "zcode",
    ]);
    // Every candidate must be a glm-family model (the Cartesian pool now surfaces
    // each backend's full glm line-up, not only the glm-5.2 default), and the
    // connected openai/gpt-4o-mini backend must be excluded — same family
    // invariant the "degrades gracefully" case asserts for auto/minimax.
    assert.ok(
      combo.models.every((m) => detectModelFamily(m.model) === "glm"),
      "every auto/glm candidate must be a glm-family model, never the connected openai one"
    );
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
    // The provider-override invariant: auto/zai must include ONLY the zai
    // provider and exclude the connected-but-unrelated glm connection. Since
    // #7928's Cartesian pool, zai contributes one candidate per zai model, so
    // assert the set is exactly {zai} rather than a single row.
    assert.ok(providerIds.length > 0, "auto/zai must materialize at least one zai candidate");
    assert.ok(
      providerIds.every((p) => p === "zai"),
      "auto/zai must include ONLY zai-provider models, never the connected glm connection"
    );
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
    for (const family of [
      "glm",
      "minimax",
      "mimo",
      "zai",
      "gemma",
      "llama",
      "gemini",
      "kimi",
      "qwen",
      "deepseek",
      "gpt",
    ]) {
      assert.equal(builtinCatalog.isRecognizedBuiltinAuto(`auto/${family}`, family), true);
    }
    assert.equal(builtinCatalog.isRecognizedBuiltinAuto("auto/unknownfam", "unknownfam"), false);
  });
});

describe("additional auto-routing families (#13214)", () => {
  it("materializes Qwen, DeepSeek and GPT without crossing family boundaries", async () => {
    for (const [provider, defaultModel] of [
      ["qwen", "qwen3-14b"],
      ["deepseek", "deepseek-chat"],
      ["openai", "gpt-4o"],
    ]) {
      await providersDb.createProviderConnection({
        provider,
        defaultModel,
        authType: "apikey",
        name: provider,
        apiKey: "test",
      });
    }
    for (const [family, provider] of [
      ["qwen", "qwen"],
      ["deepseek", "deepseek"],
      ["gpt", "openai"],
    ]) {
      const combo = await builtinCatalog.createBuiltinAutoCombo(`auto/${family}`, family);
      assert.equal(combo.id, `auto/${family}`);
      assert.equal(combo.strategy, "auto");
      assert.ok(
        combo.models.some((model) => model.providerId === provider),
        family
      );
      assert.ok(
        combo.models.every((model) => detectModelFamily(model.model) === family),
        family
      );
    }
  });

  it("materializes Kimi across coding, web and Moonshot without unrelated models", async () => {
    for (const [provider, defaultModel] of [
      ["kimi-coding", "k3"],
      ["kimi-coding-apikey", "k3"],
      ["kimi-web", "k3"],
      ["moonshot", "kimi-k2.5"],
      ["openai", "gpt-4o"],
    ]) {
      await providersDb.createProviderConnection({
        provider,
        defaultModel,
        authType: "apikey",
        name: provider,
        apiKey: "test",
      });
    }
    const combo = await builtinCatalog.createBuiltinAutoCombo("auto/kimi", "kimi");
    assert.equal(combo.id, "auto/kimi");
    assert.equal(combo.strategy, "auto");
    for (const provider of ["kimi-coding", "kimi-coding-apikey", "kimi-web", "moonshot"]) {
      assert.ok(
        combo.models.some((model) => model.providerId === provider),
        provider
      );
    }
    assert.ok(combo.models.every((model) => model.providerId !== "openai"));
  });

  it("detects new families across provider-prefixed and bare model ids", () => {
    for (const [model, family] of [
      ["moonshot/kimi-k3", "kimi"],
      ["QWEN3-14B", "qwen"],
      ["qwen2.5-coder-32b-instruct", "qwen"],
      ["qwen3.5-plus", "qwen"],
      ["deepseek/deepseek-chat", "deepseek"],
      ["openai/gpt-4o", "gpt"],
    ]) {
      assert.equal(detectModelFamily(model), family);
    }
    assert.equal(detectModelFamily("k3"), null);
    assert.equal(detectModelFamily("not-qwen3"), null);
  });

  it("includes Kimi k3 only on known Kimi backends, alongside prefix matches", () => {
    const filter = buildFamilyCandidateFilter("kimi");
    for (const provider of ["kimi-coding", "kimi-web", "kimi-coding-apikey"]) {
      assert.equal(filter({ provider, model: "k3" }), true);
      assert.equal(filter({ provider, model: `${provider}/k3` }), true);
      assert.equal(filter({ provider, model: "gpt-4o" }), false);
    }
    assert.equal(filter({ provider: "moonshot", model: "kimi-k3" }), true);
    assert.equal(filter({ provider: "custom", model: "kimi-k2.5" }), true);
    assert.equal(filter({ provider: "custom", model: "k3" }), false);
    assert.equal(buildFamilyCandidateFilter("gpt")({ provider: "kimi-web", model: "k3" }), false);
    assert.equal(buildFamilyCandidateFilter("zai")({ provider: "glm", model: "glm-5.2" }), false);
  });

  it("maps Haiku to fast while preserving Opus and Sonnet variants", () => {
    for (const [suffix, variant] of [
      ["claude-haiku", "fast"],
      ["claude-opus", "smart"],
      ["claude-sonnet", "coding"],
    ]) {
      assert.equal(builtinCatalog.AUTO_TEMPLATE_VARIANTS[`auto/${suffix}`], variant);
      assert.equal(builtinCatalog.isRecognizedBuiltinAuto(`auto/${suffix}`, suffix), true);
      assert.deepEqual(builtinCatalog.resolveBuiltinAutoSpec(`auto/${suffix}`, suffix), {
        variant,
      });
    }
  });
});
