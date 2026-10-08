import test from "node:test";
import assert from "node:assert/strict";

import { isAutoSyncEnabled } from "../../src/shared/services/modelSyncScheduler.ts";

test("isAutoSyncEnabled: explicit autoSync true is always enabled", () => {
  assert.equal(isAutoSyncEnabled("openai", { autoSync: true }), true);
  assert.equal(isAutoSyncEnabled("antigravity", { autoSync: true }), true);
  assert.equal(isAutoSyncEnabled("agy", { autoSync: true }), true);
});

test("isAutoSyncEnabled: explicit autoSync false is always honored (disabled)", () => {
  assert.equal(isAutoSyncEnabled("openai", { autoSync: false }), false);
  assert.equal(isAutoSyncEnabled("antigravity", { autoSync: false }), false);
  assert.equal(isAutoSyncEnabled("agy", { autoSync: false }), false);
});

test("isAutoSyncEnabled: undefined autoSync defaults to true for Antigravity-family connections", () => {
  // Legacy antigravity/agy connections that were saved before autoSync default was introduced
  assert.equal(isAutoSyncEnabled("antigravity", {}), true);
  assert.equal(isAutoSyncEnabled("agy", {}), true);
});

test("isAutoSyncEnabled: undefined autoSync defaults to false for standard providers", () => {
  assert.equal(isAutoSyncEnabled("openai", {}), false);
  assert.equal(isAutoSyncEnabled("anthropic", {}), false);
  assert.equal(isAutoSyncEnabled("openrouter", {}), false);
});
