import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  getAllMiddlewareHooks,
  getEnabledMiddlewareHooks,
  createMiddlewareHook,
  updateMiddlewareHook,
  deleteMiddlewareHook,
  getMiddlewareHook,
  recordHookExecution,
} from "../../src/lib/db/middleware.ts";

describe("middleware hooks DB", () => {
  const hookName = `test-hook-${Date.now()}`;

  const hookConfig = {
    name: hookName,
    description: "Test hook",
    priority: 100,
    scope: { type: "global" as const },
    enabled: true,
    code: "return request;",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  };

  it("createMiddlewareHook creates a hook", () => {
    createMiddlewareHook(hookConfig);
    const found = getMiddlewareHook(hookName);
    assert.ok(found, "should find created hook");
    assert.equal(found!.name, hookName);
    assert.equal(found!.enabled, true);
  });

  it("getAllMiddlewareHooks returns all hooks", () => {
    const all = getAllMiddlewareHooks();
    assert.ok(Array.isArray(all));
    assert.ok(all.length >= 1);
  });

  it("getEnabledMiddlewareHooks returns only enabled", () => {
    const disabledName = `disabled-${Date.now()}`;
    createMiddlewareHook({
      ...hookConfig,
      name: disabledName,
      enabled: false,
    });
    const enabled = getEnabledMiddlewareHooks();
    assert.ok(enabled.every((h) => h.enabled));
  });

  it("updateMiddlewareHook updates existing hook", () => {
    updateMiddlewareHook(hookName, { description: "updated" });
    const found = getMiddlewareHook(hookName);
    assert.equal(found!.description, "updated");
  });

  it("recordHookExecution increments run count", () => {
    recordHookExecution(hookName);
    const found = getMiddlewareHook(hookName);
    assert.ok(found!.runCount >= 1);
  });

  it("recordHookExecution with error sets lastError", () => {
    recordHookExecution(hookName, "test error");
    const found = getMiddlewareHook(hookName);
    assert.equal(found!.lastError, "test error");
  });

  it("deleteMiddlewareHook removes hook", () => {
    const delName = `del-hook-${Date.now()}`;
    createMiddlewareHook({ ...hookConfig, name: delName });
    deleteMiddlewareHook(delName);
    assert.equal(getMiddlewareHook(delName), undefined);
  });
});
