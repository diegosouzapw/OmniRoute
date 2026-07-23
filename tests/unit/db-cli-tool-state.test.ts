import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  saveCliToolLastConfigured,
  getCliToolLastConfigured,
  getAllCliToolLastConfigured,
  deleteCliToolLastConfigured,
  saveCliToolInitialConfig,
  getCliToolInitialConfig,
  deleteCliToolInitialConfig,
} from "../../src/lib/db/cliToolState.ts";

describe("cliToolState", () => {
  const toolId = `test-tool-${Date.now()}`;

  it("getCliToolLastConfigured returns null for unknown tool", () => {
    assert.equal(getCliToolLastConfigured(`unknown-${Date.now()}`), null);
  });

  it("saveCliToolLastConfigured persists and retrieves", () => {
    const ts = "2026-01-01T00:00:00.000Z";
    saveCliToolLastConfigured(toolId, ts);
    assert.equal(getCliToolLastConfigured(toolId), ts);
  });

  it("getAllCliToolLastConfigured returns all entries", () => {
    const all = getAllCliToolLastConfigured();
    assert.ok(toolId in all, "should contain saved tool");
  });

  it("deleteCliToolLastConfigured removes entry", () => {
    const delId = `del-tool-${Date.now()}`;
    saveCliToolLastConfigured(delId, "2026-01-01T00:00:00.000Z");
    deleteCliToolLastConfigured(delId);
    assert.equal(getCliToolLastConfigured(delId), null);
  });

  it("saveCliToolInitialConfig saves only on first call", () => {
    const initId = `init-tool-${Date.now()}`;
    const config = { foo: "bar" };
    assert.equal(saveCliToolInitialConfig(initId, config), true, "first save should return true");
    assert.equal(saveCliToolInitialConfig(initId, { baz: "qux" }), false, "second save should return false");
    const loaded = getCliToolInitialConfig(initId);
    assert.deepEqual(loaded, { foo: "bar" }, "should keep first config");
  });

  it("getCliToolInitialConfig returns null for unknown tool", () => {
    assert.equal(getCliToolInitialConfig(`unknown-init-${Date.now()}`), null);
  });

  it("deleteCliToolInitialConfig removes entry", () => {
    const delId = `del-init-${Date.now()}`;
    saveCliToolInitialConfig(delId, { x: 1 });
    deleteCliToolInitialConfig(delId);
    assert.equal(getCliToolInitialConfig(delId), null);
  });
});
