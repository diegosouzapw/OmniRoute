import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveCcDiscoveryAliasStripWith } from "../../src/lib/ccDiscoveryAliasResolve.ts";

/**
 * These tests exercise the async request-path resolver by injecting all of its
 * DB/registry lookups, so no SQLite handle is opened (pure logic, no resetDb).
 * The branch matrix of the underlying pure `stripCcDiscoveryAlias` already has
 * its own suite (cc-discovery-alias-strip.test.ts); here we focus on the wiring
 * the resolver adds on top: custom-node prefixes (Gap 1) and the gate snapshot.
 */

const baseDeps = {
  claudeModelIds: new Set<string>(["claude-fable-5", "claude-opus-5"]),
  isRegistryProvider: (prefix: string) => prefix === "kimi" || prefix === "openai",
  customProviderPrefixes: new Set<string>(),
  getCombo: async (_name: string) => null as { models?: unknown[] } | null,
  gateGlobal: () => true,
  gateProvider: (_providerId: string) => null as "on" | "off" | null,
  gateModel: (_providerId: string, _modelId: string) => null as "on" | "off" | null,
};

test("non-'claude/' id is a no-op without any DB lookup", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("kimi/kimi-k2.6", baseDeps);
  assert.deepEqual(result, { model: "kimi/kimi-k2.6", stripped: false });
});

test("legitimate claude provider model is left intact", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("claude/claude-fable-5", baseDeps);
  assert.deepEqual(result, { model: "claude/claude-fable-5", stripped: false });
});

test("registry provider prefix strips when the gate is globally on", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("claude/kimi/kimi-k2.6", baseDeps);
  assert.deepEqual(result, { model: "kimi/kimi-k2.6", stripped: true });
});

test("Gap 1: a custom DB-node provider prefix is recognized and strips", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("claude/mycustom/model-x", {
    ...baseDeps,
    isRegistryProvider: () => false,
    customProviderPrefixes: new Set<string>(["mycustom"]),
  });
  assert.deepEqual(result, { model: "mycustom/model-x", stripped: true });
});

test("unknown provider prefix (neither registry nor custom) is left intact", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("claude/desconhecido/x", {
    ...baseDeps,
    isRegistryProvider: () => false,
  });
  assert.deepEqual(result, { model: "claude/desconhecido/x", stripped: false });
});

test("combo alias strips when the combo exists (non-empty models) and gate on", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("claude/combo/custo-otimizado", {
    ...baseDeps,
    getCombo: async (name) => (name === "custo-otimizado" ? { models: [{ id: "a" }] } : null),
  });
  assert.deepEqual(result, { model: "custo-otimizado", stripped: true });
});

test("combo alias is left intact when the combo has no models", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("claude/combo/empty", {
    ...baseDeps,
    getCombo: async () => ({ models: [] }),
  });
  assert.deepEqual(result, { model: "claude/combo/empty", stripped: false });
});

test("gate precedence: model 'off' beats provider/global on", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("claude/kimi/kimi-k2.6", {
    ...baseDeps,
    gateModel: (providerId, modelId) =>
      providerId === "kimi" && modelId === "kimi-k2.6" ? "off" : null,
  });
  assert.deepEqual(result, { model: "claude/kimi/kimi-k2.6", stripped: false });
});

test("gate precedence: provider 'on' strips even when global is off", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("claude/kimi/kimi-k2.6", {
    ...baseDeps,
    gateGlobal: () => false,
    gateProvider: (providerId) => (providerId === "kimi" ? "on" : null),
  });
  assert.deepEqual(result, { model: "kimi/kimi-k2.6", stripped: true });
});

test("combo gate uses the virtual 'combo' provider key", async () => {
  const result = await resolveCcDiscoveryAliasStripWith("claude/combo/x", {
    ...baseDeps,
    gateGlobal: () => false,
    getCombo: async () => ({ models: [{ id: "a" }] }),
    gateProvider: (providerId) => (providerId === "combo" ? "on" : null),
  });
  assert.deepEqual(result, { model: "x", stripped: true });
});
