import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/db/plugins.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");

const makeInput = (overrides = {}) => ({
  id: `plugin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  name: `test-plugin-${Date.now()}`,
  version: "1.0.0",
  main: "index.js",
  manifest: { name: "test", version: "1.0.0" },
  pluginDir: "/tmp/test-plugin",
  ...overrides,
});

describe("plugins DB module", () => {
  beforeEach(() => {
    // The `plugins` table is created by migration 076 (run on getDbInstance);
    // rely on the real migration rather than creating the table inline, so a
    // missing/renumbered migration fails here instead of being masked.
    const db = getDbInstance();
    db.exec("DELETE FROM plugins");
  });

  describe("insertPlugin / getPluginByName / listPlugins", () => {
    it("inserts and retrieves a plugin", () => {
      const input = makeInput();
      mod.insertPlugin(input);
      const found = mod.getPluginByName(input.name);
      assert.ok(found);
      assert.equal(found!.name, input.name);
      assert.equal(found!.version, "1.0.0");
      assert.equal(found!.status, "installed");
    });

    it("lists all plugins", () => {
      mod.insertPlugin(makeInput());
      const all = mod.listPlugins();
      assert.ok(all.length >= 1);
    });

    it("lists plugins filtered by status", () => {
      const input = makeInput({ name: `filter-${Date.now()}` });
      mod.insertPlugin(input);
      const installed = mod.listPlugins("installed");
      assert.ok(installed.length >= 1);
      assert.ok(installed.every((p) => p.status === "installed"));
    });

    it("returns null for unknown plugin", () => {
      assert.equal(mod.getPluginByName("nonexistent-xyz"), null);
    });
  });

  describe("getPluginById", () => {
    it("retrieves by id", () => {
      const input = makeInput({ name: `byid-${Date.now()}` });
      mod.insertPlugin(input);
      const found = mod.getPluginById(input.id);
      assert.ok(found);
      assert.equal(found!.id, input.id);
    });
  });

  describe("updatePluginStatus", () => {
    it("updates status to active", () => {
      const input = makeInput({ name: `status-${Date.now()}` });
      mod.insertPlugin(input);
      mod.updatePluginStatus(input.name, "active");
      const found = mod.getPluginByName(input.name);
      assert.equal(found!.status, "active");
    });

    it("updates status to error with message", () => {
      const input = makeInput({ name: `error-${Date.now()}` });
      mod.insertPlugin(input);
      mod.updatePluginStatus(input.name, "error", "broke");
      const found = mod.getPluginByName(input.name);
      assert.equal(found!.status, "error");
      assert.equal(found!.errorMessage, "broke");
    });
  });

  describe("updatePluginConfig", () => {
    it("updates config JSON", () => {
      const input = makeInput({ name: `config-${Date.now()}` });
      mod.insertPlugin(input);
      mod.updatePluginConfig(input.name, { key: "value" });
      const found = mod.getPluginByName(input.name);
      const config = JSON.parse(found!.config);
      assert.equal(config.key, "value");
    });
  });

  describe("deletePlugin", () => {
    it("removes plugin by name", () => {
      const input = makeInput({ name: `del-${Date.now()}` });
      mod.insertPlugin(input);
      assert.equal(mod.deletePlugin(input.name), true);
      assert.equal(mod.getPluginByName(input.name), null);
    });

    it("returns false for unknown plugin", () => {
      assert.equal(mod.deletePlugin("nonexistent"), false);
    });
  });

  describe("pluginExists", () => {
    it("returns true for existing plugin", () => {
      const input = makeInput({ name: `exists-${Date.now()}` });
      mod.insertPlugin(input);
      assert.equal(mod.pluginExists(input.name), true);
    });

    it("returns false for unknown plugin", () => {
      assert.equal(mod.pluginExists("nonexistent"), false);
    });
  });
});
