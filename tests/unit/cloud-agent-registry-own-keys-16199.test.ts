import assert from "node:assert/strict";
import test from "node:test";
import * as registry from "../../src/lib/cloudAgent/registry.ts";
import {
  CodexCloudAgent,
  CursorCloudAgent,
  DevinAgent,
  getAgent,
  getAvailableAgents,
  isCloudAgentProvider,
  JulesAgent,
} from "../../src/lib/cloudAgent/registry.ts";

test("registry rejects inherited provider names in the predicate", () => {
  assert.equal(isCloudAgentProvider("toString"), false);
});

test("registry lookup returns null for inherited provider names", () => {
  assert.equal(getAgent("toString"), null);
});

test("registry keeps the registered Jules singleton", () => {
  const agent = getAgent("jules");
  assert.equal(isCloudAgentProvider("jules"), true);
  assert.ok(agent instanceof JulesAgent);
  assert.equal(agent.providerId, "jules");
  assert.equal(getAgent("jules"), agent);
});

for (const providerId of [
  "constructor",
  "valueOf",
  "hasOwnProperty",
  "__proto__",
  "toLocaleString",
  "__defineGetter__",
  "__defineSetter__",
  "__lookupGetter__",
  "__lookupSetter__",
  "isPrototypeOf",
  "propertyIsEnumerable",
]) {
  test(`registry predicate rejects inherited key ${providerId}`, () => {
    assert.equal(isCloudAgentProvider(providerId), false);
  });

  test(`registry lookup rejects inherited key ${providerId}`, () => {
    assert.equal(getAgent(providerId), null);
  });
}

for (const providerId of ["", "nope", "cursor", "JULES", " jules", "jules "]) {
  test(`registry rejects unknown or noncanonical id ${JSON.stringify(providerId)}`, () => {
    assert.equal(isCloudAgentProvider(providerId), false);
    assert.equal(getAgent(providerId), null);
  });
}

for (const [providerId, Agent] of [
  ["jules", JulesAgent],
  ["devin", DevinAgent],
  ["codex-cloud", CodexCloudAgent],
  ["cursor-cloud", CursorCloudAgent],
] as const) {
  test(`registry preserves the registered ${providerId} instance`, () => {
    const agent = getAgent(providerId);
    assert.equal(isCloudAgentProvider(providerId), true);
    assert.ok(agent instanceof Agent);
    assert.equal(agent.providerId, providerId);
    assert.equal(getAgent(providerId), agent);
  });
}

test("registry lists only registered IDs in their existing order", () => {
  assert.deepEqual(getAvailableAgents(), ["jules", "devin", "codex-cloud", "cursor-cloud"]);
  assert.notEqual(getAvailableAgents(), getAvailableAgents());
});

test("registry keeps its public runtime exports", () => {
  assert.deepEqual(Object.keys(registry).sort(), [
    "CodexCloudAgent",
    "CursorCloudAgent",
    "DevinAgent",
    "JulesAgent",
    "getAgent",
    "getAvailableAgents",
    "isCloudAgentProvider",
  ]);
});
