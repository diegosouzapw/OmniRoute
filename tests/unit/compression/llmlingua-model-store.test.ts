/**
 * TDD tests for the llmlingua model registry + model store (Tasks 1-2).
 *
 * Tests are written RED-first (before the implementation exists).
 *
 * Coverage:
 *  1. Registry shape — tinybert + bert-base present; default points at a valid key.
 *  2. Each entry's factory/dtype/subfolder/hfRepo invariants hold.
 *  3. resolveLlmlinguaModel() — known id, and the unknown/undefined/empty fallbacks.
 *  4. getLlmlinguaModelCacheDir() — path suffix + DATA_DIR honoring.
 *  5. configureTransformersEnv() — Hub download default vs local modelPath override.
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

import {
  DEFAULT_LLMLINGUA_MODEL,
  LLMLINGUA_MODELS,
} from "../../../open-sse/services/compression/engines/llmlingua/constants.ts";
import {
  getLlmlinguaModelCacheDir,
  resolveLlmlinguaModel,
  configureTransformersEnv,
  type TransformersEnvLike,
} from "../../../open-sse/services/compression/engines/llmlingua/modelStore.ts";

// ─── tests ────────────────────────────────────────────────────────────────────

describe("llmlingua model registry (constants)", () => {
  // ── 1. registry shape ──────────────────────────────────────────────────────
  it("LLMLINGUA_MODELS has both proven models and the default is a valid key", () => {
    assert.ok(LLMLINGUA_MODELS.tinybert, "tinybert entry must exist");
    assert.ok(LLMLINGUA_MODELS["bert-base"], "bert-base entry must exist");
    assert.equal(DEFAULT_LLMLINGUA_MODEL, "tinybert");
    assert.ok(
      Object.prototype.hasOwnProperty.call(LLMLINGUA_MODELS, DEFAULT_LLMLINGUA_MODEL),
      "default must be a key of the registry"
    );
  });

  // ── 2. per-entry invariants ─────────────────────────────────────────────────
  it("every entry uses WithBERTMultilingual / fp32 / '' subfolder and a sane hfRepo", () => {
    for (const [key, entry] of Object.entries(LLMLINGUA_MODELS)) {
      assert.equal(entry.factory, "WithBERTMultilingual", `${key}.factory`);
      assert.equal(entry.dtype, "fp32", `${key}.dtype`);
      assert.equal(entry.subfolder, "", `${key}.subfolder`);
      assert.equal(typeof entry.hfRepo, "string", `${key}.hfRepo type`);
      assert.ok(entry.hfRepo.length > 0, `${key}.hfRepo non-empty`);
      assert.ok(entry.hfRepo.includes("/"), `${key}.hfRepo contains "/"`);
      assert.equal(entry.id, key, `${key}.id matches its registry key`);
      assert.equal(typeof entry.sizeMB, "number", `${key}.sizeMB type`);
      assert.equal(typeof entry.label, "string", `${key}.label type`);
    }
  });
});

describe("resolveLlmlinguaModel", () => {
  // ── 3. resolution + fallback ────────────────────────────────────────────────
  it("returns the requested entry for a known id", () => {
    const resolved = resolveLlmlinguaModel("bert-base");
    assert.equal(resolved.id, "bert-base");
    assert.equal(resolved, LLMLINGUA_MODELS["bert-base"]);
  });

  it("falls back to the default (tinybert) for unknown / undefined / empty ids", () => {
    const def = LLMLINGUA_MODELS[DEFAULT_LLMLINGUA_MODEL];
    assert.equal(resolveLlmlinguaModel("nonexistent"), def);
    assert.equal(resolveLlmlinguaModel(undefined), def);
    assert.equal(resolveLlmlinguaModel(null), def);
    assert.equal(resolveLlmlinguaModel(""), def);
  });
});

describe("getLlmlinguaModelCacheDir", () => {
  const originalDataDir = process.env.DATA_DIR;
  let tmpDir: string | undefined;

  after(() => {
    if (originalDataDir === undefined) {
      delete process.env.DATA_DIR;
    } else {
      process.env.DATA_DIR = originalDataDir;
    }
    if (tmpDir) {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {
        /* ignore cleanup errors */
      }
    }
  });

  // ── 4. path suffix + DATA_DIR honoring ──────────────────────────────────────
  it("ends with models/llmlingua and lives under DATA_DIR when set", () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "llm-"));
    process.env.DATA_DIR = tmpDir;

    const dir = getLlmlinguaModelCacheDir();
    assert.ok(
      dir.endsWith(path.join("models", "llmlingua")),
      `cache dir should end with models/llmlingua, got: ${dir}`
    );
    assert.ok(dir.startsWith(tmpDir), `cache dir should be under DATA_DIR, got: ${dir}`);
    assert.equal(dir, path.join(tmpDir, "models", "llmlingua"));
  });
});

describe("configureTransformersEnv", () => {
  // ── 5. Hub default vs local override ────────────────────────────────────────
  it("Hub download default: cacheDir set, allowRemoteModels true, no localModelPath", () => {
    const env: TransformersEnvLike = {};
    configureTransformersEnv(env, {});
    assert.equal(typeof env.cacheDir, "string");
    assert.ok((env.cacheDir as string).length > 0, "cacheDir must be set");
    assert.equal(env.allowRemoteModels, true);
    assert.equal(env.localModelPath, undefined);
  });

  it("local modelPath override: localModelPath set, allowRemoteModels false, cacheDir still set", () => {
    const env: TransformersEnvLike = {};
    configureTransformersEnv(env, { modelPath: "/some/local/dir" });
    assert.equal(env.localModelPath, "/some/local/dir");
    assert.equal(env.allowRemoteModels, false);
    assert.equal(typeof env.cacheDir, "string");
    assert.ok((env.cacheDir as string).length > 0, "cacheDir must still be set");
  });
});
