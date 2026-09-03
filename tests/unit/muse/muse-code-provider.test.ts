/**
 * Tests for Muse Code CLI provider registry entry.
 *
 * Verifies the provider entry loads correctly with expected config.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { muse_codeProvider } from "../../../open-sse/config/providers/registry/muse-code/index.ts";
import { getRegistryEntry } from "../../../open-sse/config/providerRegistry.ts";

// ── Registry entry structure ────────────────────────────────────────────────

test("muse-code provider entry has id", () => {
  assert.equal(muse_codeProvider.id, "muse-code");
});

test("muse-code provider entry has alias", () => {
  assert.equal(muse_codeProvider.alias, "mc");
});

test("muse-code provider uses openai format", () => {
  assert.equal(muse_codeProvider.format, "openai");
});

test("muse-code provider uses apikey auth", () => {
  assert.equal(muse_codeProvider.authType, "apikey");
  assert.equal(muse_codeProvider.authHeader, "bearer");
});

test("muse-code provider has passthroughModels enabled", () => {
  assert.equal(muse_codeProvider.passthroughModels, true);
});

// ── Model entries ───────────────────────────────────────────────────────────

test("muse-code provider has curated models", () => {
  assert.ok(muse_codeProvider.models.length > 0);
});

test("all muse-code models have contextLength", () => {
  for (const model of muse_codeProvider.models) {
    assert.ok(
      typeof model.contextLength === "number" && model.contextLength > 0,
      `${model.id} must have positive contextLength`
    );
  }
});

test("all muse-code models have toolCalling: true", () => {
  for (const model of muse_codeProvider.models) {
    assert.equal(model.toolCalling, true, `${model.id} must have toolCalling enabled`);
  }
});

test("all muse-code models have targetFormat: openai-responses", () => {
  for (const model of muse_codeProvider.models) {
    assert.equal(
      model.targetFormat,
      "openai-responses",
      `${model.id} must use openai-responses target format`
    );
  }
});

test("reasoning models have supportsXHighEffort", () => {
  for (const model of muse_codeProvider.models) {
    if (model.supportsReasoning) {
      assert.equal(
        model.supportsXHighEffort,
        true,
        `${model.id} is a reasoning model but missing supportsXHighEffort`
      );
    }
  }
});

// ── Registry discovery ──────────────────────────────────────────────────────

test("muse-code is discoverable via getRegistryEntry", () => {
  const entry = getRegistryEntry("muse-code");
  assert.ok(entry, "getRegistryEntry must return muse-code entry");
  assert.equal(entry.id, "muse-code");
});

test("muse-code is discoverable via alias", () => {
  const entry = getRegistryEntry("mc");
  assert.ok(entry, "getRegistryEntry must find muse-code by alias mc");
  assert.equal(entry.id, "muse-code");
});
