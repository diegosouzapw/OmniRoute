import { test } from "node:test";
import assert from "node:assert/strict";

import { stripCcDiscoveryAlias } from "../../open-sse/handlers/chatCore/ccDiscoveryAliasStrip.ts";

const alwaysFalse = () => false;
const alwaysTrue = () => true;

test("non-'claude/' model id passes through untouched", () => {
  const result = stripCcDiscoveryAlias("kimi/kimi-k2.6", {
    isClaudeProviderModel: alwaysFalse,
    isKnownProviderPrefix: alwaysTrue,
    hasCombo: alwaysTrue,
    aliasEnabledFor: alwaysTrue,
  });
  assert.deepEqual(result, { model: "kimi/kimi-k2.6", stripped: false });
});

test("legitimate claude provider model (e.g. claude/claude-fable-5) is left intact", () => {
  const result = stripCcDiscoveryAlias("claude/claude-fable-5", {
    isClaudeProviderModel: (rest) => rest === "claude-fable-5",
    isKnownProviderPrefix: alwaysTrue,
    hasCombo: alwaysTrue,
    aliasEnabledFor: alwaysTrue,
  });
  assert.deepEqual(result, { model: "claude/claude-fable-5", stripped: false });
});

test("claude/<provider>/<model> with known provider + gate on strips to the real id", () => {
  const result = stripCcDiscoveryAlias("claude/kimi/kimi-k2.6", {
    isClaudeProviderModel: alwaysFalse,
    isKnownProviderPrefix: (prefix) => prefix === "kimi",
    hasCombo: alwaysFalse,
    aliasEnabledFor: alwaysTrue,
  });
  assert.deepEqual(result, { model: "kimi/kimi-k2.6", stripped: true });
});

test("claude/combo/<name> with existing combo + gate on strips to the combo name", () => {
  const result = stripCcDiscoveryAlias("claude/combo/custo-otimizado", {
    isClaudeProviderModel: alwaysFalse,
    isKnownProviderPrefix: alwaysFalse,
    hasCombo: (name) => name === "custo-otimizado",
    aliasEnabledFor: alwaysTrue,
  });
  assert.deepEqual(result, { model: "custo-otimizado", stripped: true });
});

test("claude/<unknown-provider>/x is left intact (unknown model flows through normally)", () => {
  const result = stripCcDiscoveryAlias("claude/desconhecido/x", {
    isClaudeProviderModel: alwaysFalse,
    isKnownProviderPrefix: alwaysFalse,
    hasCombo: alwaysFalse,
    aliasEnabledFor: alwaysTrue,
  });
  assert.deepEqual(result, { model: "claude/desconhecido/x", stripped: false });
});

test("gate off leaves a known-provider alias intact even though the provider is known", () => {
  const result = stripCcDiscoveryAlias("claude/kimi/kimi-k2.6", {
    isClaudeProviderModel: alwaysFalse,
    isKnownProviderPrefix: (prefix) => prefix === "kimi",
    hasCombo: alwaysFalse,
    aliasEnabledFor: alwaysFalse,
  });
  assert.deepEqual(result, { model: "claude/kimi/kimi-k2.6", stripped: false });
});

test("gate off leaves a combo alias intact even though the combo exists", () => {
  const result = stripCcDiscoveryAlias("claude/combo/custo-otimizado", {
    isClaudeProviderModel: alwaysFalse,
    isKnownProviderPrefix: alwaysFalse,
    hasCombo: (name) => name === "custo-otimizado",
    aliasEnabledFor: alwaysFalse,
  });
  assert.deepEqual(result, { model: "claude/combo/custo-otimizado", stripped: false });
});

test("non-string model input is a no-op", () => {
  const result = stripCcDiscoveryAlias(undefined as unknown as string, {
    isClaudeProviderModel: alwaysFalse,
    isKnownProviderPrefix: alwaysTrue,
    hasCombo: alwaysTrue,
    aliasEnabledFor: alwaysTrue,
  });
  assert.deepEqual(result, { model: undefined, stripped: false });
});

test("bare 'claude/' with nothing after the prefix is left intact (empty rest, no slash)", () => {
  const result = stripCcDiscoveryAlias("claude/", {
    isClaudeProviderModel: alwaysFalse,
    isKnownProviderPrefix: alwaysTrue,
    hasCombo: alwaysTrue,
    aliasEnabledFor: alwaysTrue,
  });
  assert.deepEqual(result, { model: "claude/", stripped: false });
});
